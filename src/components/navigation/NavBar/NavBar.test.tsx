import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { NavBar } from './NavBar'
import type { NavBarProps, NavBarRef } from './NavBar.types'

describe('NavBar Component', () => {
  const defaultProps: NavBarProps = {
    title: '页面标题',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders navbar with default props', () => {
      render(<NavBar {...defaultProps} />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('renders navbar with custom title as React node', () => {
      const customTitle = <span>自定义标题</span>
      render(<NavBar {...defaultProps} title={customTitle} />)

      expect(screen.getByText('自定义标题')).toBeInTheDocument()
    })

    it('renders navbar with left content', () => {
      render(<NavBar {...defaultProps} left={<span>左侧</span>} />)

      expect(screen.getByText('左侧')).toBeInTheDocument()
    })

    it('renders navbar with right content', () => {
      render(<NavBar {...defaultProps} right={<span>右侧</span>} />)

      expect(screen.getByText('右侧')).toBeInTheDocument()
    })

    it('renders navbar with back arrow', () => {
      render(<NavBar {...defaultProps} backArrow={true} />)

      expect(screen.getByText('←')).toBeInTheDocument()
    })

    it('renders navbar with custom back icon', () => {
      const customBackIcon = <span>返回</span>
      render(<NavBar {...defaultProps} backArrow={true} backIcon={customBackIcon} />)

      expect(screen.getByText('返回')).toBeInTheDocument()
    })

    it('renders navbar without border', () => {
      render(<NavBar {...defaultProps} border={false} />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('renders navbar with transparent background', () => {
      render(<NavBar {...defaultProps} transparent={true} />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('renders navbar with dark theme', () => {
      render(<NavBar {...defaultProps} theme="dark" />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('renders navbar without placeholder', () => {
      render(<NavBar {...defaultProps} placeholder={false} />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles back button click with custom handler', () => {
      const onBack = vi.fn()
      render(<NavBar {...defaultProps} backArrow={true} onBack={onBack} />)

      fireEvent.click(screen.getByText('←'))

      expect(onBack).toHaveBeenCalled()
    })

    it('handles left content click', () => {
      const LeftComponent = () => <button onClick={() => {}}>左侧按钮</button>
      render(<NavBar {...defaultProps} left={<LeftComponent />} />)

      fireEvent.click(screen.getByText('左侧按钮'))
    })

    it('handles right content click', () => {
      const RightComponent = () => <button onClick={() => {}}>右侧按钮</button>
      render(<NavBar {...defaultProps} right={<RightComponent />} />)

      fireEvent.click(screen.getByText('右侧按钮'))
    })
  })

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current?.setTitle).toBeDefined()
      expect(ref.current?.setLeft).toBeDefined()
      expect(ref.current?.setRight).toBeDefined()
      expect(ref.current?.showBackArrow).toBeDefined()
      expect(ref.current?.hideBackArrow).toBeDefined()
    })

    it('setTitle updates the title', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      act(() => {
        ref.current?.setTitle('新标题')
      })

      expect(screen.getByText('新标题')).toBeInTheDocument()
    })

    it('setLeft updates the left content', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      act(() => {
        ref.current?.setLeft(<span>新的左侧</span>)
      })

      expect(screen.getByText('新的左侧')).toBeInTheDocument()
    })

    it('setRight updates the right content', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      act(() => {
        ref.current?.setRight(<span>新的右侧</span>)
      })

      expect(screen.getByText('新的右侧')).toBeInTheDocument()
    })

    it('showBackArrow displays back arrow', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      act(() => {
        ref.current?.showBackArrow()
      })

      expect(screen.getByText('←')).toBeInTheDocument()
    })

    it('hideBackArrow hides back arrow', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} backArrow={true} ref={ref} />)

      expect(screen.getByText('←')).toBeInTheDocument()

      act(() => {
        ref.current?.hideBackArrow()
      })

      expect(screen.queryByText('←')).not.toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('handles safe area inset top', () => {
      render(<NavBar {...defaultProps} safeAreaInsetTop={true} />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('handles fixed positioning', () => {
      render(<NavBar {...defaultProps} position="fixed" />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('handles static positioning', () => {
      render(<NavBar {...defaultProps} position="static" />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })

    it('handles different themes', () => {
      const { rerender } = render(<NavBar {...defaultProps} theme="light" />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()

      rerender(<NavBar {...defaultProps} theme="dark" />)

      expect(screen.getByText('页面标题')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty title', () => {
      render(<NavBar title={undefined} />)

      const navbar = screen.queryByText('页面标题')
      expect(navbar).not.toBeInTheDocument()
    })

    it('handles very long title', () => {
      const longTitle = '这是一个非常非常长的页面标题，用于测试标题截断功能'
      render(<NavBar title={longTitle} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles complex left content', () => {
      const complexLeft = (
        <div>
          <span>图标</span>
          <span>文字</span>
          <button>按钮</button>
        </div>
      )
      render(<NavBar {...defaultProps} left={complexLeft} />)

      expect(screen.getByText('图标')).toBeInTheDocument()
      expect(screen.getByText('文字')).toBeInTheDocument()
      expect(screen.getByText('按钮')).toBeInTheDocument()
    })

    it('handles complex right content', () => {
      const complexRight = (
        <div>
          <button>设置</button>
          <button>分享</button>
        </div>
      )
      render(<NavBar {...defaultProps} right={complexRight} />)

      expect(screen.getByText('设置')).toBeInTheDocument()
      expect(screen.getByText('分享')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with multiple navbars', () => {
      const { rerender } = render(
        <div>
          {[1, 2, 3].map(i => (
            <NavBar key={i} title={`页面${i}`} />
          ))}
        </div>
      )

      expect(screen.getAllByText(/页面\d/)).toHaveLength(3)

      rerender(
        <div>
          {[1, 2, 3, 4].map(i => (
            <NavBar key={i} title={`页面${i}`} />
          ))}
        </div>
      )

      expect(screen.getAllByText(/页面\d/)).toHaveLength(4)
    })

    it('handles rapid state changes efficiently', () => {
      const ref = React.createRef<NavBarRef>()
      render(<NavBar {...defaultProps} ref={ref} />)

      // 快速更改标题
      act(() => {
        for (let i = 0; i < 10; i++) {
          ref.current?.setTitle(`标题${i}`)
        }
      })

      expect(screen.getByText('标题9')).toBeInTheDocument()
    })
  })
})
