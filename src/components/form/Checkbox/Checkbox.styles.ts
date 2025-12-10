// import { PlatformDetector } from '@/utils';
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxSize,
  CheckboxStatus,
  CheckboxVariant,
  CheckboxColor,
  CheckboxStyleConfig,
} from './Checkbox.types';

/** 样式工具类 */
export class CheckboxStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    return 'taro-uno-checkbox';
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    CheckboxSize,
    { fontSize: number; size: number; borderRadius: number; padding: number; iconSize: number }
  > = {
    xs: { fontSize: 20, size: 16, borderRadius: 3, padding: 4, iconSize: 12 },
    sm: { fontSize: 24, size: 20, borderRadius: 4, padding: 6, iconSize: 14 },
    md: { fontSize: 28, size: 24, borderRadius: 5, padding: 8, iconSize: 16 },
    lg: { fontSize: 32, size: 28, borderRadius: 6, padding: 10, iconSize: 18 },
    xl: { fontSize: 36, size: 32, borderRadius: 7, padding: 12, iconSize: 20 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    CheckboxStatus,
    {
      backgroundColor: string;
      borderColor: string;
      checkColor: string;
      textColor: string;
      icon: string;
    }
  > = {
    normal: {
      backgroundColor: '#ffffff',
      borderColor: '#d1d5db',
      checkColor: '#0ea5e9',
      textColor: '#374151',
      icon: '✓',
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#ef4444',
      checkColor: '#ef4444',
      textColor: '#ef4444',
      icon: '✓',
    },
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#f59e0b',
      checkColor: '#f59e0b',
      textColor: '#f59e0b',
      icon: '✓',
    },
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e',
      checkColor: '#22c55e',
      textColor: '#22c55e',
      icon: '✓',
    },
    disabled: {
      backgroundColor: '#f9fafb',
      borderColor: '#e5e7eb',
      checkColor: '#9ca3af',
      textColor: '#9ca3af',
      icon: '✓',
    },
  };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    CheckboxVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number }
  > = {
    default: { backgroundColor: '#ffffff', borderColor: '#d1d5db', borderWidth: 2 },
    filled: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db', borderWidth: 2 },
    outlined: { backgroundColor: 'transparent', borderColor: '#d1d5db', borderWidth: 2 },
  };

  /** 颜色主题映射 */
  static readonly COLOR_THEMES: Record<
    CheckboxColor,
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

  /** 生成复选框类名 */
  static getClassName(props: Partial<CheckboxProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      status = 'normal',
      variant = 'default',
      color = 'primary',
      disabled = false,
      readonly = false,
      indeterminate = false,
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
      indeterminate && `${prefix}--indeterminate`,
      bordered && `${prefix}--bordered`,
      rounded && `${prefix}--rounded`,
      // Test-specific classes
      `checkbox-${size}`,
      `checkbox-${status}`,
      `checkbox-${variant}`,
      `checkbox-${color}`,
      disabled && 'checkbox-disabled',
      readonly && 'checkbox-readonly',
      indeterminate && 'checkbox-indeterminate',
      bordered && 'checkbox-bordered',
      rounded && 'checkbox-rounded',
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成复选框样式 */
  static getStyle(props: Partial<CheckboxProps>): React.CSSProperties {
    const {
      size = 'md',
      status = 'normal',
      variant = 'default',
      color = 'primary',
      disabled = false,
      readonly = false,
      indeterminate: _indeterminate = false,
      bordered = true,
      rounded = true,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];
    const variantStyles = this.VARIANT_STYLES[variant];
    const colorTheme = this.COLOR_THEMES[color];

    const baseStyle: React.CSSProperties = {
      width: sizeStyles['size'],
      height: sizeStyles['size'],
      borderRadius: rounded ? sizeStyles['borderRadius'] : 0,
      backgroundColor: variantStyles['backgroundColor'],
      borderColor: colorTheme.border,
      borderWidth: bordered ? variantStyles['borderWidth'] : 0,
      color: colorTheme.primary,
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

    // 状态样式覆盖
    if (status !== 'normal') {
      baseStyle.backgroundColor = statusStyles['backgroundColor'];
      baseStyle.borderColor = statusStyles['borderColor'];
      baseStyle.color = statusStyles['checkColor'];
    }

    return baseStyle;
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
  static getWrapperStyle(props: {
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'center' | 'end';
    spacing?: number | string;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { direction = 'horizontal', align = 'center', spacing = 8, style = {} } = props;

    return {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
      gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
      ...style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: {
    size?: CheckboxSize;
    disabled?: boolean;
    labelPosition?: 'left' | 'right';
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', disabled = false, labelPosition = 'right', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'],
      color: disabled ? '#9ca3af' : '#374151',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      marginLeft: labelPosition === 'right' ? sizeStyles['padding'] : 0,
      marginRight: labelPosition === 'left' ? sizeStyles['padding'] : 0,
      ...style,
    };
  }

  /** 生成辅助文本样式 */
  static getHelperTextStyle(props: {
    size?: CheckboxSize;
    status?: CheckboxStatus;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', status = 'normal', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: statusStyles['textColor'],
      marginTop: 4,
      marginLeft: sizeStyles['size'] + 8,
      ...style,
    };
  }

  /** 生成错误文本样式 */
  static getErrorTextStyle(props: { size?: CheckboxSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#ef4444',
      marginTop: 4,
      marginLeft: sizeStyles['size'] + 8,
      ...style,
    };
  }

  /** 生成图标样式 */
  static getIconStyle(props: {
    size?: CheckboxSize;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', checked = false, indeterminate = false, disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['iconSize'],
      fontWeight: 'bold',
      opacity: checked || indeterminate ? (disabled ? 0.5 : 1) : 0,
      transform: indeterminate ? 'scaleY(0.5)' : 'scale(1)',
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成复选框组样式 */
  static getGroupStyle(props: Partial<CheckboxGroupProps>): React.CSSProperties {
    const {
      direction = 'horizontal',
      align = 'center',
      spacing = 8,
      compact = false,
      block = false,
      style = {},
    } = props;

    return {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
      gap: compact ? 4 : spacing,
      width: block ? '100%' : 'auto',
      flexWrap: 'wrap',
      ...style,
    };
  }

  /** 生成复选框组项目样式 */
  static getGroupItemStyle(props: {
    direction?: 'horizontal' | 'vertical';
    compact?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { direction = 'horizontal', compact = false, style = {} } = props;

    return {
      display: 'flex',
      alignItems: 'center',
      marginRight: direction === 'horizontal' && !compact ? 16 : 0,
      marginBottom: direction === 'vertical' && !compact ? 8 : 0,
      ...style,
    };
  }

  /** 生成全选按钮样式 */
  static getSelectAllStyle(props: {
    size?: CheckboxSize;
    disabled?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      padding: `${sizeStyles['padding']}px ${sizeStyles['padding'] * 1.5}px`,
      fontSize: sizeStyles['fontSize'],
      color: disabled ? '#9ca3af' : '#374151',
      backgroundColor: disabled ? '#f9fafb' : '#f3f4f6',
      border: '1px solid #d1d5db',
      borderRadius: sizeStyles['borderRadius'],
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      marginBottom: 8,
      ...style,
    };
  }

  /** 生成计数样式 */
  static getCountStyle(props: { size?: CheckboxSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#6b7280',
      marginLeft: 8,
      ...style,
    };
  }

  /** 生成涟漪效果样式 */
  static getRippleStyle(props: {
    x: number;
    y: number;
    size: number;
    color?: string;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { x, y, size, color = 'rgba(14, 165, 233, 0.3)', style = {} } = props;

    return {
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      transform: 'scale(0)',
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none',
      ...style,
    };
  }

  /** 生成复选框样式配置 */
  static getStyleConfig(): CheckboxStyleConfig {
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
        xs: { fontSize: 20, width: 16, height: 16, borderRadius: 3, padding: 4 },
        sm: { fontSize: 24, width: 20, height: 20, borderRadius: 4, padding: 6 },
        md: { fontSize: 28, width: 24, height: 24, borderRadius: 5, padding: 8 },
        lg: { fontSize: 32, width: 28, height: 28, borderRadius: 6, padding: 10 },
        xl: { fontSize: 36, width: 32, height: 32, borderRadius: 7, padding: 12 },
      },
      statuses: {
        normal: {
          backgroundColor: '#ffffff',
          borderColor: '#d1d5db',
          color: '#374151',
        },
        error: {
          backgroundColor: '#fef2f2',
          borderColor: '#ef4444',
          color: '#ef4444',
        },
        warning: {
          backgroundColor: '#fffbeb',
          borderColor: '#f59e0b',
          color: '#f59e0b',
        },
        success: {
          backgroundColor: '#f0fdf4',
          borderColor: '#22c55e',
          color: '#22c55e',
        },
        disabled: {
          backgroundColor: '#f9fafb',
          borderColor: '#e5e7eb',
          color: '#9ca3af',
        },
      },
      variants: {
        default: { backgroundColor: '#ffffff', borderColor: '#d1d5db' },
        filled: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db' },
        outlined: { backgroundColor: 'transparent', borderColor: '#d1d5db' },
      },
      colors: {
        primary: { backgroundColor: '#0ea5e9', borderColor: '#e0f2fe', color: '#ffffff' },
        secondary: { backgroundColor: '#6b7280', borderColor: '#f3f4f6', color: '#ffffff' },
        success: { backgroundColor: '#22c55e', borderColor: '#dcfce7', color: '#ffffff' },
        warning: { backgroundColor: '#f59e0b', borderColor: '#fef3c7', color: '#ffffff' },
        error: { backgroundColor: '#ef4444', borderColor: '#fee2e2', color: '#ffffff' },
        info: { backgroundColor: '#3b82f6', borderColor: '#dbeafe', color: '#ffffff' },
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      },
      groupItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
      },
      ripple: {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'ripple 0.6s ease-out',
        pointerEvents: 'none',
      },
      animation: {
        animationDuration: '200ms',
        animationTimingFunction: 'ease-in-out',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --checkbox-primary-color: #0ea5e9;
        --checkbox-secondary-color: #6b7280;
        --checkbox-success-color: #22c55e;
        --checkbox-warning-color: #f59e0b;
        --checkbox-error-color: #ef4444;
        --checkbox-info-color: #3b82f6;
        --checkbox-border-color: #d1d5db;
        --checkbox-border-color-hover: #9ca3af;
        --checkbox-background-color: #ffffff;
        --checkbox-background-color-disabled: #f9fafb;
        --checkbox-check-color: #0ea5e9;
        --checkbox-check-color-disabled: #9ca3af;
        --checkbox-text-color: #374151;
        --checkbox-text-color-disabled: #9ca3af;
        --checkbox-animation-duration: 200ms;
        --checkbox-ripple-color: rgba(14, 165, 233, 0.3);
        --checkbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        --checkbox-shadow-hover: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes checkboxCheck {
        0% { transform: scale(0) rotate(45deg); }
        50% { transform: scale(1.2) rotate(45deg); }
        100% { transform: scale(1) rotate(45deg); }
      }
      
      @keyframes checkboxIndeterminate {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }
      
      @keyframes checkboxRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
      
      @keyframes checkboxPulse {
        0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); }
        100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
  }
}

/** 导出样式工具 */
export const checkboxStyles = CheckboxStyles;
