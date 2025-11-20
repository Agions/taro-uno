/**
 * 设计令牌统一导出
 * 提供统一的设计令牌访问接口
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './effects';

import { colorTokens, darkColorTokens, type ColorTokens } from './colors';
import { spacingTokens, type SpacingTokens } from './spacing';
import { typographyTokens, type TypographyTokens } from './typography';
import { effectsTokens, type EffectsTokens } from './effects';

// 完整的设计令牌接口
export interface DesignTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  effects: EffectsTokens;
}

// 默认设计令牌
export const designTokens: DesignTokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  effects: effectsTokens,
};

// 暗色主题设计令牌
export const darkDesignTokens: DesignTokens = {
  colors: { ...colorTokens, ...darkColorTokens },
  spacing: spacingTokens,
  typography: typographyTokens,
  effects: effectsTokens,
};

// 设计令牌工具类
export class DesignTokensManager {
  private tokens: DesignTokens;

  constructor(tokens: DesignTokens = designTokens) {
    this.tokens = tokens;
  }

  /**
   * 获取颜色令牌
   */
  getColor(path: string): string {
    const keys = path.split('.');
    let value: any = this.tokens.colors;

    for (const key of keys) {
      value = value?.[key];
    }

    return value || '#000000';
  }

  /**
   * 获取间距令牌
   */
  getSpacing(key: string): string {
    return String(this.tokens.spacing[key as keyof SpacingTokens] || '0');
  }

  /**
   * 获取字体大小
   */
  getFontSize(key: string): string {
    return this.tokens.typography.fontSize[key as keyof typeof this.tokens.typography.fontSize] || '16px';
  }

  /**
   * 获取字体粗细
   */
  getFontWeight(key: string): string {
    return this.tokens.typography.fontWeight[key as keyof typeof this.tokens.typography.fontWeight] || '400';
  }

  /**
   * 获取圆角
   */
  getBorderRadius(key: string): string {
    return String(this.tokens.effects.borderRadius[key as keyof typeof this.tokens.effects.borderRadius] || '0');
  }

  /**
   * 获取阴影
   */
  getBoxShadow(key: string): string {
    return String(this.tokens.effects.boxShadow[key as keyof typeof this.tokens.effects.boxShadow] || 'none');
  }

  /**
   * 获取动画持续时间
   */
  getAnimationDuration(key: string): string {
    const duration = this.tokens.effects.animation.duration as Record<string, string>;
    return duration[key] || '300ms';
  }

  /**
   * 获取动画缓动函数
   */
  getAnimationEasing(key: string): string {
    return this.tokens.effects.animation.easing[key as keyof typeof this.tokens.effects.animation.easing] || 'ease';
  }

  /**
   * 获取Z-index
   */
  getZIndex(key: string): string {
    return this.tokens.effects.zIndex[key as keyof typeof this.tokens.effects.zIndex] || 'auto';
  }

  /**
   * 生成 CSS 变量
   */
  generateCSSVariables(): string {
    let css = ':root {\n';

    // 递归生成变量
    const generateSection = (obj: any, prefix: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          generateSection(value, `${prefix}${key}-`);
        } else if (Array.isArray(value)) {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${value.join(', ')};\n`;
        } else {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${value};\n`;
        }
      });
    };

    generateSection(this.tokens);
    css += '}\n';

    return css;
  }

  /**
   * 生成暗色主题 CSS 变量
   */
  generateDarkThemeCSSVariables(): string {
    let css = '[data-theme="dark"] {\n';

    // 只生成颜色相关的变量
    const generateColorSection = (obj: any, prefix: string = 'colors-') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          generateColorSection(value, `${prefix}${key}-`);
        } else {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${value};\n`;
        }
      });
    };

    if (darkColorTokens) {
      generateColorSection(darkColorTokens);
    }

    css += '}\n';

    return css;
  }

  /**
   * 转换为 CSS 自定义属性
   */
  toCSSCustomProperty(path: string): string {
    return `--${path.replace(/\./g, '-')}`;
  }

  /**
   * 从 CSS 自定义属性获取令牌
   */
  fromCSSCustomProperty(property: string): string {
    return property.replace(/^--/, '').replace(/-/g, '.');
  }

  /**
   * 获取所有令牌
   */
  getAllTokens(): DesignTokens {
    return this.tokens;
  }

  /**
   * 更新令牌
   */
  updateTokens(tokens: Partial<DesignTokens>): void {
    this.tokens = {
      ...this.tokens,
      ...tokens,
    };
  }
}

// 导出默认实例
export const tokensManager = new DesignTokensManager();

// 导出工具函数
export const getColor = (path: string) => tokensManager.getColor(path);
export const getSpacing = (key: string) => tokensManager.getSpacing(key);
export const getFontSize = (key: string) => tokensManager.getFontSize(key);
export const getFontWeight = (key: string) => tokensManager.getFontWeight(key);
export const getBorderRadius = (key: string) => tokensManager.getBorderRadius(key);
export const getBoxShadow = (key: string) => tokensManager.getBoxShadow(key);
export const getAnimationDuration = (key: string) => tokensManager.getAnimationDuration(key);
export const getAnimationEasing = (key: string) => tokensManager.getAnimationEasing(key);
export const getZIndex = (key: string) => tokensManager.getZIndex(key);
