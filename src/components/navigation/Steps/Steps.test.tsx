import { render, screen } from '@testing-library/react'
import React from 'react'
import { Steps } from './Steps'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('Steps', () => {
  it('renders step items', () => {
    render(<Steps current={1} items={[{ title: '步骤一' }, { title: '步骤二' }, { title: '步骤三' }]} />)
    expect(screen.getByText('步骤一')).toBeInTheDocument()
    expect(screen.getByText('步骤二')).toBeInTheDocument()
    expect(screen.getByText('步骤三')).toBeInTheDocument()
  })
})
