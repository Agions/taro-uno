/**
 * Pagination 分页组件
 * 
 * 企业级分页组件，支持：
 * - 多种尺寸和样式配置
 * - 简单模式和完整模式
 * - 快速跳转和页码选择
 * - 完全的键盘导航支持
 * - 无障碍访问优化
 * - 跨平台兼容性
 */

export { Pagination, PaginationComponent } from './Pagination';
export type { PaginationProps, PaginationRef, PaginationSize, PaginationPosition, PaginationAlign } from './Pagination.types';
export { paginationStyles } from './Pagination.styles';

// 默认导出
export { Pagination as default } from './Pagination';