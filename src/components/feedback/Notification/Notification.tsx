import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import {
  NotificationProps,
  NotificationRef,
  NotificationType,
  DEFAULT_NOTIFICATION_CONFIG,
} from './Notification.types';
import { notificationStyles, notificationStyleHelpers } from './Notification.styles';
import { cn } from '../../../utils';

export const Notification = forwardRef<NotificationRef, NotificationProps>((props, ref) => {
  const {
    type = 'info',
    title,
    content,
    icon,
    closable = DEFAULT_NOTIFICATION_CONFIG.defaultClosable,
    duration = DEFAULT_NOTIFICATION_CONFIG.defaultDuration,
    placement = DEFAULT_NOTIFICATION_CONFIG.defaultPlacement,
    className,
    style,
    onClose,
    onClick,
    showClose = DEFAULT_NOTIFICATION_CONFIG.defaultShowClose,
    showIcon = DEFAULT_NOTIFICATION_CONFIG.defaultShowIcon,
    autoClose = DEFAULT_NOTIFICATION_CONFIG.defaultAutoClose,
    animation = DEFAULT_NOTIFICATION_CONFIG.defaultAnimation,
    ...rest
  } = props;

  // 错误状态管理
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 错误边界处理
  const handleError = useCallback(
    (error: Error, context: string) => {
      console.error(`Notification error in ${context}:`, error);
      setHasError(true);
      setErrorMessage(error.message);

      // 自动关闭错误的通知
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 延迟关闭以显示错误状态
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setIsClosing(true);
        onClose?.();
      }, 3000) as unknown as number;
    },
    [onClose],
  );

  // 状态管理
  const [visible, setVisible] = useState(true);
  const [closeHovered, setCloseHovered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [paused, setPaused] = useState(false);

  // 定时器引用
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(duration);

  // 处理自动关闭
  const handleAutoClose = useCallback(() => {
    try {
      if (!autoClose || duration <= 0 || paused) return;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 使用更安全的定时器处理
      const timeoutId = setTimeout(() => {
        try {
          setVisible(false);
          setIsClosing(true);
          onClose?.();
        } catch (error) {
          handleError(error as Error, 'autoCloseTimeout');
        }
      }, remainingTimeRef.current);

      timerRef.current = timeoutId as unknown as number;
      startTimeRef.current = Date.now();
    } catch (error) {
      handleError(error as Error, 'handleAutoClose');
    }
  }, [autoClose, duration, paused, onClose, remainingTimeRef, handleError]);

  // 暂停自动关闭
  const pauseProgress = useCallback(() => {
    try {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
        setPaused(true);
        timerRef.current = null;
      }
    } catch (error) {
      handleError(error as Error, 'pauseProgress');
    }
  }, [handleError]);

  // 恢复自动关闭
  const resumeProgress = useCallback(() => {
    try {
      setPaused(false);
      handleAutoClose();
    } catch (error) {
      handleError(error as Error, 'resumeProgress');
    }
  }, [handleAutoClose, handleError]);

  // 暴露方法给ref
  React.useImperativeHandle(ref, () => ({
    hide: () => {
      setVisible(false);
      setIsClosing(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onClose?.();
      return true;
    },
    show: () => {
      setVisible(true);
      setIsClosing(false);
      remainingTimeRef.current = duration;
      handleAutoClose();
      return true;
    },
    update: (newProps: Partial<NotificationProps>) => {
      // 这里可以实现更新通知内容的逻辑
      console.log('Update notification:', newProps);
      return true;
    },
    pauseProgress,
    resumeProgress,
    getState: () => ({
      visible,
      paused,
      closing: isClosing,
    }),
  }));

  // 自动关闭效果
  useEffect(() => {
    handleAutoClose();

    return () => {
      // 清理定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [handleAutoClose]);

  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      // 确保所有定时器都被清理
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 清理状态引用
      setHasError(false);
      setErrorMessage(null);
    };
  }, []);

  // 关闭处理
  const handleClose = useCallback(
    (e?: any) => {
      e?.stopPropagation();
      setVisible(false);
      setIsClosing(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onClose?.();
    },
    [onClose],
  );

  // 点击处理
  const handleClick = useCallback(
    (e?: any) => {
      try {
        onClick?.(e);
      } catch (error) {
        handleError(error as Error, 'handleClick');
      }
    },
    [onClick, handleError],
  );

  // 触摸开始处理（替代鼠标悬停）
  const handleTouchStart = useCallback(
    (_e?: any) => {
      try {
        setCloseHovered(true);
        if (autoClose) {
          pauseProgress();
        }
      } catch (error) {
        handleError(error as Error, 'handleTouchStart');
      }
    },
    [autoClose, pauseProgress, handleError],
  );

  // 触摸结束处理（替代鼠标离开）
  const handleTouchEnd = useCallback(
    (_e?: any) => {
      try {
        setCloseHovered(false);
        if (autoClose && paused) {
          resumeProgress();
        }
      } catch (error) {
        handleError(error as Error, 'handleTouchEnd');
      }
    },
    [autoClose, paused, resumeProgress, handleError],
  );

  // 渲染图标
  const renderIcon = useCallback(() => {
    try {
      if (!showIcon) return null;

      if (icon) {
        return <View className={notificationStyles['icon']}>{icon}</View>;
      }

      const defaultIcons: Record<NotificationType, string> = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
      };

      return (
        <View className={notificationStyles['icon']}>
          <Text className={notificationStyles['iconText']}>{defaultIcons[type]}</Text>
        </View>
      );
    } catch (error) {
      handleError(error as Error, 'renderIcon');
      return null;
    }
  }, [showIcon, icon, type, handleError]);

  // 计算容器样式
  const containerStyle = React.useMemo(() => {
    try {
      const baseStyle = notificationStyleHelpers.getBaseStyle(placement, style);
      const typeStyle = notificationStyleHelpers.getTypeStyle(type);
      const animationStyle = notificationStyleHelpers.getAnimationStyle(animation, visible);

      return {
        ...baseStyle,
        ...typeStyle,
        ...animationStyle,
      };
    } catch (error) {
      handleError(error as Error, 'containerStyle');
      return notificationStyleHelpers.getBaseStyle(placement, style);
    }
  }, [placement, style, type, animation, visible, handleError]);

  // 计算类名
  const containerClassName = React.useMemo(() => {
    try {
      const classes = [
        'taro-uno-notification',
        `taro-uno-notification-${type}`,
        `taro-uno-notification-${placement}`,
        isClosing && 'taro-uno-notification-closing',
        closeHovered && 'taro-uno-notification-hovered',
        paused && 'taro-uno-notification-paused',
        hasError && 'taro-uno-notification-error',
        className,
      ];
      return cn(...classes);
    } catch (error) {
      handleError(error as Error, 'containerClassName');
      return 'taro-uno-notification taro-uno-notification-error';
    }
  }, [type, placement, isClosing, closeHovered, paused, hasError, className, handleError]);

  // 如果不可见，返回null
  if (!visible) return null;

  return (
    <View
      style={containerStyle}
      className={containerClassName}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...rest}
    >
      {renderIcon()}

      <View className={notificationStyles['content']}>
        {hasError ? (
          <Text className={notificationStyles['title']}>通知错误</Text>
        ) : (
          title && <Text className={notificationStyles['title']}>{title}</Text>
        )}
        {hasError ? (
          <Text className={notificationStyles['text']}>{errorMessage || '通知显示异常'}</Text>
        ) : (
          content && <Text className={notificationStyles['text']}>{content}</Text>
        )}
      </View>

      {showClose && closable && (
        <View
          className={cn(notificationStyles['close'], closeHovered && notificationStyles['closeHover'])}
          onClick={handleClose}
        >
          <Text className={notificationStyles['closeIcon']}>✕</Text>
        </View>
      )}
    </View>
  );
});

Notification.displayName = 'Notification';

export default Notification;
