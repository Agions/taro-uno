import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInputLogic } from './useInputLogic';

describe('useInputLogic', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useInputLogic({ defaultValue: 'initial' }));
    expect(result.current.value).toBe('initial');
  });

  it('should handle controlled value', () => {
    const { result } = renderHook(() => useInputLogic({ value: 'controlled' }));
    expect(result.current.value).toBe('controlled');
  });

  it('should update internal value when uncontrolled', async () => {
    const { result } = renderHook(() => useInputLogic({}));

    await act(async () => {
      await result.current.handleValueChange('new value', {} as any);
    });

    expect(result.current.value).toBe('new value');
  });

  it('should call onChange handler', async () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useInputLogic({ onChange }));

    await act(async () => {
      await result.current.handleValueChange('test', {} as any);
    });

    expect(onChange).toHaveBeenCalledWith('test', expect.anything());
  });

  it('should validate required field', async () => {
    const { result } = renderHook(() => useInputLogic({
      rules: [{ required: true, message: 'Required' }]
    }));

    await act(async () => {
      const validation = await result.current.validateInput('');
      expect(validation.valid).toBe(false);
      expect(validation.message).toBe('Required');
    });
  });

  it('should validate pattern', async () => {
    const { result } = renderHook(() => useInputLogic({
      rules: [{ pattern: /^\d+$/, message: 'Numbers only' }]
    }));

    await act(async () => {
      const validation = await result.current.validateInput('abc');
      expect(validation.valid).toBe(false);
      expect(validation.message).toBe('Numbers only');
    });
  });

  it('should toggle password visibility', () => {
    const { result } = renderHook(() => useInputLogic({ type: 'password' }));

    expect(result.current.showPassword).toBe(false);

    act(() => {
      result.current.handlePasswordToggle();
    });

    expect(result.current.showPassword).toBe(true);
  });

  it('should clear value', () => {
    const { result } = renderHook(() => useInputLogic({ defaultValue: 'test', clearable: true }));

    act(() => {
      result.current.handleClear({} as any);
    });

    expect(result.current.value).toBe('');
  });
});
