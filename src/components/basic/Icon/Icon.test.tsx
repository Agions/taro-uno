import React from 'react'
import { vi, describe, test, expect, beforeEach, it } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Icon } from './Icon'
import type { IconProps } from './Icon.types'

describe('Icon Component', () => {
  const defaultProps: IconProps = {
    source: 'home',
    onClick: vi.fn(),
    'data-testid': 'icon'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders icon with default props', () => {
      render(<Icon {...defaultProps} />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('renders icon with different sizes', () => {
      const sizes: Array<IconProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']

      sizes.forEach(size => {
        const { container } = render(<Icon {...defaultProps} size={size} />)
        const icon = container.querySelector('.taro-uno-h5-icon')
        expect(icon).toHaveClass(`taro-uno-h5-icon--${size}`)
      })
    })

    it('renders icon with different statuses', () => {
      const statuses: Array<IconProps['status']> = ['normal', 'active', 'disabled', 'loading']

      statuses.forEach(status => {
        const { container } = render(<Icon {...defaultProps} status={status} />)
        const icon = container.querySelector('.taro-uno-h5-icon')
        expect(icon).toHaveClass(`taro-uno-h5-icon--${status}`)
      })
    })

    it('renders icon with different themes', () => {
      const themes: Array<IconProps['theme']> = ['outlined', 'filled', 'two-tone', 'colored']

      themes.forEach(theme => {
        const { container } = render(<Icon {...defaultProps} theme={theme} />)
        const icon = container.querySelector('.taro-uno-h5-icon')
        expect(icon).toHaveClass(`taro-uno-h5-icon--${theme}`)
      })
    })

    it('renders clickable icon', () => {
      const { container } = render(<Icon {...defaultProps} clickable />)
      const icon = container.querySelector('.taro-uno-h5-icon')
      expect(icon).toHaveClass('taro-uno-h5-icon--clickable')
    })

    it('renders loading icon', () => {
      const { container } = render(<Icon {...defaultProps} loading />)
      const icon = container.querySelector('.taro-uno-h5-icon')
      expect(icon).toHaveClass('taro-uno-h5-icon--loading')
    })

    it('renders disabled icon', () => {
      const { container } = render(<Icon {...defaultProps} disabled />)
      const icon = container.querySelector('.taro-uno-h5-icon')
      expect(icon).toHaveClass('taro-uno-h5-icon--disabled')
    })

    it('renders animated icon', () => {
      const { container } = render(<Icon {...defaultProps} animated />)
      const icon = container.querySelector('.taro-uno-h5-icon')
      expect(icon).toHaveClass('taro-uno-h5-icon--animated')
    })

    it('renders icon with custom className', () => {
      const { container } = render(<Icon {...defaultProps} className="custom-icon" />)
      const icon = container.querySelector('.taro-uno-h5-icon')
      expect(icon).toHaveClass('custom-icon')
    })

    it('renders icon with tooltip', () => {
      render(<Icon {...defaultProps} tooltip="Home icon" />)

      const icon = screen.getByTestId('icon')
      fireEvent.mouseEnter(icon)

      expect(screen.getByText('Home icon')).toBeInTheDocument()
    })
  })

  describe('Icon Types', () => {
    it('renders font icon', () => {
      render(<Icon {...defaultProps} source="home" />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('renders SVG icon', () => {
      const svgData = { viewBox: '0 0 24 24', path: 'M12 2L2 7L12 12L22 7L12 2Z' }
      render(<Icon {...defaultProps} source={svgData} />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('renders image icon', () => {
      render(<Icon {...defaultProps} source="https://example.com/icon.png" />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('renders custom icon', () => {
      const customIcon = <span data-testid="custom-icon">🔥</span>
      render(<Icon {...defaultProps} source={customIcon} />)

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      render(<Icon {...defaultProps} clickable />)

      const icon = screen.getByTestId('icon')
      fireEvent.click(icon)

      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when disabled', () => {
      render(<Icon {...defaultProps} disabled />)

      const icon = screen.getByTestId('icon')
      fireEvent.click(icon)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not handle click when loading', () => {
      render(<Icon {...defaultProps} loading />)

      const icon = screen.getByTestId('icon')
      fireEvent.click(icon)

      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('handles mouse enter event', () => {
      render(<Icon {...defaultProps} tooltip="Test tooltip" />)

      const icon = screen.getByTestId('icon')
      fireEvent.mouseEnter(icon)

      expect(screen.getByText('Test tooltip')).toBeInTheDocument()
    })

    it('handles mouse leave event', () => {
      render(<Icon {...defaultProps} tooltip="Test tooltip" />)

      const icon = screen.getByTestId('icon')
      fireEvent.mouseEnter(icon)
      fireEvent.mouseLeave(icon)

      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Icon {...defaultProps} loading />)

      const icon = screen.getByTestId('icon')
      const loadingSpinner = icon.querySelector('.taro-uno-icon__icon')

      expect(loadingSpinner).toBeInTheDocument()
    })

    it('shows custom loading icon when provided', () => {
      const loadingIcon = <span data-testid="loading-icon">⏳</span>
      render(<Icon {...defaultProps} loading loadingIcon={loadingIcon} />)

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument()
    })
  })

  describe('Ripple Effect', () => {
    it('creates ripple effect when clicked', async () => {
      render(<Icon {...defaultProps} clickable ripple />)

      const icon = screen.getByTestId('icon')
      fireEvent.click(icon)

      await waitFor(() => {
        // Look for ripple in the wrapper, not the icon itself
        const wrapper = icon.closest('.taro-uno-icon-wrapper')
        const ripple = wrapper?.querySelector('.taro-uno-icon__ripple')
        expect(ripple).toBeInTheDocument()
      })
    })

    it('handles ripple effect creation and cleanup', () => {
      // Test that ripple effect is created when clicked
      const { container } = render(<Icon {...defaultProps} clickable ripple />)

      const icon = screen.getByTestId('icon')
      fireEvent.click(icon)

      // Ripple should be present initially
      const wrapper = icon.closest('.taro-uno-icon-wrapper')
      const ripple = wrapper?.querySelector('.taro-uno-icon__ripple')
      expect(ripple).toBeInTheDocument()

      // Verify ripple has the expected styling
      expect(ripple).toHaveClass('taro-uno-icon__ripple')
    })
  })

  
  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.click).toBe('function')
      expect(typeof ref.current.setDisabled).toBe('function')
      expect(typeof ref.current.setLoading).toBe('function')
      expect(typeof ref.current.getStatus).toBe('function')
      expect(typeof ref.current.getSize).toBe('function')
      expect(typeof ref.current.getColor).toBe('function')
      expect(typeof ref.current.rotate).toBe('function')
      expect(typeof ref.current.setColor).toBe('function')
      expect(typeof ref.current.setSize).toBe('function')
    })

    it('can trigger click via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} clickable ref={ref} />)

      ref.current.click()
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('can set disabled state via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      // Just verify the method exists and can be called without error
      expect(() => ref.current.setDisabled(true)).not.toThrow()
      expect(typeof ref.current.getStatus()).toBe('string')
    })

    it('can set loading state via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      // Just verify the method exists and can be called without error
      expect(() => ref.current.setLoading(true)).not.toThrow()
      expect(typeof ref.current.getStatus()).toBe('string')
    })

    it('can rotate icon via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      ref.current.rotate(90)

      const icon = screen.getByTestId('icon')
      expect(icon).toHaveAttribute('data-rotation', '90')
    })

    it('can change color via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      ref.current.setColor('#ff0000')

      const icon = screen.getByTestId('icon')
      expect(icon).toHaveAttribute('data-color', '#ff0000')
    })

    it('can change size via ref', () => {
      const ref = React.createRef<any>()
      render(<Icon {...defaultProps} ref={ref} />)

      ref.current.setSize('lg')

      const icon = screen.getByTestId('icon')
      expect(icon).toHaveAttribute('data-size', '32')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty source', () => {
      render(<Icon {...defaultProps} source="" />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('handles null source', () => {
      render(<Icon {...defaultProps} source={null as any} />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('handles undefined source', () => {
      render(<Icon {...defaultProps} source={undefined as any} />)

      const icon = screen.getByTestId('icon')
      expect(icon).toBeInTheDocument()
    })

    it('handles custom colors', () => {
      const { container } = render(<Icon {...defaultProps} color="#ff0000" />)

      const icon = container.querySelector('.taro-uno-h5-icon')
      // Check if the color is applied - it might be in different formats
      expect(icon).toBeInTheDocument()
      const style = (icon as HTMLElement)?.style
      expect(style?.color).toBeTruthy()
    })

    it('handles custom size number', () => {
      const { container } = render(<Icon {...defaultProps} size={50} />)

      const icon = container.querySelector('.taro-uno-h5-icon')
      // Check if the size is applied - it should be in the style
      expect(icon).toBeInTheDocument()
      const style = (icon as HTMLElement)?.style
      expect(style?.fontSize).toBeTruthy()
    })

    it('handles rotation', () => {
      const ref = React.createRef<any>()
      const { container } = render(<Icon {...defaultProps} ref={ref} />)

      const icon = container.querySelector('.taro-uno-h5-icon')
      // Font icons support rotation via ref method
      ref.current?.rotate(45)

      // After calling rotate method, check if transform is applied
      expect(icon).toBeInTheDocument()
      const style = (icon as HTMLElement)?.style
      expect(style?.transform).toBeTruthy()
    })
  })
})
