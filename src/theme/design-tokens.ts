/**
 * 设计令牌系统
 * 统一的设计变量和CSS自定义属性
 * 提供类型安全的设计令牌管理
 */

// Design tokens don't depend on ThemeConfig types to avoid circular imports

// 设计令牌类型定义
export interface DesignTokens {
  // 颜色令牌
  colors: {
    // 基础颜色
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    success: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    warning: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    error: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    info: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };

    // 中性颜色
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };

    // 语义化颜色
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
      link: string;
      placeholder: string;
    };

    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      card: string;
      input: string;
      mask: string;
      hover: string;
      active: string;
    };

    border: {
      default: string;
      focus: string;
      error: string;
      success: string;
      warning: string;
      light: string;
    };

    shadow: {
      default: string;
      light: string;
      medium: string;
      dark: string;
      colored: string;
    };

    // 状态颜色
    status: {
      online: string;
      offline: string;
      busy: string;
      away: string;
    };

    // 交互颜色
    interactive: {
      hover: string;
      active: string;
      focus: string;
      selected: string;
      disabled: string;
    };
  };

  // 间距令牌
  spacing: {
    // 基础间距
    px: string; // 1px
    '0.5': string; // 2px
    '1': string; // 4px
    '1.5': string; // 6px
    '2': string; // 8px
    '2.5': string; // 10px
    '3': string; // 12px
    '3.5': string; // 14px
    '4': string; // 16px
    '5': string; // 20px
    '6': string; // 24px
    '7': string; // 28px
    '8': string; // 32px
    '9': string; // 36px
    '10': string; // 40px
    '11': string; // 44px
    '12': string; // 48px
    '14': string; // 56px
    '16': string; // 64px
    '18': string; // 72px
    '20': string; // 80px
    '24': string; // 96px
    '28': string; // 112px
    '32': string; // 128px
    '36': string; // 144px
    '40': string; // 160px
    '44': string; // 176px
    '48': string; // 192px
    '52': string; // 208px
    '56': string; // 224px
    '60': string; // 240px
    '64': string; // 256px
    '72': string; // 288px
    '80': string; // 320px
    '96': string; // 384px

    // 组件间距
    component: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };

    // 布局间距
    layout: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };

  // 字体令牌
  typography: {
    // 字体族
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
      display: string[];
      body: string[];
    };

    // 字体大小
    fontSize: {
      '3xs': string; // 10px
      '2xs': string; // 12px
      xs: string; // 14px
      sm: string; // 16px
      base: string; // 18px
      lg: string; // 20px
      xl: string; // 24px
      '2xl': string; // 30px
      '3xl': string; // 36px
      '4xl': string; // 48px
      '5xl': string; // 60px
      '6xl': string; // 72px
      '7xl': string; // 96px
      '8xl': string; // 128px
      '9xl': string; // 160px
    };

    // 字体粗细
    fontWeight: {
      thin: string;
      extralight: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };

    // 行高
    lineHeight: {
      none: string;
      tight: string;
      snug: string;
      normal: string;
      relaxed: string;
      loose: string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '7': string;
      '8': string;
      '9': string;
      '10': string;
    };

    // 字母间距
    letterSpacing: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };

    // 段落间距
    paragraphSpacing: {
      none: string;
      tight: string;
      normal: string;
      relaxed: string;
      loose: string;
    };
  };

  // 边框令牌
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

  // 阴影令牌
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

  // 动画令牌
  animation: {
    // 持续时间
    duration: {
      '75': string;
      '100': string;
      '150': string;
      '200': string;
      '300': string;
      '500': string;
      '700': string;
      '1000': string;
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
      'in-quart': string;
      'in-quint': string;
      'in-sine': string;
      'in-expo': string;
      'in-circ': string;
      'in-back': string;
      'out-quad': string;
      'out-cubic': string;
      'out-quart': string;
      'out-quint': string;
      'out-sine': string;
      'out-expo': string;
      'out-circ': string;
      'out-back': string;
      'in-out-quad': string;
      'in-out-cubic': string;
      'in-out-quart': string;
      'in-out-quint': string;
      'in-out-sine': string;
      'in-out-expo': string;
      'in-out-circ': string;
      'in-out-back': string;
    };

    // 延迟
    delay: {
      '75': string;
      '100': string;
      '150': string;
      '200': string;
      '300': string;
      '500': string;
      '700': string;
      '1000': string;
    };
  };

  // 断点令牌
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };

  // Z-index 令牌
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

  // 过渡令牌
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

  // 混合模式
  blendMode: {
    normal: string;
    multiply: string;
    screen: string;
    overlay: string;
    darken: string;
    lighten: string;
    'color-dodge': string;
    'color-burn': string;
    hardlight: string;
    softlight: string;
    difference: string;
    exclusion: string;
    hue: string;
    saturation: string;
    color: string;
    luminosity: string;
  };

  // 光标
  cursor: {
    auto: string;
    default: string;
    pointer: string;
    wait: string;
    text: string;
    move: string;
    'not-allowed': string;
    grab: string;
    grabbing: string;
    'zoom-in': string;
    'zoom-out': string;
  };
}

