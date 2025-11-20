import { render, screen } from '@testing-library/react'
import React from 'react'
import { Layout } from './Layout'

describe('Layout', () => {
  it('renders children', () => {
    render(<Layout><div>内容区域</div></Layout>)
    expect(screen.getByText('内容区域')).toBeInTheDocument()
  })
})
