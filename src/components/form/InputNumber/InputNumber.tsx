import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Input as TaroInput, View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { inputNumberStyles } from './InputNumber.styles';
import type {
  InputNumberProps,
  InputNumberRef,
  InputNumberStatus,
  InputNumberValidationResult,
} from './InputNumber.types';
import { useInputNumberState } from './hooks/useInputNumberState';
import { useInputNumberValidation } from './hooks/useInputNumberValidation';
import { InputNumberControls } from './components/InputNumberControls';
import { InputNumberClearButton } from './components/InputNumberClearButton';

/** 数字输入框组件 */
export const InputNumberComponent = forwardRef<InputNumberRef, InputNumberProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = null,
    placeholder,
    size = 'md',
    variant = 'outlined',
    status: propStatus = 'normal',
    disabled = false,
    readonly = false,
    min,
    max,
    step = 1,
    stepMode = 'continuous',
    precision = 0,
    controls = false,
    controlsPosition = 'end',
    clearable = false,
    clearTrigger = 'focus',
    autoFocus = false,
    bordered = true,
    label,
    helperText,
    errorText,
    prefix,
    suffix,
    formatConfig = { type: 'decimal', precision: 0 },
    rules,
    validateTrigger = 'onBlur',
    immediate = false,
    validator,
    onChange,
    onFocus,
    onBlur,
    onInput,
    onClear,
    onStep,
    onValidate,
    className,
    style,
    containerClassName,
    containerStyle,
    block = true,
    ...restProps
  } = props;

  // 本地状态管理
  const [validationResult, setValidationResult] = useState<InputNumberValidationResult | null>(null);

  // 使用自定义状态管理Hook
  const {
    value,
    displayText,
    isFocused,
    internalStatus,
    internalDisabled,
    internalReadonly,
    nativeInputRef,
    handleValueChange,
    handleTextChange,
    handleFocus,
    handleBlur,
    validateInput,
    setInternalStatus,
    setInternalDisabled,
    setInternalReadonly,
  } = useInputNumberState({
    value: controlledValue,
    defaultValue,
    disabled,
    readonly,
    status: propStatus,
    autoFocus,
    immediate,
    min,
    max,
    precision,
    formatConfig,
    rules,
    validateTrigger,
    validator,
    onValidate,
  });

  // 使用验证Hook
  useInputNumberValidation({
    rules,
    validator,
    min,
    max,
  });

  // 处理值变化（触发外部事件）
  useEffect(() => {
    if (onChange) {
      onChange(value, {} as ITouchEvent);
    }
    if (onInput) {
      onInput(value, {} as ITouchEvent);
    }
  }, [value, onChange, onInput]);

  // 处理清除事件
  const handleClear = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      handleValueChange(null, event);
      setValidationResult(null);
      setInternalStatus('normal');
      onClear?.(event);
    },
    [internalDisabled, internalReadonly, handleValueChange, onClear],
  );

  // 处理步进事件
  const handleStep = useCallback(
    async (direction: 'up' | 'down', event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      const currentValue = value || 0;
      const newValue = direction === 'up' ? currentValue + step : currentValue - step;
      const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
      const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);

      await handleValueChange(roundedValue, event);
      onStep?.(roundedValue, direction, event);
    },
    [internalDisabled, internalReadonly, value, step, min, max, precision, handleValueChange, onStep],
  );

  // 计算是否显示清除按钮
  const shouldShowClear = useCallback(() => {
    if (!clearable || internalDisabled || internalReadonly) return false;

    switch (clearTrigger) {
      case 'always':
        return value !== null;
      case 'focus':
        return isFocused && value !== null;
      case 'never':
        return false;
      default:
        return false;
    }
  }, [clearable, internalDisabled, internalReadonly, value, isFocused, clearTrigger]);

  // 计算最终状态
  const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

  // 生成输入框样式
  const inputStyle = inputNumberStyles['getStyle']({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    controls,
    controlsPosition,
    style,
  });

  // 生成输入框类名
  const inputClassName = inputNumberStyles['getClassName']({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    bordered,
    clearable: shouldShowClear(),
    controls,
    controlsPosition,
    className,
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: nativeInputRef.current,
      getValue: () => value,
      setValue: (newValue: number | null) => {
        handleValueChange(newValue, {} as ITouchEvent);
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
      setStatus: (newStatus: InputNumberStatus) => {
        setInternalStatus(newStatus);
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        onValidate?.(result);
        return result;
      },
      clear: () => {
        handleClear({} as ITouchEvent);
      },
      reset: () => {
        handleValueChange(defaultValue, {} as ITouchEvent);
        setValidationResult(null);
        setInternalStatus('normal');
      },
      stepUp: (customStep?: number) => {
        const actualStep = customStep ?? step;
        const currentValue = value || 0;
        const newValue = currentValue + actualStep;
        const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
        const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
        handleValueChange(roundedValue, {} as ITouchEvent);
        onStep?.(roundedValue, 'up', {} as ITouchEvent);
      },
      stepDown: (customStep?: number) => {
        const actualStep = customStep ?? step;
        const currentValue = value || 0;
        const newValue = currentValue - actualStep;
        const clampedValue = inputNumberStyles['clampValue'](newValue, min, max);
        const roundedValue = inputNumberStyles['roundValue'](clampedValue, precision);
        handleValueChange(roundedValue, {} as ITouchEvent);
        onStep?.(roundedValue, 'down', {} as ITouchEvent);
      },
      getValidationResult: () => validationResult,
    }),
    [
      value,
      handleValueChange,
      defaultValue,
      internalDisabled,
      internalReadonly,
      validateInput,
      handleClear,
      finalStatus,
      step,
      min,
      max,
      precision,
      onStep,
      validationResult,
      onValidate,
    ],
  );

  return (
    <View
      className={containerClassName}
      style={inputNumberStyles['getContainerStyle']({ size, block, style: containerStyle })}
    >
      {/* 标签 */}
      {label && <Text style={inputNumberStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{label}</Text>}

      {/* 输入框包装器 */}
      <View
        style={inputNumberStyles['getWrapperStyle']({
          size,
          status: finalStatus,
          disabled: internalDisabled,
          readonly: internalReadonly,
          bordered,
          controls,
          controlsPosition,
        })}
      >
        {/* 前缀 */}
        {prefix && (
          <View
            style={inputNumberStyles['getPrefixStyle']({
              size,
              disabled: internalDisabled,
              controls,
              controlsPosition,
            })}
          >
            {prefix}
          </View>
        )}

        {/* 控制器 */}
        {controls && (
          <InputNumberControls
            size={size}
            controlsPosition={controlsPosition}
            disabled={internalDisabled}
            readonly={internalReadonly}
            onStep={handleStep}
          />
        )}

        {/* 输入框 */}
        <TaroInput
          ref={nativeInputRef}
          className={inputClassName}
          style={inputStyle}
          value={displayText}
          placeholder={placeholder}
          disabled={internalDisabled || internalReadonly}
          type="digit"
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
          onInput={(e) => handleTextChange(e.detail.value, e as any)}
          {...restProps}
        />

        {/* 后缀 */}
        {suffix && (
          <View
            style={inputNumberStyles['getSuffixStyle']({
              size,
              disabled: internalDisabled,
              controls,
              controlsPosition,
            })}
          >
            {suffix}
          </View>
        )}

        {/* 清除按钮 */}
        {shouldShowClear() && (
          <InputNumberClearButton
            size={size}
            disabled={internalDisabled}
            readonly={internalReadonly}
            onClear={handleClear}
          />
        )}
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={inputNumberStyles['getHelperTextStyle']({ size, status: finalStatus })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && (
        <Text style={inputNumberStyles['getErrorTextStyle']({ size })}>{errorText}</Text>
      )}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={inputNumberStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
      )}
    </View>
  );
});

/** 数字输入框组件显示名称 */
InputNumberComponent.displayName = 'InputNumber';

/** 导出数字输入框组件 */
export const InputNumber = InputNumberComponent;
