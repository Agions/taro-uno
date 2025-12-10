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
  HttpMethod,
  Platform,
  InterceptorPriority,
  InterceptorRegistration,
} from './types';
import { HttpError, NetworkError, TimeoutError, CancelError } from './types';

export interface RequestInstanceConfig {
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
 * const client = new Request({
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
export class Request {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;
  private adapter: IRequestAdapter;
  private cache: RequestCache;
  private errorManager: ReturnType<typeof ErrorHandlingManager.getInstance>;
  private security: ReturnType<typeof createApiInterceptor>;
  private requestInterceptors: Array<{ id: string } & RequestInterceptor> = [];
  private responseInterceptors: Array<{ id: string } & ResponseInterceptor> = [];
  private static globalRequestInterceptors: Array<{ id: string } & RequestInterceptor> = [];
  private static globalResponseInterceptors: Array<{ id: string } & ResponseInterceptor> = [];
  private defaultRetryConfig: RetryConfig;
  private enableSecurity: boolean;
  private enableCache: boolean;
  private cacheTTL: number;

  constructor(
    config: RequestInstanceConfig & {
      _testing?: {
        cache?: RequestCache;
        errorManager?: any;
        security?: any;
      };
    } = {},
  ) {
    this.baseURL = config.baseURL || '';
    this.defaultHeaders = config.headers || {
      'Content-Type': 'application/json',
    };
    this.defaultTimeout = config.timeout || 10000;
    this.adapter = config.adapter || this.detectAdapter();

    // Allow external dependencies injection for testing via _testing property
    const testingConfig = config._testing || {};
    this.cache = testingConfig.cache || new RequestCache();
    this.errorManager = testingConfig.errorManager || ErrorHandlingManager.getInstance();
    this.security = testingConfig.security || createApiInterceptor();

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
   * Convert priority string to number
   */
  private getPriorityValue(priority: InterceptorPriority): number {
    if (typeof priority === 'number') {
      return priority;
    }
    switch (priority) {
      case 'high':
        return 100;
      case 'medium':
        return 50;
      case 'low':
      default:
        return 0;
    }
  }

  /**
   * Sort interceptors by priority
   */
  private sortInterceptors<T extends { priority?: InterceptorPriority }>(interceptors: T[]): T[] {
    return [...interceptors].sort((a, b) => {
      const priorityA = this.getPriorityValue(a.priority || 'medium');
      const priorityB = this.getPriorityValue(b.priority || 'medium');
      return priorityB - priorityA; // Higher priority comes first
    });
  }

  /**
   * Add request interceptor with enhanced features
   */
  useRequestInterceptor(interceptor: RequestInterceptor): InterceptorRegistration {
    const interceptorWithId = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...interceptor,
    };

    this.requestInterceptors.push(interceptorWithId);

    // Return cleanup function with registration info
    return {
      id: interceptorWithId.id,
      eject: () => {
        const index = this.requestInterceptors.findIndex((i) => i.id === interceptorWithId.id);
        if (index > -1) {
          this.requestInterceptors.splice(index, 1);
        }
      },
    };
  }

  /**
   * Add response interceptor with enhanced features
   */
  useResponseInterceptor(interceptor: ResponseInterceptor): InterceptorRegistration {
    const interceptorWithId = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...interceptor,
    };

    this.responseInterceptors.push(interceptorWithId);

    // Return cleanup function with registration info
    return {
      id: interceptorWithId.id,
      eject: () => {
        const index = this.responseInterceptors.findIndex((i) => i.id === interceptorWithId.id);
        if (index > -1) {
          this.responseInterceptors.splice(index, 1);
        }
      },
    };
  }

  /**
   * Add global request interceptor (shared across all instances)
   */
  static useGlobalRequestInterceptor(interceptor: RequestInterceptor): InterceptorRegistration {
    const interceptorWithId = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...interceptor,
    };

    Request.globalRequestInterceptors.push(interceptorWithId);

    return {
      id: interceptorWithId.id,
      eject: () => {
        const index = Request.globalRequestInterceptors.findIndex((i: { id: string }) => i.id === interceptorWithId.id);
        if (index > -1) {
          Request.globalRequestInterceptors.splice(index, 1);
        }
      },
    };
  }

  /**
   * Add global response interceptor (shared across all instances)
   */
  static useGlobalResponseInterceptor(interceptor: ResponseInterceptor): InterceptorRegistration {
    const interceptorWithId = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...interceptor,
    };

    Request.globalResponseInterceptors.push(interceptorWithId);

    return {
      id: interceptorWithId.id,
      eject: () => {
        const index = Request.globalResponseInterceptors.findIndex((i: { id: string }) => i.id === interceptorWithId.id);
        if (index > -1) {
          Request.globalResponseInterceptors.splice(index, 1);
        }
      },
    };
  }

