import { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { logError } from '../../utils/errorLogger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
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
    logError(error, errorInfo);

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

  override render() {
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
          {process.env['NODE_ENV'] === 'development' && this.state.errorInfo && (
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
