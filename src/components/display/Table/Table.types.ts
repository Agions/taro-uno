import { ReactNode } from 'react';
import { View } from '@tarojs/components';
import { BaseComponentProps, Size } from '../../../types';

/** 表格尺寸 */
export type TableSize = Size | 'small' | 'medium' | 'large';

/** 表格边框 */
export type TableBorder = 'none' | 'outer' | 'all';

/** 表格对齐方式 */
export type TableAlign = 'left' | 'center' | 'right';

/** 表格排序方式 */
export type TableSortOrder = 'ascend' | 'descend' | null;

/** 表格筛选配置 */
export interface TableFilterConfig {
  /** 筛选项 */
  options: Array<{ label: string; value: any }>;
  /** 是否多选 */
  multiple?: boolean;
  /** 默认值 */
  defaultSelectedValues?: any[];
  /** 筛选回调 */
  onFilter?: (value: any, record: any) => boolean;
}

/** 表格列配置 */
export interface TableColumn<T = any> {
  /** 列标题 */
  title: ReactNode;
  /** 数据字段 */
  dataIndex: string;
  /** 列键值 */
  key?: string;
  /** 列宽 */
  width?: number | string;
  /** 对齐方式 */
  align?: TableAlign;
  /** 是否固定 */
  fixed?: 'left' | 'right' | boolean;
  /** 是否可排序 */
  sortable?: boolean;
  /** 排序字段 */
  sortField?: string;
  /** 排序回调 */
  onSort?: (field: string, order: TableSortOrder) => void;
  /** 筛选配置 */
  filter?: TableFilterConfig;
  /** 自定义渲染 */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** 自定义标题渲染 */
  titleRender?: (column: TableColumn<T>) => ReactNode;
  /** 是否显示 */
  visible?: boolean;
  /** 是否省略 */
  ellipsis?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** 表格行配置 */
export interface TableRowConfig<T = any> {
  /** 行键值 */
  key: string;
  /** 行数据 */
  record: T;
  /** 行索引 */
  index: number;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 行样式 */
  style?: React.CSSProperties;
  /** 行类名 */
  className?: string;
}

/** 表格分页配置 */
export interface TablePaginationConfig {
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 总条数 */
  total?: number;
  /** 是否显示分页 */
  show?: boolean;
  /** 分页位置 */
  position?: 'top' | 'bottom' | 'both';
  /** 分页大小选项 */
  pageSizeOptions?: number[];
  /** 显示总数 */
  showTotal?: boolean;
  /** 显示快速跳转 */
  showQuickJumper?: boolean;
  /** 显示页码选择器 */
  showSizeChanger?: boolean;
  /** 页码改变事件 */
  onChange?: (current: number, pageSize: number) => void;
  /** 每页条数改变事件 */
  onShowSizeChange?: (current: number, pageSize: number) => void;
}

/** 表格引用 */
export interface TableRef<T = any> {
  /** 获取元素引用 */
  element: View | null;
  /** 获取当前数据 */
  getData: () => T[];
  /** 获取选中行 */
  getSelectedRows: () => T[];
  /** 获取选中行键值 */
  getSelectedRowKeys: () => string[];
  /** 获取排序字段 */
  getSortField: () => string;
  /** 获取排序方式 */
  getSortOrder: () => TableSortOrder;
  /** 获取筛选值 */
  getFilterValues: () => Record<string, any[]>;
  /** 设置数据 */
  setData: (data: T[]) => void;
  /** 设置选中行 */
  setSelectedRows: (keys: string[]) => void;
  /** 设置排序 */
  setSort: (field: string, order: TableSortOrder) => void;
  /** 设置筛选 */
  setFilter: (field: string, values: any[]) => void;
  /** 刷新数据 */
  refresh: () => void;
  /** 重置状态 */
  reset: () => void;
  /** 滚动到指定行 */
  scrollToRow: (key: string) => void;
}

/** 表格组件属性 */
export interface TableProps<T = any> extends BaseComponentProps {
  /** 表格数据 */
  data?: T[];
  /** 列配置 */
  columns: TableColumn<T>[];
  /** 行键值字段 */
  rowKey?: string | ((record: T) => string);
  /** 表格尺寸 */
  size?: TableSize;
  /** 表格边框 */
  border?: TableBorder;
  /** 是否斑马纹 */
  striped?: boolean;
  /** 是否悬停效果 */
  hoverable?: boolean;
  /** 是否可展开 */
  expandable?: boolean;
  /** 展开行渲染 */
  expandedRowRender?: (record: T, index: number) => ReactNode;
  /** 是否可选择 */
  selectable?: boolean;
  /** 选择类型 */
  selectionType?: 'checkbox' | 'radio';
  /** 默认选中行键值 */
  defaultSelectedRowKeys?: string[];
  /** 选中行键值 */
  selectedRowKeys?: string[];
  /** 行选择事件 */
  onRowSelect?: (selectedRowKeys: string[], selectedRows: T[]) => void;
  /** 行点击事件 */
  onRowClick?: (record: T, index: number, event: React.MouseEvent) => void;
  /** 行双击事件 */
  onRowDoubleClick?: (record: T, index: number, event: React.MouseEvent) => void;
  /** 排序事件 */
  onSort?: (field: string, order: TableSortOrder) => void;
  /** 筛选事件 */
  onFilter?: (filters: Record<string, any[]>) => void;
  /** 分页配置 */
  pagination?: TablePaginationConfig | boolean;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 是否显示滚动条 */
  scrollable?: boolean;
  /** 滚动配置 */
  scroll?: { x?: number | string; y?: number | string };
  /** 是否加载中 */
  loading?: boolean;
  /** 空数据渲染 */
  emptyText?: ReactNode;
  /** 行样式 */
  rowStyle?: (record: T, index: number) => React.CSSProperties;
  /** 行类名 */
  rowClassName?: (record: T, index: number) => string;
  /** 单元格样式 */
  cellStyle?: (value: any, record: T, column: TableColumn<T>, index: number) => React.CSSProperties;
  /** 单元格类名 */
  cellClassName?: (value: any, record: T, column: TableColumn<T>, index: number) => string;
  /** 自定义行渲染 */
  rowRender?: (record: T, index: number) => ReactNode;
  /** 自定义单元格渲染 */
  cellRender?: (value: any, record: T, column: TableColumn<T>, index: number) => ReactNode;
}
