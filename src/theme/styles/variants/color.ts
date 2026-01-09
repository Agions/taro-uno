/**
 * 颜色变体样式模块
 * 提供组件颜色变体的样式定义
 * @module theme/styles/variants/color
 */

import type { StyleObject } from '../../../types/style';
import type { Status } from '../../../types/common';

// ==================== 颜色值常量 ====================

const COLORS = {
  primary: {
    base: '#0ea5e9',
    light: '#e0f2fe',
    dark: '#0369a1',
    text: '#ffffff',
  },
  success: {
    base: '#22c55e',
    light: '#dcfce7',
    dark: '#15803d',
    text: '#ffffff',
  },
  warning: {
    base: '#f59e0b',
    light: '#fef3c7',
    dark: '#b45309',
    text: '#ffffff',
  },
  danger: {
    base: '#ef4444',
    light: '#fee2e2',
    dark: '#b91c1c',
    text: '#ffffff',
  },
  default: {
    base: '#6b7280',
    light: '#f3f4f6',
    dark: '#374151',
    text: '#ffffff',
  },
} as const;

// ==================== 实心按钮颜色变体 ====================

/**
 * 默认实心按钮
 */
export const buttonSolidDefault: StyleObject = {
  backgroundColor: COLORS.default.base,
  color: COLORS.default.text,
  borderColor: COLORS.default.base,
};

/**
 * 主色实心按钮
 */
export const buttonSolidPrimary: StyleObject = {
  backgroundColor: COLORS.primary.base,
  color: COLORS.primary.text,
  borderColor: COLORS.primary.base,
};

/**
 * 成功实心按钮
 */
export const buttonSolidSuccess: StyleObject = {
  backgroundColor: COLORS.success.base,
  color: COLORS.success.text,
  borderColor: COLORS.success.base,
};

/**
 * 警告实心按钮
 */
export const buttonSolidWarning: StyleObject = {
  backgroundColor: COLORS.warning.base,
  color: COLORS.warning.text,
  borderColor: COLORS.warning.base,
};

/**
 * 危险实心按钮
 */
export const buttonSolidDanger: StyleObject = {
  backgroundColor: COLORS.danger.base,
  color: COLORS.danger.text,
  borderColor: COLORS.danger.base,
};

/**
 * 实心按钮颜色变体集合
 */
export const buttonSolidVariants: Record<Status, StyleObject> = {
  default: buttonSolidDefault,
  primary: buttonSolidPrimary,
  success: buttonSolidSuccess,
  warning: buttonSolidWarning,
  danger: buttonSolidDanger,
};

// ==================== 轮廓按钮颜色变体 ====================

/**
 * 默认轮廓按钮
 */
export const buttonOutlineDefault: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.default.base,
  borderColor: COLORS.default.base,
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 主色轮廓按钮
 */
export const buttonOutlinePrimary: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.primary.base,
  borderColor: COLORS.primary.base,
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 成功轮廓按钮
 */
export const buttonOutlineSuccess: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.success.base,
  borderColor: COLORS.success.base,
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 警告轮廓按钮
 */
export const buttonOutlineWarning: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.warning.base,
  borderColor: COLORS.warning.base,
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 危险轮廓按钮
 */
export const buttonOutlineDanger: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.danger.base,
  borderColor: COLORS.danger.base,
  borderWidth: '1px',
  borderStyle: 'solid',
};

/**
 * 轮廓按钮颜色变体集合
 */
export const buttonOutlineVariants: Record<Status, StyleObject> = {
  default: buttonOutlineDefault,
  primary: buttonOutlinePrimary,
  success: buttonOutlineSuccess,
  warning: buttonOutlineWarning,
  danger: buttonOutlineDanger,
};

// ==================== 幽灵按钮颜色变体 ====================

/**
 * 默认幽灵按钮
 */
export const buttonGhostDefault: StyleObject = {
  backgroundColor: COLORS.default.light,
  color: COLORS.default.dark,
  borderColor: 'transparent',
};

/**
 * 主色幽灵按钮
 */
