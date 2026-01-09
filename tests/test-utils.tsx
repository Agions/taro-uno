/**
 * 测试工具函数
 * 提供带有必要 Provider 的 render 函数
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SecurityProvider } from '../src/providers/SecurityProvider';
import { ThemeProvider } from '../src/providers/ThemeProvider';

// 所有 Provider 的包装器
const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <SecurityProvider>{children}</SecurityProvider>
    </ThemeProvider>
  );
};

// 自定义 render 函数
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

// 重新导出所有 testing-library 的内容
export * from '@testing-library/react';

// 覆盖 render 方法
export { customRender as render };
