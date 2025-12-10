import { describe, it, expect, vi, beforeEach } from 'vitest';
import Taro from '@tarojs/taro';
import { TaroAdapter } from './taro-adapter';

vi.mock('@tarojs/taro', () => ({
  default: {
    request: vi.fn(),
  },
}));

describe('TaroAdapter', () => {
  let adapter: TaroAdapter;

  beforeEach(() => {
    adapter = new TaroAdapter();
    vi.clearAllMocks();
  });

  it('should make a GET request successfully', async () => {
    const mockResponse = {
      data: { id: 1, name: 'Test' },
      statusCode: 200,
      header: { 'content-type': 'application/json' },
      errMsg: 'request:ok',
    };

    (Taro.request as any).mockResolvedValue(mockResponse);

    const response = await adapter.request({
      url: 'https://api.example.com/users',
      method: 'GET',
    });

    expect(Taro.request).toHaveBeenCalledWith({
      url: 'https://api.example.com/users',
      method: 'GET',
      header: undefined,
      data: {},
      timeout: 10000,
    });

    expect(response).toEqual({
      data: mockResponse.data,
      statusCode: 200,
      header: mockResponse.header,
      errMsg: 'request:ok',
    });
  });

  it('should handle request errors', async () => {
    const mockError = new Error('Network error');
    (Taro.request as any).mockRejectedValue(mockError);

    await expect(adapter.request({
      url: 'https://api.example.com/error',
      method: 'GET',
    })).rejects.toThrow('Network error');
  });

  it('should merge params into data', async () => {
    (Taro.request as any).mockResolvedValue({ statusCode: 200, data: {} });

    await adapter.request({
      url: 'https://api.example.com/search',
      method: 'GET',
      params: { q: 'test' },
      data: { limit: 10 },
    });

    expect(Taro.request).toHaveBeenCalledWith(expect.objectContaining({
      data: { q: 'test', limit: 10 },
    }));
  });
});
