import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import List from './index'
import ListItem from './ListItem'

interface MockItem {
  id: string;
  title: string;
  description: string;
}

describe('List 组件', () => {
  // 测试数据
  const mockData: MockItem[] = [
    { id: '1', title: '标题1', description: '描述1' },
    { id: '2', title: '标题2', description: '描述2' },
    { id: '3', title: '标题3', description: '描述3' },
  ]

  // 基础渲染测试
  it('应该正确渲染基础列表组件', () => {
    const { container } = render(
      <List
        dataSource={mockData}
        renderItem={(item: MockItem) => (
          <ListItem meta={{ title: item.title, description: item.description }} />
        )}
      />
    )

    const list = container.querySelector('.uno-list')
    expect(list).toBeInTheDocument()

    const items = container.querySelectorAll('.uno-list-item')
    expect(items).toHaveLength(3)

    const titles = container.querySelectorAll('.uno-list-item__title')
    expect(titles[0]).toHaveTextContent('标题1')
    expect(titles[1]).toHaveTextContent('标题2')
    expect(titles[2]).toHaveTextContent('标题3')
  })

  // 测试不同尺寸
  it('应该应用不同尺寸类名', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach(size => {
      const { container, unmount } = render(
        <List
          size={size}
          dataSource={mockData}
          renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
        />
      )
  
      expect(container.querySelector(`.uno-list--size-${size}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试不同布局
  it('应该应用不同布局类名', () => {
    const layouts = ['vertical', 'horizontal', 'grid'] as const

    layouts.forEach(layout => {
      const { container, unmount } = render(
        <List
          layout={layout}
          dataSource={mockData}
          renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
        />
      )
  
      expect(container.querySelector(`.uno-list--layout-${layout}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试边框和分割线
  it('应该正确应用边框和分割线样式', () => {
    const { container: withBorder } = render(
      <List
        bordered
        dataSource={mockData}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )
    expect(withBorder.querySelector('.uno-list--bordered')).toBeInTheDocument()

    const { container: withSplit } = render(
      <List
        split
        dataSource={mockData}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )
    expect(withSplit.querySelector('.uno-list--split')).toBeInTheDocument()
    expect(withSplit.querySelector('.uno-list__divider')).toBeInTheDocument()
  })

  // 测试空列表
  it('应该显示空列表提示', () => {
    const { container } = render(
      <List
        dataSource={[]}
        emptyText="没有数据"
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const emptyText = container.querySelector('.uno-list__empty')
    expect(emptyText).toBeInTheDocument()
    expect(emptyText).toHaveTextContent('没有数据')
  })

  // 测试加载状态
  it('应该显示加载状态', () => {
    const { container } = render(
      <List
        loading
        dataSource={mockData}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    expect(container.querySelector('.uno-list--loading')).toBeInTheDocument()
    expect(container.querySelector('.uno-list__loading-indicator')).toBeInTheDocument()
    expect(container.querySelector('.uno-list__loading-text')).toHaveTextContent('加载中...')
  })

  // 测试头部和底部
  it('应该正确渲染头部和底部', () => {
    const { container } = render(
      <List
        header={<div className="custom-header">列表头部</div>}
        footer={<div className="custom-footer">列表底部</div>}
        dataSource={mockData}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const header = container.querySelector('.uno-list__header')
    expect(header).toBeInTheDocument()
    expect(header?.querySelector('.custom-header')).toHaveTextContent('列表头部')

    const footer = container.querySelector('.uno-list__footer')
    expect(footer).toBeInTheDocument()
    expect(footer?.querySelector('.custom-footer')).toHaveTextContent('列表底部')
  })

  // 测试网格布局
  it('应该正确渲染网格布局', () => {
    const { container } = render(
      <List
        grid={{ column: 3, gutter: 16 }}
        dataSource={mockData}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const gridContainer = container.querySelector('.uno-list__grid-container')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveStyle({
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    })
  })

  // 测试项点击事件
  it('应该处理项点击事件', () => {
    const handleItemClick = jest.fn()

    const { container } = render(
      <List
        dataSource={mockData}
        onItemClick={handleItemClick}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const items = container.querySelectorAll('.uno-list__item')
    fireEvent.click(items[1])

    expect(handleItemClick).toHaveBeenCalledWith(mockData[1], 1)
  })

  // 测试分页功能
  it('应该正确渲染分页功能', () => {
    const handlePageChange = jest.fn()

    const { container } = render(
      <List
        dataSource={mockData}
        pagination={{
          current: 2,
          pageSize: 10,
          total: 35,
          onChange: handlePageChange
        }}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const pagination = container.querySelector('.uno-list__pagination')
    expect(pagination).toBeInTheDocument()

    const currentPage = container.querySelector('.uno-list__page-current')
    expect(currentPage).toHaveTextContent('2/4') // 总共4页

    // 测试下一页点击
    const nextPage = container.querySelector('.uno-list__page-next')
    fireEvent.click(nextPage as Element)
    expect(handlePageChange).toHaveBeenCalledWith(3, 10)
  })
  
  // 测试加载更多功能
  it('应该正确渲染加载更多功能', () => {
    const handleLoadMore = jest.fn()

    const { container } = render(
      <List
        dataSource={mockData}
        loadMore={{
          onLoadMore: handleLoadMore,
          loading: true,
          loadingText: '正在加载更多...'
        }}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const loadMore = container.querySelector('.uno-list__load-more')
    expect(loadMore).toBeInTheDocument()

    const loading = container.querySelector('.uno-list__loading')
    expect(loading).toBeInTheDocument()
    expect(loading).toHaveTextContent('正在加载更多...')
  })

  // 测试自定义类名和样式
  it('应该应用自定义类名和样式', () => {
    const { container } = render(
      <List
        dataSource={mockData}
        className="custom-list"
        style={{ margin: '10px' }}
        rowClassName={(item: MockItem, index: number) => `custom-row-${index}`}
        renderItem={(item: MockItem) => <ListItem>{item.title}</ListItem>}
      />
    )

    const list = container.querySelector('.uno-list')
    expect(list).toHaveClass('custom-list')
    expect(list).toHaveStyle('margin: 10px')

    const rows = container.querySelectorAll('.uno-list__item')
    expect(rows[0]).toHaveClass('custom-row-0')
    expect(rows[1]).toHaveClass('custom-row-1')
    expect(rows[2]).toHaveClass('custom-row-2')
  })
}) 