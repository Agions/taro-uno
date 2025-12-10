# Notification 组件

Notification 组件是一个通知组件，用于在页面顶部或底部显示系统通知、操作结果等信息，支持多种样式、位置、动画等功能。

## 基本使用

### 基础通知

```tsx
<Notification visible>
  <Text>这是一条基础通知</Text>
</Notification>
```

### 不同类型

```tsx
<Notification type="success" text="操作成功" />
<Notification type="warning" text="警告信息" />
<Notification type="error" text="错误信息" />
<Notification type="info" text="提示信息" />
```

### 不同位置

```tsx
<Notification type="success" text="顶部通知" position="top" />
<Notification type="warning" text="底部通知" position="bottom" />
```

### 带图标

```tsx
<Notification type="success" text="带图标成功通知" showIcon />
<Notification type="warning" text="带图标警告通知" showIcon />
<Notification type="error" text="带图标错误通知" showIcon />
<Notification type="info" text="带图标提示通知" showIcon />
```

### 可关闭

```tsx
<Notification 
  type="success" 
  text="可关闭通知" 
  closable 
  onClose={() => console.log('通知已关闭')} 
/>
```

### 自定义时长

```tsx
<Notification type="success" text="2秒后自动关闭" duration={2000} />
<Notification type="warning" text="5秒后自动关闭" duration={5000} />
<Notification type="error" text="不自动关闭" duration={0} />
```

### 自定义样式

```tsx
<Notification 
  type="success" 
  text="自定义样式通知" 
  style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `info` | 通知类型，可选值：`success`、`warning`、`error`、`info` |
| text | `React.ReactNode` | - | 通知内容 |
| visible | `boolean` | `false` | 是否显示通知 |
| duration | `number` | `3000` | 自动关闭时长（毫秒），0 表示不自动关闭 |
| position | `string` | `top` | 通知位置，可选值：`top`、`bottom` |
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
| maxCount | `number` | `5` | 最大显示数量 |

## 类型定义

```tsx
// Notification 组件属性接口
export interface NotificationProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  text?: React.ReactNode;
  visible?: boolean;
  duration?: number;
  position?: 'top' | 'bottom';
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
  maxCount?: number;
}
```

## 示例代码

### 完整示例

```tsx
import { Notification, Button, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const NotificationExample = () => {
  // 通知状态
  const [visible, setVisible] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'warning' | 'error' | 'info'>('success');
  const [position, setPosition] = useState<'top' | 'bottom'>('top');

  // 显示通知
  const showNotification = (type: 'success' | 'warning' | 'error' | 'info') => {
    setNotificationType(type);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>不同类型通知</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={() => showNotification('success')}>成功通知</Button>
        <Button type="warning" onClick={() => showNotification('warning')}>警告通知</Button>
        <Button type="danger" onClick={() => showNotification('error')}>错误通知</Button>
        <Button type="default" onClick={() => showNotification('info')}>提示通知</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>不同位置通知</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setPosition('top');
          showNotification('success');
        }}>顶部通知</Button>
        <Button onClick={() => {
          setPosition('bottom');
          showNotification('warning');
        }}>底部通知</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带图标通知</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => {
          setVisible(true);
          setTimeout(() => setVisible(false), 3000);
        }}>显示带图标通知</Button>
      </Space>

      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>可关闭通知</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => setVisible(true)}>显示可关闭通知</Button>
      </Space>

      {visible && (
        <Notification
          type={notificationType}
          text={notificationType === 'success' ? '操作成功' : 
                notificationType === 'warning' ? '警告信息' : 
                notificationType === 'error' ? '错误信息' : '提示信息'}
          showIcon
          closable
          position={position}
          onClose={() => setVisible(false)}
        />
      )}
    </View>
  );
};

export default NotificationExample;
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

1. **通知类型**：支持 success、warning、error、info 四种类型，每种类型都有对应的默认颜色和图标。
2. **通知位置**：支持顶部和底部两种位置，适应不同的设计需求。
3. **自动关闭**：默认 3 秒后自动关闭，可通过 duration 属性自定义时长，0 表示不自动关闭。
4. **图标显示**：设置 showIcon 为 true 时，通知会显示对应的图标。
5. **关闭功能**：设置 closable 为 true 时，通知会显示关闭按钮，点击可关闭通知。
6. **自定义样式**：可通过 style 和 className 属性自定义通知的样式。
7. **通知队列**：支持同时显示多条通知，会自动排队显示，最多显示 5 条。
8. **性能优化**：通知组件使用了 memo 优化，避免不必要的重渲染。
9. **无障碍支持**：默认添加了适当的 aria 属性，提高可访问性。

## 相关组件

- [Button 组件](#/components/basic/button) - 可与通知组件结合使用
- [Message 组件](#/components/feedback/message) - 用于轻量级的消息提示
- [Modal 组件](#/components/feedback/modal) - 用于需要用户确认的操作
- [Toast 组件](#/components/feedback/toast) - 用于轻量级的消息提示
