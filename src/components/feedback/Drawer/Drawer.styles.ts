/**
 * Taro-Uno Drawer Component Styles
 * 抽屉组件样式定义
 */

import { CSSProperties } from 'react';
import { DrawerDirection, DrawerTheme } from './Drawer.types';

// 主题色映射
export const ThemeColors = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#1f2937',
    title: '#000000',
    mask: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    background: '#1f2937',
    border: '#374151',
    text: '#f9fafb',
    title: '#ffffff',
    mask: 'rgba(0, 0, 0, 0.7)',
  },
  primary: {
    background: '#1677ff',
    border: '#1677ff',
    text: '#ffffff',
    title: '#ffffff',
    mask: 'rgba(0, 0, 0, 0.5)',
  },
};

// 方向样式映射
export const DirectionStyles = {
  left: {
    left: 0,
    top: 0,
    bottom: 0,
    width: '320px',
    height: '100%',
    transform: 'translateX(-100%)',
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0,
    width: '320px',
    height: '100%',
    transform: 'translateX(100%)',
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    height: '320px',
    width: '100%',
    transform: 'translateY(-100%)',
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '320px',
    width: '100%',
    transform: 'translateY(100%)',
  },
};

// 基础样式
export const BaseStyles = {
  // 容器样式
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    transition: 'opacity 0.3s ease',
  } as CSSProperties,

  // 抽屉样式
  drawer: {
    position: 'fixed',
    zIndex: 1000,
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    maxHeight: '100%',
  } as CSSProperties,

  // 头部样式
  header: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '600',
  } as CSSProperties,

  // 标题样式
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#000000',
    margin: 0,
  } as CSSProperties,

  // 关闭按钮样式
  closeButton: {
    width: '32px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '4px',
    color: '#999999',
    background: 'transparent',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  // 内容样式
  content: {
    flex: 1,
    padding: '16px',
    overflow: 'auto',
    fontSize: '14px',
    lineHeight: '1.5',
  } as CSSProperties,

  // 底部样式
  footer: {
    padding: '16px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  } as CSSProperties,

  // 动画样式
  animation: {
    enter: {
      opacity: 1,
      transform: 'translate(0)',
    } as CSSProperties,
    leave: {
      opacity: 0,
    } as CSSProperties,
  },
};

// 获取主题样式
export const getThemeStyle = (theme: DrawerTheme = 'light') => {
  const colors = ThemeColors[theme];
  return {
    drawer: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text,
    } as CSSProperties,
    header: {
      borderBottomColor: colors.border,
    } as CSSProperties,
    title: {
      color: colors.title,
    } as CSSProperties,
    mask: {
      backgroundColor: colors.mask,
    } as CSSProperties,
    footer: {
      borderTopColor: colors.border,
    } as CSSProperties,
  };
};

// 获取方向样式
export const getDirectionStyle = (direction: DrawerDirection = 'right', width?: number | string, height?: number | string) => {
  const style = { ...DirectionStyles[direction] };

  // 自定义宽度或高度
  if (width && (direction === 'left' || direction === 'right')) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height && (direction === 'top' || direction === 'bottom')) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return style;
};

// 合并样式
export const mergeStyles = (...styles: (CSSProperties | undefined)[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};
