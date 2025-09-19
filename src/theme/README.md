# Taro-Uno UI 主题系统

一个功能强大、灵活且易于使用的主题系统，支持动态主题切换、自定义主题配置、CSS变量优化和性能监控。

## ✨ 特性

- 🎨 **动态主题切换** - 支持明暗主题自动切换
- 🛠️ **自定义主题** - 可视化主题编辑器
- 📱 **响应式设计** - 支持多端适配
- 🚀 **性能优化** - CSS变量系统和性能监控
- ♿ **无障碍支持** - WCAG标准的可访问性
- 🔧 **工具丰富** - 颜色工具、响应式工具等
- 📊 **性能监控** - 实时性能指标监控
- 🎯 **TypeScript** - 完整的类型支持

## 📦 安装

```bash
npm install taro-uno-theme
# 或
yarn add taro-uno-theme
# 或
pnpm add taro-uno-theme
```

## 🚀 快速开始

### 基础使用

```tsx
import { ThemeProvider, useTheme } from 'taro-uno/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function Component() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.colors.primary }}>
      <h1 style={{ color: theme.colors.text }}>
        当前主题: {isDark ? '深色' : '浅色'}
      </h1>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
```

### 主题切换器

```tsx
import { ThemeSwitcher } from 'taro-uno/theme';

function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeSwitcher />
        {/* 其他组件 */}
      </div>
    </ThemeProvider>
  );
}
```

### 自定义主题

```tsx
import { ThemeProvider } from 'taro-uno/theme';

const customTheme = {
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    success: '#0000ff',
    // ... 其他颜色
  },
  typography: {
    fontSize: {
      base: 16,
      lg: 20,
      // ... 其他字体大小
    }
  }
};

function App() {
  return (
    <ThemeProvider defaultTheme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## 🎨 主题编辑器

```tsx
import { ThemeEditor } from 'taro-uno/theme';

function App() {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowEditor(true)}>
        编辑主题
      </button>
      
      <ThemeEditor 
        isOpen={showEditor} 
        onClose={() => setShowEditor(false)}
        onSave={(customTheme) => {
          console.log('主题已保存:', customTheme);
        }}
      />
    </div>
  );
}
```

## 📊 性能监控

```tsx
import { ThemePerformanceMonitor } from 'taro-uno/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
      <ThemePerformanceMonitor 
        enabled={true} 
        showMetrics={true}
        position="top-right"
      />
    </ThemeProvider>
  );
}
```

## 🔧 工具函数

### 颜色工具

```tsx
import { ColorUtils } from 'taro-uno/theme';

// 调整颜色亮度
const lighterColor = ColorUtils.adjustBrightness('#ff0000', 0.2);
const darkerColor = ColorUtils.adjustBrightness('#ff0000', -0.2);

// 检查颜色对比度
const ratio = ColorUtils.getContrastRatio('#ffffff', '#000000');
const isAccessible = ColorUtils.meetsWCAGStandard('#ffffff', '#000000', 'AA');

// 生成颜色渐变
const gradient = ColorUtils.generateGradient('#ff0000', '#0000ff', 5);
```

### 响应式工具

```tsx
import { ResponsiveUtils } from 'taro-uno/theme';

// 获取屏幕尺寸
const screenSize = ResponsiveUtils.getScreenSize();

// 检查设备类型
const isMobile = ResponsiveUtils.isMobile();
const isTablet = ResponsiveUtils.isTablet();
const isDesktop = ResponsiveUtils.isDesktop();
```

### 主题验证

```tsx
import { ThemeValidator } from 'taro-uno/theme';

// 验证主题配置
const validation = ThemeValidator.validateTheme(customTheme);
console.log(validation.isValid, validation.errors);

// 检查可访问性
const accessibility = ThemeValidator.checkAccessibility(theme);
console.log(accessibility.score, accessibility.issues);
```

## 🎯 预设主题

```tsx
import { themes, ThemeProvider } from 'taro-uno/theme';

