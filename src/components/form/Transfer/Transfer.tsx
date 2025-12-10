import React, { forwardRef, useCallback } from 'react';
import { View } from '@tarojs/components';
import { TransferStyles } from './Transfer.styles';
import type { TransferProps, TransferRef, TransferOption, TransferDirection, TransferValue } from './Transfer.types';
import { useTransferState } from './hooks';
import { TransferList, TransferOperations } from './components';

/** Transfer穿梭框组件 */
export const TransferComponent = forwardRef<TransferRef, TransferProps>((props, ref) => {
  const {
    dataSource = [],
    targetKeys: controlledTargetKeys,
    defaultTargetKeys = [],
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys = [],
    size = 'medium',
    status = 'default',
    layout = 'horizontal',
    disabled = false,
    showSearch = false,
    showSelectAll = true,
    showOperations = true,
    oneWay = false,
    pagination = false,
    operations = ['>', '<'],
    titles = ['源列表', '目标列表'],
    notFoundContent = '无数据',
    searchPlaceholder = '请搜索',
    filterOption,
    render,
    footer,
    optionRender,
    rowRender,
    searchRender,
    operationRender,
    emptyRender,
    onChange,
    onSelectChange,
    onSearch,
    onScroll,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'application',
    accessibilityState,
    ...restProps
  } = props;

  // 使用状态管理Hook
  const {
    targetKeys,
    selectedKeys,
    leftSelectedKeys,
    rightSelectedKeys,
    leftSearchValue,
    rightSearchValue,
    internalDisabled,
    leftPage,
    rightPage,
    updateTargetKeys,
    updateSelectedKeys,
    updateLeftRightSelectedKeys,
    setSearchValue,
    setPage,
    reset,
  } = useTransferState(controlledTargetKeys, defaultTargetKeys, controlledSelectedKeys, defaultSelectedKeys, disabled);

  // 处理选项点击
  const handleItemClick = useCallback(
    (item: TransferOption, _direction: TransferDirection) => {
      if (item.disabled || internalDisabled) return;

      const itemKey = item.key;
      const newSelectedKeys = selectedKeys.includes(itemKey)
        ? selectedKeys.filter((key) => key !== itemKey)
        : [...selectedKeys, itemKey];

      updateSelectedKeys(newSelectedKeys);
      updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);

      onSelectChange?.(
        newSelectedKeys.filter((key) => !targetKeys.includes(key)),
        newSelectedKeys.filter((key) => targetKeys.includes(key)),
      );
    },
    [selectedKeys, targetKeys, internalDisabled, updateSelectedKeys, updateLeftRightSelectedKeys, onSelectChange],
  );

  // 处理全选
  const handleSelectAll = useCallback(
    (direction: TransferDirection) => {
      if (internalDisabled) return;

      const sourceData =
        direction === 'left'
          ? dataSource.filter((item: TransferOption) => !targetKeys.includes(item.key))
          : dataSource.filter((item: TransferOption) => targetKeys.includes(item.key));

      const searchValue = direction === 'left' ? leftSearchValue : rightSearchValue;

      // 过滤数据
      const filteredData = searchValue
        ? sourceData.filter((item: TransferOption) => {
            if (filterOption) {
              return filterOption(searchValue, item);
            }
            const searchText = searchValue.toLowerCase();
            const title = String(item.title).toLowerCase();
            const description = item.description ? String(item.description).toLowerCase() : '';
            return title.includes(searchText) || description.includes(searchText);
          })
        : sourceData;

      const enabledData = filteredData.filter((item: TransferOption) => !item.disabled);
      const currentSelectedKeys = direction === 'left' ? leftSelectedKeys : rightSelectedKeys;

      const allSelected = enabledData.every((item: TransferOption) => currentSelectedKeys.includes(item.key));
      const newSelectedKeys = allSelected
        ? selectedKeys.filter((key) => !enabledData.some((item: TransferOption) => item.key === key))
        : [...selectedKeys, ...enabledData.map((item: TransferOption) => item.key)];

      updateSelectedKeys(newSelectedKeys);
      updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);

      onSelectChange?.(
        newSelectedKeys.filter((key) => !targetKeys.includes(key)),
        newSelectedKeys.filter((key) => targetKeys.includes(key)),
      );
    },
    [
      dataSource,
      targetKeys,
      leftSearchValue,
      rightSearchValue,
      leftSelectedKeys,
      rightSelectedKeys,
      selectedKeys,
      internalDisabled,
      filterOption,
      updateSelectedKeys,
      updateLeftRightSelectedKeys,
      onSelectChange,
    ],
  );

  // 处理移动
  const handleMove = useCallback(
    (direction: TransferDirection) => {
      if (internalDisabled) return;

      const moveKeys = direction === 'right' ? leftSelectedKeys : rightSelectedKeys;
      if (moveKeys.length === 0) return;

      const newTargetKeys =
        direction === 'right' ? [...targetKeys, ...moveKeys] : targetKeys.filter((key) => !moveKeys.includes(key));

      updateTargetKeys(newTargetKeys);

      // 清空移动方向的选中状态
      const newSelectedKeys = selectedKeys.filter((key) => !moveKeys.includes(key));
      updateSelectedKeys(newSelectedKeys);

      if (direction === 'right') {
        updateLeftRightSelectedKeys(newSelectedKeys, newTargetKeys);
      } else {
        updateLeftRightSelectedKeys(newSelectedKeys, newTargetKeys);
      }

      onChange?.(newTargetKeys, direction, moveKeys);
      onSelectChange?.(
        newSelectedKeys.filter((key) => !newTargetKeys.includes(key)),
        newSelectedKeys.filter((key) => newTargetKeys.includes(key)),
      );
    },
    [
      targetKeys,
      leftSelectedKeys,
      rightSelectedKeys,
      selectedKeys,
      internalDisabled,
      updateTargetKeys,
      updateSelectedKeys,
      updateLeftRightSelectedKeys,
      onChange,
      onSelectChange,
    ],
  );

  // 处理搜索
  const handleSearch = useCallback(
    (direction: TransferDirection, value: string) => {
      setSearchValue(direction, value);
      onSearch?.(direction, value);
    },
    [setSearchValue, onSearch],
  );

  // 处理页码变化
  const handlePageChange = useCallback(
    (direction: TransferDirection, page: number) => {
      setPage(direction, page);
    },
    [setPage],
  );

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      getTargetKeys: () => targetKeys,
      setTargetKeys: (keys: TransferValue) => {
        updateTargetKeys(keys);
        onChange?.(
          keys,
          'right',
          keys.filter((key) => !targetKeys.includes(key)),
        );
      },
      getSelectedKeys: () => selectedKeys,
      setSelectedKeys: (keys: TransferValue) => {
        updateSelectedKeys(keys);
        updateLeftRightSelectedKeys(keys, targetKeys);
        onSelectChange?.(
          keys.filter((key) => !targetKeys.includes(key)),
          keys.filter((key) => targetKeys.includes(key)),
        );
      },
      getDataSource: () => dataSource,
      setDataSource: (_data) => {
        // 这里需要更新外部数据源
        // 实际使用时应该通过 props 更新
        console.warn('setDataSource should be updated through props');
      },
      moveTo: (direction: TransferDirection, keys: TransferValue) => {
        const newTargetKeys =
          direction === 'right' ? [...targetKeys, ...keys] : targetKeys.filter((key) => !keys.includes(key));

        updateTargetKeys(newTargetKeys);
        onChange?.(newTargetKeys, direction, keys);
      },
      selectAll: (direction: TransferDirection) => {
        handleSelectAll(direction);
      },
      clearSelect: (direction: TransferDirection) => {
        const newSelectedKeys = selectedKeys.filter((key) => {
          if (direction === 'left') {
            return targetKeys.includes(key);
          } else {
            return !targetKeys.includes(key);
          }
        });

        updateSelectedKeys(newSelectedKeys);
        updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);

        onSelectChange?.(
          newSelectedKeys.filter((key) => !targetKeys.includes(key)),
          newSelectedKeys.filter((key) => targetKeys.includes(key)),
        );
      },
      search: (direction: TransferDirection, value: string) => {
        handleSearch(direction, value);
      },
      clearSearch: (direction: TransferDirection) => {
        handleSearch(direction, '');
      },
      disable: () => {
        // 这里需要更新外部disabled状态
        console.warn('disable should be updated through props');
      },
      enable: () => {
        // 这里需要更新外部disabled状态
        console.warn('enable should be updated through props');
      },
      reset: () => {
        reset();
      },
      getSelectedItems: () => {
        return dataSource.filter((item: TransferOption) => selectedKeys.includes(item.key));
      },
      getTargetItems: () => {
        return dataSource.filter((item: TransferOption) => targetKeys.includes(item.key));
      },
      getSourceItems: () => {
        return dataSource.filter((item: TransferOption) => !targetKeys.includes(item.key));
      },
    }),
    [
      targetKeys,
      selectedKeys,
      dataSource,
      updateTargetKeys,
      updateSelectedKeys,
      updateLeftRightSelectedKeys,
      onChange,
      onSelectChange,
      handleSelectAll,
      handleSearch,
      reset,
    ],
  );

  // 生成容器样式
  const containerStyle = {
    ...TransferStyles['getStyle']({
      size,
      status,
      layout,
      disabled: internalDisabled,
      style: {},
    }),
    ...style,
  };

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    ...accessibilityState,
  };

  return (
    <View
      style={containerStyle}
      className={TransferStyles['getClassName']({
        size,
        status,
        layout,
        disabled: internalDisabled,
        className,
      })}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={finalAccessibilityState}
      role={accessibilityRole}
      {...restProps}
    >
      {/* 左侧列表 */}
      <TransferList
        direction="left"
        dataSource={dataSource}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        showSearch={showSearch}
        showSelectAll={showSelectAll}
        pagination={pagination}
        title={titles[0]}
        notFoundContent={notFoundContent}
        searchPlaceholder={searchPlaceholder}
        searchValue={leftSearchValue}
        currentPage={leftPage}
        disabled={internalDisabled}
        onItemClick={handleItemClick}
        onSelectAll={handleSelectAll}
        onSearch={handleSearch}
        onPageChange={(page) => handlePageChange('left', page)}
        render={render}
        optionRender={optionRender}
        rowRender={rowRender}
        searchRender={searchRender}
        emptyRender={emptyRender}
        footer={footer}
        filterOption={filterOption}
      />

      {/* 操作按钮 */}
      <TransferOperations
        showOperations={showOperations}
        operations={operations}
        leftSelectedKeys={leftSelectedKeys}
        rightSelectedKeys={rightSelectedKeys}
        disabled={internalDisabled}
        onMove={handleMove}
        operationRender={operationRender}
      />

      {/* 右侧列表（非单向模式） */}
      {!oneWay && (
        <TransferList
          direction="right"
          dataSource={dataSource}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          showSearch={showSearch}
          showSelectAll={showSelectAll}
          pagination={pagination}
          title={titles[1] || titles[0]}
          notFoundContent={notFoundContent}
          searchPlaceholder={searchPlaceholder}
          searchValue={rightSearchValue}
          currentPage={rightPage}
          disabled={internalDisabled}
          onItemClick={handleItemClick}
          onSelectAll={handleSelectAll}
          onSearch={handleSearch}
          onPageChange={(page) => handlePageChange('right', page)}
          render={render}
          optionRender={optionRender}
          rowRender={rowRender}
          searchRender={searchRender}
          emptyRender={emptyRender}
          footer={footer}
          filterOption={filterOption}
        />
      )}
    </View>
  );
});

/** Transfer组件显示名称 */
TransferComponent.displayName = 'Transfer';

/** 导出Transfer组件 */
export const Transfer = TransferComponent;
export default Transfer;
