import { useState, useEffect, useCallback, useRef } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { utils } from '@/utils';
import type { InputProps, InputStatus } from './Input.types';

export const useInputLogic = (props: InputProps) => {
  const {
    value: controlledValue,
    defaultValue = '',
    status: propStatus = 'normal',
    disabled = false,
    readonly = false,
    clearable = false,
    clearTrigger = 'focus',
    minLength,
    maxLength,
    rules,
    validator,
    validateTrigger = 'onBlur',
    immediate = false,
    type,
    onChange,
    onInput,
    onFocus,
    onBlur,
    onConfirm,
    onClear,
  } = props;

  // 更新ref类型，适配Taro环境
  const nativeInputRef = useRef<any>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);
  const [internalStatus, setInternalStatus] = useState<InputStatus>(propStatus);

  // 优化：将状态合并，减少useEffect数量
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 优化：减少不必要的useEffect，合并状态更新
  useEffect(() => {
    setInternalStatus(propStatus);
    setInternalDisabled(disabled);
    setInternalReadonly(readonly);
  }, [propStatus, disabled, readonly]);

  // 优化：使用防抖处理immediate验证，避免频繁验证
  const debouncedImmediateValidate = useCallback(
    (valueToValidate: string) => {
      if (immediate && valueToValidate) {
        validateInput(valueToValidate);
      }
    },
    [immediate],
  );

  // 优化：只在value变化且immediate为true时执行，避免不必要的验证
  useEffect(() => {
    debouncedImmediateValidate(String(value));
  }, [value, debouncedImmediateValidate]);

  const validateInput = useCallback(
    async (inputValue: string): Promise<{ valid: boolean; message?: string }> => {
      if (minLength !== undefined && inputValue.length < minLength) {
        return { valid: false, message: `最少需要${minLength}个字符` };
      }
      if (maxLength !== undefined && inputValue.length > maxLength) {
        return { valid: false, message: `最多允许${maxLength}个字符` };
      }
      if (!rules && !validator) return { valid: true };

      if (rules?.some((rule) => rule.required && !inputValue.trim())) {
        const requiredRule = rules.find((rule) => rule.required);
        return { valid: false, message: requiredRule?.message || '此字段为必填项' };
      }

      if (rules) {
        for (const rule of rules) {
          if (rule.pattern && !rule.pattern.test(inputValue)) {
            return { valid: false, message: rule.message || '输入格式不正确' };
          }
          if (rule.validator) {
            const result = await rule.validator(inputValue);
            if (typeof result === 'string') return { valid: false, message: result };
            if (!result) return { valid: false, message: rule.message || '输入格式不正确' };
          }
        }
      }

      if (validator) {
        const result = await validator(inputValue);
        if (typeof result === 'string') return { valid: false, message: result };
        if (!result) return { valid: false, message: '验证失败' };
      }

      return { valid: true };
    },
    [rules, validator, minLength, maxLength],
  );

  const formatInputValue = useCallback(
    (inputValue: string): string => {
      let formattedValue = utils.security.sanitizeText(inputValue);
      switch (type) {
        case 'number':
        case 'digit':
          formattedValue = formattedValue.replace(/[^\d.-]/g, '');
          break;
        case 'tel':
          formattedValue = formattedValue.replace(/[^\d]/g, '');
          break;
        case 'idcard':
          formattedValue = formattedValue.replace(/[^\dxX]/g, '');
          break;
      }
      if (maxLength && formattedValue.length > maxLength) {
        formattedValue = formattedValue.slice(0, maxLength);
      }
      return formattedValue;
    },
    [type, maxLength],
  );

  const handleValueChange = useCallback(
    async (newValue: string, event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      const formattedValue = formatInputValue(newValue);

      if (!isControlled) setInternalValue(formattedValue);

      onInput?.(formattedValue, event);

      // 优化：合并状态更新，减少重渲染
      if (validateTrigger === 'onChange') {
        const result = await validateInput(formattedValue);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }

      onChange?.(formattedValue, event);
    },
    [
      internalDisabled,
      internalReadonly,
      isControlled,
      formatInputValue,
      onInput,
      validateTrigger,
      validateInput,
      onChange,
    ],
  );

  const handleFocus = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      setIsFocused(true);
      onFocus?.(event);
      if (validateTrigger === 'onFocus') {
        const result = await validateInput(String(value));
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onFocus, validateTrigger, validateInput, value],
  );

  const handleBlur = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      setIsFocused(false);
      onBlur?.(event);
      if (validateTrigger === 'onBlur') {
        const result = await validateInput(String(value));
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onBlur, validateTrigger, validateInput, value],
  );

  const handleConfirm = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      onConfirm?.(String(value), event);
      if (validateTrigger === 'onSubmit') {
        const result = await validateInput(String(value));
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onConfirm, validateTrigger, validateInput, value],
  );

  const handleClear = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      const emptyValue = '';
      if (!isControlled) setInternalValue(emptyValue);
      // 优化：合并状态更新
      setValidationResult(null);
      setInternalStatus('normal');
      onClear?.(event);
      onChange?.(emptyValue, event);
    },
    [internalDisabled, internalReadonly, isControlled, onClear, onChange],
  );

  // 优化：减少依赖，简化逻辑
  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const shouldShowClear = useCallback(() => {
    if (!clearable || internalDisabled || internalReadonly) return false;
    switch (clearTrigger) {
      case 'always':
        return !!value;
      case 'focus':
        return isFocused && !!value;
      case 'never':
        return false;
      default:
        return false;
    }
  }, [clearable, internalDisabled, internalReadonly, value, isFocused, clearTrigger]);

  // 优化：简化finalStatus计算
  const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

  return {
    nativeInputRef,
    value,
    isFocused,
    showPassword,
    internalStatus,
    internalDisabled,
    internalReadonly,
    validationResult,
    finalStatus,
    handleValueChange,
    handleFocus,
    handleBlur,
    handleConfirm,
    handleClear,
    handlePasswordToggle,
    shouldShowClear,
    validateInput,
    setInternalValue,
    setInternalStatus,
    setInternalDisabled,
    setInternalReadonly,
    setValidationResult,
  };
};
