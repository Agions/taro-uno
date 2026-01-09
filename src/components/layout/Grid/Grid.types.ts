import { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { BaseProps } from '../../../types/component';
import { Size, CSSUnit } from '../../../types';

/** Grid组件对齐方式 */
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

/** Grid组件对齐方式 */
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/** Grid组件间距 */
export type GridGap =
  | Size
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | number
  | `${number}${CSSUnit}`
  | [Size | 'default' | 'small' | 'medium' | 'large' | number | `${number}${CSSUnit}`, Size | 'default' | 'small' | 'medium' | 'large' | number | `${number}${CSSUnit}`];

/** Grid组件列数 */
export type GridCols = string | number | `${number}`;

/** Grid组件引用 */
export interface GridRef {
  /** 获取元素引用 */
  element: any;
  /** 获取当前列数 */
  getCols: () => GridCols;
  /** 获取当前对齐方式 */
  getAlign: () => GridAlign;
  /** 获取当前对齐方式 */
  getJustify: () => GridJustify;
  /** 获取当前间距 */
  getGap: () => GridGap;
  /** 设置列数 */
  setCols: (_cols: GridCols) => void;
  /** 设置对齐方式 */
  setAlign: (_align: GridAlign) => void;
  /** 设置对齐方式 */
  setJustify: (_justify: GridJustify) => void;
  /** 设置间距 */
  setGap: (_gap: GridGap) => void;
  /** 滚动到视图 */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/** Grid组件属性 */
export interface GridProps extends BaseProps {
  /** 子元素 */
  children?: ReactNode;
  /** 列数 */
  cols?: GridCols;
  /** 行数 */
  rows?: number | undefined;
  /** 间距 */
  gap?: GridGap;
  /** 垂直间距 */
  rowGap?: Size | number | `${number}${CSSUnit}` | undefined;
  /** 水平间距 */
  columnGap?: Size | number | `${number}${CSSUnit}` | undefined;
  /** 对齐方式 */
  align?: GridAlign;
  /** 对齐方式 */
  justify?: GridJustify;
  /** 点击事件 */
  onClick?: (_event: ITouchEvent) => void;
  /** 子元素悬停事件 */
  onItemHover?: (_index: number, event: ITouchEvent) => void;
  /** 子元素点击事件 */
  onItemClick?: (_index: number, event: ITouchEvent) => void;
  /** 响应式断点 */
  responsive?: {
    xs?: Partial<GridProps>;
    sm?: Partial<GridProps>;
    md?: Partial<GridProps>;
    lg?: Partial<GridProps>;
    xl?: Partial<GridProps>;
    xxl?: Partial<GridProps>;
  };
}
