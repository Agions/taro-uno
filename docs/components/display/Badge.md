# Badge 徽章组件

徽章组件用于显示状态、数量或标记，通常附着在其他元素上。

## 基础用法

```tsx
import { Badge } from 'taro-uno'

// 数字徽章
<Badge count={5}>
  <Button>消息</Button>
</Badge>

// 点状徽章
<Badge dot>
  <Button>通知</Button>
</Badge>

// 文字徽章
<Badge text="NEW">
  <Button>商品</Button>
</Badge>
```

## 独立使用

徽章可以独立使用。

```tsx
<Badge count={42} />
<Badge dot />
<Badge text="HOT" />
```

## 颜色

徽章支持多种颜色。

```tsx
<Badge count={5} color="default">默认</Badge>
<Badge count={5} color="primary">主要</Badge>
<Badge count={5} color="success">成功</Badge>
<Badge count={5} color="warning">警告</Badge>
<Badge count={5} color="error">错误</Badge>
<Badge count={5} color="info">信息</Badge>
```

## 形状

徽章支持不同的形状。

```tsx
<Badge count={99} shape="circle">圆形</Badge>
<Badge count={99} shape="rounded">圆角</Badge>
<Badge count={99} shape="square">方形</Badge>
```

## 尺寸

徽章提供多种尺寸。

```tsx
<Badge count={5} size="xs">XS</Badge>
<Badge count={5} size="sm">SM</Badge>
<Badge count={5} size="md">MD</Badge>
<Badge count={5} size="lg">LG</Badge>
<Badge count={5} size="xl">XL</Badge>
```

## 状态

徽章支持不同的状态。

```tsx
<Badge count={5}>正常</Badge>
<Badge count={5} disabled>禁用</Badge>
<Badge count={5} hidden>隐藏</Badge>
```

## 数字格式化

徽章支持数字格式化。

```tsx
<Badge count={5} showZero />
<Badge count={0} showZero={false} />
<Badge count={999} max={99} />
<Badge count={1000} overflowCount={999} />
```

## 位置

徽章可以设置不同的位置。

```tsx
<Badge count={5} position="top-right">右上</Badge>
<Badge count={5} position="top-left">左上</Badge>
<Badge count={5} position="bottom-right">右下</Badge>
<Badge count={5} position="bottom-left">左下</Badge>
```

## 动画效果

徽章支持动画效果。

```tsx
<Badge count={5} animated>动画</Badge>
<Badge count={5} pulse>脉冲</Badge>
```

## 自定义内容

徽章支持自定义内容。

```tsx
<Badge>
  <Icon name="star" />
  <span>收藏</span>
</Badge>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 子元素 |
| count | number | - | 徽章数量 |
| dot | boolean | false | 是否显示点状徽章 |
| text | string | - | 徽章文字 |
| color | string | 'error' | 徽章颜色 |
| shape | 'circle' \| 'rounded' \| 'square' | 'circle' | 徽章形状 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 徽章尺寸 |
| status | 'normal' \| 'disabled' \| 'hidden' | 'normal' | 徽章状态 |
| disabled | boolean | false | 是否禁用 |
| hidden | boolean | false | 是否隐藏 |
| showZero | boolean | false | 数量为0时是否显示 |
| max | number | 99 | 最大显示数量 |
| overflowCount | number | 99 | 溢出显示数量 |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right' | 徽章位置 |
| animated | boolean | false | 是否启用动画 |
| pulse | boolean | false | 是否启用脉冲效果 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onClick | (event: ITouchEvent) => void | 点击事件 |

## 样式定制

### CSS 变量

```css
:root {
  --badge-bg-color: #ef4444;
  --badge-text-color: #ffffff;
  --badge-dot-size: 8px;
  --badge-font-size: 12px;
  --badge-padding: 2px 6px;
  --badge-border-radius: 10px;
  --badge-disabled-opacity: 0.5;
}
```

## 最佳实践

1. **数量提示**：使用数字徽章显示未读消息、购物车数量等
2. **状态提示**：使用点状徽章显示在线状态、新内容等
3. **位置选择**：根据UI设计选择合适的徽章位置
4. **数量限制**：使用 `max` 属性限制显示的最大数量

## 注意事项

1. 徽章组件基于 Taro 的 `View` 和 `Text` 组件封装
2. 当 `count` 为0且 `showZero` 为false时，徽章不显示
3. `dot` 和 `count` 属性同时存在时，优先显示点状徽章
4. 动画效果在低端设备上可能影响性能