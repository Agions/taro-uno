/**
 * Table Component Test
 * 表格组件测试
 */

import { render } from '../../test-utils';
import { Table } from '../../../src/components/display/Table';
import { describe, test, expect } from 'vitest';

describe('Table Component', () => {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];

  const data = [
    { key: '1', name: '张三', age: 18, address: '北京' },
    { key: '2', name: '李四', age: 20, address: '上海' },
    { key: '3', name: '王五', age: 22, address: '广州' },
  ];

  test('renders Table with columns and data', () => {
    const { container } = render(<Table columns={columns} data={data} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Table with custom row key', () => {
    const customData = [
      { id: '1', name: '张三', age: 18 },
      { id: '2', name: '李四', age: 20 },
    ];
    
    const { container } = render(
      <Table 
        columns={columns.slice(0, 2)} 
        data={customData} 
        rowKey="id" 
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Table with bordered style', () => {
    const { container } = render(<Table columns={columns} data={data} bordered />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders Table with pagination', () => {
    const { container } = render(
      <Table 
        columns={columns} 
        data={data} 
        pagination={{ pageSize: 2 }} 
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});