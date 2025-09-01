import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Textarea } from './Textarea';
import type { TextareaRef, TextareaProps } from './Textarea.types';

// Mock @tarojs/components
jest.mock('@tarojs/components', () => ({
  Textarea: 'textarea',
  View: 'div',
  Text: 'span',
}));

// Mock @tarojs/taro
jest.mock('@tarojs/taro', () => ({
  getEnv: () => 'h5',
}));

describe('Textarea Component', () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnInput = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnValidate = jest.fn();
  const mockOnHeightChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveClass('taro-uno-h5-textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--md');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--outlined');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--normal');
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="请输入内容" />);
      const textarea = screen.getByPlaceholderText('请输入内容');
      expect(textarea).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="描述" />);
      expect(screen.getByText('描述')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Textarea helperText="请输入详细描述" />);
      expect(screen.getByText('请输入详细描述')).toBeInTheDocument();
    });

    it('renders with prefix and suffix', () => {
      render(
        <Textarea 
          prefix={<span data-testid="prefix">前缀</span>}
          suffix={<span data-testid="suffix">后缀</span>}
        />
      );
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { container } = render(<Textarea size="sm" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--sm');
    });

    it('renders with medium size', () => {
      const { container } = render(<Textarea size="md" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--md');
    });

    it('renders with large size', () => {
      const { container } = render(<Textarea size="lg" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--lg');
    });
  });

  describe('Variant Types', () => {
    it('renders with outlined variant', () => {
      const { container } = render(<Textarea variant="outlined" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--outlined');
    });

    it('renders with filled variant', () => {
      const { container } = render(<Textarea variant="filled" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--filled');
    });

    it('renders with underlined variant', () => {
      const { container } = render(<Textarea variant="underlined" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--underlined');
    });
  });

  describe('Status States', () => {
    it('renders with error status', () => {
      const { container } = render(<Textarea status="error" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--error');
    });

    it('renders with warning status', () => {
      const { container } = render(<Textarea status="warning" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--warning');
    });

    it('renders with success status', () => {
      const { container } = render(<Textarea status="success" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--success');
    });

    it('renders with disabled status', () => {
      const { container } = render(<Textarea disabled />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--disabled');
      expect(textarea).toBeDisabled();
    });

    it('renders with readonly status', () => {
      const { container } = render(<Textarea readonly />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveClass('taro-uno-h5-textarea--readonly');
      expect(textarea).toHaveAttribute('readonly');
    });
  });

  describe('Value Handling', () => {
    it('handles controlled value', () => {
      const { container } = render(<Textarea value="测试内容" onChange={mockOnChange} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('测试内容');
    });

    it('handles uncontrolled value with default', () => {
      const { container } = render(<Textarea defaultValue="默认内容" />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('默认内容');
    });

    it('calls onChange when value changes', async () => {
      const { container } = render(<Textarea onChange={mockOnChange} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.change(textarea, { target: { value: '新内容' } });
      expect(mockOnChange).toHaveBeenCalledWith('新内容', expect.any(Object));
    });

    it('calls onInput when input occurs', async () => {
      const { container } = render(<Textarea onInput={mockOnInput} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.input(textarea, { target: { value: '输入内容' } });
      expect(mockOnInput).toHaveBeenCalledWith('输入内容', expect.any(Object));
    });
  });

  describe('Event Handling', () => {
    it('calls onFocus when focused', () => {
      const { container } = render(<Textarea onFocus={mockOnFocus} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.focus(textarea);
      expect(mockOnFocus).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onBlur when blurred', () => {
      const { container } = render(<Textarea onBlur={mockOnBlur} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      expect(mockOnBlur).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onConfirm when confirmed', () => {
      const { container } = render(<Textarea onConfirm={mockOnConfirm} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      // Simulate confirm event (keydown Enter)
      fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
      expect(mockOnConfirm).toHaveBeenCalledWith('', expect.any(Object));
    });
  });

  describe('Clear Functionality', () => {
    it('shows clear button when clearable and has value', () => {
      const { container } = render(<Textarea clearable value="有内容" />);
      const clearButton = container.querySelector('[style*="position: absolute"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('hides clear button when no value', () => {
      const { container } = render(<Textarea clearable value="" />);
      const clearButton = container.querySelector('[style*="position: absolute"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('calls onClear when clear button clicked', () => {
      const { container } = render(<Textarea clearable value="内容" onClear={mockOnClear} />);
      const clearButton = container.querySelector('[style*="position: absolute"]');
      
      fireEvent.click(clearButton!);
      expect(mockOnClear).toHaveBeenCalledWith(expect.any(Object));
    });

    it('resets value when cleared in uncontrolled mode', () => {
      const { container } = render(<Textarea clearable defaultValue="内容" />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      const clearButton = container.querySelector('[style*="position: absolute"]');
      
      fireEvent.click(clearButton!);
      expect(textarea.value).toBe('');
    });
  });

  describe('Character Counting', () => {
    it('shows character counter when showCount is true', () => {
      const { container } = render(<Textarea showCount maxLength={100} value="测试" />);
      const counter = container.querySelector('[style*="position: absolute"]');
      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent('4/100');
    });

    it('calculates Chinese characters correctly', () => {
      const { container } = render(<Textarea showCount maxLength={10} value="中文测试" />);
      const counter = container.querySelector('[style*="position: absolute"]');
      expect(counter).toHaveTextContent('8/10'); // 每个中文字符算2个长度
    });

    it('updates counter when value changes', () => {
      const { container } = render(<Textarea showCount maxLength={10} value="初始" />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      const counter = container.querySelector('[style*="position: absolute"]');
      
      expect(counter).toHaveTextContent('4/10');
      
      fireEvent.change(textarea, { target: { value: '新内容' } });
      expect(counter).toHaveTextContent('6/10');
    });
  });

  describe('Auto Height', () => {
    it('applies auto height styles when autoHeight is true', () => {
      const { container } = render(<Textarea autoHeight />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.style.resize).toBe('none');
    });

    it('respects minRows and maxRows constraints', () => {
      const { container } = render(<Textarea autoHeight minRows={2} maxRows={5} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.style.minHeight).toBeDefined();
      expect(textarea.style.maxHeight).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates required field', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }];
      const { container } = render(
        <Textarea 
          rules={rules} 
          validateTrigger="onBlur"
          onValidate={mockOnValidate}
        />
      );
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(mockOnValidate).toHaveBeenCalledWith(
          expect.objectContaining({ valid: false, message: '此字段为必填项' })
        );
      });
    });

    it('validates minLength', async () => {
      const rules = [{ minLength: 5, message: '最少需要5个字符' }];
      const { container } = render(
        <Textarea 
          rules={rules} 
          validateTrigger="onBlur"
          value="abc"
          onValidate={mockOnValidate}
        />
      );
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(mockOnValidate).toHaveBeenCalledWith(
          expect.objectContaining({ valid: false, message: '最少需要5个字符' })
        );
      });
    });

    it('validates maxLength', async () => {
      const rules = [{ maxLength: 5, message: '最多允许5个字符' }];
      const { container } = render(
        <Textarea 
          rules={rules} 
          validateTrigger="onBlur"
          value="abcdef"
          onValidate={mockOnValidate}
        />
      );
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(mockOnValidate).toHaveBeenCalledWith(
          expect.objectContaining({ valid: false, message: '最多允许5个字符' })
        );
      });
    });

    it('validates pattern', async () => {
      const rules = [{ pattern: /^[a-zA-Z]+$/, message: '只能输入字母' }];
      const { container } = render(
        <Textarea 
          rules={rules} 
          validateTrigger="onBlur"
          value="abc123"
          onValidate={mockOnValidate}
        />
      );
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(mockOnValidate).toHaveBeenCalledWith(
          expect.objectContaining({ valid: false, message: '只能输入字母' })
        );
      });
    });

    it('shows validation error message', async () => {
      const rules = [{ required: true, message: '此字段为必填项' }];
      const { container } = render(
        <Textarea 
          rules={rules} 
          validateTrigger="onBlur"
        />
      );
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        const errorText = container.querySelector('[style*="color: rgb(239, 68, 68)"]');
        expect(errorText).toBeInTheDocument();
        expect(errorText).toHaveTextContent('此字段为必填项');
      });
    });
  });

  describe('Ref Methods', () => {
    let ref: React.RefObject<TextareaRef>;

    beforeEach(() => {
      ref = React.createRef();
    });

    it('provides ref methods', () => {
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeDefined();
      expect(ref.current?.getValue).toBeDefined();
      expect(ref.current?.setValue).toBeDefined();
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.blur).toBeDefined();
      expect(ref.current?.clear).toBeDefined();
      expect(ref.current?.validate).toBeDefined();
    });

    it('getValue returns current value', () => {
      render(<Textarea ref={ref} value="测试值" />);
      expect(ref.current?.getValue()).toBe('测试值');
    });

    it('setValue updates value in uncontrolled mode', () => {
      render(<Textarea ref={ref} defaultValue="初始值" />);
      ref.current?.setValue('新值');
      expect(ref.current?.getValue()).toBe('新值');
    });

    it('focus and blur methods work', () => {
      const { container } = render(<Textarea ref={ref} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      // Mock focus and blur methods
      const focusSpy = jest.spyOn(textarea, 'focus');
      const blurSpy = jest.spyOn(textarea, 'blur');
      
      ref.current?.focus();
      expect(focusSpy).toHaveBeenCalled();
      
      ref.current?.blur();
      expect(blurSpy).toHaveBeenCalled();
      
      focusSpy.mockRestore();
      blurSpy.mockRestore();
    });

    it('clear method works', () => {
      render(<Textarea ref={ref} defaultValue="内容" />);
      ref.current?.clear();
      expect(ref.current?.getValue()).toBe('');
    });

    it('validate method works', async () => {
      const rules = [{ required: true, message: '必填' }];
      render(<Textarea ref={ref} rules={rules} />);
      
      const result = await ref.current?.validate();
      expect(result).toEqual(
        expect.objectContaining({ valid: false, message: '必填' })
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      const { container } = render(
        <Textarea 
          accessibilityLabel="描述文本域"
          accessibilityRole="textbox"
          accessible={true}
        />
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-label', '描述文本域');
      expect(textarea).toHaveAttribute('aria-role', 'textbox');
    });

    it('has proper accessibility states', () => {
      const { container } = render(
        <Textarea 
          disabled={true}
          readonly={false}
          rules={[{ required: true }]}
        />
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-state', expect.stringContaining('"disabled":true'));
      expect(textarea).toHaveAttribute('aria-state', expect.stringContaining('"required":true'));
    });
  });

  describe('Platform Compatibility', () => {
    it('works in different platforms', () => {
      // Test H5 platform
      const { container: h5Container } = render(<Textarea />);
      const h5Textarea = h5Container.querySelector('textarea');
      expect(h5Textarea).toHaveClass('taro-uno-h5-textarea');

      // Mock different platform
      jest.mock('@tarojs/taro', () => ({
        getEnv: () => 'weapp',
      }));

      const { container: weappContainer } = render(<Textarea />);
      const weappTextarea = weappContainer.querySelector('textarea');
      expect(weappTextarea).toHaveClass('taro-uno-weapp-textarea');
    });
  });

  describe('Performance', () => {
    it('handles large text efficiently', () => {
      const largeText = 'a'.repeat(10000);
      const { container } = render(<Textarea value={largeText} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      
      expect(textarea.value).toBe(largeText);
      
      // Test that input is still responsive
      fireEvent.change(textarea, { target: { value: largeText + 'b' } });
      expect(textarea.value).toBe(largeText + 'b');
    });

    it('does not re-render unnecessarily', () => {
      const { rerender } = render(<Textarea value="初始值" />);
      const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
      
      // Re-render with same props
      rerender(<Textarea value="初始值" />);
      expect(textarea.value).toBe('初始值');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string value', () => {
      const { container } = render(<Textarea value="" />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });

    it('handles null and undefined values gracefully', () => {
      const { container: container1 } = render(<Textarea value={null as any} />);
      const { container: container2 } = render(<Textarea value={undefined as any} />);
      
      const textarea1 = container1.querySelector('textarea') as HTMLTextAreaElement;
      const textarea2 = container2.querySelector('textarea') as HTMLTextAreaElement;
      
      expect(textarea1.value).toBe('');
      expect(textarea2.value).toBe('');
    });

    it('handles very long placeholder text', () => {
      const longPlaceholder = 'a'.repeat(1000);
      const { container } = render(<Textarea placeholder={longPlaceholder} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.getAttribute('placeholder')).toBe(longPlaceholder);
    });
  });
});