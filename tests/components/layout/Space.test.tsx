import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Space } from '@/components'

describe('Space 组件', () => {
  // 基本渲染测试
  it('应该正确渲染基本间距', () => {
    const { container } = render(
      <Space>
        <div>项目1</div>
        <div>项目2</div>
        <div>项目3</div>
      </Space>
    )
    expect(container.firstChild).toHaveClass('taro-uno-space')
    expect(container.firstChild).toHaveClass('taro-uno-space--direction-horizontal')
    
    // 检查子元素数量
    const items = container.querySelectorAll('.taro-uno-space__item')
    expect(items.length).toBe(3)
  })

  // 尺寸测试
  it('应该应用正确的小尺寸间距', () => {
    const { container } = render(
      <Space size='small'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 8px')
  })

  it('应该应用正确的中等尺寸间距', () => {
    const { container } = render(
      <Space size='medium'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 16px')
  })

  it('应该应用正确的大尺寸间距', () => {
    const { container } = render(
      <Space size='large'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 24px')
  })

  it('应该应用正确的迷你尺寸间距', () => {
    const { container } = render(
      <Space size='mini'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 4px')
  })

  it('应该应用正确的自定义尺寸间距', () => {
    const { container } = render(
      <Space size={32}>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 32px')
  })

  it('应该应用正确的数组尺寸间距', () => {
    const { container } = render(
      <Space size={['large', 'small']}>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 24px')
  })

  // 方向测试
  it('应该正确渲染水平方向的间距', () => {
    const { container } = render(
      <Space direction='horizontal'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--direction-horizontal')
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-right: 8px')
    expect(item).toHaveStyle('margin-bottom: 0')
  })

  it('应该正确渲染垂直方向的间距', () => {
    const { container } = render(
      <Space direction='vertical'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--direction-vertical')
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-bottom: 8px')
  })

  // 对齐方式测试
  it('应该正确应用对齐方式', () => {
    const { container } = render(
      <Space align='center' justify='between'>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--align-center')
    expect(container.firstChild).toHaveClass('taro-uno-space--justify-between')
  })

  // 自动换行测试
  it('应该正确应用自动换行', () => {
    const { container } = render(
      <Space wrap>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--wrap')
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-bottom: 8px')
  })

  // 块级显示测试
  it('应该正确应用块级显示', () => {
    const { container } = render(
      <Space block>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--block')
    expect(container.firstChild).toHaveStyle('width: 100%')
  })

  // 分隔符测试
  it('应该正确渲染分隔符', () => {
    const { container } = render(
      <Space split='|'>
        <div>项目1</div>
        <div>项目2</div>
        <div>项目3</div>
      </Space>
    )
    
    const splits = container.querySelectorAll('.taro-uno-space__split')
    expect(splits.length).toBe(2)
    expect(splits[0]).toHaveTextContent('|')
  })

  // 自定义类名和样式测试
  it('应该正确应用自定义类名和样式', () => {
    const { container } = render(
      <Space className='custom-space' style={{ backgroundColor: '#f5f5f5' }}>
        <div>项目1</div>
        <div>项目2</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space')
    expect(container.firstChild).toHaveClass('custom-space')
    expect(container.firstChild).toHaveStyle('background-color: #f5f5f5')
  })

  // 空子元素测试
  it('应该正确处理空子元素', () => {
    const { container } = render(
      <Space>
        <div>项目1</div>
        {null}
        <div>项目2</div>
        {undefined}
      </Space>
    )
    
    const items = container.querySelectorAll('.taro-uno-space__item')
    expect(items.length).toBe(2)
  })

  // 组合测试
  it('应该正确组合多个属性', () => {
    const { container } = render(
      <Space
        size='large'
        direction='vertical'
        align='center'
        justify='between'
        wrap
        block
        split='-'
      >
        <div>项目1</div>
        <div>项目2</div>
        <div>项目3</div>
      </Space>
    )
    
    expect(container.firstChild).toHaveClass('taro-uno-space--direction-vertical')
    expect(container.firstChild).toHaveClass('taro-uno-space--align-center')
    expect(container.firstChild).toHaveClass('taro-uno-space--justify-between')
    expect(container.firstChild).toHaveClass('taro-uno-space--wrap')
    expect(container.firstChild).toHaveClass('taro-uno-space--block')
    expect(container.firstChild).toHaveStyle('width: 100%')
    
    const item = container.querySelector('.taro-uno-space__item')
    expect(item).toHaveStyle('margin-bottom: 24px')
    
    const splits = container.querySelectorAll('.taro-uno-space__split')
    expect(splits.length).toBe(2)
    expect(splits[0]).toHaveTextContent('-')
  })
}) 