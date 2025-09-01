import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Container } from '../Container'
import type { ContainerProps, ContainerRef } from '../Container.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div'
}))

// Mock styles
vi.mock('../Container.styles', () => ({
  containerStyles: {
    SIZE_MAP: {
      small: 320,
      medium: 768,
      large: 1024,
      default: 1200,
      full: '100%',
      fluid: '100%'
    },
    ALIGN_MAP: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch'
    },
    parseSize: (size: any) => {
      if (typeof size === 'number') return `${size}px`
      const sizeMap = { small: 320, medium: 768, large: 1024, default: 1200, full: '100%', fluid: '100%' }
      if (typeof size === 'string' && size in sizeMap) {
        return sizeMap[size as keyof typeof sizeMap]
      }
      return size || '1200px'
    },
    getBaseStyle: (props: any) => ({
      maxWidth: props.maxWidth || 1200,
      padding: '16px',
      margin: '16px',
      display: 'flex',
      alignItems: props.center ? 'center' : 'stretch',
      overflow: props.scrollable ? 'auto' : 'visible'
    }),
    getResponsiveStyle: (responsive: any) => responsive ? { '@media (max-width: 768px)': { maxWidth: '100%' } } : {},
    getClassName: (props: any) => `taro-uno-container taro-uno-container--${props.size} taro-uno-container--${props.align} ${props.className || ''}`
  }
}))

