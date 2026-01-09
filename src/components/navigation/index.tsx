/**
 * Taro-Uno 导航组件库
 * 提供用于页面导航的 UI 组件，包括菜单、标签页、分页、步骤条等
 */

// 导出 Menu 组件
export { Menu } from './Menu';
export type { MenuProps, MenuRef, MenuItem, MenuMode, MenuTheme } from './Menu/Menu.types';
export { menuStyles } from './Menu/Menu.styles';

// 导出 Tabs 组件
export { Tabs } from './Tabs';
export type { TabsProps, TabsRef, TabPosition, TabType, TabSize, TabItem, TabPaneProps } from './Tabs/Tabs.types';
export { tabsStyles } from './Tabs/Tabs.styles';

// 导出 Pagination 组件
export { Pagination } from './Pagination';
export type {
  PaginationProps,
  PaginationRef,
  PaginationSize,
  PaginationPosition,
  PaginationAlign,
} from './Pagination/Pagination.types';
export { paginationStyles } from './Pagination/Pagination.styles';

// 导出 Steps 组件
export { Steps } from './Steps';
export type { StepsProps, StepsRef, StepProps, StepStatus, StepDirection } from './Steps/Steps.types';
export { stepsStyles } from './Steps/Steps.styles';

// 导出 NavBar 组件
export { NavBar } from './NavBar';
export type { NavBarProps, NavBarRef, NavBarPosition, NavBarTheme } from './NavBar/NavBar.types';
export { navBarStyles } from './NavBar/NavBar.styles';

// 导出 PageHeader 组件
export { PageHeader } from './PageHeader';
export type {
  PageHeaderProps,
  PageHeaderRef,
  PageHeaderAction,
  PageHeaderBackConfig,
  PageHeaderBreadcrumbConfig,
  PageHeaderConfig,
  PageHeaderTheme,
  PageHeaderLayout,
  PageHeaderSize,
} from './PageHeader/PageHeader.types';
export {
  BaseStyles as pageHeaderStyles,
  getThemeStyle as getPageHeaderThemeStyle,
  getLayoutStyle as getPageHeaderLayoutStyle,
  getSizeStyle as getPageHeaderSizeStyle,
  mergeStyles as mergePageHeaderStyles,
} from './PageHeader/PageHeader.styles';

// 导航组件工具函数
export const NavigationUtils = {
  /**
   * 计算分页信息
   */
  calculatePagination: (total: number, pageSize: number, current: number) => {
    const totalPages = Math.ceil(total / pageSize);
    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);

    return {
      totalPages,
      start,
      end,
      hasNext: current < totalPages,
      hasPrev: current > 1,
    };
  },

  /**
   * 生成页码数组
   */
  generatePageNumbers: (current: number, totalPages: number, showCount = 7) => {
    const pages: number[] = [];

    if (totalPages <= showCount) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(showCount / 2);
      let start = current - half;
      let end = current + half;

      if (start < 1) {
        start = 1;
        end = showCount;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - showCount + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  },
};
