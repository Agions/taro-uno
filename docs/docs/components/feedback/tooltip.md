# Tooltip 组件

Tooltip 组件是一个提示组件，用于在鼠标悬停或触摸时显示额外的信息，支持多种样式、位置、动画等功能。

## 基本使用

### 基础提示

```tsx
<Tooltip content="这是一个提示">
  <Text>悬停显示提示</Text>
</Tooltip>
```

### 不同位置

```tsx
<Tooltip content="顶部提示" position="top">
  <Text>顶部提示</Text>
</Tooltip>
<Tooltip content="底部提示" position="bottom">
  <Text>底部提示</Text>
</Tooltip>
<Tooltip content="左侧提示" position="left">
  <Text>左侧提示</Text>
</Tooltip>
<Tooltip content="右侧提示" position="right">
  <Text>右侧提示</Text>
</Tooltip>
```

### 不同触发方式

```tsx
<Tooltip content="悬停触发" trigger="hover">
  <Text>悬停触发</Text>
</Tooltip>
<Tooltip content="点击触发" trigger="click">
  <Text>点击触发</Text>
</Tooltip>
<Tooltip content="聚焦触发" trigger="focus">
  <Input placeholder="聚焦显示提示" />
</Tooltip>
```

### 不同主题

```tsx
<Tooltip content="深色主题" theme="dark">
  <Text>深色主题</Text>
</Tooltip>
<Tooltip content="浅色主题" theme="light">
  <Text>浅色主题</Text>
</Tooltip>
```

### 自定义样式

```tsx
<Tooltip 
  content="自定义样式" 
  style={{ backgroundColor: 'primary', color: '#fff', padding: '8px 12px', borderRadius: '4px' }} 
>
  <Text>自定义样式</Text>
</Tooltip>
```

### 带箭头

```tsx
<Tooltip content="带箭头提示" arrow>
  <Text>带箭头提示</Text>
</Tooltip>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| content | `React.ReactNode` | - | 提示内容 |
| position | `string` | `top` | 提示位置，可选值：`top`、`bottom`、`left`、`right` |
| trigger | `string` | `hover` | 触发方式，可选值：`hover`、`click`、`focus` |
| theme | `string` | `dark` | 主题，可选值：`dark`、`light` |
| arrow | `boolean` | `true` | 是否显示箭头 |
| visible | `boolean` | - | 是否可见（受控模式） |
| defaultVisible | `boolean` | `false` | 默认是否可见（非受控模式） |
| onVisibleChange | `(visible: boolean) => void` | - | 可见性变化回调 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| zIndex | `number` | `1000` | 层级 |
| animation | `boolean` | `true` | 是否显示动画 |
| delay | `number` | `0` | 延迟显示时间（毫秒） |
| duration | `number` | `200` | 动画持续时间（毫秒） |
| placement | `string` | - | 兼容旧版属性，同 position |

## 类型定义

```tsx
// Tooltip 组件属性接口
export interface TooltipProps {
  content?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  theme?: 'dark' | 'light';
  arrow?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  animation?: boolean;
  delay?: number;
  duration?: number;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}
```

## 示例代码

### 完整示例

```tsx
import { Tooltip, Button, Space, View, Text, Input } from 'taro-uno-ui';
import { useState } from 'react';

const TooltipExample = () => {
  // 受控模式状态
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础提示</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip content="这是一个基础提示">
          <Button type="primary">悬停显示提示</Button>
        </Tooltip>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同位置</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip content="顶部提示" position="top">
          <Button type="default">顶部</Button>
        </Tooltip>
        <Tooltip content="底部提示" position="bottom">
          <Button type="default">底部</Button>
        </Tooltip>
        <Tooltip content="左侧提示" position="left">
          <Button type="default">左侧</Button>
        </Tooltip>
        <Tooltip content="右侧提示" position="right">
          <Button type="default">右侧</Button>
        </Tooltip>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同触发方式</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip content="悬停触发" trigger="hover">
          <Button type="primary">悬停</Button>
        </Tooltip>
        <Tooltip content="点击触发" trigger="click">
          <Button type="warning">点击</Button>
        </Tooltip>
        <Tooltip content="聚焦触发" trigger="focus">
          <Input placeholder="聚焦显示提示" style={{ width: '200px' }} />
        </Tooltip>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同主题</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip content="深色主题" theme="dark">
          <Button type="default">深色</Button>
        </Tooltip>
        <Tooltip content="浅色主题" theme="light">
          <Button type="default">浅色</Button>
        </Tooltip>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带箭头</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip content="带箭头提示" arrow>
          <Button type="primary">带箭头</Button>
        </Tooltip>
        <Tooltip content="不带箭头提示" arrow={false}>
          <Button type="default">不带箭头</Button>
        </Tooltip>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>受控模式</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip 
          content="受控提示" 
          visible={visible} 
          onVisibleChange={setVisible} 
        >
          <Button type="primary">受控模式</Button>
        </Tooltip>
        <Button 
          type="default" 
          onClick={() => setVisible(!visible)} 
        >
          {visible ? '隐藏提示' : '显示提示'}
        </Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义样式</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Tooltip 
          content="自定义样式提示" 
          style={{ 
            backgroundColor: '#f6ffed', 
            color: '#52c41a', 
            border: '1px solid #b7eb8f',
            padding: '8px 12px',
            borderRadius: '4px'
          }} 
        >
          <Button type="success">自定义样式</Button>
        </Tooltip>
      </Space>
    </View>
  );
};

export default TooltipExample;
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

1. **触发方式**：支持悬停、点击、聚焦三种触发方式，适应不同的交互场景。
2. **提示位置**：支持顶部、底部、左侧、右侧四种位置，可根据元素位置自动调整。
3. **主题样式**：支持深色和浅色两种主题，适应不同的页面风格。
4. **箭头显示**：默认显示箭头，可通过 arrow 属性控制是否显示。
5. **受控模式**：支持受控模式和非受控模式，可根据需要选择。
6. **自定义样式**：可通过 style 和 className 属性自定义提示框的样式。
7. **动画效果**：默认显示平滑的动画效果，可通过 animation 属性控制是否显示。
8. **性能优化**：Tooltip 组件使用了 memo 和 lazy loading 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与 Tooltip 组件结合使用
- [Input 组件](#/components/form/input) - 可与 Tooltip 组件结合使用
- [Popover 组件](#/components/feedback/popover) - 用于更复杂的弹出内容
