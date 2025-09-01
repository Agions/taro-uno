# List 列表组件

列表组件用于展示一系列相似的数据项，支持多种布局和交互模式。

## 基础用法

```tsx
import { List } from 'taro-uno'

// 基础列表
<List>
  <List.Item>列表项 1</List.Item>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>
```

## 带边框列表

```tsx
<List bordered>
  <List.Item>列表项 1</List.Item>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>
```

## 分割线

```tsx
<List split>
  <List.Item>列表项 1</List.Item>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>
```

## 大小

```tsx
<List size="small">
  <List.Item>小列表项</List.Item>
</List>

<List size="default">
  <List.Item>默认列表项</List.Item>
</List>

<List size="large">
  <List.Item>大列表项</List.Item>
</List>
```

## 带头像列表

```tsx
<List>
  <List.Item
    avatar="https://example.com/avatar1.jpg"
    title="张三"
    description="前端开发工程师"
  />
  <List.Item
    avatar="https://example.com/avatar2.jpg"
    title="李四"
    description="UI设计师"
  />
  <List.Item
    avatar="https://example.com/avatar3.jpg"
    title="王五"
    description="产品经理"
  />
</List>
```

## 带图标列表

```tsx
import { Icon } from 'taro-uno'

<List>
  <List.Item
    icon={<Icon name="home" />}
    title="首页"
    description="返回首页"
  />
  <List.Item
    icon={<Icon name="settings" />}
    title="设置"
    description="系统设置"
  />
  <List.Item
    icon={<Icon name="user" />}
    title="个人中心"
    description="查看个人信息"
  />
</List>
```

## 带操作列表

```tsx
<List>
  <List.Item
    title="列表项 1"
    actions={[
      <Button size="sm">编辑</Button>,
      <Button size="sm" type="primary">查看</Button>
    ]}
  />
  <List.Item
    title="列表项 2"
    actions={[
      <Button size="sm">编辑</Button>,
      <Button size="sm" type="primary">查看</Button>
    ]}
  />
</List>
```

## 带额外信息列表

```tsx
<List>
  <List.Item
    title="任务名称"
    description="任务描述信息"
    extra="进行中"
  />
  <List.Item
    title="任务名称"
    description="任务描述信息"
    extra="已完成"
  />
</List>
```

## 可点击列表

```tsx
<List>
  <List.Item
    title="可点击列表项"
    description="点击可查看详情"
    onClick={() => console.log('点击了列表项')}
  />
</List>
```

## 禁用列表项

```tsx
<List>
  <List.Item>正常列表项</List.Item>
  <List.Item disabled>禁用列表项</List.Item>
</List>
```

## 虚拟列表

```tsx
<List
  dataSource={Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个项目的描述`
  }))}
  renderItem={(item) => (
    <List.Item
      key={item.id}
      title={item.title}
      description={item.description}
    />
  )}
  virtual
  height={400}
  itemHeight={60}
/>
```

## 加载更多

```tsx
<List
  dataSource={data}
  renderItem={(item) => (
    <List.Item key={item.id} title={item.title} />
  )}
  loading={loading}
  loadMore={loadMoreData}
  hasMore={hasMore}
/>
```

## 空状态

```tsx
<List
  dataSource={[]}
  renderItem={(item) => (
    <List.Item key={item.id} title={item.title} />
  )}
  emptyText="暂无数据"
/>
```

## 网格列表

```tsx
<List
  grid={{ gutter: 16, column: 3 }}
  dataSource={data}
  renderItem={(item) => (
    <List.Item key={item.id}>
      <Card>{item.title}</Card>
    </List.Item>
  )}
/>
```

## 响应式网格

```tsx
<List
  grid={{
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6
  }}
  dataSource={data}
  renderItem={(item) => (
    <List.Item key={item.id}>
      <Card>{item.title}</Card>
    </List.Item>
  )}
/>
```

## 水平列表

```tsx>
<List horizontal>
  <List.Item>水平项 1</List.Item>
  <List.Item>水平项 2</List.Item>
  <List.Item>水平项 3</List.Item>
</List>
```

## 选择列表

```tsx
<List>
  <List.Item
    title="选择项 1"
    selectable
    selected={selectedKeys.includes('1')}
    onClick={() => handleSelect('1')}
  />
  <List.Item
    title="选择项 2"
    selectable
    selected={selectedKeys.includes('2')}
    onClick={() => handleSelect('2')}
  />
</List>
```

## 多选列表

```tsx
<List>
  <List.Item
    title="多选项 1"
    selectable
    multiple
    selected={selectedKeys.includes('1')}
    onClick={() => handleMultiSelect('1')}
  />
  <List.Item
    title="多选项 2"
    selectable
    multiple
    selected={selectedKeys.includes('2')}
    onClick={() => handleMultiSelect('2')}
  />
</List>
```

## 加载状态

```tsx
<List loading>
  <List.Item>加载中...</List.Item>
