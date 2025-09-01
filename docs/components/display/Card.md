# Card 卡片组件

卡片组件用于展示相关信息的容器，支持多种布局和样式。

## 基础用法

```tsx
import { Card } from 'taro-uno'

// 基础卡片
<Card>
  <Card.Header>
    <Card.Title>卡片标题</Card.Title>
  </Card.Header>
  <Card.Body>
    这是卡片的主要内容区域
  </Card.Body>
</Card>
```

## 卡片类型

```tsx
// 基础卡片
<Card type="default">
  <Card.Body>默认卡片</Card.Body>
</Card>

// 主要卡片
<Card type="primary">
  <Card.Body>主要卡片</Card.Body>
</Card>

// 次要卡片
<Card type="secondary">
  <Card.Body>次要卡片</Card.Body>
</Card>
```

## 带边框卡片

```tsx
<Card bordered>
  <Card.Body>带边框的卡片</Card.Body>
</Card>

<Card bordered={false}>
  <Card.Body>无边框的卡片</Card.Body>
</Card>
```

## 阴影效果

```tsx
<Card shadow={false}>无阴影</Card>
<Card shadow="sm">小阴影</Card>
<Card shadow="md">中等阴影</Card>
<Card shadow="lg">大阴影</Card>
```

## 圆角

```tsx
<Card radius="none">无圆角</Card>
<Card radius="sm">小圆角</Card>
<Card radius="md">中等圆角</Card>
<Card radius="lg">大圆角</Card>
<Card radius="full">完全圆角</Card>
```

## 悬停效果

```tsx
<Card hoverable>
  <Card.Body>悬停有阴影效果</Card.Body>
</Card>
```

## 加载状态

```tsx
<Card loading>
  <Card.Body>加载中的卡片</Card.Body>
</Card>
```

## 网格布局

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
  <Card>
    <Card.Body>卡片1</Card.Body>
  </Card>
  <Card>
    <Card.Body>卡片2</Card.Body>
  </Card>
  <Card>
    <Card.Body>卡片3</Card.Body>
  </Card>
</div>
```

## 头部和底部

```tsx
<Card>
  <Card.Header>
    <Card.Title>卡片标题</Card.Title>
    <Card.Extra>额外信息</Card.Extra>
  </Card.Header>
  <Card.Body>
    这是卡片的主要内容区域
  </Card.Body>
  <Card.Footer>
    <Button size="sm">操作按钮</Button>
  </Card.Footer>
</Card>
```

## 覆盖层

```tsx
<Card>
  <Card.Cover>
    <img src="https://example.com/image.jpg" alt="封面" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
  </Card.Cover>
  <Card.Body>
    带封面的卡片
  </Card.Body>
</Card>
```

## 操作区域

```tsx
<Card>
  <Card.Body>
    卡片内容
  </Card.Body>
  <Card.Actions>
    <Button size="sm" type="primary">主要操作</Button>
    <Button size="sm">次要操作</Button>
  </Card.Actions>
</Card>
```

## 元信息

```tsx
<Card>
  <Card.Meta
    title="张三"
    description="前端开发工程师"
    avatar="https://example.com/avatar.jpg"
  />
  <Card.Body>
    用户详细信息
  </Card.Body>
</Card>
```

## 标签

```tsx
<Card>
  <Card.Header>
    <Card.Title>带标签的卡片</Card.Title>
    <Card.Tags>
      <Tag size="sm">标签1</Tag>
      <Tag size="sm">标签2</Tag>
    </Card.Tags>
  </Card.Header>
  <Card.Body>
    卡片内容
  </Card.Body>
</Card>
```

## 统计卡片

```tsx
<Card>
  <Card.Statistic
    title="总销售额"
    value="¥126,560"
    precision={2}
    prefix="¥"
    suffix="元"
    status="up"
  />
</Card>
```

## 时间线卡片

```tsx
<Card>
  <Card.Timeline>
    <Card.Timeline.Item>2024-01-01 项目启动</Card.Timeline.Item>
    <Card.Timeline.Item>2024-02-01 需求分析</Card.Timeline.Item>
    <Card.Timeline.Item>2024-03-01 开发完成</Card.Timeline.Item>
  </Card.Timeline>
</Card>
```

## 可折叠卡片

```tsx
<Card collapsible defaultCollapsed={false}>
  <Card.Header>
    <Card.Title>可折叠卡片</Card.Title>
  </Card.Header>
  <Card.Body>
    这是可以折叠的内容
  </Card.Body>
