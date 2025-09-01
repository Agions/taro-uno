# Container 容器组件

容器组件用于提供布局容器，支持流体布局、固定宽度和响应式设计。

## 基础用法

```tsx
import { Container } from 'taro-uno'

// 基础容器
<Container>
  <div>容器内容</div>
</Container>
```

## 类型

容器支持多种类型。

```tsx
// 流体容器
<Container fluid>
  <div>流体容器内容</div>
</Container>

// 固定宽度容器
<Container>
  <div>固定宽度容器内容</div>
</Container>

// 响应式容器
<Container responsive>
  <div>响应式容器内容</div>
</Container>
```

## 尺寸

容器提供多种尺寸。

```tsx
// 超小尺寸
<Container size="xs">
  <div>超小尺寸容器</div>
</Container>

// 小尺寸
<Container size="sm">
  <div>小尺寸容器</div>
</Container>

// 中等尺寸
<Container size="md">
  <div>中等尺寸容器</div>
</Container>

// 大尺寸
<Container size="lg">
  <div>大尺寸容器</div>
</Container>

// 超大尺寸
<Container size="xl">
  <div>超大尺寸容器</div>
</Container>

// 全屏尺寸
<Container size="full">
  <div>全屏尺寸容器</div>
</Container>
```

## 内边距

容器支持自定义内边距。

```tsx
// 固定内边距
<Container padding={16}>
  <div>固定内边距容器</div>
</Container>

// 方向内边距
<Container padding={{ top: 16, bottom: 24, left: 16, right: 16 }}>
  <div>方向内边距容器</div>
</Container>

// 响应式内边距
<Container responsivePadding={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  <div>响应式内边距容器</div>
</Container>
```

## 居中对齐

容器支持内容居中对齐。

```tsx
// 水平居中
<Container center>
  <div>水平居中容器</div>
</Container>

// 垂直居中
<Container center="vertical">
  <div>垂直居中容器</div>
</Container>

// 完全居中
<Container center="both">
  <div>完全居中容器</div>
</Container>
```

## 间距

容器支持自定义间距。

```tsx
// 外边距
<Container margin={16}>
  <div>外边距容器</div>
</Container>

// 内间距
<Container gap={16}>
  <div>内间距容器</div>
  <div>内间距容器</div>
</Container>
```

## 背景色

容器支持自定义背景色。

```tsx
// 预设背景色
<Container backgroundColor="primary">
  <div>主要背景色容器</div>
</Container>

// 自定义背景色
<Container backgroundColor="#f0f9ff">
  <div>自定义背景色容器</div>
</Container>
```

## 边框

容器支持边框样式。

```tsx
// 边框容器
<Container bordered>
  <div>边框容器</div>
</Container>

// 圆角边框
<Container rounded>
  <div>圆角边框容器</div>
</Container>

// 自定义边框
<Container borderStyle="dashed" borderColor="#3b82f6">
  <div>自定义边框容器</div>
</Container>
```

## 阴影

容器支持阴影效果。

```tsx
// 预设阴影
<Container shadow="sm">
  <div>小阴影容器</div>
</Container>

<Container shadow="md">
  <div>中等阴影容器</div>
</Container>

<Container shadow="lg">
  <div>大阴影容器</div>
</Container>

// 自定义阴影
<Container shadowStyle="0 4px 6px rgba(0, 0, 0, 0.1)">
  <div>自定义阴影容器</div>
</Container>
```

## 溢出处理

容器支持溢出处理。

```tsx
// 溢出隐藏
<Container overflow="hidden">
  <div>溢出隐藏容器</div>
</Container>

// 滚动条
<Container overflow="auto">
  <div style={{ height: '200px' }}>
    <div>很长的内容...</div>
    <div>很长的内容...</div>
    <div>很长的内容...</div>
  </div>
</Container>

// 溢出可见
<Container overflow="visible">
  <div>溢出可见容器</div>
</Container>
```

## 响应式断点

容器支持响应式断点。

```tsx
// 响应式容器
<Container
  breakpoints={{
    xs: { width: '100%', padding: 8 },
    sm: { width: '540px', padding: 16 },
    md: { width: '720px', padding: 24 },
    lg: { width: '960px', padding: 32 },
    xl: { width: '1140px', padding: 40 }
  }}
>
  <div>响应式断点容器</div>
</Container>
```

## 嵌套使用

容器支持嵌套使用。

```tsx
// 嵌套容器
<Container size="lg" padding={24}>
  <h2>外层容器</h2>
  <Container size="md" padding={16} backgroundColor="#f0f9ff">
    <h3>内层容器</h3>
    <Container size="sm" padding={8} backgroundColor="#e0f2fe">
      <h4>最内层容器</h4>
      <p>嵌套容器内容</p>
    </Container>
  </Container>
</Container>
```

