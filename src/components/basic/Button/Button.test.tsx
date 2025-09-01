import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ButtonComponent from './Button'
import type { ButtonProps } from './Button.types'

// 使用实际的组件
const Button = ButtonComponent

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    children: 'Click me',
    onClick: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders button with default props', () => {
      render(<Button {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    it('renders button with different variants', () => {
      const variants: Array<ButtonProps['variant']> = ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark', 'ghost', 'link']

      variants.forEach(variant => {
        const { container } = render(<Button {...defaultProps} variant={variant} />)
        const button = container.querySelector('.taro-uno-button')
        expect(button).toHaveClass(`taro-uno-button--${variant}`)
      })
    })

    it('renders button with different sizes', () => {
      const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl']

      sizes.forEach(size => {
        const { container } = render(<Button {...defaultProps} size={size} />)
        const button = container.querySelector('.taro-uno-button')
        expect(button).toHaveClass(`taro-uno-button--${size}`)
      })
    })

    it('renders disabled button', () => {
      const { container } = render(<Button {...defaultProps} disabled />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('taro-uno-button--disabled')
    })

    it('renders loading button', () => {
      const { container } = render(<Button {...defaultProps} loading />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('taro-uno-button--loading')
    })

    it('renders with custom className', () => {
      const { container } = render(<Button {...defaultProps} className="custom-button" />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('custom-button')
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      render(<Button {...defaultProps} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when disabled', () => {
      render(<Button {...defaultProps} disabled />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not handle click when loading', () => {
      render(<Button {...defaultProps} loading />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('handles key press events', () => {
      render(<Button {...defaultProps} />)

      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.keyDown(button, { key: ' ' })

      expect(defaultProps.onClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Button {...defaultProps} accessibilityLabel="Submit button" />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-label', 'Submit button')
    })

    it('updates accessibility state when disabled', () => {
      render(<Button {...defaultProps} disabled />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-state', JSON.stringify({ disabled: true }))
    })

    it('updates accessibility state when loading', () => {
      render(<Button {...defaultProps} loading />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-state', JSON.stringify({ busy: true }))
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.setDisabled).toBe('function')
      expect(typeof ref.current.setLoading).toBe('function')
      expect(typeof ref.current.focus).toBe('function')
      expect(typeof ref.current.blur).toBe('function')
    })

    it('can set disabled state via ref', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)

      ref.current.setDisabled(true)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('taro-uno-button--disabled')
    })

    it('can set loading state via ref', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)

      ref.current.setLoading(true)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('taro-uno-button--loading')
    })
  })

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<Button {...defaultProps} children={undefined} />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toBeInTheDocument()
    })

    it('renders with empty string children', () => {
      render(<Button {...defaultProps} children="" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('renders with null children', () => {
      const { container } = render(<Button {...defaultProps} children={null} />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toBeInTheDocument()
    })
  })
})
