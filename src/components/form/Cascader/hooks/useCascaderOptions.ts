import { useMemo, useCallback } from 'react';
import type { CascaderOption, CascaderValue, CascaderProps } from '../Cascader.types';
import { useCascaderFieldNames } from './useCascaderFieldNames';

/**
 * 级联选择器选项处理Hook
 * 提供高性能的选项查找和路径处理
 */
export function useCascaderOptions(options: CascaderOption[], fieldNames?: CascaderProps['fieldNames']) {
  const fields = useCascaderFieldNames(fieldNames);

  // 查找选项路径 - 使用深度优先搜索优化
  const findOptionPath = useCallback(
    (targetValue: CascaderValue): CascaderOption[] => {
      if (!targetValue || targetValue.length === 0) return [];

      const findPath = (
        currentOptions: CascaderOption[],
        valuePath: CascaderValue,
        currentPath: CascaderOption[] = [],
      ): CascaderOption[] | null => {
        for (const option of currentOptions) {
          const currentPathOption = [...currentPath, option];

          if (option[fields.value as keyof typeof option] === valuePath[0]) {
            if (valuePath.length === 1) {
              return currentPathOption;
            }

            const children = option[fields.children as keyof typeof option] as CascaderOption[] | undefined;
            if (children) {
              const found = findPath(children, valuePath.slice(1), currentPathOption);
              if (found) return found;
            }
          }
        }
        return null;
      };

      return findPath(options, targetValue) || [];
    },
    [options, fields],
  );

  // 获取选项值
  const getOptionValue = useCallback(
    (option: CascaderOption): CascaderValue => {
      const value = option[fields.value as keyof typeof option] as string | number;
      return Array.isArray(value) ? value : [value];
    },
    [fields],
  );

  // 获取选项标签
  const getOptionLabel = useCallback(
    (option: CascaderOption) => {
      return option[fields.label as keyof typeof option];
    },
    [fields],
  );

  // 检查选项是否有子项
  const hasChildren = useCallback(
    (option: CascaderOption) => {
      const children = option[fields.children as keyof typeof option] as CascaderOption[] | undefined;
      return children && children.length > 0;
    },
    [fields],
  );

  // 检查选项是否禁用
  const isOptionDisabled = useCallback(
    (option: CascaderOption) => {
      return !!option[fields.disabled as keyof typeof option];
    },
    [fields],
  );

  // 检查选项是否为叶子节点
  const isOptionLeaf = useCallback(
    (option: CascaderOption) => {
      return !!option[fields.isLeaf as keyof typeof option];
    },
    [fields],
  );

  // 展平选项用于搜索
  const flattenOptions = useMemo(() => {
    const flatten = (currentOptions: CascaderOption[]): CascaderOption[] => {
      return currentOptions.reduce<CascaderOption[]>((acc, option) => {
        acc.push(option);
        const children = option[fields.children as keyof typeof option] as CascaderOption[] | undefined;
        if (children) {
          acc.push(...flatten(children));
        }
        return acc;
      }, []);
    };

    return flatten(options);
  }, [options, fields]);

  // 过滤选项
  const filterOptions = useCallback(
    (searchTerm: string): CascaderOption[] => {
      if (!searchTerm.trim()) return [];

      const term = searchTerm.toLowerCase();
      return flattenOptions.filter((option) => {
        const label = String(getOptionLabel(option)).toLowerCase();
        return label.includes(term);
      });
    },
    [flattenOptions, getOptionLabel],
  );

  return {
    findOptionPath,
    getOptionValue,
    getOptionLabel,
    hasChildren,
    isOptionDisabled,
    isOptionLeaf,
    flattenOptions,
    filterOptions,
  };
}
