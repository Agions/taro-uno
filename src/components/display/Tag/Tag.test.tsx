import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tag from './Tag'

describe('Tag 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础Tag组件', () => {
    const { container } = render(<Tag>标签</Tag>)

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toBeInTheDocument()
    expect(tag).toHaveClass('taro-uno-tag--size-medium')
    expect(tag).toHaveClass('taro-uno-tag--type-default')
    expect(tag).toHaveClass('taro-uno-tag--shape-default')
    expect(tag).toHaveClass('taro-uno-tag--bordered')
    expect(tag).toHaveTextContent('标签')
  })

  // 测试不同尺寸
  it('应该正确应用不同尺寸', () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large']

    sizes.forEach(size => {
      const { container, unmount } = render(<Tag size={size}>标签</Tag>)
      expect(container.querySelector(`.taro-uno-tag--size-${size}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试不同类型
  it('应该正确应用不同类型', () => {
    const types: ('default' | 'primary' | 'success' | 'warning' | 'error')[] = [
      'default',
      'primary',
      'success',
      'warning',
      'error',
    ]

    types.forEach(type => {
      const { container, unmount } = render(<Tag type={type}>标签</Tag>)
      expect(container.querySelector(`.taro-uno-tag--type-${type}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试不同形状
  it('应该正确应用不同形状', () => {
    const shapes: ('default' | 'round' | 'mark')[] = ['default', 'round', 'mark']

    shapes.forEach(shape => {
      const { container, unmount } = render(<Tag shape={shape}>标签</Tag>)
      expect(container.querySelector(`.taro-uno-tag--shape-${shape}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试自定义颜色
  it('应该正确应用自定义颜色', () => {
    const color = '#1a2b3c'
    const { container } = render(<Tag color={color}>标签</Tag>)

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toHaveClass('taro-uno-tag--custom')
    expect(tag).toHaveStyle({
      backgroundColor: color,
      borderColor: color,
      color: '#fff',
    })
  })

  // 测试可关闭状态
  it('应该正确渲染关闭按钮并触发关闭事件', () => {
    const handleClose = jest.fn()
    const { container } = render(
      <Tag closable onClose={handleClose}>
        可关闭标签
      </Tag>
    )

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toHaveClass('taro-uno-tag--closable')

    const closeBtn = container.querySelector('.taro-uno-tag__close')
    expect(closeBtn).toBeInTheDocument()

    // 测试点击关闭
    fireEvent.click(closeBtn!)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  // 测试关闭确认
  it('应该在关闭前进行确认', () => {
    const handleClose = jest.fn()
    const confirmMsg = '确定要关闭吗？'

    // Mock window.confirm
    const originalConfirm = window.confirm
    window.confirm = jest.fn(() => true)

    const { container } = render(
      <Tag closable closeConfirm={confirmMsg} onClose={handleClose}>
        关闭确认标签
      </Tag>
    )

    const closeBtn = container.querySelector('.taro-uno-tag__close')
    fireEvent.click(closeBtn!)

    expect(window.confirm).toHaveBeenCalledWith(confirmMsg)
    expect(handleClose).toHaveBeenCalledTimes(1)

    // 恢复原始window.confirm
    window.confirm = originalConfirm
  })

  // 测试可选中状态
  it('应该支持可选中状态', () => {
    const handleChange = jest.fn()
    const { container } = render(
      <Tag checkable defaultChecked={false} onChange={handleChange}>
        可选中标签
      </Tag>
    )

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toHaveClass('taro-uno-tag--checkable')
    expect(tag).not.toHaveClass('taro-uno-tag--checked')

    // 点击选中
    fireEvent.click(tag!)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  // 测试受控模式
  it('应该支持受控模式', () => {
    const handleChange = jest.fn()
    const { container, rerender } = render(
      <Tag checkable checked={false} onChange={handleChange}>
        受控标签
      </Tag>
    )

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).not.toHaveClass('taro-uno-tag--checked')

    // 点击但不会改变内部状态
    fireEvent.click(tag!)
    expect(handleChange).toHaveBeenCalledWith(true)
    expect(tag).not.toHaveClass('taro-uno-tag--checked')

    // 通过props更新状态
    rerender(
      <Tag checkable checked={true} onChange={handleChange}>
        受控标签
      </Tag>
    )
    expect(tag).toHaveClass('taro-uno-tag--checked')
  })

  // 测试禁用状态
  it('应该支持禁用状态', () => {
    const handleClick = jest.fn()
    const handleClose = jest.fn()
    const { container } = render(
      <Tag disabled closable onClick={handleClick} onClose={handleClose}>
        禁用标签
      </Tag>
    )

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toHaveClass('taro-uno-tag--disabled')

    // 点击无效
    fireEvent.click(tag!)
    expect(handleClick).not.toHaveBeenCalled()

    // 禁用状态下不应该显示关闭按钮
    const closeBtn = container.querySelector('.taro-uno-tag__close')
    expect(closeBtn).not.toBeInTheDocument()
  })

  // 测试自定义图标
  it('应该正确渲染自定义图标', () => {
    const { container } = render(
      <Tag icon={<div className='custom-icon'>图标</div>}>带图标标签</Tag>
    )

    const icon = container.querySelector('.taro-uno-tag__icon')
    expect(icon).toBeInTheDocument()

    const customIcon = container.querySelector('.custom-icon')
    expect(customIcon).toBeInTheDocument()
    expect(customIcon).toHaveTextContent('图标')
  })

  // 测试自定义类名和样式
  it('应该应用自定义类名和样式', () => {
    const { container } = render(
      <Tag className='custom-tag' style={{ marginTop: '10px' }}>
        自定义样式标签
      </Tag>
    )

    const tag = container.querySelector('.taro-uno-tag')
    expect(tag).toHaveClass('custom-tag')
    expect(tag).toHaveStyle('margin-top: 10px')
  })

  // 测试边框设置
  it('应该根据bordered属性控制边框显示', () => {
    const { container, rerender } = render(<Tag bordered={true}>带边框</Tag>)
    expect(container.querySelector('.taro-uno-tag')).toHaveClass('taro-uno-tag--bordered')

    rerender(<Tag bordered={false}>无边框</Tag>)
    expect(container.querySelector('.taro-uno-tag')).not.toHaveClass('taro-uno-tag--bordered')
  })
})
