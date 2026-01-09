# Implementation Plan: 组件内部文件结构规范化

## Overview

本实现计划将 Taro-Uno UI 组件库的每个组件内部文件结构进行规范化，确保所有组件都遵循统一的文件结构标准。

**标准组件文件结构：**
```
ComponentName/
├── index.tsx              # 导出入口
├── ComponentName.tsx      # 组件实现
├── ComponentName.types.ts # 类型定义
└── ComponentName.styles.ts # 样式定义
```

## Tasks

- [x] 1. 规范化 basic 目录组件
  - [x] 1.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：所有组件已使用 index.tsx
  - [x] 1.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：所有组件已有完整文件结构

- [x] 2. 规范化 form 目录组件
  - [x] 2.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：Cascader, InputNumber, TimePicker, Transfer 已改为 index.tsx
  - [x] 2.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：所有组件已有完整文件结构

- [x] 3. 规范化 display 目录组件
  - [x] 3.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：Avatar, Badge, Calendar, Card, Carousel, List, Rate, Tag, Timeline 已改为 index.tsx
  - [x] 3.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：Badge 已添加 Badge.styles.ts

- [x] 4. 规范化 feedback 目录组件
  - [x] 4.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：Loading, Message 已改为 index.tsx；删除重复的 index.ts（Notification, Progress, Tooltip）
  - [x] 4.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：所有组件已有完整文件结构

- [x] 5. 规范化 layout 目录组件
  - [x] 5.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：所有组件已使用 index.tsx
  - [x] 5.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：ResponsiveContainer, ResponsiveGrid 已添加 styles.ts

- [x] 6. 规范化 navigation 目录组件
  - [x] 6.1 统一 `index.ts` 为 `index.tsx`
    - _Requirements: 5.1_
    - 已完成：删除重复的 Pagination/index.ts
  - [x] 6.2 检查并补充缺失的 types.ts 和 styles.ts 文件
    - _Requirements: 5.4, 5.5_
    - 已完成：所有组件已有完整文件结构

- [x] 7. 规范化 common 目录组件
  - [x] 7.1 将单文件组件改为标准目录结构
    - 将 `ErrorBoundary.tsx` 移至 `ErrorBoundary/` 目录 ✓
    - 将 `LazyComponent.tsx` 移至 `LazyComponent/` 目录 ✓
    - 将 `VirtualList.tsx` 移至 `VirtualList/` 目录 ✓
    - _Requirements: 5.1_
  - [x] 7.2 为每个组件创建 index.tsx、types.ts、styles.ts
    - _Requirements: 5.4, 5.5_
    - 已完成：所有组件已有完整文件结构

- [x] 8. Checkpoint - 组件结构规范化完成
  - 运行 `npm run type-check` 确保无编译错误 ✓
  - 如有问题请询问用户

- [x] 9. 更新导出文件
  - [x] 9.1 更新各分类目录的 index.tsx 导出
    - _Requirements: 5.3_
    - 已完成：common/index.tsx 已更新

- [x] 10. Final Checkpoint - 完成验收
  - 运行 `npm run type-check` 确保无 TypeScript 错误 ✓
  - 运行 `npm run test:run` 确保测试通过 ✓ (537 tests passed)

## Notes

- 保持现有目录名称不变（basic、form、display、common 等）
- 只规范化组件内部文件结构
- 确保每个组件都有 index.tsx、ComponentName.tsx、ComponentName.types.ts、ComponentName.styles.ts

## 完成总结

所有任务已完成：
1. 将所有 `index.ts` 统一为 `index.tsx`
2. 删除重复的 index.ts 文件
3. 补充缺失的 styles.ts 文件
4. 将 common 目录的单文件组件重构为标准目录结构
5. 类型检查和测试全部通过
