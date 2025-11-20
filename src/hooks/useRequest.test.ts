import { describe, expect, it } from 'vitest';
import { useRequest } from './useRequest';
import { renderHook, waitFor } from '@testing-library/react';

describe('useRequest', () => {
  it('fetches data automatically', async () => {
    const { result } = renderHook(() => useRequest({ service: async () => ({ n: 1 }) }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ n: 1 });
  });
});
