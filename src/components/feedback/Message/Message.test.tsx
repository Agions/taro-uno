/**
 * Message 组件测试
 * 测试消息提示组件的各种功能
 */

import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Message } from './Message';

describe('Message Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('基础渲染', () => {
    it('应该正确渲染消息内容', () => {
      render(<Message content="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('应该渲染标题和内容', () => {
      render(
        <Message
          title="Success"
          content="Operation completed successfully"
          type="success"
        />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    });

    it('应该支持空内容', () => {
      render(<Message content="" />);
      const message = screen.getByTestId('message-component');
      expect(message).toBeInTheDocument();
    });
  });

  describe('消息类型', () => {
    it('应该渲染成功类型的消息', () => {
      const { container } = render(
        <Message content="Success message" type="success" />
      );
      expect(container.firstChild).toHaveClass('message-success');
    });

    it('应该渲染错误类型的消息', () => {
      const { container } = render(
        <Message content="Error message" type="error" />
      );
      expect(container.firstChild).toHaveClass('message-error');
    });

    it('应该渲染警告类型的消息', () => {
      const { container } = render(
        <Message content="Warning message" type="warning" />
      );
      expect(container.firstChild).toHaveClass('message-warning');
    });

    it('应该渲染信息类型的消息', () => {
      const { container } = render(
        <Message content="Info message" type="info" />
      );
      expect(container.firstChild).toHaveClass('message-info');
    });
  });

  describe('自动关闭功能', () => {
    it('应该在指定时间后自动关闭', () => {
      render(
        <Message
          content="Auto-close message"
          duration={3000}
          onClose={mockOnClose}
        />
      );

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('不应该自动关闭当duration为0', () => {
      render(
        <Message
          content="Persistent message"
          duration={0}
          onClose={mockOnClose}
        />
      );

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('关闭功能', () => {
    it('应该支持手动关闭', () => {
      render(
        <Message
          content="Closable message"
          closable
          onClose={mockOnClose}
        />
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('不应该显示关闭按钮当closable为false', () => {
      render(
        <Message
          content="Non-closable message"
          closable={false}
        />
      );

      const closeButton = screen.queryByRole('button', { name: /close/i });
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('图标功能', () => {
    it('应该显示默认图标', () => {
      render(
        <Message
          content="Message with icon"
          type="success"
        />
      );

      const icon = screen.getByTestId('message-icon');
      expect(icon).toBeInTheDocument();
    });

    it('应该支持自定义图标', () => {
      render(
        <Message
          content="Message with custom icon"
          icon="🎉"
        />
      );

      expect(screen.getByText('🎉')).toBeInTheDocument();
    });
  });

  describe('Ref API', () => {
    it('应该暴露正确的ref方法', () => {
      const ref = React.createRef<any>();
      render(
        <Message
          content="Test message"
          ref={ref}
          onClose={mockOnClose}
        />
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.hide).toBe('function');
      expect(typeof ref.current.show).toBe('function');
      expect(typeof ref.current.update).toBe('function');
    });

    it('应该通过ref隐藏消息', () => {
      const ref = React.createRef<any>();
      render(
        <Message
          content="Test message"
          ref={ref}
          onClose={mockOnClose}
        />
      );

      act(() => {
        ref.current.hide();
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('无障碍性', () => {
    it('应该有正确的ARIA角色', () => {
      render(<Message content="Test message" type="info" />);
      const message = screen.getByTestId('message-component');
      expect(message).toHaveAttribute('role', 'alert');
    });
  });

  describe('边缘情况', () => {
    it('应该处理极长的消息内容', () => {
      const longMessage = 'A'.repeat(1000);
      render(<Message content={longMessage} />);
      expect(screen.getByText(/A+/)).toBeInTheDocument();
    });

    it('应该处理特殊字符', () => {
      render(<Message content="Special: @#$%^&*()" />);
      expect(screen.getByText('Special: @#$%^&*()')).toBeInTheDocument();
    });
  });

  describe('类型安全', () => {
    it('应该接受正确的props类型', () => {
      const props = {
        type: 'success' as const,
        content: 'Typed message',
        duration: 5000,
        closable: true,
        onClose: mockOnClose,
      };

      expect(() => render(<Message {...props} />)).not.toThrow();
    });
  });
});
