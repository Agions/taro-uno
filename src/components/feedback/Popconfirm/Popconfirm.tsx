/**
 * Taro-Uno Popconfirm Component
 * 确认弹窗组件实现
 */

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle, type CSSProperties } from 'react';
import { View, Button } from '@tarojs/components';
import type { PopconfirmProps, PopconfirmRef, PopconfirmDirection, PopconfirmTheme } from './Popconfirm.types';
import { BaseStyles, getThemeStyle, getDirectionStyle, getButtonStyle, mergeStyles } from './Popconfirm.styles';

/**
 * Popconfirm 组件
 * 提供确认弹窗功能，支持自定义标题、内容、按钮、方向、主题等
 */
const Popconfirm = forwardRef<PopconfirmRef, PopconfirmProps>((props, ref) => {
  // 合并配置和直接属性
  const mergedConfig = {
    title: props.title,
    content: props.content,
    direction: props.direction,
    theme: props.theme,
    showClose: props.showClose,
    maskClosable: props.maskClosable,
    width: props.width,
    height: props.height,
    ...props.config,
  };

  // 可见性状态
  const [visible, setVisible] = useState<boolean>(props.visible || props.defaultVisible || false);
  // 内部可见性状态，用于动画控制
  const [internalVisible, setInternalVisible] = useState<boolean>(visible);
  // 方向状态
  const [direction, setDirection] = useState<PopconfirmDirection>(mergedConfig.direction || 'top');
  // 主题状态
  const [theme, setTheme] = useState<PopconfirmTheme>(mergedConfig.theme || 'light');
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);
  // 弹窗引用
  const popupRef = useRef<HTMLDivElement>(null);
  // 动画持续时间
  const animationDuration = props.animationDuration || 300;

  // 监听外部 visible 变化
  useEffect(() => {
    if (props.visible !== undefined) {
      setVisible(props.visible);
    }
    return;
  }, [props.visible]);

  // 监听 visible 变化，控制内部可见性和动画
  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      props.onOpen?.();
    } else {
      // 延迟设置内部可见性，等待动画完成
      const timer = setTimeout(() => {
        setInternalVisible(false);
        props.onClose?.();
      }, animationDuration);

      return () => clearTimeout(timer);
    }
    return;
  }, [visible, animationDuration, props.onOpen, props.onClose]);

  // 监听配置变化
  useEffect(() => {
    if (mergedConfig.direction) {
      setDirection(mergedConfig.direction);
    }
    if (mergedConfig.theme) {
      setTheme(mergedConfig.theme);
    }
    return;
  }, [mergedConfig.direction, mergedConfig.theme]);

  // 显示确认弹窗
  const show = useCallback(() => {
    if (!props.disabled) {
      setVisible(true);
    }
  }, [props.disabled]);

  // 隐藏确认弹窗
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  // 切换确认弹窗可见性
  const toggle = useCallback(() => {
    if (!props.disabled) {
      setVisible(!visible);
    }
  }, [visible, props.disabled]);

  // 确认回调
  const handleConfirm = useCallback(() => {
    props.onConfirm?.();
    hide();
  }, [props.onConfirm, hide]);

  // 取消回调
  const handleCancel = useCallback(() => {
    props.onCancel?.();
    hide();
  }, [props.onCancel, hide]);

  // 遮罩层点击回调
  const handleMaskClick = useCallback(() => {
    if (mergedConfig.maskClosable !== false) {
      hide();
      props.onMaskClick?.();
    }
  }, [mergedConfig.maskClosable, hide, props.onMaskClick]);

  // 关闭按钮点击回调
  const handleCloseClick = useCallback(() => {
    hide();
  }, [hide]);

  // 触发元素点击回调
  const handleTriggerClick = useCallback(() => {
    if (props.trigger === 'click' || !props.trigger) {
      toggle();
    }
  }, [props.trigger, toggle]);

  // 获取主题样式
  const themeStyle = getThemeStyle(theme);
  // 获取方向样式
  const directionStyle = getDirectionStyle(direction);

  // 渲染按钮
  const renderButton = useCallback(
    (buttonConfig: any, isOkButton: boolean) => {
      if (!buttonConfig) return null;

      // 处理字符串配置
      const buttonProps = typeof buttonConfig === 'string' ? { text: buttonConfig } : buttonConfig;
      const buttonType = isOkButton ? props.okType || 'primary' : props.cancelType || 'default';
      const baseButtonStyle = isOkButton ? themeStyle.okButton : themeStyle.cancelButton;
      const typeStyle = getButtonStyle(buttonType);

      return (
        <Button
          key={isOkButton ? 'ok' : 'cancel'}
          style={mergeStyles(BaseStyles.button, baseButtonStyle, typeStyle, buttonProps.style)}
          className={buttonProps.className}
          onClick={() => {
            buttonProps.onClick?.();
            if (isOkButton) {
              handleConfirm();
            } else {
              handleCancel();
            }
          }}
          disabled={buttonProps.disabled}
        >
          {buttonProps.text}
        </Button>
      );
    },
    [themeStyle, props.okType, props.cancelType, handleConfirm, handleCancel],
  );

  // 渲染确认弹窗
  const renderPopconfirm = useCallback(() => {
    if (!internalVisible) return null;

    // 渲染按钮
    const renderButtons = () => {
      // 确认按钮
      const okButtonConfig = mergedConfig.okButton || props.okText || '确认';
      // 取消按钮
      const cancelButtonConfig = mergedConfig.cancelButton || props.cancelText || '取消';

      return (
        <View
          style={mergeStyles(BaseStyles.buttonContainer, props.buttonContainerStyle)}
          className={props.buttonContainerClassName}
        >
          {renderButton(cancelButtonConfig, false)}
          {renderButton(okButtonConfig, true)}
        </View>
      );
    };

    return (
      <>
        {/* 遮罩层 */}
        <View
          style={mergeStyles(BaseStyles.mask, themeStyle.mask, props.maskStyle)}
          className={props.maskClassName}
          onClick={handleMaskClick}
        />

        {/* 弹窗 */}
        <View
          ref={popupRef}
          style={mergeStyles(
            BaseStyles.popup,
            themeStyle.popup,
            directionStyle,
            {
              width: mergedConfig.width,
              height: mergedConfig.height,
              animation: visible ? 'popconfirm-enter 0.3s ease-out' : 'popconfirm-leave 0.3s ease-in',
            } as CSSProperties,
            props.style,
            mergedConfig.style,
          )}
          className={props.className || mergedConfig.className}
        >
          {/* 标题 */}
          {mergedConfig.title && (
            <View
              style={mergeStyles(BaseStyles.title, themeStyle.title, props.titleStyle)}
              className={props.titleClassName}
            >
              {props.icon && <View style={BaseStyles.icon}>{props.icon}</View>}
              {mergedConfig.title}
            </View>
          )}

          {/* 关闭按钮 */}
          {mergedConfig.showClose !== false && (
            <Button style={BaseStyles.closeButton} onClick={handleCloseClick}>
              ×
            </Button>
          )}

          {/* 内容 */}
          <View style={mergeStyles(BaseStyles.content, props.contentStyle)} className={props.contentClassName}>
            {mergedConfig.content}
          </View>

          {/* 按钮 */}
          {renderButtons()}
        </View>
      </>
    );
  }, [
    internalVisible,
    visible,
    mergedConfig,
    props,
    themeStyle,
    directionStyle,
    direction,
    renderButton,
    handleMaskClick,
    handleCloseClick,
  ]);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    show,
    hide,
    toggle,
    isVisible: () => visible,
  }));

  // 渲染组件
  return (
    <View ref={containerRef} style={BaseStyles.container} className={props.className}>
      {/* 触发元素 */}
      <View style={BaseStyles.trigger} onClick={handleTriggerClick}>
        {props.children}
      </View>

      {/* 确认弹窗 */}
      {renderPopconfirm()}
    </View>
  );
});

Popconfirm.displayName = 'Popconfirm';

// 使用默认参数设置默认属性
const PopconfirmWithDefaults = (props: PopconfirmProps) => {
  const defaultProps: Partial<PopconfirmProps> = {
    direction: 'top',
    theme: 'light',
    showClose: false,
    maskClosable: true,
    trigger: 'click',
    showAnimation: true,
    disabled: false,
  };

  return <Popconfirm {...defaultProps} {...props} />;
};

export { PopconfirmWithDefaults as Popconfirm };
export type { PopconfirmProps, PopconfirmRef };
export default PopconfirmWithDefaults;
