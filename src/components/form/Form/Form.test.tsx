import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Form } from '../Form'
import type { FormProps, FormRef, FormRule } from '../Form.types'

// Mock styles
vi.mock('../Form.styles', () => ({
  formStyles: {
    getStyle: (props: any) => ({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      fontSize: '28px',
      boxSizing: 'border-box',
      width: '100%',
      ...props.style
    }),
    getClassName: () => 'taro-uno-form taro-uno-form--horizontal taro-uno-form--md',
    getFormStyle: () => ({}),
    getFormItemStyle: () => ({}),
    getLabelStyle: () => ({}),
    getErrorStyle: () => ({})
  }
}))

describe('Form Component', () => {
  it('should render form with basic props', () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)

    const formElement = screen.getByRole('form')
    expect(formElement).toBeInTheDocument()
  })

  it('should render form with children', () => {
    const onSubmit = vi.fn()
    render(
      <Form onSubmit={onSubmit}>
        <div>Child content</div>
      </Form>
    )

    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('should call onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)

    const formElement = screen.getByRole('form')
    await act(async () => {
      fireEvent.submit(formElement)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should handle form reset', async () => {
    const onReset = vi.fn()
    render(<Form onReset={onReset} />)

    const formElement = screen.getByRole('form')
    await act(async () => {
      fireEvent.reset(formElement)
    })

    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('should support ref methods', async () => {
    const formRef = React.createRef<FormRef>()
    render(<Form ref={formRef} />)

    await act(async () => {
      formRef.current?.setValues({ username: 'testuser' })
    })

    expect(formRef.current?.getValues()).toEqual(expect.objectContaining({
      username: 'testuser'
    }))
  })

  it('should handle form with custom className', () => {
    const onSubmit = vi.fn()
    const { container } = render(<Form onSubmit={onSubmit} className="custom-form" />)

    const formElement = container.firstChild
    expect(formElement).toHaveClass('custom-form')
  })

  it('should handle form with custom style', () => {
    const onSubmit = vi.fn()
    const customStyle = { backgroundColor: '#f0f0f0' }
    const { container } = render(<Form onSubmit={onSubmit} style={customStyle} />)

    const formElement = container.firstChild
    expect((formElement as HTMLElement).style.backgroundColor).toBe('rgb(240, 240, 240)')
  })

  it('should support aria attributes', () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} aria-label="User Form" />)

    expect(screen.getByRole('form')).toHaveAttribute('aria-label', 'User Form')
  })

  it('should handle form with no submit handler', () => {
    render(<Form />)

    const formElement = screen.getByRole('form')
    expect(formElement).toBeInTheDocument()
  })

  it('should handle multiple submissions', async () => {
    const onSubmit = vi.fn()
    render(<Form onSubmit={onSubmit} />)

    const formElement = screen.getByRole('form')
    await act(async () => {
      fireEvent.submit(formElement)
      fireEvent.submit(formElement)
    })

    expect(onSubmit).toHaveBeenCalledTimes(2)
  })
})
