# 主题系统

主题系统提供完整的样式定制能力，支持颜色、字体、间距、动画等多种主题配置。

## 概述

主题系统基于 CSS 变量和 TypeScript 类型系统构建，提供：

- 🎨 完整的颜色主题系统
- 📱 响应式主题支持
- 🔧 灵活的定制选项
- 🚀 高性能的样式切换
- ♿ 无障碍主题支持

## 基础使用

### 1. 导入主题

```tsx
import { ThemeProvider, useTheme } from 'taro-uno'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

### 2. 使用主题

```tsx
function Component() {
  const theme = useTheme()
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.primary,
      color: theme.colors.text 
    }}>
      使用主题的组件
    </div>
  )
}
```

## 颜色主题

### 内置颜色主题

```tsx
import { ThemeProvider } from 'taro-uno'

// 使用预设主题
<ThemeProvider theme="light">
  <App />
</ThemeProvider>

<ThemeProvider theme="dark">
  <App />
</ThemeProvider>

<ThemeProvider theme="auto">
  <App />
</ThemeProvider>
```

### 自定义颜色主题

```tsx
const customTheme = {
  colors: {
    primary: '#4ecdc4',
    secondary: '#45b7d1',
    success: '#96ceb4',
    warning: '#feca57',
    error: '#ff6b6b',
    info: '#54a0ff',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#e9ecef',
    shadow: 'rgba(0, 0, 0, 0.1)'
  }
}

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### 颜色变量

```css
:root {
  /* 主色系 */
  --color-primary: #4ecdc4;
  --color-primary-light: #7eddd6;
  --color-primary-dark: #3ba99f;
  
  /* 辅助色系 */
  --color-secondary: #45b7d1;
  --color-success: #96ceb4;
  --color-warning: #feca57;
  --color-error: #ff6b6b;
  --color-info: #54a0ff;
  
  /* 中性色系 */
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #2c3e50;
  --color-text-secondary: #7f8c8d;
  --color-border: #e9ecef;
  --color-shadow: rgba(0, 0, 0, 0.1);
}
```

## 字体主题

### 字体配置

```tsx
const fontTheme = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Georgia, serif',
    mono: 'Fira Code, monospace'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900'
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em'
  }
}
```

### 字体变量

```css
:root {
  /* 字体族 */
  --font-sans: Inter, system-ui, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: Fira Code, monospace;
  
  /* 字体大小 */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-black: 900;
  
  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* 字间距 */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

## 间距主题

### 间距配置

```tsx
const spacingTheme = {
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
}
```

### 间距变量

```css
:root {
  /* 间距 */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* 圆角 */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 动画主题

### 动画配置

```tsx
const animationTheme = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    slideUp: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' }
    },
    scale: {
      from: { transform: 'scale(0.95)' },
      to: { transform: 'scale(1)' }
    }
  }
}
```

### 动画变量

```css
:root {
  /* 持续时间 */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* 缓动函数 */
  --ease-linear: linear;
  --ease-ease: ease;
  --ease-in: ease-in;
  --ease-out: ease-out;
  --ease-in-out: ease-in-out;
  
  /* 关键帧 */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes scale {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
  }
}
```

## 响应式主题

### 断点配置

```tsx
const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

### 响应式变量

```css
:root {
  --breakpoint-xs: 0px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### 响应式使用

```tsx
function ResponsiveComponent() {
  const theme = useTheme()
  
  return (
    <div style={{
      fontSize: theme.breakpoints.md ? theme.fontSize.lg : theme.fontSize.base,
      padding: theme.breakpoints.sm ? theme.spacing[4] : theme.spacing[2]
    }}>
      响应式组件
    </div>
  )
}
```

## 主题切换

### 切换方法

```tsx
import { useTheme } from 'taro-uno'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <Button onClick={toggleTheme}>
      切换主题
    </Button>
  )
}
```

### 主题持久化

```tsx
import { useEffect } from 'react'

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    // 从本地存储读取主题
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // 根据系统偏好设置主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])
  
  useEffect(() => {
    // 保存主题到本地存储
    localStorage.setItem('theme', theme)
  }, [theme])
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
```

## 自定义主题

### 完整自定义主题

```tsx
const customTheme = {
  name: 'custom',
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1',
    background: '#ffffff',
    surface: '#f7fafc',
    text: '#1a202c',
    textSecondary: '#4a5568',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Merriweather, serif',
      mono: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900'
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  }
}
```

### 使用自定义主题

```tsx
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## 主题工具

### 颜色工具

```tsx
import { themeUtils } from 'taro-uno'

// 获取颜色变体
const primaryLight = themeUtils.getColorVariant('primary', 'light')
const primaryDark = themeUtils.getColorVariant('primary', 'dark')

// 生成颜色调色板
const colorPalette = themeUtils.generateColorPalette('#4ecdc4')

// 检查颜色对比度
const hasGoodContrast = themeUtils.checkContrast('#4ecdc4', '#ffffff')
```

### 响应式工具

```tsx
import { useBreakpoint } from 'taro-uno'

function ResponsiveComponent() {
  const breakpoint = useBreakpoint()
  
  return (
    <div>
      {breakpoint === 'xs' && <MobileComponent />}
      {breakpoint === 'md' && <TabletComponent />}
      {breakpoint === 'lg' && <DesktopComponent />}
    </div>
  )
}
```

### 样式工具

```tsx
import { useStyles } from 'taro-uno'

function StyledComponent() {
  const styles = useStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.text,
      padding: theme.spacing[4],
      borderRadius: theme.borderRadius.md
    }
  }))
  
  return <div className={styles.container}>样式化组件</div>
}
```

## 最佳实践

1. **一致性**：在整个应用中保持主题的一致性
2. **可访问性**：确保颜色对比度符合 WCAG 标准
3. **性能**：避免频繁的主题切换影响性能
4. **维护性**：使用语义化的颜色名称而非硬编码值
5. **响应式**：考虑不同设备和屏幕尺寸的主题适配

## 注意事项

1. 主题切换可能影响页面性能，建议在应用启动时完成
2. 自定义主题需要确保所有必要的颜色和样式属性
3. 深色主题需要特别注意文本可读性
4. 响应式断点应基于实际用户设备数据设置

## 示例代码

### 主题提供者

```tsx
import { ThemeProvider, createTheme } from 'taro-uno'

const appTheme = createTheme({
  colors: {
    primary: '#4ecdc4',
    secondary: '#45b7d1',
    success: '#96ceb4',
    warning: '#feca57',
    error: '#ff6b6b',
    info: '#54a0ff',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#e9ecef'
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
```

### 主题使用示例

```tsx
import { useTheme } from 'taro-uno'

function ThemedCard() {
  const theme = useTheme()
  
  return (
    <div style={{
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing[4],
      boxShadow: theme.shadow.md,
      transition: `all ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut}`
    }}>
      <h2 style={{
        fontFamily: theme.typography.fontFamily.sans,
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing[2]
      }}>
        主题化卡片
      </h2>
      
      <p style={{
        fontFamily: theme.typography.fontFamily.sans,
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.normal,
        color: theme.colors.textSecondary
      }}>
        这是一个使用主题系统的卡片组件，所有样式都从主题中获取。
      </p>
      
      <button style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
        border: 'none',
        borderRadius: theme.borderRadius.md,
        padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
        fontFamily: theme.typography.fontFamily.sans,
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.medium,
        cursor: 'pointer',
        transition: `all ${theme.animation.duration.fast} ${theme.animation.easing.ease}`
      }}>
        主题按钮
      </button>
    </div>
  )
}
```