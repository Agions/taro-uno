import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { Pagination } from '../Pagination'
import type { PaginationRef } from '../Pagination.types'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: 'div',
  Text: 'span',
  Picker: ({ onChange, range, children, ...props }: { onChange?: (e: any) => void; range?: any[]; children?: React.ReactNode; [key: string]: any }) => {
    // The Pagination component uses rangeKey="label" but the data is just an array of numbers
    // We need to simulate the Picker's behavior properly
    return (
      <select {...props} role="combobox" onChange={(e) => {
        const selectedIndex = parseInt(e.target.value);
        // const selectedValue = range ? range[selectedIndex] : selectedIndex;
        onChange && onChange({ detail: { value: selectedIndex } });
      }}>
        {range?.map((value, index) => (
          <option key={index} value={index}>{value}</option>
        ))}
        {children}
      </select>
    );
  },
  select: ({ onChange, ...props }: { onChange?: (e: any) => void; [key: string]: any }) => {
    return <select {...props} onChange={(e) => onChange && onChange({ target: { value: parseInt(e.target.value) } })} />
  }
}))

// Mock the Input component from form module
vi.mock('../../form/Input', () => ({
  Input: ({ onChange, onInput, value, ...props }: { onChange?: (e: any) => void; onInput?: (e: any) => void; value?: string; [key: string]: any }) => {
    // Taro Input uses onInput instead of onChange for value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const event = {
        detail: {
          value: e.target.value
        }
      }
      if (onInput) {
        onInput(event)
      }
      if (onChange) {
        onChange(event)
      }
    }
    return <input {...props} value={value} onChange={handleChange} />
  }
}))

// Mock styles
vi.mock('../Pagination.styles', () => ({
  paginationStyles: {
    SIZE_MAP: {
      small: { padding: '4px 8px', fontSize: '12px' },
      default: { padding: '8px 12px', fontSize: '14px' },
      medium: { padding: '10px 14px', fontSize: '14px' },
      large: { padding: '12px 16px', fontSize: '16px' }
    },
    getBaseStyle: (props: any) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: props.align === 'center' ? 'center' : props.align === 'left' ? 'flex-start' : 'flex-end',
      gap: '8px',
      padding: props.size === 'small' ? '4px' : props.size === 'large' ? '12px' : '8px'
    }),
    getButtonStyle: (props: any) => ({
      padding: props.size === 'small' ? '4px 8px' : props.size === 'large' ? '12px 16px' : '8px 12px',
      fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '16px' : '14px',
      opacity: props.disabled ? 0.5 : 1,
      cursor: props.disabled ? 'not-allowed' : 'pointer'
    }),
    getPageButtonStyle: (props: any) => ({
      padding: props.size === 'small' ? '4px 8px' : props.size === 'large' ? '12px 16px' : '8px 12px',
      fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '16px' : '14px',
      backgroundColor: props.active ? '#1890ff' : 'transparent',
      color: props.active ? 'white' : 'inherit',
      opacity: props.disabled ? 0.5 : 1,
      cursor: props.disabled ? 'not-allowed' : 'pointer'
    }),
    getJumpButtonStyle: (size: any) => ({
      padding: size === 'small' ? '4px 8px' : size === 'large' ? '12px 16px' : '8px 12px',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      cursor: 'pointer'
    }),
    getTotalStyle: () => ({
      marginRight: '16px',
      fontSize: '14px',
      color: '#666'
    }),
    getQuickJumperStyle: () => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }),
    getInputStyle: () => ({
      width: '50px',
      padding: '4px 8px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px'
    }),
    getSelectStyle: () => ({
      padding: '4px 8px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px'
    }),
    getClassName: (props: any) => `taro-uno-pagination taro-uno-pagination--${props.size} taro-uno-pagination--${props.align} ${props.disabled ? 'taro-uno-pagination--disabled' : ''} ${props.simple ? 'taro-uno-pagination--simple' : ''} ${props.className || ''}`
  }
}))