export const buttonGhostPrimary: StyleObject = {
  backgroundColor: COLORS.primary.light,
  color: COLORS.primary.dark,
  borderColor: 'transparent',
};

/**
 * 成功幽灵按钮
 */
export const buttonGhostSuccess: StyleObject = {
  backgroundColor: COLORS.success.light,
  color: COLORS.success.dark,
  borderColor: 'transparent',
};

/**
 * 警告幽灵按钮
 */
export const buttonGhostWarning: StyleObject = {
  backgroundColor: COLORS.warning.light,
  color: COLORS.warning.dark,
  borderColor: 'transparent',
};

/**
 * 危险幽灵按钮
 */
export const buttonGhostDanger: StyleObject = {
  backgroundColor: COLORS.danger.light,
  color: COLORS.danger.dark,
  borderColor: 'transparent',
};

/**
 * 幽灵按钮颜色变体集合
 */
export const buttonGhostVariants: Record<Status, StyleObject> = {
  default: buttonGhostDefault,
  primary: buttonGhostPrimary,
  success: buttonGhostSuccess,
  warning: buttonGhostWarning,
  danger: buttonGhostDanger,
};

// ==================== 文本按钮颜色变体 ====================

/**
 * 默认文本按钮
 */
export const buttonTextDefault: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.default.base,
  borderColor: 'transparent',
};

/**
 * 主色文本按钮
 */
export const buttonTextPrimary: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.primary.base,
  borderColor: 'transparent',
};

/**
 * 成功文本按钮
 */
export const buttonTextSuccess: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.success.base,
  borderColor: 'transparent',
};

/**
 * 警告文本按钮
 */
export const buttonTextWarning: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.warning.base,
  borderColor: 'transparent',
};

/**
 * 危险文本按钮
 */
export const buttonTextDanger: StyleObject = {
  backgroundColor: 'transparent',
  color: COLORS.danger.base,
  borderColor: 'transparent',
};

/**
 * 文本按钮颜色变体集合
 */
export const buttonTextVariants: Record<Status, StyleObject> = {
  default: buttonTextDefault,
  primary: buttonTextPrimary,
  success: buttonTextSuccess,
  warning: buttonTextWarning,
  danger: buttonTextDanger,
};

// ==================== 标签颜色变体 ====================

/**
 * 默认标签
 */
export const tagDefault: StyleObject = {
  backgroundColor: COLORS.default.light,
  color: COLORS.default.dark,
  borderColor: COLORS.default.light,
};

/**
 * 主色标签
 */
export const tagPrimary: StyleObject = {
  backgroundColor: COLORS.primary.light,
  color: COLORS.primary.dark,
  borderColor: COLORS.primary.light,
};

/**
 * 成功标签
 */
export const tagSuccess: StyleObject = {
  backgroundColor: COLORS.success.light,
  color: COLORS.success.dark,
  borderColor: COLORS.success.light,
};

/**
 * 警告标签
 */
export const tagWarning: StyleObject = {
  backgroundColor: COLORS.warning.light,
  color: COLORS.warning.dark,
  borderColor: COLORS.warning.light,
};

/**
 * 危险标签
 */
export const tagDanger: StyleObject = {
  backgroundColor: COLORS.danger.light,
  color: COLORS.danger.dark,
  borderColor: COLORS.danger.light,
};

/**
 * 标签颜色变体集合
 */
export const tagColorVariants: Record<Status, StyleObject> = {
  default: tagDefault,
  primary: tagPrimary,
  success: tagSuccess,
  warning: tagWarning,
  danger: tagDanger,
};

// ==================== 徽章颜色变体 ====================

/**
 * 默认徽章
 */
export const badgeDefault: StyleObject = {
  backgroundColor: COLORS.default.base,
  color: COLORS.default.text,
};

/**
 * 主色徽章
 */
export const badgePrimary: StyleObject = {
  backgroundColor: COLORS.primary.base,
  color: COLORS.primary.text,
};

/**
 * 成功徽章
 */
export const badgeSuccess: StyleObject = {
  backgroundColor: COLORS.success.base,
  color: COLORS.success.text,
};

/**
 * 警告徽章
 */
