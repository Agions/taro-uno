import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 日期选择器尺寸 */
export type DatePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 日期选择器变体 */
export type DatePickerVariant = 'outlined' | 'filled' | 'underlined';

/** 日期选择器状态 */
export type DatePickerStatus = 'normal' | 'error' | 'warning' | 'success' | 'disabled';

/** 日期格式 */
export type DatePickerFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY年MM月DD日';

/** 日期范围 */
export interface DateRange {
  start: Date;
  end: Date;
}

/** 日期禁用配置 */
export interface DisabledDate {
  /** 禁用日期函数 */
  disabledDate?: (_date: Date) => boolean;
  /** 禁用时间函数 */
  disabledTime?: (_date: Date) => { disabledHours?: number[]; disabledMinutes?: number[]; disabledSeconds?: number[] };
}

/** 日期选择器原生属性类型 */
export type DatePickerNativeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur' | 'onClick' | 'defaultValue'>;

/** 日期选择器组件属性接口 */
export interface DatePickerProps extends DatePickerNativeProps {
  /** 选中日期 */
  value?: Date | null;
  /** 默认日期 */
  defaultValue?: Date | null;
  /** 日期变化回调 */
  onChange?: (_date: Date | null, dateString: string) => void;
  /** 日期范围选择 */
  range?: boolean;
  /** 日期范围值 */
  valueRange?: DateRange | null;
  /** 默认日期范围 */
  defaultRangeValue?: DateRange | null;
  /** 日期范围变化回调 */
  onRangeChange?: (_range: DateRange | null, dateStrings: [string, string]) => void;
  /** 日期格式 */
  format?: DatePickerFormat;
  /** 占位符 */
  placeholder?: string;
  /** 范围选择占位符 */
  rangePlaceholder?: [string, string];
  /** 禁用日期配置 */
  disabledDate?: DisabledDate['disabledDate'];
  /** 禁用时间配置 */
  disabledTime?: DisabledDate['disabledTime'];
  /** 尺寸 */
  size?: DatePickerSize;
  /** 变体 */
  variant?: DatePickerVariant;
  /** 状态 */
  status?: DatePickerStatus;
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 获取焦点回调 */
  onFocus?: (_event: ITouchEvent) => void;
  /** 失去焦点回调 */
  onBlur?: (_event: ITouchEvent) => void;
  /** 点击回调 */
  onClick?: (_event: ITouchEvent) => void;
  /** 面板打开回调 */
  onOpenChange?: (_open: boolean) => void;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
  /** 显示时间选择 */
  showTime?: boolean;
  /** 时间格式 */
  timeFormat?: string;
  /** 自定义日期单元格渲染 */
  dateRender?: (_currentDate: Date) => ReactNode;
  /** 自定义面板头部渲染 */
  renderExtraFooter?: () => ReactNode;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
}

/** 日期选择器组件引用类型 */
export type DatePickerRef = {
  /** 获取当前值 */
  getValue: () => Date | null;
  /** 设置值 */
  setValue: (_value: Date | null) => void;
  /** 获取范围值 */
  getRangeValue: () => DateRange | null;
  /** 设置范围值 */
  setRangeValue: (_value: DateRange | null) => void;
  /** 获取格式化字符串 */
  getDateString: () => string;
  /** 获取范围格式化字符串 */
  getRangeDateString: () => [string, string] | null;
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
};

/** 日期选择器工具函数接口 */
export interface DatePickerUtils {
  /** 格式化日期 */
  formatDate: (_date: Date, format: DatePickerFormat) => string;
  /** 解析日期字符串 */
  parseDate: (_dateString: string, format: DatePickerFormat) => Date | null;
  /** 日期是否在范围内 */
  isDateInRange: (_date: Date, min?: Date, max?: Date) => boolean;
  /** 日期是否相等 */
  isSameDate: (_date1: Date, date2: Date) => boolean;
  /** 日期是否在同一月 */
  isSameMonth: (_date1: Date, date2: Date) => boolean;
  /** 日期是否在同一年 */
  isSameYear: (_date1: Date, date2: Date) => boolean;
  /** 获取月份天数 */
  getDaysInMonth: (_year: number, month: number) => number;
  /** 获取月份第一天 */
  getFirstDayOfMonth: (_year: number, month: number) => Date;
  /** 获取月份最后一天 */
  getLastDayOfMonth: (_year: number, month: number) => Date;
  /** 获取月份信息 */
  getMonthInfo: (
    year: number,
    month: number,
  ) => {
    firstDay: Date;
    lastDay: Date;
    days: number;
    startDay: number;
  };
  /** 日期加减 */
  addDays: (_date: Date, days: number) => Date;
  /** 月份加减 */
  addMonths: (_date: Date, months: number) => Date;
  /** 年份加减 */
  addYears: (_date: Date, years: number) => Date;
  /** 获取日期范围 */
  getDateRange: (_start: Date, end: Date) => Date[];
  /** 验证日期 */
  isValidDate: (_date: Date) => boolean;
  /** 获取时间戳 */
  getTimestamp: (_date: Date) => number;
  /** 从时间戳创建日期 */
  fromDateTimestamp: (_timestamp: number) => Date;
}

/** 日期选择器样式配置接口 */
export interface DatePickerStyleConfig {
  /** 基础样式 */
  base: React.CSSProperties;
  /** 尺寸样式 */
  sizes: Record<DatePickerSize, React.CSSProperties>;
  /** 变体样式 */
  variants: Record<DatePickerVariant, React.CSSProperties>;
  /** 状态样式 */
  statuses: Record<DatePickerStatus, React.CSSProperties>;
  /** 输入框样式 */
  input: React.CSSProperties;
  /** 输入框尺寸样式 */
  inputSizes: Record<DatePickerSize, React.CSSProperties>;
  /** 面板样式 */
  panel: React.CSSProperties;
  /** 日历样式 */
  calendar: React.CSSProperties;
  /** 日期单元格样式 */
  cell: React.CSSProperties;
  /** 选中日期样式 */
  selectedCell: React.CSSProperties;
  /** 禁用日期样式 */
  disabledCell: React.CSSProperties;
  /** 今日样式 */
  todayCell: React.CSSProperties;
  /** 范围选择样式 */
  rangeCell: React.CSSProperties;
  /** 清除按钮样式 */
  clearButton: React.CSSProperties;
  /** 图标样式 */
  icon: React.CSSProperties;
}

/** 日期选择器上下文接口 */
export interface DatePickerContext {
  /** 当前值 */
  value: Date | null;
  /** 范围值 */
  rangeValue: DateRange | null;
  /** 格式 */
  format: DatePickerFormat;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
  /** 禁用日期函数 */
  disabledDate?: (_date: Date) => boolean;
  /** 工具函数 */
  utils: DatePickerUtils;
  /** 样式配置 */
  styleConfig: DatePickerStyleConfig;
  /** 设置值 */
  setValue: (_value: Date | null) => void;
  /** 设置范围值 */
  setRangeValue: (_value: DateRange | null) => void;
  /** 打开面板 */
  openPanel: () => void;
  /** 关闭面板 */
  closePanel: () => void;
}
