# Requirements Document

## Introduction

本规范旨在对 Taro-Uno UI 组件库进行代码清理和专业化升级，包括：删除多余文件、消除所有 TypeScript any 类型、重新规划 UI 组件结构、以及专业化升级在线文档系统。目标是打造一个零 TypeScript 警告、结构清晰、文档完善的专业级组件库。

## Glossary

- **Codebase_Cleanup**: 代码库清理系统，负责识别和删除多余文件
- **Type_Safety_System**: 类型安全系统，确保所有代码使用严格类型定义
- **Component_Structure**: 组件结构系统，定义组件的目录和文件组织规范
- **Documentation_System**: 文档系统，基于 Docusaurus 的在线文档平台
- **API_Documentation**: API 文档，自动生成的组件 Props 和方法文档

## Requirements

### Requirement 1: 代码库清理

**User Story:** As a 组件库维护者, I want 删除所有多余和重复的文件, so that 代码库结构清晰、易于维护。

#### Acceptance Criteria

##### 1.1 Hooks 目录清理

1. THE Codebase_Cleanup SHALL 删除以下根目录下的重复 Hook 文件（保留分类目录中的版本）：
   ```
   删除文件列表：
   - src/hooks/useDebounce.ts        # 与 src/hooks/effect/useDebounce.ts 重复
   - src/hooks/useToggle.ts          # 与 src/hooks/state/useToggle.ts 重复
   - src/hooks/usePlatform.ts        # 与 src/hooks/ui/usePlatform.ts 重复
   - src/hooks/useStyle.ts           # 与 src/hooks/ui/useStyle.ts 重复
   - src/hooks/useTheme.ts           # 与 src/hooks/ui/useTheme.ts 重复
   - src/hooks/useRequest.ts         # 与 src/hooks/async/useRequest.ts 重复
   - src/hooks/useRequest.test.ts    # 测试文件应移至 tests/ 目录
   ```

2. THE Codebase_Cleanup SHALL 评估并整合以下 Hook 文件：
   ```
   评估文件列表：
   - src/hooks/useAsync.ts           # 评估是否与 useRequest 重复
   - src/hooks/useClickOutside.ts    # 移至 src/hooks/dom/ 目录
   - src/hooks/useCounter.ts         # 移至 src/hooks/state/ 目录
   - src/hooks/useDeepCompareEffect.ts # 移至 src/hooks/effect/ 目录
   - src/hooks/useEventHandling.ts   # 移至 src/hooks/dom/ 目录
   - src/hooks/useEventListener.ts   # 移至 src/hooks/dom/ 目录
   - src/hooks/useLifecycle.ts       # 评估是否与 lifecycle/ 目录重复
   - src/hooks/useMediaQuery.ts      # 移至 src/hooks/ui/ 目录
   - src/hooks/useMutation.ts        # 移至 src/hooks/async/ 目录
   - src/hooks/usePerformance.ts     # 移至 src/hooks/effect/ 目录
   - src/hooks/usePerformanceMonitor.ts # 移至 src/hooks/effect/ 目录
   - src/hooks/usePrevious.ts        # 移至 src/hooks/state/ 目录
   - src/hooks/useStateManagement.ts # 评估是否需要保留
   - src/hooks/useStorage.ts         # 移至 src/hooks/state/ 目录
   - src/hooks/useVirtualScroll.ts   # 移至 src/hooks/ui/ 目录
   ```

##### 1.2 Utils 目录清理

3. THE Codebase_Cleanup SHALL 删除以下 utils 子目录（与 services/ 重复或不需要）：
   ```
   删除目录列表：
   - src/utils/http/                 # 与 src/services/ 重复，删除整个目录
     - http-client.ts
     - http-client.test.ts
     - request.ts
     - request-cache.ts
     - taro-adapter.ts
     - taro-adapter.test.ts
     - web-adapter.ts
     - error-codes.ts
     - types.ts
   - src/utils/performance/          # 功能可移至 hooks，删除整个目录
     - performance.ts
   - src/utils/security/             # 功能可合并到其他文件，删除整个目录
     - api-security.ts
     - xss-protection.ts
   - src/utils/types/                # 与 src/types/ 重复，删除整个目录
     - dataProcessing.ts
     - typeHelpers.ts
   ```

