/**
 * 效果设计令牌
 * 统一管理阴影、圆角、动画等视觉效果
 */

export interface EffectsTokens {
  // 圆角
  borderRadius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
    // 组件专用
    button: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    input: {
      sm: string;
      md: string;
      lg: string;
    };
    card: {
      sm: string;
      md: string;
      lg: string;
    };
    modal: string;
    dropdown: string;
  };

  // 阴影
  boxShadow: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    inner: string;
    colored: string;
    // 组件专用
    button: {
      sm: string;
      md: string;
      lg: string;
    };
    card: {
      sm: string;
      md: string;
      lg: string;
    };
    modal: string;
    tooltip: string;
    dropdown: string;
  };

  // 动画
  animation: {
    // 持续时间
    duration: {
      75: string;
      100: string;
      150: string;
      200: string;
      300: string;
      500: string;
      700: string;
      1000: string;
    };
    // 缓动函数
    easing: {
      linear: string;
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      'in-quad': string;
      'in-cubic': string;
      'out-quad': string;
      'out-cubic': string;
      'in-out-quad': string;
      'in-out-cubic': string;
    };
    // 延迟
    delay: {
      75: string;
      100: string;
      150: string;
      200: string;
      300: string;
      500: string;
    };
  };

  // 过渡
  transition: {
    none: string;
    all: string;
    common: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;
    // 组件专用
    button: string;
    input: string;
    modal: string;
    tooltip: string;
    dropdown: string;
  };

  // Z-index
  zIndex: {
    hide: string;
    auto: string;
    base: string;
    dropdown: string;
    sticky: string;
    fixed: string;
    'modal-backdrop': string;
    modal: string;
    'popover-backdrop': string;
    popover: string;
    tooltip: string;
    max: string;
  };
}

// 默认效果令牌
export const effectsTokens: EffectsTokens = {
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
    button: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    input: {
      sm: '6px',
      md: '8px',
      lg: '12px',
    },
    card: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    modal: '12px',
    dropdown: '8px',
  },

  boxShadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    colored: '0 10px 15px -3px rgba(14, 165, 233, 0.15)',
    button: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    card: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    tooltip: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  animation: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      'in-quad': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    },
    delay: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
    },
  },

  transition: {
    none: 'none',
    all: 'all 150ms ease-in-out',
    common: 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
    colors: 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
    opacity: 'opacity 150ms ease-in-out',
    shadow: 'box-shadow 150ms ease-in-out',
    transform: 'transform 150ms ease-in-out',
    button: 'all 150ms ease-in-out',
    input: 'all 150ms ease-in-out',
    modal: 'all 300ms ease-in-out',
    tooltip: 'all 150ms ease-in-out',
    dropdown: 'all 150ms ease-in-out',
  },

  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    'modal-backdrop': '1040',
    modal: '1050',
    'popover-backdrop': '1060',
    popover: '1070',
    tooltip: '1080',
    max: '9999',
  },
};
