import { defineConfig } from 'vitepress'
import { search as zhSearch } from '@vitepress/plugin-search'
import { git } from 'vitepress-plugin-git'

export default defineConfig({
  // 站点配置
  title: 'Taro-Uno UI',
  description: '现代化的多端 UI 组件库，让跨平台开发更简单',
  base: '/',
  
  // 语言配置
  lang: 'zh-CN',
  
  // SEO 配置
  head: [
    ['meta', { name: 'keywords', content: 'Taro,UI,组件库,多端,React,TypeScript' }],
    ['meta', { name: 'author', content: 'Agions Team' }],
    ['meta', { name: 'og:title', content: 'Taro-Uno UI' }],
    ['meta', { name: 'og:description', content: '现代化的多端 UI 组件库，让跨平台开发更简单' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:url', content: 'https://taro-uno.com' }],
    ['meta', { name: 'og:image', content: 'https://taro-uno.com/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Taro-Uno UI' }],
    ['meta', { name: 'twitter:description', content: '现代化的多端 UI 组件库，让跨平台开发更简单' }],
    ['meta', { name: 'twitter:image', content: 'https://taro-uno.com/og-image.png' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }]
  ],

  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/getting-started' },
      { text: '组件', link: '/components/basic/button' },
      { text: 'Hooks', link: '/hooks/use-theme' },
      { text: '主题', link: '/theme' },
      { text: '性能', link: '/performance' },
      { text: '更新日志', link: '/changelog' }
    ],

    // 侧边栏配置
    sidebar: {
      '/': [
        {
          text: '开始使用',
          items: [
            { text: '介绍', link: '/' },
            { text: '快速开始', link: '/quick-start' },
            { text: '安装指南', link: '/getting-started' },
            { text: '开发指南', link: '/guides/development' }
          ]
        },
        {
          text: '组件',
          items: [
            {
              text: '基础组件',
              link: '/components/basic/',
              items: [
                { text: 'Button 按钮', link: '/components/basic/button' },
                { text: 'Icon 图标', link: '/components/basic/icon' },
                { text: 'Text 文本', link: '/components/basic/text' },
                { text: 'Divider 分割线', link: '/components/basic/divider' }
              ]
            },
            {
              text: '表单组件',
              link: '/components/form/',
              items: [
                { text: 'Form 表单', link: '/components/form/form' },
                { text: 'Input 输入框', link: '/components/form/input' },
                { text: 'Select 选择器', link: '/components/form/select' },
                { text: 'Radio 单选框', link: '/components/form/radio' },
                { text: 'Checkbox 复选框', link: '/components/form/checkbox' }
              ]
            },
            {
              text: '展示组件',
              link: '/components/display/',
              items: [
                { text: 'Card 卡片', link: '/components/display/card' },
                { text: 'List 列表', link: '/components/display/list' },
                { text: 'Tag 标签', link: '/components/display/tag' },
                { text: 'Progress 进度条', link: '/components/display/progress' },
                { text: 'Avatar 头像', link: '/components/display/avatar' }
              ]
            },
            {
              text: '反馈组件',
              link: '/components/feedback/',
              items: [
                { text: 'Loading 加载', link: '/components/feedback/loading' },
                { text: 'Message 消息', link: '/components/feedback/message' },
                { text: 'Modal 模态框', link: '/components/feedback/modal' },
                { text: 'Toast 轻提示', link: '/components/feedback/toast' }
              ]
            },
            {
              text: '布局组件',
              link: '/components/layout/',
              items: [
                { text: 'Space 间距', link: '/components/layout/space' },
                { text: 'Grid 网格', link: '/components/layout/grid' },
                { text: 'Container 容器', link: '/components/layout/container' },
                { text: 'Row 行', link: '/components/layout/row' },
                { text: 'Col 列', link: '/components/layout/col' }
              ]
            },
            {
              text: '导航组件',
              link: '/components/navigation/',
              items: [
                { text: 'Tabs 选项卡', link: '/components/navigation/tabs' },
                { text: 'Pagination 分页', link: '/components/navigation/pagination' }
              ]
            }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTheme', link: '/hooks/use-theme' },
            { text: 'usePlatform', link: '/hooks/use-platform' },
            { text: 'useResponsive', link: '/hooks/use-responsive' },
            { text: 'usePerformance', link: '/hooks/use-performance' },
            { text: 'useLocalStorage', link: '/hooks/use-local-storage' }
          ]
        },
        {
          text: '主题定制',
          items: [
            { text: '主题系统', link: '/theme' },
            { text: 'CSS 变量', link: '/guides/css-variables' },
            { text: '自定义主题', link: '/guides/custom-theme' }
          ]
        },
        {
          text: '性能优化',
          items: [
            { text: '性能指南', link: '/performance' },
            { text: '按需加载', link: '/guides/tree-shaking' },
            { text: '性能监控', link: '/guides/performance-monitoring' }
          ]
        },
        {
          text: '最佳实践',
          items: [
            { text: '最佳实践指南', link: '/guides/best-practices' },
            { text: '无障碍访问', link: '/guides/accessibility' },
            { text: '测试指南', link: '/guides/testing' }
          ]
        },
        {
          text: '开发指南',
          items: [
            { text: '贡献指南', link: '/contributing' },
            { text: '开发环境', link: '/guides/development' },
            { text: '发布流程', link: '/guides/release' },
            { text: '故障排除', link: '/troubleshooting' }
          ]
        },
        {
          text: '参考',
          items: [
            { text: '更新日志', link: '/changelog' },
            { text: '版本兼容性', link: '/guides/version-compatibility' },
            { text: '类型安全', link: '/type-safety-guide' },
            { text: '常见问题', link: '/faq' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/taro-uno/ui' },
      { icon: 'twitter', link: 'https://twitter.com/taro_uno' },
      { icon: 'discord', link: 'https://discord.gg/taro-uno' }
    ],

    // 页脚配置
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2024-present Agions Team'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/taro-uno/ui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 搜索配置
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'taro-uno'
    },

    // 返回顶部按钮
    backToTop: true,

    // 外部链接图标
    externalLinkIcon: true
  },

  // 插件配置
  markdown: {
    // 数学公式支持
    math: true,
    // 图表支持
    mermaid: true,
    // 代码高亮
    highlight: {
      theme: 'github-dark'
    },
    // 行号
    lineNumbers: true,
    // 代码组
    codeGroups: true,
    // 支持的头部级别
    headers: {
      level: [2, 3]
    }
  },

  // 构建配置
  build: {
    // 构建时的元数据
    meta: {
      title: 'Taro-Uno UI',
      description: '现代化的多端 UI 组件库',
      author: 'Agions Team',
      keywords: 'Taro,UI,组件库,多端,React,TypeScript'
    },
    // Sitemap
    sitemap: {
      hostname: 'https://taro-uno.com'
    },
    // PWA
    pwa: {
      manifest: {
        name: 'Taro-Uno UI',
        short_name: 'Taro-Uno',
        description: '现代化的多端 UI 组件库',
        theme_color: '#1890ff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }
  },

  // 插件
  plugins: [
    // 中文搜索
    zhSearch({
      placeholder: '搜索文档...',
      button: '搜索',
      buttonText: '搜索',
      enableSuggestions: true,
      suggestionsMaxItems: 7,
      highlightMaxHits: 10,
      miniSearch: {
        options: {
          tokenize: (text: string) => text.split(/[\s\u4e00-\u9fa5]+/),
          processTerm: (term: string) => term.toLowerCase()
        }
      }
    }),
    // Git 信息
    git({
      commits: true,
      branches: true,
      contributors: true
    })
  ],

  // Vue 配置
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.includes('-')
      }
    }
  }
})