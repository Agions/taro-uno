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

// 导出工具函数和类型
export type { BasicComponents, BasicComponentProps, BasicComponentRef } from './basic';

// 组件库版本
export const VERSION = '1.0.0';

// 组件库配置
export const CONFIG = {
  version: VERSION,
  theme: 'light',
  platform: 'taro',
  components: {
    basic: ['Button', 'Icon', 'Text', 'Divider'],
    display: ['Avatar', 'Badge', 'Calendar', 'Card', 'List', 'Progress', 'Tag', 'Timeline'],
    feedback: ['Loading', 'Message', 'Modal', 'Toast'],
    form: ['Form', 'Input', 'Select', 'Checkbox', 'Radio'],
    layout: ['Space', 'Grid', 'Container', 'Row', 'Col'],
    navigation: ['Tabs', 'Pagination'],
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

// 默认导出
export default {
  // 基础组件
  Button: require('./basic').Button,
  Icon: require('./basic').Icon,
  Text: require('./basic').Text,
  Divider: require('./basic').Divider,

  // 工具函数
  Utils: ComponentLibraryUtils,

  // 配置
  CONFIG,
  VERSION,
};
