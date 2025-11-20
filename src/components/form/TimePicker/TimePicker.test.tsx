import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { vi } from 'vitest'
import { TimePicker } from './TimePicker'
import type { TimePickerProps, TimePickerRef, TimeValue } from './TimePicker.types'

describe('TimePicker Component', () => {
  const defaultProps: TimePickerProps = {
    placeholder: '请选择时间',
    onChange: vi.fn()
  }

  const mockTimeValue: TimeValue = {
    hours: 10,
    minutes: 30,
    seconds: 45
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders timepicker with default props', () => {
      render(<TimePicker {...defaultProps} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', '请选择时间')
    })

    it('renders timepicker with disabled state', () => {
      render(<TimePicker {...defaultProps} disabled={true} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('renders timepicker with readonly state', () => {
      render(<TimePicker {...defaultProps} readonly={true} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('renders timepicker with loading state', () => {
      render(<TimePicker {...defaultProps} loading={true} />)

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument()
    })

    it('renders timepicker with custom suffix icon', () => {
      render(<TimePicker {...defaultProps} suffixIcon="⏰" />)

      expect(screen.getByText('⏰')).toBeInTheDocument()
    })
  })

  describe('Value Handling', () => {
    it('handles controlled value', () => {
      const { rerender } = render(<TimePicker {...defaultProps} value={mockTimeValue} readOnly />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()

      rerender(<TimePicker {...defaultProps} value={{ ...mockTimeValue, hours: 15 }} readOnly />)
      expect(input).toBeInTheDocument()
    })

    it('handles uncontrolled value with defaultValue', () => {
      render(<TimePicker {...defaultProps} defaultValue={mockTimeValue} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('calls onChange when value changes', () => {
      render(<TimePicker {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: '10:30:45' } })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })
  })

  describe('Time Format', () => {
    it('renders with HH:mm format', () => {
      render(<TimePicker {...defaultProps} format="HH:mm" value={mockTimeValue} readOnly />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('renders with 12-hour format', () => {
      render(<TimePicker {...defaultProps} use12Hours={true} value={mockTimeValue} readOnly />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('renders with custom format', () => {
      render(<TimePicker {...defaultProps} format="mm:ss" value={mockTimeValue} readOnly />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles focus event', () => {
      const onFocus = vi.fn()
      render(<TimePicker {...defaultProps} onFocus={onFocus} />)

      const input = screen.getByRole('textbox')
      fireEvent.focus(input)

      expect(onFocus).toHaveBeenCalled()
    })

    it('handles blur event', () => {
      const onBlur = vi.fn()
      render(<TimePicker {...defaultProps} onBlur={onBlur} />)

      const input = screen.getByRole('textbox')
      fireEvent.blur(input)

      expect(onBlur).toHaveBeenCalled()
    })

    it('handles clear action when allowClear is true', () => {
      const onClear = vi.fn()
      render(<TimePicker {...defaultProps} value={mockTimeValue} allowClear={true} onClear={onClear} />)

      const clearButton = screen.getByTestId('clear-button')
      act(() => {
        fireEvent.click(clearButton)
      })

      expect(onClear).toHaveBeenCalled()
      expect(defaultProps.onChange).toHaveBeenCalledWith(null, '')
    })

    it('does not show clear button when allowClear is false', () => {
      render(<TimePicker {...defaultProps} value={mockTimeValue} allowClear={false} />)

      const clearButton = screen.queryByTestId('clear-button')
      expect(clearButton).not.toBeInTheDocument()
    })
  })

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current?.getValue).toBeDefined()
      expect(ref.current?.setValue).toBeDefined()
      expect(ref.current?.focus).toBeDefined()
      expect(ref.current?.blur).toBeDefined()
    })

    it('getValue returns current value', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} value={mockTimeValue} ref={ref} />)

      expect(ref.current?.getValue()).toEqual(mockTimeValue)
    })

    it('setValue updates value', () => {
      const ref = React.createRef<TimePickerRef>()
      const onChange = vi.fn()
      render(<TimePicker {...defaultProps} ref={ref} onChange={onChange} />)

      act(() => {
        ref.current?.setValue(mockTimeValue)
      })
      expect(onChange).toHaveBeenCalledWith(mockTimeValue, '10:30:45')
    })

    it('clear method works', () => {
      const ref = React.createRef<TimePickerRef>()
      const onChange = vi.fn()
      render(<TimePicker {...defaultProps} value={mockTimeValue} readOnly ref={ref} onChange={onChange} />)

      act(() => {
        ref.current?.clear()
      })
      expect(onChange).toHaveBeenCalledWith(null, '')
    })

    it('setNow method works', () => {
      const ref = React.createRef<TimePickerRef>()
      const onChange = vi.fn()
      render(<TimePicker {...defaultProps} ref={ref} onChange={onChange} />)

      act(() => {
        ref.current?.setNow()
      })
      expect(onChange).toHaveBeenCalled()
    })

    it('open and close methods work', () => {
      const ref = React.createRef<TimePickerRef>()
      const onOpenChange = vi.fn()
      render(<TimePicker {...defaultProps} ref={ref} onOpenChange={onOpenChange} />)

      act(() => {
        ref.current?.open()
      })
      expect(onOpenChange).toHaveBeenCalledWith(true)

      act(() => {
        ref.current?.close()
      })
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('disable and enable methods work', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} ref={ref} />)

      act(() => {
        ref.current?.disable()
      })
      expect(ref.current?.isDisabled()).toBe(true)

      act(() => {
        ref.current?.enable()
      })
      expect(ref.current?.isDisabled()).toBe(false)
    })

    it('validateTime method works', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} ref={ref} />)

      expect(ref.current?.validateTime({ hours: 10, minutes: 30, seconds: 45 })).toBe(true)
      expect(ref.current?.validateTime({ hours: 25, minutes: 30, seconds: 45 })).toBe(false)
    })

    it('formatTime method works', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} ref={ref} />)

      expect(ref.current?.formatTime(mockTimeValue)).toBe('10:30:45')
    })

    it('parseTimeString method works', () => {
      const ref = React.createRef<TimePickerRef>()
      render(<TimePicker {...defaultProps} ref={ref} />)

      expect(ref.current?.parseTimeString('10:30:45')).toEqual(mockTimeValue)
      expect(ref.current?.parseTimeString('invalid')).toBeNull()
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<TimePicker {...defaultProps} />)

      const container = screen.getByRole('combobox')
      expect(container).toBeInTheDocument()
    })

    it('supports custom accessibility props', () => {
      render(
        <TimePicker
          {...defaultProps}
          accessibilityLabel="Select time"
          accessibilityRole="combobox"
          accessible={true}
        />
      )

      const container = screen.getByRole('combobox')
      expect(container).toBeInTheDocument()
    })

    it('handles accessibility state', () => {
      render(<TimePicker {...defaultProps} disabled={true} />)

      const container = screen.getByRole('combobox')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty value', () => {
      render(<TimePicker {...defaultProps} value={null} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('handles invalid time format input', () => {
      render(<TimePicker {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'invalid-time' } })

      expect(defaultProps.onChange).not.toHaveBeenCalled()
    })
  })
})
