import React from 'react';
import { View } from '@tarojs/components';
import { Icon } from '@taro-uno/ui';

export default function IconExample() {
  const handleClick = () => {
    console.log('Icon clicked');
  };

  return (
    <View style={{ padding: '20px' }}>
      {/* 基础用法 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>基础用法</View>
        <Icon source="home" />
      </View>

      {/* 不同类型的图标 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>不同类型的图标</View>
        <Icon source="user" style={{ marginRight: '16px' }} />
        <Icon source="https://example.com/icon.png" style={{ marginRight: '16px' }} />
        <Icon source="<svg width='24' height='24' viewBox='0 0 24 24'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'/></svg>" />
      </View>

      {/* 尺寸设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>尺寸设置</View>
        <Icon source="star" size="xs" style={{ marginRight: '8px' }} />
        <Icon source="star" size="sm" style={{ marginRight: '8px' }} />
        <Icon source="star" size="md" style={{ marginRight: '8px' }} />
        <Icon source="star" size="lg" style={{ marginRight: '8px' }} />
        <Icon source="star" size="xl" style={{ marginRight: '8px' }} />
        <Icon source="star" size={40} />
      </View>

      {/* 颜色设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>颜色设置</View>
        <Icon source="heart" color="#ff4d4f" style={{ marginRight: '16px' }} />
        <Icon source="heart" color="#52c41a" style={{ marginRight: '16px' }} />
        <Icon source="heart" color="#1890ff" style={{ marginRight: '16px' }} />
        <Icon source="heart" color="#faad14" />
      </View>

      {/* 状态设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>状态设置</View>
        <Icon source="user" status="normal" style={{ marginRight: '16px' }} />
        <Icon source="user" status="active" style={{ marginRight: '16px' }} />
        <Icon source="user" status="disabled" style={{ marginRight: '16px' }} />
        <Icon source="user" status="loading" />
      </View>

      {/* 旋转图标 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>旋转图标</View>
        <Icon source="refresh" rotate={45} style={{ marginRight: '16px' }} />
        <Icon source="refresh" rotate={90} style={{ marginRight: '16px' }} />
        <Icon source="refresh" rotate={180} style={{ marginRight: '16px' }} />
        <Icon source="refresh" rotate={270} />
      </View>

      {/* 可点击的图标 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>可点击的图标</View>
        <Icon
          source="edit"
          clickable
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
      </View>

      {/* 带动画的图标 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>带动画的图标</View>
        <Icon
          source="loading"
          animated
          animationDuration={2000}
          size="lg"
          color="primary"
        />
      </View>

      {/* 带滤镜的图标 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>带滤镜的图标</View>
        <Icon source="camera" filter="grayscale" style={{ marginRight: '16px' }} />
        <Icon source="camera" filter="sepia" style={{ marginRight: '16px' }} />
        <Icon source="camera" filter="blur" style={{ marginRight: '16px' }} />
        <Icon source="camera" filter="brightness" />
      </View>

      {/* 禁用状态 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>禁用状态</View>
        <Icon source="like" disabled style={{ marginRight: '16px' }} />
        <Icon source="dislike" disabled />
      </View>

      {/* 加载状态 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>加载状态</View>
        <Icon
          source="spinner"
          loading
          size="lg"
          color="primary"
        />
      </View>

      {/* 混合模式 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>混合模式</View>
        <View style={{ background: 'linear-gradient(45deg, #1890ff, #52c41a)', padding: '20px', display: 'inline-block' }}>
          <Icon source="star" size="lg" color="white" blendMode="screen" />
        </View>
      </View>

      {/* 涟漪效果 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>涟漪效果</View>
        <Icon
          source="add"
          clickable
          ripple
          size="lg"
          color="primary"
        />
      </View>
    </View>
  );
}