/**
 * 虚拟滚动 Hook
 * 用于优化长列表渲染性能
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface VirtualScrollItem {
  id: string | number;
  height: number;
  data: any;
}

export interface VirtualScrollOptions {
  // 容器高度
  containerHeight: number;
  // 项目高度（固定高度）
  itemHeight?: number;
  // 预渲染的项目数量
  overscanCount?: number;
  // 容器滚动元素
  scrollElement?: HTMLElement | null;
  // 是否启用动态高度
  dynamicHeight?: boolean;
  // 缓冲区大小
  bufferSize?: number;
  // 初始滚动位置
  initialScrollTop?: number;
  // 滚动回调
  onScroll?: (scrollTop: number) => void;
  // 渲染回调
  onRender?: (visibleItems: VirtualScrollItem[]) => void;
}

export interface VirtualScrollResult {
  // 可见项目
  visibleItems: VirtualScrollItem[];
  // 滚动位置
  scrollTop: number;
  // 总高度
  totalHeight: number;
  // 开始索引
  startIndex: number;
  // 结束索引
  endIndex: number;
  // 滚动到指定位置
  scrollToIndex: (index: number) => void;
  // 滚动到指定位置
  scrollToPosition: (position: number) => void;
  // 更新项目高度
  updateItemHeight: (index: number, height: number) => void;
  // 获取项目位置
  getItemPosition: (index: number) => { top: number; height: number };
  // 重新计算布局
  recalculateLayout: () => void;
}

const defaultOptions: Required<VirtualScrollOptions> = {
  containerHeight: 400,
  itemHeight: 50,
  overscanCount: 3,
  scrollElement: null,
  dynamicHeight: false,
  bufferSize: 5,
  initialScrollTop: 0,
  onScroll: () => {},
  onRender: () => {},
};

/**
 * 虚拟滚动 Hook
 * @param options 虚拟滚动选项
 * @returns 虚拟滚动结果
 */
