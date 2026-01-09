/**
 * Taro-Uno Form Component
 * 表单组件，提供完整的表单验证和状态管理功能
 */

// 导出主组件
export { Form, FormContextProvider } from './Form';
export type { FormContext } from './Form';

// 导出子组件
export { FormItem } from './FormItem';

// 导出上下文 Hooks
export {
  useFormContext,
  useFormItemContext,
  useFormField,
  useFormState,
  useFormMethods,
  useFormConfig,
  FormItemContextProvider,
} from './FormContext';

// 导出类型
export type {
  FormProps,
  FormRef,
  FormInstance,
  FormItemProps,
  FormLayout,
  FormLabelAlign,
  FormSize,
  FormStatus,
  FormFieldStatus,
  FormValues,
  FormErrors,
  FormTouched,
  FormFieldInfo,
  FormRule,
  FormUtils,
  FormStyleConfig,
  FormContext as FormContextType,
  FormItemContext,
} from './Form.types';

// 导出样式
export { formStyles } from './Form.styles';

// 导出逻辑 Hook
export { useFormLogic } from './useFormLogic';

// 默认导出
export { Form as default } from './Form';
