/**
 * useRequest Hook
 * 请求状态管理 Hook，提供数据获取、缓存、轮询等功能
 *
 * @example
 * ```typescript
 * // 基础用法
 * const { data, loading, error, refetch } = useRequest('/api/users');
 *
 * // 手动触发
 * const { data, run } = useRequest('/api/users', { manual: true });
 * run();
 *
 * // 带参数
 * const { data, run } = useRequest(
 *   (id) => `/api/users/${id}`,
 *   { manual: true }
 * );
 * run(123);
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { http } from '../../services/http-client';
import type { HttpRequestConfig } from '../../services/types';

/**
 * 请求服务类型
 */
export type RequestService<TData, TParams extends unknown[]> =
  | string
  | ((...params: TParams) => string)
  | ((...params: TParams) => Promise<TData>)
  | ((...params: TParams) => HttpRequestConfig);

/**
 * useRequest Hook 配置选项
 */
export interface UseRequestOptions<TData, TParams extends unknown[]> {
  /** 是否手动触发请求 */
  manual?: boolean;
  /** 默认参数 */
  defaultParams?: TParams;
  /** 初始数据 */
  initialData?: TData;
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** 请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 轮询间隔（毫秒） */
  pollingInterval?: number;
  /** 是否在窗口聚焦时重新请求 */
  refreshOnWindowFocus?: boolean;
  /** 窗口聚焦重新请求间隔（毫秒） */
  focusTimespan?: number;
  /** 防抖间隔（毫秒） */
  debounceWait?: number;
  /** 节流间隔（毫秒） */
  throttleWait?: number;
  /** 缓存键 */
  cacheKey?: string;
  /** 缓存时间（毫秒） */
  cacheTime?: number;
  /** 数据过期时间（毫秒） */
  staleTime?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 重试间隔（毫秒） */
  retryInterval?: number;
  /** 请求前回调 */
  onBefore?: (params: TParams) => void;
  /** 请求成功回调 */
  onSuccess?: (data: TData, params: TParams) => void;
  /** 请求失败回调 */
  onError?: (error: Error, params: TParams) => void;
  /** 请求完成回调（无论成功失败） */
  onFinally?: (params: TParams, data?: TData, error?: Error) => void;
  /** 数据转换函数 */
  formatResult?: (data: unknown) => TData;
  /** 是否准备好发起请求 */
  ready?: boolean;
  /** 依赖数组，变化时自动重新请求 */
  refreshDeps?: unknown[];
}

/**
 * useRequest Hook 返回类型
 */
export interface UseRequestReturn<TData, TParams extends unknown[]> {
  /** 响应数据 */
  data: TData | undefined;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: Error | undefined;
  /** 请求参数 */
  params: TParams | undefined;
  /** 手动触发请求 */
  run: (...params: TParams) => Promise<TData>;
  /** 手动触发请求（异步） */
  runAsync: (...params: TParams) => Promise<TData>;
  /** 刷新请求（使用上次参数） */
  refresh: () => Promise<TData>;
  /** 刷新请求（异步） */
  refreshAsync: () => Promise<TData>;
  /** 取消请求 */
  cancel: () => void;
  /** 修改数据 */
  mutate: (data: TData | ((oldData?: TData) => TData)) => void;
}

/**
 * 简单缓存实现
 */
const cache = new Map<string, { data: unknown; timestamp: number }>();

/**
 * 请求状态管理 Hook
 *
 * @param service 请求服务（URL 字符串、函数或配置对象）
 * @param options 配置选项
 * @returns 请求状态和控制方法
 *
 * @example
 * ```tsx
 * function UserList() {
 *   const { data, loading, error, refresh } = useRequest<User[]>('/api/users');
 *
 *   if (loading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *
 *   return (
 *     <View>
 *       {data?.map(user => <UserItem key={user.id} user={user} />)}
 *       <Button onClick={refresh}>刷新</Button>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function UserDetail({ userId }) {
 *   const { data, loading } = useRequest<User>(
 *     () => `/api/users/${userId}`,
 *     {
 *       refreshDeps: [userId],
 *       cacheKey: `user-${userId}`,
 *       staleTime: 5000,
 *     }
 *   );
 *
 *   return <UserProfile user={data} loading={loading} />;
 * }
 * ```
 */
