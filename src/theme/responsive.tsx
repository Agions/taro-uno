import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * 断点配置
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * 断点顺序
 */
const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/**
 * 屏幕尺寸类型
 */
export interface ScreenSize {
  width: number;
  height: number;
}

/**
 * 响应式上下文类型
 */
interface ResponsiveContextType {
  screenSize: ScreenSize;
  currentBreakpoint: keyof typeof breakpoints;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  matches: (breakpoint: keyof typeof breakpoints) => boolean;
  matchesMinWidth: (width: number) => boolean;
  matchesMaxWidth: (width: number) => boolean;
  getResponsiveValue: <T>(values: Partial<Record<string, T>>, defaultValue: T) => T;
}

/**
 * 响应式上下文
 */
const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

/**
 * 响应式提供者组件
 */
export function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  // 更新屏幕尺寸
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 获取当前断点
  const getCurrentBreakpoint = useCallback(() => {
    const width = screenSize.width;
    let currentBreakpoint: keyof typeof breakpoints = 'xs';

    for (const [key, value] of Object.entries(breakpoints)) {
      if (width >= value) {
        currentBreakpoint = key as keyof typeof breakpoints;
      }
    }

    return currentBreakpoint;
  }, [screenSize.width]);

  const currentBreakpoint = getCurrentBreakpoint();

  // 响应式判断
  const isMobile = screenSize.width < breakpoints.md;
  const isTablet = screenSize.width >= breakpoints.md && screenSize.width < breakpoints.lg;
  const isDesktop = screenSize.width >= breakpoints.lg;

  // 断点匹配检查
  const matches = useCallback((breakpoint: keyof typeof breakpoints) => {
    return screenSize.width >= breakpoints[breakpoint];
  }, [screenSize.width]);

  const matchesMinWidth = useCallback((width: number) => {
    return screenSize.width >= width;
  }, [screenSize.width]);

  const matchesMaxWidth = useCallback((width: number) => {
    return screenSize.width <= width;
  }, [screenSize.width]);

  // 获取响应式值
  const getResponsiveValue = useCallback(<T,>(
    values: Partial<Record<string, T>>,
    defaultValue: T
  ): T => {
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint as typeof breakpointOrder[number]);
    
    // 从当前断点开始，向上查找第一个匹配的值
    for (let i = currentIndex; i >= 0; i--) {
      const breakpoint = breakpointOrder[i];
      if (values[breakpoint as keyof typeof values] !== undefined) {
        return values[breakpoint as keyof typeof values] as T;
      }
    }
    
    return defaultValue;
  }, [currentBreakpoint]);

  const contextValue: ResponsiveContextType = {
    screenSize,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    matches,
    matchesMinWidth,
    matchesMaxWidth,
    getResponsiveValue,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

/**
 * 使用响应式上下文的 Hook
 */
export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
}

/**
 * 响应式值 Hook
 */
export function useResponsiveValue<T>(
  values: Partial<Record<string, T>>,
  defaultValue: T
): T {
  const { getResponsiveValue } = useResponsive();
  return getResponsiveValue(values, defaultValue);
}

/**
 * 断点 Hook
 */
export function useBreakpoint(): keyof typeof breakpoints {
  const { currentBreakpoint } = useResponsive();
  return currentBreakpoint;
}

/**
 * 屏幕尺寸 Hook
 */
export function useScreenSize(): ScreenSize {
  const { screenSize } = useResponsive();
  return screenSize;
}

/**
 * 设备类型 Hook
 */
export function useDeviceType() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export default ResponsiveProvider;