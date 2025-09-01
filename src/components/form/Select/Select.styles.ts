import { PlatformDetector } from '@/utils';
import type { SelectProps, SelectSize, SelectVariant, SelectStatus, SelectStyleConfig } from './Select.types';

/** 样式工具类 */
export class SelectStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-select`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    SelectSize,
    { fontSize: number; padding: string; height: number; borderRadius: number }
  > = {
    xs: { fontSize: 20, padding: '8px 12px', height: 56, borderRadius: 4 },
    sm: { fontSize: 24, padding: '12px 16px', height: 64, borderRadius: 6 },
    md: { fontSize: 28, padding: '16px 20px', height: 72, borderRadius: 8 },
    lg: { fontSize: 32, padding: '20px 24px', height: 80, borderRadius: 10 },
    xl: { fontSize: 36, padding: '24px 32px', height: 88, borderRadius: 12 },
  };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    SelectVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number }
  > = {
    outlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 1 },
    filled: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 1 },
    underlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 0, borderBottomWidth: 1 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    SelectStatus,
    { color: string; backgroundColor?: string; borderColor?: string; icon?: string }
  > = {
    normal: { color: '#111827', borderColor: '#e5e7eb' },
    error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2', icon: '❌' },
    warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb', icon: '⚠️' },
    success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4', icon: '✅' },
    disabled: { color: '#9ca3af', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
    loading: { color: '#6b7280', borderColor: '#e5e7eb', backgroundColor: '#f9fafb', icon: '⏳' },
  };

  /** 生成选择器类名 */
  static getClassName(props: Partial<SelectProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      bordered = true,
      className = '',
    } = props;

    const classes = [
      prefix,
      `${prefix}--${size}`,
      `${prefix}--${variant}`,
      `${prefix}--${status}`,
      disabled && `${prefix}--disabled`,
      readonly && `${prefix}--readonly`,
      bordered && `${prefix}--bordered`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成选择器样式 */
  static getStyle(props: Partial<SelectProps>): React.CSSProperties {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const variantStyles = this.VARIANT_STYLES[variant];
    const statusStyles = this.STATUS_COLORS[status];

    const baseStyle: React.CSSProperties = {
      ...sizeStyles,
      backgroundColor: statusStyles.backgroundColor || variantStyles.backgroundColor,
      borderColor: statusStyles.borderColor || variantStyles.borderColor,
      borderWidth: variantStyles.borderWidth,
      borderBottomWidth: variantStyles.borderBottomWidth || variantStyles.borderWidth,
      color: statusStyles.color,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : readonly ? 'default' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      boxSizing: 'border-box',
      outline: 'none',
      ...style,
    };

    // 处理下划线变体的特殊样式
    if (variant === 'underlined') {
      baseStyle.borderLeftWidth = 0;
      baseStyle.borderRightWidth = 0;
      baseStyle.borderTopWidth = 0;
      baseStyle.borderRadius = 0;
    }

    return baseStyle;
  }

  /** 生成选择器容器样式 */
  static getContainerStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', block = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: block ? '100%' : 'auto',
      minWidth: sizeStyles.height * 3,
      ...style,
    };
  }

  /** 生成选择器包装器样式 */
  static getWrapperStyle(props: Partial<SelectProps> & { isFocused?: boolean }): React.CSSProperties {
    const {
      size = 'md',
      status = 'normal',
      disabled = false,
      readonly = false,
      bordered = true,
      isFocused = false,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: sizeStyles.height,
      borderRadius: sizeStyles.borderRadius,
      border: bordered ? '1px solid' : 'none',
      borderColor: statusStyles.borderColor,
      backgroundColor: statusStyles.backgroundColor || 'transparent',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成选择器内部样式 */
  static getSelectorStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      paddingHorizontal: sizeStyles.padding.split(' ')[0],
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    };
  }

  /** 生成值显示样式 */
  static getValueStyle(props: Partial<SelectProps> & { hasValue?: boolean }): React.CSSProperties {
    const { size = 'md', hasValue = false, disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      flex: 1,
      fontSize: sizeStyles.fontSize,
      color: hasValue ? (disabled ? '#9ca3af' : '#111827') : '#9ca3af',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...style,
    };
  }

  /** 生成前缀样式 */
  static getPrefixStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: sizeStyles.padding.split(' ')[0],
      paddingRight: sizeStyles.padding.split(' ')[1],
      height: '100%',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles.fontSize,
      ...style,
    };
  }

  /** 生成后缀样式 */
  static getSuffixStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    return {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: '100%',
      ...style,
    };
  }

  /** 生成清除按钮样式 */
  static getClearButtonStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyles.fontSize * 1.5,
      height: sizeStyles.fontSize * 1.5,
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      color: '#6b7280',
      fontSize: sizeStyles.fontSize * 0.8,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成箭头样式 */
  static getArrowStyle(props: Partial<SelectProps> & { open?: boolean }): React.CSSProperties {
    const { size = 'md', open = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize * 0.8,
      color: '#6b7280',
      transition: 'transform 0.2s ease-in-out',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      ...style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize,
      fontWeight: 500,
      color: disabled ? '#9ca3af' : '#374151',
      marginBottom: 8,
      ...style,
    };
  }

  /** 生成辅助文本样式 */
  static getHelperTextStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', status = 'normal', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      fontSize: sizeStyles.fontSize * 0.85,
      color: statusStyles.color,
      marginTop: 4,
      ...style,
    };
  }

  /** 生成错误文本样式 */
  static getErrorTextStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize * 0.85,
      color: '#ef4444',
      marginTop: 4,
      ...style,
    };
  }

  /** 生成加载文本样式 */
  static getLoadingTextStyle(props: Partial<SelectProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize * 0.85,
      color: '#6b7280',
      marginTop: 4,
      fontStyle: 'italic',
      ...style,
    };
  }

  /** 生成选择器样式配置 */
  static getStyleConfig(): SelectStyleConfig {
    return {
      base: {
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'all 0.2s ease-in-out',
      },
      sizes: {
        xs: { fontSize: 20, padding: '8px 12px', height: 56, borderRadius: 4 },
        sm: { fontSize: 24, padding: '12px 16px', height: 64, borderRadius: 6 },
        md: { fontSize: 28, padding: '16px 20px', height: 72, borderRadius: 8 },
        lg: { fontSize: 32, padding: '20px 24px', height: 80, borderRadius: 10 },
        xl: { fontSize: 36, padding: '24px 32px', height: 88, borderRadius: 12 },
      },
      variants: {
        outlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 1 },
        filled: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 1 },
        underlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 0, borderBottomWidth: 1 },
      },
      statuses: {
        normal: { color: '#111827', borderColor: '#e5e7eb' },
        error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2' },
        warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
        success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
        disabled: { color: '#9ca3af', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
        loading: { color: '#6b7280', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
      },
      prefix: {
        display: 'flex',
        alignItems: 'center',
        color: '#6b7280',
      },
      suffix: {
        display: 'flex',
        alignItems: 'center',
        color: '#6b7280',
      },
      label: {
        fontSize: 28,
        fontWeight: 500,
        color: '#374151',
        marginBottom: 8,
      },
      helperText: {
        fontSize: 24,
        color: '#6b7280',
        marginTop: 4,
      },
      errorText: {
        fontSize: 24,
        color: '#ef4444',
        marginTop: 4,
      },
      dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 1000,
        maxHeight: 300,
        overflow: 'auto',
      },
      option: {
        padding: '12px 16px',
        fontSize: 28,
        color: '#111827',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
      },
      optionGroup: {
        padding: '8px 16px',
        fontSize: 24,
        fontWeight: 500,
        color: '#6b7280',
        backgroundColor: '#f9fafb',
      },
      tag: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        margin: '2px',
        backgroundColor: '#e5e7eb',
        color: '#374151',
        borderRadius: 4,
        fontSize: 20,
      },
      clearButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
        fontSize: 16,
        cursor: 'pointer',
      },
      searchInput: {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #e5e7eb',
        borderRadius: 4,
        fontSize: 28,
        outline: 'none',
        marginBottom: 8,
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --select-primary-color: #0ea5e9;
        --select-error-color: #ef4444;
        --select-warning-color: #f59e0b;
        --select-success-color: #22c55e;
        --select-text-color: #111827;
        --select-text-color-secondary: #6b7280;
        --select-text-color-disabled: #9ca3af;
        --select-border-color: #e5e7eb;
        --select-border-color-focus: #0ea5e9;
        --select-background-color: #ffffff;
        --select-background-color-disabled: #f9fafb;
        --select-background-color-filled: #f9fafb;
        --select-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
        --select-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes selectDropdownFadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes selectDropdownFadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `;
  }
}

/** 导出样式工具 */
export const selectStyles = SelectStyles;
