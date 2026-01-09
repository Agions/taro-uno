---
sidebar_position: 9
---

# ResponsiveGrid 响应栅格

响应式栅格组件，根据屏幕尺寸自动调整列数。

## 何时使用

- 需要根据屏幕尺寸调整栅格列数时
- 需要实现响应式网格布局时

## 代码演示

### 基础用法

```tsx
import { ResponsiveGrid } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveGrid>
      <div>项目1</div>
      <div>项目2</div>
      <div>项目3</div>
      <div>项目4</div>
    </ResponsiveGrid>
  );
}
```

### 响应式列数

```tsx
import { ResponsiveGrid } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveGrid
      cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gap={16}
    >
      <div>项目1</div>
      <div>项目2</div>
      <div>项目3</div>
      <div>项目4</div>
    </ResponsiveGrid>
  );
}
```

### 自定义间距

```tsx
import { ResponsiveGrid } from 'taro-uno';

function Demo() {
  return (
    <ResponsiveGrid
      cols={3}
      gap={{ row: 16, col: 24 }}
    >
      <div>项目1</div>
      <div>项目2</div>
      <div>项目3</div>
    </ResponsiveGrid>
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数配置 | `number \| ResponsiveCols` | `{ xs: 1, sm: 2, md: 3, lg: 4 }` |
| gap | 间距 | `number \| { row: number; col: number }` | `0` |
| children | 子元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
