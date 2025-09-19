import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { checkboxStyles } from './Checkbox.styles';
import type {
  CheckboxGroupProps,
  CheckboxGroupRef,
  CheckboxStatus,
} from './Checkbox.types';
import { Checkbox } from './Checkbox';

/** 复选框组组件 */
export const CheckboxGroupComponent = forwardRef<CheckboxGroupRef, CheckboxGroupProps>((props, ref) => {
  const {
    children,
    value: controlledValue,
    defaultValue = [],
    size = 'md',
    status: propStatus = 'normal',
    variant = 'default',
    color = 'primary',
    disabled = false,
    readonly = false,
    direction = 'horizontal',
    align = 'center',
    spacing = 8,
    options,
    onChange,
    onAllChange,
    maxCount,
    minCount,
    showSelectAll = false,
    selectAllText = '全选',
    showCount = false,
    countText = (_selected, _total) => `已选择 ${_selected} 项`,
    allowDeselectAll = true,
    compact = false,
    block = false,
    groupTitle,
    groupDescription,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'group',
    accessibilityState,
    className,
    style,
  } = props;

  const groupRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<Array<string | number>>(defaultValue);
  const [internalStatus, setInternalStatus] = useState<CheckboxStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);

  // 处理受控/非受控模式
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(propStatus);
  }, [propStatus]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setInternalReadonly(readonly);
  }, [readonly]);

  // 计算组状态
  const groupState = useCallback(() => {
    const availableOptions = options?.filter((opt) => !opt.disabled) || [];
    const selectedValues = value.filter((val) => availableOptions.some((opt) => opt.value === val));

    return {
      allSelected: availableOptions.length > 0 && selectedValues.length === availableOptions.length,
      indeterminate: selectedValues.length > 0 && selectedValues.length < availableOptions.length,
      selectedCount: selectedValues.length,
      totalCount: availableOptions.length,
    };
  }, [value, options]);

  // 处理单个复选框变化
  const handleCheckboxChange = useCallback(
    (checked: boolean, checkboxValue: string | number, _event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      let newValue: Array<string | number>;

      if (checked) {
        // 添加选中值
        newValue = [...value, checkboxValue];

        // 检查最大选择数量
        if (maxCount !== undefined && newValue.length > maxCount) {
          return;
        }
      } else {
        // 移除选中值
        newValue = value.filter((val) => val !== checkboxValue);

        // 检查最小选择数量
        if (minCount !== undefined && newValue.length < minCount) {
          return;
        }
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 触发变化事件 - 传递正确的值
      onChange?.(newValue);
    },
    [internalDisabled, internalReadonly, value, isControlled, maxCount, minCount, onChange],
  );

  // 处理全选
  const handleSelectAll = useCallback(
    (_event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      const { allSelected } = groupState();
      const availableOptions = options?.filter((opt) => !opt.disabled) || [];

      let newValue: Array<string | number>;

      if (allSelected && allowDeselectAll) {
        // 取消全选
        newValue = [];
      } else if (!allSelected) {
        // 全选
        newValue = availableOptions.map((opt) => opt.value);
      } else {
        // 已经全选且不允许取消选择，不做任何操作
        return;
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 触发变化事件
      onChange?.(newValue);

      // 触发全选变化事件
      onAllChange?.(!allSelected);
    },
    [internalDisabled, internalReadonly, groupState, options, isControlled, allowDeselectAll, onChange, onAllChange],
  );

  // 获取选项是否选中
  const isOptionSelected = useCallback(
    (optionValue: string | number) => {
      return value.includes(optionValue);
    },
    [value],
  );

  // 获取选项是否禁用
  const isOptionDisabled = useCallback(
    (optionValue: string | number) => {
      const option = options?.find((opt) => opt.value === optionValue);
      return internalDisabled || option?.disabled || false;
    },
    [internalDisabled, options],
  );

  // 获取选项是否只读
  const isOptionReadonly = useCallback(
    (_optionValue: string | number) => {
      return internalReadonly;
    },
    [internalReadonly],
  );

  // 渲染选项
  const renderOptions = useCallback(() => {
    if (!options) return null;

    return options.map((option) => (
      <View key={option.value} style={checkboxStyles['getGroupItemStyle']({ direction, compact })}>
        <Checkbox
          value={option.value}
          checked={isOptionSelected(option.value)}
          disabled={isOptionDisabled(option.value)}
          readonly={isOptionReadonly(option.value)}
          size={size}
          status={internalStatus}
          variant={variant}
          color={option.color || color}
          label={option.label}
          icon={option.icon}
          onChange={(checked, event) => handleCheckboxChange(checked, option.value, event)}
          style={option.style}
          className={option.className}
          data={option.data}
        />
        {option.description && (
          <Text
            style={{
              fontSize: checkboxStyles.SIZE_MAP[size].fontSize * 0.85,
              color: '#6b7280',
              marginLeft: checkboxStyles.SIZE_MAP[size].padding,
            }}
          >
            {option.description}
          </Text>
        )}
      </View>
    ));
  }, [
    options,
    size,
    internalStatus,
    variant,
    color,
    isOptionSelected,
    isOptionDisabled,
    isOptionReadonly,
    handleCheckboxChange,
    direction,
    compact,
  ]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
      setValue: (newValue) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
      },
      selectAll: () => {
        const availableOptions = options?.filter((opt) => !opt.disabled) || [];
        const newValue: Array<string | number> = availableOptions.map((opt) => opt.value);

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        onAllChange?.(true);
      },
      unselectAll: () => {
        if (!isControlled) {
          setInternalValue([]);
        }
        onChange?.([]);
        onAllChange?.(false);
      },
      toggleAll: () => {
        const { allSelected } = groupState();
        if (allSelected) {
          // 取消全选
          const newValue: Array<string | number> = [];

          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
          onAllChange?.(false);
        } else {
          // 全选
          const availableOptions = options?.filter((opt) => !opt.disabled) || [];
          const newValue: Array<string | number> = availableOptions.map((opt) => opt.value);

          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
          onAllChange?.(true);
        }
      },
      getCheckedCount: () => groupState().selectedCount,
      getTotalCount: () => groupState().totalCount,
      isAllSelected: () => groupState().allSelected,
      isIndeterminate: () => groupState().indeterminate,
      setDisabled: (newDisabled) => {
        setInternalDisabled(newDisabled);
      },
      setReadonly: (newReadonly) => {
        setInternalReadonly(newReadonly);
      },
      setStatus: (newStatus) => {
        setInternalStatus(newStatus);
      },
      validate: async () => {
        const { selectedCount } = groupState();

        // 检查最小选择数量
        if (minCount !== undefined && selectedCount < minCount) {
          return {
            valid: false,
            message: `最少需要选择 ${minCount} 项`,
          };
        }

        // 检查最大选择数量
        if (maxCount !== undefined && selectedCount > maxCount) {
          return {
            valid: false,
            message: `最多允许选择 ${maxCount} 项`,
          };
        }

        return { valid: true };
      },
      reset: () => {
        if (!isControlled) {
          setInternalValue(defaultValue);
        }
        setInternalStatus('normal');
      },
      getSelectedOptions: () => {
        return options?.filter((opt) => value.includes(opt.value)) || [];
      },
      getOptionByValue: (optionValue) => {
        return options?.find((opt) => opt.value === optionValue);
      },
      setOptionDisabled: (_optionValue, _optionDisabled) => {
        // 设置选项禁用状态
        // Set option disabled: optionValue, optionDisabled
      },
      setOptionsDisabled: (_optionValues, _optionDisabled) => {
        // 批量设置选项禁用状态
        // Set options disabled: optionValues, optionDisabled
      },
      focus: () => {
        if (groupRef.current) {
          groupRef.current.focus();
        }
      },
      blur: () => {
        if (groupRef.current) {
          groupRef.current.blur();
        }
      },
    }),
    [value, isControlled, options, groupState, minCount, maxCount, defaultValue, onChange, onAllChange],
  );

  const { allSelected, indeterminate, selectedCount, totalCount } = groupState();

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    readonly: internalReadonly,
    busy: false,
    expanded: false,
    ...accessibilityState,
  };

  return (
    <View
      ref={groupRef}
      style={{
        ...checkboxStyles['getGroupStyle']({
          direction,
          align,
          spacing,
          compact,
          block,
          style,
        }),
        width: block ? '100%' : 'auto',
      }}
      className={className}
      accessible={accessible}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      role={accessibilityRole}
      aria-state={finalAccessibilityState}
    >
      {/* 分组标题 */}
      {groupTitle && (
        <Text
          style={{
            fontSize: checkboxStyles.SIZE_MAP[size].fontSize * 1.2,
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: 8,
          }}
        >
          {groupTitle}
        </Text>
      )}

      {/* 分组描述 */}
      {groupDescription && (
        <Text
          style={{
            fontSize: checkboxStyles.SIZE_MAP[size].fontSize * 0.9,
            color: '#6b7280',
            marginBottom: 12,
          }}
        >
          {groupDescription}
        </Text>
      )}

      {/* 全选按钮 */}
      {showSelectAll && options && options.length > 0 && (
        <View
          style={checkboxStyles['getSelectAllStyle']({
            size,
            disabled: internalDisabled || internalReadonly,
          })}
          onClick={handleSelectAll}
        >
          <Checkbox
            checked={allSelected}
            indeterminate={indeterminate}
            disabled={internalDisabled || internalReadonly}
            size={size}
            onChange={() => {}}
          />
          <Text style={{ marginLeft: 8 }}>{selectAllText}</Text>
        </View>
      )}

      {/* 复选框组内容 */}
      {options && options.length > 0 ? (
        <View style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', flexWrap: 'wrap' }}>
          {renderOptions()}
        </View>
      ) : (
        children
      )}

      {/* 计数显示 */}
      {showCount && <Text style={checkboxStyles['getCountStyle']({ size })}>{countText(selectedCount, totalCount)}</Text>}
    </View>
  );
});

/** 复选框组组件显示名称 */
CheckboxGroupComponent.displayName = 'CheckboxGroup';

/** 导出复选框组组件 */
export const CheckboxGroup = CheckboxGroupComponent;
