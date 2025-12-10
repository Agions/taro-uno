# API 参考

本页面提供 Taro Uno UI 组件库的详细 API 参考，包括核心类、工具函数、类型定义等。

## 📦 核心类

### RequestClient

智能 HTTP 客户端，自动适配各平台。

#### 构造函数

```tsx
new RequestClient(config: RequestClientConfig)
```

**配置选项：**

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| baseURL | string | - | API 基础 URL |
| timeout | number | 10000 | 请求超时时间（毫秒） |
| headers | `Record<string, string>` | {} | 默认请求头 |
| credentials | boolean | false | 是否发送凭据 |
| interceptors | RequestInterceptors | - | 请求/响应拦截器 |

#### 方法

##### get

```tsx
client.get<T>(url: string, config?: RequestConfig): Promise<Response<T>>
```

##### post

```tsx
client.post<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

##### put

```tsx
client.put<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

##### delete

```tsx
client.delete<T>(url: string, config?: RequestConfig): Promise<Response<T>>
```

##### patch

```tsx
client.patch<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

#### 请求配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| headers | `Record<string, string>` | {} | 请求头 |
| params | `Record<string, any>` | {} | URL 查询参数 |
| data | any | - | 请求体数据 |
| timeout | number | 10000 | 请求超时时间 |
| cache | CacheConfig | - | 缓存配置 |
| retry | RetryConfig | - | 重试配置 |

#### 缓存配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| enabled | boolean | false | 是否启用缓存 |
| ttl | number | 3600000 | 缓存过期时间（毫秒） |
| key | string | - | 自定义缓存键 |

#### 重试配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| enabled | boolean | false | 是否启用重试 |
| count | number | 3 | 重试次数 |
| delay | number | 1000 | 初始延迟时间（毫秒） |
| strategy | 'exponential' \| 'linear' \| 'fixed' | 'exponential' | 重试策略 |

## 🎣 React Hooks

### 状态管理

#### useToggle

```tsx
useToggle(initialValue: boolean): [boolean, () => void]
```

**参数：**
- `initialValue`: 初始状态值

**返回值：**
- `[value, toggle]`: 当前状态和切换函数

#### useCounter

```tsx
useCounter(initialValue: number, options?: CounterOptions): CounterResult
```

**配置选项：**

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| min | number | -Infinity | 最小值 |
| max | number | Infinity | 最大值 |
| step | number | 1 | 步长 |

**返回结果：**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| count | number | 当前计数 |
| increment | (delta?: number) => void | 增加计数 |
| decrement | (delta?: number) => void | 减少计数 |
| reset | (value?: number) => void | 重置计数 |

### 副作用处理

#### useDebounce

```tsx
useDebounce<T>(value: T, delay: number): T
```

**参数：**
- `value`: 要防抖的值
- `delay`: 延迟时间（毫秒）

**返回值：**
- 防抖后的值

#### useThrottle

```tsx
useThrottle<T>(value: T, delay: number): T
```

**参数：**
- `value`: 要节流的值
- `delay`: 延迟时间（毫秒）

**返回值：**
- 节流后的值

#### useDeepCompareEffect

```tsx
useDeepCompareEffect(effect: EffectCallback, deps: DependencyList): void
```

**参数：**
- `effect`: 副作用函数
- `deps`: 依赖数组，使用深度比较

### 网络请求

#### useRequest

```tsx
useRequest<T>(url: string, options?: RequestOptions): RequestResult<T>
```

**配置选项：**

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| method | string | 'GET' | 请求方法 |
| headers | `Record<string, string>` | {} | 请求头 |
| params | `Record<string, any>` | {} | URL 查询参数 |
| data | any | - | 请求体数据 |
| cache | boolean | false | 是否启用缓存 |
| retry | number | 0 | 重试次数 |
| onSuccess | (data: T) => void | - | 成功回调 |
| onError | (error: any) => void | - | 错误回调 |

**返回结果：**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| data | `T \| undefined` | 请求数据 |
| loading | boolean | 是否加载中 |
| error | any | 错误信息 |
| refetch | () => void | 重新请求 |
| mutate | `(data: T) => void` | 手动更新数据 |

#### useMutation

```tsx
useMutation<T>(url: string, options?: MutationOptions): MutationResult<T>
```

**配置选项：**

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| method | string | 'POST' | 请求方法 |
| headers | `Record<string, string>` | {} | 请求头 |
| onSuccess | (data: T) => void | - | 成功回调 |
| onError | (error: any) => void | - | 错误回调 |

**返回结果：**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| mutate | `(data?: any) => Promise<T>` | 执行请求 |
| loading | boolean | 是否加载中 |
| error | any | 错误信息 |
| data | `T \| undefined` | 请求数据 |

### 存储管理

#### useLocalStorage

```tsx
useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

**参数：**
- `key`: 存储键名
- `initialValue`: 初始值

