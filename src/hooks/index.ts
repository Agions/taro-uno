/**
 * 自定义 Hooks 统一导出文件
 * 提供所有自定义 hooks 的统一访问入口
 *
 * @module hooks
 * @description 导出所有自定义 Hooks
 */

// ==================== UI Hooks ====================
export {
  useTheme,
  ThemeContext,
  useStyle,
  usePlatform,
  useIsH5,
  useIsMiniProgram,
  useIsReactNative,
  useIsHarmony,
  useResponsive,
  useMediaQuery,
  DEFAULT_BREAKPOINTS,
  useMediaQueryHook,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useVirtualScroll,
} from './ui';
export type {
  ThemeContextType,
  UseThemeReturn,
  UseStyleReturn,
  ClassNameValue,
  StyleValue,
  ResponsiveBreakpoints,
  InteractionStyles,
  TransformConfig,
  GradientConfig,
  ShadowConfig,
  UsePlatformReturn,
  Breakpoint,
  ScreenSize,
  UseResponsiveReturn,
  UseResponsiveOptions,
  VirtualScrollItem,
  VirtualScrollOptions,
  VirtualScrollResult,
} from './ui';

// ==================== State Hooks ====================
export {
  useBoolean,
  useToggle,
  useCounter,
  usePrevious,
  useLocalStorage,
  useSessionStorage,
} from './state';
export type {
  UseBooleanReturn,
  UseBooleanOptions,
  UseToggleReturn,
  UseToggleOptions,
  UseCounterOptions,
  UseCounterReturn,
  UseStorageOptions,
} from './state';

// ==================== Lifecycle Hooks ====================
export {
  useMount,
  useMounted,
  useIsMounted,
  useUnmount,
  useCleanup,
  useConditionalUnmount,
} from './lifecycle';
export type { MountCallback, UnmountCallback } from './lifecycle';

// ==================== Effect Hooks ====================
export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedEffect,
  useThrottle,
  useThrottledCallback,
  useThrottledEffect,
  useDeepCompareEffect,
  useDeepCompareLayoutEffect,
  useMemoizedFunction,
  useComputedCache,
  useVirtualList,
  useLazyLoad,
  useRequestCache,
  useBatchUpdate,
  usePriorityUpdates,
  usePerformanceMonitor,
} from './effect';
export type {
  UseDebounceOptions,
  UseDebouncedCallbackReturn,
  UseThrottleOptions,
  UseThrottledCallbackReturn,
  PerformanceMetrics,
  PerformanceMonitorOptions,
} from './effect';

// ==================== Async Hooks ====================
export {
  useRequest,
  useMutation,
  usePost,
  usePut,
  usePatch,
  useDelete,
} from './async';
export type {
  RequestService,
  UseRequestOptions,
  UseRequestReturn,
  UseMutationResult,
} from './async';

// ==================== DOM Hooks ====================
export {
  useClickOutside,
  useEventListener,
  useClickHandler,
  useLongPress,
  useDrag,
  useKeyboard,
  useEventDelegate,
} from './dom';

// ==================== Types ====================
export * from './types';
