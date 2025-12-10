# Toast 组件

Toast 组件是一个轻量级的消息提示组件，用于在页面上显示简短的操作结果、状态提示等信息，支持多种样式、位置、动画等功能。

## 基本使用

### 基础提示

```tsx
<Toast visible text="这是一条基础提示" />
```

### 不同类型

```tsx
<Toast type="success" text="操作成功" />
<Toast type="warning" text="警告信息" />
<Toast type="error" text="错误信息" />
<Toast type="info" text="提示信息" />
```

### 不同位置

```tsx
<Toast type="success" text="顶部提示" position="top" />
<Toast type="warning" text="中部提示" position="center" />
<Toast type="error" text="底部提示" position="bottom" />
```

### 带图标

```tsx
<Toast type="success" text="带图标成功提示" showIcon />
<Toast type="warning" text="带图标警告提示" showIcon />
<Toast type="error" text="带图标错误提示" showIcon />
<Toast type="info" text="带图标提示信息" showIcon />
```

### 自定义时长

```tsx
<Toast type="success" text="2秒后自动关闭" duration={2000} />
<Toast type="warning" text="5秒后自动关闭" duration={5000} />
```

### 自定义样式

```tsx
<Toast 
  type="success" 
  text="自定义样式提示" 
  style={{ backgroundColor: '#f6ffed', color: '#52c41a' }} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `info` | Toast 类型，可选值：`success`、`warning`、`error`、`info` |
| text | `React.ReactNode` | - | Toast 内容 |
| visible | `boolean` | `false` | 是否显示 Toast |
| duration | `number` | `3000` | 自动关闭时长（毫秒） |
| position | `string` | `center` | Toast 位置，可选值：`top`、`center`、`bottom` |
| showIcon | `boolean` | `false` | 是否显示图标 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onClose | `() => void` | - | 关闭回调 |
| onOpen | `() => void` | - | 打开回调 |
| mask | `boolean` | `false` | 是否显示遮罩 |
| maskClosable | `boolean` | `false` | 点击遮罩是否可关闭 |
| zIndex | `number` | `1000` | 层级 |
| animation | `boolean` | `true` | 是否显示动画 |
| icon | `React.ReactNode` | - | 自定义图标 |

## 类型定义

```tsx
// Toast 组件属性接口
export interface ToastProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  text?: React.ReactNode;
  visible?: boolean;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  animation?: boolean;
  icon?: React.ReactNode;
}
```

## 示例代码

### 完整示例

```tsx
import { Toast, Button, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const ToastExample = () => {
  // Toast 状态
  const [visible, setVisible] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error' | 'info'>('success');
  const [position, setPosition] = useState<'top' | 'center' | 'bottom'>('center');
  const [showIcon, setShowIcon] = useState(false);
  const [duration, setDuration] = useState(3000);

  // 显示 Toast
  const showToast = (type: 'success' | 'warning' | 'error' | 'info') => {
    setToastType(type);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>不同类型 Toast</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => showToast('success')}>成功提示</Button>
        <Button type="warning" onClick={() => showToast('warning')}>警告提示</Button>
        <Button type="danger" onClick={() => showToast('error')}>错误提示</Button>
        <Button type="default" onClick={() => showToast('info')}>信息提示</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同位置</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setPosition('top');
          showToast('success');
        }}>顶部提示</Button>
        <Button onClick={() => {
          setPosition('center');
          showToast('warning');
        }}>中部提示</Button>
        <Button onClick={() => {
          setPosition('bottom');
          showToast('error');
        }}>底部提示</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标提示</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setShowIcon(true);
          showToast('success');
        }}>带图标提示</Button>
        <Button onClick={() => {
          setShowIcon(false);
          showToast('info');
        }}>不带图标提示</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同时长</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setDuration(2000);
          showToast('success');
        }}>2秒关闭</Button>
        <Button onClick={() => {
          setDuration(5000);
          showToast('warning');
        }}>5秒关闭</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带遮罩</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 3000);
        }}>带遮罩提示</Button>
      </Space>

      <Toast
        visible={visible}
        type={toastType}
        text={toastType === 'success' ? '操作成功' : 
              toastType === 'warning' ? '警告信息' : 
              toastType === 'error' ? '错误信息' : '提示信息'}
        position={position}
        showIcon={showIcon}
        mask={true}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

export default ToastExample;
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

1. **Toast 类型**：支持 success、warning、error、info 四种类型，每种类型都有对应的默认颜色和图标。
2. **Toast 位置**：支持顶部、中部、底部三种位置，适应不同的设计需求。
3. **自动关闭**：默认 3 秒后自动关闭，可通过 duration 属性自定义时长。
4. **图标显示**：设置 showIcon 为 true 时，Toast 会显示对应的图标。
5. **遮罩配置**：可通过 mask 属性控制是否显示遮罩，maskClosable 属性控制点击遮罩是否关闭。
6. **自定义样式**：可通过 style 和 className 属性自定义 Toast 的样式。
7. **性能优化**：Toast 组件使用了 memo 优化，避免不必要的重渲染。
8. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与 Toast 组件结合使用
- [Message 组件](#/components/feedback/message) - 用于更复杂的消息提示
- [Notification 组件](#/components/feedback/notification) - 用于系统通知
- [Modal 组件](#/components/feedback/modal) - 用于需要用户确认的操作