</Card>
```

## 选项卡卡片

```tsx
<Card>
  <Card.Tabs>
    <Card.Tabs.TabPane tab="标签1" key="1">
      内容1
    </Card.Tabs.TabPane>
    <Card.Tabs.TabPane tab="标签2" key="2">
      内容2
    </Card.Tabs.TabPane>
  </Card.Tabs>
</Card>
```

## API

### Card Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | 'default' \| 'primary' \| 'secondary' | 'default' | 卡片类型 |
| bordered | boolean | true | 是否显示边框 |
| shadow | boolean \| 'sm' \| 'md' \| 'lg' | 'md' | 阴影效果 |
| radius | 'none' \| 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | 圆角大小 |
| hoverable | boolean | false | 是否悬停效果 |
| loading | boolean | false | 是否加载状态 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Header Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Body Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Footer Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Title Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| level | number | 3 | 标题级别 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Extra Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Cover Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Actions Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Meta Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| avatar | ReactNode | - | 头像 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Card.Statistic Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| value | ReactNode | - | 数值 |
| precision | number | - | 小数位数 |
| prefix | ReactNode | - | 前缀 |
| suffix | ReactNode | - | 后缀 |
| status | 'up' \| 'down' \| 'normal' | 'normal' | 状态 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

## 样式定制

### CSS 变量

```css
:root {
  --card-background: #ffffff;
  --card-border-color: #e5e7eb;
  --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --card-radius: 8px;
  --card-padding: 16px;
  --card-header-background: #f9fafb;
  --card-footer-background: #f9fafb;
}
```

### 自定义样式类

```tsx
<Card className="custom-card">
  <Card.Body>自定义卡片</Card.Body>
</Card>

<style>
.custom-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-card .card-body {
  color: white;
}
</style>
```

## 最佳实践

1. **内容分组**：使用卡片将相关内容分组，提高信息组织性
2. **视觉层次**：通过阴影和圆角建立视觉层次
3. **响应式设计**：使用网格布局适应不同屏幕尺寸
4. **交互反馈**：添加悬停效果提供交互反馈
5. **加载状态**：为异步加载的卡片提供加载状态

## 注意事项

1. 卡片内容不宜过多，保持简洁明了
2. 避免嵌套过深的卡片结构
3. 注意移动端的卡片间距和触摸区域
4. 阴影效果可能会影响性能，建议适度使用

## 示例代码

### 用户信息卡片

```tsx
function UserCard() {
  return (
    <Card>
      <Card.Meta
        title="张三"
        description="前端开发工程师"
        avatar="https://example.com/avatar.jpg"
      />
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Text type="secondary">邮箱</Text>
          <Text>zhangsan@example.com</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Text type="secondary">电话</Text>
          <Text>138****8888</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text type="secondary">地址</Text>
          <Text>北京市朝阳区</Text>
        </div>
      </Card.Body>
      <Card.Actions>
        <Button size="sm">编辑</Button>
        <Button size="sm" type="primary">详情</Button>
      </Card.Actions>
    </Card>
  )
}
```

### 产品卡片

```tsx
function ProductCard() {
  return (
    <Card hoverable>
      <Card.Cover>
        <img 
          src="https://example.com/product.jpg" 
          alt="产品图片" 
          style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        />
      </Card.Cover>
      <Card.Header>
        <Card.Title>产品名称</Card.Title>
        <Card.Extra>
          <Tag size="sm" color="success">热销</Tag>
        </Card.Extra>
      </Card.Header>
      <Card.Body>
        <Text paragraph>
          这是产品的详细描述，包含产品特点、功能等信息。
        </Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="lg" weight="bold" color="#ff6b6b">¥199.00</Text>
          <Text type="secondary" decoration="line-through">¥299.00</Text>
        </div>
      </Card.Body>
      <Card.Actions>
        <Button size="sm" type="primary">立即购买</Button>
        <Button size="sm">加入购物车</Button>
      </Card.Actions>
    </Card>
  )
}
```

### 数据统计卡片

```tsx
function StatisticsCard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      <Card>
        <Card.Body>
          <Card.Statistic
            title="总用户数"
            value="1,234"
            status="up"
          />
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Card.Statistic
            title="活跃用户"
            value="856"
            status="up"
          />
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Card.Statistic
            title="新增用户"
            value="123"
            status="down"
          />
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Card.Statistic
            title="转化率"
            value="68.5%"
            precision={1}
            status="up"
          />
        </Card.Body>
      </Card>
    </div>
  )
}
```