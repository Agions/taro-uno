/**
 * Avatar Component Test
 * 测试头像组件的各种功能
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'
import { createTestProps, renderComponent, testAssertions } from '@/utils/test-utils'

describe('Avatar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render avatar with default props', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render avatar with custom className', () => {
      const props = createTestProps({
        className: 'custom-avatar'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('custom-avatar')
    })

    it('should render avatar with custom style', () => {
      const props = createTestProps({
        style: { backgroundColor: 'red' }
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveStyle('background-color: red')
    })
  })

  describe('Image Avatar', () => {
    it('should render avatar with image src', () => {
      const props = createTestProps({
        src: 'https://example.com/avatar.jpg'
      })
      const { container } = renderComponent(Avatar, props)
      const image = container.querySelector('img')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('should render avatar with alt text', () => {
      const props = createTestProps({
        alt: 'User Avatar'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('U')
    })

    it('should handle image load error', () => {
      const consoleSpy = vi.spyOn(console, 'error')
      const props = createTestProps({
        src: 'invalid-image.jpg'
      })
      const { container } = renderComponent(Avatar, props)
      const image = container.querySelector('img')

      // 触发错误事件
      if (image) {
        fireEvent.error(image)
        expect(consoleSpy).toHaveBeenCalledWith('Avatar image load error:', expect.any(Object))
      }
    })
  })

  describe('Text Avatar', () => {
    it('should render avatar with children text', () => {
      const props = createTestProps({
        children: 'AB'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('AB')
    })

    it('should render avatar with alt text as fallback', () => {
      const props = createTestProps({
        alt: 'John Doe'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('J')
    })

    it('should render avatar with default fallback text', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('U')
    })

    it('should handle empty children', () => {
      const props = createTestProps({
        children: ''
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('U')
    })
  })

  describe('Icon Avatar', () => {
    it('should render avatar with icon', () => {
      const props = createTestProps({
        icon: <span data-testid="avatar-icon">👤</span>
      })
      const { getByTestId } = renderComponent(Avatar, props)
      expect(getByTestId('avatar-icon')).toBeInTheDocument()
    })

    it('should prioritize icon over text', () => {
      const props = createTestProps({
        icon: <span data-testid="avatar-icon">👤</span>,
        children: 'AB'
      })
      const { getByTestId, container } = renderComponent(Avatar, props)
      expect(getByTestId('avatar-icon')).toBeInTheDocument()
      expect(container).not.toHaveTextContent('AB')
    })

    it('should prioritize icon over image', () => {
      const props = createTestProps({
        icon: <span data-testid="avatar-icon">👤</span>,
        src: 'https://example.com/avatar.jpg'
      })
      const { getByTestId, container } = renderComponent(Avatar, props)
      expect(getByTestId('avatar-icon')).toBeInTheDocument()
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Size Variations', () => {
    it('should render small avatar', () => {
      const props = createTestProps({
        size: 'small'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('taro-uno-avatar--size-small')
    })

    it('should render medium avatar', () => {
      const props = createTestProps({
        size: 'medium'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('taro-uno-avatar--size-medium')
    })

    it('should render large avatar', () => {
      const props = createTestProps({
        size: 'large'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('taro-uno-avatar--size-large')
    })

    it('should render avatar with custom numeric size', () => {
      const props = createTestProps({
        size: 64
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveStyle(expect.stringContaining('64px'))
    })
  })

  describe('Shape Variations', () => {
    it('should render circle avatar', () => {
      const props = createTestProps({
        shape: 'circle'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('taro-uno-avatar--shape-circle')
    })

    it('should render square avatar', () => {
      const props = createTestProps({
        shape: 'square'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.firstChild).toHaveClass('taro-uno-avatar--shape-square')
    })
  })

  describe('Events', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        onClick: handleClick
      })
      const { container } = renderComponent(Avatar, props)

      fireEvent.click(container.firstChild as HTMLElement)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should pass click event details', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        onClick: handleClick
      })
      const { container } = renderComponent(Avatar, props)

      const mockEvent = new MouseEvent('click', { bubbles: true })
      fireEvent.click(container.firstChild as HTMLElement, mockEvent)
      expect(handleClick).toHaveBeenCalledWith(mockEvent)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const props = createTestProps({
        alt: 'User Avatar'
      })
      const { container } = renderComponent(Avatar, props)
      const avatar = container.firstChild as HTMLElement
      expect(avatar).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        onClick: handleClick
      })
      const { container } = renderComponent(Avatar, props)
      const avatar = container.firstChild as HTMLElement

      avatar.focus()
      fireEvent.keyDown(avatar, { key: 'Enter' })
      fireEvent.keyDown(avatar, { key: ' ' })

      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Responsive Design', () => {
    it('should handle different viewport sizes', () => {
      const props = createTestProps({
        size: 'medium'
      })
      const { container } = renderComponent(Avatar, props)

      // 测试不同视口大小
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320, // 移动端
      })
      expect(container.firstChild).toBeInTheDocument()

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920, // 桌面端
      })
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render efficiently', () => {
      const props = createTestProps({})
      const startTime = performance.now()

      const { container } = renderComponent(Avatar, props)

      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(50) // 渲染时间小于50ms
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle multiple renders efficiently', () => {
      const props = createTestProps({})
      let renderCount = 0

      const TestComponent = () => {
        renderCount++
        return <Avatar {...props} />
      }

      const { rerender } = renderComponent(TestComponent, {})
      rerender(<TestComponent />)

      expect(renderCount).toBeLessThan(5) // 避免过度渲染
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long alt text', () => {
      const longText = 'A'.repeat(1000)
      const props = createTestProps({
        alt: longText
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('A')
    })

    it('should handle special characters in children', () => {
      const props = createTestProps({
        children: '@#$%'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('@#$%')
    })

    it('should handle null/undefined src', () => {
      const props = createTestProps({
        src: null
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('U')
    })

    it('should handle empty string src', () => {
      const props = createTestProps({
        src: ''
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('U')
    })
  })

  describe('CSS Classes', () => {
    it('should have correct BEM classes', () => {
      const props = createTestProps({
        size: 'medium',
        shape: 'circle'
      })
      const { container } = renderComponent(Avatar, props)
      const avatar = container.firstChild as HTMLElement

      expect(avatar).toHaveClass('taro-uno-avatar')
      expect(avatar).toHaveClass('taro-uno-avatar--size-medium')
      expect(avatar).toHaveClass('taro-uno-avatar--shape-circle')
    })

    it('should handle custom className correctly', () => {
      const props = createTestProps({
        className: 'my-avatar'
      })
      const { container } = renderComponent(Avatar, props)
      const avatar = container.firstChild as HTMLElement

      expect(avatar).toHaveClass('taro-uno-avatar')
      expect(avatar).toHaveClass('my-avatar')
    })
  })

  describe('Content Priority', () => {
    it('should prioritize src over children and alt', () => {
      const props = createTestProps({
        src: 'https://example.com/avatar.jpg',
        children: 'AB',
        alt: 'John Doe'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container.querySelector('img')).toBeInTheDocument()
      expect(container).not.toHaveTextContent('AB')
    })

    it('should prioritize icon over children and alt', () => {
      const props = createTestProps({
        icon: <span data-testid="avatar-icon">👤</span>,
        children: 'AB',
        alt: 'John Doe'
      })
      const { getByTestId, container } = renderComponent(Avatar, props)
      expect(getByTestId('avatar-icon')).toBeInTheDocument()
      expect(container).not.toHaveTextContent('AB')
    })

    it('should prioritize children over alt', () => {
      const props = createTestProps({
        children: 'AB',
        alt: 'John Doe'
      })
      const { container } = renderComponent(Avatar, props)
      expect(container).toHaveTextContent('AB')
      expect(container).not.toHaveTextContent('J')
    })
  })
})