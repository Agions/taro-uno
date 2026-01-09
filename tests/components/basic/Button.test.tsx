/**
 * Button Component Test
 * 按钮组件测试
 * @module tests/components/basic/Button
 *
 * Requirements: 16.8
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../../../src/components/basic/Button';
import { describe, test, expect, vi } from 'vitest';
import { ThemeContext } from '../../../src/hooks/ui/useTheme';
import { defaultTheme } from '../../../src/theme/defaults';
import type { ThemeContextType } from '../../../src/hooks/ui/useTheme';

/**
 * 创建测试用的主题上下文值
 */
const createMockThemeContext = (): ThemeContextType => ({
  theme: defaultTheme,
  themeMode: 'light',
  isDark: false,
  isSystemDark: false,
  setThemeMode: vi.fn(),
  toggleTheme: vi.fn(),
  setCustomTheme: vi.fn(),
  resetTheme: vi.fn(),
  exportTheme: () => JSON.stringify({ mode: 'light', custom: null }),
  importTheme: () => false,
  getThemeValue: <T,>(path: string): T | undefined => {
    const keys = path.split('.');
    let value: unknown = defaultTheme;
    for (const key of keys) {
      value = (value as Record<string, unknown>)?.[key];
    }
    return value as T | undefined;
  },
  generateThemeCSS: () => '',
});

/**
 * 测试包装器，提供主题上下文
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={createMockThemeContext()}>
    {children}
  </ThemeContext.Provider>
);

/**
 * 自定义 render 函数，自动包装主题上下文
 */
const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe('Button Component', () => {
  // ==================== 基础渲染测试 ====================

  describe('Basic Rendering', () => {
    test('renders button with text', () => {
      renderWithTheme(<Button>测试按钮</Button>);
      const button = screen.getByText('测试按钮');
      expect(button).toBeInTheDocument();
    });

    test('renders with data-testid', () => {
      renderWithTheme(<Button>测试</Button>);
      const button = screen.getByTestId('button');
      expect(button).toBeInTheDocument();
    });

    test('renders with custom className', () => {
      const { container } = renderWithTheme(<Button className="custom-class">按钮</Button>);
      const button = container.firstChild;
      expect(button).toHaveClass('custom-class');
    });
  });

  // ==================== 点击事件测试 ====================

  describe('Click Events', () => {
    test('handles click event', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick}>点击测试</Button>);
      const button = screen.getByText('点击测试');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not trigger click when disabled', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick} disabled>禁用按钮</Button>);
      const button = screen.getByText('禁用按钮');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('does not trigger click when loading', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick} loading>加载中</Button>);
      // 加载状态下显示"加载中..."文本
      const button = screen.getByTestId('button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ==================== 尺寸变体测试 ====================

  describe('Size Variants', () => {
    test('renders small size button', () => {
      const { container } = renderWithTheme(<Button size="sm">小按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders medium size button (default)', () => {
      const { container } = renderWithTheme(<Button size="md">中按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders large size button', () => {
      const { container } = renderWithTheme(<Button size="lg">大按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders with default size when not specified', () => {
      const { container } = renderWithTheme(<Button>默认尺寸</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 类型变体测试 ====================

  describe('Type Variants', () => {
    test('renders default type button', () => {
      const { container } = renderWithTheme(<Button type="default">默认按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders primary type button', () => {
      const { container } = renderWithTheme(<Button type="primary">主要按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders success type button', () => {
      const { container } = renderWithTheme(<Button type="success">成功按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders warning type button', () => {
      const { container } = renderWithTheme(<Button type="warning">警告按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders danger type button', () => {
      const { container } = renderWithTheme(<Button type="danger">危险按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 样式变体测试 ====================

  describe('Style Variants', () => {
    test('renders solid variant button', () => {
      const { container } = renderWithTheme(<Button variant="solid">实心按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders outline variant button', () => {
      const { container } = renderWithTheme(<Button variant="outline">轮廓按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders ghost variant button', () => {
      const { container } = renderWithTheme(<Button variant="ghost">幽灵按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders text variant button', () => {
      const { container } = renderWithTheme(<Button variant="text">文本按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 形状变体测试 ====================

  describe('Shape Variants', () => {
    test('renders default shape button', () => {
      const { container } = renderWithTheme(<Button shape="default">默认形状</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders round shape button', () => {
      const { container } = renderWithTheme(<Button shape="round">圆角按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders circle shape button', () => {
      const { container } = renderWithTheme(<Button shape="circle">圆</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 状态测试 ====================

  describe('States', () => {
    test('renders disabled button', () => {
      const { container } = renderWithTheme(<Button disabled>禁用按钮</Button>);
      const button = container.firstChild;
      expect(button).toHaveAttribute('disabled');
    });

    test('renders loading button', () => {
      renderWithTheme(<Button loading>加载按钮</Button>);
      // 加载状态下应该显示加载文本
      const loadingText = screen.getByText('加载中...');
      expect(loadingText).toBeInTheDocument();
    });

    test('loading button is disabled', () => {
      const { container } = renderWithTheme(<Button loading>加载按钮</Button>);
      const button = container.firstChild;
      expect(button).toHaveAttribute('disabled');
    });
  });

  // ==================== 块级按钮测试 ====================

  describe('Block Button', () => {
    test('renders block button', () => {
      const { container } = renderWithTheme(<Button block>块级按钮</Button>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ==================== 图标测试 ====================

  describe('Icon Support', () => {
    test('renders button with icon on left', () => {
      const icon = <span data-testid="icon">+</span>;
      renderWithTheme(<Button icon={icon} iconPosition="left">添加</Button>);
      const iconElement = screen.getByTestId('icon');
      expect(iconElement).toBeInTheDocument();
    });

    test('renders button with icon on right', () => {
      const icon = <span data-testid="icon">→</span>;
      renderWithTheme(<Button icon={icon} iconPosition="right">下一步</Button>);
      const iconElement = screen.getByTestId('icon');
      expect(iconElement).toBeInTheDocument();
    });
  });

  // ==================== 无障碍测试 ====================

  describe('Accessibility', () => {
    test('renders with accessibility label', () => {
      renderWithTheme(<Button accessibilityLabel="提交表单">提交</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('aria-label', '提交表单');
    });

    test('renders with accessibility role', () => {
      renderWithTheme(<Button accessibilityRole="button">按钮</Button>);
      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('aria-role', 'button');
    });
  });

  // ==================== 组合测试 ====================

  describe('Combined Props', () => {
    test('renders with multiple props', () => {
      const handleClick = vi.fn();
      const { container } = renderWithTheme(
        <Button
          type="primary"
          size="lg"
          variant="solid"
          shape="round"
          onClick={handleClick}
          className="custom-btn"
        >
          组合按钮
        </Button>,
      );

      const button = container.firstChild;
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('custom-btn');

      fireEvent.click(button as Element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
