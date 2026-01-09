/**
 * HarmonyOS HTTP Adapter
 * Uses @ohos.net.http for HTTP requests
 * @module services/adapters/harmony.adapter
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
 * 鸿蒙 HTTP 模块类型定义
 * 由于 @ohos.net.http 是鸿蒙特有模块，这里定义类型接口
 */
interface OhosHttpRequest {
  request(
    url: string,
    options: OhosHttpRequestOptions,
    callback: (err: OhosError | null, data: OhosHttpResponse) => void
  ): void;
  destroy(): void;
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback?: (...args: unknown[]) => void): void;
}

interface OhosHttpRequestOptions {
  method: string;
  header?: Record<string, string>;
  extraData?: string | Record<string, unknown>;
  readTimeout?: number;
  connectTimeout?: number;
  expectDataType?: number;
}

interface OhosHttpResponse {
  result: string | ArrayBuffer;
  responseCode: number;
  header: Record<string, string>;
}

interface OhosError {
  code: number;
  message: string;
}

interface OhosHttpModule {
  createHttp(): OhosHttpRequest;
  RequestMethod: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    PATCH: string;
  };
  ResponseCode: {
    OK: number;
    CREATED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    INTERNAL_ERROR: number;
  };
}

/**
 * 动态导入鸿蒙 HTTP 模块
 */
async function getOhosHttp(): Promise<OhosHttpModule | null> {
  try {
    // 在鸿蒙环境中动态导入
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ohosHttp = require('@ohos.net.http') as OhosHttpModule;
    return ohosHttp;
  } catch {
    return null;
  }
}

/**
 * 鸿蒙 OS HTTP 适配器
 * 使用 @ohos.net.http 模块实现
 */
export class HarmonyAdapter extends BaseHttpAdapter {
  private ohosHttp: OhosHttpModule | null = null;

  /**
   * 初始化鸿蒙 HTTP 模块
   */
  private async ensureOhosHttp(): Promise<OhosHttpModule> {
    if (!this.ohosHttp) {
      this.ohosHttp = await getOhosHttp();
    }

    if (!this.ohosHttp) {
      throw new HttpError(
        'HarmonyOS HTTP module not available',
        ErrorCodes.UNKNOWN,
        undefined,
        undefined,
      );
    }

    return this.ohosHttp;
  }

  /**
   * 发送 HTTP 请求
   */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const ohosHttp = await this.ensureOhosHttp();
    const httpRequest = ohosHttp.createHttp();

    const url = this.buildUrl(config);
    const headers = this.mergeHeaders(
      { 'Content-Type': 'application/json' },
      config.headers,
    );

    // 构建请求选项
    const options: OhosHttpRequestOptions = {
      method: config.method || 'GET',
      header: headers,
      readTimeout: config.timeout || 30000,
      connectTimeout: config.timeout || 30000,
    };

