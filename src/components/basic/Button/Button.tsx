/**
 * Button 组件
 * 使用 createComponent 工厂函数创建，集成 useTheme 和 usePlatform Hooks
 * @module components/basic/Button
 */

import { useCallback, useMemo, useImperativeHandle } from 'react';
import { Button as TaroButton, Text, View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '../../../utils/createComponent';
import { useTheme } from '../../../hooks/ui/useTheme';
import { usePlatform } from '../../../hooks/ui/usePlatform';
import computeButtonStyles, {
  iconLeftStyle,
  iconRightStyle,
  buttonTextStyle,
  loadingContentStyle,
  loadingIconStyle,
  loadingTextStyle,
  mergeButtonStyles,
} from './Button.styles';
import type { ButtonProps, ButtonRef } from './Button.types';

/**
 * Button 组件
 *
 * @description 基础按钮组件，支持多种类型、尺寸、变体和形状
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Button>默认按钮</Button>
 *
 * // 主要按钮
 * <Button type="primary">主要按钮</Button>
 *
 * // 不同尺寸
 * <Button size="sm">小按钮</Button>
 * <Button size="lg">大按钮</Button>
 *
 * // 不同变体
 * <Button variant="outline">轮廓按钮</Button>
 * <Button variant="ghost">幽灵按钮</Button>
 * <Button variant="text">文本按钮</Button>
 *
 * // 带图标
 * <Button icon={<Icon name="plus" />}>添加</Button>
 *
 * // 加载状态
 * <Button loading>加载中</Button>
 *
 * // 禁用状态
 * <Button disabled>禁用按钮</Button>
 *
 * // 块级按钮
 * <Button block>块级按钮</Button>
 * ```
 */
export const Button = createComponent<ButtonProps, ButtonRef>({
  name: 'Button',

  defaultProps: {
    type: 'default',
    size: 'md',
    variant: 'solid',
    shape: 'default',
    disabled: false,
    loading: false,
    block: false,
    iconPosition: 'left',
  },

  render: (props, ref) => {
    const {
      type = 'default',
      size = 'md',
      variant = 'solid',
      shape = 'default',
      disabled = false,
      loading = false,
      block = false,
      icon,
      iconPosition = 'left',
      children,
      onClick,
      style,
      className = '',
      accessibilityLabel,
      accessibilityRole,
      accessibilityState,
      ...rest
    } = props;

    // 使用主题和平台 Hooks
    const { theme } = useTheme();
    // usePlatform 可用于平台特定逻辑
    usePlatform();

    // 处理点击事件
    const handleClick = useCallback(
      (event: ITouchEvent) => {
        if (!disabled && !loading) {
          onClick?.(event);
        }
      },
      [disabled, loading, onClick],
    );

    // 计算最终样式
    const buttonStyle = useMemo(() => {
      // 使用 computeButtonStyles 计算基础样式
      const computedStyle = computeButtonStyles({ size, type, variant, shape, disabled, loading, block }, theme);

      // 合并用户自定义样式
      return mergeButtonStyles(computedStyle, style);
    }, [size, type, variant, shape, disabled, loading, block, theme, style]);

    // 渲染图标
    const renderIcon = useCallback(() => {
      if (!icon) return null;

      const iconStyleToUse = iconPosition === 'left' ? iconLeftStyle : iconRightStyle;

      return <View style={iconStyleToUse}>{icon}</View>;
    }, [icon, iconPosition]);

    // 渲染内容
    const renderContent = useCallback(() => {
      if (loading) {
        return (
          <View style={loadingContentStyle}>
            <View style={loadingIconStyle} />
            <Text style={loadingTextStyle}>加载中...</Text>
          </View>
        );
      }

      const hasLeftIcon = icon && iconPosition === 'left';
      const hasRightIcon = icon && iconPosition === 'right';

      return (
        <>
          {hasLeftIcon && renderIcon()}
          {children && <Text style={buttonTextStyle}>{children}</Text>}
          {hasRightIcon && renderIcon()}
        </>
      );
    }, [loading, icon, iconPosition, children, renderIcon]);

    // 暴露 ref 方法
    useImperativeHandle(ref, () => ({
      element: null,
      getType: () => type,
      getSize: () => size,
      isDisabled: () => disabled || loading,
      isLoading: () => loading,
      click: () => {
        if (!disabled && !loading) {
          // 触发点击事件
          const mockEvent = {
            type: 'tap',
            timeStamp: Date.now(),
            target: {},
            currentTarget: {},
            detail: {},
            preventDefault: () => {},
            stopPropagation: () => {},
          } as unknown as ITouchEvent;
          onClick?.(mockEvent);
        }
      },
    }));

    // 获取 Taro Button 的 size 属性
    const getTaroButtonSize = useCallback(() => {
      switch (size) {
        case 'sm':
          return 'mini';
        case 'md':
        case 'lg':
        default:
          return 'default';
      }
    }, [size]);

    // 获取 Taro Button 的 type 属性
    const getTaroButtonType = useCallback(() => {
      // Taro Button 只支持 primary 和 default
      return type === 'primary' ? 'primary' : 'default';
    }, [type]);

    return (
      <TaroButton
        type={getTaroButtonType()}
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
  },
});

// 设置 displayName（createComponent 已自动设置，这里是为了明确）
Button.displayName = 'Button';

export default Button;
