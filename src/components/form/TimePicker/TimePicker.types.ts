import * as React from 'react';
import type { CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 时间选择器尺寸 */
export type TimePickerSize = 'sm' | 'md' | 'lg';

/** 时间选择器变体 */
export type TimePickerVariant = 'outlined' | 'filled' | 'underlined';

/** 时间选择器状态 */
export type TimePickerStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 时间格式 */
export type TimePickerFormat = 'HH:mm:ss' | 'HH:mm' | 'mm:ss' | 'hh:mm:ss A' | 'hh:mm A';

/** 时间选择器模式 */
export type TimePickerMode = 'time' | 'hour' | 'minute' | 'second';

/** 12小时制周期 */
export type TimePickerPeriod = 'AM' | 'PM';

/** 滚轮方向 */
export type TimePickerWheelDirection = 'horizontal' | 'vertical';

/** 时间单位 */
export type TimeUnit = 'hour' | 'minute' | 'second' | 'period';

/** 时间禁用配置 */
export interface DisabledTime {
  /** 禁用小时 */
  disabledHours?: () => number[];
  /** 禁用分钟 */
  disabledMinutes?: (_selectedHour: number) => number[];
  /** 禁用秒数 */
  disabledSeconds?: (_selectedHour: number, selectedMinute: number) => number[];
}

/** 时间范围 */
export interface TimeRange {
  start: TimeValue;
  end: TimeValue;
}

/** 时间范围值 */
export type TimeRangeValue = TimeRange;

/** 时间禁用函数类型 */
export type DisabledTimeFunction = (_type: 'hours' | 'minutes' | 'seconds', value: number) => boolean;

/** 时间值 */
export interface TimeValue {
  /** 小时 (0-23) */
  hours: number;
  /** 分钟 (0-59) */
  minutes: number;
  /** 秒数 (0-59) */
  seconds: number;
  /** 周期 (12小时制) */
  period?: TimePickerPeriod;
}

/** 时间格式化配置 */
export interface TimeFormatConfig {
  /** 时间格式 */
  format: TimePickerFormat;
  /** 小时制式 */
  hour12?: boolean;
  /** 分隔符 */
  separator?: string;
  /** 显示周期 */
  showPeriod?: boolean;
  /** 补零 */
  padZero?: boolean;
  /** 自定义格式化函数 */
  customFormatter?: (_time: TimeValue) => string;
  /** 自定义解析函数 */
  customParser?: (_text: string) => TimeValue | null;
}

/** 时间选择器组件属性接口 */
export interface TimePickerProps {
  /** 选中时间 */
  value?: TimeValue | null;
  /** 默认时间 */
  defaultValue?: TimeValue | null;
  /** 通用HTML属性 */
  id?: string;
  title?: string;
  /** 时间变化回调 */
  onChange?: (_time: TimeValue | null, timeString: string) => void;
  /** 时间范围选择 */
  range?: boolean;
  /** 时间范围值 */
  valueRange?: TimeRange | null;
  /** 默认时间范围 */
  defaultRangeValue?: TimeRange | null;
  /** 时间范围变化回调 */
  onRangeChange?: (_range: TimeRange | null, timeStrings: [string, string]) => void;
  /** 时间格式配置 */
  formatConfig?: TimeFormatConfig;
  /** 占位符 */
  placeholder?: string;
  /** 范围选择占位符 */
  rangePlaceholder?: [string, string];
  /** 禁用时间配置 */
  disabledTime?: DisabledTime;
  /** 选择器模式 */
  mode?: TimePickerMode;
  /** 尺寸 */
  size?: TimePickerSize;
  /** 变体 */
  variant?: TimePickerVariant;
  /** 状态 */
  status?: TimePickerStatus;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 最小时间 */
  minTime?: TimeValue;
  /** 最大时间 */
  maxTime?: TimeValue;
  /** 小时步进值 */
  hourStep?: number;
  /** 分钟步进值 */
  minuteStep?: number;
  /** 秒数步进值 */
  secondStep?: number;
  /** 滚轮方向 */
  wheelDirection?: TimePickerWheelDirection;
  /** 是否显示当前时间按钮 */
  showNow?: boolean;
  /** 是否显示确认按钮 */
  showConfirm?: boolean;
  /** 自定义时间选项渲染 */
  timeRender?: (_time: TimeValue, type: TimeUnit) => React.ReactNode;
  /** 自定义面板头部渲染 */
  renderExtraFooter?: () => React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 容器样式 */
  containerStyle?: CSSProperties;
  /** 是否块级显示 */
  block?: boolean;
  /** 获取焦点回调 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失去焦点回调 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 点击回调 */
  onClick?: (_event: ITouchEvent) => void;
  /** 面板打开回调 */
  onOpenChange?: (_open: boolean) => void;
  /** 清除回调 */
  onClear?: (_event: ITouchEvent) => void;
  /** 确认回调 */
  onConfirm?: (_time: TimeValue | null, timeString: string) => void;
  /** 当前时间回调 */
  onNow?: (_time: TimeValue, timeString: string) => void;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
  };
  /** 平台特定属性 */
  platform?: {
    weapp?: Record<string, any>;
    alipay?: Record<string, any>;
    h5?: Record<string, any>;
    rn?: Record<string, any>;
  };
  /** 其他属性 */
  [key: string]: any;
}

