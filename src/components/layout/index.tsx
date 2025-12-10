/**
 * Taro-Uno 布局组件库
 * 提供用于页面布局的 UI 组件，包括网格、行列、容器、间距等
 */

// 导出 Grid 组件
export { Grid } from './Grid';
export type { GridProps, GridRef, GridAlign, GridJustify, GridGap, GridCols } from './Grid/Grid.types';
export { gridStyles } from './Grid/Grid.styles';

// 导出 Layout 组件
export { Layout } from './Layout';
export type { LayoutProps, LayoutRef } from './Layout/Layout.types';
export { layoutStyles } from './Layout/Layout.styles';

// 导出 Space 组件
export { Space } from './Space';
export type {
  SpaceProps,
  SpaceRef,
  SpaceDirection,
  SpaceAlign,
  SpaceWrap,
  SpaceSize,
  SpaceGap,
  SpaceSeparator,
} from './Space/Space.types';
export { spaceStyles } from './Space/Space.styles';

// 导出 Affix 组件
export { Affix } from './Affix';
export type { AffixProps, AffixRef, AffixOffset, AffixTarget } from './Affix/Affix.types';
export { affixStyles } from './Affix/Affix.styles';

// 导出 Row 组件
export { Row } from './Row';
export type { RowProps, RowRef, RowAlign, RowJustify, RowGutter } from './Row/Row.types';
export { rowStyles } from './Row/Row.styles';

// 导出 Col 组件
export { Col } from './Col';
export type { ColProps, ColRef, ColSpan, ColOffset, ColOrder } from './Col/Col.types';
export { colStyles } from './Col/Col.styles';

// 导出 Container 组件
export { Container } from './Container';
export type { ContainerProps, ContainerRef, ContainerSize, ContainerAlign } from './Container/Container.types';
export { containerStyles } from './Container/Container.styles';

// 布局组件工具函数
export const LayoutUtils = {
  /**
   * 计算响应式断点
   */
  getBreakpoint: (width: number): string => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    return 'xxl';
  },

  /**
   * 计算网格列数
   */
  calculateGridCols: (containerWidth: number, itemWidth: number): number => {
    return Math.floor(containerWidth / itemWidth);
  },

  /**
   * 计算间距
   */
  calculateSpacing: (size: string | number): string => {
    if (typeof size === 'number') return `${size}px`;
    return size;
  },
};
