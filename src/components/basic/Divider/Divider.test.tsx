import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi } from 'vitest'
import { Divider } from './Divider'
import type { DividerProps } from './Divider.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: ({ children, accessibilityRole, ...props }) => {
    // Convert Taro accessibilityRole to HTML role for testing
    return <div role={accessibilityRole} {...props}>{children}</div>
  },
  Text: 'span',
}))

describe('Divider Component', () => {
  const defaultProps: DividerProps = {}

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders divider with default props', () => {
      render(<Divider {...defaultProps} />)

      const divider = screen.getByRole('separator')
      expect(divider).toBeInTheDocument()
    })

    it('renders divider with different orientations', () => {
      const orientations: Array<DividerProps['orientation']> = ['horizontal', 'vertical']

      orientations.forEach(orientation => {
        const { container } = render(<Divider {...defaultProps} orientation={orientation} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${orientation}`)
      })
    })

    it('renders divider with different types', () => {
      const types: Array<DividerProps['type']> = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']

      types.forEach(type => {
        const { container } = render(<Divider {...defaultProps} type={type} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${type}`)
      })
    })

    it('renders divider with different positions', () => {
      const positions: Array<DividerProps['position']> = ['left', 'center', 'right']

      positions.forEach(position => {
        const { container } = render(<Divider {...defaultProps} position={position} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${position}`)
      })
    })

    it('renders divider with different sizes', () => {
      const sizes: Array<DividerProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl']

      sizes.forEach(size => {
        const { container } = render(<Divider {...defaultProps} size={size} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${size}`)
      })
    })

    it('renders divider with different colors', () => {
      const colors: Array<DividerProps['color']> = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'light', 'dark', 'border']

      colors.forEach(color => {
        const { container } = render(<Divider {...defaultProps} color={color} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${color}`)
      })
    })

    it('renders divider with different variants', () => {
      const variants: Array<DividerProps['variant']> = ['default', 'inset', 'middle']

      variants.forEach(variant => {
        const { container } = render(<Divider {...defaultProps} variant={variant} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toHaveClass(`taro-uno-h5-divider--${variant}`)
      })
    })

    it('renders inset divider', () => {
      const { container } = render(<Divider {...defaultProps} inset />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--inset')
    })

    it('renders centered divider', () => {
      const { container } = render(<Divider {...defaultProps} centered />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--centered')
    })

    it('renders animated divider', () => {
      const { container } = render(<Divider {...defaultProps} animated />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--animated')
    })

    it('renders shadow divider', () => {
      const { container } = render(<Divider {...defaultProps} shadow />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--shadow')
    })

    it('renders clickable divider', () => {
      const { container } = render(<Divider {...defaultProps} clickable />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--clickable')
    })

    it('renders responsive divider', () => {
      const { container } = render(<Divider {...defaultProps} responsive />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('taro-uno-h5-divider--responsive')
    })

    it('renders divider with custom className', () => {
      const { container } = render(<Divider {...defaultProps} className="custom-divider" />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toHaveClass('custom-divider')
    })
  })

  describe('Text Divider', () => {
    it('renders text divider', () => {
      render(<Divider {...defaultProps}>Text Content</Divider>)

      const divider = screen.getByRole('separator')
      const text = screen.getByText('Text Content')

      expect(divider).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(divider).toHaveClass('taro-uno-h5-divider--text')
    })

    it('renders text divider with custom text styles', () => {
      render(
        <Divider
          {...defaultProps}
          textStyle={{ color: '#ff0000', fontSize: '16px' }}
          textBackground="#f0f0f0"
          textPadding="8px 16px"
        >
          Text Content
        </Divider>
      )

      const text = screen.getByTestId('divider-text')
      const styleAttr = text.getAttribute('style')
      expect(styleAttr).toContain('rgb(255, 0, 0)')
      expect(styleAttr).toContain('16px')
    })

    it('renders text divider with icon', () => {
      render(
        <Divider {...defaultProps} icon={<span data-testid="icon">🔥</span>}>
          Text Content
        </Divider>
      )

      const icon = screen.getByTestId('icon-wrapper')
      expect(icon).toBeInTheDocument()
    })

    it('renders text divider with icon position', () => {
      render(
        <Divider {...defaultProps} icon={<span>🔥</span>} iconPosition="start">
          Text Content
        </Divider>
      )

      const divider = screen.getByRole('separator')
      expect(divider).toHaveClass('taro-uno-h5-divider--with-icon')
    })
  })

  describe('Icon Divider', () => {
    it('renders icon divider', () => {
      render(<Divider {...defaultProps} icon={<span data-testid="icon">🔥</span>} />)

      const divider = screen.getByRole('separator')
      const icon = screen.getByTestId('icon-wrapper')

      expect(divider).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(divider).toHaveClass('taro-uno-h5-divider--with-icon')
    })

    it('renders icon divider with different icon positions', () => {
      const positions: Array<DividerProps['iconPosition']> = ['start', 'center', 'end']

      positions.forEach(position => {
        cleanup() // Clean up previous renders
        const { container } = render(<Divider {...defaultProps} icon={<span>🔥</span>} iconPosition={position} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toBeInTheDocument()
      })
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      const onClick = vi.fn()
      render(<Divider {...defaultProps} clickable onClick={onClick} />)

      const divider = screen.getByRole('separator')
      fireEvent.click(divider)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when not clickable', () => {
      const onClick = vi.fn()
      render(<Divider {...defaultProps} onClick={onClick} />)

      const divider = screen.getByRole('separator')
      fireEvent.click(divider)

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Custom Styles', () => {
    it('applies custom width', () => {
      render(<Divider {...defaultProps} width={200} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('width: 200px')
    })

    it('applies custom height', () => {
      render(<Divider {...defaultProps} height={4} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('height: 4px')
    })

    it('applies custom margin', () => {
      render(<Divider {...defaultProps} margin={20} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('margin: 20px')
    })

    it('applies custom padding', () => {
      render(<Divider {...defaultProps} padding={10} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('padding: 10px')
    })

    it('applies custom opacity', () => {
      render(<Divider {...defaultProps} opacity={0.5} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('opacity: 0.5')
    })

    it('applies custom border radius', () => {
      render(<Divider {...defaultProps} borderRadius={8} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('border-radius: 8px')
    })

    it('applies gradient background', () => {
      render(
        <Divider {...defaultProps} gradient={{ start: '#ff0000', end: '#0000ff' }} />
      )
      const divider = screen.getByTestId('divider')
      expect(divider).toHaveStyle({
        backgroundImage: 'linear-gradient(to right, #ff0000, #0000ff)'
      })
    })

    it('applies custom spacing', () => {
      render(<Divider {...defaultProps} spacing={24} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('gap: 24px')
    })

    it('applies custom alignment', () => {
      render(<Divider {...defaultProps} align="start" />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('justify-content: flex-start')
    })

    it('applies custom vertical alignment', () => {
      render(<Divider {...defaultProps} verticalAlign="top" />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('align-items: flex-start')
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Divider {...defaultProps} accessibilityLabel="Section divider" />)

      const divider = screen.getByRole('separator')
      expect(divider).toHaveAttribute('aria-label', 'Section divider')
    })

    it('has correct accessibility role', () => {
      render(<Divider {...defaultProps} />)

      const divider = screen.getByRole('separator')
      expect(divider).toHaveAttribute('aria-role', 'separator')
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.getOrientation).toBe('function')
      expect(typeof ref.current.getType).toBe('function')
      expect(typeof ref.current.getPosition).toBe('function')
      expect(typeof ref.current.getSize).toBe('function')
      expect(typeof ref.current.getColor).toBe('function')
      expect(typeof ref.current.setOrientation).toBe('function')
      expect(typeof ref.current.setType).toBe('function')
      expect(typeof ref.current.setPosition).toBe('function')
      expect(typeof ref.current.setSize).toBe('function')
      expect(typeof ref.current.setColor).toBe('function')
      expect(typeof ref.current.scrollIntoView).toBe('function')
    })

    it('can get orientation via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current.getOrientation()).toBe('horizontal')
    })

    it('can get type via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current.getType()).toBe('solid')
    })

    it('can get position via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current.getPosition()).toBe('center')
    })

    it('can get size via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current.getSize()).toBe('md')
    })

    it('can get color via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      expect(ref.current.getColor()).toBe('#e5e7eb')
    })

    it('can set orientation via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.setOrientation('vertical')
      expect(ref.current.element.getAttribute('data-orientation')).toBe('vertical')
    })

    it('can set type via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.setType('dashed')
      expect(ref.current.element.getAttribute('data-type')).toBe('dashed')
    })

    it('can set position via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.setPosition('left')
      expect(ref.current.element.getAttribute('data-position')).toBe('left')
    })

    it('can set size via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.setSize('lg')
      expect(ref.current.element.style.width).toBe('100%')
    })

    it('can set color via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.setColor('#ff0000')
      expect(ref.current.element.style.borderColor).toBe('#ff0000')
    })

    it('can scroll into view via ref', () => {
      const ref = React.createRef<any>()
      render(<Divider {...defaultProps} ref={ref} />)

      ref.current.scrollIntoView({ behavior: 'smooth' })

      // Check that the mock function was created and called
      expect(ref.current.element.scrollIntoView).toBeDefined()
      expect(typeof ref.current.element.scrollIntoView).toBe('function')
      expect(ref.current.element.scrollIntoViewOptions).toEqual({ behavior: 'smooth' })
    })
  })

  describe('Edge Cases', () => {
    it('renders without any props', () => {
      const { container } = render(<Divider />)
      const divider = container.querySelector('.taro-uno-h5-divider')
      expect(divider).toBeInTheDocument()
    })

    it('renders with empty children', () => {
      render(<Divider {...defaultProps}>{''}</Divider>)

      const divider = screen.getByRole('separator')
      expect(divider).toBeInTheDocument()
    })

    it('renders with null children', () => {
      render(<Divider {...defaultProps}>{null}</Divider>)

      const divider = screen.getByRole('separator')
      expect(divider).toBeInTheDocument()
    })

    it('handles custom color string', () => {
      render(<Divider {...defaultProps} color="#ff0000" />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('border-bottom: 1px solid #ff0000')
    })

    it('handles responsive breakpoints', () => {
      const breakpoints: Array<DividerProps['breakpoint']> = ['xs', 'sm', 'md', 'lg', 'xl']

      breakpoints.forEach(breakpoint => {
        cleanup() // Clean up previous renders
        const { container } = render(<Divider {...defaultProps} responsive breakpoint={breakpoint} />)
        const divider = container.querySelector('.taro-uno-h5-divider')
        expect(divider).toBeInTheDocument()
        expect(divider).toHaveClass('taro-uno-h5-divider--responsive')
      })
    })

    it('handles different animation durations', () => {
      render(<Divider {...defaultProps} animated animationDuration={500} />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('transition: all 500ms ease-in-out')
    })

    it('handles custom spacing values', () => {
      render(<Divider {...defaultProps} spacing="2rem" />)
      const divider = screen.getByTestId('divider')
      const styleAttr = divider.getAttribute('style')
      expect(styleAttr).toContain('gap: 2rem')
    })

    it('handles custom text spacing', () => {
      render(
        <Divider {...defaultProps} textSpacing={24}>
          Text Content
        </Divider>
      )

      const text = screen.getByTestId('divider-text')
      const styleAttr = text.getAttribute('style')
      expect(styleAttr).toContain('margin: 0px 24px')
    })

    it('handles custom text padding', () => {
      render(
        <Divider {...defaultProps} textPadding="12px 24px">
          Text Content
        </Divider>
      )

      const text = screen.getByTestId('divider-text')
      const styleAttr = text.getAttribute('style')
      expect(styleAttr).toContain('padding: 12px 24px')
    })

    it('handles custom text border radius', () => {
      render(
        <Divider {...defaultProps} textBorderRadius={8}>
          Text Content
        </Divider>
      )

      const text = screen.getByText('Text Content')
      const styleAttr = text.getAttribute('style')
      expect(styleAttr).toContain('border-radius: 8px')
    })

    it('handles vertical orientation with text', () => {
      render(
        <Divider {...defaultProps} orientation="vertical">
          Text Content
        </Divider>
      )

      const divider = screen.getByRole('separator')
      const text = screen.getByText('Text Content')

      expect(divider).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(divider).toHaveClass('taro-uno-h5-divider--vertical')
      expect(divider).toHaveClass('taro-uno-h5-divider--text')
    })

    it('handles vertical orientation with icon', () => {
      render(
        <Divider {...defaultProps} orientation="vertical" icon={<span>🔥</span>}>
          Text Content
        </Divider>
      )

      const divider = screen.getByRole('separator')
      expect(divider).toBeInTheDocument()
      expect(divider).toHaveClass('taro-uno-h5-divider--vertical')
      expect(divider).toHaveClass('taro-uno-h5-divider--with-icon')
    })
  })
})
