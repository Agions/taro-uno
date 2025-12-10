import type { ReactNode, CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import type { Size as ComponentSize, Status as ComponentStatus } from '../../../types';

/** 分页配置接口 */
export interface TransferPaginationConfig {
  /** 每页条数 */
  pageSize?: number;
  /** 是否简洁模式 */
  simple?: boolean;
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 当前页码 */
  current?: number;
  /** 总条数 */
  total?: number;
  /** 页码变化回调 */
  onChange?: (_page: number, _pageSize: number) => void;
}

/** 搜索框渲染属性 */
export interface SearchRenderProps {
  /** 占位符 */
  placeholder: string;
  /** 当前值 */
  value: string;
  /** 值变化回调 */
  onChange: (_value: string) => void;
  /** 方向 */
  direction: TransferDirection;
}

/** 列表渲染属性 */
export interface ListRenderProps {
  /** 方向 */
  direction: TransferDirection;
  /** 数据源 */
  dataSource: TransferDataSource;
  /** 目标键 */
  targetKeys: TransferValue;
  /** 选中键 */
  selectedKeys: TransferValue;
  /** 是否禁用 */
  disabled: boolean;
  /** 搜索值 */
  searchValue: string;
  /** 当前页码 */
  page: number;
}

/** 穿梭框选项类型 */
export interface TransferOption {
  /** 选项值 */
  key: string | number;
  /** 选项标题 */
  title: ReactNode;
  /** 选项描述 */
  description?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义属性 */
  [key: string]: any;
}

/** 穿梭框数据源类型 */
export type TransferDataSource = TransferOption[];

/** 穿梭框选中值类型 */
export type TransferValue = (string | number)[];

/** 穿梭框方向类型 */
export type TransferDirection = 'left' | 'right';

/** 穿梭框尺寸 */
export type TransferSize = ComponentSize | 'small' | 'medium' | 'large';

/** 穿梭框状态 */
export type TransferStatus = ComponentStatus | 'default' | 'error' | 'warning' | 'success';

/** 穿梭框布局 */
export type TransferLayout = 'horizontal' | 'vertical';

/** 穿梭框渲染位置 */
export type TransferRenderPosition = 'left' | 'right';

/** 穿梭框原生属性 */
export interface TransferNativeProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件类名 */
  className?: string;
  /** 组件样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: (_event: ITouchEvent) => void;
  /** 长按事件 */
  onLongPress?: (_event: ITouchEvent) => void;
  /** 触摸开始事件 */
  onTouchStart?: (_event: ITouchEvent) => void;
  /** 触摸移动事件 */
  onTouchMove?: (_event: ITouchEvent) => void;
  /** 触摸结束事件 */
  onTouchEnd?: (_event: ITouchEvent) => void;
  /** 触摸取消事件 */
  onTouchCancel?: (_event: ITouchEvent) => void;
  /** 数据集属性 */
  dataset?: Record<string, any>;
  /** 自定义属性 */
  [key: string]: any;
}

