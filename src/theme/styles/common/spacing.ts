/**
 * 间距样式模块
 * 提供 margin 和 padding 相关的间距样式
 * @module theme/styles/common/spacing
 */

import type { StyleObject } from '../../../types/style';

// ==================== 间距值常量 ====================

const SPACING_VALUES = {
  0: 0,
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  auto: 'auto',
} as const;

// ==================== Margin 样式 ====================

/**
 * 无外边距
 */
export const m0: StyleObject = {
  margin: 0,
};

/**
 * 4px 外边距
 */
export const m1: StyleObject = {
  margin: SPACING_VALUES[1],
};

/**
 * 8px 外边距
 */
export const m2: StyleObject = {
  margin: SPACING_VALUES[2],
};

/**
 * 12px 外边距
 */
export const m3: StyleObject = {
  margin: SPACING_VALUES[3],
};

/**
 * 16px 外边距
 */
export const m4: StyleObject = {
  margin: SPACING_VALUES[4],
};

/**
 * 20px 外边距
 */
export const m5: StyleObject = {
  margin: SPACING_VALUES[5],
};

/**
 * 24px 外边距
 */
export const m6: StyleObject = {
  margin: SPACING_VALUES[6],
};

/**
 * 32px 外边距
 */
export const m8: StyleObject = {
  margin: SPACING_VALUES[8],
};

/**
 * 自动外边距
 */
export const mAuto: StyleObject = {
  margin: SPACING_VALUES.auto,
};

// ==================== Margin X/Y 样式 ====================

/**
 * 水平外边距
 */
export const mx0: StyleObject = { marginLeft: 0, marginRight: 0 };
export const mx1: StyleObject = { marginLeft: SPACING_VALUES[1], marginRight: SPACING_VALUES[1] };
export const mx2: StyleObject = { marginLeft: SPACING_VALUES[2], marginRight: SPACING_VALUES[2] };
export const mx3: StyleObject = { marginLeft: SPACING_VALUES[3], marginRight: SPACING_VALUES[3] };
export const mx4: StyleObject = { marginLeft: SPACING_VALUES[4], marginRight: SPACING_VALUES[4] };
export const mx5: StyleObject = { marginLeft: SPACING_VALUES[5], marginRight: SPACING_VALUES[5] };
export const mx6: StyleObject = { marginLeft: SPACING_VALUES[6], marginRight: SPACING_VALUES[6] };
export const mxAuto: StyleObject = { marginLeft: SPACING_VALUES.auto, marginRight: SPACING_VALUES.auto };

/**
 * 垂直外边距
 */
export const my0: StyleObject = { marginTop: 0, marginBottom: 0 };
export const my1: StyleObject = { marginTop: SPACING_VALUES[1], marginBottom: SPACING_VALUES[1] };
export const my2: StyleObject = { marginTop: SPACING_VALUES[2], marginBottom: SPACING_VALUES[2] };
export const my3: StyleObject = { marginTop: SPACING_VALUES[3], marginBottom: SPACING_VALUES[3] };
export const my4: StyleObject = { marginTop: SPACING_VALUES[4], marginBottom: SPACING_VALUES[4] };
export const my5: StyleObject = { marginTop: SPACING_VALUES[5], marginBottom: SPACING_VALUES[5] };
export const my6: StyleObject = { marginTop: SPACING_VALUES[6], marginBottom: SPACING_VALUES[6] };
export const myAuto: StyleObject = { marginTop: SPACING_VALUES.auto, marginBottom: SPACING_VALUES.auto };

// ==================== Margin 单边样式 ====================

/**
 * 上外边距
 */
export const mt0: StyleObject = { marginTop: 0 };
export const mt1: StyleObject = { marginTop: SPACING_VALUES[1] };
export const mt2: StyleObject = { marginTop: SPACING_VALUES[2] };
export const mt3: StyleObject = { marginTop: SPACING_VALUES[3] };
export const mt4: StyleObject = { marginTop: SPACING_VALUES[4] };
export const mt5: StyleObject = { marginTop: SPACING_VALUES[5] };
export const mt6: StyleObject = { marginTop: SPACING_VALUES[6] };
export const mtAuto: StyleObject = { marginTop: SPACING_VALUES.auto };

/**
 * 右外边距
 */
export const mr0: StyleObject = { marginRight: 0 };
export const mr1: StyleObject = { marginRight: SPACING_VALUES[1] };
export const mr2: StyleObject = { marginRight: SPACING_VALUES[2] };
export const mr3: StyleObject = { marginRight: SPACING_VALUES[3] };
export const mr4: StyleObject = { marginRight: SPACING_VALUES[4] };
export const mr5: StyleObject = { marginRight: SPACING_VALUES[5] };
export const mr6: StyleObject = { marginRight: SPACING_VALUES[6] };
export const mrAuto: StyleObject = { marginRight: SPACING_VALUES.auto };

