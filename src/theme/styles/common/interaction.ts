/**
 * 交互样式模块
 * 提供 hover、active、focus 等交互状态相关的样式
 * @module theme/styles/common/interaction
 */

import type { StyleObject } from '../../../types/style';

// ==================== 光标样式 ====================

/**
 * 默认光标
 */
export const cursorDefault: StyleObject = {
  cursor: 'default',
};

/**
 * 指针光标
 */
export const cursorPointer: StyleObject = {
  cursor: 'pointer',
};

/**
 * 等待光标
 */
export const cursorWait: StyleObject = {
  cursor: 'wait',
};

/**
 * 文本光标
 */
export const cursorText: StyleObject = {
  cursor: 'text',
};

/**
 * 移动光标
 */
export const cursorMove: StyleObject = {
  cursor: 'move',
};

/**
 * 禁止光标
 */
export const cursorNotAllowed: StyleObject = {
  cursor: 'not-allowed',
};

/**
 * 帮助光标
 */
export const cursorHelp: StyleObject = {
  cursor: 'help',
};

/**
 * 抓取光标
 */
export const cursorGrab: StyleObject = {
  cursor: 'grab',
};

/**
 * 抓取中光标
 */
export const cursorGrabbing: StyleObject = {
  cursor: 'grabbing',
};

/**
 * 无光标
 */
export const cursorNone: StyleObject = {
  cursor: 'none',
};

// ==================== 用户选择样式 ====================

/**
 * 禁止选择
 */
export const selectNone: StyleObject = {
  userSelect: 'none',
};

/**
 * 允许选择文本
 */
export const selectText: StyleObject = {
  userSelect: 'text',
};

/**
 * 允许选择全部
 */
export const selectAll: StyleObject = {
  userSelect: 'all',
};

/**
 * 自动选择
 */
export const selectAuto: StyleObject = {
  userSelect: 'auto',
};

// ==================== 指针事件样式 ====================

/**
 * 禁止指针事件
 */
export const pointerEventsNone: StyleObject = {
  pointerEvents: 'none',
};

/**
 * 允许指针事件
 */
export const pointerEventsAuto: StyleObject = {
  pointerEvents: 'auto',
};

// ==================== 触摸行为样式 ====================

/**
 * 自动触摸行为
 */
export const touchAuto: StyleObject = {
  touchAction: 'auto',
};

/**
 * 禁止触摸行为
 */
export const touchNone: StyleObject = {
  touchAction: 'none',
};

/**
 * 水平平移触摸
 */
export const touchPanX: StyleObject = {
  touchAction: 'pan-x',
};

/**
 * 垂直平移触摸
 */
export const touchPanY: StyleObject = {
  touchAction: 'pan-y',
};

/**
 * 捏合缩放触摸
 */
export const touchPinchZoom: StyleObject = {
  touchAction: 'pinch-zoom',
};

/**
 * 操作触摸
 */
export const touchManipulation: StyleObject = {
  touchAction: 'manipulation',
};

// ==================== 可点击元素样式 ====================

/**
 * 可点击元素基础样式
 */
export const clickable: StyleObject = {
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'manipulation',
};

/**
 * 禁用元素样式
 */
export const disabled: StyleObject = {
  cursor: 'not-allowed',
  opacity: 0.5,
  pointerEvents: 'none',
};

/**
 * 可拖拽元素样式
 */
export const draggable: StyleObject = {
  cursor: 'grab',
  userSelect: 'none',
  touchAction: 'none',
};

/**
 * 拖拽中元素样式
 */
export const dragging: StyleObject = {
  cursor: 'grabbing',
  userSelect: 'none',
  touchAction: 'none',
};

// ==================== 焦点样式 ====================

/**
 * 焦点轮廓样式
 */
export const focusOutline: StyleObject = {
  outline: '2px solid',
  outlineOffset: '2px',
};

/**
 * 焦点环样式
 */
export const focusRing: StyleObject = {
  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
  outline: 'none',
};

/**
 * 焦点环主色样式
 */
export const focusRingPrimary: StyleObject = {
  boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.5)',
  outline: 'none',
};

/**
 * 焦点环错误样式
 */