**返回值：**
- `[value, setValue]`: 当前值和设置函数

#### useSessionStorage

```tsx
useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

**参数：**
- `key`: 存储键名
- `initialValue`: 初始值

**返回值：**
- `[value, setValue]`: 当前值和设置函数

### 生命周期

#### useMount

```tsx
useMount(fn: () => void): void
```

**参数：**
- `fn`: 组件挂载时执行的函数

#### useUnmount

```tsx
useUnmount(fn: () => void): void
```

**参数：**
- `fn`: 组件卸载时执行的函数

#### useUpdateEffect

```tsx
useUpdateEffect(effect: EffectCallback, deps: DependencyList): void
```

**参数：**
- `effect`: 副作用函数
- `deps`: 依赖数组

**描述：**
- 仅在依赖更新时执行，跳过初始挂载

### 交互检测

#### useClickOutside

```tsx
useClickOutside(ref: RefObject<HTMLElement>, handler: () => void): void
```

**参数：**
- `ref`: DOM 元素引用
- `handler`: 点击外部时执行的函数

#### useEventListener

```tsx
useEventListener(eventName: string, handler: EventListener, options?: EventListenerOptions): void
```

**参数：**
- `eventName`: 事件名称
- `handler`: 事件处理函数
- `options`: 事件选项

## 🔧 工具函数

### 安全工具

#### xssProtection

```tsx
xssProtection(html: string): string
```

**参数：**
- `html`: 原始 HTML 字符串

**返回值：**
- 经过 XSS 防护处理的安全 HTML 字符串

#### safeRequest

```tsx
safeRequest(url: string, options?: RequestOptions): Promise<any>
```

**参数：**
- `url`: 请求 URL
- `options`: 请求选项

**返回值：**
- 请求结果

### 数据验证

#### validateInput

```tsx
validateInput(value: any, rules: ValidationRules): ValidationResult
```

**验证规则：**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| type | 'email' \| 'url' \| 'number' \| 'string' \| 'boolean' | 数据类型 |
| required | boolean | 是否必填 |
| min | number | 最小值（字符串为长度） |
| max | number | 最大值（字符串为长度） |
| pattern | RegExp | 正则表达式验证 |
| custom | (value: any) => boolean | 自定义验证函数 |

**返回结果：**

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| valid | boolean | 是否验证通过 |
| errors | string[] | 错误信息数组 |

### 格式化工具

#### formatDate

```tsx
formatDate(date: Date | string | number, format: string): string
```

**参数：**
- `date`: 日期对象或时间戳
- `format`: 格式化字符串，如 'YYYY-MM-DD HH:mm:ss'

**返回值：**
- 格式化后的日期字符串

#### formatNumber

```tsx
formatNumber(num: number, options?: NumberFormatOptions): string
```

**配置选项：**

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| decimal | number | 2 | 小数位数 |
| thousands | boolean | true | 是否显示千分位 |
| prefix | string | '' | 前缀 |
| suffix | string | '' | 后缀 |

**返回值：**
- 格式化后的数字字符串

## 🎨 主题配置

### AppProvider

全局主题提供者组件。

```tsx
<AppProvider theme={themeConfig}>
  <App />
</AppProvider>
```

**主题配置：**

```tsx
interface ThemeConfig {
  colors: {
    primary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    background: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  spacing: {
    base: number;
  };
  effects: {
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    boxShadow: {
      sm: string;
      md: string;
      lg: string;
    };
  };
}
```

## 📁 类型定义

### 基础类型

```tsx
// 颜色类型
type Color = string;

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

type Align = 'left' | 'center' | 'right' | 'justify';

type Direction = 'horizontal' | 'vertical';
```

### 组件通用属性

```tsx
interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  data-*?: any;
}
```

### 表单组件属性

```tsx
interface FormComponentProps extends CommonProps {
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  placeholder?: string;
  error?: string;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
}
```

## 📚 类型导出

Taro Uno UI 导出了所有类型定义，可以直接导入使用：

```tsx
import type {
  RequestConfig,
  ThemeConfig,
  Color,
  Size,
  Variant,
  // ... 其他类型
} from 'taro-uno-ui';
```

## 🔗 相关链接

- [TypeDoc 生成的完整 API 文档](/api/)
- [组件文档](/components/basic/button)
- [开发指南](/guides/installation)

## 💡 使用提示

1. **类型安全**：所有 API 都提供了完整的 TypeScript 类型定义，建议开启 TypeScript 严格模式以获得最佳开发体验。

2. **按需导入**：可以按需导入所需的 API，减小包体积：
   ```tsx
   import { useRequest } from 'taro-uno-ui/hooks';
   import { xssProtection } from 'taro-uno-ui/utils';
   ```

3. **版本兼容**：API 设计遵循语义化版本控制，主版本号变更时可能会有不兼容的 API 变更。

4. **浏览器支持**：支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。
