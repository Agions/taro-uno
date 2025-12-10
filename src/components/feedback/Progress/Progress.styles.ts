import type { CSSProperties } from 'react';
import type {
  ProgressType,
  ProgressStatus,
  ProgressSize,
  ProgressStyleProps,
  ProgressStyles as ProgressStylesType,
  ProgressGradient,
} from './Progress.types';
import {
  calculateCircleDimensions,
  calculateCircleProgress,
  calculateDashboardProgress,
  getStatusColor,
  calculateBorderRadius,
} from './utils/progress-calculator';

// 默认主题配置
const defaultTheme = {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  textColor: '#666',
  backgroundColor: '#f0f0f0',
  borderRadius: 4,
};

// 状态颜色映射
const statusColors: Record<ProgressStatus, string> = {
  normal: defaultTheme.primaryColor,
  success: defaultTheme.successColor,
  exception: defaultTheme.errorColor,
  active: defaultTheme.primaryColor,
};

// 尺寸映射
const sizeMapping: Record<ProgressSize, number> = {
  xs: 60,
  sm: 70,
  small: 80,
  default: 120,
  lg: 140,
  large: 160,
};

// 线宽映射
const strokeWidthMapping: Record<ProgressSize, number> = {
  xs: 2,
  sm: 3,
  small: 4,
  default: 6,
  lg: 7,
  large: 8,
};

// 字体大小映射
const fontSizeMapping: Record<ProgressSize, string> = {
  xs: '10px',
  sm: '11px',
  small: '12px',
  default: '14px',
  lg: '15px',
  large: '16px',
};

export const progressStyles: ProgressStylesType = {
  // 基础样式
  container: {
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
  },

  // 线型进度条
  lineContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '8px',
  },

  lineOuter: {
    flex: 1,
    height: '8px',
    backgroundColor: defaultTheme.backgroundColor,
    borderRadius: defaultTheme.borderRadius,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
  },

  lineInner: {
    height: '100%',
    backgroundColor: defaultTheme.primaryColor,
    borderRadius: defaultTheme.borderRadius,
    transition: 'width 0.3s ease',
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
  },

  // 圆形进度条
  circleContainer: {
    position: 'relative',
    display: 'inline-block',
  },

  circleOuter: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleInner: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 仪表盘样式
  dashboardOuter: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dashboardInner: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 状态颜色
  statusColors,

  // 尺寸样式
  sizes: {
    xs: {
      lineHeight: '14px',
    },
    sm: {
      lineHeight: '15px',
    },
    small: {
      lineHeight: '16px',
    },
    default: {
      lineHeight: '20px',
    },
    lg: {
      lineHeight: '22px',
    },
    large: {
      lineHeight: '24px',
    },
  },

  // 进度信息
  progressInfo: {
    marginLeft: '8px',
    fontSize: '14px',
    color: defaultTheme.textColor,
    minWidth: '40px',
    textAlign: 'center',
    fontWeight: 500,
  },

  // 动画样式
  animation: {
    transition: 'width 0.3s ease, stroke-dashoffset 0.3s ease',
  },
};

// 获取线型进度条样式
export const getLineStyle = (props: ProgressStyleProps) => {
  const {
    strokeWidth = 8,
    trailColor = defaultTheme.backgroundColor,
    strokeColor,
    status = 'normal',
    animated = true,
    strokeLinecap = 'round',
    theme = {},
  } = props;

  const mergedTheme = { ...defaultTheme, ...theme };
  const borderRadius = calculateBorderRadius(strokeWidth, strokeLinecap);
  const color = strokeColor
    ? typeof strokeColor === 'string'
      ? strokeColor
      : mergedTheme.primaryColor
    : getStatusColor(status, statusColors);

  return {
    outer: {
      height: strokeWidth,
      backgroundColor: trailColor,
      borderRadius,
      overflow: 'hidden' as const,
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
    },
    inner: {
      height: '100%',
      backgroundColor: color,
      borderRadius,
      transition: animated ? 'width 0.3s ease' : 'none',
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
    },
  };
};

