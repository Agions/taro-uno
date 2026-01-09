/**
 * Input 组件
 * 使用 createComponent 工厂函数创建，集成 useTheme 和 usePlatform Hooks
 * @module components/form/Input
 */

import { useCallback, useMemo, useImperativeHandle, useState, useEffect, useRef } from 'react';
import { Input as TaroInput, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '../../../utils/createComponent';
import { useTheme } from '../../../hooks/ui/useTheme';
import { usePlatform } from '../../../hooks/ui/usePlatform';
import computeInputStyles, {
  computeContainerStyles,
  computeWrapperStyles,
  computeLabelStyles,
  computeHelperTextStyles,
  computeErrorTextStyles,
  computeCounterStyles,
  computePrefixStyles,
  computeSuffixStyles,
  computeClearButtonStyles,
  computePasswordToggleStyles,
  mergeInputStyles,
} from './Input.styles';
import type { InputProps, InputRef, InputValidationResult } from './Input.types';
import type { Status } from '../../../types/common';

/**
 * Input 组件
 * @description 基础输入框组件，支持多种类型、尺寸、变体和状态
 */
export const Input = createComponent<InputProps, InputRef>({
  name: 'Input',
  defaultProps: {
    type: 'text',
    size: 'md',
    inputVariant: 'outlined',
    status: 'default',
    shape: 'default',
    disabled: false,
    loading: false,
    readOnly: false,
    clearable: false,
    clearTrigger: 'focus',
    bordered: true,
    showPasswordToggle: false,
    showCount: false,
    block: false,
    validateTrigger: 'onBlur',
    immediate: false,
  },
  render: (props, ref) => {
    const {
      type = 'text',
      size = 'md',
      variant: _variant,
      inputVariant = 'outlined',
      status = 'default',
      shape = 'default',
      disabled = false,
      loading = false,
      readOnly = false,
      value: controlledValue,
      defaultValue = '',
      placeholder,
      clearable = false,
      clearTrigger = 'focus',
      maxLength,
      minLength,
      prefix,
      suffix,
      label,
      helperText,
      errorText,
      showCount = false,
      bordered = true,
      showPasswordToggle = false,
      block = false,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onClear,
      onConfirm,
      onInput,
      onKeyboardHeightChange,
      style,
      className = '',
      containerStyle,
      accessibilityLabel,
      accessibilityRole,
      accessibilityState,
      rules,
      validator,
      validateTrigger = 'onBlur',
      immediate = false,
      name,
      required,
      ...rest
    } = props;

    const { theme } = useTheme();
    usePlatform();

    const nativeInputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState<string>(String(defaultValue || ''));
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validationResult, setValidationResult] = useState<InputValidationResult | null>(null);
    const [internalStatus, setInternalStatus] = useState<Status>(status);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? String(controlledValue || '') : internalValue;

    useEffect(() => {
      setInternalStatus(status);
    }, [status]);

    const validateInput = useCallback(
      async (inputValue: string): Promise<InputValidationResult> => {
        const timestamp = Date.now();
        if (minLength !== undefined && inputValue.length < minLength) {
          return { valid: false, message: `最少需要${minLength}个字符`, timestamp };
        }
        if (maxLength !== undefined && inputValue.length > maxLength) {
          return { valid: false, message: `最多允许${maxLength}个字符`, timestamp };
        }
        if (required && !inputValue.trim()) {
          return { valid: false, message: '此字段为必填项', timestamp };
        }
        if (rules) {
          for (const rule of rules) {
            if (rule.required && !inputValue.trim()) {
              return { valid: false, message: rule.message || '此字段为必填项', timestamp };
            }
            if (rule.pattern && !rule.pattern.test(inputValue)) {
              return { valid: false, message: rule.message || '输入格式不正确', timestamp };
            }
            if (rule.validator) {
              const result = await rule.validator(inputValue);
              if (typeof result === 'string') return { valid: false, message: result, timestamp };
              if (!result) return { valid: false, message: rule.message || '验证失败', timestamp };
            }
          }
        }
        if (validator) {
          const result = await validator(inputValue);
          if (typeof result === 'string') return { valid: false, message: result, timestamp };
          if (!result) return { valid: false, message: '验证失败', timestamp };
        }
        return { valid: true, timestamp };
      },
      [rules, validator, minLength, maxLength, required],
    );

    useEffect(() => {
      if (immediate && value) {
        validateInput(value);
      }
    }, [value, immediate, validateInput]);

    const formatInputValue = useCallback(
      (inputValue: string): string => {
        // Simple text sanitization - remove potentially dangerous characters
        let formattedValue = inputValue.replace(/[<>]/g, '');
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
        if (disabled || readOnly || loading) return;
        const formattedValue = formatInputValue(newValue);
        if (!isControlled) setInternalValue(formattedValue);
        onInput?.(formattedValue, event);
        if (validateTrigger === 'onChange') {
          const result = await validateInput(formattedValue);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'default' : 'danger');
        }
        onChange?.(formattedValue);
      },
      [disabled, readOnly, loading, isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange],
    );

    const handleFocus = useCallback(
      async (event: ITouchEvent) => {
        if (disabled || readOnly || loading) return;
        setIsFocused(true);
        onFocus?.(event);
        if (validateTrigger === 'onFocus') {
          const result = await validateInput(value);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'default' : 'danger');
        }
      },
      [disabled, readOnly, loading, onFocus, validateTrigger, validateInput, value],
    );

    const handleBlur = useCallback(
      async (event: ITouchEvent) => {
        if (disabled || readOnly || loading) return;
        setIsFocused(false);
        onBlur?.(event);
        if (validateTrigger === 'onBlur') {
          const result = await validateInput(value);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'default' : 'danger');
        }
      },
      [disabled, readOnly, loading, onBlur, validateTrigger, validateInput, value],
    );

    const handleConfirm = useCallback(
      async (event: ITouchEvent) => {
        if (disabled || readOnly || loading) return;
        onConfirm?.(value, event);
        if (validateTrigger === 'onSubmit') {
          const result = await validateInput(value);
          setValidationResult(result);
          setInternalStatus(result.valid ? 'default' : 'danger');
        }
      },
      [disabled, readOnly, loading, onConfirm, validateTrigger, validateInput, value],
    );

    const handleClear = useCallback(
      (event: ITouchEvent) => {
        if (disabled || readOnly || loading) return;
        if (!isControlled) setInternalValue('');
        setValidationResult(null);
        setInternalStatus('default');
        onClear?.(event);
        onChange?.('');
      },
      [disabled, readOnly, loading, isControlled, onClear, onChange],
    );

    const handlePasswordToggle = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const shouldShowClear = useCallback(() => {
      if (!clearable || disabled || readOnly || loading) return false;
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
    }, [clearable, disabled, readOnly, loading, value, isFocused, clearTrigger]);

    const finalStatus = useMemo(() => {
      if (disabled) return 'default';
      if (validationResult?.valid === false) return 'danger';
      return internalStatus;
    }, [disabled, validationResult, internalStatus]);

    const containerStyles = useMemo(() => computeContainerStyles({ block }, theme), [block, theme]);
    const wrapperStyles = useMemo(
      () => computeWrapperStyles({ size, status: finalStatus, inputVariant, disabled, bordered }, theme),
      [size, finalStatus, inputVariant, disabled, bordered, theme],
    );
    const inputStyle = useMemo(() => {
      const computedStyle = computeInputStyles(
        { size, status: finalStatus, inputVariant, shape, disabled, readOnly, loading, block, bordered },
        theme,
      );
      return mergeInputStyles(computedStyle, style);
    }, [size, finalStatus, inputVariant, shape, disabled, readOnly, loading, block, bordered, theme, style]);
    const labelStyles = useMemo(() => computeLabelStyles({ size, disabled }, theme), [size, disabled, theme]);
    const helperStyles = useMemo(
      () => computeHelperTextStyles({ size, status: finalStatus }, theme),
      [size, finalStatus, theme],
    );
    const errorStyles = useMemo(() => computeErrorTextStyles({ size }, theme), [size, theme]);
    const counterStyles = useMemo(() => computeCounterStyles({ size }, theme), [size, theme]);
    const prefixStyles = useMemo(() => computePrefixStyles({ size, disabled }, theme), [size, disabled, theme]);
    const suffixStyles = useMemo(() => computeSuffixStyles({ size, disabled }, theme), [size, disabled, theme]);
    const clearBtnStyles = useMemo(() => computeClearButtonStyles({ size }, theme), [size, theme]);
    const passwordToggleBtnStyles = useMemo(() => computePasswordToggleStyles({ size }, theme), [size, theme]);

    const currentLength = useMemo(() => (value ? value.length : 0), [value]);

    useImperativeHandle(ref, () => ({
      element: nativeInputRef.current,
      getValue: () => value,
      setValue: (newValue: string) => {
        if (!isControlled) setInternalValue(newValue);
      },
      focus: () => {
        if (nativeInputRef.current && !disabled && !readOnly) nativeInputRef.current.focus();
      },
      blur: () => {
        if (nativeInputRef.current) nativeInputRef.current.blur();
      },
      select: () => {
        if (nativeInputRef.current) nativeInputRef.current.select();
      },
      setSelectionRange: (start: number, end: number) => {
        if (nativeInputRef.current && 'setSelectionRange' in nativeInputRef.current) {
          nativeInputRef.current.setSelectionRange(start, end);
        }
      },
      getSelectionRange: () => {
        if (nativeInputRef.current && 'selectionStart' in nativeInputRef.current) {
          return { start: nativeInputRef.current.selectionStart || 0, end: nativeInputRef.current.selectionEnd || 0 };
        }
        return { start: 0, end: 0 };
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'default' : 'danger');
        return { valid: result.valid, message: result.message };
      },
      clear: () => handleClear({} as ITouchEvent),
      reset: () => {
        if (!isControlled) setInternalValue(String(defaultValue || ''));
        setValidationResult(null);
        setInternalStatus('default');
      },
    }));

    return (
      <View style={{ ...containerStyles, ...containerStyle }} data-testid="input-container">
        {label && <Text style={labelStyles}>{label}</Text>}
        <View style={wrapperStyles}>
          {prefix && <View style={prefixStyles}>{prefix}</View>}
          <TaroInput
            ref={nativeInputRef}
            className={className}
            style={inputStyle}
            value={value}
            placeholder={placeholder}
            type={showPassword ? 'text' : (type as 'text' | 'number' | 'idcard' | 'digit')}
            disabled={disabled || loading}
            maxlength={maxLength}
            name={name}
            onClick={(e) => onClick?.(e as unknown as ITouchEvent)}
            onFocus={(e) => handleFocus(e as unknown as ITouchEvent)}
            onBlur={(e) => handleBlur(e as unknown as ITouchEvent)}
            onConfirm={(e) => handleConfirm(e as unknown as ITouchEvent)}
            onInput={(e) => {
              const inputValue =
                (e as unknown as { detail?: { value?: string }; target?: { value?: string } }).detail?.value ||
                (e as unknown as { target?: { value?: string } }).target?.value ||
                '';
              handleValueChange(inputValue, e as unknown as ITouchEvent);
            }}
            onKeyboardHeightChange={(e) =>
              onKeyboardHeightChange?.(
                (e as unknown as { detail?: { height?: number } }).detail?.height || 0,
                e as unknown as ITouchEvent,
              )
            }
            data-testid="input"
            aria-label={accessibilityLabel}
            aria-disabled={disabled || loading}
            aria-readonly={readOnly}
            aria-required={required}
            aria-invalid={finalStatus === 'danger'}
            {...(accessibilityState && { 'aria-state': accessibilityState })}
            {...rest}
          />
          <View style={suffixStyles}>
            {shouldShowClear() && (
              <View style={clearBtnStyles} onClick={handleClear} data-testid="clear-button">
                <Text>×</Text>
              </View>
            )}
            {showPasswordToggle && type === 'password' && (
              <View style={passwordToggleBtnStyles} onClick={handlePasswordToggle} data-testid="password-toggle">
                <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </View>
            )}
            {suffix && <View>{suffix}</View>}
          </View>
        </View>
        {helperText && finalStatus !== 'danger' && <Text style={helperStyles}>{helperText}</Text>}
        {errorText && finalStatus === 'danger' && <Text style={errorStyles}>{errorText}</Text>}
        {validationResult?.message && finalStatus === 'danger' && !errorText && (
          <Text style={errorStyles}>{validationResult.message}</Text>
        )}
        {showCount && maxLength && (
          <Text style={counterStyles}>
            {currentLength}/{maxLength}
          </Text>
        )}
      </View>
    );
  },
});

Input.displayName = 'Input';

export default Input;
