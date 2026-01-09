/**
 * 变体样式模块导出
 * @module theme/styles/variants
 */

export * from './size';
export * from './color';
export * from './shape';

import sizeVariantsDefault from './size';
import colorVariantsDefault from './color';
import shapeVariantsDefault from './shape';

export { default as sizeVariants } from './size';
export { default as colorVariants } from './color';
export { default as shapeVariants } from './shape';

/**
 * 所有变体样式集合
 */
export const variantStyles = {
  size: sizeVariantsDefault,
  color: colorVariantsDefault,
  shape: shapeVariantsDefault,
} as const;
