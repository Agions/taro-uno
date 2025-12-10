import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // 文档侧边栏
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '项目简介',
    },
    {
      type: 'doc',
      id: 'quickstart',
      label: '快速开始',
    },
    {
      type: 'doc',
      id: 'features',
      label: '核心功能',
    },
    {
      type: 'category',
      label: '开发指南',
      items: [
        'guides/installation',
        'guides/theme-customization',
        'guides/multi-platform',
        'guides/best-practices',
      ],
    },
    {
      type: 'doc',
      id: 'request',
      label: 'Request 请求库',
    },
    {
      type: 'category',
      label: 'Hooks 相关文档',
      items: [
        'hooks/index',
      ],
    },
    {
      type: 'category',
      label: '常用问题解决方案库',
      items: [
        'solutions/index',
      ],
    },
    {
      type: 'category',
      label: '相关解决文档集',
      items: [
        'references/index',
      ],
    },
    {
      type: 'doc',
      id: 'faq',
      label: '常见问题',
    },
    {
      type: 'doc',
      id: 'changelog',
      label: '更新日志',
    },
  ],

  // 组件侧边栏
  componentsSidebar: [
    {
      type: 'category',
      label: '布局组件',
      items: [
        'components/layout/container',
        'components/layout/layout',
        'components/layout/grid',
        'components/layout/row',
        'components/layout/col',
        'components/layout/space',
        'components/layout/affix',
      ],
    },
    {
      type: 'category',
      label: '基础组件',
      items: [
        'components/basic/button',
        'components/basic/icon',
        'components/basic/typography',
        'components/basic/text',
        'components/basic/divider',
        'components/basic/video',
      ],
    },
    {
      type: 'category',
      label: '导航组件',
      items: [
        'components/navigation/navbar',
        'components/navigation/menu',
        'components/navigation/tabs',
        'components/navigation/steps',
        'components/navigation/pagination',
      ],
    },
    {
      type: 'category',
      label: '表单组件',
      items: [
        'components/form/input',
        'components/form/textarea',
        'components/form/switch',
        'components/form/checkbox',
        'components/form/radio',
        'components/form/select',
        'components/form/form',
        'components/form/cascader',
        'components/form/date-picker',
        'components/form/time-picker',
      ],
    },
    {
      type: 'category',
      label: '显示组件',
      items: [
        'components/display/avatar',
        'components/display/badge',
        'components/display/card',
        'components/display/carousel',
        'components/display/list',
        'components/display/table',
        'components/display/tag',
        'components/display/timeline',
        'components/display/rate',
        'components/display/calendar',
      ],
    },
    {
      type: 'category',
      label: '反馈组件',
      items: [
        'components/feedback/loading',
        'components/feedback/message',
        'components/feedback/toast',
        'components/feedback/notification',
        'components/feedback/modal',
        'components/feedback/progress',
        'components/feedback/result',
        'components/feedback/tooltip',
      ],
    },
  ],
};

export default sidebars;