/**
 * 下外边距
 */
export const mb0: StyleObject = { marginBottom: 0 };
export const mb1: StyleObject = { marginBottom: SPACING_VALUES[1] };
export const mb2: StyleObject = { marginBottom: SPACING_VALUES[2] };
export const mb3: StyleObject = { marginBottom: SPACING_VALUES[3] };
export const mb4: StyleObject = { marginBottom: SPACING_VALUES[4] };
export const mb5: StyleObject = { marginBottom: SPACING_VALUES[5] };
export const mb6: StyleObject = { marginBottom: SPACING_VALUES[6] };
export const mbAuto: StyleObject = { marginBottom: SPACING_VALUES.auto };

/**
 * 左外边距
 */
export const ml0: StyleObject = { marginLeft: 0 };
export const ml1: StyleObject = { marginLeft: SPACING_VALUES[1] };
export const ml2: StyleObject = { marginLeft: SPACING_VALUES[2] };
export const ml3: StyleObject = { marginLeft: SPACING_VALUES[3] };
export const ml4: StyleObject = { marginLeft: SPACING_VALUES[4] };
export const ml5: StyleObject = { marginLeft: SPACING_VALUES[5] };
export const ml6: StyleObject = { marginLeft: SPACING_VALUES[6] };
export const mlAuto: StyleObject = { marginLeft: SPACING_VALUES.auto };

// ==================== Padding 样式 ====================

/**
 * 无内边距
 */
export const p0: StyleObject = {
  padding: 0,
};

/**
 * 4px 内边距
 */
export const p1: StyleObject = {
  padding: SPACING_VALUES[1],
};

/**
 * 8px 内边距
 */
export const p2: StyleObject = {
  padding: SPACING_VALUES[2],
};

/**
 * 12px 内边距
 */
export const p3: StyleObject = {
  padding: SPACING_VALUES[3],
};

/**
 * 16px 内边距
 */
export const p4: StyleObject = {
  padding: SPACING_VALUES[4],
};

/**
 * 20px 内边距
 */
export const p5: StyleObject = {
  padding: SPACING_VALUES[5],
};

/**
 * 24px 内边距
 */
export const p6: StyleObject = {
  padding: SPACING_VALUES[6],
};

/**
 * 32px 内边距
 */
export const p8: StyleObject = {
  padding: SPACING_VALUES[8],
};

// ==================== Padding X/Y 样式 ====================

/**
 * 水平内边距
 */
export const px0: StyleObject = { paddingLeft: 0, paddingRight: 0 };
export const px1: StyleObject = { paddingLeft: SPACING_VALUES[1], paddingRight: SPACING_VALUES[1] };
export const px2: StyleObject = { paddingLeft: SPACING_VALUES[2], paddingRight: SPACING_VALUES[2] };
export const px3: StyleObject = { paddingLeft: SPACING_VALUES[3], paddingRight: SPACING_VALUES[3] };
export const px4: StyleObject = { paddingLeft: SPACING_VALUES[4], paddingRight: SPACING_VALUES[4] };
export const px5: StyleObject = { paddingLeft: SPACING_VALUES[5], paddingRight: SPACING_VALUES[5] };
export const px6: StyleObject = { paddingLeft: SPACING_VALUES[6], paddingRight: SPACING_VALUES[6] };

/**
 * 垂直内边距
 */
export const py0: StyleObject = { paddingTop: 0, paddingBottom: 0 };
export const py1: StyleObject = { paddingTop: SPACING_VALUES[1], paddingBottom: SPACING_VALUES[1] };
export const py2: StyleObject = { paddingTop: SPACING_VALUES[2], paddingBottom: SPACING_VALUES[2] };
export const py3: StyleObject = { paddingTop: SPACING_VALUES[3], paddingBottom: SPACING_VALUES[3] };
export const py4: StyleObject = { paddingTop: SPACING_VALUES[4], paddingBottom: SPACING_VALUES[4] };
export const py5: StyleObject = { paddingTop: SPACING_VALUES[5], paddingBottom: SPACING_VALUES[5] };
export const py6: StyleObject = { paddingTop: SPACING_VALUES[6], paddingBottom: SPACING_VALUES[6] };

// ==================== Padding 单边样式 ====================

/**
 * 上内边距
 */
export const pt0: StyleObject = { paddingTop: 0 };
export const pt1: StyleObject = { paddingTop: SPACING_VALUES[1] };
export const pt2: StyleObject = { paddingTop: SPACING_VALUES[2] };
export const pt3: StyleObject = { paddingTop: SPACING_VALUES[3] };
export const pt4: StyleObject = { paddingTop: SPACING_VALUES[4] };
export const pt5: StyleObject = { paddingTop: SPACING_VALUES[5] };
export const pt6: StyleObject = { paddingTop: SPACING_VALUES[6] };

