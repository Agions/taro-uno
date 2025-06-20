import { ReactNode, CSSProperties, Key } from 'react'
import { ITouchEvent } from '@tarojs/components'

// 列表尺寸
export type ListSize = 'small' | 'medium' | 'large'

// 列表布局
export type ListLayout = 'vertical' | 'horizontal' | 'grid'

// 列表网格配置
export interface ListGrid {
  // 一行包含几个列表项
  column: number
  // 列表项间距
  gutter?: number
  // 左右屏幕边缘的间距
  horizontalGap?: number
}

// 列表分页配置
export interface ListPagination {
  // 当前页码
  current: number
  // 每页显示条数
  pageSize: number
  // 总数据量
  total: number
  // 页码变化的回调
  onChange?: (page: number, pageSize: number) => void
  // 是否展示
  show?: boolean
  // 是否显示快速跳转
  showQuickJumper?: boolean
  // 是否显示页数切换
  showSizeChanger?: boolean
  // 分页位置
  position?: 'top' | 'bottom' | 'both'
}

// 列表项元数据
export interface ListItemMeta {
  // 头像/图标
  avatar?: ReactNode
  // 标题
  title?: ReactNode
  // 描述信息
  description?: ReactNode
}

// 列表项属性
export interface ListItemProps {
  // 列表项内容
  children?: ReactNode
  // 列表项的唯一标识符
  id?: Key
  // 自定义类名
  className?: string
  // 自定义样式
  style?: CSSProperties
  // 列表项的元数据
  meta?: ListItemMeta
  // 额外的操作区域
  actions?: ReactNode[]
  // 列表项的附加内容，展示在列表项右侧
  extra?: ReactNode
  // 是否处于激活状态
  active?: boolean
  // 是否可点击
  clickable?: boolean
  // 点击事件
  onClick?: (event: ITouchEvent) => void
  // 列表项前缀内容
  prefix?: ReactNode
  // 列表项后缀内容
  suffix?: ReactNode
}

// 列表加载更多配置
export interface LoadMoreOptions {
  // 下拉加载更多回调
  onLoadMore: () => void
  // 是否正在加载
  loading?: boolean
  // 是否已全部加载
  hasMore?: boolean
  // 加载中显示的内容
  loadingText?: ReactNode
  // 没有更多数据时显示的内容
  noMoreText?: ReactNode
}

// 列表属性
export interface ListProps<T = any> {
  // 列表数据源
  dataSource?: T[]
  // 当前是否处于加载状态
  loading?: boolean
  // 列表大小
  size?: ListSize
  // 列表布局方式
  layout?: ListLayout
  // 是否显示边框
  bordered?: boolean
  // 是否显示分割线
  split?: boolean
  // 渲染列表项的函数
  renderItem?: (item: T, index: number) => ReactNode
  // 列表头部
  header?: ReactNode
  // 列表底部
  footer?: ReactNode
  // 列表为空时显示的内容
  emptyText?: ReactNode
  // 列表分页配置
  pagination?: ListPagination | false
  // 列表网格配置
  grid?: ListGrid
  // 加载更多配置
  loadMore?: LoadMoreOptions
  // 行点击事件
  onItemClick?: (item: T, index: number) => void
  // 自定义类名
  className?: string
  // 自定义样式
  style?: CSSProperties
  // 行样式
  rowClassName?: (item: T, index: number) => string
  // 列表项 id 的取值，可以是字符串或一个函数
  rowKey?: string | ((item: T) => Key)
  // 是否启用虚拟滚动
  virtualized?: boolean
  // 虚拟滚动的阈值，列表长度超过该值时启用虚拟滚动
  virtualThreshold?: number
  // 开启虚拟滚动时的列表高度
  height?: number | string
  // 列表项高度，启用虚拟滚动时必须
  itemHeight?: number
  // 是否开启下拉刷新
  enablePullToRefresh?: boolean
  // 下拉刷新回调
  onRefresh?: () => void
}

// 列表组件实例方法
export interface ListInstance {
  // 滚动到指定索引的列表项
  scrollToItem: (index: number) => void
  // 刷新列表
  refresh: () => void
  // 重置加载状态
  resetLoadMore: () => void
}
