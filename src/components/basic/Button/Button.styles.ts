import { PlatformDetector } from '@/utils';
import type { ButtonProps, ButtonSize, ButtonType, ButtonVariant, ButtonShape, ButtonStatus } from './Button.types';

/** 样式工具类 */
export class ButtonStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-button`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    ButtonSize,
    { fontSize: number; padding: string; height: number; borderRadius: number }
  > = {
    xs: { fontSize: 20, padding: '8px 16px', height: 56, borderRadius: 4 },
    sm: { fontSize: 24, padding: '12px 20px', height: 64, borderRadius: 6 },
    md: { fontSize: 28, padding: '16px 24px', height: 72, borderRadius: 8 },
    lg: { fontSize: 32, padding: '20px 32px', height: 80, borderRadius: 10 },
    xl: { fontSize: 36, padding: '24px 40px', height: 88, borderRadius: 12 },
  };

  /** 类型颜色映射 */
  static readonly TYPE_COLORS: Record<ButtonType, { backgroundColor: string; textColor: string; borderColor: string }> =
    {
      default: { backgroundColor: '#ffffff', textColor: '#111827', borderColor: '#e5e7eb' },
      primary: { backgroundColor: '#0ea5e9', textColor: '#ffffff', borderColor: '#0ea5e9' },
      secondary: { backgroundColor: '#6b7280', textColor: '#ffffff', borderColor: '#6b7280' },
      success: { backgroundColor: '#22c55e', textColor: '#ffffff', borderColor: '#22c55e' },
      warning: { backgroundColor: '#f59e0b', textColor: '#ffffff', borderColor: '#f59e0b' },
      error: { backgroundColor: '#ef4444', textColor: '#ffffff', borderColor: '#ef4444' },
      info: { backgroundColor: '#3b82f6', textColor: '#ffffff', borderColor: '#3b82f6' },
    };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    ButtonVariant,
    { backgroundColor: string; textColor: string; borderColor: string; borderWidth: number }
  > = {
    solid: { backgroundColor: '', textColor: '#ffffff', borderColor: '', borderWidth: 1 },
    outline: { backgroundColor: 'transparent', textColor: '', borderColor: '', borderWidth: 1 },
    ghost: { backgroundColor: 'transparent', textColor: '', borderColor: 'transparent', borderWidth: 0 },
    text: { backgroundColor: 'transparent', textColor: '', borderColor: 'transparent', borderWidth: 0 },
  };

  /** 形状映射 */
  static readonly SHAPE_MAP: Record<ButtonShape, { borderRadius: string }> = {
    default: { borderRadius: '8px' },
    rounded: { borderRadius: '9999px' },
    circle: { borderRadius: '50%' },
    square: { borderRadius: '0' },
  };

  /** 状态映射 */
  static readonly STATUS_MAP: Record<ButtonStatus, { opacity: number; cursor: string; pointerEvents: string }> = {
    normal: { opacity: 1, cursor: 'pointer', pointerEvents: 'auto' },
    loading: { opacity: 0.7, cursor: 'not-allowed', pointerEvents: 'none' },
    disabled: { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' },
    active: { opacity: 0.8, cursor: 'pointer', pointerEvents: 'auto' },
  };

  /** 阴影样式 */
  static readonly SHADOW_STYLES = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  /** 生成按钮类名 */
  static getClassName(props: Partial<ButtonProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      type = 'default',
      variant = 'solid',
      shape = 'default',
      status = 'normal',
      block = false,
      danger = false,
      loading = false,
      disabled = false,
      shadow = false,
      bordered = true,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${size}`,
      `${prefix}--${type}`,
      `${prefix}--${variant}`,
      `${prefix}--${shape}`,
      `${prefix}--${status}`,
      block && `${prefix}--block`,
      danger && `${prefix}--danger`,
      loading && `${prefix}--loading`,
      disabled && `${prefix}--disabled`,
      shadow && `${prefix}--shadow`,
      bordered && `${prefix}--bordered`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成按钮样式 */
  static getStyle(props: Partial<ButtonProps>): React.CSSProperties {
    const {
      size = 'md',
      type = 'default',
      variant = 'solid',
      shape = 'default',
      status = 'normal',
      danger = false,
      shadow = false,
      color,
      backgroundColor,
      textColor,
      borderColor,
      animationDuration,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const typeColors = this.TYPE_COLORS[type];
    const variantStyles = this.VARIANT_STYLES[variant];
    const shapeStyles = this.SHAPE_MAP[shape];
    const statusStyles = this.STATUS_MAP[status];

    // 计算最终颜色
    const finalBackgroundColor = this.getBackgroundColor({
      variant,
      typeColors,
      variantStyles,
      danger,
      color,
      backgroundColor,
    });

    const finalTextColor = this.getTextColor({
      variant,
      typeColors,
      danger,
      textColor,
    });

    const finalBorderColor = this.getBorderColor({
      variant,
      typeColors,
      danger,
      borderColor,
    });

    return {
      ...sizeStyles,
      ...shapeStyles,
      backgroundColor: finalBackgroundColor,
      color: finalTextColor,
      borderColor: finalBorderColor,
      borderWidth: variantStyles.borderWidth,
      opacity: statusStyles.opacity,
      cursor: statusStyles.cursor,
      pointerEvents: statusStyles.pointerEvents as React.CSSProperties['pointerEvents'],
      boxShadow: shadow ? this.SHADOW_STYLES.md : 'none',
      transition: `all ${Number(animationDuration ?? 300)}ms ease-in-out`,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    };
  }

  /** 获取背景颜色 */
  private static getBackgroundColor({
    variant,
    typeColors,
    variantStyles,
    danger,
    color,
    backgroundColor,
  }: {
    variant: ButtonVariant;
    typeColors: (typeof ButtonStyles.TYPE_COLORS)[ButtonType];
    variantStyles: (typeof ButtonStyles.VARIANT_STYLES)[ButtonVariant];
    danger: boolean;
    color: string | undefined;
    backgroundColor: string | undefined;
  }): string {
    if (backgroundColor) return backgroundColor;
    if (color) return variant === 'solid' ? color : 'transparent';
    if (danger && variant === 'solid') return '#ef4444';
    if (variant === 'solid') return typeColors.backgroundColor;
    return variantStyles.backgroundColor;
  }

  /** 获取文字颜色 */
  private static getTextColor({
    variant,
    typeColors,
    danger,
    textColor,
  }: {
    variant: ButtonVariant;
    typeColors: (typeof ButtonStyles.TYPE_COLORS)[ButtonType];
    danger: boolean;
    textColor: string | undefined;
  }): string {
    if (textColor) return textColor;
    if (danger && variant !== 'solid') return '#ef4444';
    if (variant === 'solid') return typeColors.textColor;
    return typeColors.backgroundColor;
  }

  /** 获取边框颜色 */
  private static getBorderColor({
    variant,
    typeColors,
    danger,
    borderColor,
  }: {
    variant: ButtonVariant;
    typeColors: (typeof ButtonStyles.TYPE_COLORS)[ButtonType];
    danger: boolean;
    borderColor: string | undefined;
  }): string {
    if (borderColor) return borderColor;
    if (variant === 'outline') {
      return danger ? '#ef4444' : typeColors.borderColor;
    }
    if (variant === 'solid') {
      return danger ? '#ef4444' : typeColors.borderColor;
    }
    return 'transparent';
  }

  /** 生成按钮组样式 */
  static getGroupStyle(props: {
    vertical?: boolean;
    spacing?: number;
    block?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { vertical = false, spacing = 8, block = false, style = {} } = props;

    return {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      gap: `${spacing}px`,
      width: block ? '100%' : 'auto',
      ...style,
    };
  }

  /** 生成按钮组内按钮样式 */
  static getGroupItemStyle(props: {
    index: number;
    total: number;
    vertical?: boolean;
    shape?: ButtonShape;
  }): React.CSSProperties {
    const { index, total, vertical = false, shape = 'default' } = props;

    if (shape !== 'default') return {};

    const style: React.CSSProperties = {};

    if (vertical) {
      if (index === 0) {
        style.borderTopLeftRadius = '8px';
        style.borderTopRightRadius = '8px';
      } else if (index === total - 1) {
        style.borderBottomLeftRadius = '8px';
        style.borderBottomRightRadius = '8px';
      } else {
        style.borderRadius = '0';
      }
    } else {
      if (index === 0) {
        style.borderTopLeftRadius = '8px';
        style.borderBottomLeftRadius = '8px';
      } else if (index === total - 1) {
        style.borderTopRightRadius = '8px';
        style.borderBottomRightRadius = '8px';
      } else {
        style.borderRadius = '0';
      }
    }

    return style;
  }

  /** 生成涟漪效果样式 */
  static getRippleStyle(x: number, y: number, size: number): React.CSSProperties {
    return {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      width: `${size}px`,
      height: `${size}px`,
      top: `${y - size / 2}px`,
      left: `${x - size / 2}px`,
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none',
    };
  }

  /** 生成加载动画样式 */
  static getLoadingStyle(size: ButtonSize): React.CSSProperties {
    const sizeMap = {
      xs: { width: 16, height: 16 },
      sm: { width: 18, height: 18 },
      md: { width: 20, height: 20 },
      lg: { width: 22, height: 22 },
      xl: { width: 24, height: 24 },
    };

    return {
      ...sizeMap[size],
      border: '2px solid transparent',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --button-primary-color: #0ea5e9;
        --button-secondary-color: #6b7280;
        --button-success-color: #22c55e;
        --button-warning-color: #f59e0b;
        --button-error-color: #ef4444;
        --button-info-color: #3b82f6;
        --button-text-color: #111827;
        --button-border-color: #e5e7eb;
        --button-disabled-opacity: 0.5;
        --button-loading-opacity: 0.7;
        --button-animation-duration: 300ms;
        --button-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
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

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }
}

/** 导出样式工具 */
export const buttonStyles = ButtonStyles;
