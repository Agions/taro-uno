import { forwardRef, useCallback } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { buttonStyles } from './Button.styles';
import type { ButtonProps, ButtonRef } from './Button.types';
import { SmartLabelGenerator, AccessibilityUtils, AriaRole } from '../../../utils/accessibility';
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
    accessible = true,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    ...rest
  } = props;

  const handleClick = useCallback((event: ITouchEvent) => {
    if (!disabled && !loading) {
      // 生成无障碍公告
      const buttonText = typeof children === 'string' ? children : '';
      if (buttonText) {
        AccessibilityUtils.AccessibilityEventHandler.announceToScreenReader(
          `已点击按钮：${buttonText}`,
          'polite'
        );
      }
      onClick?.(event);
    }
  }, [disabled, loading, onClick, children]);

  // 生成智能无障碍标签
  const generateA11yLabel = useCallback(() => {
    const buttonText = typeof children === 'string' ? children : '';
    return accessibilityLabel || SmartLabelGenerator.generateButtonLabel(
      buttonText,
      loading,
      disabled
    );
  }, [children, loading, disabled, accessibilityLabel]);

  // 获取无障碍状态
  const getA11yState = useCallback(() => {
    return {
      disabled: disabled || loading,
      busy: loading,
    };
  }, [disabled, loading]);

  // 生成无障碍属性
  const a11yProps = AccessibilityUtils.generateAccessibilityProps(
    'button',
    generateA11yLabel(),
    getA11yState(),
    {
      accessible,
      accessibilityHint,
      accessibilityRole: accessibilityRole || AriaRole.BUTTON,
    }
  );

  const getButtonStyle = () => {
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
  };

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
        {children && (
          <Text style={buttonStyles['buttonText'] || {}}>
            {children}
          </Text>
        )}
      </>
    );
  };

  return (
    <TaroButton
      ref={ref}
      type={type === 'primary' ? 'primary' : 'default'}
      size={size === 'small' ? 'mini' : 'default'}
      disabled={disabled || loading}
      style={getButtonStyle()}
      className={className}
      onClick={handleClick}
      accessible={a11yProps.accessible}
      accessibilityLabel={a11yProps.accessibilityLabel}
      accessibilityRole={a11yProps.accessibilityRole}
      accessibilityHint={a11yProps.accessibilityHint}
      accessibilityState={a11yProps.accessibilityState}
      accessibilityValue={a11yProps.accessibilityValue}
      data-testid="button"
      aria-label={a11yProps.accessibilityLabel}
      aria-role={a11yProps.accessibilityRole}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {renderContent()}
    </TaroButton>
  );
});

ButtonComponent.displayName = 'Button';

export const Button = ButtonComponent;
export default Button;