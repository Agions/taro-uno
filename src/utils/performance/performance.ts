/**
 * 性能优化工具函数
 * 包含防抖、节流、懒加载等工具
 */

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

// 性能标记类
export class PerformanceMarker {
  private static markers = new Map<string, number>();

  static start(name: string): void {
    this.markers.set(name, performance.now());
  }

  static end(name: string): number {
    const start = this.markers.get(name);
    if (start === undefined) {
      throw new Error(`Marker '${name}' not found`);
    }
    const duration = performance.now() - start;
    this.markers.delete(name);
    return duration;
  }

  static measure(name: string, callback: () => void): number {
    this.start(name);
    callback();
    return this.end(name);
  }
}

// 内存管理工具
export class MemoryManager {
  private static weakRefs = new WeakMap<object, number>();
  private static cleanupCallbacks = new Set<() => void>();

  static createWeakRef(obj: object): number {
    const id = Math.random();
    this.weakRefs.set(obj, id);
    return id;
  }

  static addCleanup(callback: () => void): void {
    this.cleanupCallbacks.add(callback);
  }

  static cleanup(): void {
    this.cleanupCallbacks.forEach((callback) => callback());
    this.cleanupCallbacks.clear();
  }

  static getMemoryInfo() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return null;
  }
}

// 性能优化Hooks
export function useDebounce<T extends (...args: unknown[]) => unknown>(callback: T, delay: number): T {
  return useMemo(() => debounce(callback, delay) as unknown as T, [callback, delay]);
}

export function useThrottle<T extends (...args: unknown[]) => unknown>(callback: T, delay: number): T {
  return useMemo(() => throttle(callback, delay) as unknown as T, [callback, delay]);
}

export function useLazyLoad<T>(
  loader: () => Promise<T>,
  deps: any[] = [],
): { data: T | null; loading: boolean; error: Error | null; reload: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loader();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    load();
  }, deps);

  return { data, loading, error, reload: load };
}

export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
): (node: Element | null) => void {
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, callback, options]);

  return setNode;
}

export function useResizeObserver(callback: (entry: ResizeObserverEntry) => void): (node: Element | null) => void {
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach(callback);
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, callback]);

  return setNode;
}

export function usePerformanceMonitor({
  enabled = false,
  sampleInterval = 1000,
  thresholds = {},
}: {
  enabled?: boolean;
  sampleInterval?: number;
  thresholds?: {
    fps?: number;
    memory?: number;
    loadTime?: number;
  };
} = {}) {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    isHealthy: true,
  });

  useEffect(() => {
    if (!enabled) return;

    const monitor = setInterval(() => {
      const fps = calculateFPS();
      const memoryInfo = MemoryManager.getMemoryInfo();
      const memory = memoryInfo ? memoryInfo.usage : 0;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;

      const isHealthy = fps >= (thresholds.fps || 30) && memory <= (thresholds.memory || 80);

      setMetrics({
        fps,
        memory,
        loadTime,
        isHealthy,
      });
    }, sampleInterval);

    return () => clearInterval(monitor);
  }, [enabled, sampleInterval, thresholds]);

  return metrics;
}

function calculateFPS(): number {
  let lastTime = performance.now();
  let frames = 0;
  let fps = 0;

  const counter = () => {
    const now = performance.now();
    frames++;

    if (now >= lastTime + 1000) {
      fps = Math.round((frames * 1000) / (now - lastTime));
      frames = 0;
      lastTime = now;
    }

    requestAnimationFrame(counter);
  };

  requestAnimationFrame(counter);
  return fps;
}

export function useBatch<T>(callback: (items: T[]) => void, delay: number = 100) {
  const batchRef = useRef<T[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flush = useCallback(() => {
    if (batchRef.current.length > 0) {
      callback(batchRef.current);
      batchRef.current = [];
    }
  }, [callback]);

  const addItem = useCallback(
    (item: T) => {
      batchRef.current.push(item);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        flush();
      }, delay);
    },
    [flush, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      flush();
    };
  }, [flush]);

  return addItem;
}

export function useCache<T>(key: string, initialValue: T, deps: any[] = []): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const cached = localStorage.getItem(`cache_${key}`);
    return cached ? JSON.parse(cached) : initialValue;
  });

  const updateValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      localStorage.setItem(`cache_${key}`, JSON.stringify(newValue));
    },
    [key],
  );

  useEffect(() => {
    const cached = localStorage.getItem(`cache_${key}`);
    if (cached) {
      setValue(JSON.parse(cached));
    }
  }, deps);

  return [value, updateValue];
}