/** 穿梭框属性接口 */
export interface TransferProps extends Omit<TransferNativeProps, 'onChange'> {
  /** 数据源 */
  dataSource: TransferDataSource;
  /** 目标键集合 */
  targetKeys?: TransferValue;
  /** 默认目标键集合 */
  defaultTargetKeys?: TransferValue;
  /** 选中键集合 */
  selectedKeys?: TransferValue;
  /** 默认选中键集合 */
  defaultSelectedKeys?: TransferValue;
  /** 尺寸 */
  size?: TransferSize;
  /** 状态 */
  status?: TransferStatus;
  /** 布局 */
  layout?: TransferLayout;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否显示全选 */
  showSelectAll?: boolean;
  /** 是否显示操作按钮 */
  showOperations?: boolean;
  /** 是否一列显示 */
  oneWay?: boolean;
  /** 分页 */
  pagination?: boolean | TransferPaginationConfig;
  /** 操作按钮文本 */
  operations?: string[] | ReactNode[];
  /** 标题 */
  titles?: ReactNode[];
  /** 无数据文本 */
  notFoundContent?: ReactNode;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 过滤函数 */
  filterOption?: (_inputValue: string, _option: TransferOption) => boolean;
  /** 自定义渲染函数 */
  render?: (_item: TransferOption) => ReactNode;
  /** 自定义底部渲染 */
  footer?: (_props: { direction: TransferDirection; dataSource: TransferDataSource[] }) => ReactNode;
  /** 自定义列表渲染 */
  listStyle?: (_direction: TransferDirection) => CSSProperties;
  /** 自定义选项渲染 */
  optionRender?: (_option: TransferOption) => ReactNode;
  /** 自定义行渲染 */
  rowRender?: (_item: TransferOption, _index: number, _direction: TransferDirection) => ReactNode;
  /** 自定义搜索框渲染 */
  searchRender?: (_props: SearchRenderProps) => ReactNode;
  /** 自定义操作按钮渲染 */
  operationRender?: (_direction: TransferDirection) => ReactNode;
  /** 自定义空状态渲染 */
  emptyRender?: (_direction: TransferDirection) => ReactNode;
  /** 值变化回调 */
  onChange?: (_targetKeys: TransferValue, _direction: TransferDirection, _moveKeys: TransferValue) => void;
  /** 选中变化回调 */
  onSelectChange?: (_sourceSelectedKeys: TransferValue, _targetSelectedKeys: TransferValue) => void;
  /** 搜索回调 */
  onSearch?: (_direction: TransferDirection, _value: string) => void;
  /** 滚动回调 */
  onScroll?: (_direction: TransferDirection, _e: React.UIEvent<HTMLDivElement>) => void;
  /** 无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
  };
}

/** 穿梭框引用接口 */
export interface TransferRef {
  /** 获取目标键集合 */
  getTargetKeys: () => TransferValue;
  /** 设置目标键集合 */
  setTargetKeys: (keys: TransferValue) => void;
  /** 获取选中键集合 */
  getSelectedKeys: () => TransferValue;
  /** 设置选中键集合 */
  setSelectedKeys: (keys: TransferValue) => void;
  /** 获取数据源 */
  getDataSource: () => TransferDataSource;
  /** 设置数据源 */
  setDataSource: (data: TransferDataSource) => void;
  /** 移动选项 */
  moveTo: (direction: TransferDirection, keys: TransferValue) => void;
  /** 全选 */
  selectAll: (direction: TransferDirection) => void;
  /** 清空选择 */
  clearSelect: (direction: TransferDirection) => void;
  /** 搜索 */
  search: (direction: TransferDirection, value: string) => void;
  /** 清空搜索 */
  clearSearch: (direction: TransferDirection) => void;
  /** 禁用 */
  disable: () => void;
  /** 启用 */
  enable: () => void;
  /** 重置 */
  reset: () => void;
  /** 获取选中的选项 */
  getSelectedItems: () => TransferOption[];
  /** 获取目标选项 */
  getTargetItems: () => TransferOption[];
  /** 获取源选项 */
  getSourceItems: () => TransferOption[];
}

/** 穿梭框配置接口 */
export interface TransferConfig {
  /** 数据源 */
  dataSource: TransferDataSource;
  /** 默认目标键集合 */
  defaultTargetKeys?: TransferValue;
  /** 尺寸 */
  size?: TransferSize;
  /** 状态 */
  status?: TransferStatus;
  /** 布局 */
  layout?: TransferLayout;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否显示全选 */
  showSelectAll?: boolean;
  /** 标题 */
  titles?: ReactNode[];
  /** 无数据文本 */
  notFoundContent?: ReactNode;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 过滤函数 */
  filterOption?: (inputValue: string, option: TransferOption) => boolean;
}

/** 穿梭框工具函数接口 */
export interface TransferUtils {
  /** 过滤选项 */
  filterOptions: (
    options: TransferDataSource,
    inputValue: string,
    filterOption?: TransferProps['filterOption'],
  ) => TransferDataSource;
  /** 查找选项 */
  findOptions: (options: TransferDataSource, keys: TransferValue) => TransferOption[];
  /** 验证值 */
  validateValue: (value: TransferValue, options: TransferDataSource) => boolean;
  /** 分割数据源 */
  splitDataSource: (
    dataSource: TransferDataSource,
    targetKeys: TransferValue,
  ) => {
    leftDataSource: TransferDataSource;
    rightDataSource: TransferDataSource;
  };
  /** 生成分页数据 */
  generatePaginationData: (
    data: TransferDataSource,
    currentPage: number,
    pageSize: number,
  ) => {
    data: TransferDataSource;
    total: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
  /** 获取选中的选项 */
  getSelectedOptions: (options: TransferDataSource, selectedKeys: TransferValue) => TransferOption[];
  /** 获取禁用的选项 */
  getDisabledOptions: (options: TransferDataSource) => TransferOption[];
  /** 排序选项 */
  sortOptions: (options: TransferDataSource, sortBy: keyof TransferOption, order: 'asc' | 'desc') => TransferDataSource;
  /** 去重选项 */
  uniqueOptions: (options: TransferDataSource) => TransferDataSource;
}

/** 穿梭框事件接口 */
export interface TransferEvents {
  /** 值变化事件 */
  onChange?: (_targetKeys: TransferValue, _direction: TransferDirection, _moveKeys: TransferValue) => void;
  /** 选中变化事件 */
  onSelectChange?: (_sourceSelectedKeys: TransferValue, _targetSelectedKeys: TransferValue) => void;
  /** 搜索事件 */
  onSearch?: (_direction: TransferDirection, _value: string) => void;
  /** 滚动事件 */
  onScroll?: (_direction: TransferDirection, _e: React.UIEvent<HTMLDivElement>) => void;
}

/** 穿梭框样式接口 */
export interface TransferStyles {
  /** 获取基础样式 */
  getBaseStyle: () => CSSProperties;
  /** 获取尺寸样式 */
  getSizeStyle: (size: TransferSize) => CSSProperties;
  /** 获取状态样式 */
  getStatusStyle: (status: TransferStatus) => CSSProperties;
  /** 获取布局样式 */
  getLayoutStyle: (layout: TransferLayout) => CSSProperties;
  /** 获取列表样式 */
  getListStyle: () => CSSProperties;
  /** 获取列表项样式 */
  getListItemStyle: (disabled?: boolean, selected?: boolean) => CSSProperties;
  /** 获取搜索框样式 */
  getSearchStyle: () => CSSProperties;
  /** 获取操作按钮样式 */
  getOperationStyle: () => CSSProperties;
  /** 获取全选框样式 */
  getSelectAllStyle: () => CSSProperties;
  /** 获取分页样式 */
  getPaginationStyle: () => CSSProperties;
  /** 获取完整样式 */
  getStyle: (config: {
    size?: TransferSize;
    status?: TransferStatus;
    layout?: TransferLayout;
    disabled?: boolean;
    style?: CSSProperties;
  }) => CSSProperties;
  /** 获取完整类名 */
  getClassName: (config: {
    size?: TransferSize;
    status?: TransferStatus;
    layout?: TransferLayout;
    disabled?: boolean;
    className?: string;
  }) => string;
}

/** 穿梭框工具类 */
export class TransferTools {
  /** 过滤选项 */
  static filterOptions(
    options: TransferDataSource,
    inputValue: string,
    filterOption?: TransferProps['filterOption'],
  ): TransferDataSource {
    if (!inputValue) return options;

    return options.filter((option) => {
      if (filterOption) {
        return filterOption(inputValue, option);
      }

      const searchText = inputValue.toLowerCase();
      const title = String(option.title).toLowerCase();
      const description = option.description ? String(option.description).toLowerCase() : '';

      return title.includes(searchText) || description.includes(searchText);
    });
  }