4. THE Codebase_Cleanup SHALL 删除或合并以下工具文件：
   ```
   删除/合并文件列表：
   - src/utils/formatUtils.ts        # 与 src/utils/formatter.ts 重复，删除
   - src/utils/errorLogger.ts        # 与 src/utils/logger.ts 重复，合并后删除
   - src/utils/typeHelpers.ts        # 与 src/types/ 重复，删除
   - src/utils/inputValidator.ts     # 与 src/utils/validator.ts 重复，合并后删除
   - src/utils/xssProtection.ts      # 与 security/ 重复，删除
   - src/utils/securityHeaders.ts    # 不需要，删除
   - src/utils/rtl-support.ts        # 不需要 RTL 支持，删除
   - src/utils/abort-controller.ts   # 可合并到 services/，删除
   - src/utils/cache.ts              # 可合并到 services/，删除
   ```

5. THE Codebase_Cleanup SHALL 保留以下核心工具文件：
   ```
   保留文件列表：
   - src/utils/index.ts              # 统一导出
   - src/utils/classnames.ts         # 类名工具
   - src/utils/color.ts              # 颜色工具
   - src/utils/createComponent.ts    # 组件工厂
   - src/utils/createNamespace.ts    # 命名空间工具
   - src/utils/environment.ts        # 环境检测
   - src/utils/error-handler.ts      # 错误处理
   - src/utils/formatter.ts          # 格式化工具
   - src/utils/function.ts           # 函数工具
   - src/utils/is.ts                 # 类型判断
   - src/utils/logger.ts             # 日志工具
   - src/utils/object.ts             # 对象工具
   - src/utils/platform.ts           # 平台检测
   - src/utils/responsiveUtils.ts    # 响应式工具
   - src/utils/storage.ts            # 存储工具
   - src/utils/style.ts              # 样式工具
   - src/utils/unit.ts               # 单位转换
   - src/utils/validator.ts          # 验证工具
   - src/utils/__tests__/            # 测试目录
   ```

##### 1.3 Theme 目录清理

4. THE Codebase_Cleanup SHALL 评估并整合以下主题文件：
   ```
   评估文件列表：
   - src/theme/design-system.ts      # 与 src/theme/design-tokens.ts 功能重叠，合并
   - src/theme/tokens.ts             # 与 src/theme/tokens/ 目录重复，删除
   - src/theme/utils.ts              # 与 src/theme/utils/ 目录重复，删除
   - src/theme/styles.ts             # 与 src/theme/styles/ 目录重复，删除
   - src/theme/ThemeProvider.tsx     # 与 src/providers/ThemeProvider.tsx 重复，删除
   - src/theme/ThemeProvider.types.ts # 与 src/providers/ThemeProvider.tsx 重复，删除
   - src/theme/useThemeUtils.ts      # 评估是否需要保留
   - src/theme/animations.tsx        # 评估是否需要保留
   - src/theme/responsive.tsx        # 评估是否需要保留
   - src/theme/variables.ts          # 评估是否与 design-tokens.ts 重复
   ```

##### 1.4 Components 目录清理

5. THE Codebase_Cleanup SHALL 删除或移动以下组件文件：
   ```
   删除/移动文件列表：
   - src/components/common/ThemeProvider.tsx      # 与 src/providers/ThemeProvider.tsx 重复，删除
   - src/components/common/SecurityProvider.tsx   # 移至 src/providers/
   - src/components/common/ResponsiveContainer.tsx # 移至 src/components/layout/
   - src/components/common/ResponsiveGrid.tsx     # 移至 src/components/layout/
   ```

##### 1.5 Types 目录清理

6. THE Codebase_Cleanup SHALL 评估并整合以下类型文件：
   ```
   评估文件列表：
   - src/types/accessibility.ts      # 不需要无障碍支持，删除
   - src/types/button.ts             # 应在组件目录中定义，删除
   - src/types/component-props.ts    # 与 src/types/component.ts 重复，合并
   - src/types/standardized-components.ts # 评估是否需要保留
   ```

##### 1.6 根目录文件清理

7. THE Codebase_Cleanup SHALL 评估以下根目录文件：
   ```
   评估文件列表：
   - src/app.config.ts               # Taro 应用配置，保留
   - src/app.scss                    # 全局样式，保留
   - src/app.tsx                     # 应用入口，保留
   ```

##### 1.7 Hooks 目录结构规范

