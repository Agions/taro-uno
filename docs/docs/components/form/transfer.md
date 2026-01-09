---
sidebar_position: 15
---

# Transfer 穿梭框

双栏穿梭选择框组件，用于在两栏之间移动元素。

## 何时使用

- 需要在两组数据之间进行选择时
- 需要直观展示选中和未选中项时

## 代码演示

### 基础用法

```tsx
import { Transfer } from 'taro-uno';

const dataSource = [
  { key: '1', title: '选项1' },
  { key: '2', title: '选项2' },
  { key: '3', title: '选项3' },
];

function Demo() {
  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={['1']}
      onChange={(keys) => console.log(keys)}
    />
  );
}
```

### 带搜索

```tsx
import { Transfer } from 'taro-uno';

function Demo() {
  return (
    <Transfer
      dataSource={dataSource}
      showSearch
      filterOption={(input, item) => 
        item.title.includes(input)
      }
    />
  );
}
```

### 自定义渲染

```tsx
import { Transfer } from 'taro-uno';

function Demo() {
  return (
    <Transfer
      dataSource={dataSource}
      render={(item) => item.title}
    />
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `TransferItem[]` | `[]` |
| targetKeys | 右侧框数据的 key 集合 | `string[]` | `[]` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| titles | 标题集合 | `[string, string]` | - |
| render | 自定义渲染函数 | `(item: TransferItem) => ReactNode` | - |
| onChange | 选项变化回调 | `(targetKeys: string[]) => void` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
