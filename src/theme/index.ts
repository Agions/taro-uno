/**
 * Taro-Uno UI 设计系统
 * 提供完整的设计令牌、主题管理和样式系统
 */

// 导出类型定义
export type {
  ThemeMode,
  ThemeConfig,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadow,
  ThemeAnimation,
} from './types';

// 导出默认主题配置
export { defaultTheme } from './defaults';
export { darkTheme, darkColorTokens, darkDesignTokens, generateDarkThemeCSSVariables } from './dark';

// 导出设计令牌系统（从 tokens/ 目录）
export {
  designTokens,
  darkDesignTokens as darkTokens,
  DesignTokensManager,
  tokensManager,
  getColor,
  getSpacing,
  getFontSize,
  getFontWeight,
  getBorderRadius,
  getBoxShadow,
  getAnimationDuration,
  getAnimationEasing,
  getZIndex,
} from './tokens';

export type {
  DesignTokens,
  ColorTokens,
  SpacingTokens,
  TypographyTokens,
  EffectsTokens,
} from './tokens';

// 导出颜色令牌
export { colorTokens, darkColorTokens as darkColors } from './tokens/colors';
export type { ColorTokens as ColorTokensType } from './tokens/colors';

// 导出间距令牌
export { spacingTokens } from './tokens/spacing';
export type { SpacingTokens as SpacingTokensType } from './tokens/spacing';

// 导出字体令牌
export { typographyTokens } from './tokens/typography';
export type { TypographyTokens as TypographyTokensType } from './tokens/typography';

// 导出效果令牌
export { effectsTokens } from './tokens/effects';
export type { EffectsTokens as EffectsTokensType } from './tokens/effects';

// 导出深度合并工具
export {
  deepMerge,
  deepClone,
  deepMergeAll,
  mergeDesignTokens,
  isPlainObject,
  isArray,
  isDate,
  isRegExp,
} from './utils/deepMerge';
export type { DeepMergeOptions } from './utils/deepMerge';

// 导出样式系统（从 styles/ 目录）
export {
  createStyles,
  createComponentStyles,
  mergeStyles,
  extendStyles,
  deepMergeStyles,
  conditionalStyle,
  extractStyleProps,
  composeStyles,
  createResponsiveStyle,
} from './styles';

export type {
  StyleDefinition,
  StyleDefinitionFunction,
  ComponentStyleProps,
  ComputedStyles,
} from './styles';

// 导出设计令牌生成器（从 design-tokens.ts）
export {
  default as DesignTokenGenerator,
  generateDesignTokenCSS,
  generateDarkThemeCSS,
  defaultDesignTokens as designTokensFromGenerator,
  createDesignTokens,
} from './design-tokens';

// 导出默认令牌（从 defaults.ts）
export {
  defaultDesignTokens,
  defaultColorTokens,
  defaultSpacingTokens,
  defaultTypographyTokens,
  defaultBorderRadiusTokens,
  defaultBoxShadowTokens,
  defaultAnimationTokens,
  defaultZIndexTokens,
} from './defaults';

// 主题快捷导出
export * from './types';
export * from './defaults';

// 主题预设
import { defaultTheme } from './defaults';
import { darkTheme } from './dark';

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
};

// 默认导出
export default {
  themes,
  defaultTheme,
  darkTheme,
};
