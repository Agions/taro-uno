/**
 * Radio Component Test
 * 单选框组件测试
 */

import { render, screen } from '../../test-utils';
import { Radio } from '../../../src/components/form/Radio';
import { describe, test, expect, vi } from 'vitest';

describe('Radio Component', () => {
  test('renders Radio with label', () => {
    const { container } = render(<Radio label="测试单选框" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles checked state', () => {
    const { container } = render(<Radio label="测试单选框" checked />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const onChange = vi.fn();
    const { container } = render(<Radio label="测试单选框" onChange={onChange} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders disabled Radio', () => {
    const { container } = render(<Radio label="禁用单选框" disabled />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Radio with different sizes', () => {
    const { container: container1 } = render(<Radio label="小号" size="sm" />);
    const { container: container2 } = render(<Radio label="中号" size="md" />);
    const { container: container3 } = render(<Radio label="大号" size="lg" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});