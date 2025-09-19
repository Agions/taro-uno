import * as React from 'react';
import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { Input } from '../Input';
import { TimePickerStyles } from './TimePicker.styles';
import type { TimePickerProps, TimePickerRef, TimeValue } from './TimePicker.types';

/** 时间选择器组件 */
export const TimePickerComponent = forwardRef<TimePickerRef, TimePickerProps>((props, ref) => {
  const {
    placeholder = '请选择时间',
    value: controlledValue,
    defaultValue = null,
    format = 'HH:mm:ss',
    disabled = false,
    readonly = false,
    allowClear = false,
    size = 'md',
    status = 'normal',
    variant = 'outlined',
    use12Hours = false,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions = false,
    inputReadOnly = false,
    bordered = true,
    placement = 'bottomLeft',
    popupStyle,
    popupClassName,
    suffixIcon,
    clearIcon,
    loading = false,
    defaultOpenValue,
    onChange,
    onOpenChange,
    onFocus,
    onBlur,
    onClear,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'combobox',
    accessibilityState,
    ...restProps
  } = props;

  const inputRef = useRef(null);
  const [internalValue, setInternalValue] = useState<TimeValue | null>(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalDisabled, setInternalDisabled] = useState(disabled);
  const [internalReadonly, setInternalReadonly] = useState(readonly);

  // 处理受控/非受控模式
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 更新内部状态
  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setInternalReadonly(readonly);
  }, [readonly]);

  // 格式化时间显示
  const formatDisplayValue = useCallback((timeValue: TimeValue | null): string => {
    if (!timeValue) return '';
    
    const displayHours = use12Hours && timeValue.hours > 12 ? timeValue.hours - 12 : timeValue.hours;
    const time = {
      hours: displayHours || 12,
      minutes: timeValue.minutes,
      seconds: timeValue.seconds,
    };
    
    let displayFormat = format;
    if (use12Hours) {
      displayFormat = displayFormat.replace('HH', 'hh');
      displayFormat = displayFormat.replace('H', 'h');
    }
    
    return TimePickerStyles['formatTime'](time, displayFormat);
  }, [format, use12Hours]);

  // 解析时间输入
  const parseInputValue = useCallback((input: string): TimeValue | null => {
    const parsed = TimePickerStyles['parseTime'](input);
    if (!parsed) return null;
    
    return {
      hours: parsed.hours,
      minutes: parsed.minutes,
      seconds: parsed.seconds,
    };
  }, []);

  // 处理输入变化
  const handleInputChange = useCallback(
    (event: any) => {
      const inputValue = event.detail?.value || event.target?.value || '';
      const parsedValue = parseInputValue(inputValue);
      
      if (parsedValue && TimePickerStyles['validateTime'](parsedValue)) {
        if (!isControlled) {
          setInternalValue(parsedValue);
        }
        onChange?.(parsedValue, formatDisplayValue(parsedValue));
      }
    },
    [isControlled, parseInputValue, onChange],
  );

  // 处理聚焦
  const handleFocus = useCallback(
    (event: any) => {
      if (internalDisabled || internalReadonly) return;
      
      setFocused(true);
      setInternalOpen(true);
      onFocus?.(event);
    },
    [internalDisabled, internalReadonly, onFocus],
  );

  // 处理失焦
  const handleBlur = useCallback(
    (event: any) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  // 处理清除
  const handleClear = useCallback(
    (event: any) => {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      
      if (!isControlled) {
        setInternalValue(null);
      }
      
      onClear?.();
      onChange?.(null, '');
    },
    [isControlled, onClear, onChange],
  );

  // 处理面板打开/关闭
  const handlePanelVisibleChange = useCallback(
    (visible: boolean) => {
      if (internalDisabled || internalReadonly) return;
      
      setInternalOpen(visible);
      onOpenChange?.(visible);
    },
    [internalDisabled, internalReadonly, onOpenChange],
  );

  // 处理时间选择
  const handleTimeSelect = useCallback(
    (type: 'hours' | 'minutes' | 'seconds', selectedValue: number) => {
      if (internalDisabled || internalReadonly) return;
      
      const currentValue = value || { hours: 0, minutes: 0, seconds: 0 };
      const newValue = {
        ...currentValue,
        [type]: selectedValue,
      };
      
      if (TimePickerStyles['validateTime'](newValue)) {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, formatDisplayValue(newValue));
      }
    },
    [value, internalDisabled, internalReadonly, isControlled, onChange],
  );

  // 渲染时间列
  const renderTimeColumn = useCallback(
    (type: 'hours' | 'minutes' | 'seconds') => {
      const disabledTimeFn = type === 'hours' ? disabledHours : type === 'minutes' ? disabledMinutes : disabledSeconds;

      const options = TimePickerStyles['generateTimeOptions'](type, disabledTimeFn).filter(
        (option) => !hideDisabledOptions || !option.disabled
      );
      
      const currentValue = value?.[type] || 0;
      
      return (
        <View
          key={type}
          style={{
            ...TimePickerStyles['getColumnStyle'](),
            ...(type === 'seconds' ? TimePickerStyles['getColumnLastStyle']() : {}),
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === currentValue;
            const itemStyle = {
              ...TimePickerStyles['getItemStyle'](option.disabled, isSelected),
              ...(isSelected ? TimePickerStyles['getItemHoverStyle'](false) : {}),
            };
            
            return (
              <View
                key={option.value}
                style={itemStyle}
                onClick={() => !option.disabled && handleTimeSelect(type, option.value)}
              >
                <Text>{option.label}</Text>
              </View>
            );
          })}
        </View>
      );
    },
    [
      value,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hourStep,
      minuteStep,
      secondStep,
      hideDisabledOptions,
      handleTimeSelect,
    ],
  );

  // 渲染时间面板
  const renderTimePanel = useCallback(() => {
    if (!internalOpen) return null;
    
    const panelStyle = {
      ...TimePickerStyles['getPanelStyle'](),
      ...(popupStyle || {}),
    };
    
    return (
      <View style={panelStyle} className={popupClassName}>
        <View style={{ display: 'flex' }}>
          {renderTimeColumn('hours')}
          {renderTimeColumn('minutes')}
          {format.includes('ss') && renderTimeColumn('seconds')}
        </View>
      </View>
    );
  }, [internalOpen, renderTimeColumn, popupStyle, popupClassName, format]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
      setValue: (newValue: TimeValue | null) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, newValue ? formatDisplayValue(newValue) : '');
      },
      getRangeValue: () => null,
      setRangeValue: (_newValue) => {
        // Range functionality not implemented
      },
      getTimeString: () => value ? formatDisplayValue(value) : '',
      getRangeTimeString: () => null,
      focus: () => {
        if (!internalDisabled && !internalReadonly) {
          // Taro环境下使用原生focus方法
          const input = document.querySelector('input');
          if (input) input.focus();
        }
      },
      blur: () => {
        const input = document.querySelector('input');
        if (input) input.blur();
      },
      open: () => handlePanelVisibleChange(true),
      close: () => handlePanelVisibleChange(false),
      clear: () => {
        if (!isControlled) {
          setInternalValue(null);
        }
        onChange?.(null, '');
      },
      setNow: () => {
        const now = new Date();
        const newTime: TimeValue = {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
        };
        if (!isControlled) {
          setInternalValue(newTime);
        }
        onChange?.(newTime, formatDisplayValue(newTime));
      },
      confirm: () => {
        handlePanelVisibleChange(false);
      },
      disable: () => setInternalDisabled(true),
      enable: () => setInternalDisabled(false),
      isOpen: () => internalOpen,
      isDisabled: () => internalDisabled,
      isReadOnly: () => internalReadonly,
      element: inputRef.current,
      getCurrentTime: () => {
        const now = new Date();
        return {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
        };
      },
      validateTime: (time: TimeValue) => {
        return time.hours >= 0 && time.hours <= 23 &&
               time.minutes >= 0 && time.minutes <= 59 &&
               time.seconds >= 0 && time.seconds <= 59;
      },
      formatTime: formatDisplayValue,
      parseTimeString: (timeString: string) => {
        const parts = timeString.split(':');
        if (parts.length >= 2) {
          return {
            hours: parseInt(parts[0] || '0') || 0,
            minutes: parseInt(parts[1] || '0') || 0,
            seconds: parts.length > 2 ? parseInt(parts[2] || '0') || 0 : 0,
          };
        }
        return null;
      },
    }),
    [
      value,
      isControlled,
      defaultValue,
      internalDisabled,
      internalReadonly,
      handlePanelVisibleChange,
      onChange,
      internalOpen,
      formatDisplayValue,
    ],
  );

  // 生成输入框样式
  const getInputStyle = () => {
    const baseStyle = {
      ...TimePickerStyles['getInputStyle'](size, internalDisabled),
      ...(focused ? { borderColor: '#40a9ff' } : {}),
      ...(style || {}),
    };

    return baseStyle;
  };

  // 生成容器样式
  const containerStyle = {
    ...TimePickerStyles['getStyle']({
      size,
      variant,
      status,
      disabled: internalDisabled,
      readonly: internalReadonly,
      loading,
      style: {},
    }),
    ...style,
  };

  // 生成输入框包装器样式
  const inputWrapperStyle = {
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    ...TimePickerStyles['getSizeStyle'](size),
  };

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    busy: loading,
    expanded: internalOpen,
    ...accessibilityState,
  };

  return (
    <View
      style={containerStyle}
      className={TimePickerStyles['getClassName']({
        size,
        variant,
        status,
        disabled: internalDisabled,
        readonly: internalReadonly,
        loading,
        className,
      })}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={finalAccessibilityState}
      {...(restProps as any)}
    >
      <View style={inputWrapperStyle}>
        <Input
          ref={inputRef}
          style={getInputStyle()}
          value={formatDisplayValue(value)}
          placeholder={placeholder}
          disabled={internalDisabled}
          readonly={inputReadOnly || internalReadonly}
          onInput={handleInputChange as any}
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
        />
        
        {allowClear && value && (
          <View
            style={TimePickerStyles['getClearStyle']()}
            onClick={handleClear}
          >
            <Text>×</Text>
          </View>
        )}
        
        <View style={TimePickerStyles['getSuffixStyle']()}>
          {loading ? (
            <View style={TimePickerStyles['getLoadingIconStyle']()} />
          ) : (
            <Text>{suffixIcon || '🕐'}</Text>
          )}
        </View>
      </View>
      
      {renderTimePanel()}
    </View>
  );
});

/** 时间选择器组件显示名称 */
TimePickerComponent.displayName = 'TimePicker';

/** 导出时间选择器组件 */
export const TimePicker = TimePickerComponent;
export default TimePicker;