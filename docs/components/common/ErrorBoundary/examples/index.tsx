import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { ErrorBoundary } from '@taro-uno/ui';

// 会抛出错误的组件
const BuggyComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('测试错误：组件渲染失败');
  }
  return <Text>这个组件正常工作</Text>;
};

// 自定义错误组件
const CustomErrorFallback: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <View className="custom-error">
      <Text className="custom-error__title">哎呀，出错了！</Text>
      <Text className="custom-error__message">很抱歉，页面出现了问题。</Text>
      <Button onClick={onReset} className="custom-error__button">
        重试
      </Button>
    </View>
  );
};

const ErrorBoundaryExample: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [shouldThrowNested, setShouldThrowNested] = useState(false);

  const handleReset = () => {
    setShouldThrow(false);
  };

  const handleResetNested = () => {
    setShouldThrowNested(false);
  };

  return (
    <View className="error-boundary-example">
      <Text className="example-title">ErrorBoundary 示例</Text>

      {/* 基本用法示例 */}
      <View className="example-section">
        <Text className="section-title">基本用法</Text>
        <Button onClick={() => setShouldThrow(true)} className="test-button">
          触发错误
        </Button>
        <ErrorBoundary>
          <BuggyComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
      </View>

      {/* 自定义错误界面示例 */}
      <View className="example-section">
        <Text className="section-title">自定义错误界面</Text>
        <Button onClick={() => setShouldThrow(true)} className="test-button">
          触发错误
        </Button>
        <ErrorBoundary
          fallback={<CustomErrorFallback onReset={handleReset} />}
        >
          <BuggyComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
      </View>

      {/* 带重试功能的示例 */}
      <View className="example-section">
        <Text className="section-title">带重试功能</Text>
        <Button onClick={() => setShouldThrow(true)} className="test-button">
          触发错误
        </Button>
        <ErrorBoundary
          fallback={
            <View className="retry-error">
              <Text className="retry-error__message">组件加载失败</Text>
              <Button onClick={handleReset} className="retry-error__button">
                重试
              </Button>
            </View>
          }
        >
          <BuggyComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
      </View>

      {/* 多层嵌套的错误边界示例 */}
      <View className="example-section">
        <Text className="section-title">多层嵌套错误边界</Text>
        <Button onClick={() => setShouldThrowNested(true)} className="test-button">
          触发内层错误
        </Button>
        <ErrorBoundary
          fallback={<Text className="outer-error">外层错误边界捕获到错误</Text>}
        >
          <Text>外层组件内容</Text>
          <ErrorBoundary
            fallback={<Text className="inner-error">内层错误边界捕获到错误</Text>}
          >
            <BuggyComponent shouldThrow={shouldThrowNested} />
          </ErrorBoundary>
          <Text>外层组件其他内容</Text>
        </ErrorBoundary>
      </View>
    </View>
  );
};

export default ErrorBoundaryExample;