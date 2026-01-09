# Implementation Plan: 代码库清理

## Overview

本实现计划将清理 Taro-Uno UI 组件库中的冗余文件和重复代码，确保代码库保持专业、可维护的状态。

## Tasks

- [x] 1. 清理 Hooks 重复导出
  - [x] 1.1 修改 `src/hooks/dom/index.ts`，移除 `useDebounce` 和 `useThrottle` 的导出
    - 这些功能应该只从 `hooks/effect/` 导出
    - _Requirements: 1.4, 5.1_
  - [x] 1.2 检查是否有代码使用 `hooks/dom` 导入 `useDebounce` 或 `useThrottle`
    - 如有，更新导入路径为 `hooks/effect`
    - _Requirements: 1.4_

- [x] 2. 清理组件冗余文件
  - [x] 2.1 删除 `src/components/display/RichText/RichText.examples.tsx`
    - 示例代码应在文档中
    - _Requirements: 3.1_
  - [x] 2.2 删除 `src/components/feedback/Tooltip/Tooltip.examples.tsx`
    - 示例代码应在文档中
    - _Requirements: 3.1_
  - [x] 2.3 删除 `src/components/navigation/Menu/Menu.stories.tsx`
    - 如不使用 Storybook
    - _Requirements: 3.2_

- [x] 3. 检查类型文件使用情况
  - [x] 3.1 检查 `src/types/glob.d.ts` 是否被使用
    - _Requirements: 4.1_
  - [x] 3.2 检查 `src/types/modules.d.ts` 是否被使用
    - _Requirements: 4.1_

- [x] 4. Checkpoint - 清理完成
  - 运行 `npm run type-check` 确保无编译错误 ✓
  - 运行 `npm run lint` 确保无 ESLint 错误 ✓
  - 如有问题请询问用户

- [x] 5. Final Checkpoint - 完成验收
  - 运行 `npm run test:run` 确保测试通过 ✓ (537 tests passed)
  - 如有问题请询问用户

## Notes

- 清理前先检查文件是否被引用
- 保持向后兼容，不破坏现有 API
- 每次删除后运行类型检查确保没有破坏依赖
