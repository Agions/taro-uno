import React, { forwardRef } from 'react';
import { View } from '@tarojs/components';
import { ListProps, ListItemProps, ListRef } from './List.types';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/utils';
import { ListStyles } from './List.styles';

export const List = forwardRef<ListRef, ListProps>((props, ref) => {
  const {
    children,
    dataSource,
    renderItem,
    header,
    footer,
    bordered = true,
    split = true,
    loading = false,
    size = 'default',
    className,
    style,
    ...rest
  } = props;

  const platform = usePlatform();
  const isH5 = platform === 'h5';

  const renderItems = () => {
    if (dataSource && renderItem) {
      return dataSource.map((item, index) => (
        <ListItem key={item.key || index} index={index} size={size} split={split && index !== dataSource.length - 1}>
          {renderItem(item, index)}
        </ListItem>
      ));
    }

    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          index,
          size,
          split: split && index !== React.Children.count(children) - 1,
        } as Partial<ListItemProps>);
      }
      return child;
    });
  };

  const renderHeader = () => {
    if (!header) return null;
    return <View className={ListStyles.header}>{header}</View>;
  };

  const renderFooter = () => {
    if (!footer) return null;
    return <View className={ListStyles.footer}>{footer}</View>;
  };

  const listClasses = cn(ListStyles.base, ListStyles.size[size], bordered && ListStyles.bordered, className);

  return (
    <View ref={ref} className={listClasses} style={style} {...rest}>
      {renderHeader()}
      <View className={ListStyles.content}>
        {loading ? (
          <View className={ListStyles.loading}>
            <View className={ListStyles.loadingItem} />
            <View className={ListStyles.loadingItem} />
            <View className={ListStyles.loadingItem} />
          </View>
        ) : (
          renderItems()
        )}
      </View>
      {renderFooter()}
    </View>
  );
});

List.displayName = 'List';

export const ListItem = forwardRef<any, ListItemProps>((props, ref) => {
  const {
    children,
    index,
    size = 'default',
    split = true,
    disabled = false,
    clickable = false,
    className,
    style,
    onPress,
    onLongPress,
    ...rest
  } = props;

  const handlePress = (e: any) => {
    if (!disabled && clickable && onPress) {
      onPress(e);
    }
  };

  const itemClasses = cn(
    ListStyles.item,
    ListStyles.itemSize[size],
    split && ListStyles.itemSplit,
    disabled && ListStyles.itemDisabled,
    clickable && ListStyles.itemClickable,
    className,
  );

  return (
    <View ref={ref} className={itemClasses} style={style} onClick={handlePress} onLongPress={onLongPress} {...rest}>
      {children}
    </View>
  );
});

ListItem.displayName = 'ListItem';
