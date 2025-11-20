import React from 'react';
import { View } from '@tarojs/components';
import { Text } from '@taro-uno/ui';

export default function TextExample() {
  const handleCopy = () => {
    console.log('复制成功');
  };

  const handleClick = () => {
    console.log('文本被点击');
  };

  return (
    <View style={{ padding: '20px' }}>
      {/* 基础用法 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>基础用法</View>
        <Text>这是一段基础文本</Text>
      </View>

      {/* 不同尺寸 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>不同尺寸</View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="xs">超小文本 (xs)</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="sm">小文本 (sm)</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="md">中等文本 (md)</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="lg">大文本 (lg)</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="xl">超大文本 (xl)</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text size="2xl">2倍大文本 (2xl)</Text>
        </View>
      </View>

      {/* 不同权重 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>不同权重</View>
        <Text weight="thin" style={{ marginRight: '16px' }}>细体</Text>
        <Text weight="light" style={{ marginRight: '16px' }}>轻体</Text>
        <Text weight="normal" style={{ marginRight: '16px' }}>正常</Text>
        <Text weight="medium" style={{ marginRight: '16px' }}>中等</Text>
        <Text weight="bold" style={{ marginRight: '16px' }}>粗体</Text>
        <Text weight="black">黑体</Text>
      </View>

      {/* 不同颜色 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>不同颜色</View>
        <Text color="primary" style={{ marginRight: '16px' }}>主色调</Text>
        <Text color="secondary" style={{ marginRight: '16px' }}>次色调</Text>
        <Text color="success" style={{ marginRight: '16px' }}>成功</Text>
        <Text color="warning" style={{ marginRight: '16px' }}>警告</Text>
        <Text color="error" style={{ marginRight: '16px' }}>错误</Text>
        <Text color="info">信息</Text>
      </View>

      {/* 文本对齐 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>文本对齐</View>
        <View style={{ marginBottom: '8px' }}>
          <Text align="left">左对齐文本</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text align="center">居中对齐文本</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text align="right">右对齐文本</Text>
        </View>
        <View style={{ marginBottom: '8px' }}>
          <Text align="justify">两端对齐文本，这是一段较长的文本，用于展示两端对齐的效果</Text>
        </View>
      </View>

      {/* 文本装饰 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>文本装饰</View>
        <Text underline style={{ marginRight: '16px' }}>下划线</Text>
        <Text strikethrough style={{ marginRight: '16px' }}>删除线</Text>
        <Text decoration="overline">上划线</Text>
      </View>

      {/* 文本转换 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>文本转换</View>
        <Text transform="capitalize" style={{ marginRight: '16px' }}>capitalize</Text>
        <Text transform="uppercase" style={{ marginRight: '16px' }}>uppercase</Text>
        <Text transform="lowercase">lowercase</Text>
      </View>

      {/* 可复制文本 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>可复制文本</View>
        <Text copyable onCopy={handleCopy}>点击复制这段文本到剪贴板</Text>
      </View>

      {/* 可点击文本 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>可点击文本</View>
        <Text clickable onClick={handleClick} style={{ cursor: 'pointer', color: '#1890ff' }}>点击我</Text>
      </View>

      {/* 链接文本 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>链接文本</View>
        <Text href="https://example.com" target="_blank">访问示例网站</Text>
      </View>

      {/* 多行文本控制 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>多行文本控制</View>
        <Text maxLines={2} ellipsis>
          这是一段很长的文本，将会在第二行末尾显示省略号。这是一段很长的文本，将会在第二行末尾显示省略号。
        </Text>
      </View>

      {/* 高亮文本 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>高亮文本</View>
        <Text highlight highlightColor="#ffeb3b">高亮显示的文本</Text>
      </View>

      {/* 加载状态 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>加载状态</View>
        <Text loading>加载中...</Text>
      </View>

      {/* 禁用状态 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>禁用状态</View>
        <Text disabled>禁用的文本</Text>
      </View>

      {/* 块级显示 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>块级显示</View>
        <Text block>块级文本，会独占一行</Text>
        <Text block>下一个块级文本</Text>
      </View>

      {/* 渐变文本 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>渐变文本</View>
        <Text gradient={{ start: '#1890ff', end: '#52c41a', direction: 'to right' }}>
          渐变色文本效果
        </Text>
      </View>

      {/* 文本阴影 */}
      <View style={{ marginBottom: '20px' }}>
        <View style={{ marginBottom: '10px', fontWeight: 'bold' }}>文本阴影</View>
        <Text textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)" size="lg" weight="bold">
          带阴影的文本
        </Text>
      </View>
    </View>
  );
}