8. THE Codebase_Cleanup SHALL 保留以下目录结构规范：
   ```
   src/hooks/
   ├── index.ts              # 统一导出
   ├── types.ts              # Hook 类型定义
   ├── state/                # 状态管理 Hooks
   │   ├── useBoolean.ts
   │   ├── useToggle.ts
   │   ├── useCounter.ts
   │   ├── usePrevious.ts
   │   └── useStorage.ts
   ├── lifecycle/            # 生命周期 Hooks
   │   ├── useMount.ts
   │   └── useUnmount.ts
   ├── effect/               # 副作用 Hooks
   │   ├── useDebounce.ts
   │   ├── useThrottle.ts
   │   ├── useDeepCompareEffect.ts
   │   ├── usePerformance.ts
   │   └── usePerformanceMonitor.ts
   ├── dom/                  # DOM 相关 Hooks（新建）
   │   ├── useClickOutside.ts
   │   ├── useEventListener.ts
   │   └── useEventHandling.ts
   ├── ui/                   # UI 相关 Hooks
   │   ├── useTheme.ts
   │   ├── useStyle.ts
   │   ├── usePlatform.ts
   │   ├── useResponsive.ts
   │   ├── useMediaQuery.ts
   │   └── useVirtualScroll.ts
   └── async/                # 异步 Hooks
       ├── useRequest.ts
       ├── useAsync.ts
       └── useMutation.ts
   ```

9. THE Codebase_Cleanup SHALL 更新 `src/hooks/index.ts` 确保所有导出正确，无重复导出

### Requirement 2: TypeScript 类型安全

**User Story:** As a 开发者, I want 代码库中完全消除 any 类型, so that 获得完整的类型安全和 IDE 智能提示。

#### Acceptance Criteria

1. THE Type_Safety_System SHALL 将所有 `any` 类型替换为具体类型或泛型
2. THE Type_Safety_System SHALL 处理以下常见 any 使用场景：
   - 回调函数参数：使用泛型 `<T extends (...args: unknown[]) => unknown>`
   - 对象遍历：使用 `Record<string, unknown>` 或具体接口
   - 动态属性访问：使用类型断言或类型守卫
   - 第三方库类型：创建类型声明文件
3. WHEN 无法确定具体类型时, THE Type_Safety_System SHALL 使用 `unknown` 而非 `any`
4. THE Type_Safety_System SHALL 确保 ESLint `@typescript-eslint/no-explicit-any` 规则零警告
5. THE Type_Safety_System SHALL 为全局对象（如 `window.wx`）创建类型声明
6. THE Type_Safety_System SHALL 确保所有泛型函数有正确的类型约束

### Requirement 3: UI 组件重新规划与设计

**User Story:** As a 组件库使用者, I want 专业设计的 UI 组件系统, so that 我可以快速构建高质量的跨平台应用。

#### Acceptance Criteria

##### 3.1 组件分类体系

