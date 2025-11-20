import React from 'react';
import { View, Text } from '@tarojs/components';
import { List, ListItem } from '@taro-uno/ui';
import './index.scss';

// 基本列表示例
export const BasicList = () => {
  return (
    <List>
      <ListItem>
        <Text>列表项 1</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 带头部和底部的列表示例
export const ListWithHeaderFooter = () => {
  return (
    <List
      header={<Text className="list-header">列表头部</Text>}
      footer={<Text className="list-footer">列表底部</Text>}
    >
      <ListItem>
        <Text>列表项 1</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 无边框列表示例
export const ListWithoutBorder = () => {
  return (
    <List bordered={false}>
      <ListItem>
        <Text>列表项 1</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 无分割线列表示例
export const ListWithoutSplit = () => {
  return (
    <List split={false}>
      <ListItem>
        <Text>列表项 1</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 加载状态列表示例
export const LoadingList = () => {
  return (
    <List loading>
      <ListItem>
        <Text>列表项 1</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 不同尺寸列表示例
export const ListWithDifferentSizes = () => {
  return (
    <View className="list-sizes">
      <View className="size-item">
        <Text className="size-title">小尺寸列表</Text>
        <List size="small">
          <ListItem>
            <Text>小尺寸列表项</Text>
          </ListItem>
          <ListItem>
            <Text>小尺寸列表项</Text>
          </ListItem>
        </List>
      </View>

      <View className="size-item">
        <Text className="size-title">默认尺寸列表</Text>
        <List size="default">
          <ListItem>
            <Text>默认尺寸列表项</Text>
          </ListItem>
          <ListItem>
            <Text>默认尺寸列表项</Text>
          </ListItem>
        </List>
      </View>

      <View className="size-item">
        <Text className="size-title">大尺寸列表</Text>
        <List size="large">
          <ListItem>
            <Text>大尺寸列表项</Text>
          </ListItem>
          <ListItem>
            <Text>大尺寸列表项</Text>
          </ListItem>
        </List>
      </View>
    </View>
  );
};

// 可点击列表项示例
export const ClickableListItem = () => {
  const handlePress = (index: number) => {
    console.log(`点击了列表项 ${index + 1}`);
    // 这里可以添加点击后的业务逻辑
  };

  return (
    <List>
      <ListItem clickable onPress={() => handlePress(0)}>
        <Text>可点击列表项 1</Text>
      </ListItem>
      <ListItem clickable onPress={() => handlePress(1)}>
        <Text>可点击列表项 2</Text>
      </ListItem>
      <ListItem clickable onPress={() => handlePress(2)}>
        <Text>可点击列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 禁用状态列表项示例
export const DisabledListItem = () => {
  return (
    <List>
      <ListItem disabled>
        <Text className="disabled-text">禁用列表项 1</Text>
      </ListItem>
      <ListItem disabled clickable>
        <Text className="disabled-text">禁用且可点击列表项 2</Text>
      </ListItem>
      <ListItem>
        <Text>正常列表项 3</Text>
      </ListItem>
    </List>
  );
};

// 使用 dataSource 方式示例
export const ListWithDataSource = () => {
  const data = [
    { key: '1', title: '标题 1', description: '这是描述信息 1' },
    { key: '2', title: '标题 2', description: '这是描述信息 2' },
    { key: '3', title: '标题 3', description: '这是描述信息 3' }
  ];

  return (
    <List dataSource={data}>
      {(item) => (
        <ListItem key={item.key}>
          <View className="data-source-item">
            <Text className="item-title">{item.title}</Text>
            <Text className="item-description">{item.description}</Text>
          </View>
        </ListItem>
      )}
    </List>
  );
};

// 复杂列表项示例
export const ComplexListItem = () => {
  const handlePress = (index: number) => {
    console.log(`查看详情 ${index + 1}`);
    // 这里可以添加点击后的业务逻辑
  };

  return (
    <List>
      <ListItem clickable onPress={() => handlePress(0)}>
        <View className="complex-item">
          <View className="item-content">
            <Text className="item-title">列表项标题</Text>
            <Text className="item-time">2023-10-01</Text>
          </View>
          <Text className="view-detail">查看详情</Text>
        </View>
      </ListItem>
      <ListItem clickable onPress={() => handlePress(1)}>
        <View className="complex-item">
          <View className="item-content">
            <Text className="item-title">列表项标题</Text>
            <Text className="item-time">2023-10-02</Text>
          </View>
          <Text className="view-detail">查看详情</Text>
        </View>
      </ListItem>
    </List>
  );
};

// 综合示例
export const ListExample = () => {
  return (
    <View className="list-example-container">
      <Text className="example-title">List 组件示例</Text>
      
      <View className="example-section">
        <Text className="section-title">1. 基本列表</Text>
        <BasicList />
      </View>

      <View className="example-section">
        <Text className="section-title">2. 带头部和底部的列表</Text>
        <ListWithHeaderFooter />
      </View>

      <View className="example-section">
        <Text className="section-title">3. 无边框列表</Text>
        <ListWithoutBorder />
      </View>

      <View className="example-section">
        <Text className="section-title">4. 无分割线列表</Text>
        <ListWithoutSplit />
      </View>

      <View className="example-section">
        <Text className="section-title">5. 加载状态列表</Text>
        <LoadingList />
      </View>

      <View className="example-section">
        <Text className="section-title">6. 不同尺寸列表</Text>
        <ListWithDifferentSizes />
      </View>

      <View className="example-section">
        <Text className="section-title">7. 可点击列表项</Text>
        <ClickableListItem />
      </View>

      <View className="example-section">
        <Text className="section-title">8. 禁用状态列表项</Text>
        <DisabledListItem />
      </View>

      <View className="example-section">
        <Text className="section-title">9. 使用 dataSource 方式</Text>
        <ListWithDataSource />
      </View>

      <View className="example-section">
        <Text className="section-title">10. 复杂列表项</Text>
        <ComplexListItem />
      </View>
    </View>
  );
};