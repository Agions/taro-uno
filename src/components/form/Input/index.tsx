/**
 * Taro-Uno Input Component
 * 输入框组件，支持多种类型、状态和验证功能
 */

export { Input } from './Input';
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
} from './Input.types';
export { inputStyles } from './Input.styles';

// 默认导出
export default Input;
