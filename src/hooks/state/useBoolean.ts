/**
 * useBoolean Hook
 * 布尔状态管理 Hook，提供便捷的布尔值操作
 *
 * @example
 * ```typescript
 * const { value, setTrue, setFalse, toggle, setValue } = useBoolean(false);
 *
 * // 设置为 true
 * setTrue();
 *
 * // 设置为 false
 * setFalse();
 *
 * // 切换值
 * toggle();
 *
 * // 设置特定值
 * setValue(true);
 * ```
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * useBoolean Hook 返回类型
 */
export interface UseBooleanReturn {
  /** 当前布尔值 */
  value: boolean;
  /** 设置为 true */
  setTrue: () => void;
  /** 设置为 false */
  setFalse: () => void;
  /** 切换值 */
  toggle: () => void;
  /** 设置特定值 */
  setValue: (value: boolean) => void;
}

/**
 * useBoolean Hook 配置选项
 */
export interface UseBooleanOptions {
  /** 初始值 */
  initialValue?: boolean;
  /** 值变化回调 */
  onChange?: (value: boolean) => void;
}

/**
 * 布尔状态管理 Hook
 *
 * @param initialValue 初始值，默认为 false
 * @returns 布尔状态和操作方法
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);
 *
 *   return (
 *     <>
 *       <Button onClick={open}>打开弹窗</Button>
 *       {isOpen && (
 *         <Dialog onClose={close}>
 *           <Text>弹窗内容</Text>
 *         </Dialog>
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useBoolean(initialValue?: boolean): UseBooleanReturn;

/**
 * 布尔状态管理 Hook（带配置选项）
 *
 * @param options 配置选项
 * @returns 布尔状态和操作方法
 *
 * @example
 * ```tsx
 * function Toggle() {
 *   const { value, toggle } = useBoolean({
 *     initialValue: false,
 *     onChange: (newValue) => console.log('值变化:', newValue),
 *   });
 *
 *   return <Switch checked={value} onChange={toggle} />;
 * }
 * ```
 */
export function useBoolean(options?: UseBooleanOptions): UseBooleanReturn;

export function useBoolean(
  initialValueOrOptions?: boolean | UseBooleanOptions,
): UseBooleanReturn {
  // 解析参数
  const { initialValue, onChange } = useMemo(() => {
    if (initialValueOrOptions === undefined) {
      return { initialValue: false, onChange: undefined };
    }
    if (typeof initialValueOrOptions === 'boolean') {
      return { initialValue: initialValueOrOptions, onChange: undefined };
    }
    return {
      initialValue: initialValueOrOptions.initialValue ?? false,
      onChange: initialValueOrOptions.onChange,
    };
  }, []);

  const [value, setValueState] = useState<boolean>(initialValue);

  /**
   * 设置值并触发回调
   */
  const setValue = useCallback(
    (newValue: boolean) => {
      setValueState(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  /**
   * 设置为 true
   */
  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  /**
   * 设置为 false
   */
  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  /**
   * 切换值
   */
  const toggle = useCallback(() => {
    setValueState((prev) => {
      const newValue = !prev;
      onChange?.(newValue);
      return newValue;
    });
  }, [onChange]);

  return {
    value,
    setTrue,
    setFalse,
    toggle,
    setValue,
  };
}

export default useBoolean;