/**
 * 右内边距
 */
export const pr0: StyleObject = { paddingRight: 0 };
export const pr1: StyleObject = { paddingRight: SPACING_VALUES[1] };
export const pr2: StyleObject = { paddingRight: SPACING_VALUES[2] };
export const pr3: StyleObject = { paddingRight: SPACING_VALUES[3] };
export const pr4: StyleObject = { paddingRight: SPACING_VALUES[4] };
export const pr5: StyleObject = { paddingRight: SPACING_VALUES[5] };
export const pr6: StyleObject = { paddingRight: SPACING_VALUES[6] };

/**
 * 下内边距
 */
export const pb0: StyleObject = { paddingBottom: 0 };
export const pb1: StyleObject = { paddingBottom: SPACING_VALUES[1] };
export const pb2: StyleObject = { paddingBottom: SPACING_VALUES[2] };
export const pb3: StyleObject = { paddingBottom: SPACING_VALUES[3] };
export const pb4: StyleObject = { paddingBottom: SPACING_VALUES[4] };
export const pb5: StyleObject = { paddingBottom: SPACING_VALUES[5] };
export const pb6: StyleObject = { paddingBottom: SPACING_VALUES[6] };

/**
 * 左内边距
 */
export const pl0: StyleObject = { paddingLeft: 0 };
export const pl1: StyleObject = { paddingLeft: SPACING_VALUES[1] };
export const pl2: StyleObject = { paddingLeft: SPACING_VALUES[2] };
export const pl3: StyleObject = { paddingLeft: SPACING_VALUES[3] };
export const pl4: StyleObject = { paddingLeft: SPACING_VALUES[4] };
export const pl5: StyleObject = { paddingLeft: SPACING_VALUES[5] };
export const pl6: StyleObject = { paddingLeft: SPACING_VALUES[6] };

// ==================== Gap 样式 ====================

/**
 * 无间隙
 */
export const gap0: StyleObject = { gap: 0 };

/**
 * 4px 间隙
 */
export const gap1: StyleObject = { gap: SPACING_VALUES[1] };

/**
 * 8px 间隙
 */
export const gap2: StyleObject = { gap: SPACING_VALUES[2] };

/**
 * 12px 间隙
 */
export const gap3: StyleObject = { gap: SPACING_VALUES[3] };

/**
 * 16px 间隙
 */
export const gap4: StyleObject = { gap: SPACING_VALUES[4] };

/**
 * 20px 间隙
 */
export const gap5: StyleObject = { gap: SPACING_VALUES[5] };

/**
 * 24px 间隙
 */
export const gap6: StyleObject = { gap: SPACING_VALUES[6] };

/**
 * 32px 间隙
 */
export const gap8: StyleObject = { gap: SPACING_VALUES[8] };

// ==================== 完整间距样式集合 ====================

/**
 * Margin 样式集合
 */
export const marginStyles = {
  m0, m1, m2, m3, m4, m5, m6, m8, mAuto,
  mx0, mx1, mx2, mx3, mx4, mx5, mx6, mxAuto,
  my0, my1, my2, my3, my4, my5, my6, myAuto,
  mt0, mt1, mt2, mt3, mt4, mt5, mt6, mtAuto,
  mr0, mr1, mr2, mr3, mr4, mr5, mr6, mrAuto,
  mb0, mb1, mb2, mb3, mb4, mb5, mb6, mbAuto,
  ml0, ml1, ml2, ml3, ml4, ml5, ml6, mlAuto,
} as const;

/**
 * Padding 样式集合
 */
export const paddingStyles = {
  p0, p1, p2, p3, p4, p5, p6, p8,
  px0, px1, px2, px3, px4, px5, px6,
  py0, py1, py2, py3, py4, py5, py6,
  pt0, pt1, pt2, pt3, pt4, pt5, pt6,
  pr0, pr1, pr2, pr3, pr4, pr5, pr6,
  pb0, pb1, pb2, pb3, pb4, pb5, pb6,
  pl0, pl1, pl2, pl3, pl4, pl5, pl6,
} as const;

/**
 * Gap 样式集合
 */
export const gapStyles = {
  gap0, gap1, gap2, gap3, gap4, gap5, gap6, gap8,
} as const;

/**
 * 完整间距样式集合
 */
export const spacingStyles = {
  margin: marginStyles,
  padding: paddingStyles,
  gap: gapStyles,
  values: SPACING_VALUES,
} as const;

export default spacingStyles;
