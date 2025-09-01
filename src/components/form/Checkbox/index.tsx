/**
 * Taro-Uno Checkbox Component
 * 复选框组件，支持单选和多选功能，提供完整的表单验证和无障碍访问支持
 */

export { Checkbox } from './Checkbox';
export { CheckboxGroup } from './CheckboxGroup';
export type {
  CheckboxProps,
  CheckboxRef,
  CheckboxSize,
  CheckboxStatus,
  CheckboxVariant,
  CheckboxColor,
  CheckboxGroupProps,
  CheckboxGroupRef,
  CheckboxStyleConfig,
  CheckboxContext,
  CheckboxValidationResult,
  CheckboxEvents,
  CheckboxGroupEvents,
  CheckboxUtils,
  CheckboxOption,
  CheckboxGroupOption,
  CheckboxConfig,
} from './Checkbox.types';
export { checkboxStyles } from './Checkbox.styles';

// 默认导出
export default Checkbox;