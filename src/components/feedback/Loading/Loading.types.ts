import React from 'react';

export interface LoadingProps {
  /** 加载类型 */
  type?: 'spinner' | 'dots' | 'pulse' | 'bars';
  /** 尺寸 */
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  /** 颜色 */
  color?: string;
  /** 文本内容 */
  text?: string;
  /** 延迟显示时间 */
  delay?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface LoadingRef {
  /** 获取元素 */
  getElement: () => HTMLElement | null;
  /** 显示加载 */
  show: () => void;
  /** 隐藏加载 */
  hide: () => void;
}
