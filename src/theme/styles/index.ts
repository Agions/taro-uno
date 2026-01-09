/**
 * 样式系统主入口
 * 统一导出所有样式模块
 * @module theme/styles
 */

// 基础样式
export * from './base';
export { resetStyles, normalizeStyles, typographyStyles } from './base';

// 通用样式
export * from './common';
export {
  layoutStyles,
  spacingStyles,
  sizingStyles,
  borderStyles,
  shadowStyles,
  animationStyles,
  interactionStyles,
} from './common';

// 混入样式
export * from './mixins';
export { ellipsisStyles, scrollbarStyles, responsiveStyles } from './mixins';

// 变体样式
export * from './variants';
export { sizeVariants, colorVariants, shapeVariants } from './variants';

// 样式创建函数
export * from './createStyles';
export {
  mergeStyles,
  extendStyles,
  deepMergeStyles,
  createComponentStyles,
  createStyles,
  conditionalStyle,
  extractStyleProps,
  composeStyles,
  createResponsiveStyle,
} from './createStyles';

// 类型导出
export type {
  StyleDefinition,
  StyleDefinitionFunction,
  ComponentStyleProps,
  ComputedStyles,
} from './createStyles';
