# 最佳实践指南

本文档提供了使用 Taro-Uno UI 的最佳实践建议，帮助您构建高质量的应用程序。

## 🎯 组件使用最佳实践

### 1. 组件导入优化

#### ✅ 推荐做法
```tsx
// 按需导入 - 减少包大小
import Button from '@taro-uno/ui/dist/button'
import { Input } from '@taro-uno/ui/dist/input'

// 或者使用命名导入
import { Button, Input } from '@taro-uno/ui'
```

#### ❌ 避免做法
```tsx
// 避免导入整个库
import * as TaroUno from '@taro-uno/ui'
```

### 2. 类型安全使用

#### ✅ 推荐做法
```tsx
import type { ButtonProps } from '@taro-uno/ui'

interface MyButtonProps extends ButtonProps {
  customProp: string
}

const MyButton: React.FC<MyButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props}>{customProp}</Button>
}
```

#### ❌ 避免做法
```tsx
// 避免使用 any 类型
const MyButton = (props: any) => {
  return <Button {...props} />
}
```

### 3. 事件处理优化

#### ✅ 推荐做法
```tsx
import { useCallback } from 'react'

const MyComponent = () => {
  const handleClick = useCallback((event: ITouchEvent) => {
    console.log('Button clicked:', event)
    // 处理点击逻辑
  }, [])

  return <Button onClick={handleClick}>Click me</Button>
}
```

#### ❌ 避免做法
```tsx
// 避免在渲染中创建新函数
const MyComponent = () => {
  return (
    <Button onClick={() => console.log('clicked')}>
      Click me
    </Button>
  )
}
```

## 🎨 样式和主题最佳实践

### 1. 主题变量使用

#### ✅ 推荐做法
```tsx
// 使用 CSS 变量
const ThemedButton = () => {
  return (
    <Button 
      style={{
        '--button-bg-color': 'var(--primary-color)',
        '--button-text-color': 'var(--text-color)'
      }}
    >
      主题按钮
    </Button>
  )
}
```

#### ❌ 避免做法
```tsx
// 避免硬编码颜色
const Button = () => {
  return (
    <button style={{ backgroundColor: '#1890ff' }}>
      按钮
    </button>
  )
}
```

### 2. 响应式设计

#### ✅ 推荐做法
```tsx
import { useResponsive } from '@taro-uno/ui'

const ResponsiveComponent = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive()
  
  if (isMobile) {
    return <MobileLayout />
  }
  
  if (isTablet) {
    return <TabletLayout />
  }
  
  return <DesktopLayout />
}
```

### 3. 样式复用

#### ✅ 推荐做法
```tsx
// 创建样式常量
const commonStyles = {
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '16px'
}

const PrimaryButton = () => (
  <Button style={{ ...commonStyles, backgroundColor: 'var(--primary-color)' }}>
    主要按钮
  </Button>
)

const SecondaryButton = () => (
  <Button style={{ ...commonStyles, backgroundColor: 'var(--secondary-color)' }}>
    次要按钮
  </Button>
)
```

## ⚡ 性能优化最佳实践

### 1. 组件优化

#### ✅ 推荐做法
```tsx
import React, { memo, useCallback } from 'react'

// 使用 memo 避免不必要的重渲染
const OptimizedComponent = memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => (
        <Item key={item.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  )
})

// 使用 useCallback 优化函数引用
const ParentComponent = () => {
  const handleUpdate = useCallback((id: string) => {
    console.log('Update item:', id)
  }, [])
  
  return <OptimizedComponent data={items} onUpdate={handleUpdate} />
}
```

### 2. 列表渲染优化

#### ✅ 推荐做法
```tsx
import { VirtualList } from '@taro-uno/ui'

const LargeList = ({ data }) => {
  return (
    <VirtualList
      data={data}
      renderItem={({ item }) => (
        <ListItem key={item.id} item={item} />
      )}
      height={500}
      itemHeight={60}
      overscanCount={5}
    />
  )
}
```

### 3. 资源加载优化

#### ✅ 推荐做法
```tsx
import { lazy, Suspense } from 'react'

// 懒加载组件
const HeavyComponent = lazy(() => import('@taro-uno/ui/dist/heavy-component'))

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## 🔒 无障碍访问最佳实践

### 1. 语义化标签

#### ✅ 推荐做法
```tsx
import { Button, Form, Input } from '@taro-uno/ui'

const AccessibleForm = () => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item 
        label="用户名"
        htmlFor="username"
        required
      >
        <Input
          id="username"
          placeholder="请输入用户名"
          aria-required="true"
          aria-describedby="username-error"
        />
      </Form.Item>
      <Button type="submit" aria-label="提交表单">
        提交
      </Button>
    </Form>
  )
}
```

### 2. 键盘导航

#### ✅ 推荐做法
```tsx
import { useState } from 'react'

const KeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setFocusedIndex(prev => Math.min(prev + 1, items.length - 1))
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex(prev => Math.max(prev - 1, 0))
    }
  }
  
  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {items.map((item, index) => (
        <div
          key={item.id}
          tabIndex={index === focusedIndex ? 0 : -1}
          style={{
            backgroundColor: index === focusedIndex ? '#f0f0f0' : 'transparent'
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

## 🧪 测试最佳实践

### 1. 单元测试

#### ✅ 推荐做法
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@taro-uno/ui'

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

### 2. 集成测试

#### ✅ 推荐做法
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form, Input, Button } from '@taro-uno/ui'

describe('Form Integration', () => {
  test('submits form with valid data', async () => {
    const handleSubmit = jest.fn()
    
    render(
      <Form onSubmit={handleSubmit}>
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Button type="submit">提交</Button>
      </Form>
    )
    
    // 填写表单
    fireEvent.change(screen.getByPlaceholderText('请输入用户名'), {
      target: { value: 'testuser' }
    })
    
    // 提交表单
    fireEvent.click(screen.getByText('提交'))
    
    // 验证提交
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'testuser'
      })
    })
  })
})
```

## 📱 多平台适配最佳实践

### 1. 平台特定代码

#### ✅ 推荐做法
```tsx
import { usePlatform } from '@taro-uno/ui'

const PlatformComponent = () => {
  const { isH5, isWeapp, isAlipay } = usePlatform()
  
  if (isH5) {
    return <H5Component />
  }
  
  if (isWeapp) {
    return <WeappComponent />
  }
  
  if (isAlipay) {
    return <AlipayComponent />
  }
  
  return <DefaultComponent />
}
```

### 2. 条件导入

#### ✅ 推荐做法
```tsx
// 使用动态导入处理平台特定代码
const getPlatformComponent = async () => {
  const { getPlatform } = await import('@tarojs/runtime')
  
  switch (getPlatform()) {
    case 'h5':
      return import('./components/H5Component')
    case 'weapp':
      return import('./components/WeappComponent')
    default:
      return import('./components/DefaultComponent')
  }
}
```

## 🛠️ 开发流程最佳实践

### 1. 代码组织

#### ✅ 推荐做法
```
src/
├── components/
│   ├── common/          # 通用组件
│   ├── business/        # 业务组件
│   └── pages/           # 页面组件
├── hooks/              # 自定义 hooks
├── utils/              # 工具函数
├── services/           # API 服务
├── constants/          # 常量定义
├── types/              # 类型定义
└── styles/             # 样式文件
```

### 2. 命名规范

#### ✅ 推荐做法
```tsx
// 组件命名：PascalCase
const UserProfileCard = () => {}

// 文件命名：kebab-case
// user-profile-card.tsx

// 变量命名：camelCase
const userName = 'John Doe'

// 常量命名：SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'

// 类型命名：PascalCase
interface UserProfile {
  id: string
  name: string
}
```

### 3. 错误处理

#### ✅ 推荐做法
```tsx
import { ErrorBoundary } from '@taro-uno/ui'

const App = () => {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        // 记录错误日志
        console.error('App Error:', error)
        // 发送错误监控
        trackError(error, errorInfo)
      }}
    >
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  )
}

const ErrorFallback = () => {
  return (
    <div className="error-fallback">
      <h2>出错了</h2>
      <p>应用程序遇到了一个错误</p>
      <Button onClick={() => window.location.reload()}>
        刷新页面
      </Button>
    </div>
  )
}
```

## 📊 监控和分析最佳实践

### 1. 性能监控

#### ✅ 推荐做法
```tsx
import { usePerformance } from '@taro-uno/ui'

const PerformanceMonitor = () => {
  const metrics = usePerformance()
  
  useEffect(() => {
    if (metrics.fps < 30) {
      console.warn('Low FPS detected:', metrics.fps)
    }
    
    if (metrics.memory > 0.8) {
      console.warn('High memory usage:', metrics.memory)
    }
  }, [metrics])
  
  return null
}
```

### 2. 用户行为分析

#### ✅ 推荐做法
```tsx
import { useAnalytics } from '@taro-uno/ui'

const TrackedButton = () => {
  const { trackEvent } = useAnalytics()
  
  const handleClick = () => {
    // 跟踪用户点击事件
    trackEvent('button_click', {
      button_name: 'primary_button',
      location: 'homepage'
    })
    
    // 执行按钮逻辑
    console.log('Button clicked')
  }
  
  return <Button onClick={handleClick}>Click me</Button>
}
```

## 🔄 版本兼容性最佳实践

### 1. 版本检查

#### ✅ 推荐做法
```tsx
import { version } from '@taro-uno/ui'

const VersionCheck = () => {
  useEffect(() => {
    const currentVersion = version
    const requiredVersion = '1.0.0'
    
    if (currentVersion < requiredVersion) {
      console.warn(
        `Taro-Uno UI 版本过低。当前版本: ${currentVersion}, 需要版本: ${requiredVersion}`
      )
    }
  }, [])
  
  return null
}
```

### 2. 特性检测

#### ✅ 推荐做法
```tsx
const FeatureDetection = () => {
  const [supportsIntersectionObserver, setSupportsIntersectionObserver] = useState(false)
  
  useEffect(() => {
    setSupportsIntersectionObserver(
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    )
  }, [])
  
  if (!supportsIntersectionObserver) {
    return <FallbackComponent />
  }
  
  return <OptimizedComponent />
}
```

---

遵循这些最佳实践，您可以构建出高质量、高性能、易维护的 Taro-Uno UI 应用程序。