/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './packages/**/*.{js,jsx,ts,tsx}',
    './packages/**/*.{html,vue}'
  ],
  theme: {
    extend: {
      // 颜色系统 - 基于设计令牌
      colors: {
        // 主色调系统
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
          900: '#0c4a6e'
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
          900: '#18181b'
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
          900: '#14532d'
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
          900: '#78350f'
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
          900: '#7f1d1d'
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
          900: '#1e3a8a'
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
          900: '#18181b'
        },

        // 语义化颜色
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          disabled: '#9ca3af',
          inverse: '#ffffff',
          link: '#0ea5e9',
          placeholder: '#9ca3af'
        },
        background: {
          primary: '#ffffff',
          secondary: '#f9fafb',
          tertiary: '#f3f4f6',
          card: '#ffffff',
          input: '#f9fafb',
          mask: 'rgba(0, 0, 0, 0.5)',
          hover: '#f9fafb',
          active: '#f3f4f6'
        },
        border: {
          default: '#e5e7eb',
          focus: '#0ea5e9',
          error: '#ef4444',
          success: '#22c55e',
          warning: '#f59e0b',
          light: '#f3f4f6'
        },

        // CSS变量颜色
        theme: {
          primary: 'var(--colors-primary-500)',
          secondary: 'var(--colors-secondary-500)',
          success: 'var(--colors-success-500)',
          warning: 'var(--colors-warning-500)',
          error: 'var(--colors-error-500)',
          info: 'var(--colors-info-500)',
          text: 'var(--colors-text-primary)',
          'text-secondary': 'var(--colors-text-secondary)',
          background: 'var(--colors-background-primary)',
          border: 'var(--colors-border-default)'
        }
      },

      // 间距系统 - 基于设计令牌
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1': '0.25rem',     // 4px
        '1.5': '0.375rem',   // 6px
        '2': '0.5rem',      // 8px
        '2.5': '0.625rem',   // 10px
        '3': '0.75rem',     // 12px
        '3.5': '0.875rem',   // 14px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '7': '1.75rem',     // 28px
        '8': '2rem',        // 32px
        '9': '2.25rem',     // 36px
        '10': '2.5rem',     // 40px
        '11': '2.75rem',    // 44px
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px
        '16': '4rem',       // 64px
        '18': '4.5rem',     // 72px
        '20': '5rem',       // 80px
        '24': '6rem',       // 96px
        '28': '7rem',       // 112px
        '32': '8rem',       // 128px
        '36': '9rem',       // 144px
        '40': '10rem',      // 160px
        '44': '11rem',      // 176px
        '48': '12rem',      // 192px
        '52': '13rem',      // 208px
        '56': '14rem',      // 224px
        '60': '15rem',      // 240px
        '64': '16rem',      // 256px
        '72': '18rem',      // 288px
        '80': '20rem',      // 320px
        '96': '24rem',      // 384px

        // CSS变量间距
        'theme-xs': 'var(--spacing-1)',
        'theme-sm': 'var(--spacing-2)',
        'theme-md': 'var(--spacing-4)',
        'theme-lg': 'var(--spacing-6)',
        'theme-xl': 'var(--spacing-8)',
        'theme-2xl': 'var(--spacing-12)'
      },

      // 圆角系统 - 基于设计令牌
      borderRadius: {
        none: '0',
        xs: '0.125rem',    // 2px
        sm: '0.25rem',     // 4px
        md: '0.5rem',      // 8px
        lg: '0.75rem',     // 12px
        xl: '1rem',        // 16px
        '2xl': '1.25rem',  // 20px
        '3xl': '1.5rem',   // 24px
        full: '9999px',

        // CSS变量圆角
        'theme-sm': 'var(--border-radius-sm)',
        'theme-md': 'var(--border-radius-md)',
        'theme-lg': 'var(--border-radius-lg)',
        'theme-xl': 'var(--border-radius-xl)',
        'theme-full': 'var(--border-radius-full)'
      },

      // 字体系统 - 基于设计令牌
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Fira Code', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      fontSize: {
        '3xs': ['0.625rem', { lineHeight: '1rem' }],    // 10px
        '2xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'sm': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'base': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        'xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '4xl': ['3rem', { lineHeight: '1' }],            // 48px
        '5xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '6xl': ['4.5rem', { lineHeight: '1' }],        // 72px
        '7xl': ['6rem', { lineHeight: '1' }],           // 96px
        '8xl': ['8rem', { lineHeight: '1' }],           // 128px
        '9xl': ['10rem', { lineHeight: '1' }],          // 160px

        // CSS变量字体大小
        'theme-xs': 'var(--font-size-xs)',
        'theme-sm': 'var(--font-size-sm)',
        'theme-base': 'var(--font-size-base)',
        'theme-lg': 'var(--font-size-lg)',
        'theme-xl': 'var(--font-size-xl)',
        'theme-2xl': 'var(--font-size-2xl)',
        'theme-3xl': 'var(--font-size-3xl)',
        'theme-4xl': 'var(--font-size-4xl)',
        'theme-5xl': 'var(--font-size-5xl)'
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
        black: '900'
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
        '10': '3.5'
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      },

      // 阴影系统 - 基于设计令牌
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

        // CSS变量阴影
        'theme-sm': 'var(--box-shadow-sm)',
        'theme-md': 'var(--box-shadow-md)',
        'theme-lg': 'var(--box-shadow-lg)',
        'theme-xl': 'var(--box-shadow-xl)',
        'theme-2xl': 'var(--box-shadow-2xl)'
      },

      // 动画系统 - 基于设计令牌
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'slide-in-down': 'slideInDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'pulse': 'pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',

        // CSS变量动画
        'theme-fade-in': 'var(--animation-fade-in)',
        'theme-slide-up': 'var(--animation-slide-up)',
        'theme-slide-down': 'var(--animation-slide-down)',
        'theme-scale-in': 'var(--animation-scale-in)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },

      // 过渡系统 - 基于设计令牌
      transitionTimingFunction: {
        'theme-linear': 'var(--animation-easing-linear)',
        'theme-ease': 'var(--animation-easing-ease)',
        'theme-ease-in': 'var(--animation-easing-ease-in)',
        'theme-ease-out': 'var(--animation-easing-ease-out)',
        'theme-ease-in-out': 'var(--animation-easing-ease-in-out)',
        'theme-bounce': 'var(--animation-easing-bounce)',
        'theme-elastic': 'var(--animation-easing-elastic)'
      },
      transitionDuration: {
        'theme-fast': 'var(--animation-duration-100)',
        'theme-normal': 'var(--animation-duration-300)',
        'theme-slow': 'var(--animation-duration-500)'
      },

      // Z-index系统 - 基于设计令牌
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
        'max': '9999'
      },

      // 响应式断点 - 基于设计令牌
      screens: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
  important: true, // 用于避免样式冲突
  corePlugins: {
    preflight: false // 禁用 Tailwind 的基础样式重置
  },
  darkMode: 'class', // 支持基于class的暗色模式

  // 自定义配置
  future: {
    hoverOnlyWhenSupported: true
  }
};
