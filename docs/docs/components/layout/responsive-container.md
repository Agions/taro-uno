---
sidebar_position: 8
---

# ResponsiveContainer 响应容器

响应式容器组件，根据屏幕尺寸自动调整布局。

## 何时使用

- 需要根据屏幕尺寸调整内容布局时
- 需要实现响应式设计时

## 代码演示

### 基础用法

```tsx
import { ResponsiveContainer } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveContainer>
      <div>响应式内容</div>
    </ResponsiveContainer>
  );
}
```

### 断点配置

```tsx
import { ResponsiveContainer } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveContainer
      breakpoints={{
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      }}
    >
      <div>响应式内容</div>
    </ResponsiveContainer>
  );
}
```

### 条件渲染

```tsx
import { ResponsiveContainer } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveContainer>
      {({ breakpoint }) => (
        <div>
          当前断点: {breakpoint}
        </div>
      )}
    </ResponsiveContainer>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoints | 断点配置 | `Record<string, number>` | 默认断点 |
| children | 子元素或渲染函数 | `ReactNode \| ((context: ResponsiveContext) => ReactNode)` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
