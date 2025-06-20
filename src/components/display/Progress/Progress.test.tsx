import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Progress from './index'

describe('Progress 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础线性进度条', () => {
    render(<Progress percent={50} />)

    const progress = document.querySelector('.uno-progress')
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveClass('uno-progress--type-line')
    expect(progress).toHaveClass('uno-progress--size-medium')
    expect(progress).toHaveClass('uno-progress--status-normal')

    const progressText = document.querySelector('.uno-progress__line-text')
    expect(progressText).toBeInTheDocument()
    expect(progressText).toHaveTextContent('50%')

    const progressBg = document.querySelector('.uno-progress__line-bg')
    expect(progressBg).toHaveStyle('width: 50%')
  })

  // 测试不同类型
  it('应该渲染不同类型的进度条', () => {
    // 线性进度条（默认）
    const { unmount, rerender } = render(<Progress percent={30} type='line' />)
    expect(document.querySelector('.uno-progress--type-line')).toBeInTheDocument()

    // 圆形进度条
    unmount()
    rerender(<Progress percent={30} type='circle' />)
    expect(document.querySelector('.uno-progress--type-circle')).toBeInTheDocument()

    // 仪表盘进度条
    unmount()
    rerender(<Progress percent={30} type='dashboard' />)
    expect(document.querySelector('.uno-progress--type-dashboard')).toBeInTheDocument()
  })

  // 测试不同尺寸
  it('应该应用不同尺寸类名', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach(size => {
      const { unmount } = render(<Progress percent={30} size={size} />)
      expect(document.querySelector(`.uno-progress--size-${size}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 测试不同状态
  it('应该应用不同状态类名和图标', () => {
    // 常规状态
    const { unmount, rerender } = render(<Progress percent={30} status='normal' />)
    expect(document.querySelector('.uno-progress--status-normal')).toBeInTheDocument()
    expect(document.querySelector('.uno-progress__line-text')).toHaveTextContent('30%')

    // 成功状态
    unmount()
    rerender(<Progress percent={100} status='success' />)
    expect(document.querySelector('.uno-progress--status-success')).toBeInTheDocument()
    // 成功状态应该显示成功图标
    const successIcon = document.querySelector('.uno-icon-check')
    expect(successIcon).toBeInTheDocument()

    // 异常状态
    unmount()
    rerender(<Progress percent={50} status='exception' />)
    expect(document.querySelector('.uno-progress--status-exception')).toBeInTheDocument()
    // 异常状态应该显示错误图标
    const errorIcon = document.querySelector('.uno-icon-close')
    expect(errorIcon).toBeInTheDocument()

    // 活跃状态
    unmount()
    rerender(<Progress percent={50} status='active' />)
    expect(document.querySelector('.uno-progress--status-active')).toBeInTheDocument()
  })

  // 测试是否显示信息
  it('应该根据showInfo属性控制显示信息', () => {
    // 显示信息
    const { unmount, rerender } = render(<Progress percent={30} showInfo={true} />)
    expect(document.querySelector('.uno-progress__line-text')).toBeInTheDocument()

    // 不显示信息
    unmount()
    rerender(<Progress percent={30} showInfo={false} />)
    expect(document.querySelector('.uno-progress__line-text')).not.toBeInTheDocument()
  })

  // 测试自定义颜色
  it('应该应用自定义颜色', () => {
    // 字符串颜色
    const { unmount, rerender } = render(<Progress percent={50} strokeColor='rgb(255, 0, 0)' />)
    const progressBg = document.querySelector('.uno-progress__line-bg')
    expect(progressBg).toHaveStyle('background-color: rgb(255, 0, 0)')

    // 渐变色对象
    unmount()
    rerender(
      <Progress
        percent={50}
        strokeColor={{ from: 'rgb(255, 0, 0)', to: 'rgb(0, 0, 255)' }}
      />
    )
    const gradientBg = document.querySelector('.uno-progress__line-bg')
    expect(gradientBg).toHaveStyle('background: linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))')

    // 颜色数组
    unmount()
    rerender(
      <Progress
        percent={50}
        strokeColor={['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)']}
      />
    )
    const arrayBg = document.querySelector('.uno-progress__line-bg')
    expect(arrayBg).toHaveStyle('background: linear-gradient(to right, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255))')
  })

  // 测试成功部分进度
  it('应该正确显示成功部分进度', () => {
    render(<Progress percent={80} successPercent={30} />)

    const progressBg = document.querySelector('.uno-progress__line-bg')
    expect(progressBg).toHaveStyle('width: 80%')

    const successBg = document.querySelector('.uno-progress__line-success-bg')
    expect(successBg).toBeInTheDocument()
    expect(successBg).toHaveStyle('width: 30%')
  })

  // 测试自定义轨道颜色
  it('应该应用自定义轨道颜色', () => {
    render(<Progress percent={50} trailColor='rgb(200, 200, 200)' />)

    const progressInner = document.querySelector('.uno-progress__line-inner')
    expect(progressInner).toHaveStyle('background-color: rgb(200, 200, 200)')
  })

  // 测试自定义线宽
  it('应该应用自定义线宽', () => {
    render(<Progress percent={50} strokeWidth={12} />)

    const progressInner = document.querySelector('.uno-progress__line-inner')
    expect(progressInner).toHaveStyle('height: 12px')
  })

  // 测试步骤进度条
  it('应该正确渲染步骤进度条', () => {
    const steps = {
      count: 5,
      stepWidth: 10,
    }

    render(<Progress percent={60} steps={steps} />)

    const stepsContainer = document.querySelector('.uno-progress__line-steps')
    expect(stepsContainer).toBeInTheDocument()

    const stepItems = document.querySelectorAll('.uno-progress__line-steps-item')
    expect(stepItems).toHaveLength(5)

    // 60% 对应 3 个活跃步骤
    const activeSteps = document.querySelectorAll('.uno-progress__line-steps-item-active')
    expect(activeSteps).toHaveLength(3)
  })

  // 测试圆形进度条的宽度
  it('应该为圆形进度条应用自定义宽度', () => {
    render(<Progress percent={50} type='circle' width={200} />)

    const circleContainer = document.querySelector('.uno-progress__circle')
    expect(circleContainer).toHaveStyle({
      width: '200px',
      height: '200px'
    })

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '200')
    expect(svg).toHaveAttribute('height', '200')
  })

  // 测试自定义格式化函数
  it('应该应用自定义格式化函数', () => {
    const formatter = jest.fn((percent) => `${percent} / 100`)

    render(<Progress percent={50} format={formatter} />)

    expect(formatter).toHaveBeenCalledWith(50, undefined)
    const progressText = document.querySelector('.uno-progress__line-text')
    expect(progressText).toHaveTextContent('50 / 100')
  })

  // 测试自定义类名和样式
  it('应该应用自定义类名和样式', () => {
    render(
      <Progress
        percent={50}
        className='custom-progress'
        style={{ margin: '10px' }}
      />
    )

    const progress = document.querySelector('.uno-progress')
    expect(progress).toHaveClass('custom-progress')
    expect(progress).toHaveStyle('margin: 10px')
  })
}) 