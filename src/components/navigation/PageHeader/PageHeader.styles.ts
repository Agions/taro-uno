/**
 * Taro-Uno PageHeader Component Styles
 * 页面头部组件样式定义
 */

import { CSSProperties } from 'react';
import { PageHeaderTheme, PageHeaderLayout, PageHeaderSize } from './PageHeader.types';

// 主题色映射
export const ThemeColors = {
  light: {
    background: '#ffffff',
    border: '#e5e7eb',
    text: '#1f2937',
    subtext: '#6b7280',
    hover: '#f3f4f6',
    active: '#e5e7eb',
    disabled: '#9ca3af',
    actionBackground: '#ffffff',
    actionBorder: '#d9d9d9',
  },
  dark: {
    background: '#1f2937',
    border: '#374151',
    text: '#f9fafb',
    subtext: '#9ca3af',
    hover: '#374151',
    active: '#4b5563',
    disabled: '#6b7280',
    actionBackground: '#374151',
    actionBorder: '#4b5563',
  },
  primary: {
    background: '#1677ff',
    border: '#1677ff',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.8)',
    hover: '#3b82f6',
    active: '#2563eb',
    disabled: '#93c5fd',
    actionBackground: 'rgba(255, 255, 255, 0.1)',
    actionBorder: 'rgba(255, 255, 255, 0.2)',
  },
};

// 布局样式映射
export const LayoutStyles = {
  default: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
  },
  compact: {
    padding: '8px 16px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  simple: {
    padding: '8px 16px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
};

// 大小样式映射
export const SizeStyles = {
  xs: {
    titleFontSize: '16px',
    subtitleFontSize: '12px',
    padding: '8px 16px',
  },
  sm: {
    titleFontSize: '18px',
    subtitleFontSize: '14px',
    padding: '12px 16px',
  },
  md: {
    titleFontSize: '20px',
    subtitleFontSize: '14px',
    padding: '16px 20px',
  },
  lg: {
    titleFontSize: '24px',
    subtitleFontSize: '16px',
    padding: '20px 24px',
  },
  xl: {
    titleFontSize: '28px',
    subtitleFontSize: '18px',
    padding: '24px 28px',
  },
};

// 基础样式
export const BaseStyles = {
  // 容器样式
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'center' as const,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#1f2937',
  } as CSSProperties,

  // 顶部区域样式
  topArea: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    width: '100%',
    marginBottom: '8px',
  } as CSSProperties,

  // 左侧区域样式
  leftArea: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  } as CSSProperties,

  // 右侧区域样式
  rightArea: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
  } as CSSProperties,

  // 返回按钮样式
  backButton: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '8px',
    marginRight: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
  } as CSSProperties,

  // 返回图标样式
  backIcon: {
    marginRight: '4px',
    fontSize: '16px',
  } as CSSProperties,

  // 返回文本样式
  backText: {
    fontSize: '14px',
    fontWeight: '500' as const,
  } as CSSProperties,

  // 面包屑容器样式
  breadcrumbContainer: {
    marginBottom: '8px',
    width: '100%',
  } as CSSProperties,

  // 标题区域样式
  titleArea: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'center' as const,
    marginBottom: '12px',
  } as CSSProperties,

  // 标题样式
  title: {
    fontSize: '20px',
    fontWeight: '600' as const,
    marginBottom: '4px',
    lineHeight: '1.2',
  } as CSSProperties,

  // 副标题样式
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.4',
  } as CSSProperties,

  // 额外信息样式
  extra: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px',
  } as CSSProperties,

  // 操作区域样式
  actionsArea: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
    gap: '8px',
    width: '100%',
  } as CSSProperties,

  // 操作按钮样式
  actionButton: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid',
    textDecoration: 'none',
  } as CSSProperties,

  // 操作按钮图标样式
  actionIcon: {
    marginRight: '4px',
    fontSize: '14px',
  } as CSSProperties,

  // 操作按钮文本样式
  actionText: {
    fontSize: '14px',
    fontWeight: '500' as const,
  } as CSSProperties,
};

// 获取主题样式
export const getThemeStyle = (theme: PageHeaderTheme = 'light') => {
  const colors = ThemeColors[theme];
  return {
    container: {
      backgroundColor: colors.background,
      borderBottomColor: colors.border,
      color: colors.text,
    } as CSSProperties,
    title: {
      color: colors.text,
    } as CSSProperties,
    subtitle: {
      color: colors.subtext,
    } as CSSProperties,
    extra: {
      color: colors.subtext,
    } as CSSProperties,
    backButton: {
      color: colors.text,
      '&:hover': {
        backgroundColor: colors.hover,
      },
      '&:active': {
        backgroundColor: colors.active,
      },
    } as CSSProperties,
    backIcon: {
      color: colors.text,
    } as CSSProperties,
    backText: {
      color: colors.text,
    } as CSSProperties,
    actionButton: {
      backgroundColor: colors.actionBackground,
      borderColor: colors.actionBorder,
      color: colors.text,
      '&:hover': {
        backgroundColor: colors.hover,
        borderColor: colors.border,
      },
      '&:active': {
        backgroundColor: colors.active,
        borderColor: colors.border,
      },
      '&:disabled': {
        color: colors.disabled,
        backgroundColor: colors.actionBackground,
        borderColor: colors.actionBorder,
        cursor: 'not-allowed',
      },
    } as CSSProperties,
    actionIcon: {
      color: colors.text,
    } as CSSProperties,
    actionText: {
      color: colors.text,
    } as CSSProperties,
  };
};

// 获取布局样式
export const getLayoutStyle = (layout: PageHeaderLayout = 'default') => {
  return LayoutStyles[layout];
};

// 获取大小样式
export const getSizeStyle = (size: PageHeaderSize = 'md') => {
  const style = SizeStyles[size];
  return {
    container: {
      padding: style.padding,
    } as CSSProperties,
    title: {
      fontSize: style.titleFontSize,
    } as CSSProperties,
    subtitle: {
      fontSize: style.subtitleFontSize,
    } as CSSProperties,
  };
};

// 合并样式
export const mergeStyles = (...styles: (CSSProperties | undefined)[]) => {
  return Object.assign({}, ...styles.filter(Boolean));
};
