import React from 'react';
import { View, Text } from '@tarojs/components';
import { Card, Button } from '@taro-uno/ui';

// 基本卡片示例
export const CardBasic = () => {
  return (
    <View>
      <Text>基本卡片</Text>
      <Card>
        <Text>这是卡片的内容区域，可以放置任何内容</Text>
      </Card>
    </View>
  );
};

// 带封面的卡片示例
export const CardWithCover = () => {
  return (
    <View>
      <Text>带封面的卡片</Text>
      <Card
        cover={
          <View style={{ height: 120, backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>封面图片</Text>
          </View>
        }
      >
        <Text>带封面的卡片内容</Text>
      </Card>
    </View>
  );
};

// 带标题和副标题的卡片示例
export const CardWithTitle = () => {
  return (
    <View>
      <Text>带标题和副标题的卡片</Text>
      <Card
        title="卡片标题"
        subtitle="卡片副标题"
      >
        <Text>带标题和副标题的卡片内容</Text>
      </Card>
    </View>
  );
};

// 带额外操作区域的卡片示例
export const CardWithExtra = () => {
  return (
    <View>
      <Text>带额外操作区域的卡片</Text>
      <Card
        title="卡片标题"
        extra={<Button size="small">更多</Button>}
      >
        <Text>带额外操作区域的卡片内容</Text>
      </Card>
    </View>
  );
};

// 带操作按钮的卡片示例
export const CardWithActions = () => {
  return (
    <View>
      <Text>带操作按钮的卡片</Text>
      <Card
        title="带操作按钮的卡片"
        actions={[
          <Button size="small">操作1</Button>,
          <Button size="small" type="primary">操作2</Button>
        ]}
      >
        <Text>卡片内容</Text>
      </Card>
    </View>
  );
};

// 可点击的卡片示例
export const CardClickable = () => {
  const handlePress = () => {
    console.log('Card clicked');
  };

  return (
    <View>
      <Text>可点击的卡片</Text>
      <Card
        hoverable
        onPress={handlePress}
        title="可点击的卡片"
      >
        <Text>点击卡片会触发onPress事件</Text>
      </Card>
    </View>
  );
};

// 加载状态的卡片示例
export const CardLoading = () => {
  return (
    <View>
      <Text>加载状态的卡片</Text>
      <Card
        loading
        title="加载中的卡片"
      >
        <Text>加载状态下，内容区域会显示骨架屏</Text>
      </Card>
    </View>
  );
};

// 自定义阴影的卡片示例
export const CardWithShadow = () => {
  return (
    <View>
      <Text>自定义阴影的卡片</Text>
      <Card
        shadow="large"
        title="大阴影卡片"
      >
        <Text>使用shadow属性可以自定义阴影大小</Text>
      </Card>
    </View>
  );
};

// 无边框的卡片示例
export const CardWithoutBorder = () => {
  return (
    <View>
      <Text>无边框的卡片</Text>
      <Card
        bordered={false}
        title="无边框卡片"
      >
        <Text>设置bordered为false可以隐藏边框</Text>
      </Card>
    </View>
  );
};

// 完整卡片示例
export const CardComprehensive = () => {
  const handlePress = () => {
    console.log('Card clicked');
  };

  return (
    <View>
      <Text>完整卡片示例</Text>
      <Card
        cover={
          <View style={{ height: 150, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>封面区域</Text>
          </View>
        }
        title="完整卡片示例"
        subtitle="这是一个包含所有元素的卡片"
        extra={<Button size="small">编辑</Button>}
        actions={[
          <Button size="small">分享</Button>,
          <Button size="small" type="primary">收藏</Button>,
          <Button size="small" type="danger">删除</Button>
        ]}
        hoverable
        shadow="large"
        onPress={handlePress}
      >
        <View style={{ padding: '10px 0' }}>
          <Text>这是卡片的主要内容区域，可以放置任何类型的内容，如文本、图片、列表等。</Text>
          <Text style={{ marginTop: 10, display: 'block' }}>卡片组件提供了丰富的配置选项，可以根据需要组合使用各种属性。</Text>
        </View>
      </Card>
    </View>
  );
};

// 卡片列表示例
export const CardList = () => {
  return (
    <View>
      <Text>卡片列表示例</Text>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card
          title="卡片项目 1"
          extra={<Text style={{ color: '#1890ff' }}>查看</Text>}
        >
          <Text>这是第一个卡片项目的内容</Text>
        </Card>
        <Card
          title="卡片项目 2"
          extra={<Text style={{ color: '#1890ff' }}>查看</Text>}
        >
          <Text>这是第二个卡片项目的内容</Text>
        </Card>
        <Card
          title="卡片项目 3"
          extra={<Text style={{ color: '#1890ff' }}>查看</Text>}
        >
          <Text>这是第三个卡片项目的内容</Text>
        </Card>
      </View>
    </View>
  );
};

// 不同阴影级别的卡片示例
export const CardShadowLevels = () => {
  return (
    <View>
      <Text>不同阴影级别的卡片</Text>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card
          shadow="none"
          title="无阴影卡片"
        >
          <Text>shadow="none"</Text>
        </Card>
        <Card
          shadow="small"
          title="小阴影卡片"
        >
          <Text>shadow="small"</Text>
        </Card>
        <Card
          shadow="default"
          title="默认阴影卡片"
        >
          <Text>shadow="default"</Text>
        </Card>
        <Card
          shadow="large"
          title="大阴影卡片"
        >
          <Text>shadow="large"</Text>
        </Card>
      </View>
    </View>
  );
};

export default {
  CardBasic,
  CardWithCover,
  CardWithTitle,
  CardWithExtra,
  CardWithActions,
  CardClickable,
  CardLoading,
  CardWithShadow,
  CardWithoutBorder,
  CardComprehensive,
  CardList,
  CardShadowLevels
};