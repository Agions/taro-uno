/**
 * Taro-Uno UI 主题系统
 * 提供统一的多端主题管理功能
 */

// 主题类型定义
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // 基础颜色
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;

  // 文本颜色
  text: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;

  // 背景颜色
  background: string;
  backgroundCard: string;
  backgroundInput: string;
  backgroundMask: string;

  // 边框颜色
  border: string;
  borderLight: string;
  borderFocus: string;

  // 阴影颜色
  shadow: string;
  shadowLight: string;

  // 特殊颜色
  brand: string;
  accent: string;
  link: string;
  divider: string;
}

export interface ThemeSpacing {
  // 间距单位 (px)
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;

  // 组件间距
  padding: number;
  margin: number;
  gap: number;

  // 响应式断点
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

export interface ThemeTypography {
  // 字体族
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
    heading: string[];
  };

  // 字体大小 (px)
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
  };

  // 字体粗细
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };

  // 行高
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };

  // 字母间距
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
  circle: number;
}

export interface ThemeShadow {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface ThemeAnimation {
  // 动画时长
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };

  // 动画缓动函数
  easing: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };

  // 动画效果
  keyframes: {
    fadeIn: string;
    fadeOut: string;
    slideInUp: string;
    slideInDown: string;
    slideInLeft: string;
    slideInRight: string;
    scaleIn: string;
    scaleOut: string;
  };
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadow: ThemeShadow;
  animation: ThemeAnimation;
  // 平台特定配置
  platform: {
    isH5: boolean;
    isWeapp: boolean;
    isAlipay: boolean;
    isSwan: boolean;
    isTt: boolean;
    isQq: boolean;
    isRn: boolean;
  };
}

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#0ea5e9',
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    text: '#111827',
    textSecondary: '#6b7280',
    textDisabled: '#9ca3af',
    textInverse: '#ffffff',

    background: '#ffffff',
    backgroundCard: '#ffffff',
    backgroundInput: '#f9fafb',
    backgroundMask: 'rgba(0, 0, 0, 0.5)',

    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    borderFocus: '#0ea5e9',

    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',

    brand: '#0ea5e9',
    accent: '#f59e0b',
    link: '#0ea5e9',
    divider: '#e5e7eb',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

    padding: 16,
    margin: 16,
    gap: 16,

    breakpoints: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  typography: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      heading: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: 20,
      sm: 24,
      base: 28,
      lg: 32,
      xl: 36,
      '2xl': 40,
      '3xl': 48,
      '4xl': 56,
      '5xl': 64,
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2.0,
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
    circle: 50,
  },
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
    keyframes: {
      fadeIn: 'fadeIn 0.3s ease-in-out',
      fadeOut: 'fadeOut 0.3s ease-in-out',
      slideInUp: 'slideInUp 0.3s ease-out',
      slideInDown: 'slideInDown 0.3s ease-out',
      slideInLeft: 'slideInLeft 0.3s ease-out',
      slideInRight: 'slideInRight 0.3s ease-out',
      scaleIn: 'scaleIn 0.3s ease-out',
      scaleOut: 'scaleOut 0.3s ease-out',
    },
  },
  platform: {
    isH5: false,
    isWeapp: false,
    isAlipay: false,
    isSwan: false,
    isTt: false,
    isQq: false,
    isRn: false,
  },
};

// 暗色主题配置
export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  mode: 'dark',
  colors: {
    ...defaultTheme.colors,
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textDisabled: '#6b7280',
    textInverse: '#111827',

    background: '#111827',
    backgroundCard: '#1f2937',
    backgroundInput: '#374151',
    backgroundMask: 'rgba(0, 0, 0, 0.8)',

    border: '#374151',
    borderLight: '#4b5563',
    borderFocus: '#0ea5e9',

    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowLight: 'rgba(0, 0, 0, 0.1)',

    divider: '#374151',
  },
};

// 主题工具函数
export const themeUtils = {
  // 获取CSS变量值
  getCSSVariable: (variable: string, theme: ThemeConfig): string => {
    const colorMap: Record<string, string> = {
      '--primary-color': theme.colors.primary,
      '--secondary-color': theme.colors.secondary,
      '--success-color': theme.colors.success,
      '--warning-color': theme.colors.warning,
      '--error-color': theme.colors.error,
      '--info-color': theme.colors.info,
      '--text-color': theme.colors.text,
      '--text-color-secondary': theme.colors.textSecondary,
      '--text-color-disabled': theme.colors.textDisabled,
      '--text-color-inverse': theme.colors.textInverse,
      '--background-color': theme.colors.background,
      '--background-card': theme.colors.backgroundCard,
      '--background-input': theme.colors.backgroundInput,
      '--background-mask': theme.colors.backgroundMask,
      '--border-color': theme.colors.border,
      '--border-light': theme.colors.borderLight,
      '--border-focus': theme.colors.borderFocus,
      '--shadow-color': theme.colors.shadow,
      '--shadow-light': theme.colors.shadowLight,
      '--brand-color': theme.colors.brand,
      '--accent-color': theme.colors.accent,
      '--link-color': theme.colors.link,
      '--divider-color': theme.colors.divider,
    };

    return colorMap[variable] || '';
  },

  // 生成CSS变量字符串
  generateCSSVariables: (theme: ThemeConfig): string => {
    return Object.entries({
      '--primary-color': theme.colors.primary,
      '--secondary-color': theme.colors.secondary,
      '--success-color': theme.colors.success,
      '--warning-color': theme.colors.warning,
      '--error-color': theme.colors.error,
      '--info-color': theme.colors.info,
      '--text-color': theme.colors.text,
      '--text-color-secondary': theme.colors.textSecondary,
      '--text-color-disabled': theme.colors.textDisabled,
      '--text-color-inverse': theme.colors.textInverse,
      '--background-color': theme.colors.background,
      '--background-card': theme.colors.backgroundCard,
      '--background-input': theme.colors.backgroundInput,
      '--background-mask': theme.colors.backgroundMask,
      '--border-color': theme.colors.border,
      '--border-light': theme.colors.borderLight,
      '--border-focus': theme.colors.borderFocus,
      '--shadow-color': theme.colors.shadow,
      '--shadow-light': theme.colors.shadowLight,
      '--brand-color': theme.colors.brand,
      '--accent-color': theme.colors.accent,
      '--link-color': theme.colors.link,
      '--divider-color': theme.colors.divider,
    })
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n  ');
  },

  // 响应式断点工具
  breakpoints: {
    up: (breakpoint: keyof ThemeSpacing['breakpoints']) => {
      const breakpoints = defaultTheme.spacing.breakpoints;
      return `@media (min-width: ${breakpoints[breakpoint]}px)`;
    },
    down: (breakpoint: keyof ThemeSpacing['breakpoints']) => {
      const breakpoints = defaultTheme.spacing.breakpoints;
      return `@media (max-width: ${breakpoints[breakpoint] - 1}px)`;
    },
    between: (min: keyof ThemeSpacing['breakpoints'], max: keyof ThemeSpacing['breakpoints']) => {
      const breakpoints = defaultTheme.spacing.breakpoints;
      return `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`;
    },
  },
};

// 导出默认主题
export default defaultTheme;
