/**
 * 尺寸变体样式模块
 * 提供组件尺寸变体的样式定义
 * @module theme/styles/variants/size
 */

import type { StyleObject } from '../../../types/style';
import type { Size } from '../../../types/common';

// ==================== 按钮尺寸变体 ====================

/**
 * 小按钮尺寸
 */
export const buttonSizeSm: StyleObject = {
  height: '28px',
  padding: '0 12px',
  fontSize: '12px',
  borderRadius: '4px',
};

/**
 * 中按钮尺寸
 */
export const buttonSizeMd: StyleObject = {
  height: '36px',
  padding: '0 16px',
  fontSize: '14px',
  borderRadius: '6px',
};

/**
 * 大按钮尺寸
 */
export const buttonSizeLg: StyleObject = {
  height: '44px',
  padding: '0 20px',
  fontSize: '16px',
  borderRadius: '8px',
};

/**
 * 按钮尺寸变体集合
 */
export const buttonSizeVariants: Record<Size, StyleObject> = {
  sm: buttonSizeSm,
  md: buttonSizeMd,
  lg: buttonSizeLg,
};

// ==================== 输入框尺寸变体 ====================

/**
 * 小输入框尺寸
 */
export const inputSizeSm: StyleObject = {
  height: '28px',
  padding: '0 8px',
  fontSize: '12px',
  borderRadius: '4px',
};

/**
 * 中输入框尺寸
 */
export const inputSizeMd: StyleObject = {
  height: '36px',
  padding: '0 12px',
  fontSize: '14px',
  borderRadius: '6px',
};

/**
 * 大输入框尺寸
 */
export const inputSizeLg: StyleObject = {
  height: '44px',
  padding: '0 16px',
  fontSize: '16px',
  borderRadius: '8px',
};

/**
 * 输入框尺寸变体集合
 */
export const inputSizeVariants: Record<Size, StyleObject> = {
  sm: inputSizeSm,
  md: inputSizeMd,
  lg: inputSizeLg,
};

// ==================== 图标尺寸变体 ====================

/**
 * 小图标尺寸
 */
export const iconSizeSm: StyleObject = {
  width: '16px',
  height: '16px',
  fontSize: '16px',
};

/**
 * 中图标尺寸
 */
export const iconSizeMd: StyleObject = {
  width: '20px',
  height: '20px',
  fontSize: '20px',
};

/**
 * 大图标尺寸
 */
export const iconSizeLg: StyleObject = {
  width: '24px',
  height: '24px',
  fontSize: '24px',
};

/**
 * 图标尺寸变体集合
 */
export const iconSizeVariants: Record<Size, StyleObject> = {
  sm: iconSizeSm,
  md: iconSizeMd,
  lg: iconSizeLg,
};

// ==================== 头像尺寸变体 ====================

/**
 * 小头像尺寸
 */
export const avatarSizeSm: StyleObject = {
  width: '24px',
  height: '24px',
  fontSize: '12px',
};

/**
 * 中头像尺寸
 */
export const avatarSizeMd: StyleObject = {
  width: '32px',
  height: '32px',
  fontSize: '14px',
};

/**
 * 大头像尺寸
 */
export const avatarSizeLg: StyleObject = {
  width: '40px',
  height: '40px',
  fontSize: '16px',
};

/**
 * 头像尺寸变体集合
 */
export const avatarSizeVariants: Record<Size, StyleObject> = {
  sm: avatarSizeSm,
  md: avatarSizeMd,
  lg: avatarSizeLg,
};

// ==================== 标签尺寸变体 ====================

/**
 * 小标签尺寸
 */
export const tagSizeSm: StyleObject = {
  height: '20px',
  padding: '0 6px',
  fontSize: '10px',
  borderRadius: '2px',
};

/**
 * 中标签尺寸
 */
export const tagSizeMd: StyleObject = {
  height: '24px',
  padding: '0 8px',
  fontSize: '12px',
  borderRadius: '4px',
};

/**
 * 大标签尺寸
 */
export const tagSizeLg: StyleObject = {
  height: '28px',
  padding: '0 10px',
  fontSize: '14px',
  borderRadius: '4px',
};

/**
 * 标签尺寸变体集合
 */
export const tagSizeVariants: Record<Size, StyleObject> = {
  sm: tagSizeSm,
  md: tagSizeMd,
  lg: tagSizeLg,
};

// ==================== 徽章尺寸变体 ====================

/**
 * 小徽章尺寸
 */
export const badgeSizeSm: StyleObject = {
  minWidth: '16px',
  height: '16px',
  padding: '0 4px',
  fontSize: '10px',
  borderRadius: '8px',
};

/**
 * 中徽章尺寸
 */
export const badgeSizeMd: StyleObject = {
  minWidth: '20px',
  height: '20px',
  padding: '0 6px',
  fontSize: '12px',
  borderRadius: '10px',
};

/**
 * 大徽章尺寸
 */
export const badgeSizeLg: StyleObject = {
  minWidth: '24px',
  height: '24px',
  padding: '0 8px',
  fontSize: '14px',
  borderRadius: '12px',
};

/**
 * 徽章尺寸变体集合
 */
export const badgeSizeVariants: Record<Size, StyleObject> = {
  sm: badgeSizeSm,
  md: badgeSizeMd,
  lg: badgeSizeLg,
};

// ==================== 间距尺寸变体 ====================

/**
 * 小间距
 */
export const spacingSm: StyleObject = {
  gap: '8px',
};

/**
 * 中间距
 */
export const spacingMd: StyleObject = {
  gap: '16px',
};

/**
 * 大间距
 */
export const spacingLg: StyleObject = {
  gap: '24px',
};

/**
 * 间距尺寸变体集合
 */
export const spacingSizeVariants: Record<Size, StyleObject> = {
  sm: spacingSm,
  md: spacingMd,
  lg: spacingLg,
};

// ==================== 通用尺寸变体工厂 ====================

/**
 * 创建尺寸变体
 * @param config - 尺寸配置
 * @returns 尺寸变体样式集合
 */
export function createSizeVariants(config: {
  sm: StyleObject;
  md: StyleObject;
  lg: StyleObject;
}): Record<Size, StyleObject> {
  return {
    sm: config.sm,
    md: config.md,
    lg: config.lg,
  };
}

/**
 * 获取尺寸变体样式
 * @param variants - 变体集合
 * @param size - 尺寸
 * @returns 对应的样式
 */
export function getSizeVariant(
  variants: Record<Size, StyleObject>,
  size: Size,
): StyleObject {
  return variants[size] || variants.md;
}

// ==================== 完整尺寸变体集合 ====================

/**
 * 尺寸变体样式集合
 */
export const sizeVariants = {
  /** 按钮尺寸 */
  button: buttonSizeVariants,
  /** 输入框尺寸 */
  input: inputSizeVariants,
  /** 图标尺寸 */
  icon: iconSizeVariants,
  /** 头像尺寸 */
  avatar: avatarSizeVariants,
  /** 标签尺寸 */
  tag: tagSizeVariants,
  /** 徽章尺寸 */
  badge: badgeSizeVariants,
  /** 间距尺寸 */
  spacing: spacingSizeVariants,
  /** 工具函数 */
  utils: {
    create: createSizeVariants,
    get: getSizeVariant,
  },
} as const;

export default sizeVariants;
