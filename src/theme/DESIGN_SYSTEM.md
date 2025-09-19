# Taro-Uno 设计系统

## 概述

Taro-Uno 是一个基于 Taro 和 UnoCSS 的现代化组件库，提供完整的设计令牌系统、主题管理、无障碍访问支持和响应式设计。

## 设计原则

### 1. 一致性 (Consistency)
- 统一的设计令牌和变量系统
- 一致的视觉语言和交互模式
- 标准化的组件 API 和行为

### 2. 可访问性 (Accessibility)
- 键盘导航支持
- 屏幕阅读器兼容
- WCAG 2.1 AA 标准合规
- 高对比度模式支持

### 3. 响应式 (Responsive)
- 移动优先设计
- 灵活的断点系统
- 自适应布局组件
- 跨平台一致性

### 4. 可定制性 (Customizable)
- 主题系统支持
- 设计令牌覆盖
- 组件样式定制
- 插件化架构

## 设计令牌系统

### 颜色令牌

#### 基础颜色
```typescript
colors: {
  primary: {
    50: '#f0f9ff',   // 最浅
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',   // 主色
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',   // 最深
  }
}
```

#### 语义化颜色
- `success`: 成功状态 (绿色)
- `warning`: 警告状态 (橙色)
- `error`: 错误状态 (红色)
- `info`: 信息状态 (蓝色)

#### 中性颜色
- `neutral`: 中性灰色系
- `text`: 文本颜色
- `background`: 背景颜色
- `border`: 边框颜色

### 间距令牌

#### 基础间距
```typescript
spacing: {
  '0.5': '2px',   // 0.125rem
  '1': '4px',     // 0.25rem
  '2': '8px',     // 0.5rem
  '3': '12px',    // 0.75rem
  '4': '16px',    // 1rem
  '6': '24px',    // 1.5rem
  '8': '32px',    // 2rem
  '12': '48px',   // 3rem
  '16': '64px',   // 4rem
}
```

#### 组件间距
- `component.xs`: 8px
- `component.sm`: 12px
- `component.md`: 16px
- `component.lg`: 24px
- `component.xl`: 32px

### 字体令牌

#### 字体族
```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Georgia', 'serif'],
  mono: ['Fira Code', 'monospace'],
  display: ['Inter', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
}
```

#### 字体大小
```typescript
fontSize: {
  '3xs': '10px',  // 0.625rem
  '2xs': '12px',  // 0.75rem
  'xs': '14px',   // 0.875rem
  'sm': '16px',   // 1rem
  'base': '18px', // 1.125rem
  'lg': '20px',   // 1.25rem
  'xl': '24px',   // 1.5rem
  '2xl': '30px',  // 1.875rem
  '3xl': '36px',  // 2.25rem
  '4xl': '48px',  // 3rem
  '5xl': '60px',  // 3.75rem
  '6xl': '72px',  // 4.5rem
  '7xl': '96px',  // 6rem
  '8xl': '128px', // 8rem
  '9xl': '160px', // 10rem
}
```

#### 字体粗细
```typescript
fontWeight: {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}
```

### 圆角令牌

```typescript
borderRadius: {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
}
```

### 阴影令牌

```typescript
boxShadow: {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
}
```

## 主题系统

### 主题模式

#### 浅色主题 (Light)
```typescript
colors: {
  text: '#111827',
  background: '#ffffff',
  border: '#e5e7eb',
  shadow: 'rgba(0, 0, 0, 0.1)',
}
```

#### 深色主题 (Dark)
```typescript
colors: {
  text: '#f9fafb',
  background: '#111827',
  border: '#374151',
  shadow: 'rgba(0, 0, 0, 0.3)',
}
```

#### 自动主题 (Auto)
- 跟随系统偏好设置
- 自动切换浅色/深色主题

### 主题定制

```typescript
const customTheme = {
  colors: {
    primary: '#8b5cf6',    // 紫色
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  // ... 其他配置
};
```

### 主题预设

- `light`: 浅色主题
- `dark`: 深色主题
- `blue`: 蓝色主题
- `green`: 绿色主题
- `purple`: 紫色主题
- `orange`: 橙色主题
- `warm`: 暖色主题
- `cool`: 冷色主题
- `high-contrast`: 高对比度主题

## 无障碍访问

### 键盘导航

#### 基本操作
- `Tab`: 导航到下一个可聚焦元素
- `Shift + Tab`: 导航到上一个可聚焦元素
- `Enter`: 激活按钮或链接
- `Space`: 激活按钮或复选框
- `Escape`: 关闭弹窗或取消操作

