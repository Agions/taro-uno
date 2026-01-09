/**
 * 滚动条样式混入模块
 * 提供自定义滚动条样式
 * @module theme/styles/mixins/scrollbar
 */

import type { StyleObject } from '../../../types/style';

/**
 * 隐藏滚动条
 * 保持滚动功能但隐藏滚动条
 */
export const scrollbarHidden: StyleObject = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  // WebKit 浏览器需要通过伪元素隐藏，这里只能设置基础属性
};

/**
 * 细滚动条
 * 显示细滚动条
 */
export const scrollbarThin: StyleObject = {
  scrollbarWidth: 'thin',
};

/**
 * 自动滚动条
 * 默认滚动条样式
 */
export const scrollbarAuto: StyleObject = {
  scrollbarWidth: 'auto',
};

/**
 * 自定义滚动条基础样式
 * 用于 WebKit 浏览器的滚动条自定义
 */
export const scrollbarCustomBase: StyleObject = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
};

/**
 * 浅色滚动条
 */
export const scrollbarLight: StyleObject = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.05)',
};

/**
 * 深色滚动条
 */
export const scrollbarDark: StyleObject = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
};

/**
 * 主色滚动条
 */
export const scrollbarPrimary: StyleObject = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(14, 165, 233, 0.5) rgba(14, 165, 233, 0.1)',
};

/**
 * 圆角滚动条容器
 * 用于包含圆角滚动条的容器
 */
export const scrollbarRounded: StyleObject = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
  borderRadius: '4px',
};

/**
 * 悬停显示滚动条
 * 默认隐藏，悬停时显示
 */
export const scrollbarHoverShow: StyleObject = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  // 悬停效果需要通过 CSS 伪类实现
};

/**
 * 垂直滚动容器
 */
export const scrollY: StyleObject = {
  overflowY: 'auto',
  overflowX: 'hidden',
};

/**
 * 水平滚动容器
 */
export const scrollX: StyleObject = {
  overflowX: 'auto',
  overflowY: 'hidden',
};

/**
 * 双向滚动容器
 */
export const scrollBoth: StyleObject = {
  overflow: 'auto',
};

/**
 * 平滑滚动
 */
export const scrollbarSmooth: StyleObject = {
  scrollBehavior: 'smooth',
};

/**
 * 滚动捕捉容器 - X轴
 */
export const scrollSnapX: StyleObject = {
  scrollSnapType: 'x mandatory',
  overflowX: 'auto',
  overflowY: 'hidden',
};

/**
 * 滚动捕捉容器 - Y轴
 */
export const scrollSnapY: StyleObject = {
  scrollSnapType: 'y mandatory',
  overflowY: 'auto',
  overflowX: 'hidden',
};

/**
 * 滚动捕捉子项 - 开始
 */
export const scrollSnapStart: StyleObject = {
  scrollSnapAlign: 'start',
};

/**
 * 滚动捕捉子项 - 居中
 */
export const scrollSnapCenter: StyleObject = {
  scrollSnapAlign: 'center',
};

/**
 * 滚动捕捉子项 - 结束
 */
export const scrollSnapEnd: StyleObject = {
  scrollSnapAlign: 'end',
};

/**
 * 过度滚动行为 - 包含
 */
export const overscrollContain: StyleObject = {
  overscrollBehavior: 'contain',
};

/**
 * 过度滚动行为 - 无
 */
export const overscrollNone: StyleObject = {
  overscrollBehavior: 'none',
};

/**
 * 过度滚动行为 - 自动
 */
export const overscrollAuto: StyleObject = {
  overscrollBehavior: 'auto',
};

/**
 * 滚动条样式集合
 */
export const scrollbarStyles = {
  /** 隐藏滚动条 */
  hidden: scrollbarHidden,
  /** 细滚动条 */
  thin: scrollbarThin,
  /** 自动滚动条 */
  auto: scrollbarAuto,
  /** 自定义基础 */
  custom: scrollbarCustomBase,
  /** 浅色滚动条 */
  light: scrollbarLight,
  /** 深色滚动条 */
  dark: scrollbarDark,
  /** 主色滚动条 */
  primary: scrollbarPrimary,
  /** 圆角滚动条 */
  rounded: scrollbarRounded,
  /** 悬停显示 */
  hoverShow: scrollbarHoverShow,
  /** 垂直滚动 */
  scrollY,
  /** 水平滚动 */
  scrollX,
  /** 双向滚动 */
  scrollBoth,
  /** 平滑滚动 */
  smooth: scrollbarSmooth,
  /** 滚动捕捉 */
  snap: {
    x: scrollSnapX,
    y: scrollSnapY,
    start: scrollSnapStart,
    center: scrollSnapCenter,
    end: scrollSnapEnd,
  },
  /** 过度滚动 */
  overscroll: {
    contain: overscrollContain,
    none: overscrollNone,
    auto: overscrollAuto,
  },
} as const;

export default scrollbarStyles;
