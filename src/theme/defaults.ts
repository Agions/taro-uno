/**
 * 默认主题配置
 * 基于设计令牌系统提供完整的默认主题
 */

import type { ThemeConfig } from './types';
import {
  colorTokens,
  spacingTokens,
  typographyTokens,
  effectsTokens,
  type DesignTokens,
} from './tokens';

// 为向后兼容导出别名
export const defaultColorTokens = colorTokens;
export const defaultSpacingTokens = spacingTokens;
export const defaultTypographyTokens = typographyTokens;
export const defaultBorderRadiusTokens = effectsTokens.borderRadius;
export const defaultBoxShadowTokens = effectsTokens.boxShadow;
export const defaultAnimationTokens = effectsTokens.animation;
export const defaultZIndexTokens = effectsTokens.zIndex;

// 完整的默认设计令牌
export const defaultDesignTokens: DesignTokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  effects: effectsTokens,
};

/**
 * 默认主题配置
 * 使用亮色模式作为默认主题
 */
export const defaultTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: colorTokens.primary[500],
    secondary: colorTokens.secondary[500],
    success: colorTokens.success[500],
    warning: colorTokens.warning[500],
    error: colorTokens.error[500],
    info: colorTokens.info[500],

    text: colorTokens.text.primary,
    textSecondary: colorTokens.text.secondary,
    textDisabled: colorTokens.text.disabled ?? '#9ca3af',
    textInverse: colorTokens.text.inverse ?? '#ffffff',

    background: colorTokens.background.primary,
    backgroundCard: colorTokens.background.card ?? '#ffffff',
    backgroundInput: colorTokens.background.input ?? '#f9fafb',
    backgroundMask: colorTokens.background.mask ?? 'rgba(0, 0, 0, 0.5)',

    border: colorTokens.border.default,
    borderLight: colorTokens.border.light,
    borderFocus: colorTokens.border.focus ?? '#0ea5e9',

    shadow: colorTokens.shadow.default,
    shadowLight: colorTokens.shadow.light,

    brand: colorTokens.primary[500],
    accent: colorTokens.warning[500],
    link: colorTokens.text.link ?? '#0ea5e9',
    divider: colorTokens.border.default,
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
      sans: typographyTokens.fontFamily.sans as string[],
      serif: typographyTokens.fontFamily.serif as string[],
      mono: typographyTokens.fontFamily.mono as string[],
      heading: typographyTokens.fontFamily.display as string[],
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
    none: effectsTokens.boxShadow.none,
    sm: effectsTokens.boxShadow.sm,
    md: effectsTokens.boxShadow.md,
    lg: effectsTokens.boxShadow.lg,
    xl: effectsTokens.boxShadow.xl,
    '2xl': effectsTokens.boxShadow['2xl'],
    inner: effectsTokens.boxShadow.inner,
  },
  animation: {
    duration: {
      fast: effectsTokens.animation.duration['150'],
      normal: effectsTokens.animation.duration['300'],
      slow: effectsTokens.animation.duration['500'],
    },
    easing: {
      linear: effectsTokens.animation.easing.linear,
      ease: effectsTokens.animation.easing.ease,
      easeIn: effectsTokens.animation.easing.easeIn,
      easeOut: effectsTokens.animation.easing.easeOut,
      easeInOut: effectsTokens.animation.easing.easeInOut,
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


/**
 * 获取默认设计令牌
 * @returns 默认设计令牌
 */
export function getDefaultDesignTokens(): DesignTokens {
  return defaultDesignTokens;
}
