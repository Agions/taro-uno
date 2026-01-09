/**
 * Row Component Test
 * 行组件测试
 */

import { render } from '@testing-library/react';
import { Row, Col } from '../../../src/components/layout';
import { describe, test, expect } from 'vitest';

describe('Row Component', () => {
  test('renders Row with Cols', () => {
    const { container } = render(
      <Row>
        <Col span={12}>左侧</Col>
        <Col span={12}>右侧</Col>
      </Row>,
    );
    const row = container.firstChild;
    expect(row).toBeInTheDocument();
  });

  test('renders Row with gutter', () => {
    const { container } = render(
      <Row gutter={16}>
        <Col span={12}>左侧</Col>
        <Col span={12}>右侧</Col>
      </Row>,
    );
    const row = container.firstChild;
    expect(row).toBeInTheDocument();
  });

  test('renders Row with different alignments', () => {
    const { container: container1 } = render(<Row align="top"><Col>顶部对齐</Col></Row>);
    const { container: container2 } = render(<Row align="middle"><Col>居中对齐</Col></Row>);
    const { container: container3 } = render(<Row align="bottom"><Col>底部对齐</Col></Row>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });

  test('renders Row with different justifications', () => {
    const { container: container1 } = render(<Row justify="start"><Col>起始对齐</Col></Row>);
    const { container: container2 } = render(<Row justify="center"><Col>居中对齐</Col></Row>);
    const { container: container3 } = render(<Row justify="end"><Col>结束对齐</Col></Row>);
    
    expect(container1.firstChild).toBeInTheDocument();
    expect(container2.firstChild).toBeInTheDocument();
    expect(container3.firstChild).toBeInTheDocument();
  });
});