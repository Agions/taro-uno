import React, { forwardRef, createContext } from 'react';
import { Form as TaroForm } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { formStyles } from './Form.styles';
import type { FormProps, FormRef, FormContext, FormErrors } from './Form.types';
import { useFormLogic } from './useFormLogic';

// 创建表单上下文
export const FormContextProvider = createContext<FormContext | null>(null);

// 导出FormContext
export type { FormContext } from './Form.types';

/** 表单组件 */
export const FormComponent = forwardRef<FormRef, FormProps>((props, ref) => {
  const { layout = 'horizontal', size = 'md', className, style, children, ...restProps } = props;

  // Filter out React DOM event handlers that are incompatible with TaroForm
  const filteredProps = Object.fromEntries(
    Object.entries(restProps).filter(
      ([key]) => !key.startsWith('on') || key.includes('Click') || key.includes('Touch'),
    ),
  );

  const {
    formInstance,
    formContext,
    handleSubmit,
    handleReset,
    updateFormInstance,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setFieldValidating,
    validateField,
    resetField,
    updateField,
    getFieldError,
  } = useFormLogic(props);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      getValues: () => formInstance.values,
      setValues: (values) => {
        updateFormInstance({
          values: { ...formInstance.values, ...values },
        });
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
            if (fieldName && !result.valid) {
              errors[fieldName] = result.errors;
            }
          });

          props.onFinishFailed?.(errors, formInstance.values);
          throw errors;
        }

        await props.onSubmit?.(formInstance.values, {} as ITouchEvent);
      },
      validate: async (fields) => {
        const fieldNames = fields || Object.keys(formInstance.fields);
        const validationResults = await Promise.all(fieldNames.map((name) => validateField(name)));

        const errors: FormErrors = {};
        let hasErrors = false;

        validationResults.forEach((result, index) => {
          const fieldName = fieldNames[index];
          if (fieldName && !result.valid) {
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
          if (fieldName && !result.valid) {
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
          updateFormInstance({ errors: {} });
        }
      },
      setErrors: (errors) => {
        updateFormInstance({
          errors: { ...formInstance.errors, ...errors },
        });
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
          setFieldTouched(name, touched[name] as boolean);
        });
      },
      setFieldsValidating: (validating) => {
        Object.keys(validating).forEach((name) => {
          setFieldValidating(name, validating[name] as boolean);
        });
      },
      addFieldRules: (name, newRules) => {
        updateFormInstance({
          rules: {
            ...formInstance.rules,
            [name]: [...(formInstance.rules[name] || []), ...newRules],
          },
          fields: {
            ...formInstance.fields,
            [name]: {
              ...(formInstance.fields[name] || {
                name,
                value: '',
                errors: [],
                touched: false,
                validating: false,
                rules: [],
              }),
              rules: [...(formInstance.fields[name]?.rules || []), ...newRules],
            },
          },
        });
      },
      removeFieldRules: (name) => {
        updateFormInstance({
          rules: { ...formInstance.rules, [name]: [] },
          fields: {
            ...formInstance.fields,
            [name]: {
              ...(formInstance.fields[name] || {
                name,
                value: '',
                errors: [],
                touched: false,
                validating: false,
                rules: [],
              }),
              rules: [],
            },
          },
        });
      },
      getFieldRules: (name) => formInstance.rules[name] || [],
      setStatus: (status) => updateFormInstance({ status }),
      getStatus: () => formInstance.status,
      setDisabled: (disabled) => updateFormInstance({ disabled }),
      setReadonly: (readonly) => updateFormInstance({ readonly }),
      scrollToField: (_name) => {
        // 在实际实现中，这里会滚动到指定字段
      },
      getFormInstance: () => formInstance,
    }),
    [
      formInstance,
      validateField,
      setFieldValue,
      updateField,
      updateFormInstance,
      props.onFinishFailed,
      props.onSubmit,
      setFieldError,
      getFieldError,
      setFieldTouched,
      setFieldValidating,
      resetField,
    ],
  );

  // 生成表单样式
  const formStyle = formStyles['getStyle']({
    layout,
    size,
    style,
  });

  // 生成表单类名
  const formClassName = formStyles['getClassName']({
    layout,
    size,
    className,
  });

  return (
    <FormContextProvider.Provider value={formContext}>
      <TaroForm
        className={formClassName}
        style={formStyle}
        onSubmit={handleSubmit}
        onReset={handleReset}
        {...filteredProps}
      >
        {children}
      </TaroForm>
    </FormContextProvider.Provider>
  );
});

/** 表单组件显示名称 */
FormComponent.displayName = 'Form';

/** 导出表单组件 */
export { FormComponent as Form };
