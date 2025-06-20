import { CalendarDate, CalendarEvent, CalendarCellData } from './types'

/**
 * 将日期类型统一转换为Date对象
 */
export const parseDate = (date: CalendarDate): Date => {
  if (date instanceof Date) {
    return date
  }

  if (typeof date === 'string' || typeof date === 'number') {
    return new Date(date)
  }

  return new Date()
}

/**
 * 获取月份的天数
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * 获取月份第一天是星期几
 * @returns 0-6，0表示星期日
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

/**
 * 获取两个日期是否是同一天
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * 获取两个日期是否是同一月
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

/**
 * 判断日期是否是今天
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

/**
 * 判断日期是否是周末
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay()
  return day === 0 || day === 6
}

/**
 * 判断日期是否在指定范围内
 */
export const isDateInRange = (
  date: Date,
  minDate?: CalendarDate,
  maxDate?: CalendarDate
): boolean => {
  if (!minDate && !maxDate) {
    return true
  }

  const currentTime = date.getTime()

  if (minDate && maxDate) {
    const min = parseDate(minDate).getTime()
    const max = parseDate(maxDate).getTime()
    return currentTime >= min && currentTime <= max
  }

  if (minDate) {
    return currentTime >= parseDate(minDate).getTime()
  }

  if (maxDate) {
    return currentTime <= parseDate(maxDate).getTime()
  }

  return true
}

/**
 * 判断日期是否被禁用
 */
export const isDateDisabled = (
  date: Date,
  minDate?: CalendarDate,
  maxDate?: CalendarDate,
  disabledDate?: (date: Date) => boolean
): boolean => {
  if (disabledDate && disabledDate(date)) {
    return true
  }

  return !isDateInRange(date, minDate, maxDate)
}

/**
 * 获取日历矩阵（6行7列的日期数组）
 * @param year 年份
 * @param month 月份（0-11）
 * @param firstDayOfWeek 每周第一天（0表示周日，1表示周一）
 */
export const getCalendarMatrix = (year: number, month: number, firstDayOfWeek = 0): Date[][] => {
  const daysInMonth = getDaysInMonth(year, month)
  let firstDay = getFirstDayOfMonth(year, month)

  // 调整第一天的索引，以适应不同的每周第一天设置
  firstDay = (firstDay - firstDayOfWeek + 7) % 7

  const matrix: Date[][] = []
  let week: Date[] = []
  let day = 1

  // 上个月的尾巴
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

  for (let i = 0; i < firstDay; i++) {
    week.push(new Date(prevYear, prevMonth, daysInPrevMonth - firstDay + i + 1))
  }

  // 当前月
  while (day <= daysInMonth) {
    week.push(new Date(year, month, day))
    day++

    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
  }

  // 下个月的开头
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  let nextDay = 1

  while (week.length < 7) {
    week.push(new Date(nextYear, nextMonth, nextDay))
    nextDay++
  }

  if (week.length > 0) {
    matrix.push(week)
  }

  // 确保总是显示6行
  while (matrix.length < 6) {
    const lastWeek = matrix[matrix.length - 1]
    const lastDate = lastWeek[6]
    const nextWeek: Date[] = []

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(lastDate)
      nextDate.setDate(lastDate.getDate() + i + 1)
      nextWeek.push(nextDate)
    }

    matrix.push(nextWeek)
  }

  return matrix
}

/**
 * 获取日期单元格数据
 */
export const getCellData = (
  date: Date,
  currentMonth: number,
  selectedDates: Date[],
  minDate?: CalendarDate,
  maxDate?: CalendarDate,
  disabledDate?: (date: Date) => boolean
): CalendarCellData => {
  return {
    date,
    isCurrentMonth: date.getMonth() === currentMonth,
    isToday: isToday(date),
    isSelected: selectedDates.some(selectedDate => isSameDay(selectedDate, date)),
    isDisabled: isDateDisabled(date, minDate, maxDate, disabledDate),
    isWeekend: isWeekend(date),
  }
}

/**
 * 获取周标题
 */
export const getWeekdayNames = (firstDayOfWeek = 0): string[] => {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const result: string[] = []

  for (let i = 0; i < 7; i++) {
    const index = (i + firstDayOfWeek) % 7
    result.push(weekdays[index])
  }

  return result
}

/**
 * 格式化日期
 */
export const formatDate = (date: CalendarDate, format = 'YYYY-MM-DD'): string => {
  const d = parseDate(date)

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()

  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`
  }

  return format
    .replace(/YYYY/g, `${year}`)
    .replace(/YY/g, `${year}`.slice(-2))
    .replace(/MM/g, padZero(month))
    .replace(/M/g, `${month}`)
    .replace(/DD/g, padZero(day))
    .replace(/D/g, `${day}`)
    .replace(/HH/g, padZero(hours))
    .replace(/H/g, `${hours}`)
    .replace(/hh/g, padZero(hours % 12 || 12))
    .replace(/h/g, `${hours % 12 || 12}`)
    .replace(/mm/g, padZero(minutes))
    .replace(/m/g, `${minutes}`)
    .replace(/ss/g, padZero(seconds))
    .replace(/s/g, `${seconds}`)
}

/**
 * 获取指定日期的事件
 */
export const getEventsForDate = (date: Date, events: CalendarEvent[] = []): CalendarEvent[] => {
  return events.filter(event => {
    const startDate = parseDate(event.start)
    const endDate = event.end ? parseDate(event.end) : startDate

    // 检查日期是否在事件的开始和结束日期之间
    return (
      (isSameDay(date, startDate) || date >= startDate) &&
      (isSameDay(date, endDate) || date <= endDate)
    )
  })
}

/**
 * 获取周视图的日期矩阵
 * @param date 基准日期
 * @param firstDayOfWeek 一周的第一天（0-6，0表示周日）
 * @returns 周视图日期矩阵
 */
export function getWeekMatrix(date: Date, firstDayOfWeek: number = 0): Date[][] {
  const result: Date[][] = []
  const week: Date[] = []
  
  // 获取当前周的第一天
  const currentDate = new Date(date)
  const day = currentDate.getDay()
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : firstDayOfWeek) // 调整到周的第一天
  currentDate.setDate(diff)
  
  // 生成一周的日期
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(currentDate)
    weekDate.setDate(currentDate.getDate() + i)
    week.push(weekDate)
  }
  
  result.push(week)
  return result
}

/**
 * 获取日视图的小时矩阵
 * @param date 基准日期
 * @returns 日视图小时矩阵
 */
export function getDayMatrix(date: Date): Date[][] {
  const result: Date[][] = []
  const day: Date[] = []
  
  // 创建基准日期的副本
  const baseDate = new Date(date)
  // 设置时分秒为0
  baseDate.setHours(0, 0, 0, 0)
  
  // 生成24小时的时间点
  for (let hour = 0; hour < 24; hour++) {
    const hourDate = new Date(baseDate)
    hourDate.setHours(hour)
    day.push(hourDate)
  }
  
  // 按照每行4个小时分组
  for (let i = 0; i < day.length; i += 4) {
    result.push(day.slice(i, i + 4))
  }
  
  return result
}
