import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Input, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { inputStyles } from './Input.styles';
import type { InputProps, InputRef, InputSize, InputType, InputVariant, InputStatus } from './Input.types';

/** 输入框组件 */
export const InputComponent = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    placeholder,
    size = 'md',
    type = 'text',
    variant = 'outlined',
    status: propStatus = 'normal',
    disabled = false,
    readonly = false,
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
    autoFocus = false,
    bordered = true,
    showPasswordToggle = false,
    className,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onConfirm,
    onInput,
    onKeyboardHeightChange,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'textbox',
    accessibilityState,
    rules,
    validateTrigger = 'onBlur',
    immediate = false,
    multiline = false,
    rows = 3,
    autoHeight = false,
    showWordLimit = false,
    validator,
    ...restProps
  } = props;

  const nativeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalStatus, setInternalStatus] = useState<InputStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);

  // 处理受控/非受控模式
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(propStatus);
  }, [propStatus]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setInternalReadonly(readonly);
  }, [readonly]);

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  }, [autoFocus]);

  // 立即验证
  useEffect(() => {
    if (immediate && value) {
      validateInput(value);
    }
  }, [immediate, value]);

  // 验证输入值
  const validateInput = useCallback(
    async (inputValue: string): Promise<{ valid: boolean; message?: string }> => {
      if (!rules && !validator) {
        return { valid: true };
      }

      // 验证必填
      if (rules?.some((rule) => rule.required && !inputValue.trim())) {
        const requiredRule = rules.find((rule) => rule.required);
        return { valid: false, message: requiredRule?.message || '此字段为必填项' };
      }

      // 验证长度
      if (minLength !== undefined && inputValue.length < minLength) {
        return { valid: false, message: `最少需要${minLength}个字符` };
      }

      if (maxLength !== undefined && inputValue.length > maxLength) {
        return { valid: false, message: `最多允许${maxLength}个字符` };
      }

      // 验证规则
      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (rule.pattern && !rule.pattern.test(inputValue)) {
            return { valid: false, message: rule.message || '输入格式不正确' };
          }
          if (rule.validator) {
            const result = await rule.validator(inputValue);
            if (typeof result === 'string') {
              return { valid: false, message: result };
            }
            if (!result) {
              return { valid: false, message: rule.message || '输入格式不正确' };
            }
          }
        }
      }

      // 自定义验证函数
      if (validator) {
        const result = await validator(inputValue);
        if (typeof result === 'string') {
          return { valid: false, message: result };
        }
        if (!result) {
          return { valid: false, message: '验证失败' };
        }
      }

      return { valid: true };
    },
    [rules, validator, minLength, maxLength],
  );

  // 格式化输入值
  const formatInputValue = useCallback(
    (inputValue: string): string => {
      let formattedValue = inputValue;

      // 根据类型格式化输入
      switch (type) {
        case 'number':
        case 'digit':
          formattedValue = inputValue.replace(/[^\d.-]/g, '');
          break;
        case 'tel':
          formattedValue = inputValue.replace(/[^\d]/g, '');
          break;
        case 'idcard':
          formattedValue = inputValue.replace(/[^\dxX]/g, '');
          break;
        case 'email':
          // 不自动格式化邮箱，让用户自由输入
          break;
        default:
          break;
      }

      // 限制长度
      if (maxLength && formattedValue.length > maxLength) {
        formattedValue = formattedValue.slice(0, maxLength);
      }

      return formattedValue;
    },
    [type, maxLength],
  );

  // 处理值变化
  const handleValueChange = useCallback(
    async (newValue: string, event: ITouchEvent) => {
      const formattedValue = formatInputValue(newValue);

      if (!isControlled) {
        setInternalValue(formattedValue);
      }

      // 触发输入事件
      onInput?.(formattedValue, event);

      // 验证输入
      if (validateTrigger === 'onChange') {
        const result = await validateInput(formattedValue);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }

      // 触发变化事件
      onChange?.(formattedValue, event);
    },
    [isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange],
  );

  // 处理聚焦事件
  const handleFocus = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(true);
      onFocus?.(event);

      // 聚焦时验证
      if (validateTrigger === 'onFocus') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onFocus, validateTrigger, validateInput, value],
  );

  // 处理失焦事件
  const handleBlur = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(false);
      onBlur?.(event);

      // 失焦时验证
      if (validateTrigger === 'onBlur') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onBlur, validateTrigger, validateInput, value],
  );

  // 处理确认事件
  const handleConfirm = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      onConfirm?.(value as string, event);

      // 确认时验证
      if (validateTrigger === 'onSubmit') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }
    },
    [internalDisabled, internalReadonly, onConfirm, validateTrigger, validateInput, value],
  );

  // 处理清除事件
  const handleClear = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      const emptyValue = '';
      if (!isControlled) {
        setInternalValue(emptyValue);
      }

      setValidationResult(null);
      setInternalStatus('normal');
      onClear?.(event);
      onChange?.(emptyValue, event);
    },
    [internalDisabled, internalReadonly, isControlled, onClear, onChange],
  );

  // 处理密码切换
  const handlePasswordToggle = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // 计算是否显示清除按钮
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

  // 计算最终状态
  const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: nativeInputRef.current,
      getValue: () => value as string,
      setValue: (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
      },
      focus: () => {
        if (nativeInputRef.current && !internalDisabled && !internalReadonly) {
          nativeInputRef.current.focus();
        }
      },
      blur: () => {
        if (nativeInputRef.current) {
          nativeInputRef.current.blur();
        }
      },
      select: () => {
        if (nativeInputRef.current) {
          nativeInputRef.current.select();
        }
      },
      setSelectionRange: (start: number, end: number) => {
        if (nativeInputRef.current && 'setSelectionRange' in nativeInputRef.current) {
          nativeInputRef.current.setSelectionRange(start, end);
        }
      },
      getSelectionRange: () => {
        if (nativeInputRef.current && 'selectionStart' in nativeInputRef.current) {
          return {
            start: nativeInputRef.current.selectionStart || 0,
            end: nativeInputRef.current.selectionEnd || 0,
          };
        }
        return { start: 0, end: 0 };
      },
      setDisabled: (newDisabled: boolean) => {
        setInternalDisabled(newDisabled);
      },
      setReadonly: (newReadonly: boolean) => {
        setInternalReadonly(newReadonly);
      },
      setStatus: (newStatus: InputStatus) => {
        setInternalStatus(newStatus);
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        return result;
      },
      clear: () => {
        handleClear({} as ITouchEvent);
      },
      reset: () => {
        if (!isControlled) {
          setInternalValue(defaultValue);
        }
        setValidationResult(null);
        setInternalStatus('normal');
      },
    }),
    [value, isControlled, internalDisabled, internalReadonly, validateInput, handleClear, defaultValue, finalStatus],
  );

  // 生成输入框样式
  const inputStyle = inputStyles.getStyle({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    multiline,
    translate: 'no' as const,
    ...style,
  });

  // 生成输入框类名
  const inputClassName = inputStyles.getClassName({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    bordered,
    multiline,
    clearable: shouldShowClear(),
    className,
  });

  // 生成多行输入框样式
  const multilineStyle = multiline
    ? inputStyles.getMultilineStyle({
        size,
        rows,
        autoHeight,
      })
    : {};

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    readonly: internalReadonly,
    required: rules?.some((rule) => rule.required),
    invalid: validationResult?.valid === false,
    ...accessibilityState,
  };

  // 计算字符长度
  const calculateLength = (text: string) => {
    if (type === 'idcard') {
      // 身份证号，每个字符算一个长度
      return text.length;
    } else if (type === 'tel') {
      // 手机号，每个数字算一个长度
      return text.replace(/\D/g, '').length;
    } else {
      // 其他类型，中文字符算2个长度，其他算1个
      return Array.from(text).reduce((len, char) => {
        return len + (char.charCodeAt(0) > 127 ? 2 : 1);
      }, 0);
    }
  };

  const currentLength = calculateLength(value as string);
  const maxLengthToShow = maxLength || (type === 'tel' ? 11 : type === 'idcard' ? 18 : undefined);

  return (
    <View style={inputStyles.getContainerStyle({ size, block: props.block, style: props.containerStyle })}>
      {/* 标签 */}
      {label && <Text style={inputStyles.getLabelStyle({ size, disabled: internalDisabled })}>{label}</Text>}

      {/* 输入框包装器 */}
      <View
        style={inputStyles.getWrapperStyle({
          size,
          status: finalStatus,
          disabled: internalDisabled,
          readonly: internalReadonly,
          bordered,
          isFocused,
        })}
      >
        {/* 前缀 */}
        {prefix && <View style={inputStyles.getPrefixStyle({ size, disabled: internalDisabled })}>{prefix}</View>}

        {/* 输入框 */}
        <Input
          ref={nativeInputRef}
          className={inputClassName}
          style={{ ...inputStyle, ...multilineStyle }}
          value={value}
          placeholder={placeholder}
          type={showPassword ? 'text' : type}
          disabled={internalDisabled}
          readonly={internalReadonly}
          maxLength={maxLength}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
          onInput={(e) => handleValueChange(e.detail.value, e)}
          onKeyboardHeightChange={(e) => onKeyboardHeightChange?.(e.detail.height, e)}
          accessible={accessible}
          aria-label={accessibilityLabel}
          aria-role={accessibilityRole}
          aria-state={finalAccessibilityState}
          {...restProps}
        />

        {/* 后缀 */}
        <View style={inputStyles.getSuffixStyle({ size, disabled: internalDisabled })}>
          {/* 清除按钮 */}
          {shouldShowClear() && (
            <View style={inputStyles.getClearButtonStyle({ size })} onClick={handleClear}>
              <Text>×</Text>
            </View>
          )}

          {/* 密码切换按钮 */}
          {showPasswordToggle && type === 'password' && (
            <View style={inputStyles.getPasswordToggleStyle({ size })} onClick={handlePasswordToggle}>
              <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </View>
          )}

          {/* 自定义后缀 */}
          {suffix && <View>{suffix}</View>}
        </View>
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={inputStyles.getHelperTextStyle({ size, status: finalStatus })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && <Text style={inputStyles.getErrorTextStyle({ size })}>{errorText}</Text>}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={inputStyles.getErrorTextStyle({ size })}>{validationResult.message}</Text>
      )}

      {/* 字数统计 */}
      {(showCount || showWordLimit) && maxLengthToShow && (
        <Text style={inputStyles.getCounterStyle({ size })}>
          {currentLength}/{maxLengthToShow}
        </Text>
      )}
    </View>
  );
});

/** 输入框组件显示名称 */
InputComponent.displayName = 'Input';

/** 导出输入框组件 */
export const Input = InputComponent;
