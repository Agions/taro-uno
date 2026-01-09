/**
 * Divider Component Test
 * 分割线组件测试
 */

import { render } from '@testing-library/react';
import { Divider } from '../../../src/components/basic/Divider';
import { describe, test, expect } from 'vitest';

describe('Divider Component', () => {
  test('renders default Divider', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild;
    expect(divider).toBeInTheDocument();
  });

  test('renders Divider with text', () => {
    const { getByText } = render(<Divider>分割线</Divider>);
    const text = getByText('分割线');
    expect(text).toBeInTheDocument();
  });

  test('renders Divider with different orientations', () => {
    const { container: container1 } = render(<Divider orientation="horizontal" />);
    const { container: container2 } = render(<Divider orientation="vertical" />);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
  });

  test('renders Divider with different positions', () => {
    const { container: container1 } = render(<Divider orientation="horizontal" position="left">左侧文本</Divider>);
    const { container: container2 } = render(<Divider orientation="horizontal" position="center">居中文本</Divider>);
    const { container: container3 } = render(<Divider orientation="horizontal" position="right">右侧文本</Divider>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});