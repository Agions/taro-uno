import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { containerStyles } from './Container.styles';
import type { ContainerProps, ContainerRef, ContainerSize, ContainerAlign } from './Container.types';

/** Container组件 */
export const ContainerComponent = forwardRef<ContainerRef, ContainerProps>((props, ref) => {
  const {
    children,
    size = 'default',
    maxWidth,
    padding = 'medium',
    margin = 'medium',
    align = 'stretch',
    center = false,
    scrollable = false,
    scrollDirection = 'vertical',
    className,
    style,
    onClick,
    onScroll,
    responsive,
    ...restProps
  } = props;

  const containerRef = useRef<any>(null);
  const [internalSize, setInternalSize] = useState<ContainerSize>(size);
  const [internalAlign, setInternalAlign] = useState<ContainerAlign>(align);
  const [internalCenter, setInternalCenter] = useState(center);
  const [internalScrollable, setInternalScrollable] = useState(scrollable);
  const [internalScrollDirection, setInternalScrollDirection] = useState(scrollDirection);

  // 更新内部状态
  useEffect(() => {
    setInternalSize(size);
  }, [size]);

  useEffect(() => {
    setInternalAlign(align);
  }, [align]);

  useEffect(() => {
    setInternalCenter(center);
  }, [center]);

  useEffect(() => {
    setInternalScrollable(scrollable);
  }, [scrollable]);

  useEffect(() => {
    setInternalScrollDirection(scrollDirection);
  }, [scrollDirection]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  
  
  // 计算样式
  const containerStyle = containerStyles['getBaseStyle']({
    size: internalSize,
    maxWidth,
    padding,
    margin,
    align: internalAlign,
    center: internalCenter,
    scrollable: internalScrollable,
    scrollDirection: internalScrollDirection,
    style: style || {},
  });

  // 计算响应式样式
  const responsiveStyle = responsive ? containerStyles['getResponsiveStyle'](responsive) : {};

  // 计算类名
  const containerClassName = containerStyles['getClassName']({
    size: internalSize,
    align: internalAlign,
    center: internalCenter,
    scrollable: internalScrollable,
    className: className || '',
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: containerRef.current,
      getSize: () => internalSize,
      getAlign: () => internalAlign,
      getMaxWidth: () => maxWidth || containerStyles.SIZE_MAP[internalSize as keyof typeof containerStyles.SIZE_MAP],
      setSize: (newSize: ContainerSize) => {
        setInternalSize(newSize);
      },
      setAlign: (newAlign: ContainerAlign) => {
        setInternalAlign(newAlign);
      },
      setMaxWidth: (newMaxWidth: number | string) => {
        if (containerRef.current) {
          containerRef.current.style.maxWidth = typeof newMaxWidth === 'number' ? `${newMaxWidth}px` : newMaxWidth;
        }
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        containerRef.current?.scrollIntoView(options);
      },
    }),
    [internalSize, internalAlign, maxWidth],
  );

  return (
    <View
      ref={containerRef}
      className={containerClassName}
      style={{ ...containerStyle, ...responsiveStyle }}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </View>
  );
});

/** Container组件显示名称 */
ContainerComponent.displayName = 'Container';

/** 导出Container组件 */
export const Container = ContainerComponent;
