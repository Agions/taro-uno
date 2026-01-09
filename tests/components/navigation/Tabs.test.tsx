/**
 * Tabs Component Test
 * 标签页组件测试
 */

import { render, screen, fireEvent } from '../../test-utils';
import { Tabs } from '../../../src/components/navigation/Tabs';
import { describe, test, expect, vi } from 'vitest';

describe('Tabs Component', () => {
  const defaultItems = [
    { key: '1', title: '标签一', content: '标签一内容' },
    { key: '2', title: '标签二', content: '标签二内容' },
    { key: '3', title: '标签三', content: '标签三内容' },
  ];

  test('renders Tabs with items', () => {
    render(<Tabs items={defaultItems} />);
    
    const tab1 = screen.getByText('标签一');
    const tab2 = screen.getByText('标签二');
    const tab3 = screen.getByText('标签三');
    
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
  });

  test('handles tab change', () => {
    const onChange = vi.fn();
    render(<Tabs items={defaultItems} onChange={onChange} />);
    
    const tab2 = screen.getByText('标签二');
    fireEvent.click(tab2);
    expect(onChange).toHaveBeenCalledWith('2');
  });

  test('renders active tab correctly', () => {
    render(<Tabs items={defaultItems} activeKey="2" />);
    
    const tab2 = screen.getByText('标签二');
    expect(tab2).toBeInTheDocument();
  });

  test('renders Tabs with different types', () => {
    const { container: container1 } = render(
      <Tabs items={defaultItems} type="line" />,
    );
    
    const { container: container2 } = render(
      <Tabs items={defaultItems} type="card" />,
    );
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
  });
});