</List>
```

## 自定义渲染

```tsx
<List
  dataSource={data}
  renderItem={(item) => (
    <List.Item key={item.id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={item.avatar} 
          alt={item.title} 
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px' }} 
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>{item.title}</div>
          <div style={{ color: '#6b7280', fontSize: '12px' }}>{item.description}</div>
        </div>
        <div style={{ color: '#4ecdc4', fontSize: '14px' }}>{item.status}</div>
      </div>
    </List.Item>
  )}
/>
```

## API

### List Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| bordered | boolean | false | 是否显示边框 |
| split | boolean | true | 是否显示分割线 |
| size | 'small' \| 'default' \| 'large' | 'default' | 列表大小 |
| loading | boolean | false | 是否加载状态 |
| dataSource | Array\<T\> | [] | 数据源 |
| renderItem | (item: T, index: number) => ReactNode | - | 渲染函数 |
| emptyText | ReactNode | '暂无数据' | 空状态文本 |
| grid | object | - | 网格布局配置 |
| horizontal | boolean | false | 是否水平布局 |
| virtual | boolean | false | 是否虚拟滚动 |
| height | number | - | 虚拟滚动高度 |
| itemHeight | number | - | 虚拟滚动项高度 |
| loadMore | () => void | - | 加载更多函数 |
| hasMore | boolean | false | 是否还有更多数据 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### List.Item Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| avatar | ReactNode | - | 头像 |
| icon | ReactNode | - | 图标 |
| actions | ReactNode[] | - | 操作按钮 |
| extra | ReactNode | - | 额外信息 |
| disabled | boolean | false | 是否禁用 |
| selectable | boolean | false | 是否可选择 |
| selected | boolean | false | 是否选中 |
| multiple | boolean | false | 是否多选 |
| onClick | () => void | - | 点击事件 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Grid 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| gutter | number | 0 | 网格间距 |
| column | number | - | 列数 |
| xs | number | - | 小屏幕列数 |
| sm | number | - | 中等屏幕列数 |
| md | number | - | 大屏幕列数 |
| lg | number | - | 更大屏幕列数 |
| xl | number | - | 超大屏幕列数 |
| xxl | number | - | 超超大屏幕列数 |

## 样式定制

### CSS 变量

```css
:root {
  --list-background: #ffffff;
  --list-border-color: #e5e7eb;
  --list-hover-background: #f9fafb;
  --list-selected-background: #eff6ff;
  --list-disabled-background: #f3f4f6;
  --list-padding: 12px 16px;
  --list-font-size: 14px;
  --list-line-height: 1.5;
}
```

### 自定义样式类

```tsx
<List className="custom-list">
  <List.Item className="custom-list-item">自定义列表项</List.Item>
</List>

<style>
.custom-list {
  border-radius: 8px;
  overflow: hidden;
}

.custom-list-item {
  transition: all 0.3s ease;
}

.custom-list-item:hover {
  background: linear-gradient(90deg, #f0f9ff, #e0f2fe);
}
</style>
```

## 最佳实践

1. **数据展示**：使用列表展示结构化的数据
2. **交互设计**：为可点击的列表项提供视觉反馈
3. **性能优化**：大数据量时使用虚拟滚动
4. **响应式设计**：使用网格布局适应不同屏幕
5. **空状态处理**：为空数据提供友好的提示

## 注意事项

1. 虚拟滚动需要设置固定的高度
2. 网格布局中的列表项宽度自动计算
3. 长列表建议使用分页或虚拟滚动
4. 移动端注意列表项的触摸区域大小

## 示例代码

### 用户列表

```tsx
function UserList() {
  const users = [
    { id: 1, name: '张三', role: '前端开发', status: '在线' },
    { id: 2, name: '李四', role: 'UI设计师', status: '离线' },
    { id: 3, name: '王五', role: '产品经理', status: '忙碌' }
  ]

  return (
    <List
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          key={user.id}
          avatar={`https://example.com/avatar${user.id}.jpg`}
          title={user.name}
          description={user.role}
          extra={
            <Tag size="sm" color={user.status === '在线' ? 'success' : 'default'}>
              {user.status}
            </Tag>
          }
          actions={[
            <Button size="sm">消息</Button>,
            <Button size="sm" type="primary">详情</Button>
          ]}
        />
      )}
    />
  )
}
```

### 任务列表

```tsx
function TaskList() {
  const tasks = [
    { id: 1, title: '完成需求分析', priority: '高', status: '进行中' },
    { id: 2, title: '设计UI界面', priority: '中', status: '待开始' },
    { id: 3, title: '编写测试用例', priority: '低', status: '已完成' }
  ]

  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          key={task.id}
          title={task.title}
          extra={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size="sm" color={
                task.priority === '高' ? 'error' : 
                task.priority === '中' ? 'warning' : 'success'
              }>
                {task.priority}
              </Tag>
              <Tag size="sm" color={
                task.status === '已完成' ? 'success' : 
                task.status === '进行中' ? 'warning' : 'default'
              }>
                {task.status}
              </Tag>
            </div>
          }
          actions={[
            <Button size="sm">编辑</Button>,
            <Button size="sm" type="primary">查看</Button>
          ]}
        />
      )}
    />
  )
}
```

### 商品列表

```tsx
function ProductList() {
  const products = [
    { id: 1, name: '商品1', price: 199, image: 'https://example.com/product1.jpg' },
    { id: 2, name: '商品2', price: 299, image: 'https://example.com/product2.jpg' },
    { id: 3, name: '商品3', price: 399, image: 'https://example.com/product3.jpg' }
  ]

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item key={product.id}>
          <Card>
            <Card.Cover>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
            </Card.Cover>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Text size="lg" weight="bold" color="#ff6b6b">
                ¥{product.price}
              </Text>
            </Card.Body>
            <Card.Actions>
              <Button size="sm" type="primary">购买</Button>
            </Card.Actions>
          </Card>
        </List.Item>
      )}
    />
  )
}
```