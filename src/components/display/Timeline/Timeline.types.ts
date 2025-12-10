import type { CSSProperties, ReactNode } from 'react';

export interface TimelineItemProps {
  /** 时间线项标题 */
  title?: ReactNode;
  /** 时间线项内容 */
  children?: ReactNode;
  /** 时间线项描述 */
  description?: ReactNode;
  /** 时间戳 */
  timestamp?: string;
  /** 节点颜色 */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  /** 自定义节点 */
  dot?: ReactNode;
  /** 节点位置 */
  position?: 'left' | 'right';
  /** 是否为最后一项 */
  isLast?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface TimelineProps {
  /** 时间线数据源 */
  items?: TimelineItemProps[];
  /** 时间线模式 */
  mode?: 'left' | 'right' | 'alternate';
  /** 是否反向显示 */
  reverse?: boolean;
  /** 是否显示时间戳 */
  showTimestamp?: boolean;
  /** 时间线方向 */
  direction?: 'vertical' | 'horizontal';
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 子节点 */
  children?: ReactNode;
}

export interface TimelineRef {
  /** DOM 元素 */
  element: any;
  /** 获取时间线模式 */
  getMode: () => 'left' | 'right' | 'alternate';
  /** 获取时间线方向 */
  getDirection: () => 'vertical' | 'horizontal';
  /** 检查是否反向 */
  isReverse: () => boolean;
  /** 获取项目数量 */
  getItemCount: () => number;
}
