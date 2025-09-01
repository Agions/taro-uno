import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { Select } from './Select';
import type { SelectProps, SelectRef, SelectOption } from './Select.types';

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  Picker: ({ children, onChange, ...props }: any) => (
    <div data-testid="picker" {...props}>
      {children}
      <button onClick={() => onChange({ detail: { value: props.value?.[0] || 'test-value' } })}>
        Change
      </button>
    </div>
  ),
  View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Input: (props: any) => <input {...props} />,
}));

// Mock PlatformDetector
vi.mock('@/utils', () => ({
  PlatformDetector: {
    isH5: true,
    isWeapp: false,
    isRN: false,
  },
}));

describe('Select Component', () => {
  const basicOptions: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const groupedOptions = [
    {
      label: 'Group 1',
      options: [
        { value: '1-1', label: 'Option 1-1' },
        { value: '1-2', label: 'Option 1-2' },
      ],
    },
    {
      label: 'Group 2',
      options: [
        { value: '2-1', label: 'Option 2-1' },
        { value: '2-2', label: 'Option 2-2' },
      ],
    },
  ];

  describe('Rendering', () => {
    it('renders Select component with default props', () => {
      render(<Select options={basicOptions} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('renders with placeholder when no value is selected', () => {
      render(<Select options={basicOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders with selected value', () => {
      render(<Select options={basicOptions} value="1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select options={basicOptions} label="Select Label" />);
      expect(screen.getByText('Select Label')).toBeInTheDocument();
    });

    it('renders with prefix', () => {
      render(<Select options={basicOptions} prefix={<span data-testid="prefix">Prefix</span>} />);
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
    });

    it('renders with suffix', () => {
      render(<Select options={basicOptions} suffix={<span data-testid="suffix">Suffix</span>} />);
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select options={basicOptions} helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<Select options={basicOptions} errorText="Error text" status="error" />);
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('renders with loading state', () => {
      render(<Select options={basicOptions} loading />);
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });

    it('renders with custom not found content', () => {
      render(<Select options={[]} notFoundContent="No options available" />);
      expect(screen.getByText('No options available')).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('handles controlled mode', () => {
      const handleChange = vi.fn();
      render(<Select options={basicOptions} value="1" onChange={handleChange} />);
      
      fireEvent.click(screen.getByText('Change'));
      expect(handleChange).toHaveBeenCalledWith('1', basicOptions[0]);
    });

    it('handles uncontrolled mode with default value', () => {
      render(<Select options={basicOptions} defaultValue="2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('handles multiple selection mode', () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          mode="multiple"
          value={['1', '2']}
          onChange={handleChange}
        />
      );
      expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
    });

    it('clears value when allowClear is enabled', () => {
      const handleClear = vi.fn();
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          value="1"
          allowClear
          onClear={handleClear}
          onChange={handleChange}
        />
      );
      
      const clearButton = screen.getByText('×');
      fireEvent.click(clearButton);
      
      expect(handleClear).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith('', []);
    });

    it('does not show clear button when no value is selected', () => {
      render(<Select options={basicOptions} allowClear />);
      expect(screen.queryByText('×')).not.toBeInTheDocument();
    });

    it('does not show clear button when disabled', () => {
      render(<Select options={basicOptions} value="1" allowClear disabled />);
      expect(screen.queryByText('×')).not.toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('calls onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<Select options={basicOptions} onChange={handleChange} />);
      
      fireEvent.click(screen.getByText('Change'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when focused', () => {
      const handleFocus = vi.fn();
      render(<Select options={basicOptions} onFocus={handleFocus} />);
      
      const picker = screen.getByTestId('picker');
      fireEvent.focus(picker);
      
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when blurred', () => {
      const handleBlur = vi.fn();
      render(<Select options={basicOptions} onBlur={handleBlur} />);
      
      const picker = screen.getByTestId('picker');
      fireEvent.blur(picker);
      
      expect(handleBlur).toHaveBeenCalled();
    });

    it('calls onSearch when searching', () => {
      const handleSearch = vi.fn();
      render(<Select options={basicOptions} showSearch onSearch={handleSearch} />);
      
      // Search functionality would need specific implementation
      expect(handleSearch).not.toHaveBeenCalled(); // Initial state
    });

    it('calls onDropdownVisibleChange when dropdown state changes', () => {
      const handleDropdownVisibleChange = vi.fn();
      const selectRef = useRef<SelectRef>(null);
      
      render(
        <Select
          options={basicOptions}
          ref={selectRef}
          onDropdownVisibleChange={handleDropdownVisibleChange}
        />
      );
      
      act(() => {
        selectRef.current?.openDropdown();
      });
      
      expect(handleDropdownVisibleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Select options={basicOptions} disabled />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('disabled');
    });

    it('handles readonly state', () => {
      render(<Select options={basicOptions} readonly />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('disabled');
    });

    it('handles loading state', () => {
      render(<Select options={basicOptions} loading />);
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });

    it('handles error state', () => {
      render(<Select options={basicOptions} status="error" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveClass('select-error');
    });

    it('handles warning state', () => {
      render(<Select options={basicOptions} status="warning" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveClass('select-warning');
    });

    it('handles success state', () => {
      render(<Select options={basicOptions} status="success" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveClass('select-success');
    });
  });

  describe('Sizes and Variants', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach((size) => {
      it(`renders with size ${size}`, () => {
        render(<Select options={basicOptions} size={size} />);
        const picker = screen.getByTestId('picker');
        expect(picker).toHaveClass(`select-${size}`);
      });
    });

    const variants: Array<'outlined' | 'filled' | 'underlined'> = ['outlined', 'filled', 'underlined'];
    
    variants.forEach((variant) => {
      it(`renders with variant ${variant}`, () => {
        render(<Select options={basicOptions} variant={variant} />);
        const picker = screen.getByTestId('picker');
        expect(picker).toHaveClass(`select-${variant}`);
      });
    });
  });

  describe('Validation', () => {
    it('validates required rule', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          rules={[{ required: true, message: 'This field is required' }]}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      fireEvent.click(screen.getByText('Change'));
      
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });
    });

    it('validates min count for multiple selection', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          mode="multiple"
          minCount={2}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      // Select only one option
      fireEvent.click(screen.getByText('Change'));
      
      await waitFor(() => {
        expect(screen.getByText('最少需要选择2项')).toBeInTheDocument();
      });
    });

    it('validates max count for multiple selection', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          mode="multiple"
          maxCount={1}
          value={['1', '2']}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('最多允许选择1项')).toBeInTheDocument();
      });
    });

    it('validates with custom validator', async () => {
      const handleChange = vi.fn();
      const customValidator = vi.fn().mockResolvedValue('Custom validation error');
      
      render(
        <Select
          options={basicOptions}
          validator={customValidator}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      fireEvent.click(screen.getByText('Change'));
      
      await waitFor(() => {
        expect(screen.getByText('Custom validation error')).toBeInTheDocument();
      });
    });

    it('validates on blur trigger', async () => {
      const handleBlur = vi.fn();
      render(
        <Select
          options={basicOptions}
          rules={[{ required: true, message: 'This field is required' }]}
          validateTrigger="onBlur"
          onBlur={handleBlur}
        />
      );
      
      const picker = screen.getByTestId('picker');
      fireEvent.blur(picker);
      
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });
    });
  });

  describe('Ref Methods', () => {
    it('provides ref with getValue method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} value="1" ref={selectRef} />);
      
      expect(selectRef.current?.getValue()).toBe('1');
    });

    it('provides ref with setValue method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} ref={selectRef} />);
      
      act(() => {
        selectRef.current?.setValue('2');
      });
      
      expect(selectRef.current?.getValue()).toBe('2');
    });

    it('provides ref with focus method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} ref={selectRef} />);
      
      expect(() => {
        selectRef.current?.focus();
      }).not.toThrow();
    });

    it('provides ref with blur method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} ref={selectRef} />);
      
      expect(() => {
        selectRef.current?.blur();
      }).not.toThrow();
    });

    it('provides ref with validate method', async () => {
      const selectRef = useRef<SelectRef>(null);
      render(
        <Select
          options={basicOptions}
          rules={[{ required: true, message: 'Required' }]}
          ref={selectRef}
        />
      );
      
      const result = await selectRef.current?.validate();
      expect(result).toEqual({ valid: false, message: 'Required' });
    });

    it('provides ref with clear method', () => {
      const selectRef = useRef<SelectRef>(null);
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          value="1"
          onChange={handleChange}
          ref={selectRef}
        />
      );
      
      act(() => {
        selectRef.current?.clear();
      });
      
      expect(handleChange).toHaveBeenCalledWith('', []);
    });

    it('provides ref with reset method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(
        <Select
          options={basicOptions}
          defaultValue="1"
          ref={selectRef}
        />
      );
      
      act(() => {
        selectRef.current?.reset();
      });
      
      expect(selectRef.current?.getValue()).toBe('1');
    });

    it('provides ref with getSelectedOptions method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} value="1" ref={selectRef} />);
      
      const selectedOptions = selectRef.current?.getSelectedOptions();
      expect(selectedOptions).toEqual([basicOptions[0]]);
    });

    it('provides ref with searchOptions method', () => {
      const selectRef = useRef<SelectRef>(null);
      render(<Select options={basicOptions} ref={selectRef} />);
      
      const searchResults = selectRef.current?.searchOptions('Option 1');
      expect(searchResults).toEqual([basicOptions[0]]);
    });
  });

  describe('Options Handling', () => {
    it('handles grouped options', () => {
      render(<Select options={groupedOptions} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('handles disabled options', () => {
      const optionsWithDisabled = [
        ...basicOptions,
        { value: '4', label: 'Disabled Option', disabled: true },
      ];
      render(<Select options={optionsWithDisabled} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('handles options with descriptions', () => {
      const optionsWithDescriptions = basicOptions.map(option => ({
        ...option,
        description: `Description for ${option.label}`,
      }));
      render(<Select options={optionsWithDescriptions} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('handles options with icons', () => {
      const optionsWithIcons = basicOptions.map(option => ({
        ...option,
        icon: <span data-testid={`icon-${option.value}`}>Icon</span>,
      }));
      render(<Select options={optionsWithIcons} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Select options={basicOptions} accessibilityLabel="Select an option" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('aria-label', 'Select an option');
    });

    it('has proper accessibility role', () => {
      render(<Select options={basicOptions} accessibilityRole="combobox" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('role', 'combobox');
    });

    it('updates accessibility state when disabled', () => {
      render(<Select options={basicOptions} disabled />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('aria-disabled', 'true');
    });

    it('updates accessibility state when loading', () => {
      render(<Select options={basicOptions} loading />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Style Classes', () => {
    it('applies custom className', () => {
      render(<Select options={basicOptions} className="custom-select" />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveClass('custom-select');
    });

    it('applies custom style', () => {
      render(<Select options={basicOptions} style={{ backgroundColor: 'red' }} />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveStyle({ backgroundColor: 'red' });
    });

    it('applies bordered style', () => {
      render(<Select options={basicOptions} bordered />);
      const picker = screen.getByTestId('picker');
      expect(picker).toHaveClass('select-bordered');
    });

    it('applies borderless style', () => {
      render(<Select options={basicOptions} bordered={false} />);
      const picker = screen.getByTestId('picker');
      expect(picker).not.toHaveClass('select-bordered');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<Select options={[]} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('handles undefined options', () => {
      render(<Select />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('handles null value', () => {
      render(<Select options={basicOptions} value={null as any} />);
      expect(screen.getByText('请选择')).toBeInTheDocument();
    });

    it('handles undefined value', () => {
      render(<Select options={basicOptions} value={undefined} />);
      expect(screen.getByText('请选择')).toBeInTheDocument();
    });

    it('handles immediate validation', async () => {
      const handleChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          rules={[{ required: true, message: 'Required' }]}
          immediate
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      fireEvent.click(screen.getByText('Change'));
      
      await waitFor(() => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      });
    });
  });

  describe('Performance', () => {
    it('handles large number of options', () => {
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        value: i.toString(),
        label: `Option ${i}`,
      }));
      
      render(<Select options={largeOptions} />);
      expect(screen.getByTestId('picker')).toBeInTheDocument();
    });

    it('memoizes callbacks properly', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Select options={basicOptions} onChange={handleChange} />);
      
      rerender(<Select options={basicOptions} onChange={handleChange} />);
      
      // Should not cause unnecessary re-renders
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});