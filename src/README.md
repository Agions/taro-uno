# Taro-Uno UI 核心工具函数和类型定义

本目录包含了 Taro-Uno UI 组件库的核心工具函数和类型定义，为多端开发提供统一的基础设施。

## 📁 文件结构

```
src/
├── types/           # 类型定义
│   └── index.ts     # 核心类型定义
├── utils/           # 工具函数
│   └── index.ts     # 核心工具函数
├── constants/       # 常量定义
│   └── index.ts     # 组件、主题、平台等常量
├── platform/        # 平台适配
│   └── index.ts     # 平台适配器和工具
├── example.ts       # 使用示例
└── README.md        # 本文档
```

## 🚀 快速开始

### 导入核心模块

```typescript
// 导入类型定义
import type { 
  Platform, 
  ThemeConfig, 
  BaseComponentProps,
  RequestConfig 
} from './types'

// 导入工具函数
import { 
  platform, 
  format, 
  validate, 
  event, 
  perf, 
  style 
} from './utils'

// 导入常量
import { 
  COMPONENT_SIZES, 
  COMPONENT_VARIANTS, 
  ERROR_CODES 
} from './constants'

// 导入平台适配器
import { platformAdapter } from './platform'
```

## 📋 类型定义

### 平台类型

```typescript
// 支持的平台类型
type Platform = 'weapp' | 'alipay' | 'swan' | 'tt' | 'qq' | 'h5' | 'rn' | 'jd'

// 平台信息
interface PlatformInfo {
  platform: Platform
  isMiniProgram: boolean
  isH5: boolean
  isRN: boolean
  system: Taro.getSystemInfoSync.Result
  SDKVersion?: string
  version?: string
}
```

### 组件类型

```typescript
// 基础组件属性
interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  testID?: string
  disabled?: boolean
  loading?: boolean
  children?: ReactNode
}

// 尺寸和变体
type Size = 'small' | 'medium' | 'large' | 'default'
type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
```

### 主题类型

```typescript
// 主题配置
interface ThemeConfig {
  mode: ThemeMode
  colors: ThemeColors
  spacing: ThemeSpacing
  typography: ThemeTypography
  radius: ThemeRadius
  cssVars?: Record<string, string>
}
```

## 🛠️ 工具函数

### 平台检测工具

```typescript
// 获取当前平台
const currentPlatform = platform.getPlatform()

// 获取平台信息
const platformInfo = platform.getPlatformInfo()

// 判断平台类型
if (platform.isMiniProgram()) {
  console.log('小程序环境')
} else if (platform.isH5()) {
  console.log('H5环境')
}

// 检查功能支持
if (platform.isFeatureSupported('camera')) {
  console.log('支持相机功能')
}
```

### 格式化工具

```typescript
// 格式化金额
const price = format.formatMoney(1234.56, {
  currency: '¥',
  decimals: 2
}) // ¥1,234.56

// 格式化日期
const date = format.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 格式化文件大小
const size = format.formatFileSize(1024 * 1024) // 1.00 MB

// 格式化手机号
const phone = format.formatPhone('13812345678') // 138 1234 5678
```

### 验证工具

```typescript
// 验证邮箱
const isValidEmail = validate.isEmail('test@example.com')

// 验证手机号
const isValidPhone = validate.isPhone('13812345678')

// 验证身份证号
const isValidIdCard = validate.isIdCard('110101199003078034')

// 验证URL
const isValidUrl = validate.isUrl('https://www.example.com')

// 验证密码强度
const isStrongPassword = validate.isStrongPassword('Test123!@#')
```

### 事件处理工具

```typescript
// 防抖函数
const debouncedSearch = event.debounce((keyword: string) => {
  console.log('搜索:', keyword)
}, 300)

// 节流函数
const throttledScroll = event.throttle(() => {
  console.log('滚动事件')
}, 100)

// 记忆化函数
const fibonacci = event.memoize((n: number): number => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
})
```

### 性能监控工具

```typescript
// 测量异步函数执行时间
const result = await perf.measureAsync('api-request', async () => {
  const response = await fetch('/api/data')
  return response.json()
})

// 测量同步函数执行时间
perf.measureSync('calculation', () => {
  // 复杂计算
})

// 获取内存信息
const memoryInfo = perf.getMemoryInfo()
```

