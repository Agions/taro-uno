import type { CSSProperties } from 'react';
import type { TooltipPlacement } from './Tooltip.types';

// 基础样式配置
export const tooltipStyles = {
  // 基础样式
  container: {
    position: 'relative',
    display: 'inline-block',
  } as CSSProperties,

  // 提示框基础样式
  tooltip: {
    position: 'absolute',
    zIndex: 1070,
    display: 'block',
    visibility: 'visible',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#fff',
    textAlign: 'center',
    padding: '6px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '4px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
    wordBreak: 'break-word',
    whiteSpace: 'nowrap',
    maxWidth: '350px',
    minWidth: '80px',
  } as CSSProperties,

  // 箭头样式
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    border: '6px solid transparent',
  } as CSSProperties,

  // 位置样式映射
  placements: {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px',
    } as CSSProperties,
    topArrow: {
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%) translateY(100%)',
      borderTopColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '8px',
    } as CSSProperties,
    bottomArrow: {
      top: '0',
      left: '50%',
      transform: 'translateX(-50%) translateY(-100%)',
      borderBottomColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: '8px',
    } as CSSProperties,
    leftArrow: {
      right: '0',
      top: '50%',
      transform: 'translateY(-50%) translateX(100%)',
      borderLeftColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: '8px',
    } as CSSProperties,
    rightArrow: {
      left: '0',
      top: '50%',
      transform: 'translateY(-50%) translateX(-100%)',
      borderRightColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    topLeft: {
      bottom: '100%',
      left: '0',
      marginBottom: '8px',
    } as CSSProperties,
    topLeftArrow: {
      bottom: '0',
      left: '16px',
      transform: 'translateX(-50%) translateY(100%)',
      borderTopColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    topRight: {
      bottom: '100%',
      right: '0',
      marginBottom: '8px',
    } as CSSProperties,
    topRightArrow: {
      bottom: '0',
      right: '16px',
      transform: 'translateX(50%) translateY(100%)',
      borderTopColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    bottomLeft: {
      top: '100%',
      left: '0',
      marginTop: '8px',
    } as CSSProperties,
    bottomLeftArrow: {
      top: '0',
      left: '16px',
      transform: 'translateX(-50%) translateY(-100%)',
      borderBottomColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    bottomRight: {
      top: '100%',
      right: '0',
      marginTop: '8px',
    } as CSSProperties,
    bottomRightArrow: {
      top: '0',
      right: '16px',
      transform: 'translateX(50%) translateY(-100%)',
      borderBottomColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    leftTop: {
      right: '100%',
      top: '0',
      marginRight: '8px',
    } as CSSProperties,
    leftTopArrow: {
      right: '0',
      top: '16px',
      transform: 'translateY(-50%) translateX(100%)',
      borderLeftColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    leftBottom: {
      right: '100%',
      bottom: '0',
      marginRight: '8px',
    } as CSSProperties,
    leftBottomArrow: {
      right: '0',
      bottom: '16px',
      transform: 'translateY(50%) translateX(100%)',
      borderLeftColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    rightTop: {
      left: '100%',
      top: '0',
      marginLeft: '8px',
    } as CSSProperties,
    rightTopArrow: {
      left: '0',
      top: '16px',
      transform: 'translateY(-50%) translateX(-100%)',
      borderRightColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
    rightBottom: {
      left: '100%',
      bottom: '0',
      marginLeft: '8px',
    } as CSSProperties,
    rightBottomArrow: {
      left: '0',
      bottom: '16px',
      transform: 'translateY(50%) translateX(-100%)',
      borderRightColor: 'rgba(0, 0, 0, 0.85)',
    } as CSSProperties,
  },

  // 内容样式
  content: {
    color: '#fff',
    fontSize: '14px',
    lineHeight: '1.5',
    textAlign: 'center',
  } as CSSProperties,

  // 获取提示框样式
  getTooltipStyle: (placement?: TooltipPlacement, color?: string, overlayStyle?: CSSProperties): CSSProperties => {
    const placementStyle = placement && tooltipStyles['placements'][placement] 
      ? tooltipStyles['placements'][placement] 
      : tooltipStyles['placements'].top;
    
    return {
      ...tooltipStyles['tooltip'],
      ...placementStyle,
      backgroundColor: color || 'rgba(0, 0, 0, 0.85)',
      ...overlayStyle,
    };
  },

  // 获取箭头样式
  getArrowStyle: (placement?: TooltipPlacement, color?: string, arrow?: boolean): CSSProperties => {
    if (!arrow) return {};
    
    const arrowKey = `${placement}Arrow` as keyof typeof tooltipStyles['placements'];
    const arrowStyle = tooltipStyles['placements'][arrowKey];
    
    if (!arrowStyle) return {};
    
    return {
      ...tooltipStyles['arrow'],
      ...arrowStyle,
      borderColor: color || 'rgba(0, 0, 0, 0.85)',
    };
  },

  // 获取容器样式
  getContainerStyle: (style?: CSSProperties): CSSProperties => {
    return {
      ...tooltipStyles['container'],
      ...style,
    };
  },

  // 获取内容样式
  getContentStyle: (color?: string): CSSProperties => {
    return {
      ...tooltipStyles['content'],
      color: color ? '#fff' : '#fff',
    };
  },

  // 主题样式
  themes: {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#111827',
      borderColor: '#e5e7eb',
      arrowColor: '#ffffff',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    } as CSSProperties,
    dark: {
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      borderColor: '#374151',
      arrowColor: '#1f2937',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    } as CSSProperties,
    primary: {
      backgroundColor: '#0ea5e9',
      textColor: '#ffffff',
      borderColor: '#0ea5e9',
      arrowColor: '#0ea5e9',
      shadow: '0 4px 6px -1px rgba(14, 165, 233, 0.3), 0 2px 4px -1px rgba(14, 165, 233, 0.1)',
    } as CSSProperties,
    success: {
      backgroundColor: '#22c55e',
      textColor: '#ffffff',
      borderColor: '#22c55e',
      arrowColor: '#22c55e',
      shadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3), 0 2px 4px -1px rgba(34, 197, 94, 0.1)',
    } as CSSProperties,
    warning: {
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      borderColor: '#f59e0b',
      arrowColor: '#f59e0b',
      shadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3), 0 2px 4px -1px rgba(245, 158, 11, 0.1)',
    } as CSSProperties,
    error: {
      backgroundColor: '#ef4444',
      textColor: '#ffffff',
      borderColor: '#ef4444',
      arrowColor: '#ef4444',
      shadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3), 0 2px 4px -1px rgba(239, 68, 68, 0.1)',
    } as CSSProperties,
    info: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderColor: '#3b82f6',
      arrowColor: '#3b82f6',
      shadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
    } as CSSProperties,
  },

  // 获取主题样式
  getThemeStyle: (theme?: string): CSSProperties => {
    const themeKey = theme as keyof typeof tooltipStyles['themes'];
    return tooltipStyles['themes'][themeKey] || tooltipStyles['themes'].dark;
  },
};

// CSS 类名工具函数
export const getTooltipClasses = (placement: TooltipPlacement, visible: boolean): string => {
  const baseClasses = [
    'tooltip',
    `tooltip-${placement}`,
    visible ? 'tooltip-visible' : 'tooltip-hidden',
  ];
  
  return baseClasses.join(' ');
};

export const getArrowClasses = (placement: TooltipPlacement, arrow: boolean): string => {
  if (!arrow) return '';
  
  const baseClasses = [
    'tooltip-arrow',
    `tooltip-arrow-${placement}`,
  ];
  
  return baseClasses.join(' ');
};

export const tooltipCssClasses = {
  container: 'tooltip-container',
  tooltip: 'tooltip',
  tooltipVisible: 'tooltip-visible',
  tooltipHidden: 'tooltip-hidden',
  arrow: 'tooltip-arrow',
  content: 'tooltip-content',
  // 位置类
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
  topLeft: 'tooltip-top-left',
  topRight: 'tooltip-top-right',
  bottomLeft: 'tooltip-bottom-left',
  bottomRight: 'tooltip-bottom-right',
  leftTop: 'tooltip-left-top',
  leftBottom: 'tooltip-left-bottom',
  rightTop: 'tooltip-right-top',
  rightBottom: 'tooltip-right-bottom',
  // 主题类
  light: 'tooltip-light',
  dark: 'tooltip-dark',
  primary: 'tooltip-primary',
  success: 'tooltip-success',
  warning: 'tooltip-warning',
  error: 'tooltip-error',
  info: 'tooltip-info',
};

export default tooltipStyles;