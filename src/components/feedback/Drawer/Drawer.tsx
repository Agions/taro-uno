/**
 * Taro-Uno Drawer Component
 * 抽屉组件实现
 */

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, Button } from '@tarojs/components';
import type { DrawerProps, DrawerRef, DrawerDirection, DrawerTheme } from './Drawer.types';
import { BaseStyles, getThemeStyle, getDirectionStyle, mergeStyles } from './Drawer.styles';

/**
 * Drawer 组件
 * 提供抽屉功能，支持自定义标题、内容、方向、主题等
 */
const Drawer = forwardRef<DrawerRef, DrawerProps>((props, ref) => {
  // 合并配置和直接属性
  const mergedConfig = {
    title: props.title,
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
  const [direction, setDirection] = useState<DrawerDirection>(mergedConfig.direction || 'right');
  // 主题状态
  const [theme, setTheme] = useState<DrawerTheme>(mergedConfig.theme || 'light');
  // 抽屉引用
  const drawerRef = useRef<HTMLDivElement>(null);
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

  // 显示抽屉
  const show = useCallback(() => {
    if (!props.disabled) {
      setVisible(true);
    }
  }, [props.disabled]);

  // 隐藏抽屉
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  // 切换抽屉可见性
  const toggle = useCallback(() => {
    if (!props.disabled) {
      setVisible(!visible);
    }
  }, [visible, props.disabled]);

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

  // 获取主题样式
  const themeStyle = getThemeStyle(theme);
  // 获取方向样式
  const directionStyle = getDirectionStyle(direction, mergedConfig.width, mergedConfig.height);

  // 渲染抽屉
  const renderDrawer = useCallback(() => {
    if (!internalVisible) return null;

    return (
      <>
        {/* 遮罩层 */}
        {props.showMask !== false && (
          <View
            style={mergeStyles(BaseStyles.mask, themeStyle.mask, props.maskStyle, {
              opacity: visible ? 1 : 0,
            })}
            className={props.maskClassName}
            onClick={handleMaskClick}
          />
        )}

        {/* 抽屉 */}
        <View
          ref={drawerRef}
          style={mergeStyles(
            BaseStyles.drawer,
            themeStyle.drawer,
            directionStyle,
            {
              transform: visible ? 'translate(0)' : directionStyle.transform,
              transition: `transform ${animationDuration}ms ease`,
            },
            props.style,
            mergedConfig.style,
          )}
          className={props.className || mergedConfig.className}
        >
          {/* 头部 */}
          {(mergedConfig.title || mergedConfig.showClose !== false) && (
            <View style={mergeStyles(BaseStyles.header, themeStyle.header)}>
              {/* 标题 */}
              {mergedConfig.title && (
                <View
                  style={mergeStyles(BaseStyles.title, themeStyle.title, props.titleStyle)}
                  className={props.titleClassName}
                >
                  {mergedConfig.title}
                </View>
              )}

              {/* 关闭按钮 */}
              {mergedConfig.showClose !== false && (
                <Button style={BaseStyles.closeButton} onClick={handleCloseClick}>
                  ×
                </Button>
              )}
            </View>
          )}

          {/* 内容 */}
          <View style={mergeStyles(BaseStyles.content, props.contentStyle)} className={props.contentClassName}>
            {props.children}
          </View>
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
    animationDuration,
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
    <>
      {/* 抽屉 */}
      {renderDrawer()}
    </>
  );
});

Drawer.displayName = 'Drawer';

// 使用默认参数设置默认属性
const DrawerWithDefaults = (props: DrawerProps) => {
  const defaultProps: Partial<DrawerProps> = {
    direction: 'right',
    theme: 'light',
    showClose: true,
    maskClosable: true,
    showAnimation: true,
    disabled: false,
    showMask: true,
  };

  return <Drawer {...defaultProps} {...props} />;
};

export { DrawerWithDefaults as Drawer };
export type { DrawerProps, DrawerRef };
export default DrawerWithDefaults;