/** 时间选择器组件引用类型 */
export type TimePickerRef = {
  /** 获取当前值 */
  getValue: () => TimeValue | null;
  /** 设置值 */
  setValue: (_value: TimeValue | null) => void;
  /** 获取范围值 */
  getRangeValue: () => TimeRange | null;
  /** 设置范围值 */
  setRangeValue: (_value: TimeRange | null) => void;
  /** 获取格式化字符串 */
  getTimeString: () => string;
  /** 获取范围格式化字符串 */
  getRangeTimeString: () => [string, string] | null;
  /** 聚焦 */
  focus: () => void;
  /** 失焦 */
  blur: () => void;
  /** 打开面板 */
  open: () => void;
  /** 关闭面板 */
  close: () => void;
  /** 清除值 */
  clear: () => void;
  /** 设置当前时间 */
  setNow: () => void;
  /** 确认选择 */
  confirm: () => void;
  /** 禁用 */
  disable: () => void;
  /** 启用 */
  enable: () => void;
  /** 是否打开 */
  isOpen: () => boolean;
  /** 是否禁用 */
  isDisabled: () => boolean;
  /** 是否只读 */
  isReadOnly: () => boolean;
  /** 获取DOM元素 */
  element: HTMLDivElement | null;
  /** 获取当前时间 */
  getCurrentTime: () => TimeValue;
  /** 验证时间 */
  validateTime: (_time: TimeValue) => boolean;
  /** 格式化时间 */
  formatTime: (_time: TimeValue) => string;
  /** 解析时间字符串 */
  parseTimeString: (_timeString: string) => TimeValue | null;
};

/** 时间选择器工具函数接口 */
export interface TimePickerUtils {
  /** 格式化时间 */
  formatTime: (_time: TimeValue, config: TimeFormatConfig) => string;
  /** 解析时间字符串 */
  parseTime: (_timeString: string, config: TimeFormatConfig) => TimeValue | null;
  /** 时间是否相等 */
  isSameTime: (_time1: TimeValue, time2: TimeValue) => boolean;
  /** 时间是否在范围内 */
  isTimeInRange: (_time: TimeValue, min?: TimeValue, max?: TimeValue) => boolean;
  /** 时间比较 */
  compareTime: (_time1: TimeValue, time2: TimeValue) => number;
  /** 时间加减 */
  addTime: (_time: TimeValue, hours: number, minutes: number, seconds: number) => TimeValue;
  /** 获取当前时间 */
  getCurrentTime: () => TimeValue;
  /** 验证时间 */
  validateTime: (_time: TimeValue) => boolean;
  /** 24小时制转12小时制 */
  convertTo12Hour: (_time24: TimeValue) => TimeValue;
  /** 12小时制转24小时制 */
  convertTo24Hour: (_time12: TimeValue) => TimeValue;
  /** 生成时间选项 */
  generateTimeOptions: (
    unit: TimeUnit,
    min?: TimeValue,
    max?: TimeValue,
    step?: number,
    disabledTime?: DisabledTime,
    selectedTime?: TimeValue
  ) => Array<{ value: number; label: string; disabled: boolean }>;
  /** 计算时间差 */
  getTimeDifference: (_time1: TimeValue, time2: TimeValue) => { hours: number; minutes: number; seconds: number };
  /** 格式化时间差 */
  formatTimeDifference: (_difference: { hours: number; minutes: number; seconds: number }) => string;
}

