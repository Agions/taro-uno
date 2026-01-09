/**
 * Loading Component Test
 * 加载组件测试
 */

import { render } from '@testing-library/react';
import { Loading } from '../../../src/components/feedback/Loading';
import { describe, test, expect } from 'vitest';

describe('Loading Component', () => {
  test('renders default Loading', () => {
    const { container } = render(<Loading />);
    const loading = container.firstChild;
    expect(loading).toBeInTheDocument();
  });

  test('renders Loading with text', () => {
    const { container, getByText } = render(<Loading text="加载中" />);
    const text = getByText('加载中');
    expect(text).toBeInTheDocument();
  });

  test('renders Loading with different types', () => {
    const { container: container1 } = render(<Loading type="spinner" />);
    const { container: container2 } = render(<Loading type="circle" />);
    const { container: container3 } = render(<Loading type="ring" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Loading with different sizes', () => {
    const { container: container1 } = render(<Loading size="sm" />);
    const { container: container2 } = render(<Loading size="md" />);
    const { container: container3 } = render(<Loading size="lg" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Loading with different colors', () => {
    const { container } = render(<Loading color="#ff0000" />);
    const loading = container.firstChild;
    expect(loading).toBeInTheDocument();
  });
});