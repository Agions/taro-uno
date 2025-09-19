import type { CSSProperties, ReactNode } from 'react';

export interface BadgeProps {
  /** 显示的数字 */
  count?: number;
  /** 是否显示为小红点 */
  dot?: boolean;
  /** 封顶的数字值 */
  overflowCount?: number;
  /** 当数字为 0 时是否显示 */
  showZero?: boolean;
  /** 子节点 */
  children?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface BadgeRef {
  /** DOM 元素 */
  element: any;
  /** 获取当前计数 */
  getCount: () => number | undefined;
  /** 检查是否为点状 */
  isDot: () => boolean;
  /** 检查是否显示 */
  isVisible: () => boolean;
}