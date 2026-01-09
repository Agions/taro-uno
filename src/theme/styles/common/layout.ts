/**
 * 布局样式模块
 * 提供 Flexbox、Grid 和定位相关的布局样式
 * @module theme/styles/common/layout
 */

import type { StyleObject } from '../../../types/style';

// ==================== Flexbox 布局样式 ====================

/**
 * Flex 容器样式
 */
export const flex: StyleObject = {
  display: 'flex',
};

/**
 * 内联 Flex 容器样式
 */
export const inlineFlex: StyleObject = {
  display: 'inline-flex',
};

/**
 * Flex 行方向样式
 */
export const flexRow: StyleObject = {
  display: 'flex',
  flexDirection: 'row',
};

/**
 * Flex 行反向样式
 */
export const flexRowReverse: StyleObject = {
  display: 'flex',
  flexDirection: 'row-reverse',
};

/**
 * Flex 列方向样式
 */
export const flexCol: StyleObject = {
  display: 'flex',
  flexDirection: 'column',
};

/**
 * Flex 列反向样式
 */
export const flexColReverse: StyleObject = {
  display: 'flex',
  flexDirection: 'column-reverse',
};

/**
 * Flex 换行样式
 */
export const flexWrap: StyleObject = {
  flexWrap: 'wrap',
};

/**
 * Flex 不换行样式
 */
export const flexNowrap: StyleObject = {
  flexWrap: 'nowrap',
};

/**
 * Flex 反向换行样式
 */
export const flexWrapReverse: StyleObject = {
  flexWrap: 'wrap-reverse',
};

/**
 * Flex 子项自动增长样式
 */
export const flexGrow: StyleObject = {
  flexGrow: 1,
};

/**
 * Flex 子项不增长样式
 */
export const flexGrowNone: StyleObject = {
  flexGrow: 0,
};

/**
 * Flex 子项自动收缩样式
 */
export const flexShrink: StyleObject = {
  flexShrink: 1,
};

/**
 * Flex 子项不收缩样式
 */
export const flexShrinkNone: StyleObject = {
  flexShrink: 0,
};

/**
 * Flex 1 样式
 */
export const flex1: StyleObject = {
  flex: 1,
};

/**
 * Flex auto 样式
 */
export const flexAuto: StyleObject = {
  flex: '1 1 auto',
};

/**
 * Flex initial 样式
 */
export const flexInitial: StyleObject = {
  flex: '0 1 auto',
};

/**
 * Flex none 样式
 */
export const flexNone: StyleObject = {
  flex: 'none',
};

// ==================== 对齐样式 ====================

/**
 * 主轴起始对齐
 */
export const justifyStart: StyleObject = {
  justifyContent: 'flex-start',
};

/**
 * 主轴居中对齐
 */
export const justifyCenter: StyleObject = {
  justifyContent: 'center',
};

/**
 * 主轴末端对齐
 */
export const justifyEnd: StyleObject = {
  justifyContent: 'flex-end',
};

/**
 * 主轴两端对齐
 */
export const justifyBetween: StyleObject = {
  justifyContent: 'space-between',
};

/**
 * 主轴均匀分布
 */
export const justifyAround: StyleObject = {
  justifyContent: 'space-around',
};

/**
 * 主轴均匀分布（包含两端）
 */
export const justifyEvenly: StyleObject = {
  justifyContent: 'space-evenly',
};

/**
 * 交叉轴起始对齐
 */
export const itemsStart: StyleObject = {
  alignItems: 'flex-start',
};

/**
 * 交叉轴居中对齐
 */
export const itemsCenter: StyleObject = {
  alignItems: 'center',
};

/**
 * 交叉轴末端对齐
 */
export const itemsEnd: StyleObject = {
  alignItems: 'flex-end',
};

/**
 * 交叉轴拉伸对齐
 */
export const itemsStretch: StyleObject = {
  alignItems: 'stretch',
};

/**
 * 交叉轴基线对齐
 */
export const itemsBaseline: StyleObject = {
  alignItems: 'baseline',
};

/**
 * 水平垂直居中
 */
export const flexCenter: StyleObject = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/**
 * 水平两端垂直居中
 */
export const flexBetweenCenter: StyleObject = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

// ==================== 定位样式 ====================

/**
 * 相对定位样式
 */
export const relative: StyleObject = {
  position: 'relative',
};

