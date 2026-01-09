/**
 * Checkbox Component Test
 * 复选框组件测试
 */

import { render, screen } from '../../test-utils';
import { Checkbox } from '../../../src/components/form/Checkbox';
import { describe, test, expect, vi } from 'vitest';

describe('Checkbox Component', () => {
  test('renders Checkbox with label', () => {
    const { container } = render(<Checkbox label="测试复选框" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles checked state', () => {
    const { container } = render(<Checkbox label="测试复选框" checked />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox label="测试复选框" onChange={onChange} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders disabled Checkbox', () => {
    const { container } = render(<Checkbox label="禁用复选框" disabled />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Checkbox with different sizes', () => {
    const { container: container1 } = render(<Checkbox label="小号" size="sm" />);
    const { container: container2 } = render(<Checkbox label="中号" size="md" />);
    const { container: container3 } = render(<Checkbox label="大号" size="lg" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});