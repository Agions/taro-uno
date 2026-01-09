# Design Document: 代码库清理

## Overview

本设计文档描述 Taro-Uno UI 组件库的代码清理方案。主要目标是删除冗余文件、合并重复代码、统一导出路径，使代码库更加专业和可维护。

### 设计原则

1. **单一职责** - 每个文件只负责一个功能
2. **避免重复** - 相同功能只在一个地方实现
3. **清晰导出** - 每个功能只有一个导入路径
4. **向后兼容** - 清理不应破坏现有 API

## Architecture

### 当前问题分析

#### 1. Hooks 重复导出问题

```
src/hooks/
├── dom/
│   ├── index.ts          # 导出 useDebounce, useThrottle (来自 useEventHandling)
│   └── useEventHandling.ts # 包含 useDebounce, useThrottle 实现
├── effect/
│   ├── index.ts          # 导出 useDebounce, useThrottle (来自独立文件)
│   ├── useDebounce.ts    # 独立的 useDebounce 实现
│   └── useThrottle.ts    # 独立的 useThrottle 实现
```

**问题**: `useDebounce` 和 `useThrottle` 有两套实现，导致混淆。

**解决方案**: 
- 从 `hooks/dom/index.ts` 移除 `useDebounce` 和 `useThrottle` 的导出
- 保留 `hooks/effect/` 中的独立实现作为标准版本
- `useEventHandling.ts` 中的版本仅供内部使用

#### 2. 组件冗余文件

```
src/components/
├── display/RichText/
│   └── RichText.examples.tsx  # 示例文件，应移至文档
├── feedback/Tooltip/
│   └── Tooltip.examples.tsx   # 示例文件，应移至文档
├── navigation/Menu/
│   └── Menu.stories.tsx       # Storybook 文件，如不使用应删除
```

**解决方案**: 删除 `.examples.tsx` 和 `.stories.tsx` 文件

#### 3. 类型文件冗余

```
src/types/
├── glob.d.ts           # 可能未使用
├── modules.d.ts        # 可能未使用
├── taro-adapter.d.ts   # 检查是否必要
└── taro-components.d.ts # 检查是否必要
```

**解决方案**: 检查引用，删除未使用的文件

## Components and Interfaces

### 清理后的 Hooks 导出结构

```typescript
// src/hooks/dom/index.ts - 清理后
export { useClickOutside } from './useClickOutside';
export { useEventListener } from './useEventListener';
export {
  // 移除 useDebounce, useThrottle
  useClickHandler,
  useLongPress,
  useDrag,
  useKeyboard,
  useEventDelegate,
} from './useEventHandling';

// src/hooks/effect/index.ts - 保持不变，作为标准导出
export { useDebounce, useDebouncedCallback, useDebouncedEffect } from './useDebounce';
export { useThrottle, useThrottledCallback, useThrottledEffect } from './useThrottle';
// ... 其他导出
```

### 清理后的组件结构

```
src/components/
├── display/RichText/
│   ├── index.tsx
│   ├── RichText.tsx
│   ├── RichText.types.ts
│   └── RichText.styles.ts
│   # 删除 RichText.examples.tsx
├── feedback/Tooltip/
│   ├── index.tsx
│   ├── Tooltip.tsx
│   ├── Tooltip.types.ts
│   └── Tooltip.styles.ts
│   # 删除 Tooltip.examples.tsx
├── navigation/Menu/
│   ├── index.tsx
│   ├── Menu.tsx
│   ├── Menu.types.ts
│   ├── Menu.styles.ts
│   ├── Menu.constants.ts
│   ├── Menu.utils.ts
│   ├── MenuItem.tsx
│   └── SubMenu.tsx
│   # 删除 Menu.stories.tsx
```

## Data Models

### 清理清单

| 文件路径 | 操作 | 原因 |
|---------|------|------|
| `src/hooks/dom/index.ts` | 修改 | 移除重复的 useDebounce, useThrottle 导出 |
| `src/components/display/RichText/RichText.examples.tsx` | 删除 | 示例代码应在文档中 |
| `src/components/feedback/Tooltip/Tooltip.examples.tsx` | 删除 | 示例代码应在文档中 |
| `src/components/navigation/Menu/Menu.stories.tsx` | 删除 | 如不使用 Storybook |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: 导出唯一性

*For any* 公共 API 函数（如 useDebounce），应该只有一个标准的导入路径。

**Validates: Requirements 1.4, 5.1**

### Property 2: 编译正确性

*For any* 清理后的代码库，运行 TypeScript 编译应无错误。

**Validates: Requirements 6.1**

### Property 3: 测试通过

*For any* 清理后的代码库，所有现有测试应该通过。

**Validates: Requirements 6.3**

## Error Handling

### 清理风险处理

1. **导入路径变更** - 检查是否有外部代码依赖被删除的导出
2. **类型引用** - 确保删除的类型文件没有被引用
3. **示例代码** - 确保示例代码已迁移到文档

## Testing Strategy

### 验证方法

1. **编译测试** - 运行 `npm run type-check` 验证编译通过
2. **Lint 测试** - 运行 `npm run lint` 验证代码规范
3. **单元测试** - 运行 `npm run test:run` 验证测试通过
4. **导入检查** - 搜索代码库确保没有使用被删除的导入路径

### 测试命令

```bash
# 编译检查
npm run type-check

# Lint 检查
npm run lint

# 测试运行
npm run test:run

# 检查是否有使用旧导入路径
grep -r "from.*hooks/dom.*useDebounce" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*hooks/dom.*useThrottle" src/ --include="*.ts" --include="*.tsx"
```
