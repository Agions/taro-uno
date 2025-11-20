/**
 * 主题系统类型定义
 */

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;

  text: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;

  background: string;
  backgroundCard: string;
  backgroundInput: string;
  backgroundMask: string;

  border: string;
  borderLight: string;
  borderFocus: string;

  shadow: string;
  shadowLight: string;

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
  // 主题元数据
  metadata?: {
    version: string;
    author?: string;
    description?: string;
    created: string;
    modified?: string;
  };
  // 自定义主题配置
  custom?: Record<string, unknown>;
}
