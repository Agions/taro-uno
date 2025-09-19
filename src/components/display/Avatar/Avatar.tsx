import { forwardRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { createNamespace } from '@/utils/createNamespace';
import type { AvatarProps, AvatarRef } from './Avatar.types';
import { avatarStyles } from './Avatar.styles';

const { bem } = createNamespace('avatar');

export const Avatar = forwardRef<AvatarRef, AvatarProps>((props, ref) => {
  const {
    src,
    alt,
    size = 'medium',
    shape = 'circle',
    icon,
    children,
    style,
    className,
    onClick,
    ...rest
  } = props;

  const handleClick = (event: any) => {
    onClick?.(event);
  };

  const getAvatarContent = () => {
    if (src) {
      return (
        <Image
          src={src}
          className={bem('image')}
          mode="aspectFill"
          onError={(e) => {
            console.error('Avatar image load error:', e);
          }}
        />
      );
    }

    if (icon) {
      return <View className={bem('icon')}>{icon}</View>;
    }

    if (children) {
      return (
        <Text className={bem('text')}>
          {children}
        </Text>
      );
    }

    return (
      <Text className={bem('text')}>
        {String(alt || 'U').charAt(0).toUpperCase()}
      </Text>
    );
  };

  return (
    <View
      ref={ref}
      className={`${bem()} ${bem('size-' + size)} ${bem('shape-' + shape)} ${className || ''}`.trim()}
      style={{
        ...avatarStyles[size],
        ...avatarStyles[shape],
        ...style,
      }}
      onClick={handleClick}
      {...rest}
    >
      {getAvatarContent()}
    </View>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;