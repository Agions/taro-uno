import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { gridStyles } from './Grid.styles';
import type { GridProps, GridRef, GridAlign, GridJustify, GridGap, GridCols } from './Grid.types';

/** Grid组件 */
export const GridComponent = forwardRef<GridRef, GridProps>((props, ref) => {
  const {
    children,
    cols = 1,
    rows,
    gap = 'default',
    rowGap,
    columnGap,
    align = 'stretch',
    justify = 'start',
    className,
    style,
    onClick,
    onItemHover,
    onItemClick,
    responsive,
    ...restProps
  } = props;

  const gridRef = useRef<any>(null);
  const [internalCols, setInternalCols] = useState<GridCols>(cols);
  const [internalAlign, setInternalAlign] = useState<GridAlign>(align);
  const [internalJustify, setInternalJustify] = useState<GridJustify>(justify);
  const [internalGap, setInternalGap] = useState<GridGap>(gap);
  const [internalRowGap, setInternalRowGap] = useState(rowGap);
  const [internalColumnGap, setInternalColumnGap] = useState(columnGap);

  // 更新内部状态
  useEffect(() => {
    setInternalCols(cols);
  }, [cols]);

  useEffect(() => {
    setInternalAlign(align);
  }, [align]);

  useEffect(() => {
    setInternalJustify(justify);
  }, [justify]);

  useEffect(() => {
    setInternalGap(gap);
  }, [gap]);

  useEffect(() => {
    setInternalRowGap(rowGap);
  }, [rowGap]);

  useEffect(() => {
    setInternalColumnGap(columnGap);
  }, [columnGap]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 处理子元素点击事件
  const handleItemClick = useCallback(
    (index: number, event: ITouchEvent) => {
      onItemClick?.(index, event);
    },
    [onItemClick],
  );

  // 处理子元素悬停事件
  const handleItemHover = useCallback(
    (index: number, event: React.MouseEvent) => {
      onItemHover?.(index, event);
    },
    [onItemHover],
  );

  
  // 渲染子元素
  const renderChildren = () => {
    if (!children) return null;

    const childrenArray = React.Children.toArray(children);

    return childrenArray.map((child, index) => (
      <View
        key={index}
        className="taro-uno-grid__item"
        style={gridStyles['getItemStyle'](index, childrenArray.length, internalCols)}
        onClick={(e: ITouchEvent) => handleItemClick(index, e)}
        onMouseEnter={(e: React.MouseEvent) => handleItemHover(index, e)}
        onMouseLeave={(e: React.MouseEvent) => handleItemHover(index, e)}
      >
        {child}
      </View>
    ));
  };

  // 计算样式
  const gridStyle = gridStyles['getBaseStyle']({
    cols: internalCols,
    rows,
    gap: internalGap,
    rowGap: internalRowGap,
    columnGap: internalColumnGap,
    align: internalAlign,
    justify: internalJustify,
    style: style || {},
  });

  // 计算响应式样式
  const responsiveStyle = responsive ? gridStyles['getResponsiveStyle'](responsive) : {};

  // 计算类名
  const gridClassName = gridStyles['getClassName']({
    cols: internalCols,
    align: internalAlign,
    justify: internalJustify,
    gap: internalGap,
    className: className || '',
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: gridRef.current,
      getCols: () => internalCols,
      getAlign: () => internalAlign,
      getJustify: () => internalJustify,
      getGap: () => internalGap,
      setCols: (newCols: GridCols) => {
        setInternalCols(newCols);
      },
      setAlign: (newAlign: GridAlign) => {
        setInternalAlign(newAlign);
      },
      setJustify: (newJustify: GridJustify) => {
        setInternalJustify(newJustify);
      },
      setGap: (newGap: GridGap) => {
        setInternalGap(newGap);
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        gridRef.current?.scrollIntoView(options);
      },
    }),
    [internalCols, internalAlign, internalJustify, internalGap],
  );

  return (
    <View
      ref={gridRef}
      className={gridClassName}
      style={{ ...gridStyle, ...responsiveStyle }}
      onClick={handleClick}
      {...restProps}
    >
      {renderChildren()}
    </View>
  );
});

/** Grid组件显示名称 */
GridComponent.displayName = 'Grid';

/** 导出Grid组件 */
export const Grid = GridComponent;
