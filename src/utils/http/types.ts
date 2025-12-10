/**
 * Enhanced Request Types
 * Extended type definitions for the unified request client
 */

/** HTTP Methods */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/** Platform types */
export type Platform = 'web' | 'weapp' | 'alipay' | 'swan' | 'tt' | 'qq' | 'jd' | 'h5' | 'rn';

/** Request configuration */
export interface RequestConfig {
  /** Request URL */
  url: string;
  /** HTTP method */
  method?: HttpMethod;
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body data */
  data?: any;
  /** URL query parameters */
  params?: Record<string, any>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Response type */
  responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
  /** Enable credentials (cookies) */
  withCredentials?: boolean;
  /** Custom request metadata */
  meta?: Record<string, any>;
}

/** Response data structure */
export interface ResponseData<T = any> {
  /** Response data */
  data: T;
  /** HTTP status code */
  statusCode: number;
  /** Response headers */
  header: Record<string, string>;
  /** Error message (if any) */
  errMsg?: string;
  /** Response cookies */
  cookies?: string[];
}

/** Interceptor priority levels */
export type InterceptorPriority = 'low' | 'medium' | 'high' | number;

/** Request interceptor function with enhanced features */
export interface RequestInterceptor {
  /** Called before request is sent */
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  /** Called if request configuration fails */
  onRequestError?: (error: Error) => Error | Promise<Error>;
  /** Interceptor priority */
  priority?: InterceptorPriority;
  /** Interceptor group name */
  group?: string;
}

/** Response interceptor function with enhanced features */
export interface ResponseInterceptor {
  /** Called on successful response */
  onResponse?: <T>(response: ResponseData<T>) => ResponseData<T> | Promise<ResponseData<T>>;
  /** Called on response error */
  onResponseError?: (error: Error) => Error | Promise<Error>;
  /** Interceptor priority */
  priority?: InterceptorPriority;
  /** Interceptor group name */
  group?: string;
}

/** Interceptor registration result */
export interface InterceptorRegistration {
  /** ID of the registered interceptor */
  id: string;
  /** Function to remove the interceptor */
  eject: () => void;
}

/** Global interceptors manager */
export interface GlobalInterceptorsManager {
  /** Add a global request interceptor */
  useRequestInterceptor: (interceptor: RequestInterceptor) => InterceptorRegistration;
  /** Add a global response interceptor */
  useResponseInterceptor: (interceptor: ResponseInterceptor) => InterceptorRegistration;
  /** Remove all global interceptors */
  clearAll: () => void;
  /** Remove all interceptors by group */
  clearByGroup: (group: string) => void;
  /** Get all global request interceptors */
  getRequestInterceptors: () => Array<{ id: string } & RequestInterceptor>;
  /** Get all global response interceptors */
  getResponseInterceptors: () => Array<{ id: string } & ResponseInterceptor>;
}

/** Retry configuration */
export interface RetryConfig {
  /** Maximum number of retries */
  retries?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
  /** Function to determine if request should be retried */
  shouldRetry?: (error: Error, attempt: number) => boolean;
  /** Retry delay strategy */
  retryDelayStrategy?: 'fixed' | 'exponential' | 'linear';
  /** Maximum retry delay */
  maxRetryDelay?: number;
}

/** Cache configuration */
export interface CacheConfig {
  /** Enable caching */
  enabled?: boolean;
  /** Cache TTL in milliseconds */
  ttl?: number;
  /** Custom cache key generator */
  keyGenerator?: (config: RequestConfig) => string;
  /** Force refresh (bypass cache) */
  forceRefresh?: boolean;
}

/** Loading state configuration */
export interface LoadingConfig {
  /** Show global loading indicator */
  showLoading?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Loading delay (ms) before showing indicator */
  loadingDelay?: number;
}

/** Request options (extends config with additional features) */
export interface RequestOptions extends RequestConfig {
  /** Base URL to prepend */
  baseURL?: string;
  /** Retry configuration */
  retry?: RetryConfig;
  /** Cache configuration */
  cache?: CacheConfig;
  /** Loading state configuration */
  loading?: LoadingConfig;
  /** Cancel token for request cancellation */
  cancelToken?: AbortSignal;
  /** Request hooks */
  hooks?: {
    /** Before request sent */
    beforeRequest?: (config: RequestConfig) => void;
    /** After response received */
    afterResponse?: <T>(response: ResponseData<T>) => void;
    /** On request error */
    onError?: (error: Error) => void;
  };
}

/** Platform adapter interface */
export interface IRequestAdapter {
  /** Execute HTTP request */
  request<T = any>(config: RequestConfig): Promise<ResponseData<T>>;
  /** Upload file */
  upload?<T = any>(config: UploadConfig): Promise<ResponseData<T>>;
  /** Download file */
  download?<T = any>(config: DownloadConfig): Promise<ResponseData<T>>;
}

/** Upload configuration */
export interface UploadConfig extends Omit<RequestConfig, 'data'> {
  /** File path or file object */
  filePath: string | File;
  /** Form field name for file */
  name?: string;
  /** Additional form data */
  formData?: Record<string, any>;
  /** Upload progress callback */
  onProgress?: (progress: UploadProgress) => void;
}

/** Upload progress */
export interface UploadProgress {
  /** Upload progress percentage (0-100) */
  progress: number;
  /** Total bytes to upload */
  totalBytesSent: number;
  /** Bytes sent so far */
  totalBytesExpectedToSend: number;
}

