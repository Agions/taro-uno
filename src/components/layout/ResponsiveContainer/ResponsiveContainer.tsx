/**
 * 响应式容器组件
 * 提供多平台适配的响应式布局容器，使用responsiveUtils工具
 */

import React, { ReactNode } from 'react';
import { View } from '@tarojs/components';
import { useResponsive } from '../../../utils/responsiveUtils';
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
  safeArea?: boolean; // 是否适配安全区域
}

/**
 * 响应式容器组件
 * 根据屏幕尺寸和平台自动调整布局
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  style = {},
  padding = { xs: '8px', sm: '16px', md: '24px' },
  margin = { xs: 0, sm: 'auto' },
  maxWidth = { xs: '100%', sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
  backgroundColor = 'transparent',
  borderRadius = { xs: 0, sm: '8px' },
  safeArea = false,
}) => {
  const {
    windowHeight,
    generateResponsiveStyles,
    getResponsiveValue,
    safeArea: safeAreaInfo,
    platform,
  } = useResponsive();

  // 生成响应式样式
  const responsiveStyles = generateResponsiveStyles({
    padding,
    margin,
    maxWidth,
    backgroundColor,
    borderRadius,
    ...style,
  });

  // 处理安全区域
  const safeAreaStyle = safeArea
    ? {
        paddingTop: (getResponsiveValue(padding) as number) + safeAreaInfo.top,
        paddingBottom: (getResponsiveValue(padding) as number) + safeAreaInfo.bottom,
        paddingLeft: (getResponsiveValue(padding) as number) + safeAreaInfo.left,
        paddingRight: (getResponsiveValue(padding) as number) + safeAreaInfo.right,
      }
    : {};

  // 合并所有样式
  const containerStyle = {
    ...responsiveStyles,
    ...safeAreaStyle,
    boxSizing: 'border-box' as const,
    width: '100%',
  };

  // 平台特定的样式调整
  const platformSpecificStyle =
    platform === 'weapp'
      ? { minHeight: windowHeight } // 小程序环境确保容器高度至少为屏幕高度
      : {};

  return (
    <View
      className={`responsive-container ${className}`}
      style={{
        ...containerStyle,
        ...platformSpecificStyle,
      }}
    >
      {children}
    </View>
  );
};

export default ResponsiveContainer;
