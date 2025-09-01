# Breadcrumb 面包屑组件

面包屑组件用于显示当前页面的路径层级，帮助用户了解当前位置并进行导航。

## 基础用法

```tsx
import { Breadcrumb } from 'taro-uno'

// 基础面包屑
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## 分隔符

面包屑支持自定义分隔符。

```tsx
// 自定义分隔符
<Breadcrumb separator="/">
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
</Breadcrumb>

// 图标分隔符
<Breadcrumb separator={<Icon name="arrow-right" />}>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
</Breadcrumb>
```

## 可点击

面包屑支持可点击导航。

```tsx
// 可点击面包屑
<Breadcrumb>
  <Breadcrumb.Item onClick={() => navigateTo('/home')}>
    首页
  </Breadcrumb.Item>
  <Breadcrumb.Item onClick={() => navigateTo('/products')}>
    产品中心
  </Breadcrumb.Item>
  <Breadcrumb.Item onClick={() => navigateTo('/products/phones')}>
    手机
  </Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## 路由配置

面包屑支持路由配置自动生成。

```tsx
// 路由配置
const routes = [
  { path: '/home', breadcrumb: '首页' },
  { path: '/products', breadcrumb: '产品中心' },
  { path: '/products/phones', breadcrumb: '手机' },
  { path: '/products/phones/iphone15', breadcrumb: 'iPhone 15' }
]

// 自动生成面包屑
<Breadcrumb routes={routes} />
```

## 图标支持

面包屑支持图标。

```tsx
// 带图标面包屑
<Breadcrumb>
  <Breadcrumb.Item icon={<Icon name="home" />}>
    首页
  </Breadcrumb.Item>
  <Breadcrumb.Item icon={<Icon name="package" />}>
    产品中心
  </Breadcrumb.Item>
  <Breadcrumb.Item icon={<Icon name="smartphone" />}>
    手机
  </Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## 下拉菜单

面包屑支持下拉菜单。

```tsx
// 下拉菜单面包屑
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>
    产品中心
    <Dropdown>
      <Dropdown.Item>手机</Dropdown.Item>
      <Dropdown.Item>电脑</Dropdown.Item>
      <Dropdown.Item>平板</Dropdown.Item>
    </Dropdown>
  </Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## 响应式设计

面包屑支持响应式设计。

```tsx
// 响应式面包屑
<Breadcrumb responsive={{ xs: 'simple', sm: 'full' }}>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
</Breadcrumb>
```

## 自定义渲染

面包屑支持自定义渲染。

```tsx
// 自定义渲染
<Breadcrumb>
  <Breadcrumb.Item>
    <Link to="/home">
      <Icon name="home" />
      <span>首页</span>
    </Link>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <Link to="/products">
      <Icon name="package" />
      <span>产品中心</span>
    </Link>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <span>iPhone 15</span>
  </Breadcrumb.Item>
</Breadcrumb>
```

## 最大显示数量

面包屑支持最大显示数量。

```tsx
// 最大显示数量
<Breadcrumb maxItems={3}>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
  <Breadcrumb.Item>苹果</Breadcrumb.Item>
  <Breadcrumb.Item>iPhone 15</Breadcrumb.Item>
  <Breadcrumb.Item>Pro Max</Breadcrumb.Item>
</Breadcrumb>
```

## 状态

面包屑支持不同的状态。

```tsx
// 禁用状态
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item disabled>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item>手机</Breadcrumb.Item>
</Breadcrumb>

// 激活状态
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item>产品中心</Breadcrumb.Item>
  <Breadcrumb.Item active>手机</Breadcrumb.Item>
</Breadcrumb>
```

## API

### Breadcrumb Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 面包屑项目 |
| separator | ReactNode | '/' | 分隔符 |
| routes | array | [] | 路由配置 |
| maxItems | number | - | 最大显示数量 |
| responsive | object | - | 响应式配置 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Breadcrumb.Item Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 面包屑内容 |
| href | string | - | 链接地址 |
| target | string | - | 链接目标 |
| icon | ReactNode | - | 图标 |
| disabled | boolean | false | 是否禁用 |
| active | boolean | false | 是否激活 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: ITouchEvent) => void | 点击事件 |
| onNavigate | (path: string) => void | 导航事件 |

## 样式定制

### CSS 变量

```css
:root {
  --breadcrumb-text-color: #6b7280;
  --breadcrumb-active-text-color: #111827;
  --breadcrumb-hover-text-color: #3b82f6;
  --breadcrumb-disabled-text-color: #9ca3af;
  --breadcrumb-separator-color: #d1d5db;
  --breadcrumb-font-size: 14px;
  --breadcrumb-icon-size: 16px;
  --breadcrumb-spacing: 8px;
  --breadcrumb-item-padding: 4px 8px;
  --breadcrumb-item-border-radius: 4px;
  --breadcrumb-item-hover-bg-color: #f3f4f6;
}
```

## 最佳实践

1. **层级清晰**：确保面包屑层级结构清晰，不超过5层
2. **可点击性**：除了当前页面外，其他层级都应该可点击
3. **响应式设计**：在小屏幕上使用简化的面包屑显示
4. **图标辅助**：使用图标增强面包屑的可识别性

## 注意事项

1. 面包屑组件基于 Taro 的 `View` 和 `Text` 组件封装
2. 在移动端考虑使用简化的面包屑或导航栏
3. 确保面包屑的路径与实际的路由结构一致
4. 避免在面包屑中显示过长的文本，考虑使用省略号</think>