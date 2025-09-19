# TypeScript 优化指南

Taro-Uno UI 提供了完整的 TypeScript 支持，包括类型安全、智能提示和代码优化。

## 🌟 核心特性

### 1. 标准化组件类型
我们实现了完整的标准化组件类型系统，确保类型安全和开发体验：

```tsx
import type {
  StandardComponentProps,
  FormComponentProps,
  LayoutComponentProps,
  SizeableComponentProps,
  VariantComponentProps
} from '@taro-uno/ui/types/standardized-components'

// 基础组件类型
interface MyButtonProps extends StandardComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

// 表单组件类型
interface MyInputProps extends FormComponentProps {
  placeholder?: string;
  maxLength?: number;
}

// 布局组件类型
interface MyContainerProps extends LayoutComponentProps {
  fluid?: boolean;
  maxWidth?: number;
}
```

### 2. 智能类型推断
组件支持智能类型推断和自动完成：

```tsx
import { Button } from '@taro-uno/ui'

// 完整的类型提示
const MyComponent = () => {
  return (
    <Button
      type="primary"        // 自动提示: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
      size="large"          // 自动提示: 'small' | 'medium' | 'large' | 'default'
      variant="solid"       // 自动提示: 'default' | 'solid' | 'outline' | 'text'
      shape="round"         // 自动提示: 'default' | 'circle' | 'round'
      disabled={false}      // 自动提示: boolean
      loading={false}       // 自动提示: boolean
      onClick={(e) => {     // 自动推断事件类型
        console.log(e)      // e 类型为 ITouchEvent
      }}
    >
      点击我
    </Button>
  )
}
```

### 3. 严格的类型检查
启用了严格的 TypeScript 配置，确保代码质量：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 🔧 高级类型特性

### 1. 条件类型
使用条件类型实现动态类型选择：

```tsx
import type { Conditional } from '@taro-uno/ui/types/utils'

type LoadingState<T> = Conditional<T, true, 'loading', 'normal'>

const Button = <T extends boolean = false>(
  props: {
    loading?: T;
    children: ReactNode;
  } & LoadingState<T>
) => {
  return <button>{props.children}</button>
}

// 使用
<Button loading={true}>加载中</Button>        // loading 状态
<Button loading={false}>正常</Button>        // 正常状态
<Button>默认</Button>                       // 正常状态
```

### 2. 深度类型操作
提供完整的深度类型操作工具：

```tsx
import type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  DeepWriteable,
  RecursiveExclude,
  RecursivePick
} from '@taro-uno/ui/types/utils'

// 深度部分类型
interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

type PartialConfig = DeepPartial<Config>
// PartialConfig 等价于:
// {
//   database?: {
//     host?: string;
//     port?: number;
//     credentials?: {
//       username?: string;
//       password?: string;
//     };
//   };
// }

// 深度只读类型
type ReadonlyConfig = DeepReadonly<Config>

// 递归选择类型
type CredentialsOnly = RecursivePick<Config, 'credentials'>
// CredentialsOnly 等价于:
// {
//   database: {
//     credentials: {
//       username: string;
//       password: string;
//     };
//   };
// }
```

### 3. 工具类型
内置丰富的工具类型：

```tsx
import type {
  DebouncedFunction,
  ThrottledFunction,
  FormatFunction,
  ValidateFunction,
  TransformFunction,
  FilterFunction,
  CompareFunction
} from '@taro-uno/ui/types/utils'

// 防抖函数类型
const debouncedSearch: DebouncedFunction<(query: string) => void> = debounce(
  (query) => console.log(query),
  300
)

// 节流函数类型
const throttledScroll: ThrottledFunction<(event: Event) => void> = throttle(
  (event) => console.log(event),
  100
)

// 格式化函数类型
const formatDate: FormatFunction<Date, string> = (date) => {
  return date.toLocaleDateString()
}

// 验证函数类型
const validateEmail: ValidateFunction<string> = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

## 🎯 组件类型安全

### 1. Props 类型验证
所有组件都有完整的类型定义：

```tsx
import type { ButtonProps, InputProps, FormProps } from '@taro-uno/ui/types/components'

// 按钮组件完整类型
const CompleteButton: React.FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    size = 'medium',
    variant = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    children,
    icon,
    onClick,
    style,
    className,
    accessible = true,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    ...rest
  } = props

  return (
    <button
      className={className}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      {...rest}
    >
      {children}
    </button>
  )
}
```

### 2. 事件类型安全
严格的事件类型定义：

```tsx
import type { ITouchEvent } from '@tarojs/components'
import type { ClickHandler, InputHandler, FocusHandler } from '@taro-uno/ui/types/events'

const SafeButton: React.FC = () => {
  const handleClick: ClickHandler = (event) => {
    // event 类型为 ITouchEvent
    console.log('Button clicked:', event)
  }

  const handleFocus: FocusHandler = (event) => {
    // event 类型为 FocusEvent
    console.log('Button focused:', event)
  }

  return <Button onClick={handleClick}>安全按钮</Button>
}
```

### 3. 泛型组件
支持泛型组件以实现更灵活的类型安全：

```tsx
import type { StandardComponentProps } from '@taro-uno/ui/types/standardized-components'

interface SelectProps<T = string> extends StandardComponentProps {
  options: Array<{ value: T; label: string }>
  value?: T
  onChange?: (value: T) => void
}

