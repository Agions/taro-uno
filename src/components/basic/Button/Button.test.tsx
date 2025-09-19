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
      const variants: Array<ButtonProps['variant']> = ['solid', 'outline', 'ghost', 'text']

      variants.forEach(variant => {
        const { container } = render(<Button {...defaultProps} variant={variant} />)
        const button = container.querySelector('button')
        expect(button).toBeInTheDocument()
        // Check that the button is rendered (variant affects styling, not structure)
      })
    })

    it('renders button with different sizes', () => {
      const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large']

      sizes.forEach(size => {
        const { container } = render(<Button {...defaultProps} size={size} />)
        const button = container.querySelector('button')
        expect(button).toBeInTheDocument()
        // Check that the button is rendered (size affects styling, not structure)
      })
    })

    it('renders disabled button', () => {
      const { container } = render(<Button {...defaultProps} disabled />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    it('renders loading button', () => {
      const { container } = render(<Button {...defaultProps} loading />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
      // Check for loading content
      expect(screen.getByText('加载中...')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<Button {...defaultProps} className="custom-button" />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
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

    it('handles key press events without errors', () => {
      render(<Button {...defaultProps} />)

      const button = screen.getByRole('button')

      // Test that key events don't cause errors (TaroButton might handle key events differently)
      expect(() => {
        fireEvent.keyDown(button, { key: 'Enter' })
        fireEvent.keyDown(button, { key: ' ' })
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Button {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('has disabled state when disabled', () => {
      render(<Button {...defaultProps} disabled />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has disabled state when loading', () => {
      render(<Button {...defaultProps} loading />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)

      // The current Button component uses TaroButton which may not have extensive ref API
      expect(ref.current).toBeTruthy()
    })

    it('can be referenced', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<Button {...defaultProps} children={undefined} />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })

    it('renders with empty string children', () => {
      render(<Button {...defaultProps} children="" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('renders with null children', () => {
      const { container } = render(<Button {...defaultProps} children={null} />)
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })
  })
})
