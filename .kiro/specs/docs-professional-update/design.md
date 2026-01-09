# Design Document

## Overview

本设计文档定义了 Taro Uno UI 组件库文档系统的全面升级方案。目标是打造一个专业、大气、美观、时尚的在线文档系统，提供卓越的开发者体验。

文档系统基于 Docusaurus 3.x 构建，采用现代化的视觉设计语言，支持明暗主题，并针对组件库的特点进行深度定制。

## Architecture

```
docs/
├── docusaurus.config.ts      # Docusaurus 配置（更新主题、插件）
├── sidebars.ts               # 侧边栏配置（重新组织）
├── src/
│   ├── css/
│   │   └── custom.css        # 全局样式（全面重写）
│   ├── components/
│   │   ├── HomepageFeatures/ # 首页特性展示（重新设计）
│   │   ├── ComponentDemo/    # 组件演示容器（新增）
│   │   ├── ApiTable/         # API 表格组件（新增）
│   │   └── CodeBlock/        # 代码块增强（新增）
│   └── pages/
│       └── index.tsx         # 首页（全面重设计）
├── docs/
│   ├── intro.md              # 项目简介（更新）
│   ├── quickstart.md         # 快速开始（更新）
│   ├── features.md           # 核心功能（更新）
│   ├── guides/               # 开发指南（更新）
│   ├── hooks/                # Hooks 文档（更新）
│   ├── components/           # 组件文档（全面重写）
│   │   ├── basic/            # 基础组件
│   │   ├── form/             # 表单组件
│   │   ├── display/          # 展示组件
│   │   ├── feedback/         # 反馈组件
│   │   ├── layout/           # 布局组件
│   │   ├── navigation/       # 导航组件
│   │   └── common/           # 通用组件
│   └── api/                  # API 参考
└── static/
    └── img/                  # 静态资源（更新 Logo 等）
```

## Components and Interfaces

### 1. 视觉设计系统

#### 1.1 配色方案

```typescript
interface ColorPalette {
  // 主色调 - 渐变蓝紫色系
  primary: {
    50: '#eef2ff';
    100: '#e0e7ff';
    200: '#c7d2fe';
    300: '#a5b4fc';
    400: '#818cf8';
    500: '#6366f1';  // 主色
    600: '#4f46e5';
    700: '#4338ca';
    800: '#3730a3';
    900: '#312e81';
  };
  
  // 强调色 - 紫色
  accent: {
    500: '#8b5cf6';
    600: '#7c3aed';
  };
  
  // 语义色
  success: '#10b981';
  warning: '#f59e0b';
  error: '#ef4444';
  info: '#3b82f6';
  
  // 中性色
  gray: {
    50: '#f9fafb';
    100: '#f3f4f6';
    200: '#e5e7eb';
    300: '#d1d5db';
    400: '#9ca3af';
    500: '#6b7280';
    600: '#4b5563';
    700: '#374151';
    800: '#1f2937';
    900: '#111827';
  };
}
```

#### 1.2 字体系统

```typescript
interface Typography {
  fontFamily: {
    heading: '"Inter", "思源黑体", -apple-system, BlinkMacSystemFont, sans-serif';
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace';
  };
  
  fontSize: {
    xs: '0.75rem';    // 12px
    sm: '0.875rem';   // 14px
    base: '1rem';     // 16px
    lg: '1.125rem';   // 18px
    xl: '1.25rem';    // 20px
    '2xl': '1.5rem';  // 24px
    '3xl': '1.875rem'; // 30px
    '4xl': '2.25rem'; // 36px
    '5xl': '3rem';    // 48px
  };
  
  lineHeight: {
    tight: 1.25;
    normal: 1.5;
    relaxed: 1.75;
  };
}
```

#### 1.3 间距系统

```typescript
interface Spacing {
  0: '0';
  1: '0.25rem';   // 4px
  2: '0.5rem';    // 8px
  3: '0.75rem';   // 12px
  4: '1rem';      // 16px
  5: '1.25rem';   // 20px
  6: '1.5rem';    // 24px
  8: '2rem';      // 32px
  10: '2.5rem';   // 40px
  12: '3rem';     // 48px
  16: '4rem';     // 64px
  20: '5rem';     // 80px
}
```

### 2. 首页设计

#### 2.1 Hero 区域

