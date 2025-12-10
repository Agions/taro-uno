import React, { memo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { TransferStyles } from '../Transfer.styles';
import { TransferItem } from './TransferItem';
import { TransferSearch } from './TransferSearch';
import { TransferPagination } from './TransferPagination';
import type {
  TransferOption,
  TransferValue,
  TransferDirection,
  TransferDataSource,
  TransferPaginationConfig,
  TransferProps,
} from '../Transfer.types';

interface TransferListProps {
  /** 方向 */
  direction: TransferDirection;
  /** 数据源 */
  dataSource: TransferDataSource;
  /** 目标键 */
  targetKeys: TransferValue;
  /** 选中键 */
  selectedKeys: TransferValue;
  /** 是否显示搜索框 */
  showSearch: boolean;
  /** 是否显示全选 */
  showSelectAll: boolean;
  /** 分页配置 */
  pagination?: boolean | TransferPaginationConfig;
  /** 标题 */
  title: React.ReactNode;
  /** 无数据文本 */
  notFoundContent: React.ReactNode;
  /** 搜索占位符 */
  searchPlaceholder: string;
  /** 搜索值 */
  searchValue: string;
  /** 当前页码 */
  currentPage: number;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击选项回调 */
  onItemClick: (item: TransferOption, direction: TransferDirection) => void;
  /** 全选回调 */
  onSelectAll: (direction: TransferDirection) => void;
  /** 搜索回调 */
  onSearch: (direction: TransferDirection, value: string) => void;
  /** 页码变化回调 */
  onPageChange: (page: number) => void;
  /** 自定义渲染函数 */
  render?: TransferProps['render'];
  /** 自定义选项渲染 */
  optionRender?: TransferProps['optionRender'];
  /** 自定义行渲染 */
  rowRender?: TransferProps['rowRender'];
  /** 自定义搜索渲染 */
  searchRender?: TransferProps['searchRender'];
  /** 自定义空状态渲染 */
  emptyRender?: TransferProps['emptyRender'];
  /** 自定义底部渲染 */
  footer?: TransferProps['footer'];
  /** 过滤函数 */
  filterOption?: TransferProps['filterOption'];
}

/** Transfer列表组件 */
export const TransferList: React.FC<TransferListProps> = memo(
  ({
    direction,
    dataSource,
    targetKeys,
    selectedKeys,
    showSearch,
    showSelectAll,
    pagination,
    title,
    notFoundContent,
    searchPlaceholder,
    searchValue,
    currentPage,
    disabled,
    onItemClick,
    onSelectAll,
    onSearch,
    onPageChange,
    // render: removed - not used
    optionRender,
    rowRender,
    searchRender,
    emptyRender,
    footer,
    filterOption,
  }) => {
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

    // 获取分页数据
    const getPaginatedData = useCallback(
      (data: TransferDataSource, page: number) => {
        if (pagination === false) return { data, total: data.length, page, totalPages: 1 };

        const pageSize = pagination === true ? 10 : pagination?.pageSize || 10;
        const total = data.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = data.slice(startIndex, endIndex);

        return { data: paginatedData, total, page, totalPages };
      },
      [pagination],
    );

    // 计算全选状态
    const calculateSelectAllState = useCallback(
      (data: TransferDataSource) => {
        const enabledData = data.filter((item) => !item.disabled);
        const totalCount = enabledData.length;
        const selectedCount = enabledData.filter((item) => selectedKeys.includes(item.key)).length;

        return {
          allSelected: totalCount > 0 && selectedCount === totalCount,
          selectedCount,
          totalCount,
        };
      },
      [selectedKeys],
    );

    // 获取当前方向的数据源
    const getCurrentDataSource = useCallback(() => {
      return direction === 'left'
        ? dataSource.filter((item) => !targetKeys.includes(item.key))
        : dataSource.filter((item) => targetKeys.includes(item.key));
    }, [dataSource, targetKeys, direction]);

    // 获取当前数据
    const currentData = getCurrentDataSource();
    const filteredData = filterDataSource(currentData, searchValue);
    const { data: paginatedData } = getPaginatedData(filteredData, currentPage);
    const { allSelected, selectedCount, totalCount } = calculateSelectAllState(filteredData);

    // 处理全选点击
    const handleSelectAllClick = useCallback(() => {
      if (!disabled) {
        onSelectAll(direction);
      }
    }, [disabled, onSelectAll, direction]);

    // 渲染全选框
    const renderSelectAll = useCallback(() => {
      if (!showSelectAll) return null;

      const checkboxStyle = {
        ...TransferStyles['getSelectAllCheckboxStyle'](),
        ...(allSelected ? TransferStyles['getSelectAllCheckboxSelectedStyle']() : {}),
      };

      return (
        <View
          style={TransferStyles['getSelectAllStyle']()}
          onClick={handleSelectAllClick}
          role="button"
          aria-label={allSelected ? '取消全选' : '全选'}
          aria-checked={allSelected}
        >
          <View style={checkboxStyle} aria-hidden={true}>
            {allSelected && <Text>✓</Text>}
          </View>
          <Text style={TransferStyles['getSelectAllLabelStyle']()}>
            全选 ({selectedCount} / {totalCount})
          </Text>
        </View>
      );
    }, [showSelectAll, allSelected, selectedCount, totalCount, disabled, handleSelectAllClick]);

    // 渲染列表项
    const renderItem = useCallback(
      (item: TransferOption, index: number) => (
        <TransferItem
          key={String(item.key)}
          item={item}
          direction={direction}
          isSelected={selectedKeys.includes(item.key)}
          disabled={item.disabled || disabled}
          onClick={onItemClick}
          optionRender={optionRender}
          rowRender={rowRender}
          index={index}
        />
      ),
      [selectedKeys, disabled, onItemClick, optionRender, rowRender, direction],
    );

    // 渲染空状态
    const renderEmpty = useCallback(
      () => (
        <View style={TransferStyles['getEmptyStyle']()} accessibilityRole="status" accessibilityLiveRegion="polite">
          <Text>{emptyRender ? emptyRender(direction) : notFoundContent}</Text>
        </View>
      ),
      [emptyRender, notFoundContent, direction],
    );

    // 渲染底部
    const renderFooter = useCallback(() => {
      if (!footer) return null;

      const leftData = dataSource.filter((item) => !targetKeys.includes(item.key));
      const rightData = dataSource.filter((item) => targetKeys.includes(item.key));

      return (
        <View style={TransferStyles['getFooterStyle']()}>
          {footer({
            direction,
            dataSource: [leftData, rightData],
          })}
        </View>
      );
    }, [footer, dataSource, targetKeys, direction]);

    // 计算列表标题
    const listTitle = direction === 'left' ? title : Array.isArray(title) ? title[1] : title;
    const listCount = direction === 'left' ? currentData.length : targetKeys.length;

    return (
      <View
        style={TransferStyles['getListStyle']()}
        role="region"
        accessibilityLabel={`${direction === 'left' ? '源' : '目标'}列表`}
      >
        {/* 列表头部 */}
        <View style={TransferStyles['getListHeaderStyle']()}>
          <Text style={TransferStyles['getListTitleStyle']()}>{listTitle}</Text>
          <Text style={TransferStyles['getListCountStyle']()} accessibilityLiveRegion="polite">
            {listCount} 项
          </Text>
        </View>

        {/* 搜索框 */}
        <TransferSearch
          direction={direction}
          showSearch={showSearch}
          searchValue={searchValue}
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
          searchRender={searchRender}
          disabled={disabled}
        />

        {/* 全选框 */}
        {renderSelectAll()}

        {/* 列表内容 */}
        <View
          style={TransferStyles['getListContentStyle']()}
          role="list"
          accessibilityLabel={`${direction === 'left' ? '源' : '目标'}选项列表`}
        >
          {paginatedData.length > 0 ? paginatedData.map((item, index) => renderItem(item, index)) : renderEmpty()}
        </View>

        {/* 分页 */}
        <TransferPagination
          direction={direction}
          pagination={pagination}
          currentPage={currentPage}
          total={filteredData.length}
          onPageChange={onPageChange}
          disabled={disabled}
        />

        {/* 底部 */}
        {renderFooter()}
      </View>
    );
  },
);

TransferList.displayName = 'TransferList';
