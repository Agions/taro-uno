import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { buttonStyles } from './Button.styles';
import type { ButtonProps, ButtonRef, ButtonStatus, ITouchEvent } from './Button.types';

/** 按钮组件 */
export const ButtonComponent = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    children,
    size = 'md',
    type = 'default',
    variant = 'solid',
    shape = 'default',
    status = 'normal',
    block = false,
    danger = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    className,
    onClick,
    onPressIn,
    onPressOut,
    onLongPress,
    style,
    loadingText = '加载中...',
    ripple = false,
    shadow = false,
    bordered = true,
    groupIndex,
    groupSize,
    color,
    backgroundColor,
    textColor,
    borderColor,
    animationDuration = 300,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'button',
    accessibilityState,
    ...restProps
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [internalStatus, setInternalStatus] = useState<ButtonStatus>(status);
  const [internalLoading, setInternalLoading] = useState(loading);
  const [internalDisabled, setInternalDisabled] = useState(disabled);

  // 涟漪效果计数器
  const rippleId = useRef(0);

  // 更新内部状态
  useEffect(() => {
    setInternalStatus(status);
  }, [status]);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  useEffect(() => {
    setInternalDisabled(disabled);
  }, [disabled]);

  // 处理点击事件
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (internalDisabled || internalLoading) return;

      // 创建涟漪效果
      if (ripple) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const size = Math.max(rect.width, rect.height);

          const newRipple = {
            id: rippleId.current++,
            x,
            y,
            size,
          };

          setRipples((prev) => [...prev, newRipple]);

          // 移除涟漪效果
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
          }, 600);
        }
      }

      onClick?.(event as unknown as ITouchEvent);
    },
    [onClick, ripple, internalDisabled, internalLoading],
  );

  // 处理按下事件
  const handlePressIn = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalLoading) return;
      setInternalStatus('active');
      onPressIn?.(event);
    },
    [onPressIn, internalDisabled, internalLoading],
  );

  // 处理按起事件
  const handlePressOut = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalLoading) return;
      setInternalStatus('normal');
      onPressOut?.(event);
    },
    [onPressOut, internalDisabled, internalLoading],
  );

  // 处理长按事件
  const handleLongPress = useCallback(
    (event: ITouchEvent) => {
      if (internalDisabled || internalLoading) return;
      onLongPress?.(event);
    },
    [onLongPress, internalDisabled, internalLoading],
  );

  // 安全的事件处理器
  const safeHandlePressIn = useCallback(
    (event: ITouchEvent) => {
      if (onPressIn) {
        handlePressIn(event);
      }
    },
    [handlePressIn, onPressIn],
  );

  const safeHandlePressOut = useCallback(
    (event: ITouchEvent) => {
      if (onPressOut) {
        handlePressOut(event);
      }
    },
    [handlePressOut, onPressOut],
  );

  const safeHandleLongPress = useCallback(
    (event: ITouchEvent) => {
      if (onLongPress) {
        handleLongPress(event);
      }
    },
    [handleLongPress, onLongPress],
  );

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: buttonRef.current,
      click: () => {
        if (buttonRef.current && !internalDisabled && !internalLoading) {
          buttonRef.current.click();
        }
      },
      setDisabled: (disabled: boolean) => {
        setInternalDisabled(disabled);
      },
      setLoading: (loading: boolean) => {
        setInternalLoading(loading);
      },
      getStatus: () => internalStatus,
      getSize: () => size,
      getType: () => type,
      getVariant: () => variant,
    }),
    [internalDisabled, internalLoading, internalStatus, size, type, variant],
  );

  // 计算最终状态
  const finalStatus = internalLoading ? 'loading' : internalDisabled ? 'disabled' : internalStatus;

  // 生成样式
  const buttonStyle = buttonStyles.getStyle({
    size,
    type,
    variant,
    shape,
    status: finalStatus,
    danger,
    loading: internalLoading,
    disabled: internalDisabled,
    shadow,
    color,
    backgroundColor,
    textColor,
    borderColor,
    animationDuration: animationDuration,
    ...style,
  });

  // 生成类名
  const buttonClassName = buttonStyles.getClassName({
    size,
    type,
    variant,
    shape,
    status: finalStatus,
    block,
    danger,
    loading: internalLoading,
    disabled: internalDisabled,
    shadow,
    bordered,
    className: className || '',
  });

  // 按钮组样式
  const groupStyle =
    groupIndex !== undefined && groupSize !== undefined
      ? buttonStyles.getGroupItemStyle({
          index: groupIndex,
          total: groupSize,
          shape,
        })
      : {};

  // 加载图标
  const loadingIcon = internalLoading ? <View style={buttonStyles.getLoadingStyle(size)} /> : null;

  // 渲染图标
  const renderIcon = () => {
    if (internalLoading) return loadingIcon;
    if (!icon) return null;
    return <View className="taro-uno-button__icon">{icon}</View>;
  };

  // 渲染内容
  const renderContent = () => {
    if (internalLoading && loadingText) {
      return (
        <>
          {iconPosition === 'left' && renderIcon()}
          <Text className="taro-uno-button__text">{loadingText}</Text>
          {iconPosition === 'right' && renderIcon()}
        </>
      );
    }

    return (
      <>
        {iconPosition === 'left' && renderIcon()}
        {children && <Text className="taro-uno-button__text">{children}</Text>}
        {iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  // 无障碍状态
  const finalAccessibilityState = {
    disabled: internalDisabled,
    busy: internalLoading,
    ...accessibilityState,
  };

  // 使用无障碍状态
  const accessibilityProps = accessible
    ? {
        accessibilityLabel,
        accessibilityRole,
        accessibilityState: finalAccessibilityState,
      }
    : {};

  // 在JSX中使用accessibilityProps
  const finalProps = {
    ...accessibilityProps,
    ...restProps,
  };

  return (
    <TaroButton
      ref={buttonRef}
      className={buttonClassName}
      style={{ ...buttonStyle, ...groupStyle }}
      onClick={handleClick}
      onTouchStart={safeHandlePressIn}
      onTouchEnd={safeHandlePressOut}
      onLongPress={onLongPress ? safeHandleLongPress : (undefined as any)}
      disabled={internalDisabled || internalLoading}
      {...finalProps}
    >
      {renderContent()}

      {/* 涟漪效果 */}
      {ripple &&
        ripples.map((rippleItem) => (
          <View
            key={rippleItem.id}
            className="taro-uno-button__ripple"
            style={buttonStyles.getRippleStyle(rippleItem.x, rippleItem.y, rippleItem.size)}
          />
        ))}
    </TaroButton>
  );
});

/** 按钮组件显示名称 */
ButtonComponent.displayName = 'Button';

/** 导出按钮组件 */
export default ButtonComponent;
