# Design Document: Taro 代码库清理与专业化升级

## Overview

本设计文档描述 Taro-Uno UI 组件库的代码清理和专业化升级方案。主要目标包括：
1. 删除多余和重复的文件，简化代码库结构
2. 消除所有 TypeScript any 类型，实现完整类型安全
3. 重新规划 UI 组件结构，采用专业的组件分类体系
4. 升级在线文档系统，提供专业的组件文档

### 设计原则

1. **简洁优先** - 删除所有不必要的文件和代码
2. **类型安全** - 禁止 any，使用具体类型或泛型
3. **结构清晰** - 统一的目录结构和命名规范
4. **文档完善** - 每个组件都有完整的文档

## Architecture

### 清理后的目录结构

```
src/
├── index.ts                    # 主入口
├── app.config.ts               # Taro 应用配置
├── app.scss                    # 全局样式
├── app.tsx                     # 应用入口
│
├── components/                 # UI 组件
│   ├── index.tsx              # 组件统一导出
│   ├── general/               # 通用组件
│   ├── layout/                # 布局组件
│   ├── navigation/            # 导航组件
│   ├── data-entry/            # 数据录入组件
│   ├── data-display/          # 数据展示组件
│   ├── feedback/              # 反馈组件
│   └── other/                 # 其他组件
│
├── hooks/                      # 自定义 Hooks
│   ├── index.ts               # Hooks 统一导出
│   ├── types.ts               # Hook 类型定义
│   ├── state/                 # 状态管理 Hooks
│   ├── lifecycle/             # 生命周期 Hooks
│   ├── effect/                # 副作用 Hooks
│   ├── dom/                   # DOM 相关 Hooks
│   ├── ui/                    # UI 相关 Hooks
│   └── async/                 # 异步 Hooks
│
├── utils/                      # 工具函数
│   ├── index.ts               # 工具函数统一导出
│   ├── classnames.ts          # 类名工具
│   ├── color.ts               # 颜色工具
│   ├── createComponent.ts     # 组件工厂
│   ├── createNamespace.ts     # 命名空间工具
│   ├── environment.ts         # 环境检测
│   ├── error-handler.ts       # 错误处理
│   ├── formatter.ts           # 格式化工具
│   ├── function.ts            # 函数工具
│   ├── is.ts                  # 类型判断
│   ├── logger.ts              # 日志工具
│   ├── object.ts              # 对象工具
│   ├── platform.ts            # 平台检测
│   ├── responsiveUtils.ts     # 响应式工具
│   ├── storage.ts             # 存储工具
│   ├── style.ts               # 样式工具
│   ├── unit.ts                # 单位转换
│   ├── validator.ts           # 验证工具
│   └── __tests__/             # 测试目录
│
├── services/                   # 请求服务
│   ├── index.ts               # 服务统一导出
│   ├── http-client.ts         # HTTP 客户端
│   ├── types.ts               # 请求类型定义
│   ├── interceptors.ts        # 拦截器
│   └── adapters/              # 平台适配器
│
├── theme/                      # 主题系统
│   ├── index.ts               # 主题统一导出
│   ├── types.ts               # 主题类型定义
│   ├── design-tokens.ts       # 设计令牌
│   ├── defaults.ts            # 默认主题
│   ├── dark.ts                # 暗色主题
│   ├── tokens/                # 令牌模块
│   ├── styles/                # 样式模块
│   ├── utils/                 # 主题工具
│   └── generated/             # 生成的文件
│
├── platform/                   # 平台适配
│   ├── index.ts               # 平台统一导出
│   ├── types.ts               # 平台类型定义
│   ├── detector.ts            # 平台检测
│   └── adapter.ts             # 平台适配器
│
├── types/                      # 全局类型定义
│   ├── index.ts               # 类型统一导出
│   ├── common.ts              # 通用类型
│   ├── component.ts           # 组件类型
│   ├── event.ts               # 事件类型
│   ├── style.ts               # 样式类型
│   ├── utils.ts               # 工具类型
│   ├── env.d.ts               # 环境类型声明
│   ├── glob.d.ts              # 全局类型声明
│   ├── modules.d.ts           # 模块类型声明
│   ├── taro-adapter.d.ts      # Taro 适配器类型
│   └── taro-components.d.ts   # Taro 组件类型
│
├── constants/                  # 常量定义
│   └── index.ts               # 常量统一导出
│
└── providers/                  # Context Providers
    ├── index.ts               # Provider 统一导出
    ├── AppProvider.tsx        # 应用 Provider
    ├── ConfigProvider.tsx     # 配置 Provider
    ├── PlatformProvider.tsx   # 平台 Provider
    └── ThemeProvider.tsx      # 主题 Provider
```

