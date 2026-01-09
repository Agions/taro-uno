/**
 * 副作用 Hooks 统一导出
 * @module hooks/effect
 */

export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedEffect,
} from './useDebounce';
export type {
  UseDebounceOptions,
  UseDebouncedCallbackReturn,
} from './useDebounce';

export {
  useThrottle,
  useThrottledCallback,
  useThrottledEffect,
} from './useThrottle';
export type {
  UseThrottleOptions,
  UseThrottledCallbackReturn,
} from './useThrottle';

export { useDeepCompareEffect, useDeepCompareLayoutEffect } from './useDeepCompareEffect';

export {
  useMemoizedFunction,
  useComputedCache,
  useVirtualList,
  useLazyLoad,
  useRequestCache,
  useBatchUpdate,
  usePriorityUpdates,
} from './usePerformance';

export { usePerformanceMonitor } from './usePerformanceMonitor';
export type { PerformanceMetrics, PerformanceMonitorOptions } from './usePerformanceMonitor';
