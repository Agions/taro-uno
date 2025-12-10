/**
 * 默认主题配置
 */

import { ThemeConfig } from './types';

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