function Select<T = string>({ options, value, onChange, ...props }: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value as T)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// 使用
const StringSelect = () => (
  <Select
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' }
    ]}
    value="apple"
    onChange={(value) => console.log(value)} // value 类型为 string
  />
)

const NumberSelect = () => (
  <Select<number>
    options={[
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' }
    ]}
    value={1}
    onChange={(value) => console.log(value)} // value 类型为 number
  />
)
```

## 🚀 性能优化类型

### 1. React 优化类型
内置 React 性能优化类型：

```tsx
import { useMemo, useCallback, memo } from 'react'
import type { ButtonProps } from '@taro-uno/ui/types/components'

// 使用 useMemo 优化计算
const ExpensiveComponent: React.FC<{ items: Array<{ id: number; name: string }> }> = ({ items }) => {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }))
  }, [items])

  return (
    <div>
      {processedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

// 使用 useCallback 优化函数
const OptimizedButton: React.FC<ButtonProps> = memo(({ onClick, children, ...props }) => {
  const handleClick = useCallback((event: ITouchEvent) => {
    onClick?.(event)
  }, [onClick])

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
})
```

### 2. 懒加载类型
支持懒加载组件的类型安全：

```tsx
import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

// 懒加载组件类型
const LazyComponent = lazy(() => import('./LazyComponent')) as React.LazyExoticComponent<
  ComponentType<{ title: string }>
>

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent title="懒加载组件" />
    </Suspense>
  )
}
```

## 🧪 测试类型

### 1. 测试工具类型
提供完整的测试类型支持：

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { AccessibilityTestUtils } from '@taro-uno/ui/tests/utils/accessibility-test-utils'
import type { AccessibilityTestResult } from '@taro-uno/ui/tests/utils/accessibility-test-utils'

test('按钮组件测试', async () => {
  const { container } = render(<Button>测试按钮</Button>)

  // 无障碍测试
  const result: AccessibilityTestResult = await AccessibilityTestUtils.runAccessibilityTest(container)

  expect(result.passed).toBe(true)
  expect(result.score).toBeGreaterThan(90)

  // 交互测试
  const button = screen.getByRole('button')
  fireEvent.click(button)

  // 类型安全的事件处理
  const handleClick = (event: ITouchEvent) => {
    expect(event.type).toBe('tap')
  }
})
```

### 2. Mock 类型
支持完整的 Mock 类型：

```tsx
import { jest } from '@jest/globals'
import type { Mock } from 'jest-mock'

// Mock 函数类型
const mockClickHandler = jest.fn<() => void>()

// Mock 组件类型
const MockButton = jest.fn<React.FC<ButtonProps>>(({ children }) => (
  <button>{children}</button>
))

// Mock Hook 类型
const mockUseTheme = jest.fn<() => { theme: string }>()
  .mockReturnValue({ theme: 'light' })
```

## 📦 构建优化

### 1. 类型检查配置
完整的类型检查配置：

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "composite": true,
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
```

### 2. 路径别名
支持路径别名类型解析：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

## 🎨 最佳实践

### 1. 类型定义最佳实践
```tsx
// ✅ 使用明确的类型
interface User {
  id: string
  name: string
  email: string
  age?: number
}

// ✅ 使用泛型约束
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// ✅ 使用工具类型
type UserResponse = ApiResponse<User>

// ✅ 使用字面量类型
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'default' | 'primary' | 'secondary'

// ❌ 避免使用 any
const badExample = (data: any) => {
  console.log(data)
}

// ✅ 使用 unknown 和类型守卫
const goodExample = (data: unknown) => {
  if (typeof data === 'string') {
    console.log(data.toUpperCase())
  }
}
```

### 2. 组件类型最佳实践
```tsx
// ✅ 使用接口继承
interface MyButtonProps extends StandardComponentProps {
  variant: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
}

// ✅ 使用泛型组件
interface SelectProps<T> extends StandardComponentProps {
  options: Array<{ value: T; label: string }>
  value?: T
  onChange?: (value: T) => void
}

// ✅ 使用默认泛型
function Select<T = string>(props: SelectProps<T>) {
  // ...
}

// ✅ 使用交叉类型
type ExtendedButtonProps = ButtonProps & {
  customProp: string
}
```

### 3. Hook 类型最佳实践
```tsx
// ✅ 明确的 Hook 类型
const useCustomHook = <T>(initialValue: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(initialValue)
  return [state, setState]
}

// ✅ 使用回调类型
const useEventCallback = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const ref = useRef<T>(callback)
  ref.current = callback
  return useMemo(() => ((...args: any[]) => ref.current(...args)) as T, [])
}
```

## 🔍 类型检查工具

### 1. TypeScript ESLint
使用 TypeScript ESLint 确保代码质量：

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn'
  }
}
```

### 2. 类型检查脚本
添加类型检查脚本：

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "type-check:strict": "tsc --noEmit --strict"
  }
}
```

## 📚 相关资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [React TypeScript 文档](https://react-typescript-cheatsheet.netlify.app/)
- [Taro TypeScript 文档](https://taro.zone/docs/next/guide)
- [ESLint TypeScript 规则](https://typescript-eslint.io/docs/rules/)

---

通过完整的 TypeScript 支持，Taro-Uno UI 提供了类型安全的开发体验，帮助您构建高质量的多端应用。