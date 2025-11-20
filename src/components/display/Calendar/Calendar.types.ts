import type { CSSProperties, ReactNode } from 'react';

export interface CalendarDate {
  /** 年份 */
  year: number;
  /** 月份 (1-12) */
  month: number;
  /** 日期 (1-31) */
  day: number;
  /** 是否为当前月 */
  isCurrentMonth?: boolean;
  /** 是否为今天 */
  isToday?: boolean;
  /** 是否被选中 */
  isSelected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 事件数据 */
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  /** 事件ID */
  id: string;
  /** 事件标题 */
  title: string;
  /** 事件描述 */
  description?: string;
  /** 事件类型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 事件颜色 */
  color?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
}

export interface CalendarProps {
  /** 当前选中日期 */
  value?: Date;
  /** 默认日期 */
  defaultValue?: Date;
  /** 显示模式 */
  mode?: 'month' | 'year';
  /** 是否显示今天按钮 */
  showToday?: boolean;
  /** 是否显示事件 */
  showEvents?: boolean;
  /** 事件数据 */
  events?: CalendarEvent[];
  /** 禁用日期函数 */
  disabledDate?: (_date: Date) => boolean;
  /** 自定义日期渲染 */
  dateRender?: (_date: CalendarDate) => ReactNode;
  /** 自定义月份渲染 */
  monthRender?: (_month: number, year: number) => ReactNode;
  /** 日期选择事件 */
  onSelect?: (_date: Date) => void;
  /** 日期变化事件 */
  onChange?: (_date: Date) => void;
  /** 模式变化事件 */
  onModeChange?: (_mode: 'month' | 'year') => void;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 无障碍角色 */
  role?: string;
}

export interface CalendarRef {
  /** DOM 元素 */
  element: any;
  /** 获取当前日期 */
  getCurrentDate: () => Date;
  /** 设置日期 */
  setDate: (_date: Date) => void;
  /** 获取显示模式 */
  getMode: () => 'month' | 'year';
  /** 设置显示模式 */
  setMode: (_mode: 'month' | 'year') => void;
  /** 跳转到今天 */
  goToToday: () => void;
  /** 上一个月/年 */
  goPrev: () => void;
  /** 下一个月/年 */
  goNext: () => void;
}