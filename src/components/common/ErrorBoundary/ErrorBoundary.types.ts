import type { ErrorInfo, ReactNode } from 'react';

/** ErrorBoundary 组件 Props */
export interface ErrorBoundaryProps {
  /** 子元素 */
  children: ReactNode;
  /** 自定义错误回退UI */
  fallback?: ReactNode;
  /** 错误回调 */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/** ErrorBoundary 组件状态 */
export interface ErrorBoundaryState {
  /** 是否有错误 */
  hasError: boolean;
  /** 错误对象 */
  error: Error | null;
  /** 错误信息 */
  errorInfo: ErrorInfo | null;
}
