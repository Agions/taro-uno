/**
 * Unified Request Client
 * Production-ready HTTP client with multi-platform support, caching, retry logic, and interceptors
 */

import { ErrorHandlingManager } from '@/utils/error-handler';
import { createApiInterceptor, buildSecureHeaders, isSecureUrl } from '@/utils/security/api-security';
import { TaroAdapter } from './taro-adapter';
import { WebAdapter } from './web-adapter';
import { RequestCache } from './request-cache';
import type {
  RequestConfig,
  RequestOptions,
  ResponseData,
  IRequestAdapter,
  RequestInterceptor,
  ResponseInterceptor,
  RetryConfig,
} from './types';
import {
  HttpError,
  NetworkError,
  TimeoutError,
  CancelError,
} from './types';

export interface UnifiedRequestClientConfig {
  /** Base URL for all requests */
  baseURL?: string;
  /** Default headers */
  headers?: Record<string, string>;
  /** Default timeout in milliseconds */
  timeout?: number;
  /** Custom adapter */
  adapter?: IRequestAdapter;
  /** Enable request caching */
  enableCache?: boolean;
  /** Default cache TTL */
  cacheTTL?: number;
  /** Default retry configuration */
  retry?: RetryConfig;
  /** Enable security features */
  enableSecurity?: boolean;
}

/**
 * Unified Request Client
 * 
 * @example
 * ```typescript
 * const client = new UnifiedRequestClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 10000,
 *   enableCache: true,
 * });
 * 
 * // GET request
 * const data = await client.get<User>('/users/1');
 * 
 * // POST request
 * const created = await client.post<User>('/users', { name: 'John' });
 * ```
 */