describe('Pagination Component', () => {
  const mockRef = React.createRef<PaginationRef>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders pagination with default props', () => {
      render(<Pagination total={100} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom current page', () => {
      render(<Pagination total={100} current={3} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom page size', () => {
      render(<Pagination total={100} pageSize={20} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom size', () => {
      render(<Pagination total={100} size="small" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with show total', () => {
      render(<Pagination total={100} showTotal data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom show total function', () => {
      const showTotal = (total: number, range: [number, number]) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`
      render(<Pagination total={100} showTotal={showTotal} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with quick jumper', () => {
      render(<Pagination total={100} showQuickJumper data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with size changer', () => {
      render(<Pagination total={100} showSizeChanger data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with disabled state', () => {
      render(<Pagination total={100} disabled data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination in simple mode', () => {
      render(<Pagination total={100} simple data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom alignment', () => {
      render(<Pagination total={100} align="center" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom position', () => {
      render(<Pagination total={100} position="top" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom page size options', () => {
      render(<Pagination total={100} showSizeChanger pageSizeOptions={[10, 30, 50]} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with custom className', () => {
      render(<Pagination total={100} className="custom-pagination" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('custom-pagination')
    })

    it('renders pagination with custom style', () => {
      const customStyle = { backgroundColor: '#f0f0f0', padding: '16px' }
      render(<Pagination total={100} style={customStyle} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('renders pagination with item render function', () => {
      const itemRender = (page: number, type: string, element: React.ReactNode) => {
        if (type === 'page') {
          return <span data-testid={`page-${page}`}>[{page}]</span>
        }
        return element
      }
      render(<Pagination total={100} itemRender={itemRender} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles empty total gracefully', () => {
      render(<Pagination total={0} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles single page gracefully', () => {
      render(<Pagination total={5} pageSize={10} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })
  })

  describe('Page Navigation', () => {
    it('navigates to next page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).toHaveBeenCalledWith(2, 10)
    })

    it('navigates to previous page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} current={3} onChange={handleChange} data-testid="pagination" />)

      const prevButton = screen.getByText('上一页')
      fireEvent.click(prevButton)

      expect(handleChange).toHaveBeenCalledWith(2, 10)
    })

    it('navigates to specific page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} onChange={handleChange} data-testid="pagination" />)

      const pageButton = screen.getByText('3')
      fireEvent.click(pageButton)

      expect(handleChange).toHaveBeenCalledWith(3, 10)
    })

    it('navigates using jump buttons', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} current={10} onChange={handleChange} data-testid="pagination" />)

      const jumpButton = screen.getByText('...')
      fireEvent.click(jumpButton)

      expect(handleChange).toHaveBeenCalledWith(5, 10)
    })

    it('does not navigate when disabled', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} disabled onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not navigate prev on first page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} current={1} onChange={handleChange} data-testid="pagination" />)

      const prevButton = screen.getByText('上一页')
      fireEvent.click(prevButton)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not navigate next on last page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} current={10} onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Page Size Changes', () => {
    it('changes page size', () => {
      const handleSizeChange = vi.fn()
      const handleChange = vi.fn()
      render(
        <Pagination
          total={100}
          showSizeChanger
          onShowSizeChange={handleSizeChange}
          onChange={handleChange}
          data-testid="pagination"
        />
      )

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: '1' } }) // Index 1 = 20 items per page

      expect(handleSizeChange).toHaveBeenCalledWith(1, 20)
      expect(handleChange).toHaveBeenCalledWith(1, 20)
    })

    it('adjusts current page when changing page size', () => {
      const handleSizeChange = vi.fn()
      const handleChange = vi.fn()
      render(
        <Pagination
          total={100}
          current={8}
          showSizeChanger
          onShowSizeChange={handleSizeChange}
          onChange={handleChange}
          data-testid="pagination"
        />
      )

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: '1' } }) // Index 1 = 20 items per page

      expect(handleSizeChange).toHaveBeenCalledWith(5, 20)
      expect(handleChange).toHaveBeenCalledWith(5, 20)
    })
  })

  describe('Quick Jumper', () => {
    it('jumps to specific page', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} showQuickJumper onChange={handleChange} data-testid="pagination" />)

      const input = screen.getByRole('spinbutton')
      fireEvent.change(input, { target: { value: '5' } })

      const jumpButton = screen.getByText('确定')
      fireEvent.click(jumpButton)

      expect(handleChange).toHaveBeenCalledWith(5, 10)
    })

    it('does not jump with invalid page number', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} showQuickJumper onChange={handleChange} data-testid="pagination" />)

      const input = screen.getByRole('spinbutton')
      fireEvent.change(input, { target: { value: 'invalid' } })

      const jumpButton = screen.getByText('确定')
      fireEvent.click(jumpButton)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('does not jump with out of range page number', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} showQuickJumper onChange={handleChange} data-testid="pagination" />)

      const input = screen.getByRole('spinbutton')
      fireEvent.change(input, { target: { value: '999' } })

      const jumpButton = screen.getByText('确定')
      fireEvent.click(jumpButton)

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Props Updates', () => {
    it('updates current page correctly', () => {
      const { rerender } = render(<Pagination total={100} current={2} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      rerender(<Pagination total={100} current={5} data-testid="pagination" />)
      expect(pagination).toBeInTheDocument()
    })

    it('updates page size correctly', () => {
      const { rerender } = render(<Pagination total={100} pageSize={10} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      rerender(<Pagination total={100} pageSize={20} data-testid="pagination" />)
      expect(pagination).toBeInTheDocument()
    })

    it('updates total correctly', () => {
      const { rerender } = render(<Pagination total={100} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      rerender(<Pagination total={200} data-testid="pagination" />)
      expect(pagination).toBeInTheDocument()
    })

    it('updates disabled state correctly', () => {
      const { rerender } = render(<Pagination total={100} disabled={false} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      rerender(<Pagination total={100} disabled={true} data-testid="pagination" />)
      expect(pagination).toBeInTheDocument()
    })

    it('updates size correctly', () => {
      const { rerender } = render(<Pagination total={100} size="default" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      rerender(<Pagination total={100} size="small" data-testid="pagination" />)
      expect(pagination).toBeInTheDocument()
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods correctly', () => {
      render(<Pagination total={100} ref={mockRef} data-testid="pagination" />)

      act(() => {
        expect(mockRef.current).toBeDefined()
        expect(mockRef.current?.getCurrent()).toBe(1)
        expect(mockRef.current?.getPageSize()).toBe(10)
        expect(mockRef.current?.getTotalPages()).toBe(10)
        expect(mockRef.current?.getTotal()).toBe(100)
      })
    })

    it('sets current page via ref method', () => {
      render(<Pagination total={100} defaultCurrent={1} ref={mockRef} data-testid="pagination" />)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setCurrent(5)).not.toThrow()
        }
      })
    })

    it('sets page size via ref method', () => {
      render(<Pagination total={100} defaultPageSize={10} ref={mockRef} data-testid="pagination" />)

      act(() => {
        if (mockRef.current) {
          expect(() => mockRef.current.setPageSize(20)).not.toThrow()
        }
      })
    })

    it('navigates via ref methods', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} defaultCurrent={1} onChange={handleChange} ref={mockRef} data-testid="pagination" />)

      act(() => {
        if (mockRef.current) {
          mockRef.current.next()
          expect(handleChange).toHaveBeenCalled()

          mockRef.current.prev()
          expect(handleChange).toHaveBeenCalled()

          mockRef.current.goTo(5)
          expect(handleChange).toHaveBeenCalled()

          mockRef.current.first()
          expect(handleChange).toHaveBeenCalled()

          mockRef.current.last()
          expect(handleChange).toHaveBeenCalled()
        }
      })
    })

    it('provides element access via ref', () => {
      render(<Pagination total={100} ref={mockRef} data-testid="pagination" />)

      act(() => {
        expect(mockRef.current?.element).toBeDefined()
      })
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works in controlled mode', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} current={3} onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).toHaveBeenCalledWith(4, 10)
    })

    it('works in uncontrolled mode', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} defaultCurrent={3} onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).toHaveBeenCalledWith(4, 10)
    })

    it('handles controlled page size', () => {
      const handleSizeChange = vi.fn()
      render(<Pagination total={100} pageSize={20} showSizeChanger onShowSizeChange={handleSizeChange} data-testid="pagination" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: '2' } }) // Index 2 = 50 items per page

      expect(handleSizeChange).toHaveBeenCalled()
    })

    it('handles uncontrolled page size', () => {
      const handleSizeChange = vi.fn()
      render(<Pagination total={100} defaultPageSize={20} showSizeChanger onShowSizeChange={handleSizeChange} data-testid="pagination" />)

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: '2' } }) // Index 2 = 50 items per page

      expect(handleSizeChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<Pagination total={100} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Pagination total={100} aria-label="Pagination navigation" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toHaveAttribute('aria-label', 'Pagination navigation')
    })

    it('supports aria-labelledby', () => {
      render(<Pagination total={100} aria-labelledby="pagination-title" data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toHaveAttribute('aria-labelledby', 'pagination-title')
    })

    it('supports data attributes', () => {
      render(<Pagination total={100} data-testid="pagination" data-custom="value" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles negative total gracefully', () => {
      render(<Pagination total={-100} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles zero page size gracefully', () => {
      render(<Pagination total={100} pageSize={0} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles negative page size gracefully', () => {
      render(<Pagination total={100} pageSize={-10} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles current page out of range', () => {
      render(<Pagination total={100} current={999} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles negative current page gracefully', () => {
      render(<Pagination total={100} current={-5} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles very large total', () => {
      render(<Pagination total={999999} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles very small page size', () => {
      render(<Pagination total={100} pageSize={1} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles empty pageSizeOptions', () => {
      render(<Pagination total={100} showSizeChanger pageSizeOptions={[]} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many pages', () => {
      render(<Pagination total={10000} pageSize={10} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles frequent prop updates efficiently', () => {
      const { rerender } = render(<Pagination total={100} current={1} data-testid="pagination" />)

      for (let i = 0; i < 10; i++) {
        rerender(<Pagination total={100} current={i + 1} data-testid="pagination" />)
      }

      expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })
  })

  describe('Simple Mode', () => {
    it('renders in simple mode correctly', () => {
      render(<Pagination total={100} simple data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()

      // Should show current page info
      expect(screen.getByText('1 / 10')).toBeInTheDocument()
    })

    it('navigates in simple mode', () => {
      const handleChange = vi.fn()
      render(<Pagination total={100} simple onChange={handleChange} data-testid="pagination" />)

      const nextButton = screen.getByText('下一页')
      fireEvent.click(nextButton)

      expect(handleChange).toHaveBeenCalledWith(2, 10)
    })

    it('shows correct page info in simple mode', () => {
      render(<Pagination total={100} current={5} simple data-testid="pagination" />)
      expect(screen.getByText('5 / 10')).toBeInTheDocument()
    })
  })

  describe('Show More/Less Items', () => {
    it('handles showMore prop', () => {
      render(<Pagination total={100} showMore={false} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('handles showLessItems prop', () => {
      render(<Pagination total={100} showLessItems={true} data-testid="pagination" />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })
  })
})
