import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './index'

describe('Card 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础Card组件', () => {
    const { container } = render(
      <Card title='卡片标题'>
        <div>卡片内容</div>
      </Card>
    )
    
    const card = container.querySelector('.taro-uno-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('taro-uno-card--size-md')
    expect(card).toHaveClass('taro-uno-card--shadow-md')
    expect(card).toHaveClass('taro-uno-card--bordered')
    
    const title = container.querySelector('.taro-uno-card__title')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('卡片标题')
    
    const body = container.querySelector('.taro-uno-card__body')
    expect(body).toBeInTheDocument()
    expect(body).toHaveTextContent('卡片内容')
  })

  // 测试不同尺寸
  it('应该正确应用不同尺寸', () => {
    const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg']
    
    sizes.forEach(size => {
      const { container, unmount } = render(<Card size={size} />)
      expect(container.querySelector(`.taro-uno-card--size-${size}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试不同阴影
  it('应该正确应用不同阴影级别', () => {
    const shadows: ('none' | 'sm' | 'md' | 'lg' | 'xl')[] = ['none', 'sm', 'md', 'lg', 'xl']
    
    shadows.forEach(shadow => {
      const { container, unmount } = render(<Card shadow={shadow} />)
      expect(container.querySelector(`.taro-uno-card--shadow-${shadow}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试边框设置
  it('应该根据bordered属性控制边框显示', () => {
    const { container, rerender } = render(<Card bordered={true} />)
    expect(container.querySelector('.taro-uno-card')).toHaveClass('taro-uno-card--bordered')
    
    rerender(<Card bordered={false} />)
    expect(container.querySelector('.taro-uno-card')).not.toHaveClass('taro-uno-card--bordered')
  })

  // 测试悬停效果
  it('应该根据hoverable属性控制悬停效果', () => {
    const { container, rerender } = render(<Card hoverable={true} />)
    expect(container.querySelector('.taro-uno-card')).toHaveClass('taro-uno-card--hoverable')
    
    rerender(<Card hoverable={false} />)
    expect(container.querySelector('.taro-uno-card')).not.toHaveClass('taro-uno-card--hoverable')
  })

  // 测试可点击状态
  it('应该根据clickable属性控制点击状态', () => {
    const handleClick = jest.fn()
    const { container, rerender } = render(<Card clickable={true} onClick={handleClick} />)
    
    const card = container.querySelector('.taro-uno-card')
    expect(card).toHaveClass('taro-uno-card--clickable')
    
    fireEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    rerender(<Card clickable={false} onClick={handleClick} />)
    expect(container.querySelector('.taro-uno-card')).not.toHaveClass('taro-uno-card--clickable')
    
    fireEvent.click(card!)
    // 点击次数应该仍为1，因为clickable设为false
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // 测试加载状态
  it('应该正确渲染加载状态', () => {
    const { container } = render(
      <Card loading>
        <div>卡片内容</div>
      </Card>
    )
    
    expect(container.querySelector('.taro-uno-card')).toHaveClass('taro-uno-card--loading')
    
    const loadingContent = container.querySelector('.taro-uno-card__loading')
    expect(loadingContent).toBeInTheDocument()
    
    // 加载状态下不应显示实际内容
    expect(container.querySelector('.taro-uno-card__body')).not.toHaveTextContent('卡片内容')
  })

  // 测试卡片头部
  it('应该正确渲染卡片标题和额外内容', () => {
    const { container } = render(
      <Card 
        title='卡片标题' 
        subtitle='副标题' 
        titleIcon={<div className='title-icon'>图标</div>}
        extra={<div className='extra-content'>额外内容</div>}
      />
    )
    
    expect(container.querySelector('.taro-uno-card__title')).toHaveTextContent('卡片标题')
    expect(container.querySelector('.taro-uno-card__subtitle')).toHaveTextContent('副标题')
    expect(container.querySelector('.title-icon')).toBeInTheDocument()
    expect(container.querySelector('.extra-content')).toBeInTheDocument()
  })

  // 测试自定义头部
  it('应该正确渲染自定义头部', () => {
    const { container } = render(
      <Card header={<div className='custom-header'>自定义头部</div>} title='卡片标题' />
    )
    
    // 自定义头部应该覆盖标题
    expect(container.querySelector('.custom-header')).toBeInTheDocument()
    expect(container.querySelector('.taro-uno-card__title')).not.toBeInTheDocument()
  })

  // 测试封面
  it('应该正确渲染封面内容', () => {
    const { container } = render(<Card cover={<div className='custom-cover'>封面内容</div>} />)
    
    expect(container.querySelector('.taro-uno-card__cover')).toBeInTheDocument()
    expect(container.querySelector('.custom-cover')).toBeInTheDocument()
  })

  // 测试操作区
  it('应该正确渲染操作区域', () => {
    const { container } = render(
      <Card 
        actions={[
          <div key='action1' className='action-1'>
            操作1
          </div>,
          <div key='action2' className='action-2'>
            操作2
          </div>,
        ]}
      />
    )
    
    expect(container.querySelector('.taro-uno-card__actions')).toBeInTheDocument()
    expect(container.querySelectorAll('.taro-uno-card__action').length).toBe(2)
    expect(container.querySelector('.action-1')).toBeInTheDocument()
    expect(container.querySelector('.action-2')).toBeInTheDocument()
  })

  // 测试底部
  it('应该正确渲染底部内容', () => {
    const { container } = render(<Card footer={<div className='custom-footer'>底部内容</div>} />)
    
    expect(container.querySelector('.taro-uno-card__footer')).toBeInTheDocument()
    expect(container.querySelector('.custom-footer')).toBeInTheDocument()
  })

  // 测试自定义样式
  it('应该应用自定义样式', () => {
    const { container } = render(
      <Card 
        className='custom-card'
        style={{ margin: '10px' }}
        headerStyle={{ padding: '5px' }}
        bodyStyle={{ background: '#f5f5f5' }}
        footerStyle={{ borderTop: '1px solid #eee' }}
        header='头部'
        footer='底部'
      >
        内容
      </Card>
    )
    
    const card = container.querySelector('.taro-uno-card')
    expect(card).toHaveClass('custom-card')
    expect(card).toHaveStyle('margin: 10px')
    
    expect(container.querySelector('.taro-uno-card__header')).toHaveStyle('padding: 5px')
    expect(container.querySelector('.taro-uno-card__body')).toHaveStyle('background: #f5f5f5')
    expect(container.querySelector('.taro-uno-card__footer')).toHaveStyle(
      'border-top: 1px solid #eee'
    )
  })
})

describe('Card.Meta 组件', () => {
  // 基础渲染测试
  it('应该正确渲染Card.Meta组件', () => {
    const { container } = render(
      <Card>
        <Card.Meta
          avatar={<div className='meta-avatar'>头像</div>}
          title='元信息标题'
          description='元信息描述'
        />
      </Card>
    )
    
    const meta = container.querySelector('.taro-uno-card-meta')
    expect(meta).toBeInTheDocument()
    
    expect(container.querySelector('.meta-avatar')).toBeInTheDocument()
    expect(container.querySelector('.taro-uno-card-meta__title')).toHaveTextContent('元信息标题')
    expect(container.querySelector('.taro-uno-card-meta__description')).toHaveTextContent(
      '元信息描述'
    )
  })

  // 测试部分属性
  it('应该正确渲染部分属性的Card.Meta', () => {
    const { container } = render(
      <Card>
        <Card.Meta title='仅标题' />
      </Card>
    )
    
    expect(container.querySelector('.taro-uno-card-meta__title')).toHaveTextContent('仅标题')
    expect(container.querySelector('.taro-uno-card-meta__avatar')).not.toBeInTheDocument()
    expect(container.querySelector('.taro-uno-card-meta__description')).not.toBeInTheDocument()
  })

  // 测试自定义样式
  it('应该应用Card.Meta的自定义样式', () => {
    const { container } = render(
      <Card>
        <Card.Meta className='custom-meta' style={{ padding: '10px' }} title='标题' />
      </Card>
    )
    
    const meta = container.querySelector('.taro-uno-card-meta')
    expect(meta).toHaveClass('custom-meta')
    expect(meta).toHaveStyle('padding: 10px')
  })
}) 