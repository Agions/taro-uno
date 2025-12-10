/**
 * 自定义Hooks统一导出文件
 * 提供所有自定义hooks的统一访问入口
 */

// State management
export * from './useToggle';
export * from './useCounter';
export * from './useStorage';

export * from './useStateManagement';

export * from './useAsync';

// Event handling - only export non-debounce/throttle hooks
export { useClickHandler, useLongPress, useDrag, useKeyboard, useEventDelegate } from './useEventHandling';

// Lifecycle hooks - only export non-media-query hooks
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
} from './useLifecycle';

// Data fetching
export * from './useRequest';
export * from './useMutation';

// UI interactions
export * from './useClickOutside';
export * from './useEventListener';

// Utility hooks
export * from './useDebounce';
export * from './useDeepCompareEffect';
export * from './usePrevious';

export * from './useMediaQuery';

// Performance
export * from './usePerformance';
export * from './usePerformanceMonitor';

export * from './usePlatform';
export * from './useStyle';
export * from './useTheme';
export * from './useVirtualScroll';
export * from './types';

// Re-export common types
export type { UseRequestOptions, UseRequestResult } from './useRequest';
export type { UseMutationResult } from './useMutation';
