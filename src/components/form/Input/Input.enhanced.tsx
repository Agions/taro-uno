import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Input as TaroInput, Text, View } from '@tarojs/components';
import { createComponent, PRESET_COMPONENT_CONFIGS } from '../../common/ComponentFactory';
import { useAccessibility, useKeyboardNavigation, useFocusManagement } from '../../common/Accessibility';
import { useThemeUtils } from '../../theme/useThemeUtils';
import { useControlledState } from '../../hooks/useStateManagement';
import type { ComponentSize, ComponentVariant, ComponentStatus } from '../../types/component-props';

// ==================== 增强输入框属性接口 ====================
export interface EnhancedInputProps {
  /** 输入框值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 输入框尺寸 */
  size?: ComponentSize;
  /** 输入框变体 */
  variant?: ComponentVariant;
  /** 输入框状态 */
  status?: ComponentStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否多行输入 */
  multiline?: boolean;
  /** 行数 */
  rows?: number;
  /** 是否自动调整高度 */
  autoHeight?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 最小长度 */
  minLength?: number;
  /** 输入框类型 */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search';
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除按钮触发方式 */
  clearTrigger?: 'always' | 'focus' | 'never';
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 标签 */
  label?: React.ReactNode;
  /** 帮助文本 */
  helpText?: React.ReactNode;
  /** 错误文本 */
  errorText?: React.ReactNode;
  /** 是否显示字数统计 */
  showCount?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示密码切换按钮 */
  showPasswordToggle?: boolean;
  /** 变化回调 */
  onChange?: (value: string, event: any) => void;
  /** 输入回调 */
  onInput?: (value: string, event: any) => void;
  /** 聚焦回调 */
  onFocus?: (event: any) => void;
  /** 失焦回调 */
  onBlur?: (event: any) => void;
  /** 确认回调 */
  onConfirm?: (value: string, event: any) => void;
  /** 清除回调 */
  onClear?: (event: any) => void;
  /** 键盘高度变化回调 */
  onKeyboardHeightChange?: (height: number, event: any) => void;
  /** 验证规则 */
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (value: string) => boolean | string;
    asyncValidator?: (value: string) => Promise<boolean | string>;
  }>;
  /** 验证触发时机 */
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  /** 是否立即验证 */
  immediate?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== 增强输入框引用接口 ====================
export interface EnhancedInputRef {
  /** DOM元素 */
  element: HTMLInputElement | HTMLTextAreaElement | null;
  /** 获取输入框值 */
  getValue: () => string;
  /** 设置输入框值 */
  setValue: (value: string) => void;
  /** 聚焦输入框 */
  focus: () => void;
  /** 失焦输入框 */
  blur: () => void;
  /** 选中输入框内容 */
  select: () => void;
  /** 设置选中范围 */
  setSelectionRange: (start: number, end: number) => void;
  /** 获取选中范围 */
  getSelectionRange: () => { start: number; end: number };
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置状态 */
  setStatus: (status: ComponentStatus) => void;
  /** 获取状态 */
  getStatus: () => ComponentStatus;
  /** 验证输入框 */
  validate: () => Promise<{ valid: boolean; message?: string }>;
  /** 清除输入框 */
  clear: () => void;
  /** 重置输入框 */
  reset: () => void;
}

