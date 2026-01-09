/**
 * 通用样式模块导出
 * @module theme/styles/common
 */

export * from './layout';
export * from './spacing';
export * from './sizing';
export * from './border';
export * from './shadow';
export * from './animation';
export * from './interaction';

import layoutStylesDefault from './layout';
import spacingStylesDefault from './spacing';
import sizingStylesDefault from './sizing';
import borderStylesDefault from './border';
import shadowStylesDefault from './shadow';
import animationStylesDefault from './animation';
import interactionStylesDefault from './interaction';

export { default as layoutStyles } from './layout';
export { default as spacingStyles } from './spacing';
export { default as sizingStyles } from './sizing';
export { default as borderStyles } from './border';
export { default as shadowStyles } from './shadow';
export { default as animationStyles } from './animation';
export { default as interactionStyles } from './interaction';

/**
 * 所有通用样式集合
 */
export const commonStyles = {
  layout: layoutStylesDefault,
  spacing: spacingStylesDefault,
  sizing: sizingStylesDefault,
  border: borderStylesDefault,
  shadow: shadowStylesDefault,
  animation: animationStylesDefault,
  interaction: interactionStylesDefault,
} as const;
