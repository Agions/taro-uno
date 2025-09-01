import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { PlatformDetector } from '@/utils';
import { iconStyles } from './Icon.styles';
import type { IconProps, IconRef, IconSource, IconType } from './Icon.types';

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
    groupIndex,
    groupSize,
    loadingIcon,
    tooltip,
    tooltipPosition = 'top',
    ripple = false,
    filter = 'none',
    blendMode = 'normal',
    ...restProps
  } = props;

  const iconRef = useRef<SVGElement | HTMLImageElement | HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [internalStatus, setInternalStatus] = useState(status);
  const [internalLoading, setInternalLoading] = useState(loading);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [showTooltip, setShowTooltip] = useState(false);

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
        const icon = iconRef.current;
        if (icon) {
          const rect = icon.getBoundingClientRect();
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
          }, 600);
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
  const renderSVGIcon = (data: any) => {
    const svgStyle = iconStyles.getSVGStyle({ size, color, theme, style });
    const className = iconStyles.getClassName({
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
          className={className}
          style={svgStyle}
          dangerouslySetInnerHTML={{ __html: data }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      >
        {pathData && <path d={pathData} fill="currentColor" stroke="currentColor" />}
      </svg>
    );
  };

  // 渲染图片图标
  const renderImageIcon = (data: string) => {
    const imageStyle = iconStyles.getImageStyle({ size, style });
    const className = iconStyles.getClassName({
      size,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      className,
    });

    return (
      <Image
        ref={iconRef as any}
        className={className}
        style={imageStyle}
        src={data}
        mode="aspectFit"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      />
    );
  };

  // 渲染字体图标
  const renderFontIcon = (data: string) => {
    const fontStyle = iconStyles.getFontIconStyle({ size, color, style });
    const fontClassName = iconStyles.getClassName({
      size,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      className,
    });

    const iconClass = `${prefix}${data}${suffix}`.trim();

    return (
      <Text
        ref={iconRef as any}
        className={`${fontClassName} ${iconClass}`.trim()}
        style={fontStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      />
    );
  };

  // 渲染自定义图标
  const renderCustomIcon = (data: ReactNode) => {
    const customStyle = iconStyles.getStyle({
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
    const customClassName = iconStyles.getClassName({
      size,
      status: internalStatus,
      loading: internalLoading,
      disabled: internalDisabled,
      animated,
      className,
    });

    return (
      <View
        ref={iconRef as any}
        className={customClassName}
        style={customStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {data}
      </View>
    );
  };

  // 渲染加载图标
  const renderLoadingIcon = () => {
    if (loadingIcon) {
      return renderCustomIcon(loadingIcon);
    }

    const loadingStyle = iconStyles.getLoadingStyle(size);
    const loadingClassName = iconStyles.getClassName({ size, status: 'loading', loading: true, className });

    return <View ref={iconRef as any} className={loadingClassName} style={loadingStyle} />;
  };

  // 主渲染函数
  const renderIcon = () => {
    if (internalLoading) {
      return renderLoadingIcon();
    }

    const iconType = detectIconType(source);

    switch (iconType) {
      case 'svg':
        return renderSVGIcon(source);
      case 'image':
        return renderImageIcon(source as string);
      case 'font':
        return renderFontIcon(source as string);
      case 'custom':
        return renderCustomIcon(source);
      default:
        return renderFontIcon(String(source));
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
      },
      setLoading: (loading: boolean) => {
        setInternalLoading(loading);
      },
      getStatus: () => internalStatus,
      getSize: () => size,
      getColor: () => color,
      rotate: (angle: number) => {
        if (iconRef.current) {
          iconRef.current.style.transform = `rotate(${angle}deg)`;
        }
      },
      setColor: (newColor: string) => {
        if (iconRef.current) {
          iconRef.current.style.color = newColor;
        }
      },
      setSize: (newSize: IconSize | number) => {
        if (iconRef.current) {
          const calculatedSize = typeof newSize === 'string' ? iconStyles.SIZE_MAP[newSize] : newSize;
          iconRef.current.style.width = `${calculatedSize}px`;
          iconRef.current.style.height = `${calculatedSize}px`;
          if (iconRef.current.tagName === 'TEXT') {
            iconRef.current.style.fontSize = `${calculatedSize}px`;
          }
        }
      },
    }),
    [internalDisabled, internalLoading, internalStatus, size, color, clickable],
  );

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    busy: internalLoading,
    ...accessibilityState,
  };

  return (
    <View
      className="taro-uno-icon-wrapper"
      style={{ position: 'relative', display: 'inline-flex' }}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={finalAccessibilityState}
    >
      {renderIcon()}

      {/* 涟漪效果 */}
      {ripple &&
        ripples.map((ripple) => (
          <View
            key={ripple.id}
            className="taro-uno-icon__ripple"
            style={iconStyles.getRippleStyle(ripple.x, ripple.y, ripple.size)}
          />
        ))}

      {/* 工具提示 */}
      {tooltip && showTooltip && (
        <View className="taro-uno-icon__tooltip" style={iconStyles.getTooltipStyle(tooltipPosition)}>
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
