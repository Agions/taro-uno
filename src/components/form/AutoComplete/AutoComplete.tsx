/**
 * Taro-Uno AutoComplete Component
 * 自动完成组件实现
 */

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Input, Button } from '@tarojs/components';
import type { AutoCompleteProps, AutoCompleteRef, AutoCompleteOption } from './AutoComplete.types';
import {
  BaseStyles,
  getThemeStyle,
  getStatusStyle,
  getSizeStyle,
  getDirectionStyle,
  mergeStyles,
} from './AutoComplete.styles';

// 防抖函数实现
const debounce = (fn: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
};

// 将字符串数组转换为选项数组
const normalizeOptions = (options: AutoCompleteProps['options']): AutoCompleteOption[] => {
  if (!options) return [];
  return options.map((option) => {
    if (typeof option === 'string') {
      return {
        value: option,
        label: option,
      };
    }
    return option;
  });
};

// 默认过滤函数
const defaultFilterOption = (inputValue: string, option: AutoCompleteOption): boolean => {
  if (!inputValue) return true;
  return (
    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );
};

/**
 * AutoComplete 组件
 * 提供自动完成功能，支持自定义选项、方向、主题、大小、状态等
 */
const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>((props, ref) => {
  // 合并配置和直接属性
  const mergedConfig = {
    direction: props.direction,
    theme: props.theme,
    size: props.size,
    status: props.status,
    showClear: props.showClear,
    showSearchIcon: props.showSearchIcon,
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required,
    placeholder: props.placeholder,
    debounceDelay: props.debounceDelay,
    minLength: props.minLength,
    maxOptions: props.maxOptions,
    ...props.config,
  };

  // 状态管理
  // 值状态
  const [value, setValue] = useState<string>(props.value || props.defaultValue || '');
  // 内部值状态，用于输入防抖
  const [internalValue, setInternalValue] = useState<string>(value);
  // 可见性状态
  const [visible, setVisible] = useState<boolean>(props.visible || props.defaultVisible || false);
  // 内部可见性状态，用于动画控制
  const [internalVisible, setInternalVisible] = useState<boolean>(visible);
  // 高亮选项索引
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  // 输入框焦点状态
  const [focused, setFocused] = useState<boolean>(false);
  // 过滤后的选项
  const [filteredOptions, setFilteredOptions] = useState<AutoCompleteOption[]>([]);

  // 引用管理
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);
  // 输入框引用
  const inputRef = useRef<HTMLInputElement>(null);
  // 选项容器引用
  const optionsRef = useRef<HTMLDivElement>(null);
  // 防抖函数引用
  const debouncedSearchRef = useRef<(() => void) | null>(null);

  // 主题样式
  const themeStyle = getThemeStyle(mergedConfig.theme || 'light');
  // 状态样式
  const statusStyle = getStatusStyle(mergedConfig.status || 'default');
  // 大小样式
  const sizeStyle = getSizeStyle(mergedConfig.size || 'md');
  // 方向样式
  const directionStyle = getDirectionStyle(mergedConfig.direction || 'bottom');

  // 防抖延迟
  const debounceDelay = mergedConfig.debounceDelay || 300;
  // 最小输入长度
  const minLength = mergedConfig.minLength || 0;
  // 最大显示选项数
  const maxOptions = mergedConfig.maxOptions || 10;

  // 监听外部 value 变化
  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
      setInternalValue(props.value);
    }
  }, [props.value]);

  // 监听外部 visible 变化
  useEffect(() => {
    if (props.visible !== undefined) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  // 监听 visible 变化，控制内部可见性
  useEffect(() => {
    setInternalVisible(visible);
    props.onVisibleChange?.(visible);
  }, [visible, props.onVisibleChange]);

  // 初始化防抖函数
  useEffect(() => {
    debouncedSearchRef.current =
      props.debounceFn?.(handleSearch, debounceDelay) || debounce(handleSearch, debounceDelay);
  }, [debounceDelay, props.debounceFn]);

  // 过滤选项
  const filterOptions = useCallback(() => {
    const options = normalizeOptions(props.options);
    const filterFn = props.filterOption || defaultFilterOption;
    const filtered = options.filter((option) => filterFn(value, option));
    setFilteredOptions(filtered.slice(0, maxOptions));
    setHighlightedIndex(-1);
  }, [props.options, props.filterOption, value, maxOptions]);

  // 搜索回调
  const handleSearch = useCallback(() => {
    props.onSearch?.(value);
    if (value.length >= minLength) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [value, minLength, props.onSearch]);

  // 输入变化处理
  const handleInputChange = useCallback(
    (e: any) => {
      const newValue = e?.detail?.value || e?.target?.value || '';
      setInternalValue(newValue);
      setValue(newValue);
      props.onChange?.(newValue);
      props.onInput?.(e as React.ChangeEvent<HTMLInputElement>);

      // 触发防抖搜索
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current();
      }

      // 过滤选项
      filterOptions();

      // 控制可见性
      if (newValue.length >= minLength) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
    [filterOptions, minLength, props.onChange, props.onInput],
  );

  // 选项选择处理
  const handleOptionSelect = useCallback(
    (option: AutoCompleteOption) => {
      if (option.disabled) return;

      const newValue = option.value;
      setValue(newValue);
      setInternalValue(newValue);
      setVisible(false);
      setFocused(false);
      setHighlightedIndex(-1);

      props.onChange?.(newValue, option);
      props.onSelect?.(option, newValue);

      // 移除焦点
      inputRef.current?.blur();
    },
    [props.onChange, props.onSelect],
  );

  // 清除处理
  const handleClear = useCallback(() => {
    setValue('');
    setInternalValue('');
    setVisible(false);
    setHighlightedIndex(-1);

    props.onChange?.('', undefined);
    props.onClear?.();
    props.onSearch?.('');

    // 聚焦输入框
    inputRef.current?.focus();
  }, [props.onChange, props.onClear, props.onSearch]);

  // 聚焦处理
  const handleFocus = useCallback(
    (e: any) => {
      setFocused(true);
      props.onFocus?.(e as React.FocusEvent<HTMLInputElement>);

      // 如果有值且大于等于最小长度，显示选项
      if (value.length >= minLength) {
        setVisible(true);
        filterOptions();
      }
    },
    [value, minLength, filterOptions, props.onFocus],
  );

  // 失焦处理
  const handleBlur = useCallback(
    (e: any) => {
      // 延迟关闭，以便处理选项点击
      setTimeout(() => {
        setFocused(false);
        setVisible(false);
        setHighlightedIndex(-1);
        props.onBlur?.(e as React.FocusEvent<HTMLInputElement>);
      }, 200);
    },
    [props.onBlur],
  );

  // 渲染选项
  const renderOptions = useCallback(() => {
    if (!internalVisible || filteredOptions.length === 0) return null;

    return (
      <View
        ref={optionsRef}
        style={mergeStyles(
          BaseStyles.optionsContainer,
          themeStyle.optionsContainer,
          directionStyle,
          props.optionsStyle,
        )}
        className={props.optionsClassName}
      >
        {filteredOptions.map((option, index) => {
          const isHighlighted = index === highlightedIndex;
          const isDisabled = option.disabled;

          // 自定义渲染选项
          if (props.renderOption) {
            return props.renderOption(option, index);
          }

          return (
            <View
              key={option.value || index}
              style={mergeStyles(
                BaseStyles.option,
                themeStyle.option,
                isHighlighted ? themeStyle.optionHover : undefined,
                isDisabled ? themeStyle.optionDisabled : undefined,
                props.optionStyle,
                option.style,
              )}
              className={`${props.optionClassName} ${option.className}`}
              onClick={() => !isDisabled && handleOptionSelect(option)}
            >
              {option.icon && <span style={BaseStyles.optionIcon}>{option.icon}</span>}
              <View style={BaseStyles.optionLabel}>{option.label}</View>
              {option.description && <View style={BaseStyles.optionDescription}>{option.description}</View>}
            </View>
          );
        })}
      </View>
    );
  }, [
    internalVisible,
    filteredOptions,
    highlightedIndex,
    props.renderOption,
    props.optionClassName,
    props.optionStyle,
    handleOptionSelect,
    themeStyle,
    directionStyle,
    props.optionsStyle,
  ]);

  // 渲染加载状态
  const renderLoading = useCallback(() => {
    if (!props.loading) return null;

    if (props.renderLoading) {
      return props.renderLoading();
    }

    return <View style={BaseStyles.loading}>加载中...</View>;
  }, [props.loading, props.renderLoading]);

  // 渲染空状态
  const renderEmpty = useCallback(() => {
    if (!visible || filteredOptions.length > 0 || props.loading) return null;

    if (props.renderEmpty) {
      return props.renderEmpty();
    }

    return <View style={BaseStyles.empty}>{props.emptyText || '无匹配选项'}</View>;
  }, [visible, filteredOptions, props.loading, props.renderEmpty, props.emptyText]);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    getInputRef: () => inputRef.current,
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: handleClear,
    showOptions: () => setVisible(true),
    hideOptions: () => setVisible(false),
    toggleOptions: () => setVisible(!visible),
    getValue: () => value,
    setValue: (newValue) => {
      setValue(newValue);
      setInternalValue(newValue);
      props.onChange?.(newValue);
    },
  }));

  // 渲染组件
  return (
    <View ref={containerRef} style={mergeStyles(BaseStyles.container, props.style)} className={props.className}>
      {/* 输入框容器 */}
      <View
        style={mergeStyles(
          BaseStyles.inputContainer,
          themeStyle.inputContainer,
          statusStyle.inputContainer,
          sizeStyle.inputContainer,
          focused ? themeStyle.inputContainerFocus : undefined,
          mergedConfig.disabled ? themeStyle.inputContainerDisabled : undefined,
        )}
      >
        {/* 前置内容 */}
        {props.renderPrefix && (
          <View style={mergeStyles(BaseStyles.prefix, sizeStyle.prefix)}>{props.renderPrefix()}</View>
        )}

        {/* 搜索图标 */}
        {mergedConfig.showSearchIcon && <View style={mergeStyles(BaseStyles.prefix, sizeStyle.prefix)}>🔍</View>}

        {/* 输入框 */}
        <Input
          ref={inputRef}
          type="text"
          style={mergeStyles(
            BaseStyles.input,
            themeStyle.input,
            sizeStyle.input,
            mergedConfig.disabled ? themeStyle.inputDisabled : undefined,
            mergedConfig.readOnly ? { cursor: 'default' } : undefined,
            props.inputStyle,
          )}
          className={props.inputClassName}
          value={internalValue}
          placeholder={mergedConfig.placeholder || '请输入'}
          placeholderStyle="color: #9ca3af"
          disabled={mergedConfig.disabled}
          onInput={mergedConfig.readOnly ? undefined : handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* 清除按钮 */}
        {mergedConfig.showClear && value && !mergedConfig.disabled && !mergedConfig.readOnly && (
          <Button
            style={mergeStyles(BaseStyles.clearButton, sizeStyle.clearButton)}
            onClick={handleClear}
            disabled={mergedConfig.disabled}
          >
            ×
          </Button>
        )}

        {/* 后置内容 */}
        {props.renderSuffix && (
          <View style={mergeStyles(BaseStyles.suffix, sizeStyle.suffix)}>{props.renderSuffix()}</View>
        )}
      </View>

      {/* 选项列表 */}
      {renderOptions()}
      {renderLoading()}
      {renderEmpty()}
    </View>
  );
});

AutoComplete.displayName = 'AutoComplete';

// 使用默认参数设置默认属性
const AutoCompleteWithDefaults = (props: AutoCompleteProps) => {
  const defaultProps: Partial<AutoCompleteProps> = {
    direction: 'bottom',
    theme: 'light',
    size: 'md',
    status: 'default',
    showClear: true,
    showSearchIcon: false,
    disabled: false,
    readOnly: false,
    required: false,
    debounceDelay: 300,
    minLength: 0,
    maxOptions: 10,
  };

  return <AutoComplete {...defaultProps} {...props} />;
};

export { AutoCompleteWithDefaults as AutoComplete };
export type { AutoCompleteProps, AutoCompleteRef };
export default AutoCompleteWithDefaults;
