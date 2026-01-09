/**
 * 动画样式模块
 * 提供过渡和动画相关的样式
 * @module theme/styles/common/animation
 */

import type { StyleObject } from '../../../types/style';

// ==================== 过渡时长样式 ====================

/**
 * 无过渡
 */
export const transitionNone: StyleObject = {
  transition: 'none',
};

/**
 * 快速过渡 (75ms)
 */
export const transitionFast: StyleObject = {
  transitionDuration: '75ms',
  transitionTimingFunction: 'ease-out',
};

/**
 * 默认过渡 (150ms)
 */
export const transition: StyleObject = {
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 中等过渡 (200ms)
 */
export const transitionMedium: StyleObject = {
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 慢速过渡 (300ms)
 */
export const transitionSlow: StyleObject = {
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 超慢过渡 (500ms)
 */
export const transitionSlower: StyleObject = {
  transitionDuration: '500ms',
  transitionTimingFunction: 'ease-in-out',
};

// ==================== 过渡属性样式 ====================

/**
 * 全部属性过渡
 */
export const transitionAll: StyleObject = {
  transitionProperty: 'all',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 颜色过渡
 */
export const transitionColors: StyleObject = {
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 透明度过渡
 */
export const transitionOpacity: StyleObject = {
  transitionProperty: 'opacity',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 阴影过渡
 */
export const transitionShadow: StyleObject = {
  transitionProperty: 'box-shadow',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 变换过渡
 */
export const transitionTransform: StyleObject = {
  transitionProperty: 'transform',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
};

// ==================== 缓动函数样式 ====================

/**
 * 线性缓动
 */
export const easeLinear: StyleObject = {
  transitionTimingFunction: 'linear',
};

/**
 * 默认缓动
 */
export const ease: StyleObject = {
  transitionTimingFunction: 'ease',
};

/**
 * 缓入
 */
export const easeIn: StyleObject = {
  transitionTimingFunction: 'ease-in',
};

/**
 * 缓出
 */
export const easeOut: StyleObject = {
  transitionTimingFunction: 'ease-out',
};

/**
 * 缓入缓出
 */
export const easeInOut: StyleObject = {
  transitionTimingFunction: 'ease-in-out',
};

/**
 * 弹性缓动
 */
export const easeBounce: StyleObject = {
  transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// ==================== 动画样式 ====================

/**
 * 无动画
 */
export const animateNone: StyleObject = {
  animation: 'none',
};

/**
 * 旋转动画
 */
export const animateSpin: StyleObject = {
  animation: 'spin 1s linear infinite',
};

/**
 * 脉冲动画
 */
export const animatePulse: StyleObject = {
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
};

/**
 * 弹跳动画
 */
export const animateBounce: StyleObject = {
  animation: 'bounce 1s infinite',
};

/**
 * 闪烁动画
 */
export const animatePing: StyleObject = {
  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
};

// ==================== 变换样式 ====================

/**
 * 缩放变换
 */
export const scale0: StyleObject = { transform: 'scale(0)' };
export const scale50: StyleObject = { transform: 'scale(0.5)' };
export const scale75: StyleObject = { transform: 'scale(0.75)' };
export const scale90: StyleObject = { transform: 'scale(0.9)' };
export const scale95: StyleObject = { transform: 'scale(0.95)' };
export const scale100: StyleObject = { transform: 'scale(1)' };
export const scale105: StyleObject = { transform: 'scale(1.05)' };
export const scale110: StyleObject = { transform: 'scale(1.1)' };
export const scale125: StyleObject = { transform: 'scale(1.25)' };
export const scale150: StyleObject = { transform: 'scale(1.5)' };

/**
 * 旋转变换
 */
export const rotate0: StyleObject = { transform: 'rotate(0deg)' };
export const rotate45: StyleObject = { transform: 'rotate(45deg)' };
export const rotate90: StyleObject = { transform: 'rotate(90deg)' };
export const rotate180: StyleObject = { transform: 'rotate(180deg)' };
export const rotateNeg45: StyleObject = { transform: 'rotate(-45deg)' };
export const rotateNeg90: StyleObject = { transform: 'rotate(-90deg)' };
export const rotateNeg180: StyleObject = { transform: 'rotate(-180deg)' };

/**
 * 平移变换
 */
export const translateX0: StyleObject = { transform: 'translateX(0)' };
export const translateY0: StyleObject = { transform: 'translateY(0)' };
export const translateXFull: StyleObject = { transform: 'translateX(100%)' };
export const translateYFull: StyleObject = { transform: 'translateY(100%)' };
export const translateXNegFull: StyleObject = { transform: 'translateX(-100%)' };
export const translateYNegFull: StyleObject = { transform: 'translateY(-100%)' };
export const translateXHalf: StyleObject = { transform: 'translateX(50%)' };
export const translateYHalf: StyleObject = { transform: 'translateY(50%)' };
export const translateXNegHalf: StyleObject = { transform: 'translateX(-50%)' };
export const translateYNegHalf: StyleObject = { transform: 'translateY(-50%)' };

/**
 * 居中变换
 */
export const translateCenter: StyleObject = {
  transform: 'translate(-50%, -50%)',
};

// ==================== 透明度样式 ====================

export const opacity0: StyleObject = { opacity: 0 };
export const opacity25: StyleObject = { opacity: 0.25 };
export const opacity50: StyleObject = { opacity: 0.5 };
export const opacity75: StyleObject = { opacity: 0.75 };
export const opacity100: StyleObject = { opacity: 1 };

// ==================== 完整动画样式集合 ====================

/**
 * 过渡时长样式集合
 */
export const transitionDurationStyles = {
  none: transitionNone,
  fast: transitionFast,
  default: transition,
  medium: transitionMedium,
  slow: transitionSlow,
  slower: transitionSlower,
} as const;

/**
 * 过渡属性样式集合
 */
export const transitionPropertyStyles = {
  all: transitionAll,
  colors: transitionColors,
  opacity: transitionOpacity,
  shadow: transitionShadow,
  transform: transitionTransform,
} as const;

/**
 * 缓动函数样式集合
 */
export const easingStyles = {
  linear: easeLinear,
  ease,
  in: easeIn,
  out: easeOut,
  inOut: easeInOut,
  bounce: easeBounce,
} as const;

/**
 * 动画样式集合
 */
export const animateStyles = {
  none: animateNone,
  spin: animateSpin,
  pulse: animatePulse,
  bounce: animateBounce,
  ping: animatePing,
} as const;

/**
 * 缩放样式集合
 */
export const scaleStyles = {
  '0': scale0,
  '50': scale50,
  '75': scale75,
  '90': scale90,
  '95': scale95,
  '100': scale100,
  '105': scale105,
  '110': scale110,
  '125': scale125,
  '150': scale150,
} as const;

/**
 * 旋转样式集合
 */
export const rotateStyles = {
  '0': rotate0,
  '45': rotate45,
  '90': rotate90,
  '180': rotate180,
  '-45': rotateNeg45,
  '-90': rotateNeg90,
  '-180': rotateNeg180,
} as const;

/**
 * 平移样式集合
 */
export const translateStyles = {
  x0: translateX0,
  y0: translateY0,
  xFull: translateXFull,
  yFull: translateYFull,
  xNegFull: translateXNegFull,
  yNegFull: translateYNegFull,
  xHalf: translateXHalf,
  yHalf: translateYHalf,
  xNegHalf: translateXNegHalf,
  yNegHalf: translateYNegHalf,
  center: translateCenter,
} as const;

/**
 * 透明度样式集合
 */
export const opacityStyles = {
  '0': opacity0,
  '25': opacity25,
  '50': opacity50,
  '75': opacity75,
  '100': opacity100,
} as const;

/**
 * 完整动画样式集合
 */
export const animationStyles = {
  transition: {
    duration: transitionDurationStyles,
    property: transitionPropertyStyles,
  },
  easing: easingStyles,
  animate: animateStyles,
  scale: scaleStyles,
  rotate: rotateStyles,
  translate: translateStyles,
  opacity: opacityStyles,
} as const;

export default animationStyles;
