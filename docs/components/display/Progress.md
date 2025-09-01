# Progress 进度条组件

进度条组件用于显示任务完成进度、加载状态或数值指示器。

## 基础用法

```tsx
import { Progress } from 'taro-uno'

// 线性进度条
<Progress percent={30} />

// 圆形进度条
<Progress type="circle" percent={30} />
```

## 类型

进度条支持多种类型。

```tsx
// 线性进度条
<Progress type="line" percent={30} />

// 圆形进度条
<Progress type="circle" percent={30} />

// 仪表盘进度条
<Progress type="dashboard" percent={30} />

// 半圆进度条
<Progress type="semi-circle" percent={30} />
```

## 尺寸

进度条提供多种尺寸。

```tsx
<Progress percent={30} size="xs" />
<Progress percent={30} size="sm" />
<Progress percent={30} size="md" />
<Progress percent={30} size="lg" />
<Progress percent={30} size="xl" />
```

## 状态

进度条支持不同的状态。

```tsx
<Progress percent={30} status="normal" />
<Progress percent={30} status="success" />
<Progress percent={30} status="warning" />
<Progress percent={30} status="error" />
<Progress percent={30} status="disabled" />
```

## 颜色

进度条支持自定义颜色。

```tsx
<Progress percent={30} color="#3b82f6" />
<Progress percent={30} strokeColor="#10b981" />
<Progress percent={30} trailColor="#e5e7eb" />
```

## 显示信息

进度条可以显示各种信息。

```tsx
// 显示百分比
<Progress percent={30} showInfo />

// 显示格式化文本
<Progress percent={30} format={(percent) => `${percent}% 完成`} />

// 自定义信息
<Progress percent={30}>
  <span>30% 完成</span>
</Progress>
```

## 动画效果

进度条支持动画效果。

```tsx
<Progress percent={30} animated />
<Progress percent={30} animationDuration={2000} />
```

## 分段进度

进度条支持分段显示。

```tsx
<Progress
  percent={60}
  successPercent={40}
  status="success"
/>
```

## 环形进度条

环形进度条支持自定义内容。

```tsx
<Progress type="circle" percent={30}>
  <span style={{ fontSize: '24px' }}>30%</span>
</Progress>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | 'line' \| 'circle' \| 'dashboard' \| 'semi-circle' | 'line' | 进度条类型 |
| percent | number | 0 | 进度百分比 (0-100) |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number | 'md' | 进度条尺寸 |
| status | 'normal' \| 'success' \| 'warning' \| 'error' \| 'disabled' | 'normal' | 进度条状态 |
| showInfo | boolean | true | 是否显示进度信息 |
| format | (percent: number) => ReactNode | - | 自定义格式化函数 |
| strokeWidth | number | - | 进度条宽度 |
| strokeColor | string | - | 进度条颜色 |
| trailColor | string | - | 背景轨道颜色 |
| strokeLinecap | 'round' \| 'square' \| 'butt' | 'round' | 线条端点样式 |
| successPercent | number | - | 成功进度百分比 |
| animated | boolean | true | 是否启用动画 |
| animationDuration | number | 1000 | 动画持续时间 (ms) |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 事件

| 事件名 | 类型 | 说明 |
|--------|------|------|
| onChange | (percent: number) => void | 进度变化事件 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getPercent | - | number | 获取当前进度 |
| setPercent | (percent: number) => void | void | 设置进度 |
| getStatus | - | ProgressStatus | 获取当前状态 |
| setStatus | (status: ProgressStatus) => void | void | 设置状态 |

## 样式定制

### CSS 变量

```css
:root {
  --progress-normal-color: #3b82f6;
  --progress-success-color: #10b981;
  --progress-warning-color: #f59e0b;
  --progress-error-color: #ef4444;
  --progress-disabled-color: #9ca3af;
  --progress-trail-color: #e5e7eb;
  --progress-text-color: #6b7280;
  --progress-border-radius: 4px;
}
```

## 最佳实践

1. **进度反馈**：在长时间操作时显示进度，提升用户体验
2. **状态指示**：使用不同颜色表示操作状态（成功、警告、错误）
3. **合理动画**：使用平滑的动画效果，避免过于突兀的变化
4. **信息展示**：在关键节点显示具体的进度信息

## 注意事项

1. 进度条组件基于 Taro 的 `View` 组件封装
2. `percent` 值应在 0-100 范围内，超出范围会被限制
3. 动画效果在低端设备上可能影响性能
4. 环形进度条在移动端可能占用较多空间