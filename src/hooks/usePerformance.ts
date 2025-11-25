/**
 * 性能优化相关的自定义hooks
 * 提供通用的性能优化逻辑，包括缓存、记忆化、虚拟化等
 */

import { useMemo, useCallback, useRef, useState, useEffect } from 'react';

// ==================== 记忆化函数 ====================

interface MemoizationOptions {
  maxSize?: number;
  ttl?: number;
}

/** 函数记忆化hook */
export function useMemoizedFunction<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: MemoizationOptions = {},
): T {
  const { maxSize = 100, ttl = 0 } = options;
  const cacheRef = useRef<Map<string, { result: ReturnType<T>; timestamp: number }>>(new Map());

  return useMemo(() => {
    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
      const now = Date.now();
      const cached = cacheRef.current.get(key);

      // 检查缓存是否有效
      if (cached && (ttl === 0 || now - cached.timestamp < ttl)) {
        return cached.result;
      }

      // 计算新结果
      const result = fn(...args) as ReturnType<T>;

      // 清理过期的缓存项
      if (ttl > 0) {
        for (const [cacheKey, value] of cacheRef.current.entries()) {
          if (now - value.timestamp > ttl) {
            cacheRef.current.delete(cacheKey);
          }
        }
      }

      // 限制缓存大小
      if (cacheRef.current.size >= maxSize) {
        const firstKey = cacheRef.current.keys().next().value;
        if (firstKey) {
          cacheRef.current.delete(firstKey);
        }
      }

      cacheRef.current.set(key, { result, timestamp: now });
      return result;
    }) as T;
  }, [fn, maxSize, ttl]);
}

// ==================== 计算结果缓存 ====================

interface CacheOptions<_T> {
  key?: string;
  ttl?: number;
  deps?: unknown[];
}

/** 计算结果缓存hook */
export function useComputedCache<T>(compute: () => T, options: CacheOptions<T> = {}): T {
  const { key = 'default', ttl = 0, deps = [] } = options;
  const cacheRef = useRef<Map<string, { value: T; timestamp: number }>>(new Map());
  const [_, forceUpdate] = useState({});

  return useMemo(() => {
    const now = Date.now();
    const cached = cacheRef.current.get(key);

    // 检查缓存是否有效
    if (cached && (ttl === 0 || now - cached.timestamp < ttl)) {
      return cached.value;
    }

    // 计算新值
    const value = compute();
    cacheRef.current.set(key, { value, timestamp: now });

    // 触发更新以使用新值
    forceUpdate({});

    return value;
  }, [compute, key, ttl, ...deps]);
}

// ==================== 虚拟列表优化 ====================

interface VirtualListOptions {
  itemHeight: number;
  overscanCount?: number;
  containerHeight: number;
}

/** 虚拟列表hook */
export function useVirtualList<T>(items: T[], options: VirtualListOptions) {
  const { itemHeight, overscanCount = 3, containerHeight } = options;

  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscanCount);
    const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscanCount);

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, overscanCount, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const offsetY = useMemo(() => {
    return visibleRange.startIndex * itemHeight;
  }, [visibleRange.startIndex, itemHeight]);

  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll,
    visibleRange,
  };
}

// ==================== 懒加载优化 ====================

interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/** 懒加载hook */
export function useLazyLoad(elementRef: React.RefObject<Element>, options: LazyLoadOptions = {}) {
  const { threshold = 0, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (triggerOnce && hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin, triggerOnce, hasLoaded]);

  return { isVisible, hasLoaded };
}

// ==================== 请求防抖缓存 ====================

interface RequestCacheOptions {
  ttl?: number;
  dedupe?: boolean;
}

