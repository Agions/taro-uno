import type { DatePickerSize, DatePickerVariant, DatePickerStatus } from './DatePicker.types';

/** 日期选择器样式类 */
export class DatePickerStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<DatePickerSize, any> = {
    xs: {
      fontSize: 12,
      padding: 4,
      height: 24,
      borderRadius: 4,
      iconSize: 14,
    },
    sm: {
      fontSize: 14,
      padding: 8,
      height: 32,
      borderRadius: 6,
      iconSize: 16,
    },
    md: {
      fontSize: 16,
      padding: 12,
      height: 40,
      borderRadius: 8,
      iconSize: 18,
    },
    lg: {
      fontSize: 18,
      padding: 16,
      height: 48,
      borderRadius: 10,
      iconSize: 20,
    },
    xl: {
      fontSize: 20,
      padding: 20,
      height: 56,
      borderRadius: 12,
      iconSize: 22,
    },
  };

  /** 颜色映射 */
  static readonly COLOR_MAP = {
    background: '#ffffff',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    borderFocus: '#3b82f6',
    text: '#374151',
    textPlaceholder: '#9ca3af',
    textDisabled: '#9ca3af',
    borderError: '#ef4444',
    borderWarning: '#f59e0b',
    borderSuccess: '#10b981',
    backgroundSelected: '#dbeafe',
    textSelected: '#1d4ed8',
    backgroundToday: '#fef3c7',
    textToday: '#d97706',
    backgroundHover: '#f3f4f6',
    backgroundDisabled: '#f9fafb',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    shadowFocus: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  };

  /** 生成日期选择器样式 */
  static getStyle(props: {
    size?: DatePickerSize;
    variant?: DatePickerVariant;
    status?: DatePickerStatus;
    disabled?: boolean;
    readOnly?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readOnly = false,
      style = {},
    } = props;

    const sizeStyles = this.SIZE_MAP[size];
    const isDisabled = disabled || readOnly;

    let borderColor = this.COLOR_MAP.border;
    if (status === 'error') borderColor = this.COLOR_MAP.borderError;
    if (status === 'warning') borderColor = this.COLOR_MAP.borderWarning;
    if (status === 'success') borderColor = this.COLOR_MAP.borderSuccess;

    let backgroundColor = this.COLOR_MAP.background;
    if (isDisabled) backgroundColor = this.COLOR_MAP.backgroundDisabled;

    return {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      minWidth: 200,
      backgroundColor,
      border: variant === 'outlined' ? `1px solid ${borderColor}` : 'none',
      borderRadius: sizeStyles['borderRadius'],
      boxShadow: this.COLOR_MAP.shadow,
      transition: 'all 0.2s ease',
      opacity: isDisabled ? 0.6 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      ...style,
    };
  }

  /** 生成日期选择器类名 */
  static getClassName(props: {
    size?: DatePickerSize;
    variant?: DatePickerVariant;
    status?: DatePickerStatus;
    disabled?: boolean;
    readOnly?: boolean;
    opened?: boolean;
    focused?: boolean;
    className?: string;
  }): string {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readOnly = false,
      opened = false,
      focused = false,
      className = '',
    } = props;

    const baseClass = 'taro-uno-datepicker';
    const sizeClass = `taro-uno-datepicker--${size}`;
    const variantClass = `taro-uno-datepicker--${variant}`;
    const statusClass = status !== 'normal' ? `taro-uno-datepicker--${status}` : '';
    const disabledClass = disabled || readOnly ? 'taro-uno-datepicker--disabled' : '';
    const openedClass = opened ? 'taro-uno-datepicker--opened' : '';
    const focusedClass = focused ? 'taro-uno-datepicker--focused' : '';

    return [baseClass, sizeClass, variantClass, statusClass, disabledClass, openedClass, focusedClass, className]
      .filter(Boolean)
      .join(' ');
  }

  /** 生成输入框包装器样式 */
  static getInputWrapperStyle(props: { size?: DatePickerSize; focused?: boolean }): React.CSSProperties {
    const { size = 'md', focused = false } = props;
    const sizeStyles = this.SIZE_MAP[size];

    return {
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${sizeStyles['padding']}px`,
      height: sizeStyles['height'],
      borderRadius: sizeStyles['borderRadius'],
      border: focused ? `2px solid ${this.COLOR_MAP.borderFocus}` : 'none',
      backgroundColor: 'transparent',
      transition: 'all 0.2s ease',
      boxShadow: focused ? this.COLOR_MAP.shadowFocus : 'none',
    };
  }

  /** 生成输入框样式 */
  static getInputStyle(props: { size?: DatePickerSize; disabled?: boolean }): React.CSSProperties {
    const { size = 'md', disabled = false } = props;
    const sizeStyles = this.SIZE_MAP[size];

    return {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontSize: sizeStyles['fontSize'],
      color: disabled ? this.COLOR_MAP.textDisabled : this.COLOR_MAP.text,
      backgroundColor: 'transparent',
      cursor: disabled ? 'not-allowed' : 'text',
    };
  }

  /** 生成范围输入框样式 */
  static getRangeInputsStyle(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      gap: 8,
    };
  }

  /** 生成范围分隔符样式 */
  static getRangeSeparatorStyle(): React.CSSProperties {
    return {
      color: this.COLOR_MAP.textPlaceholder,
      fontSize: 14,
      fontWeight: 500,
    };
  }

  /** 生成清除按钮样式 */
  static getClearButtonStyle(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: this.COLOR_MAP.textPlaceholder,
      color: this.COLOR_MAP.background,
      fontSize: 12,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginLeft: 8,
    };
  }

  /** 生成日历图标样式 */
  static getCalendarIconStyle(props: { size?: DatePickerSize }): React.CSSProperties {
    const { size = 'md' } = props;
    const sizeStyles = this.SIZE_MAP[size];

    return {
      fontSize: sizeStyles['iconSize'],
      color: this.COLOR_MAP.textPlaceholder,
      marginLeft: 8,
    };
  }

  /** 生成面板样式 */
  static getPanelStyle(): React.CSSProperties {
    return {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: this.COLOR_MAP.background,
      border: `1px solid ${this.COLOR_MAP.border}`,
      borderRadius: 8,
      boxShadow: this.COLOR_MAP.shadow,
      zIndex: 1000,
      maxHeight: 400,
      overflow: 'hidden',
    };
  }

  /** 生成面板内容样式 */
  static getPanelContentStyle(): React.CSSProperties {
    return {
      maxHeight: 400,
      overflow: 'auto',
    };
  }

  /** 生成日历样式 */
  static getCalendarStyle(): React.CSSProperties {
    return {
      padding: 16,
    };
  }

  /** 生成日历头部样式 */
  static getCalendarHeaderStyle(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      padding: '0 8px',
    };
  }

  /** 生成日历导航样式 */
  static getCalendarNavStyle(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 6,
      backgroundColor: this.COLOR_MAP.backgroundHover,
      color: this.COLOR_MAP.text,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: 16,
      fontWeight: 'bold',
    };
  }

  /** 生成日历标题样式 */
  static getCalendarTitleStyle(): React.CSSProperties {
    return {
      fontSize: 16,
      fontWeight: 600,
      color: this.COLOR_MAP.text,
    };
  }

  /** 生成星期标题样式 */
  static getWeekHeadersStyle(): React.CSSProperties {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 4,
      marginBottom: 8,
    };
  }

  /** 生成星期样式 */
  static getWeekdayStyle(): React.CSSProperties {
    return {
      textAlign: 'center' as const,
      fontSize: 12,
      fontWeight: 600,
      color: this.COLOR_MAP.textPlaceholder,
      padding: 8,
    };
  }

  /** 生成日期网格样式 */
  static getDaysStyle(): React.CSSProperties {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 4,
    };
  }

  /** 生成日期单元格样式 */
  static getCellStyle(props: {
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isHovered?: boolean;
  }): React.CSSProperties {
    const { isCurrentMonth = true, isToday = false, isSelected = false, isDisabled = false, isHovered = false } = props;

    let backgroundColor = 'transparent';
    let color = isCurrentMonth ? this.COLOR_MAP.text : this.COLOR_MAP.textPlaceholder;
    const cursor = isDisabled ? 'not-allowed' : 'pointer';

    if (isToday && !isSelected) {
      backgroundColor = this.COLOR_MAP.backgroundToday;
      color = this.COLOR_MAP.textToday;
    }

    if (isSelected) {
      backgroundColor = this.COLOR_MAP.backgroundSelected;
      color = this.COLOR_MAP.textSelected;
    }

    if (isHovered && !isDisabled && !isSelected) {
      backgroundColor = this.COLOR_MAP.backgroundHover;
    }

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      backgroundColor,
      color,
      cursor,
      transition: 'all 0.2s ease',
      userSelect: 'none' as const,
    };
  }

  /** 生成空单元格样式 */
  static getEmptyCellStyle(): React.CSSProperties {
    return {
      height: 36,
      visibility: 'hidden',
    };
  }

  /** 生成日历底部样式 */
  static getCalendarFooterStyle(): React.CSSProperties {
    return {
      borderTop: `1px solid ${this.COLOR_MAP.border}`,
      paddingTop: 16,
      marginTop: 16,
    };
  }
}

/** 导出日期选择器样式 */
export const datePickerStyles = new DatePickerStyles();
