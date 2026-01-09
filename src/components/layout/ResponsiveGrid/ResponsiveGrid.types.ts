/**
 * ResponsiveGrid 组件类型定义
 */

import type { ReactNode } from 'react';
import type { ResponsiveValue } from '../../../utils/responsiveUtils';

export interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string | number>;
  rowGap?: ResponsiveValue<string | number>;
  columnGap?: ResponsiveValue<string | number>;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

export interface ResponsiveGridItemProps {
  children: ReactNode;
  className?: string;
  span?: ResponsiveValue<number>;
  offset?: ResponsiveValue<number>;
  order?: ResponsiveValue<number>;
  align?: 'start' | 'center' | 'end' | 'stretch';
}
