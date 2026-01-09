/**
 * 状态管理 Hooks 统一导出
 * @module hooks/state
 */

export { useBoolean } from './useBoolean';
export type { UseBooleanReturn, UseBooleanOptions } from './useBoolean';

export { useToggle } from './useToggle';
export type { UseToggleReturn, UseToggleOptions } from './useToggle';

export { useCounter } from './useCounter';
export type { UseCounterOptions, UseCounterReturn } from './useCounter';

export { usePrevious } from './usePrevious';

export { useLocalStorage, useSessionStorage } from './useStorage';
export type { UseStorageOptions } from './useStorage';
