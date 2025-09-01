# useTheme 主题管理钩子

主题管理钩子用于管理应用的主题系统，支持主题切换、动态主题和自定义主题配置。

## 基础用法

```tsx
import { useTheme } from '@/hooks'

function ThemeComponent() {
  const { theme, setTheme, toggleTheme, colors, fonts } = useTheme({
    defaultTheme: 'light',
    storageKey: 'app-theme',
    autoDetect: true
  })

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <h3 style={{ fontFamily: fonts.primary }}>主题管理组件</h3>
      <p>当前主题: {theme}</p>
      <button onClick={() => setTheme('dark')}>深色主题</button>
      <button onClick={() => setTheme('light')}>浅色主题</button>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  )
}
```

## 主题配置

```tsx
// 完整主题配置
const { theme, colors, fonts, spacing, borderRadius } = useTheme({
  defaultTheme: 'light',              // 默认主题
  storageKey: 'app-theme',           // 本地存储键名
  autoDetect: true,                  // 自动检测系统主题
  syncWithSystem: true,             // 与系统主题同步
  themes: {                         // 主题配置
    light: {
      name: '浅色主题',
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        background: '#ffffff',
        foreground: '#111827',
        card: '#ffffff',
        cardForeground: '#111827',
        popover: '#ffffff',
        popoverForeground: '#111827',
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#f3f4f6',
        secondaryForeground: '#111827',
        muted: '#f3f4f6',
        mutedForeground: '#6b7280',
        accent: '#f3f4f6',
        accentForeground: '#111827',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#3b82f6'
      },
      fonts: {
        primary: 'PingFang SC, sans-serif',
        secondary: 'Helvetica, Arial, sans-serif',
        mono: 'Consolas, Monaco, monospace'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '12px',
        '3xl': '16px',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }
    },
    dark: {
      name: '深色主题',
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        background: '#030712',
        foreground: '#f9fafb',
        card: '#030712',
        cardForeground: '#f9fafb',
        popover: '#030712',
        popoverForeground: '#f9fafb',
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#1f2937',
        secondaryForeground: '#f9fafb',
        muted: '#1f2937',
        mutedForeground: '#9ca3af',
        accent: '#1f2937',
        accentForeground: '#f9fafb',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        border: '#1f2937',
        input: '#1f2937',
        ring: '#3b82f6'
      },
      fonts: {
        primary: 'PingFang SC, sans-serif',
        secondary: 'Helvetica, Arial, sans-serif',
        mono: 'Consolas, Monaco, monospace'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '12px',
        '3xl': '16px',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }
    }
  }
})
```

## 主题切换

```tsx
// 主题切换
const { theme, setTheme, toggleTheme, availableThemes } = useTheme()

// 切换到特定主题
const handleSetTheme = (themeName: string) => {
  setTheme(themeName)
}

// 切换主题
const handleToggleTheme = () => {
  toggleTheme()
}

// 自动检测系统主题
const handleAutoDetect = () => {
  setTheme('auto')
}

// 主题选择器
const ThemeSelector = () => (
  <div>
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value)}
    >
      {availableThemes.map(themeName => (
        <option key={themeName} value={themeName}>
          {themeName}
        </option>
      ))}
    </select>
    <button onClick={toggleTheme}>切换主题</button>
  </div>
)
```

## 自定义主题

```tsx
// 自定义主题
const { addTheme, removeTheme, updateTheme } = useTheme()

// 添加自定义主题
const addCustomTheme = () => {
  addTheme('custom', {
    name: '自定义主题',
    colors: {
      primary: '#8b5cf6',
      background: '#1e1b4b',
      foreground: '#e2e8f0',
      // ... 其他颜色配置
    },
    fonts: {
      primary: 'Custom Font, sans-serif',
      // ... 其他字体配置
    }
  })
}

// 更新主题
const updateExistingTheme = () => {
  updateTheme('light', {
    colors: {
      primary: '#10b981',
      // ... 其他颜色配置
    }
  })
}

// 移除主题
const removeCustomTheme = () => {
  removeTheme('custom')
}
```

## 主题持久化

```tsx
// 主题持久化
const { theme, setTheme, saveTheme, loadTheme } = useTheme({
  storageKey: 'app-theme'
})

// 保存主题
const handleSaveTheme = () => {
  saveTheme(theme)
}

// 加载主题
const handleLoadTheme = () => {
  const savedTheme = loadTheme()
  if (savedTheme) {
    setTheme(savedTheme)
  }
}

// 监听系统主题变化
const { listenSystemTheme } = useTheme()

useEffect(() => {
  const unlisten = listenSystemTheme((systemTheme) => {
    if (theme === 'auto') {
      setTheme(systemTheme)
    }
  })
  
  return () => unlisten()
}, [theme])
```

