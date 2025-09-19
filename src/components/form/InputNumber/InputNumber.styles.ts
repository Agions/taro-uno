import { PlatformDetector } from '../../../utils';
import type {
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
  InputNumberStatus,
  InputNumberStyleConfig,
  InputNumberFormatConfig,
} from './InputNumber.types';

/** 样式工具类 */
export class InputNumberStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-input-number`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    InputNumberSize,
    { fontSize: number; padding: string; height: number; borderRadius: number; lineHeight: number }
  > = {
    sm: { fontSize: 24, padding: '8px 12px', height: 64, borderRadius: 6, lineHeight: 1.4 },
    md: { fontSize: 28, padding: '12px 16px', height: 80, borderRadius: 8, lineHeight: 1.5 },
    lg: { fontSize: 32, padding: '16px 20px', height: 96, borderRadius: 10, lineHeight: 1.6 },
  };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    InputNumberVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number; borderBottomWidth?: number }
  > = {
    outlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 1 },
    filled: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 1 },
    underlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 0, borderBottomWidth: 1 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    InputNumberStatus,
    { color: string; backgroundColor?: string; borderColor?: string; icon?: string }
  > = {
    normal: { color: '#111827', borderColor: '#e5e7eb' },
    error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2', icon: '❌' },
    warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb', icon: '⚠️' },
    success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4', icon: '✅' },
    disabled: { color: '#9ca3af', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
  };

  /** 生成输入框类名 */
  static getClassName(props: Partial<InputNumberProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      bordered = true,
      clearable = false,
      controls = false,
      controlsPosition = 'end',
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
      clearable && `${prefix}--clearable`,
      controls && `${prefix}--controls`,
      controls && `${prefix}--controls-${controlsPosition}`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成输入框样式 */
  static getStyle(props: Partial<InputNumberProps> & { style?: React.CSSProperties }): React.CSSProperties {
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
      width: '100%',
      height: sizeStyles['height'],
      fontSize: sizeStyles['fontSize'],
      padding: sizeStyles['padding'],
      lineHeight: sizeStyles['lineHeight'],
      borderRadius: sizeStyles['borderRadius'],
      backgroundColor: statusStyles['backgroundColor'] || variantStyles['backgroundColor'],
      borderColor: statusStyles['borderColor'] || variantStyles['borderColor'],
      borderWidth: variantStyles['borderWidth'],
      color: statusStyles['color'],
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : readonly ? 'default' : 'text',
      transition: 'all 0.2s ease-in-out',
      boxSizing: 'border-box',
      outline: 'none',
      fontFamily: 'inherit',
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
  static getContainerStyle(props: Partial<InputNumberProps> & { block?: boolean; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', block = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: block ? '100%' : 'auto',
      minWidth: sizeStyles['height'] * 2,
      ...style,
    };
  }

  /** 生成输入框包装器样式 */
  static getWrapperStyle(props: Partial<InputNumberProps> & { bordered?: boolean; controls?: boolean; controlsPosition?: 'start' | 'end'; style?: React.CSSProperties }): React.CSSProperties {
    const {
      size = 'md',
      status = 'normal',
      disabled = false,
      bordered = true,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      position: 'relative',
      display: 'flex',
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

  /** 生成控制器样式 */
  static getControlsStyle(props: { size: InputNumberSize; controlsPosition: 'start' | 'end'; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', controlsPosition = 'end', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      top: 0,
      bottom: 0,
      width: sizeStyles['height'] * 0.4,
      backgroundColor: '#f3f4f6',
      border: '1px solid #e5e7eb',
      ...style,
    };

    if (controlsPosition === 'start') {
      baseStyle.left = 0;
      baseStyle.borderTopLeftRadius = sizeStyles['borderRadius'];
      baseStyle.borderBottomLeftRadius = sizeStyles['borderRadius'];
      baseStyle.borderRightWidth = 0;
    } else {
      baseStyle.right = 0;
      baseStyle.borderTopRightRadius = sizeStyles['borderRadius'];
      baseStyle.borderBottomRightRadius = sizeStyles['borderRadius'];
      baseStyle.borderLeftWidth = 0;
    }

    return baseStyle;
  }

  /** 生成控制器按钮样式 */
  static getControlButtonStyle(props: { size: InputNumberSize; direction: 'up' | 'down'; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', direction = 'up', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    const baseStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: sizeStyles['fontSize'] * 0.8,
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      userSelect: 'none',
      ...style,
    };

    if (direction === 'down') {
      baseStyle.borderTopWidth = '1px';
      baseStyle.borderTopStyle = 'solid';
      baseStyle.borderTopColor = '#e5e7eb';
    }

    return baseStyle;
  }

  /** 生成前缀样式 */
  static getPrefixStyle(props: { size: InputNumberSize; disabled: boolean; controls: boolean; controlsPosition: 'start' | 'end'; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', disabled = false, controls = false, controlsPosition = 'start', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    let leftPosition = sizeStyles['padding'].split(' ')[1] || '0px';
    if (controls && controlsPosition === 'start') {
      leftPosition = `${parseInt(leftPosition) + sizeStyles['height'] * 0.4}px`;
    }

    return {
      position: 'absolute',
      top: '50%',
      left: leftPosition,
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      zIndex: 1,
      pointerEvents: 'none',
      ...style,
    };
  }

  /** 生成后缀样式 */
  static getSuffixStyle(props: { size: InputNumberSize; disabled: boolean; controls: boolean; controlsPosition: 'start' | 'end'; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', disabled = false, controls = false, controlsPosition = 'end', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    let rightPosition = sizeStyles['padding'].split(' ')[1] || '0px';
    if (controls && controlsPosition === 'end') {
      rightPosition = `${parseInt(rightPosition) + sizeStyles['height'] * 0.4}px`;
    }

    return {
      position: 'absolute',
      top: '50%',
      right: rightPosition,
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      zIndex: 1,
      pointerEvents: 'none',
      ...style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: { size: InputNumberSize; disabled: boolean; style?: React.CSSProperties }): React.CSSProperties {
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
  static getHelperTextStyle(props: { size: InputNumberSize; status: InputNumberStatus; style?: React.CSSProperties }): React.CSSProperties {
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
  static getErrorTextStyle(props: { size: InputNumberSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['fontSize'] * 0.85,
      color: '#ef4444',
      marginTop: 4,
      ...style,
    };
  }

  /** 生成清除按钮样式 */
  static getClearButtonStyle(props: { size: InputNumberSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'absolute',
      top: '50%',
      right: '8px',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyles['fontSize'] * 1.2,
      height: sizeStyles['fontSize'] * 1.2,
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      color: '#6b7280',
      fontSize: sizeStyles['fontSize'] * 0.8,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      zIndex: 3,
      ...style,
    };
  }

  /** 生成输入框样式配置 */
  static getStyleConfig(): InputNumberStyleConfig {
    return {
      base: {
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'all 0.2s ease-in-out',
        fontFamily: 'inherit',
      },
      sizes: {
        sm: { fontSize: 24, padding: '8px 12px', height: 64, borderRadius: 6, lineHeight: 1.4 },
        md: { fontSize: 28, padding: '12px 16px', height: 80, borderRadius: 8, lineHeight: 1.5 },
        lg: { fontSize: 32, padding: '16px 20px', height: 96, borderRadius: 10, lineHeight: 1.6 },
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
      },
      prefix: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        color: '#6b7280',
        zIndex: 1,
        pointerEvents: 'none',
      },
      suffix: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        color: '#6b7280',
        zIndex: 1,
        pointerEvents: 'none',
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
      controls: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        border: '1px solid #e5e7eb',
      },
      controlButton: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        color: '#6b7280',
        cursor: 'pointer',
        userSelect: 'none',
      },
      clearButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
        fontSize: 16,
        cursor: 'pointer',
        zIndex: 3,
      },
      container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      },
      wrapper: {
        position: 'relative',
        display: 'flex',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --input-number-primary-color: #0ea5e9;
        --input-number-error-color: #ef4444;
        --input-number-warning-color: #f59e0b;
        --input-number-success-color: #22c55e;
        --input-number-text-color: #111827;
        --input-number-text-color-secondary: #6b7280;
        --input-number-text-color-disabled: #9ca3af;
        --input-number-border-color: #e5e7eb;
        --input-number-border-color-focus: #0ea5e9;
        --input-number-background-color: #ffffff;
        --input-number-background-color-disabled: #f9fafb;
        --input-number-background-color-filled: #f9fafb;
        --input-number-controls-background-color: #f3f4f6;
        --input-number-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
        --input-number-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes inputNumberShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes inputNumberPulse {
        0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); }
        100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
      }
    `;
  }

  /** 格式化数字值 */
  static formatValue(value: number | null, config: InputNumberFormatConfig): string {
    if (value === null) return '';

    const {
      type,
      precision = 0,
      thousandsSeparator = ',',
      decimalSeparator = '.',
      currencySymbol = '',
      currencySymbolPosition = 'prefix',
      customFormatter,
    } = config;

    if (customFormatter) {
      return customFormatter(value);
    }

    let formattedValue: string;

    switch (type) {
      case 'currency':
        formattedValue = this.formatCurrency(value, precision, thousandsSeparator, decimalSeparator, currencySymbol, currencySymbolPosition);
        break;
      case 'percent':
        formattedValue = this.formatPercent(value, precision, thousandsSeparator, decimalSeparator);
        break;
      case 'decimal':
        formattedValue = this.formatDecimal(value, precision, thousandsSeparator, decimalSeparator);
        break;
      case 'integer':
        formattedValue = this.formatInteger(value, thousandsSeparator);
        break;
      case 'custom':
      default:
        formattedValue = value.toString();
    }

    return formattedValue;
  }

  /** 格式化货币 */
  private static formatCurrency(
    value: number,
    precision: number,
    thousandsSeparator?: string,
    decimalSeparator?: string,
    currencySymbol?: string,
    position?: 'prefix' | 'suffix'
  ): string {
    const formattedNumber = this.formatDecimal(value, precision, thousandsSeparator, decimalSeparator);
    
    if (position === 'prefix') {
      return `${currencySymbol || ''}${formattedNumber}`;
    } else {
      return `${formattedNumber}${currencySymbol || ''}`;
    }
  }

  /** 格式化百分比 */
  private static formatPercent(value: number, precision: number, thousandsSeparator?: string, decimalSeparator?: string): string {
    const percentValue = value * 100;
    const formattedNumber = this.formatDecimal(percentValue, precision, thousandsSeparator, decimalSeparator);
    return `${formattedNumber}%`;
  }

  /** 格式化小数 */
  private static formatDecimal(value: number, precision: number, thousandsSeparator?: string, decimalSeparator?: string): string {
    const roundedValue = this.roundValue(value, precision);
    const [integerPart, decimalPart] = roundedValue.toString().split('.');

    // 格式化整数部分（添加千分位分隔符）
    const formattedInteger = this.formatInteger(parseFloat(integerPart || '0'), thousandsSeparator || ',');

    if (precision === 0 || !decimalPart) {
      return formattedInteger;
    }

    return `${formattedInteger}${decimalSeparator}${decimalPart.padEnd(precision, '0').slice(0, precision)}`;
  }

  /** 格式化整数 */
  private static formatInteger(value: number, thousandsSeparator?: string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator ?? ',');
  }

  /** 四舍五入到指定精度 */
  static roundValue(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  /** 解析数字值 */
  static parseValue(text: string, config: InputNumberFormatConfig): number | null {
    if (!text.trim()) return null;

    const {
      type,
      precision = 0,
      thousandsSeparator = ',',
      decimalSeparator = '.',
      currencySymbol = '',
      currencySymbolPosition = 'prefix',
      customParser,
    } = config;

    if (customParser) {
      return customParser(text);
    }

    let cleanText = text.trim();

    // 移除货币符号
    if (type === 'currency' && currencySymbol) {
      if (currencySymbolPosition === 'prefix') {
        cleanText = cleanText.replace(new RegExp(`^\\${currencySymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), '');
      } else {
        cleanText = cleanText.replace(new RegExp(`\\${currencySymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '');
      }
    }

    // 移除百分比符号
    if (type === 'percent') {
      cleanText = cleanText.replace(/%$/, '');
    }

    // 移除千分位分隔符
    cleanText = cleanText.replace(new RegExp(`\\${thousandsSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), '');

    // 替换小数点分隔符
    cleanText = cleanText.replace(decimalSeparator, '.');

    const parsedNumber = parseFloat(cleanText);

    if (isNaN(parsedNumber)) {
      return null;
    }

    // 如果是百分比，转换为小数
    if (type === 'percent') {
      return parsedNumber / 100;
    }

    return this.roundValue(parsedNumber, precision);
  }

  /** 限制数字范围 */
  static clampValue(value: number, min?: number, max?: number): number {
    let clampedValue = value;
    
    if (min !== undefined) {
      clampedValue = Math.max(clampedValue, min);
    }
    
    if (max !== undefined) {
      clampedValue = Math.min(clampedValue, max);
    }
    
    return clampedValue;
  }
}

/** 导出样式工具 */
export const inputNumberStyles = InputNumberStyles;