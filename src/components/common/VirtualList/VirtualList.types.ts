import type { CSSProperties, ReactNode } from 'react';

/** VirtualList 组件 Props */
export interface VirtualListProps<T = unknown> {
  /** 数据源 */
  data: T[];
  /** 渲染函数 */
  renderItem: (item: T, index: number) => ReactNode;
  /** 项目高度（可以是数字或函数） */
  itemHeight: number | ((index: number) => number);
  /** 容器高度 */
  height: number | string;
  /** 容器宽度 */
  width?: number | string;
  /** 每个项目的key */
  itemKey: string | ((item: T, index: number) => string);
  /** 预渲染的额外项目数 */
  overscan?: number;
  /** 是否启用动态高度 */
  dynamicHeight?: boolean;
  /** 滚动到指定索引 */
  scrollToIndex?: number;
  /** 滚动行为 */
  scrollBehavior?: 'auto' | 'smooth';
  /** 空状态渲染 */
  empty?: ReactNode;
  /** 加载状态渲染 */
  loading?: ReactNode;
  /** 是否正在加载 */
  isLoading?: boolean;
  /** 是否到达底部 */
  onEndReached?: () => void;
  /** 距离底部多少像素触发onEndReached */
  onEndReachedThreshold?: number;
  /** 列表样式 */
  style?: CSSProperties;
  /** 列表类名 */
  className?: string;
  /** 项目样式 */
  itemStyle?: CSSProperties;
  /** 项目类名 */
  itemClassName?: string;
  /** 滚动事件回调 */
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
}

/** VirtualList 位置项 */
export interface VirtualListPositionItem {
  top: number;
  height: number;
  bottom: number;
  index: number;
  data: unknown;
}

/** VirtualList Ref */
export interface VirtualListRef {
  /** 滚动到指定索引 */
  scrollToIndex: (index: number, behavior?: 'auto' | 'smooth') => void;
  /** 滚动到顶部 */
  scrollToTop: (behavior?: 'auto' | 'smooth') => void;
  /** 滚动到底部 */
  scrollToBottom: (behavior?: 'auto' | 'smooth') => void;
  /** 获取当前滚动位置 */
  getScrollTop: () => number;
}
