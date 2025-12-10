# Table 组件

Table 组件是一个表格组件，用于展示结构化数据，支持排序、筛选、分页、自定义列、固定列、选择行等功能。

## 基本使用

### 基础表格

```tsx
<Table dataSource={data} columns={columns} />
```

### 带边框的表格

```tsx
<Table dataSource={data} columns={columns} bordered />
```

### 带条纹的表格

```tsx
<Table dataSource={data} columns={columns} striped />
```

### 带行点击的表格

```tsx
<Table 
  dataSource={data} 
  columns={columns} 
  onRowClick={(record) => console.log('点击了行:', record)} 
/>
```

### 带选择功能的表格

```tsx
<Table 
  dataSource={data} 
  columns={columns} 
  rowSelection={{ 
    selectedRowKeys, 
    onChange: handleSelectChange 
  }} 
/>
```

## 数据准备

```tsx
const data = [
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区', email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 35, address: '深圳市南山区', email: 'zhaoliu@example.com' },
  { id: 5, name: '孙七', age: 29, address: '杭州市西湖区', email: 'sunqi@example.com' },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
];
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| dataSource | `any[]` | `[]` | 数据源 |
| columns | `TableColumnType[]` | `[]` | 列配置 |
| bordered | `boolean` | `false` | 是否显示边框 |
| striped | `boolean` | `false` | 是否显示条纹 |
| hoverable | `boolean` | `true` | 是否支持行悬停效果 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| pagination | `boolean \| PaginationProps` | `false` | 是否显示分页 |
| rowSelection | `TableRowSelection` | - | 行选择配置 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onRowClick | `(record: any, index: number) => void` | - | 行点击事件处理函数 |
| onRowDoubleClick | `(record: any, index: number) => void` | - | 行双击事件处理函数 |
| onRowContextMenu | `(record: any, index: number, event: React.MouseEvent) => void` | - | 行右键菜单事件处理函数 |

## TableColumnType 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| title | `React.ReactNode` | - | 列标题 |
| dataIndex | `string` | - | 数据字段名 |
| key | `string` | - | 列的唯一标识 |
| width | `number \| string` | - | 列宽度 |
| minWidth | `number \| string` | - | 列最小宽度 |
| maxWidth | `number \| string` | - | 列最大宽度 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 列对齐方式 |
| fixed | `'left' \| 'right'` | - | 是否固定列 |
| ellipsis | `boolean` | `false` | 是否显示省略号 |
| sortable | `boolean` | `false` | 是否支持排序 |
| filterable | `boolean` | `false` | 是否支持筛选 |
| render | `(text: any, record: any, index: number) => React.ReactNode` | - | 自定义渲染函数 |
| className | `string` | - | 自定义列类名 |
| style | `React.CSSProperties` | - | 自定义列样式 |

## 类型定义

```tsx
// 表格列配置接口
export interface TableColumnType {
  title: React.ReactNode;
  dataIndex: string;
  key: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  render?: (text: any, record: any, index: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// 行选择配置接口
export interface TableRowSelection {
  selectedRowKeys?: (string | number)[];
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: any[]) => void;
  getCheckboxProps?: (record: any) => { disabled?: boolean; checked?: boolean };
}

// Table 组件属性接口
export interface TableProps {
  dataSource: any[];
  columns: TableColumnType[];
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  pagination?: boolean | any;
  rowSelection?: TableRowSelection;
  className?: string;
  style?: React.CSSProperties;
  onRowClick?: (record: any, index: number) => void;
  onRowDoubleClick?: (record: any, index: number) => void;
  onRowContextMenu?: (record: any, index: number, event: React.MouseEvent) => void;
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onRowClick | 行点击事件 | `record: any` - 行数据, `index: number` - 行索引 |
| onRowDoubleClick | 行双击事件 | `record: any` - 行数据, `index: number` - 行索引 |
| onRowContextMenu | 行右键菜单事件 | `record: any` - 行数据, `index: number` - 行索引, `event: React.MouseEvent` - 事件对象 |
| rowSelection.onChange | 行选择变化事件 | `selectedRowKeys: (string | number)[]` - 选中的行键, `selectedRows: any[]` - 选中的行数据 |

## 示例代码

### 完整示例

```tsx
import { Table, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const TableExample = () => {
  // 数据源
  const data = [
    { id: 1, name: '张三', age: 28, address: '北京市朝阳区', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 32, address: '上海市浦东新区', email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 25, address: '广州市天河区', email: 'wangwu@example.com' },
    { id: 4, name: '赵六', age: 35, address: '深圳市南山区', email: 'zhaoliu@example.com' },
    { id: 5, name: '孙七', age: 29, address: '杭州市西湖区', email: 'sunqi@example.com' },
  ];

  // 列配置
  const columns = [
    { 
      title: 'ID', 
      dataIndex: 'id', 
      key: 'id', 
      width: 80, 
      align: 'center' 
    },
    { 
      title: '姓名', 
      dataIndex: 'name', 
      key: 'name', 
      width: 120, 
      ellipsis: true 
    },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age', 
      width: 100, 
      align: 'center' 
    },
    { 
      title: '地址', 
      dataIndex: 'address', 
      key: 'address', 
      ellipsis: true 
    },
    { 
      title: '邮箱', 
      dataIndex: 'email', 
      key: 'email', 
      ellipsis: true 
    },
    { 
      title: '操作', 
      key: 'action', 
      width: 150, 
      align: 'center',
      render: (text, record) => (
        <Space>
          <Text style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleEdit(record)}>编辑</Text>
          <Text style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => handleDelete(record)}>删除</Text>
        </Space>
      )
    },
  ];

  // 行选择状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  // 处理行点击
  const handleRowClick = (record: any) => {
    console.log('点击了行:', record);
  };

  // 处理行选择变化
  const handleSelectChange = (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log('选中的行键:', selectedRowKeys);
    console.log('选中的行:', selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  // 处理编辑
  const handleEdit = (record: any) => {
    console.log('编辑:', record);
  };

  // 处理删除
  const handleDelete = (record: any) => {
    console.log('删除:', record);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带边框的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        bordered 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带条纹的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        striped 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带行点击的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        onRowClick={handleRowClick} 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带选择功能的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        rowSelection={{ 
          selectedRowKeys, 
          onChange: handleSelectChange 
        }} 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带边框和条纹的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        bordered 
        striped 
        onRowClick={handleRowClick} 
        style={{ marginBottom: '20px' }} 
      />

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带加载状态的表格</Text>
      <Table 
        dataSource={data} 
        columns={columns} 
        loading 
        style={{ marginBottom: '20px' }} 
      />
    </View>
  );
};

export default TableExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分功能可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分功能可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分功能可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分功能可能存在差异 |

## 注意事项

1. **数据源格式**：数据源必须是数组，每个数据项必须有唯一的 key 或 id 属性。
2. **列配置**：每个列必须有 dataIndex 和 key 属性，dataIndex 对应数据源中的字段名。
3. **性能优化**：对于大量数据，建议使用分页功能，或考虑使用虚拟列表优化性能。
4. **自定义渲染**：可通过 render 属性自定义列的渲染内容，支持返回 React 节点。
5. **行选择**：支持单选和多选，可通过 rowSelection 属性配置。
6. **固定列**：支持左右固定列，可通过 fixed 属性配置。
7. **响应式设计**：表格会自动适应容器宽度，可通过 width 属性调整列宽。
8. **事件处理**：支持行点击、双击、右键菜单等事件。

## 相关组件

- [Space 组件](#/components/layout/space) - 用于表格操作按钮布局
- [Pagination 组件](#/components/navigation/pagination) - 用于表格分页
- [Button 组件](#/components/basic/button) - 可与表格结合使用
- [Form 组件](#/components/form/form) - 用于表格筛选和编辑