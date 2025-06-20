import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading from './Loading'

// 模拟定时器
jest.useFakeTimers()

describe('Loading 组件', () => {
  // 基础渲染测试
  test('应该正确渲染Loading组件', () => {
    const { container } = render(<Loading />)
    expect(container.querySelector('.uno-loading')).toBeInTheDocument()
    expect(container.querySelector('.uno-loading__indicator')).toBeInTheDocument()
  })

  // 不同类型测试
  test('应该正确渲染不同类型的Loading', () => {
    const types = ['spinner', 'circle', 'dots', 'pulse', 'wave'] as const

    types.forEach(type => {
      const { container, unmount } = render(<Loading type={type} />)

      if (type === 'spinner') {
        expect(container.querySelector('.uno-loading__spinner')).toBeInTheDocument()
      } else if (type === 'circle') {
        expect(container.querySelector('.uno-loading__circle')).toBeInTheDocument()
      } else if (type === 'dots') {
        expect(container.querySelector('.uno-loading__dots')).toBeInTheDocument()
      } else if (type === 'pulse') {
        expect(container.querySelector('.uno-loading__pulse')).toBeInTheDocument()
      } else if (type === 'wave') {
        expect(container.querySelector('.uno-loading__wave')).toBeInTheDocument()
      }

      unmount()
    })
  })

  // 不同尺寸测试
  test('应该正确渲染不同尺寸的Loading', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach(size => {
      const { container, unmount } = render(<Loading size={size} />)
      expect(container.querySelector(`.uno-loading--${size}`)).toBeInTheDocument()
      unmount()
    })
  })

  // 文本测试
  test('应该正确渲染加载文本', () => {
    const { getByText } = render(<Loading text='加载中...' />)
    expect(getByText('加载中...')).toBeInTheDocument()
  })

  // 文本位置测试
  test('应该正确渲染不同位置的文本', () => {
    const positions = ['left', 'right', 'top', 'bottom'] as const

    positions.forEach(position => {
      const { container, getByText, unmount } = render(
        <Loading text='加载中...' textPosition={position} />
      )

      expect(getByText('加载中...')).toBeInTheDocument()
      expect(container.querySelector(`.uno-loading__text--${position}`)).toBeInTheDocument()

      if (position === 'left' || position === 'right') {
        expect(container.querySelector('.uno-loading--horizontal')).toBeInTheDocument()
      }

      unmount()
    })
  })

  // 描述信息测试
  test('应该正确渲染描述信息', () => {
    const { getByText } = render(<Loading withDescription description='请耐心等待...' />)

    expect(getByText('请耐心等待...')).toBeInTheDocument()
  })

  // 全屏模式测试
  test('应该正确渲染全屏模式', () => {
    const { container } = render(<Loading fullscreen />)
    expect(container.querySelector('.uno-loading--fullscreen')).toBeInTheDocument()
  })

  // 遮罩层测试
  test('应该正确渲染遮罩层', () => {
    const { container } = render(<Loading fullscreen mask />)
    expect(container.querySelector('.uno-loading--with-mask')).toBeInTheDocument()
  })

  // 自定义颜色测试
  test('应该正确应用自定义颜色', () => {
    const { container } = render(<Loading color='#ff0000' />)
    const loadingElement = container.querySelector('.uno-loading')

    // 检查内联样式中是否包含自定义颜色变量
    expect(loadingElement).toHaveStyle('--loading-color: #ff0000')
  })

  // 自定义图标测试
  test('应该正确渲染自定义图标', () => {
    const { container } = render(<Loading icon={<div className='custom-icon'>自定义图标</div>} />)

    expect(container.querySelector('.custom-icon')).toBeInTheDocument()
    expect(container.querySelector('.custom-icon')).toHaveTextContent('自定义图标')
  })

  // 延迟显示测试
  test('应该正确处理延迟显示', () => {
    const { container, rerender } = render(<Loading delay={1000} />)

    // 初始时不应该显示
    expect(container.querySelector('.uno-loading')).not.toBeInTheDocument()

    // 前进1000ms
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    rerender(<Loading delay={1000} />)

    // 延迟后应该显示
    expect(container.querySelector('.uno-loading')).toBeInTheDocument()
  })

  // 子元素测试
  test('应该正确渲染子元素', () => {
    const { getByText } = render(
      <Loading>
        <div>子元素内容</div>
      </Loading>
    )

    expect(getByText('子元素内容')).toBeInTheDocument()
  })
}) 