/** 时间选择器样式配置接口 */
export interface TimePickerStyleConfig {
  /** 基础样式 */
  base: CSSProperties;
  /** 尺寸样式 */
  sizes: Record<TimePickerSize, CSSProperties>;
  /** 变体样式 */
  variants: Record<TimePickerVariant, CSSProperties>;
  /** 状态样式 */
  statuses: Record<TimePickerStatus, CSSProperties>;
  /** 输入框样式 */
  input: CSSProperties;
  /** 输入框尺寸样式 */
  inputSizes: Record<TimePickerSize, CSSProperties>;
  /** 面板样式 */
  panel: CSSProperties;
  /** 时间滚轮样式 */
  wheel: CSSProperties;
  /** 时间选项样式 */
  option: CSSProperties;
  /** 选中选项样式 */
  selectedOption: CSSProperties;
  /** 禁用选项样式 */
  disabledOption: CSSProperties;
  /** 按钮样式 */
  button: CSSProperties;
  /** 确认按钮样式 */
  confirmButton: CSSProperties;
  /** 当前时间按钮样式 */
  nowButton: CSSProperties;
  /** 清除按钮样式 */
  clearButton: CSSProperties;
  /** 图标样式 */
  icon: CSSProperties;
  /** 分隔符样式 */
  separator: CSSProperties;
  /** 容器样式 */
  container: CSSProperties;
  /** 包装器样式 */
  wrapper: CSSProperties;
}

/** 时间选择器上下文接口 */
export interface TimePickerContext {
  /** 当前值 */
  value: TimeValue | null;
  /** 范围值 */
  rangeValue: TimeRange | null;
  /** 格式配置 */
  formatConfig: TimeFormatConfig;
  /** 最小时间 */
  minTime?: TimeValue;
  /** 最大时间 */
  maxTime?: TimeValue;
  /** 禁用时间配置 */
  disabledTime?: DisabledTime;
  /** 选择器模式 */
  mode: TimePickerMode;
  /** 是否范围选择 */
  isRange: boolean;
  /** 工具函数 */
  utils: TimePickerUtils;
  /** 样式配置 */
  styleConfig: TimePickerStyleConfig;
  /** 设置值 */
  setValue: (_value: TimeValue | null) => void;
  /** 设置范围值 */
  setRangeValue: (_value: TimeRange | null) => void;
  /** 打开面板 */
  openPanel: () => void;
  /** 关闭面板 */
  closePanel: () => void;
}

/** 时间选择器事件接口 */
export interface TimePickerEvents {
  /** 时间变化事件 */
  onChange: (_time: TimeValue | null, timeString: string) => void;
  /** 范围时间变化事件 */
  onRangeChange: (_range: TimeRange | null, timeStrings: [string, string]) => void;
  /** 聚焦事件 */
  onFocus: (_event: ITouchEvent) => void;
  /** 失焦事件 */
  onBlur: (_event: ITouchEvent) => void;
  /** 点击事件 */
  onClick: (_event: ITouchEvent) => void;
  /** 面板打开变化事件 */
  onOpenChange: (_open: boolean) => void;
  /** 清除事件 */
  onClear: (_event: ITouchEvent) => void;
  /** 确认事件 */
  onConfirm: (_time: TimeValue | null, timeString: string) => void;
  /** 当前时间事件 */
  onNow: (_time: TimeValue, timeString: string) => void;
}

/** 时间选择器选项配置接口 */
export interface TimePickerOptionConfig {
  /** 小时选项 */
  hours: Array<{ value: number; label: string; disabled: boolean }>;
  /** 分钟选项 */
  minutes: Array<{ value: number; label: string; disabled: boolean }>;
  /** 秒数选项 */
  seconds: Array<{ value: number; label: string; disabled: boolean }>;
  /** 周期选项 */
  periods: Array<{ value: TimePickerPeriod; label: string; disabled: boolean }>;
}