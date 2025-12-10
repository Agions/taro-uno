# Message 组件

Message 组件是一个消息提示组件，用于在页面顶部显示操作结果、系统通知等信息，支持多种类型、位置、持续时间等功能。

## 基本使用

### 不同类型

```tsx
<Message type="success" text="操作成功" />
<Message type="warning" text="警告信息" />
<Message type="error" text="错误信息" />
<Message type="info" text="提示信息" />
```

### 不同位置

```tsx
<Message type="success" text="顶部居中" position="top" />
<Message type="warning" text="顶部左侧" position="top-left" />
<Message type="error" text="顶部右侧" position="top-right" />
<Message type="info" text="底部居中" position="bottom" />
<Message type="success" text="底部左侧" position="bottom-left" />
<Message type="warning" text="底部右侧" position="bottom-right" />
```

### 自定义时长

```tsx
<Message type="success" text="2秒后自动关闭" duration={2000} />
<Message type="warning" text="5秒后自动关闭" duration={5000} />
<Message type="error" text="不自动关闭" duration={0} />
```

### 带图标

```tsx
<Message type="success" text="带图标成功消息" showIcon />
<Message type="warning" text="带图标警告消息" showIcon />
<Message type="error" text="带图标错误消息" showIcon />
<Message type="info" text="带图标提示消息" showIcon />
```

### 可关闭

```tsx
<Message 
  type="success" 
  text="可关闭消息" 
  closable 
  onClose={() => console.log('消息已关闭')} 
/>
<Message 
  type="warning" 
  text="带图标可关闭消息" 
  showIcon 
  closable 
/>
```

### 自定义样式

```tsx
<Message 
  type="success" 
  text="自定义样式消息" 
  style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '8px' }}
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `info` | 消息类型，可选值：`success`、`warning`、`error`、`info` |
| text | `React.ReactNode` | - | 消息内容 |
| duration | `number` | `3000` | 自动关闭时长（毫秒），0 表示不自动关闭 |
| position | `string` | `top` | 消息位置，可选值：`top`、`top-left`、`top-right`、`bottom`、`bottom-left`、`bottom-right` |
| showIcon | `boolean` | `false` | 是否显示图标 |
| closable | `boolean` | `false` | 是否可关闭 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onClose | `() => void` | - | 关闭回调 |
| onOpen | `() => void` | - | 打开回调 |
| onClick | `() => void` | - | 点击回调 |
| zIndex | `number` | `1000` | 层级 |
| animation | `boolean` | `true` | 是否显示动画 |
| icon | `React.ReactNode` | - | 自定义图标 |
| mask | `boolean` | `false` | 是否显示遮罩 |
| maskClosable | `boolean` | `false` | 点击遮罩是否可关闭 |

## 类型定义

```tsx
// Message 组件属性接口
export interface MessageProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  text?: React.ReactNode;
  duration?: number;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  showIcon?: boolean;
  closable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: () => void;
  zIndex?: number;
  animation?: boolean;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
}
```

## 示例代码

### 完整示例

```tsx
import { Message, Button, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const MessageExample = () => {
  // 消息状态
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'warning' | 'error' | 'info'>('success');

  // 显示消息
  const showMessage = (type: 'success' | 'warning' | 'error' | 'info') => {
    setMessageType(type);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);
  };

  // 处理消息关闭
  const handleClose = () => {
    console.log('消息已关闭');
    setMessageVisible(false);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>不同类型消息</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => showMessage('success')}>成功消息</Button>
        <Button type="warning" onClick={() => showMessage('warning')}>警告消息</Button>
        <Button type="danger" onClick={() => showMessage('error')}>错误消息</Button>
        <Button type="default" onClick={() => showMessage('info')}>提示消息</Button>
      </Space>

      {messageVisible && (
        <Message 
          type={messageType} 
          text={messageType === 'success' ? '操作成功' : 
                messageType === 'warning' ? '警告信息' : 
                messageType === 'error' ? '错误信息' : '提示信息'} 
          showIcon 
          closable 
          onClose={handleClose} 
        />
      )}

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同位置消息</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Message type="success" text="顶部居中" position="top" duration={2000} />
        <Message type="warning" text="顶部左侧" position="top-left" duration={2000} />
        <Message type="error" text="顶部右侧" position="top-right" duration={2000} />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标消息</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Message type="success" text="带图标成功消息" showIcon duration={2000} />
        <Message type="warning" text="带图标警告消息" showIcon duration={2000} />
        <Message type="error" text="带图标错误消息" showIcon duration={2000} />
        <Message type="info" text="带图标提示消息" showIcon duration={2000} />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>可关闭消息</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Message 
          type="success" 
          text="可关闭消息" 
          closable 
          duration={2000} 
        />
        <Message 
          type="warning" 
          text="带图标可关闭消息" 
          showIcon 
          closable 
          duration={2000} 
        />
        <Message 
          type="error" 
          text="不自动关闭消息" 
          showIcon 
          closable 
          duration={0} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义样式消息</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Message 
          type="success" 
          text="自定义背景色消息" 
          style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '8px' }}
          duration={2000} 
        />
        <Message 
          type="warning" 
          text="自定义字体大小消息" 
          style={{ fontSize: '16px', padding: '12px 16px' }}
          duration={2000} 
        />
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>消息队列</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => {
          showMessage('success');
          setTimeout(() => showMessage('warning'), 500);
          setTimeout(() => showMessage('error'), 1000);
          setTimeout(() => showMessage('info'), 1500);
        }}>显示消息队列</Button>
      </Space>
    </View>
  );
};

export default MessageExample;
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

1. **消息类型**：支持 success、warning、error、info 四种类型，每种类型都有对应的默认颜色和图标。
2. **消息位置**：支持顶部、顶部左侧、顶部右侧、底部、底部左侧、底部右侧六种位置，适应不同的设计需求。
3. **自动关闭**：默认 3 秒后自动关闭，可通过 duration 属性自定义时长，0 表示不自动关闭。
4. **图标显示**：设置 showIcon 为 true 时，消息会显示对应的图标。
5. **关闭功能**：设置 closable 为 true 时，消息会显示关闭按钮，点击可关闭消息。
6. **自定义样式**：可通过 style 和 className 属性自定义消息的样式。
7. **消息队列**：支持同时显示多条消息，会自动排队显示。
8. **性能优化**：消息组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与消息组件结合使用
- [Modal 组件](#/components/feedback/modal) - 用于需要用户确认的操作
- [Toast 组件](#/components/feedback/toast) - 用于轻量级的消息提示
- [Notification 组件](#/components/feedback/notification) - 用于系统通知