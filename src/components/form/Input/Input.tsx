import React, { forwardRef, useEffect } from 'react';
import { Input as TaroInput, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { inputStyles } from './Input.styles';
import type { InputProps, InputRef, InputStatus } from './Input.types';
import { useInputLogic } from './useInputLogic';

/** 输入框组件 */
export const InputComponent = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    placeholder,
    size = 'md',
    type = 'text',
    variant = 'outlined',
    label,
    helperText,
    errorText,
    showCount = false,
    autoFocus = false,
    bordered = true,
    showPasswordToggle = false,
    className,
    onKeyboardHeightChange,
    style,
    multiline = false,
    rows = 3,
    autoHeight = false,
    showWordLimit = false,
    prefix,
    suffix,
    maxLength,
    ...restProps
  } = props;

  const {
    nativeInputRef,
    value,
    showPassword,
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
  } = useInputLogic(props);

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  }, [autoFocus, nativeInputRef]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: nativeInputRef.current,
      getValue: () => String(value),
      setValue: (newValue: string) => {
        if (props.value === undefined) {
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
        if (props.value === undefined) {
          setInternalValue(props.defaultValue || '');
        }
        setValidationResult(null);
        setInternalStatus('normal');
      },
    }),
    [value, props.value, props.defaultValue, internalDisabled, internalReadonly, validateInput, handleClear, finalStatus, setInternalValue, setInternalStatus, setInternalDisabled, setInternalReadonly, setValidationResult, nativeInputRef]
  );

  // 生成输入框样式
  const { translate, ...styleWithoutTranslate } = style || {};
  const inputStyle = inputStyles['getStyle']({
    size,
    variant,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    multiline,
    ...styleWithoutTranslate,
  });

  // 生成输入框类名
  const inputClassName = inputStyles['getClassName']({
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
    ? inputStyles['getMultilineStyle']({
        size,
        rows,
        autoHeight,
      })
    : {};

  
  // 计算字符长度
  const calculateLength = (text: string) => {
    if (!text) return 0;

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

  const currentLength = calculateLength(String(value || ''));
  const maxLengthToShow = maxLength || (type === 'tel' ? 11 : type === 'idcard' ? 18 : undefined);

  return (
    <View style={inputStyles['getContainerStyle']({ size, block: props.block, style: props.containerStyle })}>
      {/* 标签 */}
      {label && <Text style={inputStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{label}</Text>}

      {/* 输入框包装器 */}
      <View
        style={inputStyles['getWrapperStyle']({
          size,
          status: finalStatus,
          disabled: internalDisabled,
          readonly: internalReadonly,
          bordered,
        })}
      >
        {/* 前缀 */}
        {prefix && <View style={inputStyles['getPrefixStyle']({ size, disabled: internalDisabled })}>{prefix}</View>}

        {/* 输入框 */}
        <TaroInput
          ref={nativeInputRef}
          className={inputClassName}
          style={{ ...inputStyle, ...multilineStyle }}
          value={value == null ? '' : String(value)}
          placeholder={placeholder}
          type={showPassword ? 'text' : (type as any)}
          disabled={internalDisabled}
          readOnly={internalReadonly}
          maxlength={maxLength || undefined}
          autoFocus={autoFocus}
          onFocus={(e) => handleFocus(e as unknown as ITouchEvent)}
          onBlur={(e) => handleBlur(e as unknown as ITouchEvent)}
          onConfirm={(e) => handleConfirm(e as unknown as ITouchEvent)}
          onKeyDown={(e: any) => {
            // Handle standard keyDown events for Enter key
            if (e.key === 'Enter') {
              handleConfirm(e as unknown as ITouchEvent);
            }
          }}
          onInput={(e) => {
            // Handle both Taro event (detail.value) and standard DOM event (target.value)
            const inputValue = (e as any).detail?.value || (e as any).target?.value || '';
            handleValueChange(inputValue, e as unknown as ITouchEvent);
          }}
          onKeyboardHeightChange={(e) => onKeyboardHeightChange?.((e as any).detail?.height, e as unknown as ITouchEvent)}
          {...(restProps as any)}
        />

        {/* 后缀 */}
        <View style={inputStyles['getSuffixStyle']({ size, disabled: internalDisabled })}>
          {/* 清除按钮 */}
          {shouldShowClear() && (
            <View style={inputStyles['getClearButtonStyle']({ size })} onClick={handleClear}>
              <Text>×</Text>
            </View>
          )}

          {/* 密码切换按钮 */}
          {showPasswordToggle && type === 'password' && (
            <View style={inputStyles['getPasswordToggleStyle']({ size })} onClick={handlePasswordToggle}>
              <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </View>
          )}

          {/* 自定义后缀 */}
          {suffix && <View>{suffix}</View>}
        </View>
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={inputStyles['getHelperTextStyle']({ size, status: finalStatus })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && <Text style={inputStyles['getErrorTextStyle']({ size })}>{errorText}</Text>}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={inputStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
      )}

      {/* 字数统计 */}
      {(showCount || showWordLimit) && maxLengthToShow && (
        <Text style={inputStyles['getCounterStyle']({ size })}>
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
