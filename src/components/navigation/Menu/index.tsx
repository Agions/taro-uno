/**
 * Taro-Uno Menu Component
 * 导航菜单组件统一导出文件
 */

// 导入工具类和类型
import { MenuUtils } from './Menu.utils';
import type { MenuItem } from './Menu.types';
import { menuStyles as menuStylesExport } from './Menu.styles';

// 导出菜单组件
export { Menu } from './Menu';

// 导出子组件
export { MenuItemComponent } from './MenuItem';
export { SubMenuComponent } from './SubMenu';

// 导出工具类
export { MenuUtils } from './Menu.utils';

// 导出类型定义
export type {
  MenuProps,
  MenuRef,
  MenuItem,
  MenuMode,
  MenuTheme,
  MenuSize,
  MenuTrigger,
  MenuConfig,
  MenuItemStyles,
  MenuSizeStyles,
  MenuThemeStyles,
  MenuModeStyles,
} from './Menu.types';

// 导出样式
export { menuStyles } from './Menu.styles';

// 导出默认配置
export { DEFAULT_MENU_CONFIG } from './Menu.types';

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

// 默认导出
export default {
  // 组件
  Menu: () => null, // Placeholder

  // 工具函数
  Utils: MenuLibraryUtils,

  // 样式
  Styles: menuStylesExport,

  // 配置
  CONFIG: MENU_CONFIG,
  VERSION: MENU_VERSION,
};