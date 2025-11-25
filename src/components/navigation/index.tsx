// 导出导航组件
export * from './Menu';
export * from './Tabs';
export * from './Pagination';
export * from './Steps';
export * from './NavBar';


// 导出类型
export type { TabsProps, TabsRef, TabPosition, TabType, TabSize, TabItem, TabPaneProps } from './Tabs/Tabs.types';

export type {
  PaginationProps,
  PaginationRef,
  PaginationSize,
  PaginationPosition,
  PaginationAlign,
} from './Pagination/Pagination.types';

export type { MenuProps, MenuRef, MenuItem, MenuMode, MenuTheme } from './Menu/Menu.types';

export type { StepsProps, StepsRef, StepProps, StepStatus, StepDirection } from './Steps/Steps.types';
export type { NavBarProps, NavBarRef, NavBarPosition, NavBarTheme } from './NavBar/NavBar.types';

// 导出样式
export { tabsStyles } from './Tabs/Tabs.styles';
export { paginationStyles } from './Pagination/Pagination.styles';
export { menuStyles } from './Menu/Menu.styles';
export { stepsStyles } from './Steps/Steps.styles';
export { navBarStyles } from './NavBar/NavBar.styles';

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
