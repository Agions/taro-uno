/**
 * 虚拟滚动列表组件
 * 用于优化长列表渲染性能
 */

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useVirtualScroll, VirtualScrollItem, VirtualScrollOptions } from '@/hooks/useVirtualScroll';
import { Card, CardProps } from '@/components/display/Card';
import { Text } from '@/components/basic/Text';
import './VirtualList.styles.scss';

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

interface VirtualListItemProps {
  item: VirtualScrollItem;
  index: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  updateItemHeight: (index: number, height: number) => void;
  dynamicHeight: boolean;
}

const VirtualListItem: React.FC<VirtualListItemProps> = ({
  item,
  index,
  renderItem,
  updateItemHeight,
  dynamicHeight
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // 监听项目高度变化
  useEffect(() => {
    if (dynamicHeight && itemRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          if (height !== item.height) {
            updateItemHeight(index, height);
          }
        }
      });

      resizeObserver.observe(itemRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
    return undefined;
  }, [dynamicHeight, index, item.height, updateItemHeight]);

  return (
    <div
      ref={itemRef}
      className="virtual-list-item"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: `translateY(${(item as any).offset || 0}px)`,
        height: dynamicHeight ? 'auto' : `${item.height}px`,
      }}
    >
      {renderItem(item.data, index)}
    </div>
  );
};

export const VirtualList = <T extends any>({
  data,
  renderItem,
  height,
  itemHeight = 50,
  keyExtractor,
  dynamicHeight = false,
  overscanCount = 3,
  renderEmpty,
  renderLoading,
  renderError,
  onEndReached,
  onEndReachedThreshold = 100,
  onScroll,
  title,
  bordered = true,
  loadingMore = false,
  hasMore = true,
  className,
  ...props
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const endReachedTriggeredRef = useRef<boolean>(false);

  // 转换数据格式
  const virtualItems: VirtualScrollItem[] = useMemo(() => {
    return data.map((item, index) => ({
      id: keyExtractor ? keyExtractor(item, index) : index,
      height: itemHeight,
      data: item,
    }));
  }, [data, itemHeight, keyExtractor]);

  // 虚拟滚动配置
  const virtualOptions: VirtualScrollOptions = useMemo(() => ({
    containerHeight: height,
    itemHeight,
    overscanCount,
    scrollElement: containerRef.current,
    dynamicHeight,
    onScroll: handleScroll,
    onRender: handleRender,
  }), [height, itemHeight, overscanCount, dynamicHeight]);

  const {
    visibleItems,
    scrollTop,
    totalHeight,
    startIndex,
    endIndex,
    scrollToPosition,
    updateItemHeight,
  } = useVirtualScroll(virtualItems, virtualOptions);

  // 滚动处理
  const handleScroll = useCallback((scrollTop: number) => {
    onScroll?.(scrollTop);
    
    // 检查是否滚动到底部
    if (onEndReached && hasMore && !loadingMore) {
      const container = containerRef.current;
      if (container) {
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const scrollBottom = scrollHeight - clientHeight - scrollTop;
        
        if (scrollBottom <= onEndReachedThreshold && !endReachedTriggeredRef.current) {
          endReachedTriggeredRef.current = true;
          onEndReached();
          
          // 重置触发状态
          setTimeout(() => {
            endReachedTriggeredRef.current = false;
          }, 1000);
        }
      }
    }
    
    lastScrollTopRef.current = scrollTop;
  }, [onEndReached, hasMore, loadingMore, onEndReachedThreshold, onScroll]);

  // 渲染处理
  const handleRender = useCallback((_visibleItems: VirtualScrollItem[]) => {
    // 可以在这里添加渲染统计逻辑
  }, []);


  // 滚动到顶部
  const scrollToTop = useCallback(() => {
    scrollToPosition(0);
  }, [scrollToPosition]);

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      scrollToPosition(container.scrollHeight - container.clientHeight);
    }
  }, [scrollToPosition]);

  // 渲染空状态
  const renderEmptyState = () => {
    if (data.length === 0 && !loadingMore) {
      return (
        <div className="virtual-list-empty">
          {renderEmpty ? (
            renderEmpty()
          ) : (
            <div className="empty-content">
              <Text variant="body1" color="secondary">暂无数据</Text>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // 渲染加载状态
  const renderLoadingState = () => {
    if (loadingMore) {
      return (
        <div className="virtual-list-loading">
          {renderLoading ? (
            renderLoading()
          ) : (
            <div className="loading-content">
              <div className="loading-spinner" />
              <Text variant="body2" color="secondary">加载中...</Text>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // 渲染错误状态
  const renderErrorState = () => {
    // 这里可以根据实际需求实现错误状态渲染
    return null;
  };

  return (
    <Card
      title={title}
      bordered={bordered}
      className={`virtual-list ${className || ''}`}
      {...props}
    >
      <div
        ref={containerRef}
        className="virtual-list-container"
        style={{ height: `${height}px` }}
      >
        <div className="virtual-list-viewport" style={{ height: `${totalHeight}px` }}>
          {visibleItems.map((item, index) => (
            <VirtualListItem
              key={item.id}
              item={item}
              index={startIndex + index}
              renderItem={renderItem}
              updateItemHeight={updateItemHeight}
              dynamicHeight={dynamicHeight}
            />
          ))}
        </div>
        
        {renderEmptyState()}
        {renderLoadingState()}
        {renderErrorState()}
      </div>
      
      {/* 快速操作按钮 */}
      <div className="virtual-list-actions">
        <button
          className="action-button"
          onClick={scrollToTop}
          title="滚动到顶部"
        >
          ↑
        </button>
        <button
          className="action-button"
          onClick={scrollToBottom}
          title="滚动到底部"
          disabled={!hasMore}
        >
          ↓
        </button>
      </div>
      
      {/* 统计信息 */}
      <div className="virtual-list-stats">
        <Text variant="caption" color="secondary">
          显示 {startIndex + 1}-{endIndex + 1} 条，共 {data.length} 条
        </Text>
        {scrollTop > 0 && (
          <Text variant="caption" color="secondary">
            滚动位置: {scrollTop.toFixed(0)}px
          </Text>
        )}
      </div>
    </Card>
  );
};

export default VirtualList;