## Components and Interfaces

### 1. 文件删除清单

#### 1.1 Hooks 目录删除文件

```typescript
// 删除以下文件（与分类目录重复）
const hooksToDelete = [
  'src/hooks/useDebounce.ts',      // 重复：src/hooks/effect/useDebounce.ts
  'src/hooks/useToggle.ts',        // 重复：src/hooks/state/useToggle.ts
  'src/hooks/usePlatform.ts',      // 重复：src/hooks/ui/usePlatform.ts
  'src/hooks/useStyle.ts',         // 重复：src/hooks/ui/useStyle.ts
  'src/hooks/useTheme.ts',         // 重复：src/hooks/ui/useTheme.ts
  'src/hooks/useRequest.ts',       // 重复：src/hooks/async/useRequest.ts
  'src/hooks/useRequest.test.ts',  // 测试文件应在 tests/ 目录
];
```

#### 1.2 Utils 目录删除文件

```typescript
// 删除整个目录
const utilsDirsToDelete = [
  'src/utils/http/',           // 与 src/services/ 重复
  'src/utils/performance/',    // 功能可移至 hooks
  'src/utils/security/',       // 不需要
  'src/utils/types/',          // 与 src/types/ 重复
];

// 删除单个文件
const utilsFilesToDelete = [
  'src/utils/formatUtils.ts',      // 与 formatter.ts 重复
  'src/utils/errorLogger.ts',      // 与 logger.ts 重复
  'src/utils/typeHelpers.ts',      // 与 types/ 重复
  'src/utils/inputValidator.ts',   // 与 validator.ts 重复
  'src/utils/xssProtection.ts',    // 不需要
  'src/utils/securityHeaders.ts',  // 不需要
  'src/utils/rtl-support.ts',      // 不需要
  'src/utils/abort-controller.ts', // 可合并到 services/
  'src/utils/cache.ts',            // 可合并到 services/
];
```

#### 1.3 Theme 目录删除文件

```typescript
const themeFilesToDelete = [
  'src/theme/tokens.ts',           // 与 tokens/ 目录重复
  'src/theme/utils.ts',            // 与 utils/ 目录重复
  'src/theme/styles.ts',           // 与 styles/ 目录重复
  'src/theme/ThemeProvider.tsx',   // 与 providers/ 重复
  'src/theme/ThemeProvider.types.ts',
  'src/theme/design-system.ts',    // 与 design-tokens.ts 重复
  'src/theme/useThemeUtils.ts',    // 功能可合并
  'src/theme/animations.tsx',      // 评估后删除
  'src/theme/responsive.tsx',      // 评估后删除
  'src/theme/variables.ts',        // 与 design-tokens.ts 重复
];
```

#### 1.4 Components 目录删除/移动文件

```typescript
const componentsToDelete = [
  'src/components/common/ThemeProvider.tsx',  // 与 providers/ 重复
];

const componentsToMove = [
  {
    from: 'src/components/common/SecurityProvider.tsx',
    to: 'src/providers/SecurityProvider.tsx',
  },
  {
    from: 'src/components/common/ResponsiveContainer.tsx',
    to: 'src/components/layout/ResponsiveContainer/',
  },
  {
    from: 'src/components/common/ResponsiveGrid.tsx',
    to: 'src/components/layout/ResponsiveGrid/',
  },
];
```

