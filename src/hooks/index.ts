/**
 * 自定义Hooks统一导出文件
 * 提供所有自定义hooks的统一访问入口
 */

import { useState, useCallback, useEffect } from 'react';
import { useDebounce, useThrottle } from './useEventHandling';
import { useControlledState } from './useStateManagement';
import { useMounted } from './useLifecycle';

// ==================== 状态管理相关 ====================

export {
  useControlledState,
  useSyncedState,
  useStateHistory,
  useValidatedState,
  useBatchUpdate,
  usePersistentState,
  useStateSelector,
} from './useStateManagement';

// ==================== 事件处理相关 ====================

export {
  useDebounce,
  useThrottle,
  useClickHandler,
  useLongPress,
  useDrag,
  useKeyboard,
  useEventDelegate,
} from './useEventHandling';

// ==================== 生命周期管理相关 ====================

export {
  useMounted,
  useLifecycle,
  useOnce,
  useConditionalEffect,
  useAsyncEffect,
  useTimer,
  useDelay,
  useNetworkState,
  usePageVisibility,
  useWindowSize,
  useScrollPosition,
  useMediaQuery,
} from './useLifecycle';

// ==================== 性能优化相关 ====================

export {
  useMemoizedFunction,
  useComputedCache,
  useVirtualList,
  useLazyLoad,
  useRequestCache,
  useBatchUpdate as usePerformanceBatchUpdate,
  usePriorityUpdates,
  usePerformanceMonitor,
} from './usePerformance';

// ==================== 现有Hooks ====================

export { usePlatform } from './usePlatform';
export { useTheme } from './useTheme';
export { usePerformanceMonitor as useExistingPerformanceMonitor } from './usePerformanceMonitor';
export { useVirtualScroll } from './useVirtualScroll';

// ==================== Hook类型定义 ====================

export type {
  ValidationResult,
  ValidationRule,
  Validator,
  BatchValidationResult,
  FormFieldState,
  AsyncValidator,
  ValidatorFactory,
} from '../types/validators';

// ==================== 通用Hook工具类型 ====================

/** Hook返回值的通用类型 */
export type HookResult<T> = [T, (value: T) => void];

/** 异步Hook返回值类型 */
export type AsyncHookResult<T, E = Error> = {
  data: T | null;
  loading: boolean;
  error: E | null;
  execute: () => Promise<void>;
  reset: () => void;
};

/** 事件处理Hook返回值类型 */
export type EventHandlerResult = {
  handler: (event: any) => void;
  cancel: () => void;
};

/** 生命周期Hook返回值类型 */
export type LifecycleResult = {
  mounted: boolean;
  cleanup: () => void;
};

/** 性能监控Hook返回值类型 */
export type PerformanceResult = {
  metrics: {
    renderTime: number;
    updateTime: number;
    memoryUsage?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
    };
  };
  startMeasure: () => void;
  endMeasure: () => void;
  resetMetrics: () => void;
};

// ==================== Hook工具函数 ====================

/** 创建Hook的工具函数 */
export const hookUtils = {
  /** 创建状态管理Hook */
  createStateHook: <T>(initialValue: T) => {
    return () => {
      const [state, setState] = useState(initialValue);
      return [state, setState] as const;
    };
  },

  /** 创建异步Hook */
  createAsyncHook: <T, P extends any[]>(
    asyncFunction: (...params: P) => Promise<T>,
    options: {
      immediate?: boolean;
      onSuccess?: (data: T) => void;
      onError?: (error: Error) => void;
    } = {}
  ) => {
    return (...params: P) => {
      const [data, setData] = useState<T | null>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<Error | null>(null);

      const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
          const result = await asyncFunction(...params);
          setData(result);
          options.onSuccess?.(result);
        } catch (err) {
          setError(err as Error);
          options.onError?.(err as Error);
        } finally {
          setLoading(false);
        }
      }, params);

      const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
      }, []);

      useEffect(() => {
        if (options.immediate) {
          execute();
        }
      }, [execute, options.immediate]);

      return { data, loading, error, execute, reset } as AsyncHookResult<T>;
    };
  },

  /** 创建事件处理Hook */
  createEventHook: <T extends (...args: any[]) => any>(
    handler: T,
    options: {
      debounce?: number;
      throttle?: number;
      leading?: boolean;
      trailing?: boolean;
    } = {}
  ) => {
    return () => {
      const { debounce, throttle, leading = false, trailing = true } = options;
      
      if (debounce) {
        return useDebounce(handler, { delay: debounce, leading, trailing });
      }
      
      if (throttle) {
        return useThrottle(handler, { delay: throttle, leading, trailing });
      }
      
      return handler;
    };
  },
};

// ==================== 默认导出 ====================

export default {
  // 状态管理
  useControlledState,
  // useSyncedState,
  // useStateHistory,
  // useValidatedState,
  // useBatchUpdate,
  // usePersistentState,
  // useStateSelector,

  // 事件处理
  useDebounce,
  useThrottle,
  // useClickHandler,
  // useLongPress,
  // useDrag,
  // useKeyboard,
  // useEventDelegate,

  // 生命周期
  useMounted,
  // useLifecycle,
  // useOnce,
  // useConditionalEffect,
  // useAsyncEffect,
  // useTimer,
  // useDelay,
  // useNetworkState,
  // usePageVisibility,
  // useWindowSize,
  // useScrollPosition,
  // useMediaQuery,

  // 性能优化
  // useMemoizedFunction,
  // useComputedCache,
  // useVirtualList,
  // useLazyLoad,
  // useRequestCache,
  // usePerformanceBatchUpdate,
  // usePriorityUpdates,
  // usePerformanceMonitor,

  // 现有Hooks
  // usePlatform,
  // useTheme,
  // useExistingPerformanceMonitor,
  // useVirtualScroll,

  // 工具函数
  hookUtils,
};