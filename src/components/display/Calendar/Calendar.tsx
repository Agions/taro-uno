import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { View, Text, Button, ITouchEvent } from '@tarojs/components'
import classNames from '@/utils/helpers/classNames'
import {
  CalendarProps,
  CalendarInstance,
  CalendarDate,
  CalendarEvent,
  CalendarCellData,
  CalendarViewType,
} from './types'
import {
  parseDate,
  getCalendarMatrix,
  getCellData,
  getWeekdayNames,
  isSameDay,
  formatDate,
  getEventsForDate,
  getWeekMatrix,
  getDayMatrix,
} from './utils'
import './style.scss'

/**
 * Calendar 日历组件
 */
const Calendar = forwardRef<CalendarInstance, CalendarProps>((props, ref) => {
  const {
    value,
    defaultValue = new Date(),
    selectedValue,
    defaultSelectedValue,
    mode = 'month',
    viewType = 'month',
    selectionMode = 'single',
    events = [],
    showToday = true,
    showExtraDays = true,
    firstDayOfWeek = 0,
    minDate,
    maxDate,
    disabledDate,
    dateRender,
    monthTitleRender,
    weekTitleRender,
    dayTitleRender,
    weekdayRender,
    eventRender,
    className,
    style,
    onChange,
    onSelect,
    onViewTypeChange,
    onModeChange,
    onMonthChange,
    onEventClick,
    onCellClick,
  } = props

  // 当前日期（用于控制日历显示的月份/年份）
  const [currentDate, setCurrentDate] = useState<Date>(parseDate(value || defaultValue))

  // 选中的日期
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (selectedValue) {
      return Array.isArray(selectedValue)
        ? selectedValue.map(date => parseDate(date))
        : [parseDate(selectedValue)]
    }

    if (defaultSelectedValue) {
      return Array.isArray(defaultSelectedValue)
        ? defaultSelectedValue.map(date => parseDate(date))
        : [parseDate(defaultSelectedValue)]
    }

    return []
  })

  // 当前视图类型
  const [currentViewType, setCurrentViewType] = useState<CalendarViewType>(viewType)

  // 引用
  const calendarRef = useRef<any>(null)

  // 更新选中日期（受控模式）
  useEffect(() => {
    if (selectedValue !== undefined) {
      const dates = Array.isArray(selectedValue)
        ? selectedValue.map(date => parseDate(date))
        : [parseDate(selectedValue)]
      setSelectedDates(dates)
    }
  }, [selectedValue])

  // 更新当前日期（受控模式）
  useEffect(() => {
    if (value !== undefined) {
      setCurrentDate(parseDate(value))
    }
  }, [value])

  // 更新视图类型
  useEffect(() => {
    setCurrentViewType(viewType)
  }, [viewType])

  // 当月份变化时触发回调
  useEffect(() => {
    onMonthChange?.(currentDate.getFullYear(), currentDate.getMonth())
  }, [currentDate, onMonthChange])

  // 获取日历矩阵
  const calendarMatrix = useMemo(() => {
    switch (currentViewType) {
      case 'month':
        return getCalendarMatrix(currentDate.getFullYear(), currentDate.getMonth(), firstDayOfWeek)
      case 'week':
        return getWeekMatrix(currentDate, firstDayOfWeek)
      case 'day':
        return getDayMatrix(currentDate)
      default:
        return getCalendarMatrix(currentDate.getFullYear(), currentDate.getMonth(), firstDayOfWeek)
    }
  }, [currentDate, firstDayOfWeek, currentViewType])

  // 获取星期标题
  const weekdayNames = useMemo(() => {
    return getWeekdayNames(firstDayOfWeek)
  }, [firstDayOfWeek])

  // 处理日期选择
  const handleDateSelect = useCallback(
    (date: Date, cellData: CalendarCellData) => {
      if (cellData.isDisabled) {
        return
      }

      // 如果点击的是其他月份的日期，切换到该月
      if (!cellData.isCurrentMonth && currentViewType === 'month') {
        setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1))
      }

      let newSelectedDates: Date[] = []

      // 根据选择模式处理选中状态
      switch (selectionMode) {
        case 'single':
          newSelectedDates = [date]
          break

        case 'multiple': {
          // 如果已经选中，则取消选中
          const isSelected = selectedDates.some(selectedDate => isSameDay(selectedDate, date))
          if (isSelected) {
            newSelectedDates = selectedDates.filter(selectedDate => !isSameDay(selectedDate, date))
          } else {
            newSelectedDates = [...selectedDates, date]
          }
          break
        }

        case 'range':
          if (selectedDates.length === 0 || selectedDates.length === 2) {
            // 开始新的范围选择
            newSelectedDates = [date]
          } else {
            // 完成范围选择
            const startDate = selectedDates[0]
            if (date < startDate) {
              newSelectedDates = [date, startDate]
            } else {
              newSelectedDates = [startDate, date]
            }
          }
          break

        case 'none':
          newSelectedDates = []
          break
      }

      // 如果不是受控模式，更新内部状态
      if (selectedValue === undefined) {
        setSelectedDates(newSelectedDates)
      }

      // 触发选择回调
      onSelect?.(selectionMode === 'single' ? newSelectedDates[0] : newSelectedDates, cellData)

      // 触发单元格点击回调
      onCellClick?.(date, cellData)
    },
    [selectedDates, selectionMode, selectedValue, onSelect, onCellClick, currentViewType]
  )

  // 处理事件点击
  const handleEventClick = useCallback(
    (event: CalendarEvent, date: Date, e: ITouchEvent) => {
      e.stopPropagation()
      onEventClick?.(event, date)
    },
    [onEventClick]
  )

  // 处理视图类型变化
  const handleViewTypeChange = useCallback(
    (type: CalendarViewType) => {
      setCurrentViewType(type)
      onViewTypeChange?.(type)
    },
    [onViewTypeChange]
  )

  // 跳转到今天
  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentDate(today)
    onChange?.(today)
  }, [onChange])

  // 跳转到上个月
  const goToPrevMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() - 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到下个月
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到上一年
  const goToPrevYear = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(prevDate.getFullYear() - 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到下一年
  const goToNextYear = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(prevDate.getFullYear() + 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到上一周
  const goToPrevWeek = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 7)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到下一周
  const goToNextWeek = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 7)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到上一天
  const goToPrevDay = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到下一天
  const goToNextDay = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 1)
      onChange?.(newDate)
      return newDate
    })
  }, [onChange])

  // 跳转到指定日期
  const goToDate = useCallback(
    (date: CalendarDate) => {
      const newDate = parseDate(date)
      setCurrentDate(newDate)
      onChange?.(newDate)
    },
    [onChange]
  )

  // 渲染月份标题
  const renderMonthTitle = useCallback(() => {
    if (monthTitleRender) {
      return monthTitleRender(currentDate)
    }

    return (
      <View className='uno-calendar-header-title'>
        <Text className='uno-calendar-year'>{currentDate.getFullYear()}年</Text>
        <Text className='uno-calendar-month'>{currentDate.getMonth() + 1}月</Text>
      </View>
    )
  }, [currentDate, monthTitleRender])

  // 渲染周视图标题
  const renderWeekTitle = useCallback(() => {
    if (weekTitleRender) {
      return weekTitleRender(currentDate)
    }

    // 获取当前周的第一天和最后一天
    const weekStart = new Date(currentDate)
    const day = currentDate.getDay()
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : firstDayOfWeek) // 调整到周的第一天
    weekStart.setDate(diff)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    return (
      <View className='uno-calendar-header-title'>
        <Text className='uno-calendar-year'>{currentDate.getFullYear()}年</Text>
        <Text className='uno-calendar-week'>
          {weekStart.getMonth() + 1}月{weekStart.getDate()}日 - 
          {weekEnd.getMonth() + 1}月{weekEnd.getDate()}日
        </Text>
      </View>
    )
  }, [currentDate, weekTitleRender, firstDayOfWeek])

  // 渲染日视图标题
  const renderDayTitle = useCallback(() => {
    if (dayTitleRender) {
      return dayTitleRender(currentDate)
    }

    return (
      <View className='uno-calendar-header-title'>
        <Text className='uno-calendar-year'>{currentDate.getFullYear()}年</Text>
        <Text className='uno-calendar-day'>
          {currentDate.getMonth() + 1}月{currentDate.getDate()}日
        </Text>
      </View>
    )
  }, [currentDate, dayTitleRender])

  // 渲染当前视图标题
  const renderCurrentViewTitle = useCallback(() => {
    switch (currentViewType) {
      case 'month':
        return renderMonthTitle()
      case 'week':
        return renderWeekTitle()
      case 'day':
        return renderDayTitle()
      default:
        return renderMonthTitle()
    }
  }, [currentViewType, renderMonthTitle, renderWeekTitle, renderDayTitle])

  // 渲染星期标题
  const renderWeekdays = useCallback(() => {
    if (currentViewType === 'day') {
      return null // 日视图不需要显示星期标题
    }
    
    return (
      <View className='uno-calendar-weekdays'>
        {weekdayNames.map((weekday, index) => (
          <View key={index} className='uno-calendar-weekday'>
            {weekdayRender ? weekdayRender((index + firstDayOfWeek) % 7) : weekday}
          </View>
        ))}
      </View>
    )
  }, [weekdayNames, weekdayRender, firstDayOfWeek, currentViewType])

  // 渲染日期单元格
  const renderCell = useCallback(
    (date: Date) => {
      const cellData = getCellData(
        date,
        currentDate.getMonth(),
        selectedDates,
        minDate,
        maxDate,
        disabledDate
      )

      const dateEvents = getEventsForDate(date, events)

      // 自定义渲染
      if (dateRender) {
        return (
          <View
            className={classNames(
              'uno-calendar-cell',
              cellData.isCurrentMonth && 'uno-calendar-cell-current-month',
              !cellData.isCurrentMonth && showExtraDays && 'uno-calendar-cell-other-month',
              !cellData.isCurrentMonth && !showExtraDays && 'uno-calendar-cell-hidden',
              cellData.isToday && 'uno-calendar-cell-today',
              cellData.isSelected && 'uno-calendar-cell-selected',
              cellData.isDisabled && 'uno-calendar-cell-disabled',
              cellData.isWeekend && 'uno-calendar-cell-weekend',
              dateEvents.length > 0 && 'uno-calendar-cell-with-events',
              currentViewType === 'day' && 'uno-calendar-cell-day-view'
            )}
            onClick={() => handleDateSelect(date, cellData)}
          >
            {dateRender(date, cellData)}
          </View>
        )
      }

      // 默认渲染
      return (
        <View
          className={classNames(
            'uno-calendar-cell',
            cellData.isCurrentMonth && 'uno-calendar-cell-current-month',
            !cellData.isCurrentMonth && showExtraDays && 'uno-calendar-cell-other-month',
            !cellData.isCurrentMonth && !showExtraDays && 'uno-calendar-cell-hidden',
            cellData.isToday && 'uno-calendar-cell-today',
            cellData.isSelected && 'uno-calendar-cell-selected',
            cellData.isDisabled && 'uno-calendar-cell-disabled',
            cellData.isWeekend && 'uno-calendar-cell-weekend',
            dateEvents.length > 0 && 'uno-calendar-cell-with-events',
            currentViewType === 'day' && 'uno-calendar-cell-day-view'
          )}
          onClick={() => handleDateSelect(date, cellData)}
        >
          <View className='uno-calendar-cell-content'>
            <View className='uno-calendar-date'>
              {currentViewType === 'day' ? `${date.getHours()}:00` : date.getDate()}
            </View>

            {dateEvents.length > 0 && (
              <View className='uno-calendar-events'>
                {dateEvents.slice(0, currentViewType === 'day' ? 10 : 3).map((event, index) => (
                  <View
                    key={event.id + '-' + index}
                    className={classNames(
                      'uno-calendar-event',
                      `uno-calendar-event-${event.type || 'default'}`
                    )}
                    onClick={e => handleEventClick(event, date, e)}
                  >
                    {eventRender ? (
                      eventRender(event, date)
                    ) : (
                      <View className='uno-calendar-event-title'>{event.title}</View>
                    )}
                  </View>
                ))}
                {dateEvents.length > (currentViewType === 'day' ? 10 : 3) && (
                  <View className='uno-calendar-more-events'>+{dateEvents.length - (currentViewType === 'day' ? 10 : 3)}</View>
                )}
              </View>
            )}
          </View>
        </View>
      )
    },
    [
      currentDate,
      selectedDates,
      minDate,
      maxDate,
      disabledDate,
      events,
      showExtraDays,
      dateRender,
      eventRender,
      handleDateSelect,
      handleEventClick,
      currentViewType,
    ]
  )

  // 渲染日历内容
  const renderCalendar = useCallback(() => {
    return (
      <View className='uno-calendar-body'>
        {renderWeekdays()}

        <View className='uno-calendar-days'>
          {calendarMatrix.map((week, weekIndex) => (
            <View key={weekIndex} className='uno-calendar-week'>
              {week.map((date, dayIndex) => (
                <React.Fragment key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours ? date.getHours() : 0}`}>
                  {renderCell(date)}
                </React.Fragment>
              ))}
            </View>
          ))}
        </View>
      </View>
    )
  }, [calendarMatrix, renderWeekdays, renderCell])

  // 渲染视图切换按钮
  const renderViewSwitcher = useCallback(() => {
    return (
      <View className='uno-calendar-view-switcher'>
        <Button
          type='default'
          className={classNames(
            'uno-calendar-view-btn',
            currentViewType === 'month' && 'uno-calendar-view-btn-active'
          )}
          onClick={() => handleViewTypeChange('month')}
        >
          月
        </Button>
        <Button
          type='default'
          className={classNames(
            'uno-calendar-view-btn',
            currentViewType === 'week' && 'uno-calendar-view-btn-active'
          )}
          onClick={() => handleViewTypeChange('week')}
        >
          周
        </Button>
        <Button
          type='default'
          className={classNames(
            'uno-calendar-view-btn',
            currentViewType === 'day' && 'uno-calendar-view-btn-active'
          )}
          onClick={() => handleViewTypeChange('day')}
        >
          日
        </Button>
      </View>
    )
  }, [currentViewType, handleViewTypeChange])

  // 渲染导航按钮
  const renderNavigationButtons = useCallback(() => {
    if (currentViewType === 'month') {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-year-btn'
            onClick={goToPrevYear}
          >
            &lt;&lt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-month-btn'
            onClick={goToPrevMonth}
          >
            &lt;
          </Button>
        </>
      )
    } else if (currentViewType === 'week') {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-month-btn'
            onClick={goToPrevMonth}
          >
            &lt;&lt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-week-btn'
            onClick={goToPrevWeek}
          >
            &lt;
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-week-btn'
            onClick={goToPrevWeek}
          >
            &lt;&lt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-prev-day-btn'
            onClick={goToPrevDay}
          >
            &lt;
          </Button>
        </>
      )
    }
  }, [currentViewType, goToPrevYear, goToPrevMonth, goToPrevWeek, goToPrevDay])

  // 渲染导航按钮（下一个）
  const renderNextNavigationButtons = useCallback(() => {
    if (currentViewType === 'month') {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-month-btn'
            onClick={goToNextMonth}
          >
            &gt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-year-btn'
            onClick={goToNextYear}
          >
            &gt;&gt;
          </Button>
        </>
      )
    } else if (currentViewType === 'week') {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-week-btn'
            onClick={goToNextWeek}
          >
            &gt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-month-btn'
            onClick={goToNextMonth}
          >
            &gt;&gt;
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-day-btn'
            onClick={goToNextDay}
          >
            &gt;
          </Button>
          <Button
            type='default'
            className='uno-calendar-btn uno-calendar-next-week-btn'
            onClick={goToNextWeek}
          >
            &gt;&gt;
          </Button>
        </>
      )
    }
  }, [currentViewType, goToNextMonth, goToNextYear, goToNextWeek, goToNextDay])

  // 暴露实例方法
  useImperativeHandle(
    ref,
    () => ({
      getCurrentDate: () => currentDate,
      getSelectedDates: () => selectedDates,
      goToDate,
      goToToday,
      goToPrevMonth,
      goToNextMonth,
      goToPrevYear,
      goToNextYear,
      goToPrevWeek,
      goToNextWeek,
      goToPrevDay,
      goToNextDay,
      setViewType: handleViewTypeChange,
      getCurrentViewType: () => currentViewType,
      addEvent: (event: CalendarEvent) => {
        // 这里只是示例，实际上添加事件应该由外部控制
        console.warn('Calendar is a controlled component, please update events prop instead')
      },
      removeEvent: (eventId: string) => {
        // 这里只是示例，实际上移除事件应该由外部控制
        console.warn('Calendar is a controlled component, please update events prop instead')
      },
      getEvents: () => events,
      getEventsForDate: (date: CalendarDate) => getEventsForDate(parseDate(date), events),
    }),
    [
      currentDate,
      selectedDates,
      events,
      goToDate,
      goToToday,
      goToPrevMonth,
      goToNextMonth,
      goToPrevYear,
      goToNextYear,
      goToPrevWeek,
      goToNextWeek,
      goToPrevDay,
      goToNextDay,
      handleViewTypeChange,
      currentViewType,
    ]
  )

  // 类名
  const cls = classNames(
    'uno-calendar',
    `uno-calendar-mode-${mode}`,
    `uno-calendar-view-${currentViewType}`,
    className
  )

  return (
    <View ref={calendarRef} className={cls} style={style}>
      <View className='uno-calendar-header'>
        <View className='uno-calendar-header-left'>
          {renderNavigationButtons()}
        </View>

        {renderCurrentViewTitle()}

        <View className='uno-calendar-header-right'>
          {renderNextNavigationButtons()}

          {showToday && (
            <Button
              type='default'
              className='uno-calendar-btn uno-calendar-today-btn'
              onClick={goToToday}
            >
              今天
            </Button>
          )}
        </View>
      </View>

      <View className='uno-calendar-toolbar'>
        {renderViewSwitcher()}
      </View>

      {renderCalendar()}
    </View>
  )
})

Calendar.displayName = 'Calendar'

export default Calendar
