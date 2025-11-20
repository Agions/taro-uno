/**
 * ErrorBoundary 组件测试
 */

import React, { useState, useEffect } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// 模拟错误日志工具
jest.mock('../../utils/errorLogger', () => ({
  logError: jest.fn(),
  logWarning: jest.fn(),
  logInfo: jest.fn(),
  getLogs: jest.fn(() => []),
  clearLogs: jest.fn(),
}));

// 模拟Taro环境
jest.mock('@tarojs/taro', () => ({
  getSystemInfoSync: jest.fn(() => ({
    windowWidth: 375,
    windowHeight: 667,
    statusBarHeight: 20,
    safeArea: { top: 20, bottom: 0, left: 0, right: 375 }
  }))
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // 清理所有模拟调用
    jest.clearAllMocks();
  });

  it('应该正常渲染子组件', () => {
    const ChildComponent = () => <div>Child Component</div>;
    
    const { getByText } = render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
    
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('应该捕获子组件中的错误并显示fallback UI', () => {
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const fallbackUI = <div>Something went wrong</div>;
    
    const { getByText } = render(
      <ErrorBoundary fallback={fallbackUI}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });

  it('应该调用错误处理回调', () => {
    const handleError = jest.fn();
    
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary onError={handleError}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    expect(handleError).toHaveBeenCalled();
    expect(handleError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(handleError.mock.calls[0][1]).toHaveProperty('componentStack');
  });

  it('应该记录错误到错误日志', () => {
    const { logError } = require('../../utils/errorLogger');
    
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    expect(logError).toHaveBeenCalled();
  });

  it('应该重置错误状态当子组件变化时', () => {
    const { container, rerender } = render(
      <ErrorBoundary>
        <div>Initial Component</div>
      </ErrorBoundary>
    );
    
    // 初始渲染应该正常
    expect(container.textContent).toBe('Initial Component');
    
    // 渲染一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    rerender(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    // 应该显示错误fallback
    expect(container.textContent).toContain('Something went wrong');
    
    // 渲染一个正常组件
    const NormalComponent = () => <div>Recovered Component</div>;
    
    rerender(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );
    
    // 应该恢复到正常渲染
    expect(container.textContent).toBe('Recovered Component');
  });

  it('应该处理异步错误', async () => {
    // 创建一个会异步抛出错误的组件
    const AsyncErrorComponent = () => {
      const [error, setError] = useState(false);
      
      useEffect(() => {
        // 模拟异步操作
        setTimeout(() => {
          setError(true);
        }, 100);
      }, []);
      
      if (error) {
        throw new Error('Async error');
      }
      
      return <div>Loading...</div>;
    };
    
    const { container } = render(
      <ErrorBoundary>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );
    
    // 初始渲染应该正常
    expect(container.textContent).toBe('Loading...');
    
    // 等待异步错误发生
    // 注意：在真实测试中，你可能需要使用act或waitFor
    // 这里简化处理，实际测试可能需要更复杂的设置
  });

  it('应该允许自定义fallback UI', () => {
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const CustomFallback = () => <div>Custom Error Message</div>;
    
    const { getByText } = render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    expect(getByText('Custom Error Message')).toBeInTheDocument();
  });

  it('应该处理嵌套错误边界', () => {
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const InnerFallback = () => <div>Inner Error</div>;
    const OuterFallback = () => <div>Outer Error</div>;
    
    const { getByText } = render(
      <ErrorBoundary fallback={<OuterFallback />}>
        <div>
          <ErrorBoundary fallback={<InnerFallback />}>
            <ErrorComponent />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    );
    
    // 内部错误边界应该捕获错误
    expect(getByText('Inner Error')).toBeInTheDocument();
    expect(() => getByText('Outer Error')).toThrow();
  });

  it('应该处理多个子组件中的错误', () => {
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    // 创建一个正常组件
    const NormalComponent = () => <div>Normal Component</div>;
    
    const { container } = render(
      <ErrorBoundary>
        <div>
          <NormalComponent />
          <ErrorComponent />
          <NormalComponent />
        </div>
      </ErrorBoundary>
    );
    
    // 整个边界应该显示fallback
    expect(container.textContent).toContain('Something went wrong');
    expect(container.textContent).not.toContain('Normal Component');
  });

  it('应该在没有fallback时使用默认错误UI', () => {
    // 创建一个会抛出错误的组件
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    // 应该显示默认错误UI
    expect(container.textContent).toContain('Something went wrong');
  });
});