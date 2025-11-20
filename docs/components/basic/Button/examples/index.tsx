import React from 'react';
import { Button } from '@/components/basic/Button';
import { Icon } from '@/components/basic/Icon';
import { View } from '@tarojs/components';

const ButtonExample: React.FC = () => {
  const handleClick = () => {
    console.log('按钮被点击了');
  };

  const handleLongPress = () => {
    console.log('按钮被长按了');
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>默认按钮</View>
        <Button>默认按钮</Button>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮类型</View>
        <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button type="primary">主要按钮</Button>
          <Button type="secondary">次要按钮</Button>
          <Button type="text">文本按钮</Button>
          <Button type="link">链接按钮</Button>
          <Button type="danger">危险按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮尺寸</View>
        <View style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
          <Button size="large" type="primary">大号按钮</Button>
          <Button size="medium" type="primary">中号按钮</Button>
          <Button size="small" type="primary">小号按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮状态</View>
        <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button type="primary" loading>加载中</Button>
          <Button type="primary" disabled>禁用状态</Button>
          <Button type="primary" active>激活状态</Button>
          <Button type="primary" ghost>幽灵按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮变体</View>
        <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="solid" type="primary">实心按钮</Button>
          <Button variant="outline" type="primary">边框按钮</Button>
          <Button variant="dashed" type="primary">虚线按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮形状</View>
        <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button shape="default" type="primary">默认形状</Button>
          <Button shape="circle" type="primary">圆形按钮</Button>
          <Button shape="round" type="primary">圆角按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>块级按钮</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button block type="primary">块级按钮</Button>
          <Button block type="secondary">块级次要按钮</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>事件处理</View>
        <View style={{ display: 'flex', gap: 10 }}>
          <Button type="primary" onClick={handleClick}>点击事件</Button>
          <Button type="primary" onLongPress={handleLongPress}>长按事件</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>图标按钮</View>
        <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button type="primary" icon={<Icon type="search" />}>搜索</Button>
          <Button type="primary" icon={<Icon type="plus" />} />
          <Button type="primary" iconPosition="right" icon={<Icon type="arrow-right" />}>下一步</Button>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>按钮组合</View>
        <View style={{ display: 'flex', gap: 0 }}>
          <Button type="primary" variant="solid">左按钮</Button>
          <Button type="primary" variant="solid" style={{ borderLeftWidth: 0 }}>中按钮</Button>
          <Button type="primary" variant="solid" style={{ borderLeftWidth: 0 }}>右按钮</Button>
        </View>
      </View>
    </View>
  );
};

export default ButtonExample;