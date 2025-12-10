import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { rowStyles } from './Row.styles';
import type { RowProps, RowRef, RowAlign, RowJustify, RowGutter } from './Row.types';

/** Row组件 */
export const RowComponent = forwardRef<RowRef, RowProps>((props, ref) => {
  const { children, gutter = 0, align = 'top', justify = 'start', wrap = true, className, style, onClick } = props;

  const rowRef = useRef<any>(null);
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
    (event: any) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 计算样式
  const rowStyle = rowStyles['getBaseStyle']({
    gutter: internalGutter,
    align: internalAlign,
    justify: internalJustify,
    wrap: internalWrap,
    style: style || {},
  });

  // 计算类名
  const rowClassName = rowStyles['getClassName']({
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
        // Try to access DOM element if available
        const element = rowRef.current;
        if (element && typeof element.scrollIntoView === 'function') {
          element.scrollIntoView(options);
        } else if (element && element.$el) {
          // Handle Taro component ref
          element.$el?.scrollIntoView?.(options);
        }
      },
    }),
    [internalAlign, internalJustify, internalGutter],
  );

  // 渲染子元素，为每个Col组件传递gutter属性
  const renderedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && (child.type as any)?.displayName === 'Col') {
      return React.cloneElement(child, {
        key: index,
        gutter: internalGutter,
      } as any);
    }
    return child;
  });

  return (
    <View ref={rowRef} className={rowClassName} style={{ ...rowStyle, ...style }} onClick={handleClick}>
      {renderedChildren}
    </View>
  );
});

/** Row组件显示名称 */
RowComponent.displayName = 'Row';

/** 导出Row组件 */
export const Row = RowComponent;
