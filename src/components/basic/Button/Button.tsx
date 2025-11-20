import { forwardRef, useCallback, useMemo } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { buttonStyles } from './Button.styles';
import type { ButtonProps, ButtonRef } from './Button.types';
import type { ITouchEvent } from '@tarojs/components';

/** 按钮组件 */
export const ButtonComponent = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    type = 'default',
    size = 'medium',
    variant = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    children,
    icon,
    onClick,
    style,
    className = '',
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

  const buttonStyle = useMemo(() => {
    const shapeKey = shape === 'default' ? 'defaultShape' : shape;
    const baseStyle = {
      ...buttonStyles['base'],
      ...buttonStyles[size],
      ...buttonStyles[type],
      ...buttonStyles[variant],
      ...buttonStyles[shapeKey],
      ...style,
    };

    if (disabled) {
      return { ...baseStyle, ...buttonStyles['disabled'] };
    }

    if (loading) {
      return { ...baseStyle, ...buttonStyles['loading'] };
    }

    return baseStyle;
  }, [type, size, variant, shape, disabled, loading, style]);

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

  return (
    <TaroButton
      ref={ref}
      type={type === 'primary' ? 'primary' : 'default'}
      size={size === 'small' ? 'mini' : 'default'}
      disabled={disabled || loading}
      style={buttonStyle}
      className={className}
      onClick={handleClick}
      data-testid="button"
      {...rest}
    >
      {renderContent()}
    </TaroButton>
  );
});

ButtonComponent.displayName = 'Button';

export const Button = ButtonComponent;
export default Button;