export class UnifiedRequestClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;
  private adapter: IRequestAdapter;
  private cache: RequestCache;
  private errorManager: ReturnType<typeof ErrorHandlingManager.getInstance>;
  private security: ReturnType<typeof createApiInterceptor>;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private defaultRetryConfig: RetryConfig;
  private enableSecurity: boolean;
  private enableCache: boolean;
  private cacheTTL: number;

  constructor(config: UnifiedRequestClientConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.defaultHeaders = config.headers || {
      'Content-Type': 'application/json',
    };
    this.defaultTimeout = config.timeout || 10000;
    this.adapter = config.adapter || this.detectAdapter();
    this.cache = new RequestCache();
    this.errorManager = ErrorHandlingManager.getInstance();
    this.security = createApiInterceptor();
    this.enableSecurity = config.enableSecurity !== false;
    this.enableCache = config.enableCache || false;
    this.cacheTTL = config.cacheTTL || 5 * 60 * 1000; // 5 minutes default
    this.defaultRetryConfig = {
      retries: 3,
      retryDelay: 1000,
      retryDelayStrategy: 'exponential',
      maxRetryDelay: 10000,
      shouldRetry: (error, _attempt) => {
        // Retry on network errors and 5xx errors
        if (error.name === 'NetworkError' || error.name === 'TimeoutError') return true;
        if ((error as any).statusCode >= 500 && (error as any).statusCode < 600) return true;
        return false;
      },
      ...config.retry,
    };
  }

  /**
   * Detect appropriate adapter based on environment
   */
  private detectAdapter(): IRequestAdapter {
    // Check Taro environment
    if (typeof process !== 'undefined' && process.env['TARO_ENV']) {
      const taroEnv = process.env['TARO_ENV'];
      if (taroEnv === 'h5' || taroEnv === 'web') {
        return new WebAdapter();
      }
      return new TaroAdapter();
    }

    // Check for browser environment
    if (typeof window !== 'undefined' && typeof window.fetch !== 'undefined') {
      return new WebAdapter();
    }

    // Default to Taro adapter
    return new TaroAdapter();
  }

  /**
   * Add request interceptor
   */
  useRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    // Return cleanup function
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.requestInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Add response interceptor
   */
  useResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    // Return cleanup function
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Build full URL from base and relative URL
   */
  private buildURL(url: string, params?: Record<string, any>): string {
    // If URL is absolute, use it directly
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return this.appendParams(url, params);
    }

    // Build URL with baseURL
    const base = this.baseURL.replace(/\/$/, '');
    const path = url.startsWith('/') ? url : `/${url}`;
    const fullURL = `${base}${path}`;

    return this.appendParams(fullURL, params);
  }

  /**
   * Append query parameters to URL
   */
  private appendParams(url: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    });

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${searchParams.toString()}`;
  }

  /**
   * Calculate retry delay based on strategy
   */
  private calculateRetryDelay(attempt: number, config: RetryConfig): number {
    const { retryDelay = 1000, retryDelayStrategy = 'exponential', maxRetryDelay = 10000 } = config;

    let delay: number;
    switch (retryDelayStrategy) {
      case 'exponential':
        delay = retryDelay * Math.pow(2, attempt - 1);
        break;
      case 'linear':
        delay = retryDelay * attempt;
        break;
      case 'fixed':
      default:
        delay = retryDelay;
    }

    return Math.min(delay, maxRetryDelay);
  }

  /**
   * Execute request with retry logic
   */
  private async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    retryConfig: RetryConfig,
  ): Promise<T> {
    const { retries = 0, shouldRetry } = retryConfig;
    let lastError: Error;

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;

        // Don't retry if it's the last attempt
        if (attempt > retries) break;

        // Check if we should retry this error
        if (shouldRetry && !shouldRetry(lastError, attempt)) break;

        // Wait before retrying
        const delay = this.calculateRetryDelay(attempt, retryConfig);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Execute HTTP request
   */
  async request<T = any>(options: RequestOptions): Promise<T> {
    // Merge options with defaults
    const config: RequestConfig = {
      method: options.method || 'GET',
      url: this.buildURL(options.url, options.params),
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      data: options.data,
      timeout: options.timeout || this.defaultTimeout,
      responseType: options.responseType,
      withCredentials: options.withCredentials,
      meta: options.meta,
    };

    // Security check
    if (this.enableSecurity && !isSecureUrl(config.url)) {
      throw this.errorManager.createAuthorizationError('insecure_url');
    }

    // Add security headers
    if (this.enableSecurity && config.headers) {
      Object.assign(config.headers, buildSecureHeaders(config.method!, config.url, config.data));
    }

    // Check cache for GET requests
    const cacheEnabled = options.cache?.enabled !== false && this.enableCache;
    const forceRefresh = options.cache?.forceRefresh || false;

    if (cacheEnabled && config.method === 'GET' && !forceRefresh) {
      const cacheKey = this.cache.generateKey(config.url, config.data);

      // Check if there's a pending request for this key
      if (this.cache.hasPendingRequest(cacheKey)) {
        return this.cache.getPendingRequest<T>(cacheKey)!;
      }

      // Check cache
      const cached = this.cache.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    // Execute request interceptors
    let processedConfig = config;
    if (this.enableSecurity) {
      processedConfig = this.security.request.execute(processedConfig);
    }

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        try {
          processedConfig = await interceptor.onRequest(processedConfig);
        } catch (error) {
          if (interceptor.onRequestError) {
            throw await interceptor.onRequestError(error as Error);
          }
          throw error;
        }
      }
    }

    // Call before request hook
    options.hooks?.beforeRequest?.(processedConfig);

    // Create request function
    const doRequest = async (): Promise<T> => {
      let response: ResponseData<T>;

      try {
        response = await this.adapter.request<T>(processedConfig);
      } catch (error) {
        // Transform to appropriate error type
        if ((error as any).name === 'AbortError' || (error as any).name === 'CancelError') {
          throw new (CancelError as any)('Request cancelled');
        }
        if ((error as any).name === 'TimeoutError' || (error as any).message?.includes('timeout')) {
          throw new (TimeoutError as any)('Request timeout', processedConfig.timeout, processedConfig);
        }
        throw new (NetworkError as any)('Network error', processedConfig);
      }

      // Execute response interceptors
      let processedResponse = response;
      if (this.enableSecurity) {
        processedResponse = this.security.response.execute(processedResponse);
      }

      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponse) {
          try {
            processedResponse = await interceptor.onResponse(processedResponse);
          } catch (error) {
            if (interceptor.onResponseError) {
              throw await interceptor.onResponseError(error as Error);
            }
            throw error;
          }
        }
      }

      // Check response status
      if (processedResponse.statusCode < 200 || processedResponse.statusCode >= 300) {
        const error = new (HttpError as any)(
          processedResponse.errMsg || `HTTP ${processedResponse.statusCode}`,
          processedResponse.statusCode,
          processedResponse,
          processedConfig,
        );
        this.errorManager.handleError(error);
        throw error;
      }

      // Call after response hook
      options.hooks?.afterResponse?.(processedResponse);

      return processedResponse.data;
    };

    // Determine retry config
    const retryConfig: RetryConfig = {
      ...this.defaultRetryConfig,
      ...options.retry,
    };

    // Execute request with retry and caching
    const requestPromise = this.executeWithRetry(doRequest, retryConfig);

    // Store pending request for de-duplication
    if (cacheEnabled && config.method === 'GET') {
      const cacheKey = this.cache.generateKey(config.url, config.data);
      this.cache.setPendingRequest(cacheKey, requestPromise);
    }

    try {
      const data = await requestPromise;

      // Cache successful GET responses
      if (cacheEnabled && config.method === 'GET' && data !== null && data !== undefined) {
        const cacheKey = this.cache.generateKey(config.url, config.data);
        const cacheTTL = options.cache?.ttl || this.cacheTTL;
        this.cache.set(cacheKey, data, cacheTTL);
      }

      return data;
    } catch (error) {
      // Call error hook
      options.hooks?.onError?.(error as Error);
      throw error;
    }
  }

  /**
   * GET request
   */
  get<T = any>(url: string, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  post<T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'POST',
      data,
    });
  }

  /**
   * PUT request
   */
  put<T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'PUT',
      data,
    });
  }

  /**
   * PATCH request
   */
  patch<T = any>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'PATCH',
      data,
    });
  }

  /**
   * DELETE request
   */
  delete<T = any>(url: string, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>({
      ...options,
      url,
      method: 'DELETE',
    });
  }

  /**
   * Clear cache
   */
  clearCache(url?: string, params?: any): void {
    if (url) {
      const key = this.cache.generateKey(url, params);
      this.cache.clear(key);
    } else {
      this.cache.clearAll();
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getStats();
  }
}

// Create default instance
export const request = new UnifiedRequestClient();

// Export for customization
export default UnifiedRequestClient;
