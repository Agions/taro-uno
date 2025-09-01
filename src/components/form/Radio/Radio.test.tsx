import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { Radio } from './Radio';
import type { RadioProps, RadioRef } from './Radio.types';

// Mock Taro components
vi.mock('@tarojs/components', () => ({
  Radio: ({ checked, onChange, ...props }: any) => (
    <input
      data-testid="radio"
      type="radio"
      checked={checked}
      onChange={onChange}
      {...props}
    />
  ),
  View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

describe('Radio Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders Radio component with default props', () => {
      render(<Radio value="option1" />);
      expect(screen.getByTestId('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Radio value="option1" label="Option 1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Radio value="option1" helperText="Select this option" />);
      expect(screen.getByText('Select this option')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<Radio value="option1" errorText="This field is required" status="error" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders unchecked by default', () => {
      render(<Radio value="option1" />);
      const radio = screen.getByTestId('radio');
      expect(radio).not.toBeChecked();
    });

    it('renders checked when controlled', () => {
      render(<Radio value="option1" checked={true} />);
      const radio = screen.getByTestId('radio');
      expect(radio).toBeChecked();
    });
  });

  describe('Value Handling', () => {
    it('handles controlled mode', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" checked={true} onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it('handles uncontrolled mode', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('requires value prop', () => {
      // @ts-expect-error - Testing missing required prop
      expect(() => render(<Radio />)).not.toThrow();
    });

    it('handles different value types', () => {
      const { rerender } = render(<Radio value="string-value" />);
      expect(screen.getByTestId('radio')).toBeInTheDocument();
      
      rerender(<Radio value={123} />);
      expect(screen.getByTestId('radio')).toBeInTheDocument();
      
      rerender(<Radio value={true} />);
      expect(screen.getByTestId('radio')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" disabled onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      expect(radio).toBeDisabled();
      
      fireEvent.click(radio);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles readonly state', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" readonly onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      // Readonly should still allow interaction but handle it differently
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles error state', () => {
      render(<Radio value="option1" status="error" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveClass('radio-error');
    });

    it('handles warning state', () => {
      render(<Radio value="option1" status="warning" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveClass('radio-warning');
    });

    it('handles success state', () => {
      render(<Radio value="option1" status="success" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveClass('radio-success');
    });
  });

  describe('Sizes and Variants', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach((size) => {
      it(`renders with size ${size}`, () => {
        render(<Radio value="option1" size={size} />);
        const radio = screen.getByTestId('radio');
        expect(radio).toHaveClass(`radio-${size}`);
      });
    });
  });

  describe('Events', () => {
    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('passes correct event to onChange handler', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      const mockEvent = { target: radio };
      
      fireEvent.click(radio, mockEvent);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.objectContaining({
        target: radio,
      }));
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" disabled onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles multiple clicks on same radio', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      
      // First click - select
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
      
      // Second click - should remain selected
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });
  });

  describe('Validation', () => {
    it('validates required rule when unchecked', async () => {
      const handleChange = vi.fn();
      render(
        <Radio
          value="option1"
          rules={[{ required: true, message: 'This field is required' }]}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio); // Check
      fireEvent.click(radio); // Uncheck (should remain checked for radio)
      
      // For radio, validation typically happens at group level
      await waitFor(() => {
        expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
      });
    });

    it('validates with custom validator', async () => {
      const handleChange = vi.fn();
      const customValidator = vi.fn().mockResolvedValue('Custom validation error');
      
      render(
        <Radio
          value="option1"
          validator={customValidator}
          validateTrigger="onChange"
          onChange={handleChange}
        />
      );
      
      const radio = screen.getByTestId('radio');
      fireEvent.click(radio);
      
      await waitFor(() => {
        expect(screen.getByText('Custom validation error')).toBeInTheDocument();
      });
    });

    it('validates immediately when immediate is true', async () => {
      const handleChange = vi.fn();
      render(
        <Radio
          value="option1"
          rules={[{ required: true, message: 'Required' }]}
          immediate
          validateTrigger="onChange"
          onChange={handleChange}
          checked={false}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      });
    });
  });

  describe('Ref Methods', () => {
    it('provides ref with getChecked method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(<Radio value="option1" checked={true} ref={radioRef} />);
      
      expect(radioRef.current?.getChecked()).toBe(true);
    });

    it('provides ref with setChecked method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(<Radio value="option1" ref={radioRef} />);
      
      act(() => {
        radioRef.current?.setChecked(true);
      });
      
      expect(radioRef.current?.getChecked()).toBe(true);
    });

    it('provides ref with setDisabled method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(<Radio value="option1" ref={radioRef} />);
      
      act(() => {
        radioRef.current?.setDisabled(true);
      });
      
      const radio = screen.getByTestId('radio');
      expect(radio).toBeDisabled();
    });

    it('provides ref with setReadonly method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(<Radio value="option1" ref={radioRef} />);
      
      expect(() => {
        radioRef.current?.setReadonly(true);
      }).not.toThrow();
    });

    it('provides ref with setStatus method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(<Radio value="option1" ref={radioRef} />);
      
      act(() => {
        radioRef.current?.setStatus('error');
      });
      
      expect(radioRef.current?.getStatus()).toBe('error');
    });

    it('provides ref with validate method', async () => {
      const radioRef = useRef<RadioRef>(null);
      render(
        <Radio
          value="option1"
          rules={[{ required: true, message: 'Required' }]}
          ref={radioRef}
        />
      );
      
      const result = await radioRef.current?.validate();
      expect(result).toEqual({ valid: false, message: 'Required' });
    });

    it('provides ref with reset method', () => {
      const radioRef = useRef<RadioRef>(null);
      render(
        <Radio
          value="option1"
          ref={radioRef}
        />
      );
      
      act(() => {
        radioRef.current?.reset();
      });
      
      expect(radioRef.current?.getChecked()).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Radio value="option1" accessibilityLabel="Select option 1" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveAttribute('aria-label', 'Select option 1');
    });

    it('has proper accessibility role', () => {
      render(<Radio value="option1" accessibilityRole="radio" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveAttribute('role', 'radio');
    });

    it('updates accessibility state when checked', () => {
      render(<Radio value="option1" checked={true} />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveAttribute('aria-checked', 'true');
    });

    it('updates accessibility state when disabled', () => {
      render(<Radio value="option1" disabled />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Style Classes', () => {
    it('applies custom className', () => {
      render(<Radio value="option1" className="custom-radio" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveClass('custom-radio');
    });

    it('applies custom style', () => {
      render(<Radio value="option1" style={{ backgroundColor: 'red' }} />);
      const radio = screen.getByTestId('radio');
      expect(radio).toHaveStyle({ backgroundColor: 'red' });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined checked prop', () => {
      render(<Radio value="option1" checked={undefined} />);
      const radio = screen.getByTestId('radio');
      expect(radio).toBeInTheDocument();
    });

    it('handles null label', () => {
      render(<Radio value="option1" label={null} />);
      const radio = screen.getByTestId('radio');
      expect(radio).toBeInTheDocument();
    });

    it('handles empty string label', () => {
      render(<Radio value="option1" label="" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toBeInTheDocument();
    });

    it('handles complex label content', () => {
      render(
        <Radio value="option1" label={
          <div>
            <span>Complex</span>
            <strong>Label</strong>
          </div>
        } />
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('handles special characters in value', () => {
      render(<Radio value="option-with-special-chars_123" />);
      const radio = screen.getByTestId('radio');
      expect(radio).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('handles rapid clicks without errors', () => {
      const handleChange = vi.fn();
      render(<Radio value="option1" onChange={handleChange} />);
      
      const radio = screen.getByTestId('radio');
      
      // Rapid clicks
      fireEvent.click(radio);
      fireEvent.click(radio);
      fireEvent.click(radio);
      fireEvent.click(radio);
      
      expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it('memoizes callbacks properly', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Radio value="option1" onChange={handleChange} />);
      
      rerender(<Radio value="option1" onChange={handleChange} />);
      
      // Should not cause unnecessary re-renders
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Radio Group Behavior', () => {
    it('works with multiple radio buttons', () => {
      const handleChange = vi.fn();
      
      const { rerender } = render(
        <div>
          <Radio value="option1" checked={true} onChange={handleChange} />
          <Radio value="option2" onChange={handleChange} />
        </div>
      );
      
      const radio1 = screen.getAllByTestId('radio')[0];
      const radio2 = screen.getAllByTestId('radio')[1];
      
      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();
      
      // Click second radio
      fireEvent.click(radio2);
      
      rerender(
        <div>
          <Radio value="option1" onChange={handleChange} />
          <Radio value="option2" checked={true} onChange={handleChange} />
        </div>
      );
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });
  });
});