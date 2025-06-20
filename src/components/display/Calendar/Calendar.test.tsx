import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calendar from './index'
import { CalendarCellData, CalendarEvent } from './types'

describe('Calendar 组件', () => {
  // 基本渲染测试
  test('应该正确渲染日历组件', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('.uno-calendar')).toBeInTheDocument()
    expect(container.querySelector('.uno-calendar-header')).toBeInTheDocument()
    expect(container.querySelector('.uno-calendar-body')).toBeInTheDocument()
  })

  // 自定义类名测试
  test('应该应用自定义类名', () => {
    const { container } = render(<Calendar className='custom-calendar' />)
    expect(container.querySelector('.uno-calendar')).toHaveClass('custom-calendar')
  })

  // 月份显示测试
  test('应该显示正确的月份', () => {
    const testDate = new Date(2023, 5, 15) // 2023年6月15日
    const { container } = render(<Calendar defaultValue={testDate} />)
    
    // 检查月份标题是否正确显示
    const monthTitle = container.querySelector('.uno-calendar-header-title')
    expect(monthTitle).toHaveTextContent(/2023.*6月|June.*2023/)
  })

  // 选择日期测试
  test('应该可以选择日期', () => {
    const onSelect = jest.fn()
    const { container } = render(<Calendar onSelect={onSelect} />)
    
    // 选择一个可用的日期单元格
    const dateCell = container.querySelector('.uno-calendar-cell:not(.uno-calendar-cell-disabled)')
    if (dateCell) {
      fireEvent.click(dateCell)
      expect(onSelect).toHaveBeenCalled()
    }
  })

  // 今天高亮测试
  test('应该高亮显示今天', () => {
    const { container } = render(<Calendar />)
    
    // 检查是否有今天的高亮样式
    const todayCell = container.querySelector('.uno-calendar-cell-today')
    expect(todayCell).toBeInTheDocument()
  })

  // 视图类型切换测试
  test('应该可以切换视图类型', () => {
    const onViewTypeChange = jest.fn()
    const { container, rerender } = render(
      <Calendar viewType='month' onViewTypeChange={onViewTypeChange} />
    )
    
    // 初始为月视图
    expect(container.querySelector('.uno-calendar-view-month')).toBeInTheDocument()
    
    // 切换到周视图
    rerender(<Calendar viewType='week' onViewTypeChange={onViewTypeChange} />)
    expect(container.querySelector('.uno-calendar-view-week')).toBeInTheDocument()
    
    // 切换到日视图
    rerender(<Calendar viewType='day' onViewTypeChange={onViewTypeChange} />)
    expect(container.querySelector('.uno-calendar-view-day')).toBeInTheDocument()
  })

  // 事件显示测试
  test('应该显示日历事件', () => {
    const events: CalendarEvent[] = [
      {
        id: '1',
        title: '测试事件',
        start: new Date(),
        type: 'primary',
      },
    ]
    
    const { container } = render(<Calendar events={events} />)
    
    // 检查事件是否显示
    const eventElement = container.querySelector('.uno-calendar-event')
    expect(eventElement).toBeInTheDocument()
    expect(eventElement).toHaveTextContent('测试事件')
  })

  // 禁用日期测试
  test('应该禁用指定的日期', () => {
    const disabledDate = (date: Date) => {
      // 禁用所有周末
      return date.getDay() === 0 || date.getDay() === 6
    }
    
    const { container } = render(<Calendar disabledDate={disabledDate} />)
    
    // 检查是否有禁用的日期单元格
    const disabledCells = container.querySelectorAll('.uno-calendar-cell-disabled')
    expect(disabledCells.length).toBeGreaterThan(0)
  })

  // 自定义渲染测试
  test('应该支持自定义日期渲染', () => {
    const dateRender = (date: Date, cellData: CalendarCellData) => {
      return <div className="custom-date-cell">{date.getDate()}</div>
    }
    
    const { container } = render(<Calendar dateRender={dateRender} />)
    
    // 检查自定义渲染的单元格
    const customCells = container.querySelectorAll('.custom-date-cell')
    expect(customCells.length).toBeGreaterThan(0)
  })

  // 范围选择测试
  test('应该支持日期范围选择', () => {
    const onSelect = jest.fn()
    const { container } = render(
      <Calendar selectionMode="range" onSelect={onSelect} />
    )
    
    // 选择起始日期
    const dateCells = container.querySelectorAll('.uno-calendar-cell:not(.uno-calendar-cell-disabled)')
    if (dateCells.length >= 2) {
      fireEvent.click(dateCells[0])
      fireEvent.click(dateCells[dateCells.length - 1])
      
      // 检查选择回调是否被调用了两次
      expect(onSelect).toHaveBeenCalledTimes(2)
      
      // 检查是否有选中的范围
      const selectedCells = container.querySelectorAll('.uno-calendar-cell-selected')
      expect(selectedCells.length).toBeGreaterThan(0)
    }
  })

  // 月份切换测试
  test('应该可以切换月份', () => {
    const onMonthChange = jest.fn()
    const { container } = render(
      <Calendar onMonthChange={onMonthChange} />
    )
    
    // 点击上个月按钮
    const prevButton = container.querySelector('.uno-calendar-prev-button')
    if (prevButton) {
      fireEvent.click(prevButton)
      expect(onMonthChange).toHaveBeenCalled()
    }
    
    // 点击下个月按钮
    const nextButton = container.querySelector('.uno-calendar-next-button')
    if (nextButton) {
      fireEvent.click(nextButton)
      expect(onMonthChange).toHaveBeenCalledTimes(2)
    }
  })
}) 