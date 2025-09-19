import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import { Input } from '../../form/Input';
import { paginationStyles } from './Pagination.styles';
import type { PaginationProps, PaginationRef } from './Pagination.types';

/** Pagination组件 */
export const PaginationComponent = forwardRef<PaginationRef, PaginationProps>((props, ref) => {
  const {
    current: controlledCurrent,
    defaultCurrent = 1,
    pageSize: controlledPageSize,
    defaultPageSize = 10,
    total,
    size = 'default',
    showTotal,
    showQuickJumper = false,
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
    disabled = false,
    simple = false,
    showMore = true,
    showLessItems = false,
    position = 'bottom',
    align = 'right',
    itemRender,
    onChange,
    onShowSizeChange,
    className,
    style,
    ...restProps
  } = props;

  const paginationRef = useRef<any>(null);
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [jumpInput, setJumpInput] = useState('');

  // 计算总页数
  const totalPages = Math.ceil(total / internalPageSize);

  // 处理受控模式
  useEffect(() => {
    if (controlledCurrent !== undefined) {
      setInternalCurrent(controlledCurrent);
    }
  }, [controlledCurrent]);

  useEffect(() => {
    if (controlledPageSize !== undefined) {
      setInternalPageSize(controlledPageSize);
    }
  }, [controlledPageSize]);

  // 处理页码改变
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || disabled) return;

      if (controlledCurrent === undefined) {
        setInternalCurrent(page);
      }
      onChange?.(page, internalPageSize);
    },
    [controlledCurrent, disabled, internalPageSize, onChange, totalPages],
  );

  // 处理每页条数改变
  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      if (disabled) return;

      const newCurrent = Math.min(internalCurrent, Math.ceil(total / pageSize));

      if (controlledPageSize === undefined) {
        setInternalPageSize(pageSize);
      }
      if (controlledCurrent === undefined) {
        setInternalCurrent(newCurrent);
      }

      onShowSizeChange?.(newCurrent, pageSize);
      onChange?.(newCurrent, pageSize);
    },
    [controlledCurrent, controlledPageSize, disabled, internalCurrent, total, onChange, onShowSizeChange],
  );

  // 处理快速跳转
  const handleJump = useCallback(() => {
    const page = parseInt(jumpInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpInput('');
    }
  }, [jumpInput, totalPages, handlePageChange]);

  // 生成页码数组
  const generatePages = useCallback(() => {
    const pages: number[] = [];
    const current = internalCurrent;
    const total = totalPages;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(0);
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(0);
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(0);
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(0);
        pages.push(total);
      }
    }

    return pages;
  }, [internalCurrent, totalPages]);

  // 渲染页码按钮
  const renderPageButton = (page: number) => {
    const isActive = page === internalCurrent;
    const isDisabled = disabled || page === 0;

    if (page === 0) {
      // 跳转按钮
      const jumpPrev = internalCurrent > 4;
      const jumpNext = internalCurrent < totalPages - 3;

      if (jumpPrev) {
        return (
          <View
            key="jump-prev"
            className="taro-uno-pagination__jump-prev"
            style={paginationStyles['getJumpButtonStyle'](size)}
            onClick={() => !disabled && handlePageChange(internalCurrent - 5)}
          >
            ...
          </View>
        );
      }

      if (jumpNext) {
        return (
          <View
            key="jump-next"
            className="taro-uno-pagination__jump-next"
            style={paginationStyles['getJumpButtonStyle'](size)}
            onClick={() => !disabled && handlePageChange(internalCurrent + 5)}
          >
            ...
          </View>
        );
      }

      return null;
    }

    const buttonContent = itemRender ? itemRender(page, 'page', page) : <Text>{page}</Text>;

    return (
      <View
        key={page}
        className={`taro-uno-pagination__page ${isActive ? 'taro-uno-pagination__page--active' : ''}`}
        style={paginationStyles['getPageButtonStyle']({
          active: isActive,
          disabled: isDisabled,
          size,
        })}
        onClick={() => !isDisabled && handlePageChange(page)}
      >
        {buttonContent}
      </View>
    );
  };

  // 渲染上一页按钮
  const renderPrevButton = () => {
    const isDisabled = disabled || internalCurrent <= 1;

    const buttonContent = itemRender ? itemRender(internalCurrent - 1, 'prev', '上一页') : <Text>上一页</Text>;

    return (
      <View
        className="taro-uno-pagination__prev"
        style={paginationStyles['getButtonStyle']({
          disabled: isDisabled,
          size,
        })}
        onClick={() => !isDisabled && handlePageChange(internalCurrent - 1)}
      >
        {buttonContent}
      </View>
    );
  };

  // 渲染下一页按钮
  const renderNextButton = () => {
    const isDisabled = disabled || internalCurrent >= totalPages;

    const buttonContent = itemRender ? itemRender(internalCurrent + 1, 'next', '下一页') : <Text>下一页</Text>;

    return (
      <View
        className="taro-uno-pagination__next"
        style={paginationStyles['getButtonStyle']({
          disabled: isDisabled,
          size,
        })}
        onClick={() => !isDisabled && handlePageChange(internalCurrent + 1)}
      >
        {buttonContent}
      </View>
    );
  };

  // 渲染总数
  const renderTotal = () => {
    if (!showTotal) return null;

    const start = (internalCurrent - 1) * internalPageSize + 1;
    const end = Math.min(internalCurrent * internalPageSize, total);

    const totalContent = typeof showTotal === 'function' ? showTotal(total, [start, end]) : `共 ${total} 条`;

    return (
      <View className="taro-uno-pagination__total" style={paginationStyles['getTotalStyle']()}>
        {totalContent}
      </View>
    );
  };

  // 渲染快速跳转
  const renderQuickJumper = () => {
    if (!showQuickJumper) return null;

    return (
      <View className="taro-uno-pagination__quick-jumper" style={paginationStyles['getQuickJumperStyle']()}>
        <Text>跳至</Text>
        <Input
          type="number"
          value={jumpInput}
          onInput={(e: any) => setJumpInput(e.detail.value)}
          style={paginationStyles['getInputStyle']()}
          disabled={disabled}
        />
        <Text>页</Text>
        <View
          className="taro-uno-pagination__jump-button"
          style={paginationStyles['getButtonStyle']({ size })}
          onClick={handleJump}
        >
          确定
        </View>
      </View>
    );
  };

  // 渲染页码选择器
  const renderSizeChanger = () => {
    if (!showSizeChanger) return null;

    const sizeIndex = pageSizeOptions.findIndex(size => size === internalPageSize);

    return (
      <View className="taro-uno-pagination__size-changer">
        <Picker
          mode="selector"
          range={pageSizeOptions}
          rangeKey="label"
          value={sizeIndex >= 0 ? sizeIndex : 0}
          onChange={(e) => {
            const selectedIndex = e.detail.value;
            const selectedSize = pageSizeOptions[selectedIndex as number];
            if (selectedSize !== undefined) {
              handlePageSizeChange(selectedSize);
            }
          }}
          disabled={disabled}
        >
          <View style={paginationStyles['getSelectStyle']()}>
            <Text>{internalPageSize} 条/页</Text>
          </View>
        </Picker>
      </View>
    );
  };

  // 简单模式渲染
  if (simple) {
    return (
      <View
        ref={paginationRef}
        className={paginationStyles['getClassName']({
          size,
          position,
          align,
          disabled,
          simple,
          className,
        } as any)}
        style={paginationStyles['getBaseStyle']({
          size,
          position,
          align,
          style,
        } as any)}
        {...restProps}
      >
        {renderPrevButton()}
        <Text className="taro-uno-pagination__simple-text">
          {internalCurrent} / {totalPages}
        </Text>
        {renderNextButton()}
      </View>
    );
  }

  // 计算样式
  const paginationStyle = paginationStyles['getBaseStyle']({
    size,
    position,
    align,
    style: style || {},
  } as any);

  // 计算类名
  const paginationClassName = paginationStyles['getClassName']({
    size,
    position,
    align,
    disabled,
    simple,
    className,
  } as any);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: paginationRef.current,
      getCurrent: () => internalCurrent,
      getPageSize: () => internalPageSize,
      getTotalPages: () => totalPages,
      getTotal: () => total,
      setCurrent: (page) => {
        if (controlledCurrent === undefined) {
          setInternalCurrent(page);
        }
      },
      setPageSize: (pageSize) => {
        if (controlledPageSize === undefined) {
          setInternalPageSize(pageSize);
        }
      },
      goTo: handlePageChange,
      prev: () => handlePageChange(internalCurrent - 1),
      next: () => handlePageChange(internalCurrent + 1),
      first: () => handlePageChange(1),
      last: () => handlePageChange(totalPages),
    }),
    [internalCurrent, internalPageSize, totalPages, total, controlledCurrent, controlledPageSize, handlePageChange],
  );

  return (
    <View ref={paginationRef} className={paginationClassName} style={paginationStyle} {...restProps}>
      {renderTotal()}
      {renderSizeChanger()}
      {renderPrevButton()}
      {generatePages().map(renderPageButton)}
      {renderNextButton()}
      {renderQuickJumper()}
    </View>
  );
});

/** Pagination组件显示名称 */
PaginationComponent.displayName = 'Pagination';

/** 导出Pagination组件 */
export const Pagination = PaginationComponent;