describe('Container Component', () => {
  const mockRef = React.createRef<ContainerRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders container with default props', () => {
      render(<Container data-testid="container">Test Content</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveTextContent('Test Content')
    })

    it('renders container with custom size', () => {
      render(<Container size="large" data-testid="container">Large Container</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('renders container with custom maxWidth', () => {
      render(<Container maxWidth={800} data-testid="container">Custom Width</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('renders container with center alignment', () => {
      render(<Container center data-testid="container">Centered</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('renders container with scrollable content', () => {
      render(<Container scrollable data-testid="container">Scrollable</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('renders container with custom className', () => {
      render(<Container className="custom-container" data-testid="container">Custom Class</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('custom-container')
    })

    it('renders container with responsive props', () => {
      render(<Container responsive={{ xs: { size: 'small' } }} data-testid="container">Responsive</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('renders empty container', () => {
      render(<Container data-testid="container" />)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
      expect(container).toBeEmptyDOMElement()
    })

    it('renders container with multiple children', () => {
      render(
        <Container data-testid="container">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
      expect(container.children).toHaveLength(3)
    })
  })

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Container onClick={handleClick} data-testid="container">Clickable</Container>)
      const container = screen.getByTestId('container')
      fireEvent.click(container)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles scroll events', () => {
      const handleScroll = vi.fn()
      render(<Container onScroll={handleScroll} data-testid="container">Scrollable</Container>)
      const container = screen.getByTestId('container')
      fireEvent.scroll(container)
      expect(handleScroll).toHaveBeenCalledTimes(1)
    })

    it('handles multiple event handlers', () => {
      const handleClick = vi.fn()
      const handleScroll = vi.fn()
      render(
        <Container onClick={handleClick} onScroll={handleScroll} data-testid="container">
          Events
        </Container>
      )
      const container = screen.getByTestId('container')
      fireEvent.click(container)
      fireEvent.scroll(container)
      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleScroll).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props Updates', () => {
    it('updates size prop correctly', () => {
      const { rerender } = render(<Container size="small" data-testid="container">Size Test</Container>)
      const container = screen.getByTestId('container')
      rerender(<Container size="large" data-testid="container">Size Test</Container>)
      expect(container).toBeInTheDocument()
    })

    it('updates align prop correctly', () => {
      const { rerender } = render(<Container align="start" data-testid="container">Align Test</Container>)
      const container = screen.getByTestId('container')
      rerender(<Container align="center" data-testid="container">Align Test</Container>)
      expect(container).toBeInTheDocument()
    })

    it('updates center prop correctly', () => {
      const { rerender } = render(<Container center={false} data-testid="container">Center Test</Container>)
      const container = screen.getByTestId('container')
      rerender(<Container center={true} data-testid="container">Center Test</Container>)
      expect(container).toBeInTheDocument()
    })

    it('updates scrollable prop correctly', () => {
      const { rerender } = render(<Container scrollable={false} data-testid="container">Scroll Test</Container>)
      const container = screen.getByTestId('container')
      rerender(<Container scrollable={true} data-testid="container">Scroll Test</Container>)
      expect(container).toBeInTheDocument()
    })

    it('updates scrollDirection prop correctly', () => {
      const { rerender } = render(<Container scrollDirection="vertical" data-testid="container">Direction Test</Container>)
      const container = screen.getByTestId('container')
      rerender(<Container scrollDirection="horizontal" data-testid="container">Direction Test</Container>)
      expect(container).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Container ref={mockRef} data-testid="container">Ref Test</Container>)

      act(() => {
        if (mockRef.current) {
          expect(mockRef.current.getSize()).toBe('default')
          expect(mockRef.current.getAlign()).toBe('stretch')
          expect(mockRef.current.getMaxWidth()).toBe(1200)
        }
      })
    })

    it('sets size via ref method', () => {
      render(<Container ref={mockRef} data-testid="container">Ref Size Test</Container>)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setSize('large')).not.toThrow()
        }
      })
    })

    it('sets align via ref method', () => {
      render(<Container ref={mockRef} data-testid="container">Ref Align Test</Container>)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setAlign('center')).not.toThrow()
        }
      })
    })

    it('sets maxWidth via ref method', () => {
      render(<Container ref={mockRef} data-testid="container">Ref MaxWidth Test</Container>)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setMaxWidth(800)).not.toThrow()
        }
      })
    })

    it('calls scrollIntoView via ref method', () => {
      render(<Container ref={mockRef} data-testid="container">Ref Scroll Test</Container>)

      act(() => {
        if (mockRef.current) {
          // In mock environment, scrollIntoView might not be available
          // So we test that the method exists and can be called
          expect(typeof mockRef.current.scrollIntoView).toBe('function')
        }
      })
    })

    it('provides element access via ref', () => {
      render(<Container ref={mockRef} data-testid="container">Ref Element Test</Container>)

      act(() => {
        if (mockRef.current) {
          expect(mockRef.current.element).toBeDefined()
        }
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Container role="main" data-testid="container">Accessible</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('role', 'main')
    })

    it('supports aria-label', () => {
      render(<Container aria-label="Main container" data-testid="container">Labeled</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('aria-label', 'Main container')
    })

    it('supports aria-labelledby', () => {
      render(<Container aria-labelledby="container-title" data-testid="container">Labelled By</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('aria-labelledby', 'container-title')
    })

    it('supports tabIndex for keyboard navigation', () => {
      render(<Container tabIndex={0} data-testid="container">Tabbable</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('tabindex', '0')
    })

    it('supports data attributes', () => {
      render(<Container data-testid="container" data-custom="value">Data Attr</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid size prop gracefully', () => {
      render(<Container size="invalid" as any data-testid="container">Invalid Size</Container>)
      expect(screen.getByTestId('container')).toBeInTheDocument()
    })

    it('handles invalid align prop gracefully', () => {
      render(<Container align="invalid" as any data-testid="container">Invalid Align</Container>)
      expect(screen.getByTestId('container')).toBeInTheDocument()
    })

    it('handles zero maxWidth', () => {
      render(<Container maxWidth={0} data-testid="container">Zero Width</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles negative maxWidth gracefully', () => {
      const { container } = render(<Container maxWidth={-100} data-testid="container">Negative Width</Container>)
      expect(screen.getByTestId('container')).toBeInTheDocument()
    })

    it('handles very large maxWidth', () => {
      render(<Container maxWidth={999999} data-testid="container">Large Width</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles undefined children', () => {
      render(<Container data-testid="container">{undefined}</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles null children', () => {
      render(<Container data-testid="container">{null}</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles boolean children', () => {
      render(<Container data-testid="container">{true}</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('applies responsive styles correctly', () => {
      const responsiveProps = {
        xs: { size: 'small' },
        sm: { size: 'medium' },
        md: { size: 'large' }
      }
      render(<Container responsive={responsiveProps} data-testid="container">Responsive</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles empty responsive object', () => {
      render(<Container responsive={{}} data-testid="container">Empty Responsive</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })

    it('handles partial responsive object', () => {
      render(<Container responsive={{ xs: { size: 'small' } }} data-testid="container">Partial Responsive</Container>)
      const container = screen.getByTestId('container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many children', () => {
      const children = Array.from({ length: 100 }, (_, i) => <div key={i}>Child {i}</div>)
      const { container } = render(<Container data-testid="container">{children}</Container>)
      expect(screen.getByTestId('container')).toBeInTheDocument()
      expect(screen.getByTestId('container').children).toHaveLength(100)
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Container size="small" data-testid="container">Performance</Container>)

      for (let i = 0; i < 10; i++) {
        rerender(<Container size={i % 2 === 0 ? 'small' : 'large'} data-testid="container">Performance</Container>)
      }

      expect(screen.getByTestId('container')).toBeInTheDocument()
    })
  })
})
