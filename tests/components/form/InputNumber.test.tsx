/**
 * InputNumber Component Test
 * 数字输入框组件测试
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { InputNumber } from '../../../src/components/form/InputNumber';
import { describe, test, expect } from 'vitest';

describe('InputNumber Component', () => {
  test('renders InputNumber with default value', () => {
    const { container } = render(<InputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  test('renders InputNumber with initial value', () => {
    const { container } = render(<InputNumber value={10} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('10');
  });

  test('handles value change', () => {
    const onChange = vi.fn();
    const { container } = render(<InputNumber onChange={onChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('handles min and max constraints', () => {
    const onChange = vi.fn();
    const { container } = render(<InputNumber min={0} max={100} onChange={onChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '150' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('renders disabled InputNumber', () => {
    const { container } = render(<InputNumber disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});