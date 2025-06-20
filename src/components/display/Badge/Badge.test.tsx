import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Badge from './index'

describe('Badge 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础Badge组件', () => {
    render(
      <Badge count={5}>
        <div className='content'>Content</div>
      </Badge>
    )

    const badge = document.querySelector('.uno-badge')
    expect(badge).toBeInTheDocument()

    const content = document.querySelector('.content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Content')

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toBeInTheDocument()
    expect(badgeDot).toHaveTextContent('5')
  })

  // 测试小圆点
  it('应该正确显示小圆点模式', () => {
    render(
      <Badge dot>
        <div>Content</div>
      </Badge>
    )

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toBeInTheDocument()
    expect(badgeDot).toHaveClass('uno-badge__dot--dot')
    expect(badgeDot).toHaveTextContent('') // 小圆点模式不显示文字
  })

  // 测试最大数值
  it('应该正确处理超过最大值的计数', () => {
    render(
      <Badge count={100} max={99}>
        <div>Content</div>
      </Badge>
    )

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toHaveTextContent('99+')
  })

  // 测试显示零值
  it('应该根据showZero属性决定是否显示0值', () => {
    const { rerender } = render(
      <Badge count={0}>
        <div>Content</div>
      </Badge>
    )

    let badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).not.toBeInTheDocument()

    rerender(
      <Badge count={0} showZero>
        <div>Content</div>
      </Badge>
    )

    badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toBeInTheDocument()
    expect(badgeDot).toHaveTextContent('0')
  })

  // 测试自定义颜色
  it('应该正确应用自定义颜色', () => {
    render(
      <Badge count={5} color='rgb(0, 128, 0)'>
        <div>Content</div>
      </Badge>
    )

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toHaveStyle('background-color: rgb(0, 128, 0)')
    expect(badgeDot).toHaveStyle('color: #fff')
  })

  // 测试徽标位置
  it('应该根据placement属性设置正确的位置类', () => {
    const placements = ['right-top', 'right-bottom', 'left-top', 'left-bottom'] as const

    placements.forEach(placement => {
      const { unmount } = render(
        <Badge count={5} placement={placement}>
          <div>Content</div>
        </Badge>
      )
  
      const badgeDot = document.querySelector('.uno-badge__dot')
      expect(badgeDot).toHaveClass(`uno-badge__dot--${placement}`)
  
      unmount()
    })
  })

  // 测试尺寸
  it('应该根据size属性应用正确的尺寸类', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach(size => {
      const { unmount } = render(
        <Badge count={5} size={size}>
          <div>Content</div>
        </Badge>
      )
  
      const badgeDot = document.querySelector('.uno-badge__dot')
      expect(badgeDot).toHaveClass(`uno-badge__dot--${size}`)
  
      unmount()
    })
  })

  // 测试类型
  it('应该根据type属性应用正确的类型类', () => {
    const types = ['default', 'primary', 'success', 'warning', 'error'] as const

    types.forEach(type => {
      const { unmount } = render(
        <Badge count={5} type={type}>
          <div>Content</div>
        </Badge>
      )
  
      const badgeDot = document.querySelector('.uno-badge__dot')
      expect(badgeDot).toHaveClass(`uno-badge__dot--${type}`)
  
      unmount()
    })
  })

  // 测试状态
  it('应该根据status属性应用正确的状态类', () => {
    const statuses = ['processing', 'default', 'success', 'warning', 'error'] as const

    statuses.forEach(status => {
      const { unmount } = render(
        <Badge status={status}>
          <div>Content</div>
        </Badge>
      )
  
      const badgeDot = document.querySelector('.uno-badge__dot')
      expect(badgeDot).toHaveClass(`uno-badge__dot--${status}`)
  
      unmount()
    })
  })

  // 测试偏移量
  it('应该正确应用偏移量', () => {
    render(
      <Badge count={5} offset={[10, -5]}>
        <div>Content</div>
      </Badge>
    )

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toHaveStyle('transform: translate(10px, -5px)')
  })

  // 测试点击事件
  it('应该正确处理点击事件', () => {
    const handleClick = jest.fn()

    render(
      <Badge count={5} onClick={handleClick}>
        <div>Content</div>
      </Badge>
    )

    const badgeDot = document.querySelector('.uno-badge__dot')
    if (badgeDot) {
      fireEvent.click(badgeDot)
    }

    expect(handleClick).toHaveBeenCalled()
  })

  // 测试独立使用模式
  it('应该正确渲染独立使用的Badge', () => {
    render(<Badge count={5} standalone />)

    const badge = document.querySelector('.uno-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('uno-badge--standalone')

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toBeInTheDocument()
    expect(badgeDot).toHaveTextContent('5')
  })

  // 测试状态点和文本
  it('应该正确渲染状态点和文本', () => {
    render(<Badge status='success' text='成功' />)

    const badgeStatus = document.querySelector('.uno-badge__status')
    expect(badgeStatus).toBeInTheDocument()
    expect(badgeStatus).toHaveClass('uno-badge__status--success')

    const badgeText = document.querySelector('.uno-badge__status-text')
    expect(badgeText).toBeInTheDocument()
    expect(badgeText).toHaveTextContent('成功')
  })

  // 测试自定义类名和样式
  it('应该正确应用自定义类名和样式', () => {
    render(
      <Badge 
        count={5} 
        className='custom-badge' 
        style={{ margin: '10px' }}
        badgeClassName='custom-dot'
        badgeStyle={{ padding: '5px' }}
      >
        <div>Content</div>
      </Badge>
    )

    const badge = document.querySelector('.uno-badge')
    expect(badge).toHaveClass('custom-badge')
    expect(badge).toHaveStyle('margin: 10px')

    const badgeDot = document.querySelector('.uno-badge__dot')
    expect(badgeDot).toHaveClass('custom-dot')
    expect(badgeDot).toHaveStyle('padding: 5px')
  })
}) 