// 获取圆形进度条样式
export const getCircleStyle = (props: ProgressStyleProps) => {
  const {
    size = 'default',
    strokeWidth: customStrokeWidth,
    trailColor = defaultTheme.backgroundColor,
    strokeColor,
    status = 'normal',
    percent = 0,
    animated = true,
    strokeLinecap = 'round',
    theme = {},
  } = props;

  const sizeValue = sizeMapping[size];
  const strokeWidth = customStrokeWidth || strokeWidthMapping[size];
  const mergedTheme = { ...defaultTheme, ...theme };

  const dimensions = calculateCircleDimensions(sizeValue, strokeWidth);
  const progressData = calculateCircleProgress(dimensions, percent);
  const color = strokeColor
    ? typeof strokeColor === 'string'
      ? strokeColor
      : mergedTheme.primaryColor
    : getStatusColor(status, statusColors);

  return {
    outer: {
      width: sizeValue,
      height: sizeValue,
      position: 'relative' as const,
    },
    trail: {
      fill: 'none',
      stroke: trailColor,
      strokeWidth,
      strokeLinecap,
      cx: dimensions.centerX,
      cy: dimensions.centerY,
      r: dimensions.radius,
    },
    path: {
      fill: 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap,
      cx: dimensions.centerX,
      cy: dimensions.centerY,
      r: dimensions.radius,
      strokeDasharray: progressData.strokeDasharray,
      strokeDashoffset: progressData.strokeDashoffset,
      transform: progressData.transform,
      transformOrigin: progressData.transformOrigin,
      transition: animated ? 'stroke-dashoffset 0.3s ease' : 'none',
    },
    inner: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: fontSizeMapping[size],
      color: mergedTheme.textColor,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

// 获取仪表盘样式
export const getDashboardStyle = (props: ProgressStyleProps) => {
  const {
    size = 'default',
    strokeWidth: customStrokeWidth,
    trailColor = defaultTheme.backgroundColor,
    strokeColor,
    status = 'normal',
    percent = 0,
    gapDegree = 75,
    gapPosition = 'top',
    animated = true,
    strokeLinecap = 'round',
    theme = {},
  } = props;

  const sizeValue = sizeMapping[size];
  const strokeWidth = customStrokeWidth || strokeWidthMapping[size];
  const mergedTheme = { ...defaultTheme, ...theme };

  const dimensions = calculateCircleDimensions(sizeValue, strokeWidth);
  const progressData = calculateDashboardProgress(dimensions, percent, gapDegree, gapPosition);
  const color = strokeColor
    ? typeof strokeColor === 'string'
      ? strokeColor
      : mergedTheme.primaryColor
    : getStatusColor(status, statusColors);

  return {
    outer: {
      width: sizeValue,
      height: sizeValue,
      position: 'relative' as const,
    },
    trail: {
      fill: 'none',
      stroke: trailColor,
      strokeWidth,
      strokeLinecap,
      cx: dimensions.centerX,
      cy: dimensions.centerY,
      r: dimensions.radius,
      strokeDasharray: progressData.strokeDasharray,
      strokeDashoffset: 0,
      transform: progressData.transform,
      transformOrigin: progressData.transformOrigin,
    },
    path: {
      fill: 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap,
      cx: dimensions.centerX,
      cy: dimensions.centerY,
      r: dimensions.radius,
      strokeDasharray: progressData.strokeDasharray,
      strokeDashoffset: progressData.strokeDashoffset,
      transform: progressData.transform,
      transformOrigin: progressData.transformOrigin,
      transition: animated ? 'stroke-dashoffset 0.3s ease' : 'none',
    },
    inner: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: fontSizeMapping[size],
      color: mergedTheme.textColor,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

// 获取进度信息样式
export const getInfoStyle = (size?: ProgressSize, customStyle?: CSSProperties): CSSProperties => {
  const baseStyle = size ? progressStyles['sizes'][size] : progressStyles['sizes'].default;
  const fontSize = size ? fontSizeMapping[size] : fontSizeMapping.default;

  return {
    ...baseStyle,
    fontSize,
    color: defaultTheme.textColor,
    minWidth: '40px',
    fontWeight: 500,
    ...customStyle,
  };
};

// 获取容器样式
export const getContainerStyle = (type?: ProgressType, customStyle?: CSSProperties): CSSProperties => {
  if (type === 'line') {
    return {
      ...progressStyles['lineContainer'],
      ...customStyle,
    };
  }

  return {
    ...progressStyles['container'],
    ...customStyle,
  };
};

// 获取SVG样式
export const getSvgStyle = (size: number): CSSProperties => ({
  width: size,
  height: size,
  display: 'block' as const,
});

// 生成渐变样式
export const generateGradientStyle = (gradient: ProgressGradient | undefined, _size: number): string => {
  if (!gradient || !gradient.colors || gradient.colors.length === 0) {
    return defaultTheme.primaryColor;
  }

  const { type = 'linear', direction: _direction = 'to right', colors: _colors } = gradient;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  if (type === 'linear') {
    return `url(#${gradientId})`;
  }

  return `url(#${gradientId})`;
};

// 导出样式工具函数
export const ProgressStyles = {
  getLineStyle,
  getCircleStyle,
  getDashboardStyle,
  getInfoStyle,
  getContainerStyle,
  getSvgStyle,
  generateGradientStyle,
};

// 导出动画关键帧
export const ProgressKeyframes = {
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.6 },
  },
};

// 导出媒体查询
export const ProgressMediaQueries = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 1024px)',
  desktop: '@media (min-width: 1025px)',
};

// 导出CSS变量
export const ProgressCSSVariables = {
  primaryColor: '--taro-uno-progress-primary-color',
  successColor: '--taro-uno-progress-success-color',
  errorColor: '--taro-uno-progress-error-color',
  warningColor: '--taro-uno-progress-warning-color',
  backgroundColor: '--taro-uno-progress-background-color',
  borderRadius: '--taro-uno-progress-border-radius',
  strokeWidth: '--taro-uno-progress-stroke-width',
};

// 导出默认样式
export default progressStyles;
