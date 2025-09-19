# Notification 通知提醒组件

Notification 组件提供全局通知提醒功能，支持多种类型、位置、动画效果。

## 功能特点

- ✅ 支持多种通知类型：success、info、warning、error
- ✅ 支持多种显示位置：topRight、topLeft、bottomRight、bottomLeft、top、bottom
- ✅ 支持多种动画效果：fade、slide、scale、bounce
- ✅ 支持自动关闭和手动关闭
- ✅ 支持拖拽功能
- ✅ 支持堆叠显示
- ✅ 支持进度条显示
- ✅ 支持自定义内容和样式
- ✅ 支持无障碍访问
- ✅ 完整的 TypeScript 支持
- ✅ 遵循项目的组件设计模式

## 基本使用

### 1. 使用 NotificationManager

```tsx
import React, { useRef } from 'react';
import { NotificationManager } from '@/components/feedback/Notification';

function App() {
  const notificationRef = useRef(null);

  const showNotification = () => {
    if (notificationRef.current) {
      notificationRef.current.success({
        title: '操作成功',
        message: '您的操作已成功完成！',
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <button onClick={showNotification}>显示通知</button>
      <NotificationManager ref={notificationRef} />
    </div>
  );
}
```

### 2. 使用全局通知方法

```tsx
import { notification } from '@/components/feedback/Notification';

// 设置全局通知管理器引用
import { setGlobalNotificationRef } from '@/components/feedback/Notification';
// 在你的应用中设置管理器引用

// 显示通知
notification.success({
  title: '成功',
  message: '操作成功完成！',
});

notification.error({
  title: '错误',
  message: '操作失败，请重试！',
});

notification.warning({
  title: '警告',
  message: '请注意检查您的输入！',
});

notification.info({
  title: '信息',
  message: '这是一条信息通知！',
});
```

## 组件 API

### Notification 组件

```tsx
interface NotificationProps {
  config: NotificationItem;
  onClose: (key: string) => void;
  onClick?: (key: string) => void;
  render?: (config: NotificationItem) => ReactNode;
}
```

### NotificationManager 组件

```tsx
interface NotificationManagerProps {
  maxCount?: number;           // 最大显示数量，默认 10
  defaultPlacement?: NotificationPlacement; // 默认位置，默认 topRight
  defaultDuration?: number;   // 默认显示时长，默认 4500ms
  defaultAnimation?: NotificationAnimation; // 默认动画，默认 fade
  stack?: boolean;            // 是否显示堆叠效果，默认 true
  stackMaxCount?: number;     // 堆叠最大数量，默认 3
  allowDrag?: boolean;        // 是否允许拖拽，默认 false
  dragThreshold?: number;     // 拖拽阈值，默认 50
  showGroup?: boolean;        // 是否显示分组，默认 false
  groupInterval?: number;     // 分组间隔，默认 5000ms
}
```

### Notification 配置

```tsx
interface NotificationItem {
  key: string;                // 通知唯一标识
  type: NotificationType;     // 通知类型
  title: ReactNode;           // 通知标题
  message: ReactNode;         // 通知内容
  description?: ReactNode;    // 通知描述
  icon?: ReactNode;           // 通知图标
  closeIcon?: ReactNode;      // 关闭图标
  action?: ReactNode;         // 操作按钮
  footer?: ReactNode;         // 底部内容
  duration?: number;         // 显示时长（毫秒），0 表示不自动关闭
  placement?: NotificationPlacement; // 位置
  closable?: boolean;          // 是否显示关闭按钮
  showProgress?: boolean;     // 是否显示进度条
  style?: React.CSSProperties; // 自定义样式
  className?: string;         // 自定义类名
  onClick?: () => void;       // 点击回调
  onClose?: () => void;       // 关闭回调
  pauseOnHover?: boolean;     // 悬停暂停自动关闭
  important?: boolean;        // 是否重要通知
  showShadow?: boolean;       // 是否显示阴影
  draggable?: boolean;        // 是否可拖拽
  priority?: 'high' | 'medium' | 'low'; // 优先级
  createdAt: number;          // 创建时间
  animation?: NotificationAnimation; // 动画类型
}
```

## 示例

### 基本通知

```tsx
notification.success({
  title: '操作成功',
  message: '您的操作已成功完成！',
});
```

### 带描述的通知

```tsx
notification.info({
  title: '系统更新',
  message: '系统将在今晚进行更新',
  description: '更新时间：23:00-24:00，请提前保存您的工作',
});
```

### 带操作按钮的通知

```tsx
notification.warning({
  title: '数据即将过期',
  message: '您的数据将在3天后过期',
  action: (
    <button onClick={() => console.log('续费')}>
      立即续费
    </button>
  ),
});
```

### 自定义图标的通知

```tsx
notification.success({
  title: '上传成功',
  message: '文件已成功上传到服务器',
  icon: <span>🎉</span>,
});
```

### 重要通知

```tsx
notification.error({
  title: '系统错误',
  message: '系统发生严重错误，请联系管理员',
  important: true,
  duration: 0, // 不自动关闭
});
```

## 全局配置

```tsx
import { DEFAULT_NOTIFICATION_CONFIG } from '@/components/feedback/Notification';

// 修改默认配置
DEFAULT_NOTIFICATION_CONFIG.defaultDuration = 5000;
DEFAULT_NOTIFICATION_CONFIG.defaultPlacement = 'top';
DEFAULT_NOTIFICATION_CONFIG.maxCount = 5;
```

## 注意事项

1. 组件基于 Taro 框架开发，支持多端运行
2. 建议在使用 NotificationManager 时配合 ref 使用
3. 全局通知方法需要先设置全局引用
4. 组件支持无障碍访问，请确保正确的 ARIA 属性
5. 在移动端使用时，建议调整样式以适应小屏幕

## 样式定制

组件支持通过 CSS 变量和样式类名进行定制：

```css
/* 自定义主题颜色 */
:root {
  --notification-primary: #1890ff;
  --notification-success: #52c41a;
  --notification-warning: #faad14;
  --notification-error: #f5222d;
}

/* 自定义样式 */
.taro-uno-notification {
  border-radius: 8px;
  font-family: 'PingFang SC', sans-serif;
}
```

## 类型定义

```tsx
type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'top' | 'bottom';
type NotificationAnimation = 'fade' | 'slide' | 'scale' | 'bounce';
```