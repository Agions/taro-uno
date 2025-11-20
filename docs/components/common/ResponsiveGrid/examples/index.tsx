import React from 'react';
import { ResponsiveGrid, ResponsiveGridItem, ResponsiveGridPresets } from '@taro-uno/ui';
import { View, Text } from '@tarojs/components';

// 基础响应式栅格示例
const BasicExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">基础响应式栅格</Text>
      <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="16px">
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 3</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 4</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 5</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 6</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </View>
  );
};

// 自定义对齐方式示例
const AlignmentExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">自定义对齐方式</Text>
      <ResponsiveGrid 
        columns={{ xs: 2 }} 
        gap="16px" 
        align="center" 
        justify="between"
        style={{ marginBottom: '20px' }}
      >
        <ResponsiveGridItem>
          <View className="grid-item" style={{ height: '80px' }}>
            <Text>项目 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item" style={{ height: '120px' }}>
            <Text>项目 2</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
      
      <ResponsiveGrid 
        columns={{ xs: 2 }} 
        gap="16px" 
        align="end" 
        justify="center"
      >
        <ResponsiveGridItem>
          <View className="grid-item" style={{ height: '100px' }}>
            <Text>项目 3</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item" style={{ height: '150px' }}>
            <Text>项目 4</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </View>
  );
};

// 栅格项占据多列示例
const SpanExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">栅格项占据多列</Text>
      <ResponsiveGrid columns={{ xs: 2, md: 4 }} gap="16px">
        <ResponsiveGridItem span={{ xs: 2, md: 2 }}>
          <View className="grid-item">
            <Text>占据2列</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 3</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem span={{ xs: 2, md: 2 }}>
          <View className="grid-item">
            <Text>占据2列</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </View>
  );
};

// 栅格项偏移示例
const OffsetExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">栅格项偏移</Text>
      <ResponsiveGrid columns={{ xs: 2 }} gap="16px">
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>项目 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem offset={{ xs: 1 }}>
          <View className="grid-item">
            <Text>偏移1列</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </View>
  );
};

// 使用预设布局示例
const PresetsExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">使用预设布局</Text>
      
      <Text className="example-subtitle">卡片布局</Text>
      <ResponsiveGridPresets.CardLayout style={{ marginBottom: '20px' }}>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>卡片 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>卡片 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>卡片 3</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>卡片 4</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGridPresets.CardLayout>
      
      <Text className="example-subtitle">仪表盘布局</Text>
      <ResponsiveGridPresets.DashboardLayout>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>仪表盘项目 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>仪表盘项目 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>仪表盘项目 3</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>仪表盘项目 4</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGridPresets.DashboardLayout>
    </View>
  );
};

// 综合示例
const ComplexExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">综合示例</Text>
      <ResponsiveGrid 
        columns={{ xs: 1, sm: 2, md: 4 }} 
        gap={{ xs: '12px', sm: '16px', md: '20px' }}
        align="stretch"
      >
        <ResponsiveGridItem span={{ xs: 1, md: 2 }}>
          <View className="grid-item" style={{ height: '150px' }}>
            <Text>主内容区域</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>侧边栏 1</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem>
          <View className="grid-item">
            <Text>侧边栏 2</Text>
          </View>
        </ResponsiveGridItem>
        <ResponsiveGridItem span={{ xs: 1, sm: 2, md: 4 }}>
          <View className="grid-item">
            <Text>底部内容</Text>
          </View>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </View>
  );
};

// 主示例组件
export default function ResponsiveGridExample() {
  return (
    <View className="responsive-grid-example">
      <BasicExample />
      <AlignmentExample />
      <SpanExample />
      <OffsetExample />
      <PresetsExample />
      <ComplexExample />
      
      {/* 样式定义 */}
      <style jsx global>{`
        .responsive-grid-example {
          padding: 20px;
        }
        
        .example-section {
          margin-bottom: 30px;
        }
        
        .example-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #333;
        }
        
        .example-subtitle {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #666;
        }
        
        .grid-item {
          background-color: #f0f0f0;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: #333;
          border: 1px solid #ddd;
        }
      `}</style>
    </View>
  );
}