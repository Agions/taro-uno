import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Avatar from './index'

describe('Avatar 组件', () => {
  // 基础渲染测试
  it('应该正确渲染基础Avatar组件', () => {
    render(<Avatar />)
    const avatar = document.querySelector('.uno-avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('uno-avatar--size-md')
    expect(avatar).toHaveClass('uno-avatar--shape-circle')
  })

  // 测试不同尺寸
  it('应该正确应用预设尺寸类名', () => {
    const { rerender } = render(<Avatar size='xs' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--size-xs')

    rerender(<Avatar size='sm' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--size-sm')

    rerender(<Avatar size='md' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--size-md')

    rerender(<Avatar size='lg' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--size-lg')

    rerender(<Avatar size='xl' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--size-xl')
  })

  // 测试自定义尺寸
  it('应该正确应用自定义尺寸', () => {
    render(<Avatar size={50} />)
    const avatar = document.querySelector('.uno-avatar')
    expect(avatar).toHaveStyle({
      width: '50px',
      height: '50px',
    })
    expect(avatar).not.toHaveClass('uno-avatar--size-md')
  })

  // 测试形状
  it('应该正确应用不同形状', () => {
    const { rerender } = render(<Avatar shape='circle' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--shape-circle')

    rerender(<Avatar shape='square' />)
    expect(document.querySelector('.uno-avatar')).toHaveClass('uno-avatar--shape-square')
  })

  // 测试图片显示
  it('应该正确显示图片', () => {
    render(<Avatar src='https://example.com/avatar.png' />)
    const avatar = document.querySelector('.uno-avatar')
    expect(avatar).toHaveClass('uno-avatar--has-image')

    const img = document.querySelector('.uno-avatar__image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  // 测试图片加载失败回调
  it('应该在图片加载失败时调用onError', () => {
    const handleError = jest.fn()
    render(<Avatar src='invalid-url.png' onError={handleError} />)

    const img = document.querySelector('.uno-avatar__image')
    if (img) {
      fireEvent.error(img)
    }

    expect(handleError).toHaveBeenCalled()
  })

  // 测试显示文字
  it('应该正确显示文本内容', () => {
    render(<Avatar>AB</Avatar>)
    const textElement = document.querySelector('.uno-avatar__text')
    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveTextContent('AB')
  })

  // 测试点击事件
  it('应该正确处理点击事件', () => {
    const handleClick = jest.fn()
    render(<Avatar onClick={handleClick} />)

    const avatar = document.querySelector('.uno-avatar')
    expect(avatar).toHaveClass('uno-avatar--clickable')

    if (avatar) {
      fireEvent.click(avatar)
    }

    expect(handleClick).toHaveBeenCalled()
  })

  // 测试传递自定义样式和类名
  it('应该应用自定义样式和类名', () => {
    render(<Avatar className='custom-class' style={{ backgroundColor: 'red' }} />)
    const avatar = document.querySelector('.uno-avatar')
    expect(avatar).toHaveClass('custom-class')
    expect(avatar).toHaveStyle({ backgroundColor: 'red' })
  })
})

describe('AvatarGroup 组件', () => {
  // 基础渲染测试
  it('应该正确渲染AvatarGroup组件', () => {
    render(
      <Avatar.Group>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </Avatar.Group>
    )

    const avatarGroup = document.querySelector('.uno-avatar-group')
    expect(avatarGroup).toBeInTheDocument()

    const avatars = document.querySelectorAll('.uno-avatar')
    expect(avatars.length).toBe(2)
  })

  // 测试maxCount属性
  it('应该正确限制显示的Avatar数量并显示额外数量', () => {
    render(
      <Avatar.Group maxCount={2}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <Avatar>D</Avatar>
      </Avatar.Group>
    )

    const avatars = document.querySelectorAll('.uno-avatar')
    expect(avatars.length).toBe(3) // 2个显示的 + 1个显示额外数量的

    const extraAvatar = document.querySelector('.uno-avatar-group__extra')
    expect(extraAvatar).toBeInTheDocument()
    expect(extraAvatar).toHaveTextContent('+2') // 4 - 2 = 2
  })

  // 测试传递size和shape到子Avatar
  it('应该将size和shape传递给子Avatar组件', () => {
    render(
      <Avatar.Group size='lg' shape='square'>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </Avatar.Group>
    )

    const avatars = document.querySelectorAll('.uno-avatar')
    avatars.forEach(avatar => {
      expect(avatar).toHaveClass('uno-avatar--size-lg')
      expect(avatar).toHaveClass('uno-avatar--shape-square')
    })
  })

  // 测试子Avatar覆盖父级属性
  it('应该允许子Avatar覆盖父AvatarGroup的属性', () => {
    render(
      <Avatar.Group size='lg' shape='square'>
        <Avatar size='sm' shape='circle'>
          A
        </Avatar>
        <Avatar>B</Avatar>
      </Avatar.Group>
    )

    const avatars = document.querySelectorAll('.uno-avatar')
    expect(avatars[0]).toHaveClass('uno-avatar--size-sm')
    expect(avatars[0]).toHaveClass('uno-avatar--shape-circle')

    expect(avatars[1]).toHaveClass('uno-avatar--size-lg')
    expect(avatars[1]).toHaveClass('uno-avatar--shape-square')
  })

  // 测试自定义样式
  it('应该应用自定义样式和类名到AvatarGroup', () => {
    render(
      <Avatar.Group className='custom-group' style={{ gap: '10px' }}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
      </Avatar.Group>
    )

    const avatarGroup = document.querySelector('.uno-avatar-group')
    expect(avatarGroup).toHaveClass('custom-group')
    expect(avatarGroup).toHaveStyle({ gap: '10px' })
  })
})
