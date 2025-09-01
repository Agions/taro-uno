# Icon 图标组件

图标组件用于显示各种图标，支持多种图标库和自定义图标。

## 基础用法

```tsx
import { Icon } from 'taro-uno'

// 基础图标
<Icon name="home" />
<Icon name="search" />
<Icon name="user" />
```

## 尺寸

图标支持多种尺寸。

```tsx
<Icon name="star" size={16} />
<Icon name="star" size={24} />
<Icon name="star" size={32} />
<Icon name="star" size={48} />
<Icon name="star" size={64} />
```

## 颜色

```tsx
<Icon name="heart" color="#ff6b6b" />
<Icon name="heart" color="#4ecdc4" />
<Icon name="heart" color="#45b7d1" />
<Icon name="heart" color="#96ceb4" />
```

## 旋转

```tsx
<Icon name="refresh" rotate={0} />
<Icon name="refresh" rotate={90} />
<Icon name="refresh" rotate={180} />
<Icon name="refresh" rotate={270} />
```

## 翻转

```tsx
<Icon name="arrow-right" flip="horizontal" />
<Icon name="arrow-right" flip="vertical" />
<Icon name="arrow-right" flip="both" />
```

## 动画

```tsx
<Icon name="spinner" spin />
<Icon name="cog" spin />
<Icon name="heart" pulse />
```

## 自定义图标

```tsx
import { Svg, Path } from '@tarojs/components'

const CustomIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4ecdc4" />
    <Path d="M2 17L12 22L22 17" stroke="#4ecdc4" strokeWidth="2" fill="none" />
    <Path d="M2 12L12 17L22 12" stroke="#4ecdc4" strokeWidth="2" fill="none" />
  </Svg>
)

<Icon component={CustomIcon} />
```

## 图标库

### 内置图标

组件库提供了一些常用图标：

```tsx
// 方向图标
<Icon name="arrow-up" />
<Icon name="arrow-down" />
<Icon name="arrow-left" />
<Icon name="arrow-right" />

// 系统图标
<Icon name="home" />
<Icon name="settings" />
<Icon name="user" />
<Icon name="search" />

// 操作图标
<Icon name="add" />
<Icon name="remove" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="check" />
<Icon name="close" />
```

### 第三方图标库

```tsx
// 使用 Lucide 图标
import { Home, Search, User } from 'lucide-react'

<Icon component={Home} />
<Icon component={Search} />
<Icon component={User} />

// 使用 React Icons
import { FaHome, FaSearch, FaUser } from 'react-icons/fa'

<Icon component={FaHome} />
<Icon component={FaSearch} />
<Icon component={FaUser} />
```

## 可点击图标

```tsx
<Icon 
  name="heart" 
  size={32}
  color="#ff6b6b"
  onClick={() => console.log('点击了图标')}
  style={{ cursor: 'pointer' }}
/>
```

## 工具提示

```tsx
<Icon 
  name="info" 
  title="这是一个信息图标"
  style={{ cursor: 'help' }}
/>
```

## 批量图标

```tsx
<div style={{ display: 'flex', gap: '16px' }}>
  <Icon name="facebook" color="#1877f2" />
  <Icon name="twitter" color="#1da1f2" />
  <Icon name="instagram" color="#e4405f" />
  <Icon name="linkedin" color="#0077b5" />
</div>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string | - | 图标名称 |
| size | number \| string | 24 | 图标尺寸 |
| color | string | - | 图标颜色 |
| rotate | number | - | 旋转角度（度） |
| flip | 'horizontal' \| 'vertical' \| 'both' | - | 翻转方向 |
| spin | boolean | false | 是否旋转动画 |
| pulse | boolean | false | 是否脉冲动画 |
| component | React.ComponentType | - | 自定义图标组件 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |
| onClick | (event: React.MouseEvent) => void | - | 点击事件处理函数 |
| title | string | - | 工具提示文本 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: React.MouseEvent) => void | 点击事件 |
| onMouseEnter | (event: React.MouseEvent) => void | 鼠标进入事件 |
| onMouseLeave | (event: React.MouseEvent) => void | 鼠标离开事件 |

## 样式定制

### CSS 变量

```css
:root {
  --icon-primary-color: #4ecdc4;
  --icon-secondary-color: #6b7280;
  --icon-success-color: #22c55e;
  --icon-warning-color: #f59e0b;
  --icon-error-color: #ef4444;
  --icon-info-color: #3b82f6;
}
```

### 自定义样式类

```tsx
<Icon name="star" className="custom-icon" />

<style>
.custom-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.custom-icon:hover {
  transform: scale(1.1);
}
</style>
```

## 最佳实践

1. **尺寸一致性**：在同一个界面中保持图标尺寸的一致性
2. **颜色含义**：使用颜色传达图标的含义（如红色表示警告）
3. **可访问性**：为图标提供合适的 `title` 或 `aria-label`
4. **性能优化**：避免使用过多的大尺寸图标
5. **动画适度**：适度使用动画效果，避免干扰用户

## 注意事项

1. 图标组件支持多种图标格式：SVG、字体图标、React 组件
2. 自定义图标组件需要提供合适的尺寸和颜色属性
3. 动画效果可能会影响性能，建议在关键操作时使用
4. 在移动端，建议使用较大的图标尺寸以提高可点击性

## 示例代码

### 导航栏图标

```tsx
function Navigation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
      <Icon name="home" size={24} color="#4ecdc4" />
      <Icon name="search" size={24} color="#6b7280" />
      <Icon name="user" size={24} color="#6b7280" />
      <Icon name="settings" size={24} color="#6b7280" />
    </div>
  )
}
```

### 按钮图标

```tsx
function IconButton() {
  return (
    <Button
      icon={<Icon name="add" size={16} />}
      onClick={() => console.log('添加')}
    >
      添加项目
    </Button>
  )
}
```

### 状态图标

```tsx
function StatusIcons() {
  return (
    <div>
      <Icon name="check-circle" size={20} color="#22c55e" /> 成功
      <Icon name="x-circle" size={20} color="#ef4444" /> 失败
      <Icon name="alert-circle" size={20} color="#f59e0b" /> 警告
      <Icon name="info" size={20} color="#3b82f6" /> 信息
    </div>
  )
}
```