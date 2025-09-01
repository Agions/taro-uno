import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Textarea as TaroTextarea, View, Text } from '@tarojs/components';
import { textareaStyles } from './Textarea.styles';
import type { 
  TextareaProps, 
  TextareaRef, 
  TextareaStatus,
  TextareaValidationResult 
} from './Textarea.types';

/** 文本域组件 */
export const TextareaComponent = forwardRef<TextareaRef, TextareaProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    placeholder,
    size = 'md',
    variant = 'outlined',
    status: propStatus = 'normal',
    disabled = false,
    readonly = false,
    clearable = false,
    clearTrigger = 'focus',
    maxLength,
    minLength,
    rows = 3,
    minRows = 1,
    maxRows = 10,
    autoHeight = false,
    autoHeightStrategy = 'content',
    resize = 'vertical',
    showCount = false,
    counterPosition = 'bottom-right',
    showWordLimit = false,
    autoFocus = false,
    bordered = true,
    label,
    helperText,
    errorText,
    prefix,
    suffix,
    rules,
    validateTrigger = 'onBlur',
    immediate = false,
    validator,
    onChange,
    onFocus,
    onBlur,
    onInput,
    onClear,
    onConfirm,
    onKeyboardHeightChange,
    onHeightChange,
    onValidate,
    className,
    style,
    containerClassName,
    containerStyle,
    block = true,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'textbox',
    accessibilityState,
    ...restProps
  } = props;

  const nativeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [internalStatus, setInternalStatus] = useState<TextareaStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<TextareaValidationResult | null>(null);
  const [currentHeight, setCurrentHeight] = useState(0);

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
    if (autoFocus && nativeTextareaRef.current) {
      nativeTextareaRef.current.focus();
    }
  }, [autoFocus]);

  // 立即验证
  useEffect(() => {
    if (immediate && value) {
      validateInput(value);
    }
  }, [immediate, value]);

  // 自动调整高度
  useEffect(() => {
    if (autoHeight && nativeTextareaRef.current) {
      adjustTextareaHeight();
    }
  }, [value, autoHeight, autoHeightStrategy, rows, minRows, maxRows]);

  // 验证输入值
  const validateInput = useCallback(
    async (inputValue: string): Promise<TextareaValidationResult> => {
      if (!rules && !validator) {
        return { valid: true, value: inputValue, timestamp: Date.now() };
      }

      // 验证必填
      if (rules?.some((rule) => rule.required && !inputValue.trim())) {
        const requiredRule = rules.find((rule) => rule.required);
        return { 
          valid: false, 
          message: requiredRule?.message || '此字段为必填项', 
          value: inputValue, 
          timestamp: Date.now() 
        };
      }

      // 验证长度
      if (minLength !== undefined && inputValue.length < minLength) {
        return { 
          valid: false, 
          message: `最少需要${minLength}个字符`, 
          value: inputValue, 
          timestamp: Date.now() 
        };
      }

      if (maxLength !== undefined && inputValue.length > maxLength) {
        return { 
          valid: false, 
          message: `最多允许${maxLength}个字符`, 
          value: inputValue, 
          timestamp: Date.now() 
        };
      }

      // 验证规则
      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (rule.pattern && !rule.pattern.test(inputValue)) {
            return { 
              valid: false, 
              message: rule.message || '输入格式不正确', 
              ruleIndex: i,
              value: inputValue, 
              timestamp: Date.now() 
            };
          }
          if (rule.validator) {
            const result = await rule.validator(inputValue);
            if (typeof result === 'string') {
              return { 
                valid: false, 
                message: result, 
                ruleIndex: i,
                value: inputValue, 
                timestamp: Date.now() 
              };
            }
            if (!result) {
              return { 
                valid: false, 
                message: rule.message || '输入格式不正确', 
                ruleIndex: i,
                value: inputValue, 
                timestamp: Date.now() 
              };
            }
          }
        }
      }

      // 自定义验证函数
      if (validator) {
        const result = await validator(inputValue);
        if (typeof result === 'string') {
          return { 
            valid: false, 
            message: result, 
            value: inputValue, 
            timestamp: Date.now() 
          };
        }
        if (!result) {
          return { 
            valid: false, 
            message: '验证失败', 
            value: inputValue, 
            timestamp: Date.now() 
          };
        }
      }

      return { valid: true, value: inputValue, timestamp: Date.now() };
    },
    [rules, validator, minLength, maxLength],
  );

  // 格式化输入值
  const formatInputValue = useCallback(
    (inputValue: string): string => {
      let formattedValue = inputValue;

      // 限制长度
      if (maxLength && formattedValue.length > maxLength) {
        formattedValue = formattedValue.slice(0, maxLength);
      }

      return formattedValue;
    },
    [maxLength],
  );

  // 调整文本域高度
  const adjustTextareaHeight = useCallback(() => {
    if (!nativeTextareaRef.current || !autoHeight) return;

    const element = nativeTextareaRef.current;
    const previousHeight = element.offsetHeight;
    
    textareaStyles.adjustTextareaHeight(element, autoHeightStrategy, rows, minRows, maxRows);
    
    const newHeight = element.offsetHeight;
    if (previousHeight !== newHeight) {
      setCurrentHeight(newHeight);
      onHeightChange?.(newHeight, {} as any);
    }
  }, [autoHeight, autoHeightStrategy, rows, minRows, maxRows, onHeightChange]);

  // 处理值变化
  const handleValueChange = useCallback(
    async (newValue: string, event: any) => {
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
        onValidate?.(result);
      }

      // 触发变化事件
      onChange?.(formattedValue, event);
    },
    [isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange, onValidate],
  );

  // 处理聚焦事件
  const handleFocus = useCallback(
    async (event: any) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(true);
      onFocus?.(event);

      // 聚焦时验证
      if (validateTrigger === 'onFocus') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [internalDisabled, internalReadonly, onFocus, validateTrigger, validateInput, value, onValidate],
  );

  // 处理失焦事件
  const handleBlur = useCallback(
    async (event: any) => {
      if (internalDisabled || internalReadonly) return;

      setIsFocused(false);
      onBlur?.(event);

      // 失焦时验证
      if (validateTrigger === 'onBlur') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [internalDisabled, internalReadonly, onBlur, validateTrigger, validateInput, value, onValidate],
  );

  // 处理确认事件
  const handleConfirm = useCallback(
    async (event: any) => {
      if (internalDisabled || internalReadonly) return;

      onConfirm?.(value as string, event);

      // 确认时验证
      if (validateTrigger === 'onSubmit') {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
      }
    },
    [internalDisabled, internalReadonly, onConfirm, validateTrigger, validateInput, value, onValidate],
  );

  // 处理清除事件
  const handleClear = useCallback(
    (event: any) => {
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

  // 计算字符长度
  const calculateLength = useCallback((text: string) => {
    // 中文字符算2个长度，其他算1个
    return Array.from(text).reduce((len, char) => {
      return len + (char.charCodeAt(0) > 127 ? 2 : 1);
    }, 0);
  }, []);

  const currentLength = calculateLength(value as string);
  const maxLengthToShow = maxLength;

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: nativeTextareaRef.current,
      getValue: () => value as string,
      setValue: (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
      },
      focus: () => {
        if (nativeTextareaRef.current && !internalDisabled && !internalReadonly) {
          nativeTextareaRef.current.focus();
        }
      },
      blur: () => {
        if (nativeTextareaRef.current) {
          nativeTextareaRef.current.blur();
        }
      },
      select: () => {
        if (nativeTextareaRef.current) {
          nativeTextareaRef.current.select();
        }
      },
      setSelectionRange: (start: number, end: number) => {
        if (nativeTextareaRef.current && 'setSelectionRange' in nativeTextareaRef.current) {
          nativeTextareaRef.current.setSelectionRange(start, end);
        }
      },
      getSelectionRange: () => {
        if (nativeTextareaRef.current && 'selectionStart' in nativeTextareaRef.current) {
          return {
            start: nativeTextareaRef.current.selectionStart || 0,
            end: nativeTextareaRef.current.selectionEnd || 0,
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
      setStatus: (newStatus: TextareaStatus) => {
        setInternalStatus(newStatus);
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateInput(value as string);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
        return result;
      },
      clear: () => {
        handleClear({} as any);
      },
      reset: () => {
        if (!isControlled) {
          setInternalValue(defaultValue);
        }
        setValidationResult(null);
        setInternalStatus('normal');
      },
      adjustHeight: adjustTextareaHeight,
      getHeight: () => currentHeight,
      getScrollHeight: () => nativeTextareaRef.current?.scrollHeight || 0,
      scrollToBottom: () => {
        if (nativeTextareaRef.current) {
          nativeTextareaRef.current.scrollTop = nativeTextareaRef.current.scrollHeight;
        }
      },
      scrollToTop: () => {
        if (nativeTextareaRef.current) {
          nativeTextareaRef.current.scrollTop = 0;
        }
      },
      getValidationResult: () => validationResult,
    }),
    [value, isControlled, internalDisabled, internalReadonly, validateInput, handleClear, defaultValue, finalStatus, adjustTextareaHeight, currentHeight, validationResult, onValidate],
  );

  // 生成文本域样式
  const textareaStyle = textareaStyles.getStyle({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    resize,
    ...style,
  });

  // 生成文本域类名
  const textareaClassName = textareaStyles.getClassName({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    bordered,
    clearable: shouldShowClear(),
    autoHeight,
    showCount,
    className,
  });

  // 生成自动调整高度样式
  const autoHeightStyle = autoHeight
    ? textareaStyles.getAutoHeightStyle({
        size,
        minRows,
        maxRows,
      })
    : {};

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    readonly: internalReadonly,
    required: rules?.some((rule) => rule.required),
    invalid: validationResult?.valid === false,
    multiline: true,
    ...accessibilityState,
  };

  return (
    <View 
      className={containerClassName}
      style={textareaStyles.getContainerStyle({ size, block, style: containerStyle })}
    >
      {/* 标签 */}
      {label && <Text style={textareaStyles.getLabelStyle({ size, disabled: internalDisabled })}>{label}</Text>}

      {/* 文本域包装器 */}
      <View
        style={textareaStyles.getWrapperStyle({
          size,
          status: finalStatus,
          disabled: internalDisabled,
          readonly: internalReadonly,
          bordered,
          autoHeight,
          rows,
        })}
      >
        {/* 前缀 */}
        {prefix && <View style={textareaStyles.getPrefixStyle({ size, disabled: internalDisabled })}>{prefix}</View>}

        {/* 文本域 */}
        <TaroTextarea
          ref={nativeTextareaRef}
          className={textareaClassName}
          style={{ ...textareaStyle, ...autoHeightStyle }}
          value={value}
          placeholder={placeholder}
          disabled={internalDisabled}
          readonly={internalReadonly}
          maxLength={maxLength}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
          onInput={(e: any) => handleValueChange(e.detail.value, e)}
          onKeyboardHeightChange={(e: any) => onKeyboardHeightChange?.(e.detail.height, e)}
          accessible={accessible}
          aria-label={accessibilityLabel}
          aria-role={accessibilityRole}
          aria-state={finalAccessibilityState}
          {...restProps}
        />

        {/* 后缀 */}
        {suffix && <View style={textareaStyles.getSuffixStyle({ size, disabled: internalDisabled })}>{suffix}</View>}

        {/* 清除按钮 */}
        {shouldShowClear() && (
          <View 
            style={textareaStyles.getClearButtonStyle({ size })} 
            onClick={handleClear}
          >
            <Text>×</Text>
          </View>
        )}

        {/* 字符计数 */}
        {(showCount || showWordLimit) && maxLengthToShow && (
          <View style={textareaStyles.getCounterStyle({ size, position: counterPosition })}>
            <Text>{currentLength}/{maxLengthToShow}</Text>
          </View>
        )}
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={textareaStyles.getHelperTextStyle({ size, status: finalStatus })}>
          {helperText}
        </Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && (
        <Text style={textareaStyles.getErrorTextStyle({ size })}>
          {errorText}
        </Text>
      )}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={textareaStyles.getErrorTextStyle({ size })}>
          {validationResult.message}
        </Text>
      )}
    </View>
  );
});

/** 文本域组件显示名称 */
TextareaComponent.displayName = 'Textarea';

/** 导出文本域组件 */
export const Textarea = TextareaComponent;