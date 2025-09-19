import React, { memo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { Input } from '../../../form/Input';
import { TransferStyles } from '../Transfer.styles';
import type { TransferDirection, TransferPaginationConfig } from '../Transfer.types';

interface TransferPaginationProps {
  /** 方向 */
  direction: TransferDirection;
  /** 分页配置 */
  pagination?: boolean | TransferPaginationConfig;
  /** 当前页码 */
  currentPage: number;
  /** 数据总数 */
  total: number;
  /** 页码变化回调 */
  onPageChange: (page: number) => void;
  /** 是否禁用 */
  disabled: boolean;
}

/** Transfer分页组件 */
export const TransferPagination: React.FC<TransferPaginationProps> = memo(({
  pagination,
  currentPage,
  total,
  onPageChange,
  disabled,
}) => {
  // 获取分页配置
  const getPaginationConfig = useCallback(() => {
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
  }, [pagination]);

  const config = getPaginationConfig();
  if (!config) return null;

  const { pageSize, simple, showQuickJumper } = config;
  const totalPages = Math.ceil(total / pageSize);

  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  // 处理页码变化
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && !disabled) {
      onPageChange(newPage);
    }
  }, [totalPages, disabled, onPageChange]);

  // 处理快速跳转输入
  const handleQuickJumperChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  }, [totalPages, handlePageChange]);

  // 分页按钮
  const PaginationButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    ariaLabel: string;
  }> = memo(({ onClick, disabled, children, ariaLabel }) => (
    <View
      style={{
        ...TransferStyles['getPaginationButtonStyle'](disabled),
        ...(disabled ? {} : TransferStyles['getPaginationButtonHoverStyle']()),
      }}
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      role="button"
    >
      <Text>{children}</Text>
    </View>
  ));

  PaginationButton.displayName = 'PaginationButton';

  return (
    <View style={TransferStyles['getPaginationStyle']()} role="navigation" aria-label="分页导航">
      <Text style={TransferStyles['getPaginationInfoStyle']()}>
        {simple ? `${currentPage} / ${totalPages}` : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, total)} / ${total}`}
      </Text>
      
      {!simple && (
        <View style={{ display: 'flex', gap: '4px' }} role="group" aria-label="分页按钮组">
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            ariaLabel="上一页"
          >
            ‹
          </PaginationButton>
          
          {showQuickJumper && (
            <Input
              type="number"
              style={TransferStyles['getPaginationSelectStyle']()}
              value={currentPage.toString()}
              onInput={handleQuickJumperChange as any}
              accessibilityLabel="跳转到指定页"
              disabled={disabled}
            />
          )}
          
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            ariaLabel="下一页"
          >
            ›
          </PaginationButton>
        </View>
      )}
    </View>
  );
});

TransferPagination.displayName = 'TransferPagination';