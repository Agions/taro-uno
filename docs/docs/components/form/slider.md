---
sidebar_position: 13
---

# Slider 滑动条

滑动输入条组件，用于在数值区间内进行选择。

## 何时使用

- 需要在数值区间内选择值时
- 需要展示当前值和可选范围时

## 代码演示

### 基础用法

```tsx
import { Slider } from 'taro-uno';

function Demo() {
  return <Slider defaultValue={30} />;
}
```

### 设置范围

```tsx
import { Slider } from 'taro-uno';

function Demo() {
  return <Slider min={0} max={100} defaultValue={30} />;
}
```

### 显示标记

```tsx
import { Slider } from 'taro-uno';

function Demo() {
  return <Slider showValue defaultValue={30} />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步进值 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| showValue | 是否显示当前值 | `boolean` | `false` |
| onChange | 值变化回调 | `(value: number) => void` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
