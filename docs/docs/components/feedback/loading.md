# Loading 组件

Loading 组件是一个加载状态组件，用于在数据加载、操作处理等场景下显示加载动画，支持多种样式、大小、颜色等功能。

## 基本使用

### 基础加载

```tsx
<Loading />
```

### 不同大小

```tsx
<Loading size="small" />
<Loading size="medium" />
<Loading size="large" />
```

### 不同颜色

```tsx
<Loading color="primary" />
<Loading color="success" />
<Loading color="warning" />
<Loading color="error" />
<Loading color="#ff6b6b" />
```

### 不同类型

```tsx
<Loading type="spinner" />
<Loading type="circular" />
<Loading type="dots" />
<Loading type="wave" />
<Loading type="pulse" />
```

### 带文字的加载

```tsx
<Loading text="加载中..." />
<Loading text="处理中..." color="primary" type="circular" />
```

### 全屏加载

```tsx
<Loading fullScreen />
<Loading fullScreen text="全屏加载中..." color="primary" />
```

### 自定义样式

```tsx
<Loading 
  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}
  text="自定义样式加载" 
  color="primary" 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `spinner` | 加载类型，可选值：`spinner`、`circular`、`dots`、`wave`、`pulse` |
| size | `string` | `medium` | 加载大小，可选值：`small`、`medium`、`large` 或数字 |
| color | `string` | `primary` | 加载颜色，可选值：`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| text | `React.ReactNode` | - | 加载文字 |
| fullScreen | `boolean` | `false` | 是否全屏显示 |
| visible | `boolean` | `true` | 是否显示 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| overlay | `boolean` | `false` | 是否显示遮罩 |
| overlayColor | `string` | `rgba(0, 0, 0, 0.1)` | 遮罩颜色 |
| zIndex | `number` | `9999` | 层级 |
| animationDuration | `number` | - | 动画持续时间 |
| delay | `number` | - | 延迟显示时间 |
| onClose | `() => void` | - | 关闭回调 |

## 类型定义

```tsx
// Loading 组件属性接口
export interface LoadingProps {
  type?: 'spinner' | 'circular' | 'dots' | 'wave' | 'pulse';
  size?: 'small' | 'medium' | 'large' | number;
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  text?: React.ReactNode;
  fullScreen?: boolean;
  visible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
  overlayColor?: string;
  zIndex?: number;
  animationDuration?: number;
  delay?: number;
  onClose?: () => void;
}
```

## 示例代码

### 完整示例

```tsx
import { Loading, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const LoadingExample = () => {
  // 全屏加载状态
  const [fullScreenVisible, setFullScreenVisible] = useState(false);

  // 显示全屏加载
  const showFullScreenLoading = () => {
    setFullScreenVisible(true);
    // 3秒后自动关闭
    setTimeout(() => {
      setFullScreenVisible(false);
    }, 3000);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础加载</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Loading />
        <Loading type="circular" />
        <Loading type="dots" />
        <Loading type="wave" />
        <Loading type="pulse" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同大小</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Loading size="small" />
        <Loading size="medium" />
        <Loading size="large" />
        <Loading size={48} />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Loading color="primary" />
        <Loading color="success" />
        <Loading color="warning" />
        <Loading color="error" />
        <Loading color="#ff6b6b" />
        <Loading color="#4ecdc4" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带文字的加载</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Loading text="加载中..." />
        <Loading text="处理中..." color="primary" type="circular" />
        <Loading text="数据加载中..." color="success" type="dots" />
        <Loading text="提交中..." color="warning" type="wave" />
        <Loading text="加载失败..." color="error" type="pulse" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带遮罩的加载</Text>
      <View style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
        <View style={{ padding: '16px' }}>
          <Text>内容区域</Text>
        </View>
        <Loading overlay text="加载中..." />
      </View>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义样式</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Loading 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' }}
          text="自定义样式加载" 
          color="primary" 
        />
        <Loading 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '16px', borderRadius: '4px' }}
          text={<Text style={{ color: '#fff' }}>深色主题加载</Text>} 
          color="#fff" 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>全屏加载</Text>
      <View style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={showFullScreenLoading}>显示全屏加载</Button>
        {fullScreenVisible && (
          <Loading fullScreen text="全屏加载中..." color="primary" onClose={() => setFullScreenVisible(false)} />
        )}
      </View>
    </View>
  );
};

export default LoadingExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式可能存在差异 |

## 注意事项

1. **加载类型**：支持 spinner、circular、dots、wave、pulse 五种类型，适应不同的设计需求。
2. **大小配置**：支持 small、medium、large 三种预定义大小，也可以直接传入数字自定义大小。
3. **颜色配置**：支持内置颜色和自定义颜色值，可以根据主题需求灵活配置。
4. **全屏加载**：设置 fullScreen 为 true 时，加载组件会覆盖整个屏幕，常用于页面级加载。
5. **遮罩效果**：设置 overlay 为 true 时，加载组件会显示半透明遮罩，常用于局部加载。
6. **延迟显示**：可以通过 delay 属性设置延迟显示时间，避免频繁显示加载状态。
7. **性能优化**：加载组件使用了 CSS 动画，性能优良，不会造成页面卡顿。
8. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与加载组件结合使用
- [Modal 组件](#/components/feedback/modal) - 可与加载组件结合使用
- [Message 组件](#/components/feedback/message) - 可与加载组件结合使用
- [Toast 组件](#/components/feedback/toast) - 可与加载组件结合使用