# Button 按钮组件

按钮组件是用户界面中最常用的交互元素之一，用于触发操作或提交表单。

## 基础用法

```tsx
import { Button } from 'taro-uno'

// 基础按钮
<Button>默认按钮</Button>

// 主要按钮
<Button type="primary">主要按钮</Button>

// 危险按钮
<Button danger>危险按钮</Button>
```

## 类型

按钮支持多种类型，用于区分不同的重要性和用途。

```tsx
<Button type="default">默认</Button>
<Button type="primary">主要</Button>
<Button type="secondary">次要</Button>
<Button type="success">成功</Button>
<Button type="warning">警告</Button>
<Button type="error">错误</Button>
<Button type="info">信息</Button>
```

## 变体

按钮支持多种视觉变体。

```tsx
<Button variant="solid">实心</Button>
<Button variant="outline">边框</Button>
<Button variant="ghost">幽灵</Button>
<Button variant="text">文本</Button>
```

## 尺寸

按钮提供五种尺寸：xs、sm、md、lg、xl。

```tsx
<Button size="xs">超小</Button>
<Button size="sm">小</Button>
<Button size="md">中</Button>
<Button size="lg">大</Button>
<Button size="xl">超大</Button>
```

## 形状

按钮支持不同的形状。

```tsx
<Button shape="default">默认</Button>
<Button shape="rounded">圆角</Button>
<Button shape="circle">圆形</Button>
<Button shape="square">方形</Button>
```

## 状态

按钮支持不同的状态。

```tsx
<Button>正常</Button>
<Button loading>加载中</Button>
<Button disabled>禁用</Button>
```

## 块级按钮

```tsx
<Button block>块级按钮</Button>
```

## 图标按钮

```tsx
import { Icon } from 'taro-uno'

// 图标在左侧
<Button icon={<Icon name="search" />}>搜索</Button>

// 图标在右侧
<Button icon={<Icon name="arrow-right" />} iconPosition="right">
  下一步
</Button>

// 纯图标按钮
<Button shape="circle" icon={<Icon name="close" />} />
```

## 涟漪效果

```tsx
<Button ripple>点击有涟漪效果</Button>
```

## 阴影效果

```tsx
<Button shadow>带阴影的按钮</Button>
```

## 按钮组

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</div>
```

## 自定义颜色

```tsx
<Button color="#ff6b6b">自定义颜色</Button>
<Button backgroundColor="#4ecdc4" textColor="#ffffff">
  自定义背景和文字
</Button>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 按钮内容 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 按钮尺寸 |
| type | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default' | 按钮类型 |
| variant | 'solid' \| 'outline' \| 'ghost' \| 'text' | 'solid' | 按钮变体 |
| shape | 'default' \| 'rounded' \| 'circle' \| 'square' | 'default' | 按钮形状 |
| status | 'normal' \| 'loading' \| 'disabled' \| 'active' | 'normal' | 按钮状态 |
| block | boolean | false | 是否块级显示 |
| danger | boolean | false | 是否危险操作 |
| loading | boolean | false | 是否显示加载状态 |
| disabled | boolean | false | 是否禁用 |
| icon | ReactNode | - | 图标 |
| iconPosition | 'left' \| 'right' | 'left' | 图标位置 |
| className | string | - | 自定义样式类名 |
| onClick | (event: ITouchEvent) => void | - | 点击事件处理函数 |
| onPressIn | (event: ITouchEvent) => void | - | 按下事件处理函数 |
| onPressOut | (event: ITouchEvent) => void | - | 按起事件处理函数 |
| onLongPress | (event: ITouchEvent) => void | - | 长按事件处理函数 |
| style | React.CSSProperties | - | 自定义按钮样式 |
| loadingText | string | '加载中...' | 加载状态文字 |
| ripple | boolean | false | 是否显示涟漪效果 |
| shadow | boolean | false | 是否显示阴影 |
| bordered | boolean | true | 是否有边框 |
| color | string | - | 自定义主题颜色 |
| backgroundColor | string | - | 背景颜色 |
| textColor | string | - | 文字颜色 |
| borderColor | string | - | 边框颜色 |
| animationDuration | number | 300 | 动画持续时间 |
| accessible | boolean | true | 是否启用无障碍访问 |
| accessibilityLabel | string | - | 无障碍标签 |
| accessibilityRole | string | 'button' | 无障碍角色 |
| accessibilityState | object | - | 无障碍状态 |

### Ref

按钮组件暴露了一些方法供外部调用：

```tsx
import { useRef } from 'react'
import { Button } from 'taro-uno'

const buttonRef = useRef()

// 使用ref方法
buttonRef.current?.click()
buttonRef.current?.setDisabled(true)
buttonRef.current?.setLoading(true)
const status = buttonRef.current?.getStatus()
```

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| click | - | void | 触发点击事件 |
| setDisabled | disabled: boolean | void | 设置禁用状态 |
| setLoading | loading: boolean | void | 设置加载状态 |
| getStatus | - | ButtonStatus | 获取按钮状态 |
| getSize | - | ButtonSize | 获取按钮尺寸 |
| getType | - | ButtonType | 获取按钮类型 |
| getVariant | - | ButtonVariant | 获取按钮变体 |

## 样式定制

### CSS 变量

```css
:root {
  --button-primary-color: #0ea5e9;
  --button-secondary-color: #6b7280;
  --button-success-color: #22c55e;
  --button-warning-color: #f59e0b;
  --button-error-color: #ef4444;
  --button-info-color: #3b82f6;
  --button-text-color: #111827;
  --button-border-color: #e5e7eb;
  --button-disabled-opacity: 0.5;
  --button-loading-opacity: 0.7;
  --button-animation-duration: 300ms;
}
```

### 自定义样式类

```tsx
<Button className="custom-button">
  自定义按钮
</Button>

<style>
.custom-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-weight: bold;
}
</style>
```

## 最佳实践

1. **主要操作**：使用 `type="primary"` 突出显示主要操作
2. **危险操作**：使用 `danger` 属性标记危险操作
3. **加载状态**：异步操作时显示加载状态，防止重复提交
4. **禁用状态**：表单验证失败时禁用提交按钮
5. **无障碍访问**：为按钮提供合适的 `accessibilityLabel`

## 注意事项

1. 按钮组件基于 Taro 的 `Button` 组件封装，支持所有 Taro 原生属性
2. 涟漪效果在移动端性能消耗较大，建议谨慎使用
3. 自定义颜色时，建议保持良好的对比度以确保可读性
4. 加载状态会覆盖按钮的点击事件，确保用户无法重复操作