/**
 * Input 组件样式定义
 * 使用 ThemeConfig 创建样式，继承通用样式
 * @module components/form/Input/Input.styles
 */

import { mergeStyles } from '../../../theme/styles/createStyles';
import { flex, itemsCenter } from '../../../theme/styles/common/layout';
import { cursorText, disabled as disabledStyle, focusRingPrimary, focusRingError } from '../../../theme/styles/common/interaction';
import type { StyleObject } from '../../../types/style';
import type { ThemeConfig } from '../../../theme/types';

// ==================== 基础样式 ====================

/** 输入框基础样式 */
const inputBase: StyleObject = {
  ...cursorText,
  boxSizing: 'border-box',
  outline: 'none',
  border: '1px solid transparent',
  transition: 'all 0.2s ease',
  width: '100%',
  fontFamily: 'inherit',
};

/** 输入框容器基础样式 */
const containerBase: StyleObject = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

/** 输入框包装器基础样式 */
const wrapperBase: StyleObject = {
  ...flex,
  ...itemsCenter,
  position: 'relative',
  width: '100%',
  transition: 'all 0.2s ease',
};

// ==================== 子元素样式 ====================

/** 前缀样式 */
export const prefixStyle: StyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6b7280',
  flexShrink: 0,
};

/** 后缀样式 */
export const suffixStyle: StyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6b7280',
  flexShrink: 0,
  gap: 4,
};

/** 标签样式 */
export const labelStyle: StyleObject = {
  fontWeight: 500,
  marginBottom: 8,
};

/** 辅助文本样式 */
export const helperTextStyle: StyleObject = {
  marginTop: 4,
};

/** 错误文本样式 */
export const errorTextStyle: StyleObject = {
  marginTop: 4,
  color: '#ef4444',
};

/** 计数器样式 */
export const counterStyle: StyleObject = {
  textAlign: 'right',
  marginTop: 4,
  color: '#9ca3af',
};

/** 清除按钮样式 */
export const clearButtonStyle: StyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  color: '#6b7280',
  fontSize: 12,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  flexShrink: 0,
};

/** 密码切换按钮样式 */
export const passwordToggleStyle: StyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  color: '#6b7280',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  flexShrink: 0,
};

// ==================== 样式计算函数 ====================

/** 获取尺寸样式 */
export function getSizeStyle(size: string, theme: ThemeConfig): StyleObject {
  const sizeMap: Record<string, StyleObject> = {
    sm: {
      padding: '6px 12px',
      fontSize: theme.typography.fontSize.sm,
      height: 32,
      borderRadius: theme.borderRadius.sm,
    },
    md: {
      padding: '8px 16px',
      fontSize: theme.typography.fontSize.base,
      height: 40,
      borderRadius: theme.borderRadius.md,
    },
    lg: {
      padding: '12px 20px',
      fontSize: theme.typography.fontSize.lg,
      height: 48,
      borderRadius: theme.borderRadius.lg,
    },
  };
  return sizeMap[size] ?? sizeMap['md'] ?? {};
}

/** 获取状态样式 */
export function getStatusStyle(status: string, theme: ThemeConfig): StyleObject {
  const statusMap: Record<string, StyleObject> = {
    default: {
      borderColor: theme.colors.border,
      color: theme.colors.text,
    },
    primary: {
      borderColor: theme.colors.primary,
      color: theme.colors.text,
    },
    success: {
      borderColor: theme.colors.success,
      color: theme.colors.text,
    },
    warning: {
      borderColor: theme.colors.warning,
      color: theme.colors.text,
    },
    danger: {
      borderColor: theme.colors.error,
      color: theme.colors.text,
    },
  };
  return statusMap[status] ?? statusMap['default'] ?? {};
}

/** 获取变体样式 */
export function getVariantStyle(variant: string, theme: ThemeConfig): StyleObject {
  const variantMap: Record<string, StyleObject> = {
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.backgroundInput,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
    underlined: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
      borderRadius: 0,
    },
  };
  return variantMap[variant] ?? variantMap['outlined'] ?? {};
}

