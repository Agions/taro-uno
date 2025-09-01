import React, { forwardRef } from 'react';
import { View } from '@tarojs/components';
import { CardProps, CardRef } from './Card.types';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/utils';
import { CardStyles } from './Card.styles';

export const Card = forwardRef<CardRef, CardProps>((props, ref) => {
  const {
    children,
    title,
    subtitle,
    extra,
    cover,
    actions,
    hoverable = false,
    bordered = true,
    shadow = 'default',
    loading = false,
    className,
    style,
    ...rest
  } = props;

  const platform = usePlatform();
  const isH5 = platform === 'h5';

  const handlePress = (e: any) => {
    if (hoverable && props.onPress) {
      props.onPress(e);
    }
  };

  const renderCover = () => {
    if (!cover) return null;
    return <View className={CardStyles.cover}>{cover}</View>;
  };

  const renderHeader = () => {
    if (!title && !subtitle && !extra) return null;
    return (
      <View className={CardStyles.header}>
        <View className={CardStyles.headerContent}>
          {title && <View className={CardStyles.title}>{title}</View>}
          {subtitle && <View className={CardStyles.subtitle}>{subtitle}</View>}
        </View>
        {extra && <View className={CardStyles.extra}>{extra}</View>}
      </View>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    return (
      <View className={CardStyles.actions}>
        {actions.map((action, index) => (
          <View key={index} className={CardStyles.action}>
            {action}
          </View>
        ))}
      </View>
    );
  };

  const cardClasses = cn(
    CardStyles.base,
    CardStyles.shadow[shadow],
    bordered && CardStyles.bordered,
    hoverable && CardStyles.hoverable,
    loading && CardStyles.loading,
    className,
  );

  return (
    <View ref={ref} className={cardClasses} style={style} onClick={handlePress} {...rest}>
      {renderCover()}
      {renderHeader()}
      <View className={CardStyles.content}>
        {loading ? (
          <View className={CardStyles.loadingContent}>
            <View className={CardStyles.loadingSkeleton} />
            <View className={CardStyles.loadingSkeleton} />
            <View className={CardStyles.loadingSkeleton} />
          </View>
        ) : (
          children
        )}
      </View>
      {renderActions()}
    </View>
  );
});

Card.displayName = 'Card';
