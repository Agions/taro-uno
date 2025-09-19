import { useMemo } from 'react';
import type { CascaderProps } from '../Cascader.types';

/**
 * 级联选择器字段映射Hook
 * 提供类型安全的字段名称映射
 */
export function useCascaderFieldNames(fieldNames?: CascaderProps['fieldNames']) {
  return useMemo(() => ({
    value: fieldNames?.value || 'value',
    label: fieldNames?.label || 'label',
    children: fieldNames?.children || 'children',
    disabled: fieldNames?.disabled || 'disabled',
    isLeaf: fieldNames?.isLeaf || 'isLeaf',
  }), [fieldNames]);
}