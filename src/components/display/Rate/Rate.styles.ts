import type { RateSize, StarState } from './Rate.types';

/** Rate组件样式管理器 */
export const rateStyles = {
  /** 尺寸映射表 */
  SIZE_MAP: {
    small: { size: 16, gap: 4 },
    medium: { size: 20, gap: 6 },
    large: { size: 24, gap: 8 },
    default: { size: 20, gap: 6 },
  } as const,

  /** 颜色配置 */
  COLORS: {
    default: '#fadb14',
    unselected: '#f0f0f0',
    disabled: '#d9d9d9',
  },

  /**
   * 获取容器样式
   */
  getContainerStyle: (props: {
    size?: RateSize;
    disabled?: boolean;
    readonly?: boolean;
    style?: React.CSSProperties;
  }): React.CSSProperties => {
    const { size = 'default', disabled = false, readonly = false, style = {} } = props;
    const sizeConfig = rateStyles.SIZE_MAP[size as keyof typeof rateStyles.SIZE_MAP];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${sizeConfig.gap}px`,
      fontSize: `${sizeConfig.size}px`,
      lineHeight: 1,
      color: disabled ? rateStyles['COLORS'].disabled : rateStyles['COLORS'].default,
      cursor: disabled || readonly ? 'default' : 'pointer',
      outline: 'none',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.3s ease',
      ...style,
    };
  },

  /**
   * 获取星星样式
   */
  getStarStyle: (props: {
    size: RateSize;
    state: StarState;
    disabled?: boolean;
    readonly?: boolean;
    color?: string;
    unselectedColor?: string;
    isHovering?: boolean;
  }): React.CSSProperties => {
    const {
      size,
      state,
      disabled = false,
      readonly = false,
      color = rateStyles['COLORS'].default,
      unselectedColor = rateStyles['COLORS'].unselected,
      isHovering = false,
    } = props;

    const sizeConfig = rateStyles.SIZE_MAP[size as keyof typeof rateStyles.SIZE_MAP];

    // 计算颜色
    let starColor = unselectedColor;
    if (state === 'full') {
      starColor = disabled ? rateStyles['COLORS'].disabled : color;
    } else if (state === 'half') {
      starColor = disabled ? rateStyles['COLORS'].disabled : color;
    }

    return {
      position: 'relative',
      display: 'inline-block',
      width: `${sizeConfig.size}px`,
      height: `${sizeConfig.size}px`,
      fontSize: `${sizeConfig.size}px`,
      lineHeight: 1,
      color: starColor,
      cursor: disabled || readonly ? 'default' : 'pointer',
      transition: 'all 0.3s ease',
      transform: isHovering && !disabled && !readonly ? 'scale(1.1)' : 'scale(1)',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    };
  },

  /**
   * 获取半星遮罩样式
   */
  getHalfStarMaskStyle: (props: { color?: string; unselectedColor?: string }): React.CSSProperties => {
    const { color = rateStyles['COLORS'].default } = props;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      color,
      zIndex: 1,
    };
  },

  /**
   * 获取工具提示样式
   */
  getTooltipStyle: (): React.CSSProperties => {
    return {
      position: 'absolute',
      top: '-32px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '4px 8px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fontSize: '12px',
      borderRadius: '4px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 10,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    };
  },

  /**
   * 获取容器类名
   */
  getClassName: (props: { size?: RateSize; disabled?: boolean; readonly?: boolean; className?: string }): string => {
    const { size = 'default', disabled = false, readonly = false, className = '' } = props;

    const baseClass = 'taro-uno-rate';
    const sizeClass = `${baseClass}--${size}`;
    const disabledClass = disabled ? `${baseClass}--disabled` : '';
    const readonlyClass = readonly ? `${baseClass}--readonly` : '';

    return [baseClass, sizeClass, disabledClass, readonlyClass, className].filter(Boolean).join(' ');
  },

  /**
   * 获取星星类名
   */
  getStarClassName: (props: { state: StarState; isActive?: boolean; isHovering?: boolean }): string => {
    const { state, isActive = false, isHovering = false } = props;

    const baseClass = 'taro-uno-rate__star';
    const stateClass = `${baseClass}--${state}`;
    const activeClass = isActive ? `${baseClass}--active` : '';
    const hoverClass = isHovering ? `${baseClass}--hover` : '';

    return [baseClass, stateClass, activeClass, hoverClass].filter(Boolean).join(' ');
  },

  /**
   * 获取可访问性样式
   */
  getAccessibilityStyle: (focused: boolean): React.CSSProperties => {
    return {
      outline: focused ? '2px solid var(--primary-color, #1890ff)' : 'none',
      outlineOffset: '2px',
    };
  },

  /**
   * 获取动画样式
   */
  getAnimationStyle: (props: {
    isAnimating?: boolean;
    animationType?: 'scale' | 'bounce' | 'pulse';
  }): React.CSSProperties => {
    const { isAnimating = false, animationType = 'scale' } = props;

    if (!isAnimating) return {};

    const animations = {
      scale: {
        animation: 'rateScale 0.3s ease',
      },
      bounce: {
        animation: 'rateBounce 0.6s ease',
      },
      pulse: {
        animation: 'ratePulse 1s ease infinite',
      },
    };

    return animations[animationType] || {};
  },

  /**
   * 生成CSS动画关键帧
   */
  generateKeyframes: (): string => {
    return `
      @keyframes rateScale {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes rateBounce {
        0%, 20%, 53%, 80%, 100% {
          animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          transform: translate3d(0, 0, 0);
        }
        40%, 43% {
          animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
          transform: translate3d(0, -8px, 0);
        }
        70% {
          animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
          transform: translate3d(0, -4px, 0);
        }
        90% {
          transform: translate3d(0, -1px, 0);
        }
      }

      @keyframes ratePulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
  },

  /**
   * 获取响应式样式
   */
  getResponsiveStyle: (props: {
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    size: RateSize;
  }): React.CSSProperties => {
    const { breakpoint = 'md', size } = props;

    // 在小屏幕上调整尺寸
    const responsiveSize = breakpoint === 'xs' || breakpoint === 'sm' ? 'small' : size;
    const sizeConfig = rateStyles.SIZE_MAP[responsiveSize as keyof typeof rateStyles.SIZE_MAP];

    return {
      fontSize: `${sizeConfig.size}px`,
      gap: `${sizeConfig.gap}px`,
    };
  },
};
