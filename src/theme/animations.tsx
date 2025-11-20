/**
 * 动画和过渡效果系统
 * 提供统一的动画效果、过渡和微交互
 */

import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';

// 动画上下文类型
interface AnimationContextType {
  // 动画配置
  config: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      bounce: string;
      elastic: string;
    };
    reduceMotion: boolean;
  };

  // 动画控制
  controls: {
    setReduceMotion: (enabled: boolean) => void;
    isAnimationEnabled: () => boolean;
  };

  // 预设动画
  presets: {
    fadeIn: (element: HTMLElement, duration?: number) => void;
    fadeOut: (element: HTMLElement, duration?: number) => void;
    slideInUp: (element: HTMLElement, duration?: number) => void;
    slideInDown: (element: HTMLElement, duration?: number) => void;
    slideInLeft: (element: HTMLElement, duration?: number) => void;
    slideInRight: (element: HTMLElement, duration?: number) => void;
    scaleIn: (element: HTMLElement, duration?: number) => void;
    scaleOut: (element: HTMLElement, duration?: number) => void;
    bounceIn: (element: HTMLElement, duration?: number) => void;
    shake: (element: HTMLElement, duration?: number) => void;
    pulse: (element: HTMLElement, duration?: number) => void;
  };

  // 过渡效果
  transitions: {
    fade: (element: HTMLElement, callback?: () => void) => void;
    slide: (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right', callback?: () => void) => void;
    scale: (element: HTMLElement, callback?: () => void) => void;
  };

  // 微交互
  microInteractions: {
    hover: (element: HTMLElement, callback: () => void) => () => void;
    press: (element: HTMLElement, callback: () => void) => () => void;
    ripple: (element: HTMLElement, event: React.MouseEvent) => void;
  };

  // 自定义动画
  custom: {
    create: (name: string, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => void;
    play: (element: HTMLElement, name: string, options?: KeyframeAnimationOptions) => Animation | null;
  };
}

// 创建动画上下文
const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// 动画配置
const defaultAnimationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  reduceMotion: false,
};

