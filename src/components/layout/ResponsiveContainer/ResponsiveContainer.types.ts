/**
 * ResponsiveContainer 组件类型定义
 */

import type { ReactNode } from 'react';
import type { ResponsiveStyle, ResponsiveValue } from '../../../utils/responsiveUtils';

export interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  style?: ResponsiveStyle;
  padding?: ResponsiveValue<string | number>;
  margin?: ResponsiveValue<string | number>;
  maxWidth?: ResponsiveValue<string | number>;
  backgroundColor?: ResponsiveValue<string>;
  borderRadius?: ResponsiveValue<string | number>;
  safeArea?: boolean;
}
