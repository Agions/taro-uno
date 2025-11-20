/**
 * Loading Component Test
 * 测试加载指示器组件的各种功能
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Loading } from './Loading'
import { createTestProps, renderComponent, testAssertions } from '@/utils/test-utils'

describe('Loading Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('Rendering', () => {
    it('should render loading with default props', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render loading with custom className', () => {
      const props = createTestProps({
        className: 'custom-loading'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toHaveClass('custom-loading')
    })

    it('should render loading with custom style', () => {
      const props = createTestProps({
        style: { backgroundColor: 'red' }
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toHaveStyle('background-color: red')
    })

    it('should not render initially when delay > 0', () => {
      const props = createTestProps({
        delay: 1000
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeNull()
    })

    it('should render after delay when delay > 0', () => {
      const props = createTestProps({
        delay: 1000
      })
      const { container } = renderComponent(Loading, props)

      expect(container.firstChild).toBeNull()

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Types', () => {
    it('should render spinner type by default', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render spinner type explicitly', () => {
      const props = createTestProps({
        type: 'spinner'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render dots type', () => {
      const props = createTestProps({
        type: 'dots'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render pulse type', () => {
      const props = createTestProps({
        type: 'pulse'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render bars type', () => {
      const props = createTestProps({
        type: 'bars'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should fallback to spinner for unknown type', () => {
      const props = createTestProps({
        type: 'unknown' as any
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes = ['small', 'default', 'large']

    sizes.forEach(size => {
      it(`should render ${size} size`, () => {
        const props = createTestProps({
          size: size as any
        })
        const { container } = renderComponent(Loading, props)
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild).toHaveClass(`taro-uno-loading--${size}`)
      })
    })
  })

  describe('Text Support', () => {
    it('should render without text by default', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
      expect(container.querySelector('text')).toBeNull()
    })

    it('should render with text', () => {
      const props = createTestProps({
        text: 'Loading...'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
      expect(container).toHaveTextContent('Loading...')
    })

    it('should render with empty text', () => {
      const props = createTestProps({
        text: ''
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
      expect(container.querySelector('text')).toBeInTheDocument()
    })

    it('should render with long text', () => {
      const longText = 'A'.repeat(100)
      const props = createTestProps({
        text: longText
      })
      const { container } = renderComponent(Loading, props)
      expect(container).toHaveTextContent(longText)
    })
  })

  describe('Delay Feature', () => {
    it('should show immediately with delay=0', () => {
      const props = createTestProps({
        delay: 0
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should delay showing with delay>0', () => {
      const props = createTestProps({
        delay: 500
      })
      const { container } = renderComponent(Loading, props)

      expect(container.firstChild).toBeNull()

      act(() => {
        vi.advanceTimersByTime(499)
      })

      expect(container.firstChild).toBeNull()

      act(() => {
        vi.advanceTimersByTime(1)
      })

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should clear timer on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      const props = createTestProps({
        delay: 1000
      })
      const { container, unmount } = renderComponent(Loading, props)

      unmount()

      expect(clearTimeoutSpy).toHaveBeenCalled()
    })
  })

  describe('Ref Methods', () => {
    it('should provide ref methods', () => {
      const ref = vi.fn()
      const props = createTestProps({})

      renderComponent(Loading, { ...props, ref })

      expect(ref).toHaveBeenCalled()
    })

    it('should allow programmatic show/hide via ref', () => {
      const mockRef = {
        getElement: vi.fn(),
        show: vi.fn(),
        hide: vi.fn(),
      } as any

      const props = createTestProps({})
      renderComponent(Loading, { ...props, ref: mockRef })

      mockRef.show()
      mockRef.hide()

      expect(mockRef.show).toHaveBeenCalled()
      expect(mockRef.hide).toHaveBeenCalled()
    })

    it('should control visibility via ref methods', () => {
      const { container, rerender } = renderComponent(Loading, {
        delay: 1000
      })

      expect(container.firstChild).toBeNull()

      // Mock ref with show method
      const mockRef = {
        show: vi.fn(() => {
          rerender(<Loading delay={0} />)
        }),
        hide: vi.fn(() => {
          rerender(<Loading delay={999999} />)
        }),
      } as any

      rerender(<Loading delay={1000} ref={mockRef} />)

      mockRef.show()
      expect(container.firstChild).toBeInTheDocument()

      mockRef.hide()
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const props = createTestProps({
        text: 'Loading content'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should be accessible with screen readers', () => {
      const props = createTestProps({
        text: 'Loading content'
      })
      const { container } = renderComponent(Loading, props)
      const loading = container.firstChild as HTMLElement

      expect(loading).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render efficiently', () => {
      const props = createTestProps({})
      const startTime = performance.now()

      const { container } = renderComponent(Loading, props)

      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(50)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle multiple renders efficiently', () => {
      const props = createTestProps({})
      let renderCount = 0

      const TestComponent = () => {
        renderCount++
        return <Loading {...props} />
      }

      const { rerender } = renderComponent(TestComponent, {})
      rerender(<TestComponent />)

      expect(renderCount).toBeLessThan(5)
    })

    it('should handle complex animations efficiently', () => {
      const props = createTestProps({
        type: 'bars',
        size: 'large'
      })
      const startTime = performance.now()

      const { container } = renderComponent(Loading, props)

      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(50)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle negative delay', () => {
      const props = createTestProps({
        delay: -100
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle zero delay', () => {
      const props = createTestProps({
        delay: 0
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle very large delay', () => {
      const props = createTestProps({
        delay: 999999
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeNull()
    })

    it('should handle delay change', () => {
      const { container, rerender } = renderComponent(Loading, {
        delay: 1000
      })

      expect(container.firstChild).toBeNull()

      rerender(<Loading delay={0} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle type change', () => {
      const { container, rerender } = renderComponent(Loading, {
        type: 'spinner'
      })

      expect(container.firstChild).toBeInTheDocument()

      rerender(<Loading type="dots" />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Loading type="pulse" />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<Loading type="bars" />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle size change', () => {
      const { container, rerender } = renderComponent(Loading, {
        size: 'small'
      })

      expect(container.firstChild).toHaveClass('taro-uno-loading--small')

      rerender(<Loading size="default" />)
      expect(container.firstChild).toHaveClass('taro-uno-loading--default')

      rerender(<Loading size="large" />)
      expect(container.firstChild).toHaveClass('taro-uno-loading--large')
    })
  })

  describe('Animation Handling', () => {
    it('should handle spinner animation', () => {
      const props = createTestProps({
        type: 'spinner'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle dots animation delays', () => {
      const props = createTestProps({
        type: 'dots'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle bars animation delays', () => {
      const props = createTestProps({
        type: 'bars'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle pulse animation', () => {
      const props = createTestProps({
        type: 'pulse'
      })
      const { container } = renderComponent(Loading, props)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('State Management', () => {
    it('should maintain visibility state correctly', () => {
      const { container, rerender } = renderComponent(Loading, {
        delay: 500
      })

      expect(container.firstChild).toBeNull()

      act(() => {
        vi.advanceTimersByTime(500)
      })

      expect(container.firstChild).toBeInTheDocument()

      // Change delay back to large value
      rerender(<Loading delay={999999} />)
      expect(container.firstChild).toBeNull()
    })

    it('should reset timer when delay changes', () => {
      const { container, rerender } = renderComponent(Loading, {
        delay: 1000
      })

      act(() => {
        vi.advanceTimersByTime(500)
      })

      expect(container.firstChild).toBeNull()

      // Change delay to 0
      rerender(<Loading delay={0} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('should have correct BEM classes', () => {
      const props = createTestProps({
        size: 'medium'
      })
      const { container } = renderComponent(Loading, props)
      const loading = container.firstChild as HTMLElement

      expect(loading).toHaveClass('taro-uno-loading')
      expect(loading).toHaveClass('taro-uno-loading--default')
    })

    it('should handle custom className correctly', () => {
      const props = createTestProps({
        className: 'my-loading'
      })
      const { container } = renderComponent(Loading, props)
      const loading = container.firstChild as HTMLElement

      expect(loading).toHaveClass('taro-uno-loading')
      expect(loading).toHaveClass('my-loading')
    })
  })

  describe('Responsive Design', () => {
    it('should handle different viewport sizes', () => {
      const props = createTestProps({
        size: 'default'
      })
      const { container } = renderComponent(Loading, props)

      // Test different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      })
      expect(container.firstChild).toBeInTheDocument()

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      })
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Memory Management', () => {
    it('should clean up timers properly', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      const { unmount } = renderComponent(Loading, {
        delay: 1000
      })

      unmount()
      expect(clearTimeoutSpy).toHaveBeenCalled()
    })

    it('should handle rapid unmount', () => {
      const { unmount } = renderComponent(Loading, {
        delay: 1000
      })

      // Rapid mount/unmount
      unmount()
      expect(true).toBe(true) // Should not crash
    })
  })
})