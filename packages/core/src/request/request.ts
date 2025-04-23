import Taro from '@tarojs/taro';

// 请求配置接口
export interface RequestConfig extends Omit<Taro.request.Option, 'success' | 'fail' | 'complete'> {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// 响应接口
export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

// 默认配置
const defaultConfig: RequestConfig = {
  baseURL: '',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// 实例配置
let instanceConfig: RequestConfig = { ...defaultConfig };

// 设置全局配置
export function setConfig(config: RequestConfig): void {
  instanceConfig = {
    ...instanceConfig,
    ...config
  };
}

// 请求拦截器
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
const requestInterceptors: RequestInterceptor[] = [];

// 响应拦截器
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ResponseErrorInterceptor = (error: any) => any;
const responseInterceptors: ResponseInterceptor[] = [];
const responseErrorInterceptors: ResponseErrorInterceptor[] = [];

// 添加请求拦截器
export function addRequestInterceptor(interceptor: RequestInterceptor): void {
  requestInterceptors.push(interceptor);
}

// 添加响应拦截器
export function addResponseInterceptor(
  onFulfilled: ResponseInterceptor,
  onRejected?: ResponseErrorInterceptor
): void {
  responseInterceptors.push(onFulfilled);
  if (onRejected) {
    responseErrorInterceptors.push(onRejected);
  }
}

// 规范化处理URL
function normalizeURL(url: string, baseURL?: string): string {
  if (!url) return '';
  if (/^https?:\/\//.test(url)) return url;
  
  const base = baseURL || instanceConfig.baseURL || '';
  if (!base) return url;
  
  return base.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}

// 合并请求头
function mergeHeaders(
  headers1?: Record<string, string>,
  headers2?: Record<string, string>
): Record<string, string> {
  return {
    ...(headers1 || {}),
    ...(headers2 || {})
  };
}

// 异步处理请求拦截器
async function processRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
  let processedConfig = { ...config };
  
  for (const interceptor of requestInterceptors) {
    processedConfig = await interceptor(processedConfig);
  }
  
  return processedConfig;
}

// 异步处理响应拦截器
async function processResponseInterceptors(response: Response): Promise<Response> {
  let processedResponse = { ...response };
  
  for (const interceptor of responseInterceptors) {
    processedResponse = await interceptor(processedResponse);
  }
  
  return processedResponse;
}

// 异步处理响应错误拦截器
async function processResponseErrorInterceptors(error: any): Promise<any> {
  let processedError = error;
  
  for (const interceptor of responseErrorInterceptors) {
    try {
      processedError = await interceptor(processedError);
    } catch (e) {
      processedError = e;
    }
  }
  
  return Promise.reject(processedError);
}

// 创建请求实例
export async function request<T = any>(config: RequestConfig): Promise<Response<T>> {
  try {
    // 合并配置
    const mergedConfig: RequestConfig = {
      ...instanceConfig,
      ...config,
      headers: mergeHeaders(instanceConfig.headers, config.headers),
      url: normalizeURL(config.url || '', config.baseURL)
    };
    
    // 处理请求拦截器
    const processedConfig = await processRequestInterceptors(mergedConfig);
    
    // 发起请求
    return new Promise<Response<T>>((resolve, reject) => {
      Taro.request({
        ...processedConfig,
        success: async (res) => {
          const response: Response<T> = {
            data: res.data,
            status: res.statusCode,
            statusText: String(res.statusCode),
            headers: res.header as Record<string, string>,
            config: processedConfig
          };
          
          try {
            // 处理响应拦截器
            const processedResponse = await processResponseInterceptors(response);
            resolve(processedResponse);
          } catch (error) {
            reject(error);
          }
        },
        fail: async (err) => {
          try {
            // 处理响应错误拦截器
            const processedError = await processResponseErrorInterceptors(err);
            reject(processedError);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  } catch (error) {
    return processResponseErrorInterceptors(error);
  }
}

// 便捷方法: GET
export function get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<Response<T>> {
  return request<T>({
    method: 'GET',
    url,
    data: params,
    ...config
  });
}

// 便捷方法: POST
export function post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>> {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...config
  });
}

// 便捷方法: PUT
export function put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>> {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...config
  });
}

// 便捷方法: DELETE
export function del<T = any>(url: string, params?: any, config?: RequestConfig): Promise<Response<T>> {
  return request<T>({
    method: 'DELETE',
    url,
    data: params,
    ...config
  });
}

// 导出所有方法
export default {
  request,
  get,
  post,
  put,
  delete: del,
  setConfig,
  addRequestInterceptor,
  addResponseInterceptor
}; 