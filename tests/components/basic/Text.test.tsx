/**
 * Text Component Test
 * 文本组件测试
 */

import { render, screen } from '../../test-utils';
import { Text } from '../../../src/components/basic/Text';
import { describe, test, expect } from 'vitest';

describe('Text Component', () => {
  test('renders Text with content', () => {
    render(<Text>测试文本</Text>);
    const text = screen.getByText('测试文本');
    expect(text).toBeInTheDocument();
  });

  test('renders Text with different sizes', () => {
    const { container: container1 } = render(<Text size="sm">小号文本</Text>);
    const { container: container2 } = render(<Text size="md">中号文本</Text>);
    const { container: container3 } = render(<Text size="lg">大号文本</Text>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Text with different colors', () => {
    const { container } = render(<Text color="#ff0000">红色文本</Text>);
    const text = container.firstChild;
    expect(text).toBeInTheDocument();
  });

  test('renders Text with different weights', () => {
    const { container: container1 } = render(<Text weight="normal">常规文本</Text>);
    const { container: container2 } = render(<Text weight="bold">粗体文本</Text>);
    const { container: container3 } = render(<Text weight="light">轻量文本</Text>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Text with different styles', () => {
    const { container: container1 } = render(<Text underline>下划线文本</Text>);
    const { container: container2 } = render(<Text lineThrough>删除线文本</Text>);
    const { container: container3 } = render(<Text italic>斜体文本</Text>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});