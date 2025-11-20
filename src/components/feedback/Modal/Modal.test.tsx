import { render, screen } from '@testing-library/react'
import React from 'react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders with title and content', () => {
    render(<Modal visible title="标题">内容</Modal>)
    expect(screen.getByText('标题')).toBeInTheDocument()
    expect(screen.getByText('内容')).toBeInTheDocument()
  })
})