#### 方向键导航
- `ArrowDown`/`ArrowRight`: 下一个元素
- `ArrowUp`/`ArrowLeft`: 上一个元素
- `Home`: 第一个元素
- `End`: 最后一个元素

### 屏幕阅读器支持

#### ARIA 属性
- `aria-label`: 元素标签
- `aria-describedby`: 描述信息
- `aria-errormessage`: 错误信息
- `aria-busy`: 忙碌状态
- `aria-hidden`: 隐藏状态

#### 实时区域
- `aria-live="polite"`: 礼貌宣布
- `aria-live="assertive"`: 紧急宣布

### 高对比度模式

#### 触发条件
- 系统高对比度设置
- 手动切换高对比度模式

#### 样式调整
- 增加边框对比度
- 提高文字可读性
- 强化视觉层次

### 减少动画

#### 触发条件
- 系统减少动画设置
- 手动启用减少动画模式

#### 处理方式
- 移除非必要动画
- 使用简单的过渡效果
- 保持功能完整性

## 响应式设计

### 断点系统

```typescript
breakpoints: {
  xs: 0,      // 手机
  sm: 640px,  // 大手机
  md: 768px,  // 平板
  lg: 1024px, // 小桌面
  xl: 1280px, // 桌面
  '2xl': 1536px,  // 大桌面
  '3xl': 1920px,  // 超大桌面
  '4xl': 2560px,  // 超宽桌面
}
```

### 响应式工具

#### 值响应
```typescript
// 根据断点返回不同的值
const padding = utils.getResponsiveValue(
  { xs: 8, sm: 12, md: 16, lg: 24 },
  16  // 默认值
);
```

#### 类名响应
```typescript
// 根据断点返回不同的类名
const className = utils.getResponsiveClass(
  { xs: 'text-sm', sm: 'text-base', lg: 'text-lg' },
  'text-base'  // 默认类名
);
```

### 网格系统

#### 容器
```typescript
<Container>
  {/* 内容 */}
</Container>
```

#### 网格布局
```typescript
<Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={4}>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
  <div>项目 4</div>
</Grid>
```

#### 响应式组件
```typescript
<Responsive>
  <Responsive.xs>移动端内容</Responsive.xs>
  <Responsive.sm>平板内容</Responsive.sm>
  <Responsive.lg>桌面内容</Responsive.lg>
</Responsive>
```

## 动画系统

### 预设动画

#### 淡入淡出
- `fadeIn`: 淡入
- `fadeOut`: 淡出

#### 滑动动画
- `slideInUp`: 从下滑入
- `slideInDown`: 从上滑入
- `slideInLeft`: 从左滑入
- `slideInRight`: 从右滑入

#### 缩放动画
- `scaleIn`: 缩放进入
- `scaleOut`: 缩放退出
- `bounceIn`: 弹跳进入

#### 反馈动画
- `shake`: 摇晃
- `pulse`: 脉冲

### 微交互

#### 悬停效果
- 轻微缩放
- 颜色变化
- 阴影增强

#### 点击反馈
- 涟漪效果
- 按压动画
- 状态切换

### 动画配置

#### 持续时间
```typescript
duration: {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
}
```

#### 缓动函数
```typescript
easing: {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}
```

## 组件设计规范

### 按钮组件

#### 尺寸规范
- `xs`: 高度 56px，字体 20px
- `sm`: 高度 64px，字体 24px
- `md`: 高度 72px，字体 28px
- `lg`: 高度 80px，字体 32px
- `xl`: 高度 88px，字体 36px

#### 变体类型
- `solid`: 实心按钮
- `outline`: 边框按钮
- `ghost`: 幽灵按钮
- `text`: 文本按钮

#### 状态类型
- `normal`: 正常状态
- `hover`: 悬停状态
- `active`: 激活状态
- `disabled`: 禁用状态
- `loading`: 加载状态

### 输入框组件

#### 尺寸规范
- `sm`: 高度 64px，字体 24px
- `md`: 高度 72px，字体 28px
- `lg`: 高度 80px，字体 32px

#### 变体类型
- `outlined`: 边框输入框
- `filled`: 填充输入框
- `underlined`: 下划线输入框

#### 状态类型
- `normal`: 正常状态
- `focus`: 聚焦状态
- `error`: 错误状态
- `disabled`: 禁用状态

### 卡片组件

