import { useTheme } from './ThemeProvider';

/**
 * 主题工具类Hook
 * 提供便捷的主题值访问方法
 */
export const useThemeUtils = () => {
  const { theme, isDark } = useTheme();

  /**
   * 获取颜色值
   */
  const getColor = (colorPath: string): string => {
    if (colorPath in theme.colors) {
      const key = colorPath as keyof typeof theme.colors;
      const value = theme.colors[key];
      return typeof value === 'string' ? value : getDefaultColor(colorPath);
    }
    return getDefaultColor(colorPath);
  };

  /**
   * 获取间距值
   */
  const getSpacing = (spacingKey: string): string => {
    const v = theme.spacing[spacingKey as keyof typeof theme.spacing];
    if (typeof v === 'number') return `${v}px`;
    if (spacingKey === 'breakpoints') return '';
    return getDefaultSpacing(spacingKey);
  };

  /**
   * 获取字体大小
   */
  const getFontSize = (sizeKey: string): string => {
    const v = theme.typography.fontSize[sizeKey as keyof typeof theme.typography.fontSize];
    if (typeof v === 'number') return `${v}px`;
    return getDefaultFontSize(sizeKey);
  };

  /**
   * 获取行高
   */
  const getLineHeight = (lineHeightKey: string): string => {
    const v = theme.typography.lineHeight[lineHeightKey as keyof typeof theme.typography.lineHeight];
    if (typeof v === 'number') return String(v);
    return getDefaultLineHeight(lineHeightKey);
  };

  /**
   * 获取边框圆角
   */
  const getBorderRadius = (radiusKey: string): string => {
    const v = theme.borderRadius[radiusKey as keyof typeof theme.borderRadius];
    if (typeof v === 'number') return `${v}px`;
    return getDefaultBorderRadius(radiusKey);
  };

  /**
   * 获取阴影
   */
  const getShadow = (shadowKey: string): string => {
    const v = theme.shadow[shadowKey as keyof typeof theme.shadow];
    if (typeof v === 'string') return v;
    return getDefaultShadow(shadowKey);
  };

  /**
   * 获取过渡时间
   */
  const getTransition = (transitionKey: string): string => {
    const v = theme.animation.duration[transitionKey as keyof typeof theme.animation.duration];
    if (typeof v === 'string') return v;
    return getDefaultTransition(transitionKey);
  };

  /**
   * 获取Z-index
   */
  const getZIndex = (zIndexKey: string): number => {
    return getDefaultZIndex(zIndexKey);
  };

  /**
   * 获取断点
   */
  const getBreakpoint = (breakpointKey: string): string => {
    const v = theme.spacing.breakpoints[breakpointKey as keyof typeof theme.spacing.breakpoints];
    if (typeof v === 'number') return `${v}px`;
    return getDefaultBreakpoint(breakpointKey);
  };

  /**
   * 判断是否为当前主题
   */
  const isCurrentTheme = (themeName: 'light' | 'dark'): boolean => {
    return (isDark && themeName === 'dark') || (!isDark && themeName === 'light');
  };

  /**
   * 获取当前主题下的特定值
   */
  const getThemeValue = <T>(lightValue: T, darkValue: T): T => {
    return isDark ? darkValue : lightValue;
  };

  /**
   * 生成CSS变量值
   */
  const getCSSVariable = (variableName: string): string => {
    return `var(--${variableName})`;
  };

  /**
   * 生成主题相关的CSS类名
   */
  const getThemeClass = (baseClass: string): string => {
    return `${baseClass} ${isDark ? `${baseClass}--dark` : `${baseClass}--light`}`.trim();
  };

  return {
    theme,
    isDark,
    getColor,
    getSpacing,
    getFontSize,
    getLineHeight,
    getBorderRadius,
    getShadow,
    getTransition,
    getZIndex,
    getBreakpoint,
    isCurrentTheme,
    getThemeValue,
    getCSSVariable,
    getThemeClass,
  };
};

// ==================== 默认值回退函数 ====================

function getDefaultColor(colorPath: string): string {
  const defaultColors: Record<string, string> = {
    'primary.main': '#3b82f6',
    'primary.light': '#60a5fa',
    'primary.dark': '#2563eb',
    'secondary.main': '#6b7280',
    'secondary.light': '#9ca3af',
    'secondary.dark': '#4b5563',
    'success.main': '#10b981',
    'success.light': '#34d399',
    'success.dark': '#059669',
    'warning.main': '#f59e0b',
    'warning.light': '#fbbf24',
    'warning.dark': '#d97706',
    'error.main': '#ef4444',
    'error.light': '#f87171',
    'error.dark': '#dc2626',
    'info.main': '#06b6d4',
    'info.light': '#22d3ee',
    'info.dark': '#0891b2',
    'background.primary': '#ffffff',
    'background.secondary': '#f3f4f6',
    'background.tertiary': '#e5e7eb',
    'text.primary': '#111827',
    'text.secondary': '#6b7280',
    'text.disabled': '#9ca3af',
    'border.default': '#d1d5db',
    'border.focus': '#3b82f6',
    'border.error': '#ef4444',
  };

  return defaultColors[colorPath] || '#000000';
}

function getDefaultSpacing(spacingKey: string): string {
  const defaultSpacing: Record<string, string> = {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
    'xs': '0.5rem',
    'sm': '0.75rem',
    'md': '1rem',
    'lg': '1.5rem',
    'xl': '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  };

  return defaultSpacing[spacingKey] || '1rem';
}

function getDefaultFontSize(sizeKey: string): string {
  const defaultFontSizes: Record<string, string> = {
    'xs': '0.75rem',
    'sm': '0.875rem',
    'base': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  };

  return defaultFontSizes[sizeKey] || '1rem';
}

function getDefaultLineHeight(lineHeightKey: string): string {
  const defaultLineHeights: Record<string, string> = {
    'none': '1',
    'tight': '1.25',
    'snug': '1.375',
    'normal': '1.5',
    'relaxed': '1.625',
    'loose': '2',
  };

  return defaultLineHeights[lineHeightKey] || '1.5';
}

function getDefaultBorderRadius(radiusKey: string): string {
  const defaultBorderRadius: Record<string, string> = {
    'none': '0',
    'sm': '0.125rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    'full': '9999px',
  };

  return defaultBorderRadius[radiusKey] || '0.375rem';
}

function getDefaultShadow(shadowKey: string): string {
  const defaultShadows: Record<string, string> = {
    'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    'none': 'none',
  };

  return defaultShadows[shadowKey] || 'none';
}

function getDefaultTransition(transitionKey: string): string {
  const defaultTransitions: Record<string, string> = {
    'fast': '150ms ease-in-out',
    'normal': '300ms ease-in-out',
    'slow': '500ms ease-in-out',
  };

  return defaultTransitions[transitionKey] || '300ms ease-in-out';
}

function getDefaultZIndex(zIndexKey: string): number {
  const defaultZIndex: Record<string, number> = {
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
    'modal': 1000,
    'popover': 1010,
    'tooltip': 1020,
    'notification': 1030,
    'header': 1040,
    'footer': 1050,
    'overlay': 1060,
  };

  return defaultZIndex[zIndexKey] || 1;
}

function getDefaultBreakpoint(breakpointKey: string): string {
  const defaultBreakpoints: Record<string, string> = {
    'xs': '0',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  };

  return defaultBreakpoints[breakpointKey] || '768px';
}
