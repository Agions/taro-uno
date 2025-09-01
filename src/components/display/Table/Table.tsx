import React, { forwardRef, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { tableStyles } from './Table.styles';
import type {
  TableProps,
  TableRef,
  TableColumn,
  TableSortOrder,
  TableRowSelection,
  TablePagination,
  TableExpandable,
} from './Table.types';

/** 表格组件 */
export const TableComponent = forwardRef<TableRef, TableProps>((props, ref) => {
  const {
    columns = [],
    dataSource = [],
    rowKey = 'key',
    size = 'medium',
    bordered = false,
    striped = false,
    hoverable = true,
    loading = false,
    emptyText = '暂无数据',
    showHeader = true,
    pagination = false,
    rowSelection,
    expandable,
    scroll,
    onChange,
    onRow,
    onHeaderRow,
    className,
    style,
    ...restProps
  } = props;

  const tableRef = useRef<HTMLDivElement>(null);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<TableSortOrder>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 处理排序
  const handleSort = useCallback(
    (field: string, order: TableSortOrder) => {
      setSortField(field);
      setSortOrder(order);
      onChange?.({
        pagination: { current: currentPage, pageSize },
        filters: {},
        sorter: { field, order },
      });
    },
    [currentPage, pageSize, onChange],
  );

  // 处理行选择
  const handleRowSelect = useCallback(
    (key: string, selected: boolean) => {
      const newSelectedKeys = selected ? [...selectedRowKeys, key] : selectedRowKeys.filter((k) => k !== key);

      setSelectedRowKeys(newSelectedKeys);
      rowSelection?.onChange?.(
        newSelectedKeys,
        dataSource.filter((item) => newSelectedKeys.includes(item[rowKey as keyof typeof item])),
      );
    },
    [selectedRowKeys, dataSource, rowKey, rowSelection],
  );

  // 处理全选
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      const newSelectedKeys = selected ? dataSource.map((item) => String(item[rowKey as keyof typeof item])) : [];

      setSelectedRowKeys(newSelectedKeys);
      rowSelection?.onChange?.(
        newSelectedKeys,
        dataSource.filter((item) => newSelectedKeys.includes(String(item[rowKey as keyof typeof item]))),
      );
    },
    [dataSource, rowKey, rowSelection],
  );

  // 处理展开
  const handleExpand = useCallback(
    (key: string, expanded: boolean) => {
      const newExpandedKeys = expanded ? [...expandedRowKeys, key] : expandedRowKeys.filter((k) => k !== key);

      setExpandedRowKeys(newExpandedKeys);
    },
    [expandedRowKeys],
  );

  // 处理分页
  const handlePageChange = useCallback(
    (page: number, size?: number) => {
      setCurrentPage(page);
      if (size) setPageSize(size);
      onChange?.({
        pagination: { current: page, pageSize: size || pageSize },
        filters: {},
        sorter: { field: sortField, order: sortOrder },
      });
    },
    [pageSize, sortField, sortOrder, onChange],
  );

  // 排序和筛选后的数据
  const processedData = useMemo(() => {
    const result = [...dataSource];

    // 排序处理
    if (sortField && sortOrder) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a];
        const bValue = b[sortField as keyof typeof b];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue || '');
        const bStr = String(bValue || '');

        return sortOrder === 'ascend' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }

    return result;
  }, [dataSource, sortField, sortOrder]);

  // 分页后的数据
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, pageSize, pagination]);

  // 渲染表头
  const renderHeader = () => {
    if (!showHeader) return null;

    const headerProps = onHeaderRow?.(columns) || {};

    return (
      <View className="taro-uno-table__header" {...headerProps}>
        <View className="taro-uno-table__row">
          {/* 选择列 */}
          {rowSelection && (
            <View className="taro-uno-table__cell taro-uno-table__cell--selection">
              <input
                type="checkbox"
                checked={selectedRowKeys.length > 0 && selectedRowKeys.length === dataSource.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                disabled={dataSource.length === 0}
              />
            </View>
          )}

          {/* 展开列 */}
          {expandable && <View className="taro-uno-table__cell taro-uno-table__cell--expand" />}

          {/* 数据列 */}
          {columns.map((column, index) => {
            const isSortable = column.sortable || column.onSort;
            const currentSort = sortField === column.dataIndex ? sortOrder : null;

            return (
              <View
                key={column.key || column.dataIndex || index}
                className={`taro-uno-table__cell taro-uno-table__cell--header ${
                  column.align ? `taro-uno-table__cell--${column.align}` : ''
                }`}
                style={{ width: column.width }}
              >
                <View className="taro-uno-table__cell-content">
                  {column.title}
                  {isSortable && (
                    <View
                      className={`taro-uno-table__sorter ${
                        currentSort ? `taro-uno-table__sorter--${currentSort}` : ''
                      }`}
                      onClick={() => {
                        const newOrder = currentSort === 'ascend' ? 'descend' : 'ascend';
                        handleSort(column.dataIndex, newOrder);
                      }}
                    >
                      <View className="taro-uno-table__sorter-up" />
                      <View className="taro-uno-table__sorter-down" />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // 渲染表格行
  const renderRow = (record: any, rowIndex: number) => {
    const key = String(record[rowKey as keyof typeof record]);
    const isSelected = selectedRowKeys.includes(key);
    const isExpanded = expandedRowKeys.includes(key);

    const rowProps = onRow?.(record, rowIndex) || {};

    return (
      <View key={key} className="taro-uno-table__body">
        <View
          className={`taro-uno-table__row ${isSelected ? 'taro-uno-table__row--selected' : ''} ${
            striped && rowIndex % 2 === 1 ? 'taro-uno-table__row--striped' : ''
          }`}
          {...rowProps}
        >
          {/* 选择列 */}
          {rowSelection && (
            <View className="taro-uno-table__cell taro-uno-table__cell--selection">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => handleRowSelect(key, e.target.checked)}
                disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
              />
            </View>
          )}

          {/* 展开列 */}
          {expandable && (
            <View className="taro-uno-table__cell taro-uno-table__cell--expand">
              {expandable.rowExpandable?.(record) && (
                <View
                  className={`taro-uno-table__expand-icon ${isExpanded ? 'taro-uno-table__expand-icon--expanded' : ''}`}
                  onClick={() => handleExpand(key, !isExpanded)}
                />
              )}
            </View>
          )}

          {/* 数据列 */}
          {columns.map((column, colIndex) => {
            const value = record[column.dataIndex as keyof typeof record];
            const render = column.render;
            const cellContent = render ? render(value, record, rowIndex) : String(value || '');

            return (
              <View
                key={column.key || column.dataIndex || colIndex}
                className={`taro-uno-table__cell ${column.align ? `taro-uno-table__cell--${column.align}` : ''}`}
                style={{ width: column.width }}
              >
                <View className="taro-uno-table__cell-content">{cellContent}</View>
              </View>
            );
          })}
        </View>

        {/* 展开内容 */}
        {expandable && isExpanded && expandable.rowExpandable?.(record) && (
          <View className="taro-uno-table__expanded-row">
            <View className="taro-uno-table__expanded-cell" colSpan={columns.length + 2}>
              {expandable.expandedRowRender?.(record, rowIndex)}
            </View>
          </View>
        )}
      </View>
    );
  };

  // 渲染分页
  const renderPagination = () => {
    if (!pagination) return null;

    const total = dataSource.length;
    const totalPages = Math.ceil(total / pageSize);

    return (
      <View className="taro-uno-table__pagination">
        <View className="taro-uno-table__pagination-info">共 {total} 条记录</View>
        <View className="taro-uno-table__pagination-controls">
          <button
            className="taro-uno-table__pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            上一页
          </button>
          <View className="taro-uno-table__pagination-current">
            {currentPage} / {totalPages}
          </View>
          <button
            className="taro-uno-table__pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            下一页
          </button>
        </View>
      </View>
    );
  };

  // 渲染空状态
  const renderEmpty = () => {
    if (dataSource.length > 0) return null;

    return (
      <View className="taro-uno-table__empty">
        <Text className="taro-uno-table__empty-text">{emptyText}</Text>
      </View>
    );
  };

  // 渲染加载状态
  const renderLoading = () => {
    if (!loading) return null;

    return (
      <View className="taro-uno-table__loading">
        <View className="taro-uno-table__loading-spinner" />
        <Text className="taro-uno-table__loading-text">加载中...</Text>
      </View>
    );
  };

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: tableRef.current,
      getSelectedRowKeys: () => selectedRowKeys,
      setSelectedRowKeys: (keys) => setSelectedRowKeys(keys),
      getExpandedRowKeys: () => expandedRowKeys,
      setExpandedRowKeys: (keys) => setExpandedRowKeys(keys),
      getSortField: () => sortField,
      getSortOrder: () => sortOrder,
      setSort: (field, order) => {
        setSortField(field);
        setSortOrder(order);
      },
      refresh: () => {
        // 重新加载数据的逻辑
        handlePageChange(currentPage, pageSize);
      },
      scrollTo: (options) => {
        tableRef.current?.scrollTo(options);
      },
    }),
    [selectedRowKeys, expandedRowKeys, sortField, sortOrder, currentPage, pageSize],
  );

  // 生成样式
  const tableStyle = tableStyles.getStyle({
    size,
    bordered,
    striped,
    hoverable,
    scroll,
    style: style || {},
  });

  // 生成类名
  const tableClassName = tableStyles.getClassName({
    size,
    bordered,
    striped,
    hoverable,
    loading,
    className: className || '',
  });

  return (
    <View ref={tableRef} className={tableClassName} style={tableStyle} {...restProps}>
      {renderLoading()}

      <ScrollView
        className="taro-uno-table__scroll"
        scrollX={scroll?.x !== undefined}
        scrollY={scroll?.y !== undefined}
        style={{
          maxHeight: scroll?.y,
          maxWidth: scroll?.x,
        }}
      >
        <View className="taro-uno-table__container">
          {renderHeader()}

          <View className="taro-uno-table__body">
            {paginatedData.map((record, index) => renderRow(record, index))}
            {renderEmpty()}
          </View>
        </View>
      </ScrollView>

      {renderPagination()}
    </View>
  );
});

/** 表格组件显示名称 */
TableComponent.displayName = 'Table';

/** 导出表格组件 */
export default TableComponent;
