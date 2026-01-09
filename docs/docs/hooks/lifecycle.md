---
sidebar_position: 7
---

# 生命周期 Hooks

组件生命周期相关的 Hooks 集合。

## useMount

组件挂载时执行的 Hook。

```tsx
import { useMount } from 'taro-uno';

function Demo() {
  useMount(() => {
    console.log('组件已挂载');
    // 初始化操作
  });

  return <div>Hello</div>;
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| fn | 挂载时执行的函数 | `() => void` |

## useUnmount

组件卸载时执行的 Hook。

```tsx
import { useUnmount } from 'taro-uno';

function Demo() {
  useUnmount(() => {
    console.log('组件即将卸载');
    // 清理操作
  });

  return <div>Hello</div>;
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| fn | 卸载时执行的函数 | `() => void` |

## 使用示例

### 组合使用

```tsx
import { useMount, useUnmount } from 'taro-uno';

function Demo() {
  const [data, setData] = useState(null);
  const timerRef = useRef(null);

  useMount(() => {
    // 组件挂载时开始轮询
    timerRef.current = setInterval(() => {
      fetchData().then(setData);
    }, 5000);
    
    // 立即获取一次数据
    fetchData().then(setData);
  });

  useUnmount(() => {
    // 组件卸载时清除定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  });

  return <div>{data ? JSON.stringify(data) : '加载中...'}</div>;
}
```

### 与其他 Hooks 配合

```tsx
import { useMount, useUnmount, useBoolean } from 'taro-uno';

function Demo() {
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  useMount(() => {
    // 延迟显示内容
    setTimeout(setTrue, 1000);
  });

  useUnmount(() => {
    // 清理状态
    setFalse();
  });

  return visible ? <div>内容已加载</div> : <div>加载中...</div>;
}
```

## 注意事项

1. `useMount` 只在组件首次挂载时执行一次
2. `useUnmount` 只在组件卸载时执行一次
3. 这两个 Hook 内部使用 `useEffect` 实现，遵循 React 的生命周期规则
4. 在严格模式下，`useMount` 可能会执行两次（开发环境）
