import { render, screen } from '@testing-library/react'
import React from 'react'
import { Affix } from './Affix'

describe('Affix', () => {
  it('renders children', () => {
    render(<Affix><div>固定内容</div></Affix>)
    expect(screen.getByText('固定内容')).toBeInTheDocument()
  })
})
