/**
 * 排版基础样式模块
 * 提供文本排版相关的基础样式
 * @module theme/styles/base/typography
 */

import type { StyleObject } from '../../../types/style';

// ==================== 字体大小样式 ====================

/**
 * 超小字体样式
 */
export const textXs: StyleObject = {
  fontSize: '12px',
  lineHeight: 1.5,
};

/**
 * 小字体样式
 */
export const textSm: StyleObject = {
  fontSize: '14px',
  lineHeight: 1.5,
};

/**
 * 基础字体样式
 */
export const textBase: StyleObject = {
  fontSize: '16px',
  lineHeight: 1.5,
};

/**
 * 大字体样式
 */
export const textLg: StyleObject = {
  fontSize: '18px',
  lineHeight: 1.5,
};

/**
 * 超大字体样式
 */
export const textXl: StyleObject = {
  fontSize: '20px',
  lineHeight: 1.5,
};

/**
 * 2倍大字体样式
 */
export const text2xl: StyleObject = {
  fontSize: '24px',
  lineHeight: 1.25,
};

/**
 * 3倍大字体样式
 */
export const text3xl: StyleObject = {
  fontSize: '30px',
  lineHeight: 1.25,
};

/**
 * 4倍大字体样式
 */
export const text4xl: StyleObject = {
  fontSize: '36px',
  lineHeight: 1.25,
};

// ==================== 字体粗细样式 ====================

/**
 * 细体样式
 */
export const fontThin: StyleObject = {
  fontWeight: 100,
};

/**
 * 超细体样式
 */
export const fontExtralight: StyleObject = {
  fontWeight: 200,
};

/**
 * 轻体样式
 */
export const fontLight: StyleObject = {
  fontWeight: 300,
};

/**
 * 正常体样式
 */
export const fontNormal: StyleObject = {
  fontWeight: 400,
};

/**
 * 中等体样式
 */
export const fontMedium: StyleObject = {
  fontWeight: 500,
};

/**
 * 半粗体样式
 */
export const fontSemibold: StyleObject = {
  fontWeight: 600,
};

/**
 * 粗体样式
 */
export const fontBold: StyleObject = {
  fontWeight: 700,
};

/**
 * 超粗体样式
 */
export const fontExtrabold: StyleObject = {
  fontWeight: 800,
};

/**
 * 黑体样式
 */
export const fontBlack: StyleObject = {
  fontWeight: 900,
};

// ==================== 行高样式 ====================

/**
 * 无行高样式
 */
export const leadingNone: StyleObject = {
  lineHeight: 1,
};

/**
 * 紧凑行高样式
 */
export const leadingTight: StyleObject = {
  lineHeight: 1.25,
};

/**
 * 较紧行高样式
 */
export const leadingSnug: StyleObject = {
  lineHeight: 1.375,
};

/**
 * 正常行高样式
 */
export const leadingNormal: StyleObject = {
  lineHeight: 1.5,
};

/**
 * 宽松行高样式
 */
export const leadingRelaxed: StyleObject = {
  lineHeight: 1.625,
};

/**
 * 松散行高样式
 */
export const leadingLoose: StyleObject = {
  lineHeight: 2,
};

// ==================== 文本对齐样式 ====================

/**
 * 左对齐样式
 */
export const textLeft: StyleObject = {
  textAlign: 'left',
};

/**
 * 居中对齐样式
 */
export const textCenter: StyleObject = {
  textAlign: 'center',
};

/**
 * 右对齐样式
 */
export const textRight: StyleObject = {
  textAlign: 'right',
};

/**
 * 两端对齐样式
 */
export const textJustify: StyleObject = {
  textAlign: 'justify',
};

// ==================== 文本装饰样式 ====================

/**
 * 下划线样式
 */
export const underline: StyleObject = {
  textDecoration: 'underline',
};

/**
 * 删除线样式
 */
export const lineThrough: StyleObject = {
  textDecoration: 'line-through',
};

/**
 * 无装饰样式
 */
export const noUnderline: StyleObject = {
  textDecoration: 'none',
};

// ==================== 文本转换样式 ====================

/**
 * 大写样式
 */
export const uppercase: StyleObject = {
  textTransform: 'uppercase',
};

