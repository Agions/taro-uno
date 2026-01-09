---
sidebar_position: 3
---

# VirtualList 虚拟列表

虚拟滚动列表组件，用于高效渲染大量数据。

## 何时使用

- 需要渲染大量列表数据时
- 需要优化长列表性能时
- 需要实现无限滚动时

## 代码演示

### 基础用法

```tsx
import { VirtualList } from 'taro-uno';

function Demo() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `项目 ${i}`,
  }));

  return (
    <VirtualList
      data={data}
      itemHeight={50}
      renderItem={(item) => (
        <div style={{ height: 50 }}>{item.text}</div>
      )}
    />
  );
}
```

### 动态高度

```tsx
import { VirtualList } from 'taro-uno';

function Demo() {
  return (
    <VirtualList
      data={data}
      estimatedItemHeight={50}
      renderItem={(item, index) => (
        <div>{item.text}</div>
      )}
    />
  );
}
```

### 无限滚动

```tsx
import { VirtualList } from 'taro-uno';

function Demo() {
  const loadMore = async () => {
    // 加载更多数据
  };

  return (
    <VirtualList
      data={data}
      itemHeight={50}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      renderItem={(item) => (
        <div>{item.text}</div>
      )}
    />
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 列表数据 | `T[]` | `[]` |
| itemHeight | 固定项高度 | `number` | - |
| estimatedItemHeight | 预估项高度（动态高度时使用） | `number` | - |
| height | 容器高度 | `number \| string` | `'100%'` |
| overscan | 预渲染数量 | `number` | `5` |
| renderItem | 渲染函数 | `(item: T, index: number) => ReactNode` | - |
| onEndReached | 滚动到底部回调 | `() => void` | - |
| onEndReachedThreshold | 触发加载的阈值 | `number` | `0.5` |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
