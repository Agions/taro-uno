import { IRequestAdapter, RequestConfig, ResponseData } from './types';

export class WebAdapter implements IRequestAdapter {
  async request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || 10000);

    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.method !== 'GET' ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      const data = await response.json();

      // Convert Headers object to Record<string, string>
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      return {
        data,
        statusCode: response.status,
        header: headers,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
