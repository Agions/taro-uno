# Requirements Document

## Introduction

本规范旨在对 Taro-Uno UI 组件库的组件目录结构进行重组，将现有的目录命名改为更专业、更符合行业标准的命名方式。参考 Ant Design、NutUI、Vant 等主流组件库的分类体系，使组件分类更加清晰、易于理解。

## Glossary

- **Component_Restructure_System**: 组件结构重组系统，负责目录重命名和导入路径更新
- **General_Components**: 通用组件，包含按钮、图标、排版等基础 UI 元素
- **Data_Entry_Components**: 数据录入组件，包含表单、输入框、选择器等
- **Data_Display_Components**: 数据展示组件，包含卡片、列表、表格等
- **Other_Components**: 其他组件，包含错误边界、懒加载、虚拟列表等

## Requirements

### Requirement 1: 目录重命名

**User Story:** As a 组件库维护者, I want 将组件目录重命名为更专业的名称, so that 组件分类更符合行业标准。

#### Acceptance Criteria

1. THE Component_Restructure_System SHALL 将 `src/components/basic/` 重命名为 `src/components/general/`
2. THE Component_Restructure_System SHALL 将 `src/components/form/` 重命名为 `src/components/data-entry/`
3. THE Component_Restructure_System SHALL 将 `src/components/display/` 重命名为 `src/components/data-display/`
4. THE Component_Restructure_System SHALL 将 `src/components/common/` 重命名为 `src/components/other/`
5. THE Component_Restructure_System SHALL 保留 `src/components/feedback/` 目录名称不变
6. THE Component_Restructure_System SHALL 保留 `src/components/layout/` 目录名称不变
7. THE Component_Restructure_System SHALL 保留 `src/components/navigation/` 目录名称不变

### Requirement 2: 导入路径更新

**User Story:** As a 开发者, I want 所有导入路径自动更新, so that 重命名后代码仍能正常运行。

#### Acceptance Criteria

1. THE Component_Restructure_System SHALL 更新所有引用 `components/basic` 的导入为 `components/general`
2. THE Component_Restructure_System SHALL 更新所有引用 `components/form` 的导入为 `components/data-entry`
3. THE Component_Restructure_System SHALL 更新所有引用 `components/display` 的导入为 `components/data-display`
4. THE Component_Restructure_System SHALL 更新所有引用 `components/common` 的导入为 `components/other`
5. THE Component_Restructure_System SHALL 更新 `src/components/index.tsx` 中的导出路径
6. THE Component_Restructure_System SHALL 更新 `src/index.ts` 中的导出路径

### Requirement 3: 文档更新

**User Story:** As a 组件库使用者, I want 文档中的组件分类与代码一致, so that 我可以快速找到需要的组件。

#### Acceptance Criteria

1. THE Component_Restructure_System SHALL 更新 `docs/docs/components/` 目录结构与代码一致
2. THE Component_Restructure_System SHALL 更新 `docs/sidebars.ts` 中的组件分类配置
3. THE Component_Restructure_System SHALL 更新所有组件文档中的导入示例

### Requirement 4: 测试文件更新

**User Story:** As a 开发者, I want 测试文件路径与组件路径一致, so that 测试文件易于查找和维护。

#### Acceptance Criteria

1. THE Component_Restructure_System SHALL 将 `tests/components/basic/` 重命名为 `tests/components/general/`
2. THE Component_Restructure_System SHALL 将 `tests/components/form/` 重命名为 `tests/components/data-entry/`
3. THE Component_Restructure_System SHALL 将 `tests/components/display/` 重命名为 `tests/components/data-display/`
4. THE Component_Restructure_System SHALL 更新测试文件中的导入路径

### Requirement 5: 组件内部文件结构规范化

**User Story:** As a 组件库维护者, I want 每个组件内部文件结构统一规范, so that 代码结构一致、易于维护和扩展。

#### Acceptance Criteria

##### 5.1 标准组件文件结构

1. THE Component_Restructure_System SHALL 确保每个组件目录包含以下标准文件：
   ```
   ComponentName/
   ├── index.tsx              # 导出入口（统一使用 .tsx 后缀）
   ├── ComponentName.tsx      # 组件实现
   ├── ComponentName.types.ts # 类型定义
   └── ComponentName.styles.ts # 样式定义
   ```

2. THE Component_Restructure_System SHALL 将所有 `index.ts` 文件统一为 `index.tsx`

##### 5.2 复合组件文件结构

3. THE Component_Restructure_System SHALL 确保复合组件（如 Form、List）包含以下额外文件：
   ```
   ComponentName/
   ├── index.tsx
   ├── ComponentName.tsx
   ├── ComponentName.types.ts
   ├── ComponentName.styles.ts
   ├── ComponentNameContext.ts    # 上下文（如需要）
   ├── ComponentNameItem.tsx      # 子组件（如需要）
   └── useComponentName.ts        # 组件专用 Hook（如需要）
   ```

##### 5.3 导出入口规范

4. THE Component_Restructure_System SHALL 确保每个组件的 `index.tsx` 遵循统一的导出格式：
   ```typescript
   export { ComponentName, default } from './ComponentName';
   export type { ComponentNameProps, ComponentNameRef } from './ComponentName.types';
   ```

##### 5.4 类型文件规范

5. THE Component_Restructure_System SHALL 确保每个组件的类型文件包含：
   - `ComponentNameProps` - 组件 Props 接口
   - `ComponentNameRef` - 组件 Ref 类型（如支持 forwardRef）
   - 其他相关类型定义

##### 5.5 样式文件规范

6. THE Component_Restructure_System SHALL 确保每个组件的样式文件使用 `createComponentStyles` 函数创建样式

### Requirement 6: 验证

**User Story:** As a 组件库维护者, I want 重组后代码能正常编译和测试, so that 确保重组没有破坏现有功能。

#### Acceptance Criteria

1. THE Component_Restructure_System SHALL 确保 `npm run type-check` 无错误
2. THE Component_Restructure_System SHALL 确保 `npm run lint` 无错误
3. THE Component_Restructure_System SHALL 确保 `npm run test:run` 测试通过
