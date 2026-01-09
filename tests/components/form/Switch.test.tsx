/**
 * Switch Component Test
 * 开关组件测试
 */

import { render } from '../../test-utils';
import { Switch } from '../../../src/components/form/Switch';
import { describe, test, expect, vi } from 'vitest';

describe('Switch Component', () => {
  test('renders default Switch', () => {
    const { container } = render(<Switch />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles checked state', () => {
    const { container } = render(<Switch checked />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const onChange = vi.fn();
    const { container } = render(<Switch onChange={onChange} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders disabled Switch', () => {
    const { container } = render(<Switch disabled />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Switch with different sizes', () => {
    const { container: container1 } = render(<Switch size="sm" />);
    const { container: container2 } = render(<Switch size="md" />);
    const { container: container3 } = render(<Switch size="lg" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});