/** Download configuration */
export interface DownloadConfig extends Omit<RequestConfig, 'data' | 'responseType'> {
  /** Download destination path */
  filePath?: string;
  /** Download progress callback */
  onProgress?: (progress: DownloadProgress) => void;
}

/** Download progress */
export interface DownloadProgress {
  /** Download progress percentage (0-100) */
  progress: number;
  /** Total bytes downloaded */
  totalBytesWritten: number;
  /** Expected total bytes */
  totalBytesExpectedToWrite: number;
}

/** HTTP client error */
export class HttpError extends Error {
  public requestId?: string;
  public timestamp: number;
  public retryAttempts?: number;
  public platform?: Platform;

  constructor(
    message: string,
    public statusCode?: number,
    public response?: ResponseData,
    public config?: RequestConfig,
    options?: { retryAttempts?: number; platform?: Platform; requestId?: string },
  ) {
    super(message);
    this.name = 'HttpError';
    this.timestamp = Date.now();
    this.retryAttempts = options?.retryAttempts;
    this.platform = options?.platform;
    this.requestId = options?.requestId;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      requestId: this.requestId,
      timestamp: this.timestamp,
      retryAttempts: this.retryAttempts,
      platform: this.platform,
      url: this.config?.url,
      method: this.config?.method,
      response: this.response,
    };
  }
}

/** Network error (no response received) */
export class NetworkError extends Error {
  public requestId?: string;
  public timestamp: number;
  public retryAttempts?: number;
  public platform?: Platform;

  constructor(
    message: string,
    public config?: RequestConfig,
    options?: { retryAttempts?: number; platform?: Platform; requestId?: string },
  ) {
    super(message);
    this.name = 'NetworkError';
    this.timestamp = Date.now();
    this.retryAttempts = options?.retryAttempts;
    this.platform = options?.platform;
    this.requestId = options?.requestId;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      requestId: this.requestId,
      timestamp: this.timestamp,
      retryAttempts: this.retryAttempts,
      platform: this.platform,
      url: this.config?.url,
      method: this.config?.method,
    };
  }
}

/** Timeout error */
export class TimeoutError extends Error {
  public requestId?: string;
  public timestamp: number;
  public retryAttempts?: number;
  public platform?: Platform;

  constructor(
    message: string,
    public timeout?: number,
    public config?: RequestConfig,
    options?: { retryAttempts?: number; platform?: Platform; requestId?: string },
  ) {
    super(message);
    this.name = 'TimeoutError';
    this.timestamp = Date.now();
    this.retryAttempts = options?.retryAttempts;
    this.platform = options?.platform;
    this.requestId = options?.requestId;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timeout: this.timeout,
      requestId: this.requestId,
      timestamp: this.timestamp,
      retryAttempts: this.retryAttempts,
      platform: this.platform,
      url: this.config?.url,
      method: this.config?.method,
    };
  }
}

/** Cancel error */
export class CancelError extends Error {
  public requestId?: string;
  public timestamp: number;
  public platform?: Platform;

  constructor(
    message: string = 'Request cancelled',
    public config?: RequestConfig,
    options?: { platform?: Platform; requestId?: string },
  ) {
    super(message);
    this.name = 'CancelError';
    this.timestamp = Date.now();
    this.platform = options?.platform;
    this.requestId = options?.requestId;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      requestId: this.requestId,
      timestamp: this.timestamp,
      platform: this.platform,
      url: this.config?.url,
      method: this.config?.method,
    };
  }
}

/** Request state (for hooks) */
export interface RequestState<T> {
  /** Response data */
  data: T | null;
  /** Error object */
  error: Error | null;
  /** Loading state */
  loading: boolean;
  /** Request has been called at least once */
  called: boolean;
}

/** Mutation state (for hooks) */
export interface MutationState<T, V = any> {
  /** Response data */
  data: T | null;
  /** Error object */
  error: Error | null;
  /** Loading state */
  loading: boolean;
  /** Mutation variables */
  variables: V | null;
}

/** Request hook options */
export interface UseRequestOptions<T> extends Omit<RequestOptions, 'url' | 'method' | 'data' | 'params'> {
  /** Manual mode - don't execute on mount */
  manual?: boolean;
  /** Default data value */
  initialData?: T;
  /** Dependencies array for auto-refetch */
  deps?: any[];
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Polling interval in milliseconds */
  pollingInterval?: number;
  /** Ready condition - only execute when true */
  ready?: boolean;
  /** Refresh dependencies - refetch when these change */
  refreshDeps?: any[];
  /** Format response data */
  formatResult?: (data: any) => T;
  /** Error handler */
  onError?: (error: Error) => void;
  /** Success handler */
  onSuccess?: (data: T) => void;
  /** Completion handler (success or error) */
  onCompleted?: (data: T | null, error: Error | null) => void;
}

/** Mutation hook options */
export interface UseMutationOptions<T, V = any> extends Omit<RequestOptions, 'url' | 'method' | 'data' | 'params'> {
  /** Optimistic update function */
  optimisticData?: (variables: V) => T;
  /** Rollback on error */
  rollbackOnError?: boolean;
  /** Error handler */
  onError?: (error: Error, variables: V) => void;
  /** Success handler */
  onSuccess?: (data: T, variables: V) => void;
  /** Before mutation */
  onMutate?: (variables: V) => void | Promise<void>;
  /** After mutation completes */
  onCompleted?: (data: T | null, error: Error | null, variables: V) => void;
}

/** Query key type */
export type QueryKey = string | readonly unknown[];
