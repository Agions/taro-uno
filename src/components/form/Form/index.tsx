/**
 * Taro-Uno Form Component
 * 表单组件，提供完整的表单验证和状态管理功能
 */

export { FormComponent as Form, FormContext } from './Form';
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
export { formStyles } from './Form.styles';

// 默认导出
export { FormComponent as default } from './Form';
