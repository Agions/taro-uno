/**
 * 暗色主题配置
 * 基于设计令牌系统提供完整的暗色主题
 */

import type { ThemeConfig } from './types';
import type { ColorTokens, DesignTokens } from './tokens';
import {
  colorTokens,
  spacingTokens,
  typographyTokens,
  effectsTokens,
} from './tokens';
import { defaultTheme } from './defaults';

/**
 * 暗色主题颜色令牌
 * 覆盖亮色主题中需要调整的颜色
 */
export const darkColorTokens: Partial<ColorTokens> = {
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
    disabled: '#6b7280',
    inverse: '#111827',
    link: '#60a5fa',
    placeholder: '#6b7280',
  },
  background: {
    primary: '#111827',
    secondary: '#1f2937',
    tertiary: '#374151',
    card: '#1f2937',
    input: '#374151',
    mask: 'rgba(0, 0, 0, 0.8)',
    hover: '#374151',
    active: '#4b5563',
  },
  border: {
    default: '#374151',
    light: '#4b5563',
    focus: '#60a5fa',
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
  },
  shadow: {
    default: 'rgba(0, 0, 0, 0.3)',
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.5)',
    colored: 'rgba(96, 165, 250, 0.15)',
  },
  interactive: {
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.1)',
    focus: 'rgba(96, 165, 250, 0.2)',
    selected: 'rgba(96, 165, 250, 0.3)',
    disabled: 'rgba(255, 255, 255, 0.1)',
  },
};

/**
 * 暗色主题配置
 * 继承默认主题并覆盖颜色相关配置
 */
export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  mode: 'dark',
  colors: {
    ...defaultTheme.colors,
    // 文本颜色
    text: darkColorTokens.text?.primary ?? '#f9fafb',
    textSecondary: darkColorTokens.text?.secondary ?? '#d1d5db',
    textDisabled: darkColorTokens.text?.disabled ?? '#6b7280',
    textInverse: darkColorTokens.text?.inverse ?? '#111827',

    // 背景颜色
    background: darkColorTokens.background?.primary ?? '#111827',
    backgroundCard: darkColorTokens.background?.card ?? '#1f2937',
    backgroundInput: darkColorTokens.background?.input ?? '#374151',
    backgroundMask: darkColorTokens.background?.mask ?? 'rgba(0, 0, 0, 0.8)',

    // 边框颜色
    border: darkColorTokens.border?.default ?? '#374151',
    borderLight: darkColorTokens.border?.light ?? '#4b5563',
    borderFocus: darkColorTokens.border?.focus ?? '#60a5fa',

    // 阴影颜色
    shadow: darkColorTokens.shadow?.default ?? 'rgba(0, 0, 0, 0.3)',
    shadowLight: darkColorTokens.shadow?.light ?? 'rgba(0, 0, 0, 0.1)',

    // 链接和分割线
    link: darkColorTokens.text?.link ?? '#60a5fa',
    divider: darkColorTokens.border?.default ?? '#374151',
  },
};


/**
 * 暗色主题设计令牌
 * 合并默认令牌和暗色主题颜色令牌
 */
export const darkDesignTokens: DesignTokens = {
  colors: {
    ...colorTokens,
    text: darkColorTokens.text ?? colorTokens.text,
    background: darkColorTokens.background ?? colorTokens.background,
    border: darkColorTokens.border ?? colorTokens.border,
    shadow: darkColorTokens.shadow ?? colorTokens.shadow,
    interactive: darkColorTokens.interactive ?? colorTokens.interactive,
  },
  spacing: spacingTokens,
  typography: typographyTokens,
  effects: effectsTokens,
};

/**
 * 获取暗色主题设计令牌
 * @returns 暗色主题设计令牌
 */
export function getDarkDesignTokens(): DesignTokens {
  return darkDesignTokens;
}

/**
 * 生成暗色主题 CSS 变量
 * @returns CSS 变量字符串
 */
export function generateDarkThemeCSSVariables(): string {
  let css = '[data-theme="dark"] {\n';

  // 生成文本颜色变量
  if (darkColorTokens.text) {
    Object.entries(darkColorTokens.text).forEach(([key, value]) => {
      css += `  --colors-text-${key}: ${value};\n`;
    });
  }

  // 生成背景颜色变量
  if (darkColorTokens.background) {
    Object.entries(darkColorTokens.background).forEach(([key, value]) => {
      css += `  --colors-background-${key}: ${value};\n`;
    });
  }

  // 生成边框颜色变量
  if (darkColorTokens.border) {
    Object.entries(darkColorTokens.border).forEach(([key, value]) => {
      css += `  --colors-border-${key}: ${value};\n`;
    });
  }

  // 生成阴影颜色变量
  if (darkColorTokens.shadow) {
    Object.entries(darkColorTokens.shadow).forEach(([key, value]) => {
      css += `  --colors-shadow-${key}: ${value};\n`;
    });
  }

  // 生成交互颜色变量
  if (darkColorTokens.interactive) {
    Object.entries(darkColorTokens.interactive).forEach(([key, value]) => {
      css += `  --colors-interactive-${key}: ${value};\n`;
    });
  }

  css += '}\n';

  return css;
}
