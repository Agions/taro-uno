# Pagination 分页组件

Pagination组件用于数据分页，提供完整的分页功能，包括页码导航、跳转、每页条数设置等。

## 基础用法

```tsx
import { Pagination } from 'taro-uno'

function BasicPagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <Pagination 
      current={current}
      total={100}
      onChange={(page) => setCurrent(page)}
    />
  )
}
```

## 分页大小

```tsx
import { Pagination } from 'taro-uno'

function SizePagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  return (
    <div>
      {/* 小分页 */}
      <Pagination 
        current={current}
        total={50}
        pageSize={5}
        size="small"
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 默认分页 */}
      <Pagination 
        current={current}
        total={100}
        pageSize={10}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 大分页 */}
      <Pagination 
        current={current}
        total={200}
        pageSize={20}
        size="large"
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 快速跳转

```tsx
import { Pagination } from 'taro-uno'

function QuickJumperPagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <div>
      {/* 快速跳转 */}
      <Pagination 
        current={current}
        total={100}
        showQuickJumper
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 自定义快速跳转 */}
      <Pagination 
        current={current}
        total={100}
        showQuickJumper={{ goButton: true }}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 自定义跳转按钮文本 */}
      <Pagination 
        current={current}
        total={100}
        showQuickJumper={{ goButton: '跳转' }}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 每页条数

```tsx
import { Pagination } from 'taro-uno'

function PageSizePagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const handleSizeChange = (current, size) => {
    setCurrent(1)
    setPageSize(size)
  }
  
  return (
    <div>
      {/* 显示每页条数选择器 */}
      <Pagination 
        current={current}
        total={200}
        pageSize={pageSize}
        showSizeChanger
        onShowSizeChange={handleSizeChange}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 自定义每页条数选项 */}
      <Pagination 
        current={current}
        total={200}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={['10', '20', '50', '100']}
        onShowSizeChange={handleSizeChange}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 简单分页

```tsx
import { Pagination } from 'taro-uno'

function SimplePagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <div>
      {/* 只有上一页下一页 */}
      <Pagination 
        current={current}
        total={100}
        simple
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 简单分页带总数 */}
      <Pagination 
        current={current}
        total={100}
        simple
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 迷你分页

```tsx
import { Pagination } from 'taro-uno'

function MiniPagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <div>
      {/* 迷你分页 */}
      <Pagination 
        current={current}
        total={50}
        size="small"
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 迷你分页带快速跳转 */}
      <Pagination 
        current={current}
        total={50}
        size="small"
        showQuickJumper
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 迷你分页带每页条数 */}
      <Pagination 
        current={current}
        total={50}
        size="small"
        showSizeChanger
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 显示总数

```tsx
import { Pagination } from 'taro-uno'

function TotalPagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  return (
    <div>
      {/* 显示总数 */}
      <Pagination 
        current={current}
        total={100}
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 显示当前页信息 */}
      <Pagination 
        current={current}
        total={100}
        pageSize={pageSize}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 自定义总数显示 */}
      <Pagination 
        current={current}
        total={100}
        showTotal={(total) => (
          <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
            Total: {total}
          </span>
        )}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 受控模式

```tsx
import { Pagination } from 'taro-uno'

function ControlledPagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const handlePageChange = (page) => {
    setCurrent(page)
    console.log('页码改变:', page)
  }
  
  const handleSizeChange = (current, size) => {
    setCurrent(1)
    setPageSize(size)
    console.log('每页条数改变:', size)
  }
  
  return (
    <Pagination 
      current={current}
      pageSize={pageSize}
      total={200}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      onChange={handlePageChange}
      onShowSizeChange={handleSizeChange}
    />
  )
}
```

## 禁用状态

```tsx
import { Pagination } from 'taro-uno'

function DisabledPagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <div>
      {/* 完全禁用 */}
      <Pagination 
        current={current}
        total={100}
        disabled
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 禁用快速跳转 */}
      <Pagination 
        current={current}
        total={100}
        showQuickJumper
        disabled
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 禁用每页条数选择 */}
      <Pagination 
        current={current}
        total={100}
        showSizeChanger
        disabled
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 自定义样式

```tsx
import { Pagination } from 'taro-uno'

