import { describe, expect, it, vi, beforeEach } from 'vitest';
import { HttpClient } from './http-client';
import { IRequestAdapter, RequestConfig, ResponseData } from './types';

// 模拟 localStorage
const mockLocalStorage = {
  storage: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.storage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.storage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.storage[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage.storage = {};
  })
};

globalThis.localStorage = mockLocalStorage as any;

describe('HttpClient', () => {
  beforeEach(() => {
    // 重置模拟
    vi.clearAllMocks();
    mockLocalStorage.storage = {};
  });

  it('builds GET request and parses json', async () => {
    // 模拟 fetch
    const mockFetch = vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ ok: true }),
      text: async () => ''
    } as any);

    // 创建简单的适配器来避免安全功能
    const simpleAdapter: IRequestAdapter = {
      async request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
        const response = await fetch(config.url, {
          method: config.method,
          headers: config.headers,
          body: config.method !== 'GET' ? JSON.stringify(config.data) : undefined
        });

        const data = await response.json();

        return {
          data,
          statusCode: response.status,
          header: Object.fromEntries(response.headers)
        };
      }
    };

    const client = new HttpClient({ baseUrl: 'https://example.com', adapter: simpleAdapter });
    const res = await client.get('/api/test', { params: { q: 'x' } });
    expect(res).toEqual({ ok: true });
    mockFetch.mockRestore();
  });
});
