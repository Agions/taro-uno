import * as React from 'react';
import { forwardRef, useRef, useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { Input } from '../Input';
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
    onChange,
    onFocus,
    onBlur,
    onClear,
    className,
    style,
    ...restProps
  } = props;

  const inputRef = useRef(null);
  const [internalValue, setInternalValue] = useState<TimeValue | null>(defaultValue);
  const [isOpened, setIsOpened] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const formatTime = useCallback(
    (timeValue: TimeValue | null): string => {
      if (!timeValue) return '';

      const { hours = 0, minutes = 0, seconds = 0 } = timeValue;
      const formatValue = (val: number) => val.toString().padStart(2, '0');

      let timeString = `${formatValue(hours)}:${formatValue(minutes)}`;
      if (format.includes('ss')) {
        timeString += `:${formatValue(seconds)}`;
      }

      return timeString;
    },
    [format],
  );

  const parseTime = useCallback((input: string): TimeValue | null => {
    const parts = input.split(':').map((part) => parseInt(part, 10));
    if (parts.length < 2 || parts.some(isNaN)) return null;

    return {
      hours: Math.min(23, Math.max(0, parts[0] || 0)),
      minutes: Math.min(59, Math.max(0, parts[1] || 0)),
      seconds: parts.length > 2 ? Math.min(59, Math.max(0, parts[2] || 0)) : 0,
    };
  }, []);

  const handleInputChange = useCallback(
    (event: any) => {
      const inputValue = event.detail?.value || event.target?.value || '';
      const parsedValue = parseTime(inputValue);

      if (parsedValue) {
        if (!isControlled) {
          setInternalValue(parsedValue);
        }
        onChange?.(parsedValue, formatTime(parsedValue));
      }
    },
    [isControlled, parseTime, onChange, formatTime],
  );

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

  const togglePicker = useCallback(() => {
    if (disabled || readonly) return;
    setIsOpened(!isOpened);
  }, [isOpened, disabled, readonly]);

  React.useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
      setValue: (newValue: TimeValue | null) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, newValue ? formatTime(newValue) : '');
      },
      getRangeValue: () => null,
      setRangeValue: () => {},
      getTimeString: () => (value ? formatTime(value) : ''),
      getRangeTimeString: () => null,
      focus: () => {
        if (!disabled && !readonly) {
          (inputRef.current as any)?.focus?.();
        }
      },
      blur: () => {
        (inputRef.current as any)?.blur?.();
      },
      open: () => setIsOpened(true),
      close: () => setIsOpened(false),
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
        onChange?.(newTime, formatTime(newTime));
      },
      confirm: () => setIsOpened(false),
      disable: () => {},
      enable: () => {},
      isOpen: () => isOpened,
      isDisabled: () => disabled,
      isReadOnly: () => readonly,
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
        return (
          time.hours >= 0 &&
          time.hours <= 23 &&
          time.minutes >= 0 &&
          time.minutes <= 59 &&
          time.seconds >= 0 &&
          time.seconds <= 59
        );
      },
      formatTime,
      parseTimeString: parseTime,
    }),
    [value, isControlled, isOpened, disabled, readonly, onChange, formatTime, parseTime],
  );

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    ...style,
  };

  return (
    <View
      style={baseStyle}
      className={`taro-uno-timepicker taro-uno-timepicker--${size} ${className || ''}`}
      {...restProps}
    >
      <Input
        ref={inputRef}
        value={formatTime(value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onInput={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={togglePicker}
        style={{ flex: 1 }}
      />

      {allowClear && value && !disabled && !readonly && (
        <Text
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '30px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ×
        </Text>
      )}

      <Text
        style={{
          position: 'absolute',
          right: '8px',
          fontSize: '14px',
          color: disabled ? '#ccc' : '#666',
        }}
      >
        🕐
      </Text>

      {isOpened && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            marginTop: '4px',
            padding: '8px',
          }}
        >
          <Text>时间选择面板</Text>
        </View>
      )}
    </View>
  );
});

TimePickerComponent.displayName = 'TimePicker';

export const TimePicker = TimePickerComponent;
export default TimePicker;
