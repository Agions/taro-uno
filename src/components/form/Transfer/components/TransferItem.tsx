import React, { memo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { TransferStyles } from '../Transfer.styles';
import type { TransferOption, TransferDirection } from '../Transfer.types';

interface TransferItemProps {
  /** 选项数据 */
  item: TransferOption;
  /** 方向 */
  direction: TransferDirection;
  /** 是否选中 */
  isSelected: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击事件 */
  onClick: (item: TransferOption, direction: TransferDirection) => void;
  /** 自定义渲染函数 */
  optionRender?: (option: TransferOption) => React.ReactNode;
  /** 自定义行渲染函数 */
  rowRender?: (item: TransferOption, index: number, direction: TransferDirection) => React.ReactNode;
  /** 索引 */
  index?: number;
}

/** Transfer选项组件 */
export const TransferItem: React.FC<TransferItemProps> = memo(({
  item,
  direction,
  isSelected,
  disabled,
  onClick,
  optionRender,
  rowRender,
  index = 0,
}) => {
  // 处理点击事件
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick(item, direction);
    }
  }, [item, direction, disabled, onClick]);

  // 移除了鼠标事件处理函数，因为在Taro环境中可能不支持

  // 使用自定义行渲染
  if (rowRender) {
    return (
      <View
        key={String(item.key)}
        style={TransferStyles['getListItemStyle'](disabled, isSelected)}
        className={item.className}
        onClick={handleClick}
          accessibilityState={{ selected: isSelected, disabled: disabled }}
        role="option"
      >
        {rowRender(item, index, direction)}
      </View>
    );
  }

  // 默认渲染
  const itemStyle = {
    ...TransferStyles['getListItemStyle'](disabled, isSelected),
    ...(item.style || {}),
  };

  const checkboxStyle = {
    ...TransferStyles['getListItemCheckboxStyle'](),
    ...(isSelected ? TransferStyles['getListItemCheckboxSelectedStyle']() : {}),
    ...(disabled ? TransferStyles['getListItemCheckboxDisabledStyle']() : {}),
  };

  return (
    <View
      key={String(item.key)}
      style={itemStyle}
      className={item.className}
      onClick={handleClick}
      accessibilityState={{ selected: isSelected, disabled: disabled }}
      role="option"
    >
      <View style={checkboxStyle} accessibilityElementsHidden={true}>
        {isSelected && <Text accessibilityLabel="已选中">✓</Text>}
      </View>
      <View style={TransferStyles['getListItemContentStyle']()}>
        {optionRender ? optionRender(item) : (
          <View>
            <Text>{item.title}</Text>
            {item.description && (
              <Text style={TransferStyles['getListItemDescriptionStyle']()}>
                {item.description}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
});

TransferItem.displayName = 'TransferItem';