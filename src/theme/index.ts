/**
 * Taro-Uno UI 设计系统
 * 提供完整的设计令牌、主题管理、无障碍访问、响应式设计和动画系统
 */

// 导入需要的模块
import { defaultTheme, darkTheme } from './defaults';
import { ColorUtils, ResponsiveUtils, ThemeValidator, ThemePresets } from './utils';
import { createCSSVariables, generateCSSVariablesString } from './variables';
import { createStyleUtils, generateStyles, createStyles } from './styles';
import type { ThemeProvider, useTheme } from './ThemeProvider.types';

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
export { defaultTheme, darkTheme } from './defaults';

// 导出工具函数
export { default as themeUtils, ColorUtils, ResponsiveUtils, ThemeValidator, ThemePresets } from './utils';

// 导出CSS变量系统
export { default as CSSVariableGenerator, createCSSVariables, generateCSSVariablesString } from './variables';
export type { CSSVariables, VariableInheritance, VariableGroup } from './variables';

// 导出样式工具
export { default as createStyleUtils, generateStyles, createStyles, styleUtils } from './styles';
export type { StyleUtils as StyleUtilsType } from './styles';

// 导出设计令牌系统
export {
  default as DesignTokenGenerator,
  createDesignTokens,
  generateDesignTokenCSS,
  generateDarkThemeCSS,
} from './design-tokens';
export type { DesignTokens } from './design-tokens';

// 导出ThemeProvider
export { ThemeProvider, useTheme };

// 主题快捷导出
export * from './types';
export * from './defaults';
export * from './utils';
export * from './variables';
export * from './styles';
export * from './design-tokens';

// 主题预设
export const themes = {
  default: defaultTheme,
  dark: darkTheme,
};

// 主题工具函数集合
export const themeTools = {
  // 颜色工具
  color: ColorUtils,

  // 响应式工具
  responsive: ResponsiveUtils,

  // 验证工具
  validator: ThemeValidator,

  // 预设主题
  presets: ThemePresets,

  // CSS变量生成
  css: {
    createVariables: createCSSVariables,
    generateString: generateCSSVariablesString,
  },

  // 样式工具
  styles: {
    createUtils: createStyleUtils,
    generateStyles: generateStyles,
    createStyles: createStyles,
  },
};

// 默认导出
export default {
  themes,
  themeTools,
  defaultTheme,
  darkTheme,
};
