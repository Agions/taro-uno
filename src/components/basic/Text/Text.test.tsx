import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Text, { TextProps } from './index'

// 模拟剪贴板API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
})

// 模拟console
console.log = jest.fn()
console.error = jest.fn()

describe('Text 组件', () => {
  // 基本渲染测试
  it('应该正确渲染文本内容', () => {
    render(<Text>测试文本</Text>)
    expect(screen.getByText('测试文本')).toBeInTheDocument()
  })

  // 尺寸测试
  it('应该应用正确的尺寸', () => {
    const { rerender } = render(<Text size='xs'>小号文本</Text>)
    expect(screen.getByText('小号文本')).toHaveStyle('font-size: 12px')

    rerender(<Text size='md'>中号文本</Text>)
    expect(screen.getByText('中号文本')).toHaveStyle('font-size: 16px')

    rerender(<Text size='xl'>大号文本</Text>)
    expect(screen.getByText('大号文本')).toHaveStyle('font-size: 20px')

    rerender(<Text size={24}>自定义尺寸</Text>)
    expect(screen.getByText('自定义尺寸')).toHaveStyle('font-size: 24px')
  })

  // 类型测试
  it('应该应用正确的类型样式', () => {
    const types: Array<TextProps['type']> = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
    ]

    types.forEach(type => {
      const { container } = render(<Text type={type}>类型文本</Text>)
      expect(container.firstChild).toHaveClass(`uno-text--type-${type}`)
    })
  })

  // 对齐方式测试
  it('应该应用正确的对齐方式', () => {
    const alignments: Array<TextProps['align']> = ['left', 'center', 'right', 'justify']

    alignments.forEach(align => {
      const { container } = render(<Text align={align}>对齐文本</Text>)
      expect(container.firstChild).toHaveClass(`uno-text--align-${align}`)
    })
  })

  // 颜色测试
  it('应该应用正确的颜色', () => {
    render(<Text color='#ff0000'>彩色文本</Text>)
    expect(screen.getByText('彩色文本')).toHaveStyle('color: #ff0000')
  })

  // 加粗测试
  it('应该正确应用加粗样式', () => {
    const { container, rerender } = render(<Text bold>加粗文本</Text>)
    expect(container.firstChild).toHaveClass('uno-text--bold')
    expect(screen.getByText('加粗文本')).toHaveStyle('font-weight: bold')

    rerender(<Text fontWeight={700}>自定义粗细</Text>)
    expect(screen.getByText('自定义粗细')).toHaveStyle('font-weight: 700')
  })

  // 文本装饰测试
  it('应该应用正确的文本装饰', () => {
    const { container: container1 } = render(<Text underline>下划线文本</Text>)
    expect(container1.firstChild).toHaveClass('uno-text--underline')

    const { container: container2 } = render(<Text decoration='line-through'>删除线文本</Text>)
    expect(container2.firstChild).toHaveClass('uno-text--line-through')

    const { container: container3 } = render(<Text decoration='overline'>上划线文本</Text>)
    expect(container3.firstChild).toHaveClass('uno-text--overline')
  })

  // 块级元素测试
  it('应该正确应用块级元素样式', () => {
    const { container } = render(<Text block>块级文本</Text>)
    expect(container.firstChild).toHaveClass('uno-text--block')
  })

  // 文本截断测试
  it('应该应用正确的文本截断样式', () => {
    render(<Text truncate='ellipsis'>截断文本</Text>)
    expect(screen.getByText('截断文本')).toHaveStyle({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    })

    render(<Text truncate={2}>多行截断</Text>)
    expect(screen.getByText('多行截断')).toHaveStyle({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    })

    render(<Text truncate='clip'>裁剪文本</Text>)
    expect(screen.getByText('裁剪文本')).toHaveStyle({
      overflow: 'hidden',
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
    })
  })

  // 可选择测试
  it('应该正确应用可选择属性', () => {
    const { container } = render(<Text selectable>可选择文本</Text>)
    expect(container.firstChild).toHaveClass('uno-text--selectable')
    expect(container.firstChild).toHaveAttribute('selectable', 'true')
  })

  // 禁用测试
  it('应该正确应用禁用样式', () => {
    const { container } = render(<Text disabled>禁用文本</Text>)
    expect(container.firstChild).toHaveClass('uno-text--disabled')
  })

  // 可复制测试
  it('应该正确处理可复制功能', () => {
    const { container } = render(<Text copyable>可复制文本</Text>)
    expect(container.firstChild).toHaveClass('uno-text--copyable')

    fireEvent.click(screen.getByText('可复制文本'))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('可复制文本')
    expect(console.log).toHaveBeenCalledWith('文本已复制到剪贴板')
  })

  // 点击事件测试
  it('应该正确处理点击事件', () => {
    const handleClick = jest.fn()
    render(<Text onClick={handleClick}>可点击文本</Text>)

    fireEvent.click(screen.getByText('可点击文本'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // 禁用状态下的点击事件测试
  it('禁用状态下不应触发点击事件', () => {
    const handleClick = jest.fn()
    render(
      <Text disabled onClick={handleClick}>
        禁用文本
      </Text>
    )

    fireEvent.click(screen.getByText('禁用文本'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  // 特殊样式测试
  it('应该应用特殊文本样式', () => {
    const { container: container1 } = render(<Text code>代码文本</Text>)
    expect(container1.firstChild).toHaveClass('uno-text--code')

    const { container: container2 } = render(<Text deleted>删除文本</Text>)
    expect(container2.firstChild).toHaveClass('uno-text--deleted')

    const { container: container3 } = render(<Text italic>斜体文本</Text>)
    expect(container3.firstChild).toHaveClass('uno-text--italic')

    const { container: container4 } = render(<Text mark>标记文本</Text>)
    expect(container4.firstChild).toHaveClass('uno-text--mark')

    const { container: container5 } = render(<Text strong>强调文本</Text>)
    expect(container5.firstChild).toHaveClass('uno-text--bold')
  })

  // 行高和字符间距测试
  it('应该应用正确的行高和字符间距', () => {
    render(
      <Text lineHeight={1.5} spacing={2}>
        格式文本
      </Text>
    )
    expect(screen.getByText('格式文本')).toHaveStyle({
      lineHeight: 1.5,
      letterSpacing: 2,
    })
  })

  // 文本变换测试
  it('应该应用正确的文本变换', () => {
    const transforms: Array<TextProps['transform']> = ['capitalize', 'uppercase', 'lowercase']

    transforms.forEach(transform => {
      render(<Text transform={transform}>变换文本</Text>)
      expect(screen.getByText('变换文本')).toHaveStyle({
        textTransform: transform,
      })
    })
  })
}) 