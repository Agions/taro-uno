import React, { useRef, useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { NotificationManager, notification } from './index';
import type { NotificationType, NotificationPlacement, NotificationAnimation, NotificationManagerRef } from './Notification.types';

export const NotificationExamples: React.FC = () => {
  const notificationRef = useRef<NotificationManagerRef | null>(null);
  const [placement, setPlacement] = useState<NotificationPlacement>('topRight');
  const [animation, setAnimation] = useState<NotificationAnimation>('fade');

  // 设置全局通知引用
  React.useEffect(() => {
    if (notificationRef.current) {
      // 设置全局通知引用
      const { setGlobalNotificationRef } = require('./index');
      setGlobalNotificationRef(notificationRef.current);
    }
  }, [notificationRef]);

  const showBasicNotification = (type: NotificationType) => {
    if (notificationRef.current) {
      const config = {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} 通知`,
        content: `这是一条${type}类型的通知消息`,
        placement,
        animation,
      };

      switch (type) {
        case 'success':
          notificationRef.current.success(config);
          break;
        case 'error':
          notificationRef.current.error(config);
          break;
        case 'warning':
          notificationRef.current.warning(config);
          break;
        case 'info':
          notificationRef.current.info(config);
          break;
      }
    }
  };

  const showCustomNotification = () => {
    if (notificationRef.current) {
      notificationRef.current.open({
        type: 'success',
        title: '自定义通知',
        content: '这是一条自定义的通知消息',
        duration: 5000,
        placement,
        animation,
      });
    }
  };

  const showImportantNotification = () => {
    if (notificationRef.current) {
      notificationRef.current.error({
        title: '重要通知',
        content: '这是一条重要的错误通知',
        duration: 0, // 不自动关闭
        placement,
        animation,
      });
    }
  };

  const showNotificationWithProgress = () => {
    if (notificationRef.current) {
      notificationRef.current.info({
        title: '处理中',
        content: '正在处理您的请求，请稍候...',
        duration: 8000,
        placement,
        animation,
      });
    }
  };

  const testGlobalNotification = () => {
    // 测试全局通知方法
    notification.success({
      title: '全局通知',
      content: '这是通过全局方法调用的通知',
      placement,
      animation,
    });
  };

  const clearAllNotifications = () => {
    if (notificationRef.current) {
      notificationRef.current.destroyAll();
    }
  };

  return (
    <View style={{ padding: '20px' }}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Notification 通知组件示例
      </Text>

      {/* 配置选项 */}
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>配置选项：</Text>
        
        <View style={{ marginBottom: '10px' }}>
          <Text>位置：</Text>
          <Button 
            size="mini" 
            onClick={() => setPlacement('topRight')}
            style={{ marginLeft: '10px' }}
          >
            右上
          </Button>
          <Button 
            size="mini" 
            onClick={() => setPlacement('topLeft')}
            style={{ marginLeft: '10px' }}
          >
            左上
          </Button>
          <Button 
            size="mini" 
            onClick={() => setPlacement('bottomRight')}
            style={{ marginLeft: '10px' }}
          >
            右下
          </Button>
          <Button 
            size="mini" 
            onClick={() => setPlacement('bottomLeft')}
            style={{ marginLeft: '10px' }}
          >
            左下
          </Button>
          <Button 
            size="mini" 
            onClick={() => setPlacement('top')}
            style={{ marginLeft: '10px' }}
          >
            顶部
          </Button>
          <Button 
            size="mini" 
            onClick={() => setPlacement('bottom')}
            style={{ marginLeft: '10px' }}
          >
            底部
          </Button>
        </View>

        <View>
          <Text>动画：</Text>
          <Button 
            size="mini" 
            onClick={() => setAnimation('fade')}
            style={{ marginLeft: '10px' }}
          >
            淡入
          </Button>
          <Button 
            size="mini" 
            onClick={() => setAnimation('slide')}
            style={{ marginLeft: '10px' }}
          >
            滑入
          </Button>
          <Button 
            size="mini" 
            onClick={() => setAnimation('scale')}
            style={{ marginLeft: '10px' }}
          >
            缩放
          </Button>
          <Button 
            size="mini" 
            onClick={() => setAnimation('bounce')}
            style={{ marginLeft: '10px' }}
          >
            弹跳
          </Button>
        </View>
      </View>

      {/* 基本通知 */}
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>基本通知：</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Button onClick={() => showBasicNotification('success')} type="primary">
            成功通知
          </Button>
          <Button onClick={() => showBasicNotification('info')}>
            信息通知
          </Button>
          <Button onClick={() => showBasicNotification('warning')} type="warn">
            警告通知
          </Button>
          <Button onClick={() => showBasicNotification('error')} type="warn">
            错误通知
          </Button>
        </View>
      </View>

      {/* 高级通知 */}
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>高级通知：</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Button onClick={showCustomNotification}>
            自定义通知
          </Button>
          <Button onClick={showImportantNotification} type="warn">
            重要通知
          </Button>
          <Button onClick={showNotificationWithProgress}>
            带进度条
          </Button>
          <Button onClick={testGlobalNotification}>
            全局通知
          </Button>
        </View>
      </View>

      {/* 管理操作 */}
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>管理操作：</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Button onClick={clearAllNotifications} type="warn">
            清除所有
          </Button>
        </View>
      </View>

      {/* 当前配置显示 */}
      <View style={{ 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <Text>当前配置：位置={placement}, 动画={animation}</Text>
      </View>

      {/* 通知管理器 */}
      <NotificationManager ref={notificationRef} />
    </View>
  );
};

export default NotificationExamples;