  /** 查找选项 */
  static findOptions(options: TransferDataSource, keys: TransferValue): TransferOption[] {
    return options.filter((option) => keys.includes(option.key));
  }

  /** 验证值 */
  static validateValue(value: TransferValue, options: TransferDataSource): boolean {
    const validKeys = options.map((option) => option.key);
    return value.every((key) => validKeys.includes(key));
  }

  /** 分割数据源 */
  static splitDataSource(
    dataSource: TransferDataSource,
    targetKeys: TransferValue,
  ): {
    leftDataSource: TransferDataSource;
    rightDataSource: TransferDataSource;
  } {
    const leftDataSource: TransferDataSource = [];
    const rightDataSource: TransferDataSource = [];

    dataSource.forEach((option) => {
      if (targetKeys.includes(option.key)) {
        rightDataSource.push(option);
      } else {
        leftDataSource.push(option);
      }
    });

    return { leftDataSource, rightDataSource };
  }

  /** 生成分页数据 */
  static generatePaginationData(
    data: TransferDataSource,
    currentPage: number,
    pageSize: number,
  ): {
    data: TransferDataSource;
    total: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  } {
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      currentPage,
      pageSize,
      totalPages,
    };
  }

  /** 获取选中的选项 */
  static getSelectedOptions(options: TransferDataSource, selectedKeys: TransferValue): TransferOption[] {
    return options.filter((option) => selectedKeys.includes(option.key));
  }

