import React from 'react';
import { View } from '@tarojs/components';
import { Divider, Icon } from '@taro-uno/ui';

export default function DividerExample() {
  const handleClick = () => {
    console.log('Divider clicked');
  };

  return (
    <View style={{ padding: '20px' }}>
      {/* 默认分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>默认分割线</View>
        <Divider />
      </View>

      {/* 方向设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>方向设置</View>
        <Divider orientation="horizontal" />
        <View style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <View>左侧内容</View>
          <Divider orientation="vertical" style={{ height: '20px', margin: '0 16px' }} />
          <View>右侧内容</View>
        </View>
      </View>

      {/* 线条类型 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>线条类型</View>
        <Divider type="solid" style={{ marginBottom: '10px' }} />
        <Divider type="dashed" style={{ marginBottom: '10px' }} />
        <Divider type="dotted" style={{ marginBottom: '10px' }} />
        <Divider type="double" />
      </View>

      {/* 带文本的分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>带文本的分割线</View>
        <Divider style={{ marginBottom: '10px' }}>中间文本</Divider>
        <Divider position="left" style={{ marginBottom: '10px' }}>左侧文本</Divider>
        <Divider position="right">右侧文本</Divider>
      </View>

      {/* 带图标和文本的分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>带图标和文本的分割线</View>
        <Divider>
          <Icon name="heart" color="#ff4d4f" />
          <View style={{ marginLeft: '8px' }}>喜欢</View>
        </Divider>
      </View>

      {/* 颜色和尺寸 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>颜色和尺寸</View>
        <Divider color="primary" size="xs" style={{ marginBottom: '10px' }} />
        <Divider color="success" size="sm" style={{ marginBottom: '10px' }} />
        <Divider color="warning" size="md" style={{ marginBottom: '10px' }} />
        <Divider color="error" size="lg" style={{ marginBottom: '10px' }} />
        <Divider color="info" size="xl" />
      </View>

      {/* 渐变分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>渐变分割线</View>
        <Divider
          gradient={{
            start: '#1890ff',
            end: '#52c41a',
            direction: 'to right'
          }}
          height={2}
        />
      </View>

      {/* 动画分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>动画分割线</View>
        <Divider
          animated
          animationDuration={1000}
          type="dashed"
          color="primary"
        />
      </View>

      {/* 可点击的分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>可点击的分割线</View>
        <Divider
          clickable
          onClick={handleClick}
          children="点击我"
          style={{ cursor: 'pointer' }}
        />
      </View>

      {/* 响应式分割线 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>响应式分割线</View>
        <Divider
          responsive
          breakpoint="md"
          orientation="horizontal"
          children="响应式分割线"
        />
      </View>

      {/* 文本样式自定义 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>文本样式自定义</View>
        <Divider
          children="自定义文本样式"
          textStyle={{ color: '#1890ff', fontSize: '16px', fontWeight: 'bold' }}
          textBackground="#e6f7ff"
          textPadding="0 24px"
          textBorderRadius={8}
        />
      </View>

      {/* 图标位置设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>图标位置设置</View>
        <Divider
          icon={<Icon name="star" color="#faad14" />}
          iconPosition="start"
          children="开始位置"
          style={{ marginBottom: '10px' }}
        />
        <Divider
          icon={<Icon name="star" color="#faad14" />}
          iconPosition="center"
          children="居中位置"
          style={{ marginBottom: '10px' }}
        />
        <Divider
          icon={<Icon name="star" color="#faad14" />}
          iconPosition="end"
          children="结束位置"
        />
      </View>

      {/* 变体样式 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>变体样式</View>
        <Divider variant="inset" style={{ marginBottom: '10px' }} />
        <Divider variant="middle" children="中间变体" style={{ marginBottom: '10px' }} />
        <Divider variant="text" children="文本变体" />
      </View>

      {/* 边距和对齐 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>边距和对齐</View>
        <Divider margin="20px 0" align="start" style={{ width: '50%' }} />
        <Divider margin="20px 0" align="center" style={{ width: '50%' }} />
        <Divider margin="20px 0" align="end" style={{ width: '50%' }} />
      </View>

      {/* 阴影效果 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>阴影效果</View>
        <Divider shadow />
      </View>

      {/* 透明度设置 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px' }}>透明度设置</View>
        <Divider opacity={0.3} style={{ marginBottom: '10px' }} />
        <Divider opacity={0.6} style={{ marginBottom: '10px' }} />
        <Divider opacity={1} />
      </View>
    </View>
  );
}