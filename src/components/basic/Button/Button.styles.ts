/**
 * Button 组件样式定义
 * 使用 ThemeConfig 创建样式，继承通用样式
 * @module components/basic/Button/Button.styles
 */

import { mergeStyles } from '../../../theme/styles/createStyles';
import { inlineFlex, itemsCenter, justifyCenter } from '../../../theme/styles/common/layout';
import { clickable, disabled as disabledStyle } from '../../../theme/styles/common/interaction';
import type { StyleObject } from '../../../types/style';
import type { ThemeConfig } from '../../../theme/types';

// ==================== 基础样式 ====================

/** 按钮基础样式 */
const buttonBase: StyleObject = {
  ...inlineFlex,
  ...itemsCenter,
  ...justifyCenter,
  ...clickable,
  borderRadius: 6,
  border: '1px solid transparent',
  transition: 'all 0.2s ease',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
};

// ==================== 子元素样式 ====================

/** 图标样式 */
export const iconStyle: StyleObject = { display: 'flex', alignItems: 'center' };

/** 左侧图标样式 */
export const iconLeftStyle: StyleObject = { ...iconStyle, marginRight: 6 };

/** 右侧图标样式 */
export const iconRightStyle: StyleObject = { ...iconStyle, marginLeft: 6 };

/** 按钮文本样式 */
export const buttonTextStyle: StyleObject = { textAlign: 'center' };

/** 加载内容样式 */
export const loadingContentStyle: StyleObject = { display: 'flex', alignItems: 'center', gap: 6 };

/** 加载图标样式 */
export const loadingIconStyle: StyleObject = {
  width: 14, height: 14, border: '2px solid transparent',
  borderTopColor: 'currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite',
};


/** 加载文本样式 */
export const loadingTextStyle: StyleObject = { fontSize: 'inherit', color: 'inherit' };

// ==================== 样式计算函数 ====================

/** 获取尺寸样式 */
export function getSizeStyle(size: string, theme: ThemeConfig): StyleObject {
  const sizeMap: Record<string, StyleObject> = {
    sm: { padding: '6px 12px', fontSize: theme.typography.fontSize.sm, height: 28 },
    md: { padding: '8px 16px', fontSize: theme.typography.fontSize.base, height: 32 },
    lg: { padding: '12px 24px', fontSize: theme.typography.fontSize.lg, height: 40 },
  };
  return sizeMap[size] ?? sizeMap['md'] ?? {};
}

/** 获取类型样式 */
export function getTypeStyle(type: string, theme: ThemeConfig): StyleObject {
  const typeMap: Record<string, StyleObject> = {
    default: { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border },
    primary: { backgroundColor: theme.colors.primary, color: theme.colors.textInverse, borderColor: theme.colors.primary },
    success: { backgroundColor: theme.colors.success, color: theme.colors.textInverse, borderColor: theme.colors.success },
    warning: { backgroundColor: theme.colors.warning, color: theme.colors.textInverse, borderColor: theme.colors.warning },
    danger: { backgroundColor: theme.colors.error, color: theme.colors.textInverse, borderColor: theme.colors.error },
  };
  return typeMap[type] ?? typeMap['default'] ?? {};
}

/** 获取变体样式 */
export function getVariantStyle(variant: string): StyleObject {
  const variantMap: Record<string, StyleObject> = {
    solid: {},
    outline: { backgroundColor: 'transparent', borderWidth: 1 },
    ghost: { backgroundColor: 'transparent', borderColor: 'transparent' },
    text: { backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, padding: 0 },
  };
  return variantMap[variant] ?? variantMap['solid'] ?? {};
}

/** 获取形状样式 */
export function getShapeStyle(shape: string, theme: ThemeConfig): StyleObject {
  const shapeMap: Record<string, StyleObject> = {
    default: { borderRadius: theme.borderRadius.md },
    round: { borderRadius: theme.borderRadius.full },
    circle: { borderRadius: '50%', width: 32, height: 32, padding: 0 },
  };
  return shapeMap[shape] ?? shapeMap['default'] ?? {};
}


/** 获取 outline 变体颜色样式 */
export function getOutlineColorStyle(type: string, theme: ThemeConfig): StyleObject {
  const colorMap: Record<string, string> = {
    default: theme.colors.text, primary: theme.colors.primary, success: theme.colors.success,
    warning: theme.colors.warning, danger: theme.colors.error,
  };
  const color = colorMap[type] || colorMap['default'];
  return { color, borderColor: color, backgroundColor: 'transparent' };
}

/** 获取 ghost 变体颜色样式 */
export function getGhostColorStyle(type: string, theme: ThemeConfig): StyleObject {
  const colorMap: Record<string, string> = {
    default: theme.colors.text, primary: theme.colors.primary, success: theme.colors.success,
    warning: theme.colors.warning, danger: theme.colors.error,
  };
  const color = colorMap[type] || colorMap['default'];
  return { color, backgroundColor: 'transparent', borderColor: 'transparent' };
}

/** 获取 text 变体颜色样式 */
export function getTextColorStyle(type: string, theme: ThemeConfig): StyleObject {
  const colorMap: Record<string, string> = {
    default: theme.colors.text, primary: theme.colors.primary, success: theme.colors.success,
    warning: theme.colors.warning, danger: theme.colors.error,
  };
  const color = colorMap[type] || colorMap['default'];
  return { color, backgroundColor: 'transparent', borderColor: 'transparent' };
}

/** 获取禁用状态样式 */
export function getDisabledStyle(): StyleObject { return { ...disabledStyle }; }

/** 获取加载状态样式 */
export function getLoadingStyle(): StyleObject {
  return { opacity: 0.7, cursor: 'not-allowed', pointerEvents: 'none' };
}

/** 获取块级按钮样式 */
export function getBlockStyle(block: boolean): StyleObject {
  if (!block) return {};
  return { display: 'flex', width: '100%' };
}


/** 计算按钮完整样式 */
export function computeButtonStyles(
  props: {
    size?: string;
    type?: string;
    variant?: string;
    shape?: string;
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const {
    size = 'md',
    type = 'default',
    variant = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    block = false,
  } = props;

  let style = { ...buttonBase };
  style = mergeStyles(style, getSizeStyle(size, theme));
  style = mergeStyles(style, getTypeStyle(type, theme));
  style = mergeStyles(style, getVariantStyle(variant));

  if (variant === 'outline') {
    style = mergeStyles(style, getOutlineColorStyle(type, theme));
  } else if (variant === 'ghost') {
    style = mergeStyles(style, getGhostColorStyle(type, theme));
  } else if (variant === 'text') {
    style = mergeStyles(style, getTextColorStyle(type, theme));
  }

  style = mergeStyles(style, getShapeStyle(shape, theme));
  style = mergeStyles(style, getBlockStyle(block));

  if (disabled) {
    style = mergeStyles(style, getDisabledStyle());
  } else if (loading) {
    style = mergeStyles(style, getLoadingStyle());
  }

  return style;
}

/** 合并按钮最终样式 */
export function mergeButtonStyles(
  baseStyle: StyleObject,
  customStyle?: StyleObject,
): StyleObject {
  return mergeStyles(baseStyle, customStyle || {});
}

/** 按钮样式集合（用于外部导出） */
export const buttonStyles = {
  base: buttonBase,
  icon: iconStyle,
  iconLeft: iconLeftStyle,
  iconRight: iconRightStyle,
  text: buttonTextStyle,
  loadingContent: loadingContentStyle,
  loadingIcon: loadingIconStyle,
  loadingText: loadingTextStyle,
};

export default computeButtonStyles;
