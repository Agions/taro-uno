import { getPlatformType } from '../../../utils';
import type { IconProps, IconSize, IconStatus, IconTheme } from './Icon.types';

/** 样式工具类 */
export class IconStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platformValue = getPlatformType();
    return `taro-uno-${platformValue}-icon`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<IconSize, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
    '3xl': 56,
    '4xl': 64,
    '5xl': 72,
  };

  /** 状态映射 */
  static readonly STATUS_MAP: Record<IconStatus, { opacity: number; cursor: string; pointerEvents: string }> = {
    normal: { opacity: 1, cursor: 'default', pointerEvents: 'auto' },
    active: { opacity: 0.8, cursor: 'pointer', pointerEvents: 'auto' },
    disabled: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    loading: { opacity: 0.7, cursor: 'not-allowed', pointerEvents: 'none' },
  };

  /** 主题样式映射 */
  static readonly THEME_STYLES: Record<IconTheme, { strokeWidth?: number; fill?: string; stroke?: string }> = {
    outlined: { strokeWidth: 1.5, fill: 'none', stroke: 'currentColor' },
    filled: { strokeWidth: 0, fill: 'currentColor', stroke: 'none' },
    'two-tone': { strokeWidth: 1, fill: 'currentColor', stroke: 'currentColor' },
    colored: { strokeWidth: 1.5, fill: 'currentColor', stroke: 'currentColor' },
  };

  /** 滤镜效果映射 */
  static readonly FILTER_MAP: Record<string, string> = {
    none: 'none',
    grayscale: 'grayscale(100%)',
    sepia: 'sepia(100%)',
    blur: 'blur(2px)',
    brightness: 'brightness(1.5)',
    contrast: 'contrast(2)',
    'hue-rotate': 'hue-rotate(90deg)',
  };

  /** 混合模式映射 */
  static readonly BLEND_MODE_MAP: Record<string, string> = {
    normal: 'normal',
    multiply: 'multiply',
    screen: 'screen',
    overlay: 'overlay',
    darken: 'darken',
    lighten: 'lighten',
  };

  /** 生成图标类名 */
  static getClassName(props: Partial<IconProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      status = 'normal',
      theme = 'outlined',
      clickable = false,
      loading = false,
      disabled = false,
      animated = false,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${typeof size === 'string' ? size : 'custom'}`,
      `${prefix}--${status}`,
      `${prefix}--${theme}`,
      clickable && `${prefix}--clickable`,
      loading && `${prefix}--loading`,
      disabled && `${prefix}--disabled`,
      animated && `${prefix}--animated`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成图标样式 */
  static getStyle(props: Partial<IconProps>): React.CSSProperties {
    const {
      size = 'md',
      color = 'currentColor',
      rotate = 0,
      status = 'normal',
      animated = false,
      animationDuration = 300,
      filter = 'none',
      blendMode = 'normal',
      style = {},
    } = props;

    const statusStyles = this.STATUS_MAP[status];
    const filterStyle = this.FILTER_MAP[filter];
    const blendModeStyle = this.BLEND_MODE_MAP[blendMode];

    // 计算尺寸
    const calculatedSize = typeof size === 'string' ? this.SIZE_MAP[size] : size;

    return {
      width: calculatedSize,
      height: calculatedSize,
      fontSize: calculatedSize,
      color,
      opacity: statusStyles['opacity'],
      cursor: statusStyles['cursor'],
      pointerEvents: statusStyles['pointerEvents'] as React.CSSProperties['pointerEvents'],
      transform: rotate ? `rotate(${rotate}deg)` : 'none',
      transition: animated ? `all ${animationDuration}ms ease-in-out` : 'none',
      filter: filterStyle,
      mixBlendMode: blendModeStyle as React.CSSProperties['mixBlendMode'],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      ...style,
    };
  }

  /** 生成SVG样式 */
  static getSVGStyle(props: Partial<IconProps>): React.CSSProperties {
    const { theme = 'outlined', size = 'md', color = 'currentColor', style = {} } = props;

    const themeStyles = this.THEME_STYLES[theme];
    const calculatedSize = typeof size === 'string' ? this.SIZE_MAP[size] : size;

    return {
      width: calculatedSize,
      height: calculatedSize,
      fill: themeStyles['fill'],
      stroke: themeStyles['stroke'],
      strokeWidth: themeStyles['strokeWidth'],
      color,
      ...style,
    };
  }

  /** 生成图片样式 */
  static getImageStyle(props: Partial<IconProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const calculatedSize = typeof size === 'string' ? this.SIZE_MAP[size] : size;

    return {
      width: calculatedSize,
      height: calculatedSize,
      objectFit: 'contain',
      display: 'block',
      ...style,
    };
  }

  /** 生成字体图标样式 */
  static getFontIconStyle(props: Partial<IconProps>): React.CSSProperties {
    const { size = 'md', color = 'currentColor', style = {} } = props;

    const calculatedSize = typeof size === 'string' ? this.SIZE_MAP[size] : size;

    return {
      fontSize: calculatedSize,
      lineHeight: 1,
      color,
      display: 'inline-block',
      ...style,
    };
  }

  /** 生成加载动画样式 */
  static getLoadingStyle(size: IconSize | number): React.CSSProperties {
    const calculatedSize = typeof size === 'string' ? this.SIZE_MAP[size] : size;

    return {
      width: calculatedSize,
      height: calculatedSize,
      border: '2px solid transparent',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    };
  }

  /** 生成涟漪效果样式 */
  static getRippleStyle(x: number, y: number, size: number): React.CSSProperties {
    return {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      width: `${size}px`,
      height: `${size}px`,
      top: `${y - size / 2}px`,
      left: `${x - size / 2}px`,
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none',
    };
  }

  /** 生成工具提示样式 */
  static getTooltipStyle(position: string = 'top'): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffffff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      zIndex: 1000,
      pointerEvents: 'none',
    };

    switch (position) {
      case 'top':
        return { ...baseStyle, bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '4px' };
      case 'bottom':
        return { ...baseStyle, top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px' };
      case 'left':
        return { ...baseStyle, right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '4px' };
      case 'right':
        return { ...baseStyle, left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '4px' };
      default:
        return baseStyle;
    }
  }

  /** 生成图标组样式 */
  static getGroupStyle(props: {
    vertical?: boolean;
    spacing?: number;
    align?: string;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { vertical = false, spacing = 8, align = 'center', style = {} } = props;

    return {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      gap: `${spacing}px`,
      alignItems: align,
      ...style,
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --icon-primary-color: #0ea5e9;
        --icon-secondary-color: #6b7280;
        --icon-success-color: #22c55e;
        --icon-warning-color: #f59e0b;
        --icon-error-color: #ef4444;
        --icon-info-color: #3b82f6;
        --icon-disabled-opacity: 0.5;
        --icon-loading-opacity: 0.7;
        --icon-animation-duration: 300ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes ripple {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(4);
          opacity: 0;
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

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-25%);
        }
      }

      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-2px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(2px);
        }
      }
    `;
  }

  /** 生成动画类名 */
  static getAnimationClassName(animation: string): string {
    const animationMap: Record<string, string> = {
      spin: 'taro-uno-icon--spin',
      pulse: 'taro-uno-icon--pulse',
      bounce: 'taro-uno-icon--bounce',
      shake: 'taro-uno-icon--shake',
    };

    return animationMap[animation] || '';
  }

  /** 获取主题类名 */
  static getThemeClassName(theme: IconTheme): string {
    return `taro-uno-icon--${theme}`;
  }

  /** 获取状态类名 */
  static getStatusClassName(status: IconStatus): string {
    return `taro-uno-icon--${status}`;
  }

  /** 获取尺寸类名 */
  static getSizeClassName(size: IconSize | number): string {
    if (typeof size === 'number') {
      return 'taro-uno-icon--custom';
    }
    return `taro-uno-icon--${size}`;
  }
}

/** 导出样式工具 */
export const iconStyles = IconStyles;
