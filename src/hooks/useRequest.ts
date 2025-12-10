import { useCallback, useEffect, useMemo } from 'react';
import { request as httpClient, Request } from '@/utils/http/request';
import { dataFetcher } from '@/utils/cache';
import { useAsync } from './useAsync';
import type { RequestOptions as UnifiedRequestOptions } from '@/utils/http/types';

export interface UseRequestOptions<T = unknown> {
  client?: Request;
  service?: ((client: Request) => Promise<T>) | string;
  method?: UnifiedRequestOptions['method'];
  params?: Record<string, unknown>;
  data?: unknown;
  manual?: boolean;
  enabled?: boolean;
  cacheKey?: string;
  staleTime?: number;
  retry?: number;
  retryDelay?: number;
  pollingInterval?: number;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  transform?: (data: unknown) => T;
  keepPreviousData?: boolean;
  deps?: unknown[];
}

export interface UseRequestResult<T = unknown> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refetch: () => Promise<T | undefined>;
  cancel: () => void;
  setData: (updater: T | ((prev: T | undefined) => T)) => void;
}

export function useRequest<T = unknown>(options: UseRequestOptions<T>): UseRequestResult<T> {
  const client = options.client || httpClient;
  const enabled = options.enabled ?? true;
  const manual = options.manual ?? false;

  const key = useMemo(() => {
    if (options.cacheKey) return options.cacheKey;
    const base = typeof options.service === 'string' ? options.service : 'fn';
    const parts = [
      base,
      options.method || 'GET',
      JSON.stringify(options.params || {}),
      JSON.stringify(options.data || {}),
    ];
    return `req:${parts.join('|')}`;
  }, [options.cacheKey, options.service, options.method, options.params, options.data]);

  const exec = useCallback(async () => {
    const fetcher = async (): Promise<T> => {
      if (typeof options.service === 'string') {
        return await client.request<T>({
          url: options.service,
          method: options.method || 'GET',
          params: options.params ?? {},
          data: options.data,
          timeout: options.staleTime ? Math.max(options.staleTime, 1000) : 15000,
          retry: {
            retries: options.retry ?? (options.method === 'GET' ? 3 : 0),
            retryDelay: options.retryDelay ?? 1000,
          },
        });
      }
      return await (options.service as (c: Request) => Promise<T>)(client);
    };

    const result = await dataFetcher.fetch<T>(key, fetcher, {
      ttl: options.staleTime ?? 0,
      retries: options.retry ?? (options.method === 'GET' ? 3 : 0),
    });
    return result;
  }, [
    client,
    key,
    options.service,
    options.method,
    options.params,
    options.data,
    options.staleTime,
    options.retry,
    options.retryDelay,
    options.transform,
    options.onSuccess,
    options.onError,
  ]);

  const asyncState = useAsync<T>(exec, {
    immediate: !manual && enabled,
    deps: options.deps || [],
    keepPreviousData: options.keepPreviousData ?? true,
    ...(options.onSuccess ? { onSuccess: options.onSuccess as (data: T) => void } : {}),
    ...(options.onError ? { onError: options.onError as (error: Error) => void } : {}),
  });

  // 初次与依赖触发由 useAsync 的 immediate/deps 管理

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (enabled && options.pollingInterval && options.pollingInterval > 0) {
      timer = setInterval(() => {
        asyncState.execute();
      }, options.pollingInterval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [enabled, options.pollingInterval, asyncState.execute]);

  const cancel = useCallback(() => {
    asyncState.cancel();
  }, [asyncState.cancel]);

  const refetch = useCallback(async () => {
    dataFetcher.invalidate(key);
    return await asyncState.execute();
  }, [key, asyncState.execute]);

  const setData = useCallback(
    (updater: T | ((prev: T | undefined) => T)) => {
      asyncState.setData(updater);
    },
    [asyncState.setData],
  );

  return {
    data: asyncState.data ?? options.initialData,
    error: asyncState.error,
    loading: asyncState.loading,
    refetch,
    cancel,
    setData,
  };
}

export default useRequest;