    // 添加请求体
    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
      const contentType = headers['Content-Type'] || headers['content-type'];
      if (contentType?.includes('application/json')) {
        options.extraData = JSON.stringify(config.data);
      } else {
        options.extraData = config.data;
      }
    }

    // 设置响应类型
    if (config.responseType === 'arraybuffer') {
      options.expectDataType = 1; // ARRAY_BUFFER
    } else {
      options.expectDataType = 0; // STRING
    }

    return new Promise<HttpResponse<T>>((resolve, reject) => {
      let isAborted = false;

      // 处理取消信号
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          isAborted = true;
          httpRequest.destroy();
          reject(new HttpError(
            'Request cancelled',
            ErrorCodes.CANCELLED,
            undefined,
            undefined,
            config,
          ));
        });
      }

      httpRequest.request(url, options, (err, data) => {
        // 销毁请求对象
        httpRequest.destroy();

        if (isAborted) {
          return;
        }

        if (err) {
          // 处理错误
          if (err.message?.includes('timeout')) {
            reject(new HttpError(
              'Request timeout',
              ErrorCodes.TIMEOUT,
              undefined,
              err,
              config,
            ));
          } else if (err.message?.includes('network') || err.message?.includes('connect')) {
            reject(new HttpError(
              'Network error',
              ErrorCodes.NETWORK_ERROR,
              undefined,
              err,
              config,
            ));
          } else {
            reject(new HttpError(
              err.message || 'Unknown error',
              ErrorCodes.UNKNOWN,
              undefined,
              err,
              config,
            ));
          }
          return;
        }

        // 解析响应数据
        let responseData: T;
        if (typeof data.result === 'string') {
          try {
            responseData = JSON.parse(data.result) as T;
          } catch {
            responseData = data.result as T;
          }
        } else {
          responseData = data.result as T;
        }

        // 构建响应对象
        const httpResponse: HttpResponse<T> = {
          data: responseData,
          status: data.responseCode,
          statusText: this.getStatusText(data.responseCode),
          headers: this.parseHeaders(data.header || {}),
          config,
        };

        // 检查 HTTP 状态码
        if (data.responseCode >= 400) {
          const errorCode = data.responseCode >= 500 ? ErrorCodes.SERVER_ERROR : ErrorCodes.CLIENT_ERROR;
          reject(new HttpError(
            `Request failed with status ${data.responseCode}`,
            errorCode,
            data.responseCode,
            undefined,
            config,
            httpResponse,
          ));
        } else {
          resolve(httpResponse);
        }
      });
    });
  }

  /**
   * 上传文件
   * 鸿蒙使用 @ohos.request 模块进行文件上传
   */
  async upload<T = unknown>(
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<HttpResponse<T>> {
    // 鸿蒙文件上传需要使用 @ohos.request 模块
    // 这里提供一个基于 HTTP 的简化实现
    const url = this.buildUrl(config);
    const headers = this.mergeHeaders({}, config.headers);

    // 模拟进度开始
    if (onProgress) {
      onProgress({
        progress: 0,
        totalBytesSent: 0,
        totalBytesExpectedToSend: 0,
      });
    }

    try {
      // 使用 multipart/form-data 格式
      const boundary = `----FormBoundary${Date.now()}`;
      headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;

      // 构建 multipart 数据
      let body = '';

      // 添加表单数据
      if (config.formData) {
        for (const [key, value] of Object.entries(config.formData)) {
          body += `--${boundary}\r\n`;
          body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
          body += `${value}\r\n`;
        }
      }

      // 添加文件（简化处理，实际需要读取文件内容）
      body += `--${boundary}\r\n`;
      body += `Content-Disposition: form-data; name="${config.name || 'file'}"; filename="file"\r\n`;
      body += 'Content-Type: application/octet-stream\r\n\r\n';
      // 文件内容需要通过鸿蒙文件系统 API 读取
      body += `--${boundary}--\r\n`;

      const response = await this.request<T>({
        ...config,
        url,
        method: 'POST',
        headers,
        data: { __raw: body } as Record<string, unknown>,
      });

      // 模拟进度完成
      if (onProgress) {
        onProgress({
          progress: 100,
          totalBytesSent: 0,
          totalBytesExpectedToSend: 0,
        });
      }

      return response;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(
        'Upload failed',
        ErrorCodes.NETWORK_ERROR,
        undefined,
        error,
        config,
      );
    }
  }

  /**
   * 下载文件
   * 鸿蒙使用 @ohos.request 模块进行文件下载
   */
  async download<T = unknown>(
    config: DownloadConfig,
    onProgress?: (progress: DownloadProgress) => void,
  ): Promise<HttpResponse<T>> {
    // 模拟进度开始
    if (onProgress) {
      onProgress({
        progress: 0,
        totalBytesWritten: 0,
        totalBytesExpectedToWrite: 0,
      });
    }

    try {
      const response = await this.request<T>({
        ...config,
        method: 'GET',
        responseType: 'arraybuffer',
      });

      // 模拟进度完成
      if (onProgress) {
        onProgress({
          progress: 100,
          totalBytesWritten: 0,
          totalBytesExpectedToWrite: 0,
        });
      }

      return response;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(
        'Download failed',
        ErrorCodes.NETWORK_ERROR,
        undefined,
        error,
        config,
      );
    }
  }
}

/** 创建鸿蒙适配器实例 */
export function createHarmonyAdapter(): HarmonyAdapter {
  return new HarmonyAdapter();
}
