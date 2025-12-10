// 导出动画相关工具函数
export {
  createProgressAnimation,
  createAnimation,
  easingFunctions,
  throttledAnimationUpdate,
  animationBatchManager,
  AnimationBatchManager,
} from './animation';

// 导出进度计算相关工具函数
export {
  calculateCircleDimensions,
  calculateCircleProgress,
  calculateDashboardProgress,
  calculateLineWidth,
  getStatusColor,
  validatePercent,
  calculateAnimationDuration,
  calculateSegmentPositions,
  getLineCapStyle,
  calculateBorderRadius,
  generateId,
  formatProgressValue,
  calculateProgressStatus,
} from './progress-calculator';
