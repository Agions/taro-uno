/**
 * 边框样式模块
 * 提供边框相关的样式
 * @module theme/styles/common/border
 */

import type { StyleObject } from '../../../types/style';

// ==================== 边框宽度样式 ====================

/**
 * 无边框
 */
export const borderNone: StyleObject = {
  border: 'none',
};

/**
 * 1px 边框
 */
export const border: StyleObject = {
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 2px 边框
 */
export const border2: StyleObject = {
  borderWidth: '2px',
  borderStyle: 'solid',
};

/**
 * 4px 边框
 */
export const border4: StyleObject = {
  borderWidth: '4px',
  borderStyle: 'solid',
};

/**
 * 8px 边框
 */
export const border8: StyleObject = {
  borderWidth: '8px',
  borderStyle: 'solid',
};

// ==================== 单边边框样式 ====================

/**
 * 上边框
 */
export const borderT: StyleObject = {
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
};

/**
 * 右边框
 */
export const borderR: StyleObject = {
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
};

/**
 * 下边框
 */
export const borderB: StyleObject = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
};

/**
 * 左边框
 */
export const borderL: StyleObject = {
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
};

/**
 * 水平边框
 */
export const borderX: StyleObject = {
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
};

/**
 * 垂直边框
 */
export const borderY: StyleObject = {
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
};

// ==================== 边框样式类型 ====================

/**
 * 实线边框
 */
export const borderSolid: StyleObject = {
  borderStyle: 'solid',
};

/**
 * 虚线边框
 */
export const borderDashed: StyleObject = {
  borderStyle: 'dashed',
};

/**
 * 点线边框
 */
export const borderDotted: StyleObject = {
  borderStyle: 'dotted',
};

/**
 * 双线边框
 */
export const borderDouble: StyleObject = {
  borderStyle: 'double',
};

// ==================== 圆角样式 ====================

/**
 * 无圆角
 */
export const roundedNone: StyleObject = {
  borderRadius: 0,
};

/**
 * 小圆角
 */
export const roundedSm: StyleObject = {
  borderRadius: '2px',
};

/**
 * 默认圆角
 */
export const rounded: StyleObject = {
  borderRadius: '4px',
};

/**
 * 中等圆角
 */
export const roundedMd: StyleObject = {
  borderRadius: '6px',
};

/**
 * 大圆角
 */
export const roundedLg: StyleObject = {
  borderRadius: '8px',
};

/**
 * 超大圆角
 */
export const roundedXl: StyleObject = {
  borderRadius: '12px',
};

/**
 * 2倍超大圆角
 */
export const rounded2xl: StyleObject = {
  borderRadius: '16px',
};

/**
 * 3倍超大圆角
 */
export const rounded3xl: StyleObject = {
  borderRadius: '24px',
};

/**
 * 完全圆角
 */
export const roundedFull: StyleObject = {
  borderRadius: '9999px',
};

// ==================== 单边圆角样式 ====================

/**
 * 上边圆角
 */
export const roundedT: StyleObject = {
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
};

/**
 * 右边圆角
 */
export const roundedR: StyleObject = {
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
};

/**
 * 下边圆角
 */
export const roundedB: StyleObject = {
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px',
};

/**
 * 左边圆角
 */
export const roundedL: StyleObject = {
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
};

/**
 * 左上圆角
 */
export const roundedTl: StyleObject = {
  borderTopLeftRadius: '4px',
};

/**
 * 右上圆角
 */
export const roundedTr: StyleObject = {
  borderTopRightRadius: '4px',
};

/**
 * 右下圆角
 */
export const roundedBr: StyleObject = {
  borderBottomRightRadius: '4px',
};

/**
 * 左下圆角
 */
export const roundedBl: StyleObject = {
  borderBottomLeftRadius: '4px',
};

// ==================== 轮廓样式 ====================

/**
 * 无轮廓
 */
export const outlineNone: StyleObject = {
  outline: 'none',
};

/**
 * 默认轮廓
 */
export const outline: StyleObject = {
  outlineWidth: '2px',
  outlineStyle: 'solid',
  outlineOffset: '2px',
};

/**
 * 虚线轮廓
 */
export const outlineDashed: StyleObject = {
  outlineWidth: '2px',
  outlineStyle: 'dashed',
  outlineOffset: '2px',
};

/**
 * 点线轮廓
 */
export const outlineDotted: StyleObject = {
  outlineWidth: '2px',
  outlineStyle: 'dotted',
  outlineOffset: '2px',
};

// ==================== 分割线样式 ====================

/**
 * 水平分割线
 */
export const dividerX: StyleObject = {
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
};

/**
 * 垂直分割线
 */
export const dividerY: StyleObject = {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
};

// ==================== 完整边框样式集合 ====================

/**
 * 边框宽度样式集合
 */
export const borderWidthStyles = {
  none: borderNone,
  default: border,
  '2': border2,
  '4': border4,
  '8': border8,
  t: borderT,
  r: borderR,
  b: borderB,
  l: borderL,
  x: borderX,
  y: borderY,
} as const;

/**
 * 边框样式类型集合
 */
export const borderStyleStyles = {
  solid: borderSolid,
  dashed: borderDashed,
  dotted: borderDotted,
  double: borderDouble,
} as const;

/**
 * 圆角样式集合
 */
export const borderRadiusStyles = {
  none: roundedNone,
  sm: roundedSm,
  default: rounded,
  md: roundedMd,
  lg: roundedLg,
  xl: roundedXl,
  '2xl': rounded2xl,
  '3xl': rounded3xl,
  full: roundedFull,
  t: roundedT,
  r: roundedR,
  b: roundedB,
  l: roundedL,
  tl: roundedTl,
  tr: roundedTr,
  br: roundedBr,
  bl: roundedBl,
} as const;

/**
 * 轮廓样式集合
 */
export const outlineStyles = {
  none: outlineNone,
  default: outline,
  dashed: outlineDashed,
  dotted: outlineDotted,
} as const;

/**
 * 分割线样式集合
 */
export const dividerStyles = {
  x: dividerX,
  y: dividerY,
} as const;

/**
 * 完整边框样式集合
 */
export const borderStyles = {
  width: borderWidthStyles,
  style: borderStyleStyles,
  radius: borderRadiusStyles,
  outline: outlineStyles,
  divider: dividerStyles,
} as const;

export default borderStyles;
