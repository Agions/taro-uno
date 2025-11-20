/**
 * 虚拟列表组件
 * 提供高性能的大数据量列表渲染
 */

import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
  ReactNode,
  CSSProperties,
} from 'react';

export interface VirtualListProps<T = any> {
  /**
   * 数据源
   */
  data: T[];

  /**
   * 渲染函数
   */
  renderItem: (item: T, index: number) => ReactNode;

  /**
   * 项目高度（可以是数字或函数）
   */
  itemHeight: number | ((index: number) => number);

  /**
   * 容器高度
   */
  height: number | string;

  /**
   * 容器宽度
   */
  width?: number | string;

  /**
   * 每个项目的key
   */
  itemKey: string | ((item: T, index: number) => string);

  /**
   * 预渲染的额外项目数
   */
  overscan?: number;

  /**
   * 是否启用动态高度
   */
  dynamicHeight?: boolean;

  /**
   * 滚动到指定索引
   */
  scrollToIndex?: number;

  /**
   * 滚动行为
   */
  scrollBehavior?: 'auto' | 'smooth';

  /**
   * 空状态渲染
   */
  empty?: ReactNode;

  /**
   * 加载状态渲染
   */
  loading?: ReactNode;

  /**
   * 是否正在加载
   */
  isLoading?: boolean;

  /**
   * 是否到达底部
   */
  onEndReached?: () => void;

  /**
   * 距离底部多少像素触发onEndReached
   */
  onEndReachedThreshold?: number;

  /**
   * 列表样式
   */
  style?: CSSProperties;

  /**
   * 列表类名
   */
  className?: string;

  /**
   * 项目样式
   */
  itemStyle?: CSSProperties;

  /**
   * 项目类名
   */
  itemClassName?: string;

  /**
   * 滚动事件回调
   */
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
}

interface PositionItem {
  top: number;
  height: number;
  bottom: number;
  index: number;
  data: any;
}

export const VirtualList = React.forwardRef<HTMLDivElement, VirtualListProps<any>>(
  (props, ref) => {
    const {
      data,
      renderItem,
      itemHeight,
      height,
      width = '100%',
      itemKey,
      overscan = 3,
      dynamicHeight = false,
      scrollToIndex,
      scrollBehavior = 'auto',
      empty,
      loading,
      isLoading = false,
      onEndReached,
      onEndReachedThreshold = 200,
      style,
      className,
      
      itemClassName,
      onScroll,
    } = props;

    const [scrollTop, setScrollTop] = useState(0);
    
    const [positions, setPositions] = useState<PositionItem[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 计算位置信息
    const calculatePositions = useCallback(() => {
      if (!dynamicHeight && typeof itemHeight === 'number') {
        return data.map((item, index) => ({
          top: index * itemHeight,
          height: itemHeight,
          bottom: (index + 1) * itemHeight,
          index,
          data: item,
        }));
      }

      // 动态高度计算
      const newPositions: PositionItem[] = [];
      let top = 0;

      data.forEach((item, index) => {
        const height = typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
        newPositions.push({
          top,
          height,
          bottom: top + height,
          index,
          data: item,
        });
        top += height;
      });

      return newPositions;
    }, [data, itemHeight, dynamicHeight]);

    // 初始化位置
    useEffect(() => {
      setPositions(calculatePositions());
    }, [calculatePositions]);

    

    // 计算可见范围
    const visibleRange = useMemo(() => {
      if (!positions.length) return { start: 0, end: 0 };

      const containerHeight = typeof height === 'number' ? height : containerRef.current?.clientHeight || 0;
      const startIndex = positions.findIndex(item => item.bottom > scrollTop);
      const endIndex = positions.findIndex(item => item.top > scrollTop + containerHeight);

      return {
        start: Math.max(0, startIndex - overscan),
        end: Math.min(positions.length - 1, endIndex + overscan),
      };
    }, [scrollTop, positions, height, overscan]);

    // 总高度
    const totalHeight = useMemo(() => {
      if (!positions.length) return 0;
      const lastItem = positions[positions.length - 1];
      return lastItem ? lastItem.bottom : 0;
    }, [positions]);

    // 处理滚动
    const handleScroll = useCallback(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const newScrollTop = container.scrollTop;
      const newScrollLeft = container.scrollLeft;

      setScrollTop(newScrollTop);
      

      // 清除之前的超时
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 设置新的超时
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 150);

      // 触发滚动回调
      onScroll?.(newScrollTop, newScrollLeft);

      // 检查是否到达底部
      if (onEndReached) {
        const containerHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        const isNearBottom = scrollHeight - (newScrollTop + containerHeight) < onEndReachedThreshold;

        if (isNearBottom && !isLoading) {
          onEndReached();
        }
      }
    }, [onEndReached, onEndReachedThreshold, isLoading, onScroll]);

    // 滚动到指定索引
    useEffect(() => {
      if (scrollToIndex !== undefined && containerRef.current) {
        const position = positions[scrollToIndex];
        if (position) {
          containerRef.current.scrollTo({
            top: position.top,
            behavior: scrollBehavior,
          });
        }
      }
    }, [scrollToIndex, positions, scrollBehavior]);

    // 清理超时
    useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // 渲染项目
    const renderItems = useCallback(() => {
      if (!positions.length) return null;

      const items: ReactNode[] = [];
      const { start, end } = visibleRange;

      for (let i = start; i <= end; i++) {
        const position = positions[i];
        if (!position) continue;

        const key = typeof itemKey === 'function' ? itemKey(position.data, i) : position.data[itemKey];
        const itemStyle: CSSProperties = {
          position: 'absolute',
          top: position.top,
          left: 0,
          width: '100%',
          height: position.height,
          ...props.itemStyle,
        };

        items.push(
          <div
            key={key}
            className={itemClassName}
            style={itemStyle}
            data-index={i}
          >
            {renderItem(position.data, i)}
          </div>
        );
      }

      return items;
    }, [positions, visibleRange, itemKey, renderItem, itemClassName, props.itemStyle]);

    // 渲染内容
    const renderContent = () => {
      if (isLoading && data.length === 0) {
        return loading || <div className="flex items-center justify-center h-full">加载中...</div>;
      }

      if (!isLoading && data.length === 0) {
        return empty || <div className="flex items-center justify-center h-full">暂无数据</div>;
      }

      return (
        <>
          {renderItems()}
          {isLoading && data.length > 0 && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </>
      );
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          containerRef.current = node;
        }}
        className={`relative overflow-auto ${className || ''}`}
        style={{
          height,
          width,
          ...style,
        }}
        onScroll={handleScroll}
      >
        <div
          ref={contentRef}
          style={{
            height: totalHeight,
            position: 'relative',
          }}
        >
          {renderContent()}
        </div>
      </div>
    );
  }
);

VirtualList.displayName = 'VirtualList';

export default VirtualList;
