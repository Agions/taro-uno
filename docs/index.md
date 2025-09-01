# Taro UI 组件库

欢迎使用 Taro UI 组件库！这是一个基于 Taro 框架的现代化、高性能的跨平台 UI 组件库。

## ✨ 特性

- 🎨 **丰富的组件库** - 提供完整的UI组件解决方案
- 📱 **跨平台支持** - 支持微信小程序、H5、React Native等多平台
- 🎯 **TypeScript支持** - 完整的类型定义，提供更好的开发体验
- 🎨 **主题定制** - 灵活的主题系统，支持自定义样式
- 📚 **完善的文档** - 详细的文档和使用示例
- 🚀 **高性能** - 优化的性能表现，流畅的用户体验

## 🚀 快速开始

### 安装

```bash
npm install taro-uno
# 或
yarn add taro-uno
# 或
pnpm add taro-uno
```

### 基础使用

```tsx
import { Button } from 'taro-uno'

function App() {
  return (
    <Button type="primary" onClick={() => console.log('点击了按钮')}>
      点击我
    </Button>
  )
}
```

## 📖 组件文档

### 基础组件
- [Button 按钮](./components/basic/Button.md) - 按钮组件
- [Icon 图标](./components/basic/Icon.md) - 图标组件
- [Text 文本](./components/basic/Text.md) - 文本组件
- [Divider 分割线](./components/basic/Divider.md) - 分割线组件

### 展示组件
- [Avatar 头像](./components/display/Avatar.md) - 头像组件
- [Badge 徽章](./components/display/Badge.md) - 徽章组件
- [Calendar 日历](./components/display/Calendar.md) - 日历组件
- [Card 卡片](./components/display/Card.md) - 卡片组件
- [List 列表](./components/display/List.md) - 列表组件
- [Progress 进度条](./components/display/Progress.md) - 进度条组件
- [Table 表格](./components/display/Table.md) - 表格组件
- [Tag 标签](./components/display/Tag.md) - 标签组件
- [Timeline 时间线](./components/display/Timeline.md) - 时间线组件

### 反馈组件
- [Drawer 抽屉](./components/feedback/Drawer.md) - 抽屉组件
- [Loading 加载](./components/feedback/Loading.md) - 加载组件
- [Message 消息](./components/feedback/Message.md) - 消息组件
- [Modal 模态框](./components/feedback/Modal.md) - 模态框组件
- [Toast 轻提示](./components/feedback/Toast.md) - 轻提示组件

### 表单组件
- [Form 表单](./components/form/Form.md) - 表单组件
- [Select 选择器](./components/form/Select.md) - 选择器组件
- [Checkbox 复选框](./components/form/Checkbox.md) - 复选框组件
- [Radio 单选框](./components/form/Radio.md) - 单选框组件
- [DatePicker 日期选择器](./components/form/DatePicker.md) - 日期选择器组件

### 导航组件
- [Breadcrumb 面包屑](./components/navigation/Breadcrumb.md) - 面包屑组件
- [Menu 菜单](./components/navigation/Menu.md) - 菜单组件
- [Sidebar 侧边栏](./components/navigation/Sidebar.md) - 侧边栏组件
- [Pagination 分页](./components/navigation/Pagination.md) - 分页组件
- [Tabs 标签页](./components/navigation/Tabs.md) - 标签页组件

### 布局组件
- [Container 容器](./components/layout/Container.md) - 容器组件
- [Row 行](./components/layout/Row.md) - 行组件
- [Col 列](./components/layout/Col.md) - 列组件
- [Grid 网格](./components/layout/Grid.md) - 网格组件
- [Space 间距](./components/layout/Space.md) - 间距组件

### 性能优化组件
- [LazyComponent 懒加载](./components/performance/index.md#lazycomponent) - 懒加载组件
- [PerformanceAnalyzer 性能分析](./components/performance/index.md#performanceanalyzer) - 性能分析器
- [VirtualList 虚拟列表](./components/performance/index.md#virtuallist) - 虚拟列表组件

## 🪝 Hooks

### 性能监控
- [usePerformanceMonitor](./hooks/usePerformanceMonitor.md) - 性能监控钩子

### 平台检测
- [usePlatform](./hooks/usePlatform.md) - 平台检测钩子

### 样式管理
- [useStyle](./hooks/useStyle.md) - 样式管理钩子

### 主题管理
- [useTheme](./hooks/useTheme.md) - 主题管理钩子

### 虚拟滚动
- [useVirtualScroll](./hooks/useVirtualScroll.md) - 虚拟滚动钩子

## 🎨 主题系统

组件库支持完整的主题定制，包括：

- 颜色主题
- 字体主题
- 间距主题
- 动画主题

详见 [主题系统文档](./theme.md)

## 📚 更多文档

- [快速开始指南](./getting-started.md) - 快速上手指南
- [主题系统](./theme.md) - 主题定制指南
- [贡献指南](./contributing.md) - 贡献代码指南
- [变更日志](./changelog.md) - 版本变更记录
- [常见问题](./faq.md) - 常见问题解答
- [GitHub Pages 部署](./deployment.md) - 文档部署指南
- [遗失文档清单](./missing-docs-checklist.md) - 文档完成状态

## 🤝 贡献

欢迎贡献代码！请阅读 [贡献指南](./contributing.md) 了解详细信息。

## 📄 许可证

MIT License