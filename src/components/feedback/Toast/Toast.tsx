import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { toastStyles } from './Toast.styles';
import type { ToastProps, ToastRef, ToastMethodConfig } from './Toast.types';

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

  const toastRef = useRef<any>(null);
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

    const iconMap: Record<string, string> = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ',
    };

    return iconMap[internalType] || 'ℹ';
  };

  // 计算样式 - 移动端优化
  const getPositionStyle = () => {
    const baseStyle = {
      position: 'fixed' as const,
      zIndex: 9999,
      display: internalVisible ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: internalVisible ? 1 : 0,
      transition: `opacity ${animationDuration}ms ease-in-out`,
    };

    switch (internalPosition) {
      case 'top':
        return { ...baseStyle, top: '80px' };
      case 'center':
        return { ...baseStyle, top: '50%', transform: 'translateX(-50%) translateY(-50%)' };
      case 'bottom':
        return { ...baseStyle, bottom: '80px' };
      default:
        return { ...baseStyle, top: '80px' };
    }
  };

  const toastStyle = {
    ...getPositionStyle(),
    ...style,
  };

  // 计算类名
  const toastClassName = `${toastStyles.container} ${toastStyles[internalType] || toastStyles.info} ${className || ''}`;

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
        <View className="taro-uno-toast__icon" style={{ marginRight: '8px', fontSize: '16px' }}>
          {getIcon()}
        </View>
      )}
      <View className="taro-uno-toast__message" style={{ flex: 1, color: 'white' }}>
        <Text>{internalMessage}</Text>
      </View>
      {(closable || closeable) && (
        <View className="taro-uno-toast__close" style={{ marginLeft: '8px', fontSize: '16px', color: 'white' }} onClick={handleClose}>
          ×
        </View>
      )}
    </View>
  );
});

/** Toast组件显示名称 */
ToastComponent.displayName = 'Toast';

/** 导出Toast组件 */
export const Toast = ToastComponent as any;

// 全局Toast实例管理
let globalToastInstance: { element: HTMLElement | null; hide: () => void } | null = null;

// 创建全局Toast容器
const createGlobalToastContainer = () => {
  if (typeof document === 'undefined') return null;

  let container = document.getElementById('taro-uno-global-toast');
  if (!container) {
    container = document.createElement('div');
    container.id = 'taro-uno-global-toast';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
  }
  return container;
};

// 静态方法实现
(Toast as any).show = (config: ToastMethodConfig | string) => {
  const container = createGlobalToastContainer();
  if (!container) return;

  const props = typeof config === 'string' ? { message: config } : config;

  // 创建Toast元素
  const toastElement = document.createElement('div');
  const getTypeColor = (type: string) => {
    const colors = {
      success: 'rgba(82, 196, 26, 0.9)',
      error: 'rgba(245, 34, 45, 0.9)',
      warning: 'rgba(250, 173, 20, 0.9)',
      info: 'rgba(24, 144, 255, 0.9)',
      loading: 'rgba(24, 144, 255, 0.9)',
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  toastElement.style.cssText = `
    position: fixed;
    top: ${props.position === 'top' ? '80px' : props.position === 'bottom' ? 'auto' : '50%'};
    bottom: ${props.position === 'bottom' ? '80px' : 'auto'};
    left: '50%';
    transform: translateX(-50%) ${props.position === 'center' ? 'translateY(-50%)' : ''};
    zIndex: 99999;
    display: flex;
    align-items: center;
    padding: 12px 20px;
    borderRadius: 8px;
    backgroundColor: ${getTypeColor(props.type || 'info')};
    color: white;
    fontSize: 14px;
    maxWidth: '80%';
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)';
    transition: 'opacity 0.3s ease';
    opacity: 0;
  `;

  

  // 添加图标
  if (props.showIcon !== false) {
    const iconElement = document.createElement('span');
    iconElement.style.cssText = 'margin-right: 8px; font-size: 16px;';
    iconElement.textContent = getIconText(props.type || 'info');
    toastElement.appendChild(iconElement);
  }

  // 添加消息
  const messageElement = document.createElement('span');
  messageElement.textContent = String(props.message || '');
  toastElement.appendChild(messageElement);

  // 添加到容器
  container.appendChild(toastElement);

  // 显示动画
  setTimeout(() => {
    toastElement.style.opacity = '1';
  }, 10);

  // 自动隐藏
  const duration = props.duration || 3000;
  const hideTimer = setTimeout(() => {
    toastElement.style.opacity = '0';
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 300);
  }, duration);

  // 保存实例引用
  globalToastInstance = {
    element: toastElement,
    hide: () => {
      clearTimeout(hideTimer);
      toastElement.style.opacity = '0';
      setTimeout(() => {
        if (toastElement.parentNode) {
          toastElement.parentNode.removeChild(toastElement);
        }
      }, 300);
    }
  };

  return globalToastInstance;
};

(Toast as any).info = (config: ToastMethodConfig | string) => {
  return (Toast as any).show(typeof config === 'string' ? { message: config, type: 'info' } : { ...config, type: 'info' });
};

(Toast as any).success = (config: ToastMethodConfig | string) => {
  return (Toast as any).show(typeof config === 'string' ? { message: config, type: 'success' } : { ...config, type: 'success' });
};

(Toast as any).warning = (config: ToastMethodConfig | string) => {
  return (Toast as any).show(typeof config === 'string' ? { message: config, type: 'warning' } : { ...config, type: 'warning' });
};

(Toast as any).error = (config: ToastMethodConfig | string) => {
  return (Toast as any).show(typeof config === 'string' ? { message: config, type: 'error' } : { ...config, type: 'error' });
};

(Toast as any).loading = (config: ToastMethodConfig | string) => {
  return (Toast as any).show(typeof config === 'string' ? { message: config, type: 'loading', duration: 0 } : { ...config, type: 'loading', duration: 0 });
};

(Toast as any).hide = () => {
  if (globalToastInstance) {
    globalToastInstance.hide();
    globalToastInstance = null;
  }
};

// 获取图标文本
const getIconText = (type: string) => {
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
    loading: '⟳',
  };
  return icons[type as keyof typeof icons] || 'ℹ';
};

export default ToastComponent;
