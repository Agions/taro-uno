/**
 * 尺寸样式模块
 * 提供 width 和 height 相关的尺寸样式
 * @module theme/styles/common/sizing
 */

import type { StyleObject } from '../../../types/style';

// ==================== 宽度样式 ====================

/**
 * 自动宽度
 */
export const wAuto: StyleObject = {
  width: 'auto',
};

/**
 * 全宽
 */
export const wFull: StyleObject = {
  width: '100%',
};

/**
 * 屏幕宽度
 */
export const wScreen: StyleObject = {
  width: '100vw',
};

/**
 * 最小内容宽度
 */
export const wMin: StyleObject = {
  width: 'min-content',
};

/**
 * 最大内容宽度
 */
export const wMax: StyleObject = {
  width: 'max-content',
};

/**
 * 适应内容宽度
 */
export const wFit: StyleObject = {
  width: 'fit-content',
};

/**
 * 1/2 宽度
 */
export const wHalf: StyleObject = {
  width: '50%',
};

/**
 * 1/3 宽度
 */
export const wThird: StyleObject = {
  width: '33.333333%',
};

/**
 * 2/3 宽度
 */
export const wTwoThirds: StyleObject = {
  width: '66.666667%',
};

/**
 * 1/4 宽度
 */
export const wQuarter: StyleObject = {
  width: '25%',
};

/**
 * 3/4 宽度
 */
export const wThreeQuarters: StyleObject = {
  width: '75%',
};

// ==================== 固定宽度样式 ====================

export const w0: StyleObject = { width: 0 };
export const w1: StyleObject = { width: '4px' };
export const w2: StyleObject = { width: '8px' };
export const w3: StyleObject = { width: '12px' };
export const w4: StyleObject = { width: '16px' };
export const w5: StyleObject = { width: '20px' };
export const w6: StyleObject = { width: '24px' };
export const w8: StyleObject = { width: '32px' };
export const w10: StyleObject = { width: '40px' };
export const w12: StyleObject = { width: '48px' };
export const w16: StyleObject = { width: '64px' };
export const w20: StyleObject = { width: '80px' };
export const w24: StyleObject = { width: '96px' };
export const w32: StyleObject = { width: '128px' };
export const w40: StyleObject = { width: '160px' };
export const w48: StyleObject = { width: '192px' };
export const w56: StyleObject = { width: '224px' };
export const w64: StyleObject = { width: '256px' };

// ==================== 高度样式 ====================

/**
 * 自动高度
 */
export const hAuto: StyleObject = {
  height: 'auto',
};

/**
 * 全高
 */
export const hFull: StyleObject = {
  height: '100%',
};

/**
 * 屏幕高度
 */
export const hScreen: StyleObject = {
  height: '100vh',
};

/**
 * 最小内容高度
 */
export const hMin: StyleObject = {
  height: 'min-content',
};

/**
 * 最大内容高度
 */
export const hMax: StyleObject = {
  height: 'max-content',
};

/**
 * 适应内容高度
 */
export const hFit: StyleObject = {
  height: 'fit-content',
};

/**
 * 1/2 高度
 */
export const hHalf: StyleObject = {
  height: '50%',
};

// ==================== 固定高度样式 ====================

export const h0: StyleObject = { height: 0 };
export const h1: StyleObject = { height: '4px' };
export const h2: StyleObject = { height: '8px' };
export const h3: StyleObject = { height: '12px' };
export const h4: StyleObject = { height: '16px' };
export const h5: StyleObject = { height: '20px' };
export const h6: StyleObject = { height: '24px' };
export const h8: StyleObject = { height: '32px' };
export const h10: StyleObject = { height: '40px' };
export const h12: StyleObject = { height: '48px' };
export const h16: StyleObject = { height: '64px' };
export const h20: StyleObject = { height: '80px' };
export const h24: StyleObject = { height: '96px' };
export const h32: StyleObject = { height: '128px' };
export const h40: StyleObject = { height: '160px' };
export const h48: StyleObject = { height: '192px' };
export const h56: StyleObject = { height: '224px' };
export const h64: StyleObject = { height: '256px' };

// ==================== 最小/最大尺寸样式 ====================

