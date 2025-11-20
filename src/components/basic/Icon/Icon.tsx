import React, { forwardRef, useRef } from 'react';
import { View as TaroView, Text as TaroText, Image as TaroImage } from '@tarojs/components';
import type { IconProps, IconRef, IconSource } from './Icon.types';

/** 图标组件 */
export const IconComponent = forwardRef<IconRef, IconProps>((props, ref) => {
  const {
    source,
    size = 'md',
    color = 'currentColor',
    className,
    style,
    onClick,
    'data-testid': dataTestId,
  } = props;

  const iconRef = useRef<SVGElement | HTMLImageElement | HTMLSpanElement>(null);

  const getIconType = (source: IconSource): 'image' | 'svg' | 'font' | 'custom' => {
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

    return 'font';
  };

  const getSizeValue = (size: string | number): number => {
    if (typeof size === 'number') return size;

    const sizeMap: Record<string, number> = {
      'xs': 12,
      'sm': 16,
      'md': 20,
      'lg': 24,
      'xl': 32,
      'xxl': 48
    };

    return sizeMap[size] || 20;
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: getSizeValue(size),
    height: getSizeValue(size),
    color,
    ...style
  };

  const renderIcon = (): React.ReactNode => {
    const iconType = getIconType(source);

    switch (iconType) {
      case 'svg':
        if (typeof source === 'string') {
          return (
            <TaroView
              ref={iconRef as any}
              style={baseStyle}
              dangerouslySetInnerHTML={{ __html: source }}
              data-testid={dataTestId}
            />
          );
        }
        return null;

      case 'image':
        return (
          <TaroImage
            ref={iconRef as any}
            style={baseStyle}
            src={source as string}
            mode="aspectFit"
            data-testid={dataTestId}
          />
        );

      case 'font':
        return (
          <TaroText
            ref={iconRef as any}
            style={baseStyle}
            className={`${className || ''} ${source}`.trim()}
            data-testid={dataTestId}
          />
        );

      case 'custom':
        return (
          <TaroView
            ref={iconRef as any}
            style={baseStyle}
            className={className}
            data-testid={dataTestId}
          >
            {React.isValidElement(source) ? source : null}
          </TaroView>
        );

      default:
        return (
          <TaroText
            ref={iconRef as any}
            style={baseStyle}
            className={`${className || ''} ${source}`.trim()}
            data-testid={dataTestId}
          />
        );
    }
  };

  React.useImperativeHandle(ref, () => ({
    element: iconRef.current,
    click: () => {
      if (iconRef.current) {
        const event = new MouseEvent('click', { bubbles: true });
        iconRef.current.dispatchEvent(event);
      }
    },
    setDisabled: () => {},
    setLoading: () => {},
    getStatus: () => 'normal',
    getSize: () => size,
    getColor: () => color,
    rotate: () => {},
    setColor: () => {},
    setSize: () => {}
  }));

  return (
    <TaroView
      style={{ display: 'inline-flex' }}
      onClick={onClick}
    >
      {renderIcon()}
    </TaroView>
  );
});

IconComponent.displayName = 'Icon';

export const Icon = IconComponent;