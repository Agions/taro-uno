/**
 * Form Context
 * 表单上下文，用于在 Form 和 Form.Item 之间共享状态
 * @module components/form/Form/FormContext
 */

import { createContext, useContext } from 'react';
import type { FormContext, FormItemContext, FormFieldStatus } from './Form.types';

/**
 * 表单上下文
 * @description 用于在 Form 组件和子组件之间共享表单状态和方法
 */
export const FormContextProvider = createContext<FormContext | null>(null);

/**
 * 表单项上下文
 * @description 用于在 Form.Item 组件和其子组件之间共享字段状态
 */
export const FormItemContextProvider = createContext<FormItemContext | null>(null);

/**
 * 使用表单上下文 Hook
 * @description 获取表单上下文，用于访问表单状态和方法
 * @returns 表单上下文对象
 * @throws 如果在 Form 组件外部使用会返回 null
 */
export function useFormContext(): FormContext | null {
  return useContext(FormContextProvider);
}

/**
 * 使用表单项上下文 Hook
 * @description 获取表单项上下文，用于访问字段状态
 * @returns 表单项上下文对象
 * @throws 如果在 Form.Item 组件外部使用会返回 null
 */
export function useFormItemContext(): FormItemContext | null {
  return useContext(FormItemContextProvider);
}

/**
 * 使用表单字段 Hook
 * @description 获取指定字段的状态和方法
 * @param name 字段名称
 * @returns 字段状态和方法
 */
export function useFormField(name: string) {
  const formContext = useFormContext();

  if (!formContext) {
    return {
      value: undefined,
      errors: [] as string[],
      touched: false,
      validating: false,
      status: 'normal' as FormFieldStatus,
      setValue: (_value: unknown) => { },
      setError: (_error: string | string[]) => { },
      setTouched: (_touched: boolean) => { },
      validate: async () => ({ valid: true, errors: [] as string[], value: undefined }),
      reset: () => { },
    };
  }

  const field = formContext.getField(name);
  const value = formContext.getFieldValue(name);
  const errors = formContext.getFieldError(name);

  // 计算字段状态
  const getFieldStatus = (): FormFieldStatus => {
    if (field?.validating) return 'validating';
    if (errors.length > 0) return 'error';
    if (field?.touched && errors.length === 0) return 'success';
    return 'normal';
  };

  return {
    value,
    errors,
    touched: field?.touched ?? false,
    validating: field?.validating ?? false,
    status: getFieldStatus(),
    setValue: (newValue: unknown) => formContext.setFieldValue(name, newValue),
    setError: (error: string | string[]) => formContext.setFieldError(name, error),
    setTouched: (touched: boolean) => formContext.setFieldTouched(name, touched),
    validate: () => formContext.validateField(name),
    reset: () => formContext.resetField(name),
  };
}

/**
 * 使用表单状态 Hook
 * @description 获取整个表单的状态
 * @returns 表单状态
 */
export function useFormState() {
  const formContext = useFormContext();

  if (!formContext) {
    return {
      values: {},
      errors: {},
      touched: {},
      validating: {},
      isValid: true,
      isDirty: false,
      isSubmitting: false,
      status: 'normal' as const,
    };
  }

  const { form } = formContext;

  // 检查是否有任何错误
  const hasErrors = Object.values(form.errors).some(
    (fieldErrors) => Array.isArray(fieldErrors) && fieldErrors.length > 0,
  );

  // 检查是否有任何字段被修改
  const isDirty = Object.values(form.touched).some((touched) => touched);

  return {
    values: form.values,
    errors: form.errors,
    touched: form.touched,
    validating: form.validating,
    isValid: !hasErrors,
    isDirty,
    isSubmitting: form.status === 'loading',
    status: form.status,
  };
}

/**
 * 使用表单方法 Hook
 * @description 获取表单操作方法
 * @returns 表单方法
 */
export function useFormMethods() {
  const formContext = useFormContext();

  if (!formContext) {
    return {
      setFieldValue: (_name: string, _value: unknown) => { },
      setFieldError: (_name: string, _error: string | string[]) => { },
      setFieldTouched: (_name: string, _touched: boolean) => { },
      validateField: async (_name: string) => ({ valid: true, errors: [] as string[], value: undefined }),
      resetField: (_name: string) => { },
      getFieldValue: (_name: string) => undefined,
      getFieldError: (_name: string) => [] as string[],
      registerField: (_name: string, _info: unknown) => { },
      unregisterField: (_name: string) => { },
    };
  }

  return {
    setFieldValue: formContext.setFieldValue,
    setFieldError: formContext.setFieldError,
    setFieldTouched: formContext.setFieldTouched,
    validateField: formContext.validateField,
    resetField: formContext.resetField,
    getFieldValue: formContext.getFieldValue,
    getFieldError: formContext.getFieldError,
    registerField: formContext.registerField,
    unregisterField: formContext.unregisterField,
  };
}

/**
 * 使用表单配置 Hook
 * @description 获取表单配置
 * @returns 表单配置
 */
export function useFormConfig() {
  const formContext = useFormContext();

  if (!formContext) {
    return {
      layout: 'horizontal' as const,
      labelAlign: 'right' as const,
      size: 'md' as const,
      labelWidth: undefined,
      labelSuffix: undefined,
      colon: true,
      requiredMark: true,
      validateTrigger: 'onBlur' as const,
      showValidateMessage: true,
      disabled: false,
      readonly: false,
    };
  }

  return formContext.config;
}

// 导出上下文 Provider 名称
FormContextProvider.displayName = 'FormContext';
FormItemContextProvider.displayName = 'FormItemContext';
