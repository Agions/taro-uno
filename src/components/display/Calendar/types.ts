/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { StandardProps } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components'

/**
 * 日期类型
 */
export type CalendarDate = Date | string | number

/**
 * 日期单元格数据
 */
export interface CalendarCellData {
  /**
   * 日期对象
   */
  date: Date

  /**
   * 是否是当前月份
   */
  isCurrentMonth: boolean

  /**
   * 是否是今天
   */
  isToday: boolean

  /**
   * 是否被选中
   */
  isSelected: boolean

  /**
   * 是否被禁用
   */
  isDisabled: boolean

  /**
   * 是否是周末
   */
  isWeekend: boolean

  /**
   * 自定义数据
   */
  data?: any
}

/**
 * 日历事件
 */
export interface CalendarEvent {
  /**
   * 事件ID
   */
  id: string

  /**
   * 事件标题
   */
  title: string

  /**
   * 开始日期
   */
  start: CalendarDate

  /**
   * 结束日期
   */
  end?: CalendarDate

  /**
   * 事件类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string

  /**
   * 是否全天事件
   */
  allDay?: boolean

  /**
   * 自定义数据
   */
  data?: any
}

/**
 * 日历模式
 */
export type CalendarMode = 'month' | 'week' | 'day'

/**
 * 日历视图类型
 */
export type CalendarViewType = 'month' | 'week' | 'day'

/**
 * 日期选择模式
 */
export type CalendarSelectionMode = 'single' | 'multiple' | 'range' | 'none'

/**
 * 日历组件属性
 */
export interface CalendarProps extends Omit<StandardProps, 'onClick'> {
  /**
   * 当前日期（受控）
   */
  value?: CalendarDate

  /**
   * 默认日期（非受控）
   * @default new Date()
   */
  defaultValue?: CalendarDate

  /**
   * 选中的日期（受控）
   */
  selectedValue?: CalendarDate | CalendarDate[]

  /**
   * 默认选中的日期（非受控）
   */
  defaultSelectedValue?: CalendarDate | CalendarDate[]

  /**
   * 日历模式
   * @default 'month'
   */
  mode?: 'month' | 'year'

  /**
   * 视图类型
   * @default 'month'
   */
  viewType?: CalendarViewType

  /**
   * 选择模式
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple' | 'range' | 'none'

  /**
   * 事件列表
   */
  events?: CalendarEvent[]

  /**
   * 是否显示今天按钮
   * @default true
   */
  showToday?: boolean

  /**
   * 是否显示其他月份的日期
   * @default true
   */
  showExtraDays?: boolean

  /**
   * 一周的第一天（0-6，0表示周日）
   * @default 0
   */
  firstDayOfWeek?: number

  /**
   * 最小可选日期
   */
  minDate?: CalendarDate

  /**
   * 最大可选日期
   */
  maxDate?: CalendarDate

  /**
   * 禁用日期的函数
   */
  disabledDate?: (date: Date) => boolean

  /**
   * 自定义日期单元格渲染
   */
  dateRender?: (date: Date, cellData: CalendarCellData) => React.ReactNode

  /**
   * 自定义月份标题渲染
   */
  monthTitleRender?: (date: Date) => React.ReactNode

  /**
   * 自定义周视图标题渲染
   */
  weekTitleRender?: (date: Date) => React.ReactNode

  /**
   * 自定义日视图标题渲染
   */
  dayTitleRender?: (date: Date) => React.ReactNode

  /**
   * 自定义星期标题渲染
   */
  weekdayRender?: (weekday: number) => React.ReactNode

  /**
   * 自定义事件渲染
   */
  eventRender?: (event: CalendarEvent, date: Date) => React.ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: React.CSSProperties

  /**
   * 日期变化回调
   */
  onChange?: (date: Date) => void

  /**
   * 选择日期回调
   */
  onSelect?: (date: Date | Date[], cellData: CalendarCellData) => void

  /**
   * 视图类型变化回调
   */
  onViewTypeChange?: (viewType: CalendarViewType) => void

  /**
   * 模式变化回调
   */
  onModeChange?: (mode: 'month' | 'year') => void

  /**
   * 月份变化回调
   */
  onMonthChange?: (year: number, month: number) => void

  /**
   * 事件点击回调
   */
  onEventClick?: (event: CalendarEvent, date: Date) => void

  /**
   * 单元格点击回调
   */
  onCellClick?: (date: Date, cellData: CalendarCellData) => void
}

/**
 * 日历实例接口
 */
export interface CalendarInstance {
  /**
   * 获取当前日期
   */
  getCurrentDate: () => Date

  /**
   * 获取选中的日期
   */
  getSelectedDates: () => Date[]

  /**
   * 跳转到指定日期
   */
  goToDate: (date: CalendarDate) => void

  /**
   * 跳转到今天
   */
  goToToday: () => void

  /**
   * 跳转到上个月
   */
  goToPrevMonth: () => void

  /**
   * 跳转到下个月
   */
  goToNextMonth: () => void

  /**
   * 跳转到上一年
   */
  goToPrevYear: () => void

  /**
   * 跳转到下一年
   */
  goToNextYear: () => void

  /**
   * 跳转到上一周
   */
  goToPrevWeek: () => void

  /**
   * 跳转到下一周
   */
  goToNextWeek: () => void

  /**
   * 跳转到前一天
   */
  goToPrevDay: () => void

  /**
   * 跳转到后一天
   */
  goToNextDay: () => void

  /**
   * 设置视图类型
   */
  setViewType: (viewType: CalendarViewType) => void

  /**
   * 获取当前视图类型
   */
  getCurrentViewType: () => CalendarViewType

  /**
   * 添加事件
   */
  addEvent: (event: CalendarEvent) => void

  /**
   * 移除事件
   */
  removeEvent: (eventId: string) => void

  /**
   * 获取所有事件
   */
  getEvents: () => CalendarEvent[]

  /**
   * 获取指定日期的事件
   */
  getEventsForDate: (date: CalendarDate) => CalendarEvent[]
}