#### 1.5 Types 目录删除文件

```typescript
const typesToDelete = [
  'src/types/accessibility.ts',        // 不需要无障碍支持
  'src/types/button.ts',               // 应在组件目录中定义
  'src/types/component-props.ts',      // 与 component.ts 重复
  'src/types/standardized-components.ts', // 评估后删除
];
```

### 2. TypeScript 类型安全方案

#### 2.1 any 类型替换策略

```typescript
// 策略 1: 回调函数参数 - 使用泛型
// Before
function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T): T;
// After
function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(callback: T): T;

// 策略 2: 对象遍历 - 使用 Record 或具体接口
// Before
const generateSection = (obj: any, prefix: string = '') => { ... };
// After
const generateSection = (obj: Record<string, unknown>, prefix: string = ''): void => { ... };

// 策略 3: 动态属性访问 - 使用类型守卫
// Before
let value: any = this.tokens;
// After
let value: unknown = this.tokens;
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// 策略 4: 全局对象 - 创建类型声明
// Before
declare global {
  interface Window {
    wx?: any;
  }
}
// After
interface WxAPI {
  request: (options: WxRequestOptions) => void;
  // ... 其他方法
}
declare global {
  interface Window {
    wx?: WxAPI;
  }
}
```

#### 2.2 全局类型声明

```typescript
// src/types/global.d.ts
declare global {
  interface Window {
    wx?: WechatMiniprogram.Wx;
    my?: AlipayMiniprogram.My;
    swan?: BaiduMiniprogram.Swan;
    tt?: ByteDanceMiniprogram.Tt;
    qq?: QQMiniprogram.Qq;
    jd?: JDMiniprogram.Jd;
  }
}

// 小程序 API 类型定义
interface MiniProgramAPI {
  request: <T>(options: RequestOptions) => Promise<T>;
  setStorage: (options: StorageOptions) => Promise<void>;
  getStorage: <T>(options: GetStorageOptions) => Promise<T>;
  // ... 其他通用方法
}
```

### 3. 组件结构设计

#### 3.1 组件分类映射

```typescript
// 组件分类映射表
const componentCategories = {
  general: ['Button', 'Icon', 'Typography', 'Divider'],
  layout: ['Grid', 'Flex', 'Space', 'Container', 'Row', 'Col', 'SafeArea'],
  navigation: ['NavBar', 'TabBar', 'Tabs', 'Menu', 'Breadcrumb', 'Pagination', 'Steps', 'IndexBar'],
  'data-entry': [
    'Form', 'Input', 'Textarea', 'InputNumber', 'Select', 'Cascader', 'Picker',
    'DatePicker', 'TimePicker', 'Checkbox', 'Radio', 'Switch', 'Slider', 'Rate',
    'Upload', 'Transfer', 'AutoComplete', 'NumberKeyboard'
  ],
  'data-display': [
    'Avatar', 'Badge', 'Card', 'Collapse', 'List', 'Table', 'Tag', 'Timeline',
    'Calendar', 'Carousel', 'Image', 'ImagePreview', 'Skeleton', 'Empty',
    'Watermark', 'CountDown', 'RichText'
  ],
  feedback: [
    'Modal', 'Dialog', 'Drawer', 'Toast', 'Message', 'Notification', 'Loading',
    'Progress', 'Result', 'Tooltip', 'Popover', 'Popconfirm', 'ActionSheet', 'SwipeCell'
  ],
  other: ['Affix', 'BackTop', 'ConfigProvider', 'ErrorBoundary', 'LazyComponent', 'VirtualList'],
};
```

#### 3.2 组件标准文件结构

```typescript
// 每个组件目录的标准结构
interface ComponentDirectory {
  'index.tsx': string;           // 导出入口
  'ComponentName.tsx': string;   // 组件实现
  'ComponentName.types.ts': string; // 类型定义
  'ComponentName.styles.ts'?: string; // 样式定义（可选）
  'ComponentName.test.tsx'?: string;  // 单元测试（可选）
}

// 组件导出入口模板
// index.tsx
export { ComponentName, default } from './ComponentName';
export type { ComponentNameProps, ComponentNameRef } from './ComponentName.types';
```

