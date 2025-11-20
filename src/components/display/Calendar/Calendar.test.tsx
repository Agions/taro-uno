import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import Calendar from './Calendar'

describe('Calendar Component', () => {
  it('renders calendar', () => {
    render(<Calendar />)
    expect(screen.getByText(/年/)).toBeInTheDocument()
  })

  it('renders with ariaLabel', () => {
    render(<Calendar ariaLabel="Test calendar" />)
    const calendar = screen.getByRole('grid')
    expect(calendar).toHaveAttribute('aria-label', 'Test calendar') // failing
  })

  it('renders with role', () => {
    render(<Calendar role="navigation" />)
    const calendar = screen.getByRole('navigation')
    expect(calendar).toBeInTheDocument() // failing
  })

  it('handles date selection', () => {
    const onSelect = vi.fn()
    render(<Calendar onSelect={onSelect} />)
    // Simulate click on date - failing until implemented
    expect(onSelect).toHaveBeenCalled() // failing
  })
})