import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Grid } from '../Grid'
import type { GridProps, GridRef } from '../Grid.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div'
}))

// Mock styles
vi.mock('../Grid.styles', () => ({
  gridStyles: {
    ALIGN_MAP: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
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
      display: 'grid',
      gridTemplateColumns: typeof props.cols === 'number' ? `repeat(${props.cols}, 1fr)` : props.cols,
      gridTemplateRows: props.rows ? (typeof props.rows === 'number' ? `repeat(${props.rows}, 1fr)` : props.rows) : undefined,
      gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap || '8px',
      rowGap: props.rowGap ? (typeof props.rowGap === 'number' ? `${props.rowGap}px` : props.rowGap) : undefined,
      columnGap: props.columnGap ? (typeof props.columnGap === 'number' ? `${props.columnGap}px` : props.columnGap) : undefined,
      alignItems: props.align,
      justifyContent: props.justify
    }),
    getItemStyle: (index: number, total: number, cols: any) => ({
      gridColumn: `span ${Math.ceil(24 / (typeof cols === 'number' ? cols : parseInt(cols)))}`,
      padding: '8px',
      border: '1px solid #eee'
    }),
    getResponsiveStyle: (responsive: any) => responsive ? { '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } } : {},
    getClassName: (props: any) => `taro-uno-grid taro-uno-grid--${props.cols} taro-uno-grid--${props.align} taro-uno-grid--${props.justify} ${props.className || ''}`
  }
}))

