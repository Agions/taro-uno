/**
 * 文本省略混入模块
 * 提供单行和多行文本省略的样式混入
 * @module theme/styles/mixins/ellipsis
 */

import type { StyleObject } from '../../../types/style';

/**
 * 单行文本省略
 * 超出部分显示省略号
 */
export const ellipsis: StyleObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

/**
 * 两行文本省略
 * 超出两行显示省略号
 */
export const ellipsis2: StyleObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

/**
 * 三行文本省略
 * 超出三行显示省略号
 */
export const ellipsis3: StyleObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
};

/**
 * 四行文本省略
 * 超出四行显示省略号
 */
export const ellipsis4: StyleObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
};

/**
 * 五行文本省略
 * 超出五行显示省略号
 */
export const ellipsis5: StyleObject = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
};

/**
 * 创建多行文本省略样式
 * @param lines - 行数
 * @returns 多行省略样式对象
 */
export function createEllipsis(lines: number): StyleObject {
  if (lines <= 1) {
    return ellipsis;
  }

  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
  };
}

/**
 * 文本截断（不显示省略号）
 */
export const truncate: StyleObject = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

/**
 * 文本换行
 */
export const textWrap: StyleObject = {
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
};

/**
 * 文本不换行
 */
export const textNowrap: StyleObject = {
  whiteSpace: 'nowrap',
};

/**
 * 文本断词
 */
export const textBreak: StyleObject = {
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
};

/**
 * 文本断所有
 */
export const textBreakAll: StyleObject = {
  wordBreak: 'break-all',
};

/**
 * 文本保持完整
 */
export const textKeepAll: StyleObject = {
  wordBreak: 'keep-all',
};

/**
 * 文本省略样式集合
 */
export const ellipsisStyles = {
  /** 单行省略 */
  single: ellipsis,
  /** 两行省略 */
  '2': ellipsis2,
  /** 三行省略 */
  '3': ellipsis3,
  /** 四行省略 */
  '4': ellipsis4,
  /** 五行省略 */
  '5': ellipsis5,
  /** 截断 */
  truncate,
  /** 换行 */
  wrap: textWrap,
  /** 不换行 */
  nowrap: textNowrap,
  /** 断词 */
  break: textBreak,
  /** 断所有 */
  breakAll: textBreakAll,
  /** 保持完整 */
  keepAll: textKeepAll,
  /** 创建多行省略 */
  create: createEllipsis,
} as const;

export default ellipsisStyles;
