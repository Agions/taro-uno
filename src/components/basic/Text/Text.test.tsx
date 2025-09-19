import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import TextComponent from './Text'
import type { TextProps } from './Text.types'

// 使用实际的组件
const Text = TextComponent

describe('Text Component', () => {
  const defaultProps: TextProps = {
    children: 'Hello World',
    onClick: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders text with default props', () => {
      render(<Text {...defaultProps} />)

      const text = screen.getByText('Hello World')
      expect(text).toBeInTheDocument()
    })

    it('renders text with different sizes', () => {
      const sizes: Array<TextProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']

      sizes.forEach(size => {
        const { container } = render(<Text {...defaultProps} size={size} />)
        const text = container.querySelector('.taro-uno-h5-text')
        expect(text).toHaveClass(`taro-uno-h5-text--${size}`)

        // Verify font size is applied via style attribute
        if (text) {
          const fontSize = text.style.fontSize
          expect(fontSize).toBeTruthy()
          expect(fontSize).toMatch(/\d+px/)
        }
      })
    })

    it('renders text with different colors', () => {
      const colors: Array<TextProps['color']> = ['primary', 'secondary', 'success', 'warning', 'error', 'info']

      colors.forEach(color => {
        const { container } = render(<Text {...defaultProps} color={color} />)
        const text = container.querySelector('.taro-uno-h5-text')
        expect(text).toHaveClass(`taro-uno-h5-text--${color}`)

        // Verify color is applied via style attribute
        if (text) {
          const colorValue = text.style.color
          expect(colorValue).toBeTruthy()
          expect(colorValue).toMatch(/^#[0-9a-fA-F]{6}$|rgb(a?\(.*\))|hsl(a?\(.*\))$/)
        }
      })
    })

    it('renders clickable text', () => {
      const { container } = render(<Text {...defaultProps} clickable />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toHaveClass('taro-uno-h5-text--clickable')
    })

    it('renders loading text', () => {
      const { container } = render(<Text {...defaultProps} loading />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toHaveClass('taro-uno-h5-text--loading')
    })

    it('renders disabled text', () => {
      const { container } = render(<Text {...defaultProps} disabled />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toHaveClass('taro-uno-h5-text--disabled')
    })

    it('renders with custom className', () => {
      const { container } = render(<Text {...defaultProps} className="custom-text" />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toHaveClass('custom-text')
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      render(<Text {...defaultProps} clickable />)

      const text = screen.getByText('Hello World')
      fireEvent.click(text)

      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when disabled', () => {
      render(<Text {...defaultProps} disabled />)

      const text = screen.getByText('Hello World')
      fireEvent.click(text)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not handle click when loading', () => {
      render(<Text {...defaultProps} loading />)

      const text = screen.getByText('Hello World')
      fireEvent.click(text)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
  })

  describe('Copy Functionality', () => {
    it('copies text when copyable', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText
        }
      })

      const onCopy = vi.fn()
      render(<Text {...defaultProps} copyable onCopy={onCopy} />)

      const copyButton = screen.getByText('📋')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('Hello World')
        expect(onCopy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Text {...defaultProps} accessibilityLabel="Greeting text" />)

      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('aria-label', 'Greeting text')
    })

    it('updates accessibility state when disabled', () => {
      render(<Text {...defaultProps} disabled />)

      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('aria-disabled', 'true')
    })

    it('updates accessibility state when loading', () => {
      render(<Text {...defaultProps} loading />)

      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.getText).toBe('function')
      expect(typeof ref.current.setText).toBe('function')
      expect(typeof ref.current.copy).toBe('function')
      expect(typeof ref.current.setDisabled).toBe('function')
      expect(typeof ref.current.setLoading).toBe('function')
    })

    it('can get text content via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      expect(ref.current.getText()).toBe('Hello World')
    })

    it('can set text content via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      ref.current.setText('New Text')
      expect(ref.current.getText()).toBe('New Text')
    })

    it('can set disabled state via ref', async () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      ref.current.setDisabled(true)

      // Wait for state update and re-render
      await waitFor(() => {
        const text = screen.getByText('Hello World')
        expect(text).toHaveClass('taro-uno-h5-text--disabled')
        expect(text).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('can set loading state via ref', async () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      ref.current.setLoading(true)

      // Wait for state update and re-render
      await waitFor(() => {
        const text = screen.getByText('Hello World')
        expect(text).toHaveClass('taro-uno-h5-text--loading')
        expect(text).toHaveAttribute('aria-busy', 'true')
      })
    })

    it('can get color via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} color="primary" ref={ref} />)

      expect(ref.current.getColor()).toBe('primary')
    })

    it('can set color via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      ref.current.setColor('#ff0000')

      const text = screen.getByText('Hello World')
      expect(text.style.color).toBe('rgb(255, 0, 0)')
    })

    it('can get size via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} size="lg" ref={ref} />)

      expect(ref.current.getSize()).toBe('lg')
    })

    it('can set size via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)

      ref.current.setSize('xl')

      const text = screen.getByText('Hello World')
      expect(text.style.fontSize).toBe('36px')
    })
  })

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<Text {...defaultProps} children={undefined} />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toBeInTheDocument()
    })

    it('renders with empty string children', () => {
      const { container } = render(<Text {...defaultProps} children="" />)

      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toBeInTheDocument()
      expect(text?.textContent).toBe('')
    })

    it('renders with null children', () => {
      const { container } = render(<Text {...defaultProps} children={null} />)
      const text = container.querySelector('.taro-uno-h5-text')
      expect(text).toBeInTheDocument()
    })
  })
})