/**
 * 最小宽度 0
 */
export const minW0: StyleObject = {
  minWidth: 0,
};

/**
 * 最小宽度全宽
 */
export const minWFull: StyleObject = {
  minWidth: '100%',
};

/**
 * 最大宽度无限制
 */
export const maxWNone: StyleObject = {
  maxWidth: 'none',
};

/**
 * 最大宽度全宽
 */
export const maxWFull: StyleObject = {
  maxWidth: '100%',
};

/**
 * 最大宽度屏幕宽度
 */
export const maxWScreen: StyleObject = {
  maxWidth: '100vw',
};

/**
 * 最小高度 0
 */
export const minH0: StyleObject = {
  minHeight: 0,
};

/**
 * 最小高度全高
 */
export const minHFull: StyleObject = {
  minHeight: '100%',
};

/**
 * 最小高度屏幕高度
 */
export const minHScreen: StyleObject = {
  minHeight: '100vh',
};

/**
 * 最大高度无限制
 */
export const maxHNone: StyleObject = {
  maxHeight: 'none',
};

/**
 * 最大高度全高
 */
export const maxHFull: StyleObject = {
  maxHeight: '100%',
};

/**
 * 最大高度屏幕高度
 */
export const maxHScreen: StyleObject = {
  maxHeight: '100vh',
};

// ==================== 尺寸组合样式 ====================

/**
 * 正方形尺寸
 */
export const size0: StyleObject = { width: 0, height: 0 };
export const size1: StyleObject = { width: '4px', height: '4px' };
export const size2: StyleObject = { width: '8px', height: '8px' };
export const size3: StyleObject = { width: '12px', height: '12px' };
export const size4: StyleObject = { width: '16px', height: '16px' };
export const size5: StyleObject = { width: '20px', height: '20px' };
export const size6: StyleObject = { width: '24px', height: '24px' };
export const size8: StyleObject = { width: '32px', height: '32px' };
export const size10: StyleObject = { width: '40px', height: '40px' };
export const size12: StyleObject = { width: '48px', height: '48px' };
export const size16: StyleObject = { width: '64px', height: '64px' };
export const size20: StyleObject = { width: '80px', height: '80px' };
export const size24: StyleObject = { width: '96px', height: '96px' };

/**
 * 全尺寸
 */
export const sizeFull: StyleObject = {
  width: '100%',
  height: '100%',
};

/**
 * 屏幕尺寸
 */
export const sizeScreen: StyleObject = {
  width: '100vw',
  height: '100vh',
};

// ==================== 完整尺寸样式集合 ====================

/**
 * 宽度样式集合
 */
export const widthStyles = {
  auto: wAuto,
  full: wFull,
  screen: wScreen,
  min: wMin,
  max: wMax,
  fit: wFit,
  half: wHalf,
  third: wThird,
  twoThirds: wTwoThirds,
  quarter: wQuarter,
  threeQuarters: wThreeQuarters,
  w0, w1, w2, w3, w4, w5, w6, w8, w10, w12, w16, w20, w24, w32, w40, w48, w56, w64,
} as const;

/**
 * 高度样式集合
 */
export const heightStyles = {
  auto: hAuto,
  full: hFull,
  screen: hScreen,
  min: hMin,
  max: hMax,
  fit: hFit,
  half: hHalf,
  h0, h1, h2, h3, h4, h5, h6, h8, h10, h12, h16, h20, h24, h32, h40, h48, h56, h64,
} as const;

/**
 * 最小/最大尺寸样式集合
 */
export const minMaxStyles = {
  minW0, minWFull,
  maxWNone, maxWFull, maxWScreen,
  minH0, minHFull, minHScreen,
  maxHNone, maxHFull, maxHScreen,
} as const;

/**
 * 正方形尺寸样式集合
 */
export const sizeStyles = {
  size0, size1, size2, size3, size4, size5, size6, size8, size10, size12, size16, size20, size24,
  full: sizeFull,
  screen: sizeScreen,
} as const;

/**
 * 完整尺寸样式集合
 */
export const sizingStyles = {
  width: widthStyles,
  height: heightStyles,
  minMax: minMaxStyles,
  size: sizeStyles,
} as const;

export default sizingStyles;
