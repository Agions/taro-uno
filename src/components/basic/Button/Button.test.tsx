import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './index'

describe('Button组件', () => {
  test('渲染基础按钮', () => {
    render(<Button>按钮</Button>)

    const button = screen.getByText('按钮')
    expect(button).toBeInTheDocument()
    expect(button.parentElement).toHaveClass('uno-button')
    expect(button.parentElement).toHaveClass('uno-button-type-default')
  })

  test('不同类型的按钮', () => {
    const { rerender } = render(<Button type='primary'>主要按钮</Button>)

    let button = screen.getByText('主要按钮')
    expect(button.parentElement).toHaveClass('uno-button-type-primary')

    rerender(<Button type='success'>成功按钮</Button>)
    button = screen.getByText('成功按钮')
    expect(button.parentElement).toHaveClass('uno-button-type-success')

    rerender(<Button type='warning'>警告按钮</Button>)
    button = screen.getByText('警告按钮')
    expect(button.parentElement).toHaveClass('uno-button-type-warning')

    rerender(<Button type='danger'>危险按钮</Button>)
    button = screen.getByText('危险按钮')
    expect(button.parentElement).toHaveClass('uno-button-type-danger')

    rerender(<Button type='info'>信息按钮</Button>)
    button = screen.getByText('信息按钮')
    expect(button.parentElement).toHaveClass('uno-button-type-info')
  })

  test('不同尺寸的按钮', () => {
    const { rerender } = render(<Button size='xs'>超小按钮</Button>)

    let button = screen.getByText('超小按钮')
    expect(button.parentElement).toHaveClass('uno-button-size-xs')

    rerender(<Button size='sm'>小按钮</Button>)
    button = screen.getByText('小按钮')
    expect(button.parentElement).toHaveClass('uno-button-size-sm')

    rerender(<Button size='md'>中等按钮</Button>)
    button = screen.getByText('中等按钮')
    expect(button.parentElement).toHaveClass('uno-button-size-md')

    rerender(<Button size='lg'>大按钮</Button>)
    button = screen.getByText('大按钮')
    expect(button.parentElement).toHaveClass('uno-button-size-lg')

    rerender(<Button size='xl'>超大按钮</Button>)
    button = screen.getByText('超大按钮')
    expect(button.parentElement).toHaveClass('uno-button-size-xl')
  })

  test('不同形状的按钮', () => {
    const { rerender } = render(<Button shape='square'>方形按钮</Button>)

    let button = screen.getByText('方形按钮')
    expect(button.parentElement).toHaveClass('uno-button-shape-square')

    rerender(<Button shape='round'>圆角按钮</Button>)
    button = screen.getByText('圆角按钮')
    expect(button.parentElement).toHaveClass('uno-button-shape-round')

    rerender(<Button shape='circle'>圆形按钮</Button>)
    button = screen.getByText('圆形按钮')
    expect(button.parentElement).toHaveClass('uno-button-shape-circle')
  })

  test('块级按钮', () => {
    render(<Button block>块级按钮</Button>)

    const button = screen.getByText('块级按钮')
    expect(button.parentElement).toHaveClass('uno-button-block')
  })

  test('轮廓按钮', () => {
    render(<Button outline>轮廓按钮</Button>)

    const button = screen.getByText('轮廓按钮')
    expect(button.parentElement).toHaveClass('uno-button-outline')
  })

  test('幽灵按钮', () => {
    render(<Button ghost>幽灵按钮</Button>)

    const button = screen.getByText('幽灵按钮')
    expect(button.parentElement).toHaveClass('uno-button-ghost')
  })

  test('虚线按钮', () => {
    render(<Button dashed>虚线按钮</Button>)

    const button = screen.getByText('虚线按钮')
    expect(button.parentElement).toHaveClass('uno-button-dashed')
  })

  test('文本按钮', () => {
    render(<Button text>文本按钮</Button>)

    const button = screen.getByText('文本按钮')
    expect(button.parentElement).toHaveClass('uno-button-text')
  })

  test('链接按钮', () => {
    render(<Button link>链接按钮</Button>)

    const button = screen.getByText('链接按钮')
    expect(button.parentElement).toHaveClass('uno-button-link')
  })

  test('禁用状态', () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        禁用按钮
      </Button>
    )

    const button = screen.getByText('禁用按钮')
    expect(button.parentElement).toHaveClass('uno-button-disabled')

    // 点击禁用按钮不应触发点击事件
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('加载状态', () => {
    const handleClick = jest.fn()
    render(
      <Button loading onClick={handleClick}>
        加载中
      </Button>
    )

    const button = screen.getByText('加载中')
    expect(button.parentElement).toHaveClass('uno-button-loading')

    // 加载状态下点击按钮不应触发点击事件
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()

    // 应该渲染加载图标
    const loadingIcon = button.parentElement?.querySelector('.uno-button-loading-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  test('加载状态显示自定义文本', () => {
    render(
      <Button loading loadingText='处理中...'>
        提交
      </Button>
    )

    // 应该显示加载文本而不是原始文本
    expect(screen.getByText('处理中...')).toBeInTheDocument()
    expect(screen.queryByText('提交')).not.toBeInTheDocument()
  })

  test('带图标的按钮', () => {
    render(<Button icon='star'>星标</Button>)

    const button = screen.getByText('星标')
    expect(button.parentElement).toHaveClass('uno-button-with-icon')
    expect(button.parentElement).toHaveClass('uno-button-icon-left')

    // 应该渲染图标
    const icon = button.parentElement?.querySelector('.uno-button-icon')
    expect(icon).toBeInTheDocument()
  })

  test('图标位置', () => {
    const { rerender } = render(
      <Button icon='star' iconPosition='left'>
        左侧图标
      </Button>
    )

    let button = screen.getByText('左侧图标')
    expect(button.parentElement).toHaveClass('uno-button-icon-left')

    rerender(
      <Button icon='star' iconPosition='right'>
        右侧图标
      </Button>
    )
    button = screen.getByText('右侧图标')
    expect(button.parentElement).toHaveClass('uno-button-icon-right')
  })

  test('点击事件', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>点击按钮</Button>)

    const button = screen.getByText('点击按钮')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('自定义类名和样式', () => {
    render(
      <Button className='custom-button' style={{ backgroundColor: 'red' }}>
        自定义按钮
      </Button>
    )

    const button = screen.getByText('自定义按钮')
    expect(button.parentElement).toHaveClass('custom-button')
    expect(button.parentElement).toHaveStyle('background-color: red')
  })

  test('无障碍属性', () => {
    render(
      <Button ariaLabel='测试按钮' ariaDisabled={true} role='link'>
        无障碍按钮
      </Button>
    )

    const button = screen.getByText('无障碍按钮')
    expect(button.parentElement).toHaveAttribute('aria-label', '测试按钮')
    expect(button.parentElement).toHaveAttribute('aria-disabled', 'true')
    expect(button.parentElement).toHaveAttribute('role', 'link')
  })

  test('原生按钮', () => {
    render(
      <Button native formType='submit'>
        提交表单
      </Button>
    )

    // 检查是否渲染为原生button元素
    const button = screen.getByText('提交表单')
    expect(button.parentElement?.tagName).toBe('BUTTON')
    expect(button.parentElement).toHaveAttribute('type', 'submit')
  })
}) 