// 默认设计令牌
export const defaultDesignTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#4b5563',
      disabled: '#9ca3af',
      inverse: '#ffffff',
      link: '#0ea5e9',
      placeholder: '#9ca3af',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      card: '#ffffff',
      input: '#f9fafb',
      mask: 'rgba(0, 0, 0, 0.5)',
      hover: '#f9fafb',
      active: '#f3f4f6',
    },
    border: {
      default: '#e5e7eb',
      focus: '#0ea5e9',
      error: '#ef4444',
      success: '#22c55e',
      warning: '#f59e0b',
      light: '#f3f4f6',
    },
    shadow: {
      default: 'rgba(0, 0, 0, 0.1)',
      light: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.15)',
      dark: 'rgba(0, 0, 0, 0.25)',
      colored: 'rgba(14, 165, 233, 0.15)',
    },
    status: {
      online: '#22c55e',
      offline: '#6b7280',
      busy: '#ef4444',
      away: '#f59e0b',
    },

    interactive: {
      hover: 'rgba(0, 0, 0, 0.05)',
      active: 'rgba(0, 0, 0, 0.1)',
      focus: 'rgba(59, 130, 246, 0.1)',
      selected: 'rgba(59, 130, 246, 0.2)',
      disabled: 'rgba(0, 0, 0, 0.3)',
    },
  },
  spacing: {
    px: '1px',
    '0.5': '2px',
    '1': '4px',
    '1.5': '6px',
    '2': '8px',
    '2.5': '10px',
    '3': '12px',
    '3.5': '14px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '7': '28px',
    '8': '32px',
    '9': '36px',
    '10': '40px',
    '11': '44px',
    '12': '48px',
    '14': '56px',
    '16': '64px',
    '18': '72px',
    '20': '80px',
    '24': '96px',
    '28': '112px',
    '32': '128px',
    '36': '144px',
    '40': '160px',
    '44': '176px',
    '48': '192px',
    '52': '208px',
    '56': '224px',
    '60': '240px',
    '64': '256px',
    '72': '288px',
    '80': '320px',
    '96': '384px',
    component: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
    },
    layout: {
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
      '2xl': '64px',
    },
  },
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Fira Code', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      display: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      body: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
    fontSize: {
      '3xs': '10px',
      '2xs': '12px',
      xs: '14px',
      sm: '16px',
      base: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '30px',
      '3xl': '36px',
      '4xl': '48px',
      '5xl': '60px',
      '6xl': '72px',
      '7xl': '96px',
      '8xl': '128px',
      '9xl': '160px',
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      '3': '1.75',
      '4': '2',
      '5': '2.25',
      '6': '2.5',
      '7': '2.75',
      '8': '3',
      '9': '3.25',
      '10': '3.5',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    paragraphSpacing: {
      none: '0',
      tight: '0.5rem',
      normal: '1rem',
      relaxed: '1.5rem',
      loose: '2rem',
    },
  },
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
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      'in-quad': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      'in-sine': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
      'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
      'out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
      'in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
      'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    delay: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },
  breakpoints: {
    xs: '0',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
    '4xl': '2560px',
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
  blendMode: {
    normal: 'normal',
    multiply: 'multiply',
    screen: 'screen',
    overlay: 'overlay',
    darken: 'darken',
    lighten: 'lighten',
    'color-dodge': 'color-dodge',
    'color-burn': 'color-burn',
    hardlight: 'hard-light',
    softlight: 'soft-light',
    difference: 'difference',
    exclusion: 'exclusion',
    hue: 'hue',
    saturation: 'saturation',
    color: 'color',
    luminosity: 'luminosity',
  },
  cursor: {
    auto: 'auto',
    default: 'default',
    pointer: 'pointer',
    wait: 'wait',
    text: 'text',
    move: 'move',
    'not-allowed': 'not-allowed',
    grab: 'grab',
    grabbing: 'grabbing',
    'zoom-in': 'zoom-in',
    'zoom-out': 'zoom-out',
  },
};

