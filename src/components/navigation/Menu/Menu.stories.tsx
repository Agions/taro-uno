import { Menu } from './Menu';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: 'Menu 组件是一个功能强大的导航菜单组件，支持多种模式、主题和交互功能。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
    },
    accordion: {
      control: 'boolean',
    },
    collapsible: {
      control: 'boolean',
    },
    collapsed: {
      control: 'boolean',
    },
  },
};

const menuItems = [
  { key: '1', title: '首页', icon: 'home', path: '/home' },
  {
    key: '2',
    title: '产品',
    icon: 'product',
    children: [
      { key: '2-1', title: '产品列表', path: '/products/list' },
      { key: '2-2', title: '产品详情', path: '/products/detail' },
      { key: '2-3', title: '新增产品', path: '/products/add' },
    ],
  },
  {
    key: '3',
    title: '服务',
    icon: 'service',
    children: [
      { key: '3-1', title: '服务1', path: '/services/1' },
      { key: '3-2', title: '服务2', path: '/services/2' },
    ],
  },
  { key: '4', title: '关于我们', icon: 'about', path: '/about' },
];

export const Basic = {
  args: {
    items: menuItems,
    defaultActiveKey: '1',
    defaultOpenKeys: ['2'],
  },
};

export const Horizontal = {
  args: {
    items: menuItems,
    mode: 'horizontal',
    defaultActiveKey: '1',
  },
};

export const DarkTheme = {
  args: {
    items: menuItems,
    theme: 'dark',
    defaultActiveKey: '1',
    defaultOpenKeys: ['2'],
  },
};

export const Collapsible = {
  args: {
    items: menuItems,
    collapsible: true,
    defaultActiveKey: '1',
    defaultOpenKeys: ['2'],
  },
};

export const Accordion = {
  args: {
    items: menuItems,
    accordion: true,
    defaultActiveKey: '1',
    defaultOpenKeys: ['2'],
  },
};
