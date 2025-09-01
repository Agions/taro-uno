# Timeline 时间线组件

时间线组件用于展示时间序列事件、工作流程或历史记录。

## 基础用法

```tsx
import { Timeline } from 'taro-uno'

// 基础时间线
<Timeline>
  <Timeline.Item>事件 1</Timeline.Item>
  <Timeline.Item>事件 2</Timeline.Item>
  <Timeline.Item>事件 3</Timeline.Item>
</Timeline>
```

## 方向

时间线支持不同的方向。

```tsx
// 垂直时间线
<Timeline mode="vertical">
  <Timeline.Item>垂直事件 1</Timeline.Item>
  <Timeline.Item>垂直事件 2</Timeline.Item>
</Timeline>

// 水平时间线
<Timeline mode="horizontal">
  <Timeline.Item>水平事件 1</Timeline.Item>
  <Timeline.Item>水平事件 2</Timeline.Item>
</Timeline>
```

## 对齐方式

时间线支持不同的对齐方式。

```tsx
<Timeline mode="vertical" align="left">
  <Timeline.Item>左对齐</Timeline.Item>
  <Timeline.Item>左对齐</Timeline.Item>
</Timeline>

<Timeline mode="vertical" align="right">
  <Timeline.Item>右对齐</Timeline.Item>
  <Timeline.Item>右对齐</Timeline.Item>
</Timeline>

<Timeline mode="vertical" align="alternate">
  <Timeline.Item>交替对齐 1</Timeline.Item>
  <Timeline.Item>交替对齐 2</Timeline.Item>
</Timeline>
```

## 时间线项目

时间线项目支持丰富的配置。

```tsx
<Timeline>
  <Timeline.Item
    color="primary"
    dot={<Icon name="check" />}
    lineType="solid"
    lineStyle={{ borderLeftWidth: '2px' }}
  >
    <div>
      <h4>项目完成</h4>
      <p>2024-01-01 10:00</p>
      <p>项目已成功完成所有开发任务</p>
    </div>
  </Timeline.Item>
</Timeline>
```

## 状态

时间线项目支持不同的状态。

```tsx
<Timeline>
  <Timeline.Item status="waiting">等待中</Timeline.Item>
  <Timeline.Item status="processing">处理中</Timeline.Item>
  <Timeline.Item status="success">成功</Timeline.Item>
  <Timeline.Item status="error">错误</Timeline.Item>
  <Timeline.Item status="disabled">禁用</Timeline.Item>
</Timeline>
```

## 颜色

时间线支持自定义颜色。

```tsx
<Timeline>
  <Timeline.Item color="primary">主要</Timeline.Item>
  <Timeline.Item color="success">成功</Timeline.Item>
  <Timeline.Item color="warning">警告</Timeline.Item>
  <Timeline.Item color="error">错误</Timeline.Item>
  <Timeline.Item color="info">信息</Timeline.Item>
</Timeline>
```

## 自定义节点

时间线支持自定义节点。

```tsx
<Timeline>
  <Timeline.Item dot={<Icon name="check" color="green" />}>
    自定义图标
  </Timeline.Item>
  <Timeline.Item dot={<span style={{ color: 'red' }}>!</span>}>
    自定义文字
  </Timeline.Item>
  <Timeline.Item dot={<img src="avatar.jpg" style={{ width: 20, height: 20, borderRadius: '50%' }} />}>
    自定义图片
  </Timeline.Item>
</Timeline>
```

## 时间线样式

时间线支持不同的线条样式。

```tsx
<Timeline>
  <Timeline.Item lineType="solid">实线</Timeline.Item>
  <Timeline.Item lineType="dashed">虚线</Timeline.Item>
  <Timeline.Item lineType="dotted">点线</Timeline.Item>
  <Timeline.Item lineStyle={{ borderLeftColor: '#3b82f6' }}>自定义颜色</Timeline.Item>
</Timeline>
```

## 响应式设计

时间线支持响应式设计。

```tsx
<Timeline responsive={{ xs: 'vertical', sm: 'horizontal' }}>
  <Timeline.Item>响应式事件 1</Timeline.Item>
  <Timeline.Item>响应式事件 2</Timeline.Item>
</Timeline>
```

## API

### Timeline Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 时间线项目 |
| mode | 'vertical' \| 'horizontal' | 'vertical' | 时间线方向 |
| align | 'left' \| 'right' \| 'alternate' | 'left' | 对齐方式 |
| reverse | boolean | false | 是否反转 |
| pending | boolean \| ReactNode | false | 是否显示加载中 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### Timeline.Item Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 时间线内容 |
| color | string | 'default' | 时间线颜色 |
| status | 'waiting' \| 'processing' \| 'success' \| 'error' \| 'disabled' | 'waiting' | 时间线状态 |
| dot | ReactNode | - | 自定义节点 |
| lineType | 'solid' \| 'dashed' \| 'dotted' | 'solid' | 线条类型 |
| lineStyle | React.CSSProperties | - | 自定义线条样式 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

## 样式定制

### CSS 变量

```css
:root {
  --timeline-color: #3b82f6;
  --timeline-bg-color: #3b82f6;
  --timeline-border-color: #e5e7eb;
  --timeline-text-color: #6b7280;
  --timeline-title-color: #111827;
  --timeline-content-color: #6b7280;
  --timeline-dot-size: 12px;
  --timeline-line-width: 2px;
  --timeline-item-padding: 0 0 20px 0;
  --timeline-item-last-padding: 0;
}
```

## 最佳实践

1. **信息层次**：使用不同的颜色和状态区分事件的重要性
2. **时间信息**：为每个事件提供清晰的时间信息
3. **内容结构**：使用标题和描述结构化事件内容
4. **视觉引导**：使用线条和节点引导用户视线

## 注意事项

1. 时间线组件基于 Taro 的 `View` 组件封装
2. 水平时间线在内容较多时可能影响布局
3. 交替对齐模式需要足够的空间
4. 自定义节点时注意保持合适的尺寸