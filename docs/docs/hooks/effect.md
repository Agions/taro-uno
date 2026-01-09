---
sidebar_position: 3
---

# 副作用 Hooks

副作用处理相关的 Hooks 集合。

## useDebounce

用于处理防抖值的 Hook。

```tsx
import { useDebounce } from 'taro-uno';

function Demo() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入搜索内容"
      />
      <p>防抖值: {debouncedValue}</p>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 需要防抖的值 | `T` | - |
| wait | 等待时间（毫秒） | `number` | `500` |

## useThrottle

用于处理节流值的 Hook。

```tsx
import { useThrottle } from 'taro-uno';

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 500);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>节流值: {throttledValue}</p>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 需要节流的值 | `T` | - |
| wait | 等待时间（毫秒） | `number` | `500` |

## useDeepCompareEffect

使用深比较的 useEffect。

```tsx
import { useDeepCompareEffect } from 'taro-uno';

function Demo() {
  const [data, setData] = useState({ name: 'test' });

  useDeepCompareEffect(() => {
    console.log('data changed:', data);
  }, [data]);

  return <div>{data.name}</div>;
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| effect | 副作用函数 | `EffectCallback` |
| deps | 依赖数组 | `DependencyList` |

## usePerformance

性能监控 Hook。

```tsx
import { usePerformance } from 'taro-uno';

function Demo() {
  const { startMeasure, endMeasure, getMetrics } = usePerformance();

  const handleClick = () => {
    startMeasure('operation');
    // 执行操作
    endMeasure('operation');
    console.log(getMetrics());
  };

  return <button onClick={handleClick}>执行操作</button>;
}
```

## usePerformanceMonitor

组件性能监控 Hook。

```tsx
import { usePerformanceMonitor } from 'taro-uno';

function Demo() {
  const metrics = usePerformanceMonitor('MyComponent');

  return (
    <div>
      <p>渲染次数: {metrics.renderCount}</p>
      <p>平均渲染时间: {metrics.avgRenderTime}ms</p>
    </div>
  );
}
```
