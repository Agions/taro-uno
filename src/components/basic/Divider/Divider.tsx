import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { dividerStyles } from './Divider.styles';
import type { DividerProps, DividerRef, ITouchEvent } from './Divider.types';

/** 分割线组件 */
export const DividerComponent = forwardRef<DividerRef, DividerProps>((props, ref) => {
  const {
    orientation = 'horizontal',
    type = 'solid',
    position = 'center',
    size = 'md',
    color = 'border',
    variant = 'default',
    children,
    inset = false,
    centered = false,
    className,
    style,
    width,
    height,
    margin,
    padding,
    opacity = 1,
    borderRadius = 0,
    gradient,
    animated = false,
    animationDuration = 300,
    shadow = false,
    clickable = false,
    onClick,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'separator',
    spacing,
    align = 'center',
    verticalAlign = 'middle',
    icon,
    iconPosition = 'center',
    textStyle,
    textSpacing = 16,
    textBackground = '#ffffff',
    textPadding = '0 16px',
    textBorderRadius = 4,
    responsive = false,
    breakpoint = 'md',
    ...restProps
  } = props;

  const dividerRef = useRef<HTMLDivElement>(null);
  const [internalVariant, setInternalVariant] = useState(variant);

  // 更新内部变体状态
  useEffect(() => {
    if (children) {
      setInternalVariant('text');
    } else if (icon) {
      setInternalVariant('with-icon');
    } else {
      setInternalVariant(variant);
    }
  }, [children, icon, variant]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (!clickable) return;
      onClick?.(event);
    },
    [onClick, clickable],
  );

  // 渲染文本内容
  const renderText = () => {
    if (!children) return null;

    const textStyles = {
      padding: typeof textPadding === 'number' ? `${textPadding}px` : textPadding,
      backgroundColor: textBackground,
      borderRadius: typeof textBorderRadius === 'number' ? `${textBorderRadius}px` : textBorderRadius,
      margin:
        orientation === 'horizontal'
          ? `0 ${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing}`
          : `${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing} 0`,
      ...textStyle,
    };

    return (
      <View className="taro-uno-divider__text" style={textStyles}>
        {children}
      </View>
    );
  };

  // 渲染图标内容
  const renderIcon = () => {
    if (!icon) return null;

    const iconStyles = {
      margin:
        iconPosition === 'center'
          ? `0 ${typeof spacing === 'number' ? `${spacing}px` : spacing}`
          : iconPosition === 'start'
          ? `0 ${typeof spacing === 'number' ? `${spacing}px` : spacing} 0 0`
          : `0 0 0 ${typeof spacing === 'number' ? `${spacing}px` : spacing}`,
    };

    return (
      <View className="taro-uno-divider__icon" style={iconStyles}>
        {icon}
      </View>
    );
  };

  // 计算分割线样式
  const dividerStyle = dividerStyles.getStyle({
    orientation,
    type,
    size,
    color,
    position,
    width: width || undefined,
    height: height || undefined,
    margin: margin || undefined,
    padding: padding || undefined,
    opacity: opacity || undefined,
    borderRadius: borderRadius || undefined,
    gradient: gradient || undefined,
    animated: animated || undefined,
    animationDuration: animationDuration || undefined,
    spacing: spacing || undefined,
    align: align || undefined,
    verticalAlign: verticalAlign || undefined,
    style: style || {},
  });

  // 计算文本分割线样式
  const textDividerStyle = dividerStyles.getTextDividerStyle({
    children,
    orientation,
    textSpacing: textSpacing ?? undefined,
    textBackground: textBackground ?? undefined,
    textPadding: textPadding ?? undefined,
    textBorderRadius: textBorderRadius ?? undefined,
    textStyle: textStyle || {},
  });

  // 计算图标分割线样式
  const iconDividerStyle = dividerStyles.getIconDividerStyle({
    icon,
    iconPosition,
    iconSpacing: spacing ?? undefined,
  });

  // 计算响应式样式
  const responsiveStyle = responsive
    ? dividerStyles.getResponsiveStyle({
        breakpoint,
        orientation,
      })
    : {};

  // 计算最终类名
  const dividerClassName = dividerStyles.getClassName({
    orientation,
    type,
    position,
    size,
    color,
    variant: internalVariant,
    inset: inset || undefined,
    centered: centered || undefined,
    animated: animated || undefined,
    shadow: shadow || undefined,
    clickable: clickable || undefined,
    responsive: responsive || undefined,
    className: className || undefined,
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: dividerRef.current,
      getOrientation: () => orientation,
      getType: () => type,
      getPosition: () => position,
      getSize: () => size,
      getColor: () => {
        if (typeof color === 'string') {
          return color;
        }
        return dividerStyles.COLOR_MAP[color] || '';
      },
      setOrientation: (newOrientation: typeof orientation) => {
        if (dividerRef.current) {
          dividerRef.current.setAttribute('data-orientation', newOrientation);
        }
      },
      setType: (newType: typeof type) => {
        if (dividerRef.current) {
          dividerRef.current.setAttribute('data-type', newType);
        }
      },
      setPosition: (newPosition: typeof position) => {
        if (dividerRef.current) {
          dividerRef.current.setAttribute('data-position', newPosition);
        }
      },
      setSize: (newSize: typeof size) => {
        if (dividerRef.current) {
          const sizeStyles = dividerStyles.SIZE_MAP[newSize];
          dividerRef.current.style.width = orientation === 'horizontal' ? `${sizeStyles.width}%` : 'auto';
          dividerRef.current.style.height = orientation === 'vertical' ? `${sizeStyles.height}px` : 'auto';
        }
      },
      setColor: (newColor: string) => {
        if (dividerRef.current) {
          dividerRef.current.style.borderColor = newColor;
        }
      },
      scrollIntoView: (options?: ScrollIntoViewOptions) => {
        dividerRef.current?.scrollIntoView(options);
      },
    }),
    [orientation, type, position, size, color],
  );

  // 渲染分割线
  const renderDivider = () => {
    if (internalVariant === 'text') {
      return (
        <View
          ref={dividerRef as any}
          className={`${dividerClassName} taro-uno-divider--text`}
          style={{ ...dividerStyle, ...textDividerStyle, ...responsiveStyle }}
          onClick={handleClick}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          {...restProps}
        >
          {renderText()}
        </View>
      );
    }

    if (internalVariant === 'with-icon') {
      return (
        <View
          ref={dividerRef as any}
          className={`${dividerClassName} taro-uno-divider--with-icon`}
          style={{ ...dividerStyle, ...iconDividerStyle, ...responsiveStyle }}
          onClick={handleClick}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          {...restProps}
        >
          {renderIcon()}
        </View>
      );
    }

    return (
      <View
        ref={dividerRef as any}
        className={dividerClassName}
        style={{ ...dividerStyle, ...responsiveStyle }}
        onClick={handleClick}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        {...restProps}
      />
    );
  };

  return renderDivider();
});

/** 分割线组件显示名称 */
DividerComponent.displayName = 'Divider';

/** 导出分割线组件 */
export const Divider = DividerComponent;
