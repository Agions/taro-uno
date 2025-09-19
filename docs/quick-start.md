# 快速开始指南

本指南将帮助您快速上手 Taro-Uno UI，从安装到构建您的第一个组件库应用。

## 🚀 安装

### 环境要求

确保您的开发环境满足以下要求：

- **Node.js** >= 16.14.0
- **pnpm** >= 7.0.0
- **Taro** >= 3.6.0

### 新功能特性

Taro-Uno UI 现在包含以下强大的新功能：

- ✅ **智能无障碍支持**: 自动生成无障碍标签和状态管理
- ✅ **标准化组件类型**: 统一的组件属性和类型定义
- ✅ **性能优化工具**: 完整的性能监控和优化体系
- ✅ **增强测试框架**: 内置无障碍测试工具
- ✅ **优化的构建配置**: 自动代码分割和Bundle优化

### 创建项目

#### 使用 Taro CLI（推荐）

```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建 Taro 项目
taro init my-taro-app

# 进入项目目录
cd my-taro-app
```

#### 手动安装

```bash
# 创建项目目录
mkdir my-taro-app
cd my-taro-app

# 初始化 npm 项目
npm init -y

# 安装 Taro 依赖
npm install @tarojs/cli @tarojs/components @tarojs/runtime @tarojs/taro
```

### 安装 Taro-Uno UI

```bash
# 使用 pnpm 安装（推荐）
pnpm add @taro-uno/ui

# 使用 npm 安装
npm install @taro-uno/ui

# 使用 yarn 安装
yarn add @taro-uno/ui
```

## ⚙️ 配置

### 1. 配置 Taro

编辑 `config/index.js` 文件：

```javascript
const config = {
  projectName: 'my-taro-app',
  date: '2024-1-1',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html'
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false
    }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
```

### 2. 配置 TypeScript

编辑 `tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["es2017", "dom"],
    "module": "commonjs",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"]
    },
    "allowJs": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist"
  },
  "include": [
    "./src",
    "./types"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 3. 配置样式导入

在 `src/app.tsx` 中导入全局样式：

```tsx
import { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

// 导入 Taro-Uno UI 样式
import '@taro-uno/ui/dist/styles.css'

// 或者按需导入
// import '@taro-uno/ui/dist/button/styles.css'
// import '@taro-uno/ui/dist/input/styles.css'

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className='app'>
      {children}
    </View>
  )
}

export default App
```

## 🎯 使用组件

### 1. 基础组件使用

创建 `src/pages/index/index.tsx`：

```tsx
import { View } from '@tarojs/components'
import { Button, Text, Icon } from '@taro-uno/ui'
import './index.scss'

export default function Index() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <View className='index'>
      <Text className='title'>欢迎使用 Taro-Uno UI</Text>
      
      <Button 
        type='primary' 
        size='large'
        onClick={handleClick}
      >
        点击我
      </Button>
      
      <Button 
        type='secondary' 
        icon={<Icon name='star' />}
        iconPosition='right'
      >
        带图标的按钮
      </Button>
      
      <Button loading>
        加载中...
      </Button>
      
      <Button disabled>
        禁用状态
      </Button>
    </View>
  )
}
```

### 2. 表单组件使用

创建 `src/pages/form/form.tsx`：

```tsx
import { View } from '@tarojs/components'
import { Form, Input, Select, Radio, Checkbox } from '@taro-uno/ui'
import './form.scss'

export default function FormPage() {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values)
  }

  return (
    <View className='form-page'>
      <Form onSubmit={handleSubmit}>
        <Form.Item 
          label='用户名' 
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        
        <Form.Item 
          label='邮箱' 
          name='email'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        
        <Form.Item 
          label='性别' 
          name='gender'
        >
          <Radio.Group>
            <Radio value='male'>男</Radio>
            <Radio value='female'>女</Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item 
          label='兴趣' 
          name='interests'
        >
          <Checkbox.Group>
            <Checkbox value='reading'>阅读</Checkbox>
            <Checkbox value='sports'>运动</Checkbox>
            <Checkbox value='music'>音乐</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </View>
  )
}
```

### 3. 无障碍功能使用

创建 `src/pages/accessibility/accessibility.tsx`：

```tsx
import { View } from '@tarojs/components'
import { Button, Input, Form } from '@taro-uno/ui'
import { AccessibilityEventHandler, WCAGValidator } from '@taro-uno/ui/utils/accessibility'
import './accessibility.scss'