export function useRequest<TData = unknown, TParams extends unknown[] = []>(
  service: RequestService<TData, TParams>,
  options: UseRequestOptions<TData, TParams> = {},
): UseRequestReturn<TData, TParams> {
  const {
    manual = false,
    defaultParams,
    initialData,
    method = 'GET',
    headers,
    timeout,
    pollingInterval,
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    debounceWait,
    throttleWait,
    cacheKey,
    cacheTime = 5 * 60 * 1000, // 5 分钟
    staleTime = 0,
    retryCount = 0,
    retryInterval = 1000,
    onBefore,
    onSuccess,
    onError,
    onFinally,
    formatResult,
    ready = true,
    refreshDeps = [],
  } = options;

  // 状态
  const [data, setData] = useState<TData | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [params, setParams] = useState<TParams | undefined>(defaultParams);

  // Refs
  const serviceRef = useRef(service);
  const abortControllerRef = useRef<AbortController | null>(null);
  const pollingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastFocusTimeRef = useRef<number>(0);
  const retryCountRef = useRef<number>(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throttleLastRunRef = useRef<number>(0);

  // 更新 service ref
  serviceRef.current = service;

  /**
   * 执行请求
   */
  const fetchData = useCallback(
    async (requestParams: TParams): Promise<TData> => {
      // 检查缓存
      if (cacheKey) {
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < staleTime) {
          return cached.data as TData;
        }
      }

      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const currentService = serviceRef.current;
      let result: TData;

      if (typeof currentService === 'string') {
        // URL 字符串
        const response = await http.request<TData>({
          url: currentService,
          method,
          headers,
          timeout,
          signal: abortControllerRef.current.signal,
        });
        result = response.data;
      } else if (typeof currentService === 'function') {
        const serviceResult = currentService(...requestParams);

        if (typeof serviceResult === 'string') {
          // 返回 URL 字符串
          const response = await http.request<TData>({
            url: serviceResult,
            method,
            headers,
            timeout,
            signal: abortControllerRef.current.signal,
          });
          result = response.data;
        } else if (serviceResult instanceof Promise) {
          // 返回 Promise
          result = await serviceResult;
        } else {
          // 返回配置对象
          const config = serviceResult as HttpRequestConfig;
          const response = await http.request<TData>({
            ...config,
            signal: abortControllerRef.current.signal,
          });
          result = response.data;
        }
      } else {
        throw new Error('Invalid service type');
      }

      // 格式化结果
      if (formatResult) {
        result = formatResult(result);
      }

      // 更新缓存
      if (cacheKey) {
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
        // 设置缓存过期清理
        setTimeout(() => {
          cache.delete(cacheKey);
        }, cacheTime);
      }

      return result;
    },
    [cacheKey, staleTime, method, headers, timeout, formatResult, cacheTime],
  );

  /**
   * 运行请求
   */
  const runAsync = useCallback(
    async (...requestParams: TParams): Promise<TData> => {
      if (!ready) {
        throw new Error('Request is not ready');
      }

      onBefore?.(requestParams);
      setLoading(true);
      setError(undefined);
      setParams(requestParams);

      try {
        const result = await fetchData(requestParams);
        setData(result);
        onSuccess?.(result, requestParams);
        onFinally?.(requestParams, result, undefined);
        retryCountRef.current = 0;
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        // 忽略取消错误
        if (error.name === 'AbortError') {
          throw error;
        }

        // 重试逻辑
        if (retryCountRef.current < retryCount) {
          retryCountRef.current++;
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
          return runAsync(...requestParams);
        }

        setError(error);
        onError?.(error, requestParams);
        onFinally?.(requestParams, undefined, error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [ready, onBefore, fetchData, onSuccess, onFinally, retryCount, retryInterval, onError],
  );

  /**
   * 运行请求（不抛出错误）
   */
  const run = useCallback(
    async (...requestParams: TParams): Promise<TData> => {
      // 防抖处理
      if (debounceWait) {
        return new Promise((resolve, reject) => {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          debounceTimerRef.current = setTimeout(async () => {
            try {
              const result = await runAsync(...requestParams);
              resolve(result);
            } catch (err) {
              reject(err);
            }
          }, debounceWait);
        });
      }

      // 节流处理
      if (throttleWait) {
        const now = Date.now();
        if (now - throttleLastRunRef.current < throttleWait) {
          return data as TData;
        }
        throttleLastRunRef.current = now;
      }

      try {
        return await runAsync(...requestParams);
      } catch {
        return data as TData;
      }
    },
    [runAsync, debounceWait, throttleWait, data],
  );

  /**
   * 刷新请求
   */
  const refresh = useCallback(async (): Promise<TData> => {
    return run(...((params ?? defaultParams ?? []) as TParams));
  }, [run, params, defaultParams]);

  /**
   * 刷新请求（异步）
   */
  const refreshAsync = useCallback(async (): Promise<TData> => {
    return runAsync(...((params ?? defaultParams ?? []) as TParams));
  }, [runAsync, params, defaultParams]);

  /**
   * 取消请求
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
  }, []);

  /**
   * 修改数据
   */
  const mutate = useCallback((newData: TData | ((oldData?: TData) => TData)) => {
    if (typeof newData === 'function') {
      setData((oldData) => (newData as (oldData?: TData) => TData)(oldData));
    } else {
      setData(newData);
    }
  }, []);

  // 自动请求
  useEffect(() => {
    if (!manual && ready) {
      run(...((defaultParams ?? []) as TParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual, ready]);

  // 依赖变化时重新请求
  useEffect(() => {
    if (!manual && ready && refreshDeps.length > 0) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refreshDeps);

  // 轮询
  useEffect(() => {
    if (pollingInterval && pollingInterval > 0 && ready) {
      pollingTimerRef.current = setInterval(() => {
        refresh();
      }, pollingInterval);

      return () => {
        if (pollingTimerRef.current) {
          clearInterval(pollingTimerRef.current);
        }
      };
    }
    return undefined;
  }, [pollingInterval, ready, refresh]);

  // 窗口聚焦时重新请求
  useEffect(() => {
    if (!refreshOnWindowFocus || typeof window === 'undefined') {
      return;
    }

    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusTimeRef.current > focusTimespan) {
        lastFocusTimeRef.current = now;
        refresh();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshOnWindowFocus, focusTimespan, refresh]);

  // 清理
  useEffect(() => {
    return () => {
      cancel();
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [cancel]);

  return {
    data,
    loading,
    error,
    params,
    run,
    runAsync,
    refresh,
    refreshAsync,
    cancel,
    mutate,
  };
}

export default useRequest;
