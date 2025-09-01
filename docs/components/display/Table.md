# Table 表格组件

表格组件用于展示结构化的数据，支持排序、筛选、分页等功能。

## 基础用法

```tsx
import { Table } from 'taro-uno'

// 基础表格
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ]}
  dataSource={[
    { key: '1', name: '张三', age: 25, address: '北京' },
    { key: '2', name: '李四', age: 30, address: '上海' },
    { key: '3', name: '王五', age: 28, address: '广州' }
  ]}
/>
```

## 带边框表格

```tsx
<Table
  bordered
  columns={columns}
  dataSource={dataSource}
/>
```

## 斑马纹表格

```tsx
<Table
  striped
  columns={columns}
  dataSource={dataSource}
/>
```

## 小型表格

```tsx
<Table
  size="small"
  columns={columns}
  dataSource={dataSource}
/>
```

## 大型表格

```tsx
<Table
  size="large"
  columns={columns}
  dataSource={dataSource}
/>
```

## 滚动表格

```tsx
<Table
  scroll={{ x: 800, y: 300 }}
  columns={columns}
  dataSource={dataSource}
/>
```

## 可展开表格

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  expandable={{
    expandedRowRender: (record) => (
      <div style={{ padding: '16px' }}>
        <Text>详细信息：{record.name}</Text>
      </div>
    ),
    rowExpandable: (record) => record.name !== '张三'
  }}
/>
```

## 选择表格

```tsx
<Table
  rowSelection={{
    selectedRowKeys: selectedKeys,
    onChange: (selectedKeys) => setSelectedKeys(selectedKeys)
  }}
  columns={columns}
  dataSource={dataSource}
/>
```

## 排序表格

```tsx
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age',
      sorter: (a, b) => a.age - b.age
    },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ]}
  dataSource={dataSource}
/>
```

## 筛选表格

```tsx
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age',
      filters: [
        { text: '25岁以下', value: 25 },
        { text: '25岁以上', value: 26 }
      ],
      onFilter: (value, record) => record.age >= value
    },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ]}
  dataSource={dataSource}
/>
```

## 分页表格

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  pagination={{
    current: currentPage,
    pageSize: 10,
    total: 100,
    onChange: (page) => setCurrentPage(page)
  }}
/>
```

## 固定列

```tsx
<Table
  columns={[
    { 
      title: '姓名', 
      dataIndex: 'name', 
      key: 'name',
      fixed: 'left',
      width: 100
    },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { 
      title: '操作', 
      key: 'action',
      fixed: 'right',
      width: 120,
      render: () => (
        <Button size="sm">编辑</Button>
      )
    }
  ]}
  dataSource={dataSource}
  scroll={{ x: 800 }}
/>
```

## 自定义渲染

```tsx
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age',
      render: (age) => (
        <Tag color={age > 30 ? 'warning' : 'success'}>{age}</Tag>
      )
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '在线' ? 'success' : 'default'} 
          text={status} 
        />
      )
    }
  ]}
  dataSource={dataSource}
/>
```

## 行样式

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  rowClassName={(record) => record.age > 30 ? 'highlight-row' : ''}
/>
```

## 合并单元格

```tsx
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ]}
  dataSource={dataSource}
  components={{
    body: {
      cell: ({ children, ...props }) => {
        if (props.rowIndex === 0 && props.colIndex === 0) {
          return (
            <td {...props} rowSpan={2}>
              {children}
            </td>
          )
        }
        return <td {...props}>{children}</td>
      }
    }
  }}
/>
```

## 虚拟滚动

```tsx
<Table
  columns={columns}
  dataSource={largeDataSource}
  scroll={{ y: 400 }}
  pagination={false}
  virtual
/>
```

## 响应式表格

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  responsive={{
    xs: ['name', 'age'],
    sm: ['name', 'age', 'address'],
    md: ['name', 'age', 'address', 'action']
  }}
/>
```

## 可编辑表格

```tsx
<Table
  columns={[
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age',
      editable: true,
      render: (text, record) => (
        <Input 
          value={text} 
          onChange={(e) => handleEdit(record.key, 'age', e.target.value)}
        />
      )
    }
  ]}
  dataSource={dataSource}
/>
```

## 树形表格

```tsx
<Table
  columns={columns}
  dataSource={[
    {
      key: '1',
      name: '父节点',
      children: [
        { key: '1-1', name: '子节点1' },
        { key: '1-2', name: '子节点2' }
      ]
    }
  ]}
/>
```

## API

### Table Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | Column[] | [] | 列配置 |
| dataSource | Record<string, any>[] | [] | 数据源 |
| bordered | boolean | false | 是否显示边框 |
| striped | boolean | false | 是否显示斑马纹 |
| size | 'small' \| 'middle' \| 'large' | 'middle' | 表格大小 |
| scroll | { x?: number, y?: number } | - | 滚动配置 |
| expandable | ExpandableConfig | - | 可展开配置 |
| rowSelection | RowSelection | - | 行选择配置 |
| pagination | PaginationConfig \| false | - | 分页配置 |
| rowClassName | (record: any, index: number) => string | - | 行样式类名 |
| rowKey | string \| ((record: any) => string) | 'key' | 行唯一标识 |
| loading | boolean | false | 是否加载状态 |
| virtual | boolean | false | 是否虚拟滚动 |
| responsive | ResponsiveConfig | - | 响应式配置 |
| components | TableComponents | - | 自定义组件 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Column 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 列标题 |
| dataIndex | string | - | 数据索引 |
| key | string | - | 列唯一标识 |
| width | number \| string | - | 列宽度 |
| fixed | 'left' \| 'right' | - | 固定列 |
| sorter | boolean \| ((a: any, b: any) => number) | - | 排序函数 |
| filters | Filter[] | - | 筛选配置 |
| onFilter | (value: any, record: any) => boolean | - | 筛选函数 |
| render | (value: any, record: any, index: number) => ReactNode | - | 自定义渲染 |
| align | 'left' \| 'center' \| 'right' | 'left' | 对齐方式 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### RowSelection 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| selectedRowKeys | string[] | [] | 选中的行键 |
| onChange | (selectedRowKeys: string[], selectedRows: any[]) => void | - | 选择变化回调 |
| type | 'checkbox' \| 'radio' | 'checkbox' | 选择类型 |
| getCheckboxProps | (record: any) => object | - | 复选框属性 |

