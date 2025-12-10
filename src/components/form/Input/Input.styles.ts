import type { InputProps, InputSize, InputVariant, InputStatus, InputStyleConfig } from './Input.types';

/** 样式工具类 */
export class InputStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    return 'taro-uno-input';
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    InputSize,
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
    InputVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number; borderBottomWidth?: number }
  > = {
    outlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 1 },
    filled: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 1 },
    underlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 0, borderBottomWidth: 1 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    InputStatus,
    { color: string; backgroundColor?: string; borderColor?: string; icon?: string }
  > = {
    normal: { color: '#111827', borderColor: '#e5e7eb' },
    error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2', icon: '❌' },
    warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb', icon: '⚠️' },
    success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4', icon: '✅' },
    disabled: { color: '#9ca3af', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
    loading: { color: '#6b7280', borderColor: '#e5e7eb', backgroundColor: '#f9fafb', icon: '⏳' },
  };

  /** 生成输入框类名 */
  static getClassName(props: Partial<InputProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      bordered = true,
      multiline = false,
      clearable = false,
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
      multiline && `${prefix}--multiline`,
      clearable && `${prefix}--clearable`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成输入框样式 */
  static getStyle(props: Partial<InputProps>): React.CSSProperties {
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
      backgroundColor: statusStyles['backgroundColor'] || variantStyles['backgroundColor'],
      borderColor: statusStyles['borderColor'] || variantStyles['borderColor'],
      borderWidth: variantStyles['borderWidth'],
      color: statusStyles['color'],
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : readonly ? 'default' : 'text',
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
      baseStyle.borderBottomWidth = variantStyles['borderBottomWidth'] || 1;
    }

    return baseStyle;
  }

  /** 生成输入框容器样式 */
  static getContainerStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', block = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: block ? '100%' : 'auto',
      minWidth: sizeStyles['height'] * 3,
      ...style,
    };
  }

  /** 生成输入框包装器样式 */
  static getWrapperStyle(props: Partial<InputProps>): React.CSSProperties {
    const {
      size = 'md',
      status = 'normal',
      disabled = false,
      readonly: _readonly = false,
      bordered = true,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: sizeStyles['height'],
      borderRadius: sizeStyles['borderRadius'],
      border: bordered ? '1px solid' : 'none',
      borderColor: statusStyles['borderColor'],
      backgroundColor: statusStyles['backgroundColor'] || 'transparent',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成前缀样式 */
  static getPrefixStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: sizeStyles['padding'].split(' ')[0],
      paddingRight: sizeStyles['padding'].split(' ')[1],
      height: '100%',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      ...style,
    };
  }

  /** 生成后缀样式 */
  static getSuffixStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: sizeStyles['padding'].split(' ')[1],
      paddingRight: sizeStyles['padding'].split(' ')[0],
      height: '100%',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      ...style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'],
      fontWeight: 500,
      color: disabled ? '#9ca3af' : '#374151',
      marginBottom: 8,
      ...style,
    };
  }

  /** 生成辅助文本样式 */
  static getHelperTextStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', status = 'normal', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: statusStyles['color'],
      marginTop: 4,
      ...style,
    };
  }

  /** 生成错误文本样式 */
  static getErrorTextStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#ef4444',
      marginTop: 4,
      ...style,
    };
  }

  /** 生成计数器样式 */
  static getCounterStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.75,
      color: '#9ca3af',
      textAlign: 'right',
      marginTop: 4,
      ...style,
    };
  }

  /** 生成清除按钮样式 */
  static getClearButtonStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyles['fontSize'] * 1.5,
      height: sizeStyles['fontSize'] * 1.5,
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      color: '#6b7280',
      fontSize: sizeStyles['fontSize'] * 0.8,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成密码切换按钮样式 */
  static getPasswordToggleStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyles['fontSize'] * 1.5,
      height: sizeStyles['fontSize'] * 1.5,
      color: '#6b7280',
      fontSize: sizeStyles['fontSize'],
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      ...style,
    };
  }

  /** 生成多行输入框样式 */
  static getMultilineStyle(props: Partial<InputProps>): React.CSSProperties {
    const { size = 'md', rows = 3, autoHeight = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      minHeight: autoHeight ? sizeStyles['height'] : sizeStyles['height'] * rows,
      maxHeight: autoHeight ? sizeStyles['height'] * 6 : 'none',
      resize: autoHeight ? 'none' : 'vertical',
      paddingTop: sizeStyles['padding'].split(' ')[0],
      paddingBottom: sizeStyles['padding'].split(' ')[0],
      lineHeight: 1.5,
      ...style,
    };
  }

  /** 生成输入框样式配置 */
  static getStyleConfig(): InputStyleConfig {
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
      counter: {
        fontSize: 21,
        color: '#9ca3af',
        textAlign: 'right',
        marginTop: 4,
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
      passwordToggle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        color: '#6b7280',
        fontSize: 20,
        cursor: 'pointer',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --input-primary-color: #0ea5e9;
        --input-error-color: #ef4444;
        --input-warning-color: #f59e0b;
        --input-success-color: #22c55e;
        --input-text-color: #111827;
        --input-text-color-secondary: #6b7280;
        --input-text-color-disabled: #9ca3af;
        --input-border-color: #e5e7eb;
        --input-border-color-focus: #0ea5e9;
        --input-background-color: #ffffff;
        --input-background-color-disabled: #f9fafb;
        --input-background-color-filled: #f9fafb;
        --input-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
        --input-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes inputShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes inputPulse {
        0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); }
        100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
      }
    `;
  }
}

/** 导出样式工具 */
export const inputStyles = InputStyles;
