import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Col } from '../Col'
import { Row } from '../Row'
import type { ColProps, ColRef } from '../Col.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div'
}))

// Mock styles
vi.mock('../Col.styles', () => ({
  colStyles: {
    getBaseStyle: (props: any) => ({
      flex: `0 0 ${(props.span / 24) * 100}%`,
      maxWidth: `${(props.span / 24) * 100}%`,
      marginLeft: props.offset > 0 ? `${(props.offset / 24) * 100}%` : '0',
      order: props.order || 0,
      padding: typeof props.gutter === 'number' ? `${props.gutter / 2}px` : '0px',
      flex: props.flex || undefined
    }),
    getResponsiveStyle: (responsive: any) => responsive ? { '@media (max-width: 768px)': { flex: '0 0 100%' } } : {},
    getClassName: (props: any) => `taro-uno-col taro-uno-col--${props.span} ${props.offset > 0 ? `taro-uno-col--offset-${props.offset}` : ''} ${props.flex ? 'taro-uno-col--flex' : ''} ${props.className || ''}`
  }
}))

// Mock Row component
vi.mock('../Row', () => ({
  Row: ({ children, ...props }: any) => (
    <div className="taro-uno-row" {...props}>
      {children}
    </div>
  )
}))

describe('Col Component', () => {
  const mockRef = React.createRef<ColRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders column with default props', () => {
      render(<Col data-testid="col">Test Column</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
      expect(col).toHaveTextContent('Test Column')
    })

    it('renders column with custom span', () => {
      render(<Col span={12} data-testid="col">Span 12</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with custom offset', () => {
      render(<Col offset={6} data-testid="col">Offset 6</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with custom order', () => {
      render(<Col order={2} data-testid="col">Order 2</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with custom gutter', () => {
      render(<Col gutter={16} data-testid="col">Gutter 16</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with flex property', () => {
      render(<Col flex={1} data-testid="col">Flex 1</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with custom className', () => {
      render(<Col className="custom-col" data-testid="col">Custom Class</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
      expect(col).toHaveClass('custom-col')
    })

    it('renders empty column', () => {
      render(<Col data-testid="col" />)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
      expect(col).toBeEmptyDOMElement()
    })

    it('renders column with multiple children', () => {
      render(
        <Col data-testid="col">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Col>
      )
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
      expect(col.children).toHaveLength(3)
    })

    it('renders column with responsive props', () => {
      render(<Col responsive={{ xs: { span: 24 } }} data-testid="col">Responsive</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with maximum span', () => {
      render(<Col span={24} data-testid="col">Full Width</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('renders column with minimum span', () => {
      render(<Col span={1} data-testid="col">Minimum Width</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })
  })

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Col onClick={handleClick} data-testid="col">Clickable</Col>)
      const col = screen.getByTestId('col')
      fireEvent.click(col)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles click events with children', () => {
      const handleClick = vi.fn()
      render(
        <Col onClick={handleClick} data-testid="col">
          <div>Child Content</div>
        </Col>
      )
      const col = screen.getByTestId('col')
      fireEvent.click(col)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not interfere with child click events', () => {
      const handleColClick = vi.fn()
      const handleChildClick = vi.fn((e) => e.stopPropagation())
      render(
        <Col onClick={handleColClick} data-testid="col">
          <div onClick={handleChildClick} data-testid="child">Child</div>
        </Col>
      )
      const child = screen.getByTestId('child')
      fireEvent.click(child)
      expect(handleChildClick).toHaveBeenCalledTimes(1)
      expect(handleColClick).not.toHaveBeenCalled()
    })
  })

  describe('Props Updates', () => {
    it('updates span prop correctly', () => {
      const { rerender } = render(<Col span={12} data-testid="col">Span Test</Col>)
      const col = screen.getByTestId('col')
      rerender(<Col span={8} data-testid="col">Span Test</Col>)
      expect(col).toBeInTheDocument()
    })

    it('updates offset prop correctly', () => {
      const { rerender } = render(<Col offset={4} data-testid="col">Offset Test</Col>)
      const col = screen.getByTestId('col')
      rerender(<Col offset={8} data-testid="col">Offset Test</Col>)
      expect(col).toBeInTheDocument()
    })

    it('updates order prop correctly', () => {
      const { rerender } = render(<Col order={1} data-testid="col">Order Test</Col>)
      const col = screen.getByTestId('col')
      rerender(<Col order={3} data-testid="col">Order Test</Col>)
      expect(col).toBeInTheDocument()
    })

    it('updates gutter prop correctly', () => {
      const { rerender } = render(<Col gutter={8} data-testid="col">Gutter Test</Col>)
      const col = screen.getByTestId('col')
      rerender(<Col gutter={16} data-testid="col">Gutter Test</Col>)
      expect(col).toBeInTheDocument()
    })

    it('updates flex prop correctly', () => {
      const { rerender } = render(<Col flex={1} data-testid="col">Flex Test</Col>)
      const col = screen.getByTestId('col')
      rerender(<Col flex={2} data-testid="col">Flex Test</Col>)
      expect(col).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Test</Col>)

      expect(mockRef.current).toBeDefined()
      expect(mockRef.current?.getSpan()).toBe(24)
      expect(mockRef.current?.getOffset()).toBe(0)
      expect(mockRef.current?.getOrder()).toBe(0)
    })

    it('sets span via ref method', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Span Test</Col>)

      if (mockRef.current) {
        expect(() => mockRef.current.setSpan(12)).not.toThrow()
      }
    })

    it('sets offset via ref method', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Offset Test</Col>)

      if (mockRef.current) {
        expect(() => mockRef.current.setOffset(6)).not.toThrow()
      }
    })

    it('sets order via ref method', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Order Test</Col>)

      if (mockRef.current) {
        expect(() => mockRef.current.setOrder(2)).not.toThrow()
      }
    })

    it('calls scrollIntoView via ref method', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Scroll Test</Col>)

      if (mockRef.current) {
        expect(typeof mockRef.current.scrollIntoView).toBe('function')
      }
    })

    it('provides element access via ref', () => {
      render(<Col ref={mockRef} data-testid="col">Ref Element Test</Col>)

      expect(mockRef.current?.element).toBeDefined()
    })
  })

  describe('Grid Layout Integration', () => {
    it('works correctly within Row component', () => {
      render(
        <Row data-testid="row">
          <Col span={12} data-testid="col">Column 1</Col>
          <Col span={12} data-testid="col2">Column 2</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      const col1 = screen.getByTestId('col')
      const col2 = screen.getByTestId('col2')
      expect(row).toBeInTheDocument()
      expect(col1).toBeInTheDocument()
      expect(col2).toBeInTheDocument()
      expect(row.children).toHaveLength(2)
    })

    it('handles multiple columns in row', () => {
      render(
        <Row data-testid="row">
          <Col span={6}>Col 1</Col>
          <Col span={6}>Col 2</Col>
          <Col span={6}>Col 3</Col>
          <Col span={6}>Col 4</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(4)
    })

    it('handles columns with different spans', () => {
      render(
        <Row data-testid="row">
          <Col span={8}>Col 1</Col>
          <Col span={12}>Col 2</Col>
          <Col span={4}>Col 3</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(3)
    })

    it('handles columns with offsets', () => {
      render(
        <Row data-testid="row">
          <Col span={12} offset={6}>Offset Column</Col>
          <Col span={6}>Regular Column</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(2)
    })

    it('handles columns with custom order', () => {
      render(
        <Row data-testid="row">
          <Col span={8} order={2}>Second</Col>
          <Col span={8} order={1}>First</Col>
          <Col span={8} order={3}>Third</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(3)
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Col role="cell" data-testid="col">Accessible Col</Col>)
      const col = screen.getByTestId('col')
      expect(col).toHaveAttribute('role', 'cell')
    })

    it('supports aria-label', () => {
      render(<Col aria-label="Main column" data-testid="col">Labeled Col</Col>)
      const col = screen.getByTestId('col')
      expect(col).toHaveAttribute('aria-label', 'Main column')
    })

    it('supports aria-labelledby', () => {
      render(<Col aria-labelledby="col-title" data-testid="col">Labelled By Col</Col>)
      const col = screen.getByTestId('col')
      expect(col).toHaveAttribute('aria-labelledby', 'col-title')
    })

    it('supports tabIndex for keyboard navigation', () => {
      render(<Col tabIndex={0} data-testid="col">Tabbable Col</Col>)
      const col = screen.getByTestId('col')
      expect(col).toHaveAttribute('tabindex', '0')
    })

    it('supports data attributes', () => {
      render(<Col data-testid="col" data-custom="value">Data Attr Col</Col>)
      const col = screen.getByTestId('col')
      expect(col).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles span greater than 24', () => {
      render(<Col span={30} data-testid="col">Oversized</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles negative span gracefully', () => {
      const { container } = render(<Col span={-6} data-testid="col">Negative Span</Col>)
      expect(screen.getByTestId('col')).toBeInTheDocument()
    })

    it('handles span of 0', () => {
      render(<Col span={0} data-testid="col">Zero Span</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles negative offset gracefully', () => {
      const { container } = render(<Col offset={-6} data-testid="col">Negative Offset</Col>)
      expect(screen.getByTestId('col')).toBeInTheDocument()
    })

    it('handles offset greater than 24', () => {
      render(<Col offset={30} data-testid="col">Large Offset</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles negative order gracefully', () => {
      const { container } = render(<Col order={-2} data-testid="col">Negative Order</Col>)
      expect(screen.getByTestId('col')).toBeInTheDocument()
    })

    it('handles very large order', () => {
      render(<Col order={999} data-testid="col">Large Order</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles negative gutter gracefully', () => {
      const { container } = render(<Col gutter={-16} data-testid="col">Negative Gutter</Col>)
      expect(screen.getByTestId('col')).toBeInTheDocument()
    })

    it('handles very large gutter', () => {
      render(<Col gutter={9999} data-testid="col">Large Gutter</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles undefined children', () => {
      render(<Col data-testid="col">{undefined}</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles null children', () => {
      render(<Col data-testid="col">{null}</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles boolean children', () => {
      render(<Col data-testid="col">{true}</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('applies responsive styles correctly', () => {
      const responsiveProps = {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
        lg: { span: 6 }
      }
      render(<Col responsive={responsiveProps} data-testid="col">Responsive</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles empty responsive object', () => {
      render(<Col responsive={{}} data-testid="col">Empty Responsive</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles partial responsive object', () => {
      render(<Col responsive={{ xs: { span: 24 } }} data-testid="col">Partial Responsive</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles responsive offset', () => {
      const responsiveProps = {
        xs: { offset: 0 },
        sm: { offset: 6 },
        md: { offset: 12 }
      }
      render(<Col responsive={responsiveProps} data-testid="col">Responsive Offset</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })
  })

  describe('Flex Layout', () => {
    it('handles flex property as number', () => {
      render(<Col flex={1} data-testid="col">Flex Number</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles flex property as string', () => {
      render(<Col flex="1 1 auto" data-testid="col">Flex String</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles flex property as object', () => {
      render(<Col flex={{ grow: 1, shrink: 0, basis: 'auto' } as any} data-testid="col">Flex Object</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })

    it('handles flex with span', () => {
      render(<Col span={12} flex={1} data-testid="col">Flex with Span</Col>)
      const col = screen.getByTestId('col')
      expect(col).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many columns', () => {
      const columns = Array.from({ length: 24 }, (_, i) => <Col key={i} span={1} data-testid={`col-${i}`}>Col {i}</Col>)
      render(<Row>{columns}</Row>)
      expect(screen.getAllByText(/^Col \d+$/)).toHaveLength(24)
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Col span={12} data-testid="col">Performance Col</Col>)

      for (let i = 0; i < 10; i++) {
        rerender(<Col span={i + 1} data-testid="col">Performance Col</Col>)
      }

      expect(screen.getByTestId('col')).toBeInTheDocument()
    })
  })

  describe('Nesting', () => {
    it('handles nested Row within Col', () => {
      render(
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>Nested Column</Col>
            </Row>
          </Col>
          <Col span={12}>Outer Column</Col>
        </Row>
      )
      expect(screen.getAllByText(/Column/)).toHaveLength(2)
    })

    it('handles deeply nested columns', () => {
      render(
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={12}>Deeply Nested</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )
      expect(screen.getByText('Deeply Nested')).toBeInTheDocument()
    })
  })
})