export default function AccessibilityPage() {
  const handleSubmit = (values: any) => {
    // 自动生成屏幕阅读器公告
    AccessibilityEventHandler.announceToScreenReader(
      '表单提交成功',
      'polite'
    )
    console.log('Form submitted:', values)
  }

  const handleButtonClick = () => {
    // 键盘事件处理
    const handleKeyEvent = (event: KeyboardEvent) => {
      AccessibilityEventHandler.handleKeyboardNavigation(event, {
        onEnter: () => console.log('Enter pressed'),
        onSpace: () => console.log('Space pressed'),
        onEscape: () => console.log('Escape pressed')
      })
    }

    console.log('Button clicked!')
  }

  // 验证颜色对比度
  const checkContrast = () => {
    const result = WCAGValidator.validateColorContrast('#1890ff', '#ffffff')
    console.log('Color contrast result:', result)
  }

  return (
    <View className='accessibility-page'>
      <Text>无障碍功能演示</Text>

      <Form onSubmit={handleSubmit}>
        <Form.Item label='用户名' name='username'>
          <Input
            placeholder='请输入用户名'
            // 自动生成无障碍标签
            aria-required="true"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            onClick={handleButtonClick}
            // 自动生成无障碍属性
            loading={false}
            disabled={false}
          >
            提交表单
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={checkContrast}>
        检查颜色对比度
      </Button>
    </View>
  )
}
```

### 4. 性能监控使用

创建 `src/pages/performance/performance.tsx`：

```tsx
import { View } from '@tarojs/components'
import { Button, PerformanceMonitor } from '@taro-uno/ui'
import { usePerformanceMonitor } from '@taro-uno/ui/hooks/usePerformanceMonitor'
import { debounce, throttle } from '@taro-uno/ui/utils/performance'
import './performance.scss'

export default function PerformancePage() {
  const { metrics, startMonitoring, stopMonitoring } = usePerformanceMonitor({
    enableRenderMonitor: true,
    enableMemoryMonitor: true,
    thresholds: {
      renderTime: 16,
      memoryUsage: 50,
      interactionTime: 100
    },
    onPerformanceWarning: (metrics) => {
      console.warn('性能警告:', metrics)
    }
  })

  // 使用防抖处理搜索
  const debouncedSearch = debounce((query: string) => {
    console.log('搜索:', query)
  }, 300)

  // 使用节流处理滚动
  const throttledScroll = throttle((event: Event) => {
    console.log('滚动事件:', event)
  }, 100)

  const handleSearch = (e: any) => {
    debouncedSearch(e.target.value)
  }

  const handleScroll = (e: any) => {
    throttledScroll(e)
  }

  return (
    <View className='performance-page'>
      <Text>性能监控演示</Text>

      <Button onClick={startMonitoring}>
        开始监控
      </Button>

      <Button onClick={stopMonitoring}>
        停止监控
      </Button>

      <View className='performance-metrics'>
        <Text>渲染时间: {metrics.renderTime}ms</Text>
        <Text>内存使用: {metrics.memoryUsage?.percentage}%</Text>
        <Text>交互时间: {metrics.interactionTime}ms</Text>
      </View>

      <PerformanceMonitor
        autoStart={true}
        interval={5000}
        showChart={true}
        showRecommendations={true}
        onGenerateReport={(report) => {
          console.log('性能报告:', report)
        }}
      />

      <Input
        placeholder='搜索（防抖）'
        onInput={handleSearch}
      />

      <View
        className='scroll-container'
        onScroll={handleScroll}
        style={{ height: '200px', overflow: 'auto' }}
      >
        <View style={{ height: '500px' }}>
          滚动内容区域
        </View>
      </View>
    </View>
  )
}
```

### 5. 主题定制

创建 `src/pages/theme/theme.tsx`：

```tsx
import { View } from '@tarojs/components'
import { Button, useTheme } from '@taro-uno/ui'
import './theme.scss'

