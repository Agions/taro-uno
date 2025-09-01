# Space 间距组件

Space组件为子元素提供统一的间距，是布局系统中的重要辅助组件。它可以水平或垂直排列子元素，并自动添加间距。

## 基础用法

```tsx
import { Space, Button } from 'taro-uno'

function BasicSpace() {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  )
}
```

## 间距大小

```tsx
import { Space, Button } from 'taro-uno'

function SizeSpace() {
  return (
    <div>
      {/* 小间距 */}
      <Space size="small">
        <Button>小间距</Button>
        <Button>小间距</Button>
        <Button>小间距</Button>
      </Space>
      
      {/* 中等间距 */}
      <Space size="middle">
        <Button>中等间距</Button>
        <Button>中等间距</Button>
        <Button>中等间距</Button>
      </Space>
      
      {/* 大间距 */}
      <Space size="large">
        <Button>大间距</Button>
        <Button>大间距</Button>
        <Button>大间距</Button>
      </Space>
      
      {/* 自定义间距 */}
      <Space size={32}>
        <Button>32px 间距</Button>
        <Button>32px 间距</Button>
        <Button>32px 间距</Button>
      </Space>
    </div>
  )
}
```

## 方向控制

```tsx
import { Space, Button } from 'taro-uno'

function DirectionSpace() {
  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      {/* 水平排列 */}
      <Space direction="horizontal">
        <Button>水平 1</Button>
        <Button>水平 2</Button>
        <Button>水平 3</Button>
      </Space>
      
      {/* 垂直排列 */}
      <Space direction="vertical">
        <Button>垂直 1</Button>
        <Button>垂直 2</Button>
        <Button>垂直 3</Button>
      </Space>
    </div>
  )
}
```

## 对齐方式

```tsx
import { Space, Button, Card } from 'taro-uno'

function AlignSpace() {
  return (
    <div>
      {/* 起始对齐 */}
      <Space align="start" style={{ width: '100%', background: '#f5f5f5', padding: '16px' }}>
        <Button>起始对齐</Button>
        <Card title="卡片" size="small" style={{ width: '200px' }}>
          卡片内容
        </Card>
        <Button>起始对齐</Button>
      </Space>
      
      {/* 居中对齐 */}
      <Space align="center" style={{ width: '100%', background: '#f5f5f5', padding: '16px' }}>
        <Button>居中对齐</Button>
        <Card title="卡片" size="small" style={{ width: '200px' }}>
          卡片内容
        </Card>
        <Button>居中对齐</Button>
      </Space>
      
      {/* 结束对齐 */}
      <Space align="end" style={{ width: '100%', background: '#f5f5f5', padding: '16px' }}>
        <Button>结束对齐</Button>
        <Card title="卡片" size="small" style={{ width: '200px' }}>
          卡片内容
        </Card>
        <Button>结束对齐</Button>
      </Space>
      
      {/* 拉伸对齐 */}
      <Space align="stretch" style={{ width: '100%', background: '#f5f5f5', padding: '16px' }}>
        <Button>拉伸对齐</Button>
        <Card title="卡片" size="small" style={{ width: '200px' }}>
          卡片内容
        </Card>
        <Button>拉伸对齐</Button>
      </Space>
    </div>
  )
}
```

## 自动换行

```tsx
import { Space, Button } from 'taro-uno'

function WrapSpace() {
  return (
    <div>
      {/* 不换行 */}
      <Space wrap={false} style={{ width: '300px', border: '1px solid #d9d9d9', padding: '8px' }}>
        <Button>不换行按钮 1</Button>
        <Button>不换行按钮 2</Button>
        <Button>不换行按钮 3</Button>
        <Button>不换行按钮 4</Button>
        <Button>不换行按钮 5</Button>
      </Space>
      
      {/* 自动换行 */}
      <Space wrap style={{ width: '300px', border: '1px solid #d9d9d9', padding: '8px' }}>
        <Button>自动换行按钮 1</Button>
        <Button>自动换行按钮 2</Button>
        <Button>自动换行按钮 3</Button>
        <Button>自动换行按钮 4</Button>
        <Button>自动换行按钮 5</Button>
        <Button>自动换行按钮 6</Button>
        <Button>自动换行按钮 7</Button>
      </Space>
    </div>
  )
}
```

## 分隔符

```tsx
import { Space, Button } from 'taro-uno'

function SplitSpace() {
  return (
    <div>
      {/* 默认分隔符 */}
      <Space split>
        <Button>带分隔符 1</Button>
        <Button>带分隔符 2</Button>
        <Button>带分隔符 3</Button>
        <Button>带分隔符 4</Button>
      </Space>
      
      {/* 自定义分隔符 */}
      <Space split={<span style={{ color: '#999' }}>|</span>}>
        <Button>自定义分隔符 1</Button>
        <Button>自定义分隔符 2</Button>
        <Button>自定义分隔符 3</Button>
      </Space>
      
      {/* 垂直分隔符 */}
      <Space direction="vertical" split>
        <Button>垂直分隔符 1</Button>
        <Button>垂直分隔符 2</Button>
        <Button>垂直分隔符 3</Button>
      </Space>
    </div>
  )
}
```

## 阻止间距

```tsx
import { Space, Button } from 'taro-uno'

function NoGapSpace() {
  return (
    <div>
      {/* 阻止间距 */}
      <Space size={16}>
        <Button>有间距</Button>
        <Space.Compact>
          <Button>紧凑组 1</Button>
          <Button>紧凑组 2</Button>
          <Button>紧凑组 3</Button>
        </Space.Compact>
        <Button>有间距</Button>
      </Space>
      
      {/* 垂直紧凑组 */}
      <Space direction="vertical" size={16}>
        <Button>有间距</Button>
        <Space.Compact direction="vertical">
          <Button>垂直紧凑组 1</Button>
          <Button>垂直紧凑组 2</Button>
          <Button>垂直紧凑组 3</Button>
        </Space.Compact>
        <Button>有间距</Button>
      </Space>
    </div>
  )
}
```

