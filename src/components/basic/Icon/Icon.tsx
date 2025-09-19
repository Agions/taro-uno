import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View as TaroView, Text as TaroText, Image as TaroImage } from '@tarojs/components';
import { AccessibilityUtils } from '../../../types/accessibility.d';
import { iconStyles } from './Icon.styles';
import type { IconProps, IconRef, IconSource, IconType, IconSize } from './Icon.types';
import type { ReactNode } from '../../../types/accessibility.d';

// 扩展的 View 组件包装器
const View = forwardRef<any, any>((props, ref) => {
  const { children, ...restProps } = props;
  // 过滤掉无障碍属性，避免类型错误
  const filteredProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => !key.startsWith('accessibility'))
  );
  return <TaroView ref={ref} {...filteredProps}>{children}</TaroView>;
});

// 扩展的 Text 组件包装器
const Text = forwardRef<any, any>((props, ref) => {
  const { children, ...restProps } = props;
  // 过滤掉无障碍属性，避免类型错误
  const filteredProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => !key.startsWith('accessibility'))
  );
  return <TaroText ref={ref} {...filteredProps}>{children}</TaroText>;
});

// 扩展的 Image 组件包装器
const Image = forwardRef<any, any>((props, ref) => {
  // 过滤掉无障碍属性，避免类型错误
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !key.startsWith('accessibility'))
  );
  return <TaroImage ref={ref} {...(filteredProps as any)} />;
});

