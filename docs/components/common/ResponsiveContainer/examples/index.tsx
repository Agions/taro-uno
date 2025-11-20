import React from 'react';
import { ResponsiveContainer } from '@taro-uno/ui';
import { View, Text } from '@tarojs/components';

// 基本用法示例
const BasicExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">基本用法</Text>
      <ResponsiveContainer>
        <View className="container-content">
          <Text>这是一个响应式容器</Text>
          <Text>它会根据屏幕尺寸自动调整布局</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 自定义边距和内边距示例
const CustomPaddingMarginExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">自定义边距和内边距</Text>
      <ResponsiveContainer
        padding={{ xs: '10px', sm: '20px', md: '30px' }}
        margin={{ xs: '5px', sm: '10px', md: '15px' }}
      >
        <View className="container-content">
          <Text>带自定义边距和内边距的容器</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 自定义最大宽度示例
const CustomMaxWidthExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">自定义最大宽度</Text>
      <ResponsiveContainer
        maxWidth={{ xs: '100%', sm: '600px', md: '800px', lg: '1000px' }}
      >
        <View className="container-content">
          <Text>带自定义最大宽度的容器</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 自定义背景色和边框半径示例
const CustomStyleExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">自定义背景色和边框半径</Text>
      <ResponsiveContainer
        backgroundColor={{ xs: '#f5f5f5', sm: '#e0e0e0' }}
        borderRadius={{ xs: '4px', sm: '8px', md: '12px' }}
      >
        <View className="container-content">
          <Text>带自定义背景色和边框半径的容器</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 安全区域适配示例
const SafeAreaExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">安全区域适配</Text>
      <ResponsiveContainer safeArea={true}>
        <View className="container-content">
          <Text>适配安全区域的容器</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 自定义响应式样式示例
const CustomResponsiveStyleExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">自定义响应式样式</Text>
      <ResponsiveContainer
        style={{
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          color: { xs: '#333', sm: '#666' },
          border: { xs: '1px solid #ddd', md: '2px solid #aaa' }
        }}
      >
        <View className="container-content">
          <Text>带自定义响应式样式的容器</Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 嵌套使用示例
const NestedExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">嵌套使用</Text>
      <ResponsiveContainer>
        <View className="container-content">
          <Text>外层容器</Text>
          <ResponsiveContainer
            padding={{ xs: '10px', sm: '20px' }}
            backgroundColor="#f0f0f0"
          >
            <View className="container-content inner">
              <Text>内层容器</Text>
            </View>
          </ResponsiveContainer>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 综合示例
const ComplexExample = () => {
  return (
    <View className="example-section">
      <Text className="example-title">综合示例</Text>
      <ResponsiveContainer
        padding={{ xs: '15px', sm: '25px', md: '35px' }}
        margin={{ xs: '10px', sm: 'auto', md: '20px auto' }}
        maxWidth={{ xs: '100%', sm: '768px', md: '992px' }}
        backgroundColor={{ xs: '#fff', sm: '#f9f9f9' }}
        borderRadius={{ xs: '8px', sm: '12px', md: '16px' }}
        style={{
          boxShadow: { xs: 'none', sm: '0 2px 8px rgba(0,0,0,0.1)' },
          border: { xs: '1px solid #eee', sm: 'none' }
        }}
      >
        <View className="container-content">
          <Text className="complex-title">综合响应式容器</Text>
          <Text className="complex-description">
            这个容器结合了多种响应式特性，包括边距、内边距、最大宽度、背景色、边框半径和阴影效果。
            在不同屏幕尺寸下，它会自动调整这些属性，提供一致且美观的用户体验。
          </Text>
        </View>
      </ResponsiveContainer>
    </View>
  );
};

// 主示例组件
export default function ResponsiveContainerExample() {
  return (
    <View className="responsive-container-example">
      <BasicExample />
      <CustomPaddingMarginExample />
      <CustomMaxWidthExample />
      <CustomStyleExample />
      <SafeAreaExample />
      <CustomResponsiveStyleExample />
      <NestedExample />
      <ComplexExample />
      
      {/* 样式定义 */}
      <style jsx global>{`
        .responsive-container-example {
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
        
        .container-content {
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: #333;
        }
        
        .container-content.inner {
          background-color: #fff;
          margin-top: 10px;
        }
        
        .complex-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #2c3e50;
        }
        
        .complex-description {
          font-size: 14px;
          line-height: 1.6;
          color: #555;
        }
      `}</style>
    </View>
  );
}