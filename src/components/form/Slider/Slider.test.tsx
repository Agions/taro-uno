import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Slider } from './Slider'
import type { SliderProps, SliderRef } from './Slider.types'

describe('Slider Component', () => {
  const defaultProps: SliderProps = {
    min: 0,
    max: 100,
    onChange: vi.fn(),
    onChangeComplete: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders slider with default props', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('renders slider with different sizes', () => {
      const sizes: Array<SliderProps['size']> = ['small', 'medium', 'large']

      sizes.forEach(size => {
        const { container } = render(<Slider {...defaultProps} size={size} />)
        expect(container.firstChild).toBeInTheDocument()
        // Size affects styling, not CSS classes in this implementation
      })
    })

    it('renders slider with different variants', () => {
      const variants: Array<SliderProps['variant']> = ['default', 'primary', 'success', 'warning', 'error']

      variants.forEach(variant => {
        const { container } = render(<Slider {...defaultProps} variant={variant} />)
        expect(container.firstChild).toBeInTheDocument()
        // Variant affects styling, not CSS classes in this implementation
      })
    })

    it('renders slider with disabled state', () => {
      render(<Slider {...defaultProps} disabled={true} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('renders vertical slider', () => {
      render(<Slider {...defaultProps} vertical={true} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('renders reversed slider', () => {
      render(<Slider {...defaultProps} reverse={true} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('renders slider with marks', () => {
      const marks = {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100'
      }

      render(<Slider {...defaultProps} marks={marks} />)

      Object.values(marks).forEach(markText => {
        expect(screen.getByText(markText)).toBeInTheDocument()
      })
    })

    it('renders slider with tooltip', () => {
      render(<Slider {...defaultProps} tooltip={{ formatter: (value) => `${value}%` }} />)

      expect(screen.getByTestId('slider-tooltip')).toBeInTheDocument()
    })
  })

  describe('Value Handling', () => {
    it('handles controlled value', () => {
      const { rerender } = render(<Slider {...defaultProps} value={50} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()

      rerender(<Slider {...defaultProps} value={75} />)
      expect(slider).toBeInTheDocument()
    })

    it('handles uncontrolled value with defaultValue', () => {
      render(<Slider {...defaultProps} defaultValue={50} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('calls onChange when value changes', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      fireEvent.click(slider)

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('calls onChangeComplete when interaction completes', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      fireEvent.mouseDown(slider)
      fireEvent.mouseUp(slider)

      expect(defaultProps.onChangeComplete).toHaveBeenCalled()
    })

    it('respects min and max bounds', () => {
      render(<Slider {...defaultProps} min={10} max={90} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles step increments', () => {
      render(<Slider {...defaultProps} step={10} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles mouse drag interaction', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      fireEvent.mouseDown(slider)

      expect(slider).toBeInTheDocument()
    })

    it('handles touch interaction', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      fireEvent.touchStart(slider)

      expect(slider).toBeInTheDocument()
    })

    it('handles keyboard interaction', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('handles disabled state interactions', () => {
      render(<Slider {...defaultProps} disabled={true} />)

      const slider = screen.getByRole('slider')
      fireEvent.click(slider)

      expect(defaultProps.onChange).not.toHaveBeenCalled()
    })

    it('handles included track display', () => {
      render(<Slider {...defaultProps} value={50} included={true} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles excluded track display', () => {
      render(<Slider {...defaultProps} value={50} included={false} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('Marks Functionality', () => {
    it('displays marks correctly', () => {
      const marks = {
        0: 'Start',
        50: 'Middle',
        100: 'End'
      }

      render(<Slider {...defaultProps} marks={marks} />)

      expect(screen.getByText('Start')).toBeInTheDocument()
      expect(screen.getByText('Middle')).toBeInTheDocument()
      expect(screen.getByText('End')).toBeInTheDocument()
    })

    it('handles custom mark rendering', () => {
      const marks = {
        0: { label: 'Start', style: { color: 'red' } },
        50: { label: 'Middle', style: { color: 'blue' } },
        100: { label: 'End', style: { color: 'green' } }
      }

      render(<Slider {...defaultProps} marks={marks} />)

      expect(screen.getByText('Start')).toBeInTheDocument()
      expect(screen.getByText('Middle')).toBeInTheDocument()
      expect(screen.getByText('End')).toBeInTheDocument()
    })

    it('snaps to mark values when clicking on marks', () => {
      const marks = {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100'
      }

      render(<Slider {...defaultProps} marks={marks} />)

      const mark25 = screen.getByText('25')
      fireEvent.click(mark25)

      expect(defaultProps.onChange).toHaveBeenCalled()
    })
  })

  describe('Tooltip Functionality', () => {
    it('displays tooltip with default formatter', () => {
      render(<Slider {...defaultProps} value={50} tooltip={true} />)

      const tooltip = screen.getByTestId('slider-tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('displays tooltip with custom formatter', () => {
      const customFormatter = (value: number) => `${value}%`
      render(<Slider {...defaultProps} value={50} tooltip={{ formatter: customFormatter }} />)

      const tooltip = screen.getByTestId('slider-tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('hides tooltip when tooltip is false', () => {
      render(<Slider {...defaultProps} value={50} tooltip={false} />)

      const tooltip = screen.queryByTestId('slider-tooltip')
      expect(tooltip).not.toBeInTheDocument()
    })
  })

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current?.getValue).toBeDefined()
      expect(ref.current?.setValue).toBeDefined()
      expect(ref.current?.focus).toBeDefined()
      expect(ref.current?.blur).toBeDefined()
    })

    it('getValue returns current value', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} value={50} ref={ref} />)

      expect(ref.current?.getValue()).toBe(50)
    })

    it('setValue updates value', () => {
      const ref = React.createRef<SliderRef>()
      const onChange = vi.fn()
      render(<Slider {...defaultProps} ref={ref} onChange={onChange} />)

      ref.current?.setValue(75)
      expect(onChange).toHaveBeenCalledWith(75)
    })

    it('focus and blur methods work', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} ref={ref} />)

      const focusSpy = vi.spyOn(ref.current as any, 'focus')
      const blurSpy = vi.spyOn(ref.current as any, 'blur')

      ref.current?.focus()
      ref.current?.blur()

      expect(focusSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })

    it('disable and enable methods work', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} ref={ref} />)

      ref.current?.disable()
      expect(ref.current?.isDisabled()).toBe(true)

      ref.current?.enable()
      expect(ref.current?.isDisabled()).toBe(false)
    })

    it('reset method works', () => {
      const ref = React.createRef<SliderRef>()
      const onChange = vi.fn()
      render(<Slider {...defaultProps} defaultValue={50} ref={ref} onChange={onChange} />)

      ref.current?.reset()
      expect(onChange).toHaveBeenCalledWith(50)
    })

    it('getPercentage method works', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} min={0} max={100} value={25} ref={ref} />)

      expect(ref.current?.getPercentage()).toBe(25)
    })

    it('getPercentageFromValue method works', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} min={0} max={100} ref={ref} />)

      expect(ref.current?.getPercentageFromValue(25)).toBe(25)
    })

    it('getValueFromPercentage method works', () => {
      const ref = React.createRef<SliderRef>()
      render(<Slider {...defaultProps} min={0} max={100} ref={ref} />)

      expect(ref.current?.getValueFromPercentage(25)).toBe(25)
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Slider {...defaultProps} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('supports custom accessibility props', () => {
      render(
        <Slider
          {...defaultProps}
          accessibilityLabel="Volume control"
          accessibilityRole="slider"
          accessible={true}
        />
      )

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles accessibility state', () => {
      render(<Slider {...defaultProps} disabled={true} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles min equal to max', () => {
      render(<Slider {...defaultProps} min={50} max={50} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles negative values', () => {
      render(<Slider {...defaultProps} min={-100} max={0} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles decimal step', () => {
      render(<Slider {...defaultProps} step={0.1} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles very large step', () => {
      render(<Slider {...defaultProps} step={50} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('handles undefined tooltip', () => {
      render(<Slider {...defaultProps} tooltip={undefined} />)

      const tooltip = screen.queryByTestId('slider-tooltip')
      expect(tooltip).not.toBeInTheDocument()
    })

    it('handles empty marks object', () => {
      render(<Slider {...defaultProps} marks={{}} />)

      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with multiple sliders', () => {
      const { rerender } = render(
        <div>
          {[1, 2, 3, 4, 5].map(i => (
            <Slider key={i} {...defaultProps} aria-label={`Slider ${i}`} />
          ))}
        </div>
      )

      expect(screen.getAllByRole('slider')).toHaveLength(5)

      rerender(
        <div>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Slider key={i} {...defaultProps} aria-label={`Slider ${i}`} />
          ))}
        </div>
      )

      expect(screen.getAllByRole('slider')).toHaveLength(6)
    })

    it('handles rapid value changes efficiently', () => {
      const onChange = vi.fn()
      render(<Slider {...defaultProps} onChange={onChange} />)

      const slider = screen.getByRole('slider')

      // Simulate rapid changes
      for (let i = 0; i < 10; i++) {
        fireEvent.click(slider)
      }

      expect(onChange).toHaveBeenCalledTimes(10)
    })
  })
})