function CustomStylePagination() {
  const [current, setCurrent] = useState(1)
  
  return (
    <div>
      {/* 自定义分页样式 */}
      <Pagination 
        current={current}
        total={100}
        style={{ 
          background: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '8px' 
        }}
        itemStyle={{ 
          background: 'white', 
          border: '1px solid #d9d9d9',
          borderRadius: '4px'
        }}
        activeItemStyle={{ 
          background: '#1890ff', 
          borderColor: '#1890ff',
          color: 'white'
        }}
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 自定义按钮样式 */}
      <Pagination 
        current={current}
        total={100}
        prevButtonStyle={{ 
          background: '#52c41a', 
          borderColor: '#52c41a',
          color: 'white'
        }}
        nextButtonStyle={{ 
          background: '#52c41a', 
          borderColor: '#52c41a',
          color: 'white'
        }}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 响应式分页

```tsx
import { Pagination } from 'taro-uno'

function ResponsivePagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  return (
    <div>
      {/* 响应式分页 */}
      <Pagination 
        current={current}
        total={100}
        responsive
        onChange={(page) => setCurrent(page)}
      />
      
      {/* 响应式分页带完整功能 */}
      <Pagination 
        current={current}
        total={200}
        pageSize={pageSize}
        responsive
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        onShowSizeChange={(current, size) => setPageSize(size)}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}
```

## 复杂分页示例

```tsx
import { Pagination, Select, Input, Button } from 'taro-uno'

function ComplexPagination() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(100)
  
  // 模拟数据加载
  const loadData = (page, size) => {
    console.log(`加载第 ${page} 页，每页 ${size} 条`)
    // 这里可以添加实际的数据加载逻辑
  }
  
  const handlePageChange = (page) => {
    setCurrent(page)
    loadData(page, pageSize)
  }
  
  const handleSizeChange = (current, size) => {
    setCurrent(1)
    setPageSize(size)
    loadData(1, size)
  }
  
  const handleRefresh = () => {
    loadData(current, pageSize)
  }
  
  return (
    <div>
      {/* 数据统计信息 */}
      <div style={{ marginBottom: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4>数据统计</h4>
        <p>当前页: {current} | 每页条数: {pageSize} | 总条数: {total}</p>
      </div>
      
      {/* 工具栏 */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Select 
          value={pageSize} 
          onChange={(value) => handleSizeChange(1, value)}
          style={{ width: '120px' }}
        >
          <Select.Option value={5}>5 条/页</Select.Option>
          <Select.Option value={10}>10 条/页</Select.Option>
          <Select.Option value={20}>20 条/页</Select.Option>
          <Select.Option value={50}>50 条/页</Select.Option>
        </Select>
        
        <Input 
          placeholder="跳转到页码"
          style={{ width: '120px' }}
          onPressEnter={(e) => {
            const page = parseInt(e.target.value)
            if (page && page > 0) {
              handlePageChange(page)
            }
          }}
        />
        
        <Button onClick={handleRefresh}>刷新</Button>
      </div>
      
      {/* 分页组件 */}
      <Pagination 
        current={current}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false} // 使用自定义的每页条数选择器
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        onChange={handlePageChange}
        style={{ textAlign: 'center' }}
      />
      
      {/* 页面信息 */}
      <div style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
        当前显示第 {(current - 1) * pageSize + 1} - {Math.min(current * pageSize, total)} 条，共 {total} 条数据
      </div>
    </div>
  )
}
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| current | number | 1 | 当前页码 |
| total | number | 0 | 数据总数 |
| pageSize | number | 10 | 每页条数 |
| defaultCurrent | number | 1 | 默认当前页码 |
| defaultPageSize | number | 10 | 默认每页条数 |
| disabled | boolean | false | 是否禁用 |
| showSizeChanger | boolean | false | 是否显示每页条数选择器 |
| showQuickJumper | boolean \| object | false | 是否显示快速跳转 |
| showTotal | boolean \| function | false | 是否显示总数 |
| size | 'small' \| 'default' \| 'large' | 'default' | 分页大小 |
| responsive | boolean | false | 是否响应式 |
| simple | boolean | false | 是否为简单分页 |
| hideOnSinglePage | boolean | false | 只有一页时是否隐藏 |
| itemRender | function | - | 自定义页码渲染 |
| pageSizeOptions | string[] | ['10', '20', '50', '100'] | 每页条数选项 |
| onChange | function | - | 页码改变回调 |
| onShowSizeChange | function | - | 每页条数改变回调 |

### 样式 Props

| 属性名 | 类型 | 说明 |
|--------|------|------|
| style | CSSProperties | 分页容器样式 |
| itemStyle | CSSProperties | 页码项样式 |
| activeItemStyle | CSSProperties | 激活页码项样式 |
| prevButtonStyle | CSSProperties | 上一页按钮样式 |
| nextButtonStyle | CSSProperties | 下一页按钮样式 |
| jumpButtonStyle | CSSProperties | 跳转按钮样式 |

### 事件回调

| 事件名 | 参数 | 说明 |
|--------|------|------|
| onChange | (page: number, pageSize: number) => void | 页码改变回调 |
| onShowSizeChange | (current: number, size: number) => void | 每页条数改变回调 |

## 最佳实践

### 1. 合理设置每页条数

```tsx
// 推荐：合理的每页条数选项
<Pagination 
  pageSizeOptions={['10', '20', '50', '100']}
  showSizeChanger
/>

// 避免：不合理的每页条数
<Pagination 
  pageSizeOptions={['5', '7', '13', '25']}
  showSizeChanger
/>
```

### 2. 使用响应式分页

```tsx
// 推荐：在小屏幕上使用响应式分页
<Pagination 
  responsive
  showSizeChanger
  showQuickJumper
/>

// 避免：在小屏幕上显示完整分页
<Pagination 
  showSizeChanger
  showQuickJumper
  showTotal
/>
```

### 3. 合理显示总数

```tsx
// 推荐：显示有用的总数信息
<Pagination 
  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
/>

// 推荐：简单的总数显示
<Pagination 
  showTotal={(total) => `共 ${total} 条`}
/>

// 避免：过长的总数信息
<Pagination 
  showTotal={(total) => `当前数据表中共有 ${total} 条记录，每页显示 10 条，当前为第 1 页`}
/>
```

## 注意事项

1. **性能考虑**：对于大量数据的分页，建议使用服务端分页
2. **用户体验**：合理设置每页条数，避免过多或过少
3. **响应式设计**：在小屏幕上简化分页显示
4. **可访问性**：确保分页组件在屏幕阅读器中可用
5. **状态管理**：合理管理分页状态，避免状态不一致