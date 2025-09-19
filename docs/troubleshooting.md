# 故障排除指南

本文档提供了使用 Taro-Uno UI 时可能遇到的常见问题及其解决方案。

## 🚨 常见问题

### 安装和构建问题

#### 1. 依赖安装失败

**问题**：`pnpm install` 时出现依赖冲突或网络错误

**解决方案**：
```bash
# 清除缓存
pnpm store prune

# 重新安装
pnpm install --force

# 如果网络问题，使用镜像源
pnpm config set registry https://registry.npmmirror.com
```

**预防措施**：
- 使用 `pnpm-lock.yaml` 锁定依赖版本
- 定期更新依赖包以避免安全漏洞

#### 2. TypeScript 类型错误

**问题**：编译时出现 TypeScript 类型错误

**解决方案**：
```bash
# 检查 TypeScript 版本
npx tsc --version

# 清除类型缓存
npx tsc --noEmit --skipLibCheck

# 重新生成类型声明
pnpm build
```

**常见错误及修复**：
- `Cannot find module 'taro-uno'`: 检查 `tsconfig.json` 中的路径映射
- `Property 'xxx' does not exist`: 确保使用了正确的组件属性类型

### 组件使用问题

#### 3. 样式不生效

**问题**：组件样式没有正确应用

**解决方案**：
```tsx
// 确保正确导入样式
import '@taro-uno/ui/dist/styles.css'

// 或者按需导入
import '@taro-uno/ui/dist/button/styles.css'
```

**检查清单**：
- [ ] 确认样式文件已正确导入
- [ ] 检查 CSS 变量是否被覆盖
- [ ] 验证组件的 className 属性

#### 4. 事件处理不工作

**问题**：组件的事件处理器没有被调用

**解决方案**：
```tsx
// 错误示例
<Button onClick={handleClick}>点击</Button>

// 正确示例（Taro 环境）
<Button onClick={handleClick} bindtap={handleClick}>点击</Button>
```

**调试方法**：
```tsx
const handleClick = (event) => {
  console.log('Event:', event)
  console.log('Event type:', event.type)
}

<Button onClick={(e) => {
  console.log('Click event:', e)
  handleClick(e)
}}>
  点击调试
</Button>
```

### 性能问题

#### 5. 页面加载缓慢

**问题**：页面加载时间过长

**解决方案**：
```tsx
// 按需导入组件
import Button from '@taro-uno/ui/dist/button'
import { Input } from '@taro-uno/ui/dist/input'

// 使用动态导入
const HeavyComponent = React.lazy(() => import('@taro-uno/ui/dist/heavy-component'))
```

**优化建议**：
- 使用代码分割减少包大小
- 启用 gzip 压缩
- 配置 CDN 加速

#### 6. 组件渲染性能差

**问题**：列表渲染或频繁更新时性能不佳

**解决方案**：
```tsx
// 使用 React.memo 优化组件
const OptimizedItem = React.memo(({ data }) => {
  return <ListItem data={data} />
})

// 使用虚拟滚动
import { VirtualList } from '@taro-uno/ui'

<VirtualList
  data={largeData}
  renderItem={item => <ListItem data={item} />}
  height={500}
  itemHeight={60}
/>
```

### 平台兼容性问题

#### 7. H5 平台特定问题

**问题**：在 H5 平台上功能异常

**解决方案**：
```tsx
import { usePlatform } from '@taro-uno/ui'

const MyComponent = () => {
  const { isH5, isWeapp } = usePlatform()
  
  if (isH5) {
    return <H5Component />
  }
  
  return <WeappComponent />
}
```

**常见问题**：
- 跨域问题：配置代理或使用 JSONP
- 路由问题：检查 Taro 路由配置
- 样式问题：使用平台特定的样式适配

#### 8. 小程序平台特定问题

**问题**：在小程序平台上功能异常

**解决方案**：
```json
// app.config.json
{
  "usingComponents": {
    "taro-uno-button": "@taro-uno/ui/dist/button"
  }
}
```

**调试方法**：
```bash
# 开启调试模式
pnpm dev:weapp --debug

# 查看小程序开发者工具控制台
```

### 主题和样式问题

#### 9. 主题切换不生效

**问题**：动态主题切换没有效果

