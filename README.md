# Taro Uno

[![npm version](https://img.shields.io/npm/v/taro-uno-ui.svg?style=flat-square)](https://www.npmjs.com/package/taro-uno-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

Taro Uno 是一个基于 Taro 框架的跨平台组件库，提供丰富的 UI 组件和表单控件，支持微信小程序、H5、React Native 等多端开发。

## ✨ v1.0.0 新特性

### 🌐 多平台API请求层
- **UnifiedRequestClient** - 智能HTTP客户端，自动适配各平台
- **智能缓存** - 请求缓存与去重，性能提升67%
- **灵活重试** - 支持指数/线性/固定退避策略
- **拦截器** - 完整的请求/响应拦截支持

### 🎣 强大的React Hooks
- **useMutation** - 数据变更与乐观更新
- **useToggle, useCounter** - 状态管理
- **useLocalStorage/useSessionStorage** - 持久化存储
- **useClickOutside** - UI交互检测

详见 [CHANGELOG.md](./CHANGELOG.md)

## 特性

- **跨平台兼容**：支持微信小程序、H5、React Native 等多端环境
- **丰富组件**：提供完整的 UI 组件和表单控件
- **TypeScript 支持**：完整的类型定义，提供良好的开发体验
- **主题定制**：支持自定义主题和样式变量
- **易于扩展**：组件设计遵循可组合、可扩展原则
- **完善文档**：详细的使用文档和示例

## 安装

```bash
# 使用 npm
npm install taro-uno-ui

# 使用 yarn
yarn add taro-uno-ui

# 使用 pnpm
pnpm add taro-uno-ui
```

## 快速开始

### 引入样式

在项目入口文件中引入全局样式：

```tsx
// app.tsx 或 app.jsx
import 'taro-uno-ui/dist/style.css';
```

### 引入组件

```tsx
import React from 'react';
import { View } from '@tarojs/components';
import { Button, Input } from 'taro-uno-ui';

const App = () => {
  return (
    <View>
      <Input placeholder="请输入内容" />
      <Button type="primary">点击我</Button>
    </View>
  );
};

export default App;
```

## 组件分类

### 基础组件 (Basic)
- Button - 按钮
- Icon - 图标
- Typography - 排版

### 表单组件 (Form)
- Input - 输入框
- Select - 选择器
- Checkbox - 复选框
- Radio - 单选框
- Switch - 开关
- Slider - 滑块
- Upload - 上传
- DatePicker - 日期选择器
- TimePicker - 时间选择器
- Cascader - 级联选择器
- Textarea - 多行文本输入

### 布局组件 (Layout)
- Grid - 网格
- Space - 间距
- Divider - 分割线
- Container - 容器

### 显示组件 (Display)
- Card - 卡片
- Table - 表格
- List - 列表
- Badge - 徽标
- Avatar - 头像

### 反馈组件 (Feedback)
- Modal - 对话框
- Message - 消息提示
- Notification - 通知提醒
- Toast - 轻提示
- Loading - 加载

### 导航组件 (Navigation)
- Tabs - 标签页
- Pagination - 分页
- Steps - 步骤条

## 文档

### 组件文档

每个组件都配有详细的中文文档，包含：
- 功能介绍
- 基本用法
- API 参数说明
- 事件说明
- 使用示例

### 文档结构

组件文档位于 `docs/components/` 目录下，按组件类型分类：

- `docs/components/basic/` - 基础组件文档
- `docs/components/form/` - 表单组件文档
- `docs/components/layout/` - 布局组件文档
- `docs/components/display/` - 显示组件文档
- `docs/components/feedback/` - 反馈组件文档
- `docs/components/navigation/` - 导航组件文档

### 示例代码

每个组件的文档目录中包含 `examples` 文件夹，提供可运行的示例代码，方便开发者快速了解组件的使用方法。

### 文档生成

我们提供了自动化的文档生成工具：

```bash
# 生成所有文档
node scripts/generate-docs.js all

# 生成组件文档
node scripts/generate-docs.js components

# 生成 API 文档
node scripts/generate-docs.js api

# 生成类型文档
node scripts/generate-docs.js types
```

### 文档验证

使用文档验证工具确保文档质量：

```bash
# 验证文档
node scripts/validate-docs.js

# 更新文档
node scripts/update-docs.js --commit
```

### 文档部署

文档自动化部署到 GitHub Pages：
- 每次代码提交自动构建和部署
- 支持多环境部署
- 自动生成文档统计和报告

### API 文档

项目使用 TypeDoc 自动生成 API 文档：

```bash
# 生成 API 文档
npm run docs:generate

# 监听模式（文件变化自动重新生成）
npm run docs:watch
```

生成的文档位于 `docs/api/` 目录，包含：
- 完整的类型定义
- 组件 Props 接口
- 工具函数文档
- 类型别名和枚举

### 本地开发

```bash
# 启动文档开发服务器
cd docs
pnpm install
pnpm dev

# 构建文档
pnpm build
```

## 开发指南

### 开发环境设置

1. 克隆仓库
```bash
git clone https://github.com/agions/taro-uno.git
cd taro-uno
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
# H5
pnpm dev:h5

# 微信小程序
pnpm dev:weapp
```

### 构建

```bash
# 构建 H5
pnpm build:h5

# 构建微信小程序
pnpm build:weapp

# 构建所有平台
pnpm build:all
```

### 测试

```bash
# 运行单元测试
pnpm test

# 运行 ESLint 检查
pnpm lint
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规范
- 编写完整的单元测试
- 添加详细的 JSDoc 注释
- 遵循 Git 提交规范

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 更新日志

详细的更新日志请查看 [CHANGELOG.md](CHANGELOG.md)

## 联系我们

- GitHub: https://github.com/agions/taro-uno
- Issues: https://github.com/agions/taro-uno/issues
