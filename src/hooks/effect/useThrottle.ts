/**
 * useThrottle Hook
 * 节流 Hook，限制值更新或函数调用的频率
 *
 * @example
 * ```typescript
 * // 节流值
 * const throttledValue = useThrottle(scrollY, 100);
 *
 * // 节流回调
 * const throttledScroll = useThrottledCallback((y) => {
 *   handleScroll(y);
 * }, 100);
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useThrottle Hook 配置选项
 */
export interface UseThrottleOptions {
  /** 节流间隔时间（毫秒） */
  interval?: number;
  /** 是否在首次立即执行 */
  leading?: boolean;
  /** 是否在间隔结束后执行最后一次调用 */
  trailing?: boolean;
}

/**
 * useThrottledCallback Hook 返回类型
 */
export interface UseThrottledCallbackReturn<T extends (...args: unknown[]) => unknown> {
  /** 节流后的回调函数 */
  callback: (...args: Parameters<T>) => void;
  /** 取消节流 */
  cancel: () => void;
  /** 立即执行 */
  flush: () => void;
  /** 是否正在等待执行 */
  isPending: () => boolean;
}

/**
 * 节流值 Hook
 *
 * 限制值更新的频率，在指定间隔内最多更新一次
 *
 * @param value 需要节流的值
 * @param interval 节流间隔时间（毫秒），默认 500ms
 * @returns 节流后的值
 *
 * @example
 * ```tsx
 * function ScrollTracker() {
 *   const [scrollY, setScrollY] = useState(0);
 *   const throttledScrollY = useThrottle(scrollY, 100);
 *
 *   useEffect(() => {
 *     const handleScroll = () => {
 *       setScrollY(window.scrollY);
 *     };
 *
 *     window.addEventListener('scroll', handleScroll);
 *     return () => window.removeEventListener('scroll', handleScroll);
 *   }, []);
 *
 *   // throttledScrollY 最多每 100ms 更新一次
 *   return <Text>滚动位置: {throttledScrollY}</Text>;
 * }
 * ```
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdatedRef = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdatedRef.current;

    if (timeSinceLastUpdate >= interval) {
      // 已经过了足够的时间，立即更新
      setThrottledValue(value);
      lastUpdatedRef.current = now;
      return;
    }

    // 设置定时器在剩余时间后更新
    const timer = setTimeout(() => {
      setThrottledValue(value);
      lastUpdatedRef.current = Date.now();
    }, interval - timeSinceLastUpdate);

    return () => {
      clearTimeout(timer);
    };
  }, [value, interval]);

  return throttledValue;
}

/**
 * 节流回调 Hook
 *
 * 创建一个节流版本的回调函数，限制调用频率
 *
 * @param callback 需要节流的回调函数
 * @param interval 节流间隔时间（毫秒），默认 500ms
 * @param options 配置选项
 * @returns 节流后的回调函数和控制方法
 *
 * @example
 * ```tsx
 * function ResizeHandler() {
 *   const [size, setSize] = useState({ width: 0, height: 0 });
 *
 *   const { callback: throttledResize } = useThrottledCallback(
 *     () => {
 *       setSize({
 *         width: window.innerWidth,
 *         height: window.innerHeight,
 *       });
 *     },
 *     200
 *   );
 *
 *   useEffect(() => {
 *     window.addEventListener('resize', throttledResize);
 *     return () => window.removeEventListener('resize', throttledResize);
 *   }, [throttledResize]);
 *
 *   return <Text>窗口大小: {size.width} x {size.height}</Text>;
 * }
 * ```
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  interval: number = 500,
  options: Omit<UseThrottleOptions, 'interval'> = {},
): UseThrottledCallbackReturn<T> {
  const { leading = true, trailing = true } = options;

  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const pendingRef = useRef<boolean>(false);

  // 更新回调引用
  callbackRef.current = callback;

  /**
   * 清除定时器
   */
  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * 执行回调
   */
  const invokeCallback = useCallback((args: Parameters<T>) => {
    callbackRef.current(...args);
    lastCallTimeRef.current = Date.now();
    pendingRef.current = false;
  }, []);

  /**
   * 取消节流
   */
  const cancel = useCallback(() => {
    clearTimer();
    lastArgsRef.current = null;
    pendingRef.current = false;
  }, [clearTimer]);

  /**
   * 立即执行
   */
  const flush = useCallback(() => {
    if (pendingRef.current && lastArgsRef.current) {
      invokeCallback(lastArgsRef.current);
      clearTimer();
    }
  }, [invokeCallback, clearTimer]);

  /**
   * 检查是否正在等待执行
   */
  const isPending = useCallback(() => {
    return pendingRef.current;
  }, []);

  /**
   * 节流后的回调
   */
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      lastArgsRef.current = args;

      // 首次调用或已经过了足够的时间
      if (timeSinceLastCall >= interval) {
        if (leading) {
          invokeCallback(args);
        } else {
          pendingRef.current = true;
          // 设置定时器在间隔后执行
          clearTimer();
          timeoutRef.current = setTimeout(() => {
            if (lastArgsRef.current) {
              invokeCallback(lastArgsRef.current);
            }
          }, interval);
        }
      } else {
        // 在间隔内，设置 trailing 执行
        pendingRef.current = true;

        if (trailing) {
          clearTimer();
          timeoutRef.current = setTimeout(() => {
            if (lastArgsRef.current) {
              invokeCallback(lastArgsRef.current);
            }
          }, interval - timeSinceLastCall);
        }
      }
    },
    [interval, leading, trailing, invokeCallback, clearTimer],
  );

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    callback: throttledCallback,
    cancel,
    flush,
    isPending,
  };
}

/**
 * 节流效果 Hook
 *
 * 限制副作用执行的频率
 *
 * @param effect 副作用函数
 * @param deps 依赖数组
 * @param interval 节流间隔时间（毫秒），默认 500ms
 *
 * @example
 * ```tsx
 * function Analytics({ pageView }) {
 *   useThrottledEffect(
 *     () => {
 *       // 最多每秒发送一次分析数据
 *       sendAnalytics(pageView);
 *     },
 *     [pageView],
 *     1000
 *   );
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useThrottledEffect(
  effect: () => void | (() => void),
  deps: unknown[],
  interval: number = 500,
): void {
  const lastRunRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | void>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRunRef.current;

    const runEffect = () => {
      // 执行清理函数
      const cleanup = cleanupRef.current;
      if (typeof cleanup === 'function') {
        cleanup();
      }
      // 执行副作用并保存清理函数
      cleanupRef.current = effect();
      lastRunRef.current = Date.now();
    };

    if (timeSinceLastRun >= interval) {
      runEffect();
    } else {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // 设置定时器在剩余时间后执行
      timeoutRef.current = setTimeout(runEffect, interval - timeSinceLastRun);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, interval]);

  // 组件卸载时执行清理
  useEffect(() => {
    return () => {
      const cleanup = cleanupRef.current;
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);
}

export default useThrottle;
