/**
 * Rate 评分组件
 * 
 * 企业级评分组件，支持：
 * - 完整和半星评分
 * - 自定义字符和颜色
 * - 键盘导航支持
 * - 工具提示显示
 * - 无障碍访问优化
 * - 只读和禁用状态
 * - 多种尺寸配置
 * - 响应式设计
 */

export { Rate, RateComponent } from './Rate';
export type {
  RateProps,
  RateRef,
  RateSize,
  RateCharacter,
  RateUtils,
  StarState,
  StarProps,
} from './Rate.types';
export { rateStyles } from './Rate.styles';

// 默认导出
export { Rate as default } from './Rate';