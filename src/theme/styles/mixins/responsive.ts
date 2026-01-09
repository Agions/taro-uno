/**
 * 响应式混入模块
 * 提供响应式断点和媒体查询相关的工具
 * @module theme/styles/mixins/responsive
 */

import type { StyleObject } from '../../../types/style';
import type { Breakpoint } from '../../../types/common';

/**
 * 默认断点值（像素）
 */
export const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

/**
 * 断点媒体查询字符串
 */
export const mediaQueries: Record<Breakpoint, string> = {
  xs: '@media (min-width: 0px)',
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',
  xxl: '@media (min-width: 1536px)',
};

/**
 * 最大宽度媒体查询字符串
 */
export const maxMediaQueries: Record<Breakpoint, string> = {
  xs: '@media (max-width: 639px)',
  sm: '@media (max-width: 767px)',
  md: '@media (max-width: 1023px)',
  lg: '@media (max-width: 1279px)',
  xl: '@media (max-width: 1535px)',
  xxl: '@media (max-width: 9999px)',
};

/**
 * 容器最大宽度
 */
export const containerMaxWidths: Record<Breakpoint, string> = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

/**
 * 响应式容器样式
 */
export const container: StyleObject = {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '16px',
  paddingRight: '16px',
};

/**
 * 小屏容器样式
 */
export const containerSm: StyleObject = {
  ...container,
  maxWidth: containerMaxWidths.sm,
};

/**
 * 中屏容器样式
 */
export const containerMd: StyleObject = {
  ...container,
  maxWidth: containerMaxWidths.md,
};

/**
 * 大屏容器样式
 */
export const containerLg: StyleObject = {
  ...container,
  maxWidth: containerMaxWidths.lg,
};

/**
 * 超大屏容器样式
 */
export const containerXl: StyleObject = {
  ...container,
  maxWidth: containerMaxWidths.xl,
};

/**
 * 2倍超大屏容器样式
 */
export const container2xl: StyleObject = {
  ...container,
  maxWidth: containerMaxWidths.xxl,
};

/**
 * 流式容器样式
 */
export const containerFluid: StyleObject = {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '16px',
  paddingRight: '16px',
};

/**
 * 检查当前视口是否匹配断点
 * @param breakpoint - 断点名称
 * @param width - 当前视口宽度
 * @returns 是否匹配
 */
export function matchBreakpoint(breakpoint: Breakpoint, width: number): boolean {
  return width >= breakpoints[breakpoint];
}

/**
 * 获取当前断点
 * @param width - 当前视口宽度
 * @returns 当前断点名称
 */
export function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * 根据断点获取响应式值
 * @param values - 断点值映射
 * @param currentBreakpoint - 当前断点
 * @returns 对应的值
 */
export function getResponsiveValue<T>(
  values: Partial<Record<Breakpoint, T>>,
  currentBreakpoint: Breakpoint,
): T | undefined {
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // 从当前断点向下查找最近的定义值
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp && values[bp] !== undefined) {
      return values[bp];
    }
  }

  return undefined;
}

/**
 * 创建响应式样式对象
 * @param styles - 断点样式映射
 * @returns 合并后的样式对象（用于 CSS-in-JS）
 */
export function createResponsiveStyles(
  styles: Partial<Record<Breakpoint, StyleObject>>,
): Record<string, StyleObject> {
  const result: Record<string, StyleObject> = {};

  (Object.keys(styles) as Breakpoint[]).forEach((breakpoint) => {
    const style = styles[breakpoint];
    if (style) {
      result[mediaQueries[breakpoint]] = style;
    }
  });

  return result;
}

/**
 * 隐藏在特定断点以下
 */
export const hiddenXs: StyleObject = { display: 'none' };
export const hiddenSm: StyleObject = { display: 'none' };
export const hiddenMd: StyleObject = { display: 'none' };
export const hiddenLg: StyleObject = { display: 'none' };
export const hiddenXl: StyleObject = { display: 'none' };

/**
 * 显示在特定断点以上
 */
export const visibleSm: StyleObject = { display: 'block' };
export const visibleMd: StyleObject = { display: 'block' };
export const visibleLg: StyleObject = { display: 'block' };
export const visibleXl: StyleObject = { display: 'block' };

/**
 * 仅在特定断点显示
 */
export const onlyXs: StyleObject = { display: 'block' };
export const onlySm: StyleObject = { display: 'block' };
export const onlyMd: StyleObject = { display: 'block' };
export const onlyLg: StyleObject = { display: 'block' };
export const onlyXl: StyleObject = { display: 'block' };

/**
 * 响应式样式集合
 */
export const responsiveStyles = {
  /** 断点值 */
  breakpoints,
  /** 媒体查询 */
  mediaQueries,
  /** 最大宽度媒体查询 */
  maxMediaQueries,
  /** 容器最大宽度 */
  containerMaxWidths,
  /** 容器样式 */
  container: {
    default: container,
    sm: containerSm,
    md: containerMd,
    lg: containerLg,
    xl: containerXl,
    xxl: container2xl,
    fluid: containerFluid,
  },
  /** 隐藏样式 */
  hidden: {
    xs: hiddenXs,
    sm: hiddenSm,
    md: hiddenMd,
    lg: hiddenLg,
    xl: hiddenXl,
  },
  /** 显示样式 */
  visible: {
    sm: visibleSm,
    md: visibleMd,
    lg: visibleLg,
    xl: visibleXl,
  },
  /** 仅显示样式 */
  only: {
    xs: onlyXs,
    sm: onlySm,
    md: onlyMd,
    lg: onlyLg,
    xl: onlyXl,
  },
  /** 工具函数 */
  utils: {
    matchBreakpoint,
    getCurrentBreakpoint,
    getResponsiveValue,
    createResponsiveStyles,
  },
} as const;

export default responsiveStyles;