/** 请求防抖缓存hook */
export function useRequestCache<T, P extends unknown[]>(
  requestFn: (...params: P) => Promise<T>,
  options: RequestCacheOptions = {},
) {
  const { ttl = 5000, dedupe = true } = options;
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map());
  const pendingRequestsRef = useRef<Map<string, Promise<T>>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeRequest = useCallback(
    async (...params: P): Promise<T> => {
      const key = JSON.stringify(params);
      const now = Date.now();

      // 检查缓存
      const cached = cacheRef.current.get(key);
      if (cached && now - cached.timestamp < ttl) {
        return cached.data;
      }

      // 检查是否有正在进行的请求
      if (dedupe && pendingRequestsRef.current.has(key)) {
        return pendingRequestsRef.current.get(key)!;
      }

      setLoading(true);
      setError(null);

      try {
        const promise = requestFn(...params);

        if (dedupe) {
          pendingRequestsRef.current.set(key, promise);
        }

        const data = await promise;

        cacheRef.current.set(key, { data, timestamp: now });
        return data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
        pendingRequestsRef.current.delete(key);
      }
    },
    [requestFn, ttl, dedupe],
  );

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    pendingRequestsRef.current.clear();
  }, []);

  return {
    execute: executeRequest,
    loading,
    error,
    clearCache,
  };
}

// ==================== 批量更新优化 ====================

interface BatchUpdateOptions {
  delay?: number;
  maxSize?: number;
}

/** 批量更新优化hook */
export function useBatchUpdate<T>(onUpdate: (items: T[]) => void, options: BatchUpdateOptions = {}) {
  const { delay = 100, maxSize = 50 } = options;
  const batchRef = useRef<T[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addItem = useCallback(
    (item: T) => {
      batchRef.current.push(item);

      if (batchRef.current.length >= maxSize) {
        flushBatch();
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(flushBatch, delay);
      }
    },
    [delay, maxSize],
  );

  const flushBatch = useCallback(() => {
    if (batchRef.current.length > 0) {
      onUpdate(batchRef.current);
      batchRef.current = [];
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [onUpdate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      flushBatch();
    };
  }, [flushBatch]);

  return { addItem, flushBatch };
}

// ==================== 优先级更新管理 ====================

interface PriorityUpdateOptions {
  highPriorityDelay?: number;
  lowPriorityDelay?: number;
}

/** 优先级更新管理hook */
export function usePriorityUpdates<T>(
  highPriorityUpdate: (value: T) => void,
  lowPriorityUpdate: (value: T) => void,
  options: PriorityUpdateOptions = {},
) {
  const { highPriorityDelay = 0, lowPriorityDelay = 100 } = options;
  const highPriorityQueueRef = useRef<T[]>([]);
  const lowPriorityQueueRef = useRef<T[]>([]);
  const highPriorityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lowPriorityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addHighPriority = useCallback(
    (value: T) => {
      highPriorityQueueRef.current.push(value);

      if (!highPriorityTimeoutRef.current) {
        highPriorityTimeoutRef.current = setTimeout(() => {
          const items = highPriorityQueueRef.current;
          highPriorityQueueRef.current = [];
          highPriorityTimeoutRef.current = null;

          items.forEach(highPriorityUpdate);
        }, highPriorityDelay);
      }
    },
    [highPriorityUpdate, highPriorityDelay],
  );

  const addLowPriority = useCallback(
    (value: T) => {
      lowPriorityQueueRef.current.push(value);

      if (!lowPriorityTimeoutRef.current) {
        lowPriorityTimeoutRef.current = setTimeout(() => {
          const items = lowPriorityQueueRef.current;
          lowPriorityQueueRef.current = [];
          lowPriorityTimeoutRef.current = null;

          items.forEach(lowPriorityUpdate);
        }, lowPriorityDelay);
      }
    },
    [lowPriorityUpdate, lowPriorityDelay],
  );

  useEffect(() => {
    return () => {
      if (highPriorityTimeoutRef.current) {
        clearTimeout(highPriorityTimeoutRef.current);
      }
      if (lowPriorityTimeoutRef.current) {
        clearTimeout(lowPriorityTimeoutRef.current);
      }
    };
  }, []);

  return {
    addHighPriority,
    addLowPriority,
  };
}

// usePerformanceMonitor removed to avoid conflict with usePerformanceMonitor.ts

// ==================== 导出 ====================
// 所有函数已在文件开头单独导出