export function useOptimizedRequest<T>(
  request: () => Promise<T>,
  options: {
    cacheKey?: string;
    cacheTime?: number;
    retryCount?: number;
    retryDelay?: number;
    debounceTime?: number;
    throttleTime?: number;
  } = {},
) {
  const {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    retryCount = 3,
    retryDelay = 1000,
    debounceTime = 0,
    throttleTime = 0,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastError: Error | null = null;
    let attempts = 0;

    while (attempts < retryCount) {
      try {
        const result = await request();
        setData(result);

        if (cacheKey) {
          const cacheData = {
            data: result,
            timestamp: Date.now(),
          };
          localStorage.setItem(`request_${cacheKey}`, JSON.stringify(cacheData));
        }

        return result;
      } catch (err) {
        lastError = err as Error;
        attempts++;

        if (attempts < retryCount) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    setError(lastError);
    throw lastError;
  }, [request, retryCount, retryDelay, cacheKey]);

  useEffect(() => {
    if (cacheKey) {
      const cached = localStorage.getItem(`request_${cacheKey}`);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTime) {
          setData(cachedData);
        }
      }
    }
  }, [cacheKey, cacheTime]);

  const optimizedExecute = useMemo(() => {
    if (debounceTime > 0) {
      return debounce(execute, debounceTime);
    }
    if (throttleTime > 0) {
      return throttle(execute, throttleTime);
    }
    return execute;
  }, [execute, debounceTime, throttleTime]);

  return {
    data,
    loading,
    error,
    execute: optimizedExecute,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
}

/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param options 选项
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {},
): (...args: Parameters<T>) => void {
  const { leading = false, trailing = true, maxWait } = options;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown = null;
  let result: ReturnType<T> | null = null;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    lastCallTime = time;

    if (args) {
      result = func.apply(thisArg as any, args) as ReturnType<T>;
    }

    return result;
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - lastCallTime;

    return (
      lastCallTime === 0 || // 首次调用
      timeSinceLastCall >= delay || // 超过延迟时间
      (maxWait !== undefined && timeSinceLastCall >= maxWait) // 超过最大等待时间
    );
  };

  const trailingEdge = (time: number) => {
    timeoutId = null;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = null;
    lastThis = null;
    return result;
  };

  const timerExpired = (): ReturnType<T> | null => {
    const time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    // 重新计算剩余时间
    const timeSinceLastCall = time - lastCallTime;
    const timeWaiting = delay - timeSinceLastCall;
    const remainingWait = maxWait !== undefined ? Math.min(timeWaiting, maxWait - timeSinceLastCall) : timeWaiting;

    timeoutId = setTimeout(timerExpired, remainingWait);
    return null;
  };

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    const time = Date.now();
    lastArgs = args;
    lastThis = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (leading && shouldInvoke(time)) {
      return invokeFunc(time);
    }

    timeoutId = setTimeout(timerExpired, delay);
    return result;
  } as (...args: Parameters<T>) => void & {
    cancel: () => void;
    flush: () => ReturnType<T> | null;
  };

  (debounced as unknown as { cancel: () => void }).cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = null;
    lastCallTime = 0;
  };

  (debounced as unknown as { flush: () => ReturnType<T> | null }).flush = () => {
    if (timeoutId) {
      return trailingEdge(Date.now());
    }
    return result;
  };

  return debounced;
}

/**
 * 节流函数
 * @param func 需要节流的函数
 * @param limit 时间限制（毫秒）
 * @param options 选项
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  let lastCallTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown = null;

  const throttled = function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    lastArgs = args;
    lastThis = this;

    // 如果是首次调用且leading为false，设置lastCallTime
    if (!leading && lastCallTime === 0) {
      lastCallTime = now;
    }

    if (timeSinceLastCall >= limit || (leading && lastCallTime === 0)) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      lastCallTime = now;
      func.apply(this, args);
    } else if (trailing && !timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = leading ? Date.now() : 0;
        timeoutId = null;

        if (lastArgs && trailing) {
          func.apply(lastThis, lastArgs);
        }
      }, limit - timeSinceLastCall);
    }
  } as ((...args: Parameters<T>) => void) & { cancel: () => void };

  (throttled as unknown as { cancel: () => void }).cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = null;
    lastCallTime = 0;
  };

  return throttled;
}

/**
 * RAF 节流函数
 * 使用 requestAnimationFrame 实现节流
 * @param func 需要节流的函数
 * @returns 节流后的函数
 */
