import { ReactNode } from 'react';
import { BaseComponentProps, Size, CSSUnit } from '../../../types';

/** Container组件尺寸 */
export type ContainerSize = Size | 'full' | 'fluid';

/** Container组件对齐方式 */
export type ContainerAlign = 'start' | 'center' | 'end' | 'stretch';

/** Container组件引用 */
export interface ContainerRef {
  /** 获取元素引用 */
  element: any;
  /** 获取当前尺寸 */
  getSize: () => ContainerSize;
  /** 获取当前对齐方式 */
  getAlign: () => ContainerAlign;
  /** 获取当前最大宽度 */
  getMaxWidth: () => number | string;
  /** 设置尺寸 */
  setSize: (_size: ContainerSize) => void;
  /** 设置对齐方式 */
  setAlign: (_align: ContainerAlign) => void;
  /** 设置最大宽度 */
  setMaxWidth: (_maxWidth: number | string) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Container组件属性 */
export interface ContainerProps extends BaseComponentProps {
  /** 子元素 */
  children?: ReactNode;
  /** 容器尺寸 */
  size?: ContainerSize;
  /** 最大宽度 */
  maxWidth?: number | string;
  /** 内边距 */
  padding?: Size | number | `${number}${CSSUnit}`;
  /** 外边距 */
  margin?: Size | number | `${number}${CSSUnit}`;
  /** 对齐方式 */
  align?: ContainerAlign;
  /** 是否居中 */
  center?: boolean;
  /** 是否可滚动 */
  scrollable?: boolean;
  /** 滚动方向 */
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  /** 点击事件 */
  onClick?: (_event: React.MouseEvent) => void;
  /** 滚动事件 */
  onScroll?: (_event: React.UIEvent) => void;
  /** 响应式断点 */
  responsive?: {
    xs?: Partial<ContainerProps>;
    sm?: Partial<ContainerProps>;
    md?: Partial<ContainerProps>;
    lg?: Partial<ContainerProps>;
    xl?: Partial<ContainerProps>;
    xxl?: Partial<ContainerProps>;
  };
}
