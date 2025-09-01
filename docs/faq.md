# 常见问题

这里收集了使用 Taro UI 组件库时的常见问题和解决方案。

## 🚀 安装和配置

### Q: 如何安装 Taro UI？

**A:** 使用 pnpm、npm 或 yarn 安装：

```bash
pnpm add taro-uno
# 或
npm install taro-uno
# 或
yarn add taro-uno
```

### Q: 项目需要什么前置条件？

**A:** 需要以下环境：

- Node.js >= 14.0.0
- pnpm >= 7.0.0
- Taro >= 3.0.0

### Q: 如何配置 TypeScript？

**A:** 项目已经内置了 TypeScript 支持，确保您的 tsconfig.json 包含：

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src"
  ]
}
```

## 🎨 样式和主题

### Q: 如何自定义主题？

**A:** 您可以通过以下方式自定义主题：

```tsx
import { useTheme } from 'taro-uno/hooks'

function App() {
  const { setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme('dark')}>
      切换到深色主题
    </button>
  )
}
```

### Q: 如何覆盖默认样式？

**A:** 使用 CSS 变量或样式覆盖：

```scss
/* 使用 CSS 变量 */
:root {
  --color-primary: #10b981;
  --radius-md: 8px;
}

/* 或直接覆盖样式 */
.taro-button {
  background-color: #10b981 !important;
}
```

### Q: 如何使用自定义字体？

**A:** 在全局样式中设置：

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-primary: 'Inter', sans-serif;
}
```

## 🧩 组件使用

### Q: Button 组件如何处理点击事件？

**A:** 使用 onClick 属性：

```tsx
import { Button } from 'taro-uno'

function MyComponent() {
  const handleClick = () => {
    console.log('按钮被点击')
  }
  
  return (
    <Button onClick={handleClick}>
      点击我
    </Button>
  )
}
```

### Q: Form 组件如何处理表单提交？

**A:** 使用 onSubmit 回调：

```tsx
import { Form, Input, Button } from 'taro-uno'

function MyForm() {
  const handleSubmit = (values) => {
    console.log('表单数据:', values)
  }
  
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username">
        <Input placeholder="用户名" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
```

### Q: Modal 组件如何控制显示状态？

**A:** 使用 visible 属性和回调函数：

```tsx
import { Modal, Button } from 'taro-uno'

function MyComponent() {
  const [visible, setVisible] = useState(false)
  
  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        打开模态框
      </Button>
      
      <Modal
        visible={visible}
        title="标题"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        模态框内容
      </Modal>
    </div>
  )
}
```

### Q: VirtualList 组件如何处理大量数据？

**A:** 确保数据源稳定，使用合适的配置：

```tsx
import { VirtualList } from 'taro-uno'

function MyList() {
  const data = useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `项目 ${i + 1}`
    }))
  , [])
  
  return (
    <VirtualList
      data={data}
      itemHeight={50}
      renderItem={(item) => (
        <div>{item.name}</div>
      )}
    />
  )
}
```

## 📱 跨平台问题

### Q: 如何处理不同平台的样式差异？

**A:** 使用平台检测和条件样式：

```tsx
import { usePlatform } from 'taro-uno/hooks'

function MyComponent() {
  const platform = usePlatform()
  
  const getStyles = () => {
    if (platform.isH5) {
      return { padding: '16px' }
    }
    if (platform.isWeapp) {
      return { padding: '12px' }
    }
    return { padding: '8px' }
  }
  
  return <div style={getStyles()}>内容</div>
}
```

### Q: 如何处理小程序中的图片路径？

**A:** 使用绝对路径或配置域名白名单：

```tsx
// 使用绝对路径
<Image src="/static/images/logo.png" />

// 或配置域名白名单
<Image src="https://example.com/images/logo.png" />
```

### Q: 如何处理不同平台的 API 差异？

**A:** 使用平台特定的 API 包装：

```tsx
import { usePlatform } from 'taro-uno/hooks'

function useStorage() {
  const platform = usePlatform()
  
  const setItem = (key: string, value: any) => {
    if (platform.isH5) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      Taro.setStorageSync(key, value)
    }
  }
  
  const getItem = (key: string) => {
    if (platform.isH5) {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } else {
      return Taro.getStorageSync(key)
    }
  }
  
  return { setItem, getItem }
}
```

## 🚀 性能优化

### Q: 如何优化组件的渲染性能？

**A:** 使用以下优化策略：