### Pagination 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| current | number | 1 | 当前页码 |
| pageSize | number | 10 | 每页条数 |
| total | number | 0 | 总条数 |
| onChange | (page: number, pageSize: number) => void | - | 页码变化回调 |
| onShowSizeChange | (current: number, size: number) => void | - | 页大小变化回调 |
| showSizeChanger | boolean | false | 是否显示页大小选择器 |
| showQuickJumper | boolean | false | 是否显示快速跳转 |
| showTotal | (total: number, range: [number, number]) => ReactNode | - | 总数显示 |

## 样式定制

### CSS 变量

```css
:root {
  --table-background: #ffffff;
  --table-header-background: #f9fafb;
  --table-border-color: #e5e7eb;
  --table-hover-background: #f9fafb;
  --table-selected-background: #eff6ff;
  --table-text-color: #111827;
  --table-header-text-color: #374151;
  --table-padding: 12px 16px;
  --table-border-radius: 8px;
}
```

### 自定义样式类

```tsx
<Table className="custom-table" />

<style>
.custom-table {
  border-radius: 12px;
  overflow: hidden;
}

.custom-table .ant-table-thead > tr > th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-table .ant-table-tbody > tr:hover > td {
  background: linear-gradient(90deg, #f0f9ff, #e0f2fe);
}
</style>
```

## 最佳实践

1. **数据展示**：使用表格展示结构化的数据
2. **性能优化**：大数据量时使用虚拟滚动
3. **用户体验**：提供排序、筛选、分页等功能
4. **响应式设计**：在不同屏幕尺寸下调整表格布局
5. **可访问性**：确保表格具有良好的可访问性

## 注意事项

1. 虚拟滚动需要设置固定的滚动高度
2. 固定列需要设置列宽和滚动宽度
3. 大数据量时建议使用分页或虚拟滚动
4. 移动端表格可能需要特殊处理

## 示例代码

### 用户管理表格

```tsx
function UserTable() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? '激活' : '禁用'} 
        />
      )
    },
    { 
      title: '创建时间', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm">编辑</Button>
          <Button size="sm" type="primary">查看</Button>
        </div>
      )
    }
  ]

  const dataSource = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active', createdAt: '2024-01-01' },
    { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive', createdAt: '2024-01-02' },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: 'active', createdAt: '2024-01-03' }
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: setSelectedKeys
      }}
      bordered
      striped
      pagination={{
        current: 1,
        pageSize: 10,
        total: 100,
        onChange: (page) => console.log('Page changed:', page)
      }}
    />
  )
}
```

### 数据统计表格

```tsx
function StatisticsTable() {
  const columns = [
    { title: '指标', dataIndex: 'metric', key: 'metric' },
    { title: '今日', dataIndex: 'today', key: 'today' },
    { title: '昨日', dataIndex: 'yesterday', key: 'yesterday' },
    { 
      title: '变化', 
      dataIndex: 'change', 
      key: 'change',
      render: (change: number) => (
        <Text color={change > 0 ? '#22c55e' : '#ef4444'}>
          {change > 0 ? '+' : ''}{change}%
        </Text>
      )
    }
  ]

  const dataSource = [
    { metric: '访问量', today: 1234, yesterday: 1156, change: 6.7 },
    { metric: '用户数', today: 856, yesterday: 823, change: 4.0 },
    { metric: '转化率', today: 3.2, yesterday: 2.8, change: 14.3 }
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size="small"
      bordered={false}
      pagination={false}
    />
  )
}
```

### 可编辑表格

```tsx
function EditableTable() {
  const [data, setData] = useState([
    { key: '1', name: '张三', age: 25, address: '北京' },
    { key: '2', name: '李四', age: 30, address: '上海' }
  ])

  const handleEdit = (key: string, field: string, value: any) => {
    setData(data.map(item => 
      item.key === key ? { ...item, [field]: value } : item
    ))
  }

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { 
      title: '年龄', 
      dataIndex: 'age', 
      key: 'age',
      render: (text: any, record: any) => (
        <Input 
          value={text} 
          onChange={(e) => handleEdit(record.key, 'age', e.target.value)}
          style={{ width: '80px' }}
        />
      )
    },
    { 
      title: '地址', 
      dataIndex: 'address', 
      key: 'address',
      render: (text: any, record: any) => (
        <Input 
          value={text} 
          onChange={(e) => handleEdit(record.key, 'address', e.target.value)}
          style={{ width: '120px' }}
        />
      )
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
    />
  )
}
```