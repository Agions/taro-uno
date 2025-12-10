import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { navBarStyles } from './NavBar.styles';
import type { NavBarProps, NavBarRef } from './NavBar.types';

/** NavBar组件 */
export const NavBarComponent = forwardRef<NavBarRef, NavBarProps>((props, ref) => {
  const {
    title,
    left,
    right,
    backArrow = false,
    backIcon,
    onBack,
    position = 'fixed',
    theme = 'light',
    backgroundColor,
    transparent = false,
    border = true,
    placeholder = true,
    safeAreaInsetTop = true,
    className,
    style,
    ...restProps
  } = props;

  const [internalTitle, setInternalTitle] = useState(title);
  const [internalLeft, setInternalLeft] = useState(left);
  const [internalRight, setInternalRight] = useState(right);
  const [internalBackArrow, setInternalBackArrow] = useState(backArrow);

  const navBarRef = useRef<any>(null);

  // 同步外部状态
  useEffect(() => {
    setInternalTitle(title);
  }, [title]);

  useEffect(() => {
    setInternalLeft(left);
  }, [left]);

  useEffect(() => {
    setInternalRight(right);
  }, [right]);

  useEffect(() => {
    setInternalBackArrow(backArrow);
  }, [backArrow]);

  // 处理返回按钮点击
  const handleBack = useCallback(() => {
    onBack?.();
    // 如果没有提供onBack，默认执行页面返回
    if (!onBack && typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  }, [onBack]);

  // 渲染返回按钮
  const renderBackArrow = () => {
    if (!internalBackArrow) return null;

    return (
      <View
        className="taro-uno-navbar__back-arrow"
        onClick={handleBack}
        style={{
          padding: '8px 12px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Text
          className="taro-uno-navbar__back-icon"
          style={{
            fontSize: '16px',
            color: theme === 'dark' ? '#ffffff' : '#000000',
          }}
        >
          {backIcon || '←'}
        </Text>
      </View>
    );
  };

  // 计算容器样式
  const getContainerStyle = () => {
    const baseStyle = {
      ...navBarStyles.container,
      backgroundColor: backgroundColor || (transparent ? 'transparent' : theme === 'dark' ? '#1a1a1a' : '#ffffff'),
      ...(border && !transparent ? navBarStyles.border : {}),
      ...(position === 'fixed' ? navBarStyles.fixed : {}),
      ...style,
    };

    if (position === 'fixed' && safeAreaInsetTop) {
      return {
        ...baseStyle,
        paddingTop: '44px',
      };
    }

    return baseStyle;
  };

  // 计算内容区域样式
  const getContentStyle = () => {
    const baseStyle = {
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxSizing: 'border-box' as const,
    };

    if (position === 'fixed' && safeAreaInsetTop) {
      return {
        ...baseStyle,
        height: '88px',
        paddingTop: '44px',
      };
    }

    return baseStyle;
  };

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: navBarRef.current,
      setTitle: (newTitle) => {
        setInternalTitle(newTitle);
      },
      setLeft: (newLeft) => {
        setInternalLeft(newLeft);
      },
      setRight: (newRight) => {
        setInternalRight(newRight);
      },
      showBackArrow: () => {
        setInternalBackArrow(true);
      },
      hideBackArrow: () => {
        setInternalBackArrow(false);
      },
    }),
    [],
  );

  // 计算类名
  const containerClassName = [
    'taro-uno-navbar',
    `taro-uno-navbar--${position}`,
    `taro-uno-navbar--${theme}`,
    transparent ? 'taro-uno-navbar--transparent' : '',
    border ? 'taro-uno-navbar--border' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* 固定定位时的占位元素 */}
      {position === 'fixed' && placeholder && (
        <View
          className="taro-uno-navbar__placeholder"
          style={{
            height: safeAreaInsetTop ? '88px' : '44px',
            backgroundColor: 'transparent',
          }}
        />
      )}

      {/* NavBar容器 */}
      <View ref={navBarRef} className={containerClassName} style={getContainerStyle()} {...restProps}>
        {/* 内容区域 */}
        <View className="taro-uno-navbar__content" style={getContentStyle()}>
          {/* 左侧区域 */}
          <View className="taro-uno-navbar__left" style={navBarStyles.left}>
            {internalLeft}
            {!internalLeft && renderBackArrow()}
          </View>

          {/* 中间区域 */}
          <View className="taro-uno-navbar__center" style={navBarStyles.center}>
            <Text
              className="taro-uno-navbar__title"
              style={{
                fontSize: '17px',
                fontWeight: '600',
                color: theme === 'dark' ? '#ffffff' : '#000000',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              numberOfLines={1}
            >
              {internalTitle}
            </Text>
          </View>

          {/* 右侧区域 */}
          <View className="taro-uno-navbar__right" style={navBarStyles.right}>
            {internalRight}
          </View>
        </View>
      </View>
    </>
  );
});

/** NavBar组件显示名称 */
NavBarComponent.displayName = 'NavBar';

/** 导出NavBar组件 */
export const NavBar = NavBarComponent;
export default NavBarComponent;