export function useVirtualScroll(items: VirtualScrollItem[], options: VirtualScrollOptions): VirtualScrollResult {
  const config = { ...defaultOptions, ...options };

  const [scrollTop, setScrollTop] = useState(config.initialScrollTop);
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({});
  const containerRef = useRef<HTMLElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算总高度
  const totalHeight = useMemo(() => {
    if (config.dynamicHeight) {
      return Object.values(itemHeights).reduce((sum, height) => sum + height, 0);
    }
    return items.length * config.itemHeight;
  }, [items.length, config.itemHeight, config.dynamicHeight, itemHeights]);

  // 计算可见项目范围
  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    if (config.dynamicHeight) {
      return calculateDynamicRange(items, itemHeights, scrollTop, config);
    }
    return calculateFixedRange(items, config.itemHeight, scrollTop, config);
  }, [items, scrollTop, config, itemHeights]);

  // 固定高度范围计算
  const calculateFixedRange = (
    items: VirtualScrollItem[],
    itemHeight: number,
    scrollTop: number,
    config: Required<VirtualScrollOptions>,
  ) => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - config.overscanCount);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + config.containerHeight) / itemHeight) + config.overscanCount,
    );

    const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      height: itemHeight,
      data: item.data,
    }));

    return { startIndex, endIndex, visibleItems };
  };

  // 动态高度范围计算
  const calculateDynamicRange = (
    items: VirtualScrollItem[],
    itemHeights: Record<number, number>,
    scrollTop: number,
    config: Required<VirtualScrollOptions>,
  ) => {
    let startIndex = 0;
    let endIndex = items.length - 1;
    let currentTop = 0;

    // 找到起始位置
    for (let i = 0; i < items.length; i++) {
      const height = itemHeights[i] || config.itemHeight;
      if (currentTop + height > scrollTop) {
        startIndex = Math.max(0, i - config.overscanCount);
        break;
      }
      currentTop += height;
    }

    // 找到结束位置
    let visibleHeight = 0;
    for (let i = startIndex; i < items.length; i++) {
      const height = itemHeights[i] || config.itemHeight;
      visibleHeight += height;

      if (visibleHeight > config.containerHeight + config.overscanCount * config.itemHeight) {
        endIndex = Math.min(items.length - 1, i + config.overscanCount);
        break;
      }
    }

    const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      height: itemHeights[startIndex + index] || config.itemHeight,
      data: item.data,
    }));

    return { startIndex, endIndex, visibleItems };
  };

  // 获取项目位置
  const getItemPosition = useCallback(
    (index: number) => {
      if (config.dynamicHeight) {
        let top = 0;
        for (let i = 0; i < index; i++) {
          top += itemHeights[i] || config.itemHeight;
        }
        return {
          top,
          height: itemHeights[index] || config.itemHeight,
        };
      }
      return {
        top: index * config.itemHeight,
        height: config.itemHeight,
      };
    },
    [config.itemHeight, config.dynamicHeight, itemHeights],
  );

  // 滚动到指定索引
  const scrollToIndex = useCallback(
    (index: number) => {
      const position = getItemPosition(index);
      const container = config.scrollElement || containerRef.current;
      if (container) {
        container.scrollTop = position.top;
        setScrollTop(position.top);
      }
    },
    [config.scrollElement, getItemPosition],
  );

  // 滚动到指定位置
  const scrollToPosition = useCallback(
    (position: number) => {
      const container = config.scrollElement || containerRef.current;
      if (container) {
        container.scrollTop = position;
        setScrollTop(position);
      }
    },
    [config.scrollElement],
  );

  // 更新项目高度
  const updateItemHeight = useCallback(
    (index: number, height: number) => {
      if (!config.dynamicHeight) return;

      setItemHeights((prev) => ({
        ...prev,
        [index]: height,
      }));
    },
    [config.dynamicHeight],
  );

  // 重新计算布局
  const recalculateLayout = useCallback(() => {
    // 触发重新渲染
    setScrollTop((prev) => prev);
  }, []);

  // 处理滚动事件
  const handleScroll = useCallback(
    (event: Event) => {
      const target = event.target as HTMLElement;
      const currentScrollTop = target.scrollTop;
      const currentTime = performance.now();

      // 防抖处理
      if (currentTime - lastScrollTimeRef.current > 16) {
        // 60fps
        setScrollTop(currentScrollTop);
        config.onScroll(currentScrollTop);
        lastScrollTimeRef.current = currentTime;
      }

      // 设置滚动状态
      isScrollingRef.current = true;

      // 清除之前的超时
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 设置新的超时
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    },
    [config],
  );

  // 设置滚动监听
  useEffect(() => {
    const container = config.scrollElement || containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [config.scrollElement, handleScroll]);

  // 初始化高度数据
  useEffect(() => {
    if (config.dynamicHeight) {
      const heights: Record<number, number> = {};
      items.forEach((item, index) => {
        heights[index] = item.height || config.itemHeight;
      });
      setItemHeights(heights);
    }
  }, [items, config.dynamicHeight, config.itemHeight]);

  // 设置 ResizeObserver 监听容器大小变化
  useEffect(() => {
    if (!config.dynamicHeight) return;

    const container = config.scrollElement || containerRef.current;
    if (!container) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          recalculateLayout();
        }
      }
    });

    resizeObserverRef.current.observe(container);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [config.dynamicHeight, config.scrollElement, recalculateLayout]);

  // 渲染回调
  useEffect(() => {
    config.onRender(visibleItems);
  }, [visibleItems, config]);

  return {
    visibleItems,
    scrollTop,
    totalHeight,
    startIndex,
    endIndex,
    scrollToIndex,
    scrollToPosition,
    updateItemHeight,
    getItemPosition,
    recalculateLayout,
  };
}

export default useVirtualScroll;
