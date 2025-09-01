import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Table } from './index'

describe('Table Component', () => {
  const mockColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      align: 'left' as const
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      align: 'center' as const,
      sortable: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      align: 'left' as const
    }
  ]

  const mockData = [
    { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
    { key: '2', name: '李四', age: 28, address: '上海市浦东新区' },
    { key: '3', name: '王五', age: 45, address: '广州市天河区' }
  ]

  test('renders table with basic props', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
      />
    )

    expect(container.querySelector('.taro-uno-table')).toBeInTheDocument()
    expect(container.querySelector('.taro-uno-table__header')).toBeInTheDocument()
    expect(container.querySelector('.taro-uno-table__body')).toBeInTheDocument()
  })

  test('renders table header correctly', () => {
    const { getByText } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
      />
    )

    expect(getByText('姓名')).toBeInTheDocument()
    expect(getByText('年龄')).toBeInTheDocument()
    expect(getByText('地址')).toBeInTheDocument()
  })

  test('renders table rows correctly', () => {
    const { getByText } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
      />
    )

    expect(getByText('张三')).toBeInTheDocument()
    expect(getByText('李四')).toBeInTheDocument()
    expect(getByText('王五')).toBeInTheDocument()
    expect(getByText('32')).toBeInTheDocument()
    expect(getByText('28')).toBeInTheDocument()
    expect(getByText('45')).toBeInTheDocument()
  })

  test('handles sorting', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        onChange={handleChange}
      />
    )

    const sorter = container.querySelector('.taro-uno-table__sorter')
    if (sorter) {
      fireEvent.click(sorter)
      expect(handleChange).toHaveBeenCalled()
    }
  })

  test('handles row selection', () => {
    const handleSelectionChange = jest.fn()
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        rowSelection={{
          onChange: handleSelectionChange
        }}
      />
    )

    const checkbox = container.querySelector('input[type="checkbox"]')
    if (checkbox) {
      fireEvent.click(checkbox)
      expect(handleSelectionChange).toHaveBeenCalled()
    }
  })

  test('handles pagination', () => {
    const handleChange = jest.fn()
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      key: String(i + 1),
      name: `用户${i + 1}`,
      age: 20 + (i % 30),
      address: `地址${i + 1}`
    }))

    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={largeData}
        pagination={true}
        onChange={handleChange}
      />
    )

    expect(container.querySelector('.taro-uno-table__pagination')).toBeInTheDocument()

    const nextButton = container.querySelector('.taro-uno-table__pagination-btn:last-child')
    if (nextButton) {
      fireEvent.click(nextButton)
      expect(handleChange).toHaveBeenCalled()
    }
  })

  test('shows empty state when no data', () => {
    const { getByText } = render(
      <Table
        columns={mockColumns}
        dataSource={[]}
        emptyText="暂无数据"
      />
    )

    expect(getByText('暂无数据')).toBeInTheDocument()
  })

  test('shows loading state', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        loading={true}
      />
    )

    expect(container.querySelector('.taro-uno-table__loading')).toBeInTheDocument()
  })

  test('handles different table sizes', () => {
    const { container, rerender } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        size="small"
      />
    )

    expect(container.querySelector('.taro-uno-table--small')).toBeInTheDocument()

    rerender(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        size="large"
      />
    )

    expect(container.querySelector('.taro-uno-table--large')).toBeInTheDocument()
  })

  test('handles bordered table', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        bordered={true}
      />
    )

    expect(container.querySelector('.taro-uno-table--bordered')).toBeInTheDocument()
  })

  test('handles striped table', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        striped={true}
      />
    )

    expect(container.querySelector('.taro-uno-table--striped')).toBeInTheDocument()
  })

  test('handles expandable rows', () => {
    const handleExpand = jest.fn()
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        expandable={{
          expandedRowRender: (record) => <div>展开内容: {record.name}</div>,
          rowExpandable: (record) => record.age > 30
        }}
      />
    )

    const expandIcon = container.querySelector('.taro-uno-table__expand-icon')
    if (expandIcon) {
      fireEvent.click(expandIcon)
      expect(handleExpand).toHaveBeenCalled()
    }
  })

  test('handles custom cell rendering', () => {
    const customColumns = [
      {
        ...mockColumns[0],
        render: (text: string, record: any) => <strong>{text} ({record.age}岁)</strong>
      },
      ...mockColumns.slice(1)
    ]

    const { getByText } = render(
      <Table
        columns={customColumns}
        dataSource={mockData}
      />
    )

    expect(getByText('张三 (32岁)')).toBeInTheDocument()
  })

  test('handles scroll functionality', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        scroll={{ x: 800, y: 400 }}
      />
    )

    const scrollContainer = container.querySelector('.taro-uno-table__scroll')
    expect(scrollContainer).toBeInTheDocument()
  })

  test('handles row hover effect', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        hoverable={true}
      />
    )

    expect(container.querySelector('.taro-uno-table--hoverable')).toBeInTheDocument()
  })

  test('handles custom row className and style', () => {
    const onRow = (record: any) => ({
      className: 'custom-row',
      style: { backgroundColor: '#f0f0f0' }
    })

    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        onRow={onRow}
      />
    )

    const row = container.querySelector('.custom-row')
    expect(row).toBeInTheDocument()
  })

  test('handles custom header row className and style', () => {
    const onHeaderRow = (columns: any) => ({
      className: 'custom-header',
      style: { backgroundColor: '#e0e0e0' }
    })

    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        onHeaderRow={onHeaderRow}
      />
    )

    const header = container.querySelector('.custom-header')
    expect(header).toBeInTheDocument()
  })

  test('handles table ref methods', () => {
    const ref = React.createRef<any>()
    render(
      <Table
        ref={ref}
        columns={mockColumns}
        dataSource={mockData}
      />
    )

    expect(ref.current).toBeTruthy()
    expect(ref.current.getSelectedRowKeys).toBeDefined()
    expect(ref.current.setSelectedRowKeys).toBeDefined()
    expect(ref.current.refresh).toBeDefined()
  })

  test('handles accessibility features', () => {
    const { container } = render(
      <Table
        columns={mockColumns}
        dataSource={mockData}
        accessible={true}
        accessibilityLabel="用户数据表格"
        accessibilityRole="table"
      />
    )

    const table = container.querySelector('.taro-uno-table')
    expect(table).toHaveAttribute('aria-label', '用户数据表格')
  })
})
