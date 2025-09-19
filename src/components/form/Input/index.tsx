/**
 * Taro-Uno Input Component
 * 输入框组件，支持多种类型、状态和验证功能
 */

// Export the Input component and its types
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
  // ClearTrigger already exported by form/index.tsx, avoiding conflict
} from './Input.types';
export { inputStyles } from './Input.styles';

// Default export for convenience
export { Input as default } from './Input';