export default function ThemePage() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <View className='theme-page'>
      <Text>当前主题: {theme}</Text>

      <Button onClick={toggleTheme}>
        切换主题
      </Button>

      <View className='theme-demo'>
        <Button type='primary'>主要按钮</Button>
        <Button type='secondary'>次要按钮</Button>
        <Button type='success'>成功按钮</Button>
        <Button type='warning'>警告按钮</Button>
        <Button type='error'>错误按钮</Button>
      </View>
    </View>
  )
}
```

## 🎨 样式定制

### 1. 全局主题变量

创建 `src/styles/theme.scss`：

```scss
// 主题变量
:root {
  // 主色调
  --primary-color: #1890ff;
  --secondary-color: #6c757d;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --info-color: #17a2b8;
  
  // 文字颜色
  --text-color: rgba(0, 0, 0, 0.85);
  --text-color-secondary: rgba(0, 0, 0, 0.65);
  --text-color-light: rgba(0, 0, 0, 0.45);
  
  // 背景颜色
  --background-color: #ffffff;
  --background-color-light: #fafafa;
  
  // 边框颜色
  --border-color: #d9d9d9;
  --border-color-light: #f0f0f0;
  
  // 圆角
  --border-radius: 4px;
  --border-radius-sm: 2px;
  --border-radius-lg: 8px;
  
  // 间距
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  // 字体大小
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  
  // 阴影
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --box-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.2);
}

