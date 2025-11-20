/**
 * Taro-Uno UI 组件库统一导出文件
 * 提供完整的组件库访问接口
 */

// 导出基础组件
export * from './basic';

// 导出表单组件
export * from './form';

// 导出展示组件
export * from './display';

// 导出反馈组件
export * from './feedback';

// 导出布局组件
export * from './layout';

// 导出导航组件
export * from './navigation';

// 导出通用组件和提供者
export * from './common';

// 组件库版本
export const VERSION = '1.0.0';

// 组件库配置
export const CONFIG = {
  version: VERSION,
  theme: 'light',
  platform: 'taro',
  components: {
    basic: ['Button', 'Icon', 'Text', 'Divider', 'Typography'],
    display: ['Avatar', 'Badge', 'Card', 'List', 'Rate', 'Table', 'Tag', 'Timeline', 'Calendar', 'Carousel'],
    feedback: ['Modal', 'Message', 'Notification', 'Loading', 'Progress', 'Popconfirm', 'Tooltip', 'Drawer', 'Result'],
    form: [
      'Form',
      'Input',
      'Select',
      'DatePicker',
      'Radio',
      'Checkbox',
      'Switch',
      'Rate',
      'Slider',
      'Upload',
      'AutoComplete',
    ],
    layout: ['Grid', 'Layout', 'Space', 'Affix'],
    navigation: ['Menu', 'Tabs', 'Pagination', 'Breadcrumb', 'Steps', 'PageHeader'],
  },
};

// 组件库工具函数
export const ComponentLibraryUtils = {
  /**
   * 获取组件库版本
   */
  getVersion: (): string => VERSION,

  /**
   * 获取组件库配置
   */
  getConfig: () => CONFIG,

  /**
   * 检查组件是否存在
   */
  hasComponent: (componentName: string): boolean => {
    return Object.values(CONFIG.components).flat().includes(componentName);
  },

  /**
   * 获取组件分类
   */
  getComponentCategory: (componentName: string): string | null => {
    for (const [category, components] of Object.entries(CONFIG.components)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return null;
  },

  /**
   * 获取所有组件列表
   */
  getAllComponents: (): string[] => {
    return Object.values(CONFIG.components).flat();
  },

  /**
   * 获取分类组件列表
   */
  getCategoryComponents: (category: string): string[] => {
    return CONFIG.components[category as keyof typeof CONFIG.components] || [];
  },
};


// 同步获取组件（兼容性处理）
let cachedComponents: any = null;
const getComponentsSync = () => {
  if (!cachedComponents) {
    try {
      const basic = require('./basic');
      cachedComponents = {
        Button: basic.Button,
        Icon: basic.Icon,
        Text: basic.Text,
        Divider: basic.Divider,
      };
    } catch (error) {
      console.warn('Failed to load basic components synchronously:', error);
      cachedComponents = {};
    }
  }
  return cachedComponents;
};

// 默认导出
export default {
  // 基础组件
  get Button() {
    return getComponentsSync().Button;
  },
  get Icon() {
    return getComponentsSync().Icon;
  },
  get Text() {
    return getComponentsSync().Text;
  },
  get Divider() {
    return getComponentsSync().Divider;
  },

  // 工具函数
  Utils: ComponentLibraryUtils,

  // 配置
  CONFIG,
  VERSION,
};
