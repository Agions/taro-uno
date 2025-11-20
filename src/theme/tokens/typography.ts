/**
 * 字体设计令牌
 * 统一管理所有字体相关的设计令牌
 */

export interface TypographyTokens {
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
    '3xs': string;
    '2xs': string;
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
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
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
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
}

// 默认字体令牌
export const typographyTokens: TypographyTokens = {
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
    3: '1.75',
    4: '2',
    5: '2.25',
    6: '2.5',
    7: '2.75',
    8: '3',
    9: '3.25',
    10: '3.5',
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
};
