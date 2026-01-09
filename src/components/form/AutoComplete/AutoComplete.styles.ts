/**
 * Taro-Uno AutoComplete Component Styles
 * 自动完成组件样式定义
 */

import { CSSProperties } from 'react';
import { AutoCompleteDirection, AutoCompleteTheme, AutoCompleteSize, AutoCompleteStatus } from './AutoComplete.types';

// 主题色映射
export const ThemeColors = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#1f2937',
    placeholder: '#9ca3af',
    hover: '#f3f4f6',
    active: '#e5e7eb',
    disabled: '#f3f4f6',
    disabledText: '#9ca3af',
    optionHover: '#f3f4f6',
    optionActive: '#e5e7eb',
  },
  dark: {
    background: '#1f2937',
    border: '#374151',
    text: '#f9fafb',
    placeholder: '#9ca3af',
    hover: '#374151',
    active: '#4b5563',
    disabled: '#374151',
    disabledText: '#9ca3af',
    optionHover: '#374151',
    optionActive: '#4b5563',
  },
  primary: {
    background: '#ffffff',
    border: '#1677ff',
    text: '#1677ff',
    placeholder: '#9ca3af',
    hover: '#f0f9ff',
    active: '#e0f2fe',
    disabled: '#f3f4f6',
    disabledText: '#9ca3af',
    optionHover: '#f0f9ff',
    optionActive: '#e0f2fe',
  },
};

// 状态色映射
export const StatusColors = {
  default: {
    border: '#e5e7eb',
    text: '#1f2937',
  },
  success: {
    border: '#22c55e',
    text: '#22c55e',
  },
  warning: {
    border: '#f59e0b',
    text: '#f59e0b',
  },
  error: {
    border: '#ef4444',
    text: '#ef4444',
  },
};

// 大小样式映射
export const SizeStyles = {
  xs: {
    fontSize: '12px',
    padding: '4px 8px',
    height: '28px',
  },
  sm: {
    fontSize: '14px',
    padding: '6px 12px',
    height: '32px',
  },
  md: {
    fontSize: '16px',
    padding: '8px 16px',
    height: '40px',
  },
  lg: {
    fontSize: '18px',
    padding: '10px 20px',
    height: '48px',
  },
  xl: {
    fontSize: '20px',
    padding: '12px 24px',
    height: '56px',
  },
};

// 方向样式映射
export const DirectionStyles = {
  top: {
    transformOrigin: 'bottom center',
  },
  bottom: {
    transformOrigin: 'top center',
  },
  left: {
    transformOrigin: 'right center',
  },
  right: {
    transformOrigin: 'left center',
  },
};

// 基础样式
export const BaseStyles = {
  // 容器样式
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  } as CSSProperties,

  // 输入框容器样式
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
  } as CSSProperties,

  // 输入框样式
  input: {
    flex: 1,
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#1f2937',
    backgroundColor: 'transparent',
    outline: 'none',
    transition: 'all 0.3s ease',
  } as CSSProperties,

  // 前置图标样式
  prefix: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    color: '#9ca3af',
    fontSize: '16px',
  } as CSSProperties,

  // 后置图标样式
  suffix: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    color: '#9ca3af',
    fontSize: '16px',
    cursor: 'pointer',
  } as CSSProperties,

  // 清除按钮样式
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    color: '#9ca3af',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
  } as CSSProperties,

  // 选项容器样式
  optionsContainer: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    maxHeight: '300px',
    overflow: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginTop: '4px',
    marginBottom: '4px',
  } as CSSProperties,

  // 选项样式
  option: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1f2937',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderBottom: '1px solid #f3f4f6',
  } as CSSProperties,

  // 选项图标样式
  optionIcon: {
    marginRight: '8px',
    fontSize: '16px',
    color: '#9ca3af',
  } as CSSProperties,

  // 选项标签样式
  optionLabel: {
    flex: 1,
    fontWeight: '500',
  } as CSSProperties,

  // 选项描述样式
  optionDescription: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '2px',
  } as CSSProperties,

  // 加载状态样式
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    color: '#9ca3af',
  } as CSSProperties,

  // 空状态样式
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    color: '#9ca3af',
    fontSize: '14px',
  } as CSSProperties,

  // 动画样式
  animation: {
    enter: {
      animation: 'autocomplete-enter 0.3s ease-out',
    } as CSSProperties,
    leave: {
      animation: 'autocomplete-leave 0.3s ease-in',
    } as CSSProperties,
  },
};

// 获取主题样式
export const getThemeStyle = (theme: AutoCompleteTheme = 'light') => {
  const colors = ThemeColors[theme];
  return {
    inputContainer: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    } as CSSProperties,
    input: {
      color: colors.text,
      '&::placeholder': {
        color: colors.placeholder,
      },
    } as CSSProperties,
    inputContainerHover: {
      borderColor: colors.text,
      backgroundColor: colors.hover,
    } as CSSProperties,
    inputContainerFocus: {
      borderColor: colors.text,
      boxShadow: `0 0 0 2px ${colors.text}40`,
    } as CSSProperties,
    inputContainerDisabled: {
      backgroundColor: colors.disabled,
      borderColor: colors.disabled,
      cursor: 'not-allowed',
    } as CSSProperties,
    inputDisabled: {
      color: colors.disabledText,
      cursor: 'not-allowed',
    } as CSSProperties,
    optionsContainer: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    } as CSSProperties,
    option: {
      color: colors.text,
      borderBottomColor: colors.border,
    } as CSSProperties,
    optionHover: {
      backgroundColor: colors.optionHover,
    } as CSSProperties,
    optionActive: {
      backgroundColor: colors.optionActive,
    } as CSSProperties,
    optionDisabled: {
      color: colors.disabledText,
      backgroundColor: colors.disabled,
      cursor: 'not-allowed',
    } as CSSProperties,
  };
};

// 获取状态样式
export const getStatusStyle = (status: AutoCompleteStatus = 'default') => {
  const colors = StatusColors[status];
  return {
    inputContainer: {
      borderColor: colors.border,
    } as CSSProperties,
    input: {
      color: colors.text,
    } as CSSProperties,
    inputContainerFocus: {
      borderColor: colors.border,
      boxShadow: `0 0 0 2px ${colors.border}40`,
    } as CSSProperties,
  };
};

// 获取大小样式
export const getSizeStyle = (size: AutoCompleteSize = 'md') => {
  const style = SizeStyles[size];
  return {
    inputContainer: {
      height: style.height,
    } as CSSProperties,
    input: {
      fontSize: style.fontSize,
      padding: style.padding,
      lineHeight: 1.5,
    } as CSSProperties,
    prefix: {
      fontSize: style.fontSize,
    } as CSSProperties,
    suffix: {
      fontSize: style.fontSize,
    } as CSSProperties,
    clearButton: {
      fontSize: style.fontSize,
    } as CSSProperties,
  };
};

// 获取方向样式
export const getDirectionStyle = (direction: AutoCompleteDirection = 'bottom') => {
  return DirectionStyles[direction];
};

// 合并样式
export const mergeStyles = (...styles: (CSSProperties | undefined)[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};

// 动画关键帧
export const Keyframes = `
@keyframes autocomplete-enter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes autocomplete-leave {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
`;