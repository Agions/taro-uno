import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from './Card'

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
    const card = screen.getByText('Content').closest('div')
    fireEvent.click(card!)
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  test('does not handle press event when not hoverable', () => {
    render(
      <Card onPress={mockOnPress}>
        Content
      </Card>
    )
    const card = screen.getByText('Content').closest('div')
    fireEvent.click(card!)
    expect(mockOnPress).not.toHaveBeenCalled()
  })

  test('shows loading state', () => {
    render(<Card loading>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('opacity-70')
    expect(card).toHaveClass('pointer-events-none')
  })

  test('applies border when bordered', () => {
    render(<Card bordered>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('border')
  })

  test('does not apply border when not bordered', () => {
    render(<Card bordered={false}>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).not.toHaveClass('border')
  })

  test('applies shadow based on shadow prop', () => {
    const { rerender } = render(<Card shadow="none">Content</Card>)
    let card = screen.getByText('Content').closest('div')
    expect(card).not.toHaveClass('shadow-sm')
    expect(card).not.toHaveClass('shadow-md')
    expect(card).not.toHaveClass('shadow-lg')

    rerender(<Card shadow="small">Content</Card>)
    card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('shadow-sm')

    rerender(<Card shadow="default">Content</Card>)
    card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('shadow-md')

    rerender(<Card shadow="large">Content</Card>)
    card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('shadow-lg')
  })

  test('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('custom-class')
  })

  test('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    render(<Card style={customStyle}>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).toHaveStyle({ backgroundColor: 'red' })
  })

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInTheDocument()
  })
})