## 主题变量

```tsx
// 主题变量
const { theme, colors, fonts, spacing, borderRadius, shadows } = useTheme()

// 使用主题变量
const themeStyles = {
  container: {
    backgroundColor: colors.background,
    color: colors.foreground,
    fontFamily: fonts.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.md,
    fontFamily: fonts.primary
  }
}

// 主题CSS变量
const themeCSSVariables = {
  '--color-primary': colors.primary,
  '--color-background': colors.background,
  '--color-foreground': colors.foreground,
  '--font-primary': fonts.primary,
  '--spacing-md': spacing.md,
  '--border-radius-md': borderRadius.md,
  '--shadow-md': shadows.md
}
```

## 主题工具

```tsx
// 主题工具
const { 
  theme, 
  getThemeValue, 
  setThemeValue, 
  generateThemeVariants,
  exportTheme,
  importTheme 
} = useTheme()

// 获取主题值
const primaryColor = getThemeValue('colors.primary')

// 设置主题值
const handleSetThemeValue = () => {
  setThemeValue('colors.primary', '#10b981')
}

// 生成主题变体
const themeVariants = generateThemeVariants('light', {
  primary: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  background: ['#ffffff', '#f8fafc', '#f1f5f9']
})

// 导出主题
const handleExportTheme = () => {
  const themeData = exportTheme()
  console.log('主题数据:', themeData)
  
  // 下载为文件
  const blob = new Blob([JSON.stringify(themeData, null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'theme.json'
  a.click()
  URL.revokeObjectURL(url)
}

// 导入主题
const handleImportTheme = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const themeData = JSON.parse(e.target?.result as string)
      importTheme(themeData)
    } catch (error) {
      console.error('导入主题失败:', error)
    }
  }
  reader.readAsText(file)
}
```

## API

### Options

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| defaultTheme | string | 'light' | 默认主题 |
| storageKey | string | 'app-theme' | 本地存储键名 |
| autoDetect | boolean | true | 自动检测系统主题 |
| syncWithSystem | boolean | true | 与系统主题同步 |
| themes | object | - | 主题配置对象 |

### 返回值

| 属性名 | 类型 | 说明 |
|--------|------|------|
| theme | string | 当前主题名称 |
| colors | object | 当前主题颜色 |
| fonts | object | 当前主题字体 |
| spacing | object | 当前主题间距 |
| borderRadius | object | 当前主题圆角 |
| shadows | object | 当前主题阴影 |
| availableThemes | string[] | 可用主题列表 |
| setTheme | (theme: string) => void | 设置主题 |
| toggleTheme | () => void | 切换主题 |
| addTheme | (name: string, config: object) => void | 添加主题 |
| removeTheme | (name: string) => void | 移除主题 |
| updateTheme | (name: string, config: object) => void | 更新主题 |
| saveTheme | () => void | 保存主题到本地存储 |
| loadTheme | () => string \| null | 从本地存储加载主题 |
| listenSystemTheme | (callback: (theme: string) => void) => () => void | 监听系统主题变化 |
| getThemeValue | (path: string) => any | 获取主题值 |
| setThemeValue | (path: string, value: any) => void | 设置主题值 |
| generateThemeVariants | (baseTheme: string, variants: object) => object[] | 生成主题变体 |
| exportTheme | () => object | 导出主题配置 |
| importTheme | (config: object) => void | 导入主题配置 |

### 主题配置类型

```tsx
interface ThemeConfig {
  name: string
  colors: {
    primary: Record<string, string>
    gray: Record<string, string>
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  fonts: {
    primary: string
    secondary: string
    mono: string
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}
```

## 最佳实践

1. **主题一致性**：在整个应用中保持主题的一致性
2. **性能优化**：避免频繁的主题切换和样式重计算
3. **用户体验**：提供平滑的主题切换动画
4. **可访问性**：确保主题颜色对比度符合可访问性标准

## 注意事项

1. 主题切换可能会影响应用性能，特别是在复杂组件中
2. 确保主题颜色在不同背景下都有良好的可读性
3. 在移动端考虑使用简化的主题配置
4. 主题配置应该具有良好的向后兼容性