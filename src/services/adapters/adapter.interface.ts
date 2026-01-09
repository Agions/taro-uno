/**
 * HTTP Adapter Interface
 * Defines the unified interface for all platform-specific HTTP adapters
 * @module services/adapters/adapter.interface
 */

import type {
  HttpRequestConfig,
  HttpResponse,
  UploadConfig,
  DownloadConfig,
  UploadProgress,
  DownloadProgress,
} from '../types';

/**
 * HTTP 适配器接口
 * 所有平台适配器必须实现此接口
 */
export interface IHttpAdapter {
  /**
   * 发送 HTTP 请求
   * @param config 请求配置
   * @returns Promise<HttpResponse<T>> 响应数据
   */
  request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * 上传文件
   * @param config 上传配置
   * @param onProgress 进度回调
   * @returns Promise<HttpResponse<T>> 响应数据
   */
  upload?<T = unknown>(
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<HttpResponse<T>>;

  /**
   * 下载文件
   * @param config 下载配置
   * @param onProgress 进度回调
   * @returns Promise<HttpResponse<T>> 响应数据
   */
  download?<T = unknown>(
    config: DownloadConfig,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<HttpResponse<T>>;

  /**
   * 取消请求
   * @param signal AbortSignal
   */
  abort?(signal: AbortSignal): void;
}

/**
 * 适配器工厂函数类型
 */
export type AdapterFactory = () => IHttpAdapter;

/**
 * 适配器基类
 * 提供通用的辅助方法
 */
export abstract class BaseHttpAdapter implements IHttpAdapter {
  /**
   * 发送 HTTP 请求（抽象方法，子类必须实现）
   */
  abstract request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * 构建完整 URL
   * @param config 请求配置
   * @returns 完整的请求 URL
   */
  protected buildUrl(config: HttpRequestConfig): string {
    let url = config.url || '';

    // 添加 baseURL
    if (config.baseURL && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = `${config.baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    }

    // 添加查询参数
    if (config.params && Object.keys(config.params).length > 0) {
      const queryString = this.buildQueryString(config.params);
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    return url;
  }

  /**
   * 构建查询字符串
   * @param params 参数对象
   * @returns 查询字符串
   */
  protected buildQueryString(params: Record<string, unknown>): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        });
      } else {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }

    return parts.join('&');
  }

  /**
   * 合并请求头
   * @param defaultHeaders 默认请求头
   * @param customHeaders 自定义请求头
   * @returns 合并后的请求头
   */
  protected mergeHeaders(
    defaultHeaders: Record<string, string>,
    customHeaders?: Record<string, string>,
  ): Record<string, string> {
    return {
      ...defaultHeaders,
      ...customHeaders,
    };
  }

  /**
   * 序列化请求数据
   * @param data 请求数据
   * @param contentType 内容类型
   * @returns 序列化后的数据
   */
  protected serializeData(
    data: Record<string, unknown> | undefined,
    contentType?: string,
  ): string | Record<string, unknown> | undefined {
    if (!data) {
      return undefined;
    }

    // JSON 格式
    if (contentType?.includes('application/json')) {
      return JSON.stringify(data);
    }

    // 表单格式
    if (contentType?.includes('application/x-www-form-urlencoded')) {
      return this.buildQueryString(data);
    }

    // 默认返回原始数据
    return data;
  }

  /**
   * 解析响应头
   * @param headers 原始响应头
   * @returns 解析后的响应头对象
   */
  protected parseHeaders(headers: string | Record<string, string>): Record<string, string> {
    if (typeof headers === 'string') {
      const result: Record<string, string> = {};
      headers.split('\r\n').forEach((line) => {
        const [key, ...values] = line.split(':');
        if (key && values.length > 0) {
          result[key.trim().toLowerCase()] = values.join(':').trim();
        }
      });
      return result;
    }

    // 转换为小写键名
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      result[key.toLowerCase()] = value;
    }
    return result;
  }

  /**
   * 获取状态文本
   * @param status HTTP 状态码
   * @returns 状态文本
   */
  protected getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      301: 'Moved Permanently',
      302: 'Found',
      304: 'Not Modified',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      408: 'Request Timeout',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
    };

    return statusTexts[status] || 'Unknown';
  }
}
