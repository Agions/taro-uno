/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, CSSProperties } from 'react'

// 表格列定义
export interface TableColumn<T = any> {
  // 列的唯一标识
  key: string
  // 列标题
  title: ReactNode
  // 列宽度
  width?: number | string
  // 自定义单元格渲染
  render?: (value: any, record: T, index: number) => ReactNode
  // 数据索引，对应数据源中的键
  dataIndex?: string
  // 列对齐方式
  align?: 'left' | 'center' | 'right'
  // 列固定位置
  fixed?: 'left' | 'right'
  // 是否支持排序
  sorter?: boolean | ((a: T, b: T) => number)
  // 排序方向
  sortOrder?: 'ascend' | 'descend' | null
  // 是否支持筛选
  filters?: Array<{ text: ReactNode; value: string | number | boolean }>
  // 筛选函数
  onFilter?: (value: any, record: T) => boolean
  // 列合并
  colSpan?: number
  // 子列
  children?: TableColumn<T>[]
  // 自定义类名
  className?: string
  // 自定义样式
  style?: CSSProperties
}

// 表格分页配置
export interface TablePagination {
  // 当前页码
  current: number
  // 每页记录数
  pageSize: number
  // 数据总数
  total: number
  // 页码改变回调
  onChange?: (page: number, pageSize: number) => void
  // 是否显示
  show?: boolean
  // 每页记录数选项
  pageSizeOptions?: string[]
  // 是否显示快速跳转
  showQuickJumper?: boolean
  // 是否显示页数切换
  showSizeChanger?: boolean
  // 分页位置
  position?: 'top' | 'bottom' | 'both'
}

// 表格大小
export type TableSize = 'small' | 'middle' | 'large'

// 表格行选择配置
export interface TableRowSelection<T> {
  // 已选择的行的key数组
  selectedRowKeys?: React.Key[]
  // 选择项发生变化时的回调
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
  // 是否显示全选按钮
  showSelectAll?: boolean
  // 自定义选择框
  renderCell?: (checked: boolean, record: T, index: number) => ReactNode
  // 选择类型
  type?: 'checkbox' | 'radio'
  // 行选择配置
  selections?: boolean | TableSelection<T>[]
  // 选择框列固定
  fixed?: boolean
  // 选择框列宽度
  columnWidth?: number | string
}

// 表格选择配置
export interface TableSelection<T> {
  key: string
  text: ReactNode
  onSelect: (keys: React.Key[], rows: T[]) => void
}

// 表格排序状态
export interface TableSorter<T = any> {
  column?: TableColumn<T>
  columnKey?: React.Key
  field?: string
  order?: 'ascend' | 'descend' | null
}

// 表格筛选状态
export type TableFilterValue = Record<string, (string | number | boolean)[]>

// 表格数据源变化事件
export interface TableChange<T = any> {
  pagination?: TablePagination
  filters?: TableFilterValue
  sorter?: TableSorter<T> | TableSorter<T>[]
}

// 表格属性
export interface TableProps<T = any> {
  // 表格数据源
  dataSource: T[]
  // 表格列定义
  columns: TableColumn<T>[]
  // 加载状态
  loading?: boolean
  // 表格大小
  size?: TableSize
  // 表格标题
  title?: ReactNode | ((data: T[]) => ReactNode)
  // 表格页脚
  footer?: ReactNode | ((data: T[]) => ReactNode)
  // 表格分页配置
  pagination?: TablePagination | false
  // 边框显示
  bordered?: boolean
  // 行选择配置
  rowSelection?: TableRowSelection<T>
  // 行键获取函数
  rowKey?: string | ((record: T) => string)
  // 表格数据变化回调
  onChange?: (changes: TableChange<T>) => void
  // 行样式
  rowClassName?: (record: T, index: number) => string
  // 行点击事件
  onRow?: (record: T, index: number) => any
  // 表头行点击事件
  onHeaderRow?: (columns: TableColumn<T>[], index: number) => any
  // 是否启用虚拟滚动
  virtualized?: boolean
  // 虚拟滚动阈值
  virtualThreshold?: number
  // 空状态展示
  emptyText?: ReactNode
  // 自定义类名
  className?: string
  // 自定义样式
  style?: CSSProperties
  // 是否显示表头
  showHeader?: boolean
  // 表格滚动配置
  scroll?: {
    x?: number | true | string
    y?: number | string
  }
}

// 表格组件实例方法
export interface TableInstance {
  // 重新加载数据
  reload: () => void
  // 清除所有排序和筛选状态
  clearFilters: () => void
  // 清除所有选择
  clearSelection: () => void
  // 滚动到指定行
  scrollToRow: (rowIndex: number) => void
}
