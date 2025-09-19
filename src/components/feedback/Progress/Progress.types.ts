import * as React from 'react';
import type { CSSProperties } from 'react';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export type ProgressSize = 'xs' | 'sm' | 'small' | 'default' | 'lg' | 'large';

export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active';

export type ProgressLineCap = 'round' | 'square' | 'butt';

export type ProgressGapPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ProgressSegment {
  color: string;
  percent: number;
}

export interface ProgressGradient {
  type: 'linear' | 'radial';
  direction?: string;
  colors: string[];
}

export interface ProgressAnimationConfig {
  duration: number;
  easing?: string;
  delay?: number;
}

export interface ProgressTheme {
  primaryColor: string;
  successColor: string;
  errorColor: string;
  warningColor: string;
  textColor: string;
  backgroundColor: string;
  borderRadius: number;
}

export interface ProgressEventHandlers {
  onChange?: (percent: number) => void;
  onComplete?: () => void;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

export interface ProgressProps {
  /** 进度条类型 */
  type?: ProgressType;
  /** 进度百分比 (0-100) */
  percent?: number;
  /** 进度条状态 */
  status?: ProgressStatus;
  /** 进度条尺寸 */
  size?: ProgressSize;
  /** 进度条宽度（仅线型有效） */
  strokeWidth?: number;
  /** 进度条线条颜色 */
  strokeColor?: string | ProgressGradient;
  /** 进度条轨道颜色 */
  trailColor?: string;
  /** 是否显示进度信息 */
  showInfo?: boolean;
  /** 进度信息格式化 */
  format?: (percent: number) => React.ReactNode;
  /** 进度条标题 */
  title?: React.ReactNode;
  /** 进度条描述 */
  description?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 仪表盘缺口角度（仅仪表盘有效） */
  gapDegree?: number;
  /** 仪表盘缺口位置（仅仪表盘有效） */
  gapPosition?: ProgressGapPosition;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否开启动画 */
  animated?: boolean;
  /** 线条端点样式 */
  strokeLinecap?: ProgressLineCap;
  /** 分段进度条数据 */
  segments?: ProgressSegment[];
  /** 成功进度百分比 */
  successPercent?: number;
  /** 动画配置 */
  animation?: ProgressAnimationConfig;
  /** 自定义主题 */
  theme?: Partial<ProgressTheme>;
  /** 事件处理函数 */
  events?: ProgressEventHandlers;
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 无障碍描述 */
  ariaDescribedby?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface ProgressRef {
  /** 获取当前进度 */
  getPercent: () => number;
  /** 设置进度 */
  setPercent: (percent: number) => void;
  /** 重置进度 */
  reset: () => void;
  /** 开始动画 */
  start: () => void;
  /** 暂停动画 */
  pause: () => void;
  /** 完成进度 */
  complete: () => void;
  /** 获取DOM元素 */
  getElement: () => HTMLElement | null;
  /** 获取当前状态 */
  getStatus: () => ProgressStatus;
  /** 设置状态 */
  setStatus: (status: ProgressStatus) => void;
  /** 是否正在动画中 */
  isAnimating: () => boolean;
}

export interface ProgressStyles {
  container: CSSProperties;
  lineContainer: CSSProperties;
  lineOuter: CSSProperties;
  lineInner: CSSProperties;
  circleContainer: CSSProperties;
  circleOuter: CSSProperties;
  circleInner: CSSProperties;
  dashboardOuter: CSSProperties;
  dashboardInner: CSSProperties;
  statusColors: Record<ProgressStatus, string>;
  sizes: Record<ProgressSize, CSSProperties>;
  progressInfo: CSSProperties;
  animation: CSSProperties;
}

export interface ProgressStyleProps {
  type?: ProgressType;
  status?: ProgressStatus;
  size?: ProgressSize;
  strokeWidth?: number;
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  animated?: boolean;
  percent?: number;
  gapDegree?: number;
  gapPosition?: ProgressGapPosition;
  strokeLinecap?: ProgressLineCap;
  theme?: Partial<ProgressTheme>;
}

export interface ProgressContextProps {
  theme: ProgressTheme;
  animated: boolean;
  animationDuration: number;
}

export type ProgressContext = React.Context<ProgressContextProps>;