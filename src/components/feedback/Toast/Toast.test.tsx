import { render, screen } from '@testing-library/react'
import React from 'react'
import { Toast } from './Toast'

describe('Toast', () => {
  it('shows message when visible', () => {
    render(<Toast visible message="提示信息" />)
    expect(screen.getByText('提示信息')).toBeInTheDocument()
  })
})
