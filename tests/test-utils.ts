/**
 * 测试工具库
 * 提供常用的测试辅助函数和工具
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { vi } from 'vitest';

// 自定义渲染函数
export function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): ReturnType<typeof render> {
  return render(ui, {
    ...options,
  });
}

// 重新导出 @testing-library/react 的所有内容
export * from '@testing-library/react';

// 重新导出 vitest 的 Mock 函数
export { vi } from 'vitest';

// 事件模拟工具
export const eventSimulators = {
  // 模拟点击事件
  click: (element: HTMLElement) => {
    element.click();
  },

  // 模拟输入事件
  input: (element: HTMLInputElement, value: string) => {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
  },

  // 模拟焦点事件
  focus: (element: HTMLElement) => {
    element.focus();
  },

  // 模拟失焦事件
  blur: (element: HTMLElement) => {
    element.blur();
  },

  // 模拟键盘事件
  keyDown: (element: HTMLElement, key: string) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key }));
  },

  // 模拟触摸事件
  touchStart: (element: HTMLElement) => {
    element.dispatchEvent(new TouchEvent('touchstart'));
  },

  touchEnd: (element: HTMLElement) => {
    element.dispatchEvent(new TouchEvent('touchend'));
  },
};

// Mock 工具
export const mockUtils = {
  // 创建 Mock 组件
  createMockComponent: (displayName: string) => {
    const MockComponent = () => null;
    MockComponent.displayName = displayName;
    return MockComponent;
  },

  // 创建 Mock Hook
  createMockHook: <T>(returnValue: T) => {
    return vi.fn(() => returnValue);
  },

  // 创建 Mock 模块
  mockModule: (moduleName: string, mockExports: any) => {
    vi.doMock(moduleName, () => mockExports);
  },

  // 模拟异步操作
  simulateAsyncOperation: async <T>(data: T, delay: number = 100): Promise<T> => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return data;
  },
};

// 测试数据生成器
export const testData = {
  // 生成用户数据
  user: (overrides = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg',
    ...overrides,
  }),

  // 生成组件属性
  props: {
    button: (overrides = {}) => ({
      children: 'Click me',
      onClick: vi.fn(),
      ...overrides,
    }),

    input: (overrides = {}) => ({
      placeholder: 'Enter text',
      onChange: vi.fn(),
      ...overrides,
    }),

    card: (overrides = {}) => ({
      title: 'Card Title',
      children: 'Card Content',
      ...overrides,
    }),
  },

  // 生成主题配置
  theme: (overrides = {}) => ({
    colors: {
      primary: '#1890ff',
      secondary: '#52c41a',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
      info: '#1890ff',
      ...(overrides as any).colors,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      ...(overrides as any).spacing,
    },
    ...overrides,
  }),
};

// 等待工具
export const waitFor = {
  // 等待指定时间
  delay: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  // 等待条件满足
  condition: async (condition: () => boolean, timeout: number = 5000, interval: number = 100) => {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (condition()) {
        return true;
      }
      await waitFor.delay(interval);
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  },

  // 等待元素出现
  element: async (selector: string, timeout: number = 5000): Promise<HTMLElement> => {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const element = document.querySelector(selector);
      if (element) {
        return element as HTMLElement;
      }
      await waitFor.delay(100);
    }

    throw new Error(`Element ${selector} not found within ${timeout}ms`);
  },
};

// 性能测试工具
export const performanceUtils = {
  // 测量函数执行时间
  measureTime: async (fn: () => Promise<void> | void) => {
    const start = performance.now();
    await fn();
    const end = performance.now();
    return end - start;
  },

  // 测量渲染时间
  measureRenderTime: async (component: ReactElement) => {
    const start = performance.now();
    const { unmount } = customRender(component);
    const end = performance.now();
    unmount();
    return end - start;
  },
};

// 默认导出
export default {
  customRender,
  eventSimulators,
  mockUtils,
  testData,
  waitFor,
  performanceUtils,
};
