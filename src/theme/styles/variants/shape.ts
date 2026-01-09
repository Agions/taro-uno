/**
 * 形状变体样式模块
 * 提供组件形状变体的样式定义
 * @module theme/styles/variants/shape
 */

import type { StyleObject } from '../../../types/style';
import type { Shape } from '../../../types/common';

// ==================== 按钮形状变体 ====================

/**
 * 默认按钮形状
 */
export const buttonShapeDefault: StyleObject = {
  borderRadius: '6px',
};

/**
 * 圆角按钮形状
 */
export const buttonShapeRound: StyleObject = {
  borderRadius: '9999px',
};

/**
 * 圆形按钮形状
 */
export const buttonShapeCircle: StyleObject = {
  borderRadius: '50%',
  padding: 0,
  aspectRatio: '1',
};

/**
 * 按钮形状变体集合
 */
export const buttonShapeVariants: Record<Shape, StyleObject> = {
  default: buttonShapeDefault,
  round: buttonShapeRound,
  circle: buttonShapeCircle,
};

// ==================== 输入框形状变体 ====================

/**
 * 默认输入框形状
 */
export const inputShapeDefault: StyleObject = {
  borderRadius: '6px',
};

/**
 * 圆角输入框形状
 */
export const inputShapeRound: StyleObject = {
  borderRadius: '9999px',
};

/**
 * 圆形输入框形状（用于搜索框等）
 */
export const inputShapeCircle: StyleObject = {
  borderRadius: '50%',
};

/**
 * 输入框形状变体集合
 */
export const inputShapeVariants: Record<Shape, StyleObject> = {
  default: inputShapeDefault,
  round: inputShapeRound,
  circle: inputShapeCircle,
};

// ==================== 头像形状变体 ====================

/**
 * 默认头像形状（方形带圆角）
 */
export const avatarShapeDefault: StyleObject = {
  borderRadius: '4px',
};

/**
 * 圆角头像形状
 */
export const avatarShapeRound: StyleObject = {
  borderRadius: '8px',
};

/**
 * 圆形头像形状
 */
export const avatarShapeCircle: StyleObject = {
  borderRadius: '50%',
};

/**
 * 头像形状变体集合
 */
export const avatarShapeVariants: Record<Shape, StyleObject> = {
  default: avatarShapeDefault,
  round: avatarShapeRound,
  circle: avatarShapeCircle,
};

// ==================== 卡片形状变体 ====================

/**
 * 默认卡片形状
 */
export const cardShapeDefault: StyleObject = {
  borderRadius: '8px',
};

/**
 * 圆角卡片形状
 */
export const cardShapeRound: StyleObject = {
  borderRadius: '16px',
};

/**
 * 圆形卡片形状（用于特殊场景）
 */
export const cardShapeCircle: StyleObject = {
  borderRadius: '50%',
};

/**
 * 卡片形状变体集合
 */
export const cardShapeVariants: Record<Shape, StyleObject> = {
  default: cardShapeDefault,
  round: cardShapeRound,
  circle: cardShapeCircle,
};

// ==================== 标签形状变体 ====================

/**
 * 默认标签形状
 */
export const tagShapeDefault: StyleObject = {
  borderRadius: '4px',
};

/**
 * 圆角标签形状
 */
export const tagShapeRound: StyleObject = {
  borderRadius: '9999px',
};

/**
 * 圆形标签形状
 */
export const tagShapeCircle: StyleObject = {
  borderRadius: '50%',
  padding: 0,
  aspectRatio: '1',
};

/**
 * 标签形状变体集合
 */
export const tagShapeVariants: Record<Shape, StyleObject> = {
  default: tagShapeDefault,
  round: tagShapeRound,
  circle: tagShapeCircle,
};

// ==================== 徽章形状变体 ====================

/**
 * 默认徽章形状
 */
export const badgeShapeDefault: StyleObject = {
  borderRadius: '4px',
};

/**
 * 圆角徽章形状
 */
export const badgeShapeRound: StyleObject = {
  borderRadius: '9999px',
};

/**
 * 圆形徽章形状（点状）
 */
export const badgeShapeCircle: StyleObject = {
  borderRadius: '50%',
  padding: 0,
  aspectRatio: '1',
};

/**
 * 徽章形状变体集合
 */
export const badgeShapeVariants: Record<Shape, StyleObject> = {
  default: badgeShapeDefault,
  round: badgeShapeRound,
  circle: badgeShapeCircle,
};

// ==================== 图片形状变体 ====================

/**
 * 默认图片形状
 */
export const imageShapeDefault: StyleObject = {
  borderRadius: '4px',
};

/**
 * 圆角图片形状
 */
export const imageShapeRound: StyleObject = {
  borderRadius: '8px',
};

/**
 * 圆形图片形状
 */
export const imageShapeCircle: StyleObject = {
  borderRadius: '50%',
};

/**
 * 图片形状变体集合
 */
export const imageShapeVariants: Record<Shape, StyleObject> = {
  default: imageShapeDefault,
  round: imageShapeRound,
  circle: imageShapeCircle,
};

// ==================== 通用形状变体工厂 ====================

/**
 * 创建形状变体
 * @param config - 形状配置
 * @returns 形状变体样式集合
 */
export function createShapeVariants(config: {
  default: StyleObject;
  round: StyleObject;
  circle: StyleObject;
}): Record<Shape, StyleObject> {
  return {
    default: config.default,
    round: config.round,
    circle: config.circle,
  };
}

/**
 * 创建圆角形状变体
 * @param defaultRadius - 默认圆角
 * @param roundRadius - 圆角圆角
 * @returns 形状变体样式集合
 */
export function createBorderRadiusVariants(
  defaultRadius: string,
  roundRadius: string = '9999px',
): Record<Shape, StyleObject> {
  return {
    default: { borderRadius: defaultRadius },
    round: { borderRadius: roundRadius },
    circle: { borderRadius: '50%' },
  };
}

/**
 * 获取形状变体样式
 * @param variants - 变体集合
 * @param shape - 形状
 * @returns 对应的样式
 */
export function getShapeVariant(
  variants: Record<Shape, StyleObject>,
  shape: Shape,
): StyleObject {
  return variants[shape] || variants.default;
}

// ==================== 完整形状变体集合 ====================

/**
 * 形状变体样式集合
 */
export const shapeVariants = {
  /** 按钮形状 */
  button: buttonShapeVariants,
  /** 输入框形状 */
  input: inputShapeVariants,
  /** 头像形状 */
  avatar: avatarShapeVariants,
  /** 卡片形状 */
  card: cardShapeVariants,
  /** 标签形状 */
  tag: tagShapeVariants,
  /** 徽章形状 */
  badge: badgeShapeVariants,
  /** 图片形状 */
  image: imageShapeVariants,
  /** 工具函数 */
  utils: {
    create: createShapeVariants,
    createBorderRadius: createBorderRadiusVariants,
    get: getShapeVariant,
  },
} as const;

export default shapeVariants;
