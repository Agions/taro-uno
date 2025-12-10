# Progress 组件

Progress 组件是一个进度条组件，用于显示操作进度、加载进度、完成度等信息，支持多种样式、颜色、动画等功能。

## 基本使用

### 基础进度条

```tsx
<Progress percent={50} />
```

### 不同颜色

```tsx
<Progress percent={50} color="primary" />
<Progress percent={50} color="success" />
<Progress percent={50} color="warning" />
<Progress percent={50} color="error" />
<Progress percent={50} color="#ff6b6b" />
```

### 不同类型

```tsx
<Progress percent={50} type="line" />
<Progress percent={50} type="circle" />
<Progress percent={50} type="dashboard" />
```

### 不同尺寸

```tsx
<Progress percent={50} size="small" />
<Progress percent={50} size="medium" />
<Progress percent={50} size="large" />
```

### 显示百分比

```tsx
<Progress percent={50} showText />
<Progress percent={50} type="circle" showText />
<Progress percent={50} type="dashboard" showText />
```

### 自定义文字

```tsx
<Progress 
  percent={50} 
  showText 
  format={(percent) => `${percent}% 完成`} 
/>
```

### 带状态

```tsx
<Progress percent={100} status="success" />
<Progress percent={80} status="warning" />
<Progress percent={50} status="error" />
```

### 分段进度条

```tsx
<Progress 
  percent={100} 
  successPercent={60} 
  color="primary" 
  successColor="success" 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| percent | `number` | `0` | 进度百分比，取值范围 0-100 |
| type | `string` | `line` | 进度条类型，可选值：`line`、`circle`、`dashboard` |
| color | `string` | `primary` | 进度条颜色，可选值：`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| backgroundColor | `string` | `#f0f0f0` | 进度条背景色 |
| successColor | `string` | `success` | 分段进度条成功部分的颜色 |
| successPercent | `number` | `0` | 分段进度条成功部分的百分比 |
| size | `string` | `medium` | 进度条大小，可选值：`small`、`medium`、`large` |
| strokeWidth | `number` | - | 进度条线宽 |
| showText | `boolean` | `false` | 是否显示百分比文字 |
| format | `(percent: number) => string` | - | 自定义百分比文字格式 |
| status | `string` | - | 进度条状态，可选值：`success`、`warning`、`error` |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| animation | `boolean` | `true` | 是否显示动画效果 |
| animated | `boolean` | `false` | 是否显示动态效果 |
| radius | `number` | - | 圆角半径 |
| width | `number` | - | 圆形进度条的宽度 |
| height | `number` | - | 线条进度条的高度 |

## 类型定义

```tsx
// Progress 组件属性接口
export interface ProgressProps {
  percent?: number;
  type?: 'line' | 'circle' | 'dashboard';
  color?: 'primary' | 'success' | 'warning' | 'error' | string;
  backgroundColor?: string;
  successColor?: string;
  successPercent?: number;
  size?: 'small' | 'medium' | 'large';
  strokeWidth?: number;
  showText?: boolean;
  format?: (percent: number) => string;
  status?: 'success' | 'warning' | 'error';
  className?: string;
  style?: React.CSSProperties;
  animation?: boolean;
  animated?: boolean;
  radius?: number;
  width?: number;
  height?: number;
}
```

## 示例代码

### 完整示例

```tsx
import { Progress, View, Text, Space } from 'taro-uno-ui';

const ProgressExample = () => {
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础进度条</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress percent={30} />
        <Progress percent={50} />
        <Progress percent={80} />
        <Progress percent={100} />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress percent={50} color="primary" />
        <Progress percent={50} color="success" />
        <Progress percent={50} color="warning" />
        <Progress percent={50} color="error" />
        <Progress percent={50} color="#ff6b6b" />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同类型</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Text>线条进度条</Text>
        <Progress percent={50} type="line" />
        
        <Text style={{ marginTop: '12px' }}>圆形进度条</Text>
        <Space>
          <Progress percent={50} type="circle" />
          <Progress percent={70} type="circle" color="success" />
          <Progress percent={90} type="circle" color="warning" />
        </Space>
        
        <Text style={{ marginTop: '12px' }}>仪表盘进度条</Text>
        <Space>
          <Progress percent={50} type="dashboard" />
          <Progress percent={70} type="dashboard" color="success" />
          <Progress percent={90} type="dashboard" color="warning" />
        </Space>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>显示百分比</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress percent={50} showText />
        <Progress percent={50} type="circle" showText />
        <Progress percent={50} type="dashboard" showText />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义文字</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress 
          percent={50} 
          showText 
          format={(percent) => `${percent}% 完成`} 
        />
        <Progress 
          percent={50} 
          type="circle" 
          showText 
          format={(percent) => `${percent}%`} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带状态</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress percent={100} status="success" showText />
        <Progress percent={80} status="warning" showText />
        <Progress percent={50} status="error" showText />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>分段进度条</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress 
          percent={100} 
          successPercent={60} 
          color="primary" 
          successColor="success" 
          showText 
        />
        <Progress 
          percent={100} 
          successPercent={30} 
          color="warning" 
          successColor="success" 
          showText 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>动态效果</Text>
      <Space direction="vertical" style={{ marginBottom: '20px', width: '100%' }}>
        <Progress percent={50} animated showText />
      </Space>
    </View>
  );
};

export default ProgressExample;
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

1. **进度条类型**：支持线条、圆形、仪表盘三种类型，适应不同的使用场景。
2. **颜色配置**：支持内置颜色和自定义颜色值，可以根据主题需求灵活配置。
3. **百分比显示**：设置 showText 为 true 时，进度条会显示百分比文字，可通过 format 属性自定义文字格式。
4. **状态配置**：支持 success、warning、error 三种状态，用于表示不同的进度结果。
5. **分段进度**：通过 successPercent 属性可以实现分段进度条，适用于多阶段任务进度展示。
6. **动态效果**：设置 animated 为 true 时，进度条会显示动态效果，增强视觉体验。
7. **尺寸配置**：支持 small、medium、large 三种预定义大小，也可以通过 strokeWidth、width、height 属性自定义尺寸。
8. **性能优化**：进度条组件使用了 CSS 动画和 Canvas 绘制，性能优良，不会造成页面卡顿。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与进度条组件结合使用
- [Loading 组件](#/components/feedback/loading) - 用于加载状态显示
- [Message 组件](#/components/feedback/message) - 用于操作结果提示
- [Modal 组件](#/components/feedback/modal) - 可在模态框中显示进度条
