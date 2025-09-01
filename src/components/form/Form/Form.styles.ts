import type { FormProps, FormSize, FormLayout, FormLabelAlign, FormStatus, FormStyleConfig } from './Form.types';

/** 样式工具类 */
export class FormStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<
    FormSize,
    { fontSize: number; padding: string; spacing: number; borderRadius: number }
  > = {
    xs: { fontSize: 20, padding: '8px', spacing: 12, borderRadius: 4 },
    sm: { fontSize: 24, padding: '12px', spacing: 16, borderRadius: 6 },
    md: { fontSize: 28, padding: '16px', spacing: 20, borderRadius: 8 },
    lg: { fontSize: 32, padding: '20px', spacing: 24, borderRadius: 10 },
    xl: { fontSize: 36, padding: '24px', spacing: 32, borderRadius: 12 },
  };

  /** 布局映射 */
  static readonly LAYOUT_MAP: Record<FormLayout, { flexDirection: string; alignItems: string; gap: string }> = {
    horizontal: { flexDirection: 'row', alignItems: 'center', gap: '16px' },
    vertical: { flexDirection: 'column', alignItems: 'stretch', gap: '8px' },
    inline: { flexDirection: 'row', alignItems: 'center', gap: '12px' },
  };

  /** 标签对齐映射 */
  static readonly LABEL_ALIGN_MAP: Record<FormLabelAlign, { textAlign: string; justifyContent: string }> = {
    left: { textAlign: 'left', justifyContent: 'flex-start' },
    right: { textAlign: 'right', justifyContent: 'flex-end' },
    top: { textAlign: 'left', justifyContent: 'flex-start' },
  };

  /** 状态颜色映射 */
  static readonly STATUS_COLORS: Record<FormStatus, { color: string; backgroundColor?: string; borderColor?: string }> =
    {
      normal: { color: '#111827', borderColor: '#e5e7eb' },
      error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2' },
      warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
      success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
      loading: { color: '#6b7280', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
    };

  /** 生成表单类名 */
  static getClassName(props: Partial<FormProps>): string {
    const { layout = 'horizontal', size = 'md', className = '' } = props;

    const classes = ['taro-uno-form', `taro-uno-form--${layout}`, `taro-uno-form--${size}`, className].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成表单样式 */
  static getStyle(props: Partial<FormProps>): React.CSSProperties {
    const { layout = 'horizontal', size = 'md', style = {} } = props;

    const layoutStyles = this.LAYOUT_MAP[layout];
    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      flexDirection: layoutStyles.flexDirection as 'row' | 'column',
      alignItems: layoutStyles.alignItems,
      gap: layoutStyles.gap,
      padding: sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      boxSizing: 'border-box',
      width: '100%',
      ...style,
    };
  }

  /** 生成表单项类名 */
  static getItemClassName(props: {
    layout?: FormLayout;
    size?: FormSize;
    hasError?: boolean;
    className?: string;
  }): string {
    const { layout = 'horizontal', size = 'md', hasError = false, className = '' } = props;

    const classes = [
      'taro-uno-form-item',
      `taro-uno-form-item--${layout}`,
      `taro-uno-form-item--${size}`,
      hasError && 'taro-uno-form-item--error',
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }

  /** 生成表单项样式 */
  static getItemStyle(props: {
    layout?: FormLayout;
    size?: FormSize;
    labelWidth?: number | string;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { layout = 'horizontal', size = 'md', labelWidth, style = {} } = props;

    const layoutStyles = this.LAYOUT_MAP[layout];
    const sizeStyles = this.SIZE_MAP[size];

    const baseStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: layoutStyles.flexDirection as 'row' | 'column',
      alignItems: layoutStyles.alignItems,
      gap: layoutStyles.gap,
      marginBottom: sizeStyles.spacing,
      width: '100%',
      boxSizing: 'border-box',
    };

    // 水平布局下的标签宽度
    if (layout === 'horizontal' && labelWidth) {
      baseStyle.flexWrap = 'nowrap';
    }

    return { ...baseStyle, ...style };
  }

  /** 生成表单项标签样式 */
  static getItemLabelStyle(props: {
    layout?: FormLayout;
    size?: FormSize;
    labelAlign?: FormLabelAlign;
    labelWidth?: number | string;
    required?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const {
      layout = 'horizontal',
      size = 'md',
      labelAlign = 'right',
      labelWidth,
      required = false,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const labelAlignStyles = this.LABEL_ALIGN_MAP[labelAlign];

    const baseStyle: React.CSSProperties = {
      fontSize: sizeStyles.fontSize,
      fontWeight: 500,
      color: '#374151',
      textAlign: labelAlignStyles.textAlign as 'left' | 'right' | 'center',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    };

    // 水平布局下的标签宽度
    if (layout === 'horizontal' && labelWidth) {
      baseStyle.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
    }

    // 垂直布局下的间距
    if (layout === 'vertical') {
      baseStyle.marginBottom = '4px';
    }

    return { ...baseStyle, ...style };
  }

  /** 生成表单项内容样式 */
  static getItemContentStyle(props: {
    layout?: FormLayout;
    size?: FormSize;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const { layout = 'horizontal', size = 'md', style = {} } = props;

    const baseStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    };

    // 水平布局下的内容样式
    if (layout === 'horizontal') {
      baseStyle.minWidth = 0;
    }

    return { ...baseStyle, ...style };
  }

  /** 生成表单项辅助文本样式 */
  static getItemHelperTextStyle(props: { size?: FormSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize * 0.85,
      color: '#6b7280',
      marginTop: '4px',
      ...style,
    };
  }

  /** 生成表单项错误文本样式 */
  static getItemErrorTextStyle(props: { size?: FormSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles.fontSize * 0.85,
      color: '#ef4444',
      marginTop: '4px',
      ...style,
    };
  }

  /** 生成必填标记样式 */
  static getRequiredMarkStyle(props: { size?: FormSize; style?: React.CSSProperties }): React.CSSProperties {
    const { size = 'md', style = {} } = props;

    const sizeStyles = this.SIZE_MAP[size];

    return {
      color: '#ef4444',
      fontSize: sizeStyles.fontSize,
      marginLeft: '4px',
      ...style,
    };
  }

  /** 生成表单样式配置 */
  static getStyleConfig(): FormStyleConfig {
    return {
      base: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
      },
      sizes: {
        xs: { fontSize: 20, padding: '8px', spacing: 12, borderRadius: 4 },
        sm: { fontSize: 24, padding: '12px', spacing: 16, borderRadius: 6 },
        md: { fontSize: 28, padding: '16px', spacing: 20, borderRadius: 8 },
        lg: { fontSize: 32, padding: '20px', spacing: 24, borderRadius: 10 },
        xl: { fontSize: 36, padding: '24px', spacing: 32, borderRadius: 12 },
      },
      layouts: {
        horizontal: { flexDirection: 'row', alignItems: 'center', gap: '16px' },
        vertical: { flexDirection: 'column', alignItems: 'stretch', gap: '8px' },
        inline: { flexDirection: 'row', alignItems: 'center', gap: '12px' },
      },
      labelAligns: {
        left: { textAlign: 'left', justifyContent: 'flex-start' },
        right: { textAlign: 'right', justifyContent: 'flex-end' },
        top: { textAlign: 'left', justifyContent: 'flex-start' },
      },
      statuses: {
        normal: { color: '#111827', borderColor: '#e5e7eb' },
        error: { color: '#ef4444', borderColor: '#ef4444', backgroundColor: '#fef2f2' },
        warning: { color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
        success: { color: '#22c55e', borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
        loading: { color: '#6b7280', borderColor: '#e5e7eb', backgroundColor: '#f9fafb' },
      },
      item: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
        width: '100%',
        boxSizing: 'border-box',
      },
      itemLabel: {
        fontSize: 28,
        fontWeight: 500,
        color: '#374151',
        marginBottom: '4px',
        display: 'flex',
        alignItems: 'center',
      },
      itemContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      },
      itemHelperText: {
        fontSize: 24,
        color: '#6b7280',
        marginTop: '4px',
      },
      itemErrorText: {
        fontSize: 24,
        color: '#ef4444',
        marginTop: '4px',
      },
      itemRequiredMark: {
        color: '#ef4444',
        fontSize: 28,
        marginLeft: '4px',
      },
    };
  }

  /** 生成CSS变量 */
  static generateCSSVariables(): string {
    return `
      :root {
        --form-primary-color: #0ea5e9;
        --form-error-color: #ef4444;
        --form-warning-color: #f59e0b;
        --form-success-color: #22c55e;
        --form-text-color: #111827;
        --form-text-color-secondary: #6b7280;
        --form-text-color-disabled: #9ca3af;
        --form-border-color: #e5e7eb;
        --form-border-color-focus: #0ea5e9;
        --form-background-color: #ffffff;
        --form-background-color-disabled: #f9fafb;
        --form-label-color: #374151;
        --form-helper-text-color: #6b7280;
        --form-error-text-color: #ef4444;
        --form-required-mark-color: #ef4444;
        --form-shadow-focus: 0 0 0 3px rgba(14, 165, 233, 0.1);
        --form-animation-duration: 200ms;
      }
    `;
  }

  /** 生成关键帧动画 */
  static generateKeyframes(): string {
    return `
      @keyframes formItemShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes formItemFadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes formItemErrorPulse {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
    `;
  }
}

/** 导出样式工具 */
export const formStyles = FormStyles;