1. THE Component_Structure SHALL 采用以下专业组件分类体系：
   ```
   src/components/
   ├── index.tsx             # 统一导出
   │
   ├── general/              # 通用组件（原 basic）
   │   ├── Button/           # 按钮
   │   ├── Icon/             # 图标
   │   ├── Typography/       # 排版（合并 Text）
   │   └── Divider/          # 分割线
   │
   ├── layout/               # 布局组件
   │   ├── Grid/             # 栅格系统
   │   ├── Flex/             # 弹性布局
   │   ├── Space/            # 间距
   │   ├── Container/        # 容器
   │   ├── Row/              # 行
   │   ├── Col/              # 列
   │   └── SafeArea/         # 安全区域
   │
   ├── navigation/           # 导航组件
   │   ├── NavBar/           # 导航栏
   │   ├── TabBar/           # 标签栏
   │   ├── Tabs/             # 标签页
   │   ├── Menu/             # 菜单
   │   ├── Breadcrumb/       # 面包屑
   │   ├── Pagination/       # 分页
   │   ├── Steps/            # 步骤条
   │   └── IndexBar/         # 索引栏（新增）
   │
   ├── data-entry/           # 数据录入组件（原 form）
   │   ├── Form/             # 表单
   │   ├── Input/            # 输入框
   │   ├── Textarea/         # 文本域
   │   ├── InputNumber/      # 数字输入
   │   ├── Select/           # 选择器
   │   ├── Cascader/         # 级联选择
   │   ├── Picker/           # 选择器（新增）
   │   ├── DatePicker/       # 日期选择
   │   ├── TimePicker/       # 时间选择
   │   ├── Checkbox/         # 复选框
   │   ├── Radio/            # 单选框
   │   ├── Switch/           # 开关
   │   ├── Slider/           # 滑块
   │   ├── Rate/             # 评分（从 display 移入）
   │   ├── Upload/           # 上传
   │   ├── Transfer/         # 穿梭框
   │   ├── AutoComplete/     # 自动完成
   │   └── NumberKeyboard/   # 数字键盘（新增）
   │
   ├── data-display/         # 数据展示组件（原 display）
   │   ├── Avatar/           # 头像
   │   ├── Badge/            # 徽标
   │   ├── Card/             # 卡片
   │   ├── Collapse/         # 折叠面板（新增）
   │   ├── List/             # 列表
   │   ├── Table/            # 表格
   │   ├── Tag/              # 标签
   │   ├── Timeline/         # 时间线
   │   ├── Calendar/         # 日历
   │   ├── Carousel/         # 轮播
   │   ├── Image/            # 图片（新增）
   │   ├── ImagePreview/     # 图片预览（新增）
   │   ├── Skeleton/         # 骨架屏（新增）
   │   ├── Empty/            # 空状态（新增）
   │   ├── Watermark/        # 水印（新增）
   │   ├── CountDown/        # 倒计时（新增）
   │   └── RichText/         # 富文本
   │
   ├── feedback/             # 反馈组件
   │   ├── Modal/            # 模态框
   │   ├── Dialog/           # 对话框（新增，轻量版 Modal）
   │   ├── Drawer/           # 抽屉
   │   ├── Toast/            # 轻提示
   │   ├── Message/          # 消息
   │   ├── Notification/     # 通知
   │   ├── Loading/          # 加载
   │   ├── Progress/         # 进度条
   │   ├── Result/           # 结果
   │   ├── Tooltip/          # 文字提示
   │   ├── Popover/          # 气泡卡片（新增）
   │   ├── Popconfirm/       # 气泡确认
   │   ├── ActionSheet/      # 动作面板（新增）
   │   └── SwipeCell/        # 滑动单元格（新增）
   │
   └── other/                # 其他组件
       ├── Affix/            # 固钉
       ├── BackTop/          # 回到顶部（新增）
       ├── ConfigProvider/   # 全局配置
       ├── ErrorBoundary/    # 错误边界
       ├── LazyComponent/    # 懒加载
       └── VirtualList/      # 虚拟列表
   ```

##### 3.2 组件设计规范

2. THE Component_Structure SHALL 每个组件遵循统一的设计规范：
   - **Props 设计**：继承通用类型（BaseProps, InteractiveProps, FormItemProps）
   - **样式系统**：使用 Design Token 和 createComponentStyles
   - **平台适配**：通过 usePlatform Hook 处理平台差异
   - **主题支持**：支持亮色/暗色主题切换

3. THE Component_Structure SHALL 每个组件目录包含标准文件：
   ```
   ComponentName/
   ├── index.tsx             # 导出入口
   ├── ComponentName.tsx     # 组件实现
   ├── ComponentName.types.ts # 类型定义
   ├── ComponentName.styles.ts # 样式定义
   ├── ComponentName.test.tsx # 单元测试
   ├── useComponentName.ts   # 组件专用 Hook（可选）
   └── components/           # 子组件（可选）
       ├── SubComponent.tsx
       └── SubComponent.types.ts
   ```

##### 3.3 组件 API 设计规范

4. THE Component_Structure SHALL 所有组件遵循统一的 Props API 设计：
   ```typescript
   // 通用 Props
   interface CommonProps {
     className?: string;        // 自定义类名
     style?: CSSProperties;     // 自定义样式
     children?: ReactNode;      // 子元素
     'data-testid'?: string;    // 测试标识
   }
   
   // 尺寸 Props
   interface SizeProps {
     size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
   }
   
   // 状态 Props
   interface StateProps {
     disabled?: boolean;        // 禁用状态
     loading?: boolean;         // 加载状态
     readonly?: boolean;        // 只读状态
   }
   
   // 表单 Props
   interface FormProps<T> {
     value?: T;                  // 受控值
     defaultValue?: T;          // 默认值
     onChange?: (value: T) => void;  // 值变更回调
     name?: string;             // 表单字段名
   }
   ```

##### 3.4 新增组件清单

5. THE Component_Structure SHALL 新增以下高优先级组件：
   - **Skeleton** - 骨架屏，用于加载占位
   - **Empty** - 空状态，用于无数据展示
   - **ImagePreview** - 图片预览，支持手势缩放
   - **ActionSheet** - 动作面板，底部弹出选项
   - **SwipeCell** - 滑动单元格，左右滑动操作
   - **IndexBar** - 索引栏，快速定位列表
   - **NumberKeyboard** - 数字键盘，安全输入
   - **Picker** - 选择器，多列滚动选择
   - **CountDown** - 倒计时，支持多种格式
   - **Watermark** - 水印，页面安全标识
   - **Dialog** - 对话框，轻量级确认框
   - **Popover** - 气泡卡片，悬浮信息展示
   - **BackTop** - 回到顶部，长页面导航
   - **Collapse** - 折叠面板，内容收起展开
   - **Image** - 图片组件，支持懒加载和错误处理

