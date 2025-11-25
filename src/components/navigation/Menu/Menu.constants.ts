import { MenuUtils } from './Menu.utils';
import type { MenuItem } from './Menu.types';

// 菜单组件版本
export const MENU_VERSION = '1.0.0';

// 菜单组件配置
export const MENU_CONFIG = {
  version: MENU_VERSION,
  platform: 'taro',
  features: {
    multiple: true,
    accordion: true,
    collapsible: true,
    contextMenu: true,
    accessibility: true,
    theme: true,
    responsive: true,
    typescript: true,
  },
};

// 菜单组件工具函数
export const MenuLibraryUtils = {
  /**
   * 获取菜单组件版本
   */
  getVersion: (): string => MENU_VERSION,

  /**
   * 获取菜单组件配置
   */
  getConfig: () => MENU_CONFIG,

  /**
   * 格式化菜单数据
   */
  formatMenuData: (data: any[]) => {
    return MenuUtils.formatMenuData(data);
  },

  /**
   * 查找菜单项
   */
  findMenuItem: (items: MenuItem[], key: string) => {
    return MenuUtils.findItem(items, key);
  },

  /**
   * 获取菜单项路径
   */
  getMenuItemPath: (items: MenuItem[], key: string) => {
    return MenuUtils.getItemPath(items, key);
  },

  /**
   * 展开菜单项的所有父级
   */
  expandParentKeys: (items: MenuItem[], key: string) => {
    return MenuUtils.expandParents(items, key);
  },

  /**
   * 验证菜单项
   */
  validateMenuItem: (item: MenuItem) => {
    return MenuUtils.validateItem(item);
  },
};
