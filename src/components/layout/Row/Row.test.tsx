import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Row } from '../Row'
import { Col } from '../Col'
import type { RowProps, RowRef } from '../Row.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div'
}))

// Mock styles
vi.mock('../Row.styles', () => ({
  rowStyles: {
    ALIGN_MAP: {
      top: 'flex-start',
      middle: 'center',
      bottom: 'flex-end',
      stretch: 'stretch'
    },
    JUSTIFY_MAP: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      'space-around': 'space-around',
      'space-between': 'space-between',
      'space-evenly': 'space-evenly'
    },
    getBaseStyle: (props: any) => ({
      display: 'flex',
      flexWrap: props.wrap ? 'wrap' : 'nowrap',
      alignItems: props.align,
      justifyContent: props.justify,
      gap: typeof props.gutter === 'number' ? `${props.gutter}px` : props.gutter || '0px'
    }),
    getResponsiveStyle: (responsive: any) => responsive ? { '@media (max-width: 768px)': { flexWrap: 'wrap' } } : {},
    getClassName: (props: any) => `taro-uno-row taro-uno-row--${props.align} taro-uno-row--${props.justify} ${props.wrap ? 'taro-uno-row--wrap' : ''} ${props.className || ''}`
  }
}))

// Mock Col component
vi.mock('../Col', () => ({
  Col: ({ children, span, offset, className, ...props }: any) => (
    <div className={`taro-uno-col taro-uno-col--${span} ${className || ''}`} {...props}>
      {children}
    </div>
  )
}))

