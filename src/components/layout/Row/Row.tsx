import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { rowStyles } from './Row.styles';
import type { RowProps, RowRef, RowAlign, RowJustify, RowGutter } from './Row.types';

/** Row组件 */
export const RowComponent = forwardRef<RowRef, RowProps>((props, ref) => {
  const {
    children,
    gutter = 0,
    align = 'top',
    justify = 'start',
    wrap = true,
    className,
    style,
    onClick,
    responsive,
    ...restProps
  } = props;

  const rowRef = useRef<View>(null);
  const [internalAlign, setInternalAlign] = useState<RowAlign>(align);
  const [internalJustify, setInternalJustify] = useState<RowJustify>(justify);
  const [internalGutter, setInternalGutter] = useState<RowGutter>(gutter);
  const [internalWrap, setInternalWrap] = useState(wrap);

  // 更新内部状态
  useEffect(() => {
    setInternalAlign(align);
  }, [align]);

  useEffect(() => {
    setInternalJustify(justify);
  }, [justify]);

  useEffect(() => {
    setInternalGutter(gutter);
  }, [gutter]);

  useEffect(() => {
    setInternalWrap(wrap);
  }, [wrap]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 渲染子元素
  const renderChildren = () => {
    if (!children) return null;

    const childrenArray = React.Children.toArray(children);

    return childrenArray.map((child, index) => {
      // 为每个Col组件传递gutter属性
      if (React.isValidElement(child) && child.type?.displayName === 'Col') {
        return React.cloneElement(child, {
          key: index,
          gutter: internalGutter,
        } as any);
      }

      return child;
    });
  };

  // 计算样式
  const rowStyle = rowStyles.getBaseStyle({
    gutter: internalGutter,
    align: internalAlign,
    justify: internalJustify,
    wrap: internalWrap,
    style: style || {},
  });

  // 计算响应式样式
  const responsiveStyle = responsive ? rowStyles.getResponsiveStyle(responsive) : {};

  // 计算类名
  const rowClassName = rowStyles.getClassName({
    align: internalAlign,
    justify: internalJustify,
    wrap: internalWrap,
    className: className || '',
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: rowRef.current,
      getAlign: () => internalAlign,
      getJustify: () => internalJustify,
      getGutter: () => internalGutter,
      setAlign: (newAlign: RowAlign) => {
        setInternalAlign(newAlign);
      },
      setJustify: (newJustify: RowJustify) => {
        setInternalJustify(newJustify);
      },
      setGutter: (newGutter: RowGutter) => {
        setInternalGutter(newGutter);
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        rowRef.current?.scrollIntoView(options);
      },
    }),
    [internalAlign, internalJustify, internalGutter],
  );

  return (
    <View
      ref={rowRef}
      className={rowClassName}
      style={{ ...rowStyle, ...responsiveStyle }}
      onClick={handleClick}
      {...restProps}
    >
      {renderChildren()}
    </View>
  );
});

/** Row组件显示名称 */
RowComponent.displayName = 'Row';

/** 导出Row组件 */
export const Row = RowComponent;
