/**
 * Taro-Uno Menu Component
 * 导航菜单组件统一导出文件
 */

// 导入工具类和类型
import { menuStyles as menuStylesExport } from './Menu.styles';
import { MENU_VERSION, MENU_CONFIG, MenuLibraryUtils } from './Menu.constants';

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

// 导出常量和工具库
export { MENU_VERSION, MENU_CONFIG, MenuLibraryUtils } from './Menu.constants';

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
