/**
 * 阴影样式模块
 * 提供 box-shadow 相关的阴影样式
 * @module theme/styles/common/shadow
 */

import type { StyleObject } from '../../../types/style';

// ==================== 基础阴影样式 ====================

/**
 * 无阴影
 */
export const shadowNone: StyleObject = {
  boxShadow: 'none',
};

/**
 * 超小阴影
 */
export const shadowXs: StyleObject = {
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

/**
 * 小阴影
 */
export const shadowSm: StyleObject = {
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

/**
 * 默认阴影
 */
export const shadow: StyleObject = {
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
};

/**
 * 中等阴影
 */
export const shadowMd: StyleObject = {
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
};

/**
 * 大阴影
 */
export const shadowLg: StyleObject = {
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
};

/**
 * 超大阴影
 */
export const shadowXl: StyleObject = {
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

/**
 * 2倍超大阴影
 */
export const shadow2xl: StyleObject = {
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

/**
 * 内阴影
 */
export const shadowInner: StyleObject = {
  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

// ==================== 方向阴影样式 ====================

/**
 * 上方阴影
 */
export const shadowTop: StyleObject = {
  boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)',
};

/**
 * 下方阴影
 */
export const shadowBottom: StyleObject = {
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
};

/**
 * 左侧阴影
 */
export const shadowLeft: StyleObject = {
  boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -2px rgba(0, 0, 0, 0.1)',
};

/**
 * 右侧阴影
 */
export const shadowRight: StyleObject = {
  boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -2px rgba(0, 0, 0, 0.1)',
};

// ==================== 颜色阴影样式 ====================

/**
 * 主色阴影
 */
export const shadowPrimary: StyleObject = {
  boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39)',
};

/**
 * 成功色阴影
 */
export const shadowSuccess: StyleObject = {
  boxShadow: '0 4px 14px 0 rgba(34, 197, 94, 0.39)',
};

/**
 * 警告色阴影
 */
export const shadowWarning: StyleObject = {
  boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)',
};

/**
 * 危险色阴影
 */
export const shadowDanger: StyleObject = {
  boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
};

/**
 * 信息色阴影
 */
export const shadowInfo: StyleObject = {
  boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
};

// ==================== 组件专用阴影样式 ====================

/**
 * 卡片阴影
 */
export const shadowCard: StyleObject = {
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

/**
 * 卡片悬停阴影
 */
export const shadowCardHover: StyleObject = {
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

/**
 * 按钮阴影
 */
export const shadowButton: StyleObject = {
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

/**
 * 按钮悬停阴影
 */
export const shadowButtonHover: StyleObject = {
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

/**
 * 模态框阴影
 */
export const shadowModal: StyleObject = {
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

/**
 * 下拉菜单阴影
 */
export const shadowDropdown: StyleObject = {
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

/**
 * 提示框阴影
 */
export const shadowTooltip: StyleObject = {
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

/**
 * 弹出框阴影
 */
export const shadowPopover: StyleObject = {
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

/**
 * 输入框聚焦阴影
 */
export const shadowInputFocus: StyleObject = {
  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
};

/**
 * 输入框错误阴影
 */
export const shadowInputError: StyleObject = {
  boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
};

// ==================== 完整阴影样式集合 ====================

/**
 * 基础阴影样式集合
 */
export const baseShadowStyles = {
  none: shadowNone,
  xs: shadowXs,
  sm: shadowSm,
  default: shadow,
  md: shadowMd,
  lg: shadowLg,
  xl: shadowXl,
  '2xl': shadow2xl,
  inner: shadowInner,
} as const;

/**
 * 方向阴影样式集合
 */
export const directionShadowStyles = {
  top: shadowTop,
  bottom: shadowBottom,
  left: shadowLeft,
  right: shadowRight,
} as const;

/**
 * 颜色阴影样式集合
 */
export const colorShadowStyles = {
  primary: shadowPrimary,
  success: shadowSuccess,
  warning: shadowWarning,
  danger: shadowDanger,
  info: shadowInfo,
} as const;

/**
 * 组件阴影样式集合
 */
export const componentShadowStyles = {
  card: shadowCard,
  cardHover: shadowCardHover,
  button: shadowButton,
  buttonHover: shadowButtonHover,
  modal: shadowModal,
  dropdown: shadowDropdown,
  tooltip: shadowTooltip,
  popover: shadowPopover,
  inputFocus: shadowInputFocus,
  inputError: shadowInputError,
} as const;

/**
 * 完整阴影样式集合
 */
export const shadowStyles = {
  base: baseShadowStyles,
  direction: directionShadowStyles,
  color: colorShadowStyles,
  component: componentShadowStyles,
} as const;

export default shadowStyles;