// 使用预设主题
function App() {
  return (
    <ThemeProvider defaultTheme={themes.purple}>
      <YourApp />
    </ThemeProvider>
  );
}
```

可用的预设主题：
- `themes.default` - 默认蓝色主题
- `themes.dark` - 深色主题
- `themes.purple` - 紫色主题
- `themes.green` - 绿色主题
- `themes.orange` - 橙色主题
- `themes.pink` - 粉色主题

## 🎨 CSS变量

主题系统自动生成CSS变量，可以直接在样式中使用：

```css
/* 使用主题变量 */
.element {
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

/* 暗色主题会自动覆盖 */
[data-theme="dark"] {
  /* 暗色主题变量会自动应用 */
}
```

## 📱 响应式断点

```tsx
import { useTheme } from 'taro-uno/theme';

function ResponsiveComponent() {
  const { theme } = useTheme();
  
  return (
    <div>
      {/* 响应式样式 */}
      <style jsx>{`
        @media (min-width: ${theme.spacing.breakpoints.md}px) {
          .container {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
```

## 🎭 动画系统

```tsx
import { useTheme } from 'taro-uno/theme';

function AnimatedComponent() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      transition: `all ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut}`,
    }}>
      {/* 动画内容 */}
    </div>
  );
}
```

## 🔌 事件系统

```tsx
import { themeManager } from 'taro-uno/theme';

// 监听主题切换事件
themeManager.addEventListener('themeChange', (event) => {
  console.log('主题已切换:', event.mode);
});

// 监听自定义主题更新
themeManager.addEventListener('customThemeUpdate', (event) => {
  console.log('自定义主题已更新:', event.customTheme);
});
```

## 📝 主题导入导出

```tsx
import { useTheme } from 'taro-uno/theme';

function ThemeManager() {
  const { exportTheme, importTheme } = useTheme();
  
  // 导出主题
  const handleExport = () => {
    const themeData = exportTheme();
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    a.click();
  };
  
  // 导入主题
  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importTheme(content);
    };
    reader.readAsText(file);
  };
  
  return (
    <div>
      <button onClick={handleExport}>导出主题</button>
      <input type="file" accept=".json" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleImport(file);
      }} />
    </div>
  );
}
```

## 🎨 Tailwind CSS 集成

主题系统与 Tailwind CSS 完美集成：

```jsx
// 使用主题变量
<div className="bg-theme-primary text-theme-text p-theme-md rounded-theme-md">
  使用主题变量的内容
</div>

// 响应式断点
<div className="md:bg-theme-primary lg:bg-theme-secondary">
  响应式主题
</div>
```

## 🛠️ 开发

### 项目结构

```
src/theme/
├── ThemeProvider.tsx    # 主题提供者组件
├── types.ts            # 类型定义
├── defaults.ts         # 默认主题配置
├── variables.ts        # CSS变量系统
├── styles.ts          # 样式工具
├── utils.ts           # 工具函数
├── demo.tsx           # 演示应用
└── README.md          # 文档
```

### 运行演示

```bash
# 克隆项目
git clone https://github.com/your-repo/taro-uno.git
cd taro-uno

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行演示
npm run demo
```

## 📋 API 参考

### ThemeProvider

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| defaultTheme | `ThemeConfig` | `defaultTheme` | 默认主题配置 |
| defaultMode | `ThemeMode` | `'light'` | 默认主题模式 |
| persistKey | `string` | `'taro-uno-theme'` | 本地存储键名 |

### useTheme

| 方法 | 描述 |
|------|------|
| `theme` | 当前主题配置 |
| `themeMode` | 当前主题模式 |
| `isDark` | 是否为深色主题 |
| `toggleTheme` | 切换主题 |
| `setThemeMode` | 设置主题模式 |
| `setCustomTheme` | 设置自定义主题 |
| `resetTheme` | 重置主题 |
| `exportTheme` | 导出主题配置 |
| `importTheme` | 导入主题配置 |

### ThemeSwitcher

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 切换器尺寸 |
| variant | `'button' \| 'toggle' \| 'select'` | `'toggle'` | 切换器样式 |
| showLabel | `boolean` | `true` | 是否显示标签 |

### ThemeEditor

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| isOpen | `boolean` | `false` | 是否打开编辑器 |
| onClose | `() => void` | - | 关闭回调 |
| onSave | `(theme: Partial<ThemeConfig>) => void` | - | 保存回调 |

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 支持

如果你在使用过程中遇到问题，请：

1. 查看 [文档](https://docs.taro-uno.com)
2. 搜索 [Issues](https://github.com/your-repo/taro-uno/issues)
3. 创建新的 Issue

---

**Taro-Uno UI 主题系统** - 让主题管理变得简单而强大！