/** 获取形状样式 */
export function getShapeStyle(shape: string, theme: ThemeConfig): StyleObject {
  const shapeMap: Record<string, StyleObject> = {
    default: { borderRadius: theme.borderRadius.md },
    round: { borderRadius: theme.borderRadius.full },
  };
  return shapeMap[shape] ?? shapeMap['default'] ?? {};
}

/** 获取禁用状态样式 */
export function getDisabledStyle(theme: ThemeConfig): StyleObject {
  return {
    ...disabledStyle,
    backgroundColor: theme.colors.backgroundInput,
    color: theme.colors.textDisabled,
  };
}

/** 获取只读状态样式 */
export function getReadOnlyStyle(): StyleObject {
  return {
    cursor: 'default',
    backgroundColor: 'transparent',
  };
}

/** 获取加载状态样式 */
export function getLoadingStyle(): StyleObject {
  return {
    opacity: 0.7,
    cursor: 'wait',
    pointerEvents: 'none',
  };
}

/** 获取聚焦状态样式 */
export function getFocusStyle(status: string): StyleObject {
  if (status === 'danger') {
    return focusRingError;
  }
  return focusRingPrimary;
}

/** 获取块级样式 */
export function getBlockStyle(block: boolean): StyleObject {
  if (!block) return {};
  return { width: '100%' };
}

