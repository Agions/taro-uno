import { PlatformDetector } from '../../../utils';
import type {
  TextareaProps,
  TextareaSize,
  TextareaVariant,
  TextareaStatus,
  TextareaStyleConfig,
} from './Textarea.types';

/** 样式工具类 */
export class TextareaStyles {
  /** 获取平台前缀 */
  private static getPlatformPrefix(): string {
    const platform = PlatformDetector.getPlatform();
    return `taro-uno-${platform}-textarea`;
  }

  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    TextareaSize,
    { fontSize: number; padding: string; minHeight: number; borderRadius: number; lineHeight: number }
  > = {
    sm: { fontSize: 24, padding: '8px 12px', minHeight: 80, borderRadius: 6, lineHeight: 1.4 },
    md: { fontSize: 28, padding: '12px 16px', minHeight: 96, borderRadius: 8, lineHeight: 1.5 },
    lg: { fontSize: 32, padding: '16px 20px', minHeight: 112, borderRadius: 10, lineHeight: 1.6 },
  };

  /** 变体样式映射 */
  static readonly VARIANT_STYLES: Record<
    TextareaVariant,
    { backgroundColor: string; borderColor: string; borderWidth: number; borderBottomWidth?: number }
  > = {
    outlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 1 },
    filled: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 1 },
    underlined: { backgroundColor: 'transparent', borderColor: '#e5e7eb', borderWidth: 0, borderBottomWidth: 1 },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<
    TextareaStatus,
    { color: string; backgroundColor?: string; borderColor?: string; icon?: string }
  > = {
    normal: { color: '#111827', borderColor: '#e5e7eb' },
    error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2', icon: '❌' },
    warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb', icon: '⚠️' },
    success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4', icon: '✅' },
    disabled: { color: '#9ca3af', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
  };

  /** 生成文本域类名 */
  static getClassName(props: Partial<TextareaProps>): string {
    const prefix = this.getPlatformPrefix();
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      bordered = true,
      clearable = false,
      autoHeight = false,
      showCount = false,
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
      autoHeight && `${prefix}--auto-height`,
      showCount && `${prefix}--show-count`,
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成文本域样式 */
  static getStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      resize = 'vertical',
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const variantStyles = this.VARIANT_STYLES[variant];
    const statusStyles = this.STATUS_COLORS[status];

    const baseStyle: React.CSSProperties = {
      width: '100%',
      minHeight: sizeStyles['minHeight'],
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
      resize:
        disabled || readonly || resize === 'none' ? 'none' : (resize as 'none' | 'both' | 'horizontal' | 'vertical'),
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

  /** 生成文本域容器样式 */
  static getContainerStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const { size = 'md', block = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: block ? '100%' : 'auto',
      minWidth: sizeStyles['minHeight'] * 2,
      ...style,
    };
  }

  /** 生成文本域包装器样式 */
  static getWrapperStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const {
      size = 'md',
      status = 'normal',
      disabled = false,
      bordered = true,
      autoHeight = false,
      rows = 3,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const statusStyles = this.STATUS_COLORS[status];

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: autoHeight ? sizeStyles['minHeight'] : sizeStyles['minHeight'] * rows,
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
  static getPrefixStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'absolute',
      top: sizeStyles['padding'].split(' ')[0],
      left: sizeStyles['padding'].split(' ')[1],
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      zIndex: 1,
      pointerEvents: 'none',
      ...style,
    };
  }

  /** 生成后缀样式 */
  static getSuffixStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const { size = 'md', disabled = false, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'absolute',
      top: sizeStyles['padding'].split(' ')[0],
      right: sizeStyles['padding'].split(' ')[1],
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      color: disabled ? '#9ca3af' : '#6b7280',
      fontSize: sizeStyles['fontSize'],
      zIndex: 1,
      pointerEvents: 'none',
      ...style,
    };
  }

  /** 生成标签样式 */
  static getLabelStyle(props: Partial<TextareaProps>): React.CSSProperties {
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
  static getHelperTextStyle(props: Partial<TextareaProps>): React.CSSProperties {
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
  static getErrorTextStyle(props: Partial<TextareaProps>): React.CSSProperties {
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
  static getCounterStyle(
    props: Partial<TextareaProps> & { position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' },
  ): React.CSSProperties {
    const { size = 'md', position = 'bottom-right', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      fontSize: sizeStyles['fontSize'] * 0.75,
      color: '#9ca3af',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 6px',
      borderRadius: 4,
      zIndex: 2,
      ...style,
    };

    // 根据位置设置样式
    switch (position) {
      case 'top-right':
        return {
          ...baseStyle,
          top: '4px',
          right: '4px',
        };
      case 'bottom-right':
        return {
          ...baseStyle,
          bottom: '4px',
          right: '4px',
        };
      case 'top-left':
        return {
          ...baseStyle,
          top: '4px',
          left: '4px',
        };
      case 'bottom-left':
        return {
          ...baseStyle,
          bottom: '4px',
          left: '4px',
        };
      default:
        return baseStyle;
    }
  }

  /** 生成清除按钮样式 */
  static getClearButtonStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      position: 'absolute',
      top: '8px',
      right: '8px',
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

  /** 生成自动调整高度样式 */
  static getAutoHeightStyle(props: Partial<TextareaProps>): React.CSSProperties {
    const { size = 'md', minRows = 1, maxRows = 10, style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const lineHeight = sizeStyles['fontSize'] * sizeStyles['lineHeight'];
    const paddingTop = parseInt(String(sizeStyles['padding'] || '0px').split(' ')[0] || '0');
    const paddingBottom = parseInt(String(sizeStyles['padding'] || '0px').split(' ')[0] || '0');
    const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

    return {
      minHeight,
      maxHeight,
      overflowY: 'auto',
      resize: 'none',
      ...style,
    };
  }

  /** 生成文本域样式配置 */
  static getStyleConfig(): TextareaStyleConfig {
    return {
      base: {
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'all 0.2s ease-in-out',
        fontFamily: 'inherit',
      },
      sizes: {
        sm: { fontSize: 24, padding: '8px 12px', minHeight: 80, borderRadius: 6, lineHeight: 1.4 },
        md: { fontSize: 28, padding: '12px 16px', minHeight: 96, borderRadius: 8, lineHeight: 1.5 },
        lg: { fontSize: 32, padding: '16px 20px', minHeight: 112, borderRadius: 10, lineHeight: 1.6 },
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
        alignItems: 'flex-start',
        color: '#6b7280',
        zIndex: 1,
        pointerEvents: 'none',
      },
      suffix: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-start',
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
      counter: {
        fontSize: 21,
        color: '#9ca3af',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 6px',
        borderRadius: 4,
        zIndex: 2,
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
        flexDirection: 'column',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --textarea-primary-color: #0ea5e9;
        --textarea-error-color: #ef4444;
        --textarea-warning-color: #f59e0b;
        --textarea-success-color: #22c55e;
        --textarea-text-color: #111827;
        --textarea-text-color-secondary: #6b7280;
        --textarea-text-color-disabled: #9ca3af;
        --textarea-border-color: #e5e7eb;
        --textarea-border-color-focus: #0ea5e9;
        --textarea-background-color: #ffffff;
        --textarea-background-color-disabled: #f9fafb;
        --textarea-background-color-filled: #f9fafb;
        --textarea-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
        --textarea-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes textareaShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes textareaPulse {
        0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); }
        100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
      }
    `;
  }

  /** 调整文本域高度的实用方法 */
  static adjustTextareaHeight(
    element: HTMLTextAreaElement,
    strategy: 'content' | 'rows' | 'max-rows' = 'content',
    rows?: number,
    minRows?: number,
    maxRows?: number,
  ): void {
    if (!element) return;

    // 保存滚动位置
    const scrollTop = element.scrollTop;

    // 重置高度以获取准确的scrollHeight
    element.style.height = 'auto';

    // 根据策略调整高度
    switch (strategy) {
      case 'content':
        element.style.height = `${element.scrollHeight}px`;
        break;
      case 'rows':
        if (rows) {
          const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
          element.style.height = `${lineHeight * rows}px`;
        }
        break;
      case 'max-rows':
        if (maxRows) {
          const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
          const maxHeight = lineHeight * maxRows;
          if (element.scrollHeight > maxHeight) {
            element.style.height = `${maxHeight}px`;
            element.style.overflowY = 'auto';
          } else {
            element.style.height = `${element.scrollHeight}px`;
            element.style.overflowY = 'hidden';
          }
        }
        break;
    }

    // 应用最小和最大高度限制
    if (minRows) {
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const minHeight = lineHeight * minRows;
      if (element.scrollHeight < minHeight) {
        element.style.height = `${minHeight}px`;
      }
    }

    // 恢复滚动位置
    element.scrollTop = scrollTop;
  }

  /** 计算文本域高度 */
  static calculateTextareaHeight(
    value: string,
    fontSize: number,
    lineHeight: number,
    padding: string,
    rows?: number,
    minRows?: number,
    maxRows?: number,
  ): number {
    const paddingTop = parseInt(String(padding || '0px').split(' ')[0] || '0');
    const paddingBottom = parseInt(String(padding || '0px').split(' ')[0] || '0');
    const lineHeightPx = fontSize * lineHeight;

    // 计算内容行数
    const lines = value.split('\n').length;
    const contentHeight = lines * lineHeightPx;

    // 计算总高度
    let totalHeight = contentHeight + paddingTop + paddingBottom;

    // 应用最小行数限制
    if (minRows) {
      const minHeight = minRows * lineHeightPx + paddingTop + paddingBottom;
      totalHeight = Math.max(totalHeight, minHeight);
    }

    // 应用最大行数限制
    if (maxRows) {
      const maxHeight = maxRows * lineHeightPx + paddingTop + paddingBottom;
      totalHeight = Math.min(totalHeight, maxHeight);
    }

    // 应用固定行数
    if (rows) {
      totalHeight = rows * lineHeightPx + paddingTop + paddingBottom;
    }

    return totalHeight;
  }
}

/** 导出样式工具 */
export const textareaStyles = TextareaStyles;
