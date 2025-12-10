import { useMemo, useCallback } from 'react';
import type {
  TransferOption,
  TransferDataSource,
  TransferValue,
  TransferPaginationConfig,
  TransferProps,
} from '../Transfer.types';

/** Transfer数据处理Hook */
export function useTransferData(
  dataSource: TransferDataSource,
  targetKeys: TransferValue,
  filterOption?: TransferProps['filterOption'],
) {
  // 分割数据源
  const splitDataSource = useMemo(() => {
    const leftDataSource: TransferOption[] = [];
    const rightDataSource: TransferOption[] = [];

    dataSource.forEach((item) => {
      if (targetKeys.includes(item.key)) {
        rightDataSource.push(item);
      } else {
        leftDataSource.push(item);
      }
    });

    return { leftDataSource, rightDataSource };
  }, [dataSource, targetKeys]);

  // 过滤数据源
  const filterDataSource = useCallback(
    (data: TransferDataSource, searchValue: string) => {
      if (!searchValue) return data;

      return data.filter((item) => {
        if (filterOption) {
          return filterOption(searchValue, item);
        }

        const searchText = searchValue.toLowerCase();
        const title = String(item.title).toLowerCase();
        const description = item.description ? String(item.description).toLowerCase() : '';

        return title.includes(searchText) || description.includes(searchText);
      });
    },
    [filterOption],
  );

  // 获取分页配置
  const getPaginationConfig = useCallback((pagination?: boolean | TransferPaginationConfig) => {
    if (pagination === false) return null;

    if (pagination === true) {
      return { pageSize: 10, simple: false, showSizeChanger: false, showQuickJumper: false };
    }

    return {
      pageSize: pagination?.pageSize || 10,
      simple: pagination?.simple || false,
      showSizeChanger: pagination?.showSizeChanger || false,
      showQuickJumper: pagination?.showQuickJumper || false,
    };
  }, []);

  // 获取分页数据
  const getPaginatedData = useCallback(
    (data: TransferDataSource, page: number, pagination?: boolean | TransferPaginationConfig) => {
      const config = getPaginationConfig(pagination);
      if (!config) return { data, total: data.length, page, totalPages: 1 };

      const { pageSize } = config;
      const total = data.length;
      const totalPages = Math.ceil(total / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = data.slice(startIndex, endIndex);

      return { data: paginatedData, total, page, totalPages };
    },
    [getPaginationConfig],
  );

  // 查找选项
  const findOptions = useCallback(
    (keys: TransferValue) => {
      return dataSource.filter((item) => keys.includes(item.key));
    },
    [dataSource],
  );

  // 验证值
  const validateValue = useCallback(
    (value: TransferValue) => {
      const validKeys = dataSource.map((option) => option.key);
      return value.every((key) => validKeys.includes(key));
    },
    [dataSource],
  );

  // 获取选中的选项
  const getSelectedOptions = useCallback(
    (selectedKeys: TransferValue) => {
      return dataSource.filter((item) => selectedKeys.includes(item.key));
    },
    [dataSource],
  );

  // 获取目标选项
  const getTargetOptions = useCallback(() => {
    return dataSource.filter((item) => targetKeys.includes(item.key));
  }, [dataSource, targetKeys]);

  // 获取源选项
  const getSourceOptions = useCallback(() => {
    return dataSource.filter((item) => !targetKeys.includes(item.key));
  }, [dataSource, targetKeys]);

  // 获取禁用的选项
  const getDisabledOptions = useCallback(() => {
    return dataSource.filter((item) => item.disabled);
  }, [dataSource]);

  // 计算选中状态
  const calculateSelectionState = useCallback((data: TransferDataSource, selectedKeys: TransferValue) => {
    const enabledData = data.filter((item) => !item.disabled);
    const totalCount = enabledData.length;
    const selectedCount = enabledData.filter((item) => selectedKeys.includes(item.key)).length;

    const allSelected = totalCount > 0 && selectedCount === totalCount;
    const noneSelected = selectedCount === 0;
    const partiallySelected = !allSelected && !noneSelected;

    return {
      allSelected,
      partiallySelected,
      noneSelected,
      selectedCount,
      totalCount,
    };
  }, []);

  // 批量更新选项状态
  const updateOptionsStatus = useCallback(
    (options: TransferDataSource, updates: { key: string | number; disabled?: boolean; selected?: boolean }[]) => {
      return options.map((option) => {
        const update = updates.find((u) => u.key === option.key);
        if (update) {
          return { ...option, ...update };
        }
        return option;
      });
    },
    [],
  );

  // 去重选项
  const uniqueOptions = useCallback((options: TransferDataSource) => {
    const seen = new Set();
    return options.filter((option) => {
      if (seen.has(option.key)) {
        return false;
      }
      seen.add(option.key);
      return true;
    });
  }, []);

  // 排序选项
  const sortOptions = useCallback(
    (options: TransferDataSource, sortBy: keyof TransferOption, order: 'asc' | 'desc' = 'asc') => {
      return [...options].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      });
    },
    [],
  );

  return {
    splitDataSource,
    filterDataSource,
    getPaginationConfig,
    getPaginatedData,
    findOptions,
    validateValue,
    getSelectedOptions,
    getTargetOptions,
    getSourceOptions,
    getDisabledOptions,
    calculateSelectionState,
    updateOptionsStatus,
    uniqueOptions,
    sortOptions,
  };
}
