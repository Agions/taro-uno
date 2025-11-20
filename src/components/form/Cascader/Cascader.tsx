import React, { forwardRef, useRef, useCallback, useMemo, useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import type { ITouchEvent, InputProps } from '@tarojs/components';
import { CascaderStyles } from './Cascader.styles';
import type { CascaderProps, CascaderRef, CascaderOption, CascaderValue } from './Cascader.types';
import { useCascaderFieldNames } from './hooks/useCascaderFieldNames';
import { useCascaderOptions } from './hooks/useCascaderOptions';
import { useCascaderState } from './hooks/useCascaderState';

/** 级联选择器组件 */
export const CascaderComponent = forwardRef<CascaderRef, CascaderProps>((props, ref) => {
  const {
    options = [],
    placeholder = '请选择',
    disabled = false,
    readonly = false,
    allowClear = false,
    size = 'medium',
    status = 'default',
    variant = 'outlined',
    expandTrigger = 'click',
    direction = 'ltr',
    multiple = false,
    showSearch = false,
    bordered = true,
    inputReadOnly = false,
    maxTagCount,
    maxTagPlaceholder,
    popupStyle,
    popupClassName,
    suffixIcon,
    prefix,
    clearIcon,
    loading = false,
    showPath = false,
    pathSeparator = ' / ',
    changeOnSelect = false,
    fieldNames,
    loadData,
    filterOption,
    optionRender,
    dropdownRender,
    tagRender,
    displayRender,
    onFocus,
    onBlur,
    onClear,
    onSelect,
    onDeselect,
    onExpand,
    onSearch,
    onDropdownVisibleChange,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'combobox',
    accessibilityState,
    ...restProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const fields = useCascaderFieldNames(fieldNames);
  const { 
    findOptionPath, 
    getOptionValue, 
    getOptionLabel, 
    hasChildren, 
    isOptionDisabled, 
    isOptionLeaf,
    filterOptions: filterOptionsUtil 
  } = useCascaderOptions(options, fieldNames);

  const state = useCascaderState(options, props as CascaderProps);
  const {
    value,
    open,
    selectedOptions,
    expandedValues,
    searchValue,
    setValue,
    setOpen,
    setSelectedOptions,
    setExpandedValues,
    setSearchValue,
    clearAll,
    reset,
    isControlled: _isControlled,
  } = state;

  // 内部状态
  const [internalDisabled, setInternalDisabled] = React.useState(disabled);
  const [internalReadonly, setInternalReadonly] = React.useState(readonly);
  const [focused, setFocused] = React.useState(false);
  const [_filteredOptions, setFilteredOptions] = useState<CascaderOption[]>([]);

  // 更新内部状态
  React.useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  React.useEffect(() => {
    setInternalReadonly(readonly);
  }, [readonly]);

  // 处理输入变化
  const handleInputChange = useCallback(
    (event: Parameters<Required<InputProps>['onInput']>[0]) => {
      const inputValue = event.detail.value;
      setSearchValue(inputValue);
      onSearch?.(inputValue);

      if (showSearch && inputValue) {
        const filtered = filterOptionsUtil(inputValue);
        setFilteredOptions(filtered);
      } else {
        setFilteredOptions([]);
      }
    },
    [showSearch, filterOptionsUtil, onSearch, setSearchValue]
  );

  // 处理选项点击
  const handleOptionClick = useCallback(
    (option: CascaderOption, level: number) => {
      if (isOptionDisabled(option) || internalDisabled || internalReadonly) return;

      const optionValue = getOptionValue(option);
      const newSelectedOptions = selectedOptions.slice(0, level);
      newSelectedOptions.push(option);

      setSelectedOptions(newSelectedOptions);

      // 处理展开
      const newExpandedValues = expandedValues.slice(0, level);
      newExpandedValues.push(optionValue);
      setExpandedValues(newExpandedValues);

      // 触发展开事件
      onExpand?.(newExpandedValues, newSelectedOptions);

      // 处理选择
      if (changeOnSelect || isOptionLeaf(option) || !hasChildren(option)) {
        setValue(newExpandedValues.flat(), newSelectedOptions);
        onSelect?.(newExpandedValues.flat(), newSelectedOptions);

        // 如果是叶子节点或者不是多选模式，关闭下拉框
        if (isOptionLeaf(option) || !multiple) {
          setOpen(false);
        }
      }

      // 处理异步加载
      if (loadData && !isOptionLeaf(option) && !hasChildren(option)) {
        loadData(newSelectedOptions).then(() => {
          // 加载完成后自动展开
          setExpandedValues(newExpandedValues.concat(optionValue));
        });
      }
    },
    [
      selectedOptions,
      expandedValues,
      internalDisabled,
      internalReadonly,
      changeOnSelect,
      multiple,
      loadData,
      setSelectedOptions,
      setExpandedValues,
      setValue,
      setOpen,
      onExpand,
      onSelect,
      getOptionValue,
      isOptionDisabled,
      isOptionLeaf,
      hasChildren,
    ]
  );

  // 处理清除
  const handleClear = useCallback(
    (event: ITouchEvent) => {
      event.stopPropagation();
      clearAll();
      onClear?.();
    },
    [clearAll, onClear]
  );

  // 处理聚焦
  const handleFocus = useCallback(
    (event: Parameters<Required<InputProps>['onFocus']>[0]) => {
      if (internalDisabled || internalReadonly) return;

      setFocused(true);
      setOpen(true);
      onFocus?.(event);
    },
    [internalDisabled, internalReadonly, setOpen, onFocus]
  );

  // 处理失焦
  const handleBlur = useCallback(
    (event: Parameters<Required<InputProps>['onBlur']>[0]) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  // 处理下拉框显示状态变化
  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      if (internalDisabled || internalReadonly) return;
      setOpen(visible);
    },
    [internalDisabled, internalReadonly, setOpen]
  );

  // 渲染菜单项
  const renderMenuItem = useCallback(
    (option: CascaderOption, level: number) => {
      const optionValue = getOptionValue(option);
      const optionLabel = getOptionLabel(option);
      const isSelected = selectedOptions[level] && getOptionValue(selectedOptions[level]!) === optionValue;
      const isExpanded = expandedValues.some(value => value === optionValue);
      const optionHasChildren = hasChildren(option);

      const itemStyle = {
        ...CascaderStyles['getMenuItemStyle'](isOptionDisabled(option), isSelected, isExpanded),
        ...(option.style || {}),
      };

      return (
        <View
          key={String(optionValue)}
          style={itemStyle}
          className={option.className}
          onClick={() => handleOptionClick(option, level)}
                  >
          <Text>{optionRender ? optionRender(option, level) : optionLabel}</Text>
          {optionHasChildren && (
            <Text style={{
              ...CascaderStyles['getMenuItemExpandIconStyle'](),
              ...(isExpanded ? CascaderStyles['getMenuItemExpandIconRotatedStyle']() : {}),
            }}>
              ▶
            </Text>
          )}
          {option.loading && (
            <Text style={CascaderStyles['getLoadingIconStyle']()}>⏳</Text>
          )}
        </View>
      );
    },
    [
      selectedOptions,
      expandedValues,
      internalDisabled,
      internalReadonly,
      expandTrigger,
      handleOptionClick,
      optionRender,
      getOptionValue,
      getOptionLabel,
      hasChildren,
      isOptionDisabled,
    ]
  );

  // 渲染菜单列
  const renderMenuColumn = useCallback(
    (columnOptions: CascaderOption[], level: number) => {
      const columnStyle = {
        ...CascaderStyles['getMenuColumnStyle'](),
        ...(level === expandedValues.length ? CascaderStyles['getMenuColumnLastStyle']() : {}),
      };

      return (
        <View key={level} style={columnStyle}>
          {columnOptions.map(option => renderMenuItem(option, level))}
          {columnOptions.length === 0 && (
            <View style={CascaderStyles['getEmptyStyle']()}>
              <Text>无数据</Text>
            </View>
          )}
        </View>
      );
    },
    [expandedValues.length, renderMenuItem]
  );

  // 渲染菜单
  const renderMenu = useCallback(() => {
    if (!open) return null;

    // 获取当前显示的列
    const columns: CascaderOption[][] = [];
    let currentOptions = options;

    for (let i = 0; i <= expandedValues.length; i++) {
      if (currentOptions.length > 0) {
        columns.push(currentOptions);
      }

        if (i < expandedValues.length) {
        const levelValue = expandedValues[i];
        if (levelValue && levelValue.length > 0) {
          const optionValue = levelValue[levelValue.length - 1];
          const nextOption = currentOptions.find(
            (opt: CascaderOption) => {
              const currentValue = getOptionValue(opt);
              return currentValue.length > 0 && currentValue[0] === optionValue;
            }
          );

          if (nextOption && hasChildren(nextOption)) {
            currentOptions = nextOption[fields.children as keyof typeof nextOption] as CascaderOption[];
          } else {
            break;
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }

    const menuContent = dropdownRender ? dropdownRender(
      <View style={{ display: 'flex' }}>
        {columns.map((columnOptions, level) => renderMenuColumn(columnOptions, level))}
      </View>
    ) : (
      <View style={{ display: 'flex' }}>
        {columns.map((columnOptions, level) => renderMenuColumn(columnOptions, level))}
      </View>
    );

    const dropdownStyle = {
      ...CascaderStyles['getDropdownStyle'](),
      ...(popupStyle || {}),
    };

    return (
      <View style={dropdownStyle} className={popupClassName}>
        {showSearch && (
          <View style={CascaderStyles['getSearchStyle']()}>
            <Input
              style={CascaderStyles['getSearchInputStyle']()}
              value={searchValue}
              placeholder="搜索选项"
              onInput={handleInputChange}
              onFocus={(e) => e.stopPropagation()}
            />
          </View>
        )}
        {showPath && selectedOptions.length > 0 && (
          <View style={CascaderStyles['getPathStyle']()}>
            {selectedOptions.map((option, index) => (
              <React.Fragment key={index}>
                <Text style={CascaderStyles['getPathItemStyle']()}>
                  {String(getOptionLabel(option))}
                </Text>
                {index < selectedOptions.length - 1 && (
                  <Text style={CascaderStyles['getPathSeparatorStyle']()}>
                    {pathSeparator}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </View>
        )}
        {menuContent}
      </View>
    );
  }, [
    open,
    options,
    expandedValues,
    selectedOptions,
    showSearch,
    showPath,
    pathSeparator,
    searchValue,
    handleInputChange,
    renderMenuColumn,
    dropdownRender,
    popupStyle,
    popupClassName,
    getOptionLabel,
    hasChildren,
    fields,
  ]);

  // 格式化显示值
  const formatDisplayValue = useCallback(() => {
    if (!selectedOptions.length) return '';

    const labels = selectedOptions.map(option => String(getOptionLabel(option)));
    
    if (displayRender) {
      return displayRender(labels, selectedOptions);
    }

    return CascaderStyles['formatDisplayValue'](labels, selectedOptions, { showPath, pathSeparator });
  }, [selectedOptions, displayRender, showPath, pathSeparator, getOptionLabel]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      input: inputRef.current,
      getValue: () => value,
      setValue: (newValue: CascaderValue | null) => {
        const newSelectedOptions = newValue ? findOptionPath(newValue) : [];
        setValue(newValue, newSelectedOptions);
      },
      getSelectedOptions: () => selectedOptions,
      setOptions: () => {
        // 选项通过props管理，这里提供兼容性
        console.warn('setOptions is deprecated. Options should be managed through props.');
      },
      focus: () => {
        if (inputRef.current && !internalDisabled && !internalReadonly) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
      open: () => handleDropdownVisibleChange(true),
      close: () => handleDropdownVisibleChange(false),
      clear: () => {
        clearAll();
        onClear?.();
      },
      disable: () => setInternalDisabled(true),
      enable: () => setInternalDisabled(false),
      search: (searchTerm: string) => {
        setSearchValue(searchTerm);
        onSearch?.(searchTerm);
      },
      expandToPath: (path: CascaderValue) => {
        const foundPath = findOptionPath(path);
        if (foundPath.length > 0) {
          setSelectedOptions(foundPath);
          setExpandedValues([path]);
        }
      },
      reset: () => {
        reset();
      },
    }),
    [
      value,
      selectedOptions,
      internalDisabled,
      internalReadonly,
      handleDropdownVisibleChange,
      clearAll,
      onClear,
      onSearch,
      findOptionPath,
      setValue,
      setSelectedOptions,
      setExpandedValues,
      setSearchValue,
      reset,
    ]
  );

  // 生成输入框样式
  const getInputStyle = useMemo(() => {
    const baseStyle = {
      ...CascaderStyles['getInputStyle'](size, internalDisabled),
      ...(focused ? { borderColor: '#40a9ff', boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)' } : {}),
      ...(style || {}),
    };

    return baseStyle;
  }, [size, internalDisabled, focused, style]);

  // 生成容器样式
  const containerStyle = useMemo(() => ({
    ...CascaderStyles['getStyle']({
      size,
      variant,
      status,
      disabled: internalDisabled,
      readonly: internalReadonly,
      loading,
      style: {},
    }),
    ...style,
  }), [size, variant, status, internalDisabled, internalReadonly, loading, style]);

  // 生成输入框包装器样式
  const inputWrapperStyle = useMemo(() => ({
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    ...CascaderStyles['getSizeStyle'](size),
  }), [size]);

  // 无障碍状态
  const finalAccessibilityState = useMemo(() => ({
    disabled: internalDisabled,
    readonly: internalReadonly,
    expanded: open,
    busy: loading,
    ...accessibilityState,
  }), [internalDisabled, internalReadonly, open, loading, accessibilityState]);

  return (
    <View
      style={containerStyle}
      className={CascaderStyles['getClassName']({
        size,
        variant,
        status,
        disabled: internalDisabled,
        readonly: internalReadonly,
        loading,
        className,
      })}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={finalAccessibilityState}
      {...restProps}
    >
      <View style={inputWrapperStyle}>
        {prefix && (
          <View style={{ position: 'absolute', left: '12px', zIndex: 1 }}>
            {prefix}
          </View>
        )}

        <Input
          ref={inputRef}
          style={getInputStyle}
          value={formatDisplayValue()}
          placeholder={placeholder}
          disabled={internalDisabled || inputReadOnly || internalReadonly}
          onInput={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {allowClear && value && (
          <View
            style={CascaderStyles['getClearStyle']()}
            onClick={handleClear}
                      >
            <Text>{clearIcon || '×'}</Text>
          </View>
        )}

        <View style={{
          ...CascaderStyles['getSuffixStyle'](),
          ...(open ? CascaderStyles['getSuffixExpandedStyle']() : {}),
        }}>
          {loading ? (
            <Text style={CascaderStyles['getLoadingIconStyle']()}>⏳</Text>
          ) : (
            <Text>{suffixIcon || '▼'}</Text>
          )}
        </View>
      </View>

      {renderMenu()}
    </View>
  );
});

/** 级联选择器组件显示名称 */
CascaderComponent.displayName = 'Cascader';

/** 导出级联选择器组件 */
export const Cascader = CascaderComponent;
export default Cascader;