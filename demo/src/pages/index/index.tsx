import React from 'react';
import { View, Text } from '@tarojs/components';
import { Button, Card, Space, Badge } from 'taro-uno-ui';
import Taro from '@tarojs/taro';
import './index.scss';

const Index: React.FC = () => {
  const componentCategories = [
    { name: '基础组件', count: 4, icon: '📦' },
    { name: '表单组件', count: 11, icon: '📝' },
    { name: '布局组件', count: 4, icon: '📐' },
    { name: '显示组件', count: 5, icon: '🎨' },
    { name: '反馈组件', count: 5, icon: '💬' },
    { name: '导航组件', count: 3, icon: '🧭' },
  ];

  const features = [
    { title: '跨平台', desc: '支持微信/H5/RN等多端' },
    { title: 'TypeScript', desc: '完整类型定义' },
    { title: '主题定制', desc: '灵活的样式变量' },
    { title: 'Hooks', desc: '丰富的 React Hooks' },
  ];

  const handleNavigate = () => {
    Taro.switchTab({ url: '/pages/components/index' });
  };

  return (
    <View className="index">
      {/* Hero Section */}
      <View className="index__hero">
        <Text className="index__logo">🎨</Text>
        <Text className="index__title">Taro Uno UI</Text>
        <Text className="index__subtitle">为 Taro 生态打造的跨平台组件库</Text>
        <Badge content="v1.0.2" type="primary">
          <Text className="index__version-text">最新版本</Text>
        </Badge>
      </View>

      {/* Features */}
      <View className="index__section">
        <Text className="index__section-title">✨ 特性</Text>
        <View className="index__features">
          {features.map((feature, idx) => (
            <View key={idx} className="index__feature-item">
              <Text className="index__feature-title">{feature.title}</Text>
              <Text className="index__feature-desc">{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Component Categories */}
      <View className="index__section">
        <Text className="index__section-title">📚 组件分类</Text>
        <Space direction="vertical" size="medium" style={{ width: '100%' }}>
          {componentCategories.map((category, idx) => (
            <Card key={idx} className="index__category-card">
              <View className="index__category">
                <Text className="index__category-icon">{category.icon}</Text>
                <View className="index__category-info">
                  <Text className="index__category-name">{category.name}</Text>
                  <Text className="index__category-count">{category.count} 个组件</Text>
                </View>
              </View>
            </Card>
          ))}
        </Space>
      </View>

      {/* CTA */}
      <View className="index__cta">
        <Button type="primary" size="large" onClick={handleNavigate}>
          查看组件示例
        </Button>
      </View>
    </View>
  );
};

export default Index;
