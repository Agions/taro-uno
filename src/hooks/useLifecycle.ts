/**
 * 生命周期管理相关的自定义hooks
 * 提供通用的生命周期管理逻辑，包括组件挂载、卸载、副作用处理等
 */

import { useEffect, useRef, useCallback, useState } from 'react';

// ==================== 组件挂载状态 ====================

/** 组件挂载状态hook */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}

// ==================== 组件挂载和卸载事件 ====================

interface LifecycleOptions {
  onMount?: () => void | (() => void);
  onUnmount?: () => void;
}

/** 组件生命周期hook */
export function useLifecycle(options: LifecycleOptions = {}) {
  const { onMount, onUnmount } = options;
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (onMount) {
      const cleanup = onMount();
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    }

    return () => {
      cleanupRef.current?.();
      onUnmount?.();
    };
  }, [onMount, onUnmount]);
}

// ==================== 一次性执行 ====================

/** 一次性执行hook */
export function useOnce(callback: () => void | (() => void), dependencies: unknown[] = []) {
  const executedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!executedRef.current) {
      executedRef.current = true;
      const cleanup = callback();
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    }

    return () => {
      cleanupRef.current?.();
    };
  }, dependencies);
}

// ==================== 条件执行 ====================

/** 条件执行hook */
export function useConditionalEffect(
  callback: () => void | (() => void),
  condition: boolean,
  dependencies: unknown[] = [],
) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (condition) {
      const cleanup = callback();
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    }

    return () => {
      cleanupRef.current?.();
    };
  }, [condition, ...dependencies]);
}

// ==================== 异步副作用管理 ====================

interface AsyncEffectOptions<T> {
  onError?: (error: Error) => void;
  onSuccess?: (result: T) => void;
}

/** 异步副作用hook */
export function useAsyncEffect<T>(
  asyncCallback: () => Promise<T> | (() => Promise<T>),
  options: AsyncEffectOptions<T> = {},
  dependencies: unknown[] = [],
) {
  const { onError, onSuccess } = options;
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const executeAsync = async () => {
      try {
        const res = asyncCallback();
        const result = typeof res === 'function' ? await (res as () => Promise<T>)() : await res;
        if (mountedRef.current) {
          onSuccess?.(result);
        }
      } catch (error) {
        if (mountedRef.current) {
          onError?.(error as Error);
        }
      }
    };

    executeAsync();

    return () => {
      mountedRef.current = false;
    };
  }, dependencies);
}

// ==================== 定时器管理 ====================

interface TimerOptions {
  immediate?: boolean;
}

/** 定时器hook */
export function useTimer(callback: () => void, delay: number, options: TimerOptions = {}) {
  const { immediate = false } = options;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    if (timerRef.current) return;

    if (immediate) {
      callback();
    }

    timerRef.current = setInterval(callback, delay);
    setIsActive(true);
  }, [callback, delay, immediate]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsActive(false);
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    start();
  }, [stop, start]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    start,
    stop,
    reset,
    isActive,
  };
}

// ==================== 延迟执行 ====================

/** 延迟执行hook */
export function useDelay<T>(callback: () => T, delay: number, dependencies: any[] = []) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const callbackResult = callback();
      setResult(callbackResult);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, dependencies);

  return { result, loading };
}

// ==================== 网络状态监听 ====================

interface NetworkState {
  online: boolean;
  offline: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

/** 网络状态监听hook */
export function useNetworkState(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    offline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetworkState((prev) => ({ ...prev, online: true, offline: false }));
    };

    const handleOffline = () => {
      setNetworkState((prev) => ({ ...prev, online: false, offline: true }));
    };

    const handleConnectionChange = () => {
      type NavigatorConnection = {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        addEventListener?: (event: string, handler: () => void) => void;
        removeEventListener?: (event: string, handler: () => void) => void;
      };
      const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
      if (connection) {
        setNetworkState((prev) => ({
          ...prev,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        }));
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    if (connection && typeof connection.addEventListener === 'function') {
      connection.addEventListener('change', handleConnectionChange);
      handleConnectionChange();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (connection && typeof connection.removeEventListener === 'function') {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkState;
}

// ==================== 页面可见性监听 ====================

/** 页面可见性监听hook */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

// ==================== 窗口大小监听 ====================

interface WindowSize {
  width: number;
  height: number;
}

/** 窗口大小监听hook */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// ==================== 滚动位置监听 ====================

interface ScrollPosition {
  x: number;
  y: number;
}

/** 滚动位置监听hook */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}

// ==================== 媒体查询监听 ====================

interface MediaQueryOptions {
  defaultMatches?: boolean;
}

/** 媒体查询监听hook */
export function useMediaQuery(query: string, options: MediaQueryOptions = {}): boolean {
  const { defaultMatches = false } = options;
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
type NavigatorConnection = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  addEventListener?: (event: string, handler: () => void) => void;
  removeEventListener?: (event: string, handler: () => void) => void;
};
