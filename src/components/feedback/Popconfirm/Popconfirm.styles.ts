/**
 * Taro-Uno Popconfirm Component Styles
 * 确认弹窗组件样式定义
 */

import { CSSProperties } from 'react';
import { PopconfirmDirection, PopconfirmTheme } from './Popconfirm.types';

// 主题色映射
export const ThemeColors = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#1f2937',
    title: '#000000',
    okText: '#1677ff',
    cancelText: '#6b7280',
    mask: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    background: '#1f2937',
    border: '#374151',
    text: '#f9fafb',
    title: '#ffffff',
    okText: '#3b82f6',
    cancelText: '#9ca3af',
    mask: 'rgba(0, 0, 0, 0.7)',
  },
  primary: {
    background: '#1677ff',
    border: '#1677ff',
    text: '#ffffff',
    title: '#ffffff',
    okText: '#ffffff',
    cancelText: 'rgba(255, 255, 255, 0.8)',
    mask: 'rgba(0, 0, 0, 0.5)',
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

// 按钮类型样式映射
export const ButtonTypeStyles = {
  primary: {
    background: '#1677ff',
    color: '#ffffff',
    border: '1px solid #1677ff',
  },
  default: {
    background: '#ffffff',
    color: '#1f2937',
    border: '1px solid #d9d9d9',
  },
  danger: {
    background: '#ff4d4f',
    color: '#ffffff',
    border: '1px solid #ff4d4f',
  },
  success: {
    background: '#52c41a',
    color: '#ffffff',
    border: '1px solid #52c41a',
  },
};

// 基础样式
export const BaseStyles = {
  // 容器样式
  container: {
    position: 'relative',
    display: 'inline-block',
  } as CSSProperties,

  // 触发元素样式
  trigger: {
    cursor: 'pointer',
  } as CSSProperties,

  // 弹窗样式
  popup: {
    position: 'absolute',
    zIndex: 1000,
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid',
    backgroundColor: '#ffffff',
    minWidth: '280px',
    maxWidth: '400px',
    fontSize: '14px',
    lineHeight: '1.5',
  } as CSSProperties,

  // 遮罩层样式
  mask: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as CSSProperties,

  // 标题样式
  title: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#000000',
  } as CSSProperties,

  // 内容样式
  content: {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '16px',
    lineHeight: '1.5',
  } as CSSProperties,

  // 按钮容器样式
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '12px',
  } as CSSProperties,

  // 按钮基础样式
  button: {
    padding: '6px 12px',
    borderRadius: '4px',
    border: '1px solid',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s',
    minWidth: '80px',
    textAlign: 'center',
  } as CSSProperties,

  // 关闭按钮样式
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    color: '#999999',
    background: 'transparent',
    border: 'none',
    padding: 0,
  } as CSSProperties,

  // 图标样式
  icon: {
    marginRight: '8px',
    fontSize: '16px',
  } as CSSProperties,

  // 动画样式
  animation: {
    enter: {
      animation: 'popconfirm-enter 0.3s ease-out',
    } as CSSProperties,
    leave: {
      animation: 'popconfirm-leave 0.3s ease-in',
    } as CSSProperties,
  },
};

// 获取主题样式
export const getThemeStyle = (theme: PopconfirmTheme = 'light') => {
  const colors = ThemeColors[theme];
  return {
    popup: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text,
    } as CSSProperties,
    title: {
      color: colors.title,
    } as CSSProperties,
    mask: {
      backgroundColor: colors.mask,
    } as CSSProperties,
    okButton: {
      backgroundColor: theme === 'primary' ? colors.background : '#1677ff',
      color: theme === 'primary' ? '#1677ff' : colors.okText,
      borderColor: theme === 'primary' ? '#1677ff' : '#1677ff',
    } as CSSProperties,
    cancelButton: {
      backgroundColor: theme === 'primary' ? 'transparent' : colors.background,
      color: theme === 'primary' ? colors.cancelText : '#6b7280',
      borderColor: theme === 'primary' ? colors.cancelText : '#d9d9d9',
    } as CSSProperties,
  };
};

// 获取方向样式
export const getDirectionStyle = (direction: PopconfirmDirection = 'top') => {
  return DirectionStyles[direction];
};

// 获取按钮样式
export const getButtonStyle = (type: keyof typeof ButtonTypeStyles = 'default') => {
  return ButtonTypeStyles[type] || ButtonTypeStyles.default;
};

// 合并样式
export const mergeStyles = (...styles: (CSSProperties | undefined)[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};

// 动画关键帧
export const Keyframes = `
@keyframes popconfirm-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popconfirm-leave {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
`;
