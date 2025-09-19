import React, { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import { MessageProps, MessageRef } from './Message.types';
import { cn } from '../../../utils';
import { messageStyles } from './Message.styles';

export const Message = forwardRef<MessageRef, MessageProps>((props, ref) => {
  const {
    type = 'info',
    title,
    content,
    icon,
    closable = false,
    duration = 3000,
    className,
    style,
    onClose,
    ...rest
  } = props;
  const [visible, setVisible] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    hide: () => {
      setVisible(false);
      onClose?.();
      return true;
    },
    show: () => {
      setVisible(true);
      return true;
    },
    update: (newProps: Partial<MessageProps>) => {
      // 这里可以实现更新消息内容的逻辑
      console.log('Update message:', newProps);
      return true;
    },
  }));

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const renderIcon = () => {
    if (icon) {
      return <View className={messageStyles['icon']}>{icon}</View>;
    }

    const defaultIcons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    return (
      <View className={cn(messageStyles['icon'], messageStyles['iconType'][type])}>
        <Text className={messageStyles['iconText']}>{defaultIcons[type]}</Text>
      </View>
    );
  };

  const messageClasses = cn(messageStyles['base'], messageStyles['type'][type], className);

  if (!visible) return null;

  return (
    <View ref={ref} className={messageClasses} style={style} {...rest}>
      {renderIcon()}
      <View className={messageStyles['content']}>
        {title && <Text className={messageStyles['title']}>{title}</Text>}
        {content && <Text className={messageStyles['text']}>{content}</Text>}
      </View>
      {closable && (
        <View className={messageStyles['close']} onClick={handleClose}>
          <Text className={messageStyles['closeText']}>✕</Text>
        </View>
      )}
    </View>
  );
});

Message.displayName = 'Message';

export default Message;