```typescript
interface HeroSection {
  // 渐变背景
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  
  // 标题
  title: 'Taro Uno UI';
  tagline: '为 Taro 生态打造的现代化跨平台组件库';
  
  // 行动按钮
  buttons: [
    { text: '快速开始', link: '/quickstart', variant: 'primary' },
    { text: 'GitHub', link: 'https://github.com/agions/taro-uno', variant: 'secondary' }
  ];
  
  // 特性标签
  badges: ['TypeScript', '跨平台', '主题定制', '60+ 组件'];
}
```

#### 2.2 特性展示区

```typescript
interface FeatureCard {
  icon: string;        // SVG 图标
  title: string;       // 特性标题
  description: string; // 特性描述
  gradient: string;    // 卡片渐变色
}

const features: FeatureCard[] = [
  {
    icon: 'devices',
    title: '跨平台兼容',
    description: '一套代码，多端运行。支持微信小程序、H5、React Native、鸿蒙等平台',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: 'palette',
    title: '主题定制',
    description: '灵活的主题系统，支持明暗主题切换和自定义设计令牌',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: 'code',
    title: 'TypeScript',
    description: '完整的类型定义，提供智能提示和编译时类型检查',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: 'components',
    title: '丰富组件',
    description: '60+ 精心设计的组件，覆盖表单、展示、反馈、导航等场景',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    icon: 'accessibility',
    title: '无障碍',
    description: '遵循 WCAG 标准，支持键盘导航和屏幕阅读器',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    icon: 'performance',
    title: '高性能',
    description: '按需加载、虚拟滚动、懒加载等优化，确保流畅体验',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }
];
```

### 3. 组件文档模板

#### 3.1 文档结构

```typescript
interface ComponentDocStructure {
  // 头部信息
  header: {
    name: string;           // 组件名称
    chineseName: string;    // 中文名称
    description: string;    // 简介
    importStatement: string; // 导入语句
    platforms: Platform[];  // 支持平台
    version: string;        // 版本
  };
  
  // 何时使用
  whenToUse: string[];
  
  // 代码演示
  demos: Demo[];
  
  // API 文档
  api: {
    props: PropDefinition[];
    events: EventDefinition[];
    methods: MethodDefinition[];
    cssVariables: CSSVariableDefinition[];
  };
  
  // 设计指南
  designGuidelines: string[];
  
  // 注意事项
  notes: string[];
  
  // 相关组件
  relatedComponents: RelatedComponent[];
}
```

#### 3.2 代码演示组件

```typescript
interface Demo {
  title: string;           // 演示标题
  description: string;     // 演示说明
  code: string;            // 代码内容
  language: 'tsx' | 'ts';  // 代码语言
  showLineNumbers: boolean; // 显示行号
  highlightLines?: number[]; // 高亮行
}
```

### 4. 侧边栏结构

```typescript
interface SidebarConfig {
  docsSidebar: [
    { type: 'doc', id: 'intro', label: '项目简介' },
    { type: 'doc', id: 'quickstart', label: '快速开始' },
    { type: 'doc', id: 'features', label: '核心功能' },
    {
      type: 'category',
      label: '开发指南',
      items: [
        'guides/installation',
        'guides/theme-customization',
        'guides/multi-platform',
        'guides/best-practices'
      ]
    },
    {
      type: 'category',
      label: 'Hooks',
      items: [
        'hooks/index',
        'hooks/state',
        'hooks/effect',
        'hooks/dom',
        'hooks/async',
        'hooks/ui',
        'hooks/lifecycle'
      ]
    },
    { type: 'doc', id: 'faq', label: '常见问题' },
    { type: 'doc', id: 'changelog', label: '更新日志' }
  ],
  
  componentsSidebar: [
    {
      type: 'category',
      label: '基础组件 Basic',
      collapsed: false,
      items: ['button', 'icon', 'text', 'divider', 'typography']
    },
    {
      type: 'category',
      label: '表单组件 Form',
      items: [
        'form', 'input', 'textarea', 'input-number',
        'select', 'cascader', 'auto-complete',
        'date-picker', 'time-picker',
        'checkbox', 'radio', 'switch',
        'slider', 'upload', 'transfer'
      ]
    },
    {
      type: 'category',
      label: '展示组件 Display',
      items: [
        'avatar', 'badge', 'tag',
        'card', 'list', 'table',
        'calendar', 'timeline',
        'carousel', 'rate', 'rich-text'
      ]
    },
    {
      type: 'category',
      label: '反馈组件 Feedback',
      items: [
        'loading', 'progress',
        'message', 'toast', 'notification',
        'modal', 'drawer', 'popconfirm',
        'tooltip', 'result'
      ]
    },
    {
      type: 'category',
      label: '布局组件 Layout',
      items: [
        'grid', 'row', 'col',
        'layout', 'container',
        'space', 'affix',
        'responsive-container', 'responsive-grid'
      ]
    },
    {
      type: 'category',
      label: '导航组件 Navigation',
      items: [
        'menu', 'navbar', 'page-header',
        'tabs', 'steps', 'pagination'
      ]
    },
    {
      type: 'category',
      label: '通用组件 Common',
      items: [
        'error-boundary', 'lazy-component', 'virtual-list'
      ]
    }
  ]
}
```

