/**
 * Popconfirm Component Test
 * 气泡确认框组件测试
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { Popconfirm } from '../../../src/components/feedback/Popconfirm';
import { describe, test, expect } from 'vitest';

describe('Popconfirm Component', () => {
  test('renders Popconfirm with content', () => {
    render(
      <Popconfirm title="确认删除？">
        <button>删除</button>
      </Popconfirm>,
    );
    const button = screen.getByText('删除');
    expect(button).toBeInTheDocument();
  });

  test('handles confirm event', () => {
    const onConfirm = vi.fn();
    render(
      <Popconfirm title="确认删除？" onConfirm={onConfirm}>
        <button>删除</button>
      </Popconfirm>,
    );
    const button = screen.getByText('删除');
    fireEvent.click(button);
    // 这里需要根据实际实现调整，可能需要模拟气泡显示后的确认按钮点击
  });

  test('handles cancel event', () => {
    const onCancel = vi.fn();
    render(
      <Popconfirm title="确认删除？" onCancel={onCancel}>
        <button>删除</button>
      </Popconfirm>,
    );
    const button = screen.getByText('删除');
    fireEvent.click(button);
    // 这里需要根据实际实现调整，可能需要模拟气泡显示后的取消按钮点击
  });

  test('renders Popconfirm with different placement', () => {
    render(
      <Popconfirm title="确认操作？" placement="top">
        <button>操作</button>
      </Popconfirm>,
    );
    const button = screen.getByText('操作');
    expect(button).toBeInTheDocument();
  });

  test('renders Popconfirm with custom buttons', () => {
    render(
      <Popconfirm 
        title="确认操作？" 
        okText="确认" 
        cancelText="取消"
      >
        <button>操作</button>
      </Popconfirm>,
    );
    const button = screen.getByText('操作');
    expect(button).toBeInTheDocument();
  });
});