// 预设动画定义
const presetAnimations = {
  fadeIn: [{ opacity: 0 }, { opacity: 1 }],
  fadeOut: [{ opacity: 1 }, { opacity: 0 }],
  slideInUp: [
    { transform: 'translateY(100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  slideInDown: [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  slideInLeft: [
    { transform: 'translateX(-100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  slideInRight: [
    { transform: 'translateX(100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  scaleIn: [
    { transform: 'scale(0)', opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  scaleOut: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0)', opacity: 0 },
  ],
  bounceIn: [
    { transform: 'scale(0.3)', opacity: 0 },
    { transform: 'scale(1.05)', opacity: 1, offset: 0.5 },
    { transform: 'scale(0.9)', opacity: 1, offset: 0.7 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  shake: [
    { transform: 'translateX(0)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(0)' },
  ],
  pulse: [{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }],
};

// 自定义动画注册表
const customAnimations = new Map<string, { keyframes: Keyframe[]; options?: KeyframeAnimationOptions }>();

// 动画提供者组件
interface AnimationProviderProps {
  children: React.ReactNode;
  config?: Partial<typeof defaultAnimationConfig>;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children, config: userConfig = {} }) => {
  // 合并配置
  const [config, setConfig] = useState({
    ...defaultAnimationConfig,
    ...userConfig,
  });

  // 检测减少动画偏好
  useEffect(() => {
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduceMotionChange = (e: MediaQueryListEvent) => {
      setConfig((prev) => ({ ...prev, reduceMotion: e.matches }));
    };

    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
    setConfig((prev) => ({ ...prev, reduceMotion: reduceMotionQuery.matches }));

    return () => {
      reduceMotionQuery.removeEventListener('change', handleReduceMotionChange);
    };
  }, []);

  // 动画控制
  const controls = {
    setReduceMotion: useCallback((enabled: boolean) => {
      setConfig((prev) => ({ ...prev, reduceMotion: enabled }));
    }, []),

    isAnimationEnabled: useCallback(() => {
      return !config.reduceMotion;
    }, [config.reduceMotion]),
  };

  // 预设动画
  const presets = {
    fadeIn: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.fadeIn, {
          duration,
          easing: config.easing.easeInOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    fadeOut: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.opacity = '0';
          return;
        }

        element.animate(presetAnimations.fadeOut, {
          duration,
          easing: config.easing.easeInOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    slideInUp: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.slideInUp, {
          duration,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    slideInDown: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.slideInDown, {
          duration,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    slideInLeft: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.slideInLeft, {
          duration,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    slideInRight: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.slideInRight, {
          duration,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    scaleIn: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'scale(1)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.scaleIn, {
          duration,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });
      },
      [config],
    ),

    scaleOut: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) {
          element.style.transform = 'scale(0)';
          element.style.opacity = '0';
          return;
        }

        element.animate(presetAnimations.scaleOut, {
          duration,
          easing: config.easing.easeIn,
          fill: 'forwards',
        });
      },
      [config],
    ),

    bounceIn: useCallback(
      (element: HTMLElement, duration: number = config.duration.slow) => {
        if (config.reduceMotion) {
          element.style.transform = 'scale(1)';
          element.style.opacity = '1';
          return;
        }

        element.animate(presetAnimations.bounceIn, {
          duration,
          easing: config.easing.bounce,
          fill: 'forwards',
        });
      },
      [config],
    ),

    shake: useCallback(
      (element: HTMLElement, duration: number = config.duration.fast) => {
        if (config.reduceMotion) return;

        element.animate(presetAnimations.shake, {
          duration,
          easing: config.easing.easeInOut,
        });
      },
      [config],
    ),

    pulse: useCallback(
      (element: HTMLElement, duration: number = config.duration.normal) => {
        if (config.reduceMotion) return;

        element.animate(presetAnimations.pulse, {
          duration,
          easing: config.easing.easeInOut,
          iterations: Infinity,
        });
      },
      [config],
    ),
  };

  // 过渡效果
  const transitions = {
    fade: useCallback(
      (element: HTMLElement, callback?: () => void) => {
        const animation = element.animate(presetAnimations.fadeIn, {
          duration: config.duration.normal,
          easing: config.easing.easeInOut,
          fill: 'forwards',
        });

        if (callback) {
          animation.onfinish = callback;
        }
      },
      [config],
    ),

    slide: useCallback(
      (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right', callback?: () => void) => {
        let keyframes = presetAnimations.slideInUp;

        switch (direction) {
          case 'down':
            keyframes = presetAnimations.slideInDown;
            break;
          case 'left':
            keyframes = presetAnimations.slideInLeft;
            break;
          case 'right':
            keyframes = presetAnimations.slideInRight;
            break;
        }

        const animation = element.animate(keyframes, {
          duration: config.duration.normal,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });

        if (callback) {
          animation.onfinish = callback;
        }
      },
      [config],
    ),

    scale: useCallback(
      (element: HTMLElement, callback?: () => void) => {
        const animation = element.animate(presetAnimations.scaleIn, {
          duration: config.duration.normal,
          easing: config.easing.easeOut,
          fill: 'forwards',
        });

        if (callback) {
          animation.onfinish = callback;
        }
      },
      [config],
    ),
  };

  // 微交互
  const microInteractions = {
    hover: useCallback(
      (element: HTMLElement, callback: () => void) => {
        const handleMouseEnter = () => {
          if (config.reduceMotion) return;
          element.style.transform = 'scale(1.02)';
          callback();
        };

        const handleMouseLeave = () => {
          if (config.reduceMotion) return;
          element.style.transform = 'scale(1)';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        };
      },
      [config],
    ),

    press: useCallback(
      (element: HTMLElement, callback: () => void) => {
        const handleMouseDown = () => {
          if (config.reduceMotion) return;
          element.style.transform = 'scale(0.98)';
          callback();
        };

        const handleMouseUp = () => {
          if (config.reduceMotion) return;
          element.style.transform = 'scale(1)';
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);

        return () => {
          element.removeEventListener('mousedown', handleMouseDown);
          element.removeEventListener('mouseup', handleMouseUp);
        };
      },
      [config],
    ),

    ripple: useCallback(
      (element: HTMLElement, event: React.MouseEvent) => {
        if (config.reduceMotion) return;

        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        top: ${y - size / 2}px;
        left: ${x - size / 2}px;
        pointer-events: none;
        transform: scale(0);
        opacity: 1;
      `;

        element.appendChild(ripple);
        element.style.overflow = 'hidden';
        element.style.position = 'relative';

        ripple.animate(
          [
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 },
          ],
          {
            duration: 600,
            easing: config.easing.easeOut,
          },
        ).onfinish = () => {
          ripple.remove();
        };
      },
      [config],
    ),
  };

  // 自定义动画
  const custom = {
    create: useCallback((name: string, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => {
      customAnimations.set(name, { keyframes, options });
    }, []),

    play: useCallback((element: HTMLElement, name: string, options?: KeyframeAnimationOptions) => {
      const animation = customAnimations.get(name);
      if (!animation) {
        console.warn(`Animation "${name}" not found`);
        return null;
      }

      return element.animate(animation.keyframes, {
        ...animation.options,
        ...options,
      });
    }, []),
  };

  // 上下文值
  const contextValue: AnimationContextType = {
    config,
    controls,
    presets,
    transitions,
    microInteractions,
    custom,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};

// 使用动画的Hook
export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

// 动画HOC
export const withAnimation = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const animation = useAnimation();

    return <WrappedComponent {...props} animation={animation} />;
  };
};

// 涟漪效果组件
interface RippleProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Ripple: React.FC<RippleProps> = ({ className = '', children, disabled = false }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { microInteractions, config } = useAnimation();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || config.reduceMotion) return;

      if (elementRef.current) {
        microInteractions.ripple(elementRef.current, event);
      }
    },
    [disabled, config.reduceMotion, microInteractions],
  );

  return (
    <div ref={elementRef} className={`ripple-container ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
};

// 动画工具函数
export const AnimationUtils = {
  // 检测动画支持
  isAnimationSupported: (): boolean => {
    return typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
  },

  // 等待动画完成
  waitForAnimation: (element: HTMLElement, animationName: string): Promise<void> => {
    return new Promise((resolve) => {
      const animation = element.getAnimations().find((anim) => (anim as any).animationName === animationName);
      if (animation) {
        animation.onfinish = () => resolve();
      } else {
        resolve();
      }
    });
  },

  // 批量动画
  animateMultiple: (elements: HTMLElement[], animationName: string, options?: KeyframeAnimationOptions) => {
    return elements.map((element) => {
      const animation = element.animate(presetAnimations[animationName as keyof typeof presetAnimations], options);
      return animation;
    });
  },

  // 链式动画
  animateSequence: (element: HTMLElement, animations: Array<{ name: string; options?: KeyframeAnimationOptions }>) => {
    let promise = Promise.resolve();

    animations.forEach(({ name, options }) => {
      promise = promise.then(() => {
        return new Promise<void>((resolve) => {
          const animation = element.animate(presetAnimations[name as keyof typeof presetAnimations], options);
          animation.onfinish = () => resolve();
        });
      });
    });

    return promise;
  },

  // 创建自定义缓动函数
  createEasingFunction: (points: Array<{ x: number; y: number }>): string => {
    return `cubic-bezier(${points.map((p) => `${p.x}, ${p.y}`).join(', ')})`;
  },

  // 生成CSS动画
  generateCSSAnimation: (name: string, keyframes: Keyframe[]): string => {
    const keyframeRules = keyframes
      .map((keyframe, index) => {
        const percentage = (index / (keyframes.length - 1)) * 100;
        const properties = Object.entries(keyframe)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
          .join('; ');
        return `${percentage}% { ${properties} }`;
      })
      .join('\n');

    return `
      @keyframes ${name} {
        ${keyframeRules}
      }
    `;
  },
};

export default AnimationProvider;
