import type { CSSProperties } from 'react';
import type {
  NotificationType,
  NotificationPlacement,
  NotificationAnimation,
  NotificationStyleConfig,
} from './Notification.types';

/** 通知样式类名 */
export const notificationStyles = {
  /** 基础类名 */
  base: 'taro-uno-notification',
  /** 图标类名 */
  icon: 'taro-uno-notification-icon',
  /** 图标文本类名 */
  iconText: 'taro-uno-notification-icon-text',
  /** 内容类名 */
  content: 'taro-uno-notification-content',
  /** 标题类名 */
  title: 'taro-uno-notification-title',
  /** 文本类名 */
  text: 'taro-uno-notification-text',
  /** 关闭按钮类名 */
  close: 'taro-uno-notification-close',
  /** 关闭悬停类名 */
  closeHover: 'taro-uno-notification-close-hover',
  /** 关闭图标类名 */
  closeIcon: 'taro-uno-notification-close-icon',
  /** 动画类名 */
  animation: {
    enter: 'taro-uno-notification-enter',
    enterActive: 'taro-uno-notification-enter-active',
    exit: 'taro-uno-notification-exit',
    exitActive: 'taro-uno-notification-exit-active',
  },
} as const;

/** 通知样式配置 */
export const notificationStyleConfig: NotificationStyleConfig = {
  /** 基础样式 */
  base: {
    position: 'fixed',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    minWidth: '280px',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    color: '#374151',
  },

  /** 类型样式 */
  type: {
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#86efac',
      color: '#166534',
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#fca5a5',
      color: '#991b1b',
    },
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#fcd34d',
      color: '#92400e',
    },
    info: {
      backgroundColor: '#f0f9ff',
      borderColor: '#93c5fd',
      color: '#1e40af',
    },
  },

  /** 位置样式 */
  placement: {
    topRight: {
      top: '20px',
      right: '20px',
    },
    topLeft: {
      top: '20px',
      left: '20px',
    },
    bottomRight: {
      bottom: '20px',
      right: '20px',
    },
    bottomLeft: {
      bottom: '20px',
      left: '20px',
    },
    top: {
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    bottom: {
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },

  /** 图标样式 */
  icon: {
    marginRight: '12px',
    fontSize: '18px',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  /** 内容样式 */
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
  },

  /** 标题样式 */
  title: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.5',
    color: 'inherit',
    margin: 0,
    padding: 0,
  },

  /** 文本样式 */
  text: {
    fontSize: '13px',
    lineHeight: '1.4',
    color: 'inherit',
    margin: 0,
    padding: 0,
  },

  /** 关闭按钮样式 */
  close: {
    marginLeft: '12px',
    padding: '4px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '24px',
    height: '24px',
  },

  /** 悬停样式 */
  closeHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  /** 关闭图标样式 */
  closeIcon: {
    fontSize: '14px',
    color: 'currentColor',
    opacity: 0.7,
    lineHeight: 1,
  },

  /** 动画样式 */
  animation: {
    enter: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    enterActive: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    exit: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    exitActive: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
  },
};