export const focusRingError: StyleObject = {
  boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.5)',
  outline: 'none',
};

/**
 * 无焦点样式
 */
export const focusNone: StyleObject = {
  outline: 'none',
  boxShadow: 'none',
};

// ==================== 悬停效果样式 ====================

/**
 * 悬停背景变暗
 */
export const hoverDarken: StyleObject = {
  filter: 'brightness(0.95)',
};

/**
 * 悬停背景变亮
 */
export const hoverLighten: StyleObject = {
  filter: 'brightness(1.05)',
};

/**
 * 悬停放大
 */
export const hoverScale: StyleObject = {
  transform: 'scale(1.02)',
};

/**
 * 悬停上移
 */
export const hoverLift: StyleObject = {
  transform: 'translateY(-2px)',
};

// ==================== 激活效果样式 ====================

/**
 * 激活缩小
 */
export const activeScale: StyleObject = {
  transform: 'scale(0.98)',
};

/**
 * 激活下沉
 */
export const activeSink: StyleObject = {
  transform: 'translateY(1px)',
};

/**
 * 激活变暗
 */
export const activeDarken: StyleObject = {
  filter: 'brightness(0.9)',
};

// ==================== 滚动行为样式 ====================

/**
 * 平滑滚动
 */
export const scrollSmooth: StyleObject = {
  scrollBehavior: 'smooth',
};

/**
 * 自动滚动
 */
export const scrollAuto: StyleObject = {
  scrollBehavior: 'auto',
};

/**
 * 滚动捕捉开始
 */
export const snapStart: StyleObject = {
  scrollSnapAlign: 'start',
};

/**
 * 滚动捕捉居中
 */
export const snapCenter: StyleObject = {
  scrollSnapAlign: 'center',
};

/**
 * 滚动捕捉结束
 */
export const snapEnd: StyleObject = {
  scrollSnapAlign: 'end',
};

// ==================== 完整交互样式集合 ====================

/**
 * 光标样式集合
 */
export const cursorStyles = {
  default: cursorDefault,
  pointer: cursorPointer,
  wait: cursorWait,
  text: cursorText,
  move: cursorMove,
  notAllowed: cursorNotAllowed,
  help: cursorHelp,
  grab: cursorGrab,
  grabbing: cursorGrabbing,
  none: cursorNone,
} as const;

/**
 * 用户选择样式集合
 */
export const selectStyles = {
  none: selectNone,
  text: selectText,
  all: selectAll,
  auto: selectAuto,
} as const;

/**
 * 指针事件样式集合
 */
export const pointerEventsStyles = {
  none: pointerEventsNone,
  auto: pointerEventsAuto,
} as const;

/**
 * 触摸行为样式集合
 */
export const touchStyles = {
  auto: touchAuto,
  none: touchNone,
  panX: touchPanX,
  panY: touchPanY,
  pinchZoom: touchPinchZoom,
  manipulation: touchManipulation,
} as const;

/**
 * 焦点样式集合
 */
export const focusStyles = {
  outline: focusOutline,
  ring: focusRing,
  ringPrimary: focusRingPrimary,
  ringError: focusRingError,
  none: focusNone,
} as const;

/**
 * 悬停效果样式集合
 */
export const hoverStyles = {
  darken: hoverDarken,
  lighten: hoverLighten,
  scale: hoverScale,
  lift: hoverLift,
} as const;

/**
 * 激活效果样式集合
 */
export const activeStyles = {
  scale: activeScale,
  sink: activeSink,
  darken: activeDarken,
} as const;

/**
 * 滚动行为样式集合
 */
export const scrollStyles = {
  smooth: scrollSmooth,
  auto: scrollAuto,
  snapStart,
  snapCenter,
  snapEnd,
} as const;

/**
 * 完整交互样式集合
 */
export const interactionStyles = {
  cursor: cursorStyles,
  select: selectStyles,
  pointerEvents: pointerEventsStyles,
  touch: touchStyles,
  focus: focusStyles,
  hover: hoverStyles,
  active: activeStyles,
  scroll: scrollStyles,
  clickable,
  disabled,
  draggable,
  dragging,
} as const;

export default interactionStyles;
