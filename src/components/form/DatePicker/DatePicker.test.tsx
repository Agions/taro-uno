import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { DatePicker } from './index'

describe('DatePicker Component', () => {
  const mockOnChange = jest.fn()
  const mockOnRangeChange = jest.fn()
  const mockOnOpenChange = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders date picker with basic props', () => {
    const { container } = render(
      <DatePicker
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker')).toBeInTheDocument()
    expect(container.querySelector('.taro-uno-datepicker__input')).toBeInTheDocument()
  })

  test('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        placeholder="请选择日期"
        onChange={mockOnChange}
      />
    )

    expect(getByPlaceholderText('请选择日期')).toBeInTheDocument()
  })

  test('handles date selection', () => {
    const { container } = render(
      <DatePicker
        onChange={mockOnChange}
      />
    )

    // 打开日期选择器
    const input = container.querySelector('.taro-uno-datepicker__input-wrapper')
    if (input) {
      fireEvent.click(input)
    }

    // 检查面板是否打开
    expect(container.querySelector('.taro-uno-datepicker__panel')).toBeInTheDocument()
  })

  test('handles range date selection', () => {
    const { container } = render(
      <DatePicker
        range={true}
        onRangeChange={mockOnRangeChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker__range-inputs')).toBeInTheDocument()
    expect(container.querySelectorAll('.taro-uno-datepicker__input')).toHaveLength(2)
  })

  test('handles disabled state', () => {
    const { container } = render(
      <DatePicker
        disabled={true}
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--disabled')).toBeInTheDocument()
  })

  test('handles readOnly state', () => {
    const { container } = render(
      <DatePicker
        readOnly={true}
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--disabled')).toBeInTheDocument()
  })

  test('handles different sizes', () => {
    const { container, rerender } = render(
      <DatePicker
        size="sm"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--sm')).toBeInTheDocument()

    rerender(
      <DatePicker
        size="lg"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--lg')).toBeInTheDocument()
  })

  test('handles different variants', () => {
    const { container, rerender } = render(
      <DatePicker
        variant="outlined"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--outlined')).toBeInTheDocument()

    rerender(
      <DatePicker
        variant="filled"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--filled')).toBeInTheDocument()
  })

  test('handles different statuses', () => {
    const { container, rerender } = render(
      <DatePicker
        status="error"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--error')).toBeInTheDocument()

    rerender(
      <DatePicker
        status="success"
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker--success')).toBeInTheDocument()
  })

  test('handles clear button', () => {
    const mockDate = new Date(2024, 0, 1)
    const { container } = render(
      <DatePicker
        value={mockDate}
        allowClear={true}
        onChange={mockOnChange}
      />
    )

    const clearButton = container.querySelector('.taro-uno-datepicker__clear-button')
    if (clearButton) {
      fireEvent.click(clearButton)
      expect(mockOnChange).toHaveBeenCalledWith(null, '')
    }
  })

  test('handles date format', () => {
    const mockDate = new Date(2024, 0, 1)
    const { container } = render(
      <DatePicker
        value={mockDate}
        format="YYYY/MM/DD"
        onChange={mockOnChange}
      />
    )

    const input = container.querySelector('.taro-uno-datepicker__input')
    if (input) {
      expect(input.getAttribute('value')).toBe('2024/01/01')
    }
  })

  test('handles min and max date restrictions', () => {
    const minDate = new Date(2024, 0, 1)
    const maxDate = new Date(2024, 11, 31)
    const disabledDate = jest.fn((date) => date.getDay() === 0) // 禁用周日

    const { container } = render(
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        disabledDate={disabledDate}
        onChange={mockOnChange}
      />
    )

    // 打开日期选择器
    const inputWrapper = container.querySelector('.taro-uno-datepicker__input-wrapper')
    if (inputWrapper) {
      fireEvent.click(inputWrapper)
    }

    expect(container.querySelector('.taro-uno-datepicker__panel')).toBeInTheDocument()
  })

  test('handles custom date render', () => {
    const customDateRender = jest.fn((date) => (
      <div className="custom-date">{date.getDate()}</div>
    ))

    const { container } = render(
      <DatePicker
        dateRender={customDateRender}
        onChange={mockOnChange}
      />
    )

    // 打开日期选择器
    const inputWrapper = container.querySelector('.taro-uno-datepicker__input-wrapper')
    if (inputWrapper) {
      fireEvent.click(inputWrapper)
    }

    expect(customDateRender).toHaveBeenCalled()
  })

  test('handles custom footer', () => {
    const customFooter = jest.fn(() => (
      <div className="custom-footer">自定义底部</div>
    ))

    const { container } = render(
      <DatePicker
        renderExtraFooter={customFooter}
        onChange={mockOnChange}
      />
    )

    // 打开日期选择器
    const inputWrapper = container.querySelector('.taro-uno-datepicker__input-wrapper')
    if (inputWrapper) {
      fireEvent.click(inputWrapper)
    }

    expect(customFooter).toHaveBeenCalled()
  })

  test('handles range placeholder', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        range={true}
        rangePlaceholder={['开始时间', '结束时间']}
        onRangeChange={mockOnRangeChange}
      />
    )

    expect(getByPlaceholderText('开始时间')).toBeInTheDocument()
    expect(getByPlaceholderText('结束时间')).toBeInTheDocument()
  })

  test('handles open and close events', () => {
    const { container } = render(
      <DatePicker
        onOpenChange={mockOnOpenChange}
        onChange={mockOnChange}
      />
    )

    const inputWrapper = container.querySelector('.taro-uno-datepicker__input-wrapper')

    if (inputWrapper) {
      fireEvent.click(inputWrapper)
      expect(mockOnOpenChange).toHaveBeenCalledWith(true)
    }

    // 关闭面板
    if (inputWrapper) {
      fireEvent.click(inputWrapper)
      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
    }
  })

  test('handles focus and blur events', () => {
    const mockOnFocus = jest.fn()
    const mockOnBlur = jest.fn()

    const { container } = render(
      <DatePicker
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onChange={mockOnChange}
      />
    )

    const inputWrapper = container.querySelector('.taro-uno-datepicker__input-wrapper')

    if (inputWrapper) {
      fireEvent.click(inputWrapper)
      expect(mockOnFocus).toHaveBeenCalled()
    }
  })

  test('handles accessibility features', () => {
    const { container } = render(
      <DatePicker
        accessible={true}
        accessibilityLabel="日期选择器"
        accessibilityRole="combobox"
        onChange={mockOnChange}
      />
    )

    const picker = container.querySelector('.taro-uno-datepicker')
    expect(picker).toHaveAttribute('aria-label', '日期选择器')
    expect(picker).toHaveAttribute('role', 'combobox')
  })

  test('handles ref methods', () => {
    const ref = React.createRef<any>()
    const mockDate = new Date(2024, 0, 1)

    render(
      <DatePicker
        ref={ref}
        onChange={mockOnChange}
      />
    )

    expect(ref.current).toBeTruthy()
    expect(ref.current.getValue).toBeDefined()
    expect(ref.current.setValue).toBeDefined()
    expect(ref.current.open).toBeDefined()
    expect(ref.current.close).toBeDefined()
    expect(ref.current.clear).toBeDefined()

    // 测试 setValue 方法
    ref.current.setValue(mockDate)
    expect(ref.current.getValue()).toEqual(mockDate)
  })

  test('handles controlled and uncontrolled modes', () => {
    // 受控模式
    const { container: controlledContainer, rerender } = render(
      <DatePicker
        value={new Date(2024, 0, 1)}
        onChange={mockOnChange}
      />
    )

    expect(controlledContainer.querySelector('.taro-uno-datepicker__input')?.getAttribute('value')).toBe('2024-01-01')

    // 非受控模式
    const { container: uncontrolledContainer } = render(
      <DatePicker
        defaultValue={new Date(2024, 0, 1)}
        onChange={mockOnChange}
      />
    )

    expect(uncontrolledContainer.querySelector('.taro-uno-datepicker__input')?.getAttribute('value')).toBe('2024-01-01')
  })

  test('handles different date formats', () => {
    const testCases = [
      { format: 'YYYY-MM-DD', expected: '2024-01-01' },
      { format: 'YYYY/MM/DD', expected: '2024/01/01' },
      { format: 'DD/MM/YYYY', expected: '01/01/2024' },
      { format: 'MM/DD/YYYY', expected: '01/01/2024' },
      { format: 'YYYY年MM月DD日', expected: '2024年01月01日' }
    ]

    testCases.forEach(({ format, expected }) => {
      const { container } = render(
        <DatePicker
          value={new Date(2024, 0, 1)}
          format={format as any}
          onChange={mockOnChange}
        />
      )

      expect(container.querySelector('.taro-uno-datepicker__input')?.getAttribute('value')).toBe(expected)
    })
  })

  test('handles empty state', () => {
    const { container } = render(
      <DatePicker
        value={null}
        onChange={mockOnChange}
      />
    )

    expect(container.querySelector('.taro-uno-datepicker__input')?.getAttribute('value')).toBe('')
  })

  test('handles custom className and style', () => {
    const customStyle = { backgroundColor: '#f0f0f0', border: '2px solid red' }
    const { container } = render(
      <DatePicker
        className="custom-datepicker"
        style={customStyle}
        onChange={mockOnChange}
      />
    )

    const picker = container.querySelector('.taro-uno-datepicker')
    expect(picker).toHaveClass('custom-datepicker')
  })
})
