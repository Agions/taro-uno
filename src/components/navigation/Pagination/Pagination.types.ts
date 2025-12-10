import { ReactNode } from 'react';
// import { View } from '@tarojs/components'; // Commented out - unused
import { BaseComponentProps as StandardBaseComponentProps } from '../../../types/component-props';
import { Size } from '../../../types';

/** 分页尺寸 */
export type PaginationSize = Size | 'small' | 'medium' | 'large';

/** 分页位置 */
export type PaginationPosition = 'top' | 'bottom' | 'both';

/** 分页对齐方式 */
export type PaginationAlign = 'left' | 'center' | 'right';

/** 分页引用 */
export interface PaginationRef {
  /** 获取元素引用 */
  element: any | null;
  /** 获取当前页码 */
  getCurrent: () => number;
  /** 获取每页条数 */
  getPageSize: () => number;
  /** 获取总页数 */
  getTotalPages: () => number;
  /** 获取总条数 */
  getTotal: () => number;
  /** 设置当前页码 */
  setCurrent: (_current: number) => void;
  /** 设置每页条数 */
  setPageSize: (_pageSize: number) => void;
  /** 跳转到指定页 */
  goTo: (_page: number) => void;
  /** 上一页 */
  prev: () => void;
  /** 下一页 */
  next: () => void;
  /** 第一页 */
  first: () => void;
  /** 最后一页 */
  last: () => void;
}

/** 分页组件属性 */
export interface PaginationProps extends StandardBaseComponentProps {
  /** 当前页码 */
  current?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 总条数 */
  total: number;
  /** 分页尺寸 */
  size?: PaginationSize;
  /** 是否显示总数 */
  showTotal?: boolean | ((_total: number, range: [number, number]) => ReactNode);
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示页码选择器 */
  showSizeChanger?: boolean;
  /** 页码选择器选项 */
  pageSizeOptions?: number[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否简单模式 */
  simple?: boolean;
  /** 是否显示更多按钮 */
  showMore?: boolean;
  /** 页码显示范围 */
  showLessItems?: boolean;
  /** 分页位置 */
  position?: PaginationPosition;
  /** 分页对齐方式 */
  align?: PaginationAlign;
  /** 自定义页码渲染 */
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: ReactNode,
  ) => ReactNode;
  /** 页码改变事件 */
  onChange?: (_page: number, pageSize: number) => void;
  /** 每页条数改变事件 */
  onShowSizeChange?: (_current: number, size: number) => void;
}
