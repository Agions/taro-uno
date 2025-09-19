/**
 * Test Helper Utilities
 * 提供通用的测试辅助函数和mock配置
 */

import { vi } from 'vitest';
import { render } from '@testing-library/react';

// 通用mock配置
export const createMockCallbacks = () => ({
  onClick: vi.fn(),
  onChange: vi.fn(),
  onFocus: vi.fn(),
  onBlur: vi.fn(),
  onSubmit: vi.fn(),
  onCancel: vi.fn(),
  onConfirm: vi.fn(),
  onClose: vi.fn(),
  onOpen: vi.fn(),
});

// 创建主题mock
export const createMockTheme = (overrides: any = {}) => ({
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    info: '#1890ff',
    text: '#000000',
    textSecondary: '#666666',
    textDisabled: '#999999',
    background: '#ffffff',
    backgroundCard: '#ffffff',
    border: '#d9d9d9',
    ...(overrides.colors || {}),
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    ...(overrides.spacing || {}),
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    ...(overrides.borderRadius || {}),
  },
  ...overrides,
});

// 创建平台检测mock
export const createMockPlatform = (platform = 'h5') => ({
  getPlatform: () => platform,
  isH5: () => platform === 'h5',
  isWeapp: () => platform === 'weapp',
  isRN: () => platform === 'rn',
  getPlatformInfo: () => ({
    platform,
    isMiniProgram: platform !== 'h5',
    isH5: platform === 'h5',
    isRN: platform === 'rn',
    system: { platform },
  }),
});

// 无障碍测试工具
export const accessibilityTestUtils = {
  // 检查元素是否有指定的ARIA属性
  hasAriaAttribute: (element: HTMLElement, attribute: string, value?: string) => {
    if (value) {
      return element.getAttribute(`aria-${attribute}`) === value;
    }
    return element.hasAttribute(`aria-${attribute}`);
  },

  // 检查元素是否有正确的角色
  hasRole: (element: HTMLElement, role: string) => {
    return element.getAttribute('role') === role;
  },

  // 检查元素是否可访问
  isAccessible: (element: HTMLElement) => {
    return !element.hasAttribute('aria-hidden') &&
           !element.hasAttribute('disabled') &&
           element.getAttribute('tabindex') !== '-1';
  },
};

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
};

// 异步测试工具
export const asyncTestUtils = {
  // 等待指定时间
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // 等待元素出现
  waitForElement: async (callback: () => HTMLElement | null, timeout = 1000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const checkElement = () => {
        const element = callback();
        if (element) {
          resolve(element);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Element not found within timeout'));
        } else {
          setTimeout(checkElement, 50);
        }
      };
      checkElement();
    });
  },
};

// 渲染工具
export const renderWithTheme = (component: React.ReactElement, _theme = createMockTheme()) => {
  return render(component);
};

// 组件测试数据生成器
export const testDataGenerators = {
  // 生成测试用户数据
  user: (overrides = {}) => ({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg',
    ...overrides,
  }),

  // 生成测试选项数据
  options: (count = 3) => Array.from({ length: count }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1}`,
  })),

  // 生成测试表单数据
  formData: (overrides = {}) => ({
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    ...overrides,
  }),
};

// 导出默认的mock配置
export const defaultMocks = {
  callbacks: createMockCallbacks(),
  theme: createMockTheme(),
  platform: createMockPlatform(),
};