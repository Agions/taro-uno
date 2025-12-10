import React, { forwardRef, useCallback, useMemo } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { buttonStyles } from './Button.styles';
import type { ButtonProps, ButtonRef } from './Button.types';
import type { ITouchEvent } from '@tarojs/components';

/** 按钮组件 */
export const ButtonComponent = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    type = 'default',
    size = 'md',
    variant = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    children,
    icon,
    onClick,
    style,
    className = '',
    block = false,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    ...rest
  } = props;

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !loading) {
        onClick?.(event);
      }
    },
    [disabled, loading, onClick],
  );

  // 优化样式生成，使用更高效的合并逻辑
  const buttonStyle = useMemo(() => {
    const shapeKey = shape === 'default' ? 'defaultShape' : shape;

    // 预计算所有基础样式，避免多次 spread
    const computedStyle = {
      ...buttonStyles['base'],
      ...buttonStyles[size === 'md' ? 'medium' : size],
      ...buttonStyles[type],
      ...buttonStyles[variant],
      ...buttonStyles[shapeKey],
      ...style,
      display: block ? 'block' : 'inline-flex',
      width: block ? '100%' : undefined,
    };

    // 只在需要时添加状态样式
    if (disabled) {
      Object.assign(computedStyle, buttonStyles['disabled']);
    } else if (loading) {
      Object.assign(computedStyle, buttonStyles['loading']);
    }

    return computedStyle;
  }, [type, size, variant, shape, disabled, loading, style, block]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={buttonStyles['loadingContent'] || {}}>
          <View style={buttonStyles['loadingIcon'] || {}} />
          <Text style={buttonStyles['loadingText'] || {}}>加载中...</Text>
        </View>
      );
    }

    return (
      <>
        {icon && <View style={buttonStyles['icon'] || {}}>{icon}</View>}
        {children && <Text style={buttonStyles['buttonText'] || {}}>{children}</Text>}
      </>
    );
  };

  // 实现 ButtonRef 方法
  React.useImperativeHandle(ref, () => ({
    element: undefined,
    getType: () => type,
    getSize: () => size,
    getStatus: () => (disabled ? 'disabled' : loading ? 'loading' : type),
    isDisabled: () => disabled || loading,
    isLoading: () => loading,
    disable: () => {},
    enable: () => {},
    setLoading: () => {},
    setType: () => {},
    setSize: () => {},
    click: () => {},
  }));

  // Taro Button size mapping
  const getTaroButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'mini';
      case 'md':
      case 'lg':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <TaroButton
      type={type === 'primary' ? 'primary' : 'default'}
      size={getTaroButtonSize()}
      disabled={disabled || loading}
      style={buttonStyle}
      className={className}
      onClick={handleClick}
      data-testid="button"
      accessible={true}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      aria-state={accessibilityState}
      {...rest}
    >
      {renderContent()}
    </TaroButton>
  );
});

ButtonComponent.displayName = 'Button';

export const Button = ButtonComponent;
export default Button;
