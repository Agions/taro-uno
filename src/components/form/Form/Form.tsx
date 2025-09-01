import React, { forwardRef, useRef, useState, useEffect, useCallback, createContext } from 'react';
import { Form, View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { formStyles } from './Form.styles';
import type {
  FormProps,
  FormRef,
  FormInstance,
  FormContext,
  FormItemProps,
  FormLayout,
  FormLabelAlign,
  FormSize,
  FormStatus,
  FormValues,
  FormErrors,
  FormFieldInfo,
  FormRule,
} from './Form.types';

// 创建表单上下文
export const FormContext = createContext<FormContext | null>(null);

/** 表单组件 */
export const FormComponent = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    initialValues = {},
    layout = 'horizontal',
    labelAlign = 'right',
    size = 'md',
    labelWidth = 120,
    labelSuffix,
    colon = true,
    requiredMark = true,
    rules = {},
    validateTrigger = 'onBlur',
    immediate = false,
    onSubmit,
    onReset,
    onValuesChange,
    onFieldsChange,
    onFinishFailed,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'form',
    disabled = false,
    readonly = false,
    showValidateMessage = true,
    scrollToFirstError = true,
    preserve = true,
    children,
    ...restProps
  } = props;

  const [formInstance, setFormInstance] = useState<FormInstance>({
    values: { ...initialValues },
    errors: {},
    touched: {},
    validating: {},
    fields: {},
    rules: { ...rules },
    status: 'normal',
    disabled,
    readonly,
  });

  const formRef = useRef<HTMLFormElement>(null);

  // 更新表单实例
  const updateFormInstance = useCallback((updates: Partial<FormInstance>) => {
    setFormInstance((prev) => ({ ...prev, ...updates }));
  }, []);

  // 注册字段
  const registerField = useCallback((name: string, info: Partial<FormFieldInfo>) => {
    setFormInstance((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          name,
          value: prev.values[name] || info.value,
          errors: [],
          touched: false,
          validating: false,
          rules: info.rules || [],
          ...info,
        },
      },
    }));
  }, []);

  // 注销字段
  const unregisterField = useCallback(
    (name: string) => {
      setFormInstance((prev) => {
        const newFields = { ...prev.fields };
        delete newFields[name];

        if (!preserve) {
          const newValues = { ...prev.values };
          delete newValues[name];

          return {
            ...prev,
            fields: newFields,
            values: newValues,
          };
        }

        return { ...prev, fields: newFields };
      });
    },
    [preserve],
  );

  // 更新字段
  const updateField = useCallback((name: string, info: Partial<FormFieldInfo>) => {
    setFormInstance((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          ...info,
        },
      },
    }));
  }, []);

  // 获取字段
  const getField = useCallback(
    (name: string): FormFieldInfo | null => {
      return formInstance.fields[name] || null;
    },
    [formInstance.fields],
  );

  // 设置字段值
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setFormInstance((prev) => {
        const newValues = { ...prev.values, [name]: value };
        const newFields = {
          ...prev.fields,
          [name]: {
            ...prev.fields[name],
            value,
          },
        };

        // 触发值变化事件
        if (onValuesChange) {
          onValuesChange({ [name]: value }, newValues);
        }

        // 触发字段变化事件
        if (onFieldsChange) {
          const changedField = newFields[name];
          onFieldsChange([changedField], Object.values(newFields));
        }

        return {
          ...prev,
          values: newValues,
          fields: newFields,
        };
      });
    },
    [onValuesChange, onFieldsChange],
  );

  // 获取字段值
  const getFieldValue = useCallback(
    (name: string): any => {
      return formInstance.values[name];
    },
    [formInstance.values],
  );

  // 设置字段错误
  const setFieldError = useCallback((name: string, error: string | string[]) => {
    setFormInstance((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: Array.isArray(error) ? error : [error],
      },
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          errors: Array.isArray(error) ? error : [error],
        },
      },
    }));
  }, []);

  // 获取字段错误
  const getFieldError = useCallback(
    (name: string): string[] => {
      return formInstance.errors[name] || [];
    },
    [formInstance.errors],
  );

  // 设置字段 touched 状态
  const setFieldTouched = useCallback((name: string, touched: boolean) => {
    setFormInstance((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: touched,
      },
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          touched,
        },
      },
    }));
  }, []);

  // 设置字段 validating 状态
  const setFieldValidating = useCallback((name: string, validating: boolean) => {
    setFormInstance((prev) => ({
      ...prev,
      validating: {
        ...prev.validating,
        [name]: validating,
      },
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          validating,
        },
      },
    }));
  }, []);

  // 验证单个字段
  const validateField = useCallback(
    async (name: string): Promise<{ valid: boolean; errors: string[]; value: any }> => {
      const field = formInstance.fields[name];
      if (!field) {
        return { valid: true, errors: [], value: undefined };
      }

      setFieldValidating(name, true);
      const errors: string[] = [];

      try {
        // 验证必填
        if (field.rules.some((rule) => rule.required)) {
          if (field.value === undefined || field.value === null || field.value === '') {
            const requiredRule = field.rules.find((rule) => rule.required);
            errors.push(requiredRule?.message || '此字段为必填项');
          }
        }

        // 验证长度
        if (typeof field.value === 'string') {
          field.rules.forEach((rule) => {
            if (rule.min !== undefined && field.value.length < rule.min) {
              errors.push(rule.message || `最少需要${rule.min}个字符`);
            }
            if (rule.max !== undefined && field.value.length > rule.max) {
              errors.push(rule.message || `最多允许${rule.max}个字符`);
            }
          });
        }

        // 验证数值范围
        if (typeof field.value === 'number') {
          field.rules.forEach((rule) => {
            if (rule.minValue !== undefined && field.value < rule.minValue) {
              errors.push(rule.message || `最小值为${rule.minValue}`);
            }
            if (rule.maxValue !== undefined && field.value > rule.maxValue) {
              errors.push(rule.message || `最大值为${rule.maxValue}`);
            }
          });
        }

        // 验证正则表达式
        field.rules.forEach((rule) => {
          if (rule.pattern && typeof field.value === 'string' && !rule.pattern.test(field.value)) {
            errors.push(rule.message || '输入格式不正确');
          }
        });

        // 验证枚举值
        field.rules.forEach((rule) => {
          if (rule.enum && !rule.enum.includes(field.value)) {
            errors.push(rule.message || '输入值不在允许范围内');
          }
        });

        // 自定义验证函数
        for (const rule of field.rules) {
          if (rule.validator) {
            try {
              const result = rule.validator(field.value, formInstance.values);
              if (typeof result === 'string') {
                errors.push(result);
              } else if (!result) {
                errors.push(rule.message || '验证失败');
              }
            } catch (error) {
              errors.push(rule.message || '验证失败');
            }
          }
        }

        // 异步验证函数
        for (const rule of field.rules) {
          if (rule.asyncValidator) {
            try {
              const result = await rule.asyncValidator(field.value, formInstance.values);
              if (typeof result === 'string') {
                errors.push(result);
              } else if (!result) {
                errors.push(rule.message || '验证失败');
              }
            } catch (error) {
              errors.push(rule.message || '验证失败');
            }
          }
        }

        setFieldError(name, errors);
        return { valid: errors.length === 0, errors, value: field.value };
      } finally {
        setFieldValidating(name, false);
      }
    },
    [formInstance, setFieldError, setFieldValidating],
  );

  // 重置字段
  const resetField = useCallback((name: string) => {
    setFormInstance((prev) => {
      const field = prev.fields[name];
      if (!field) return prev;

      const defaultValue = field.rules.find((rule) => rule.defaultValue !== undefined)?.defaultValue;
      const newValues = { ...prev.values, [name]: defaultValue };
      const newFields = {
        ...prev.fields,
        [name]: {
          ...field,
          value: defaultValue,
          errors: [],
          touched: false,
          validating: false,
        },
      };

      return {
        ...prev,
        values: newValues,
        fields: newFields,
        errors: { ...prev.errors, [name]: [] },
        touched: { ...prev.touched, [name]: false },
        validating: { ...prev.validating, [name]: false },
      };
    });
  }, []);

  // 创建表单上下文
  const formContext: FormContext = {
    form: formInstance,
    config: {
      layout,
      labelAlign,
      size,
      labelWidth,
      labelSuffix,
      colon,
      requiredMark,
      validateTrigger,
      showValidateMessage,
      disabled,
      readonly,
    },
    styleConfig: formStyles.getStyleConfig(),
    registerField,
    unregisterField,
    updateField,
    getField,
    setFieldValue,
    getFieldValue,
    setFieldError,
    getFieldError,
    setFieldTouched,
    setFieldValidating,
    validateField,
    resetField,
  };

  // 处理表单提交
  const handleSubmit = useCallback(
    async (event: ITouchEvent) => {
      event.preventDefault();

      // 验证所有字段
      const validationResults = await Promise.all(Object.keys(formInstance.fields).map((name) => validateField(name)));

      const hasErrors = validationResults.some((result) => !result.valid);

      if (hasErrors) {
        const errors: FormErrors = {};
        validationResults.forEach((result, index) => {
          const fieldName = Object.keys(formInstance.fields)[index];
          if (!result.valid) {
            errors[fieldName] = result.errors;
          }
        });

        onFinishFailed?.(errors, formInstance.values);
        return;
      }

      // 提交表单
      try {
        await onSubmit?.(formInstance.values, event);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [formInstance, validateField, onSubmit, onFinishFailed],
  );

  // 处理表单重置
  const handleReset = useCallback(
    (event: ITouchEvent) => {
      setFormInstance((prev) => {
        const newValues: FormValues = {};
        const newFields: Record<string, FormFieldInfo> = {};
        const newErrors: FormErrors = {};
        const newTouched: Record<string, boolean> = {};
        const newValidating: Record<string, boolean> = {};

        Object.keys(prev.fields).forEach((name) => {
          const field = prev.fields[name];
          const defaultValue = field.rules.find((rule) => rule.defaultValue !== undefined)?.defaultValue;
          newValues[name] = defaultValue;
          newFields[name] = {
            ...field,
            value: defaultValue,
            errors: [],
            touched: false,
            validating: false,
          };
          newErrors[name] = [];
          newTouched[name] = false;
          newValidating[name] = false;
        });

        return {
          ...prev,
          values: newValues,
          fields: newFields,
          errors: newErrors,
          touched: newTouched,
          validating: newValidating,
        };
      });

      onReset?.(initialValues, event);
    },
    [initialValues, onReset],
  );

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      getValues: () => formInstance.values,
      setValues: (values) => {
        setFormInstance((prev) => ({
          ...prev,
          values: { ...prev.values, ...values },
        }));
      },
      getFieldValue: (name) => formInstance.values[name],
      setFieldValue: (name, value) => setFieldValue(name, value),
      resetFields: (fields) => {
        if (fields) {
          fields.forEach((name) => resetField(name));
        } else {
          Object.keys(formInstance.fields).forEach((name) => resetField(name));
        }
      },
      submit: async () => {
        const validationResults = await Promise.all(
          Object.keys(formInstance.fields).map((name) => validateField(name)),
        );

        const hasErrors = validationResults.some((result) => !result.valid);

        if (hasErrors) {
          const errors: FormErrors = {};
          validationResults.forEach((result, index) => {
            const fieldName = Object.keys(formInstance.fields)[index];
            if (!result.valid) {
              errors[fieldName] = result.errors;
            }
          });

          onFinishFailed?.(errors, formInstance.values);
          throw errors;
        }

        await onSubmit?.(formInstance.values, {} as ITouchEvent);
      },
      validate: async (fields) => {
        const fieldNames = fields || Object.keys(formInstance.fields);
        const validationResults = await Promise.all(fieldNames.map((name) => validateField(name)));

        const errors: FormErrors = {};
        let hasErrors = false;

        validationResults.forEach((result, index) => {
          const fieldName = fieldNames[index];
          if (!result.valid) {
            errors[fieldName] = result.errors;
            hasErrors = true;
          }
        });

        return {
          valid: !hasErrors,
          errors,
          values: formInstance.values,
        };
      },
      validateField: async (name) => validateField(name),
      validateFields: async (names) => {
        const validationResults = await Promise.all(names.map((name) => validateField(name)));

        const errors: FormErrors = {};
        let hasErrors = false;

        validationResults.forEach((result, index) => {
          const fieldName = names[index];
          if (!result.valid) {
            errors[fieldName] = result.errors;
            hasErrors = true;
          }
        });

        return {
          valid: !hasErrors,
          errors,
          values: formInstance.values,
        };
      },
      clearErrors: (fields) => {
        if (fields) {
          fields.forEach((name) => setFieldError(name, []));
        } else {
          setFormInstance((prev) => ({
            ...prev,
            errors: {},
          }));
        }
      },
      setErrors: (errors) => {
        setFormInstance((prev) => ({
          ...prev,
          errors: { ...prev.errors, ...errors },
        }));
      },
      getFieldError: (name) => getFieldError(name),
      getErrors: () => formInstance.errors,
      setFields: (fields) => {
        fields.forEach((field) => {
          if (field.name) {
            updateField(field.name, field);
          }
        });
      },
      getFields: () => Object.values(formInstance.fields),
      getFieldInfo: (name) => formInstance.fields[name] || null,
      setFieldsTouched: (touched) => {
        Object.keys(touched).forEach((name) => {
          setFieldTouched(name, touched[name]);
        });
      },
      setFieldsValidating: (validating) => {
        Object.keys(validating).forEach((name) => {
          setFieldValidating(name, validating[name]);
        });
      },
      addFieldRules: (name, newRules) => {
        setFormInstance((prev) => ({
          ...prev,
          rules: {
            ...prev.rules,
            [name]: [...(prev.rules[name] || []), ...newRules],
          },
          fields: {
            ...prev.fields,
            [name]: {
              ...prev.fields[name],
              rules: [...(prev.fields[name]?.rules || []), ...newRules],
            },
          },
        }));
      },
      removeFieldRules: (name) => {
        setFormInstance((prev) => ({
          ...prev,
          rules: { ...prev.rules, [name]: [] },
          fields: {
            ...prev.fields,
            [name]: {
              ...prev.fields[name],
              rules: [],
            },
          },
        }));
      },
      getFieldRules: (name) => formInstance.rules[name] || [],
      setStatus: (status) => updateFormInstance({ status }),
      getStatus: () => formInstance.status,
      setDisabled: (disabled) => updateFormInstance({ disabled }),
      setReadonly: (readonly) => updateFormInstance({ readonly }),
      scrollToField: (name) => {
        // 在实际实现中，这里会滚动到指定字段
        console.log('Scroll to field:', name);
      },
      getFormInstance: () => formInstance,
    }),
    [formInstance, validateField, setFieldValue, updateField, updateFormInstance, onFinishFailed, onSubmit],
  );

  // 生成表单样式
  const formStyle = formStyles.getStyle({
    layout,
    size,
    style,
  });

  // 生成表单类名
  const formClassName = formStyles.getClassName({
    layout,
    size,
    className,
  });

  return (
    <FormContext.Provider value={formContext}>
      <Form
        ref={formRef}
        className={formClassName}
        style={formStyle}
        onSubmit={handleSubmit}
        onReset={handleReset}
        accessible={accessible}
        aria-label={accessibilityLabel}
        aria-role={accessibilityRole}
        {...restProps}
      >
        {children}
      </Form>
    </FormContext.Provider>
  );
});

/** 表单组件显示名称 */
FormComponent.displayName = 'Form';

/** 导出表单组件 */
export const Form = FormComponent;
