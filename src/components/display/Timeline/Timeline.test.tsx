import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Timeline from './Timeline'

describe('Timeline 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础Timeline组件', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
        <Timeline.Item>事件3</Timeline.Item>
      </Timeline>
    )

    const timeline = container.querySelector('.uno-timeline')
    expect(timeline).toBeInTheDocument()
    expect(timeline).toHaveClass('uno-timeline-normal')
    expect(timeline).toHaveClass('uno-timeline-left')

    const items = container.querySelectorAll('.uno-timeline-item')
    expect(items.length).toBe(3)
    expect(items[0]).toHaveTextContent('事件1')
    expect(items[1]).toHaveTextContent('事件2')
    expect(items[2]).toHaveTextContent('事件3')
  })

  // 测试不同模式
  it('应该正确渲染正常和反向模式', () => {
    // 正常模式
    const { container, rerender } = render(
      <Timeline mode='normal'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
        <Timeline.Item>事件3</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline')).toHaveClass('uno-timeline-normal')

    // 反转模式
    rerender(
      <Timeline mode='reverse'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
        <Timeline.Item>事件3</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline')).toHaveClass('uno-timeline-reverse')
  })

  // 测试不同位置
  it('应该正确渲染不同位置的时间轴', () => {
    // 左侧位置
    const { container, rerender } = render(
      <Timeline position='left'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline')).toHaveClass('uno-timeline-left')

    // 右侧位置
    rerender(
      <Timeline position='right'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline')).toHaveClass('uno-timeline-right')

    // 交替位置
    rerender(
      <Timeline position='alternate'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline')).toHaveClass('uno-timeline-alternate')
  })

  // 测试幽灵节点
  it('应该正确渲染幽灵节点', () => {
    // 布尔值形式
    const { container, rerender } = render(
      <Timeline pending={true}>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    const items = container.querySelectorAll('.uno-timeline-item')
    expect(items.length).toBe(3)
    expect(items[2]).toHaveClass('uno-timeline-item-pending')
    expect(items[2]).not.toHaveTextContent('事件2')

    // 内容形式
    rerender(
      <Timeline pending='加载中...'>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    const pendingItems = container.querySelectorAll('.uno-timeline-item')
    expect(pendingItems.length).toBe(3)
    expect(pendingItems[2]).toHaveClass('uno-timeline-item-pending')
    expect(pendingItems[2]).toHaveTextContent('加载中...')
  })

  // 测试自定义幽灵节点点
  it('应该正确渲染自定义幽灵节点点', () => {
    const { container } = render(
      <Timeline pending='加载中...' pendingDot={<div className='custom-dot'>...</div>}>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    const pendingItem = container.querySelectorAll('.uno-timeline-item')[2]
    expect(pendingItem).toHaveClass('uno-timeline-item-pending')

    const customDot = pendingItem.querySelector('.custom-dot')
    expect(customDot).toBeInTheDocument()
    expect(customDot).toHaveTextContent('...')
  })

  // 测试自定义样式
  it('应该应用自定义类名和样式', () => {
    const { container } = render(
      <Timeline className='custom-timeline' style={{ marginTop: '20px' }}>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
      </Timeline>
    )

    const timeline = container.querySelector('.uno-timeline')
    expect(timeline).toHaveClass('custom-timeline')
    expect(timeline).toHaveStyle('margin-top: 20px')
  })
})

describe('Timeline.Item 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础TimelineItem组件', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item>事件内容</Timeline.Item>
      </Timeline>
    )

    const item = container.querySelector('.uno-timeline-item')
    expect(item).toBeInTheDocument()
    expect(item).toHaveClass('uno-timeline-item-left')
    expect(item).toHaveTextContent('事件内容')

    const dot = container.querySelector('.uno-timeline-item-dot')
    expect(dot).toBeInTheDocument()
  })

  // 测试不同颜色
  it('应该正确应用不同颜色', () => {
    // 预设颜色
    const colors = ['primary', 'success', 'warning', 'danger', 'info']

    colors.forEach(color => {
      const { container, unmount } = render(
        <Timeline>
          <Timeline.Item color={color}>事件内容</Timeline.Item>
        </Timeline>
      )

      const dot = container.querySelector('.uno-timeline-item-dot')
      // 实际渲染中会将预设颜色转换为CSS变量
      expect(dot).toHaveStyle({ backgroundColor: expect.any(String) })
      unmount()
    })

    // 自定义颜色
    const { container } = render(
      <Timeline>
        <Timeline.Item color='#ff0000'>事件内容</Timeline.Item>
      </Timeline>
    )

    const dot = container.querySelector('.uno-timeline-item-dot')
    expect(dot).toHaveStyle({ backgroundColor: '#ff0000' })
  })

  // 测试自定义节点
  it('应该正确渲染自定义节点', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item dot={<div className='custom-dot'>*</div>}>事件内容</Timeline.Item>
      </Timeline>
    )

    const customDot = container.querySelector('.custom-dot')
    expect(customDot).toBeInTheDocument()
    expect(customDot).toHaveTextContent('*')

    // 不应该渲染默认节点
    const defaultDot = container.querySelector('.uno-timeline-item-dot')
    expect(defaultDot).not.toBeInTheDocument()
  })

  // 测试节点位置
  it('应该正确应用节点位置', () => {
    // 左侧位置
    const { container, rerender } = render(
      <Timeline>
        <Timeline.Item position='left'>左侧事件</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline-item')).toHaveClass('uno-timeline-item-left')

    // 右侧位置
    rerender(
      <Timeline>
        <Timeline.Item position='right'>右侧事件</Timeline.Item>
      </Timeline>
    )

    expect(container.querySelector('.uno-timeline-item')).toHaveClass('uno-timeline-item-right')
  })

  // 测试标签
  it('应该正确渲染标签', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item label='2023-01-01'>事件内容</Timeline.Item>
      </Timeline>
    )

    const label = container.querySelector('.uno-timeline-item-label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('2023-01-01')
  })

  // 测试最后一个节点
  it('应该正确识别最后一个节点', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item>事件1</Timeline.Item>
        <Timeline.Item>事件2</Timeline.Item>
        <Timeline.Item>事件3</Timeline.Item>
      </Timeline>
    )

    const items = container.querySelectorAll('.uno-timeline-item')

    // 第一个和第二个节点应该有连接线
    expect(items[0].querySelector('.uno-timeline-item-line')).toBeInTheDocument()
    expect(items[1].querySelector('.uno-timeline-item-line')).toBeInTheDocument()

    // 最后一个节点不应该有连接线
    expect(items[2].querySelector('.uno-timeline-item-line')).not.toBeInTheDocument()
    expect(items[2]).toHaveClass('uno-timeline-item-last')
  })

  // 测试自定义样式
  it('应该应用自定义类名和样式', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item className='custom-item' style={{ fontWeight: 'bold' }}>
          事件内容
        </Timeline.Item>
      </Timeline>
    )

    const item = container.querySelector('.uno-timeline-item')
    expect(item).toHaveClass('custom-item')
    expect(item).toHaveStyle('font-weight: bold')
  })
})
