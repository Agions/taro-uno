import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Input } from './Input'
import type { InputProps, InputRef } from './Input.types'

describe('Input Component', () => {
  const defaultProps: InputProps = {
    placeholder: '请输入内容',
    onChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders input with default props', () => {
      render(<Input {...defaultProps} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', '请输入内容')
    })

    it('renders input with different sizes', () => {
      const sizes: Array<InputProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl']

      sizes.forEach(size => {
        const { container } = render(<Input {...defaultProps} size={size} />)
        const input = container.querySelector('input')
        expect(input).toBeInTheDocument()
        // Size affects styling, not CSS classes in this implementation
      })
    })

    it('renders input with different variants', () => {
      const variants: Array<InputProps['variant']> = ['outlined', 'filled', 'underlined']

      variants.forEach(variant => {
        const { container } = render(<Input {...defaultProps} variant={variant} />)
        const input = container.querySelector('input')
        expect(input).toBeInTheDocument()
        // Variant affects styling, not CSS classes in this implementation
      })
    })

    it('renders input with different types', () => {
      const types: Array<InputProps['type']> = ['text', 'password', 'number', 'email', 'tel', 'idcard', 'digit']

      types.forEach(type => {
        const { container } = render(<Input {...defaultProps} type={type} />)
        const input = container.querySelector('input')
        expect(input).toHaveAttribute('type', type)
      })
    })

    it('renders input with different statuses', () => {
      const statuses: Array<InputProps['status']> = ['normal', 'error', 'warning', 'success']

      statuses.forEach(status => {
        const { container } = render(<Input {...defaultProps} status={status} />)
        const input = container.querySelector('input')
        expect(input).toBeInTheDocument()
        // Status affects styling, not CSS classes in this implementation
      })
    })

    it('renders input with label', () => {
      render(<Input {...defaultProps} label="用户名" />)

      expect(screen.getByText('用户名')).toBeInTheDocument()
    })

    it('renders input with helper text', () => {
      render(<Input {...defaultProps} helperText="请输入您的用户名" />)

      expect(screen.getByText('请输入您的用户名')).toBeInTheDocument()
    })

    it('renders input with error text', () => {
      render(<Input {...defaultProps} errorText="用户名不能为空" />)

      expect(screen.getByText('用户名不能为空')).toBeInTheDocument()
    })

    it('renders input with prefix', () => {
      const prefix = <span data-testid="prefix">👤</span>
      render(<Input {...defaultProps} prefix={prefix} />)

      expect(screen.getByTestId('prefix')).toBeInTheDocument()
    })

    it('renders input with suffix', () => {
      const suffix = <span data-testid="suffix">@example.com</span>
      render(<Input {...defaultProps} suffix={suffix} />)

      expect(screen.getByTestId('suffix')).toBeInTheDocument()
    })

    it('renders disabled input', () => {
      render(<Input {...defaultProps} disabled />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('taro-uno-input--disabled')
    })

    it('renders readonly input', () => {
      render(<Input {...defaultProps} readonly />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveAttribute('readonly')
      expect(input).toHaveClass('taro-uno-input--readonly')
    })

    it('renders input with clear button', () => {
      render(<Input {...defaultProps} clearable value="test" clearTrigger="always" />)

      const clearButton = screen.getByText('×')
      expect(clearButton).toBeInTheDocument()
    })

    it('renders input with password toggle', () => {
      render(<Input {...defaultProps} type="password" showPasswordToggle />)

      const toggleButton = screen.getByText('👁️‍🗨️')
      expect(toggleButton).toBeInTheDocument()
    })

    it('renders input with character count', () => {
      render(<Input {...defaultProps} showCount maxLength={10} value="test" />)

      expect(screen.getByText('4/10')).toBeInTheDocument()
    })

    it('renders multiline input', () => {
      render(<Input {...defaultProps} multiline rows={3} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveClass('taro-uno-input--multiline')
    })
  })

  describe('Event Handling', () => {
    it('handles value change', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" value="" onChange={onChange} />)

      const input = screen.getByPlaceholderText('请输入内容')
      // TaroInput uses onInput event with detail.value structure
      fireEvent.input(input, { target: { value: 'test' } })

      expect(onChange).toHaveBeenCalledWith('test', expect.any(Object))
    })

    it('handles focus event', () => {
      const onFocus = vi.fn()
      render(<Input {...defaultProps} onFocus={onFocus} />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.focus(input)

      expect(onFocus).toHaveBeenCalledWith(expect.any(Object))
    })

    it('handles blur event', () => {
      const onBlur = vi.fn()
      render(<Input {...defaultProps} onBlur={onBlur} />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.blur(input)

      expect(onBlur).toHaveBeenCalledWith(expect.any(Object))
    })

    it('handles confirm event', () => {
      const onConfirm = vi.fn()
      render(<Input {...defaultProps} onConfirm={onConfirm} />)

      const input = screen.getByPlaceholderText('请输入内容')
      // TaroInput uses onConfirm event, trigger with keyDown
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(onConfirm).toHaveBeenCalledWith('', expect.any(Object))
    })

    it('handles clear event', () => {
      const onClear = vi.fn()
      render(<Input {...defaultProps} clearable value="test" onClear={onClear} clearTrigger="always" />)

      const clearButton = screen.getByText('×')
      fireEvent.click(clearButton)

      expect(onClear).toHaveBeenCalledWith(expect.any(Object))
    })

    it('handles password toggle', () => {
      render(<Input {...defaultProps} type="password" showPasswordToggle />)

      const toggleButton = screen.getByText('👁️‍🗨️')
      fireEvent.click(toggleButton)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('does not handle events when disabled', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" disabled onChange={onChange} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'test' } })

      expect(onChange).not.toHaveBeenCalled()
    })

    it('does not handle events when readonly', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" readonly onChange={onChange} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'test' } })

      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const onChange = vi.fn()
      const { rerender } = render(<Input placeholder="请输入内容" value="test" onChange={onChange} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('test')

      rerender(<Input placeholder="请输入内容" value="updated" onChange={onChange} />)
      expect(input).toHaveValue('updated')
    })

    it('works as uncontrolled component', () => {
      render(<Input {...defaultProps} defaultValue="test" />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('test')

      fireEvent.input(input, { target: { value: 'updated' } })
      expect(input).toHaveValue('updated')
    })
  })

  describe('Validation', () => {
    it('validates required rule', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }]
      render(<Input {...defaultProps} rules={rules} validateTrigger="onChange" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'test' } })

      await waitFor(() => {
        expect(screen.queryByText('此字段为必填项')).not.toBeInTheDocument()
      })
    })

    it('validates pattern rule', async () => {
      const rules = [{ pattern: /^[A-Za-z]+$/, message: '只能输入字母' }]
      render(<Input placeholder="请输入内容" rules={rules} validateTrigger="onChange" value="" onChange={vi.fn()} />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: '123' } })

      await waitFor(() => {
        expect(screen.getByText('只能输入字母')).toBeInTheDocument()
      })
    })

    it('validates length rule', async () => {
      render(<Input {...defaultProps} minLength={3} maxLength={10} validateTrigger="onChange" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'ab' } })

      await waitFor(() => {
        expect(screen.getByText('最少需要3个字符')).toBeInTheDocument()
      })
    })

    it('validates custom validator', async () => {
      const validator = vi.fn().mockResolvedValue('自定义验证失败')
      render(<Input {...defaultProps} validator={validator} validateTrigger="onChange" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'test' } })

      await waitFor(() => {
        expect(screen.getByText('自定义验证失败')).toBeInTheDocument()
      })
    })

    it('validates on blur', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }]
      render(<Input {...defaultProps} rules={rules} validateTrigger="onBlur" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.blur(input)

      await waitFor(() => {
        expect(screen.getByText('此字段为必填项')).toBeInTheDocument()
      })
    })

    it('validates on submit', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }]
      render(<Input {...defaultProps} rules={rules} validateTrigger="onSubmit" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.keyDown(input, { key: 'Enter' })

      await waitFor(() => {
        expect(screen.getByText('此字段为必填项')).toBeInTheDocument()
      })
    })
  })

  describe('Input Formatting', () => {
    it('formats number input', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" type="number" onChange={onChange} value="" />)

      // Find input by placeholder
      const input = screen.getByPlaceholderText('请输入内容')

      // Test that number input accepts numeric values
      fireEvent.input(input, { target: { value: '123' } })

      // The formatting should pass through valid numbers unchanged
      expect(onChange).toHaveBeenCalledWith('123', expect.any(Object))
    })

    it('formats phone input', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" type="tel" onChange={onChange} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: '138-1234-5678' } })

      expect(onChange).toHaveBeenCalledWith('13812345678', expect.any(Object))
    })

    it('formats idcard input', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" type="idcard" onChange={onChange} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: 'abc123xyz456' } })

      expect(onChange).toHaveBeenCalledWith('123x456', expect.any(Object))
    })

    it('respects maxLength', () => {
      const onChange = vi.fn()
      render(<Input placeholder="请输入内容" maxLength={5} onChange={onChange} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      fireEvent.input(input, { target: { value: '123456789' } })

      expect(onChange).toHaveBeenCalledWith('12345', expect.any(Object))
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<InputRef>()
      render(<Input {...defaultProps} ref={ref} />)

      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.getValue).toBe('function')
      expect(typeof ref.current.setValue).toBe('function')
      expect(typeof ref.current.focus).toBe('function')
      expect(typeof ref.current.blur).toBe('function')
      expect(typeof ref.current.validate).toBe('function')
      expect(typeof ref.current.clear).toBe('function')
    })

    it('can get and set value via ref', async () => {
      const ref = React.createRef<InputRef>()
      // Use uncontrolled mode (no value prop, no onChange prop)
      render(<Input placeholder="请输入内容" ref={ref} />)

      // Check initial value
      expect(ref.current?.getValue()).toBe('')

      ref.current?.setValue('test')

      // Wait for state update to complete
      await waitFor(() => {
        expect(ref.current?.getValue()).toBe('test')
      })
    })

    it('can focus and blur via ref', () => {
      const ref = React.createRef<InputRef>()
      render(<Input {...defaultProps} ref={ref} />)

      ref.current?.focus()
      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveFocus()

      ref.current?.blur()
      expect(input).not.toHaveFocus()
    })

    it('can validate via ref', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }]
      const ref = React.createRef<InputRef>()
      render(<Input {...defaultProps} ref={ref} rules={rules} />)

      const result = await ref.current?.validate()
      expect(result?.valid).toBe(false)
      expect(result?.message).toBe('此字段为必填项')
    })

    it('can clear via ref', async () => {
      const ref = React.createRef<InputRef>()
      // Use uncontrolled mode (defaultValue instead of value, no onChange prop)
      render(<Input placeholder="请输入内容" ref={ref} defaultValue="test" />)

      expect(ref.current?.getValue()).toBe('test')
      ref.current?.clear()

      // Wait for state update to complete
      await waitFor(() => {
        expect(ref.current?.getValue()).toBe('')
      })
    })

    it('can reset via ref', () => {
      const ref = React.createRef<InputRef>()
      render(<Input {...defaultProps} ref={ref} defaultValue="test" />)

      ref.current?.setValue('updated')
      ref.current?.reset()
      expect(ref.current?.getValue()).toBe('test')
    })
  })

  
  describe('Edge Cases', () => {
    it('handles empty value', () => {
      render(<Input {...defaultProps} value="" />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('')
    })

    it('handles null value', () => {
      render(<Input {...defaultProps} value={null as any} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('')
    })

    it('handles undefined value', () => {
      render(<Input {...defaultProps} value={undefined} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('')
    })

    it('handles numeric value', () => {
      render(<Input {...defaultProps} value={123} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue('123')
    })

    it('handles very long text', () => {
      const longText = 'a'.repeat(1000)
      render(<Input {...defaultProps} value={longText} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue(longText)
    })

    it('handles special characters', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      render(<Input {...defaultProps} value={specialText} />)

      const input = screen.getByPlaceholderText('请输入内容')
      expect(input).toHaveValue(specialText)
    })
  })
})
