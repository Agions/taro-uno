/**
 * useDebounce Hook
 * 防抖 Hook，延迟值更新直到停止变化一段时间后
 *
 * @example
 * ```typescript
 * // 防抖值
 * const debouncedValue = useDebounce(searchTerm, 500);
 *
 * // 防抖回调
 * const debouncedSearch = useDebouncedCallback((term) => {
 *   search(term);
 * }, 500);
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useDebounce Hook 配置选项
 */
export interface UseDebounceOptions {
  /** 防抖延迟时间（毫秒） */
  delay?: number;
  /** 是否在首次立即执行 */
  leading?: boolean;
  /** 是否在延迟结束后执行 */
  trailing?: boolean;
  /** 最大等待时间（毫秒） */
  maxWait?: number;
}

/**
 * useDebouncedCallback Hook 返回类型
 */
export interface UseDebouncedCallbackReturn<T extends (...args: unknown[]) => unknown> {
  /** 防抖后的回调函数 */
  callback: (...args: Parameters<T>) => void;
  /** 取消防抖 */
  cancel: () => void;
  /** 立即执行 */
  flush: () => void;
  /** 是否正在等待执行 */
  isPending: () => boolean;
}

/**
 * 防抖值 Hook
 *
 * 延迟值更新，直到值停止变化一段时间后才更新
 *
 * @param value 需要防抖的值
 * @param delay 防抖延迟时间（毫秒），默认 500ms
 * @returns 防抖后的值
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // 只有在用户停止输入 500ms 后才执行搜索
 *       performSearch(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <Input
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="搜索..."
 *     />
 *   );
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 防抖回调 Hook
 *
 * 创建一个防抖版本的回调函数
 *
 * @param callback 需要防抖的回调函数
 * @param delay 防抖延迟时间（毫秒），默认 500ms
 * @param options 配置选项
 * @returns 防抖后的回调函数和控制方法
 *
 * @example
 * ```tsx
 * function AutoSave() {
 *   const [content, setContent] = useState('');
 *
 *   const { callback: debouncedSave, cancel, isPending } = useDebouncedCallback(
 *     (text: string) => {
 *       saveToServer(text);
 *     },
 *     1000
 *   );
 *
 *   const handleChange = (e) => {
 *     const newContent = e.target.value;
 *     setContent(newContent);
 *     debouncedSave(newContent);
 *   };
 *
 *   return (
 *     <View>
 *       <Textarea value={content} onChange={handleChange} />
 *       {isPending() && <Text>保存中...</Text>}
 *       <Button onClick={cancel}>取消保存</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500,
  options: Omit<UseDebounceOptions, 'delay'> = {},
): UseDebouncedCallbackReturn<T> {
  const { leading = false, trailing = true, maxWait } = options;

  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const pendingRef = useRef<boolean>(false);

  // 更新回调引用
  callbackRef.current = callback;

  /**
   * 清除定时器
   */
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
      maxWaitTimeoutRef.current = null;
    }
  }, []);

  /**
   * 执行回调
   */
  const invokeCallback = useCallback(() => {
    if (lastArgsRef.current) {
      callbackRef.current(...lastArgsRef.current);
      lastArgsRef.current = null;
    }
    pendingRef.current = false;
    clearTimers();
  }, [clearTimers]);

  /**
   * 取消防抖
   */
  const cancel = useCallback(() => {
    clearTimers();
    lastArgsRef.current = null;
    pendingRef.current = false;
  }, [clearTimers]);

  /**
   * 立即执行
   */
  const flush = useCallback(() => {
    if (pendingRef.current) {
      invokeCallback();
    }
  }, [invokeCallback]);

  /**
   * 检查是否正在等待执行
   */
  const isPending = useCallback(() => {
    return pendingRef.current;
  }, []);

  /**
   * 防抖后的回调
   */
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const isFirstCall = !pendingRef.current;

      lastArgsRef.current = args;
      lastCallTimeRef.current = now;
      pendingRef.current = true;

      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 首次调用且 leading 为 true 时立即执行
      if (isFirstCall && leading) {
        invokeCallback();
        return;
      }

      // 设置延迟执行
      if (trailing) {
        timeoutRef.current = setTimeout(() => {
          invokeCallback();
        }, delay);
      }

      // 设置最大等待时间
      if (maxWait !== undefined && !maxWaitTimeoutRef.current) {
        maxWaitTimeoutRef.current = setTimeout(() => {
          invokeCallback();
        }, maxWait);
      }
    },
    [delay, leading, trailing, maxWait, invokeCallback],
  );

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    callback: debouncedCallback,
    cancel,
    flush,
    isPending,
  };
}

/**
 * 防抖效果 Hook
 *
 * 在值变化后延迟执行副作用
 *
 * @param effect 副作用函数
 * @param deps 依赖数组
 * @param delay 防抖延迟时间（毫秒），默认 500ms
 *
 * @example
 * ```tsx
 * function SearchResults({ query }) {
 *   const [results, setResults] = useState([]);
 *
 *   useDebouncedEffect(
 *     () => {
 *       if (query) {
 *         fetchResults(query).then(setResults);
 *       }
 *     },
 *     [query],
 *     500
 *   );
 *
 *   return <ResultList items={results} />;
 * }
 * ```
 */
export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: unknown[],
  delay: number = 500,
): void {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 执行清理函数
      const cleanup = cleanupRef.current;
      if (typeof cleanup === 'function') {
        cleanup();
      }
      // 执行副作用并保存清理函数
      cleanupRef.current = effect();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);

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

export default useDebounce;