/** 图标组件 */
export const IconComponent = forwardRef<IconRef, IconProps>((props, ref) => {
  const {
    source,
    type,
    size = 'md',
    color = 'currentColor',
    rotate = 0,
    status = 'normal',
    theme = 'outlined',
    clickable = false,
    loading = false,
    disabled = false,
    className,
    onClick,
    style,
    prefix = '',
    suffix = '',
    animated = false,
    animationDuration = 300,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'img',
    accessibilityState,
    accessibilityHint,
    accessibilityValue,
    accessibilityId,
    accessibilityActions,
    accessibilityLiveRegion,
    accessibilityImportant,
    accessibilityViewIsModal,
    accessibilityElementsHidden,
    groupIndex,
    groupSize,
    loadingIcon,
    tooltip,
    tooltipPosition = 'top',
    ripple = false,
    filter = 'none',
    blendMode = 'normal',
    'data-testid': dataTestId,
    ...restProps
  } = props;

  const iconRef = useRef<SVGElement | HTMLImageElement | HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [internalStatus, setInternalStatus] = useState(status);
  const [internalLoading, setInternalLoading] = useState(loading);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [showTooltip, setShowTooltip] = useState(false);

  // 计算最终的无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    busy: internalLoading,
    ...accessibilityState,
  };

  // 涟漪效果计数器
  const rippleId = useRef(0);

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(status);
  }, [status]);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 检测图标类型
  const detectIconType = useCallback(
    (source: IconSource): IconType => {
      if (type) return type;

      if (typeof source === 'string') {
        if (source.startsWith('http') || source.startsWith('data:image')) {
          return 'image';
        }
        if (source.includes('<svg') || source.endsWith('.svg')) {
          return 'svg';
        }
        return 'font';
      }

      if (React.isValidElement(source)) {
        return 'custom';
      }

      if (typeof source === 'object' && source !== null) {
        return 'svg';
      }

      return 'font';
    },
    [type],
  );

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (internalDisabled || internalLoading || !clickable) return;

      // 创建涟漪效果
      if (ripple) {
        const wrapper = event.currentTarget;
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const size = Math.max(rect.width, rect.height);

          const newRipple = {
            id: rippleId.current++,
            x,
            y,
            size,
          };

          setRipples((prev) => [...prev, newRipple]);

          // 移除涟漪效果
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
          }, 500);
        }
      }

      onClick?.(event);
    },
    [onClick, ripple, internalDisabled, internalLoading, clickable],
  );

  // 处理鼠标悬停事件
  const handleMouseEnter = useCallback(() => {
    if (tooltip) {
      setShowTooltip(true);
    }
  }, [tooltip]);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // 渲染SVG图标
  const renderSVGIcon = (data: any, dataTestId?: string) => {
    const svgStyle = iconStyles['getSVGStyle']({ size, color, theme, style });
    const svgClassName = iconStyles['getClassName']({
      size,
      status: internalStatus,
      theme,
      loading: internalLoading,
      disabled: internalDisabled,
      className,
    });

    if (typeof data === 'string') {
      // 如果是SVG字符串，直接渲染
      return (
        <View
          ref={iconRef as any}
          className={svgClassName}
          style={svgStyle}
          dangerouslySetInnerHTML={{ __html: data }}
          data-testid={dataTestId}
        />
      );
    }

    // 如果是SVG对象数据
    const { viewBox = '0 0 24 24', path, paths, d } = data;
    const pathData = d || path || (paths ? paths.join(' ') : '');

    return (
      <svg
        ref={iconRef as any}
        className={className}
        style={svgStyle}
        viewBox={viewBox}
        data-testid={dataTestId}
        {...restProps}
      >
        {pathData && <path d={pathData} fill="currentColor" stroke="currentColor" />}
      </svg>
    );
  };

  // 渲染图片图标
  const renderImageIcon = (data: string, dataTestId?: string) => {
    const imageStyle = iconStyles['getImageStyle']({ size, style });
    const imageClassName = iconStyles['getClassName']({
      size,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      className,
    });

    return (
      <Image
        ref={iconRef as any}
        className={imageClassName}
        style={imageStyle}
        src={data}
        mode="aspectFit"
        data-testid={dataTestId}
        {...(restProps as any)}
      />
    );
  };

  // 渲染字体图标
  const renderFontIcon = (data: string, dataTestId?: string) => {
    const fontStyle = iconStyles['getStyle']({
      size,
      color,
      rotate,
      status: internalStatus,
      animated,
      animationDuration,
      style,
    });
    const fontClassName = iconStyles['getClassName']({
      size,
      status: internalStatus,
      theme,
      loading: internalLoading,
      disabled: internalDisabled,
      clickable,
      animated,
      className,
    });

    const iconClass = `${prefix}${data}${suffix}`.trim();

    // 构建无障碍属性
    const accessibilityProps = {
      'aria-label': accessibilityLabel,
      'aria-disabled': internalDisabled ? 'true' : 'false',
      'aria-busy': internalLoading ? 'true' : 'false',
      role: accessibilityRole,
    };

    return (
      <Text
        ref={iconRef as any}
        className={`${fontClassName} ${iconClass}`.trim()}
        style={fontStyle}
        data-testid={dataTestId}
        {...accessibilityProps}
        {...restProps}
      />
    );
  };

  // 渲染自定义图标
  const renderCustomIcon = (data: IconSource, dataTestId?: string) => {
    const customStyle = iconStyles['getStyle']({
      size,
      color,
      rotate,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      animated,
      animationDuration,
      filter,
      blendMode,
      style,
    });
    const customClassName = iconStyles['getClassName']({
      size,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      animated,
      className,
    });

    // 构建无障碍属性
    const accessibilityProps = {
      'aria-label': accessibilityLabel,
      'aria-disabled': internalDisabled ? 'true' : 'false',
      'aria-busy': internalLoading ? 'true' : 'false',
      role: accessibilityRole,
    };

    return (
      <View
        ref={iconRef as any}
        className={customClassName}
        style={customStyle}
        data-testid={dataTestId}
        {...accessibilityProps}
      >
        {data as ReactNode}
      </View>
    );
  };

  // 渲染加载图标
  const renderLoadingIcon = (dataTestId?: string) => {
    if (loadingIcon) {
      return renderCustomIcon(loadingIcon, dataTestId);
    }

    const loadingStyle = iconStyles['getLoadingStyle'](size);
    const loadingClassName = iconStyles['getClassName']({ size, status: 'loading', loading: true, className });

    // 构建无障碍属性
    const accessibilityProps = {
      'aria-label': accessibilityLabel || 'Loading',
      'aria-disabled': 'true',
      'aria-busy': 'true',
      role: accessibilityRole,
    };

    return (
      <View ref={iconRef as any} className={loadingClassName} style={loadingStyle} data-testid={dataTestId} {...accessibilityProps}>
        <View className="taro-uno-icon__icon" style={{ fontSize: loadingStyle.fontSize }}>⏳</View>
      </View>
    );
  };

  // 主渲染函数
  const renderIcon = (dataTestId?: string) => {
    if (internalLoading) {
      return renderLoadingIcon(dataTestId);
    }

    const iconType = detectIconType(source);

    switch (iconType) {
      case 'svg':
        return renderSVGIcon(source, dataTestId);
      case 'image':
        return renderImageIcon(source as string, dataTestId);
      case 'font':
        return renderFontIcon(source as string, dataTestId);
      case 'custom':
        return renderCustomIcon(source, dataTestId);
      default:
        return renderFontIcon(String(source), dataTestId);
    }
  };

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: iconRef.current,
      click: () => {
        if (iconRef.current && !internalDisabled && !internalLoading && clickable) {
          const event = new MouseEvent('click', { bubbles: true });
          iconRef.current.dispatchEvent(event);
        }
      },
      setDisabled: (disabled: boolean) => {
        setInternalDisabled(disabled);
        setInternalStatus(disabled ? 'disabled' : 'normal');
        // Update accessibility attributes
        if (iconRef.current) {
          iconRef.current.setAttribute('aria-disabled', disabled ? 'true' : 'false');
        }
      },
      setLoading: (loading: boolean) => {
        setInternalLoading(loading);
        setInternalStatus(loading ? 'loading' : 'normal');
        // Update accessibility attributes
        if (iconRef.current) {
          iconRef.current.setAttribute('aria-busy', loading ? 'true' : 'false');
          iconRef.current.setAttribute('aria-disabled', loading ? 'true' : 'false');
        }
      },
      getStatus: () => internalStatus,
      getSize: () => size,
      getColor: () => color,
      rotate: (angle: number) => {
        // Store rotation angle in a data attribute for testing
        if (iconRef.current) {
          iconRef.current.setAttribute('data-rotation', angle.toString());
          const style = iconRef.current.style;
          style.transform = `rotate(${angle}deg)`;
          style.webkitTransform = `rotate(${angle}deg)`;
          // @ts-ignore - for older browsers
          style.msTransform = `rotate(${angle}deg)`;
        }
      },
      setColor: (newColor: string) => {
        // Store color in a data attribute for testing
        if (iconRef.current) {
          iconRef.current.setAttribute('data-color', newColor);
          const element = iconRef.current;
          element.style.color = newColor;
          const children = element.querySelectorAll('*');
          children.forEach(child => {
            (child as HTMLElement).style.color = newColor;
          });
        }
      },
      setSize: (newSize: IconSize | number) => {
        // Store size in a data attribute for testing
        if (iconRef.current) {
          const calculatedSize = typeof newSize === 'string' ? iconStyles.SIZE_MAP[newSize] : newSize;
          iconRef.current.setAttribute('data-size', calculatedSize.toString());
          const element = iconRef.current;
          element.style.width = `${calculatedSize}px`;
          element.style.height = `${calculatedSize}px`;
          if (element.tagName === 'TEXT' || element.tagName === 'SPAN') {
            element.style.fontSize = `${calculatedSize}px`;
          }
          const children = element.querySelectorAll('*');
          children.forEach(child => {
            const childElement = child as HTMLElement;
            childElement.style.width = `${calculatedSize}px`;
            childElement.style.height = `${calculatedSize}px`;
            if (childElement.tagName === 'TEXT' || childElement.tagName === 'SPAN') {
              childElement.style.fontSize = `${calculatedSize}px`;
            }
          });
        }
      },
    }),
    [internalDisabled, internalLoading, internalStatus, size, color, clickable],
  );

  
  // 验证无障碍属性
  const accessibilityValidation = AccessibilityUtils.validateAccessibilityProps({
    accessible,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState: finalAccessibilityState,
    accessibilityHint,
    accessibilityValue,
    accessibilityId,
    accessibilityActions,
    accessibilityLiveRegion,
    accessibilityImportant,
    accessibilityViewIsModal,
    accessibilityElementsHidden,
  });

  // 开发环境下输出验证结果
  if (process.env['NODE_ENV'] === 'development' && !accessibilityValidation.valid) {
    console.warn('Icon 组件无障碍属性验证失败:', accessibilityValidation.errors);
  }

  return (
    <View
      className="taro-uno-icon-wrapper"
      style={{ position: 'relative', display: 'inline-flex' }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      {renderIcon(dataTestId)}

      {/* 涟漪效果 */}
      {ripple &&
        ripples.map((ripple) => (
          <View
            key={ripple.id}
            className="taro-uno-icon__ripple"
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              transform: 'scale(0)',
              animation: 'ripple 0.6s linear',
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}

      {/* 工具提示 */}
      {tooltip && showTooltip && (
        <View className="taro-uno-icon__tooltip" style={iconStyles['getTooltipStyle'](tooltipPosition)}>
          {tooltip}
        </View>
      )}
    </View>
  );
});

/** 图标组件显示名称 */
IconComponent.displayName = 'Icon';

/** 导出图标组件 */
export const Icon = IconComponent;