## 块级显示

```tsx
import { Space, Button } from 'taro-uno'

function BlockSpace() {
  return (
    <div>
      {/* 内联显示 */}
      <Space style={{ background: '#f5f5f5', padding: '8px' }}>
        <span>内联文本</span>
        <Button>内联按钮</Button>
        <span>内联文本</span>
      </Space>
      
      {/* 块级显示 */}
      <Space block style={{ background: '#f5f5f5', padding: '8px' }}>
        <Button>块级按钮 1</Button>
        <Button>块级按钮 2</Button>
        <Button>块级按钮 3</Button>
      </Space>
    </div>
  )
}
```

## 复杂布局示例

```tsx
import { Space, Button, Card, Input, Select } from 'taro-uno'

function ComplexSpace() {
  return (
    <div>
      {/* 表单布局 */}
      <Card title="表单示例" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <label>用户名：</label>
            <Input placeholder="请输入用户名" style={{ width: '100%' }} />
          </Space>
          
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <label>邮箱：</label>
            <Input placeholder="请输入邮箱" style={{ width: '100%' }} />
          </Space>
          
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <label>角色：</label>
            <Select style={{ width: '100%' }}>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="guest">访客</Select.Option>
            </Select>
          </Space>
          
          <Space>
            <Button type="primary">提交</Button>
            <Button>重置</Button>
            <Button>取消</Button>
          </Space>
        </Space>
      </Card>
      
      {/* 操作按钮组 */}
      <Card title="操作组" style={{ marginBottom: '16px' }}>
        <Space wrap>
          <Button type="primary">主要操作</Button>
          <Button>次要操作</Button>
          <Button>默认操作</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="text">文本按钮</Button>
          <Button type="link">链接按钮</Button>
          <Button danger>危险操作</Button>
        </Space>
      </Card>
      
      {/* 混合布局 */}
      <Card title="混合布局">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="start" style={{ width: '100%' }}>
            <div style={{ minWidth: '100px', fontWeight: 'bold' }}>标签：</div>
            <Space wrap>
              <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>标签 1</span>
              <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>标签 2</span>
              <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>标签 3</span>
              <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>标签 4</span>
            </Space>
          </Space>
          
          <Space align="start" style={{ width: '100%' }}>
            <div style={{ minWidth: '100px', fontWeight: 'bold' }}>描述：</div>
            <div style={{ flex: 1 }}>
              这是一段描述文本，可能会比较长，需要自动换行显示。Space组件可以帮助我们更好地管理这些内容的布局。
            </div>
          </Space>
          
          <Space>
            <Button type="primary">确认</Button>
            <Button>取消</Button>
          </Space>
        </Space>
      </Card>
    </div>
  )
}
```

## API

### Space Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| align | 'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch' | 'center' | 对齐方式 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 间距方向 |
| size | number \| 'small' \| 'middle' \| 'large' | 'small' | 间距大小 |
| wrap | boolean | false | 是否自动换行 |
| split | ReactNode | - | 分隔符 |
| block | boolean | false | 是否块级显示 |

### Space.Compact Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 间距方向 |
| block | boolean | false | 是否块级显示 |

### CSS变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --space-size | 8px | 间距大小 |
| --space-align | center | 对齐方式 |
| --space-direction | horizontal | 间距方向 |

## 最佳实践

### 1. 使用合适的间距大小

```tsx
// 推荐：使用语义化的间距
<Space size="small">
  <Button>小间距按钮</Button>
</Space>

<Space size="middle">
  <Button>中等间距按钮</Button>
</Space>

<Space size="large">
  <Button>大间距按钮</Button>
</Space>

// 避免：使用任意的数值
<Space size={13}>
  <Button>不规范的间距</Button>
</Space>
```

### 2. 合理使用对齐方式

```tsx
// 推荐：根据内容选择合适的对齐方式
<Space align="center">
  <Button>按钮</Button>
  <div>文本内容</div>
</Space>

<Space align="start">
  <Button>按钮</Button>
  <Card title="卡片">内容</Card>
</Space>

// 避免：不合适的对齐方式
<Space align="end">
  <Button>按钮</Button>
  <div>短文本</div>
</Space>
```

### 3. 使用紧凑组

```tsx
// 推荐：使用紧凑组组合相关元素
<Space>
  <Space.Compact>
    <Input placeholder="请输入内容" />
    <Button type="primary">搜索</Button>
  </Space.Compact>
</Space>

// 推荐：垂直紧凑组
<Space direction="vertical">
  <Space.Compact direction="vertical">
    <Input placeholder="用户名" />
    <Input placeholder="密码" />
    <Button type="primary">登录</Button>
  </Space.Compact>
</Space>
```

### 4. 响应式设计

```tsx
// 推荐：在小屏幕上使用垂直布局
<Space direction={{ xs: 'vertical', sm: 'horizontal' }} size={{ xs: 8, sm: 16 }}>
  <Button>响应式按钮 1</Button>
  <Button>响应式按钮 2</Button>
  <Button>响应式按钮 3</Button>
</Space>
```

## 注意事项

1. **性能考虑**：Space组件会为每个子元素添加包装元素，在大量使用时要注意性能
2. **嵌套使用**：避免过深的嵌套，影响性能和可维护性
3. **间距统一**：在整个应用中保持统一的间距规范
4. **可访问性**：确保间距设置不会影响屏幕阅读器的使用
5. **浏览器兼容性**：注意flexbox布局在不同浏览器中的兼容性