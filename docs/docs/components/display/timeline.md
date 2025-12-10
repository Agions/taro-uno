# Timeline 组件

Timeline 组件是一个时间线组件，用于展示事件的时间顺序，支持自定义节点样式、连接线样式、方向等功能。

## 基本使用

### 基础时间线

```tsx
<Timeline>
  <Timeline.Item>2023-01-01 事件1</Timeline.Item>
  <Timeline.Item>2023-02-01 事件2</Timeline.Item>
  <Timeline.Item>2023-03-01 事件3</Timeline.Item>
  <Timeline.Item>2023-04-01 事件4</Timeline.Item>
</Timeline>
```

### 带时间戳的时间线

```tsx
<Timeline>
  <Timeline.Item timestamp="2023-01-01">事件1</Timeline.Item>
  <Timeline.Item timestamp="2023-02-01">事件2</Timeline.Item>
  <Timeline.Item timestamp="2023-03-01">事件3</Timeline.Item>
</Timeline>
```

### 不同颜色的时间线

```tsx
<Timeline>
  <Timeline.Item color="primary">主要事件</Timeline.Item>
  <Timeline.Item color="success">成功事件</Timeline.Item>
  <Timeline.Item color="warning">警告事件</Timeline.Item>
  <Timeline.Item color="error">错误事件</Timeline.Item>
</Timeline>
```

### 自定义节点

```tsx
<Timeline>
  <Timeline.Item node={<Icon name="check" />}>带图标节点</Timeline.Item>
  <Timeline.Item node={<div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1890ff' }} />}>自定义节点</Timeline.Item>
</Timeline>
```

### 垂直时间线

```tsx
<Timeline mode="vertical">
  <Timeline.Item timestamp="2023-01-01">垂直事件1</Timeline.Item>
  <Timeline.Item timestamp="2023-02-01">垂直事件2</Timeline.Item>
  <Timeline.Item timestamp="2023-03-01">垂直事件3</Timeline.Item>
</Timeline>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 时间线内容 |
| mode | `string` | `horizontal` | 时间线模式，可选值：`horizontal`、`vertical` |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| reverse | `boolean` | `false` | 是否倒序显示 |
| align | `string` | `center` | 垂直模式下的对齐方式，可选值：`top`、`center`、`bottom` |
| lineStyle | `React.CSSProperties` | - | 连接线样式 |
| lineColor | `string` | - | 连接线颜色 |

## Timeline.Item 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 时间线项内容 |
| timestamp | `React.ReactNode` | - | 时间戳 |
| color | `string` | `default` | 节点颜色，可选值：`default`、`primary`、`success`、`warning`、`error` 或自定义颜色值 |
| node | `React.ReactNode` | - | 自定义节点 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| lineStyle | `React.CSSProperties` | - | 连接线样式 |
| lineColor | `string` | - | 连接线颜色 |
| dotColor | `string` | - | 节点颜色 |

## 类型定义

```tsx
// Timeline 组件属性接口
export interface TimelineProps {
  children?: React.ReactNode;
  mode?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  align?: 'top' | 'center' | 'bottom';
  lineStyle?: React.CSSProperties;
  lineColor?: string;
}

// Timeline.Item 组件属性接口
export interface TimelineItemProps {
  children?: React.ReactNode;
  timestamp?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | string;
  node?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lineStyle?: React.CSSProperties;
  lineColor?: string;
  dotColor?: string;
}
```

## 示例代码

### 完整示例

```tsx
import { Timeline, Icon, View, Text } from 'taro-uno-ui';