**解决方案**：
```tsx
import { useTheme } from '@taro-uno/ui'

const App = () => {
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    // 确保主题变量正确应用
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  )
}
```

**检查清单**：
- [ ] 确认 CSS 变量定义正确
- [ ] 检查主题切换时机
- [ ] 验证样式优先级

#### 10. 自定义样式被覆盖

**问题**：自定义样式被组件默认样式覆盖

**解决方案**：
```tsx
// 使用更高优先级的选择器
.my-button {
  background: red !important; // 不推荐
}

// 或者使用 CSS 变量
.my-button {
  --button-bg-color: red;
}

// 或者使用内联样式
<Button style={{ backgroundColor: 'red' }} />
```

## 🔧 调试工具和方法

### 开发者工具调试

#### Chrome DevTools
```tsx
// 在组件中添加调试信息
const DebugComponent = () => {
  console.log('Component props:', props)
  console.log('Component state:', state)
  
  return <div>Debug Component</div>
}
```

#### 小程序开发者工具
```bash
# 启用调试模式
pnpm dev:weapp --debug

# 查看网络请求
# 在开发者工具的 Network 面板中查看
```

### 性能分析

#### React DevTools
```bash
# 安装 React DevTools
npm install -g react-devtools

# 启动分析
react-devtools
```

#### 性能监控
```tsx
import { usePerformance } from '@taro-uno/ui'

const PerformanceMonitor = () => {
  const metrics = usePerformance()
  
  useEffect(() => {
    console.log('Performance metrics:', metrics)
  }, [metrics])
  
  return <div>Performance: {metrics.fps} FPS</div>
}
```

## 📝 日志和错误处理

### 错误边界
```tsx
import { ErrorBoundary } from '@taro-uno/ui'

const App = () => {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={(error, errorInfo) => {
        console.error('Error:', error)
        console.error('Error Info:', errorInfo)
      }}
    >
      <MyApp />
    </ErrorBoundary>
  )
}
```

### 日志记录
```tsx
import { useLogger } from '@taro-uno/ui'

const MyComponent = () => {
  const logger = useLogger('MyComponent')
  
  const handleClick = () => {
    logger.info('Button clicked')
    logger.debug('Debug info', { data: someData })
    logger.error('Error occurred', new Error('Something went wrong'))
  }
  
  return <button onClick={handleClick}>Log Event</button>
}
```

## 🔄 更新和迁移

### 版本更新
```bash
# 检查当前版本
pnpm list @taro-uno/ui

# 更新到最新版本
pnpm update @taro-uno/ui@latest

# 查看更新日志
npm view @taro-uno/ui versions
```

### 迁移指南

#### 从 v0.x 迁移到 v1.0
```tsx
// v0.x 语法
import { Button } from '@taro-uno/ui'
<Button type="primary" size="large">Click</Button>

// v1.0 语法
import { Button } from '@taro-uno/ui'
<Button variant="solid" size="lg">Click</Button>
```

## 📞 获取帮助

### 社区支持
- **GitHub Issues**: [提交问题](https://github.com/taro-uno/ui/issues)
- **讨论区**: [GitHub Discussions](https://github.com/taro-uno/ui/discussions)
- **微信群**: 扫描二维码加入
- **邮件支持**: [dev@taro-uno.com](mailto:dev@taro-uno.com)

### 报告问题的模板
```markdown
## 问题描述
简要描述遇到的问题

## 复现步骤
1. 第一步
2. 第二步
3. 第三步

## 期望结果
描述期望的正常行为

## 实际结果
描述实际发生的问题

## 环境信息
- Taro-Uno UI 版本: [例如 1.0.0]
- Taro 版本: [例如 3.6.0]
- Node.js 版本: [例如 16.14.0]
- 目标平台: [例如 H5、微信小程序]

## 代码示例
```tsx
// 提供最小化的复现代码
```

## 额外信息
其他需要说明的内容
```

## 📚 相关资源

- [API 文档](./components/)
- [开发指南](./getting-started.md)
- [贡献指南](./contributing.md)
- [更新日志](./changelog.md)
- [最佳实践](./guides/best-practices.md)

---

如果本指南中没有找到您的问题解决方案，请通过上述渠道联系我们。