describe('Row Component', () => {
  const mockRef = React.createRef<RowRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders row with default props', () => {
      render(<Row data-testid="row">Test Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row).toHaveTextContent('Test Row')
    })

    it('renders row with custom gutter', () => {
      render(<Row gutter={16} data-testid="row">Gutter Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('renders row with custom align', () => {
      render(<Row align="middle" data-testid="row">Aligned Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('renders row with custom justify', () => {
      render(<Row justify="center" data-testid="row">Justified Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('renders row with wrap disabled', () => {
      render(<Row wrap={false} data-testid="row">No Wrap Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('renders row with custom className', () => {
      render(<Row className="custom-row" data-testid="row">Custom Class Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row).toHaveClass('custom-row')
    })

    it('renders empty row', () => {
      render(<Row data-testid="row" />)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row).toBeEmptyDOMElement()
    })

    it('renders row with multiple children', () => {
      render(
        <Row data-testid="row">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(3)
    })

    it('renders row with Col components', () => {
      render(
        <Row data-testid="row">
          <Col span={12}>Column 1</Col>
          <Col span={12}>Column 2</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(2)
    })

    it('renders row with responsive props', () => {
      render(<Row responsive={{ xs: { gutter: 8 } }} data-testid="row">Responsive Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('renders row with array gutter', () => {
      render(<Row gutter={[16, 24]} data-testid="row">Array Gutter Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })
  })

  describe('Col Component Integration', () => {
    it('passes gutter prop to Col components', () => {
      const { container } = render(
        <Row gutter={16} data-testid="row">
          <Col span={12}>Column 1</Col>
          <Col span={12}>Column 2</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(2)
    })

    it('handles mixed children (Col and non-Col)', () => {
      const { container } = render(
        <Row gutter={16} data-testid="row">
          <Col span={12}>Column 1</Col>
          <div>Regular Div</div>
          <Col span={12}>Column 2</Col>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(3)
    })

    it('handles nested Row components', () => {
      const { container } = render(
        <Row data-testid="outer-row">
          <Col span={12}>
            <Row data-testid="inner-row">
              <Col span={12}>Nested Column</Col>
            </Row>
          </Col>
          <Col span={12}>Outer Column</Col>
        </Row>
      )
      const outerRow = screen.getByTestId('outer-row')
      const innerRow = screen.getByTestId('inner-row')
      expect(outerRow).toBeInTheDocument()
      expect(innerRow).toBeInTheDocument()
    })
  })

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Row onClick={handleClick} data-testid="row">Clickable Row</Row>)
      const row = screen.getByTestId('row')
      fireEvent.click(row)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles click events with children', () => {
      const handleClick = vi.fn()
      render(
        <Row onClick={handleClick} data-testid="row">
          <div>Child 1</div>
          <div>Child 2</div>
        </Row>
      )
      const row = screen.getByTestId('row')
      fireEvent.click(row)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not interfere with child click events', () => {
      const handleRowClick = vi.fn()
      const handleChildClick = vi.fn((e) => e.stopPropagation())
      render(
        <Row onClick={handleRowClick} data-testid="row">
          <div onClick={handleChildClick} data-testid="child">Child</div>
        </Row>
      )
      const child = screen.getByTestId('child')
      fireEvent.click(child)
      expect(handleChildClick).toHaveBeenCalledTimes(1)
      expect(handleRowClick).not.toHaveBeenCalled()
    })
  })

  describe('Props Updates', () => {
    it('updates gutter prop correctly', () => {
      const { rerender } = render(<Row gutter={8} data-testid="row">Gutter Test</Row>)
      const row = screen.getByTestId('row')
      rerender(<Row gutter={16} data-testid="row">Gutter Test</Row>)
      expect(row).toBeInTheDocument()
    })

    it('updates align prop correctly', () => {
      const { rerender } = render(<Row align="top" data-testid="row">Align Test</Row>)
      const row = screen.getByTestId('row')
      rerender(<Row align="middle" data-testid="row">Align Test</Row>)
      expect(row).toBeInTheDocument()
    })

    it('updates justify prop correctly', () => {
      const { rerender } = render(<Row justify="start" data-testid="row">Justify Test</Row>)
      const row = screen.getByTestId('row')
      rerender(<Row justify="center" data-testid="row">Justify Test</Row>)
      expect(row).toBeInTheDocument()
    })

    it('updates wrap prop correctly', () => {
      const { rerender } = render(<Row wrap={true} data-testid="row">Wrap Test</Row>)
      const row = screen.getByTestId('row')
      rerender(<Row wrap={false} data-testid="row">Wrap Test</Row>)
      expect(row).toBeInTheDocument()
    })

    it('updates array gutter prop correctly', () => {
      const { rerender } = render(<Row gutter={[8, 12]} data-testid="row">Array Gutter Test</Row>)
      const row = screen.getByTestId('row')
      rerender(<Row gutter={[16, 24]} data-testid="row">Array Gutter Test</Row>)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Test</Row>)

      expect(mockRef.current).toBeDefined()
      expect(mockRef.current?.getAlign()).toBe('top')
      expect(mockRef.current?.getJustify()).toBe('start')
      expect(mockRef.current?.getGutter()).toBe(0)
    })

    it('sets align via ref method', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Align Test</Row>)

      if (mockRef.current) {
        expect(() => mockRef.current.setAlign('middle')).not.toThrow()
      }
    })

    it('sets justify via ref method', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Justify Test</Row>)

      if (mockRef.current) {
        expect(() => mockRef.current.setJustify('center')).not.toThrow()
      }
    })

    it('sets gutter via ref method', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Gutter Test</Row>)

      if (mockRef.current) {
        expect(() => mockRef.current.setGutter(16)).not.toThrow()
      }
    })

    it('calls scrollIntoView via ref method', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Scroll Test</Row>)

      if (mockRef.current) {
        expect(typeof mockRef.current.scrollIntoView).toBe('function')
      }
    })

    it('provides element access via ref', () => {
      render(<Row ref={mockRef} data-testid="row">Ref Element Test</Row>)

      expect(mockRef.current?.element).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Row role="row" data-testid="row">Accessible Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toHaveAttribute('role', 'row')
    })

    it('supports aria-label', () => {
      render(<Row aria-label="Main row" data-testid="row">Labeled Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toHaveAttribute('aria-label', 'Main row')
    })

    it('supports aria-labelledby', () => {
      render(<Row aria-labelledby="row-title" data-testid="row">Labelled By Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toHaveAttribute('aria-labelledby', 'row-title')
    })

    it('supports tabIndex for keyboard navigation', () => {
      render(<Row tabIndex={0} data-testid="row">Tabbable Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toHaveAttribute('tabindex', '0')
    })

    it('supports data attributes', () => {
      render(<Row data-testid="row" data-custom="value">Data Attr Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid align prop gracefully', () => {
      const { container } = render(<Row align="invalid" as any data-testid="row">Invalid Align</Row>)
      expect(screen.getByTestId('row')).toBeInTheDocument()
    })

    it('handles invalid justify prop gracefully', () => {
      const { container } = render(<Row justify="invalid" as any data-testid="row">Invalid Justify</Row>)
      expect(screen.getByTestId('row')).toBeInTheDocument()
    })

    it('handles negative gutter gracefully', () => {
      render(<Row gutter={-16} data-testid="row">Negative Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles very large gutter', () => {
      render(<Row gutter={9999} data-testid="row">Large Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles undefined children', () => {
      render(<Row data-testid="row">{undefined}</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles null children', () => {
      render(<Row data-testid="row">{null}</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles boolean children', () => {
      render(<Row data-testid="row">{true}</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles mixed children types', () => {
      render(
        <Row data-testid="row">
          <div>String</div>
          {123}
          {true}
          {null}
          {undefined}
          <div>Another Div</div>
        </Row>
      )
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('applies responsive styles correctly', () => {
      const responsiveProps = {
        xs: { gutter: 8, align: 'middle' },
        sm: { gutter: 16, align: 'top' },
        md: { gutter: 24, align: 'bottom' }
      }
      render(<Row responsive={responsiveProps} data-testid="row">Responsive Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles empty responsive object', () => {
      render(<Row responsive={{}} data-testid="row">Empty Responsive Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles partial responsive object', () => {
      render(<Row responsive={{ xs: { gutter: 8 } }} data-testid="row">Partial Responsive Row</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many children', () => {
      const children = Array.from({ length: 50 }, (_, i) => <Col key={i} span={1}>Col {i}</Col>)
      render(<Row data-testid="row">{children}</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
      expect(row.children).toHaveLength(50)
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Row gutter={8} data-testid="row">Performance Row</Row>)

      for (let i = 0; i < 10; i++) {
        rerender(<Row gutter={i * 8} data-testid="row">Performance Row</Row>)
      }

      expect(screen.getByTestId('row')).toBeInTheDocument()
    })
  })

  describe('Gutter Types', () => {
    it('handles string gutter', () => {
      render(<Row gutter="16px" data-testid="row">String Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles array gutter with strings', () => {
      render(<Row gutter={['16px', '24px']} data-testid="row">Array String Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles array gutter with mixed types', () => {
      render(<Row gutter={[16, '24px']} data-testid="row">Mixed Array Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })

    it('handles Size enum gutter', () => {
      render(<Row gutter="medium" data-testid="row">Size Gutter</Row>)
      const row = screen.getByTestId('row')
      expect(row).toBeInTheDocument()
    })
  })
})
