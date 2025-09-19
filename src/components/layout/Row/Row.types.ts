import { ReactNode } from 'react';
import { BaseComponentProps, Size, CSSUnit } from '../../../types';

/** Row组件对齐方式 */
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

/** Row组件对齐方式 */
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

/** Row组件间距 */
export type RowGutter =
  | Size
  | number
  | `${number}${CSSUnit}`
  | [Size | number | `${number}${CSSUnit}`, Size | number | `${number}${CSSUnit}`];

/** Row组件引用 */
export interface RowRef {
  /** 获取元素引用 */
  element: any | null;
  /** 获取当前对齐方式 */
  getAlign: () => RowAlign;
  /** 获取当前对齐方式 */
  getJustify: () => RowJustify;
  /** 获取当前间距 */
  getGutter: () => RowGutter;
  /** 设置对齐方式 */
  setAlign: (align: RowAlign) => void;
  /** 设置对齐方式 */
  setJustify: (justify: RowJustify) => void;
  /** 设置间距 */
  setGutter: (gutter: RowGutter) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Row组件属性 */
export interface RowProps extends BaseComponentProps {
  /** 子元素 */
  children?: ReactNode;
  /** 间距 */
  gutter?: RowGutter;
  /** 垂直对齐方式 */
  align?: RowAlign;
  /** 水平对齐方式 */
  justify?: RowJustify;
  /** 是否换行 */
  wrap?: boolean;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  /** 响应式断点 */
  responsive?: {
    xs?: Partial<RowProps>;
    sm?: Partial<RowProps>;
    md?: Partial<RowProps>;
    lg?: Partial<RowProps>;
    xl?: Partial<RowProps>;
    xxl?: Partial<RowProps>;
  };
}
