/**
 * HTTP Service Types
 * Type definitions for the unified HTTP client
 * @module services/types
 */

/** HTTP 方法 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/** 请求配置 */
export interface HttpRequestConfig {
  /** 请求 URL */
  url?: string;
  /** 基础 URL */
  baseURL?: string;
  /** 请求方法 */
  method?: HttpMethod;
  /** 请求数据 */
  data?: Record<string, unknown>;
  /** 请求参数 */
  params?: Record<string, unknown>;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 响应类型 */
  responseType?: 'json' | 'text' | 'arraybuffer';
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 取消信号 */
  signal?: AbortSignal;
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 上传进度回调 */
  onUploadProgress?: (percent: number) => void;
  /** 下载进度回调 */
  onDownloadProgress?: (percent: number) => void;
}

/** HTTP 响应 */
export interface HttpResponse<T = unknown> {
  /** 响应数据 */
  data: T;
  /** HTTP 状态码 */
  status: number;
  /** 状态文本 */
  statusText: string;
  /** 响应头 */
  headers: Record<string, string>;
  /** 请求配置 */
  config: HttpRequestConfig;
}

/** HTTP 错误接口 */
export interface HttpErrorInfo {
  /** 错误码 */
  code: string;
  /** 错误信息 */
  message: string;
  /** HTTP 状态码 */
  status?: number;
  /** 原始错误 */
  originalError?: unknown;
}

/** HTTP 错误类 */
export class HttpError extends Error implements HttpErrorInfo {
  /** 错误码 */
  public code: string;
  /** HTTP 状态码 */
  public status?: number;
  /** 原始错误 */
  public originalError?: unknown;
  /** 请求配置 */
  public config?: HttpRequestConfig;
  /** 响应数据 */
  public response?: HttpResponse;

  constructor(
    message: string,
    code: string,
    status?: number,
    originalError?: unknown,
    config?: HttpRequestConfig,
    response?: HttpResponse,
  ) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.status = status;
    this.originalError = originalError;
    this.config = config;
    this.response = response;
  }

  /** 转换为 JSON */
  toJSON(): HttpErrorInfo & { name: string; config?: HttpRequestConfig } {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      status: this.status,
      originalError: this.originalError,
      config: this.config,
    };
  }
}

/** 错误码定义 */
export const ErrorCodes = {
  /** 网络错误 */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** 超时错误 */
  TIMEOUT: 'TIMEOUT',
  /** 请求被取消 */
  CANCELLED: 'CANCELLED',
  /** 无效响应 */
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  /** 服务器错误 */
  SERVER_ERROR: 'SERVER_ERROR',
  /** 客户端错误 */
  CLIENT_ERROR: 'CLIENT_ERROR',
  /** 未知错误 */
  UNKNOWN: 'UNKNOWN',
} as const;

/** 错误码类型 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/** 请求拦截器函数 */
export type RequestInterceptorFn = (
  config: HttpRequestConfig
) => HttpRequestConfig | Promise<HttpRequestConfig>;

/** 请求错误拦截器函数 */
export type RequestErrorInterceptorFn = (error: HttpError) => Promise<never>;

/** 响应拦截器函数 */
export type ResponseInterceptorFn<T = unknown> = (
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>;

/** 响应错误拦截器函数 */
export type ResponseErrorInterceptorFn = (error: HttpError) => Promise<never>;

/** 拦截器配置 */
export interface InterceptorConfig {
  /** 请求拦截器 */
  request: {
    /** 成功处理函数 */
    onFulfilled?: RequestInterceptorFn;
    /** 错误处理函数 */
    onRejected?: RequestErrorInterceptorFn;
  }[];
  /** 响应拦截器 */
  response: {
    /** 成功处理函数 */
    onFulfilled?: ResponseInterceptorFn;
    /** 错误处理函数 */
    onRejected?: ResponseErrorInterceptorFn;
  }[];
}

/** 上传配置 */
export interface UploadConfig extends Omit<HttpRequestConfig, 'data' | 'method'> {
  /** 文件路径或文件对象 */
  filePath: string | File;
  /** 表单字段名 */
  name?: string;
  /** 额外的表单数据 */
  formData?: Record<string, unknown>;
}

/** 下载配置 */
export interface DownloadConfig extends Omit<HttpRequestConfig, 'data' | 'method' | 'responseType'> {
  /** 下载目标路径 */
  filePath?: string;
}

/** 上传进度信息 */
export interface UploadProgress {
  /** 上传进度百分比 (0-100) */
  progress: number;
  /** 已发送字节数 */
  totalBytesSent: number;
  /** 预期发送总字节数 */
  totalBytesExpectedToSend: number;
}

/** 下载进度信息 */
export interface DownloadProgress {
  /** 下载进度百分比 (0-100) */
  progress: number;
  /** 已下载字节数 */
  totalBytesWritten: number;
  /** 预期下载总字节数 */
  totalBytesExpectedToWrite: number;
}
