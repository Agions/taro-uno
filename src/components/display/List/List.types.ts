import React from 'react';

export interface ListProps {
  /** 列表内容 */
  children?: React.ReactNode;
  /** 数据源 */
  dataSource?: Array<{
    key?: string | number;
    [key: string]: any;
  }>;
  /** 渲染函数 */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** 列表头部 */
  header?: React.ReactNode;
  /** 列表底部 */
  footer?: React.ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示分割线 */
  split?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 列表尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface ListItemProps {
  /** 列表项内容 */
  children: React.ReactNode;
  /** 索引 */
  index?: number;
  /** 列表项尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 是否显示分割线 */
  split?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onPress?: (event: any) => void;
  /** 长按事件 */
  onLongPress?: (event: any) => void;
}

export interface ListRef {
  /** 获取列表项 */
  getItem: (index: number) => HTMLElement | null;
  /** 滚动到指定项 */
  scrollToItem: (index: number) => void;
  /** 获取列表项数量 */
  getItemCount: () => number;
}

export interface ListItemRef {
  /** 获取列表项元素 */
  getElement: () => HTMLElement | null;
  /** 获取索引 */
  getIndex: () => number;
}
