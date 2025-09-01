# Avatar 头像组件

头像组件用于显示用户头像、图标或占位符，支持多种形状和尺寸。

## 基础用法

```tsx
import { Avatar } from 'taro-uno'

// 基础头像
<Avatar>U</Avatar>

// 图片头像
<Avatar src="https://example.com/avatar.jpg" />

// 图标头像
<Avatar icon={<Icon name="user" />} />
```

## 形状

头像支持多种形状。

```tsx
<Avatar shape="circle">U</Avatar>
<Avatar shape="square">U</Avatar>
<Avatar shape="rounded">U</Avatar>
```

## 尺寸

头像提供多种尺寸。

```tsx
<Avatar size="xs">XS</Avatar>
<Avatar size="sm">SM</Avatar>
<Avatar size="md">MD</Avatar>
<Avatar size="lg">LG</Avatar>
<Avatar size="xl">XL</Avatar>
```

## 状态

头像支持不同的状态。

```tsx
<Avatar>正常</Avatar>
<Avatar disabled>禁用</Avatar>
<Avatar loading>加载中</Avatar>
```

## 组合使用

头像可以与其他组件组合使用。

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Avatar size="sm">U</Avatar>
  <div>
    <div style={{ fontWeight: 'bold' }}>用户名</div>
    <div style={{ fontSize: '12px', color: '#666' }}>user@example.com</div>
  </div>
</div>
```

## 头像组

头像组用于显示多个用户头像。

```tsx
<div style={{ display: 'flex' }}>
  <Avatar style={{ marginLeft: '-8px' }}>A</Avatar>
  <Avatar style={{ marginLeft: '-8px' }}>B</Avatar>
  <Avatar style={{ marginLeft: '-8px' }}>C</Avatar>
  <Avatar style={{ marginLeft: '-8px' }}>+5</Avatar>
</div>
```

## 徽章

头像可以配合徽章使用。

```tsx
<Avatar>
  U
  <Badge dot />
</Avatar>

<Avatar>
  U
  <Badge count={5} />
</Avatar>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 头像内容 |
| src | string | - | 图片地址 |
| icon | ReactNode | - | 图标 |
| shape | 'circle' \| 'square' \| 'rounded' | 'circle' | 头像形状 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number | 'md' | 头像尺寸 |
| status | 'normal' \| 'disabled' \| 'loading' | 'normal' | 头像状态 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| alt | string | - | 图片替代文本 |
| onError | () => void | - | 图片加载失败回调 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: ITouchEvent) => void | 点击事件 |
| onPressIn | (event: ITouchEvent) => void | 按下事件 |
| onPressOut | (event: ITouchEvent) => void | 按起事件 |
| onLongPress | (event: ITouchEvent) => void | 长按事件 |

## 样式定制

### CSS 变量

```css
:root {
  --avatar-bg-color: #f3f4f6;
  --avatar-text-color: #6b7280;
  --avatar-border-color: #e5e7eb;
  --avatar-disabled-opacity: 0.5;
  --avatar-loading-opacity: 0.7;
}
```

## 最佳实践

1. **使用真实头像**：优先使用用户真实头像，提升识别度
2. **备用方案**：提供文字或图标作为图片加载失败的备用方案
3. **尺寸一致性**：在同一界面中保持头像尺寸的一致性
4. **无障碍访问**：为图片头像提供合适的 `alt` 文本

## 注意事项

1. 头像组件基于 Taro 的 `Image` 和 `View` 组件封装
2. 当同时提供 `children` 和 `src` 时，优先使用 `src`
3. 加载状态会显示加载动画，并禁用交互
4. 图片加载失败时会自动显示 `children` 内容