### 4. 文档系统设计

#### 4.1 文档目录结构

```
docs/docs/
├── intro.md                    # 介绍
├── quickstart.md               # 快速开始
├── changelog.md                # 更新日志
├── faq.md                      # 常见问题
│
├── guides/                     # 指南
│   ├── installation.md         # 安装指南
│   ├── theme-customization.md  # 主题定制
│   ├── multi-platform.md       # 多平台开发
│   └── best-practices.md       # 最佳实践
│
├── components/                 # 组件文档
│   ├── general/               # 通用组件
│   │   ├── button.md
│   │   ├── icon.md
│   │   ├── typography.md
│   │   └── divider.md
│   ├── layout/                # 布局组件
│   ├── navigation/            # 导航组件
│   ├── data-entry/            # 数据录入组件
│   ├── data-display/          # 数据展示组件
│   └── feedback/              # 反馈组件
│
├── hooks/                      # Hooks 文档
│   └── index.md
│
└── api/                        # API 参考
    └── index.md
```

#### 4.2 组件文档模板

```markdown
---
sidebar_position: 1
---

# ComponentName 组件名称

组件简介描述。

## 基础用法

```tsx
import { ComponentName } from 'taro-uno-ui';

function Demo() {
  return <ComponentName>内容</ComponentName>;
}
```

## 代码演示

### 基础示例

描述和代码示例...

### 进阶示例

描述和代码示例...

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop1 | 属性说明 | `string` | - |
| prop2 | 属性说明 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击事件 | `(event: TouchEvent) => void` |

### Ref

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 聚焦 | - |

## 平台兼容性

| 平台 | 支持 |
| --- | --- |
| 微信小程序 | ✅ |
| H5 | ✅ |
| React Native | ✅ |
| 鸿蒙 | ✅ |

## 注意事项

- 注意事项 1
- 注意事项 2
```

## Data Models

### 文件操作数据模型

```typescript
interface FileOperation {
  type: 'delete' | 'move' | 'create' | 'update';
  path: string;
  targetPath?: string;  // 仅 move 操作需要
  content?: string;     // 仅 create/update 操作需要
}

interface CleanupPlan {
  filesToDelete: string[];
  filesToMove: Array<{ from: string; to: string }>;
  filesToCreate: Array<{ path: string; content: string }>;
  filesToUpdate: Array<{ path: string; changes: string }>;
}
```

### 类型替换数据模型

```typescript
interface TypeReplacement {
  file: string;
  line: number;
  original: string;
  replacement: string;
  strategy: 'generic' | 'record' | 'unknown' | 'interface' | 'type-guard';
}

interface TypeSafetyReport {
  totalAnyUsages: number;
  replacements: TypeReplacement[];
  remainingIssues: string[];
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: TypeScript 编译零错误

*For any* 代码文件，运行 `npm run type-check` 后，TypeScript 编译器应报告零错误。

**Validates: Requirements 2.4, 5.3**

### Property 2: ESLint no-explicit-any 零警告

*For any* TypeScript 代码文件，运行 ESLint 检查后，`@typescript-eslint/no-explicit-any` 规则应报告零警告。

**Validates: Requirements 2.1, 2.4, 5.2**

### Property 3: 组件目录结构一致性

*For any* 组件目录，应包含至少以下文件：`index.tsx`、`ComponentName.tsx`、`ComponentName.types.ts`。

**Validates: Requirements 3.3**

### Property 4: 组件 Props 继承正确性

*For any* 组件 Props 接口，应正确继承 BaseProps、InteractiveProps 或 FormItemProps 中的一个，且不重复定义已继承的属性。

**Validates: Requirements 3.4**

### Property 5: 导出路径一致性

*For any* 导出的组件、Hook 或工具函数，应能通过以下方式正确导入：
1. 全量导入：`import { X } from 'taro-uno-ui'`
2. 分类导入：`import { X } from 'taro-uno-ui/components/category'`

**Validates: Requirements 6.1, 6.3**

### Property 6: 删除文件不存在性

*For any* 在删除清单中的文件，清理完成后该文件应不存在于文件系统中。

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**

## Error Handling

### 文件操作错误处理

```typescript
// 删除文件前检查依赖
async function safeDeleteFile(filePath: string): Promise<void> {
  // 1. 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  // 2. 检查是否有其他文件依赖此文件
  const dependents = await findDependents(filePath);
  if (dependents.length > 0) {
    throw new Error(`Cannot delete ${filePath}, it is imported by: ${dependents.join(', ')}`);
  }
  
  // 3. 删除文件
  fs.unlinkSync(filePath);
}

