import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { tabsStyles } from './Tabs.styles';
import type { TabsProps, TabsRef, TabPosition, TabType, TabSize, TabItem } from './Tabs.types';

/** Tabs组件 */
export const TabsComponent = forwardRef<TabsRef, TabsProps>((props, ref) => {
  const {
    items,
    activeKey: controlledActiveKey,
    defaultActiveKey,
    position = 'top',
    type = 'line',
    size = 'default',
    editable = false,
    addable = false,
    animated = true,
    centered = false,
    forceRender = false,
    destroyInactiveTabPane = false,
    onTabClick,
    onChange,
    onAdd,
    onRemove,
    onEdit,
    renderTabBar,
    renderTab,
    renderContent,
    className,
    style,
    ...restProps
  } = props;

  const tabsRef = useRef<any>(null);
  const [internalItems, setInternalItems] = useState<TabItem[]>(items || []);
  const [activeKey, setActiveKey] = useState<string>(defaultActiveKey || items?.[0]?.key || '');
  const [internalPosition, setInternalPosition] = useState<TabPosition>(position);
  const [internalType, setInternalType] = useState<TabType>(type);
  const [internalSize, setInternalSize] = useState<TabSize>(size);

  // 处理受控模式
  useEffect(() => {
    if (controlledActiveKey !== undefined) {
      setActiveKey(controlledActiveKey);
    }
  }, [controlledActiveKey]);

  useEffect(() => {
    setInternalItems(items || []);
  }, [items]);

  useEffect(() => {
    setInternalPosition(position);
  }, [position]);

  useEffect(() => {
    setInternalType(type);
  }, [type]);

  useEffect(() => {
    setInternalSize(size);
  }, [size]);

  // 处理Tab点击
  const handleTabClick = useCallback(
    (key: string, event: React.MouseEvent) => {
      if (controlledActiveKey === undefined) {
        setActiveKey(key);
      }
      onTabClick?.(key, event);
      onChange?.(key);
    },
    [controlledActiveKey, onTabClick, onChange],
  );

  // 处理添加Tab
  const handleAdd = useCallback(() => {
    onAdd?.();
    onEdit?.('', 'add');
  }, [onAdd, onEdit]);

  // 处理删除Tab
  const handleRemove = useCallback(
    (key: string, event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove?.(key);
      onEdit?.(key, 'remove');
    },
    [onRemove, onEdit],
  );

  // 渲染Tab栏
  const renderTabBarInternal = () => {
    if (renderTabBar) {
      return renderTabBar(props);
    }

    return (
      <View className="taro-uno-tabs__tab-bar" style={tabsStyles['getTabBarStyle'](internalPosition, internalType)}>
        {internalItems.map((item, index) => {
          const isActive = activeKey === item.key;
          const isDisabled = item.disabled;

          return (
            <View
              key={item.key}
              className={`taro-uno-tabs__tab-item ${isActive ? 'taro-uno-tabs__tab-item--active' : ''} ${
                isDisabled ? 'taro-uno-tabs__tab-item--disabled' : ''
              }`}
              style={tabsStyles['getTabItemStyle']({
                active: isActive,
                disabled: isDisabled || false,
                type: internalType,
                size: internalSize,
                position: internalPosition,
              })}
              onClick={(e) => !isDisabled && handleTabClick(item.key, e)}
            >
              {renderTab ? (
                renderTab(item, index)
              ) : (
                <>
                  {item.icon && <View className="taro-uno-tabs__tab-icon">{item.icon}</View>}
                  <Text className="taro-uno-tabs__tab-title">{item.title}</Text>
                  {item.badge && (
                    <View className="taro-uno-tabs__tab-badge" style={tabsStyles['getBadgeStyle']()}>
                      {item.badge}
                    </View>
                  )}
                  {editable && internalItems.length > 1 && (
                    <View
                      className="taro-uno-tabs__tab-remove"
                      style={tabsStyles['getRemoveButtonStyle']()}
                      onClick={(e) => handleRemove(item.key, e)}
                    >
                      ×
                    </View>
                  )}
                </>
              )}
            </View>
          );
        })}
        {addable && (
          <View
            className="taro-uno-tabs__tab-add"
            style={tabsStyles['getAddButtonStyle'](internalSize)}
            onClick={handleAdd}
          >
            +
          </View>
        )}
      </View>
    );
  };

  // 渲染内容区域
  const renderContentInternal = () => {
    return (
      <View className="taro-uno-tabs__content" style={tabsStyles['getContentStyle'](internalPosition, animated)}>
        {internalItems.map((item, index) => {
          const isActive = activeKey === item.key;

          // 如果销毁隐藏的Tab且不活跃，则不渲染
          if (destroyInactiveTabPane && !isActive && !forceRender) {
            return null;
          }

          return (
            <View
              key={item.key}
              className={`taro-uno-tabs__tab-pane ${isActive ? 'taro-uno-tabs__tab-pane--active' : ''}`}
              style={tabsStyles['getTabContentStyle'](isActive, animated)}
            >
              {renderContent ? renderContent(item, index) : item.content}
            </View>
          );
        })}
      </View>
    );
  };

  // 计算样式
  const tabsStyle = tabsStyles['getBaseStyle']({
    position: internalPosition,
    type: internalType,
    size: internalSize,
    centered,
    style: style || {},
  } as any);

  // 计算类名
  const tabsClassName = tabsStyles['getClassName']({
    position: internalPosition,
    type: internalType,
    size: internalSize,
    centered,
    className: className || '',
  } as any);

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: tabsRef.current,
      getActiveKey: () => activeKey,
      getItems: () => internalItems,
      setActiveKey: (key) => {
        if (controlledActiveKey === undefined) {
          setActiveKey(key);
        }
      },
      addItem: (item, index) => {
        const newItems = [...internalItems];
        if (index !== undefined) {
          newItems.splice(index, 0, item);
        } else {
          newItems.push(item);
        }
        setInternalItems(newItems);
      },
      removeItem: (key) => {
        const newItems = internalItems.filter((item) => item.key !== key);
        setInternalItems(newItems);
        if (activeKey === key && newItems.length > 0) {
          setActiveKey(newItems[0]?.key || '');
        }
      },
      updateItem: (key, newItem) => {
        const newItems = internalItems.map((item) => (item.key === key ? { ...item, ...newItem } : item));
        setInternalItems(newItems);
      },
      scrollToTab: (_key) => {
        // 这里需要实现滚动到指定Tab的逻辑
        // 可以使用scrollIntoView或其他滚动方法
      },
    }),
    [activeKey, internalItems, controlledActiveKey],
  );

  return (
    <View ref={tabsRef} className={tabsClassName} style={tabsStyle} {...restProps}>
      {renderTabBarInternal()}
      {renderContentInternal()}
    </View>
  );
});

/** Tabs组件显示名称 */
TabsComponent.displayName = 'Tabs';

/** 导出Tabs组件 */
export const Tabs = TabsComponent;
