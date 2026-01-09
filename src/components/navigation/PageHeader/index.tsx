/**
 * Taro-Uno PageHeader Component
 * 页面头部组件统一导出文件
 */

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
} from './PageHeader.types';
export { BaseStyles, getThemeStyle, getLayoutStyle, getSizeStyle, mergeStyles } from './PageHeader.styles';

import { PageHeader } from './PageHeader';
export default PageHeader;
