/**
 * WeApp (微信小程序) HTTP Adapter
 * Uses Taro.request for HTTP requests with concurrency management
 * @module services/adapters/weapp.adapter
 */

import Taro from '@tarojs/taro';
import { BaseHttpAdapter } from './adapter.interface';
import type {
  HttpRequestConfig,
  HttpResponse,
  UploadConfig,
  DownloadConfig,
  UploadProgress,
  DownloadProgress,
} from '../types';
import { HttpError, ErrorCodes } from '../types';

/** 最大并发请求数 */
const MAX_CONCURRENT_REQUESTS = 10;

/** 请求队列项 */
interface QueueItem<T> {
  config: HttpRequestConfig;
  resolve: (value: HttpResponse<T>) => void;
  reject: (reason: HttpError) => void;
}

/**
 * 微信小程序 HTTP 适配器
 * 使用 Taro.request 实现，支持并发限制
 */
export class WeappAdapter extends BaseHttpAdapter {
  /** 当前活跃请求数 */
  private activeRequests = 0;

  /** 请求队列 */
  private requestQueue: QueueItem<unknown>[] = [];

  /**
   * 发送 HTTP 请求
   */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    // 检查是否需要排队
    if (this.activeRequests >= MAX_CONCURRENT_REQUESTS) {
      return this.enqueue<T>(config);
    }

    return this.executeRequest<T>(config);
  }

  /**
   * 将请求加入队列
   */
  private enqueue<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    return new Promise<HttpResponse<T>>((resolve, reject) => {
      this.requestQueue.push({
        config,
        resolve: resolve as (value: HttpResponse<unknown>) => void,
        reject,
      });
    });
  }

  /**
   * 处理队列中的下一个请求
   */
  private processQueue(): void {
    if (this.requestQueue.length === 0 || this.activeRequests >= MAX_CONCURRENT_REQUESTS) {
      return;
    }

    const item = this.requestQueue.shift();
    if (item) {
      this.executeRequest(item.config)
        .then(item.resolve)
        .catch(item.reject);
    }
  }

  /**
   * 执行实际的 HTTP 请求
   */
  private async executeRequest<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    this.activeRequests++;

    try {
      const url = this.buildUrl(config);
      const headers = this.mergeHeaders(
        { 'Content-Type': 'application/json' },
        config.headers,
      );

      // 创建请求任务
      const requestTask = Taro.request({
        url,
        method: (config.method || 'GET') as keyof Taro.request.Method,
        data: config.data,
        header: headers,
        timeout: config.timeout,
        responseType: config.responseType === 'arraybuffer' ? 'arraybuffer' : 'text',
        dataType: config.responseType === 'json' ? 'json' : undefined,
      });

      // 处理取消信号
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          requestTask.abort();
        });
      }

      const response = await requestTask;

      // 检查是否被取消
      if (config.signal?.aborted) {
        throw new HttpError(
          'Request cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          undefined,
          config,
        );
      }

      // 构建响应对象
      const httpResponse: HttpResponse<T> = {
        data: response.data as T,
        status: response.statusCode,
        statusText: this.getStatusText(response.statusCode),
        headers: this.parseHeaders(response.header || {}),
        config,
      };

      // 检查 HTTP 状态码
      if (response.statusCode >= 400) {
        const errorCode = response.statusCode >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR;
        throw new HttpError(
          `Request failed with status ${response.statusCode}`,
          errorCode,
          response.statusCode,
          undefined,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      // 已经是 HttpError 则直接抛出
      if (error instanceof HttpError) {
        throw error;
      }

      // 处理 Taro 错误
      const taroError = error as { errMsg?: string };

      if (taroError.errMsg?.includes('timeout')) {
        throw new HttpError(
          'Request timeout',
          ErrorCodes.TIMEOUT,
          undefined,
          error,
          config,
        );
      }

      if (taroError.errMsg?.includes('abort')) {
        throw new HttpError(
          'Request cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          error,
          config,
        );
      }

      if (taroError.errMsg?.includes('fail')) {
        throw new HttpError(
          'Network error',
          ErrorCodes.NETWORK_ERROR,
          undefined,
          error,
          config,
        );
      }

      throw new HttpError(
        'Unknown error',
        ErrorCodes.UNKNOWN,
        undefined,
        error,
        config,
      );
    } finally {
      this.activeRequests--;
      this.processQueue();
    }
  }

  /**
   * 上传文件
   */
  async upload<T = unknown>(
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders({}, config.headers);

    return new Promise<HttpResponse<T>>((resolve, reject) => {
      const uploadTask = Taro.uploadFile({
        url,
        filePath: config.filePath as string,
        name: config.name || 'file',
        header: headers,
        formData: config.formData as Record<string, string>,
        timeout: config.timeout,
        success: (response) => {
          let data: T;
          try {
            data = JSON.parse(response.data) as T;
          } catch {
            data = response.data as T;
          }

          const httpResponse: HttpResponse<T> = {
            data,
            status: response.statusCode,
            statusText: this.getStatusText(response.statusCode),
            headers: this.parseHeaders(response.header || {}),
            config,
          };

          if (response.statusCode >= 400) {
            reject(new HttpError(
              `Upload failed with status ${response.statusCode}`,
              response.statusCode >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
              response.statusCode,
              undefined,
              config,
              httpResponse,
            ));
          } else {
            resolve(httpResponse);
          }
        },
        fail: (error) => {
          reject(new HttpError(
            error.errMsg || 'Upload failed',
            ErrorCodes.NETWORK_ERROR,
            undefined,
            error,
            config,
          ));
        },
      });

      // 监听上传进度
      if (onProgress) {
        uploadTask.onProgressUpdate((res) => {
          onProgress({
            progress: res.progress,
            totalBytesSent: res.totalBytesSent,
            totalBytesExpectedToSend: res.totalBytesExpectedToSend,
          });
        });
      }

      // 处理取消信号
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          uploadTask.abort();
        });
      }
    });
  }

  /**
   * 下载文件
   */
  async download<T = unknown>(
    config: DownloadConfig,
    onProgress?: (progress: DownloadProgress) => void,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders({}, config.headers);

    return new Promise<HttpResponse<T>>((resolve, reject) => {
      const downloadTask = Taro.downloadFile({
        url,
        header: headers,
        filePath: config.filePath,
        timeout: config.timeout,
        success: (response) => {
          const httpResponse: HttpResponse<T> = {
            data: { tempFilePath: response.tempFilePath, filePath: response.filePath } as T,
            status: response.statusCode,
            statusText: this.getStatusText(response.statusCode),
            headers: this.parseHeaders(response.header || {}),
            config,
          };

          if (response.statusCode >= 400) {
            reject(new HttpError(
              `Download failed with status ${response.statusCode}`,
              response.statusCode >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
              response.statusCode,
              undefined,
              config,
              httpResponse,
            ));
          } else {
            resolve(httpResponse);
          }
        },
        fail: (error) => {
          reject(new HttpError(
            error.errMsg || 'Download failed',
            ErrorCodes.NETWORK_ERROR,
            undefined,
            error,
            config,
          ));
        },
      });

      // 监听下载进度
      if (onProgress) {
        downloadTask.onProgressUpdate((res) => {
          onProgress({
            progress: res.progress,
            totalBytesWritten: res.totalBytesWritten,
            totalBytesExpectedToWrite: res.totalBytesExpectedToWrite,
          });
        });
      }

      // 处理取消信号
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          downloadTask.abort();
        });
      }
    });
  }
}

/** 创建微信小程序适配器实例 */
export function createWeappAdapter(): WeappAdapter {
  return new WeappAdapter();
}
