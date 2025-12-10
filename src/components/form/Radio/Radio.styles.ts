import { platform } from '@/utils';
import type { RadioProps, RadioSize, RadioStatus, RadioVariant, RadioColor, RadioStyleConfig } from './Radio.types';

/** 样式工具类 */
export class RadioStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platformName = platform.getPlatform();
    return `taro-uno-${platformName}-radio`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    RadioSize,
    { fontSize: number; size: number; borderRadius: number; padding: number; iconSize: number }
  > = {
    xs: { fontSize: 20, size: 16, borderRadius: 8, padding: 4, iconSize: 10 },
    sm: { fontSize: 24, size: 20, borderRadius: 10, padding: 6, iconSize: 12 },
    md: { fontSize: 28, size: 24, borderRadius: 12, padding: 8, iconSize: 14 },
    lg: { fontSize: 32, size: 28, borderRadius: 14, padding: 10, iconSize: 16 },
    xl: { fontSize: 36, size: 32, borderRadius: 16, padding: 12, iconSize: 18 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    RadioStatus,
    {
      backgroundColor: string;
      borderColor: string;
      '--radio-dot-color': string;
      '--radio-checked-border-color': string;
      '--radio-checked-background-color': string;
      textColor: string;
      icon: string;
    }
  > = {
    normal: {
      backgroundColor: '#ffffff',
      borderColor: '#d1d5db',
      '--radio-dot-color': '#0ea5e9',
      '--radio-checked-border-color': '#0ea5e9',
      '--radio-checked-background-color': '#ffffff',
      textColor: '#374151',
      icon: '●',
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#ef4444',
      '--radio-dot-color': '#ef4444',
      '--radio-checked-border-color': '#ef4444',
      '--radio-checked-background-color': '#ffffff',
      textColor: '#ef4444',
      icon: '●',
    },
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#f59e0b',
      '--radio-dot-color': '#f59e0b',
      '--radio-checked-border-color': '#f59e0b',
      '--radio-checked-background-color': '#ffffff',
      textColor: '#f59e0b',
      icon: '●',
    },
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e',
      '--radio-dot-color': '#22c55e',
      '--radio-checked-border-color': '#22c55e',
      '--radio-checked-background-color': '#ffffff',
      textColor: '#22c55e',
      icon: '●',
    },
    disabled: {
      backgroundColor: '#f9fafb',
      borderColor: '#e5e7eb',
      '--radio-dot-color': '#9ca3af',
      '--radio-checked-border-color': '#e5e7eb',
      '--radio-checked-background-color': '#f9fafb',
      textColor: '#9ca3af',
      icon: '●',
    },
  };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    RadioVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number }
  > = {
    default: { backgroundColor: '#ffffff', borderColor: '#d1d5db', borderWidth: 2 },
    filled: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db', borderWidth: 2 },
    outlined: { backgroundColor: 'transparent', borderColor: '#d1d5db', borderWidth: 2 },
  };

  /** 颜色主题映射 */
  static readonly COLOR_THEMES: Record<
    RadioColor,
    { primary: string; secondary: string; background: string; border: string }
  > = {
    primary: {
      primary: '#0ea5e9',
      secondary: '#e0f2fe',
      background: '#ffffff',
      border: '#0ea5e9',
    },
    secondary: {
      primary: '#6b7280',
      secondary: '#f3f4f6',
      background: '#ffffff',
      border: '#6b7280',
    },
    success: {
      primary: '#22c55e',
      secondary: '#dcfce7',
      background: '#ffffff',
      border: '#22c55e',
    },
    warning: {
      primary: '#f59e0b',
      secondary: '#fef3c7',
      background: '#ffffff',
      border: '#f59e0b',
    },
    error: {
      primary: '#ef4444',
      secondary: '#fee2e2',
      background: '#ffffff',
      border: '#ef4444',
    },
    info: {
      primary: '#3b82f6',
      secondary: '#dbeafe',
      background: '#ffffff',
      border: '#3b82f6',
    },
  };

  /** 生成单选框类名 */
  static getClassName(props: Partial<RadioProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      status = 'normal',
      variant = 'default',
      color = 'primary',
      disabled = false,
      readonly = false,
      checked = false,
      bordered = true,
      rounded = true,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${size}`,
      `${prefix}--${status}`,
      `${prefix}--${variant}`,
      `${prefix}--${color}`,
      disabled && `${prefix}--disabled`,
      readonly && `${prefix}--readonly`,
      checked && `${prefix}--checked`,
      bordered && `${prefix}--bordered`,
      rounded && `${prefix}--rounded`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成单选框样式 */
  static getStyle(props: Partial<RadioProps>): React.CSSProperties {
    const { size = 'md', status = 'normal', disabled = false, readonly = false, checked = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    const baseStyle: React.CSSProperties = {
      width: sizeStyles['size'],
      height: sizeStyles['size'],
      borderRadius: '50%',
      backgroundColor: checked ? statusStyles['--radio-checked-background-color'] : statusStyles['backgroundColor'],
      border: `2px solid ${checked ? statusStyles['--radio-checked-border-color'] : statusStyles['borderColor']}`,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : readonly ? 'default' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      ...style,
    };

    // Add CSS custom properties using type assertion
    const customProps: any = {
      '--radio-dot-color': statusStyles['--radio-dot-color'],
      '--radio-checked-border-color': statusStyles['--radio-checked-border-color'],
      '--radio-checked-background-color': statusStyles['--radio-checked-background-color'],
    };

    return { ...baseStyle, ...customProps };
  }

  /** 生成容器样式 */
  static getContainerStyle(props: { style?: React.CSSProperties }): React.CSSProperties {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...props.style,
    };
  }

  /** 生成包装器样式 */
  static getWrapperStyle(props: { style?: React.CSSProperties }): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ...props.style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: {
    size?: RadioSize;
    disabled?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'],
      color: disabled ? '#9ca3af' : '#374151',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      ...style,
    };
  }

  /** 生成辅助文本样式 */
  static getHelperTextStyle(props: { size?: RadioSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#6b7280',
      marginLeft: sizeStyles['size'] + 8,
      ...style,
    };
  }

  /** 生成错误文本样式 */
  static getErrorTextStyle(props: { size?: RadioSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#ef4444',
      marginLeft: sizeStyles['size'] + 8,
      ...style,
    };
  }

  /** 生成圆点样式 */
  static getDotStyle(props: {
    size?: RadioSize;
    checked?: boolean;
    status?: RadioStatus;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', checked = false, status = 'normal', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    const baseStyle: React.CSSProperties = {
      width: checked ? sizeStyles['size'] * 0.4 : 0,
      height: checked ? sizeStyles['size'] * 0.4 : 0,
      borderRadius: '50%',
      backgroundColor: statusStyles['--radio-dot-color'],
      opacity: checked ? 1 : 0,
      transform: checked ? 'scale(1)' : 'scale(0)',
      transition: 'all 0.2s ease-in-out',
      ...style,
    };

    // Add CSS custom properties using type assertion
    const customProps: any = {
      '--radio-dot-color': statusStyles['--radio-dot-color'],
    };

    return { ...baseStyle, ...customProps };
  }

  /** 生成单选框样式配置 */
  static getStyleConfig(): RadioStyleConfig {
    return {
      base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in-out',
      },
      sizes: {
        xs: { fontSize: 20, width: 16, height: 16 },
        sm: { fontSize: 24, width: 20, height: 20 },
        md: { fontSize: 28, width: 24, height: 24 },
        lg: { fontSize: 32, width: 28, height: 28 },
        xl: { fontSize: 36, width: 32, height: 32 },
      },
      statuses: {
        normal: {
          backgroundColor: '#ffffff',
          borderColor: '#d1d5db',
          '--radio-dot-color': '#0ea5e9',
          '--radio-checked-border-color': '#0ea5e9',
          '--radio-checked-background-color': '#ffffff',
        } as React.CSSProperties,
        error: {
          backgroundColor: '#fef2f2',
          borderColor: '#ef4444',
          '--radio-dot-color': '#ef4444',
          '--radio-checked-border-color': '#ef4444',
          '--radio-checked-background-color': '#ffffff',
        } as React.CSSProperties,
        warning: {
          backgroundColor: '#fffbeb',
          borderColor: '#f59e0b',
          '--radio-dot-color': '#f59e0b',
          '--radio-checked-border-color': '#f59e0b',
          '--radio-checked-background-color': '#ffffff',
        } as React.CSSProperties,
        success: {
          backgroundColor: '#f0fdf4',
          borderColor: '#22c55e',
          '--radio-dot-color': '#22c55e',
          '--radio-checked-border-color': '#22c55e',
          '--radio-checked-background-color': '#ffffff',
        } as React.CSSProperties,
        disabled: {
          backgroundColor: '#f9fafb',
          borderColor: '#e5e7eb',
          '--radio-dot-color': '#9ca3af',
          '--radio-checked-border-color': '#e5e7eb',
          '--radio-checked-background-color': '#f9fafb',
        } as React.CSSProperties,
      },
      variants: {
        default: { backgroundColor: '#ffffff', borderColor: '#d1d5db' },
        filled: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db' },
        outlined: { backgroundColor: 'transparent', borderColor: '#d1d5db' },
      },
      colors: {
        primary: { primary: '#0ea5e9', secondary: '#e0f2fe', background: '#ffffff' } as React.CSSProperties,
        secondary: { primary: '#6b7280', secondary: '#f3f4f6', background: '#ffffff' } as React.CSSProperties,
        success: { primary: '#22c55e', secondary: '#dcfce7', background: '#ffffff' } as React.CSSProperties,
        warning: { primary: '#f59e0b', secondary: '#fef3c7', background: '#ffffff' } as React.CSSProperties,
        error: { primary: '#ef4444', secondary: '#fee2e2', background: '#ffffff' } as React.CSSProperties,
        info: { primary: '#3b82f6', secondary: '#dbeafe', background: '#ffffff' } as React.CSSProperties,
      },
      icon: {
        fontSize: 16,
        fontWeight: 'bold',
        transition: 'all 0.2s ease-in-out',
      },
      label: {
        fontSize: 28,
        color: '#374151',
        cursor: 'pointer',
        userSelect: 'none',
      },
      helperText: {
        fontSize: 24,
        color: '#6b7280',
        marginLeft: 32,
      },
      errorText: {
        fontSize: 24,
        color: '#ef4444',
        marginLeft: 32,
      },
      group: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      },
      groupItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      ripple: {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'radioRipple 0.6s linear',
      },
      animation: {
        animationDuration: '0.2s',
        animationTimingFunction: 'ease-in-out',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --radio-primary-color: #0ea5e9;
        --radio-error-color: #ef4444;
        --radio-warning-color: #f59e0b;
        --radio-success-color: #22c55e;
        --radio-border-color: #d1d5db;
        --radio-border-color-hover: #9ca3af;
        --radio-background-color: #ffffff;
        --radio-background-color-disabled: #f9fafb;
        --radio-dot-color: #0ea5e9;
        --radio-dot-color-disabled: #9ca3af;
        --radio-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes radioDotScale {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes radioRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
  }
}

/** 导出样式工具 */
export const radioStyles = RadioStyles;
