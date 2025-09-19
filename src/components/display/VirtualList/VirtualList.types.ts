/**
 * 虚拟滚动列表组件类型定义
 */

import React from 'react';
import { CardProps } from '@/components/display/Card/Card.types';

export interface VirtualListProps<T = any> extends Omit<CardProps, 'title'> {
  /** 列表数据 */
  data: T[];
  /** 渲染函数 */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 列表高度 */
  height: number;
  /** 项目高度（固定高度） */
  itemHeight?: number;
  /** 键值提取函数 */
  keyExtractor?: (item: T, index: number) => string | number;
  /** 是否启用动态高度 */
  dynamicHeight?: boolean;
  /** 预渲染项目数量 */
  overscanCount?: number;
  /** 空状态渲染 */
  renderEmpty?: () => React.ReactNode;
  /** 加载状态渲染 */
  renderLoading?: () => React.ReactNode;
  /** 错误状态渲染 */
  renderError?: (error: Error) => React.ReactNode;
  /** 滚动到底部回调 */
  onEndReached?: () => void;
  /** 距离底部多少像素触发 */
  onEndReachedThreshold?: number;
  /** 滚动回调 */
  onScroll?: (scrollTop: number) => void;
  /** 标题 */
  title?: string;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示加载更多 */
  loadingMore?: boolean;
  /** 是否有更多数据 */
  hasMore?: boolean;
}

export interface VirtualListItemProps {
  item: {
    id: string | number;
    height: number;
    data: any;
    top: number;
  };
  index: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  updateItemHeight: (index: number, height: number) => void;
  dynamicHeight: boolean;
}

export interface VirtualListRef {
  /** 滚动到指定索引 */
  scrollToIndex: (index: number) => void;
  /** 滚动到指定位置 */
  scrollToPosition: (position: number) => void;
  /** 滚动到顶部 */
  scrollToTop: () => void;
  /** 滚动到底部 */
  scrollToBottom: () => void;
  /** 更新项目高度 */
  updateItemHeight: (index: number, height: number) => void;
  /** 重新计算布局 */
  recalculateLayout: () => void;
  /** 获取滚动位置 */
  getScrollPosition: () => number;
  /** 获取可见项目范围 */
  getVisibleRange: () => { startIndex: number; endIndex: number };
  /** 获取项目位置 */
  getItemPosition: (index: number) => { top: number; height: number };
}

export interface VirtualListState {
  /** 滚动位置 */
  scrollTop: number;
  /** 开始索引 */
  startIndex: number;
  /** 结束索引 */
  endIndex: number;
  /** 总高度 */
  totalHeight: number;
  /** 可见项目 */
  visibleItems: any[];
  /** 是否正在滚动 */
  isScrolling: boolean;
  /** 是否已滚动到底部 */
  isEndReached: boolean;
}

export interface VirtualListContextType {
  /** 列表状态 */
  state: VirtualListState;
  /** 配置 */
  config: {
    height: number;
    itemHeight: number;
    overscanCount: number;
    dynamicHeight: boolean;
    onEndReachedThreshold: number;
  };
  /** 操作方法 */
  actions: {
    scrollToIndex: (index: number) => void;
    scrollToPosition: (position: number) => void;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    updateItemHeight: (index: number, height: number) => void;
    recalculateLayout: () => void;
  };
}

export interface VirtualListPerformanceMetrics {
  /** 渲染时间 */
  renderTime: number;
  /** 滚动事件处理时间 */
  scrollHandlingTime: number;
  /** 重绘次数 */
  reRenderCount: number;
  /** 内存使用 */
  memoryUsage: number;
  /** 项目数量 */
  itemCount: number;
  /** 可见项目数量 */
  visibleItemCount: number;
}

export interface VirtualListOptions {
  /** 容器高度 */
  height: number;
  /** 项目高度 */
  itemHeight: number;
  /** 预渲染项目数量 */
  overscanCount: number;
  /** 是否启用动态高度 */
  dynamicHeight: boolean;
  /** 滚动节流时间 */
  scrollThrottle: number;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用调试模式 */
  debug: boolean;
}

export interface VirtualListEvent {
  /** 事件类型 */
  type: 'scroll' | 'render' | 'endReached' | 'error';
  /** 事件时间 */
  timestamp: number;
  /** 事件数据 */
  data?: any;
  /** 事件详情 */
  details?: Record<string, any>;
}

export interface VirtualListStyles {
  /** 容器样式 */
  container?: React.CSSProperties;
  /** 项目样式 */
  item?: React.CSSProperties;
  /** 空状态样式 */
  empty?: React.CSSProperties;
  /** 加载状态样式 */
  loading?: React.CSSProperties;
  /** 错误状态样式 */
  error?: React.CSSProperties;
  /** 滚动条样式 */
  scrollbar?: {
    track?: React.CSSProperties;
    thumb?: React.CSSProperties;
    corner?: React.CSSProperties;
  };
}

export interface VirtualListTheme {
  /** 背景颜色 */
  backgroundColor: string;
  /** 边框颜色 */
  borderColor: string;
  /** 文字颜色 */
  textColor: string;
  /** 悬停颜色 */
  hoverColor: string;
  /** 滚动条颜色 */
  scrollbarColor: {
    track: string;
    thumb: string;
    thumbHover: string;
  };
  /** 阴影 */
  shadow: string;
}

// 默认主题
export const defaultVirtualListTheme: VirtualListTheme = {
  backgroundColor: '#ffffff',
  borderColor: '#e5e7eb',
  textColor: '#374151',
  hoverColor: '#f9fafb',
  scrollbarColor: {
    track: '#f3f4f6',
    thumb: '#d1d5db',
    thumbHover: '#9ca3af',
  },
  shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

// 深色主题
export const darkVirtualListTheme: VirtualListTheme = {
  backgroundColor: '#1f2937',
  borderColor: '#374151',
  textColor: '#f9fafb',
  hoverColor: '#374151',
  scrollbarColor: {
    track: '#374151',
    thumb: '#6b7280',
    thumbHover: '#9ca3af',
  },
  shadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
};

export type VirtualListSize = 'small' | 'medium' | 'large';

export type VirtualListMode = 'default' | 'compact' | 'comfortable';

export interface VirtualListConfig {
  /** 尺寸 */
  size?: VirtualListSize;
  /** 模式 */
  mode?: VirtualListMode;
  /** 主题 */
  theme?: VirtualListTheme;
  /** 自定义样式 */
  styles?: VirtualListStyles;
  /** 是否启用动画 */
  enableAnimation?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否启用虚拟滚动 */
  enableVirtualScroll?: boolean;
  /** 最小虚拟滚动数量 */
  minVirtualScrollCount?: number;
}

// React 组件类型扩展
declare module 'react' {
  interface ForwardRefRenderFunction<T, P> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
  }
}

export default VirtualListProps;