const TimelineExample = () => {
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础时间线</Text>
      <Timeline style={{ marginBottom: '20px' }}>
        <Timeline.Item>2023-01-01 事件1</Timeline.Item>
        <Timeline.Item>2023-02-01 事件2</Timeline.Item>
        <Timeline.Item>2023-03-01 事件3</Timeline.Item>
        <Timeline.Item>2023-04-01 事件4</Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带时间戳的时间线</Text>
      <Timeline style={{ marginBottom: '20px' }}>
        <Timeline.Item timestamp="2023-01-01 10:00">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>项目启动</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>项目正式开始开发</Text>
        </Timeline.Item>
        <Timeline.Item timestamp="2023-02-15 14:30">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>需求分析完成</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>完成所有需求分析和文档编写</Text>
        </Timeline.Item>
        <Timeline.Item timestamp="2023-03-30 09:15">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>开发完成</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>所有功能开发完成，进入测试阶段</Text>
        </Timeline.Item>
        <Timeline.Item timestamp="2023-04-15 16:45">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>项目上线</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>项目正式上线，开始服务用户</Text>
        </Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同颜色的时间线</Text>
      <Timeline style={{ marginBottom: '20px' }}>
        <Timeline.Item color="primary">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>主要事件</Text>
        </Timeline.Item>
        <Timeline.Item color="success">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>成功事件</Text>
        </Timeline.Item>
        <Timeline.Item color="warning">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>警告事件</Text>
        </Timeline.Item>
        <Timeline.Item color="error">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>错误事件</Text>
        </Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义节点的时间线</Text>
      <Timeline style={{ marginBottom: '20px' }}>
        <Timeline.Item node={<Icon name="check" style={{ color: '#52c41a', fontSize: '16px' }} />}>
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>任务完成</Text>
        </Timeline.Item>
        <Timeline.Item node={<Icon name="warning" style={{ color: '#faad14', fontSize: '16px' }} />}>
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>需要注意</Text>
        </Timeline.Item>
        <Timeline.Item node={<Icon name="close" style={{ color: '#f5222d', fontSize: '16px' }} />}>
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>任务失败</Text>
        </Timeline.Item>
        <Timeline.Item node={<View style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1890ff' }} />}>
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>自定义节点</Text>
        </Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>垂直时间线</Text>
      <Timeline mode="vertical" style={{ marginBottom: '20px' }}>
        <Timeline.Item timestamp="2023-01-01">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>垂直事件1</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>这是垂直时间线的第一个事件</Text>
        </Timeline.Item>
        <Timeline.Item timestamp="2023-02-01">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>垂直事件2</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>这是垂直时间线的第二个事件</Text>
        </Timeline.Item>
        <Timeline.Item timestamp="2023-03-01">
          <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>垂直事件3</Text>
          <Text style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>这是垂直时间线的第三个事件</Text>
        </Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>倒序时间线</Text>
      <Timeline reverse style={{ marginBottom: '20px' }}>
        <Timeline.Item timestamp="2023-01-01">事件1</Timeline.Item>
        <Timeline.Item timestamp="2023-02-01">事件2</Timeline.Item>
        <Timeline.Item timestamp="2023-03-01">事件3</Timeline.Item>
      </Timeline>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义连接线样式</Text>
      <Timeline 
        lineColor="#ff6b6b" 
        lineStyle={{ borderStyle: 'dashed' }} 
        style={{ marginBottom: '20px' }} 
      >
        <Timeline.Item>自定义连接线样式1</Timeline.Item>
        <Timeline.Item>自定义连接线样式2</Timeline.Item>
        <Timeline.Item>自定义连接线样式3</Timeline.Item>
      </Timeline>
    </View>
  );
};

export default TimelineExample;
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

1. **时间线模式**：支持 horizontal（水平）和 vertical（垂直）两种模式，适应不同的布局需求。
2. **自定义节点**：可通过 node 属性自定义时间线节点，支持图标、文字、自定义 React 节点等。
3. **颜色配置**：支持内置颜色和自定义颜色值，可分别设置节点颜色和连接线颜色。
4. **倒序显示**：设置 reverse 为 true 时，时间线会倒序显示。
5. **垂直对齐**：垂直模式下，可通过 align 属性设置对齐方式（top、center、bottom）。
6. **性能优化**：时间线组件使用了 memo 优化，避免不必要的重渲染。
7. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Icon 组件](#/components/basic/icon) - 用于自定义时间线节点
- [Space 组件](#/components/layout/space) - 用于时间线布局
- [Text 组件](#/components/basic/text) - 用于时间线内容