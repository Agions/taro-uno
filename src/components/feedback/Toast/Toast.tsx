import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { toastStyles } from './Toast.styles';
import type { ToastProps, ToastRef, ToastType } from './Toast.types';

/** Toast组件 */
export const ToastComponent = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const {
    visible: controlledVisible,
    defaultVisible = false,
    message,
    type = 'info',
    position = 'top',
    duration = 3000,
    closable = false,
    showIcon = true,
    icon,
    animated = true,
    animationDuration = 300,
    closeable = false,
    onShow,
    onHide,
    onClose,
    onClick,
    className,
    style,
    ...restProps
  } = props;

  const toastRef = useRef<View>(null);
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [internalMessage, setInternalMessage] = useState(message);
  const [internalType, setInternalType] = useState(type);
  const [internalPosition, setInternalPosition] = useState(position);
  const [internalDuration, setInternalDuration] = useState(duration);

  // 定时器引用
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 处理受控模式
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setInternalVisible(controlledVisible);
    }
  }, [controlledVisible]);

  useEffect(() => {
    setInternalMessage(message);
  }, [message]);

  useEffect(() => {
    setInternalType(type);
  }, [type]);

  useEffect(() => {
    setInternalPosition(position);
  }, [position]);

  useEffect(() => {
    setInternalDuration(duration);
  }, [duration]);

  // 处理显示/隐藏
  useEffect(() => {
    if (internalVisible) {
      onShow?.();

      // 自动隐藏
      if (internalDuration > 0) {
        timerRef.current = setTimeout(() => {
          handleHide();
        }, internalDuration);
      }
    } else {
      onHide?.();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [internalVisible, internalDuration, onShow, onHide]);

  // 处理隐藏
  const handleHide = useCallback(() => {
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
  }, [controlledVisible]);

  // 处理关闭
  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    handleHide();
    onClose?.();
  }, [handleHide, onClose]);

  // 处理点击
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      onClick?.(event);
    },
    [onClick],
  );

  // 获取图标
  const getIcon = () => {
    if (icon) return icon;
    if (!showIcon) return null;
    return toastStyles.TYPE_ICON_MAP[internalType];
  };

  // 计算样式
  const toastStyle = toastStyles.getBaseStyle({
    type: internalType,
    position: internalPosition,
    style: {
      ...toastStyles.getAnimationStyle(internalVisible, animationDuration),
      ...style,
    },
  });

  // 计算类名
  const toastClassName = toastStyles.getClassName({
    type: internalType,
    position: internalPosition,
    className,
  });

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: toastRef.current,
      show: () => {
        if (controlledVisible === undefined) {
          setInternalVisible(true);
        }
      },
      hide: () => {
        if (controlledVisible === undefined) {
          setInternalVisible(false);
        }
      },
      isVisible: () => internalVisible,
      setMessage: (newMessage) => {
        setInternalMessage(newMessage);
      },
      setType: (newType) => {
        setInternalType(newType);
      },
      setPosition: (newPosition) => {
        setInternalPosition(newPosition);
      },
      setDuration: (newDuration) => {
        setInternalDuration(newDuration);
      },
    }),
    [internalVisible, controlledVisible],
  );

  // 如果不显示，则不渲染
  if (!internalVisible) {
    return null;
  }

  return (
    <View ref={toastRef} className={toastClassName} style={toastStyle} onClick={handleClick} {...restProps}>
      {getIcon() && (
        <View className="taro-uno-toast__icon" style={toastStyles.getIconStyle(internalType)}>
          {getIcon()}
        </View>
      )}
      <View className="taro-uno-toast__message" style={toastStyles.getMessageStyle()}>
        <Text>{internalMessage}</Text>
      </View>
      {(closable || closeable) && (
        <View className="taro-uno-toast__close" style={toastStyles.getCloseButtonStyle()} onClick={handleClose}>
          ×
        </View>
      )}
    </View>
  );
});

/** Toast组件显示名称 */
ToastComponent.displayName = 'Toast';

/** 导出Toast组件 */
export const Toast = ToastComponent;

/** 静态方法 */
Toast.show = (config: ToastProps) => {
  // 这里可以实现一个全局的Toast显示方法
  // 需要配合全局状态管理或Portal实现
  console.log('Toast.show', config);
};

Toast.info = (config: ToastProps) => {
  // 信息提示
  console.log('Toast.info', config);
};

Toast.success = (config: ToastProps) => {
  // 成功提示
  console.log('Toast.success', config);
};

Toast.warning = (config: ToastProps) => {
  // 警告提示
  console.log('Toast.warning', config);
};

Toast.error = (config: ToastProps) => {
  // 错误提示
  console.log('Toast.error', config);
};

Toast.loading = (config: ToastProps) => {
  // 加载提示
  console.log('Toast.loading', config);
};

Toast.hide = () => {
  // 隐藏Toast
  console.log('Toast.hide');
};
