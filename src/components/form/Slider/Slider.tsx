import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { SliderProps, SliderRef } from './Slider.types';

/** 滑块组件 */
export const SliderComponent = forwardRef<SliderRef, SliderProps>((props, ref) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue = 0,
    disabled = false,
    marks,
    included = true,
    vertical = false,
    reverse = false,
    tooltip,
    size = 'medium',
    variant = 'default',
    className,
    style,
    onChange,
    onChangeComplete,
    ...restProps
  } = props;

  const containerRef = useRef<typeof View>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const [internalDisabled, setInternalDisabled] = useState(disabled);

  // 处理受控/非受控模式
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 更新内部状态
  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 处理值变化
  const handleChange = useCallback(
    (newValue: number, _event?: ITouchEvent) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));

      if (!isControlled) {
        setInternalValue(clampedValue);
      }

      onChange?.(clampedValue);
    },
    [isControlled, min, max, onChange],
  );

  // 处理变化完成
  const handleChangeComplete = useCallback(() => {
    setDragging(false);
    onChangeComplete?.(value);
  }, [value, onChangeComplete]);

  // 计算百分比
  const getPercentage = useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  // 处理点击事件
  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled) return;

      const rect = (event.currentTarget as any).getBoundingClientRect();
      const clientX = event.detail?.x || 0;
      const clientY = event.detail?.y || 0;

      const percentage = vertical
        ? reverse
          ? 1 - (clientY - rect.top) / rect.height
          : (clientY - rect.top) / rect.height
        : reverse
          ? 1 - (clientX - rect.left) / rect.width
          : (clientX - rect.left) / rect.width;

      const newValue = Math.round((min + percentage * (max - min)) / step) * step;
      handleChange(newValue, event);
    },
    [internalDisabled, vertical, reverse, min, max, step, handleChange],
  );

  // 处理拖拽开始
  const handleDragStart = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled) return;
      setDragging(true);
      event.preventDefault();
    },
    [internalDisabled],
  );

  // 处理拖拽
  const handleDrag = useCallback(
    (event: ITouchEvent) => {
      if (!dragging || internalDisabled) return;

      const rect = (event.currentTarget as any).getBoundingClientRect();
      const clientX = event.detail?.x || 0;
      const clientY = event.detail?.y || 0;

      const percentage = vertical
        ? reverse
          ? 1 - (clientY - rect.top) / rect.height
          : (clientY - rect.top) / rect.height
        : reverse
          ? 1 - (clientX - rect.left) / rect.width
          : (clientX - rect.left) / rect.width;

      const newValue = Math.round((min + percentage * (max - min)) / step) * step;
      handleChange(newValue, event);
    },
    [dragging, internalDisabled, vertical, reverse, min, max, step, handleChange],
  );

  // 处理键盘交互

  // 处理拖拽结束
  const handleDragEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    handleChangeComplete();
  }, [dragging, handleChangeComplete]);

  // 渲染刻度
  const renderMarks = useCallback(() => {
    if (!marks) return null;

    return Object.entries(marks).map(([markValue, markLabel]) => {
      const val = Number(markValue);
      const percentage = getPercentage(val);
      const position = vertical
        ? reverse
          ? `${100 - percentage}%`
          : `${percentage}%`
        : reverse
          ? `${100 - percentage}%`
          : `${percentage}%`;

      return (
        <View
          key={markValue}
          style={{
            position: 'absolute',
            [vertical ? 'bottom' : 'left']: position,
            transform: vertical ? 'translateY(50%)' : 'translateX(-50%)',
          }}
        >
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#d1d5db' }} />
          <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{markLabel}</Text>
        </View>
      );
    });
  }, [marks, vertical, reverse, getPercentage]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: containerRef.current,
      getValue: () => value,
      setValue: (newValue: number) => {
        if (!isControlled) {
          const clampedValue = Math.max(min, Math.min(max, newValue));
          setInternalValue(clampedValue);
          onChange?.(clampedValue);
        }
      },
      disable: () => {
        setInternalDisabled(true);
      },
      enable: () => {
        setInternalDisabled(false);
      },
      isDisabled: () => internalDisabled,
      isDragging: () => dragging,
      getPercentage: () => getPercentage(value),
      getPercentageFromValue: (val: number) => getPercentage(val),
      getValueFromPercentage: (percentage: number) => min + (percentage / 100) * (max - min),
      reset: () => {
        if (!isControlled) {
          setInternalValue(defaultValue);
          onChange?.(defaultValue);
        }
      },
      focus: () => {},
      blur: () => {},
    }),
    [value, isControlled, internalDisabled, dragging, min, max, defaultValue, getPercentage, onChange],
  );

  // 生成容器样式
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: vertical ? 'auto' : '100%',
    height: vertical ? '200px' : 'auto',
    opacity: internalDisabled ? 0.5 : 1,
    cursor: internalDisabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  // 生成轨道样式
  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: vertical ? '4px' : '100%',
    height: vertical ? '100%' : '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
  };

  // 生成填充轨道样式
  const percentage = getPercentage(value);
  const trackFillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    [vertical ? 'height' : 'width']: `${percentage}%`,
    [vertical ? 'width' : 'height']: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '2px',
  };

  // 生成手柄样式
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    [vertical ? 'bottom' : 'left']: `${percentage}%`,
    [vertical ? 'left' : 'top']: '50%',
    transform: vertical ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    border: '2px solid #ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: internalDisabled ? 'not-allowed' : 'grab',
    zIndex: 10,
  };

  // 生成工具提示样式
  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: vertical ? 'auto' : '100%',
    left: vertical ? '100%' : '50%',
    transform: vertical ? 'translateY(-50%)' : 'translateX(-50%)',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    marginBottom: vertical ? 0 : '4px',
    marginLeft: vertical ? '4px' : 0,
  };

  return (
    <View
      ref={containerRef}
      style={containerStyle}
      onClick={handleClick}
      onTouchMove={(e) => handleDrag(e as unknown as ITouchEvent)}
      onTouchEnd={() => handleDragEnd()}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      accessibilityLabel={restProps.accessibilityLabel || 'Slider'}
      aria-disabled={internalDisabled}
      {...restProps}
    >
      <View style={trackStyle}>{included && <View style={trackFillStyle} />}</View>

      <View
        style={{
          ...handleStyle,
          backgroundColor: dragging ? '#2563eb' : '#3b82f6',
        }}
        onTouchStart={(e) => handleDragStart(e as unknown as ITouchEvent)}
      >
        {tooltip !== false && (
          <View style={tooltipStyle}>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>
              {typeof tooltip === 'object' && tooltip.formatter ? tooltip.formatter(value) : value}
            </Text>
          </View>
        )}
      </View>

      {marks && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{renderMarks()}</View>}
    </View>
  );
});

/** 滑块组件显示名称 */
SliderComponent.displayName = 'Slider';

/** 导出滑块组件 */
export const Slider = SliderComponent;
export default Slider;