## Data Models

### 组件文档数据模型

```typescript
interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string | null;
  required: boolean;
  description: string;
}

interface EventDefinition {
  name: string;
  description: string;
  parameters: string;
}

interface MethodDefinition {
  name: string;
  description: string;
  parameters: string;
  returnType: string;
}

interface CSSVariableDefinition {
  name: string;
  description: string;
  defaultValue: string;
}

interface Platform {
  name: 'weapp' | 'h5' | 'rn' | 'harmony' | 'alipay' | 'baidu' | 'tt' | 'qq';
  supported: boolean;
  notes?: string;
}

interface RelatedComponent {
  name: string;
  path: string;
  description: string;
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: 组件文档结构完整性

*For any* 组件文档文件，该文件应包含以下标准章节：组件名称、简介、何时使用、代码演示、API（Props/Events/Methods）、平台兼容性

**Validates: Requirements 2.1, 2.2, 2.6**

### Property 2: 代码示例数量

*For any* 组件文档文件，该文件应包含至少 3 个代码示例块（```tsx 或 ```ts）

**Validates: Requirements 2.3**

### Property 3: API 表格格式

*For any* 组件文档中的 API 表格，该表格应包含属性名、类型、默认值、说明四列

**Validates: Requirements 11.1**

### Property 4: 组件文档与源码同步

*For any* 在 src/components 中导出的组件，在 docs/docs/components 中应存在对应的文档文件

**Validates: Requirements 3.1-3.5, 4.1-4.6, 5.1-5.4, 6.1-6.4, 7.1-7.4, 8.1-8.3, 9.1-9.3**

### Property 5: Hooks 文档覆盖率

*For any* 在 src/hooks 中导出的 Hook，在 docs/docs/hooks 中应有对应的文档说明

**Validates: Requirements 12.1**

### Property 6: TypeScript 类型定义包含

*For any* 组件文档，该文档应包含组件的 TypeScript 类型定义或类型引用

**Validates: Requirements 2.5**

## Error Handling

### 文档构建错误

1. **链接失效**: Docusaurus 配置 `onBrokenLinks: 'throw'` 确保构建时检测失效链接
2. **缺失文件**: 侧边栏引用的文档文件不存在时构建失败
3. **语法错误**: MDX 语法错误导致构建失败，需检查代码块闭合

### 内容错误处理

1. **API 不同步**: 建立组件源码与文档的对照检查机制
2. **示例代码过时**: 定期运行示例代码验证
3. **平台兼容性标注错误**: 与实际测试结果对照

## Testing Strategy

### 单元测试

1. **文档结构验证**: 检查每个组件文档是否包含必要章节
2. **链接有效性**: 验证文档内部链接和外部链接
3. **代码示例语法**: 验证代码块语法正确性

### 属性测试

1. **Property 1-6**: 使用脚本遍历所有文档文件，验证结构完整性
2. **组件覆盖率**: 对比源码导出与文档文件，确保 100% 覆盖

### 集成测试

1. **构建测试**: `npm run build` 确保文档能成功构建
2. **预览测试**: `npm run serve` 验证构建产物可正常访问

### 手动测试

1. **视觉审查**: 检查配色、字体、间距是否符合设计规范
2. **响应式测试**: 在不同设备尺寸下验证布局
3. **主题切换**: 验证明暗主题切换效果

## Implementation Notes

### 技术选型

- **文档框架**: Docusaurus 3.x
- **样式方案**: CSS Variables + CSS Modules
- **代码高亮**: Prism React Renderer
- **搜索**: Docusaurus 内置搜索 / Algolia DocSearch

### 文件命名规范

- 组件文档: `kebab-case.md` (如 `date-picker.md`)
- 分类配置: `_category_.json`
- 静态资源: `kebab-case.png/svg`

### 文档编写规范

1. 使用中文编写，技术术语保留英文
2. 代码示例使用 TypeScript
3. API 表格使用 Markdown 表格语法
4. 图片使用相对路径引用

### 性能优化

1. 图片使用 WebP 格式，提供 fallback
2. 代码块启用懒加载
3. 使用 Docusaurus 内置的代码分割
