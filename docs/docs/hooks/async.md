---
sidebar_position: 5
---

# 异步 Hooks

异步操作相关的 Hooks 集合。

## useRequest

用于管理异步请求的 Hook。

```tsx
import { useRequest } from 'taro-uno';

function Demo() {
  const { data, loading, error, run } = useRequest(
    () => fetch('/api/user').then(res => res.json()),
    { manual: false }
  );

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <p>用户名: {data?.name}</p>
      <button onClick={run}>刷新</button>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| service | 请求函数 | `(...args: P) => Promise<R>` | - |
| options.manual | 是否手动触发 | `boolean` | `false` |
| options.defaultParams | 默认参数 | `P` | - |
| options.onSuccess | 成功回调 | `(data: R) => void` | - |
| options.onError | 失败回调 | `(error: Error) => void` | - |
| options.pollingInterval | 轮询间隔 | `number` | - |
| options.debounceWait | 防抖等待时间 | `number` | - |
| options.throttleWait | 节流等待时间 | `number` | - |

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| data | 请求结果 | `R \| undefined` |
| loading | 加载状态 | `boolean` |
| error | 错误信息 | `Error \| undefined` |
| run | 手动触发请求 | `(...args: P) => Promise<R>` |
| refresh | 使用上次参数重新请求 | `() => Promise<R>` |
| cancel | 取消请求 | `() => void` |

## useMutation

用于管理数据变更操作的 Hook。

```tsx
import { useMutation } from 'taro-uno';

function Demo() {
  const { mutate, loading, error } = useMutation(
    (data) => fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  );

  const handleSubmit = async () => {
    try {
      await mutate({ name: 'John' });
      console.log('提交成功');
    } catch (e) {
      console.error('提交失败', e);
    }
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? '提交中...' : '提交'}
    </button>
  );
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| mutationFn | 变更函数 | `(variables: V) => Promise<R>` |
| options.onSuccess | 成功回调 | `(data: R) => void` |
| options.onError | 失败回调 | `(error: Error) => void` |
| options.onSettled | 完成回调 | `(data: R \| undefined, error: Error \| undefined) => void` |

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| mutate | 触发变更 | `(variables: V) => Promise<R>` |
| loading | 加载状态 | `boolean` |
| error | 错误信息 | `Error \| undefined` |
| data | 返回数据 | `R \| undefined` |
| reset | 重置状态 | `() => void` |
