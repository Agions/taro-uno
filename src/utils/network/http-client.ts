import { createApiInterceptor, buildSecureHeaders, isSecureUrl, secureRetry } from '@/utils/security/api-security';
import { ErrorHandlingManager } from '@/utils/error-handler';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  baseUrl?: string;
}

export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  data?: any;
}

interface ResponseData {
  status: number;
  ok: boolean;
  headers: Headers;
  data: any;
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ResponseInterceptor = (response: ResponseData) => ResponseData;

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private errorManager = ErrorHandlingManager.getInstance();
  private security = createApiInterceptor();
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = config.baseUrl || '';
    this.defaultHeaders = config.headers || {};
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const method = (options.method || 'GET').toUpperCase() as HttpMethod;
    const base = options.baseUrl ?? this.baseUrl;
    const fullUrl = this.buildUrl(base, url, options.params);
    if (!isSecureUrl(fullUrl)) {
      throw this.errorManager.createAuthorizationError('insecure_url');
    }

    const headers = {
      ...this.defaultHeaders,
      ...(options.headers || {}),
      ...buildSecureHeaders(method, fullUrl, options.data)
    };

    let config: RequestConfig = { method, url: fullUrl, headers, data: options.data };
    config = this.security.request.execute(config);
    for (const it of this.requestInterceptors) config = it(config);

    const doFetch = async () => {
      const controller = new AbortController();
      const timeout = options.timeout ?? 15000;
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const resp = await fetch(config.url, {
          method: config.method,
          headers: config.headers,
          body: config.method === 'GET' ? null : JSON.stringify(config.data ?? {}),
          signal: controller.signal
        });
        const wrapped = { status: resp.status, ok: resp.ok, headers: resp.headers, data: await this.parseBody(resp) };
        let processed = this.security.response.execute(wrapped);
        for (const it of this.responseInterceptors) processed = it(processed);
        if (!resp.ok) {
          const err = new Error(`HTTP ${resp.status}`);
          this.errorManager.handleError(err);
          throw err;
        }
        return processed.data as T;
      } finally {
        clearTimeout(timer);
      }
    };

    const retries = options.retries ?? (method === 'GET' ? 3 : 0);
    const retryDelay = options.retryDelay ?? 500;
    return await secureRetry(doFetch, retries, retryDelay);
  }

  get<T>(url: string, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  post<T>(url: string, data?: any, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'POST', data });
  }

  put<T>(url: string, data?: any, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'PUT', data });
  }

  patch<T>(url: string, data?: any, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'PATCH', data });
  }

  delete<T>(url: string, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  private buildUrl(base: string, url: string, params?: Record<string, any>): string {
    const root = base ? base.replace(/\/$/, '') : '';
    const path = url.startsWith('http') ? url : `${root}${url.startsWith('/') ? url : `/${url}`}`;
    if (!params || Object.keys(params).length === 0) return path;
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) v.forEach(x => usp.append(k, String(x)));
      else usp.append(k, String(v));
    });
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}${usp.toString()}`;
  }

  private async parseBody(resp: Response): Promise<any> {
    const ct = resp.headers.get('content-type') || '';
    if (ct.includes('application/json')) return resp.json();
    const text = await resp.text();
    try { return JSON.parse(text); } catch { return text; }
  }
}

export const httpClient = new HttpClient();
export default HttpClient;
