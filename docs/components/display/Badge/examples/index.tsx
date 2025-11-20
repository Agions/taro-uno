import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import { Badge } from '../../../../src/components/display/Badge';

// 基本数字徽标示例
function BasicBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">基本数字徽标</Text>
      <View className="content">
        <Badge count={5}>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
    </View>
  );
}

// 红点模式示例
function DotBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">红点模式</Text>
      <View className="content">
        <Badge dot>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
    </View>
  );
}

// 溢出数字显示示例
function OverflowBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">溢出数字显示</Text>
      <View className="content">
        <Badge count={120} overflowCount={99}>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
    </View>
  );
}

// 显示零值示例
function ZeroBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">显示零值</Text>
      <View className="content">
        <Badge count={0} showZero>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
    </View>
  );
}

// 自定义样式示例
function CustomBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">自定义样式</Text>
      <View className="content">
        <Badge count={5} style={{ backgroundColor: '#ff4d4f' }}>
          <Button type="primary">按钮</Button>
        </Badge>
      </View>
    </View>
  );
}

// 不带子元素使用示例
function StandaloneBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">不带子元素使用</Text>
      <View className="content">
        <Badge count={5} />
      </View>
    </View>
  );
}

// 多种用法组合示例
function CombinedBadge() {
  return (
    <View className="example-container">
      <Text className="example-title">多种用法组合</Text>
      <View className="content combined">
        <Badge count={1}>
          <Button type="primary" size="small">消息</Button>
        </Badge>
        <Badge count={99} overflowCount={99}>
          <Button type="primary" size="small">通知</Button>
        </Badge>
        <Badge count={999} overflowCount={999}>
          <Button type="primary" size="small">提醒</Button>
        </Badge>
        <Badge dot>
          <Button type="primary" size="small">动态</Button>
        </Badge>
      </View>
    </View>
  );
}

// 综合示例组件
function BadgeExample() {
  return (
    <View className="badge-example">
      <BasicBadge />
      <DotBadge />
      <OverflowBadge />
      <ZeroBadge />
      <CustomBadge />
      <StandaloneBadge />
      <CombinedBadge />
    </View>
  );
}

export default BadgeExample;

// 样式
import './index.scss';