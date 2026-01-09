/**
 * useResponsive Hook
 * 响应式断点检测 Hook，提供屏幕尺寸和断点检测功能
 *
 * @example
 * ```typescript
 * const { breakpoint, isMobile, isTablet, isDesktop, width, height } = useResponsive();
 *
 * if (isMobile) {
 *   // 移动端布局
 * }
 *
 * if (breakpoint === 'lg') {
 *   // 大屏布局
 * }
 * ```
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from './useTheme';

/**
 * 断点类型
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * 默认断点配置（单位：px）
 */
export const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

/**
 * 屏幕尺寸信息
 */
export interface ScreenSize {
  /** 屏幕宽度 */
  width: number;
  /** 屏幕高度 */
  height: number;
}

/**
 * useResponsive Hook 返回类型
 */
export interface UseResponsiveReturn {
  /** 当前断点 */
  breakpoint: Breakpoint;
  /** 屏幕宽度 */
  width: number;
  /** 屏幕高度 */
  height: number;
  /** 是否为移动端（xs, sm） */
  isMobile: boolean;
  /** 是否为平板（md） */
  isTablet: boolean;
  /** 是否为桌面端（lg, xl, xxl） */
  isDesktop: boolean;
  /** 是否为超小屏幕 */
  isXs: boolean;
  /** 是否为小屏幕 */
  isSm: boolean;
  /** 是否为中等屏幕 */
  isMd: boolean;
  /** 是否为大屏幕 */
  isLg: boolean;
  /** 是否为超大屏幕 */
  isXl: boolean;
  /** 是否为超超大屏幕 */
  isXxl: boolean;
  /** 是否大于等于指定断点 */
  isUp: (breakpoint: Breakpoint) => boolean;
  /** 是否小于指定断点 */
  isDown: (breakpoint: Breakpoint) => boolean;
  /** 是否在指定断点范围内 */
  isBetween: (start: Breakpoint, end: Breakpoint) => boolean;
  /** 是否仅为指定断点 */
  isOnly: (breakpoint: Breakpoint) => boolean;
  /** 断点配置 */
  breakpoints: Record<Breakpoint, number>;
}

/**
 * useResponsive Hook 配置选项
 */
export interface UseResponsiveOptions {
  /** 自定义断点配置 */
  breakpoints?: Partial<Record<Breakpoint, number>>;
  /** 防抖延迟（毫秒） */
  debounceDelay?: number;
}

/**
 * 获取当前屏幕尺寸
 */
function getScreenSize(): ScreenSize {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * 根据宽度获取断点
 */
function getBreakpoint(width: number, breakpoints: Record<Breakpoint, number>): Breakpoint {
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * 响应式断点检测 Hook
 *
 * @param options 配置选项
 * @returns 响应式相关状态和方法
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { breakpoint, isMobile, isDesktop, isUp } = useResponsive();
 *
 *   return (
 *     <View>
 *       <Text>当前断点: {breakpoint}</Text>
 *       {isMobile && <MobileLayout />}
 *       {isDesktop && <DesktopLayout />}
 *       {isUp('md') && <ShowOnMediumAndUp />}
 *     </View>
 *   );
 * }
 * ```
 */
export function useResponsive(options: UseResponsiveOptions = {}): UseResponsiveReturn {
  const { breakpoints: customBreakpoints, debounceDelay = 100 } = options;

  // 尝试从主题获取断点配置
  let themeBreakpoints: Partial<Record<Breakpoint, number>> = {};
  try {
    const { theme } = useTheme();
    if (theme?.spacing?.breakpoints) {
      themeBreakpoints = theme.spacing.breakpoints as Partial<Record<Breakpoint, number>>;
    }
  } catch {
    // 如果不在 ThemeProvider 中，使用默认断点
  }

  // 合并断点配置
  const breakpoints = useMemo<Record<Breakpoint, number>>(() => {
    return {
      ...DEFAULT_BREAKPOINTS,
      ...themeBreakpoints,
      ...customBreakpoints,
    };
  }, [themeBreakpoints, customBreakpoints]);

  // 屏幕尺寸状态
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  // 监听窗口大小变化
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setScreenSize(getScreenSize());
      }, debounceDelay);
    };

    // 初始化
    setScreenSize(getScreenSize());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debounceDelay]);

  // 当前断点
  const breakpoint = useMemo<Breakpoint>(() => {
    return getBreakpoint(screenSize.width, breakpoints);
  }, [screenSize.width, breakpoints]);

  // 断点检测方法
  const isUp = useCallback(
    (bp: Breakpoint): boolean => {
      return screenSize.width >= breakpoints[bp];
    },
    [screenSize.width, breakpoints],
  );

  const isDown = useCallback(
    (bp: Breakpoint): boolean => {
      return screenSize.width < breakpoints[bp];
    },
    [screenSize.width, breakpoints],
  );

  const isBetween = useCallback(
    (start: Breakpoint, end: Breakpoint): boolean => {
      return screenSize.width >= breakpoints[start] && screenSize.width < breakpoints[end];
    },
    [screenSize.width, breakpoints],
  );

  const isOnly = useCallback(
    (bp: Breakpoint): boolean => {
      const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      const currentIndex = breakpointOrder.indexOf(bp);
      const nextBreakpoint = breakpointOrder[currentIndex + 1];

      if (!nextBreakpoint) {
        return screenSize.width >= breakpoints[bp];
      }

      return screenSize.width >= breakpoints[bp] && screenSize.width < breakpoints[nextBreakpoint];
    },
    [screenSize.width, breakpoints],
  );

  // 计算各断点状态
  const isXs = breakpoint === 'xs';
  const isSm = breakpoint === 'sm';
  const isMd = breakpoint === 'md';
  const isLg = breakpoint === 'lg';
  const isXl = breakpoint === 'xl';
  const isXxl = breakpoint === 'xxl';

  const isMobile = isXs || isSm;
  const isTablet = isMd;
  const isDesktop = isLg || isXl || isXxl;

  return {
    breakpoint,
    width: screenSize.width,
    height: screenSize.height,
    isMobile,
    isTablet,
    isDesktop,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    isUp,
    isDown,
    isBetween,
    isOnly,
    breakpoints,
  };
}

/**
 * 媒体查询 Hook
 * @param query 媒体查询字符串
 * @returns 是否匹配
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

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

export default useResponsive;
