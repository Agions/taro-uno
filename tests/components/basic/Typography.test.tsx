/**
 * Typography Component Test
 * 排版组件测试
 */

import { render, screen } from '@testing-library/react';
import { Typography } from '../../../src/components/basic/Typography';
import { describe, test, expect } from 'vitest';

describe('Typography Component', () => {
  test('renders Typography with title', () => {
    render(<Typography.Title level="h1">标题一</Typography.Title>);
    const title = screen.getByText('标题一');
    expect(title).toBeInTheDocument();
  });

  test('renders Typography with different title levels', () => {
    const { container: container1 } = render(<Typography.Title level="h1">标题一</Typography.Title>);
    const { container: container2 } = render(<Typography.Title level="h2">标题二</Typography.Title>);
    const { container: container3 } = render(<Typography.Title level="h3">标题三</Typography.Title>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Typography Paragraph', () => {
    render(<Typography.Paragraph>段落文本</Typography.Paragraph>);
    const paragraph = screen.getByText('段落文本');
    expect(paragraph).toBeInTheDocument();
  });

  test('renders Typography Text', () => {
    render(<Typography.Text strong>强调文本</Typography.Text>);
    const text = screen.getByText('强调文本');
    expect(text).toBeInTheDocument();
  });

  test('renders Typography with different colors', () => {
    const { container } = render(<Typography.Text color="primary">主要文本</Typography.Text>);
    const text = container.firstChild;
    expect(text).toBeInTheDocument();
  });
});