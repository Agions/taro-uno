// 导出布局组件
export * from './Grid';
export * from './Layout';
export * from './Space';
export * from './Affix';
export * from './Row';
export * from './Col';
export * from './Container';

// 导出类型
export type { GridProps, GridRef, GridAlign, GridJustify, GridGap, GridCols } from './Grid/Grid.types';

export type { ContainerProps, ContainerRef, ContainerSize, ContainerAlign } from './Container/Container.types';

export type { RowProps, RowRef, RowAlign, RowJustify, RowGutter } from './Row/Row.types';

export type { ColProps, ColRef, ColSpan, ColOffset, ColOrder } from './Col/Col.types';

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

export type { AffixProps, AffixRef, AffixOffset, AffixTarget } from './Affix/Affix.types';

// 导出样式
export { gridStyles } from './Grid/Grid.styles';
export { containerStyles } from './Container/Container.styles';
export { rowStyles } from './Row/Row.styles';
export { colStyles } from './Col/Col.styles';
export { spaceStyles } from './Space/Space.styles';
export { affixStyles } from './Affix/Affix.styles';

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
