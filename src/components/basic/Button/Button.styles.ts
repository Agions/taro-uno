import { CSSProperties } from 'react';

export const buttonStyles: Record<string, CSSProperties> = {
  // 基础样式
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: 14,
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box' as const,
  },

  // 尺寸样式
  small: {
    padding: '6px 12px',
    fontSize: 12,
    height: 28,
  },
  medium: {
    padding: '8px 16px',
    fontSize: 14,
    height: 32,
  },
  large: {
    padding: '12px 24px',
    fontSize: 16,
    height: 40,
  },

  // 类型样式
  default: {
    backgroundColor: '#ffffff',
    color: '#374151',
    borderColor: '#d1d5db',
  },
  primary: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderColor: '#3b82f6',
  },
  success: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    borderColor: '#10b981',
  },
  warning: {
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    borderColor: '#f59e0b',
  },
  danger: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderColor: '#ef4444',
  },

  // 变体样式
  solid: {},
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  text: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },

  // 形状样式
  defaultShape: {
    borderRadius: 6,
  },
  round: {
    borderRadius: 16,
  },
  circle: {
    borderRadius: '50%',
    width: 32,
    height: 32,
    padding: 0,
  },

  // 状态样式
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  loading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },

  // 内容样式
  icon: {
    marginRight: 6,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center' as const,
  },
  loadingContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  loadingIcon: {
    width: 14,
    height: 14,
    border: '2px solid transparent',
    borderTopColor: 'currentColor',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: 'inherit',
    color: 'inherit',
  },
};
