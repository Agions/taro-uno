import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Radio as TaroRadio, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { radioStyles } from './Radio.styles';
import type { RadioProps, RadioRef, RadioStatus, RadioSize, RadioColor } from './Radio.types';

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
    rules,
    validateTrigger = 'onChange',
    immediate = false,
    validator,
    animation,
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

      // 触发变化事件 - Radio should always be selected when clicked
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
      setChecked: (newChecked: boolean) => {
        // 单选框通常由组控制，这里只是内部状态更新
        if (newChecked && !internalDisabled && !internalReadonly) {
          onChange?.(true, {} as ITouchEvent);
        }
      },
      toggle: () => {
        if (!internalDisabled && !internalReadonly) {
          const newChecked = !checked;
          onChange?.(newChecked, {} as ITouchEvent);
        }
      },
      setDisabled: (newDisabled: boolean) => {
        setInternalDisabled(newDisabled);
      },
      setReadonly: (newReadonly: boolean) => {
        setInternalReadonly(newReadonly);
      },
      setStatus: (newStatus: RadioStatus) => {
        setInternalStatus(newStatus);
      },
      getSize: () => props.size || 'md',
      setSize: (newSize: RadioSize) => {
        // Radio size is controlled by parent, this is just for consistency
         
        newSize;
      },
      getColor: () => props.color || 'primary',
      setColor: (newColor: RadioColor) => {
        // Radio color is controlled by parent, this is just for consistency
         
        newColor;
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
      getData: () => props.data,
      setData: (newData: Record<string, any>) => {
        // Radio data is controlled by parent, this is just for consistency
         
        newData;
      },
      focus: () => {
        radioRef.current?.focus();
      },
      blur: () => {
        radioRef.current?.blur();
      },
      shake: () => {
        // Shake animation implementation would go here
         

      },
      pulse: () => {
        // Pulse animation implementation would go here
         

      },
    }),
    [checked, internalDisabled, internalReadonly, validateRadio, onChange, finalStatus],
  );

  // 生成单选框样式
  const radioStyle = radioStyles['getStyle']({
    size,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    checked,
    style,
  });

  // 生成单选框类名
  const radioClassName = radioStyles['getClassName']({
    size,
    status: finalStatus,
    disabled: internalDisabled,
    readonly: internalReadonly,
    checked,
    className,
  });

  
  return (
    <View style={radioStyles['getContainerStyle']({ style: props.containerStyle })}>
      <View style={radioStyles['getWrapperStyle']({ style: props.wrapperStyle })}>
        {/* 单选框 */}
        <TaroRadio
          className={radioClassName}
          style={radioStyle}
          value={String(value)}
          checked={checked}
          disabled={internalDisabled}
          onChange={(e) => {
            // Radio is always checked when clicked
            const checked = true;
            // Set internal state for controlled component
            if (props.onChange) {
              props.onChange(checked, e as ITouchEvent);
            }
            handleChange(e as ITouchEvent);
          }}
          {...(restProps as any)}
        />

        {/* 标签 */}
        {label && (
          <Text
            style={radioStyles['getLabelStyle']({
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
        <Text style={radioStyles['getHelperTextStyle']({ size, style: props.helperTextStyle })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && (
        <Text style={radioStyles['getErrorTextStyle']({ size, style: props.errorTextStyle })}>{errorText}</Text>
      )}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={radioStyles['getErrorTextStyle']({ size, style: props.errorTextStyle })}>
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

