import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { colStyles } from './Col.styles';
import type { ColProps, ColRef, ColSpan, ColOffset, ColOrder } from './Col.types';

/** Col组件 */
export const ColComponent = forwardRef<ColRef, ColProps>((props, ref) => {
  const {
    children,
    span = 24,
    offset = 0,
    order = 0,
    gutter = 0,
    flex,
    className,
    style,
    onClick,
    responsive,
    ...restProps
  } = props;

  const colRef = useRef<View>(null);
  const [internalSpan, setInternalSpan] = useState<ColSpan>(span);
  const [internalOffset, setInternalOffset] = useState<ColOffset>(offset);
  const [internalOrder, setInternalOrder] = useState<ColOrder>(order);
  const [internalFlex, setInternalFlex] = useState(flex);

  // 更新内部状态
  useEffect(() => {
    setInternalSpan(span);
  }, [span]);

  useEffect(() => {
    setInternalOffset(offset);
  }, [offset]);

  useEffect(() => {
    setInternalOrder(order);
  }, [order]);

  useEffect(() => {
    setInternalFlex(flex);
  }, [flex]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 计算样式
  const colStyle = colStyles.getBaseStyle({
    span: internalSpan,
    offset: internalOffset,
    order: internalOrder,
    gutter,
    flex: internalFlex,
    style: style || {},
  });

  // 计算响应式样式
  const responsiveStyle = responsive ? colStyles.getResponsiveStyle(responsive) : {};

  // 计算类名
  const colClassName = colStyles.getClassName({
    span: internalSpan,
    offset: internalOffset,
    flex: internalFlex,
    className: className || '',
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: colRef.current,
      getSpan: () => internalSpan,
      getOffset: () => internalOffset,
      getOrder: () => internalOrder,
      setSpan: (newSpan: ColSpan) => {
        setInternalSpan(newSpan);
      },
      setOffset: (newOffset: ColOffset) => {
        setInternalOffset(newOffset);
      },
      setOrder: (newOrder: ColOrder) => {
        setInternalOrder(newOrder);
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        colRef.current?.scrollIntoView(options);
      },
    }),
    [internalSpan, internalOffset, internalOrder],
  );

  return (
    <View
      ref={colRef}
      className={colClassName}
      style={{ ...colStyle, ...responsiveStyle }}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </View>
  );
});

/** Col组件显示名称 */
ColComponent.displayName = 'Col';

/** 导出Col组件 */
export const Col = ColComponent;
