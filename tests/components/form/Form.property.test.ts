/**
 * Form 组件属性测试
 *
 * Property 10: Compound Component State Sharing
 *
 * Validates: Requirements 6.1, 6.2
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useFormContext,
  useFormField,
  useFormState,
  useFormMethods,
  useFormConfig,
} from '../../../src/components/form/Form/FormContext';

// Property 10: Compound Component State Sharing
// Validates: Requirements 6.1, 6.2
describe('Property 10: Compound Component State Sharing', () => {
  describe('useFormContext', () => {
    it('should return null when used outside Form', () => {
      const { result } = renderHook(() => useFormContext());
      expect(result.current).toBeNull();
    });
  });

  describe('useFormField', () => {
    it('should return default values when used outside Form', () => {
      const { result } = renderHook(() => useFormField('testField'));

      expect(result.current.value).toBeUndefined();
      expect(result.current.errors).toEqual([]);
      expect(result.current.touched).toBe(false);
      expect(result.current.validating).toBe(false);
      expect(result.current.status).toBe('normal');
      expect(typeof result.current.setValue).toBe('function');
      expect(typeof result.current.setError).toBe('function');
      expect(typeof result.current.setTouched).toBe('function');
      expect(typeof result.current.validate).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });

    it('should provide noop functions when outside Form', async () => {
      const { result } = renderHook(() => useFormField('testField'));

      // These should not throw
      result.current.setValue('test');
      result.current.setError('error');
      result.current.setTouched(true);
      result.current.reset();

      const validateResult = await result.current.validate();
      expect(validateResult).toEqual({ valid: true, errors: [], value: undefined });
    });
  });

  describe('useFormState', () => {
    it('should return default state when used outside Form', () => {
      const { result } = renderHook(() => useFormState());

      expect(result.current.values).toEqual({});
      expect(result.current.errors).toEqual({});
      expect(result.current.touched).toEqual({});
      expect(result.current.validating).toEqual({});
      expect(result.current.isValid).toBe(true);
      expect(result.current.isDirty).toBe(false);
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.status).toBe('normal');
    });
  });

  describe('useFormMethods', () => {
    it('should return noop methods when used outside Form', async () => {
      const { result } = renderHook(() => useFormMethods());

      expect(typeof result.current.setFieldValue).toBe('function');
      expect(typeof result.current.setFieldError).toBe('function');
      expect(typeof result.current.setFieldTouched).toBe('function');
      expect(typeof result.current.validateField).toBe('function');
      expect(typeof result.current.resetField).toBe('function');
      expect(typeof result.current.getFieldValue).toBe('function');
      expect(typeof result.current.getFieldError).toBe('function');
      expect(typeof result.current.registerField).toBe('function');
      expect(typeof result.current.unregisterField).toBe('function');

      // These should not throw
      result.current.setFieldValue('test', 'value');
      result.current.setFieldError('test', 'error');
      result.current.setFieldTouched('test', true);
      result.current.resetField('test');
      result.current.registerField('test', {});
      result.current.unregisterField('test');

      expect(result.current.getFieldValue('test')).toBeUndefined();
      expect(result.current.getFieldError('test')).toEqual([]);

      const validateResult = await result.current.validateField('test');
      expect(validateResult).toEqual({ valid: true, errors: [], value: undefined });
    });
  });

  describe('useFormConfig', () => {
    it('should return default config when used outside Form', () => {
      const { result } = renderHook(() => useFormConfig());

      expect(result.current.layout).toBe('horizontal');
      expect(result.current.labelAlign).toBe('right');
      expect(result.current.size).toBe('md');
      expect(result.current.labelWidth).toBeUndefined();
      expect(result.current.labelSuffix).toBeUndefined();
      expect(result.current.colon).toBe(true);
      expect(result.current.requiredMark).toBe(true);
      expect(result.current.validateTrigger).toBe('onBlur');
      expect(result.current.showValidateMessage).toBe(true);
      expect(result.current.disabled).toBe(false);
      expect(result.current.readonly).toBe(false);
    });
  });

  describe('Form Context Hooks Integration', () => {
    it('should all hooks work consistently outside Form context', () => {
      const { result: contextResult } = renderHook(() => useFormContext());
      const { result: fieldResult } = renderHook(() => useFormField('test'));
      const { result: stateResult } = renderHook(() => useFormState());
      const { result: methodsResult } = renderHook(() => useFormMethods());
      const { result: configResult } = renderHook(() => useFormConfig());

      // All should return safe defaults
      expect(contextResult.current).toBeNull();
      expect(fieldResult.current.status).toBe('normal');
      expect(stateResult.current.isValid).toBe(true);
      expect(typeof methodsResult.current.setFieldValue).toBe('function');
      expect(configResult.current.layout).toBe('horizontal');
    });
  });
});
