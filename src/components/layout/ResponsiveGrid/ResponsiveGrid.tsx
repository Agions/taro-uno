/**
 * 响应式栅格组件
 * 提供多平台适配的响应式栅格布局系统，使用responsiveUtils工具
 */

import React, { ReactNode } from 'react';
import { View } from '@tarojs/components';
import { useResponsive, ResponsiveValue } from '../../../utils/responsiveUtils';

export interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: ResponsiveValue<number>; // 列数
  gap?: ResponsiveValue<string | number>; // 间距
  rowGap?: ResponsiveValue<string | number>; // 行间距
  columnGap?: ResponsiveValue<string | number>; // 列间距
  align?: 'start' | 'center' | 'end' | 'stretch'; // 对齐方式
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'; // 主轴对齐
  wrap?: boolean; // 是否换行
}

export interface ResponsiveGridItemProps {
  children: ReactNode;
  className?: string;
  span?: ResponsiveValue<number>; // 占据列数
  offset?: ResponsiveValue<number>; // 偏移列数
  order?: ResponsiveValue<number>; // 排序
  align?: 'start' | 'center' | 'end' | 'stretch'; // 对齐方式
}

/**
 * 响应式栅格容器组件
 * 根据屏幕尺寸自动调整列数和间距
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  gap = { xs: '8px', sm: '16px' },
  rowGap,
  columnGap,
  align = 'stretch',
  justify = 'start',
  wrap = true,
}) => {
  const { getResponsiveValue, generateResponsiveStyles, platform } = useResponsive();

  // 获取响应式值
  const currentColumns = getResponsiveValue(columns);
  const currentGap = getResponsiveValue(gap);
  const currentRowGap = rowGap ? getResponsiveValue(rowGap) : currentGap;
  const currentColumnGap = columnGap ? getResponsiveValue(columnGap) : currentGap;

  // 生成栅格样式
  const gridStyle = generateResponsiveStyles({
    display: 'grid',
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    gap: currentGap ?? 0,
    rowGap: currentRowGap ?? 0,
    columnGap: currentColumnGap ?? 0,
    alignItems: align,
    justifyContent: justify,
    gridAutoFlow: wrap ? 'row' : 'column',
  });

  // 平台特定的样式调整
  const platformSpecificStyle =
    platform === 'weapp'
      ? { overflow: 'hidden' } // 小程序环境处理溢出
      : {};

  return (
    <View
      className={`responsive-grid ${className}`}
      style={{
        ...gridStyle,
        ...platformSpecificStyle,
      }}
    >
      {children}
    </View>
  );
};

/**
 * 响应式栅格项组件
 * 根据屏幕尺寸自动调整占据列数
 */
export const ResponsiveGridItem: React.FC<ResponsiveGridItemProps> = ({
  children,
  className = '',
  span = { xs: 1 },
  offset = 0,
  order,
  align = 'stretch',
}) => {
  const { getResponsiveValue, generateResponsiveStyles, platform } = useResponsive();

  // 获取响应式值
  const currentSpan = getResponsiveValue(span);
  const currentOffset = getResponsiveValue(offset);
  const currentOrder = order ? getResponsiveValue(order) : undefined;
  const currentAlign = align;

  // 生成栅格项样式
  const itemStyleObj: Record<string, ResponsiveValue<string | number>> = {
    gridColumn: `span ${currentSpan}`,
    marginLeft: currentOffset ? `calc(${currentOffset} * (100% / var(--grid-columns, 12)))` : 0,
    alignSelf: currentAlign,
  };

  // 只有在有order值时才添加order样式
  if (currentOrder !== undefined) {
    itemStyleObj['order'] = currentOrder;
  }

  const itemStyle = generateResponsiveStyles(itemStyleObj);

  // 平台特定的样式调整
  const platformSpecificStyle =
    platform === 'weapp'
      ? { boxSizing: 'border-box' as const } // 小程序环境确保盒模型正确
      : {};

  return (
    <View
      className={`responsive-grid-item ${className}`}
      style={{
        ...itemStyle,
        ...platformSpecificStyle,
      }}
    >
      {children}
    </View>
  );
};

// 预设栅格布局
export const ResponsiveGridPresets = {
  // 两列布局
  TwoColumns: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns'>) => (
    <ResponsiveGrid columns={{ xs: 1, sm: 2 }} {...props}>
      {children}
    </ResponsiveGrid>
  ),

  // 三列布局
  ThreeColumns: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns'>) => (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3 }} {...props}>
      {children}
    </ResponsiveGrid>
  ),

  // 四列布局
  FourColumns: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns'>) => (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} {...props}>
      {children}
    </ResponsiveGrid>
  ),

  // 卡片布局
  CardLayout: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns' | 'gap'>) => (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={{ xs: '12px', sm: '16px', md: '20px' }} {...props}>
      {children}
    </ResponsiveGrid>
  ),

  // 列表布局
  ListLayout: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns' | 'gap'>) => (
    <ResponsiveGrid columns={{ xs: 1 }} gap={{ xs: '8px', sm: '12px' }} {...props}>
      {children}
    </ResponsiveGrid>
  ),

  // 仪表板布局
  DashboardLayout: ({ children, ...props }: Omit<ResponsiveGridProps, 'columns' | 'gap'>) => (
    <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 4 }} gap={{ xs: '16px', sm: '20px', md: '24px' }} {...props}>
      {children}
    </ResponsiveGrid>
  ),
};

export default ResponsiveGrid;