##### 3.5 组件重构清单

6. THE Component_Structure SHALL 重构以下现有组件：
   - **Typography** - 合并 Text 组件，统一排版系统
   - **Video** - 移除或重构为更通用的媒体组件
   - **common/** - 重新组织为 other/ 分类

##### 3.6 组件删除清单

7. THE Component_Structure SHALL 删除以下冗余组件/文件：
   - `src/components/common/ResponsiveContainer.tsx` - 移至 layout/
   - `src/components/common/ResponsiveGrid.tsx` - 移至 layout/
   - `src/components/common/SecurityProvider.tsx` - 移至 providers/
   - `src/components/common/ThemeProvider.tsx` - 移至 providers/
   - `src/components/basic/Video/` - 评估是否保留

### Requirement 4: 文档系统专业化升级

**User Story:** As a 组件库使用者, I want 专业完善的在线文档, so that 我可以快速学习和使用组件库。

#### Acceptance Criteria

1. THE Documentation_System SHALL 重新组织文档结构：
   ```
   docs/docs/
   ├── intro.md              # 介绍
   ├── quickstart.md         # 快速开始
   ├── guides/               # 指南
   │   ├── installation.md   # 安装指南
   │   ├── theme-customization.md # 主题定制
   │   ├── multi-platform.md # 多平台开发
   │   └── best-practices.md # 最佳实践
   ├── components/           # 组件文档
   │   ├── basic/           # 基础组件
   │   ├── form/            # 表单组件
   │   ├── display/         # 展示组件
   │   ├── feedback/        # 反馈组件
   │   ├── layout/          # 布局组件
   │   └── navigation/      # 导航组件
   ├── hooks/                # Hooks 文档
   │   └── index.md
   ├── api/                  # API 参考
   │   └── index.md
   ├── changelog.md          # 更新日志
   └── faq.md               # 常见问题
   ```
2. THE Documentation_System SHALL 为每个组件提供标准文档模板：
   - 组件介绍
   - 基础用法示例
   - Props API 表格
   - 事件说明
   - 平台兼容性说明
   - 注意事项
3. THE Documentation_System SHALL 自动从 TypeScript 类型生成 Props 文档
4. THE Documentation_System SHALL 提供中英文双语支持
5. THE Documentation_System SHALL 配置正确的 Docusaurus 侧边栏导航
6. THE Documentation_System SHALL 提供组件在线演示（如果可行）

### Requirement 5: ESLint 配置优化

**User Story:** As a 开发者, I want 严格的代码质量检查, so that 代码保持高质量标准。

#### Acceptance Criteria

1. THE Type_Safety_System SHALL 配置 ESLint 规则：
   - `@typescript-eslint/no-explicit-any: error` - 禁止 any
   - `@typescript-eslint/explicit-function-return-type: warn` - 函数返回类型
   - `@typescript-eslint/no-unused-vars: error` - 未使用变量
   - `@typescript-eslint/strict-boolean-expressions: warn` - 严格布尔表达式
2. THE Type_Safety_System SHALL 运行 `npm run lint` 零错误
3. THE Type_Safety_System SHALL 运行 `npm run type-check` 零错误
4. THE Type_Safety_System SHALL 配置 pre-commit hooks 自动检查

### Requirement 6: 导出优化

**User Story:** As a 组件库使用者, I want 清晰的模块导出, so that 我可以按需引入组件和工具。

#### Acceptance Criteria

1. THE Component_Structure SHALL 提供以下导出方式：
   ```typescript
   // 全量导入
   import { Button, Input, useTheme } from 'taro-uno-ui';
   
   // 按需导入组件
   import { Button } from 'taro-uno-ui/components/basic';
   import { Input } from 'taro-uno-ui/components/form';
   
   // 按需导入 Hooks
   import { useTheme } from 'taro-uno-ui/hooks';
   
   // 按需导入工具
   import { cn } from 'taro-uno-ui/utils';
   ```
2. THE Component_Structure SHALL 确保 Tree-shaking 正常工作
3. THE Component_Structure SHALL 避免导出名称冲突
4. THE Component_Structure SHALL 提供类型导出

