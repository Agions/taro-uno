import React, { memo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { TransferStyles } from '../Transfer.styles';
import type { TransferDirection } from '../Transfer.types';

interface TransferOperationsProps {
  /** 是否显示操作按钮 */
  showOperations: boolean;
  /** 操作按钮文本 */
  operations: (string | React.ReactNode)[];
  /** 左侧选中键 */
  leftSelectedKeys: (string | number)[];
  /** 右侧选中键 */
  rightSelectedKeys: (string | number)[];
  /** 是否禁用 */
  disabled: boolean;
  /** 移动回调 */
  onMove: (direction: TransferDirection) => void;
  /** 自定义操作渲染 */
  operationRender?: (direction: TransferDirection) => React.ReactNode;
}

/** Transfer操作组件 */
export const TransferOperations: React.FC<TransferOperationsProps> = memo(
  ({ showOperations, operations, leftSelectedKeys, rightSelectedKeys, disabled, onMove, operationRender }) => {
    // 如果不显示操作按钮，返回null
    if (!showOperations) {
      return null;
    }

    // 处理移动操作
    const handleMove = useCallback(
      (direction: TransferDirection) => {
        if (!disabled) {
          onMove(direction);
        }
      },
      [disabled, onMove],
    );

    return (
      <View style={TransferStyles['getOperationStyle']()} role="group" accessibilityLabel="穿梭操作按钮">
        {operations.map((operation, index) => {
          const direction = index === 0 ? 'right' : 'left';
          const selectedKeys = direction === 'right' ? leftSelectedKeys : rightSelectedKeys;
          const isDisabled = selectedKeys.length === 0 || disabled;

          // 使用自定义操作渲染
          if (operationRender) {
            return (
              <View key={index} role="none">
                {operationRender(direction)}
              </View>
            );
          }

          // 默认操作按钮
          const buttonStyle = {
            ...TransferStyles['getOperationButtonStyle'](isDisabled),
            ...(isDisabled ? {} : TransferStyles['getOperationButtonHoverStyle']()),
          };

          return (
            <View
              key={index}
              style={buttonStyle}
              onClick={() => handleMove(direction)}
              aria-disabled={isDisabled}
              role="button"
              aria-label={`移动到${direction === 'right' ? '右侧' : '左侧'}`}
            >
              <Text>{operation}</Text>
            </View>
          );
        })}
      </View>
    );
  },
);

TransferOperations.displayName = 'TransferOperations';
