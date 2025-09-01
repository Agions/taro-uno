import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { spaceStyles } from './Space.styles';
import type { SpaceProps, SpaceRef, SpaceDirection, SpaceAlign, SpaceWrap, SpaceSize, SpaceGap } from './Space.types';

/** Space组件 */
export const SpaceComponent = forwardRef<SpaceRef, SpaceProps>((props, ref) => {
  const {
    children,
    direction = 'horizontal',
    align = 'center',
    wrap = 'nowrap',
    size = 'default',
    gap,
    block = false,
    separator,
    compact = false,
    split = false,
    maxCount,
    ellipsis,
    className,
    style,
    onClick,
    onItemHover,
    onItemClick,
    responsive,
    ...restProps
  } = props;

  const spaceRef = useRef<View>(null);
  const [internalDirection, setInternalDirection] = useState<SpaceDirection>(direction);
  const [internalAlign, setInternalAlign] = useState<SpaceAlign>(align);
  const [internalWrap, setInternalWrap] = useState<SpaceWrap>(wrap);
  const [internalSize, setInternalSize] = useState<SpaceSize>(size);
  const [internalGap, setInternalGap] = useState<SpaceGap>(gap || size);
  const [visibleItems, setVisibleItems] = useState<number>(maxCount || Infinity);

  // 更新内部状态
  useEffect(() => {
    setInternalDirection(direction);
  }, [direction]);

  useEffect(() => {
    setInternalAlign(align);
  }, [align]);

  useEffect(() => {
    setInternalWrap(wrap);
  }, [wrap]);

  useEffect(() => {
    setInternalSize(size);
  }, [size]);

  useEffect(() => {
    setInternalGap(gap || size);
  }, [gap, size]);

  useEffect(() => {
    if (maxCount) {
      setVisibleItems(maxCount);
    }
  }, [maxCount]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 处理子元素点击事件
  const handleItemClick = useCallback(
    (index: number, event: React.MouseEvent) => {
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
    const visibleChildren = childrenArray.slice(0, visibleItems);
    const hiddenChildren = childrenArray.slice(visibleItems);

    return visibleChildren.map((child, index) => {
      const isLast = index === visibleChildren.length - 1;
      const showSeparator = separator && !isLast && !compact;

      return (
        <React.Fragment key={index}>
          <View
            className="taro-uno-space__item"
            style={spaceStyles.getItemStyle(index, visibleChildren.length, split)}
            onClick={(e) => handleItemClick(index, e)}
            onMouseEnter={(e) => handleItemHover(index, e)}
            onMouseLeave={(e) => handleItemHover(index, e)}
          >
            {child}
          </View>
          {showSeparator && (
            <View className="taro-uno-space__separator" style={spaceStyles.getSeparatorStyle()}>
              {separator === true ? '|' : separator}
            </View>
          )}
        </React.Fragment>
      );
    });
  };

  // 渲染省略内容
  const renderEllipsis = () => {
    if (!ellipsis || visibleItems >= React.Children.count(children)) return null;

    return (
      <View className="taro-uno-space__ellipsis" style={spaceStyles.getEllipsisStyle()}>
        {ellipsis}
      </View>
    );
  };

  // 计算样式
  const spaceStyle = spaceStyles.getBaseStyle({
    direction: internalDirection,
    align: internalAlign,
    wrap: internalWrap,
    size: internalSize,
    gap: internalGap,
    block,
    compact,
    split,
    maxCount,
    style: style || {},
  });

  // 计算响应式样式
  const responsiveStyle = responsive ? spaceStyles.getResponsiveStyle(responsive) : {};

  // 计算类名
  const spaceClassName = spaceStyles.getClassName({
    direction: internalDirection,
    align: internalAlign,
    wrap: internalWrap,
    size: internalSize,
    block,
    compact,
    split,
    className: className || '',
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: spaceRef.current,
      getDirection: () => internalDirection,
      getAlign: () => internalAlign,
      getWrap: () => internalWrap,
      getGap: () => internalGap,
      getSize: () => internalSize,
      setDirection: (newDirection: SpaceDirection) => {
        setInternalDirection(newDirection);
      },
      setAlign: (newAlign: SpaceAlign) => {
        setInternalAlign(newAlign);
      },
      setWrap: (newWrap: SpaceWrap) => {
        setInternalWrap(newWrap);
      },
      setGap: (newGap: SpaceGap) => {
        setInternalGap(newGap);
      },
      setSize: (newSize: SpaceSize) => {
        setInternalSize(newSize);
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        spaceRef.current?.scrollIntoView(options);
      },
    }),
    [internalDirection, internalAlign, internalWrap, internalGap, internalSize],
  );

  return (
    <View
      ref={spaceRef}
      className={spaceClassName}
      style={{ ...spaceStyle, ...responsiveStyle }}
      onClick={handleClick}
      {...restProps}
    >
      {renderChildren()}
      {renderEllipsis()}
    </View>
  );
});

/** Space组件显示名称 */
SpaceComponent.displayName = 'Space';

/** 导出Space组件 */
export const Space = SpaceComponent;
