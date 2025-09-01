/**
 * Taro-Uno Form Components Types
 * 表单组件类型定义统一文件
 */

// 重新导出所有表单组件的类型
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
  FormContext as FormContextType,
  FormItemContext,
  FormUtils,
  FormStyleConfig,
} from '../Form.types';

export type {
  InputProps,
  InputRef,
  InputSize,
  InputType,
  InputVariant,
  InputStatus,
  InputGroupProps,
  InputUtils,
  InputValidationResult,
  InputEvents,
  InputStyleConfig,
  InputContext,
  ClearTrigger,
} from '../Input.types';

export type {
  SelectProps,
  SelectRef,
  SelectSize,
  SelectVariant,
  SelectStatus,
  SelectMode,
  SelectOption,
  SelectOptionGroup,
  SelectGroupProps,
  SelectUtils,
  SelectValidationResult,
  SelectEvents,
  SelectStyleConfig,
  SelectContext,
  TagRenderProps,
  OptionRenderProps,
  OptionGroupRenderProps,
  DropdownRenderProps,
} from '../Select.types';

export type {
  CheckboxProps,
  CheckboxRef,
  CheckboxSize,
  CheckboxStatus,
  CheckboxGroupProps,
  CheckboxGroupRef,
  CheckboxStyleConfig,
} from '../Checkbox.types';

export type {
  RadioProps,
  RadioRef,
  RadioSize,
  RadioStatus,
  RadioGroupProps,
  RadioGroupRef,
  RadioStyleConfig,
} from '../Radio.types';
