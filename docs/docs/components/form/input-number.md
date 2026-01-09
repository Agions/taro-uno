---
sidebar_position: 4
---

# InputNumber 数字输入

数字输入框组件，用于输入数字类型的数据。

## 何时使用

- 需要输入数字时
- 需要限制数字范围时
- 需要步进调整数值时

## 代码演示

### 基础用法

```tsx
import { InputNumber } from 'taro-uno';

function Demo() {
  return <InputNumber defaultValue={3} />;
}
```

### 设置范围

```tsx
import { InputNumber } from 'taro-uno';

function Demo() {
  return <InputNumber min={1} max={10} defaultValue={3} />;
}
```

### 步进器

```tsx
import { InputNumber } from 'taro-uno';

function Demo() {
  return <InputNumber step={0.1} defaultValue={3} />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | `number` | - |
| defaultValue | 默认值 | `number` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步进值 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| onChange | 值变化回调 | `(value: number) => void` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
