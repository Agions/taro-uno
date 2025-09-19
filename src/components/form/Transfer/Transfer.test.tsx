import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Transfer } from './Transfer'
import type { TransferProps, TransferRef, TransferOption } from './Transfer.types'

describe('Transfer Component', () => {
  const mockDataSource: TransferOption[] = [
    { key: '1', title: '选项1', description: '描述1' },
    { key: '2', title: '选项2', description: '描述2' },
    { key: '3', title: '选项3', description: '描述3' },
    { key: '4', title: '选项4', description: '描述4' },
    { key: '5', title: '选项5', description: '描述5' }
  ]

  const defaultProps: TransferProps = {
    dataSource: mockDataSource,
    onChange: vi.fn(),
    onSelectChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders transfer with default props', () => {
      render(<Transfer {...defaultProps} />)

      expect(screen.getByText('源列表')).toBeInTheDocument()
      expect(screen.getByText('目标列表')).toBeInTheDocument()
      expect(screen.getByText('>')).toBeInTheDocument()
      expect(screen.getByText('<')).toBeInTheDocument()
    })

    it('renders transfer with different sizes', () => {
      const sizes: Array<TransferProps['size']> = ['small', 'medium', 'large']

      sizes.forEach(size => {
        const { container } = render(<Transfer {...defaultProps} size={size} />)
        expect(container.firstChild).toBeInTheDocument()
        // Size affects styling, not CSS classes in this implementation
      })
    })

    it('renders transfer with different layouts', () => {
      const layouts: Array<TransferProps['layout']> = ['horizontal', 'vertical']

      layouts.forEach(layout => {
        const { container } = render(<Transfer {...defaultProps} layout={layout} />)
        expect(container.firstChild).toBeInTheDocument()
        // Layout affects styling, not CSS classes in this implementation
      })
    })

    it('renders transfer with disabled state', () => {
      render(<Transfer {...defaultProps} disabled={true} />)

      const transfer = screen.getByRole('application')
      expect(transfer).toBeInTheDocument()
    })

    it('renders transfer with custom titles', () => {
      render(<Transfer {...defaultProps} titles={['可用选项', '已选选项']} />)

      expect(screen.getByText('可用选项')).toBeInTheDocument()
      expect(screen.getByText('已选选项')).toBeInTheDocument()
    })

    it('renders transfer with custom operations', () => {
      render(<Transfer {...defaultProps} operations={['添加', '移除']} />)

      expect(screen.getByText('添加')).toBeInTheDocument()
      expect(screen.getByText('移除')).toBeInTheDocument()
    })

    it('renders transfer without operations', () => {
      render(<Transfer {...defaultProps} showOperations={false} />)

      expect(screen.queryByText('>')).not.toBeInTheDocument()
      expect(screen.queryByText('<')).not.toBeInTheDocument()
    })

    it('renders transfer with search', () => {
      render(<Transfer {...defaultProps} showSearch={true} />)

      const searchInputs = screen.getAllByPlaceholderText('请搜索')
      expect(searchInputs).toHaveLength(2)
    })

    it('renders transfer with empty state', () => {
      render(<Transfer {...defaultProps} dataSource={[]} notFoundContent="暂无数据" />)

      expect(screen.getByText('暂无数据')).toBeInTheDocument()
    })
  })

  describe('Data Handling', () => {
    it('handles controlled target keys', () => {
      const { rerender } = render(<Transfer {...defaultProps} targetKeys={['1', '2']} />)

      expect(screen.getByText('选项1')).toBeInTheDocument()
      expect(screen.getByText('选项2')).toBeInTheDocument()

      rerender(<Transfer {...defaultProps} targetKeys={['3', '4']} />)
      expect(screen.getByText('选项3')).toBeInTheDocument()
      expect(screen.getByText('选项4')).toBeInTheDocument()
    })

    it('handles uncontrolled target keys with default target keys', () => {
      render(<Transfer {...defaultProps} defaultTargetKeys={['1', '2']} />)

      expect(screen.getByText('选项1')).toBeInTheDocument()
      expect(screen.getByText('选项2')).toBeInTheDocument()
    })

    it('calls onChange when target keys change', () => {
      render(<Transfer {...defaultProps} />)

      // Simulate moving an item
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0]) // Select first item

      const moveToRightButton = screen.getByText('>')
      fireEvent.click(moveToRightButton)

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('calls onSelectChange when selected keys change', () => {
      render(<Transfer {...defaultProps} />)

      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])

      expect(defaultProps.onSelectChange).toHaveBeenCalled()
    })
  })

  describe('Search Functionality', () => {
    it('filters items based on search input', () => {
      render(<Transfer {...defaultProps} showSearch={true} />)

      const searchInput = screen.getAllByPlaceholderText('请搜索')[0]
      fireEvent.change(searchInput, { target: { value: '选项1' } })

      expect(screen.getByText('选项1')).toBeInTheDocument()
      expect(screen.queryByText('选项2')).not.toBeInTheDocument()
    })

    it('uses custom filter option', () => {
      const customFilterOption = (inputValue: string, option: TransferOption) => {
        return option.description?.includes(inputValue) || false
      }

      render(<Transfer {...defaultProps} showSearch={true} filterOption={customFilterOption} />)

      const searchInput = screen.getAllByPlaceholderText('请搜索')[0]
      fireEvent.change(searchInput, { target: { value: '描述1' } })

      expect(screen.getByText('选项1')).toBeInTheDocument()
      expect(screen.queryByText('选项2')).not.toBeInTheDocument()
    })

    it('calls onSearch when search value changes', () => {
      const onSearch = vi.fn()
      render(<Transfer {...defaultProps} showSearch={true} onSearch={onSearch} />)

      const searchInput = screen.getAllByPlaceholderText('请搜索')[0]
      fireEvent.change(searchInput, { target: { value: 'test' } })

      expect(onSearch).toHaveBeenCalled()
    })
  })

  describe('Transfer Operations', () => {
    it('moves items from source to target', () => {
      render(<Transfer {...defaultProps} />)

      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0]) // Select first item
      fireEvent.click(screen.getByText('>'))

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('handles one way transfer', () => {
      render(<Transfer {...defaultProps} oneWay={true} />)

      expect(screen.queryByText('<')).not.toBeInTheDocument()
    })
  })

  describe('Custom Rendering', () => {
    it('uses custom item render', () => {
      const customRender = (item: TransferOption) => (
        <div>
          <span>{item.title}</span>
          <span> - 自定义</span>
        </div>
      )

      render(<Transfer {...defaultProps} render={customRender} />)

      expect(screen.getByText('选项1 - 自定义')).toBeInTheDocument()
    })

    it('uses custom empty render', () => {
      const customEmptyRender = () => <div>自定义空状态</div>

      render(<Transfer {...defaultProps} dataSource={[]} emptyRender={customEmptyRender} />)

      expect(screen.getByText('自定义空状态')).toBeInTheDocument()
    })
  })

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = React.createRef<TransferRef>()
      render(<Transfer {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current?.getTargetKeys).toBeDefined()
      expect(ref.current?.setTargetKeys).toBeDefined()
      expect(ref.current?.getSelectedKeys).toBeDefined()
      expect(ref.current?.setSelectedKeys).toBeDefined()
    })

    it('getTargetKeys returns current target keys', () => {
      const ref = React.createRef<TransferRef>()
      render(<Transfer {...defaultProps} targetKeys={['1', '2']} ref={ref} />)

      expect(ref.current?.getTargetKeys()).toEqual(['1', '2'])
    })

    it('setTargetKeys updates target keys', () => {
      const ref = React.createRef<TransferRef>()
      const onChange = vi.fn()
      render(<Transfer {...defaultProps} ref={ref} onChange={onChange} />)

      ref.current?.setTargetKeys(['1', '2'])
      expect(onChange).toHaveBeenCalled()
    })

    it('getSelectedKeys returns current selected keys', () => {
      const ref = React.createRef<TransferRef>()
      render(<Transfer {...defaultProps} selectedKeys={['1', '2']} ref={ref} />)

      expect(ref.current?.getSelectedKeys()).toEqual(['1', '2'])
    })

    it('setSelectedKeys updates selected keys', () => {
      const ref = React.createRef<TransferRef>()
      const onSelectChange = vi.fn()
      render(<Transfer {...defaultProps} ref={ref} onSelectChange={onSelectChange} />)

      ref.current?.setSelectedKeys(['1', '2'])
      expect(onSelectChange).toHaveBeenCalled()
    })

    it('moveToTarget moves items to target', () => {
      const ref = React.createRef<TransferRef>()
      const onChange = vi.fn()
      render(<Transfer {...defaultProps} ref={ref} onChange={onChange} />)

      ref.current?.moveToTarget(['1', '2'])
      expect(onChange).toHaveBeenCalled()
    })

    it('moveToSource moves items to source', () => {
      const ref = React.createRef<TransferRef>()
      const onChange = vi.fn()
      render(<Transfer {...defaultProps} targetKeys={['1', '2']} ref={ref} onChange={onChange} />)

      ref.current?.moveToSource(['1', '2'])
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Transfer {...defaultProps} />)

      const transfer = screen.getByRole('application')
      expect(transfer).toBeInTheDocument()
    })

    it('supports custom accessibility props', () => {
      render(
        <Transfer
          {...defaultProps}
          accessibilityLabel="Transfer items"
          accessibilityRole="application"
          accessible={true}
        />
      )

      const transfer = screen.getByRole('application')
      expect(transfer).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty data source', () => {
      render(<Transfer {...defaultProps} dataSource={[]} />)

      expect(screen.getByText('无数据')).toBeInTheDocument()
    })

    it('handles custom not found content', () => {
      render(<Transfer {...defaultProps} dataSource={[]} notFoundContent="没有找到数据" />)

      expect(screen.getByText('没有找到数据')).toBeInTheDocument()
    })
  })
})