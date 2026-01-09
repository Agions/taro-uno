---
sidebar_position: 2
---

# LazyComponent 懒加载

懒加载组件，用于延迟加载组件以优化性能。

## 何时使用

- 需要延迟加载大型组件时
- 需要按需加载组件时
- 需要优化首屏加载性能时

## 代码演示

### 基础用法

```tsx
import { LazyComponent } from 'taro-uno';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

function Demo() {
  return <HeavyComponent />;
}
```

### 自定义加载状态

```tsx
import { LazyComponent } from 'taro-uno';

const HeavyComponent = LazyComponent(
  () => import('./HeavyComponent'),
  { fallback: <div>加载中...</div> }
);

function Demo() {
  return <HeavyComponent />;
}
```

### 预加载

```tsx
import { LazyComponent } from 'taro-uno';

const HeavyComponent = LazyComponent(
  () => import('./HeavyComponent'),
  { preload: true }
);

function Demo() {
  return <HeavyComponent />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loader | 组件加载函数 | `() => Promise<{ default: ComponentType }>` | - |
| fallback | 加载中显示的内容 | `ReactNode` | - |
| preload | 是否预加载 | `boolean` | `false` |
| delay | 延迟显示加载状态的时间 | `number` | `200` |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
