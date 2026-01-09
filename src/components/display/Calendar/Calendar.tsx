import { forwardRef, useImperativeHandle, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { calendarStyles } from './Calendar.styles';
import type { CalendarProps, CalendarRef, CalendarDate } from './Calendar.types';
import { useThemeContext as useTheme } from '../../../providers/ThemeProvider';

/** 日历组件 */
export const CalendarComponent = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
  const {
    value,
    defaultValue,
    mode = 'month',
    showToday = true,
    showEvents = false,
    events = [],
    disabledDate,
    dateRender,
    monthRender,
    onSelect,
    onChange,
    onModeChange,
    style,
    className,
    ariaLabel,
    role = 'grid',
    ...rest
  } = props;

  const { isDark } = useTheme();

  const [currentDate, setCurrentDate] = useState(value || defaultValue || new Date());
  const [currentMode, setCurrentMode] = useState(mode);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const elementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    getCurrentDate: () => currentDate,
    setDate: (date: Date) => {
      setCurrentDate(date);
      onChange?.(date);
    },
    getMode: () => currentMode,
    setMode: (mode: 'month' | 'year') => {
      setCurrentMode(mode);
      onModeChange?.(mode);
    },
    goToToday: () => {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDate(today);
      onChange?.(today);
    },
    goPrev: () => {
      const newDate = new Date(currentDate);
      if (currentMode === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      setCurrentDate(newDate);
      onChange?.(newDate);
    },
    goNext: () => {
      const newDate = new Date(currentDate);
      if (currentMode === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      setCurrentDate(newDate);
      onChange?.(newDate);
    },
  }));

  useEffect(() => {
    if (value) {
      setCurrentDate(value);
      setSelectedDate(value);
    }
  }, [value]);

  // 固定的星期和月份名称，提取到组件外部避免重复创建
  const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
  const MONTH_NAMES = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  const getWeekDays = () => WEEK_DAYS;
  const getMonthNames = () => MONTH_NAMES;

  // 使用 useMemo 优化 getDatesInMonth 函数，只在依赖项变化时重新计算
  const datesInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 获取日历开始日期（包含上月末尾日期）
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // 获取日历结束日期（包含下月开始日期）
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const dates: CalendarDate[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const isCurrentMonth = current.getMonth() === month;
      const isToday =
        current.getFullYear() === today.getFullYear() &&
        current.getMonth() === today.getMonth() &&
        current.getDate() === today.getDate();
      const isSelected =
        selectedDate &&
        current.getFullYear() === selectedDate.getFullYear() &&
        current.getMonth() === selectedDate.getMonth() &&
        current.getDate() === selectedDate.getDate();

      const dateEvents = events.filter((event) => {
        const eventDate = new Date(event.startTime || '');
        return (
          eventDate.getFullYear() === current.getFullYear() &&
          eventDate.getMonth() === current.getMonth() &&
          eventDate.getDate() === current.getDate()
        );
      });

      dates.push({
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate(),
        isCurrentMonth,
        isToday,
        isSelected: Boolean(isSelected),
        disabled: disabledDate?.(new Date(current)) || false,
        events: dateEvents,
      });

      current.setDate(current.getDate() + 1);
    }

    return dates;
  }, [currentDate, selectedDate, events, disabledDate]);

  // 使用 useCallback 优化事件处理函数
  const handleDateClick = useCallback(
    (date: CalendarDate) => {
      if (date.disabled) return;

      const newDate = new Date(date.year, date.month - 1, date.day);
      setSelectedDate(newDate);
      onSelect?.(newDate);
      onChange?.(newDate);
    },
    [onSelect, onChange],
  );

  const handleMonthClick = useCallback(
    (monthIndex: number) => {
      const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
      setCurrentDate(newDate);
      setCurrentMode('month');
      onChange?.(newDate);
      onModeChange?.('month');
    },
    [currentDate, onChange, onModeChange],
  );

  const handleHeaderTitleClick = useCallback(() => {
    setCurrentMode(currentMode === 'month' ? 'year' : 'month');
    onModeChange?.(currentMode === 'month' ? 'year' : 'month');
  }, [currentMode, onModeChange]);

  const handlePrevClick = useCallback(() => {
    const newDate = new Date(currentDate);
    if (currentMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
    onChange?.(newDate);
  }, [currentDate, currentMode, onChange]);

  const handleNextClick = useCallback(() => {
    const newDate = new Date(currentDate);
    if (currentMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
    onChange?.(newDate);
  }, [currentDate, currentMode, onChange]);

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setCurrentMode('month');
    onChange?.(today);
  }, [onChange]);

  const renderDateCell = (date: CalendarDate) => {
    if (dateRender) {
      return dateRender(date);
    }

    let cellStyle = { ...calendarStyles['dateCell'] };

    if (!date.isCurrentMonth) {
      cellStyle = { ...cellStyle, ...calendarStyles['dateCellOtherMonth'] };
    }

    if (date.isToday) {
      cellStyle = { ...cellStyle, ...calendarStyles['dateCellToday'] };
    }

    if (date.isSelected) {
      cellStyle = { ...cellStyle, ...calendarStyles['dateCellSelected'] };
    }

    if (date.disabled) {
      cellStyle = { ...cellStyle, ...calendarStyles['dateCellDisabled'] };
    }

    return (
      <View key={`${date.year}-${date.month}-${date.day}`} style={cellStyle} onClick={() => handleDateClick(date)}>
        <Text>{date.day}</Text>
        {showEvents && date.events && date.events.length > 0 && (
          <View style={calendarStyles['eventIndicator'] ?? {}}>
            {date.events.slice(0, 3).map((event) => (
              <View
                key={event.id}
                style={{
                  ...calendarStyles['eventDot'],
                  backgroundColor: event.color || calendarStyles['eventDotDefault']?.backgroundColor || '#007bff',
                }}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderMonthView = () => {
    const weekDays = getWeekDays();

    return (
      <>
        <View style={calendarStyles['weekHeader'] ?? {}}>
          {weekDays.map((day) => (
            <View key={day} style={calendarStyles['weekHeaderCell'] ?? {}}>
              <Text>{day}</Text>
            </View>
          ))}
        </View>
        <View style={calendarStyles['dateGrid'] ?? {}}>
          {datesInMonth.map((date: CalendarDate) => renderDateCell(date))}
        </View>
      </>
    );
  };

  const renderYearView = () => {
    const months = getMonthNames();
    const currentMonth = currentDate.getMonth();

    return (
      <View style={calendarStyles['monthGrid'] ?? {}}>
        {months.map((month, index) => {
          if (monthRender) {
            return monthRender(index, currentDate.getFullYear());
          }

          let cellStyle = { ...calendarStyles['monthCell'] };

          if (index === currentMonth) {
            cellStyle = { ...cellStyle, ...calendarStyles['monthCellCurrent'] };
          }

          return (
            <View key={month} style={cellStyle} onClick={() => handleMonthClick(index)}>
              <Text>{month}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const getHeaderTitle = () => {
    if (currentMode === 'month') {
      return `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`;
    } else {
      return `${currentDate.getFullYear()}年`;
    }
  };

  return (
    <View
      ref={elementRef}
      style={{ ...calendarStyles['base'], ...style }}
      className={`${className ?? ''} ${isDark ? 'dark' : 'light'}`}
      aria-label={ariaLabel}
      role={role}
      {...rest}
    >
      {/* 头部 */}
      <View style={calendarStyles['header'] ?? {}}>
        <Text style={calendarStyles['headerButton'] ?? {}} onClick={handlePrevClick}>
          ‹
        </Text>

        <Text style={calendarStyles['headerTitle'] ?? {}} onClick={handleHeaderTitleClick}>
          {getHeaderTitle()}
        </Text>

        <View style={calendarStyles['actions'] ?? {}}>
          {showToday && (
            <Text style={calendarStyles['todayButton'] ?? {}} onClick={handleTodayClick}>
              今天
            </Text>
          )}
          <Text style={calendarStyles['headerButton'] ?? {}} onClick={handleNextClick}>
            ›
          </Text>
        </View>
      </View>

      {/* 内容 */}
      {currentMode === 'month' ? renderMonthView() : renderYearView()}
    </View>
  );
});

CalendarComponent.displayName = 'Calendar';

export const Calendar = CalendarComponent;
export default Calendar;
