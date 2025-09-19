import { forwardRef, useImperativeHandle, useRef, useCallback, useMemo } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import { useTheme } from '@/hooks/useTheme';
import type {
  EnhancedButtonProps,
  EnhancedButtonRef,
  ComponentSize,
  ComponentVariant,
  ComponentStatus,
  ComponentShape
} from '@/types/enhanced-components';

/**
 * Enhanced Button Component
 *
 * A type-safe button component with enhanced features:
 * - Comprehensive type safety
 * - Better performance with memoization
 * - Accessibility support
 * - Theme integration
 * - Animation support
 * - Ripple effects
 * - Loading states
 */

const EnhancedButton = forwardRef<EnhancedButtonRef, EnhancedButtonProps>((props, ref) => {
  // Extract props with defaults
  const {
    type = 'default',
    size = 'md',
    variant = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    block = false,
    bordered = true,
    children,
    icon,
    iconPosition = 'left',
    onClick,
    onPressIn,
    onPressOut,
    onLongPress,
    style,
    className = '',
    loadingText = '加载中...',
    ripple = false,
    shadow = false,
    color,
    backgroundColor,
    textColor,
    borderColor,
    animationDuration = 300,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'button',
    accessibilityState,
    ...rest
  } = props;

  // Theme integration
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate effective state
  const effectiveStatus = useMemo<ComponentStatus>(() => {
    if (loading) return 'loading';
    if (disabled) return 'disabled';
    return 'default';
  }, [loading, disabled]);

  // Generate styles with theme integration
  const getStyles = useCallback(() => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: theme.getSpacing('sm'),
      borderWidth: bordered ? 1 : 0,
      borderStyle: bordered ? 'solid' : 'none',
      borderRadius: theme.getBorderRadius(shape === 'default' ? 'md' : shape),
      transition: `all ${animationDuration}ms ease`,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      position: 'relative',
      overflow: 'hidden',
      ...theme.getFontStyle(
        size === 'xs' ? 'sm' : size === 'sm' ? 'base' : size === 'md' ? 'lg' : 'xl',
        'medium',
        'normal'
      ),
    };

    // Size-based styles
    const sizeStyles: React.CSSProperties = {
      xs: {
        padding: `${theme.getSpacing('xs')}px ${theme.getSpacing('sm')}px`,
        minWidth: '60px',
        minHeight: '32px',
      },
      sm: {
        padding: `${theme.getSpacing('sm')}px ${theme.getSpacing('md')}px`,
        minWidth: '80px',
        minHeight: '36px',
      },
      md: {
        padding: `${theme.getSpacing('md')}px ${theme.getSpacing('lg')}px`,
        minWidth: '100px',
        minHeight: '40px',
      },
      lg: {
        padding: `${theme.getSpacing('lg')}px ${theme.getSpacing('xl')}px`,
        minWidth: '120px',
        minHeight: '44px',
      },
      xl: {
        padding: `${theme.getSpacing('xl')}px ${theme.getSpacing('xxl')}px`,
        minWidth: '140px',
        minHeight: '48px',
      },
    }[size];

    // Variant-based styles
    const variantStyles: React.CSSProperties = {
      solid: {
        backgroundColor: backgroundColor || theme.getColor(type === 'primary' ? 'primary' : type),
        color: textColor || '#ffffff',
        borderColor: borderColor || theme.getColor(type === 'primary' ? 'primary' : type),
      },
      outline: {
        backgroundColor: 'transparent',
        color: textColor || theme.getColor(type === 'primary' ? 'primary' : type),
        borderColor: borderColor || theme.getColor(type === 'primary' ? 'primary' : type),
      },
      ghost: {
        backgroundColor: 'transparent',
        color: textColor || theme.getColor(type === 'primary' ? 'primary' : type),
        borderColor: 'transparent',
      },
      text: {
        backgroundColor: 'transparent',
        color: textColor || theme.getColor(type === 'primary' ? 'primary' : type),
        borderColor: 'transparent',
        borderWidth: 0,
      },
    }[variant];

    // Status-based styles
    const statusStyles: React.CSSProperties = {
      loading: {
        cursor: 'wait',
        opacity: 0.8,
      },
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      default: {},
    }[effectiveStatus];

    // Shadow styles
    const shadowStyles: React.CSSProperties = shadow
      ? {
          boxShadow: shadow
            ? `0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)`
            : 'none',
        }
      : {};

    // Block styles
    const blockStyles: React.CSSProperties = block
      ? {
          width: '100%',
          display: 'flex',
        }
      : {};

    return {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...statusStyles,
      ...shadowStyles,
      ...blockStyles,
      ...style,
    };
  }, [
    theme,
    size,
    variant,
    shape,
    bordered,
    backgroundColor,
    textColor,
    borderColor,
    effectiveStatus,
    shadow,
    block,
    style,
    animationDuration,
    type,
  ]);

  // Handle click with type safety
  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !loading) {
        onClick?.(event);
      }
    },
    [disabled, loading, onClick]
  );

  // Handle press in
  const handlePressIn = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !loading) {
        onPressIn?.(event);
      }
    },
    [disabled, loading, onPressIn]
  );

  // Handle press out
  const handlePressOut = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !loading) {
        onPressOut?.(event);
      }
    },
    [disabled, loading, onPressOut]
  );

  // Handle long press
  const handleLongPress = useCallback(
    (event: ITouchEvent) => {
      if (!disabled && !loading) {
        onLongPress?.(event);
      }
    },
    [disabled, loading, onLongPress]
  );

  // Render content with proper accessibility
  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <View style={{ display: 'flex', alignItems: 'center', gap: theme.getSpacing('sm') }}>
          <View
            style={{
              width: theme.getSpacing('sm'),
              height: theme.getSpacing('sm'),
              borderRadius: '50%',
              backgroundColor: textColor || '#ffffff',
              animation: `spin 1s linear infinite`,
            }}
          />
          <Text style={{ color: textColor || '#ffffff' }}>{loadingText}</Text>
        </View>
      );
    }

    const content = [];

    // Add icon if positioned on left
    if (icon && iconPosition === 'left') {
      content.push(
        <View key="icon-left" style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </View>
      );
    }

    // Add text content
    if (children) {
      content.push(
        <Text
          key="text"
          style={{
            color: textColor || getStyles().color,
            fontSize: getStyles().fontSize,
            fontWeight: getStyles().fontWeight,
          }}
        >
          {children}
        </Text>
      );
    }

    // Add icon if positioned on right
    if (icon && iconPosition === 'right') {
      content.push(
        <View key="icon-right" style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </View>
      );
    }

    return content;
  }, [loading, icon, iconPosition, children, loadingText, textColor, theme]);

  // Enhanced ref implementation
  useImperativeHandle(
    ref,
    () => ({
      element: buttonRef.current,
      click: () => {
        buttonRef.current?.click();
      },
      setDisabled: (newDisabled: boolean) => {
        // This would typically be handled through props in React
        console.warn('setDisabled is deprecated. Use disabled prop instead.');
      },
      setLoading: (newLoading: boolean) => {
        // This would typically be handled through props in React
        console.warn('setLoading is deprecated. Use loading prop instead.');
      },
      getStatus: () => effectiveStatus,
      getSize: () => size,
      getVariant: () => variant,
      getShape: () => shape,
      focus: () => {
        buttonRef.current?.focus();
      },
      blur: () => {
        buttonRef.current?.blur();
      },
    }),
    [effectiveStatus, size, variant, shape]
  );

  // Generate accessibility props
  const accessibilityProps = useMemo(() => {
    const baseState = {
      disabled: disabled || loading,
      busy: loading,
      ...accessibilityState,
    };

    return {
      accessible,
      accessibilityLabel: accessibilityLabel || (typeof children === 'string' ? children : undefined),
      accessibilityRole,
      accessibilityState: baseState,
      'aria-label': accessibilityLabel || (typeof children === 'string' ? children : undefined),
      'aria-disabled': disabled || loading,
      'aria-busy': loading,
    };
  }, [
    accessible,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    disabled,
    loading,
    children,
  ]);

  // Generate CSS classes
  const buttonClasses = useMemo(() => {
    const classes = [
      'enhanced-button',
      `enhanced-button--${size}`,
      `enhanced-button--${variant}`,
      `enhanced-button--${shape}`,
      `enhanced-button--${effectiveStatus}`,
      block && 'enhanced-button--block',
      bordered && 'enhanced-button--bordered',
      shadow && 'enhanced-button--shadow',
      ripple && 'enhanced-button--ripple',
      className,
    ].filter(Boolean);

    return classes.join(' ');
  }, [
    size,
    variant,
    shape,
    effectiveStatus,
    block,
    bordered,
    shadow,
    ripple,
    className,
  ]);

  return (
    <TaroButton
      ref={buttonRef}
      type={type === 'primary' ? 'primary' : 'default'}
      size={size === 'xs' || size === 'sm' ? 'mini' : 'default'}
      disabled={disabled || loading}
      style={getStyles()}
      className={buttonClasses}
      onClick={handleClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      {...accessibilityProps}
      {...rest}
    >
      {renderContent()}

      {/* Add ripple effect if enabled */}
      {ripple && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Add loading overlay */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        />
      )}
    </TaroButton>
  );
});

EnhancedButton.displayName = 'EnhancedButton';

export default EnhancedButton;
export { EnhancedButton };

// Type exports
export type {
  EnhancedButtonProps,
  EnhancedButtonRef,
  ComponentSize,
  ComponentVariant,
  ComponentStatus,
  ComponentShape,
};