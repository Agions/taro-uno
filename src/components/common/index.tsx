/**
 * Taro-Uno 通用组件库
 * 提供通用的功能组件，如错误边界、懒加载、响应式容器等
 */

// 导出组件
export * from './ErrorBoundary';
export * from './LazyComponent';
export * from './ResponsiveContainer';
export * from './ResponsiveGrid';
export * from './SecurityProvider';
export * from './ThemeProvider';
export * from './VirtualList';

// 通用组件工具函数
export const CommonComponentsUtils = {
  /**
   * 检查组件是否为通用组件
   */
  isCommonComponent: (componentName: string): boolean => {
    const commonComponents = [
      'ErrorBoundary',
      'LazyComponent',
      'ResponsiveContainer',
      'ResponsiveGrid',
      'SecurityProvider',
      'ThemeProvider',
      'VirtualList',
    ];
    return commonComponents.includes(componentName);
  },
};
