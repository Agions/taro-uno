/**
 * Icon Component Test
 * 图标组件测试
 */

import { render } from '@testing-library/react';
import { Icon } from '../../../src/components/basic/Icon';
import { describe, test, expect } from 'vitest';

describe('Icon Component', () => {
  test('renders Icon with name', () => {
    const { container } = render(<Icon name="star" />);
    const icon = container.firstChild;
    expect(icon).toBeInTheDocument();
  });

  test('renders Icon with different sizes', () => {
    const { container: container1 } = render(<Icon name="star" size="sm" />);
    const { container: container2 } = render(<Icon name="star" size="md" />);
    const { container: container3 } = render(<Icon name="star" size="lg" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Icon with different colors', () => {
    const { container } = render(<Icon name="star" color="#ff0000" />);
    const icon = container.firstChild;
    expect(icon).toBeInTheDocument();
  });

  test('renders Icon with different types', () => {
    const { container: container1 } = render(<Icon name="star" type="filled" />);
    const { container: container2 } = render(<Icon name="star" type="outlined" />);
    const { container: container3 } = render(<Icon name="star" type="two-tone" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});