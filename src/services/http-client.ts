/**
 * HTTP Client
 * Unified HTTP client with automatic platform adaptation
 * @module services/http-client
 */

import type {
  HttpRequestConfig,
  HttpResponse,
  RequestInterceptorFn,
  RequestErrorInterceptorFn,
  ResponseInterceptorFn,
  ResponseErrorInterceptorFn,
  UploadConfig,
  DownloadConfig,
  UploadProgress,
  DownloadProgress,
} from './types';
import { HttpError, ErrorCodes } from './types';
import type { IHttpAdapter } from './adapters/adapter.interface';
import { createAdapter } from './adapters';
import { InterceptorManager } from './interceptors';

/**
 * HTTP 客户端类
 * 提供统一的 HTTP 请求接口，自动适配不同平台
 */
export class HttpClient {
  /** 默认配置 */
  private config: HttpRequestConfig = {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /** HTTP 适配器 */
  private adapter: IHttpAdapter;

  /** 请求拦截器管理器 */
  private requestInterceptors: InterceptorManager<
    RequestInterceptorFn,
    RequestErrorInterceptorFn
  >;

  /** 响应拦截器管理器 */
  private responseInterceptors: InterceptorManager<
    ResponseInterceptorFn,
    ResponseErrorInterceptorFn
  >;

  constructor(config?: HttpRequestConfig) {
    // 合并配置
    if (config) {
      this.config = { ...this.config, ...config };
    }

    // 创建适配器
    this.adapter = createAdapter();

    // 初始化拦截器管理器
    this.requestInterceptors = new InterceptorManager();
    this.responseInterceptors = new InterceptorManager();
  }

  /**
   * 设置基础 URL
   * @param url 基础 URL
   */
  setBaseURL(url: string): void {
    this.config.baseURL = url;
  }

  /**
   * 获取基础 URL
   * @returns 基础 URL
   */
  getBaseURL(): string | undefined {
    return this.config.baseURL;
  }

  /**
   * 设置默认请求头
   * @param headers 请求头
   */
  setHeaders(headers: Record<string, string>): void {
    this.config.headers = { ...this.config.headers, ...headers };
  }

  /**
   * 获取默认请求头
   * @returns 请求头
   */
  getHeaders(): Record<string, string> {
    return { ...this.config.headers };
  }

  /**
   * 设置超时时间
   * @param ms 超时时间（毫秒）
   */
  setTimeout(ms: number): void {
    this.config.timeout = ms;
  }

  /**
   * 获取超时时间
   * @returns 超时时间（毫秒）
   */
  getTimeout(): number | undefined {
    return this.config.timeout;
  }

  /**
   * 设置全局配置
   * @param config 配置对象
   */
  setConfig(config: Partial<HttpRequestConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取全局配置
   * @returns 配置对象
   */
  getConfig(): HttpRequestConfig {
    return { ...this.config };
  }

  /**
   * 创建新的 HTTP 客户端实例
   * @param config 配置对象
   * @returns 新的 HttpClient 实例
   */
  create(config?: HttpRequestConfig): HttpClient {
    const mergedConfig = { ...this.config, ...config };
    return new HttpClient(mergedConfig);
  }

  /**
   * 创建取消控制器
   * @returns AbortController 实例
   */
  createAbortController(): AbortController {
    return new AbortController();
  }

  /**
   * 拦截器接口
   */
  interceptors = {
    /**
     * 请求拦截器
     */
    request: {
      /**
       * 添加请求拦截器
       * @param onFulfilled 成功处理函数
       * @param onRejected 错误处理函数
       * @returns 拦截器 ID
       */
      use: (
        onFulfilled?: RequestInterceptorFn,
        onRejected?: RequestErrorInterceptorFn,
      ): number => {
        return this.requestInterceptors.use(onFulfilled, onRejected);
      },

      /**
       * 移除请求拦截器
       * @param id 拦截器 ID
       */
      eject: (id: number): void => {
        this.requestInterceptors.eject(id);
      },

      /**
       * 清除所有请求拦截器
       */
      clear: (): void => {
        this.requestInterceptors.clear();
      },
    },

    /**
     * 响应拦截器
     */
    response: {
      /**
       * 添加响应拦截器
       * @param onFulfilled 成功处理函数
       * @param onRejected 错误处理函数
       * @returns 拦截器 ID
       */
      use: (
        onFulfilled?: ResponseInterceptorFn,
        onRejected?: ResponseErrorInterceptorFn,
      ): number => {
        return this.responseInterceptors.use(onFulfilled, onRejected);
      },

      /**
       * 移除响应拦截器
       * @param id 拦截器 ID
       */
      eject: (id: number): void => {
        this.responseInterceptors.eject(id);
      },

      /**
       * 清除所有响应拦截器
       */
      clear: (): void => {
        this.responseInterceptors.clear();
      },
    },
  };

  /**
   * 发送 HTTP 请求
   * @param config 请求配置
   * @returns Promise<HttpResponse<T>>
   */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    // 合并配置
    let mergedConfig: HttpRequestConfig = {
      ...this.config,
      ...config,
      headers: {
        ...this.config.headers,
        ...config.headers,
      },
    };

    try {
      // 执行请求拦截器
      mergedConfig = await this.runRequestInterceptors(mergedConfig);

      // 发送请求
      let response = await this.executeRequest<T>(mergedConfig);

      // 执行响应拦截器
      response = await this.runResponseInterceptors(response);

      return response;
    } catch (error) {
      // 处理错误
      const httpError = this.normalizeError(error, mergedConfig);

      // 执行响应错误拦截器
      await this.runResponseErrorInterceptors(httpError);

      throw httpError;
    }
  }

  /**
   * 执行请求拦截器
   */
  private async runRequestInterceptors(
    config: HttpRequestConfig,
  ): Promise<HttpRequestConfig> {
    let currentConfig = config;

    for (const interceptor of this.requestInterceptors.getAll()) {
      if (interceptor.onFulfilled) {
        try {
          currentConfig = await interceptor.onFulfilled(currentConfig);
        } catch (error) {
          if (interceptor.onRejected) {
            await interceptor.onRejected(this.normalizeError(error, currentConfig));
          }
          throw error;
        }
      }
    }

    return currentConfig;
  }

  /**
   * 执行响应拦截器
   */
  private async runResponseInterceptors<T>(
    response: HttpResponse<T>,
  ): Promise<HttpResponse<T>> {
    let currentResponse: HttpResponse<T> = response;

    for (const interceptor of this.responseInterceptors.getAll()) {
      if (interceptor.onFulfilled) {
        currentResponse = (await interceptor.onFulfilled(currentResponse)) as HttpResponse<T>;
      }
    }

    return currentResponse;
  }

  /**
   * 执行响应错误拦截器
   */
  private async runResponseErrorInterceptors(error: HttpError): Promise<void> {
    for (const interceptor of this.responseInterceptors.getAll()) {
      if (interceptor.onRejected) {
        await interceptor.onRejected(error);
      }
    }
  }

  /**
   * 执行实际请求（带重试逻辑）
   */
  private async executeRequest<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const maxRetries = config.retryCount || 0;
    const retryDelay = config.retryDelay || 1000;
    let lastError: HttpError | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.adapter.request<T>(config);
      } catch (error) {
        lastError = this.normalizeError(error, config);

        // 不重试取消的请求
        if (lastError.code === ErrorCodes.CANCELLED) {
          throw lastError;
        }

        // 最后一次尝试，直接抛出错误
        if (attempt === maxRetries) {
          throw lastError;
        }

        // 等待后重试（指数退避）
        const delay = retryDelay * Math.pow(2, attempt);
        await this.sleep(delay);
      }
    }

    throw lastError || new HttpError('Unknown error', ErrorCodes.UNKNOWN);
  }

  /**
   * 规范化错误
   */
  private normalizeError(error: unknown, config: HttpRequestConfig): HttpError {
    if (error instanceof HttpError) {
      return error;
    }

    if (error instanceof Error) {
      return new HttpError(
        error.message,
        ErrorCodes.UNKNOWN,
        undefined,
        error,
        config,
      );
    }

    return new HttpError(
      'Unknown error',
      ErrorCodes.UNKNOWN,
      undefined,
      error,
      config,
    );
  }

  /**
   * 延迟函数
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * GET 请求
   * @param url 请求 URL
   * @param config 请求配置
   * @returns Promise<T>
   */
  async get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'GET' });
    return response.data;
  }

  /**
   * POST 请求
   * @param url 请求 URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<T>
   */
  async post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'POST', data });
    return response.data;
  }

  /**
   * PUT 请求
   * @param url 请求 URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<T>
   */
  async put<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'PUT', data });
    return response.data;
  }

  /**
   * DELETE 请求
   * @param url 请求 URL
   * @param config 请求配置
   * @returns Promise<T>
   */
  async delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'DELETE' });
    return response.data;
  }

  /**
   * PATCH 请求
   * @param url 请求 URL
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise<T>
   */
  async patch<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'PATCH', data });
    return response.data;
  }

  /**
   * 上传文件
   * @param url 上传 URL
   * @param config 上传配置
   * @returns Promise<T>
   */
  async upload<T = unknown>(
    url: string,
    config: Omit<UploadConfig, 'url'>,
  ): Promise<T> {
    if (!this.adapter.upload) {
      throw new HttpError(
        'Upload not supported on this platform',
        ErrorCodes.UNKNOWN,
      );
    }

    const uploadConfig: UploadConfig = {
      ...config,
      url,
      baseURL: this.config.baseURL,
      headers: { ...this.config.headers, ...config.headers },
      timeout: config.timeout || this.config.timeout,
    };

    const onProgress = (progress: UploadProgress): void => {
      config.onUploadProgress?.(progress.progress);
    };

    const response = await this.adapter.upload<T>(uploadConfig, onProgress);
    return response.data;
  }

  /**
   * 下载文件
   * @param url 下载 URL
   * @param config 下载配置
   * @returns Promise<T>
   */
  async download<T = unknown>(
    url: string,
    config?: Omit<DownloadConfig, 'url'>,
  ): Promise<T> {
    if (!this.adapter.download) {
      throw new HttpError(
        'Download not supported on this platform',
        ErrorCodes.UNKNOWN,
      );
    }

    const downloadConfig: DownloadConfig = {
      ...config,
      url,
      baseURL: this.config.baseURL,
      headers: { ...this.config.headers, ...config?.headers },
      timeout: config?.timeout || this.config.timeout,
    };

    const onProgress = (progress: DownloadProgress): void => {
      config?.onDownloadProgress?.(progress.progress);
    };

    const response = await this.adapter.download<T>(downloadConfig, onProgress);
    return response.data;
  }
}

/** 默认 HTTP 客户端实例 */
export const http = new HttpClient();

/** 默认导出 */
export default http;
