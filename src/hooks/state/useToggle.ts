/**
 * useToggle Hook
 * 切换状态管理 Hook，支持在两个值之间切换
 *
 * @example
 * ```typescript
 * // 布尔切换
 * const { value, toggle, setLeft, setRight } = useToggle();
 * toggle(); // true -> false -> true
 *
 * // 自定义值切换
 * const { value, toggle } = useToggle('light', 'dark');
 * toggle(); // 'light' -> 'dark' -> 'light'
 * ```
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * useToggle Hook 返回类型
 */
export interface UseToggleReturn<T = boolean> {
  /** 当前值 */
  value: T;
  /** 切换值 */
  toggle: () => void;
  /** 设置为左值（第一个值） */
  setLeft: () => void;
  /** 设置为右值（第二个值） */
  setRight: () => void;
  /** 设置特定值 */
  setValue: (value: T) => void;
}

/**
 * useToggle Hook 配置选项
 */
export interface UseToggleOptions<T> {
  /** 左值（第一个值） */
  left: T;
  /** 右值（第二个值） */
  right: T;
  /** 初始值 */
  initialValue?: T;
  /** 值变化回调 */
  onChange?: (value: T) => void;
}

/**
 * 布尔切换 Hook
 *
 * @param defaultValue 默认值，默认为 false
 * @returns 切换状态和操作方法
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { value: isDark, toggle } = useToggle(false);
 *
 *   return (
 *     <Button onClick={toggle}>
 *       {isDark ? '切换到亮色' : '切换到暗色'}
 *     </Button>
 *   );
 * }
 * ```
 */
export function useToggle(defaultValue?: boolean): UseToggleReturn<boolean>;

/**
 * 自定义值切换 Hook
 *
 * @param leftValue 左值（第一个值）
 * @param rightValue 右值（第二个值）
 * @returns 切换状态和操作方法
 *
 * @example
 * ```tsx
 * function LanguageToggle() {
 *   const { value: lang, toggle, setLeft, setRight } = useToggle('zh', 'en');
 *
 *   return (
 *     <View>
 *       <Text>当前语言: {lang}</Text>
 *       <Button onClick={toggle}>切换语言</Button>
 *       <Button onClick={setLeft}>中文</Button>
 *       <Button onClick={setRight}>English</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useToggle<T>(leftValue: T, rightValue: T): UseToggleReturn<T>;

/**
 * 带配置选项的切换 Hook
 *
 * @param options 配置选项
 * @returns 切换状态和操作方法
 *
 * @example
 * ```tsx
 * function StatusToggle() {
 *   const { value, toggle } = useToggle({
 *     left: 'active',
 *     right: 'inactive',
 *     initialValue: 'active',
 *     onChange: (status) => console.log('状态变化:', status),
 *   });
 *
 *   return <Button onClick={toggle}>{value}</Button>;
 * }
 * ```
 */
export function useToggle<T>(options: UseToggleOptions<T>): UseToggleReturn<T>;

export function useToggle<T = boolean>(
  leftValueOrOptions?: T | boolean | UseToggleOptions<T>,
  rightValue?: T,
): UseToggleReturn<T> {
  // 解析参数
  const { left, right, initialValue, onChange } = useMemo(() => {
    // 无参数：布尔切换
    if (leftValueOrOptions === undefined) {
      return {
        left: false as unknown as T,
        right: true as unknown as T,
        initialValue: false as unknown as T,
        onChange: undefined,
      };
    }

    // 布尔值参数：布尔切换
    if (typeof leftValueOrOptions === 'boolean' && rightValue === undefined) {
      return {
        left: false as unknown as T,
        right: true as unknown as T,
        initialValue: leftValueOrOptions as unknown as T,
        onChange: undefined,
      };
    }

    // 配置对象参数
    if (
      typeof leftValueOrOptions === 'object' &&
      leftValueOrOptions !== null &&
      'left' in leftValueOrOptions &&
      'right' in leftValueOrOptions
    ) {
      const options = leftValueOrOptions as UseToggleOptions<T>;
      return {
        left: options.left,
        right: options.right,
        initialValue: options.initialValue ?? options.left,
        onChange: options.onChange,
      };
    }

    // 两个值参数：自定义值切换
    return {
      left: leftValueOrOptions as T,
      right: rightValue as T,
      initialValue: leftValueOrOptions as T,
      onChange: undefined,
    };
  }, []);

  const [value, setValueState] = useState<T>(initialValue);

  /**
   * 设置值并触发回调
   */
  const setValue = useCallback(
    (newValue: T) => {
      setValueState(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  /**
   * 切换值
   */
  const toggle = useCallback(() => {
    setValueState((prev) => {
      const newValue = prev === left ? right : left;
      onChange?.(newValue);
      return newValue;
    });
  }, [left, right, onChange]);

  /**
   * 设置为左值
   */
  const setLeft = useCallback(() => {
    setValue(left);
  }, [left, setValue]);

  /**
   * 设置为右值
   */
  const setRight = useCallback(() => {
    setValue(right);
  }, [right, setValue]);

  return {
    value,
    toggle,
    setLeft,
    setRight,
    setValue,
  };
}

export default useToggle;
