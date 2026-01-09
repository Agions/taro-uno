import { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { error as logError } from '../../../utils/logger';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // 记录错误日志
    logError(`Error caught by ErrorBoundary: ${error.message}`, {
      error,
      componentStack: errorInfo.componentStack,
    });

    // 调用自定义错误处理回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      // 如果有自定义fallback，则使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <View className="error-boundary">
          <Text className="error-boundary__title">出错了</Text>
          <Text className="error-boundary__message">{this.state.error?.message || '应用遇到了一个错误'}</Text>
          {import.meta.env.DEV && this.state.errorInfo && (
            <View className="error-boundary__details">
              <Text className="error-boundary__details-title">错误详情:</Text>
              <Text className="error-boundary__details-text">{this.state.errorInfo.componentStack}</Text>
            </View>
          )}
          <Button onClick={this.handleReset} className="error-boundary__reset">
            重试
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
