/**
 * FormItem Component
 * 表单项组件，用于包装表单控件并提供标签、验证等功能
 * @module components/form/Form/FormItem
 */

import React, { useEffect, useCallback, cloneElement, isValidElement, memo } from 'react';
import { View, Text } from '@tarojs/components';
import type { FormItemProps, FormFieldStatus, FormItemContext } from './Form.types';
import { useFormContext, FormItemContextProvider } from './FormContext';
import { formStyles } from './Form.styles';

/**
 * 表单项组件
 * @description 用于包装表单控件，提供标签、验证消息等功能
 */
export const FormItem = memo<FormItemProps>(function FormItem(props) {
  const {
    name,
    label,
    helperText,
    errorText,
    rules = [],
    validateTrigger,
    required,
    showRequiredMark,
    labelWidth,
    labelAlign,
    className,
    style,
    children,
    showValidateMessage,
    onChange,
    onStatusChange,
  } = props;

  const formContext = useFormContext();

  // 获取表单配置
  const config = formContext?.config ?? {
    layout: 'horizontal' as const,
    labelAlign: 'right' as const,
    size: 'md' as const,
    labelWidth: undefined,
    colon: true,
    requiredMark: true,
    validateTrigger: 'onBlur' as const,
    showValidateMessage: true,
    disabled: false,
    readonly: false,
  };

  // 合并配置
  const finalLabelAlign = labelAlign ?? config.labelAlign;
  const finalLabelWidth = labelWidth ?? config.labelWidth;
  const finalValidateTrigger = validateTrigger ?? config.validateTrigger;
  const finalShowValidateMessage = showValidateMessage ?? config.showValidateMessage;
  const finalShowRequiredMark = showRequiredMark ?? config.requiredMark;

  // 获取字段信息
  const field = formContext?.getField(name) ?? null;
  const value = formContext?.getFieldValue(name);
  const errors = formContext?.getFieldError(name) ?? [];

  // 计算是否必填
  const isRequired = required ?? rules.some((rule) => rule.required);

  // 计算字段状态
  const getFieldStatus = useCallback((): FormFieldStatus => {
    if (field?.validating) return 'validating';
    if (errors.length > 0) return 'error';
    if (field?.touched && errors.length === 0) return 'success';
    return 'normal';
  }, [field?.validating, field?.touched, errors.length]);

  const fieldStatus = getFieldStatus();

  // 注册字段
  useEffect(() => {
    if (formContext && name) {
      formContext.registerField(name, {
        name,
        value: value ?? '',
        errors: [],
        touched: false,
        validating: false,
        rules,
      });

      return () => {
        formContext.unregisterField(name);
      };
    }
    return undefined;
  }, [name, formContext, rules]);

  // 状态变化回调
  useEffect(() => {
    onStatusChange?.(fieldStatus, name);
  }, [fieldStatus, name, onStatusChange]);

  // 处理值变化
  const handleChange = useCallback(
    (newValue: unknown) => {
      if (formContext) {
        formContext.setFieldValue(name, newValue);
        formContext.setFieldTouched(name, true);

        // 根据验证触发时机验证
        if (finalValidateTrigger === 'onChange') {
          formContext.validateField(name);
        }
      }

      onChange?.(newValue, name);
    },
    [formContext, name, finalValidateTrigger, onChange],
  );

  // 处理失焦
  const handleBlur = useCallback(() => {
    if (formContext) {
      formContext.setFieldTouched(name, true);

      // 根据验证触发时机验证
      if (finalValidateTrigger === 'onBlur') {
        formContext.validateField(name);
      }
    }
  }, [formContext, name, finalValidateTrigger]);

  // 创建表单项上下文
  const formItemContext: FormItemContext = {
    name,
    value,
    errors,
    touched: field?.touched ?? false,
    validating: field?.validating ?? false,
    status: fieldStatus,
    rules,
    required: isRequired,
    labelAlign: finalLabelAlign,
    labelWidth: finalLabelWidth,
    showValidateMessage: finalShowValidateMessage,
    formContext: formContext!,
  };

  // 生成样式
  const itemStyle = formStyles.getItemStyle({
    layout: config.layout,
    size: config.size,
    labelWidth: finalLabelWidth,
    style,
  });

  const labelStyle = formStyles.getItemLabelStyle({
    layout: config.layout,
    size: config.size,
    labelAlign: finalLabelAlign,
    labelWidth: finalLabelWidth,
    required: isRequired,
  });

  const contentStyle = formStyles.getItemContentStyle({
    layout: config.layout,
    size: config.size,
  });

  const helperTextStyle = formStyles.getItemHelperTextStyle({
    size: config.size,
  });

  const errorTextStyle = formStyles.getItemErrorTextStyle({
    size: config.size,
  });

  const requiredMarkStyle = formStyles.getRequiredMarkStyle({
    size: config.size,
  });

  // 生成类名
  const itemClassName = formStyles.getItemClassName({
    layout: config.layout,
    size: config.size,
    hasError: errors.length > 0,
    className,
  });

  // 克隆子元素并注入 props
  const renderChildren = () => {
    if (!children) return null;

    // 如果是有效的 React 元素，注入 value、onChange、onBlur 等 props
    if (isValidElement(children)) {
      const childPropsObj = children.props as Record<string, unknown>;
      const childProps: Record<string, unknown> = {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        disabled: config.disabled || childPropsObj['disabled'],
        readOnly: config.readonly || childPropsObj['readOnly'],
        name,
      };

      // 如果有错误，添加错误状态
      if (errors.length > 0) {
        childProps['status'] = 'error';
        childProps['aria-invalid'] = true;
        childProps['aria-describedby'] = `${name}-error`;
      }

      return cloneElement(children, childProps);
    }

    // 如果是函数，调用函数并传入字段状态
    if (typeof children === 'function') {
      return (children as (context: FormItemContext) => React.ReactNode)(formItemContext);
    }

    return children;
  };

  // 渲染错误消息
  const renderErrorMessage = () => {
    if (!finalShowValidateMessage) return null;

    // 优先显示自定义错误文本
    if (errorText) {
      return (
        <View id={`${name}-error`} aria-live="polite">
          <Text style={errorTextStyle}>{errorText}</Text>
        </View>
      );
    }

    // 显示验证错误
    if (errors.length > 0) {
      return (
        <View id={`${name}-error`} aria-live="polite">
          <Text style={errorTextStyle}>{errors[0]}</Text>
        </View>
      );
    }

    return null;
  };

  // 渲染帮助文本
  const renderHelperText = () => {
    if (!helperText || errors.length > 0) return null;

    return (
      <Text style={helperTextStyle} id={`${name}-helper`}>
        {helperText}
      </Text>
    );
  };

  // 渲染标签
  const renderLabel = () => {
    if (!label) return null;

    return (
      <View style={labelStyle}>
        <Text>{label}</Text>
        {isRequired && finalShowRequiredMark && (
          <Text style={requiredMarkStyle} aria-hidden="true">
            *
          </Text>
        )}
        {config.colon && config.layout !== 'vertical' && <Text>:</Text>}
      </View>
    );
  };

  return (
    <FormItemContextProvider.Provider value={formItemContext}>
      <View
        className={itemClassName}
        style={itemStyle}
        role="group"
        aria-labelledby={label ? `${name}-label` : undefined}
      >
        {renderLabel()}
        <View style={contentStyle}>
          {renderChildren()}
          {renderHelperText()}
          {renderErrorMessage()}
        </View>
      </View>
    </FormItemContextProvider.Provider>
  );
});

FormItem.displayName = 'Form.Item';

export default FormItem;
