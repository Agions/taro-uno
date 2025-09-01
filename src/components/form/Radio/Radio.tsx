import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Radio, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { radioStyles } from './Radio.styles';
import type { RadioProps, RadioRef, RadioSize, RadioStatus } from './Radio.types';

/** 单选框组件 */
export const RadioComponent = forwardRef<RadioRef, RadioProps>((props, ref) => {
  const {
    value,
    checked: controlledChecked,
    size = 'md',
    status: propStatus = 'normal',
    disabled = false,
    readonly = false,
    label,
    helperText,
    errorText,
    className,
    onChange,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'radio',
    accessibilityState,
    rules,
    validateTrigger = 'onChange',
    immediate = false,
    validator,
    ...restProps
  } = props;

  const radioRef = useRef<HTMLInputElement>(null);
  const [internalStatus, setInternalStatus] = useState<RadioStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);

  // 处理受控模式
  const checked = controlledChecked !== undefined ? controlledChecked : false;

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

  // 立即验证
  useEffect(() => {
    if (immediate && checked) {
      validateRadio(checked);
    }
  }, [immediate, checked]);

  // 验证单选框
  const validateRadio = useCallback(
    async (isChecked: boolean): Promise<{ valid: boolean; message?: string }> => {
      if (!rules && !validator) {
        return { valid: true };
      }

      // 验证必填
      if (rules?.some((rule) => rule.required && !isChecked)) {
        const requiredRule = rules.find((rule) => rule.required);
        return { valid: false, message: requiredRule?.message || '此项为必选项' };
      }

      // 验证规则
      if (rules) {
        for (const rule of rules) {
          if (rule.validator) {
            const result = rule.validator(isChecked);
            if (typeof result === 'string') {
              return { valid: false, message: result };
            }
            if (!result) {
              return { valid: false, message: rule.message || '验证失败' };
            }
          }
        }
      }

      // 自定义验证函数
      if (validator) {
        const result = validator(isChecked);
        if (typeof result === 'string') {
          return { valid: false, message: result };
        }
        if (!result) {
          return { valid: false, message: '验证失败' };
        }
      }

      return { valid: true };
    },
    [rules, validator],
  );

  // 处理变化事件
  const handleChange = useCallback(
    async (event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      // 验证单选框
      if (validateTrigger === 'onChange') {
        const result = await validateRadio(true);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }

      // 触发变化事件
      onChange?.(true, event);
    },
    [internalDisabled, internalReadonly, validateTrigger, validateRadio, onChange],
  );

  // 计算最终状态
  const finalStatus = internalDisabled ? 'disabled' : validationResult?.valid === false ? 'error' : internalStatus;

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: radioRef.current,
      getChecked: () => checked,
      setChecked: (newChecked) => {
        // 单选框通常由组控制，这里只是内部状态更新
        if (newChecked && !internalDisabled && !internalReadonly) {
          onChange?.(true, {} as ITouchEvent);
        }
      },
      setDisabled: (newDisabled) => {
        setInternalDisabled(newDisabled);
      },
      setReadonly: (newReadonly) => {
        setInternalReadonly(newReadonly);
      },
      setStatus: (newStatus) => {
        setInternalStatus(newStatus);
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateRadio(checked);
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        return result;
      },
      reset: () => {
        setValidationResult(null);
        setInternalStatus('normal');
      },
    }),
    [checked, internalDisabled, internalReadonly, validateRadio, onChange, finalStatus],
  );

  // 生成单选框样式
  const radioStyle = radioStyles.getStyle({
    size,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    checked,
    style,
  });

  // 生成单选框类名
  const radioClassName = radioStyles.getClassName({
    size,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    checked,
    className,
  });

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    readonly: internalReadonly,
    checked,
    ...accessibilityState,
  };

  return (
    <View style={radioStyles.getContainerStyle({ style: props.containerStyle })}>
      <View style={radioStyles.getWrapperStyle({ style: props.wrapperStyle })}>
        {/* 单选框 */}
        <Radio
          ref={radioRef}
          className={radioClassName}
          style={radioStyle}
          value={value}
          checked={checked}
          disabled={internalDisabled}
          onChange={handleChange}
          accessible={accessible}
          aria-label={accessibilityLabel}
          aria-role={accessibilityRole}
          aria-state={finalAccessibilityState}
          {...restProps}
        />

        {/* 标签 */}
        {label && (
          <Text
            style={radioStyles.getLabelStyle({
              size,
              disabled: internalDisabled,
              style: props.labelStyle,
            })}
            onClick={handleChange}
          >
            {label}
          </Text>
        )}
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={radioStyles.getHelperTextStyle({ size, style: props.helperTextStyle })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && (
        <Text style={radioStyles.getErrorTextStyle({ size, style: props.errorTextStyle })}>{errorText}</Text>
      )}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={radioStyles.getErrorTextStyle({ size, style: props.errorTextStyle })}>
          {validationResult.message}
        </Text>
      )}
    </View>
  );
});

/** 单选框组件显示名称 */
RadioComponent.displayName = 'Radio';

/** 导出单选框组件 */
export const Radio = RadioComponent;