  /**
   * Clear all interceptors or by group
   */
  clearInterceptors(group?: string): void {
    if (group) {
      this.requestInterceptors = this.requestInterceptors.filter((i) => i.group !== group);
      this.responseInterceptors = this.responseInterceptors.filter((i) => i.group !== group);
    } else {
      this.requestInterceptors = [];
      this.responseInterceptors = [];
    }
  }

  /**
   * Clear all global interceptors or by group
   */
  static clearGlobalInterceptors(group?: string): void {
    if (group) {
      Request.globalRequestInterceptors = Request.globalRequestInterceptors.filter((i: { group?: string }) => i.group !== group);
      Request.globalResponseInterceptors = Request.globalResponseInterceptors.filter((i: { group?: string }) => i.group !== group);
    } else {
      Request.globalRequestInterceptors = [];
      Request.globalResponseInterceptors = [];
    }
  }

  /**
   * Get all interceptors
   */
  getInterceptors() {
    return {
      request: [...this.requestInterceptors],
      response: [...this.responseInterceptors],
    };
  }

  /**
   * Get all global interceptors
   */
  static getGlobalInterceptors() {
    return {
      request: [...Request.globalRequestInterceptors],
      response: [...Request.globalResponseInterceptors],
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
        value.forEach((item) => searchParams.append(key, String(item)));
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
  private async executeWithRetry<T>(requestFn: () => Promise<T>, retryConfig: RetryConfig): Promise<T> {
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
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Build request config from options
   */
  private buildRequestConfig(options: RequestOptions, method?: HttpMethod): RequestConfig {
    return {
      method: method || options.method || 'GET',
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
  }

  /**
   * Perform security checks and add security headers
   */
  private performSecurityCheck(config: RequestConfig, options: RequestOptions): void {
    // Security check
    if (this.enableSecurity && !isSecureUrl(config.url)) {
      const error = this.errorManager.createAuthorizationError('insecure_url');
      options.hooks?.onError?.(error);
      throw error;
    }

    // Add security headers
    if (this.enableSecurity && config.headers) {
      Object.assign(config.headers, buildSecureHeaders(config.method!, config.url, config.data));
    }
  }

  /**
   * Execute request interceptors with global + instance interceptors and priority support
   */
  private async executeRequestInterceptors(config: RequestConfig, options: RequestOptions): Promise<RequestConfig> {
    let processedConfig = config;

    // Merge global and instance interceptors, then sort by priority
    const allRequestInterceptors = this.sortInterceptors([
      ...Request.globalRequestInterceptors,
      ...this.requestInterceptors,
    ]);

    try {
      // Security interceptor first
      if (this.enableSecurity) {
        processedConfig = this.security.request.execute(processedConfig);
      }

      // Execute all request interceptors in order
      for (const interceptor of allRequestInterceptors) {
        if (interceptor.onRequest) {
          processedConfig = await interceptor.onRequest(processedConfig);
        }
      }

      // Call before request hook
      options.hooks?.beforeRequest?.(processedConfig);
    } catch (error) {
      // Handle interceptor errors in reverse order
      const reversedInterceptors = [...allRequestInterceptors].reverse();
      for (const interceptor of reversedInterceptors) {
        if (interceptor.onRequestError) {
          try {
            error = await interceptor.onRequestError(error as Error);
          } catch (e) {
            // If an error interceptor throws, continue with the original error
            console.warn('Request interceptor error handler failed:', e);
          }
        }
      }

      options.hooks?.onError?.(error as Error);
      throw error;
    }
    return processedConfig;
  }

  /**
   * Execute response interceptors with global + instance interceptors and priority support
   */
  private async executeResponseInterceptors<T>(
    response: ResponseData<T>,
    options: RequestOptions,
  ): Promise<ResponseData<T>> {
    let processedResponse = response;

    // Merge global and instance interceptors, then sort by priority
    const allResponseInterceptors = this.sortInterceptors([
      ...Request.globalResponseInterceptors,
      ...this.responseInterceptors,
    ]);

    try {
      // Security interceptor first
      if (this.enableSecurity) {
        processedResponse = this.security.response.execute(processedResponse);
      }

      // Execute all response interceptors in order
      for (const interceptor of allResponseInterceptors) {
        if (interceptor.onResponse) {
          processedResponse = await interceptor.onResponse(processedResponse);
        }
      }
    } catch (error) {
      // Handle response interceptor errors in reverse order
      const reversedInterceptors = [...allResponseInterceptors].reverse();
      for (const interceptor of reversedInterceptors) {
        if (interceptor.onResponseError) {
          try {
            error = await interceptor.onResponseError(error as Error);
          } catch (e) {
            // If an error interceptor throws, continue with the original error
            console.warn('Response interceptor error handler failed:', e);
          }
        }
      }

      options.hooks?.onError?.(error as Error);
      throw error;
    }
    return processedResponse;
  }

  /**
   * Handle request error
   */
  private handleRequestError(error: any, config: RequestConfig, options: RequestOptions, operation: string): never {
    // Generate unique request ID for tracing
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Get platform info
    const platform = ((typeof process !== 'undefined' && process.env['TARO_ENV']) as Platform) || 'web';

    // Transform to appropriate error type
    if ((error as any).name === 'AbortError' || (error as any).name === 'CancelError') {
      const cancelError = new CancelError(`${operation} cancelled`, config, { platform, requestId });
      options.hooks?.onError?.(cancelError);
      throw cancelError;
    }
    if ((error as any).name === 'TimeoutError' || (error as any).message?.includes('timeout')) {
      const timeoutError = new TimeoutError(`${operation} timeout`, config.timeout, config, { platform, requestId });
      options.hooks?.onError?.(timeoutError);
      throw timeoutError;
    }
    const networkError = new NetworkError(`Network error during ${operation}`, config, { platform, requestId });
    options.hooks?.onError?.(networkError);
    throw networkError;
  }

  /**
   * Handle response status
   */
  private handleResponseStatus<T>(response: ResponseData<T>, config: RequestConfig, options: RequestOptions): void {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      // Generate unique request ID for tracing
      const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Get platform info
      const platform = ((typeof process !== 'undefined' && process.env['TARO_ENV']) as Platform) || 'web';

      const error = new HttpError(
        response.errMsg || `HTTP ${response.statusCode}`,
        response.statusCode,
        response,
        config,
        { platform, requestId },
      );
      this.errorManager.handleError(error);
      options.hooks?.onError?.(error);
      throw error;
    }
  }

  /**
   * Execute HTTP request
   */
  async request<T = any>(options: RequestOptions): Promise<T> {
    // Build request config
    const config: RequestConfig = this.buildRequestConfig(options);

    // Perform security checks
    this.performSecurityCheck(config, options);

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
        options.hooks?.afterResponse?.({
          data: cached,
          statusCode: 200,
          header: {},
          errMsg: 'Success',
          cookies: [],
        });
        return cached;
      }

      // Execute request with caching
      const result = await this.executeRequestWithCommonLogic<T>(
        options,
        config.method as HttpMethod,
        (processedConfig) => this.adapter.request<T>(processedConfig),
        cacheKey,
      );

      // Cache successful GET responses
      if (result !== null && result !== undefined) {
        const cacheTTL = options.cache?.ttl || this.cacheTTL;
        this.cache.set(cacheKey, result, cacheTTL);
      }

      return result;
    }

    // Execute request without caching
    return this.executeRequestWithCommonLogic<T>(options, config.method as HttpMethod, (processedConfig) =>
      this.adapter.request<T>(processedConfig),
    );
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
   * Upload file
   */
  async upload<T = any>(
    options: RequestOptions & {
      filePath: string | File;
      name?: string;
      formData?: Record<string, any>;
      onProgress?: (progress: { progress: number; totalBytesSent: number; totalBytesExpectedToSend: number }) => void;
    },
  ): Promise<T> {
    return this.executeRequestWithCommonLogic<T>(options, 'POST', (processedConfig) => {
      if (this.adapter.upload) {
        return this.adapter.upload({
          ...processedConfig,
          filePath: options.filePath,
          name: options.name,
          formData: options.formData,
          onProgress: options.onProgress,
        });
      } else {
        throw new Error('Upload adapter not supported');
      }
    });
  }

  /**
   * Download file
   */
  async download<T = any>(
    options: RequestOptions & {
      filePath?: string;
      onProgress?: (progress: {
        progress: number;
        totalBytesWritten: number;
        totalBytesExpectedToWrite: number;
      }) => void;
    },
  ): Promise<T> {
    return this.executeRequestWithCommonLogic<T>(options, 'GET', (processedConfig) => {
      if (this.adapter.download) {
        return this.adapter.download({
          ...processedConfig,
          filePath: options.filePath,
          onProgress: options.onProgress,
        });
      } else {
        throw new Error('Download adapter not supported');
      }
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

  /**
   * Execute request with common logic
   */
  private async executeRequestWithCommonLogic<T = any>(
    options: RequestOptions,
    method: HttpMethod,
    requestFn: (config: RequestConfig) => Promise<ResponseData<T>>,
    cacheKey?: string,
  ): Promise<T> {
    // Build request config
    const config: RequestConfig = this.buildRequestConfig(options, method);

    // Perform security checks
    this.performSecurityCheck(config, options);

    // Execute request interceptors
    const processedConfig = await this.executeRequestInterceptors(config, options);

    // Create request function
    const doRequest = async (): Promise<T> => {
      let response: ResponseData<T>;

      try {
        response = await requestFn(processedConfig);
      } catch (error) {
        this.handleRequestError(error, processedConfig, options, method.toLowerCase());
      }

      // Execute response interceptors
      const processedResponse = await this.executeResponseInterceptors(response, options);

      // Check response status
      this.handleResponseStatus(processedResponse, processedConfig, options);

      // Call after response hook
      options.hooks?.afterResponse?.(processedResponse);

      return processedResponse.data;
    };

    // Determine retry config
    const retryConfig: RetryConfig = {
      ...this.defaultRetryConfig,
      ...options.retry,
    };

    // Execute request with retry
    const requestPromise = this.executeWithRetry(doRequest, retryConfig);

    // Store pending request for de-duplication (not just for GET requests)
    if (cacheKey) {
      this.cache.setPendingRequest(cacheKey, requestPromise);
    }

    try {
      return await requestPromise;
    } catch (error) {
      // Call error hook
      options.hooks?.onError?.(error as Error);
      throw error;
    }
  }

  /**
   * Set default headers
   */
  setDefaultHeaders(headers: Record<string, string>): this {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
    return this;
  }

  /**
   * Update default header
   */
  updateDefaultHeader(key: string, value: string): this {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Remove default header
   */
  removeDefaultHeader(key: string): this {
    delete this.defaultHeaders[key];
    return this;
  }

  /**
   * Set default timeout
   */
  setDefaultTimeout(timeout: number): this {
    this.defaultTimeout = timeout;
    return this;
  }

  /**
   * Enable/disable security features
   */
  setSecurityEnabled(enabled: boolean): this {
    this.enableSecurity = enabled;
    return this;
  }

  /**
   * Enable/disable cache
   */
  setCacheEnabled(enabled: boolean): this {
    this.enableCache = enabled;
    return this;
  }

  /**
   * Set default cache TTL
   */
  setDefaultCacheTTL(ttl: number): this {
    this.cacheTTL = ttl;
    return this;
  }

  /**
   * Set authorization header with token
   */
  setAuthToken(token: string, type: string = 'Bearer'): this {
    this.defaultHeaders['Authorization'] = `${type} ${token}`;
    return this;
  }

  /**
   * Clear authorization header
   */
  clearAuthToken(): this {
    delete this.defaultHeaders['Authorization'];
    return this;
  }

  /**
   * Set base URL
   */
  setBaseURL(baseURL: string): this {
    this.baseURL = baseURL;
    return this;
  }

  /**
   * Create a new client instance with merged config
   */
  createInstance(config: RequestInstanceConfig = {}): Request {
    return new Request({
      baseURL: config.baseURL || this.baseURL,
      headers: { ...this.defaultHeaders, ...config.headers },
      timeout: config.timeout || this.defaultTimeout,
      adapter: config.adapter || this.adapter,
      enableCache: config.enableCache !== undefined ? config.enableCache : this.enableCache,
      cacheTTL: config.cacheTTL || this.cacheTTL,
      retry: { ...this.defaultRetryConfig, ...config.retry },
      enableSecurity: config.enableSecurity !== undefined ? config.enableSecurity : this.enableSecurity,
    });
  }

  /**
   * Quick GET request with simplified API
   */
  quickGet<T = any>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      headers,
    });
  }

  /**
   * Quick POST request with simplified API
   */
  quickPost<T = any>(url: string, data?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      headers,
    });
  }
}

// Create default instance
export const request = new Request();

// Export for customization - removed default export to maintain naming consistency
