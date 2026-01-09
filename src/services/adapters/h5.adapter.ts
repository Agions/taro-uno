/**
 * H5 (Web) HTTP Adapter
 * Uses fetch API for HTTP requests
 * @module services/adapters/h5.adapter
 */

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

/**
 * H5/Web HTTP 适配器
 * 使用 fetch API 实现
 */
export class H5Adapter extends BaseHttpAdapter {
  /**
   * 发送 HTTP 请求
   */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders(
      { 'Content-Type': 'application/json' },
      config.headers,
    );

    // 构建 fetch 配置
    const fetchConfig: RequestInit = {
      method: config.method || 'GET',
      headers,
      credentials: config.withCredentials ? 'include' : 'same-origin',
      signal: config.signal,
    };

    // 添加请求体
    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
      const contentType = headers['Content-Type'] || headers['content-type'];
      fetchConfig.body = this.serializeData(config.data, contentType) as string;
    }

    // 创建超时控制器
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let abortController: AbortController | undefined;

    if (config.timeout && !config.signal) {
      abortController = new AbortController();
      fetchConfig.signal = abortController.signal;
      timeoutId = setTimeout(() => {
        abortController?.abort();
      }, config.timeout);
    }

    try {
      const response = await fetch(url, fetchConfig);

      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 解析响应数据
      let data: T;
      const contentType = response.headers.get('content-type') || '';

      if (config.responseType === 'arraybuffer') {
        data = (await response.arrayBuffer()) as T;
      } else if (config.responseType === 'text' || !contentType.includes('application/json')) {
        data = (await response.text()) as T;
      } else {
        try {
          data = (await response.json()) as T;
        } catch {
          data = (await response.text()) as T;
        }
      }

      // 解析响应头
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
      });

      // 构建响应对象
      const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText || this.getStatusText(response.status),
        headers: responseHeaders,
        config,
      };

      // 检查 HTTP 状态码
      if (!response.ok) {
        const errorCode = response.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR;
        throw new HttpError(
          `Request failed with status ${response.status}`,
          errorCode,
          response.status,
          undefined,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 已经是 HttpError 则直接抛出
      if (error instanceof HttpError) {
        throw error;
      }

      // 处理 fetch 错误
      const fetchError = error as Error;

      if (fetchError.name === 'AbortError') {
        // 检查是否是超时导致的取消
        if (abortController && config.timeout) {
          throw new HttpError(
            'Request timeout',
            ErrorCodes.TIMEOUT,
            undefined,
            error,
            config,
          );
        }
        throw new HttpError(
          'Request cancelled',
          ErrorCodes.CANCELLED,
          undefined,
          error,
          config,
        );
      }

      if (fetchError.message?.includes('network') || fetchError.name === 'TypeError') {
        throw new HttpError(
          'Network error',
          ErrorCodes.NETWORK_ERROR,
          undefined,
          error,
          config,
        );
      }

      throw new HttpError(
        fetchError.message || 'Unknown error',
        ErrorCodes.UNKNOWN,
        undefined,
        error,
        config,
      );
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

    // 移除 Content-Type，让浏览器自动设置 multipart/form-data
    delete headers['Content-Type'];
    delete headers['content-type'];

    // 构建 FormData
    const formData = new FormData();

    if (config.filePath instanceof File) {
      formData.append(config.name || 'file', config.filePath);
    }

    // 添加额外的表单数据
    if (config.formData) {
      for (const [key, value] of Object.entries(config.formData)) {
        formData.append(key, String(value));
      }
    }

    // 使用 XMLHttpRequest 以支持进度回调
    return new Promise<HttpResponse<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);

      // 设置请求头
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      // 设置超时
      if (config.timeout) {
        xhr.timeout = config.timeout;
      }

      // 设置凭证
      xhr.withCredentials = config.withCredentials || false;

      // 监听上传进度
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress({
              progress: Math.round((event.loaded / event.total) * 100),
              totalBytesSent: event.loaded,
              totalBytesExpectedToSend: event.total,
            });
          }
        };
      }

      // 处理响应
      xhr.onload = () => {
        let data: T;
        try {
          data = JSON.parse(xhr.responseText) as T;
        } catch {
          data = xhr.responseText as T;
        }

        const responseHeaders = this.parseHeaders(xhr.getAllResponseHeaders());

        const httpResponse: HttpResponse<T> = {
          data,
          status: xhr.status,
          statusText: xhr.statusText || this.getStatusText(xhr.status),
          headers: responseHeaders,
          config,
        };

        if (xhr.status >= 400) {
          reject(new HttpError(
            `Upload failed with status ${xhr.status}`,
            xhr.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
            xhr.status,
            undefined,
            config,
            httpResponse,
          ));
        } else {
          resolve(httpResponse);
        }
      };

      // 处理错误
      xhr.onerror = () => {
        reject(new HttpError(
          'Upload failed',
          ErrorCodes.NETWORK_ERROR,
          undefined,
          undefined,
          config,
        ));
      };

      // 处理超时
      xhr.ontimeout = () => {
        reject(new HttpError(
          'Upload timeout',
          ErrorCodes.TIMEOUT,
          undefined,
          undefined,
          config,
        ));
      };

      // 处理取消
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          xhr.abort();
          reject(new HttpError(
            'Upload cancelled',
            ErrorCodes.CANCELLED,
            undefined,
            undefined,
            config,
          ));
        });
      }

      // 发送请求
      xhr.send(formData);
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
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      // 设置请求头
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      // 设置超时
      if (config.timeout) {
        xhr.timeout = config.timeout;
      }

      // 设置凭证
      xhr.withCredentials = config.withCredentials || false;

      // 监听下载进度
      if (onProgress) {
        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress({
              progress: Math.round((event.loaded / event.total) * 100),
              totalBytesWritten: event.loaded,
              totalBytesExpectedToWrite: event.total,
            });
          }
        };
      }

      // 处理响应
      xhr.onload = () => {
        const responseHeaders = this.parseHeaders(xhr.getAllResponseHeaders());

        // 创建 Blob URL
        const blob = xhr.response as Blob;
        const blobUrl = URL.createObjectURL(blob);

        const httpResponse: HttpResponse<T> = {
          data: { blob, blobUrl } as T,
          status: xhr.status,
          statusText: xhr.statusText || this.getStatusText(xhr.status),
          headers: responseHeaders,
          config,
        };

        if (xhr.status >= 400) {
          reject(new HttpError(
            `Download failed with status ${xhr.status}`,
            xhr.status >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR,
            xhr.status,
            undefined,
            config,
            httpResponse,
          ));
        } else {
          resolve(httpResponse);
        }
      };

      // 处理错误
      xhr.onerror = () => {
        reject(new HttpError(
          'Download failed',
          ErrorCodes.NETWORK_ERROR,
          undefined,
          undefined,
          config,
        ));
      };

      // 处理超时
      xhr.ontimeout = () => {
        reject(new HttpError(
          'Download timeout',
          ErrorCodes.TIMEOUT,
          undefined,
          undefined,
          config,
        ));
      };

      // 处理取消
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          xhr.abort();
          reject(new HttpError(
            'Download cancelled',
            ErrorCodes.CANCELLED,
            undefined,
            undefined,
            config,
          ));
        });
      }

      // 发送请求
      xhr.send();
    });
  }
}

/** 创建 H5 适配器实例 */
export function createH5Adapter(): H5Adapter {
  return new H5Adapter();
}
