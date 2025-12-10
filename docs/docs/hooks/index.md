# Hooks相关文档

本模块系统梳理了项目中所有自定义Hooks的功能描述、参数说明、返回值类型、使用示例、注意事项及适用场景，确保文档结构清晰、内容准确、易于检索，并保持与代码实现的同步更新。

## 目录

- [Hooks 简介](#hooks-简介)
- [Hooks 基础](#hooks-基础)
- [自定义 Hooks 列表](#自定义-hooks-列表)
  - [状态管理 Hooks](#状态管理-hooks)
  - [副作用 Hooks](#副作用-hooks)
  - [UI 交互 Hooks](#ui-交互-hooks)
  - [网络请求 Hooks](#网络请求-hooks)
  - [工具类 Hooks](#工具类-hooks)

## Hooks 简介

Hooks 是 React 16.8 引入的新特性，允许在函数组件中使用状态和其他 React 特性，而无需编写类组件。

### Hooks 的优势

- **函数组件优先**：使用函数组件编写更简洁、更易维护的代码
- **复用逻辑**：将组件间共享的逻辑提取到自定义 Hooks 中
- **副作用管理**：使用 `useEffect` 统一管理组件的副作用
- **类型安全**：在 TypeScript 中提供更好的类型推断
- **简化状态管理**：使用 `useState` 和 `useReducer` 管理组件状态

## Hooks 基础

### 常用内置 Hooks

- **`useState`**：用于在函数组件中添加状态
- **`useEffect`**：用于处理组件的副作用（如数据获取、订阅、DOM 操作等）
- **`useContext`**：用于访问 React Context
- **`useReducer`**：用于复杂状态管理
- **`useCallback`**：用于缓存函数
- **`useMemo`**：用于缓存计算结果
- **`useRef`**：用于访问 DOM 元素或保存可变值
- **`useImperativeHandle`**：用于自定义暴露给父组件的实例值
- **`useLayoutEffect`**：用于在 DOM 更新后同步执行副作用
- **`useDebugValue`**：用于在 React DevTools 中显示自定义 Hook 的标签

### 自定义 Hooks 规则

创建自定义 Hooks 时，需要遵循以下规则：

1. **命名规范**：自定义 Hooks 必须以 `use` 开头，如 `useState`, `useEffect`
2. **只能在函数组件或其他自定义 Hooks 中调用**：不能在普通函数、类组件或条件语句中调用
3. **只能在组件的顶层调用**：不能在循环、条件或嵌套函数中调用
4. **使用 TypeScript**：为自定义 Hooks 添加类型定义，提高类型安全性
5. **保持简洁**：每个自定义 Hook 只负责一个功能，避免过于复杂

## 自定义 Hooks 列表

### 状态管理 Hooks

#### `useCounter`

**功能描述**：一个简单的计数器 Hook，用于管理数字状态。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `initialValue` | `number` | 否 | `0` | 初始计数 |

**返回值类型**：

```typescript
interface CounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
```

**使用示例**：

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useCounter } from '@taro-uno/hooks';

function CounterExample() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={reset}>Reset</Button>
    </View>
  );
}
```

**注意事项**：
- 初始值必须是数字类型
- 可以通过 `setCount` 方法直接设置计数

#### `useToggle`

**功能描述**：一个用于管理布尔值状态的 Hook，提供切换、设置为 true、设置为 false 的方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `initialValue` | `boolean` | 否 | `false` | 初始布尔值 |

**返回值类型**：

```typescript
interface ToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
```

**使用示例**：

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useToggle } from '@taro-uno/hooks';

function ToggleExample() {
  const { value, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <View>
      <Text>Value: {value ? 'True' : 'False'}</Text>
      <Button onClick={toggle}>Toggle</Button>
      <Button onClick={setTrue}>Set True</Button>
      <Button onClick={setFalse}>Set False</Button>
    </View>
  );
}
```

**注意事项**：
- 初始值必须是布尔类型
- 可以通过 `setValue` 方法直接设置布尔值

### 副作用 Hooks

#### `useMount`

**功能描述**：一个只在组件挂载时执行的 Hook，相当于类组件的 `componentDidMount` 生命周期方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `callback` | `() => void` | 是 | - | 挂载时执行的回调函数 |

**使用示例**：

```tsx
import { View, Text } from '@tarojs/components';
import { useMount } from '@taro-uno/hooks';

function MountExample() {
  useMount(() => {
    console.log('Component mounted');
  });

  return (
    <View>
      <Text>Mount Example</Text>
    </View>
  );
}
```

**注意事项**：
- 回调函数只会执行一次
- 不支持返回清理函数

#### `useUnmount`

**功能描述**：一个只在组件卸载时执行的 Hook，相当于类组件的 `componentWillUnmount` 生命周期方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `callback` | `() => void` | 是 | - | 卸载时执行的回调函数 |

**使用示例**：

```tsx
import { View, Text } from '@tarojs/components';
import { useUnmount } from '@taro-uno/hooks';

function UnmountExample() {
  useUnmount(() => {
    console.log('Component unmounted');
  });

  return (
    <View>
      <Text>Unmount Example</Text>
    </View>
  );
}
```

**注意事项**：
- 回调函数只会在组件卸载时执行一次
- 不支持异步操作

### UI 交互 Hooks

#### `useScroll`

**功能描述**：一个用于监听滚动事件的 Hook，提供滚动位置和滚动状态。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `target` | `Window \| HTMLElement \| null` | 否 | `window` | 滚动目标元素 |
| `options` | `AddEventListenerOptions` | 否 | `{ passive: true }` | 事件监听选项 |

**返回值类型**：

```typescript
interface ScrollReturn {
  scrollX: number;
  scrollY: number;
  isScrolling: boolean;
  direction: 'up' | 'down' | 'left' | 'right' | null;
}
```

**使用示例**：

```tsx
import { View, Text } from '@tarojs/components';
import { useScroll } from '@taro-uno/hooks';

function ScrollExample() {
  const { scrollX, scrollY, direction } = useScroll();

  return (
    <View>
      <Text>Scroll X: {scrollX}</Text>
      <Text>Scroll Y: {scrollY}</Text>
      <Text>Direction: {direction}</Text>
    </View>
  );
}
```

**注意事项**：
- 在小程序环境中，需要确保滚动目标元素支持滚动事件
- 避免在滚动回调中执行复杂计算，影响性能

#### `useHover`

**功能描述**：一个用于检测元素悬停状态的 Hook，支持鼠标和触摸事件。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `options` | `{ delayEnter?: number; delayLeave?: number }` | 否 | `{}` | 悬停延迟选项 |

**返回值类型**：

```typescript
interface HoverReturn {
  isHovering: boolean;
  hoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onTouchCancel: () => void;
  };
}
```

**使用示例**：

```tsx
import { View, Text } from '@tarojs/components';
import { useHover } from '@taro-uno/hooks';

function HoverExample() {
  const { isHovering, hoverProps } = useHover({ delayEnter: 100, delayLeave: 100 });

  return (
    <View
      {...hoverProps}
      style={{
        backgroundColor: isHovering ? 'red' : 'blue',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: 'white' }}>{isHovering ? 'Hovering' : 'Not Hovering'}</Text>
    </View>
  );
}
```

**注意事项**：
- 在触摸设备上，`onTouchEnd` 和 `onTouchCancel` 事件会触发离开悬停状态
- 可以通过 `delayEnter` 和 `delayLeave` 调整悬停延迟

### 网络请求 Hooks

#### `useRequest`

**功能描述**：一个用于处理网络请求的 Hook，提供请求状态、数据、错误信息和请求方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `service` | `(...args: any[]) => Promise<any>` | 是 | - | 请求服务函数 |
| `options` | `UseRequestOptions` | 否 | `{}` | 请求选项 |

**返回值类型**：

```typescript
interface UseRequestReturn<TData, TParams extends any[]> {
  data: TData | undefined;
  error: Error | undefined;
  loading: boolean;
  run: (...args: TParams) => Promise<TData>;
  runAsync: (...args: TParams) => Promise<TData>;
  refresh: () => Promise<TData>;
  refreshAsync: () => Promise<TData>;
  mutate: (data: TData | ((oldData: TData) => TData)) => void;
  cancel: () => void;
}
```

**使用示例**：

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useRequest } from '@taro-uno/hooks';

// 模拟请求函数
async function fetchData(id: number) {
  const response = await fetch(`https://api.example.com/data/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function RequestExample() {
  const { data, error, loading, run } = useRequest(fetchData, {
    manual: true
  });

  return (
    <View>
      <Button onClick={() => run(1)} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </Button>
      {error && <Text>Error: {error.message}</Text>}
      {data && (
        <View>
          <Text>Data: {JSON.stringify(data)}</Text>
        </View>
      )}
    </View>
  );
}
```

**注意事项**：
- 默认情况下，请求会在组件挂载时自动执行，设置 `manual: true` 可以禁用自动执行
- 支持并发请求控制、错误重试、缓存等高级功能
- 可以通过 `mutate` 方法手动更新数据

#### `useDebounce`

**功能描述**：一个用于防抖的 Hook，延迟执行函数，避免频繁触发。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `value` | `T` | 是 | - | 需要防抖的值 |
| `wait` | `number` | 否 | `300` | 防抖等待时间（毫秒） |
| `options` | `DebounceOptions` | 否 | `{}` | 防抖选项 |

**返回值类型**：

```typescript
<T>(value: T, wait?: number, options?: DebounceOptions): T;
```

**使用示例**：

```tsx
import { View, Input } from '@tarojs/components';
import { useState } from 'react';
import { useDebounce } from '@taro-uno/hooks';

function DebounceExample() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  // 可以在 useEffect 中监听 debouncedValue 的变化，执行搜索等操作
  // useEffect(() => {
  //   // 执行搜索
  // }, [debouncedValue]);

  return (
    <View>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.detail.value)}
        placeholder="请输入搜索关键词"
      />
      <View>
        <Text>输入值: {inputValue}</Text>
      </View>
      <View>
        <Text>防抖后的值: {debouncedValue}</Text>
      </View>
    </View>
  );
}
```

**注意事项**：
- 防抖等待时间不宜过长或过短，根据具体场景调整
- 支持 `leading` 和 `trailing` 选项，控制函数执行时机

### 工具类 Hooks

#### `useLocalStorage`

**功能描述**：一个用于操作 localStorage 的 Hook，提供读取、设置、删除 localStorage 数据的方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `key` | `string` | 是 | - | localStorage 键名 |
| `initialValue` | `T` | 否 | - | 初始值 |
| `options` | `UseLocalStorageOptions` | 否 | `{}` | 选项 |

**返回值类型**：

```typescript
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
}
```

**使用示例**：

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useLocalStorage } from '@taro-uno/hooks';

function LocalStorageExample() {
  const { value, setValue, removeValue } = useLocalStorage('username', 'Guest');

  return (
    <View>
      <Text>Username: {value}</Text>
      <Button onClick={() => setValue('New User')}>Set Username</Button>
      <Button onClick={removeValue}>Remove Username</Button>
    </View>
  );
}
```

**注意事项**：
- 在小程序环境中，需要确保 localStorage API 可用
- 支持 JSON 序列化和反序列化
- 可以通过 `options.serializer` 和 `options.deserializer` 自定义序列化和反序列化方法

#### `useSessionStorage`

**功能描述**：一个用于操作 sessionStorage 的 Hook，提供读取、设置、删除 sessionStorage 数据的方法。

**参数说明**：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `key` | `string` | 是 | - | sessionStorage 键名 |
| `initialValue` | `T` | 否 | - | 初始值 |
| `options` | `UseSessionStorageOptions` | 否 | `{}` | 选项 |

**返回值类型**：

```typescript
interface UseSessionStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prevValue: T) => T)) => void;
  removeValue: () => void;
}
```

**使用示例**：

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useSessionStorage } from '@taro-uno/hooks';

function SessionStorageExample() {
  const { value, setValue, removeValue } = useSessionStorage('token', '');

  return (
    <View>
      <Text>Token: {value}</Text>
      <Button onClick={() => setValue('new-token-123')}>Set Token</Button>
      <Button onClick={removeValue}>Remove Token</Button>
    </View>
  );
}
```

**注意事项**：
- sessionStorage 的数据仅在当前会话有效，页面刷新或关闭后会丢失
- 在小程序环境中，需要确保 sessionStorage API 可用
- 支持 JSON 序列化和反序列化