/** 计算输入框完整样式 */
export function computeInputStyles(
  props: {
    size?: string;
    status?: string;
    inputVariant?: string;
    shape?: string;
    disabled?: boolean;
    readOnly?: boolean;
    loading?: boolean;
    block?: boolean;
    bordered?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const {
    size = 'md',
    status = 'default',
    inputVariant = 'outlined',
    shape = 'default',
    disabled = false,
    readOnly = false,
    loading = false,
    block = false,
    bordered = true,
  } = props;

  let style = { ...inputBase };
  style = mergeStyles(style, getSizeStyle(size, theme));
  style = mergeStyles(style, getStatusStyle(status, theme));
  style = mergeStyles(style, getVariantStyle(inputVariant, theme));
  style = mergeStyles(style, getShapeStyle(shape, theme));
  style = mergeStyles(style, getBlockStyle(block));

  if (!bordered) {
    style = mergeStyles(style, { borderColor: 'transparent' });
  }

  if (disabled) {
    style = mergeStyles(style, getDisabledStyle(theme));
  } else if (readOnly) {
    style = mergeStyles(style, getReadOnlyStyle());
  } else if (loading) {
    style = mergeStyles(style, getLoadingStyle());
  }

  return style;
}

/** 计算容器样式 */
export function computeContainerStyles(
  props: {
    block?: boolean;
  },
  _theme: ThemeConfig,
): StyleObject {
  const { block = false } = props;

  let style = { ...containerBase };
  style = mergeStyles(style, getBlockStyle(block));

  return style;
}

/** 计算包装器样式 */
export function computeWrapperStyles(
  props: {
    size?: string;
    status?: string;
    inputVariant?: string;
    disabled?: boolean;
    bordered?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const {
    size = 'md',
    status = 'default',
    inputVariant = 'outlined',
    disabled = false,
    bordered = true,
  } = props;

  let style = { ...wrapperBase };
  const sizeStyle = getSizeStyle(size, theme);
  style = mergeStyles(style, {
    height: sizeStyle.height,
    borderRadius: sizeStyle.borderRadius,
  });
  style = mergeStyles(style, getVariantStyle(inputVariant, theme));
  style = mergeStyles(style, getStatusStyle(status, theme));

  if (!bordered) {
    style = mergeStyles(style, { borderColor: 'transparent' });
  }

  if (disabled) {
    style = mergeStyles(style, { opacity: 0.5 });
  }

  return style;
}

/** 计算标签样式 */
export function computeLabelStyles(
  props: {
    size?: string;
    disabled?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md', disabled = false } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...labelStyle };
  style = mergeStyles(style, {
    fontSize: sizeStyle.fontSize,
    color: disabled ? theme.colors.textDisabled : theme.colors.text,
  });

  return style;
}

/** 计算辅助文本样式 */
export function computeHelperTextStyles(
  props: {
    size?: string;
    status?: string;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md', status = 'default' } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...helperTextStyle };
  style = mergeStyles(style, {
    fontSize: (sizeStyle.fontSize as number) * 0.85,
    color: status === 'danger' ? theme.colors.error : theme.colors.textSecondary,
  });

  return style;
}

/** 计算错误文本样式 */
export function computeErrorTextStyles(
  props: {
    size?: string;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md' } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...errorTextStyle };
  style = mergeStyles(style, {
    fontSize: (sizeStyle.fontSize as number) * 0.85,
    color: theme.colors.error,
  });

  return style;
}

/** 计算计数器样式 */
export function computeCounterStyles(
  props: {
    size?: string;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md' } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...counterStyle };
  style = mergeStyles(style, {
    fontSize: (sizeStyle.fontSize as number) * 0.75,
    color: theme.colors.textSecondary,
  });

  return style;
}

/** 计算前缀样式 */
export function computePrefixStyles(
  props: {
    size?: string;
    disabled?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md', disabled = false } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...prefixStyle };
  style = mergeStyles(style, {
    fontSize: sizeStyle.fontSize,
    paddingLeft: 12,
    paddingRight: 8,
    color: disabled ? theme.colors.textDisabled : theme.colors.textSecondary,
  });

  return style;
}

/** 计算后缀样式 */
export function computeSuffixStyles(
  props: {
    size?: string;
    disabled?: boolean;
  },
  theme: ThemeConfig,
): StyleObject {
  const { size = 'md', disabled = false } = props;
  const sizeStyle = getSizeStyle(size, theme);

  let style = { ...suffixStyle };
  style = mergeStyles(style, {
    fontSize: sizeStyle.fontSize,
    paddingLeft: 8,
    paddingRight: 12,
    color: disabled ? theme.colors.textDisabled : theme.colors.textSecondary,
  });

  return style;
}

/** 计算清除按钮样式 */
export function computeClearButtonStyles(
  props: {
    size?: string;
  },
  _theme: ThemeConfig,
): StyleObject {
  const { size = 'md' } = props;

  const sizeMap: Record<string, number> = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const buttonSize = sizeMap[size] ?? 20;

  let style = { ...clearButtonStyle };
  style = mergeStyles(style, {
    width: buttonSize,
    height: buttonSize,
    fontSize: buttonSize * 0.6,
  });

  return style;
}

/** 计算密码切换按钮样式 */
export function computePasswordToggleStyles(
  props: {
    size?: string;
  },
  _theme: ThemeConfig,
): StyleObject {
  const { size = 'md' } = props;

  const sizeMap: Record<string, number> = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  const buttonSize = sizeMap[size] ?? 24;

  let style = { ...passwordToggleStyle };
  style = mergeStyles(style, {
    width: buttonSize,
    height: buttonSize,
    fontSize: buttonSize * 0.7,
  });

  return style;
}

/** 合并输入框最终样式 */
export function mergeInputStyles(
  baseStyle: StyleObject,
  customStyle?: StyleObject,
): StyleObject {
  return mergeStyles(baseStyle, customStyle || {});
}

/** 输入框样式集合（用于外部导出） */
export const inputStyles = {
  base: inputBase,
  container: containerBase,
  wrapper: wrapperBase,
  prefix: prefixStyle,
  suffix: suffixStyle,
  label: labelStyle,
  helperText: helperTextStyle,
  errorText: errorTextStyle,
  counter: counterStyle,
  clearButton: clearButtonStyle,
  passwordToggle: passwordToggleStyle,
};

export default computeInputStyles;
