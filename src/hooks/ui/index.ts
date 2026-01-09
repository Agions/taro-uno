/**
 * UI 相关 Hooks 统一导出
 * @module hooks/ui
 */

export { useTheme, ThemeContext } from './useTheme';
export type { ThemeContextType, UseThemeReturn } from './useTheme';

export { useStyle } from './useStyle';
export type {
  UseStyleReturn,
  ClassNameValue,
  StyleValue,
  ResponsiveBreakpoints,
  InteractionStyles,
  TransformConfig,
  GradientConfig,
  ShadowConfig,
} from './useStyle';

export {
  usePlatform,
  useIsH5,
  useIsMiniProgram,
  useIsReactNative,
  useIsHarmony,
} from './usePlatform';
export type { UsePlatformReturn } from './usePlatform';

export { useResponsive, useMediaQuery, DEFAULT_BREAKPOINTS } from './useResponsive';
export type {
  Breakpoint,
  ScreenSize,
  UseResponsiveReturn,
  UseResponsiveOptions,
} from './useResponsive';

export {
  useMediaQuery as useMediaQueryHook,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './useMediaQuery';

export { useVirtualScroll } from './useVirtualScroll';
export type { VirtualScrollItem, VirtualScrollOptions, VirtualScrollResult } from './useVirtualScroll';