// 设计令牌生成器
export class DesignTokenGenerator {
  private tokens: DesignTokens;

  constructor(tokens: DesignTokens = defaultDesignTokens) {
    this.tokens = tokens;
  }

  // 生成CSS变量
  public generateCSSVariables(): string {
    let css = ':root {\n';

    // 递归生成变量
    const generateSection = (obj: any, prefix: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          generateSection(value, `${prefix}${key}-`);
        } else {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${value};\n`;
        }
      });
    };

    generateSection(this.tokens);
    css += '}\n';

    return css;
  }

  // 生成暗色主题CSS变量
  public generateDarkThemeCSSVariables(): string {
    const darkColors = this.generateDarkColors();

    let css = '[data-theme="dark"] {\n';
    Object.entries(darkColors).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });
    css += '}\n';

    return css;
  }

  // 生成暗色主题颜色
  private generateDarkColors(): Record<string, string> {
    return {
      // 文本颜色
      'colors-text-primary': '#f9fafb',
      'colors-text-secondary': '#d1d5db',
      'colors-text-disabled': '#6b7280',
      'colors-text-inverse': '#111827',
      'colors-text-placeholder': '#6b7280',

      // 背景颜色
      'colors-background-primary': '#111827',
      'colors-background-secondary': '#1f2937',
      'colors-background-tertiary': '#374151',
      'colors-background-card': '#1f2937',
      'colors-background-input': '#374151',
      'colors-background-mask': 'rgba(0, 0, 0, 0.8)',
      'colors-background-hover': '#374151',
      'colors-background-active': '#4b5563',

      // 边框颜色
      'colors-border-default': '#374151',
      'colors-border-light': '#4b5563',

      // 阴影颜色
      'colors-shadow-default': 'rgba(0, 0, 0, 0.3)',
      'colors-shadow-light': 'rgba(0, 0, 0, 0.1)',
      'colors-shadow-medium': 'rgba(0, 0, 0, 0.4)',
      'colors-shadow-dark': 'rgba(0, 0, 0, 0.5)',
    };
  }

  // 获取令牌值
  public getToken(path: string): any {
    const keys = path.split('.');
    let value: any = this.tokens;

    for (const key of keys) {
      value = value?.[key];
    }

    return value;
  }

  // 更新令牌
  public updateToken(path: string, value: any): void {
    const keys = path.split('.');
    let current: any = this.tokens;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key && !current[key]) {
        current[key] = {};
      }
      if (key) {
        current = current[key] as any;
      }
    }

    if (current && keys[keys.length - 1]) {
      const lastKey = keys[keys.length - 1];
      if (lastKey) {
        current[lastKey] = value;
      }
    }
  }

  // 转换为CSS自定义属性
  public toCSSCustomProperty(path: string): string {
    return `--${path.replace(/\./g, '-')}`;
  }

  // 从CSS自定义属性获取令牌
  public fromCSSCustomProperty(property: string): string {
    return property.replace(/^--/, '').replace(/-/g, '.');
  }
}

// 导出工具函数
export const createDesignTokens = (tokens?: Partial<DesignTokens>): DesignTokens => {
  return {
    ...defaultDesignTokens,
    ...tokens,
  };
};

export const generateDesignTokenCSS = (tokens?: Partial<DesignTokens>): string => {
  const generator = new DesignTokenGenerator(createDesignTokens(tokens));
  return generator.generateCSSVariables();
};

export const generateDarkThemeCSS = (tokens?: Partial<DesignTokens>): string => {
  const generator = new DesignTokenGenerator(createDesignTokens(tokens));
  return generator.generateDarkThemeCSSVariables();
};

export default DesignTokenGenerator;