/** 通知样式工具函数 */
export const notificationStyleHelpers = {
  /** 获取基础样式 */
  getBaseStyle: (placement?: NotificationPlacement, customStyle?: CSSProperties): CSSProperties => {
    const placementStyle = placement ? notificationStyleConfig.placement[placement] : {};
    return {
      ...notificationStyleConfig.base,
      ...placementStyle,
      ...customStyle,
    };
  },

  /** 获取类型样式 */
  getTypeStyle: (type?: NotificationType): CSSProperties => {
    return type
      ? notificationStyleConfig.type[type] || notificationStyleConfig.type.info
      : notificationStyleConfig.type.info;
  },

  /** 获取关闭按钮样式 */
  getCloseStyle: (hovered?: boolean): CSSProperties => {
    return {
      ...notificationStyleConfig.close,
      ...(hovered ? notificationStyleConfig.closeHover : {}),
    };
  },

  /** 获取动画样式 */
  getAnimationStyle: (animation: NotificationAnimation = 'fade', visible: boolean): CSSProperties => {
    if (animation === 'none') return {};

    const baseAnimation = notificationStyleConfig.animation;

    switch (animation) {
      case 'fade':
        return visible ? baseAnimation.enterActive : baseAnimation.exitActive;

      case 'slide':
        return visible ? baseAnimation.enterActive : baseAnimation.exitActive;

      case 'scale':
        return visible
          ? { ...baseAnimation.enterActive, transform: 'scale(1)' }
          : { ...baseAnimation.exitActive, transform: 'scale(0.8)' };

      default:
        return {};
    }
  },

  /** 获取容器样式 */
  getContainerStyle: (options: { theme?: any; isMobile?: boolean }): CSSProperties => {
    const { isMobile } = options;

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 999,
      ...(isMobile
        ? {
            padding: '10px',
          }
        : {
            padding: '20px',
          }),
    };
  },

  /** 获取位置容器样式 */
  getPlacementStyle: (
    placement: NotificationPlacement,
    options: {
      theme?: any;
      isMobile?: boolean;
    },
  ): {
    container: CSSProperties;
    items: CSSProperties;
  } => {
    const { isMobile } = options;

    const baseContainerStyle: CSSProperties = {
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    };

    const baseItemStyle: CSSProperties = {
      pointerEvents: 'auto',
    };

    let containerStyle: CSSProperties = {};

    switch (placement) {
      case 'topRight':
        containerStyle = {
          ...baseContainerStyle,
          top: isMobile ? '10px' : '20px',
          right: isMobile ? '10px' : '20px',
          alignItems: 'flex-end',
        };
        break;

      case 'topLeft':
        containerStyle = {
          ...baseContainerStyle,
          top: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : '20px',
          alignItems: 'flex-start',
        };
        break;

      case 'bottomRight':
        containerStyle = {
          ...baseContainerStyle,
          bottom: isMobile ? '10px' : '20px',
          right: isMobile ? '10px' : '20px',
          alignItems: 'flex-end',
        };
        break;

      case 'bottomLeft':
        containerStyle = {
          ...baseContainerStyle,
          bottom: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : '20px',
          alignItems: 'flex-start',
        };
        break;

      case 'top':
        containerStyle = {
          ...baseContainerStyle,
          top: isMobile ? '10px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          alignItems: 'center',
        };
        break;

      case 'bottom':
        containerStyle = {
          ...baseContainerStyle,
          bottom: isMobile ? '10px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          alignItems: 'center',
        };
        break;
    }

    return {
      container: containerStyle,
      items: baseItemStyle,
    };
  },

  /** 获取堆叠样式 */
  getStackStyle: (index: number, baseOffset: number = 8): CSSProperties => {
    const offset = index * baseOffset;

    return {
      transform: `translateY(${offset}px)`,
      transition: 'transform 0.3s ease',
    };
  },

  /** 获取拖拽样式 */
  getDragStyle: (isDragging: boolean, dragOffset: number): CSSProperties => {
    return {
      transform: `translateX(${dragOffset}px)`,
      opacity: isDragging ? 0.8 : 1,
      transition: isDragging ? 'none' : 'all 0.3s ease',
    };
  },
};

/** 旧的样式对象，保持向后兼容 */
export const notificationStylesLegacy = notificationStyleConfig;

/** 兼容性导出 */
export const notificationStylesCompat = {
  /** 获取基础样式（兼容旧API） */
  getBaseStyle: (placement?: string, style?: CSSProperties): CSSProperties => {
    return notificationStyleHelpers.getBaseStyle(placement as NotificationPlacement, style);
  },

  /** 获取类型样式（兼容旧API） */
  getTypeStyle: (type?: string): CSSProperties => {
    return notificationStyleHelpers.getTypeStyle(type as NotificationType);
  },

  /** 获取关闭按钮样式（兼容旧API） */
  getCloseStyle: (hovered?: boolean): CSSProperties => {
    return notificationStyleHelpers.getCloseStyle(hovered);
  },

  /** 获取动画样式 */
  getAnimationStyle: (animation: NotificationAnimation = 'fade', visible: boolean): CSSProperties => {
    return notificationStyleHelpers.getAnimationStyle(animation, visible);
  },
};

/** 导出所有样式相关的工具函数 */
// export { notificationStyleHelpers }; // 已经在上面导出了

/** 通知样式系统 */
export const notificationStyleSystem = notificationStyleConfig;

/** 响应式断点 */
export const responsiveBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

/** 生成响应式样式 */
export const generateResponsiveStyle = (
  style: React.CSSProperties,
  breakpoint?: keyof typeof responsiveBreakpoints,
): React.CSSProperties => {
  if (!breakpoint) return style;

  return {
    ...style,
    ['@media (max-width: ' + responsiveBreakpoints[breakpoint] + 'px)']: style,
  };
};

/** 生成主题样式 */
export const generateThemeStyle = (baseStyle: React.CSSProperties, theme?: any): React.CSSProperties => {
  return {
    ...baseStyle,
    ...(theme?.colors ? { color: theme.colors.primary } : {}),
    ...(theme?.spacing ? { margin: theme.spacing.md } : {}),
  };
};

/** 计算动态样式 */
export const calculateDynamicStyles = (
  base: React.CSSProperties,
  overrides: React.CSSProperties,
): React.CSSProperties => {
  return {
    ...base,
    ...overrides,
  };
};
