import React from 'react';
import { View } from '@tarojs/components';
import { Button, Icon, Text, Divider } from './index';

/**
 * 基础组件使用示例
 */
export const BasicComponentsExample: React.FC = () => {
  return (
    <View className="basic-components-example">
      <Text size="3xl" weight="bold" color="primary" marginBottom="20px">
        基础组件示例
      </Text>

      {/* Button 示例 */}
      <View className="example-section">
        <Text size="xl" weight="semibold" marginBottom="16px">
          Button 按钮组件
        </Text>

        <View
          className="button-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
        >
          <Button type="primary">主要按钮</Button>
          <Button type="secondary">次要按钮</Button>
          <Button type="success">成功按钮</Button>
          <Button type="warning">警告按钮</Button>
          <Button type="error">错误按钮</Button>
          <Button type="info">信息按钮</Button>
        </View>

        <View
          className="button-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
        >
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="text">文本按钮</Button>
        </View>

        <View
          className="button-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
        >
          <Button size="xs">超小</Button>
          <Button size="sm">小</Button>
          <Button size="md">中</Button>
          <Button size="lg">大</Button>
          <Button size="xl">超大</Button>
        </View>

        <View
          className="button-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
        >
          <Button loading>加载中</Button>
          <Button disabled>禁用</Button>
          <Button danger>危险操作</Button>
          <Button block>块级按钮</Button>
        </View>

        <View
          className="button-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}
        >
          <Button icon={<Icon source="🔥" />}>带图标</Button>
          <Button icon={<Icon source="🔥" />} iconPosition="right">
            图标在右
          </Button>
          <Button shape="rounded">圆角</Button>
          <Button shape="circle">●</Button>
        </View>
      </View>

      <Divider />

      {/* Icon 示例 */}
      <View className="example-section">
        <Text size="xl" weight="semibold" marginBottom="16px">
          Icon 图标组件
        </Text>

        <View
          className="icon-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
        >
          <Icon source="🏠" size="xs" />
          <Icon source="🏠" size="sm" />
          <Icon source="🏠" size="md" />
          <Icon source="🏠" size="lg" />
          <Icon source="🏠" size="xl" />
        </View>

        <View
          className="icon-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
        >
          <Icon source="⭐" color="primary" />
          <Icon source="⭐" color="success" />
          <Icon source="⭐" color="warning" />
          <Icon source="⭐" color="error" />
          <Icon source="⭐" color="secondary" />
        </View>

        <View
          className="icon-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
        >
          <Icon source="🔥" clickable />
          <Icon source="🔥" loading />
          <Icon source="🔥" disabled />
          <Icon source="🔥" animated />
        </View>

        <View
          className="icon-examples"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
        >
          <Icon source="🔄" rotate={45} />
          <Icon source="🔄" rotate={90} />
          <Icon source="🔄" rotate={180} />
          <Icon source="🔄" rotate={270} />
        </View>
      </View>

      <Divider />

      {/* Text 示例 */}
      <View className="example-section">
        <Text size="xl" weight="semibold" marginBottom="16px">
          Text 文本组件
        </Text>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text size="xs">超小文本 (xs)</Text>
          <Text size="sm">小文本 (sm)</Text>
          <Text size="md">中等文本 (md)</Text>
          <Text size="lg">大文本 (lg)</Text>
          <Text size="xl">超大文本 (xl)</Text>
          <Text size="2xl">2倍大文本 (2xl)</Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text weight="thin">细体 (thin)</Text>
          <Text weight="light">轻量 (light)</Text>
          <Text weight="normal">常规 (normal)</Text>
          <Text weight="medium">中等 (medium)</Text>
          <Text weight="semibold">半粗 (semibold)</Text>
          <Text weight="bold">粗体 (bold)</Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text color="primary">主要文本</Text>
          <Text color="secondary">次要文本</Text>
          <Text color="success">成功文本</Text>
          <Text color="warning">警告文本</Text>
          <Text color="error">错误文本</Text>
          <Text color="info">信息文本</Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text underline>下划线文本</Text>
          <Text strikethrough>删除线文本</Text>
          <Text highlight>高亮文本</Text>
          <Text transform="uppercase">大写文本</Text>
          <Text transform="lowercase">小写文本</Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text align="left">左对齐文本</Text>
          <Text align="center">居中对齐文本</Text>
          <Text align="right">右对齐文本</Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text ellipsis>这是一段很长的文本内容，当超出容器宽度时会显示省略号...</Text>
          <Text maxLines={2}>
            这是一段很长的文本内容，当超出指定行数时会显示省略号。这是第二行内容，用于测试多行文本截断效果。
          </Text>
        </View>

        <View className="text-examples" style={{ marginBottom: '24px' }}>
          <Text clickable>可点击文本</Text>
          <Text copyable>可复制文本</Text>
          <Text selectable>可选择文本</Text>
        </View>
      </View>

      <Divider />

      {/* Divider 示例 */}
      <View className="example-section">
        <Text size="xl" weight="semibold" marginBottom="16px">
          Divider 分割线组件
        </Text>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>水平分割线</Text>
          <Divider />
          <Text>分割线内容</Text>
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>不同类型</Text>
          <Divider type="solid" />
          <Divider type="dashed" />
          <Divider type="dotted" />
          <Divider type="double" />
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>不同位置</Text>
          <Divider position="left" />
          <Divider position="center" />
          <Divider position="right" />
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>不同尺寸</Text>
          <Divider size="xs" />
          <Divider size="sm" />
          <Divider size="md" />
          <Divider size="lg" />
          <Divider size="xl" />
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>不同颜色</Text>
          <Divider color="primary" />
          <Divider color="success" />
          <Divider color="warning" />
          <Divider color="error" />
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>文本分割线</Text>
          <Divider>文本内容</Divider>
          <Divider icon={<Icon source="⭐" />}>带图标的分割线</Divider>
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>垂直分割线</Text>
          <View style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
            <Text>左侧内容</Text>
            <Divider orientation="vertical" />
            <Text>右侧内容</Text>
          </View>
        </View>

        <View className="divider-examples" style={{ marginBottom: '24px' }}>
          <Text>响应式分割线</Text>
          <Divider responsive />
        </View>
      </View>

      <Divider />

      {/* 综合示例 */}
      <View className="example-section">
        <Text size="xl" weight="semibold" marginBottom="16px">
          综合示例
        </Text>

        <View
          className="comprehensive-example"
          style={{
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <Text size="lg" weight="semibold" color="primary" marginBottom="12px">
            <Icon source="📋" size="sm" marginRight="8px" />
            任务列表
          </Text>

          <View style={{ marginBottom: '16px' }}>
            <View style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Icon source="✅" color="success" marginRight="8px" />
              <Text>完成基础组件开发</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Icon source="⏳" color="warning" marginRight="8px" />
              <Text>编写单元测试</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Icon source="📝" color="info" marginRight="8px" />
              <Text>完善文档</Text>
            </View>
          </View>

          <Divider />

          <View style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button variant="outline" size="sm">
              取消
            </Button>
            <Button type="primary" size="sm">
              确认
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BasicComponentsExample;
