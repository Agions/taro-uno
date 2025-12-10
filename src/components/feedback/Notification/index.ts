export { Notification } from './Notification';
export { default as NotificationManager } from './NotificationManager';

// Simple notification singleton for direct usage
class NotificationSingleton {
  open = (_config: any) => {
    console.warn(
      'Notification singleton called. Please render <NotificationManager /> in your app for full functionality.',
    );
    return 'notification-key';
  };

  success = (config: any) => this.open({ ...config, type: 'success' });
  info = (config: any) => this.open({ ...config, type: 'info' });
  warning = (config: any) => this.open({ ...config, type: 'warning' });
  error = (config: any) => this.open({ ...config, type: 'error' });
  close = (_key: string) => {};
  destroyAll = () => {};
  update = (_key: string, _config: any) => {};
  getNotifications = () => [];
  getCount = () => 0;
  setMaxCount = (_count: number) => {};
  setDefaultPlacement = (_placement: any) => {};
  setDefaultDuration = (_duration: number) => {};
  pauseAll = () => {};
  resumeAll = () => {};
  clearHistory = () => {};
  getHistory = () => [];
}

export const notification = new NotificationSingleton();
export type {
  NotificationProps,
  NotificationRef,
  NotificationManagerProps,
  NotificationPlacement,
} from './Notification.types';
export { notificationStyles } from './Notification.styles';

export default Notification;
