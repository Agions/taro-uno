/**
 * 颜色设计令牌
 * 统一管理所有颜色相关的设计令牌
 */

export interface ColorScale {
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
}

export interface SemanticColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled?: string;
  inverse?: string;
  placeholder?: string;
  link?: string;
  card?: string;
  input?: string;
  mask?: string;
  hover?: string;
  active?: string;
}

export interface ColorTokens {
  // 基础颜色比例尺
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  neutral: ColorScale;

  // 语义化颜色
  text: SemanticColors;
  background: SemanticColors;
  border: {
    default: string;
    light: string;
    focus?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  shadow: {
    default: string;
    light: string;
    medium: string;
    dark: string;
    colored: string;
  };
  status: {
    online: string;
    offline: string;
    busy: string;
    away: string;
  };
  interactive: {
    hover: string;
    active: string;
    focus: string;
    selected: string;
    disabled: string;
  };
}

// 默认颜色令牌
export const colorTokens: ColorTokens = {
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
    light: '#f3f4f6',
    focus: '#0ea5e9',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
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
};

// 暗色主题颜色令牌
export const darkColorTokens: Partial<ColorTokens> = {
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
    disabled: '#6b7280',
    inverse: '#111827',
    link: '#60a5fa',
    placeholder: '#6b7280',
  },
  background: {
    primary: '#111827',
    secondary: '#1f2937',
    tertiary: '#374151',
    card: '#1f2937',
    input: '#374151',
    mask: 'rgba(0, 0, 0, 0.8)',
    hover: '#374151',
    active: '#4b5563',
  },
  border: {
    default: '#374151',
    light: '#4b5563',
    focus: '#60a5fa',
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
  },
  shadow: {
    default: 'rgba(0, 0, 0, 0.3)',
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.5)',
    colored: 'rgba(96, 165, 250, 0.15)',
  },
};