  /** 获取禁用的选项 */
  static getDisabledOptions(options: TransferDataSource): TransferOption[] {
    return options.filter((option) => option.disabled);
  }

  /** 排序选项 */
  static sortOptions(
    options: TransferDataSource,
    sortBy: keyof TransferOption,
    order: 'asc' | 'desc' = 'asc',
  ): TransferDataSource {
    return [...options].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /** 去重选项 */
  static uniqueOptions(options: TransferDataSource): TransferDataSource {
    const seen = new Set();
    return options.filter((option) => {
      if (seen.has(option.key)) {
        return false;
      }
      seen.add(option.key);
      return true;
    });
  }

  /** 批量更新选项状态 */
  static updateOptionsStatus(
    options: TransferDataSource,
    updates: { key: string | number; disabled?: boolean; selected?: boolean }[],
  ): TransferDataSource {
    return options.map((option) => {
      const update = updates.find((u) => u.key === option.key);
      if (update) {
        return { ...option, ...update };
      }
      return option;
    });
  }

  /** 计算选中状态 */
  static calculateSelectionState(
    options: TransferDataSource,
    selectedKeys: TransferValue,
  ): {
    allSelected: boolean;
    partiallySelected: boolean;
    noneSelected: boolean;
    selectedCount: number;
    totalCount: number;
  } {
    const enabledOptions = options.filter((option) => !option.disabled);
    const totalCount = enabledOptions.length;
    const selectedCount = enabledOptions.filter((option) => selectedKeys.includes(option.key)).length;

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
  }

  /** 生成唯一键 */
  static generateUniqueKey(prefix: string = 'transfer'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /** 格式化数量显示 */
  static formatCount(count: number, total: number): string {
    return `${count} / ${total}`;
  }

  /** 验证分页配置 */
  static validatePaginationConfig(pagination?: TransferProps['pagination']): {
    isValid: boolean;
    pageSize: number;
    simple: boolean;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
  } {
    if (pagination === false) {
      return {
        isValid: false,
        pageSize: 10,
        simple: false,
        showSizeChanger: false,
        showQuickJumper: false,
      };
    }

    if (pagination === true || typeof pagination === 'undefined') {
      return {
        isValid: true,
        pageSize: 10,
        simple: false,
        showSizeChanger: false,
        showQuickJumper: false,
      };
    }

    return {
      isValid: true,
      pageSize: pagination.pageSize || 10,
      simple: pagination.simple || false,
      showSizeChanger: pagination.showSizeChanger || false,
      showQuickJumper: pagination.showQuickJumper || false,
    };
  }
}
