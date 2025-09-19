import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { CardProps, CardRef } from './Card.types';
import { cn } from '@/utils/index';
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
    onPress,
    onLongPress,
    accessibilityLabel,
    accessibilityRole = 'article',
    ...rest
  } = props;

  // Create ref for DOM element access
  const innerRef = React.useRef<any>(null);

  // Handle ref forwarding
  useImperativeHandle(ref, () => ({
    getElement: () => innerRef.current,
    getTitle: () => title?.toString() || null,
    getContent: () => innerRef.current?.querySelector('[data-testid="card-content"]'),
  }));

  const handlePress = (e: any) => {
    if (hoverable && onPress) {
      onPress(e);
    }
  };

  const renderCover = () => {
    if (!cover) return null;
    return (
      <View className={CardStyles['cover']} data-testid="card-cover">
        {cover}
      </View>
    );
  };

  const renderHeader = () => {
    if (!title && !subtitle && !extra) return null;
    return (
      <View className={CardStyles['header']} data-testid="card-header">
        <View className={CardStyles['headerContent']}>
          {title && (
            <View className={CardStyles['title']} data-testid="card-title">
              {title}
            </View>
          )}
          {subtitle && (
            <View className={CardStyles['subtitle']} data-testid="card-subtitle">
              {subtitle}
            </View>
          )}
        </View>
        {extra && (
          <View className={CardStyles['extra']} data-testid="card-extra">
            {extra}
          </View>
        )}
      </View>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    return (
      <View className={CardStyles['actions']} data-testid="card-actions">
        {actions.map((action, index) => (
          <View key={index} className={CardStyles['action']} data-testid={`card-action-${index}`}>
            {action}
          </View>
        ))}
      </View>
    );
  };

  const cardClasses = cn(
    'taro-uno-h5-card',
    CardStyles['base'],
    CardStyles['shadow'][shadow],
    bordered && CardStyles['bordered'],
    bordered && 'taro-uno-h5-card--bordered',
    shadow && `taro-uno-h5-card--shadow-${shadow}`,
    hoverable && CardStyles['hoverable'],
    hoverable && 'taro-uno-h5-card--hoverable',
    loading && CardStyles['loading'],
    loading && 'taro-uno-h5-card--loading',
    className,
  );

  return (
    <View
      ref={innerRef}
      className={cardClasses}
      style={style}
      onClick={handlePress}
      onLongPress={onLongPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      data-testid="card"
      data-shadow={shadow}
      data-bordered={bordered}
      data-hoverable={hoverable}
      data-loading={loading}
      {...rest}
    >
      {renderCover()}
      {renderHeader()}
      <View className={CardStyles['content']} data-testid="card-content">
        {loading ? (
          <View className={CardStyles['loadingContent']} data-testid="card-loading-content">
            <View className={CardStyles['loadingSkeleton']} data-testid="card-loading-skeleton" />
            <View className={CardStyles['loadingSkeleton']} data-testid="card-loading-skeleton" />
            <View className={CardStyles['loadingSkeleton']} data-testid="card-loading-skeleton" />
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
