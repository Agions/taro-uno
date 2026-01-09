/**
 * 样式混入模块导出
 * @module theme/styles/mixins
 */

export * from './ellipsis';
export * from './scrollbar';
export * from './responsive';

import ellipsisStylesDefault from './ellipsis';
import scrollbarStylesDefault from './scrollbar';
import responsiveStylesDefault from './responsive';

export { default as ellipsisStyles } from './ellipsis';
export { default as scrollbarStyles } from './scrollbar';
export { default as responsiveStyles } from './responsive';

/**
 * 所有混入样式集合
 */
export const mixinStyles = {
  ellipsis: ellipsisStylesDefault,
  scrollbar: scrollbarStylesDefault,
  responsive: responsiveStylesDefault,
} as const;
