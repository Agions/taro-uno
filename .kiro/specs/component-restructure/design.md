# Design Document: 组件结构重组

## Overview

本设计文档描述 Taro-Uno UI 组件库的组件目录结构重组方案。主要目标是将现有的目录命名改为更专业、更符合行业标准的命名方式，同时确保所有导入路径、测试文件和文档都同步更新。

### 设计原则

1. **结构统一** - 所有组件遵循统一的内部文件结构
2. **完整更新** - 确保所有引用路径都同步更新
3. **类型安全** - 每个组件都有完整的类型定义

## Architecture

### 目录重命名映射

```
src/components/
├── basic/       → general/        # 通用组件
├── form/        → data-entry/     # 数据录入组件
├── display/     → data-display/   # 数据展示组件
├── common/      → other/          # 其他组件
├── feedback/    → feedback/       # 保持不变
├── layout/      → layout/         # 保持不变
└── navigation/  → navigation/     # 保持不变
```

### 重组后的目录结构

```
src/components/
├── index.tsx                    # 统一导出
├── general/                     # 通用组件（原 basic）
│   ├── index.tsx
│   ├── Button/
│   ├── Icon/
│   ├── Text/
│   ├── Typography/
│   ├── Divider/
│   └── Video/
├── data-entry/                  # 数据录入组件（原 form）
│   ├── index.tsx
│   ├── Form/
│   ├── Input/
│   ├── Textarea/
│   ├── InputNumber/
│   ├── Select/
│   ├── Cascader/
│   ├── DatePicker/
│   ├── TimePicker/
│   ├── Checkbox/
│   ├── Radio/
│   ├── Switch/
│   ├── Slider/
│   ├── Upload/
│   ├── Transfer/
│   └── AutoComplete/
├── data-display/                # 数据展示组件（原 display）
│   ├── index.tsx
│   ├── Avatar/
│   ├── Badge/
│   ├── Card/
│   ├── List/
│   ├── Table/
│   ├── Tag/
│   ├── Timeline/
│   ├── Calendar/
│   ├── Carousel/
│   ├── Rate/
│   └── RichText/
├── feedback/                    # 反馈组件（保持不变）
│   ├── index.tsx
│   ├── Modal/
│   ├── Drawer/
│   ├── Toast/
│   ├── Message/
│   ├── Notification/
│   ├── Loading/
│   ├── Progress/
│   ├── Result/
│   ├── Tooltip/
│   └── Popconfirm/
├── layout/                      # 布局组件（保持不变）
│   ├── index.tsx
│   ├── Grid/
│   ├── Space/
│   ├── Container/
│   ├── Row/
│   ├── Col/
│   ├── Affix/
│   ├── Layout/
│   ├── ResponsiveContainer/
│   └── ResponsiveGrid/
├── navigation/                  # 导航组件（保持不变）
│   ├── index.tsx
│   ├── Tabs/
│   ├── NavBar/
│   ├── Menu/
│   ├── Pagination/
│   ├── Steps/
│   └── PageHeader/
└── other/                       # 其他组件（原 common）
    ├── index.tsx
    ├── ErrorBoundary.tsx
    ├── LazyComponent.tsx
    └── VirtualList.tsx
```

## Components and Interfaces

### 组件内部文件结构规范

#### 标准组件结构

每个组件目录必须包含以下文件：

```
ComponentName/
├── index.tsx              # 导出入口（统一使用 .tsx 后缀）
├── ComponentName.tsx      # 组件实现
├── ComponentName.types.ts # 类型定义
└── ComponentName.styles.ts # 样式定义
```

#### 复合组件结构

复合组件（如 Form、List、Tabs）包含子组件时：

```
ComponentName/
├── index.tsx
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.ts
├── ComponentNameContext.ts    # 上下文（共享状态）
├── ComponentNameItem.tsx      # 子组件
├── ComponentNameItem.types.ts # 子组件类型
└── useComponentName.ts        # 组件专用 Hook
```

#### 导出入口模板 (index.tsx)

