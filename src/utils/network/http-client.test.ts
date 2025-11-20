import { describe, expect, it, vi } from 'vitest';
import { HttpClient } from './http-client';

describe('HttpClient', () => {
  it('builds GET request and parses json', async () => {
    const client = new HttpClient({ baseUrl: 'https://example.com' });
    const mock = vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ ok: true }),
      text: async () => ''
    } as any);
    const res = await client.get('/api/test', { params: { q: 'x' } });
    expect(res).toEqual({ ok: true });
    mock.mockRestore();
  });
});