## 自定义渲染

容器支持自定义渲染。

```tsx
// 自定义渲染
<Container
  render={(props) => (
    <div
      {...props}
      style={{
        ...props.style,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px',
        borderRadius: '12px'
      }}
    >
      <h3>自定义渲染容器</h3>
      {props.children}
    </div>
  )}
>
  <div>容器内容</div>
</Container>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 容器内容 |
| fluid | boolean | false | 是否流体布局 |
| responsive | boolean | false | 是否响应式布局 |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | 容器尺寸 |
| width | number \| string | - | 自定义宽度 |
| height | number \| string | - | 自定义高度 |
| maxWidth | number \| string | - | 最大宽度 |
| minWidth | number \| string | - | 最小宽度 |
| maxHeight | number \| string | - | 最大高度 |
| minHeight | number \| string | - | 最小高度 |
| padding | number \| string \| object | - | 内边距 |
| margin | number \| string \| object | - | 外边距 |
| gap | number \| string | - | 内间距 |
| center | boolean \| 'horizontal' \| 'vertical' \| 'both' | false | 居中对齐 |
| backgroundColor | string | - | 背景色 |
| bordered | boolean | false | 是否显示边框 |
| rounded | boolean \| number \| string | false | 是否圆角 |
| borderStyle | string | 'solid' | 边框样式 |
| borderColor | string | - | 边框颜色 |
| borderWidth | number \| string | - | 边框宽度 |
| shadow | string \| 'none' | 'none' | 阴影效果 |
| shadowStyle | string \| object | - | 自定义阴影 |
| overflow | 'visible' \| 'hidden' \| 'auto' \| 'scroll' | 'visible' | 溢出处理 |
| responsivePadding | object | - | 响应式内边距 |
| breakpoints | object | - | 响应式断点 |
| className | string | - | 自定义样式类名 |
| style | React.CSSProperties | - | 自定义样式 |
| render | (props: ContainerProps) => ReactNode | - | 自定义渲染函数 |

### Ref 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getSize | - | string | 获取容器尺寸 |
| setSize | (size: string) => void | void | 设置容器尺寸 |
| getWidth | - | number \| string | 获取容器宽度 |
| setWidth | (width: number \| string) => void | void | 设置容器宽度 |
| getHeight | - | number \| string | 获取容器高度 |
| setHeight | (height: number \| string) => void | void | 设置容器高度 |
| getPadding | - | number \| string \| object | 获取内边距 |
| setPadding | (padding: number \| string \| object) => void | void | 设置内边距 |
| getMargin | - | number \| string \| object | 获取外边距 |
| setMargin | (margin: number \| string \| object) => void | void | 设置外边距 |
| getBackgroundColor | - | string | 获取背景色 |
| setBackgroundColor | (color: string) => void | void | 设置背景色 |
| toggleFluid | - | void | 切换流体布局 |
| isFluid | - | boolean | 获取流体布局状态 |
| toggleResponsive | - | void | 切换响应式布局 |
| isResponsive | - | boolean | 获取响应式布局状态 |
| getBreakpoint | - | string | 获取当前断点 |
| scrollTo | (options: ScrollToOptions) => void | void | 滚动到指定位置 |

## 样式定制

### CSS 变量

```css
:root {
  --container-xs-width: 100%;
  --container-sm-width: 540px;
  --container-md-width: 720px;
  --container-lg-width: 960px;
  --container-xl-width: 1140px;
  --container-full-width: 100%;
  --container-bg-color: #ffffff;
  --container-text-color: #111827;
  --container-border-color: #e5e7eb;
  --container-border-radius: 8px;
  --container-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --container-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --container-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --container-padding-xs: 8px;
  --container-padding-sm: 16px;
  --container-padding-md: 24px;
  --container-padding-lg: 32px;
  --container-padding-xl: 40px;
  --container-gap-xs: 8px;
  --container-gap-sm: 16px;
  --container-gap-md: 24px;
  --container-gap-lg: 32px;
  --container-gap-xl: 40px;
}
```

## 最佳实践

1. **合适的尺寸**：根据内容类型选择合适的容器尺寸
2. **响应式设计**：使用响应式容器适配不同屏幕尺寸
3. **合理的间距**：使用合适的内边距和外边距提升可读性
4. **性能优化**：避免在容器内使用过多的嵌套和复杂的样式

## 注意事项

1. 容器组件基于 Taro 的 `View` 组件封装
2. 流体容器会占据整个父容器的宽度
3. 响应式容器会根据屏幕尺寸自动调整宽度
4. 在移动端考虑使用较小的内边距和间距