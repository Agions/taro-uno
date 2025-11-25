/**
 * 自定义Hooks统一导出文件
 * 提供所有自定义hooks的统一访问入口
 */

// Existing hooks
export * from './useAsync';
export * from './useEventHandling';
export * from './useLifecycle';
export * from './usePerformance';
export * from './usePerformanceMonitor';
export * from './usePlatform';
export * from './useRequest';
export * from './useStateManagement';
export * from './useStyle';
export * from './useTheme';
export * from './useVirtualScroll';
export * from './types';

//Sprint 3: New hooks library
// State management
export * from './useToggle';
export * from './useCounter';
export * from './useStorage';

// Data fetching
export * from './useMutation';

// UI interactions  
export * from './useClickOutside';
// Note: useMediaQuery, useDebounce, useThrottle already exist in useLifecycle and useEventHandling

// Re-export common types
export type { UseRequestOptions, UseRequestResult } from './useRequest';
export type { UseMutationResult } from './useMutation';


