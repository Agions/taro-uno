import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Picker, View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { selectStyles } from './Select.styles';
import type { SelectProps, SelectRef, SelectStatus, SelectOption, SelectOptionGroup } from './Select.types';

/** 选择器组件 */
export const SelectComponent = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    placeholder = '请选择',
    size = 'md',
    variant: _variant = 'outlined',
    status: propStatus = 'normal',
    mode = 'single',
    disabled = false,
    readonly = false,
    bordered = true,
    allowClear = false,
    showSearch: _showSearch = false,
    searchPlaceholder: _searchPlaceholder = '搜索选项',
    showTags: _showTags = false,
    maxTagCount: _maxTagCount,
    options = [],
    prefix,
    suffix,
    label,
    helperText,
    errorText,
    showArrow = true,
    dropdownStyle: _dropdownStyle,
    dropdownClassName: _dropdownClassName,
    dropdownMatchSelectWidth: _dropdownMatchSelectWidth = true,
    placement: _placement = 'bottomLeft',
    className: _className,
    onChange,
    onDropdownVisibleChange,
    // onSearch: removed - not used
    // onClear: removed - not used
    rules,
    validateTrigger = 'onBlur',
    immediate = false,
    maxCount,
    minCount,
    validator,
    loading = false,
    loadingText = '加载中...',
    notFoundContent: _notFoundContent = '暂无数据',
    style: _style,
    // ...restProps // Removed unused rest props
  } = props;

  // Generate CSS classes
  const generatedClassName = selectStyles.getClassName({
    size,
    variant: _variant,
    status: propStatus,
    disabled,
    readonly,
    bordered,
    className: _className,
  });

  // Generate styles
  const generatedStyle = selectStyles.getStyle({
    size,
    variant: _variant,
    status: propStatus,
    disabled,
    readonly,
    style: _style,
  });

  const selectRef = useRef<HTMLSelectElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalStatus, setInternalStatus] = useState<SelectStatus>(propStatus);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message?: string } | null>(null);

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

  // 立即验证
  useEffect(() => {
    if (immediate && value) {
      validateSelect(value || '');
    }
  }, [immediate, value]);

  // 扁平化选项
  const flattenOptions = useCallback((opts: Array<SelectOption | SelectOptionGroup>): SelectOption[] => {
    return opts.reduce<SelectOption[]>((acc, opt) => {
      if ('options' in opt) {
        return [...acc, ...opt.options];
      }
      return [...acc, opt];
    }, []);
  }, []);

  // 查找选项
  const findOption = useCallback(
    (val: string | number): SelectOption | null => {
      const flatOptions = flattenOptions(options);
      return flatOptions.find((opt) => opt.value === val) || null;
    },
    [options, flattenOptions],
  );

  // 获取选中选项
  const getSelectedOptions = useCallback((): SelectOption[] => {
    if (value === undefined || value === null) return [];

    if (mode === 'single') {
      const option = findOption(value as string | number);
      return option ? [option] : [];
    } else {
      const values = Array.isArray(value) ? value : value ? [value] : [];
      return values.map((val) => findOption(val)).filter(Boolean) as SelectOption[];
    }
  }, [value, mode, findOption]);

  // 验证选择器值
  const validateSelect = useCallback(
    async (selectValue: string | number | Array<string | number>): Promise<{ valid: boolean; message?: string }> => {
      if (!rules && !validator) {
        return { valid: true };
      }

      // 验证必填
      if (rules?.some((rule) => rule.required)) {
        const isEmpty = Array.isArray(selectValue) ? selectValue.length === 0 : !selectValue;
        if (isEmpty) {
          const requiredRule = rules.find((rule) => rule.required);
          return { valid: false, message: requiredRule?.message || '此字段为必填项' };
        }
      }

      // 验证数量
      if (Array.isArray(selectValue)) {
        if (minCount !== undefined && selectValue.length < minCount) {
          return { valid: false, message: `最少需要选择${minCount}项` };
        }
        if (maxCount !== undefined && selectValue.length > maxCount) {
          return { valid: false, message: `最多允许选择${maxCount}项` };
        }
      }

      // 验证规则
      if (rules) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (rule?.validator) {
            const result = await rule.validator(selectValue);
            if (typeof result === 'string') {
              return { valid: false, message: result };
            }
            if (!result) {
              return { valid: false, message: rule?.message || '选择不正确' };
            }
          }
        }
      }

      // 自定义验证函数
      if (validator) {
        const result = await validator(selectValue);
        if (typeof result === 'string') {
          return { valid: false, message: result };
        }
        if (!result) {
          return { valid: false, message: '验证失败' };
        }
      }

      return { valid: true };
    },
    [rules, validator, minCount, maxCount],
  );

  // 处理值变化
  const handleValueChange = useCallback(
    async (newValue: string | number | Array<string | number>, selectedOption: SelectOption | SelectOption[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 验证选择
      if (validateTrigger === 'onChange') {
        const result = await validateSelect(newValue || '');
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
      }

      // 触发变化事件
      onChange?.(newValue, selectedOption);
    },
    [isControlled, validateTrigger, validateSelect, onChange],
  );

  // 处理清除事件
  const handleClear = useCallback(
    (_event: ITouchEvent) => {
      if (internalDisabled || internalReadonly) return;

      const emptyValue = mode === 'single' ? '' : [];
      if (!isControlled) {
        setInternalValue(emptyValue);
      }

      setValidationResult(null);
      setInternalStatus('normal');
      onChange?.(emptyValue, []);
    },
    [internalDisabled, internalReadonly, isControlled, mode, onChange],
  );

  // 计算最终状态
  const finalStatus = internalDisabled
    ? 'disabled'
    : loading
      ? 'loading'
      : validationResult?.valid === false
        ? 'error'
        : internalStatus;

  // 获取显示文本
  const getDisplayText = useCallback((): string => {
    const selectedOptions = getSelectedOptions();

    if (selectedOptions.length === 0) {
      return placeholder || '请选择';
    }

    if (mode === 'single') {
      return selectedOptions[0]?.label?.toString() || '';
    } else {
      return selectedOptions
        .map((opt) => opt.label?.toString())
        .filter(Boolean)
        .join(', ');
    }
  }, [getSelectedOptions, placeholder, mode]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: selectRef.current,
      getValue: () =>
        value !== undefined && value !== null
          ? value
          : ((mode === 'single' ? '' : []) as string | number | (string | number)[]),
      setValue: (newValue) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
      },
      focus: () => {
        if (selectRef.current && !internalDisabled && !internalReadonly && !loading) {
          selectRef.current.focus();
        }
      },
      blur: () => {
        if (selectRef.current) {
          selectRef.current.blur();
        }
      },
      openDropdown: () => {
        if (!internalDisabled && !internalReadonly) {
          setIsDropdownOpen(true);
          onDropdownVisibleChange?.(true);
        }
      },
      closeDropdown: () => {
        setIsDropdownOpen(false);
        onDropdownVisibleChange?.(false);
      },
      toggleDropdown: () => {
        const newState = !isDropdownOpen;
        setIsDropdownOpen(newState);
        onDropdownVisibleChange?.(newState);
      },
      setDisabled: (newDisabled) => {
        setInternalDisabled(newDisabled);
      },
      setReadonly: (newReadonly) => {
        setInternalReadonly(newReadonly);
      },
      setStatus: (newStatus) => {
        setInternalStatus(newStatus);
      },
      getStatus: () => finalStatus,
      validate: async () => {
        const result = await validateSelect(value || '');
        setValidationResult(result);
        setInternalStatus(result.valid ? 'normal' : 'error');
        return result;
      },
      clear: () => {
        handleClear({} as ITouchEvent);
      },
      reset: () => {
        if (!isControlled) {
          setInternalValue(defaultValue);
        }
        setValidationResult(null);
        setInternalStatus('normal');
      },
      getSelectedOptions,
      searchOptions: (keyword) => {
        if (!keyword || typeof keyword !== 'string') return [];
        const flatOptions = flattenOptions(options);
        return flatOptions.filter(
          (opt) =>
            opt.label?.toString().toLowerCase().includes(keyword.toLowerCase()) ||
            opt.value?.toString().toLowerCase().includes(keyword.toLowerCase()),
        );
      },
      scrollToOption: (_optionValue) => {
        // 在实际实现中，这里会滚动到指定选项
        // Scroll to option: _optionValue
      },
    }),
    [
      value,
      isControlled,
      internalDisabled,
      internalReadonly,
      validateSelect,
      handleClear,
      defaultValue,
      getSelectedOptions,
      flattenOptions,
      options,
      isDropdownOpen,
      onDropdownVisibleChange,
    ],
  );

  // 处理Picker变化
  const handlePickerChange = (e: any) => {
    const selectedIndex = e.detail?.value;
    // 根据索引获取对应的选项
    const selectedOption = options[selectedIndex];

    if (selectedOption && !('options' in selectedOption)) {
      handleValueChange(selectedOption.value, selectedOption);
    }
  };

  // 简化Picker数据（仅显示标签）
  const simplePickerData = options.map((opt) => {
    if ('options' in opt) {
      return (opt.label as any)?.toString() || '';
    }
    return (opt.label as any)?.toString() || '';
  });

  // 获取当前选中的索引
  const getCurrentIndex = () => {
    if (value === undefined || value === null || value === '') return 0;
    const index = options.findIndex((opt) => {
      if ('options' in opt) return false;
      return opt.value === value;
    });
    return index >= 0 ? index : 0;
  };

  return (
    <View style={selectStyles['getContainerStyle']({ size, block: props.block, style: props.containerStyle })}>
      {/* 标签 */}
      {label && <Text style={selectStyles['getLabelStyle']({ size, disabled: internalDisabled })}>{label}</Text>}

      {/* 选择器包装器 */}
      <View
        style={selectStyles['getWrapperStyle']({
          size,
          status: finalStatus,
          disabled: internalDisabled,
          readonly: internalReadonly,
          bordered,
          // isFocused,
        })}
      >
        {/* 前缀 */}
        {prefix && <View style={selectStyles['getPrefixStyle']({ size, disabled: internalDisabled })}>{prefix}</View>}

        {/* 选择器 */}
        <Picker
          mode="selector"
          range={simplePickerData}
          value={getCurrentIndex()}
          onChange={handlePickerChange}
          disabled={internalDisabled || internalReadonly || loading}
          className={generatedClassName}
          style={generatedStyle}
          // Taro Picker doesn't support these props natively
          // onFocus={props.onFocus}
          // onBlur={props.onBlur}
        >
          <View style={selectStyles['getSelectorStyle']({ size, disabled: internalDisabled })}>
            <Text style={selectStyles['getValueStyle']({ size, hasValue: !!value, disabled: internalDisabled })}>
              {getDisplayText()}
            </Text>

            {/* 后缀 */}
            <View style={selectStyles['getSuffixStyle']({ size, disabled: internalDisabled })}>
              {/* 清除按钮 */}
              {allowClear && value && !internalDisabled && !internalReadonly && (
                <View style={selectStyles['getClearButtonStyle']({ size })} onClick={handleClear}>
                  <Text>×</Text>
                </View>
              )}

              {/* 箭头 */}
              {showArrow && !internalDisabled && !internalReadonly && (
                <Text style={selectStyles['getArrowStyle']({ size, open: isDropdownOpen })}>▼</Text>
              )}

              {/* 自定义后缀 */}
              {suffix}
            </View>
          </View>
        </Picker>
      </View>

      {/* 辅助文本 */}
      {helperText && finalStatus === 'normal' && (
        <Text style={selectStyles['getHelperTextStyle']({ size, status: finalStatus })}>{helperText}</Text>
      )}

      {/* 错误文本 */}
      {errorText && finalStatus === 'error' && (
        <Text style={selectStyles['getErrorTextStyle']({ size })}>{errorText}</Text>
      )}

      {/* 验证结果文本 */}
      {validationResult?.message && finalStatus === 'error' && (
        <Text style={selectStyles['getErrorTextStyle']({ size })}>{validationResult.message}</Text>
      )}

      {/* 无数据提示 */}
      {!loading && options.length === 0 && _notFoundContent && (
        <Text style={selectStyles['getNotFoundTextStyle']({ size })}>{_notFoundContent}</Text>
      )}

      {/* 加载状态 */}
      {loading && <Text style={selectStyles['getLoadingTextStyle']({ size })}>{loadingText}</Text>}
    </View>
  );
});

/** 选择器组件显示名称 */
SelectComponent.displayName = 'Select';

/** 导出选择器组件 */
export const Select = SelectComponent;
