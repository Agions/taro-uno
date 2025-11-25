import { ReactNode } from 'react';
import { BaseComponentProps } from '../../../types';
import type { RowGutter } from '../Row/Row.types';

/** Col组件跨度 */
export type ColSpan = number | `${number}`;

/** Col组件偏移量 */
export type ColOffset = number | `${number}`;

/** Col组件排序 */
export type ColOrder = number | `${number}`;

/** Col组件引用 */
export interface ColRef {
  /** 获取元素引用 */
  element: any;
  /** 获取当前跨度 */
  getSpan: () => ColSpan;
  /** 获取当前偏移量 */
  getOffset: () => ColOffset;
  /** 获取当前排序 */
  getOrder: () => ColOrder;
  /** 设置跨度 */
  setSpan: (_span: ColSpan) => void;
  /** 设置偏移量 */
  setOffset: (_offset: ColOffset) => void;
  /** 设置排序 */
  setOrder: (_order: ColOrder) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Col组件属性 */
export interface ColProps extends BaseComponentProps {
  /** 子元素 */
  children?: ReactNode;
  /** 跨度 (1-24) */
  span?: ColSpan;
  /** 偏移量 */
  offset?: ColOffset;
  /** 排序 */
  order?: ColOrder;
  /** 从父组件Row继承的间距 */
  gutter?: RowGutter;
  /** 柔性布局 */
  flex?: number | string | 'auto' | 'none';
  /** 点击事件 */
  onClick?: (_event: React.MouseEvent) => void;
  /** 响应式断点 */
  responsive?: {
    xs?: Partial<ColProps>;
    sm?: Partial<ColProps>;
    md?: Partial<ColProps>;
    lg?: Partial<ColProps>;
    xl?: Partial<ColProps>;
    xxl?: Partial<ColProps>;
  };
}