// ==================== 增强输入框组件 ====================
const EnhancedInputComponent = createComponent<EnhancedInputProps>(
  PRESET_COMPONENT_CONFIGS.input,
  (props, ref, styles, mergedProps) => {
    const {
      value: controlledValue,
      defaultValue = '',
      placeholder,
      size = 'md',
      variant = 'outlined',
      status: propStatus = 'default',
      disabled = false,
      readonly = false,
      multiline = false,
      rows = 3,
      autoHeight = false,
      maxLength,
      minLength,
      type = 'text',
      clearable = false,
      clearTrigger = 'focus',
      prefix,
      suffix,
      label,
      helpText,
      errorText,
      showCount = false,
      autoFocus = false,
      bordered = true,
      showPasswordToggle = false,
      onChange,
      onInput,
      onFocus,
      onBlur,
      onConfirm,
      onClear,
      onKeyboardHeightChange,
      rules = [],
      validateTrigger = 'onBlur',
      immediate = false,
      className = '',
      style,
      ...rest
    } = props;

    const { getColor, getSpacing, getBorderRadius, getFontSize } = useThemeUtils();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalStatus, setInternalStatus] = useState(propStatus);
    const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);

    // 处理受控/非受控模式
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // 更新内部状态
    useEffect(() => {
      setInternalStatus(propStatus);
    }, [propStatus]);

    // 自动聚焦
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // 立即验证
    useEffect(() => {
      if (immediate && value) {
        validateInput(value);
      }
    }, [immediate, value]);

    // 验证输入值
    const validateInput = useCallback(async (inputValue: string): Promise<{ valid: boolean; message?: string }> => {
      // 验证长度
      if (minLength !== undefined && inputValue.length < minLength) {
        return { valid: false, message: `最少需要${minLength}个字符` };
      }

      if (maxLength !== undefined && inputValue.length > maxLength) {
        return { valid: false, message: `最多允许${maxLength}个字符` };
      }

      // 验证规则
      for (const rule of rules) {
        if (rule.required && !inputValue.trim()) {
          return { valid: false, message: rule.message || '此字段为必填项' };
        }

        if (rule.pattern && !rule.pattern.test(inputValue)) {
          return { valid: false, message: rule.message || '输入格式不正确' };
        }

        if (rule.validator) {
          const result = rule.validator(inputValue);
          if (typeof result === 'string') {
            return { valid: false, message: result };
          }
          if (!result) {
            return { valid: false, message: rule.message || '输入格式不正确' };
          }
        }

        if (rule.asyncValidator) {
          try {
            const result = await rule.asyncValidator(inputValue);
            if (typeof result === 'string') {
              return { valid: false, message: result };
            }
            if (!result) {
              return { valid: false, message: rule.message || '输入格式不正确' };
            }
          } catch (error) {
            return { valid: false, message: rule.message || '验证失败' };
          }
        }
      }

      return { valid: true };
    }, [rules, minLength, maxLength]);

    // 格式化输入值
    const formatInputValue = useCallback((inputValue: string): string => {
      let formattedValue = inputValue;

      switch (type) {
        case 'number':
          formattedValue = inputValue.replace(/[^\d.-]/g, '');
          break;
        case 'tel':
          formattedValue = inputValue.replace(/[^\d]/g, '');
          break;
        case 'email':
          // 不自动格式化邮箱
          break;
        default:
          break;
      }

      if (maxLength && formattedValue.length > maxLength) {
        formattedValue = formattedValue.slice(0, maxLength);
      }

      return formattedValue;
    }, [type, maxLength]);

    // 处理输入变化
    const handleValueChange = useCallback(async (newValue: string, event: any) => {
      if (disabled || readonly) return;

      const formattedValue = formatInputValue(newValue);

      if (!isControlled) {
        setInternalValue(formattedValue);
      }

      onInput?.(formattedValue, event);

      // 验证输入
      if (validateTrigger === 'onChange') {
        const result = await validateInput(formattedValue);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'default' : 'error');
      }

      onChange?.(formattedValue, event);
    }, [disabled, readonly, isControlled, formatInputValue, onInput, validateTrigger, validateInput, onChange]);

    // 处理聚焦事件
    const handleFocus = useCallback(async (event: any) => {
      if (disabled || readonly) return;

      setIsFocused(true);
      onFocus?.(event);

      if (validateTrigger === 'onFocus') {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'default' : 'error');
      }
    }, [disabled, readonly, onFocus, validateTrigger, validateInput, value]);

    // 处理失焦事件
    const handleBlur = useCallback(async (event: any) => {
      if (disabled || readonly) return;

      setIsFocused(false);
      onBlur?.(event);

      if (validateTrigger === 'onBlur') {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'default' : 'error');
      }
    }, [disabled, readonly, onBlur, validateTrigger, validateInput, value]);

    // 处理确认事件
    const handleConfirm = useCallback(async (event: any) => {
      if (disabled || readonly) return;

      onConfirm?.(value, event);

      if (validateTrigger === 'onSubmit') {
        const result = await validateInput(value);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'default' : 'error');
      }
    }, [disabled, readonly, onConfirm, validateTrigger, validateInput, value]);

    // 处理清除事件
    const handleClear = useCallback((event: any) => {
      if (disabled || readonly) return;

      const emptyValue = '';
      if (!isControlled) {
        setInternalValue(emptyValue);
      }

      setValidationResult(null);
      setInternalStatus('default');
      onClear?.(event);
      onChange?.(emptyValue, event);
    }, [disabled, readonly, isControlled, onClear, onChange]);

    // 处理密码切换
    const handlePasswordToggle = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    // 计算是否显示清除按钮
    const shouldShowClear = useCallback(() => {
      if (!clearable || disabled || readonly) return false;

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
    }, [clearable, disabled, readonly, value, isFocused, clearTrigger]);

    // 计算最终状态
    const finalStatus = disabled ? 'disabled' :
                       validationResult?.valid === false || errorText ? 'error' :
                       internalStatus;

    // 生成无障碍属性
    const { errorId, helpId, ariaProps } = useAccessibility({
      disabled,
      readonly,
      required: rules.some(rule => rule.required),
      invalid: validationResult?.valid === false || !!errorText,
      errorMessage: validationResult?.message || errorText,
      helpText,
      role: 'textbox',
      ariaLabel: label?.toString() || placeholder,
    });

    // 键盘导航
    const { onKeyDown } = useKeyboardNavigation(
      { enableKeyboardNavigation: true },
      {
        onEnter: () => {
          if (!disabled && !readonly) {
            handleConfirm({} as any);
          }
        },
      }
    );

    // 焦点管理
    const { focusProps } = useFocusManagement({
      autoFocus,
      tabIndex: disabled ? -1 : 0,
    });

    // 生成输入框样式
    const inputStyles: React.CSSProperties = {
      ...styles,
      border: bordered ? '1px solid' : 'none',
      borderRadius: getBorderRadius('md'),
      backgroundColor: getColor('background.primary'),
      color: getColor('text.primary'),
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : readonly ? 'default' : 'text',
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      ...style,
    };

    // 根据状态调整样式
    if (finalStatus === 'error') {
      inputStyles.borderColor = getColor('error.500');
      inputStyles.backgroundColor = getColor('error.50');
    } else if (isFocused) {
      inputStyles.borderColor = getColor('primary.500');
      inputStyles.boxShadow = `0 0 0 2px ${getColor('primary.100')}`;
    }

    // 渲染输入框
    const renderInput = () => {
      const inputProps = {
        ref: inputRef,
        value: value || '',
        placeholder,
        type: showPassword ? 'text' : type,
        disabled,
        readOnly: readonly,
        maxLength,
        autoFocus,
        style: inputStyles,
        className: `taro-uno-input ${className}`.trim(),
        onFocus: handleFocus,
        onBlur: handleBlur,
        onConfirm: handleConfirm,
        onInput: (e: any) => handleValueChange(e.detail.value, e),
        onKeyboardHeightChange: (e: any) => onKeyboardHeightChange?.(e.detail.height, e),
        ...ariaProps,
        ...focusProps,
        onKeyDown,
      };

      if (multiline) {
        return (
          <TaroInput
            {...inputProps}
            type={'textarea' as any}
            rows={rows}
            autoHeight={autoHeight}
          />
        );
      }

      return <TaroInput {...inputProps} />;
    };

    // 计算字符长度
    const calculateLength = (text: string) => {
      if (!text) return 0;
      return Array.from(text).reduce((len, char) => {
        return len + (char.charCodeAt(0) > 127 ? 2 : 1);
      }, 0);
    };

    const currentLength = calculateLength(String(value || ''));
    const maxLengthToShow = maxLength || 100;

    return (
      <View style={{ width: '100%' }}>
        {/* 标签 */}
        {label && (
          <Text style={{
            display: 'block',
            fontSize: getFontSize('sm'),
            fontWeight: 500,
            color: getColor('text.primary'),
            marginBottom: getSpacing('1'),
          }}>
            {label}
            {rules.some(rule => rule.required) && (
              <Text style={{ color: getColor('error.500'), marginLeft: '2px' }}>*</Text>
            )}
          </Text>
        )}

        {/* 输入框容器 */}
        <View style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}>
          {/* 前缀 */}
          {prefix && (
            <View style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: getSpacing('2'),
              color: getColor('text.secondary'),
            }}>
              {prefix}
            </View>
          )}

          {/* 输入框 */}
          <View style={{ flex: 1, position: 'relative' }}>
            {renderInput()}

            {/* 清除按钮 */}
            {shouldShowClear() && (
              <View
                style={{
                  position: 'absolute',
                  right: getSpacing('2'),
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: getColor('text.secondary'),
                  color: getColor('background.primary'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                onClick={handleClear}
              >
                ×
              </View>
            )}

            {/* 密码切换按钮 */}
            {showPasswordToggle && type === 'password' && (
              <View
                style={{
                  position: 'absolute',
                  right: getSpacing('2'),
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onClick={handlePasswordToggle}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </View>
            )}

            {/* 后缀 */}
            {suffix && (
              <View style={{
                position: 'absolute',
                right: getSpacing('2'),
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                color: getColor('text.secondary'),
              }}>
                {suffix}
              </View>
            )}
          </View>
        </View>

        {/* 帮助文本 */}
        {helpText && finalStatus === 'default' && (
          <Text
            id={helpId}
            style={{
              display: 'block',
              fontSize: getFontSize('xs'),
              color: getColor('text.secondary'),
              marginTop: getSpacing('1'),
            }}
          >
            {helpText}
          </Text>
        )}

        {/* 错误文本 */}
        {errorText && finalStatus === 'error' && (
          <Text
            id={errorId}
            style={{
              display: 'block',
              fontSize: getFontSize('xs'),
              color: getColor('error.500'),
              marginTop: getSpacing('1'),
            }}
          >
            {errorText}
          </Text>
        )}

        {/* 验证结果文本 */}
        {validationResult?.message && finalStatus === 'error' && (
          <Text
            id={errorId}
            style={{
              display: 'block',
              fontSize: getFontSize('xs'),
              color: getColor('error.500'),
              marginTop: getSpacing('1'),
            }}
          >
            {validationResult.message}
          </Text>
        )}

        {/* 字数统计 */}
        {(showCount || maxLength) && (
          <Text
            style={{
              display: 'block',
              fontSize: getFontSize('xs'),
              color: getColor('text.secondary'),
              marginTop: getSpacing('1'),
              textAlign: 'right',
            }}
          >
            {currentLength}/{maxLengthToShow}
          </Text>
        )}
      </View>
    );
  }
);

// ==================== 暴露引用方法 ====================
EnhancedInputComponent.displayName = 'EnhancedInput';

export const EnhancedInput = React.forwardRef<EnhancedInputRef, EnhancedInputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(props.defaultValue || '');
  const [internalDisabled, setInternalDisabled] = useState(props.disabled || false);
  const [internalReadonly, setInternalReadonly] = useState(props.readonly || false);
  const [internalStatus, setInternalStatus] = useState(props.status || 'default');

  React.useImperativeHandle(ref, () => ({
    element: inputRef.current,
    getValue: () => {
      return props.value !== undefined ? props.value || '' : internalValue;
    },
    setValue: (newValue: string) => {
      if (props.value === undefined) {
        setInternalValue(newValue);
      }
    },
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    select: () => {
      if (inputRef.current && 'select' in inputRef.current) {
        inputRef.current.select();
      }
    },
    setSelectionRange: (start: number, end: number) => {
      if (inputRef.current && 'setSelectionRange' in inputRef.current) {
        inputRef.current.setSelectionRange(start, end);
      }
    },
    getSelectionRange: () => {
      if (inputRef.current && 'selectionStart' in inputRef.current) {
        return {
          start: inputRef.current.selectionStart || 0,
          end: inputRef.current.selectionEnd || 0,
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
    setStatus: (newStatus: any) => {
      setInternalStatus(newStatus);
    },
    getStatus: () => internalStatus,
    validate: async () => {
      // 验证逻辑需要根据实际的验证规则实现
      return { valid: true };
    },
    clear: () => {
      if (props.value === undefined) {
        setInternalValue('');
      }
    },
    reset: () => {
      if (props.value === undefined) {
        setInternalValue(props.defaultValue || '');
      }
      setInternalStatus(props.status || 'default');
    },
  }));

  return (
    <EnhancedInputComponent
      {...props}
      ref={inputRef}
      value={props.value !== undefined ? props.value : internalValue}
      disabled={internalDisabled}
      readonly={internalReadonly}
      status={internalStatus}
    />
  );
});

export default EnhancedInput;