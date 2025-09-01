/**
 * Taro-Uno Switch Component Test
 * 开关组件测试
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Switch } from './Switch';
import type { SwitchProps } from './Switch.types';

// Mock Taro components
jest.mock('@tarojs/components', () => ({
  View: 'View',
  Text: 'Text',
}));

// Mock PlatformDetector
jest.mock('@/utils', () => ({
  PlatformDetector: {
    getPlatform: () => 'h5',
  },
}));

describe('Switch Component', () => {
  const defaultProps: SwitchProps = {
    accessibilityLabel: 'Test Switch',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('基础渲染', () => {
    it('应该正确渲染开关组件', () => {
      render(<Switch {...defaultProps} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('应该使用默认值', () => {
      render(<Switch {...defaultProps} defaultValue={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('应该支持受控模式', () => {
      const handleChange = jest.fn();
      render(<Switch {...defaultProps} value={true} onChange={handleChange} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('应该支持不同尺寸', () => {
      render(<Switch {...defaultProps} size="lg" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('taro-uno-switch--lg');
    });

    it('应该支持不同颜色', () => {
      render(<Switch {...defaultProps} color="success" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('taro-uno-switch--success');
    });
  });

  describe('交互功能', () => {
    it('应该正确处理点击事件', () => {
      const handleChange = jest.fn();
      render(<Switch {...defaultProps} onChange={handleChange} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('应该在禁用状态下不响应点击', () => {
      const handleChange = jest.fn();
      render(<Switch {...defaultProps} disabled={true} onChange={handleChange} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('应该在只读状态下不响应点击', () => {
      const handleChange = jest.fn();
      render(<Switch {...defaultProps} readonly={true} onChange={handleChange} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('应该在加载状态下不响应点击', () => {
      const handleChange = jest.fn();
      render(<Switch {...defaultProps} loading={true} onChange={handleChange} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('应该正确处理聚焦事件', () => {
      const handleFocus = jest.fn();
      render(<Switch {...defaultProps} onFocus={handleFocus} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.focus(switchElement);
      
      expect(handleFocus).toHaveBeenCalledWith(expect.any(Object));
    });

    it('应该正确处理失焦事件', () => {
      const handleBlur = jest.fn();
      render(<Switch {...defaultProps} onBlur={handleBlur} />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.blur(switchElement);
      
      expect(handleBlur).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('状态管理', () => {
    it('应该正确显示选中状态', () => {
      render(<Switch {...defaultProps} value={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('应该正确显示未选中状态', () => {
      render(<Switch {...defaultProps} value={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('应该正确显示禁用状态', () => {
      render(<Switch {...defaultProps} disabled={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-disabled', 'true');
    });

    it('应该正确显示加载状态', () => {
      render(<Switch {...defaultProps} loading={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('taro-uno-switch--loading');
    });
  });

  describe('验证功能', () => {
    it('应该支持必填验证', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }];
      render(<Switch {...defaultProps} rules={rules} validateTrigger="onChange" />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      await waitFor(() => {
        expect(screen.getByText('此字段为必填项')).toBeInTheDocument();
      });
    });

    it('应该支持自定义验证函数', async () => {
      const validator = jest.fn().mockReturnValue(false);
      const rules = [{ validator, message: '验证失败' }];
      render(<Switch {...defaultProps} rules={rules} validateTrigger="onChange" />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      await waitFor(() => {
        expect(screen.getByText('验证失败')).toBeInTheDocument();
      });
    });

    it('应该支持异步验证', async () => {
      const asyncValidator = jest.fn().mockResolvedValue(false);
      const rules = [{ asyncValidator, message: '异步验证失败' }];
      render(<Switch {...defaultProps} rules={rules} validateTrigger="onChange" />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      await waitFor(() => {
        expect(screen.getByText('异步验证失败')).toBeInTheDocument();
      });
    });
  });

  describe('无障碍支持', () => {
    it('应该具有正确的无障碍属性', () => {
      render(<Switch {...defaultProps} accessibilityLabel="Test Switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', 'Test Switch');
    });

    it('应该正确反映必填状态', () => {
      const rules = [{ required: true }];
      render(<Switch {...defaultProps} rules={rules} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-required', 'true');
    });

    it('应该正确反映禁用状态', () => {
      render(<Switch {...defaultProps} disabled={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-disabled', 'true');
    });

    it('应该正确反映加载状态', () => {
      render(<Switch {...defaultProps} loading={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('样式功能', () => {
    it('应该支持边框显示', () => {
      render(<Switch {...defaultProps} bordered={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('taro-uno-switch--bordered');
    });

    it('应该支持边框隐藏', () => {
      render(<Switch {...defaultProps} bordered={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toHaveClass('taro-uno-switch--bordered');
    });

    it('应该支持块级显示', () => {
      render(<Switch {...defaultProps} block={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('taro-uno-switch--block');
    });

    it('应该支持自定义样式类名', () => {
      render(<Switch {...defaultProps} className="custom-switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('custom-switch');
    });
  });

  describe('引用方法', () => {
    it('应该提供正确的引用方法', () => {
      const ref = React.createRef<any>();
      render(<Switch {...defaultProps} ref={ref} />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.getValue).toBe('function');
      expect(typeof ref.current.setValue).toBe('function');
      expect(typeof ref.current.toggle).toBe('function');
      expect(typeof ref.current.focus).toBe('function');
      expect(typeof ref.current.blur).toBe('function');
    });

    it('应该正确获取和设置值', () => {
      const ref = React.createRef<any>();
      render(<Switch {...defaultProps} ref={ref} />);
      
      expect(ref.current.getValue()).toBe(false);
      ref.current.setValue(true);
      expect(ref.current.getValue()).toBe(true);
    });

    it('应该正确切换值', () => {
      const ref = React.createRef<any>();
      render(<Switch {...defaultProps} ref={ref} />);
      
      expect(ref.current.getValue()).toBe(false);
      ref.current.toggle();
      expect(ref.current.getValue()).toBe(true);
    });

    it('应该正确设置状态', () => {
      const ref = React.createRef<any>();
      render(<Switch {...defaultProps} ref={ref} />);
      
      ref.current.setDisabled(true);
      expect(ref.current.getStatus()).toBe('disabled');
      
      ref.current.setLoading(true);
      expect(ref.current.getStatus()).toBe('loading');
    });

    it('应该正确验证', async () => {
      const ref = React.createRef<any>();
      const rules = [{ required: true, message: '此字段为必填项' }];
      render(<Switch {...defaultProps} ref={ref} rules={rules} />);
      
      const result = await ref.current.validate();
      expect(result.valid).toBe(false);
      expect(result.message).toBe('此字段为必填项');
    });
  });

  describe('边界情况', () => {
    it('应该处理空值', () => {
      render(<Switch {...defaultProps} value={undefined} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('应该处理无效的验证规则', () => {
      const invalidRules = [{} as any];
      render(<Switch {...defaultProps} rules={invalidRules} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('应该处理验证函数抛出异常', async () => {
      const validator = jest.fn().mockImplementation(() => {
        throw new Error('验证错误');
      });
      const rules = [{ validator, message: '验证失败' }];
      render(<Switch {...defaultProps} rules={rules} validateTrigger="onChange" />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      await waitFor(() => {
        expect(screen.getByText('验证失败')).toBeInTheDocument();
      });
    });

    it('应该处理异步验证函数抛出异常', async () => {
      const asyncValidator = jest.fn().mockRejectedValue(new Error('异步验证错误'));
      const rules = [{ asyncValidator, message: '异步验证失败' }];
      render(<Switch {...defaultProps} rules={rules} validateTrigger="onChange" />);
      
      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      
      await waitFor(() => {
        expect(screen.getByText('异步验证失败')).toBeInTheDocument();
      });
    });
  });
});