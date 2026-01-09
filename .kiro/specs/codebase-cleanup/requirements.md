# Requirements Document

## Introduction

本规范旨在清理 Taro-Uno UI 组件库中的冗余文件、重复代码和未使用的模块，确保代码库保持专业、可维护的状态。

## Glossary

- **Codebase_Cleanup_System**: 代码库清理系统，负责识别和删除冗余文件
- **Duplicate_Code**: 重复代码，功能相同或高度相似的代码
- **Unused_File**: 未使用文件，没有被任何其他文件引用的文件
- **Redundant_Export**: 冗余导出，在多个地方重复导出相同功能

## Requirements

### Requirement 1: 清理重复的 Hooks

**User Story:** As a 开发者, I want 删除功能重复的 hooks, so that 代码库更简洁、易于维护。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 合并 `useBoolean` 和 `useToggle` 的重复功能
   - `useBoolean` 专注于布尔值操作
   - `useToggle` 专注于两个值之间的切换
   - 保留两者，因为它们有不同的使用场景

2. THE Codebase_Cleanup_System SHALL 检查 `usePerformance.ts` 和 `usePerformanceMonitor.ts` 的功能重叠
   - `usePerformance.ts` 提供通用性能优化工具（记忆化、缓存、虚拟列表等）
   - `usePerformanceMonitor.ts` 专注于性能监控和指标收集
   - 保留两者，因为它们职责不同

3. THE Codebase_Cleanup_System SHALL 检查 `useEventHandling.ts` 和 `useEventListener.ts` 的功能重叠
   - `useEventHandling.ts` 提供高级事件处理（防抖、节流、长按、拖拽等）
   - `useEventListener.ts` 提供简单的事件监听器管理
   - 保留两者，因为它们职责不同

4. THE Codebase_Cleanup_System SHALL 删除 `hooks/dom/index.ts` 中从 `useEventHandling` 导出的 `useDebounce` 和 `useThrottle`
   - 这些功能已在 `hooks/effect/useDebounce.ts` 和 `hooks/effect/useThrottle.ts` 中实现
   - 避免重复导出造成混淆

### Requirement 2: 清理重复的平台检测代码

**User Story:** As a 开发者, I want 统一平台检测逻辑, so that 避免代码重复和维护困难。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 确保 `src/utils/platform.ts` 只是 `src/platform/detector.ts` 的包装器
   - 当前已正确实现，`utils/platform.ts` 重新导出 `platform/detector.ts` 的功能
   - 保持现状，不需要修改

### Requirement 3: 清理组件中的冗余文件

**User Story:** As a 组件库维护者, I want 删除组件中的冗余文件, so that 组件结构更清晰。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 删除组件中的 `.examples.tsx` 文件（如果存在）
   - 示例代码应该放在文档或 Storybook 中
   - 检查 `RichText.examples.tsx`、`Tooltip.examples.tsx` 等

2. THE Codebase_Cleanup_System SHALL 删除组件中的 `.stories.tsx` 文件（如果不使用 Storybook）
   - 检查 `Menu.stories.tsx` 等

### Requirement 4: 清理未使用的类型声明文件

**User Story:** As a 开发者, I want 删除未使用的类型声明文件, so that 类型系统更清晰。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 检查 `src/types/` 目录中的文件是否都被使用
   - 检查 `glob.d.ts`、`modules.d.ts` 等是否有实际引用

### Requirement 5: 清理 hooks/effect 中的重复导出

**User Story:** As a 开发者, I want 清理重复的 hooks 导出, so that 导入路径更清晰。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 从 `hooks/dom/index.ts` 中移除 `useDebounce` 和 `useThrottle` 的导出
   - 这些应该只从 `hooks/effect/` 导出
   - 避免同一功能有多个导入路径

### Requirement 6: 验证

**User Story:** As a 组件库维护者, I want 清理后代码能正常编译和测试, so that 确保清理没有破坏现有功能。

#### Acceptance Criteria

1. THE Codebase_Cleanup_System SHALL 确保 `npm run type-check` 无错误
2. THE Codebase_Cleanup_System SHALL 确保 `npm run lint` 无错误
3. THE Codebase_Cleanup_System SHALL 确保 `npm run test:run` 测试通过
