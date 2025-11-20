import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Card } from './Card'

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  View: ({ children, ...props }) => {
    const { className, style, id, role, hidden, onClick, ...rest } = props as any
    const allowed: Record<string, any> = { className, style, id, role, hidden, onClick }
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('aria-') || key.startsWith('data-')) {
        allowed[key] = rest[key]
      }
    })
    return <div {...allowed}>{children}</div>
  },
}))

// Mock @/utils
vi.mock('@/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
  PlatformDetector: {
    getPlatform: () => 'h5',
  },
}))

describe('Card Component', () => {
  const mockOnPress = vi.fn()

  beforeEach(() => {
    mockOnPress.mockClear()
  })

  test('renders basic card', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  test('renders card with title', () => {
    render(<Card title="Card Title">Content</Card>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  test('renders card with title and subtitle', () => {
    render(
      <Card title="Card Title" subtitle="Card Subtitle">
        Content
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  test('renders card with extra content', () => {
    render(
      <Card title="Card Title" extra={<button>Extra</button>}>
        Content
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Extra' })).toBeInTheDocument()
  })

  test('renders card with cover', () => {
    render(
      <Card cover={<div data-testid="cover">Cover</div>}>
        Content
      </Card>
    )
    expect(screen.getByTestId('cover')).toBeInTheDocument()
  })

  test('renders card with actions', () => {
    const actions = [
      <button key="1">Action 1</button>,
      <button key="2">Action 2</button>
    ]
    render(
      <Card actions={actions}>
        Content
      </Card>
    )
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  test('handles press event when hoverable', () => {
    render(
      <Card hoverable onPress={mockOnPress}>
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  test('does not handle press event when not hoverable', () => {
    render(
      <Card onPress={mockOnPress}>
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    expect(mockOnPress).not.toHaveBeenCalled()
  })

  test('shows loading state', () => {
    render(<Card loading>Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('opacity-70')
    expect(card).toHaveClass('pointer-events-none')
    expect(card).toHaveClass('taro-uno-h5-card--loading')
    expect(screen.getByTestId('card-loading-content')).toBeInTheDocument()
  })

  test('applies border when bordered', () => {
    render(<Card bordered>Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('taro-uno-h5-card--bordered')
    expect(card).toHaveAttribute('data-bordered', 'true')
  })

  test('does not apply border when not bordered', () => {
    render(<Card bordered={false}>Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).not.toHaveClass('taro-uno-h5-card--bordered')
    expect(card).toHaveAttribute('data-bordered', 'false')
  })

  test('applies shadow based on shadow prop', () => {
    const { rerender } = render(<Card shadow="none">Content</Card>)
    let card = screen.getByTestId('card')
    expect(card).not.toHaveClass('taro-uno-h5-card--shadow-small')
    expect(card).not.toHaveClass('taro-uno-h5-card--shadow-default')
    expect(card).not.toHaveClass('taro-uno-h5-card--shadow-large')
    expect(card).toHaveAttribute('data-shadow', 'none')

    rerender(<Card shadow="small">Content</Card>)
    card = screen.getByTestId('card')
    expect(card).toHaveClass('taro-uno-h5-card--shadow-small')
    expect(card).toHaveAttribute('data-shadow', 'small')

    rerender(<Card shadow="default">Content</Card>)
    card = screen.getByTestId('card')
    expect(card).toHaveClass('taro-uno-h5-card--shadow-default')
    expect(card).toHaveAttribute('data-shadow', 'default')

    rerender(<Card shadow="large">Content</Card>)
    card = screen.getByTestId('card')
    expect(card).toHaveClass('taro-uno-h5-card--shadow-large')
    expect(card).toHaveAttribute('data-shadow', 'large')
  })

  test('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  test('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    render(<Card style={customStyle}>Content</Card>)
    const card = screen.getByTestId('card')
    const styleAttr = card.getAttribute('style')
    expect(styleAttr).toContain('background-color: red')
  })

  test('forwards ref correctly', () => {
    const ref = React.createRef<any>()
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeTruthy()
    expect(ref.current.getElement).toBeTruthy()
    expect(screen.getByTestId('card')).toBe(ref.current.getElement())
  })
})
