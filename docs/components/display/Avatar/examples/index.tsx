import React from 'react';
import { View, Text } from '@tarojs/components';
import { Avatar } from '../../../../src/components/display/Avatar';

// 图片头像示例
function ImageAvatar() {
  return (
    <View className="example-container">
      <Text className="example-title">图片头像</Text>
      <View className="content">
        <Avatar src="https://via.placeholder.com/100" alt="用户头像" />
      </View>
    </View>
  );
}

// 图标头像示例
function IconAvatar() {
  return (
    <View className="example-container">
      <Text className="example-title">图标头像</Text>
      <View className="content">
        <Avatar icon={<View className="avatar-icon">👤</View>} />
      </View>
    </View>
  );
}

// 文字头像示例
function TextAvatar() {
  return (
    <View className="example-container">
      <Text className="example-title">文字头像</Text>
      <View className="content">
        <Avatar>张三</Avatar>
        <Avatar>U</Avatar>
      </View>
    </View>
  );
}

// 不同尺寸示例
function AvatarSizes() {
  return (
    <View className="example-container">
      <Text className="example-title">不同尺寸</Text>
      <View className="content">
        <Avatar size="small" src="https://via.placeholder.com/100" alt="小尺寸" />
        <Avatar size="medium" src="https://via.placeholder.com/100" alt="中尺寸" />
        <Avatar size="large" src="https://via.placeholder.com/100" alt="大尺寸" />
        <Avatar size={80} src="https://via.placeholder.com/100" alt="自定义尺寸" />
      </View>
    </View>
  );
}

// 不同形状示例
function AvatarShapes() {
  return (
    <View className="example-container">
      <Text className="example-title">不同形状</Text>
      <View className="content">
        <Avatar shape="circle" src="https://via.placeholder.com/100" alt="圆形" />
        <Avatar shape="square" src="https://via.placeholder.com/100" alt="方形" />
      </View>
    </View>
  );
}

// 自定义样式示例
function CustomAvatar() {
  return (
    <View className="example-container">
      <Text className="example-title">自定义样式</Text>
      <View className="content">
        <Avatar
          src="https://via.placeholder.com/100"
          style={{ border: '2px solid #1890ff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        />
      </View>
    </View>
  );
}

// 带点击事件示例
function ClickableAvatar() {
  const handleClick = () => {
    console.log('Avatar clicked');
    // 在实际应用中，这里可以打开用户资料等操作
  };

  return (
    <View className="example-container">
      <Text className="example-title">带点击事件</Text>
      <View className="content">
        <Avatar
          src="https://via.placeholder.com/100"
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        <Text className="hint">点击头像查看控制台输出</Text>
      </View>
    </View>
  );
}

// 综合示例组件
function AvatarExample() {
  return (
    <View className="avatar-example">
      <ImageAvatar />
      <IconAvatar />
      <TextAvatar />
      <AvatarSizes />
      <AvatarShapes />
      <CustomAvatar />
      <ClickableAvatar />
    </View>
  );
}

export default AvatarExample;

// 样式
import './index.scss';