/**
 * 绝对定位样式
 */
export const absolute: StyleObject = {
  position: 'absolute',
};

/**
 * 固定定位样式
 */
export const fixed: StyleObject = {
  position: 'fixed',
};

/**
 * 粘性定位样式
 */
export const sticky: StyleObject = {
  position: 'sticky',
};

/**
 * 静态定位样式
 */
export const staticPosition: StyleObject = {
  position: 'static',
};

/**
 * 绝对定位填充父容器
 */
export const absoluteFill: StyleObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * 固定定位填充视口
 */
export const fixedFill: StyleObject = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * 绝对定位居中
 */
export const absoluteCenter: StyleObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

// ==================== 显示样式 ====================

/**
 * 块级显示
 */
export const block: StyleObject = {
  display: 'block',
};

/**
 * 内联显示
 */
export const inline: StyleObject = {
  display: 'inline',
};

/**
 * 内联块级显示
 */
export const inlineBlock: StyleObject = {
  display: 'inline-block',
};

/**
 * 隐藏显示
 */
export const hidden: StyleObject = {
  display: 'none',
};

/**
 * 可见性隐藏
 */
export const invisible: StyleObject = {
  visibility: 'hidden',
};

/**
 * 可见性显示
 */
export const visible: StyleObject = {
  visibility: 'visible',
};

// ==================== 溢出样式 ====================

/**
 * 溢出隐藏
 */
export const overflowHidden: StyleObject = {
  overflow: 'hidden',
};

/**
 * 溢出自动
 */
export const overflowAuto: StyleObject = {
  overflow: 'auto',
};

/**
 * 溢出滚动
 */
export const overflowScroll: StyleObject = {
  overflow: 'scroll',
};

/**
 * 溢出可见
 */
export const overflowVisible: StyleObject = {
  overflow: 'visible',
};

/**
 * X轴溢出隐藏
 */
export const overflowXHidden: StyleObject = {
  overflowX: 'hidden',
};

/**
 * Y轴溢出隐藏
 */
export const overflowYHidden: StyleObject = {
  overflowY: 'hidden',
};

/**
 * X轴溢出自动
 */
export const overflowXAuto: StyleObject = {
  overflowX: 'auto',
};

/**
 * Y轴溢出自动
 */
export const overflowYAuto: StyleObject = {
  overflowY: 'auto',
};

// ==================== 完整布局样式集合 ====================

/**
 * Flex 布局样式集合
 */
export const flexStyles = {
  flex,
  inlineFlex,
  row: flexRow,
  rowReverse: flexRowReverse,
  col: flexCol,
  colReverse: flexColReverse,
  wrap: flexWrap,
  nowrap: flexNowrap,
  wrapReverse: flexWrapReverse,
  grow: flexGrow,
  growNone: flexGrowNone,
  shrink: flexShrink,
  shrinkNone: flexShrinkNone,
  flex1,
  auto: flexAuto,
  initial: flexInitial,
  none: flexNone,
  center: flexCenter,
  betweenCenter: flexBetweenCenter,
} as const;

/**
 * 对齐样式集合
 */
export const alignStyles = {
  justifyStart,
  justifyCenter,
  justifyEnd,
  justifyBetween,
  justifyAround,
  justifyEvenly,
  itemsStart,
  itemsCenter,
  itemsEnd,
  itemsStretch,
  itemsBaseline,
} as const;

/**
 * 定位样式集合
 */
export const positionStyles = {
  relative,
  absolute,
  fixed,
  sticky,
  static: staticPosition,
  absoluteFill,
  fixedFill,
  absoluteCenter,
} as const;

/**
 * 显示样式集合
 */
export const displayStyles = {
  block,
  inline,
  inlineBlock,
  hidden,
  invisible,
  visible,
} as const;

/**
 * 溢出样式集合
 */
export const overflowStyles = {
  hidden: overflowHidden,
  auto: overflowAuto,
  scroll: overflowScroll,
  visible: overflowVisible,
  xHidden: overflowXHidden,
  yHidden: overflowYHidden,
  xAuto: overflowXAuto,
  yAuto: overflowYAuto,
} as const;

/**
 * 完整布局样式集合
 */
export const layoutStyles = {
  flex: flexStyles,
  align: alignStyles,
  position: positionStyles,
  display: displayStyles,
  overflow: overflowStyles,
} as const;

export default layoutStyles;
