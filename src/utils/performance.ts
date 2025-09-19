/**
 * 性能优化工具函数
 * 包含防抖、节流、懒加载等工具
 */

/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param options 选项
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {}
): (...args: Parameters<T>) => void {
  const { leading = false, trailing = true, maxWait } = options;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;
  let result: ReturnType<T> | null = null;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    lastCallTime = time;
    
    if (args) {
      result = func.apply(thisArg, args);
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

  const debounced = function(this: any, ...args: Parameters<T>) {
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

  (debounced as any).cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = null;
    lastCallTime = 0;
  };

  (debounced as any).flush = () => {
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
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  let lastCallTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;

  const throttled = function(this: any, ...args: Parameters<T>) {
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

  (throttled as any).cancel = () => {
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
export function rafThrottle<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;

  const throttled = function(this: any, ...args: Parameters<T>) {
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

  (throttled as any).cancel = () => {
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
  } = {}
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
  } = {}
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
    { threshold, rootMargin }
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
  wait: number
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
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * 性能监控装饰器
 * @param options 选项
 */
export function performanceMonitor(options: {
  name?: string;
  threshold?: number;
  logLevel?: 'warn' | 'error' | 'info';
} = {}) {
  return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const { name = propertyKey, threshold = 16, logLevel = 'warn' } = options;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      const result = originalMethod.apply(this, args);
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
export function idleCallback(
  callback: () => void,
  options: { timeout?: number } = {}
): () => void {
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