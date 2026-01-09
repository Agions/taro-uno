import React, { forwardRef, useRef, useState, useCallback } from 'react';
import { View } from '@tarojs/components';
import type {
  NotificationManagerProps,
  NotificationManagerRef,
  NotificationItem,
  NotificationPlacement,
} from './Notification.types';
import { Notification } from './Notification';
import { notificationStyleHelpers } from './Notification.styles';
import { cn, isMobile } from '../../../utils';
import { useThemeContext } from '../../../providers/ThemeProvider';
import { DEFAULT_NOTIFICATION_CONFIG, NotificationUtils } from './Notification.types';

// 通知项内部接口
interface InternalNotificationItem extends NotificationItem {
  /** 堆叠索引 */
  stackIndex: number;
  /** 是否正在关闭 */
  isClosing: boolean;
}

export const NotificationManager = forwardRef<NotificationManagerRef, NotificationManagerProps>((props, ref) => {
  const {
    maxCount = DEFAULT_NOTIFICATION_CONFIG.defaultMaxCount,
    defaultPlacement = DEFAULT_NOTIFICATION_CONFIG.defaultPlacement,
    defaultDuration = DEFAULT_NOTIFICATION_CONFIG.defaultDuration,
    defaultAnimation = DEFAULT_NOTIFICATION_CONFIG.defaultAnimation,
    stack = DEFAULT_NOTIFICATION_CONFIG.defaultStack,
    containerStyle,
    containerClassName,
    onEnter,
    onLeave,
    onAllClose,
  } = props;

  // Ignore unused props for future implementation
  void props.stackMaxCount;
  void props.allowDrag;
  void props.dragThreshold;
  void props.showGroup;
  void props.groupInterval;
  void props.style;
  void props.className;

  const theme = useThemeContext();
  const [notifications, setNotifications] = useState<InternalNotificationItem[]>([]);
  const [history, setHistory] = useState<NotificationItem[]>([]);
  const [_isAllPaused, setIsAllPaused] = useState(false);
  const notificationRefs = useRef<Map<string, { current: any }>>(new Map());

  // 添加通知
  const addNotification = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt'>): string => {
      const key = NotificationUtils.generateKey();
      const newNotification: InternalNotificationItem = {
        ...config,
        key,
        createdAt: Date.now(),
        placement: config.placement || defaultPlacement,
        duration: config.duration ?? defaultDuration,
        animation: config.animation || defaultAnimation,
        stackIndex: 0,
        isClosing: false,
      };

      setNotifications((prev) => {
        // 检查是否超过最大数量
        let updatedNotifications = [...prev, newNotification];

        if (updatedNotifications.length > maxCount) {
          // 移除最早的通知
          const removed = updatedNotifications.shift();
          if (removed) {
            // 添加到历史记录
            setHistory((prevHistory) => [...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!), removed]);
            onLeave?.(removed.key);
          }
        }

        // 更新堆叠索引
        return updateStackIndices(updatedNotifications);
      });

      onEnter?.(key);
      return key;
    },
    [maxCount, defaultPlacement, defaultDuration, defaultAnimation, onEnter, onLeave],
  );

  // 更新堆叠索引
  const updateStackIndices = useCallback(
    (notificationsList: InternalNotificationItem[]): InternalNotificationItem[] => {
      if (!stack) return notificationsList;

      return notificationsList.map((notification, index) => ({
        ...notification,
        stackIndex: index,
      }));
    },
    [stack],
  );

  // 关闭通知
  const closeNotification = useCallback(
    (key: string) => {
      setNotifications((prev) => {
        const notificationIndex = prev.findIndex((n) => n.key === key);
        if (notificationIndex === -1) return prev;

        const notification = prev[notificationIndex];
        const updatedNotifications = prev.filter((_, index) => index !== notificationIndex);

        // 添加到历史记录
        setHistory((prevHistory) => [
          ...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!),
          notification as NotificationItem,
        ]);

        // 更新堆叠索引
        return updateStackIndices(updatedNotifications);
      });

      onLeave?.(key);
    },
    [onLeave, updateStackIndices],
  );

  // 关闭所有通知
  const closeAllNotifications = useCallback(() => {
    setNotifications((prev) => {
      // 添加到历史记录
      setHistory((prevHistory) => [...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!), ...prev]);

      const firstKey = prev[0]?.key;
      if (firstKey) {
        onLeave?.(firstKey);
      }
      onAllClose?.();

      return [];
    });
  }, [onLeave, onAllClose]);

  // 更新通知
  const updateNotification = useCallback((key: string, config: Partial<NotificationItem>) => {
    setNotifications((prev) => {
      return prev.map((notification) => {
        if (notification.key === key) {
          return {
            ...notification,
            ...config,
            // 保留原始创建时间和键
            key: notification.key,
            createdAt: notification.createdAt,
          };
        }
        return notification;
      });
    });
  }, []);

  // 显示通知
  const open = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt'>) => {
      return addNotification(config);
    },
    [addNotification],
  );

  // 显示成功通知
  const success = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => {
      return open({ ...config, type: 'success' });
    },
    [open],
  );

  // 显示信息通知
  const info = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => {
      return open({ ...config, type: 'info' });
    },
    [open],
  );

  // 显示警告通知
  const warning = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => {
      return open({ ...config, type: 'warning' });
    },
    [open],
  );

  // 显示错误通知
  const error = useCallback(
    (config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => {
      return open({ ...config, type: 'error' });
    },
    [open],
  );

  // 关闭指定通知
  const close = useCallback(
    (key: string) => {
      closeNotification(key);
    },
    [closeNotification],
  );

  // 关闭所有通知
  const destroyAll = useCallback(() => {
    closeAllNotifications();
  }, [closeAllNotifications]);

  // 获取所有通知
  const getNotifications = useCallback(() => {
    return notifications.map(({ isClosing, stackIndex, ...rest }) => rest);
  }, [notifications]);

  // 获取通知数量
  const getCount = useCallback(() => {
    return notifications.length;
  }, [notifications]);

  // 设置最大数量
  const setMaxCount = useCallback((_count: number) => {
    // 这里可以更新状态，但由于maxCount是prop，实际应该通过props更新
    console.warn('setMaxCount should be controlled by props');
  }, []);

  // 设置默认位置
  const setDefaultPlacement = useCallback((_placement: NotificationPlacement) => {
    // 这里可以更新状态，但由于defaultPlacement是prop，实际应该通过props更新
    console.warn('setDefaultPlacement should be controlled by props');
  }, []);

  // 设置默认时长
  const setDefaultDuration = useCallback((_duration: number) => {
    // 这里可以更新状态，但由于defaultDuration是prop，实际应该通过props更新
    console.warn('setDefaultDuration should be controlled by props');
  }, []);

  // 暂停所有通知自动关闭
  const pauseAll = useCallback(() => {
    setIsAllPaused(true);
    notificationRefs.current.forEach((refObject) => {
      if (refObject?.current?.pauseProgress) {
        refObject.current.pauseProgress();
      }
    });
  }, []);

  // 恢复所有通知自动关闭
  const resumeAll = useCallback(() => {
    setIsAllPaused(false);
    notificationRefs.current.forEach((ref) => {
      if (ref?.current?.resumeProgress) {
        ref.current.resumeProgress();
      }
    });
  }, []);

  // 清空历史记录
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // 获取通知历史
  const getHistory = useCallback(() => {
    return [...history];
  }, [history]);

  // 暴露方法给ref
  React.useImperativeHandle(ref, () => ({
    open,
    success,
    info,
    warning,
    error,
    close,
    destroyAll,
    update: updateNotification,
    getNotifications,
    getCount,
    setMaxCount,
    setDefaultPlacement,
    setDefaultDuration,
    pauseAll,
    resumeAll,
    clearHistory,
    getHistory,
  }));

  // 处理通知关闭
  const handleNotificationClose = useCallback(
    (key: string) => {
      closeNotification(key);
    },
    [closeNotification],
  );

  // 处理通知点击
  const handleNotificationClick = useCallback(
    (key: string) => {
      const notification = notifications.find((n) => n.key === key);
      if (notification?.onClick) {
        notification.onClick();
      }
    },
    [notifications],
  );

  // 获取容器样式
  const getContainerStyle = () => {
    return {
      ...notificationStyleHelpers.getContainerStyle({ theme, isMobile: isMobile() }),
      ...containerStyle,
    };
  };

  // 获取容器类名
  const getContainerClassName = () => {
    return cn('taro-uno-notification-container', containerClassName);
  };

  // 按位置分组通知
  const renderNotificationsByPlacement = () => {
    const notificationsByPlacement: Record<NotificationPlacement, InternalNotificationItem[]> = {
      topRight: [],
      topLeft: [],
      bottomRight: [],
      bottomLeft: [],
      top: [],
      bottom: [],
    };

    // 按位置分组
    notifications.forEach((notification) => {
      const placement = notification.placement || defaultPlacement;
      notificationsByPlacement[placement].push(notification);
    });

    // 渲染每个位置的通知
    return Object.entries(notificationsByPlacement).map(([placement, placementNotifications]) => {
      if (placementNotifications.length === 0) return null;

      const sortedNotifications = NotificationUtils.sortNotifications(placementNotifications);

      return (
        <View
          key={placement}
          className={`taro-uno-notification-placement-${placement}`}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            ...getPlacementStyle(placement as NotificationPlacement),
          }}
        >
          {sortedNotifications.map((notification) => {
            const { key, ...notificationConfig } = notification;
            // Future implementation might use these properties
            void (notification as any).isClosing;
            void (notification as any).stackIndex;

            return (
              <Notification
                key={key}
                ref={(ref) => {
                  if (ref) {
                    notificationRefs.current.set(key, { current: ref });
                  } else {
                    notificationRefs.current.delete(key);
                  }
                }}
                {...notificationConfig}
                onClose={() => handleNotificationClose(key)}
                onClick={() => handleNotificationClick(key)}
              />
            );
          })}
        </View>
      );
    });
  };

  // 获取位置样式
  const getPlacementStyle = (placement: NotificationPlacement) => {
    const placementStyleData = notificationStyleHelpers.getPlacementStyle(placement, {
      theme,
      isMobile: isMobile(),
    });
    return placementStyleData.container;
  };

  return (
    <View className={getContainerClassName()} style={getContainerStyle()}>
      {renderNotificationsByPlacement()}
    </View>
  );
});

NotificationManager.displayName = 'NotificationManager';

export default NotificationManager;
