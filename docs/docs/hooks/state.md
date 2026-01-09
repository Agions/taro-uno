---
sidebar_position: 2
---

# 状态 Hooks

状态管理相关的 Hooks 集合。

## useBoolean

管理布尔值状态的 Hook。

```tsx
import { useBoolean } from 'taro-uno';

function Demo() {
  const [visible, { setTrue, setFalse, toggle }] = useBoolean(false);

  return (
    <div>
      <p>状态: {visible ? '显示' : '隐藏'}</p>
      <button onClick={setTrue}>显示</button>
      <button onClick={setFalse}>隐藏</button>
      <button onClick={toggle}>切换</button>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认值 | `boolean` | `false` |

### 返回值

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| state | 当前状态 | `boolean` |
| actions.setTrue | 设置为 true | `() => void` |
| actions.setFalse | 设置为 false | `() => void` |
| actions.toggle | 切换状态 | `() => void` |

## useToggle

在两个状态值之间切换的 Hook。

```tsx
import { useToggle } from 'taro-uno';

function Demo() {
  const [state, { toggle, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <p>当前值: {state}</p>
      <button onClick={toggle}>切换</button>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| defaultValue | 默认值 | `T` |
| reverseValue | 反转值 | `U` |

## useCounter

管理计数器的 Hook。

```tsx
import { useCounter } from 'taro-uno';

function Demo() {
  const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => inc()}>+1</button>
      <button onClick={() => dec()}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValue | 初始值 | `number` | `0` |
| options.min | 最小值 | `number` | - |
| options.max | 最大值 | `number` | - |

## usePrevious

保存上一次渲染时的值。

```tsx
import { usePrevious } from 'taro-uno';

function Demo() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div>
      <p>当前值: {count}</p>
      <p>上一个值: {previous}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

## useStorage

管理本地存储的 Hook。

```tsx
import { useStorage } from 'taro-uno';

function Demo() {
  const [value, setValue, remove] = useStorage('my-key', 'default');

  return (
    <div>
      <p>存储值: {value}</p>
      <button onClick={() => setValue('new value')}>更新</button>
      <button onClick={remove}>删除</button>
    </div>
  );
}
```

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| key | 存储键名 | `string` |
| defaultValue | 默认值 | `T` |
