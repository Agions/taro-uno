import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import Calendar from './Calendar'
import { ThemeProvider } from '../../common/ThemeProvider'

describe('Calendar Component', () => {
  it('renders calendar', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Calendar />
      </ThemeProvider>
    )
    expect(screen.getByText(/年/)).toBeInTheDocument()
  })

  it('renders with ariaLabel and role', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Calendar ariaLabel="Test calendar" role="navigation" data-testid="calendar" />
      </ThemeProvider>
    )
    const calendar = screen.getByTestId('calendar')
    expect(calendar).toHaveAttribute('aria-label', 'Test calendar')
    expect(calendar).toHaveAttribute('role', 'navigation')
  })

  it('handles date selection when date is clicked', () => {
    const onSelect = vi.fn()
    render(
      <ThemeProvider defaultTheme="light">
        <Calendar onSelect={onSelect} />
      </ThemeProvider>
    )
    // Click on the first date cell
    const dateCells = screen.getAllByText(/^\d+$/)
    if (dateCells.length > 0) {
      dateCells[0].click()
      expect(onSelect).toHaveBeenCalled()
    }
  })
})