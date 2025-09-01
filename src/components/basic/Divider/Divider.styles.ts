import { PlatformDetector } from '@/utils';
import type { ReactNode } from 'react';
import type { DividerProps, DividerOrientation, DividerType, DividerSize, DividerColor } from './Divider.types';

/** 样式工具类 */
export class DividerStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-divider`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<DividerSize, { width: number; height: number; margin: number }> = {
    xs: { width: 100, height: 1, margin: 8 },
    sm: { width: 100, height: 1, margin: 12 },
    md: { width: 100, height: 1, margin: 16 },
    lg: { width: 100, height: 2, margin: 20 },
    xl: { width: 100, height: 2, margin: 24 },
  };

  /** 颜色映射 */
  static readonly COLOR_MAP: Record<DividerColor, string> = {
    primary: '#0ea5e9',
    secondary: '#6b7280',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    light: '#f3f4f6',
    dark: '#1f2937',
    border: '#e5e7eb',
  };

  /** 类型样式映射 */
  static readonly TYPE_STYLES: Record<DividerType, { borderStyle: string }> = {
    solid: { borderStyle: 'solid' },
    dashed: { borderStyle: 'dashed' },
    dotted: { borderStyle: 'dotted' },
    double: { borderStyle: 'double' },
    groove: { borderStyle: 'groove' },
    ridge: { borderStyle: 'ridge' },
    inset: { borderStyle: 'inset' },
    outset: { borderStyle: 'outset' },
  };

  /** 位置映射 */
  static readonly POSITION_MAP: Record<string, { justifyContent: string; alignItems: string }> = {
    left: { justifyContent: 'flex-start', alignItems: 'center' },
    center: { justifyContent: 'center', alignItems: 'center' },
    right: { justifyContent: 'flex-end', alignItems: 'center' },
  };

  /** 生成分割线类名 */
  static getClassName(props: Partial<DividerProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      orientation = 'horizontal',
      type = 'solid',
      position = 'center',
      size = 'md',
      color = 'border',
      variant = 'default',
      inset = false,
      centered = false,
      animated = false,
      shadow = false,
      clickable = false,
      responsive = false,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${orientation}`,
      `${prefix}--${type}`,
      `${prefix}--${position}`,
      `${prefix}--${size}`,
      `${prefix}--${color}`,
      `${prefix}--${variant}`,
      inset && `${prefix}--inset`,
      centered && `${prefix}--centered`,
      animated && `${prefix}--animated`,
      shadow && `${prefix}--shadow`,
      clickable && `${prefix}--clickable`,
      responsive && `${prefix}--responsive`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成分割线样式 */
  static getStyle(props: Partial<DividerProps>): React.CSSProperties {
    const {
      orientation = 'horizontal',
      type = 'solid',
      size = 'md',
      color = 'border',
      position = 'center',
      width,
      height,
      margin,
      padding,
      opacity = 1,
      borderRadius = 0,
      gradient,
      animated = false,
      animationDuration = 300,
      spacing,
      align = 'center',
      verticalAlign = 'middle',
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const colorStyles = this.COLOR_MAP[color];
    const typeStyles = this.TYPE_STYLES[type];
    const positionStyles = this.POSITION_MAP[position];

    // 计算尺寸
    const calculatedWidth = width ?? (orientation === 'horizontal' ? sizeStyles.width : 'auto');
    const calculatedHeight = height ?? (orientation === 'vertical' ? sizeStyles.height : 'auto');
    const calculatedMargin = margin ?? sizeStyles.margin;

    // 计算边框
    const borderStyle =
      orientation === 'horizontal'
        ? { borderBottom: `${calculatedHeight}px ${typeStyles.borderStyle} ${colorStyles}` }
        : { borderRight: `${calculatedWidth}px ${typeStyles.borderStyle} ${colorStyles}` };

    // 处理渐变背景
    const backgroundStyle = gradient
      ? {
          backgroundImage: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.start}, ${gradient.end})`,
          border: 'none',
        }
      : borderStyle;

    // 处理动画
    const animationStyle = animated
      ? {
          transition: `all ${animationDuration}ms ease-in-out`,
        }
      : {};

    // 处理间距
    const spacingStyle = spacing
      ? {
          gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
        }
      : {};

    // 处理对齐
    const alignStyle =
      orientation === 'horizontal'
        ? { justifyContent: positionStyles?.justifyContent || 'center', alignItems: verticalAlign }
        : { justifyContent: align, alignItems: positionStyles?.justifyContent || 'center' };

    return {
      display: 'flex',
      width: typeof calculatedWidth === 'number' ? `${calculatedWidth}%` : calculatedWidth,
      height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight,
      margin: typeof calculatedMargin === 'number' ? `${calculatedMargin}px 0` : calculatedMargin,
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      opacity,
      borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      ...backgroundStyle,
      ...animationStyle,
      ...spacingStyle,
      ...alignStyle,
      ...style,
    };
  }

  /** 生成文本分割线样式 */
  static getTextDividerStyle(props: {
    children?: ReactNode;
    orientation?: DividerOrientation;
    textSpacing?: number | string;
    textBackground?: string;
    textPadding?: number | string;
    textBorderRadius?: number | string;
    textStyle?: React.CSSProperties;
  }): React.CSSProperties {
    const {
      children,
      orientation = 'horizontal',
      textSpacing = 16,
      textBackground = '#ffffff',
      textPadding = '0 16px',
      textBorderRadius = 4,
      textStyle = {},
    } = props;

    if (!children) return {};

    const isHorizontal = orientation === 'horizontal';

    // 创建文本样式对象
    const textStyles = {
      padding: typeof textPadding === 'number' ? `${textPadding}px` : textPadding,
      backgroundColor: textBackground,
      borderRadius: typeof textBorderRadius === 'number' ? `${textBorderRadius}px` : textBorderRadius,
      margin: isHorizontal
        ? `0 ${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing}`
        : `${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing} 0`,
      ...textStyle,
    };

    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: isHorizontal ? 'row' : 'column',
      width: '100%',
      height: '100%',
      position: 'relative',
      ...textStyles,
    };
  }

  /** 生成垂直分割线样式 */
  static getVerticalDividerStyle(props: {
    height?: number | string;
    align?: 'top' | 'middle' | 'bottom' | 'stretch';
  }): React.CSSProperties {
    const { height = '100%', align = 'stretch' } = props;

    return {
      width: '1px',
      height: typeof height === 'number' ? `${height}px` : height,
      backgroundColor: '#e5e7eb',
      alignSelf:
        align === 'stretch' ? 'stretch' : align === 'top' ? 'flex-start' : align === 'bottom' ? 'flex-end' : 'center',
    };
  }

  /** 生成图标分割线样式 */
  static getIconDividerStyle(props: {
    icon?: ReactNode;
    iconPosition?: 'start' | 'center' | 'end';
    iconSpacing?: number | string;
  }): React.CSSProperties {
    const { icon, iconPosition = 'center', iconSpacing = 16 } = props;

    if (!icon) return {};

    const positionStyles = {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
    };

    // 创建图标间距样式
    const spacingStyle = {
      margin:
        iconPosition === 'center'
          ? `0 ${typeof iconSpacing === 'number' ? `${iconSpacing}px` : iconSpacing}`
          : iconPosition === 'start'
          ? `0 ${typeof iconSpacing === 'number' ? `${iconSpacing}px` : iconSpacing} 0 0`
          : `0 0 0 ${typeof iconSpacing === 'number' ? `${iconSpacing}px` : iconSpacing}`,
    };

    return {
      display: 'flex',
      alignItems: 'center',
      ...positionStyles[iconPosition],
      ...spacingStyle,
    };
  }

  /** 生成动画分割线样式 */
  static getAnimatedDividerStyle(props: {
    animationType?: 'slide' | 'fade' | 'grow' | 'pulse';
    animationDirection?: 'left' | 'right' | 'up' | 'down';
    animationDuration?: number;
    animationDelay?: number;
    animationLoop?: boolean;
    animationPlayState?: 'running' | 'paused';
  }): React.CSSProperties {
    const {
      animationType = 'slide',
      animationDirection = 'left',
      animationDuration = 1000,
      animationDelay = 0,
      animationLoop = true,
      animationPlayState = 'running',
    } = props;

    const animations = {
      slide: {
        left: 'slideInLeft',
        right: 'slideInRight',
        up: 'slideInUp',
        down: 'slideInDown',
      },
      fade: 'fadeIn',
      grow: 'growIn',
      pulse: 'pulse',
    };

    const animationName = animationType === 'slide' ? animations.slide[animationDirection] : animations[animationType];

    return {
      animation: `${animationName} ${animationDuration}ms ${animationDelay}ms ${
        animationLoop ? 'infinite' : '1'
      } ${animationPlayState}`,
    };
  }

  /** 生成响应式分割线样式 */
  static getResponsiveStyle(props: {
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    orientation?: DividerOrientation;
  }): React.CSSProperties {
    const { breakpoint = 'md', orientation = 'horizontal' } = props;

    const mediaQueries = {
      xs: '@media (max-width: 639px)',
      sm: '@media (max-width: 767px)',
      md: '@media (max-width: 1023px)',
      lg: '@media (max-width: 1279px)',
      xl: '@media (max-width: 1535px)',
    };

    return {
      [mediaQueries[breakpoint]]: {
        flexDirection: orientation === 'horizontal' ? 'column' : 'row',
        width: orientation === 'horizontal' ? '100%' : 'auto',
        height: orientation === 'horizontal' ? 'auto' : '100%',
      },
    };
  }

  /** 生成分割线组样式 */
  static getGroupStyle(props: {
    orientation?: DividerOrientation;
    spacing?: number | string;
    vertical?: boolean;
    align?: 'start' | 'center' | 'end' | 'stretch';
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { orientation = 'horizontal', spacing = 16, vertical = false, align = 'center', style = {} } = props;

    return {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
      alignItems: align,
      width: orientation === 'horizontal' ? '100%' : 'auto',
      height: orientation === 'horizontal' ? 'auto' : '100%',
      ...style,
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --divider-primary-color: #0ea5e9;
        --divider-secondary-color: #6b7280;
        --divider-success-color: #22c55e;
        --divider-warning-color: #f59e0b;
        --divider-error-color: #ef4444;
        --divider-info-color: #3b82f6;
        --divider-light-color: #f3f4f6;
        --divider-dark-color: #1f2937;
        --divider-border-color: #e5e7eb;
        --divider-text-background: #ffffff;
        --divider-text-spacing: 16px;
        --divider-animation-duration: 300ms;
        --divider-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes slideInLeft {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideInUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideInDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes growIn {
        from {
          transform: scale(0);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
  }

  /** 获取方向类名 */
  static getOrientationClassName(orientation: DividerOrientation): string {
    return `taro-uno-divider--${orientation}`;
  }

  /** 获取类型类名 */
  static getTypeClassName(type: DividerType): string {
    return `taro-uno-divider--${type}`;
  }

  /** 获取位置类名 */
  static getPositionClassName(position: string): string {
    return `taro-uno-divider--${position}`;
  }

  /** 获取尺寸类名 */
  static getSizeClassName(size: DividerSize): string {
    return `taro-uno-divider--${size}`;
  }

  /** 获取颜色类名 */
  static getColorClassName(color: DividerColor): string {
    return `taro-uno-divider--${color}`;
  }
}

/** 导出样式工具 */
export const dividerStyles = DividerStyles;