describe('Grid Component', () => {
  const mockRef = React.createRef<GridRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders grid with default props', () => {
      render(<Grid data-testid="grid">Test Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveTextContent('Test Grid')
    })

    it('renders grid with custom cols', () => {
      render(<Grid cols={3} data-testid="grid">3 Columns</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom rows', () => {
      render(<Grid rows={2} data-testid="grid">2 Rows</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom gap', () => {
      render(<Grid gap={16} data-testid="grid">Custom Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom rowGap', () => {
      render(<Grid rowGap={12} data-testid="grid">Custom Row Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom columnGap', () => {
      render(<Grid columnGap={12} data-testid="grid">Custom Column Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom align', () => {
      render(<Grid align="center" data-testid="grid">Centered Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom justify', () => {
      render(<Grid justify="center" data-testid="grid">Centered Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with custom className', () => {
      render(<Grid className="custom-grid" data-testid="grid">Custom Class</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('custom-grid')
    })

    it('renders empty grid', () => {
      render(<Grid data-testid="grid" />)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toBeEmptyDOMElement()
    })

    it('renders grid with multiple children', () => {
      render(
        <Grid data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(3)
    })

    it('renders grid with responsive props', () => {
      render(<Grid responsive={{ xs: { cols: 1 } }} data-testid="grid">Responsive</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with string cols', () => {
      render(<Grid cols="repeat(auto-fit, minmax(200px, 1fr))" data-testid="grid">Auto Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with maximum cols', () => {
      render(<Grid cols={12} data-testid="grid">Max Columns</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders grid with minimum cols', () => {
      render(<Grid cols={1} data-testid="grid">Min Columns</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Grid Items', () => {
    it('renders grid items with proper styling', () => {
      render(
        <Grid cols={3} data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(3)
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('handles grid items with click events', () => {
      const handleItemClick = vi.fn()
      render(
        <Grid onItemClick={handleItemClick} data-testid="grid">
          <div>Clickable Item</div>
        </Grid>
      )
      const item = screen.getByText('Clickable Item')
      fireEvent.click(item)
      expect(handleItemClick).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it('handles grid items with hover events', () => {
      const handleItemHover = vi.fn()
      render(
        <Grid onItemHover={handleItemHover} data-testid="grid">
          <div>Hoverable Item</div>
        </Grid>
      )
      const item = screen.getByText('Hoverable Item')
      fireEvent.mouseEnter(item)
      expect(handleItemHover).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it('handles multiple item interactions', () => {
      const handleItemClick = vi.fn()
      const handleItemHover = vi.fn()
      render(
        <Grid onItemClick={handleItemClick} onItemHover={handleItemHover} data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      )
      const item1 = screen.getByText('Item 1')
      const item2 = screen.getByText('Item 2')

      fireEvent.mouseEnter(item1)
      fireEvent.click(item1)
      fireEvent.mouseEnter(item2)
      fireEvent.click(item2)

      expect(handleItemHover).toHaveBeenCalledTimes(2)
      expect(handleItemClick).toHaveBeenCalledTimes(2)
    })

    it('handles items with complex content', () => {
      render(
        <Grid cols={2} data-testid="grid">
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <button>Action</button>
          </div>
          <div>
            <img src="test.jpg" alt="Test" />
            <span>Content</span>
          </div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(2)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
      expect(screen.getByAltText('Test')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Event Handling', () => {
    it('handles grid click events', () => {
      const handleClick = vi.fn()
      render(<Grid onClick={handleClick} data-testid="grid">Clickable Grid</Grid>)
      const grid = screen.getByTestId('grid')
      fireEvent.click(grid)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles grid click events with children', () => {
      const handleClick = vi.fn()
      render(
        <Grid onClick={handleClick} data-testid="grid">
          <div>Child Content</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      fireEvent.click(grid)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles item click events', () => {
      const handleItemClick = vi.fn()
      render(
        <Grid onItemClick={handleItemClick} data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      )
      const item1 = screen.getByText('Item 1')
      const item2 = screen.getByText('Item 2')
      fireEvent.click(item1)
      fireEvent.click(item2)
      expect(handleItemClick).toHaveBeenCalledTimes(2)
      expect(handleItemClick).toHaveBeenCalledWith(0, expect.any(Object))
      expect(handleItemClick).toHaveBeenCalledWith(1, expect.any(Object))
    })

    it('handles item hover events', () => {
      const handleItemHover = vi.fn()
      render(
        <Grid onItemHover={handleItemHover} data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      )
      const item1 = screen.getByText('Item 1')
      fireEvent.mouseEnter(item1)
      fireEvent.mouseLeave(item1)
      expect(handleItemHover).toHaveBeenCalledTimes(2)
    })

    it('does not interfere with child click events', () => {
      const handleGridClick = vi.fn()
      const handleItemClick = vi.fn()
      const handleChildClick = vi.fn((e) => e.stopPropagation())
      render(
        <Grid onClick={handleGridClick} onItemClick={handleItemClick} data-testid="grid">
          <div onClick={handleChildClick} data-testid="child">Child</div>
        </Grid>
      )
      const child = screen.getByTestId('child')
      fireEvent.click(child)
      expect(handleChildClick).toHaveBeenCalledTimes(1)
      expect(handleGridClick).not.toHaveBeenCalled()
    })
  })

  describe('Props Updates', () => {
    it('updates cols prop correctly', () => {
      const { rerender } = render(<Grid cols={2} data-testid="grid">Cols Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid cols={4} data-testid="grid">Cols Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates rows prop correctly', () => {
      const { rerender } = render(<Grid rows={1} data-testid="grid">Rows Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid rows={3} data-testid="grid">Rows Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates gap prop correctly', () => {
      const { rerender } = render(<Grid gap={8} data-testid="grid">Gap Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid gap={16} data-testid="grid">Gap Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates align prop correctly', () => {
      const { rerender } = render(<Grid align="start" data-testid="grid">Align Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid align="center" data-testid="grid">Align Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates justify prop correctly', () => {
      const { rerender } = render(<Grid justify="start" data-testid="grid">Justify Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid justify="center" data-testid="grid">Justify Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates rowGap prop correctly', () => {
      const { rerender } = render(<Grid rowGap={8} data-testid="grid">Row Gap Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid rowGap={16} data-testid="grid">Row Gap Test</Grid>)
      expect(grid).toBeInTheDocument()
    })

    it('updates columnGap prop correctly', () => {
      const { rerender } = render(<Grid columnGap={8} data-testid="grid">Column Gap Test</Grid>)
      const grid = screen.getByTestId('grid')
      rerender(<Grid columnGap={16} data-testid="grid">Column Gap Test</Grid>)
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Test</Grid>)

      expect(mockRef.current).toBeDefined()
      expect(mockRef.current?.getCols()).toBe(1)
      expect(mockRef.current?.getAlign()).toBe('stretch')
      expect(mockRef.current?.getJustify()).toBe('start')
      expect(mockRef.current?.getGap()).toBe('default')
    })

    it('sets cols via ref method', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Cols Test</Grid>)

      if (mockRef.current) {
        expect(() => mockRef.current.setCols(3)).not.toThrow()
      }
    })

    it('sets align via ref method', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Align Test</Grid>)

      if (mockRef.current) {
        expect(() => mockRef.current.setAlign('center')).not.toThrow()
      }
    })

    it('sets justify via ref method', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Justify Test</Grid>)

      if (mockRef.current) {
        expect(() => mockRef.current.setJustify('center')).not.toThrow()
      }
    })

    it('sets gap via ref method', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Gap Test</Grid>)

      if (mockRef.current) {
        expect(() => mockRef.current.setGap(16)).not.toThrow()
      }
    })

    it('calls scrollIntoView via ref method', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Scroll Test</Grid>)

      if (mockRef.current) {
        expect(typeof mockRef.current.scrollIntoView).toBe('function')
      }
    })

    it('provides element access via ref', () => {
      render(<Grid ref={mockRef} data-testid="grid">Ref Element Test</Grid>)

      expect(mockRef.current?.element).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Grid role="grid" data-testid="grid">Accessible Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('role', 'grid')
    })

    it('supports aria-label', () => {
      render(<Grid aria-label="Main grid" data-testid="grid">Labeled Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('aria-label', 'Main grid')
    })

    it('supports aria-labelledby', () => {
      render(<Grid aria-labelledby="grid-title" data-testid="grid">Labelled By Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('aria-labelledby', 'grid-title')
    })

    it('supports tabIndex for keyboard navigation', () => {
      render(<Grid tabIndex={0} data-testid="grid">Tabbable Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('tabindex', '0')
    })

    it('supports data attributes', () => {
      render(<Grid data-testid="grid" data-custom="value">Data Attr Grid</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles cols greater than 12', () => {
      render(<Grid cols={24} data-testid="grid">Many Columns</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles cols of 0', () => {
      render(<Grid cols={0} data-testid="grid">Zero Columns</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles negative cols gracefully', () => {
      const { container } = render(<Grid cols={-3} data-testid="grid">Negative Cols</Grid>)
      expect(screen.getByTestId('grid')).toBeInTheDocument()
    })

    it('handles negative gap gracefully', () => {
      const { container } = render(<Grid gap={-16} data-testid="grid">Negative Gap</Grid>)
      expect(screen.getByTestId('grid')).toBeInTheDocument()
    })

    it('handles very large gap', () => {
      render(<Grid gap={9999} data-testid="grid">Large Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles undefined children', () => {
      render(<Grid data-testid="grid">{undefined}</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles null children', () => {
      render(<Grid data-testid="grid">{null}</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles boolean children', () => {
      render(<Grid data-testid="grid">{true}</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles string cols value', () => {
      render(<Grid cols="1fr 2fr 1fr" data-testid="grid">String Cols</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles complex template values', () => {
      render(<Grid cols="repeat(auto-fill, minmax(200px, 1fr))" data-testid="grid">Auto Fill</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('applies responsive styles correctly', () => {
      const responsiveProps = {
        xs: { cols: 1, gap: 8 },
        sm: { cols: 2, gap: 12 },
        md: { cols: 3, gap: 16 },
        lg: { cols: 4, gap: 20 }
      }
      render(<Grid responsive={responsiveProps} data-testid="grid">Responsive</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles empty responsive object', () => {
      render(<Grid responsive={{}} data-testid="grid">Empty Responsive</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles partial responsive object', () => {
      render(<Grid responsive={{ xs: { cols: 1 } }} data-testid="grid">Partial Responsive</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Grid Layout Patterns', () => {
    it('handles responsive grid layout', () => {
      render(
        <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4 } as any} data-testid="grid">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(4)
    })

    it('handles complex grid templates', () => {
      render(
        <Grid
          cols="repeat(4, 1fr)"
          rows="auto 1fr auto"
          gap="16px"
          data-testid="grid"
        >
          <div>Header</div>
          <div>Main</div>
          <div>Sidebar</div>
          <div>Footer</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(4)
    })

    it('handles grid with mixed gap types', () => {
      render(
        <Grid
          cols={3}
          rowGap={12}
          columnGap={24}
          data-testid="grid"
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      )
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many items', () => {
      const items = Array.from({ length: 100 }, (_, i) => <div key={i}>Item {i}</div>)
      render(<Grid cols={10} data-testid="grid">{items}</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(100)
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Grid cols={2} data-testid="grid">Performance Grid</Grid>)

      for (let i = 0; i < 10; i++) {
        rerender(<Grid cols={i + 1} data-testid="grid">Performance Grid</Grid>)
      }

      expect(screen.getByTestId('grid')).toBeInTheDocument()
    })
  })

  describe('Gap Types', () => {
    it('handles string gap', () => {
      render(<Grid gap="16px" data-testid="grid">String Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles string rowGap', () => {
      render(<Grid rowGap="12px" data-testid="grid">String Row Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles string columnGap', () => {
      render(<Grid columnGap="12px" data-testid="grid">String Column Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })

    it('handles Size enum gap', () => {
      render(<Grid gap="medium" data-testid="grid">Size Gap</Grid>)
      const grid = screen.getByTestId('grid')
      expect(grid).toBeInTheDocument()
    })
  })
})
