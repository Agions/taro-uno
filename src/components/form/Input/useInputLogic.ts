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

  const nativeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalStatus, setInternalStatus] = useState<InputStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  useEffect(() => setInternalStatus(propStatus), [propStatus]);
  useEffect(() => setInternalDisabled(disabled), [disabled]);
  useEffect(() => setInternalReadonly(readonly), [readonly]);

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
    [rules, validator, minLength, maxLength]
  );

  useEffect(() => {
    if (immediate && value) validateInput(String(value));
  }, [immediate, value, validateInput]);

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
    [type, maxLength]
  );

  const handleValueChange = useCallback(
    async (newValue: string, event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      const formattedValue = formatInputValue(newValue);

      if (!isControlled) setInternalValue(formattedValue);

      onInput?.(formattedValue, event);

      if (validateTrigger === 'onChange') {
        const result = await validateInput(formattedValue);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }

      onChange?.(formattedValue, event);
    },
    [internalDisabled, internalReadonly, isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange]
  );

  const handleFocus = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      setIsFocused(true);
      onFocus?.(event);
      if (validateTrigger === 'onFocus') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onFocus, validateTrigger, validateInput, value]
  );

  const handleBlur = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      setIsFocused(false);
      onBlur?.(event);
      if (validateTrigger === 'onBlur') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onBlur, validateTrigger, validateInput, value]
  );

  const handleConfirm = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      onConfirm?.(value as string, event);
      if (validateTrigger === 'onSubmit') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onConfirm, validateTrigger, validateInput, value]
  );

  const handleClear = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;
      const emptyValue = '';
      if (!isControlled) setInternalValue(emptyValue);
      setValidationResult(null);
      setInternalStatus('normal');
      onClear?.(event);
      onChange?.(emptyValue, event);
    },
    [internalDisabled, internalReadonly, isControlled, onClear, onChange]
  );

  const handlePasswordToggle = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  const shouldShowClear = useCallback(() => {
    if (!clearable || internalDisabled || internalReadonly) return false;
    switch (clearTrigger) {
      case 'always': return !!value;
      case 'focus': return isFocused && !!value;
      case 'never': return false;
      default: return false;
    }
  }, [clearable, internalDisabled, internalReadonly, value, isFocused, clearTrigger]);

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
