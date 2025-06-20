import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Divider } from '@/components'

describe('Divider 组件', () => {
  // 基本渲染测试
  it('应该正确渲染基本分割线', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toHaveClass('taro-uno-divider')
    expect(container.firstChild).toHaveClass('taro-uno-divider--direction-horizontal')
    expect(container.firstChild).toHaveClass('taro-uno-divider--type-solid')
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-normal')
  })

  // 方向测试
  it('应该正确渲染水平分割线', () => {
    const { container } = render(<Divider direction='horizontal' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--direction-horizontal')
  })

  it('应该正确渲染垂直分割线', () => {
    const { container } = render(<Divider direction='vertical' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--direction-vertical')
  })

  // 类型测试
  it('应该正确渲染实线分割线', () => {
    const { container } = render(<Divider type='solid' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--type-solid')
  })

  it('应该正确渲染虚线分割线', () => {
    const { container } = render(<Divider type='dashed' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--type-dashed')
  })

  it('应该正确渲染点线分割线', () => {
    const { container } = render(<Divider type='dotted' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--type-dotted')
  })

  // 颜色测试
  it('应该正确应用自定义颜色', () => {
    const { container } = render(<Divider color='#ff0000' />)
    expect(container.firstChild).toHaveStyle('border-color: #ff0000')
  })

  // 粗细测试
  it('应该正确应用细分割线', () => {
    const { container } = render(<Divider thickness='thin' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-thin')
    expect(container.firstChild).toHaveStyle('border-top-width: 1px')
  })

  it('应该正确应用正常分割线', () => {
    const { container } = render(<Divider thickness='normal' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-normal')
    expect(container.firstChild).toHaveStyle('border-top-width: 2px')
  })

  it('应该正确应用粗分割线', () => {
    const { container } = render(<Divider thickness='thick' />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-thick')
    expect(container.firstChild).toHaveStyle('border-top-width: 4px')
  })

  it('应该正确应用自定义粗细', () => {
    const { container } = render(<Divider thickness={6} />)
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-custom')
    expect(container.firstChild).toHaveStyle('border-top-width: 6px')
  })

  // 尺寸测试
  it('应该正确应用水平分割线宽度', () => {
    const { container } = render(<Divider width={200} />)
    expect(container.firstChild).toHaveStyle('width: 200px')
  })

  it('应该正确应用垂直分割线高度', () => {
    const { container } = render(<Divider direction='vertical' height={100} />)
    expect(container.firstChild).toHaveStyle('height: 100px')
  })

  // 间距测试
  it('应该正确应用水平分割线间距', () => {
    const { container } = render(<Divider margin={20} />)
    expect(container.firstChild).toHaveStyle('margin: 20px 0')
  })

  it('应该正确应用垂直分割线间距', () => {
    const { container } = render(<Divider direction='vertical' margin={10} />)
    expect(container.firstChild).toHaveStyle('margin: 0 10px')
  })

  it('应该正确应用自定义间距字符串', () => {
    const { container } = render(<Divider margin='30px 10px' />)
    expect(container.firstChild).toHaveStyle('margin: 30px 10px')
  })

  // 文本测试
  it('应该正确渲染带文本的分割线', () => {
    const { container } = render(<Divider hasText>分割文本</Divider>)
    expect(container.firstChild).toHaveClass('taro-uno-divider--with-text')
    expect(container.firstChild).toHaveClass('taro-uno-divider--text-center')
    expect(screen.getByText('分割文本')).toBeInTheDocument()
  })

  it('应该正确渲染左对齐文本的分割线', () => {
    const { container } = render(
      <Divider hasText textPosition='left'>
        左侧文本
      </Divider>
    )
    expect(container.firstChild).toHaveClass('taro-uno-divider--with-text')
    expect(container.firstChild).toHaveClass('taro-uno-divider--text-left')
    expect(screen.getByText('左侧文本')).toBeInTheDocument()
  })

  it('应该正确渲染右对齐文本的分割线', () => {
    const { container } = render(
      <Divider hasText textPosition='right'>
        右侧文本
      </Divider>
    )
    expect(container.firstChild).toHaveClass('taro-uno-divider--with-text')
    expect(container.firstChild).toHaveClass('taro-uno-divider--text-right')
    expect(screen.getByText('右侧文本')).toBeInTheDocument()
  })

  // 样式组合测试
  it('应该正确组合多个样式属性', () => {
    const { container } = render(
      <Divider
        direction='horizontal'
        type='dashed'
        color='#0000ff'
        thickness='thick'
        width={300}
        margin='20px 0'
        hasText
        textPosition='center'
      >
        组合样式
      </Divider>
    )
    expect(container.firstChild).toHaveClass('taro-uno-divider--direction-horizontal')
    expect(container.firstChild).toHaveClass('taro-uno-divider--type-dashed')
    expect(container.firstChild).toHaveClass('taro-uno-divider--thickness-thick')
    expect(container.firstChild).toHaveClass('taro-uno-divider--with-text')
    expect(container.firstChild).toHaveClass('taro-uno-divider--text-center')
    expect(container.firstChild).toHaveStyle({
      borderColor: '#0000ff',
      color: '#0000ff',
      borderTopWidth: '4px',
      width: '300px',
      margin: '20px 0',
    })
    expect(screen.getByText('组合样式')).toBeInTheDocument()
  })

  // 自定义类名和样式测试
  it('应该正确应用自定义类名和样式', () => {
    const { container } = render(
      <Divider className='custom-divider' style={{ opacity: 0.5 }}>
        自定义样式
      </Divider>
    )
    expect(container.firstChild).toHaveClass('taro-uno-divider')
    expect(container.firstChild).toHaveClass('custom-divider')
    expect(container.firstChild).toHaveStyle('opacity: 0.5')
  })
}) 