import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { LazyComponent, createLazyComponent } from '@taro-uno/ui';
import { Loading } from '../../../feedback/Loading';

// 模拟一个重型组件（通过setTimeout模拟加载延迟）
const HeavyComponent: React.FC<{ data?: string }> = ({ data }) => {
  return (
    <View className="heavy-component">
      <Text className="heavy-component__title">重型组件</Text>
      <Text className="heavy-component__content">
        这是一个需要懒加载的重型组件，包含大量内容。
      </Text>
      {data && <Text className="heavy-component__data">传递的数据：{data}</Text>}
    </View>
  );
};

// 创建懒加载组件（使用动态导入，在实际项目中应该是 import('./HeavyComponent')）
const LazyHeavyComponent = createLazyComponent(() => 
  new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve({ default: HeavyComponent });
    }, 2000);
  })
);

// 创建带重试功能的懒加载组件
const RetryComponent = createLazyComponent(() => 
  new Promise((resolve, reject) => {
    // 第一次加载失败，第二次加载成功
    if (!window['hasFailedOnce']) {
      window['hasFailedOnce'] = true;
      setTimeout(() => reject(new Error('加载失败')), 1000);
    } else {
      setTimeout(() => resolve({ default: HeavyComponent }), 1000);
    }
  }),
  { retryCount: 2, retryDelay: 1000 }
);

const LazyComponentExample: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [showRetryComponent, setShowRetryComponent] = useState(false);
  const [showCustomComponent, setShowCustomComponent] = useState(false);

  return (
    <View className="lazy-component-example">
      <Text className="example-title">LazyComponent 示例</Text>

      {/* 基本用法示例 */}
      <View className="example-section">
        <Text className="section-title">基本用法</Text>
        <Button onClick={() => setShowComponent(true)} className="test-button">
          加载重型组件
        </Button>
        {showComponent && (
          <LazyComponent component={LazyHeavyComponent} />
        )}
      </View>

      {/* 带属性的懒加载组件 */}
      <View className="example-section">
        <Text className="section-title">带属性的组件</Text>
        <Button onClick={() => setShowComponent(true)} className="test-button">
          加载带属性的组件
        </Button>
        {showComponent && (
          <LazyComponent 
            component={LazyHeavyComponent} 
            props={{ data: '这是传递给懒加载组件的数据' }} 
          />
        )}
      </View>

      {/* 自定义加载界面 */}
      <View className="example-section">
        <Text className="section-title">自定义加载界面</Text>
        <Button onClick={() => setShowComponent(true)} className="test-button">
          加载组件（自定义加载界面）
        </Button>
        {showComponent && (
          <LazyComponent 
            component={LazyHeavyComponent} 
            fallback={
              <View className="custom-loading">
                <Loading type="spinner" size="lg" />
                <Text className="loading-text">组件正在加载中...</Text>
              </View>
            }
          />
        )}
      </View>

      {/* 自定义错误界面 */}
      <View className="example-section">
        <Text className="section-title">自定义错误界面</Text>
        <Button onClick={() => setShowRetryComponent(true)} className="test-button">
          加载组件（自定义错误界面）
        </Button>
        {showRetryComponent && (
          <LazyComponent 
            component={RetryComponent} 
            errorFallback={
              <View className="custom-error">
                <Text className="error-title">组件加载失败</Text>
                <Text className="error-message">请稍后重试</Text>
                <Button onClick={() => {
                  delete window['hasFailedOnce'];
                  setShowRetryComponent(false);
                  setTimeout(() => setShowRetryComponent(true), 0);
                }} className="retry-button">
                  重试
                </Button>
              </View>
            }
          />
        )}
      </View>

      {/* 预加载组件 */}
      <View className="example-section">
        <Text className="section-title">预加载组件</Text>
        <Text className="section-description">
          组件会在1秒后自动预加载，点击按钮时会立即显示
        </Text>
        <Button onClick={() => setShowCustomComponent(true)} className="test-button">
          显示预加载组件
        </Button>
        <LazyComponent 
          component={LazyHeavyComponent} 
          preload={true} 
          preloadDelay={1000}
        />
      </View>

      {/* 不同加载策略示例 */}
      <View className="example-section">
        <Text className="section-title">加载策略</Text>
        <Text className="section-description">
          - eager: 立即加载\n- lazy: 按需加载（默认）\n- prefetch: 后台预加载
        </Text>
        <View className="strategy-buttons">
          <Button onClick={() => setShowComponent(true)} className="strategy-button">
            Lazy (默认)
          </Button>
        </View>
        {showComponent && (
          <LazyComponent component={LazyHeavyComponent} />
        )}
      </View>
    </View>
  );
};

export default LazyComponentExample;