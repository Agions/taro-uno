# useStyle 样式管理钩子

样式管理钩子用于动态管理组件样式，支持主题切换、样式继承和响应式样式。

## 基础用法

```tsx
import { useStyle } from '@/hooks'

function MyComponent() {
  const { styles, theme, setTheme } = useStyle({
    theme: 'light',
    responsive: true,
    customStyles: {
      container: {
        backgroundColor: '#ffffff',
        borderRadius: 8
      }
    }
  })

  return (
    <div style={styles.container}>
      <h3>样式管理组件</h3>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </div>
  )
}
```

## 样式配置

```tsx
// 完整样式配置
const { styles } = useStyle({
  theme: 'light',                    // 主题：light、dark、auto
  variant: 'default',               // 变体：default、outlined、filled
  size: 'md',                       // 尺寸：xs、sm、md、lg、xl
  color: 'primary',                 // 颜色：primary、secondary、success、warning、error
  disabled: false,                  // 是否禁用
  loading: false,                  // 是否加载中
  responsive: true,                 // 是否响应式
  customStyles: {                  // 自定义样式
    container: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 16,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8
    },
    content: {
      fontSize: 14,
      color: '#6b7280',
      lineHeight: 1.5
    }
  },
  breakpoints: {                   // 响应式断点
    xs: { maxWidth: 576 },
    sm: { maxWidth: 768 },
    md: { maxWidth: 992 },
    lg: { maxWidth: 1200 },
    xl: { maxWidth: 1600 }
  },
  spacing: {                       // 间距配置
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {                    // 字体配置
    fontFamily: {
      primary: 'PingFang SC, sans-serif',
      secondary: 'Helvetica, Arial, sans-serif'
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75
    }
  },
  colors: {                        // 颜色配置
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
    }
  },
  shadows: {                       // 阴影配置
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  borderRadius: {                 // 圆角配置
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '6px',
    xl: '8px',
    '2xl': '12px',
    '3xl': '16px',
    full: '9999px'
  },
  animation: {                    // 动画配置
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  }
})
```

## 主题管理

```tsx
// 主题切换
const { theme, setTheme, toggleTheme } = useStyle({
  theme: 'light'
})

// 切换主题
const handleThemeChange = () => {
  setTheme('dark')
}

// 切换主题（自动）
const handleAutoTheme = () => {
  setTheme('auto')
}

// 切换主题（切换）
const handleToggleTheme = () => {
  toggleTheme()
}

// 主题样式
const themeStyles = {
  light: {
    backgroundColor: '#ffffff',
    color: '#111827',
    borderColor: '#e5e7eb'
  },
  dark: {
    backgroundColor: '#111827',
    color: '#f9fafb',
    borderColor: '#374151'
  }
}
```

## 响应式样式

```tsx
// 响应式样式
const { styles, getResponsiveStyle } = useStyle({
  responsive: true,
  breakpoints: {
    xs: { maxWidth: 576 },
    sm: { maxWidth: 768 },
    md: { maxWidth: 992 },
    lg: { maxWidth: 1200 },
    xl: { maxWidth: 1600 }
  }
})

// 获取响应式样式
const responsiveStyles = getResponsiveStyle({
  container: {
    padding: { xs: 8, sm: 16, md: 24, lg: 32 },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 18 }
  }
})

// 使用响应式样式
<div style={responsiveStyles.container}>
  <h3 style={responsiveStyles.title}>响应式内容</h3>
</div>
```

## 动态样式

```tsx
// 动态样式
const { styles, updateStyles } = useStyle({
  customStyles: {
    button: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: 4
    }
  }
})

// 更新样式
const handleUpdateStyles = () => {
  updateStyles({
    button: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: 6
    }
  })
}

// 条件样式
const getConditionalStyles = (isActive: boolean) => {
  return {
    button: {
      backgroundColor: isActive ? '#10b981' : '#6b7280',
      color: '#ffffff',
      cursor: isActive ? 'pointer' : 'not-allowed'
    }
  }
}
```

## 样式继承

