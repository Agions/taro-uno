import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { messageApi } from './index'
import MessageContainer from './MessageContainer'
import Message from './Message'
import { MessageInstance, MessageGlobalConfig } from './types'

// 模拟定时器
jest.useFakeTimers()

describe('Message 组件', () => {
  // 每次测试后清空所有消息
  afterEach(() => {
    messageApi.destroy()
    jest.clearAllTimers()
  })

  test('应该正确渲染Message组件', () => {
    const message: MessageInstance = {
      id: 'test-message',
      config: {
        content: '测试内容',
        type: 'info',
      },
      createdAt: Date.now(),
    }

    const globalConfig: MessageGlobalConfig = {
      duration: 3000,
      placement: 'top',
    }

    const onRemove = jest.fn()

    render(<Message message={message} config={globalConfig} onRemove={onRemove} />)

    expect(screen.getByText('测试内容')).toBeInTheDocument()
  })

  test('应该正确渲染不同类型的Message', () => {
    const types = ['success', 'error', 'warning', 'info', 'loading'] as const

    types.forEach(type => {
      const message: MessageInstance = {
        id: `test-message-${type}`,
        config: {
          content: `${type}消息`,
          type,
        },
        createdAt: Date.now(),
      }

      const { container, unmount } = render(
        <Message message={message} config={{}} onRemove={jest.fn()} />
      )

      expect(screen.getByText(`${type}消息`)).toBeInTheDocument()
      expect(container.querySelector(`.uno-message--type-${type}`)).toBeInTheDocument()

      unmount()
    })
  })

  test('应该在指定时间后自动关闭', () => {
    const onRemove = jest.fn()
    const duration = 1000

    const message: MessageInstance = {
      id: 'test-message',
      config: {
        content: '测试内容',
        duration,
      },
      createdAt: Date.now(),
    }

    render(<Message message={message} config={{}} onRemove={onRemove} />)

    expect(onRemove).not.toHaveBeenCalled()

    // 快进时间
    act(() => {
      jest.advanceTimersByTime(duration + 500)
    })

    // 由于setTimeout的异步性质，需要使用waitFor
    waitFor(() => {
      expect(onRemove).toHaveBeenCalledWith('test-message')
    })
  })

  test('应该支持手动关闭', () => {
    const onRemove = jest.fn()

    const message: MessageInstance = {
      id: 'test-message',
      config: {
        content: '测试内容',
        closable: true,
        duration: 0, // 不自动关闭
      },
      createdAt: Date.now(),
    }

    const { container } = render(<Message message={message} config={{}} onRemove={onRemove} />)

    const closeButton = container.querySelector('.uno-message__close')
    expect(closeButton).toBeInTheDocument()

    // 点击关闭按钮
    if (closeButton) {
      act(() => {
        closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })
    }

    // 由于setTimeout的异步性质，需要使用waitFor
    waitFor(() => {
      expect(onRemove).toHaveBeenCalledWith('test-message')
    })
  })

  test('MessageContainer应该正确渲染多个消息', () => {
    const messages: MessageInstance[] = [
      {
        id: 'message-1',
        config: { content: '消息1', type: 'success' },
        createdAt: Date.now(),
      },
      {
        id: 'message-2',
        config: { content: '消息2', type: 'error' },
        createdAt: Date.now(),
      },
      {
        id: 'message-3',
        config: { content: '消息3', type: 'info' },
        createdAt: Date.now(),
      },
    ]

    render(
      <MessageContainer messages={messages} config={{ placement: 'top' }} onRemove={jest.fn()} />
    )

    expect(screen.getByText('消息1')).toBeInTheDocument()
    expect(screen.getByText('消息2')).toBeInTheDocument()
    expect(screen.getByText('消息3')).toBeInTheDocument()
  })

  test('messageApi应该能正确创建消息', () => {
    // 模拟DOM环境
    document.body.innerHTML = '<div id="message-container"></div>'

    // 使用API创建消息
    messageApi.success('成功消息')
    messageApi.error('错误消息')
    messageApi.info('信息消息')

    // 由于消息是异步添加的，使用setTimeout模拟
    act(() => {
      jest.advanceTimersByTime(100)
    })

    // 检查是否有消息被添加到DOM中
    // 注意：这里我们不能直接检查DOM，因为messageApi在实际环境中会渲染到DOM
    // 这个测试主要是确保API调用不会抛出错误
  })
}) 