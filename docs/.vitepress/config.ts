//# VitePress配置文件
//# 用于GitHub Pages部署的文档站点

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Taro UI 组件库',
  description: '基于Taro框架的现代化、高性能的跨平台UI组件库',

  //# 基础配置
  base: '/taro-uno/',
  lang: 'zh-CN',

  //# 主题配置
  themeConfig: {
    // 站点配置
    siteTitle: 'Taro UI',
    logo: '/logo.png',

    // 导航配置
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/getting-started' },
      { text: '组件', link: '/components/' },
      { text: 'Hooks', link: '/hooks/' },
      { text: '主题', link: '/theme' },
      { text: 'GitHub', link: 'https://github.com/your-username/taro-uno' }
    ],

    // 侧边栏配置
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/basic/Button.md' },
            { text: 'Icon 图标', link: '/components/basic/Icon.md' },
            { text: 'Text 文本', link: '/components/basic/Text.md' },
            { text: 'Divider 分割线', link: '/components/basic/Divider.md' }
          ]
        },
        {
          text: '展示组件',
          items: [
            { text: 'Avatar 头像', link: '/components/display/Avatar.md' },
            { text: 'Badge 徽章', link: '/components/display/Badge.md' },
            { text: 'Calendar 日历', link: '/components/display/Calendar.md' },
            { text: 'Card 卡片', link: '/components/display/Card.md' },
            { text: 'List 列表', link: '/components/display/List.md' },
            { text: 'Progress 进度条', link: '/components/display/Progress.md' },
            { text: 'Table 表格', link: '/components/display/Table.md' },
            { text: 'Tag 标签', link: '/components/display/Tag.md' },
            { text: 'Timeline 时间线', link: '/components/display/Timeline.md' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Drawer 抽屉', link: '/components/feedback/Drawer.md' },
            { text: 'Loading 加载', link: '/components/feedback/Loading.md' },
            { text: 'Message 消息', link: '/components/feedback/Message.md' },
            { text: 'Modal 模态框', link: '/components/feedback/Modal.md' },
            { text: 'Toast 轻提示', link: '/components/feedback/Toast.md' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Form 表单', link: '/components/form/Form.md' },
            { text: 'Select 选择器', link: '/components/form/Select.md' },
            { text: 'Checkbox 复选框', link: '/components/form/Checkbox.md' },
            { text: 'Radio 单选框', link: '/components/form/Radio.md' },
            { text: 'DatePicker 日期选择器', link: '/components/form/DatePicker.md' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/navigation/Breadcrumb.md' },
            { text: 'Menu 菜单', link: '/components/navigation/Menu.md' },
            { text: 'Sidebar 侧边栏', link: '/components/navigation/Sidebar.md' },
            { text: 'Pagination 分页', link: '/components/navigation/Pagination.md' },
            { text: 'Tabs 标签页', link: '/components/navigation/Tabs.md' }
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Container 容器', link: '/components/layout/Container.md' },
            { text: 'Row 行', link: '/components/layout/Row.md' },
            { text: 'Col 列', link: '/components/layout/Col.md' },
            { text: 'Grid 网格', link: '/components/layout/Grid.md' },
            { text: 'Space 间距', link: '/components/layout/Space.md' }
          ]
        }
      ],
      '/hooks/': [
        {
          text: 'Hooks',
          items: [
            { text: 'usePerformanceMonitor 性能监控', link: '/hooks/usePerformanceMonitor.md' },
            { text: 'usePlatform 平台检测', link: '/hooks/usePlatform.md' },
            { text: 'useStyle 样式管理', link: '/hooks/useStyle.md' },
            { text: 'useTheme 主题管理', link: '/hooks/useTheme.md' },
            { text: 'useVirtualScroll 虚拟滚动', link: '/hooks/useVirtualScroll.md' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/basic/Button.md' },
            { text: 'Icon 图标', link: '/components/basic/Icon.md' },
            { text: 'Text 文本', link: '/components/basic/Text.md' },
            { text: 'Divider 分割线', link: '/components/basic/Divider.md' }
          ]
        },
        {
          text: '展示组件',
          items: [
            { text: 'Avatar 头像', link: '/components/display/Avatar.md' },
            { text: 'Badge 徽章', link: '/components/display/Badge.md' },
            { text: 'Calendar 日历', link: '/components/display/Calendar.md' },
            { text: 'Card 卡片', link: '/components/display/Card.md' },
            { text: 'List 列表', link: '/components/display/List.md' },
            { text: 'Progress 进度条', link: '/components/display/Progress.md' },
            { text: 'Table 表格', link: '/components/display/Table.md' },
            { text: 'Tag 标签', link: '/components/display/Tag.md' },
            { text: 'Timeline 时间线', link: '/components/display/Timeline.md' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Drawer 抽屉', link: '/components/feedback/Drawer.md' },
            { text: 'Loading 加载', link: '/components/feedback/Loading.md' },
            { text: 'Message 消息', link: '/components/feedback/Message.md' },
            { text: 'Modal 模态框', link: '/components/feedback/Modal.md' },
            { text: 'Toast 轻提示', link: '/components/feedback/Toast.md' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Form 表单', link: '/components/form/Form.md' },
            { text: 'Select 选择器', link: '/components/form/Select.md' },
            { text: 'Checkbox 复选框', link: '/components/form/Checkbox.md' },
            { text: 'Radio 单选框', link: '/components/form/Radio.md' },
            { text: 'DatePicker 日期选择器', link: '/components/form/DatePicker.md' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/navigation/Breadcrumb.md' },
            { text: 'Menu 菜单', link: '/components/navigation/Menu.md' },
            { text: 'Sidebar 侧边栏', link: '/components/navigation/Sidebar.md' },
            { text: 'Pagination 分页', link: '/components/navigation/Pagination.md' },
            { text: 'Tabs 标签页', link: '/components/navigation/Tabs.md' }
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Container 容器', link: '/components/layout/Container.md' },
            { text: 'Row 行', link: '/components/layout/Row.md' },
            { text: 'Col 列', link: '/components/layout/Col.md' },
            { text: 'Grid 网格', link: '/components/layout/Grid.md' },
            { text: 'Space 间距', link: '/components/layout/Space.md' }
          ]
        },
        {
          text: '性能优化组件',
          items: [
            { text: 'LazyComponent 懒加载', link: '/components/performance/index.md#lazycomponent' },
            { text: 'PerformanceAnalyzer 性能分析', link: '/components/performance/index.md#performanceanalyzer' },
            { text: 'VirtualList 虚拟列表', link: '/components/performance/index.md#virtuallist' }
          ]
        }
      ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/taro-uno' }
    ],

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 页脚配置
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Taro UI Team'
    }
  },

  // Markdown配置
  markdown: {
    lineNumbers: true,
    theme: 'material-theme-palenight'
  },

  // 构建配置
  build: {
    outDir: 'docs/.vitepress/dist'
  },

  // 头部配置
  head: [
    ['link', { rel: 'stylesheet', href: '/styles/custom.css' }],
    ['link', { rel: 'stylesheet', href: '/styles/components.css' }],
    ['link', { rel: 'stylesheet', href: '/styles/theme.css' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'description', content: '基于Taro框架的现代化、高性能的跨平台UI组件库' }],
    ['meta', { name: 'keywords', content: 'Taro, UI, 组件库, 跨平台, React, TypeScript' }],
    ['meta', { name: 'author', content: 'Taro UI Team' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ]
})
