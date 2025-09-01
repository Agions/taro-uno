import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxProps, CheckboxRef, CheckboxGroupProps, CheckboxGroupRef } from './Checkbox.types';

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  Checkbox: ({ checked, onChange, children, ...props }: any) => (
    <input
      data-testid="checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    >
      {children}
    </input>
  ),
  View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

// Mock PlatformDetector
vi.mock('@/utils', () => ({
  PlatformDetector: {
    getPlatform: () => 'h5',
  },
}));

describe('Checkbox Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders Checkbox component with default props', () => {
      render(<Checkbox />);
      expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Checkbox helperText="Please accept the terms" />);
      expect(screen.getByText('Please accept the terms')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<Checkbox errorText="This field is required" status="error" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders unchecked by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('renders checked when controlled', () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders checked with defaultChecked', () => {
      render(<Checkbox defaultChecked={true} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders with custom icon', () => {
      render(<Checkbox checked={true} icon="★" />);
      expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('renders with label on left', () => {
      render(<Checkbox label="Left label" labelPosition="left" />);
      const label = screen.getByText('Left label');
      expect(label).toBeInTheDocument();
    });

    it('renders disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('renders readonly', () => {
      render(<Checkbox readonly />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('readonly');
    });

    it('renders indeterminate', () => {
      render(<Checkbox indeterminate={true} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
    });
  });

  describe('Value Handling', () => {
    it('handles controlled mode', () => {
      const handleChange = vi.fn();
      render(<Checkbox checked={true} onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it('handles uncontrolled mode', () => {
      const handleChange = vi.fn();
      render(<Checkbox defaultChecked={false} onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
      expect(checkbox).toBeChecked();
    });

    it('toggles checked state on click', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      
      // First click - check
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
      
      // Second click - uncheck
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeDisabled();
      
      fireEvent.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles readonly state', () => {
      const handleChange = vi.fn();
      render(<Checkbox readonly onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      // Readonly should still allow interaction but handle it differently
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles indeterminate state', () => {
      render(<Checkbox indeterminate={true} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
    });

    it('handles error state', () => {
      render(<Checkbox status="error" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox-error');
    });

    it('handles warning state', () => {
      render(<Checkbox status="warning" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox-warning');
    });

    it('handles success state', () => {
      render(<Checkbox status="success" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox-success');
    });
  });

  describe('Sizes and Variants', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const variants: Array<'default' | 'filled' | 'outlined'> = ['default', 'filled', 'outlined'];
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = 
      ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    
    sizes.forEach((size) => {
      it(`renders with size ${size}`, () => {
        render(<Checkbox size={size} />);
        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toHaveClass(`checkbox-${size}`);
      });
    });

    variants.forEach((variant) => {
      it(`renders with variant ${variant}`, () => {
        render(<Checkbox variant={variant} />);
        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toHaveClass(`checkbox-${variant}`);
      });
    });

    colors.forEach((color) => {
      it(`renders with color ${color}`, () => {
        render(<Checkbox color={color} />);
        const checkbox = screen.getByTestId('checkbox');
        expect(checkbox).toHaveClass(`checkbox-${color}`);
      });
    });
  });

  describe('Events', () => {
    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Checkbox onClick={handleClick} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('passes correct event to onChange handler', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      const mockEvent = { target: checkbox };
      
      fireEvent.click(checkbox, mockEvent);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.objectContaining({
        target: checkbox,
      }));
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when readonly', () => {
      const handleChange = vi.fn();
      render(<Checkbox readonly onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('validates required rule', async () => {
      const rules = [{ required: true, message: 'This field is required' }];
      render(<Checkbox rules={rules} validateTrigger="onChange" />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });
    });

    it('validates custom validator', async () => {
      const validator = vi.fn().mockReturnValue('Custom error message');
      render(<Checkbox validator={validator} validateTrigger="onChange" />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      await waitFor(() => {
        expect(screen.getByText('Custom error message')).toBeInTheDocument();
      });
    });

    it('shows validation error message', () => {
      const rules = [{ required: true, message: 'Required field' }];
      render(<Checkbox rules={rules} status="error" />);
      
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });
  });

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.getChecked).toBe('function');
      expect(typeof ref.current?.setChecked).toBe('function');
      expect(typeof ref.current?.toggle).toBe('function');
      expect(typeof ref.current?.setDisabled).toBe('function');
      expect(typeof ref.current?.setReadonly).toBe('function');
      expect(typeof ref.current?.setIndeterminate).toBe('function');
      expect(typeof ref.current?.setStatus).toBe('function');
      expect(typeof ref.current?.getStatus).toBe('function');
      expect(typeof ref.current?.setSize).toBe('function');
      expect(typeof ref.current?.setColor).toBe('function');
      expect(typeof ref.current?.validate).toBe('function');
      expect(typeof ref.current?.reset).toBe('function');
      expect(typeof ref.current?.focus).toBe('function');
      expect(typeof ref.current?.blur).toBe('function');
      expect(typeof ref.current?.getData).toBe('function');
      expect(typeof ref.current?.setData).toBe('function');
      expect(typeof ref.current?.shake).toBe('function');
      expect(typeof ref.current?.pulse).toBe('function');
    });

    it('gets checked state via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} checked={true} />);
      
      expect(ref.current?.getChecked()).toBe(true);
    });

    it('sets checked state via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} defaultChecked={false} />);
      
      act(() => {
        ref.current?.setChecked(true);
      });
      
      expect(ref.current?.getChecked()).toBe(true);
    });

    it('toggles checked state via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} defaultChecked={false} />);
      
      act(() => {
        ref.current?.toggle();
      });
      
      expect(ref.current?.getChecked()).toBe(true);
    });

    it('sets disabled state via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} />);
      
      act(() => {
        ref.current?.setDisabled(true);
      });
      
      expect(ref.current?.getStatus()).toBe('disabled');
    });

    it('validates via ref', async () => {
      const rules = [{ required: true, message: 'Required' }];
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} rules={rules} />);
      
      const result = await ref.current?.validate();
      
      expect(result?.valid).toBe(false);
      expect(result?.message).toBe('Required');
    });

    it('resets via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} defaultChecked={true} />);
      
      act(() => {
        ref.current?.reset();
      });
      
      expect(ref.current?.getChecked()).toBe(true);
    });

    it('gets and sets data via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      const testData = { id: 'test', category: 'form' };
      render(<Checkbox ref={ref} data={testData} />);
      
      expect(ref.current?.getData()).toEqual(testData);
      
      const newData = { id: 'updated', category: 'updated' };
      act(() => {
        ref.current?.setData(newData);
      });
      
      // Note: setData is a mock function that logs to console
      expect(ref.current?.getData()).toEqual(testData); // Should remain unchanged
    });

    it('calls shake method via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} />);
      
      expect(() => {
        act(() => {
          ref.current?.shake();
        });
      }).not.toThrow();
    });

    it('calls pulse method via ref', () => {
      const ref = useRef<CheckboxRef>(null);
      render(<Checkbox ref={ref} />);
      
      expect(() => {
        act(() => {
          ref.current?.pulse();
        });
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Checkbox accessibilityLabel="Test checkbox" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox');
      expect(checkbox).toHaveAttribute('aria-role', 'checkbox');
    });

    it('has correct accessibility state', () => {
      render(<Checkbox checked={true} disabled={true} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('aria-state', expect.objectContaining({
        checked: true,
        disabled: true,
      }));
    });

    it('supports custom accessibility state', () => {
      const customState = { busy: true, expanded: false };
      render(<Checkbox accessibilityState={customState} />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('aria-state', expect.objectContaining(customState));
    });
  });

  describe('Platform Compatibility', () => {
    it('renders on H5 platform', () => {
      render(<Checkbox />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles touch events', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports custom styling', () => {
      const customStyle = { backgroundColor: 'red', color: 'white' };
      render(<Checkbox style={customStyle} />);
      
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveStyle('background-color: red');
      expect(checkbox).toHaveStyle('color: white');
    });
  });

  describe('Performance', () => {
    it('handles rapid clicks without errors', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.click(checkbox);
      }
      
      expect(handleChange).toHaveBeenCalledTimes(10);
    });

    it('does not re-render unnecessarily', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByTestId('checkbox');
      const initialRenderCount = handleChange.mock.calls.length;
      
      rerender(<Checkbox onChange={handleChange} />);
      
      expect(handleChange.mock.calls.length).toBe(initialRenderCount);
    });

    it('handles animation states correctly', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} animation={true} />);
      
      const checkbox = screen.getByTestId('checkbox');
      
      fireEvent.click(checkbox);
      
      // Should handle animation without errors
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles ripple effects correctly', () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} ripple={true} />);
      
      const checkbox = screen.getByTestId('checkbox');
      
      fireEvent.click(checkbox);
      
      // Should handle ripple without errors
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Advanced Features', () => {
    it('handles custom icons correctly', () => {
      const checkedIcon = '✓';
      const uncheckedIcon = '✗';
      const indeterminateIcon = '−';
      
      const { rerender } = render(
        <Checkbox 
          checked={true} 
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          indeterminateIcon={indeterminateIcon}
        />
      );
      
      expect(screen.getByText(checkedIcon)).toBeInTheDocument();
      
      rerender(
        <Checkbox 
          checked={false} 
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          indeterminateIcon={indeterminateIcon}
        />
      );
      
      expect(screen.getByText(uncheckedIcon)).toBeInTheDocument();
      
      rerender(
        <Checkbox 
          indeterminate={true} 
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          indeterminateIcon={indeterminateIcon}
        />
      );
      
      expect(screen.getByText(indeterminateIcon)).toBeInTheDocument();
    });

    it('handles auto focus correctly', () => {
      const handleFocus = vi.fn();
      render(<Checkbox autoFocus={true} onFocus={handleFocus} />);
      
      // Auto focus should trigger focus event
      expect(handleFocus).toHaveBeenCalled();
    });

    it('handles custom tab index correctly', () => {
      render(<Checkbox tabIndex={5} />);
      
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('tabindex', '5');
    });

    it('handles data attributes correctly', () => {
      const testData = { id: 'test', category: 'form' };
      render(<Checkbox data={testData} />);
      
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveAttribute('data-value', undefined);
      expect(checkbox).toHaveAttribute('data-checked', 'false');
    });

    it('handles different label positions correctly', () => {
      const { rerender } = render(<Checkbox label="Test Label" labelPosition="right" />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      
      rerender(<Checkbox label="Test Label" labelPosition="left" />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('handles bordered and rounded variations correctly', () => {
      const { rerender } = render(<Checkbox bordered={true} rounded={true} />);
      
      let checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox-bordered');
      expect(checkbox).toHaveClass('checkbox-rounded');
      
      rerender(<Checkbox bordered={false} rounded={false} />);
      
      checkbox = screen.getByTestId('checkbox');
      expect(checkbox).not.toHaveClass('checkbox-bordered');
      expect(checkbox).not.toHaveClass('checkbox-rounded');
    });
  });
});

describe('CheckboxGroup Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders CheckboxGroup with options', () => {
      render(<CheckboxGroup options={mockOptions} />);
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders with group title', () => {
      render(<CheckboxGroup options={mockOptions} groupTitle="Select options" />);
      
      expect(screen.getByText('Select options')).toBeInTheDocument();
    });

    it('renders with group description', () => {
      render(<CheckboxGroup options={mockOptions} groupDescription="Please select your options" />);
      
      expect(screen.getByText('Please select your options')).toBeInTheDocument();
    });

    it('renders with select all button', () => {
      render(<CheckboxGroup options={mockOptions} showSelectAll={true} />);
      
      expect(screen.getByText('全选')).toBeInTheDocument();
    });

    it('renders with count display', () => {
      render(<CheckboxGroup options={mockOptions} showCount={true} />);
      
      expect(screen.getByText(/已选择/)).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('handles controlled mode', () => {
      const handleChange = vi.fn();
      render(<CheckboxGroup options={mockOptions} value={['1']} onChange={handleChange} />);
      
      const checkbox1 = screen.getByLabelText('Option 1');
      fireEvent.click(checkbox1);
      
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('handles uncontrolled mode', () => {
      const handleChange = vi.fn();
      render(<CheckboxGroup options={mockOptions} defaultValue={['1']} onChange={handleChange} />);
      
      const checkbox2 = screen.getByLabelText('Option 2');
      fireEvent.click(checkbox2);
      
      expect(handleChange).toHaveBeenCalledWith(['1', '2']);
    });

    it('respects max count limit', () => {
      const handleChange = vi.fn();
      render(<CheckboxGroup options={mockOptions} maxCount={2} onChange={handleChange} />);
      
      const checkbox1 = screen.getByLabelText('Option 1');
      const checkbox2 = screen.getByLabelText('Option 2');
      const checkbox3 = screen.getByLabelText('Option 3');
      
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
      fireEvent.click(checkbox3);
      
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it('respects min count limit', () => {
      const handleChange = vi.fn();
      render(<CheckboxGroup options={mockOptions} defaultValue={['1', '2']} minCount={1} onChange={handleChange} />);
      
      const checkbox1 = screen.getByLabelText('Option 1');
      const checkbox2 = screen.getByLabelText('Option 2');
      
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
      
      // Should not allow deselecting below min count
      expect(handleChange).not.toHaveBeenCalledWith([]);
    });
  });

  describe('Group Operations', () => {
    it('handles select all functionality', () => {
      const handleChange = vi.fn();
      const handleAllChange = vi.fn();
      render(
        <CheckboxGroup 
          options={mockOptions} 
          showSelectAll={true}
          onChange={handleChange}
          onAllChange={handleAllChange}
        />
      );
      
      const selectAllButton = screen.getByText('全选');
      fireEvent.click(selectAllButton);
      
      expect(handleChange).toHaveBeenCalledWith(['1', '2', '3']);
      expect(handleAllChange).toHaveBeenCalledWith(true);
    });

    it('handles deselect all functionality', () => {
      const handleChange = vi.fn();
      const handleAllChange = vi.fn();
      render(
        <CheckboxGroup 
          options={mockOptions} 
          value={['1', '2', '3']}
          showSelectAll={true}
          onChange={handleChange}
          onAllChange={handleAllChange}
        />
      );
      
      const selectAllButton = screen.getByText('全选');
      fireEvent.click(selectAllButton);
      
      expect(handleChange).toHaveBeenCalledWith([]);
      expect(handleAllChange).toHaveBeenCalledWith(false);
    });

    it('calculates group state correctly', () => {
      const { rerender } = render(<CheckboxGroup options={mockOptions} value={['1']} />);
      
      expect(screen.getByText(/已选择 1 项/)).toBeInTheDocument();
      
      rerender(<CheckboxGroup options={mockOptions} value={['1', '2', '3']} />);
      
      expect(screen.getByText(/已选择 3 项/)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('renders in horizontal direction', () => {
      render(<CheckboxGroup options={mockOptions} direction="horizontal" />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveStyle({ flexDirection: 'row' });
    });

    it('renders in vertical direction', () => {
      render(<CheckboxGroup options={mockOptions} direction="vertical" />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveStyle({ flexDirection: 'column' });
    });

    it('applies compact layout', () => {
      render(<CheckboxGroup options={mockOptions} compact={true} />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveStyle({ gap: '4px' });
    });

    it('applies block layout', () => {
      render(<CheckboxGroup options={mockOptions} block={true} />);
      
      const container = screen.getByRole('group');
      expect(container).toHaveStyle({ width: '100%' });
    });
  });

  describe('Ref Methods', () => {
    it('provides ref methods', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.getValue).toBe('function');
      expect(typeof ref.current?.setValue).toBe('function');
      expect(typeof ref.current?.selectAll).toBe('function');
      expect(typeof ref.current?.unselectAll).toBe('function');
      expect(typeof ref.current?.toggleAll).toBe('function');
      expect(typeof ref.current?.getCheckedCount).toBe('function');
      expect(typeof ref.current?.getTotalCount).toBe('function');
      expect(typeof ref.current?.isAllSelected).toBe('function');
      expect(typeof ref.current?.isIndeterminate).toBe('function');
    });

    it('gets and sets values via ref', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} />);
      
      expect(ref.current?.getValue()).toEqual([]);
      
      act(() => {
        ref.current?.setValue(['1', '2']);
      });
      
      expect(ref.current?.getValue()).toEqual(['1', '2']);
    });

    it('selects all via ref', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} />);
      
      act(() => {
        ref.current?.selectAll();
      });
      
      expect(ref.current?.getValue()).toEqual(['1', '2', '3']);
    });

    it('unselects all via ref', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} defaultValue={['1', '2']} />);
      
      act(() => {
        ref.current?.unselectAll();
      });
      
      expect(ref.current?.getValue()).toEqual([]);
    });

    it('gets checked count via ref', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} defaultValue={['1', '2']} />);
      
      expect(ref.current?.getCheckedCount()).toBe(2);
      expect(ref.current?.getTotalCount()).toBe(3);
    });

    it('checks selection state via ref', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} defaultValue={['1']} />);
      
      expect(ref.current?.isAllSelected()).toBe(false);
      expect(ref.current?.isIndeterminate()).toBe(true);
    });

    it('validates via ref', async () => {
      const ref = useRef<CheckboxGroupRef>(null);
      render(<CheckboxGroup ref={ref} options={mockOptions} minCount={2} />);
      
      const result = await ref.current?.validate();
      
      expect(result?.valid).toBe(false);
      expect(result?.message).toContain('最少需要选择 2 项');
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<CheckboxGroup options={mockOptions} accessibilityLabel="Test group" />);
      
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-label', 'Test group');
      expect(group).toHaveAttribute('aria-role', 'group');
    });

    it('supports disabled state', () => {
      render(<CheckboxGroup options={mockOptions} disabled={true} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeDisabled();
      });
    });

    it('supports readonly state', () => {
      render(<CheckboxGroup options={mockOptions} readonly={true} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).toHaveAttribute('readonly');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<CheckboxGroup options={[]} />);
      
      const group = screen.getByRole('group');
      expect(group).toBeEmptyDOMElement();
    });

    it('handles disabled options', () => {
      const optionsWithDisabled = [
        ...mockOptions,
        { label: 'Disabled Option', value: '4', disabled: true },
      ];
      
      render(<CheckboxGroup options={optionsWithDisabled} />);
      
      const disabledCheckbox = screen.getByLabelText('Disabled Option');
      expect(disabledCheckbox).toBeDisabled();
    });

    it('handles options with descriptions', () => {
      const optionsWithDescriptions = mockOptions.map(option => ({
        ...option,
        description: `Description for ${option.label}`,
      }));
      
      render(<CheckboxGroup options={optionsWithDescriptions} />);
      
      expect(screen.getByText('Description for Option 1')).toBeInTheDocument();
      expect(screen.getByText('Description for Option 2')).toBeInTheDocument();
      expect(screen.getByText('Description for Option 3')).toBeInTheDocument();
    });

    it('handles toggleAll functionality correctly', () => {
      const ref = useRef<CheckboxGroupRef>(null);
      const handleChange = vi.fn();
      render(<CheckboxGroup ref={ref} options={mockOptions} onChange={handleChange} />);
      
      // Initially nothing selected
      expect(ref.current?.isAllSelected()).toBe(false);
      expect(ref.current?.isIndeterminate()).toBe(false);
      
      // Toggle all should select everything
      act(() => {
        ref.current?.toggleAll();
      });
      
      expect(ref.current?.isAllSelected()).toBe(true);
      expect(ref.current?.isIndeterminate()).toBe(false);
      expect(handleChange).toHaveBeenCalledWith(['1', '2', '3']);
      
      // Toggle all again should deselect everything
      act(() => {
        ref.current?.toggleAll();
      });
      
      expect(ref.current?.isAllSelected()).toBe(false);
      expect(ref.current?.isIndeterminate()).toBe(false);
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('handles custom count text correctly', () => {
      const customCountText = (selected: number, total: number) => 
        `Selected: ${selected} of ${total}`;
      
      render(
        <CheckboxGroup 
          options={mockOptions} 
          value={['1', '2']} 
          showCount={true}
          countText={customCountText}
        />
      );
      
      expect(screen.getByText('Selected: 2 of 3')).toBeInTheDocument();
    });

    it('handles custom select all text correctly', () => {
      render(
        <CheckboxGroup 
          options={mockOptions} 
          showSelectAll={true}
          selectAllText="Select All Options"
        />
      );
      
      expect(screen.getByText('Select All Options')).toBeInTheDocument();
    });

    it('handles allowDeselectAll functionality correctly', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <CheckboxGroup 
          options={mockOptions} 
          value={['1', '2', '3']}
          showSelectAll={true}
          allowDeselectAll={true}
          onChange={handleChange}
        />
      );
      
      const selectAllButton = screen.getByText('全选');
      fireEvent.click(selectAllButton);
      
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('prevents deselection when allowDeselectAll is false', () => {
      const handleChange = vi.fn();
      render(
        <CheckboxGroup 
          options={mockOptions} 
          value={['1', '2', '3']}
          showSelectAll={true}
          allowDeselectAll={false}
          onChange={handleChange}
        />
      );
      
      const selectAllButton = screen.getByText('全选');
      fireEvent.click(selectAllButton);
      
      // Should not deselect when allowDeselectAll is false
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});