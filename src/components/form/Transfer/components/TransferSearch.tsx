import React, { memo, useCallback } from 'react';
import { View } from '@tarojs/components';
import { Input } from '../../../form/Input';
import { TransferStyles } from '../Transfer.styles';
import type { SearchRenderProps, TransferDirection } from '../Transfer.types';

interface TransferSearchProps {
  /** 方向 */
  direction: TransferDirection;
  /** 是否显示搜索框 */
  showSearch: boolean;
  /** 搜索值 */
  searchValue: string;
  /** 搜索占位符 */
  searchPlaceholder: string;
  /** 搜索回调 */
  onSearch: (direction: TransferDirection, value: string) => void;
  /** 自定义搜索渲染 */
  searchRender?: (props: SearchRenderProps) => React.ReactNode;
  /** 是否禁用 */
  disabled: boolean;
}

/** Transfer搜索组件 */
export const TransferSearch: React.FC<TransferSearchProps> = memo(
  ({ direction, showSearch, searchValue, searchPlaceholder, onSearch, searchRender, disabled }) => {
    // 处理搜索输入
    const handleSearchInput = useCallback(
      (value: string) => {
        onSearch(direction, value);
      },
      [direction, onSearch],
    );

    // 处理输入框聚焦
    const handleFocus = useCallback(() => {
      // Taro doesn't provide direct access to input element styling
      // Focus handling is handled by the native component
    }, []);

    // 处理输入框失焦
    const handleBlur = useCallback(() => {
      // Taro doesn't provide direct access to input element styling
      // Blur handling is handled by the native component
    }, []);

    // 如果不显示搜索框，返回null
    if (!showSearch) {
      return null;
    }

    // 使用自定义搜索渲染
    if (searchRender) {
      return (
        <View style={TransferStyles['getSearchStyle']()}>
          {searchRender({
            placeholder: searchPlaceholder,
            value: searchValue,
            onChange: handleSearchInput,
            direction,
          })}
        </View>
      );
    }

    // 默认搜索渲染
    return (
      <View style={TransferStyles['getSearchStyle']()}>
        <Input
          style={TransferStyles['getSearchInputStyle']()}
          value={searchValue}
          placeholder={searchPlaceholder}
          onInput={(e: any) => handleSearchInput(e.detail.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-label={searchPlaceholder}
        />
      </View>
    );
  },
);

TransferSearch.displayName = 'TransferSearch';