#### 尺寸规范
- `sm`: 内边距 16px，圆角 8px
- `md`: 内边距 24px，圆角 12px
- `lg`: 内边距 32px，圆角 16px

#### 阴影层级
- `sm`: 轻微阴影
- `md`: 中等阴影
- `lg`: 强烈阴影

## 最佳实践

### 颜色使用

#### 主色使用
- 主要操作按钮
- 重要链接
- 关键信息突出

#### 辅色使用
- 次要操作按钮
- 补充信息
- 装饰元素

#### 状态颜色
- `success`: 成功、完成、正确
- `warning`: 警告、注意、提醒
- `error`: 错误、失败、禁止
- `info`: 信息、提示、帮助

### 间距使用

#### 组件间距
- 紧密：8px
- 适中：16px
- 宽松：24px

#### 布局间距
- 小：16px
- 中：24px
- 大：32px

### 字体使用

#### 字体大小
- `xs`: 辅助信息
- `sm`: 标签、注释
- `base`: 正文内容
- `lg`: 小标题
- `xl`: 标题
- `2xl+`: 大标题

#### 字体粗细
- `normal`: 正文
- `medium`: 强调文本
- `semibold`: 小标题
- `bold`: 标题

### 动画使用

#### 动画原则
- 功能性：支持用户理解
- 简洁性：不分散注意力
- 一致性：统一的动画风格
- 性能：流畅不卡顿

#### 动画场景
- 页面切换
- 组件显示/隐藏
- 状态变化
- 用户反馈

## 开发指南

### 使用设计令牌

```typescript
import { useTheme } from '@/theme';

const MyComponent = () => {
  const { designTokens } = useTheme();
  
  const style = {
    color: designTokens.colors.text.primary,
    backgroundColor: designTokens.colors.background.card,
    padding: designTokens.spacing.component.md,
  };
  
  return <div style={style}>内容</div>;
};
```

### 自定义主题

```typescript
import { ThemeProvider } from '@/theme';

const App = () => {
  const customTheme = {
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      // ... 其他颜色
    },
    // ... 其他配置
  };
  
  return (
    <ThemeProvider initialTheme={customTheme}>
      <App />
    </ThemeProvider>
  );
};
```

### 响应式组件

```typescript
import { useResponsive } from '@/theme';

const MyComponent = () => {
  const { breakpoint } = useResponsive();
  
  const isMobile = breakpoint.isSm;
  const isTablet = breakpoint.isMd;
  const isDesktop = breakpoint.isLg;
  
  return (
    <div>
      {isMobile && <MobileContent />}
      {isTablet && <TabletContent />}
      {isDesktop && <DesktopContent />}
    </div>
  );
};
```

### 无障碍访问

```typescript
import { useAccessibility } from '@/theme';

const AccessibleButton = () => {
  const { screenReader } = useAccessibility();
  
  const handleClick = () => {
    screenReader.announce('按钮已点击', 'polite');
  };
  
  return (
    <button
      onClick={handleClick}
      aria-label="点击按钮"
      role="button"
    >
      点击我
    </button>
  );
};
```

## 测试指南

### 视觉回归测试
- 颜色对比度测试
- 间距一致性测试
- 组件状态测试

### 无障碍测试
- 键盘导航测试
- 屏幕阅读器测试
- 高对比度测试

### 响应式测试
- 断点测试
- 设备适配测试
- 性能测试

## 性能优化

### CSS 优化
- 使用 CSS 变量
- 避免重复样式
- 优化选择器

### JavaScript 优化
- 懒加载组件
- 节流事件处理
- 优化动画性能

### 构建优化
- 代码分割
- 按需加载
- 缓存策略

## 贡献指南

### 设计令牌添加
- 遵循命名规范
- 提供默认值
- 更新文档

### 组件开发
- 遵循设计规范
- 支持主题定制
- 确保无障碍访问

### 文档维护
- 更新使用示例
- 补充最佳实践
- 修复错误信息

## 版本历史

### v1.0.0
- 初始版本
- 基础设计令牌
- 主题系统
- 响应式支持

### v1.1.0
- 无障碍访问增强
- 动画系统优化
- 性能优化

### v1.2.0
- 新增主题预设
- 组件库扩展
- 文档完善

## 许可证

MIT License

## 联系方式

- 项目地址：https://github.com/your-repo/taro-uno
- 问题反馈：https://github.com/your-repo/taro-uno/issues
- 邮箱：dev@yourcompany.com