# Hooks 文档

Taro UI 组件库提供了一系列实用的 React Hooks，帮助开发者更高效地构建应用。

## 📋 Hooks 列表

### 性能监控
- [usePerformanceMonitor](./usePerformanceMonitor.md) - 性能监控钩子，用于监控组件性能指标

### 平台检测
- [usePlatform](./hooks/usePlatform.md) - 平台检测钩子，用于检测当前运行平台环境

### 样式管理
- [useStyle](./hooks/useStyle.md) - 样式管理钩子，用于动态管理组件样式

### 主题管理
- [useTheme](./hooks/useTheme.md) - 主题管理钩子，用于管理应用主题系统

### 虚拟滚动
- [useVirtualScroll](./hooks/useVirtualScroll.md) - 虚拟滚动钩子，用于优化长列表性能

## 🚀 快速开始

### 安装

```bash
npm install taro-uno
# 或
yarn add taro-uno
# 或
pnpm add taro-uno
```

### 基础使用

```tsx
import { useTheme, usePlatform } from 'taro-uno/hooks'

function App() {
  const { theme, setTheme } = useTheme()
  const platform = usePlatform()

  return (
    <div>
      <h1>当前主题: {theme}</h1>
      <p>运行平台: {platform.name}</p>
      <button onClick={() => setTheme('dark')}>
        切换到深色主题
      </button>
    </div>
  )
}
```

## 🔧 最佳实践

### 性能优化

使用 `usePerformanceMonitor` 监控组件性能：

```tsx
import { usePerformanceMonitor } from 'taro-uno/hooks'

function OptimizedComponent() {
  const { metrics, startMonitoring } = usePerformanceMonitor({
    enabled: true,
    reportInterval: 5000
  })

  useEffect(() => {
    startMonitoring()
  }, [])

  return <div>性能监控组件</div>
}
```

### 跨平台适配

使用 `usePlatform` 进行跨平台适配：

```tsx
import { usePlatform } from 'taro-uno/hooks'

function CrossPlatformComponent() {
  const platform = usePlatform()

  const getPlatformSpecificProps = () => {
    if (platform.isH5) {
      return { onClick: handleClick }
    }
    if (platform.isWeapp) {
      return { onClick: handleWeappClick }
    }
    return {}
  }

  return <div {...getPlatformSpecificProps()}>跨平台组件</div>
}
```

### 主题管理

使用 `useTheme` 管理应用主题：

```tsx
import { useTheme } from 'taro-uno/hooks'

function ThemedComponent() {
  const { theme, colors, setTheme } = useTheme()

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <h3>主题组件</h3>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </div>
  )
}
```

### 虚拟滚动

使用 `useVirtualScroll` 优化长列表性能：

```tsx
import { useVirtualScroll } from 'taro-uno/hooks'

function VirtualListComponent() {
  const { containerRef, innerRef, visibleItems } = useVirtualScroll({
    items: Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `项目 ${i}` })),
    itemHeight: 50,
    overscan: 5
  })

  return (
    <div ref={containerRef} style={{ height: '500px', overflow: 'auto' }}>
      <div ref={innerRef} style={{ position: 'relative' }}>
        {visibleItems.map((item) => (
          <div key={item.id} style={{ position: 'absolute', top: item.index * 50 }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 📖 详细文档

每个 Hook 都有详细的文档说明，包括：

- **基础用法**：简单的使用示例
- **配置选项**：完整的配置参数说明
- **API 参考**：详细的 API 文档
- **最佳实践**：推荐的使用方式
- **注意事项**：需要注意的问题

请查看各个 Hook 的详细文档以获取更多信息。

## 🔄 兼容性

所有 Hooks 都基于 React 16.8+ 的 Hooks API 开发，确保与最新版本的 React 兼容。

- **React**: 16.8+
- **Taro**: 3.x+
- **TypeScript**: 4.0+

## 🛠️ 贡献

欢迎为 Hooks 文档贡献内容！请阅读 [贡献指南](../CONTRIBUTING.md) 了解详细信息。

## 📄 许可证

MIT License