// 更新导入路径
async function updateImports(oldPath: string, newPath: string): Promise<void> {
  const files = await glob('src/**/*.{ts,tsx}');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const updated = content.replace(
      new RegExp(`from ['"]${oldPath}['"]`, 'g'),
      `from '${newPath}'`
    );
    if (content !== updated) {
      fs.writeFileSync(file, updated);
    }
  }
}
```

### 类型替换错误处理

```typescript
// 类型替换验证
async function validateTypeReplacement(replacement: TypeReplacement): Promise<boolean> {
  // 1. 创建临时文件
  const tempFile = createTempFile(replacement.file, replacement.replacement);
  
  // 2. 运行 TypeScript 编译检查
  const result = await runTypeCheck(tempFile);
  
  // 3. 清理临时文件
  fs.unlinkSync(tempFile);
  
  return result.success;
}
```

## Testing Strategy

### 测试框架

- **单元测试**: Vitest
- **类型测试**: tsd
- **E2E 测试**: 手动验证

### 测试用例

#### 1. 文件清理测试

```typescript
describe('Codebase Cleanup', () => {
  it('should delete duplicate hook files', async () => {
    const filesToDelete = [
      'src/hooks/useDebounce.ts',
      'src/hooks/useToggle.ts',
    ];
    
    for (const file of filesToDelete) {
      expect(fs.existsSync(file)).toBe(false);
    }
  });
  
  it('should keep categorized hook files', async () => {
    const filesToKeep = [
      'src/hooks/effect/useDebounce.ts',
      'src/hooks/state/useToggle.ts',
    ];
    
    for (const file of filesToKeep) {
      expect(fs.existsSync(file)).toBe(true);
    }
  });
});
```

#### 2. 类型安全测试

```typescript
describe('Type Safety', () => {
  it('should have zero any warnings', async () => {
    const result = await runEslint('src/**/*.ts');
    const anyWarnings = result.filter(r => r.ruleId === '@typescript-eslint/no-explicit-any');
    expect(anyWarnings.length).toBe(0);
  });
  
  it('should compile without errors', async () => {
    const result = await runTypeCheck();
    expect(result.errors.length).toBe(0);
  });
});
```

#### 3. 组件结构测试

```typescript
describe('Component Structure', () => {
  it('should have standard files in each component directory', async () => {
    const componentDirs = await glob('src/components/**/*/');
    
    for (const dir of componentDirs) {
      const componentName = path.basename(dir);
      expect(fs.existsSync(path.join(dir, 'index.tsx'))).toBe(true);
      expect(fs.existsSync(path.join(dir, `${componentName}.tsx`))).toBe(true);
      expect(fs.existsSync(path.join(dir, `${componentName}.types.ts`))).toBe(true);
    }
  });
});
```

#### 4. 导出测试

```typescript
describe('Exports', () => {
  it('should export components from main entry', async () => {
    const { Button, Input, useTheme } = await import('taro-uno-ui');
    expect(Button).toBeDefined();
    expect(Input).toBeDefined();
    expect(useTheme).toBeDefined();
  });
  
  it('should export components from category entry', async () => {
    const { Button } = await import('taro-uno-ui/components/general');
    expect(Button).toBeDefined();
  });
});
```

