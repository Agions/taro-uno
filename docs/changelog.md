# 变更日志

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

## [Unreleased]

### 新增

- 完整的组件文档系统
- GitHub Pages 部署支持
- VitePress 文档站点
- 响应式设计支持
- 深色模式支持

### 改进

- 更新了所有现有组件的文档
- 优化了代码示例
- 改进了导航结构
- 增强了样式系统

### 修复

- 修复了文档链接问题
- 改进了移动端显示

## [0.1.0] - 2024-01-15

### 新增

- 🎨 **基础组件**
  - Button 按钮组件
  - Icon 图标组件
  - Text 文本组件
  - Divider 分割线组件

- 📱 **展示组件**
  - Avatar 头像组件
  - Badge 徽章组件
  - Calendar 日历组件
  - Card 卡片组件
  - List 列表组件
  - Progress 进度条组件
  - Table 表格组件
  - Tag 标签组件
  - Timeline 时间线组件

- 💬 **反馈组件**
  - Drawer 抽屉组件
  - Loading 加载组件
  - Message 消息组件
  - Modal 模态框组件
  - Toast 轻提示组件

- 📝 **表单组件**
  - Form 表单组件
  - Select 选择器组件
  - Checkbox 复选框组件
  - Radio 单选框组件
  - DatePicker 日期选择器组件

- 🧭 **导航组件**
  - Breadcrumb 面包屑组件
  - Menu 菜单组件
  - Sidebar 侧边栏组件
  - Pagination 分页组件
  - Tabs 标签页组件

- 📐 **布局组件**
  - Container 容器组件
  - Row 行组件
  - Col 列组件
  - Grid 网格组件
  - Space 间距组件

- 🚀 **性能优化组件**
  - LazyComponent 懒加载组件
  - PerformanceAnalyzer 性能分析器
  - VirtualList 虚拟列表组件

- 🪝 **Hooks**
  - usePerformanceMonitor 性能监控钩子
  - usePlatform 平台检测钩子
  - useStyle 样式管理钩子
  - useTheme 主题管理钩子
  - useVirtualScroll 虚拟滚动钩子

### 特性

- 🎨 **主题系统**
  - 完整的颜色主题支持
  - 深色/浅色模式切换
  - 自定义主题配置
  - CSS 变量支持

- 📱 **跨平台支持**
  - 微信小程序支持
  - H5 支持
  - React Native 支持

- 🎯 **TypeScript 支持**
  - 完整的类型定义
  - 泛型支持
  - 类型推断

- 🧪 **测试支持**
  - Jest 单元测试
  - React Testing Library
  - 代码覆盖率报告

- 📚 **文档系统**
  - 完整的 API 文档
  - 使用示例
  - 最佳实践指南

### 开发工具

- 🛠️ **构建工具**
  - Vite 构建
  - Rollup 打包
  - TypeScript 编译

- 🎨 **样式工具**
  - SCSS 支持
  - CSS 模块
  - PostCSS 处理

- 📊 **代码质量**
  - ESLint 代码检查
  - Prettier 代码格式化
  - Husky Git hooks
  - Commitlint 提交规范

### 示例和模板

- 📦 **项目模板**
  - 基础项目模板
  - 完整项目模板

- 🎯 **使用示例**
  - 组件使用示例
  - 集成示例
  - 最佳实践示例

## [0.0.1] - 2024-01-01

### 新增

- 🏗️ **项目初始化**
  - 项目结构搭建
  - 开发环境配置
  - 构建工具配置

- 📋 **基础配置**
  - TypeScript 配置
  - ESLint 配置
  - Prettier 配置
  - Git hooks 配置

- 📚 **文档框架**
  - 文档结构设计
  - 文档工具配置
  - 文档模板创建

---

## 版本说明

### 版本类型

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 更新类型

- **新增** (Added): 新功能
- **变更** (Changed): 已有功能的变更
- **弃用** (Deprecated): 即将移除的功能
- **移除** (Removed): 已移除的功能
- **修复** (Fixed): 任何错误修复
- **安全** (Security): 安全相关的修复

### 发布流程

1. 代码审查通过
2. 测试全部通过
3. 文档更新完成
4. 版本号更新
5. 创建发布标签
6. 发布到 npm
7. 更新变更日志