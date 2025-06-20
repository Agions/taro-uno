/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import {
  TableProps,
  TableColumn,
  TablePagination,
  TableSorter,
  TableFilterValue,
  TableInstance,
} from './types'
import './style.scss'

// 工具函数：获取行键
const getRowKey = <T extends any>(
  record: T,
  rowKey: TableProps<T>['rowKey'],
  index: number
): React.Key => {
  if (typeof rowKey === 'function') {
    return rowKey(record)
  }
  if (typeof rowKey === 'string' && record && typeof record === 'object') {
    return (record as any)[rowKey] || index
  }
  return index
}

// 工具函数：获取单元格数据
const getCellValue = <T extends any>(record: T, dataIndex?: string): any => {
  if (!dataIndex || !record || typeof record !== 'object') {
    return undefined
  }

  const keys = dataIndex.split('.')
  let value = record as any

  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) {
      break
    }
  }

  return value
}

// 表格组件
const Table = <T extends any>(
  {
    dataSource = [],
    columns = [],
    loading = false,
    size = 'middle',
    title,
    footer,
    pagination,
    bordered = false,
    rowSelection,
    rowKey = 'key',
    onChange,
    rowClassName,
    onRow,
    onHeaderRow,
    virtualized = false,
    virtualThreshold = 100,
    emptyText = '暂无数据',
    className,
    style,
    showHeader = true,
    scroll,
  }: TableProps<T>,
  ref: React.Ref<TableInstance>
) => {
  // 前缀类名
  const prefixCls = 'taro-uno-table'

  // 状态管理
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  )
  const [currentPagination, setCurrentPagination] = useState<TablePagination | false>(
    pagination === false
      ? false
      : {
          current: 1,
          pageSize: 10,
          total: dataSource.length,
          ...pagination,
        }
  )
  const [currentSorter, setCurrentSorter] = useState<TableSorter<T> | null>(null)
  const [currentFilters, setCurrentFilters] = useState<TableFilterValue>({})

  // 虚拟滚动相关
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  // 暴露实例方法
  useImperativeHandle(ref, () => ({
    reload: () => {
      // 重新加载逻辑
    },
    clearFilters: () => {
      setCurrentFilters({})
    },
    clearSelection: () => {
      setSelectedRowKeys([])
      rowSelection?.onChange?.([], [])
    },
    scrollToRow: (rowIndex: number) => {
      if (containerRef.current) {
        // 滚动到指定行逻辑
      }
    },
  }))

  // 当rowSelection.selectedRowKeys更新时同步内部状态
  useEffect(() => {
    if (rowSelection?.selectedRowKeys !== undefined) {
      setSelectedRowKeys(rowSelection.selectedRowKeys)
    }
  }, [rowSelection?.selectedRowKeys])

  // 处理行选择
  const handleRowSelect = useCallback(
    (record: T, index: number, selected: boolean) => {
      const key = getRowKey(record, rowKey, index)
      const newSelectedRowKeys = selected
        ? [...selectedRowKeys, key]
        : selectedRowKeys.filter(k => k !== key)

      setSelectedRowKeys(newSelectedRowKeys)
      rowSelection?.onChange?.(
        newSelectedRowKeys,
        dataSource.filter((item, idx) => newSelectedRowKeys.includes(getRowKey(item, rowKey, idx)))
      )
    },
    [dataSource, rowKey, rowSelection, selectedRowKeys]
  )

  // 处理全选
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      const newSelectedRowKeys = selected
        ? dataSource.map((record, index) => getRowKey(record, rowKey, index))
        : []

      setSelectedRowKeys(newSelectedRowKeys)
      rowSelection?.onChange?.(newSelectedRowKeys, selected ? [...dataSource] : [])
    },
    [dataSource, rowKey, rowSelection]
  )

  // 处理排序
  const handleSort = useCallback(
    (column: TableColumn<T>) => {
      if (!column.sorter) return

      const order =
        column.sortOrder === 'ascend' ? 'descend' : column.sortOrder === 'descend' ? null : 'ascend'

      const newSorter: TableSorter<T> = {
        column,
        columnKey: column.key as React.Key,
        field: column.dataIndex,
        order,
      }

      setCurrentSorter(order === null ? null : newSorter)

      onChange?.({
        pagination: currentPagination === false ? undefined : currentPagination,
        filters: currentFilters,
        sorter: order === null ? ({} as TableSorter<T>) : newSorter,
      })
    },
    [currentFilters, currentPagination, onChange]
  )

  // 处理分页变化
  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      if (currentPagination === false) return

      const newPagination = {
        ...currentPagination,
        current: page,
        pageSize,
      }

      setCurrentPagination(newPagination)

      onChange?.({
        pagination: newPagination,
        filters: currentFilters,
        sorter: currentSorter || {},
      })

      currentPagination.onChange?.(page, pageSize)
    },
    [currentFilters, currentPagination, currentSorter, onChange]
  )

  // 根据排序过滤等处理后的数据
  const processedData = useMemo(() => {
    let result = [...dataSource]

    // 过滤处理
    if (Object.keys(currentFilters).length > 0) {
      Object.entries(currentFilters).forEach(([columnKey, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return

        const column = columns.find(col => col.key === columnKey)
        if (column?.onFilter) {
          result = result.filter(record =>
            filterValues.some(value => column.onFilter!(value, record))
          )
        }
      })
    }

    // 排序处理
    if (currentSorter && currentSorter.column) {
      const { column, order } = currentSorter

      if (typeof column.sorter === 'function') {
        result.sort((a, b) => {
          const sortResult = (column.sorter as (a: T, b: T) => number)(a, b)
          return order === 'descend' ? -sortResult : sortResult
        })
      } else if (column.dataIndex) {
        result.sort((a, b) => {
          const aValue = getCellValue(a, column.dataIndex)
          const bValue = getCellValue(b, column.dataIndex)

          if (aValue === bValue) return 0
          if (aValue === null || aValue === undefined) return order === 'ascend' ? -1 : 1
          if (bValue === null || bValue === undefined) return order === 'ascend' ? 1 : -1

          return (order === 'ascend' ? 1 : -1) * (aValue > bValue ? 1 : -1)
        })
      }
    }

    // 分页处理
    if (currentPagination !== false) {
      const { current, pageSize } = currentPagination
      const start = (current - 1) * pageSize
      result = result.slice(start, start + pageSize)
    }

    return result
  }, [dataSource, columns, currentFilters, currentSorter, currentPagination])

  // 行列表渲染
  const renderRows = () => {
    if (processedData.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length + (rowSelection ? 1 : 0)} className={`${prefixCls}__empty`}>
            {emptyText}
          </td>
        </tr>
      )
    }

    return processedData.map((record, index) => {
      const key = getRowKey(record, rowKey, index)
      const isSelected = selectedRowKeys.includes(key)

      const rowClass = classNames(
        `${prefixCls}__row`,
        {
          [`${prefixCls}__row--selected`]: isSelected,
        },
        rowClassName?.(record, index)
      )

      const rowProps = onRow?.(record, index) || {}

      return (
        <tr key={key.toString()} className={rowClass} {...rowProps}>
          {rowSelection && (
            <td className={`${prefixCls}__cell ${prefixCls}__cell--selection`}>
              <div className={`${prefixCls}__selection`}>
                {rowSelection.type === 'radio' ? (
                  <input
                    type='radio'
                    checked={isSelected}
                    onChange={e => handleRowSelect(record, index, e.target.checked)}
                  />
                ) : (
                  <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={e => handleRowSelect(record, index, e.target.checked)}
                  />
                )}
              </div>
            </td>
          )}

          {columns.map(column => {
            const cellValue = getCellValue(record, column.dataIndex)
            const cellContent = column.render ? column.render(cellValue, record, index) : cellValue

            const cellClass = classNames(
              `${prefixCls}__cell`,
              {
                [`${prefixCls}__cell--align-${column.align}`]: column.align,
                [`${prefixCls}__cell--fixed-left`]: column.fixed === 'left',
                [`${prefixCls}__cell--fixed-right`]: column.fixed === 'right',
              },
              column.className
            )

            return (
              <td
                key={column.key}
                className={cellClass}
                style={{
                  width: column.width,
                  ...column.style,
                }}
              >
                {cellContent}
              </td>
            )
          })}
        </tr>
      )
    })
  }

  // 列头渲染
  const renderColumnHeaders = () => {
    return (
      <tr>
        {rowSelection && (
          <th className={`${prefixCls}__cell`}>
            {rowSelection.showSelectAll !== false && rowSelection.type !== 'radio' && (
              <div className={`${prefixCls}__selection`}>
                <input
                  type='checkbox'
                  checked={dataSource.length > 0 && selectedRowKeys.length === dataSource.length}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
              </div>
            )}
          </th>
        )}

        {columns.map((column, index) => {
          const headerCellProps = onHeaderRow?.(columns, index) || {}

          const headerClass = classNames(
            `${prefixCls}__cell`,
            {
              [`${prefixCls}__cell--sortable`]: column.sorter,
              [`${prefixCls}__cell--align-${column.align}`]: column.align,
              [`${prefixCls}__cell--fixed-left`]: column.fixed === 'left',
              [`${prefixCls}__cell--fixed-right`]: column.fixed === 'right',
            },
            column.className
          )

          return (
            <th
              key={column.key}
              className={headerClass}
              style={{
                width: column.width,
                ...column.style,
              }}
              onClick={() => column.sorter && handleSort(column)}
              {...headerCellProps}
            >
              <span>{column.title}</span>

              {column.sorter && (
                <span className={`${prefixCls}__sorter`}>
                  <span
                    className={`${prefixCls}__sorter-icon ${
                      column.sortOrder === 'ascend' ? `${prefixCls}__sorter-icon--active` : ''
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`${prefixCls}__sorter-icon ${
                      column.sortOrder === 'descend' ? `${prefixCls}__sorter-icon--active` : ''
                    }`}
                  >
                    ▼
                  </span>
                </span>
              )}

              {column.filters && column.filters.length > 0 && (
                <span className={`${prefixCls}__filter`}>
                  {/* 筛选图标 */}
                  ⚙️
                </span>
              )}
            </th>
          )
        })}
      </tr>
    )
  }

  // 分页器渲染
  const renderPagination = () => {
    if (currentPagination === false) return null

    const { current, pageSize, total } = currentPagination

    return (
      <div className={`${prefixCls}__pagination`}>
        <button
          disabled={current <= 1}
          onClick={() => handlePaginationChange(current - 1, pageSize)}
        >
          上一页
        </button>
        <span>
          {current} / {Math.ceil(total / pageSize)}
        </span>
        <button
          disabled={current >= Math.ceil(total / pageSize)}
          onClick={() => handlePaginationChange(current + 1, pageSize)}
        >
          下一页
        </button>
      </div>
    )
  }

  // 组件类名
  const tableClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}--bordered`]: bordered,
      [`${prefixCls}--${size}`]: size !== 'middle',
      [`${prefixCls}--loading`]: loading,
      [`${prefixCls}--virtualized`]: virtualized && dataSource.length > virtualThreshold,
    },
    className
  )

  return (
    <div className={tableClassName} style={style}>
      {title && (
        <div className={`${prefixCls}__title`}>
          {typeof title === 'function' ? title(dataSource) : title}
        </div>
      )}

      <div
        className={`${prefixCls}__container`}
        ref={containerRef}
        style={
          scroll
            ? {
                overflowX: scroll.x ? 'auto' : undefined,
                overflowY: scroll.y ? 'auto' : undefined,
                maxHeight: scroll.y,
              }
            : undefined
        }
      >
        {loading && <div className={`${prefixCls}__loading`}>加载中...</div>}

        <table
          className={`${prefixCls}__table`}
          style={scroll?.x ? { width: scroll.x === true ? '100%' : scroll.x } : undefined}
        >
          {showHeader && <thead className={`${prefixCls}__thead`}>{renderColumnHeaders()}</thead>}

          <tbody className={`${prefixCls}__tbody`}>{renderRows()}</tbody>
        </table>
      </div>

      {currentPagination !== false && renderPagination()}

      {footer && (
        <div className={`${prefixCls}__footer`}>
          {typeof footer === 'function' ? footer(dataSource) : footer}
        </div>
      )}
    </div>
  )
}

export default forwardRef(Table)
