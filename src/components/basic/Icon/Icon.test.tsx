import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Icon from './index'

describe('Icon组件', () => {
  test('渲染基础图标', () => {
    render(<Icon name='check' data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('uno-icon')
    expect(icon).toHaveClass('uno-icon-check')
  })

  test('不同尺寸的图标', () => {
    const { rerender } = render(<Icon name='check' size='xs' data-testid='icon' />)

    let icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 12px')
    expect(icon).toHaveStyle('height: 12px')

    rerender(<Icon name='check' size='sm' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 14px')
    expect(icon).toHaveStyle('height: 14px')

    rerender(<Icon name='check' size='md' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 16px')
    expect(icon).toHaveStyle('height: 16px')

    rerender(<Icon name='check' size='lg' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 20px')
    expect(icon).toHaveStyle('height: 20px')

    rerender(<Icon name='check' size='xl' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 24px')
    expect(icon).toHaveStyle('height: 24px')

    rerender(<Icon name='check' size={32} data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('width: 32px')
    expect(icon).toHaveStyle('height: 32px')
  })

  test('自定义颜色', () => {
    render(<Icon name='check' color='#ff0000' data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('color: #ff0000')
  })

  test('旋转图标', () => {
    const { rerender } = render(<Icon name='loading' spin data-testid='icon' />)

    let icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('uno-icon-spin')
    expect(icon).toHaveStyle('animation: uno-icon-spin 1s linear infinite')

    rerender(<Icon name='loading' spin spinSpeed={2} data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('animation: uno-icon-spin 2s linear infinite')
  })

  test('翻转图标', () => {
    const { rerender } = render(<Icon name='arrow-right' flip='horizontal' data-testid='icon' />)

    let icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('uno-icon-flip-horizontal')
    expect(icon.style.transform).toContain('scaleX(-1)')

    rerender(<Icon name='arrow-right' flip='vertical' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('uno-icon-flip-vertical')
    expect(icon.style.transform).toContain('scaleY(-1)')

    rerender(<Icon name='arrow-right' flip='both' data-testid='icon' />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('uno-icon-flip-both')
    expect(icon.style.transform).toContain('scaleX(-1)')
    expect(icon.style.transform).toContain('scaleY(-1)')
  })

  test('点击事件', () => {
    const handleClick = jest.fn()
    render(<Icon name='check' onClick={handleClick} data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    fireEvent.click(icon)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('禁用状态', () => {
    const handleClick = jest.fn()
    render(<Icon name='check' disabled onClick={handleClick} data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('uno-icon-disabled')

    fireEvent.click(icon)
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('自定义类名和样式', () => {
    render(
      <Icon name='check' className='custom-icon' style={{ margin: '10px' }} data-testid='icon' />
    )

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('custom-icon')
    expect(icon).toHaveStyle('margin: 10px')
  })

  test('无障碍属性', () => {
    render(
      <Icon name='check' ariaLabel='确认图标' ariaHidden={false} role='button' data-testid='icon' />
    )

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveAttribute('aria-label', '确认图标')
    expect(icon).toHaveAttribute('aria-hidden', 'false')
    expect(icon).toHaveAttribute('role', 'button')
  })

  test('默认无障碍属性', () => {
    render(<Icon name='check' data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    expect(icon).toHaveAttribute('aria-label', 'check')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('role', 'img')
  })

  test('自定义SVG内容', () => {
    const customSvg = (
      <svg data-testid='custom-svg'>
        <circle cx='12' cy='12' r='10' />
      </svg>
    )
    render(<Icon customSvg={customSvg} data-testid='icon' />)

    const icon = screen.getByTestId('icon')
    const svg = screen.getByTestId('custom-svg')
    expect(icon).toContainElement(svg)
  })

  test('渲染不同类型的基础图标', () => {
    const iconNames = [
      'loading',
      'check',
      'close',
      'arrow-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'info',
      'warning',
      'success',
      'error',
      'plus',
      'minus',
      'edit',
      'delete',
    ]

    iconNames.forEach(name => {
      const { unmount } = render(<Icon name={name} data-testid={`icon-${name}`} />)

      const icon = screen.getByTestId(`icon-${name}`)
      expect(icon).toHaveClass(`uno-icon-${name}`)

      unmount()
    })
  })
}) 