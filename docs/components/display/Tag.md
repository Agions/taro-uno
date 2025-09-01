# Tag 标签组件

标签组件用于分类、标记或筛选内容，支持多种样式和交互方式。

## 基础用法

```tsx
import { Tag } from 'taro-uno'

// 基础标签
<Tag>默认标签</Tag>

// 可关闭标签
<Tag closable>可关闭</Tag>

// 可选标签
<Tag selectable>可选</Tag>
```

## 类型

标签支持多种类型。

```tsx
<Tag type="default">默认</Tag>
<Tag type="primary">主要</Tag>
<Tag type="success">成功</Tag>
<Tag type="warning">警告</Tag>
<Tag type="error">错误</Tag>
<Tag type="info">信息</Tag>
```

## 变体

标签支持多种视觉变体。

```tsx
<Tag variant="solid">实心</Tag>
<Tag variant="outline">边框</Tag>
<Tag variant="ghost">幽灵</Tag>
<Tag variant="light">浅色</Tag>
```

## 尺寸

标签提供多种尺寸。

```tsx
<Tag size="xs">超小</Tag>
<Tag size="sm">小</Tag>
<Tag size="md">中</Tag>
<Tag size="lg">大</Tag>
<Tag size="xl">超大</Tag>
```

## 形状

标签支持不同的形状。

```tsx
<Tag shape="default">默认</Tag>
<Tag shape="rounded">圆角</Tag>
<Tag shape="pill">药丸</Tag>
<Tag shape="square">方形</Tag>
```

## 状态

标签支持不同的状态。

```tsx
<Tag>正常</Tag>
<Tag disabled>禁用</Tag>
<Tag loading>加载中</Tag>
<Tag selected>选中</Tag>
```

## 交互功能

标签支持多种交互功能。

```tsx
// 可关闭
<Tag closable onClose={() => console.log('关闭')}>可关闭</Tag>

// 可选
<Tag 
  selectable 
  selected={selected}
  onChange={(selected) => setSelected(selected)}
>
  可选
</Tag>

// 可点击
<Tag onClick={() => console.log('点击')}>可点击</Tag>
```

## 图标标签

标签可以包含图标。

```tsx
<Tag icon={<Icon name="check" />}>已完成</Tag>
<Tag closable icon={<Icon name="close" />}>带图标</Tag>
```

## 标签组

标签组用于展示多个相关标签。

```tsx
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
  <Tag>React</Tag>
  <Tag>Vue</Tag>
  <Tag>Angular</Tag>
  <Tag>Svelte</Tag>
</div>
```

## 自定义颜色

标签支持自定义颜色。

```tsx
<Tag color="#ff6b6b">自定义</Tag>
<Tag backgroundColor="#4ecdc4" textColor="#ffffff">
  自定义背景
</Tag>
```

## 动画效果

标签支持动画效果。

```tsx
<Tag animated>动画</Tag>
<Tag pulse>脉冲</Tag>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 标签内容 |
| type | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | 标签类型 |
| variant | 'solid' \| 'outline' \| 'ghost' \| 'light' | 'solid' | 标签变体 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 标签尺寸 |
| shape | 'default' \| 'rounded' \| 'pill' \| 'square' | 'default' | 标签形状 |
| status | 'normal' \| 'disabled' \| 'loading' \| 'selected' | 'normal' | 标签状态 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| selected | boolean | false | 是否选中 |
| closable | boolean | false | 是否可关闭 |
| selectable | boolean | false | 是否可选 |
| animated | boolean | false | 是否启用动画 |
| pulse | boolean | false | 是否启用脉冲效果 |
| icon | ReactNode | - | 图标 |
| color | string | - | 自定义颜色 |
| backgroundColor | string | - | 背景颜色 |
| textColor | string | - | 文字颜色 |
| borderColor | string | - | 边框颜色 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: ITouchEvent) => void | 点击事件 |
| onClose | (event: ITouchEvent) => void | 关闭事件 |
| onChange | (selected: boolean) => void | 选择状态变化事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| close | - | void | 关闭标签 |
| select | (selected: boolean) => void | void | 选择标签 |
| isSelected | - | boolean | 获取选择状态 |
| getType | - | TagType | 获取标签类型 |
| getSize | - | TagSize | 获取标签尺寸 |

## 样式定制

### CSS 变量

```css
:root {
  --tag-default-bg-color: #f3f4f6;
  --tag-default-text-color: #6b7280;
  --tag-default-border-color: #e5e7eb;
  --tag-primary-bg-color: #3b82f6;
  --tag-primary-text-color: #ffffff;
  --tag-success-bg-color: #10b981;
  --tag-success-text-color: #ffffff;
  --tag-warning-bg-color: #f59e0b;
  --tag-warning-text-color: #ffffff;
  --tag-error-bg-color: #ef4444;
  --tag-error-text-color: #ffffff;
  --tag-info-bg-color: #6b7280;
  --tag-info-text-color: #ffffff;
  --tag-disabled-opacity: 0.5;
  --tag-loading-opacity: 0.7;
}
```

## 最佳实践

1. **分类使用**：使用不同类型和颜色区分标签的类别
2. **交互反馈**：为可选标签提供清晰的选中状态反馈
3. **合理布局**：使用合适的间距和排列方式展示多个标签
4. **无障碍访问**：为标签提供合适的语义和描述

## 注意事项

1. 标签组件基于 Taro 的 `View` 和 `Text` 组件封装
2. 关闭功能需要配合 `onClose` 事件使用
3. 选择功能需要配合 `onChange` 事件和 `selected` 属性使用
4. 动画效果在低端设备上可能影响性能