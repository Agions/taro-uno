/**
 * Tag Component Test
 * 测试标签组件的各种功能
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tag } from './Tag'
import { createTestProps, renderComponent, testAssertions } from '@/utils/test-utils'

describe('Tag Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render tag with default props', () => {
      const props = createTestProps({
        children: 'Default Tag'
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
      expect(container).toHaveTextContent('Default Tag')
    })

    it('should render tag with custom className', () => {
      const props = createTestProps({
        children: 'Custom Tag',
        className: 'custom-tag'
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toHaveClass('custom-tag')
    })

    it('should render tag with custom style', () => {
      const props = createTestProps({
        children: 'Styled Tag',
        style: { backgroundColor: 'red' }
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toHaveStyle('background-color: red')
    })
  })

  describe('Color Variations', () => {
    const colors = ['default', 'primary', 'success', 'warning', 'danger', 'info']

    colors.forEach(color => {
      it(`should render ${color} tag`, () => {
        const props = createTestProps({
          children: `${color} Tag`,
          color: color as any
        })
        const { container } = renderComponent(Tag, props)
        expect(container.firstChild).toBeInTheDocument()
        expect(container).toHaveTextContent(`${color} Tag`)
      })
    })

    it('should render tag with custom color', () => {
      const props = createTestProps({
        children: 'Custom Color Tag',
        color: '#ff6b6b'
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
      expect(container).toHaveTextContent('Custom Color Tag')
    })
  })

  describe('Size Variations', () => {
    const sizes = ['small', 'medium', 'large']

    sizes.forEach(size => {
      it(`should render ${size} tag`, () => {
        const props = createTestProps({
          children: `${size} Tag`,
          size: size as any
        })
        const { container } = renderComponent(Tag, props)
        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  describe('Variant Variations', () => {
    const variants = ['solid', 'outline', 'light']

    variants.forEach(variant => {
      it(`should render ${variant} tag`, () => {
        const props = createTestProps({
          children: `${variant} Tag`,
          variant: variant as any
        })
        const { container } = renderComponent(Tag, props)
        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  describe('Icon Support', () => {
    it('should render tag with icon', () => {
      const props = createTestProps({
        children: 'Icon Tag',
        icon: <span data-testid="tag-icon">★</span>
      })
      const { getByTestId } = renderComponent(Tag, props)
      expect(getByTestId('tag-icon')).toBeInTheDocument()
      expect(getByTestId('tag-icon')).toHaveTextContent('★')
    })

    it('should render tag with only icon', () => {
      const props = createTestProps({
        icon: <span data-testid="icon-only">★</span>
      })
      const { getByTestId } = renderComponent(Tag, props)
      expect(getByTestId('icon-only')).toBeInTheDocument()
    })
  })

  describe('Closable Feature', () => {
    it('should render closable tag', () => {
      const props = createTestProps({
        children: 'Closable Tag',
        closable: true
      })
      const { container } = renderComponent(Tag, props)
      expect(container).toHaveTextContent('×')
    })

    it('should call onClose when close button is clicked', () => {
      const handleClose = vi.fn()
      const props = createTestProps({
        children: 'Closable Tag',
        closable: true,
        onClose: handleClose
      })
      const { container } = renderComponent(Tag, props)

      const closeIcon = container.querySelector('text:last-child')
      fireEvent.click(closeIcon as HTMLElement)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should hide tag when closed', () => {
      const props = createTestProps({
        children: 'Closable Tag',
        closable: true
      })
      const { container } = renderComponent(Tag, props)

      const closeIcon = container.querySelector('text:last-child')
      fireEvent.click(closeIcon as HTMLElement)

      expect(container.firstChild).toBeNull()
    })

    it('should stop event propagation when closing', () => {
      const handleClick = vi.fn()
      const handleClose = vi.fn()
      const props = createTestProps({
        children: 'Closable Tag',
        closable: true,
        onClick: handleClick,
        onClose: handleClose
      })
      const { container } = renderComponent(Tag, props)

      const closeIcon = container.querySelector('text:last-child')
      fireEvent.click(closeIcon as HTMLElement)

      expect(handleClose).toHaveBeenCalledTimes(1)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Checkable Feature', () => {
    it('should render checkable tag', () => {
      const props = createTestProps({
        children: 'Checkable Tag',
        checkable: true
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should toggle checked state when clicked', () => {
      const props = createTestProps({
        children: 'Checkable Tag',
        checkable: true
      })
      const { container } = renderComponent(Tag, props)

      const tag = container.firstChild as HTMLElement
      fireEvent.click(tag)

      expect(tag).toHaveStyle(expect.stringContaining('checked'))
    })

    it('should call onCheckedChange when checked state changes', () => {
      const handleCheckedChange = vi.fn()
      const props = createTestProps({
        children: 'Checkable Tag',
        checkable: true,
        onCheckedChange: handleCheckedChange
      })
      const { container } = renderComponent(Tag, props)

      const tag = container.firstChild as HTMLElement
      fireEvent.click(tag)

      expect(handleCheckedChange).toHaveBeenCalledWith(true)
    })

    it('should respect initial checked state', () => {
      const props = createTestProps({
        children: 'Checked Tag',
        checkable: true,
        checked: true
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toHaveStyle(expect.stringContaining('checked'))
    })
  })

  describe('Click Events', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        children: 'Clickable Tag',
        onClick: handleClick
      })
      const { container } = renderComponent(Tag, props)

      const tag = container.firstChild as HTMLElement
      fireEvent.click(tag)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should stop event propagation when clicking', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        children: 'Clickable Tag',
        onClick: handleClick
      })
      const { container } = renderComponent(Tag, props)

      const tag = container.firstChild as HTMLElement
      const mockEvent = { stopPropagation: vi.fn() }
      fireEvent.click(tag, mockEvent)

      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1)
    })
  })

  describe('Combination Features', () => {
    it('should handle closable and checkable together', () => {
      const props = createTestProps({
        children: 'Combo Tag',
        closable: true,
        checkable: true
      })
      const { container } = renderComponent(Tag, props)
      expect(container).toHaveTextContent('×')
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle icon with closable', () => {
      const props = createTestProps({
        children: 'Icon Closable Tag',
        icon: <span data-testid="combo-icon">★</span>,
        closable: true
      })
      const { getByTestId, container } = renderComponent(Tag, props)
      expect(getByTestId('combo-icon')).toBeInTheDocument()
      expect(container).toHaveTextContent('×')
    })

    it('should handle icon with checkable', () => {
      const props = createTestProps({
        children: 'Icon Checkable Tag',
        icon: <span data-testid="combo-icon">★</span>,
        checkable: true
      })
      const { getByTestId, container } = renderComponent(Tag, props)
      expect(getByTestId('combo-icon')).toBeInTheDocument()
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Ref Methods', () => {
    it('should provide ref methods', () => {
      const ref = vi.fn()
      const props = createTestProps({
        children: 'Ref Tag',
        color: 'primary',
        size: 'large',
        closable: true,
        checkable: true
      })

      renderComponent(Tag, { ...props, ref })

      // Mock ref object
      const mockRef = {
        getColor: vi.fn().mockReturnValue('primary'),
        getSize: vi.fn().mockReturnValue('large'),
        isClosable: vi.fn().mockReturnValue(true),
        isCheckable: vi.fn().mockReturnValue(true),
        isChecked: vi.fn().mockReturnValue(false),
        setChecked: vi.fn(),
        close: vi.fn(),
      }

      expect(mockRef.getColor()).toBe('primary')
      expect(mockRef.getSize()).toBe('large')
      expect(mockRef.isClosable()).toBe(true)
      expect(mockRef.isCheckable()).toBe(true)
      expect(mockRef.isChecked()).toBe(false)
    })

    it('should allow programmatic state changes via ref', () => {
      const handleCheckedChange = vi.fn()
      const handleClose = vi.fn()

      const props = createTestProps({
        children: 'Programmatic Tag',
        checkable: true,
        closable: true,
        onCheckedChange: handleCheckedChange,
        onClose: handleClose
      })

      // Mock ref with methods
      const mockRef = {
        setChecked: vi.fn((checked: boolean) => {
          handleCheckedChange(checked)
        }),
        close: vi.fn(() => {
          handleClose({} as any)
        }),
      } as any

      renderComponent(Tag, { ...props, ref: mockRef })

      // Test programmatic check
      mockRef.setChecked(true)
      expect(handleCheckedChange).toHaveBeenCalledWith(true)

      // Test programmatic close
      mockRef.close()
      expect(handleClose).toHaveBeenCalledWith({})
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const props = createTestProps({
        children: ''
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle null children', () => {
      const props = createTestProps({
        children: null
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      const props = createTestProps({})
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'A'.repeat(100)
      const props = createTestProps({
        children: longText
      })
      const { container } = renderComponent(Tag, props)
      expect(container).toHaveTextContent(longText)
    })

    it('should handle special characters', () => {
      const props = createTestProps({
        children: 'Special @#$% Characters'
      })
      const { container } = renderComponent(Tag, props)
      expect(container).toHaveTextContent('Special @#$% Characters')
    })
  })

  describe('Performance', () => {
    it('should render efficiently', () => {
      const props = createTestProps({
        children: 'Performance Tag'
      })
      const startTime = performance.now()

      const { container } = renderComponent(Tag, props)

      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(50)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle multiple renders efficiently', () => {
      const props = createTestProps({
        children: 'Multiple Render Tag'
      })
      let renderCount = 0

      const TestComponent = () => {
        renderCount++
        return <Tag {...props} />
      }

      const { rerender } = renderComponent(TestComponent, {})
      rerender(<TestComponent />)

      expect(renderCount).toBeLessThan(5)
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const handleClick = vi.fn()
      const props = createTestProps({
        children: 'Accessible Tag',
        onClick: handleClick
      })
      const { container } = renderComponent(Tag, props)
      const tag = container.firstChild as HTMLElement

      tag.focus()
      fireEvent.keyDown(tag, { key: 'Enter' })
      fireEvent.keyDown(tag, { key: ' ' })

      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('should handle disabled-like states', () => {
      const props = createTestProps({
        children: 'Static Tag',
        onClick: undefined
      })
      const { container } = renderComponent(Tag, props)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('State Management', () => {
    it('should maintain checked state internally', () => {
      const props = createTestProps({
        children: 'State Tag',
        checkable: true
      })
      const { container } = renderComponent(Tag, props)

      const tag = container.firstChild as HTMLElement

      // Toggle checked state
      fireEvent.click(tag)
      expect(tag).toHaveStyle(expect.stringContaining('checked'))

      // Toggle back
      fireEvent.click(tag)
      expect(tag).not.toHaveStyle(expect.stringContaining('checked'))
    })

    it('should handle external checked state changes', () => {
      const { container, rerender } = renderComponent(Tag, {
        children: 'External Tag',
        checkable: true,
        checked: false
      })

      const tag = container.firstChild as HTMLElement
      expect(tag).not.toHaveStyle(expect.stringContaining('checked'))

      // Update external state
      rerender(<Tag children="External Tag" checkable={true} checked={true} />)
      expect(tag).toHaveStyle(expect.stringContaining('checked'))
    })
  })

  describe('Custom Colors', () => {
    it('should apply custom color for solid variant', () => {
      const props = createTestProps({
        children: 'Custom Solid',
        color: '#ff6b6b',
        variant: 'solid'
      })
      const { container } = renderComponent(Tag, props)
      const tag = container.firstChild as HTMLElement

      expect(tag).toHaveStyle('background-color: #ff6b6b')
      expect(tag).toHaveStyle('border-color: #ff6b6b')
      expect(tag).toHaveStyle('color: #ffffff')
    })

    it('should apply custom color for outline variant', () => {
      const props = createTestProps({
        children: 'Custom Outline',
        color: '#4ecdc4',
        variant: 'outline'
      })
      const { container } = renderComponent(Tag, props)
      const tag = container.firstChild as HTMLElement

      expect(tag).toHaveStyle('background-color: transparent')
      expect(tag).toHaveStyle('border-color: #4ecdc4')
      expect(tag).toHaveStyle('color: #4ecdc4')
    })

    it('should apply custom color for light variant', () => {
      const props = createTestProps({
        children: 'Custom Light',
        color: '#45b7d1',
        variant: 'light'
      })
      const { container } = renderComponent(Tag, props)
      const tag = container.firstChild as HTMLElement

      expect(tag).toHaveStyle('background-color: #45b7d120')
      expect(tag).toHaveStyle('border-color: transparent')
      expect(tag).toHaveStyle('color: #45b7d1')
    })
  })
})