/**
 * 小写样式
 */
export const lowercase: StyleObject = {
  textTransform: 'lowercase',
};

/**
 * 首字母大写样式
 */
export const capitalize: StyleObject = {
  textTransform: 'capitalize',
};

/**
 * 正常大小写样式
 */
export const normalCase: StyleObject = {
  textTransform: 'none',
};

// ==================== 字母间距样式 ====================

/**
 * 更紧字母间距样式
 */
export const trackingTighter: StyleObject = {
  letterSpacing: '-0.05em',
};

/**
 * 紧字母间距样式
 */
export const trackingTight: StyleObject = {
  letterSpacing: '-0.025em',
};

/**
 * 正常字母间距样式
 */
export const trackingNormal: StyleObject = {
  letterSpacing: '0',
};

/**
 * 宽字母间距样式
 */
export const trackingWide: StyleObject = {
  letterSpacing: '0.025em',
};

/**
 * 更宽字母间距样式
 */
export const trackingWider: StyleObject = {
  letterSpacing: '0.05em',
};

/**
 * 最宽字母间距样式
 */
export const trackingWidest: StyleObject = {
  letterSpacing: '0.1em',
};

// ==================== 文本换行样式 ====================

/**
 * 不换行样式
 */
export const whitespaceNowrap: StyleObject = {
  whiteSpace: 'nowrap',
};

/**
 * 正常换行样式
 */
export const whitespaceNormal: StyleObject = {
  whiteSpace: 'normal',
};

/**
 * 保留空白样式
 */
export const whitespacePre: StyleObject = {
  whiteSpace: 'pre',
};

/**
 * 保留空白并换行样式
 */
export const whitespacePreWrap: StyleObject = {
  whiteSpace: 'pre-wrap',
};

/**
 * 断词样式
 */
export const wordBreak: StyleObject = {
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
};

// ==================== 完整排版样式集合 ====================

/**
 * 字体大小样式集合
 */
export const fontSizeStyles = {
  xs: textXs,
  sm: textSm,
  base: textBase,
  lg: textLg,
  xl: textXl,
  '2xl': text2xl,
  '3xl': text3xl,
  '4xl': text4xl,
} as const;

/**
 * 字体粗细样式集合
 */
export const fontWeightStyles = {
  thin: fontThin,
  extralight: fontExtralight,
  light: fontLight,
  normal: fontNormal,
  medium: fontMedium,
  semibold: fontSemibold,
  bold: fontBold,
  extrabold: fontExtrabold,
  black: fontBlack,
} as const;

/**
 * 行高样式集合
 */
export const lineHeightStyles = {
  none: leadingNone,
  tight: leadingTight,
  snug: leadingSnug,
  normal: leadingNormal,
  relaxed: leadingRelaxed,
  loose: leadingLoose,
} as const;

/**
 * 文本对齐样式集合
 */
export const textAlignStyles = {
  left: textLeft,
  center: textCenter,
  right: textRight,
  justify: textJustify,
} as const;

/**
 * 文本装饰样式集合
 */
export const textDecorationStyles = {
  underline,
  lineThrough,
  none: noUnderline,
} as const;

/**
 * 文本转换样式集合
 */
export const textTransformStyles = {
  uppercase,
  lowercase,
  capitalize,
  none: normalCase,
} as const;

/**
 * 字母间距样式集合
 */
export const letterSpacingStyles = {
  tighter: trackingTighter,
  tight: trackingTight,
  normal: trackingNormal,
  wide: trackingWide,
  wider: trackingWider,
  widest: trackingWidest,
} as const;

/**
 * 完整排版样式集合
 */
export const typographyStyles = {
  fontSize: fontSizeStyles,
  fontWeight: fontWeightStyles,
  lineHeight: lineHeightStyles,
  textAlign: textAlignStyles,
  textDecoration: textDecorationStyles,
  textTransform: textTransformStyles,
  letterSpacing: letterSpacingStyles,
  whitespace: {
    nowrap: whitespaceNowrap,
    normal: whitespaceNormal,
    pre: whitespacePre,
    preWrap: whitespacePreWrap,
  },
  wordBreak,
} as const;

export default typographyStyles;
