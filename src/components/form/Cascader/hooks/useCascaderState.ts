import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CascaderValue, CascaderOption, CascaderProps } from '../Cascader.types';
import { useCascaderOptions } from './useCascaderOptions';

/**
 * 级联选择器状态管理Hook
 * 提供统一的状态管理逻辑
 */
export function useCascaderState(options: CascaderOption[], props: CascaderProps) {
  const {
    value: controlledValue,
    defaultValue = null,
    defaultOpen = false,
    open: controlledOpen,
    fieldNames,
    onChange,
    onMultipleChange,
    onDropdownVisibleChange,
  } = props;

  const { findOptionPath } = useCascaderOptions(options, fieldNames);

  // 受控/非受控状态
  const isControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;

  // 内部状态
  const [internalValue, setInternalValue] = useState<CascaderValue | null>(defaultValue);
  const [internalMultipleValues, setInternalMultipleValues] = useState<CascaderValue[]>([]);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [selectedOptions, setSelectedOptions] = useState<CascaderOption[]>([]);
  const [expandedValues, setExpandedValues] = useState<CascaderValue[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // 当前值
  const value = useMemo(() => {
    return isControlled ? controlledValue : internalValue;
  }, [isControlled, controlledValue, internalValue]);

  // 当前展开状态
  const open = useMemo(() => {
    return isOpenControlled ? controlledOpen : internalOpen;
  }, [isOpenControlled, controlledOpen, internalOpen]);

  // 更新选中选项
  useEffect(() => {
    if (value) {
      const path = findOptionPath(value);
      setSelectedOptions(path);
    } else {
      setSelectedOptions([]);
    }
  }, [value, findOptionPath]);

  // 处理下拉框状态变化
  useEffect(() => {
    onDropdownVisibleChange?.(open);
  }, [open, onDropdownVisibleChange]);

  // 设置值
  const setValue = useCallback(
    (newValue: CascaderValue | null, newSelectedOptions: CascaderOption[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue, newSelectedOptions);
    },
    [isControlled, onChange],
  );

  // 设置多选值
  const setMultipleValue = useCallback(
    (newValues: CascaderValue[], newSelectedOptions: CascaderOption[][]) => {
      if (!isControlled) {
        setInternalMultipleValues(newValues);
      }
      onMultipleChange?.(newValues, newSelectedOptions);
    },
    [isControlled, onMultipleChange],
  );

  // 设置展开状态
  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onDropdownVisibleChange?.(newOpen);
    },
    [isOpenControlled, onDropdownVisibleChange],
  );

  // 清除所有状态
  const clearAll = useCallback(() => {
    if (!isControlled) {
      setInternalValue(null);
      setInternalMultipleValues([]);
    }
    setSelectedOptions([]);
    setExpandedValues([]);
    setSearchValue('');
    onChange?.(null, []);
    onMultipleChange?.([], []);
  }, [isControlled, onChange, onMultipleChange]);

  // 重置状态
  const reset = useCallback(() => {
    if (!isControlled) {
      setInternalValue(defaultValue);
    }
    setSelectedOptions(defaultValue ? findOptionPath(defaultValue) : []);
    setExpandedValues(defaultValue ? [defaultValue] : []);
    setSearchValue('');
  }, [isControlled, defaultValue, findOptionPath]);

  return {
    // 状态值
    value,
    open,
    selectedOptions,
    expandedValues,
    searchValue,
    internalMultipleValues,

    // 状态设置函数
    setValue,
    setMultipleValue,
    setOpen,
    setSelectedOptions,
    setExpandedValues,
    setSearchValue,
    clearAll,
    reset,

    // 受控状态标记
    isControlled,
    isOpenControlled,
  };
}