### 样式工具

```typescript
// 转换CSS单位
const remValue = style.convertUnit(16, 'rem') // 1rem

// 生成CSS变量
const cssVars = style.generateCSSVars('color', {
  primary: '#1890ff',
  secondary: '#52c41a'
})

// 生成阴影
const shadow = style.generateShadow(2)

// 调整颜色亮度
const lightColor = style.adjustColor('#1890ff', 20)
```

## 🌐 平台适配器

### 网络请求

```typescript
const response = await platformAdapter.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  showLoading: true,
  loadingText: '加载中...'
})
```

### 存储操作

```typescript
// 存储数据
await platformAdapter.storage.set('key', 'value')

// 获取数据
const value = await platformAdapter.storage.get('key')

// 删除数据
await platformAdapter.storage.remove('key')

// 清空存储
await platformAdapter.storage.clear()
```

### 系统信息

```typescript
// 获取系统信息
const systemInfo = await platformAdapter.system.getSystemInfo()

// 获取网络信息
const networkInfo = await platformAdapter.system.getNetworkType()

// 获取电池信息
const batteryInfo = await platformAdapter.system.getBatteryInfo()
```

## 📊 常量定义

### 组件常量

```typescript
// 组件尺寸
COMPONENT_SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  default: 'default'
}

// 组件变体
COMPONENT_VARIANTS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  // ...
}
```

### 错误码常量

```typescript
ERROR_CODES = {
  UNKNOWN_ERROR: 1000,
  INVALID_PARAMS: 1001,
  NETWORK_ERROR: 1002,
  // ...
}
```

### 主题常量

```typescript
// 默认主题颜色
DEFAULT_THEME_COLORS = {
  primary: '#1890ff',
  secondary: '#52c41a',
  success: '#52c41a',
  // ...
}

// 主题模式
THEME_MODES = {
  light: 'light',
  dark: 'dark',
  auto: 'auto'
}
```

## 🔧 最佳实践

### 1. 平台检测

```typescript
// 推荐：使用平台检测工具进行条件渲染
function MyComponent() {
  const isH5 = platform.isH5()
  
  return (
    <div>
      {isH5 ? (
        <BrowserComponent />
      ) : (
        <MiniProgramComponent />
      )}
    </div>
  )
}
```

### 2. 错误处理

```typescript
// 推荐：统一的错误处理
async function fetchData() {
  try {
    const response = await platformAdapter.request({
      url: '/api/data',
      method: 'GET'
    })
    return response.data
  } catch (error) {
    console.error('请求失败:', error)
    // 根据错误码进行不同处理
    if (error.code === ERROR_CODES.NETWORK_ERROR) {
      // 网络错误处理
    }
    throw error
  }
}
```

### 3. 性能优化

```typescript
// 推荐：使用防抖和节流优化性能
const SearchComponent = () => {
  const [keyword, setKeyword] = useState('')
  
  // 使用防抖优化搜索
  const debouncedSearch = event.debounce(async (keyword: string) => {
    const results = await searchAPI(keyword)
    // 处理搜索结果
  }, 300)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyword(value)
    debouncedSearch(value)
  }
  
  return (
    <input
      type="text"
      value={keyword}
      onChange={handleChange}
      placeholder="搜索..."
    />
  )
}
```

### 4. 主题配置

```typescript
// 推荐：使用CSS变量和主题配置
const theme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    // ...
  },
  // ...
}

// 生成CSS变量
const cssVars = style.generateCSSVars('theme', theme.colors)

// 应用到根元素
Object.entries(cssVars).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})
```

## 📝 示例代码

完整的示例代码请参考 `example.ts` 文件，其中包含了所有工具函数和类型定义的使用示例。

```bash
# 运行示例
npm run dev
# 或
pnpm dev
```

## 🤝 贡献指南

欢迎贡献代码！请确保：

1. 遵循项目的 TypeScript 规范
2. 添加适当的类型定义
3. 编写测试用例
4. 更新相关文档

## 📄 许可证

MIT License