export const badgeWarning: StyleObject = {
  backgroundColor: COLORS.warning.base,
  color: COLORS.warning.text,
};

/**
 * 危险徽章
 */
export const badgeDanger: StyleObject = {
  backgroundColor: COLORS.danger.base,
  color: COLORS.danger.text,
};

/**
 * 徽章颜色变体集合
 */
export const badgeColorVariants: Record<Status, StyleObject> = {
  default: badgeDefault,
  primary: badgePrimary,
  success: badgeSuccess,
  warning: badgeWarning,
  danger: badgeDanger,
};

// ==================== 文本颜色变体 ====================

/**
 * 默认文本颜色
 */
export const textDefault: StyleObject = {
  color: COLORS.default.base,
};

/**
 * 主色文本颜色
 */
export const textPrimary: StyleObject = {
  color: COLORS.primary.base,
};

/**
 * 成功文本颜色
 */
export const textSuccess: StyleObject = {
  color: COLORS.success.base,
};

/**
 * 警告文本颜色
 */
export const textWarning: StyleObject = {
  color: COLORS.warning.base,
};

/**
 * 危险文本颜色
 */
export const textDanger: StyleObject = {
  color: COLORS.danger.base,
};

/**
 * 文本颜色变体集合
 */
export const textColorVariants: Record<Status, StyleObject> = {
  default: textDefault,
  primary: textPrimary,
  success: textSuccess,
  warning: textWarning,
  danger: textDanger,
};

// ==================== 背景颜色变体 ====================

/**
 * 默认背景颜色
 */
export const bgDefault: StyleObject = {
  backgroundColor: COLORS.default.light,
};

/**
 * 主色背景颜色
 */
export const bgPrimary: StyleObject = {
  backgroundColor: COLORS.primary.light,
};

/**
 * 成功背景颜色
 */
export const bgSuccess: StyleObject = {
  backgroundColor: COLORS.success.light,
};

/**
 * 警告背景颜色
 */
export const bgWarning: StyleObject = {
  backgroundColor: COLORS.warning.light,
};

/**
 * 危险背景颜色
 */
export const bgDanger: StyleObject = {
  backgroundColor: COLORS.danger.light,
};

/**
 * 背景颜色变体集合
 */
export const bgColorVariants: Record<Status, StyleObject> = {
  default: bgDefault,
  primary: bgPrimary,
  success: bgSuccess,
  warning: bgWarning,
  danger: bgDanger,
};

// ==================== 边框颜色变体 ====================

/**
 * 默认边框颜色
 */
export const borderDefault: StyleObject = {
  borderColor: COLORS.default.base,
};

/**
 * 主色边框颜色
 */
export const borderPrimary: StyleObject = {
  borderColor: COLORS.primary.base,
};

/**
 * 成功边框颜色
 */
export const borderSuccess: StyleObject = {
  borderColor: COLORS.success.base,
};

/**
 * 警告边框颜色
 */
export const borderWarning: StyleObject = {
  borderColor: COLORS.warning.base,
};

/**
 * 危险边框颜色
 */
export const borderDanger: StyleObject = {
  borderColor: COLORS.danger.base,
};

/**
 * 边框颜色变体集合
 */
export const borderColorVariants: Record<Status, StyleObject> = {
  default: borderDefault,
  primary: borderPrimary,
  success: borderSuccess,
  warning: borderWarning,
  danger: borderDanger,
};

// ==================== 完整颜色变体集合 ====================

/**
 * 颜色变体样式集合
 */
export const colorVariants = {
  /** 颜色值 */
  colors: COLORS,
  /** 按钮颜色 */
  button: {
    solid: buttonSolidVariants,
    outline: buttonOutlineVariants,
    ghost: buttonGhostVariants,
    text: buttonTextVariants,
  },
  /** 标签颜色 */
  tag: tagColorVariants,
  /** 徽章颜色 */
  badge: badgeColorVariants,
  /** 文本颜色 */
  text: textColorVariants,
  /** 背景颜色 */
  bg: bgColorVariants,
  /** 边框颜色 */
  border: borderColorVariants,
} as const;

export default colorVariants;