// 暗色主题
[data-theme='dark'] {
  --primary-color: #40a9ff;
  --secondary-color: #8c8c8c;
  --success-color: #73d13d;
  --warning-color: #ffc53d;
  --error-color: #ff4d4f;
  --info-color: #40a9ff;
  
  --text-color: rgba(255, 255, 255, 0.85);
  --text-color-secondary: rgba(255, 255, 255, 0.65);
  --text-color-light: rgba(255, 255, 255, 0.45);
  
  --background-color: #141414;
  --background-color-light: #1f1f1f;
  
  --border-color: #434343;
  --border-color-light: #303030;
}
```

### 2. 组件样式覆盖

创建 `src/styles/components.scss`：

```scss
// 按钮样式覆盖
.taro-uno-button {
  &--primary {
    background: linear-gradient(45deg, var(--primary-color), #40a9ff);
    border: none;
    
    &:hover {
      background: linear-gradient(45deg, #40a9ff, #69c0ff);
    }
  }
  
  &--large {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
  }
}

// 输入框样式覆盖
.taro-uno-input {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 8px 12px;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}

// 卡片样式覆盖
.taro-uno-card {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  
  &__header {
    border-bottom: 1px solid var(--border-color-light);
    padding: var(--spacing-md);
  }
  
  &__body {
    padding: var(--spacing-md);
  }
}
```

## 🚀 开发和构建

### 1. 开发环境

```bash
# H5 开发环境
pnpm dev:h5

# 微信小程序开发环境
pnpm dev:weapp

# 支付宝小程序开发环境
pnpm dev:alipay

# 百度小程序开发环境
pnpm dev:swan

# 字节跳动小程序开发环境
pnpm dev:tt

# QQ 小程序开发环境
pnpm dev:qq
```

### 2. 生产构建

```bash
# H5 生产构建
pnpm build:h5

# 微信小程序生产构建
pnpm build:weapp

# 支付宝小程序生产构建
pnpm build:alipay

# 百度小程序生产构建
pnpm build:swan

# 字节跳动小程序生产构建
pnpm build:tt

# QQ 小程序生产构建
pnpm build:qq
```

### 3. 测试

```bash
# 运行测试
pnpm test

# 生成测试覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch

# 运行测试 UI 模式
pnpm test:ui

# 运行无障碍测试
pnpm test:accessibility

# 运行性能测试
pnpm test:performance

# 生成测试报告
pnpm test:report
```

### 4. 新增测试工具

我们提供了强大的测试工具库：

#### 无障碍测试
```tsx
import { AccessibilityTestUtils } from '@taro-uno/ui/tests/utils/accessibility-test-utils'
import { render, screen } from '@testing-library/react'

test('按钮组件无障碍测试', async () => {
  const { container } = render(<Button>点击我</Button>)

  // 运行完整无障碍测试
  const result = await AccessibilityTestUtils.runAccessibilityTest(container)

  expect(result.passed).toBe(true)
  expect(result.score).toBeGreaterThan(90)

  // 使用自定义匹配器
  expect(screen.getByRole('button')).toBeAccessible()
})

test('表单组件无障碍验证', () => {
  const { container } = render(
    <Form>
      <Form.Item label='用户名' name='username'>
        <Input />
      </Form.Item>
    </Form>
  )

  const form = container.querySelector('form')
  const formResult = AccessibilityTestUtils.validateFormAccessibility(form)

  expect(formResult.passed).toBe(true)
})
```

#### 性能测试
```tsx
import { usePerformanceMonitor } from '@taro-uno/ui/hooks/usePerformanceMonitor'

test('组件性能测试', () => {
  const { metrics } = usePerformanceMonitor({
    enableRenderMonitor: true,
    thresholds: { renderTime: 16 }
  })

  expect(metrics.renderTime).toBeLessThanOrEqual(16)
})
```

#### 组件测试
```tsx
import { render } from '@testing-library/react'
import { Button } from '@taro-uno/ui'

test('按钮组件渲染测试', () => {
  const { getByText, getByRole } = render(<Button>测试按钮</Button>)

  expect(getByText('测试按钮')).toBeInTheDocument()
  expect(getByRole('button')).toHaveAttribute('aria-label', '测试按钮')
})

test('按钮加载状态测试', () => {
  const { rerender } = render(<Button loading>加载中</Button>)

  expect(screen.getByText('加载中')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')

  rerender(<Button>正常状态</Button>)

  expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
})
```

## 📱 平台特定配置

### 1. 微信小程序配置

编辑 `project.config.json`：

```json
{
  "description": "项目配置文件",
  "packOptions": {
    "ignore": []
  },
  "miniprogramRoot": "dist",
  "compileType": "miniprogram",
  "projectname": "my-taro-app",
  "setting": {
    "urlCheck": false,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": false,
    "coverView": true,
    "nodeModules": false,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    },
    "enableEngineNative": false,
    "bundle": false,
    "useIsolateContext": true,
    "useCompilerModule": true,
    "userConfirmedUseCompilerModuleSwitch": false,
    "userConfirmedBundleSwitch": false,
    "packNpmManually": false,
    "packNpmRelationList": [],
    "minifyWXSS": true
  },
  "appid": "your-app-id",
  "libVersion": "2.19.4",
  "debugOptions": {
    "hidedInDevtools": []
  },
  "scripts": {},
  "staticServerOptions": {
    "baseURL": "",
    "servePath": ""
  },
  "isGameTourist": false,
  "condition": {
    "search": {
      "list": []
    },
    "conversation": {
      "list": []
    },
    "game": {
      "list": []
    },
    "plugin": {
      "list": []
    },
    "gamePlugin": {
      "list": []
    },
    "miniprogram": {
      "list": []
    }
  }
}
```

### 2. H5 配置

编辑 `config/dev.js` 和 `config/prod.js`：

```javascript
// config/dev.js
module.exports = {
  env: {
    NODE_ENV: 'development'
  },
  defineConstants: {
    'process.env.NODE_ENV': '"development"'
  },
  h5: {
    devServer: {
      port: 10086,
      host: 'localhost'
    }
  }
}

// config/prod.js
module.exports = {
  env: {
    NODE_ENV: 'production'
  },
  defineConstants: {
    'process.env.NODE_ENV': '"production"'
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    outputRoot: 'dist/h5'
  }
}
```

## 🛠️ 故障排除

### 常见问题

1. **样式不生效**
   - 检查是否正确导入了样式文件
   - 确认 CSS 变量是否正确定义
   - 验证样式优先级

2. **类型错误**
   - 确认 TypeScript 配置正确
   - 检查类型定义文件是否完整
   - 重新生成类型声明

3. **构建失败**
   - 检查依赖版本兼容性
   - 清理缓存重新安装
   - 查看详细的错误日志

### 获取帮助

- 📖 [文档网站](https://taro-uno.com)
- 🐛 [GitHub Issues](https://github.com/taro-uno/ui/issues)
- 💬 [社区讨论](https://github.com/taro-uno/ui/discussions)
- 📧 邮箱支持：[dev@taro-uno.com](mailto:dev@taro-uno.com)

---

现在您已经成功搭建了 Taro-Uno UI 的开发环境，可以开始构建您的多端应用了！