```tsx
// 样式继承
const { styles, createStyleVariant } = useStyle({
  customStyles: {
    base: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#ffffff'
    },
    card: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    elevated: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  }
})

// 创建样式变体
const cardStyles = createStyleVariant('base', ['card'])
const elevatedCardStyles = createStyleVariant('base', ['card', 'elevated'])

// 使用继承样式
<div style={styles.base}>
  <div style={styles.card}>
    <h3>基础卡片</h3>
  </div>
  <div style={elevatedCardStyles}>
    <h3>悬浮卡片</h3>
  </div>
</div>
```

## CSS变量

```tsx
// CSS变量
const { styles, cssVariables } = useStyle({
  useCSSVariables: true,
  customStyles: {
    container: {
      '--primary-color': '#3b82f6',
      '--secondary-color': '#6b7280',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--error-color': '#ef4444',
      '--border-radius': '8px',
      '--spacing': '16px'
    }
  }
})

// 使用CSS变量
<div style={styles.container}>
  <h3 style={{ color: 'var(--primary-color)' }}>CSS变量</h3>
</div>
```

## 样式工具

```tsx
// 样式工具
const { 
  styles, 
  mergeStyles, 
  applyTheme, 
  getStyleValue,
  parseStyleString 
} = useStyle()

// 合并样式
const mergedStyles = mergeStyles(
  styles.container,
  { backgroundColor: '#f0f9ff' }
)

// 应用主题
const themedStyles = applyTheme(styles.container, 'dark')

// 获取样式值
const backgroundColor = getStyleValue(styles.container, 'backgroundColor')

// 解析样式字符串
const parsedStyles = parseStyleString('color: #3b82f6; font-size: 16px;')
```

## API

### Options

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| theme | string | 'light' | 主题设置 |
| variant | string | 'default' | 样式变体 |
| size | string | 'md' | 尺寸设置 |
| color | string | 'primary' | 颜色设置 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中 |
| responsive | boolean | true | 是否响应式 |
| useCSSVariables | boolean | false | 是否使用CSS变量 |
| customStyles | object | {} | 自定义样式 |
| breakpoints | object | - | 响应式断点 |
| spacing | object | - | 间距配置 |
| typography | object | - | 字体配置 |
| colors | object | - | 颜色配置 |
| shadows | object | - | 阴影配置 |
| borderRadius | object | - | 圆角配置 |
| animation | object | - | 动画配置 |

### 返回值

| 属性名 | 类型 | 说明 |
|--------|------|------|
| styles | object | 生成的样式对象 |
| theme | string | 当前主题 |
| config | object | 配置对象 |
| setTheme | (theme: string) => void | 设置主题 |
| toggleTheme | () => void | 切换主题 |
| updateStyles | (styles: object) => void | 更新样式 |
| mergeStyles | (...styles: object[]) => object | 合并样式 |
| createStyleVariant | (base: string, variants: string[]) => object | 创建样式变体 |
| getResponsiveStyle | (styles: object) => object | 获取响应式样式 |
| applyTheme | (styles: object, theme: string) => object | 应用主题 |
| getStyleValue | (styles: object, property: string) => any | 获取样式值 |
| parseStyleString | (styleString: string) => object | 解析样式字符串 |
| cssVariables | object | CSS变量对象 |

### 样式工具方法

```tsx
// 样式工具
const styleUtils = {
  // 生成样式类名
  generateClassName: (base: string, modifiers: object) => string,
  
  // 生成响应式样式
  generateResponsiveStyles: (styles: object, breakpoints: object) => object,
  
  // 应用媒体查询
  applyMediaQuery: (styles: object, mediaQuery: string) => object,
  
  // 转换样式单位
  convertUnit: (value: number, unit: string, targetUnit: string) => number,
  
  // 计算对比度
  calculateContrast: (color1: string, color2: string) => number,
  
  // 生成颜色变体
  generateColorVariants: (color: string) => object,
  
  // 应用动画
  applyAnimation: (styles: object, animation: string) => object
}
```

## 最佳实践

1. **主题一致性**：在整个应用中保持主题的一致性
2. **响应式设计**：使用响应式样式适配不同屏幕尺寸
3. **性能优化**：避免过度复杂的样式计算和更新
4. **可维护性**：使用结构化的样式配置和命名规范

## 注意事项

1. 样式计算可能会影响性能，特别是在复杂组件中
2. 在移动端考虑使用简化的样式配置
3. 确保样式在不同主题下都有良好的可读性
4. 使用CSS变量可以提高样式的可维护性和性能