import type { CSSProperties } from 'react';
import type { TimePickerSize, TimePickerStatus, TimePickerVariant } from './TimePicker.types';

/**
 * TimePicker 时间选择器样式配置
 * 提供完整的样式定义和工具函数
 */
export class TimePickerStyles {
  /** 尺寸映射 */
  static readonly SIZE_MAP: Record<TimePickerSize, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  /** 基础样式 */
  static getBaseStyle(): CSSProperties {
    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      minWidth: '280px',
      maxWidth: '320px',
      overflow: 'hidden',
    };
  }

  /** 获取尺寸样式 */
  static getSizeStyle(size: TimePickerSize): CSSProperties {
    const height = this.SIZE_MAP[size];
    return {
      height: `${height}px`,
    };
  }

  /** 获取变体样式 */
  static getVariantStyle(variant: TimePickerVariant): CSSProperties {
    switch (variant) {
      case 'outlined':
        return {
          border: '1px solid #d9d9d9',
        };
      case 'filled':
        return {
          border: '1px solid #d9d9d9',
          backgroundColor: '#f5f5f5',
        };
      case 'underlined':
        return {
          border: 'none',
          borderBottom: '1px solid #d9d9d9',
        };
      default:
        return {};
    }
  }

  /** 获取状态样式 */
  static getStatusStyle(status: TimePickerStatus): CSSProperties {
    switch (status) {
      case 'error':
        return {
          borderColor: '#ff4d4f',
        };
      case 'warning':
        return {
          borderColor: '#faad14',
        };
      case 'success':
        return {
          borderColor: '#52c41a',
        };
      case 'disabled':
        return {
          borderColor: '#d9d9d9',
          backgroundColor: '#f5f5f5',
          opacity: 0.7,
        };
      case 'normal':
      default:
        return {};
    }
  }

  /** 输入框样式 */
  static getInputStyle(_size: TimePickerSize, disabled?: boolean): CSSProperties {
    return {
      width: '100%',
      height: '100%',
      padding: '0 12px',
      border: 'none',
      backgroundColor: 'transparent',
      color: disabled ? '#bfbfbf' : '#000000',
      fontSize: '14px',
      outline: 'none',
    };
  }

  /** 时间面板样式 */
  static getPanelStyle(): CSSProperties {
    return {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      zIndex: 1000,
      marginTop: '4px',
    };
  }

  /** 时间列样式 */
  static getColumnStyle(): CSSProperties {
    return {
      flex: 1,
      maxHeight: '200px',
      borderRight: '1px solid #f0f0f0',
    };
  }

  /** 时间列最后一项样式 */
  static getColumnLastStyle(): CSSProperties {
    return {
      borderRight: 'none',
    };
  }

  /** 时间项样式 */
  static getItemStyle(disabled?: boolean, selected?: boolean): CSSProperties {
    return {
      padding: '8px 12px',
      textAlign: 'center',
      backgroundColor: selected ? '#e6f7ff' : 'transparent',
      color: disabled ? '#bfbfbf' : selected ? '#1890ff' : '#000000',
      fontSize: '14px',
    };
  }

  /** 时间项悬停样式 */
  static getItemHoverStyle(disabled?: boolean): CSSProperties {
    if (disabled) return {};
    return {
      backgroundColor: '#f5f5f5',
    };
  }

  /** 后缀图标样式 */
  static getSuffixStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#bfbfbf',
      fontSize: '14px',
      pointerEvents: 'none',
    };
  }

  /** 清除按钮样式 */
  static getClearStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '32px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#bfbfbf',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
    };
  }

  /** 清除按钮悬停样式 */
  static getClearHoverStyle(): CSSProperties {
    return {
      color: '#ff4d4f',
      backgroundColor: '#fff1f0',
    };
  }

  /** 范围选择器样式 */
  static getRangeStyle(): CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    };
  }

  /** 范围分隔符样式 */
  static getRangeSeparatorStyle(): CSSProperties {
    return {
      color: '#bfbfbf',
      fontSize: '14px',
      margin: '0 4px',
    };
  }

  /** 占位符样式 */
  static getPlaceholderStyle(): CSSProperties {
    return {
      color: '#bfbfbf',
      fontSize: '14px',
    };
  }

  /** 禁用样式 */
  static getDisabledStyle(): CSSProperties {
    return {
      backgroundColor: '#f5f5f5',
      opacity: 0.7,
    };
  }

  /** 只读样式 */
  static getReadOnlyStyle(): CSSProperties {
    return {
      backgroundColor: '#f5f5f5',
    };
  }

  /** 加载中样式 */
  static getLoadingStyle(): CSSProperties {
    return {
      position: 'relative',
    };
  }

  /** 加载图标样式 */
  static getLoadingIconStyle(): CSSProperties {
    return {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #1890ff',
      borderRadius: '50%',
    };
  }

  /** 错误提示样式 */
  static getErrorStyle(): CSSProperties {
    return {
      color: '#ff4d4f',
      fontSize: '12px',
      marginTop: '4px',
    };
  }

  /** 帮助文本样式 */
  static getHelperTextStyle(): CSSProperties {
    return {
      color: '#666666',
      fontSize: '12px',
      marginTop: '4px',
    };
  }

  /** 标签样式 */
  static getLabelStyle(): CSSProperties {
    return {
      color: '#333333',
      fontSize: '14px',
      marginBottom: '8px',
      fontWeight: 500,
    };
  }

  /** 动画关键帧 */
  static getAnimations(): Record<string, any> {
    return {
      fadeIn: {
        from: {
          opacity: 0,
          transform: 'translateY(-10px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    };
  }

  /** 获取完整的样式对象 */
  static getStyle(config: {
    size?: TimePickerSize;
    variant?: TimePickerVariant;
    status?: TimePickerStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    style?: CSSProperties;
  }): CSSProperties {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      loading = false,
      style = {},
    } = config;

    return {
      ...this.getBaseStyle(),
      ...this.getSizeStyle(size),
      ...this.getVariantStyle(variant),
      ...this.getStatusStyle(status),
      ...(disabled ? this.getDisabledStyle() : {}),
      ...(readonly ? this.getReadOnlyStyle() : {}),
      ...(loading ? this.getLoadingStyle() : {}),
      ...style,
    };
  }

  /** 获取完整的类名字符串 */
  static getClassName(config: {
    size?: TimePickerSize;
    variant?: TimePickerVariant;
    status?: TimePickerStatus;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    className?: string;
  }): string {
    const {
      size = 'md',
      variant = 'outlined',
      status = 'normal',
      disabled = false,
      readonly = false,
      loading = false,
      className = '',
    } = config;

    const classes = [
      'taro-uno-timepicker',
      `taro-uno-timepicker--${size}`,
      `taro-uno-timepicker--${variant}`,
      `taro-uno-timepicker--${status}`,
    ];

    if (disabled) classes.push('taro-uno-timepicker--disabled');
    if (readonly) classes.push('taro-uno-timepicker--readonly');
    if (loading) classes.push('taro-uno-timepicker--loading');

    if (className) classes.push(className);

    return classes.join(' ');
  }

  /** 格式化时间值 */
  static formatTime(time: { hours?: number; minutes?: number; seconds?: number }, format: string = 'HH:mm:ss'): string {
    const { hours = 0, minutes = 0, seconds = 0 } = time;

    const pad = (num: number): string => num.toString().padStart(2, '0');

    return format
      .replace('HH', pad(hours))
      .replace('mm', pad(minutes))
      .replace('ss', pad(seconds))
      .replace('H', hours.toString())
      .replace('m', minutes.toString())
      .replace('s', seconds.toString());
  }

  /** 解析时间字符串 */
  static parseTime(timeString: string): { hours: number; minutes: number; seconds: number } | null {
    const timeRegex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    const match = timeString.match(timeRegex);

    if (!match) return null;

    const hours = parseInt(match[1]!, 10);
    const minutes = parseInt(match[2]!, 10);
    const seconds = parseInt(match[3]!, 10);

    if (hours > 23 || minutes > 59 || seconds > 59) return null;

    return { hours, minutes, seconds };
  }

  /** 验证时间值 */
  static validateTime(time: { hours?: number; minutes?: number; seconds?: number }): boolean {
    const { hours = 0, minutes = 0, seconds = 0 } = time;

    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
  }

  /** 生成时间选项 */
  static generateTimeOptions(
    type: 'hours' | 'minutes' | 'seconds',
    disabledTime?:
      | (() => number[])
      | ((selectedHour?: number) => number[])
      | ((selectedHour?: number, selectedMinute?: number) => number[]),
  ): Array<{ value: number; label: string; disabled: boolean }> {
    const max = type === 'hours' ? 24 : 60;
    const options: Array<{ value: number; label: string; disabled: boolean }> = [];

    for (let i = 0; i < max; i++) {
      const value = i;
      const label = i.toString().padStart(2, '0');

      let disabled = false;
      if (disabledTime) {
        if (typeof disabledTime === 'function') {
          const disabledValues = disabledTime();
          disabled = disabledValues.includes(value);
        }
      }

      options.push({ value, label, disabled });
    }

    return options;
  }
}

/** 导出样式对象 */
export const timePickerStyles = TimePickerStyles;