export function rafThrottle<T extends (...args: unknown[]) => unknown>(func: T): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown = null;

  const throttled = function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
        }
        rafId = null;
        lastArgs = null;
        lastThis = null;
      });
    }
  } as ((...args: Parameters<T>) => void) & { cancel: () => void };

  (throttled as unknown as { cancel: () => void }).cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastArgs = null;
    lastThis = null;
  };

  return throttled;
}

/**
 * 懒加载函数
 * @param loader 加载函数
 * @param options 选项
 * @returns 懒加载的 Promise
 */
export function lazyLoad<T>(
  loader: () => Promise<T>,
  options: {
    timeout?: number;
    retryCount?: number;
    retryDelay?: number;
  } = {},
): Promise<T> {
  const { timeout = 5000, retryCount = 3, retryDelay = 1000 } = options;
  let retries = 0;

  const loadWithRetry = (): Promise<T> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Lazy load timeout'));
      }, timeout);

      loader()
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);

          if (retries < retryCount) {
            retries++;
            setTimeout(() => {
              loadWithRetry().then(resolve).catch(reject);
            }, retryDelay);
          } else {
            reject(error);
          }
        });
    });
  };

  return loadWithRetry();
}

/**
 * 图片懒加载
 * @param element 图片元素
 * @param src 图片地址
 * @param options 选项
 */
export function lazyLoadImage(
  element: HTMLImageElement,
  src: string,
  options: {
    threshold?: number;
    rootMargin?: string;
    placeholder?: string;
    onLoad?: () => void;
    onError?: () => void;
  } = {},
): void {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==',
    onLoad,
    onError,
  } = options;

  // 设置占位图
  if (placeholder) {
    element.src = placeholder;
  }

  // 如果 IntersectionObserver 不可用，直接加载
  if (!('IntersectionObserver' in window)) {
    element.src = src;
    element.onload = onLoad || null;
    element.onerror = onError || null;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.src = src;
          element.onload = () => {
            onLoad?.();
            observer.unobserve(element);
          };
          element.onerror = () => {
            onError?.();
            observer.unobserve(element);
          };
        }
      });
    },
    { threshold, rootMargin },
  );

  observer.observe(element);
}

/**
 * 批处理函数
 * @param func 需要批处理的函数
 * @param wait 等待时间（毫秒）
 * @returns 批处理后的函数
 */
export function batch<T extends (...args: any[]) => any>(
  func: (items: Parameters<T>[]) => void,
  wait: number,
): (...args: Parameters<T>) => void {
  let batch: Parameters<T>[] = [];
  let timeoutId: NodeJS.Timeout | null = null;

  const flush = () => {
    if (batch.length > 0) {
      func(batch);
      batch = [];
    }
    timeoutId = null;
  };

  return (...args: Parameters<T>) => {
    batch.push(args);

    if (!timeoutId) {
      timeoutId = setTimeout(flush, wait);
    }
  };
}

/**
 * 记忆化函数
 * @param func 需要记忆化的函数
 * @param keyGenerator 键生成器
 * @returns 记忆化后的函数
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result as ReturnType<T>);
    return result;
  }) as T;
}

/**
 * 性能监控装饰器
 * @param options 选项
 */
export function performanceMonitor(
  options: {
    name?: string;
    threshold?: number;
    logLevel?: 'warn' | 'error' | 'info';
  } = {},
) {
  return function (_target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const { name = propertyKey, threshold = 16, logLevel = 'warn' } = options;

    descriptor.value = function (...args: unknown[]) {
      const startTime = performance.now();
      const result = (originalMethod as any).apply(this, args);
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > threshold) {
        console[logLevel](`[Performance] ${name} took ${duration.toFixed(2)}ms`);
      }

      return result;
    };
  };
}

/**
 * 请求动画帧优化
 * @param callback 回调函数
 * @returns 取消函数
 */
export function raf(callback: () => void): () => void {
  let rafId: number;

  const animate = () => {
    callback();
    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

/**
 * 空闲时间执行
 * @param callback 回调函数
 * @param options 选项
 */
export function idleCallback(callback: () => void, options: { timeout?: number } = {}): () => void {
  let handle: number;

  if ('requestIdleCallback' in window) {
    handle = requestIdleCallback(callback, options);
  } else {
    // 降级处理
    handle = (window as any).setTimeout(callback, options.timeout || 50);
  }

  return () => {
    if ('cancelIdleCallback' in window) {
      cancelIdleCallback(handle);
    } else {
      clearTimeout(handle);
    }
  };
}

export default {
  debounce,
  throttle,
  rafThrottle,
  lazyLoad,
  lazyLoadImage,
  batch,
  memoize,
  performanceMonitor,
  raf,
  idleCallback,
};
