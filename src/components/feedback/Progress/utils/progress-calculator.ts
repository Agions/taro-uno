import { ProgressGapPosition, ProgressLineCap } from '../Progress.types';

export interface CircleDimensions {
  size: number;
  strokeWidth: number;
  radius: number;
  circumference: number;
  centerX: number;
  centerY: number;
}

export interface CircleProgressData {
  strokeDasharray: number;
  strokeDashoffset: number;
  rotation: number;
  transform: string;
  transformOrigin: string;
}

/**
 * 计算圆形进度条的尺寸
 */
export function calculateCircleDimensions(size: number, strokeWidth: number): CircleDimensions {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centerX = size / 2;
  const centerY = size / 2;

  return {
    size,
    strokeWidth,
    radius,
    circumference,
    centerX,
    centerY,
  };
}

/**
 * 计算圆形进度条的进度数据
 */
export function calculateCircleProgress(dimensions: CircleDimensions, percent: number): CircleProgressData {
  const { circumference } = dimensions;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const rotation = -90;
  const transform = `rotate(${rotation}deg)`;
  const transformOrigin = '50% 50%';

  return {
    strokeDasharray,
    strokeDashoffset,
    rotation,
    transform,
    transformOrigin,
  };
}

/**
 * 计算仪表盘进度条的进度数据
 */
export function calculateDashboardProgress(
  dimensions: CircleDimensions,
  percent: number,
  gapDegree: number,
  gapPosition: ProgressGapPosition = 'top',
): CircleProgressData {
  const { circumference } = dimensions;
  const effectiveCircumference = circumference * (1 - gapDegree / 360);
  const strokeDasharray = effectiveCircumference;
  const strokeDashoffset = effectiveCircumference - (percent / 100) * effectiveCircumference;

  // 根据缺口位置计算旋转角度
  const rotationMap: Record<ProgressGapPosition, number> = {
    top: -90,
    right: 0,
    bottom: 90,
    left: 180,
  };

  const baseRotation = rotationMap[gapPosition];
  const rotation = baseRotation + gapDegree / 2;
  const transform = `rotate(${rotation}deg)`;
  const transformOrigin = '50% 50%';

  return {
    strokeDasharray,
    strokeDashoffset,
    rotation,
    transform,
    transformOrigin,
  };
}

/**
 * 计算线型进度条的宽度
 */
export function calculateLineWidth(containerWidth: number, percent: number): number {
  return Math.max(0, Math.min(containerWidth, (containerWidth * percent) / 100));
}

/**
 * 根据状态获取颜色
 */
export function getStatusColor(status: string, theme: Record<string, string>): string {
  return theme[status] || theme['normal'] || '#1890ff';
}

/**
 * 验证进度值
 */
export function validatePercent(percent: number): number {
  return Math.max(0, Math.min(100, percent));
}

/**
 * 计算动画时长
 */
export function calculateAnimationDuration(
  percentDiff: number,
  baseDuration: number = 300,
  maxDuration: number = 1000,
): number {
  const duration = (percentDiff / 100) * baseDuration;
  return Math.min(duration, maxDuration);
}

/**
 * 计算分段进度的位置
 */
export function calculateSegmentPositions(
  segments: Array<{ color: string; percent: number }>,
  containerWidth: number,
): Array<{ color: string; left: number; width: number }> {
  let currentLeft = 0;
  return segments.map((segment) => {
    const width = (containerWidth * segment.percent) / 100;
    const position = {
      color: segment.color,
      left: currentLeft,
      width,
    };
    currentLeft += width;
    return position;
  });
}

/**
 * 计算线帽样式
 */
export function getLineCapStyle(lineCap: ProgressLineCap): string {
  return lineCap;
}

/**
 * 计算圆角半径
 */
export function calculateBorderRadius(strokeWidth: number, lineCap: ProgressLineCap): number {
  if (lineCap === 'round') {
    return strokeWidth / 2;
  }
  return 0;
}

/**
 * 生成唯一ID
 */
export function generateId(prefix: string = 'progress'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化进度值
 */
export function formatProgressValue(
  percent: number,
  formatter?: (percent: number) => React.ReactNode,
): React.ReactNode {
  if (formatter) {
    return formatter(percent);
  }
  return `${Math.round(percent)}%`;
}

/**
 * 计算进度状态
 */
export function calculateProgressStatus(percent: number, currentStatus?: string): string {
  if (percent >= 100) {
    return 'success';
  }
  if (currentStatus === 'exception') {
    return 'exception';
  }
  if (percent > 0) {
    return 'active';
  }
  return 'normal';
}