```tsx
import { memo, useMemo, useCallback } from 'react'

// 1. 使用 memo 避免不必要的重渲染
const MyComponent = memo(({ data }) => {
  // 2. 使用 useMemo 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }))
  }, [data])
  
  // 3. 使用 useCallback 缓存函数
  const handleClick = useCallback(() => {
    console.log('点击事件')
  }, [])
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={handleClick}>
          {item.name}
        </div>
      ))}
    </div>
  )
})
```

### Q: 如何优化长列表的性能？

**A:** 使用虚拟列表和懒加载：

```tsx
import { VirtualList, LazyComponent } from 'taro-uno'

// 1. 使用虚拟列表
function LongList() {
  return (
    <VirtualList
      data={largeData}
      itemHeight={50}
      renderItem={(item) => <ListItem item={item} />}
    />
  )
}

// 2. 使用懒加载
const HeavyItem = LazyComponent(() => import('./HeavyItem'))
```

### Q: 如何减少包体积？

**A:** 使用以下策略：

```tsx
// 1. 动态导入
const Modal = lazy(() => import('./Modal'))

// 2. 按需导入
import { Button } from 'taro-uno/components/basic/Button'

// 3. Tree Shaking
// 只导入需要的组件和样式
```

## 🧪 测试问题

### Q: 如何编写组件测试？

**A:** 使用 React Testing Library：

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from 'taro-uno'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>测试按钮</Button>)
    expect(screen.getByText('测试按钮')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>测试按钮</Button>)
    
    fireEvent.click(screen.getByText('测试按钮'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Q: 如何测试异步操作？

**A:** 使用 async/await 和 waitFor：

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { AsyncComponent } from './AsyncComponent'

describe('AsyncComponent', () => {
  it('loads data asynchronously', async () => {
    render(<AsyncComponent />)
    
    expect(screen.getByText('加载中...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('数据加载完成')).toBeInTheDocument()
    })
  })
})
```

## 🛠️ 开发和构建

### Q: 如何启动开发服务器？

**A:** 使用以下命令：

```bash
pnpm run dev
```

### Q: 如何构建生产版本？

**A:** 使用以下命令：

```bash
pnpm run build
```

### Q: 如何运行测试？

**A:** 使用以下命令：

```bash
# 运行所有测试
pnpm run test

# 运行测试并生成覆盖率报告
pnpm run test:coverage

# 监听模式运行测试
pnpm run test:watch
```

### Q: 如何检查代码质量？

**A:** 使用以下命令：

```bash
# 代码检查
pnpm run lint

# 代码格式化
pnpm run format

# 类型检查
pnpm run type-check
```

## 📚 文档问题

### Q: 如何查找组件的 API 文档？

**A:** 查看对应组件的文档文件：

```
docs/components/[category]/[Component].md
```

### Q: 如何贡献文档？

**A:** 请参考 [贡献指南](./contributing.md)。

### Q: 文档中有错误如何反馈？

**A:** 请在 GitHub Issues 中创建问题，并标记为 "documentation" 标签。

## 🔧 调试问题

### Q: 如何调试组件？

**A:** 使用以下方法：

```tsx
// 1. 使用 console.log
function MyComponent({ data }) {
  console.log('Component data:', data)
  return <div>{data.name}</div>
}

// 2. 使用 React DevTools
// 在浏览器中安装 React Developer Tools

// 3. 使用断点调试
// 在代码中设置 debugger 语句
function handleClick() {
  debugger
  console.log('点击事件处理')
}
```

### Q: 如何调试样式问题？

**A:** 使用以下方法：

```scss
/* 1. 使用浏览器开发者工具 */
/* 在 Elements 面板检查样式 */

/* 2. 添加调试样式 */
.debug-component {
  border: 2px solid red !important;
}

/* 3. 使用 CSS 变量调试 */
:root {
  --debug-color: red;
}
```

## 🆘 常见错误

### Q: 遇到 "Module not found" 错误？

**A:** 检查以下内容：

1. 确保已正确安装依赖
2. 检查导入路径是否正确
3. 检查 TypeScript 配置

### Q: 遇到 "TypeScript error" 错误？

**A:** 检查以下内容：

1. 确保类型定义正确
2. 检查 tsconfig.json 配置
3. 运行类型检查

### Q: 遇到 "样式不生效" 错误？

**A:** 检查以下内容：

1. 确保样式文件正确导入
2. 检查 CSS 优先级
3. 检查样式隔离配置

---

如果您的问题没有在这里找到答案，请：

1. 查看 [文档](./index.md)
2. 搜索 [GitHub Issues](https://github.com/your-username/taro-uno/issues)
3. 创建新的 Issue
4. 参与 [讨论](https://github.com/your-username/taro-uno/discussions)