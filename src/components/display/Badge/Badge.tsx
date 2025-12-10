import { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import { createNamespace } from '@/utils/createNamespace';
import type { BadgeProps, BadgeRef } from './Badge.types';

const { bem } = createNamespace('badge');

export const Badge = forwardRef<BadgeRef, BadgeProps>((props, ref) => {
  const { count, dot = false, overflowCount = 99, showZero = false, children, style, className, ...rest } = props;

  const displayCount = count !== undefined && count > overflowCount ? `${overflowCount}+` : count;

  const shouldShowBadge = dot || (count !== undefined && (count > 0 || showZero));

  return (
    <View ref={ref} className={`${bem('wrapper')} ${className || ''}`.trim()} style={style} {...rest}>
      {children}
      {shouldShowBadge && (
        <View className={`${bem('badge')} ${dot ? bem('dot') : ''}`.trim()}>
          {dot ? null : <Text className={bem('count')}>{displayCount}</Text>}
        </View>
      )}
    </View>
  );
});

Badge.displayName = 'Badge';

export default Badge;