```typescript
// 标准组件
export { ComponentName, default } from './ComponentName';
export type { ComponentNameProps, ComponentNameRef } from './ComponentName.types';

// 复合组件
export { ComponentName, default } from './ComponentName';
export { ComponentNameItem } from './ComponentNameItem';
export type { 
  ComponentNameProps, 
  ComponentNameRef,
  ComponentNameItemProps 
} from './ComponentName.types';
```

#### 类型文件模板 (ComponentName.types.ts)

```typescript
import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps, InteractiveProps } from '@/types';

/** ComponentName 组件 Props */
export interface ComponentNameProps extends InteractiveProps {
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  // ... 其他 props
}

/** ComponentName 组件 Ref */
export interface ComponentNameRef {
  /** 聚焦方法 */
  focus: () => void;
  // ... 其他方法
}
```

#### 样式文件模板 (ComponentName.styles.ts)

```typescript
import { createComponentStyles } from '@/theme/styles/createStyles';

export const useComponentNameStyles = createComponentStyles({
  base: [],
  root: {
    // 根元素样式
  },
  variants: {
    size: {
      sm: { /* 小尺寸样式 */ },
      md: { /* 中尺寸样式 */ },
      lg: { /* 大尺寸样式 */ },
    },
    variant: {
      primary: { /* 主要变体样式 */ },
      default: { /* 默认变体样式 */ },
    },
  },
});
```

### 导入路径变更

```typescript
// 变更前
import { Button } from '@/components/basic';
import { Input } from '@/components/form';
import { Card } from '@/components/display';
import { ErrorBoundary } from '@/components/common';

// 变更后
import { Button } from '@/components/general';
import { Input } from '@/components/data-entry';
import { Card } from '@/components/data-display';
import { ErrorBoundary } from '@/components/other';
```

### 主入口导出更新

```typescript
// src/components/index.tsx
export * from './general';
export * from './data-entry';
export * from './data-display';
export * from './feedback';
export * from './layout';
export * from './navigation';
export * from './other';
```

## Data Models

### 路径映射表

```typescript
const pathMappings = {
  'components/basic': 'components/general',
  'components/form': 'components/data-entry',
  'components/display': 'components/data-display',
  'components/common': 'components/other',
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: 旧路径不存在

*For any* 源代码文件（.ts, .tsx），文件中不应包含对旧目录路径（basic, form, display, common）的导入引用。

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 2: 新目录结构完整性

*For any* 重命名后的目录（general, data-entry, data-display, other），该目录应存在且包含与原目录相同的所有组件子目录。

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 3: 编译正确性

*For any* 重组后的代码库，运行 TypeScript 编译应无错误，证明所有导入路径都已正确更新。

**Validates: Requirements 6.1**

### Property 4: 组件文件结构完整性

*For any* 组件目录，应至少包含以下文件：`index.tsx`、`ComponentName.tsx`、`ComponentName.types.ts`、`ComponentName.styles.ts`。

**Validates: Requirements 5.1**

### Property 5: 导出入口一致性

*For any* 组件的 `index.tsx` 文件，应导出组件本身和其类型定义。

**Validates: Requirements 5.3, 5.4**

## Error Handling

### 路径更新错误处理

1. **导入路径遗漏** - 使用 grep 搜索确保没有遗漏的旧路径
2. **循环依赖** - 重命名后检查是否引入新的循环依赖
3. **类型导出** - 确保类型导出路径也同步更新

## Testing Strategy

### 验证方法

1. **目录存在性检查** - 验证新目录存在，旧目录不存在
2. **导入路径搜索** - 搜索代码库确保没有旧路径引用
3. **编译测试** - 运行 `npm run type-check` 验证编译通过
4. **单元测试** - 运行 `npm run test:run` 验证测试通过

### 测试命令

```bash
# 检查旧路径是否还存在
grep -r "components/basic" src/ --include="*.ts" --include="*.tsx"
grep -r "components/form" src/ --include="*.ts" --include="*.tsx"
grep -r "components/display" src/ --include="*.ts" --include="*.tsx"
grep -r "components/common" src/ --include="*.ts" --include="*.tsx"

# 编译检查
npm run type-check

# 测试运行
npm run test:run
```
