/**
 * Taro-Uno Menu Component
 * 导航菜单组件，支持多种模式、主题和交互功能
 */

import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { menuStyles } from './Menu.styles';
import { MenuUtils } from './Menu.utils';
import { MenuItemComponent } from './MenuItem';
import { SubMenuComponent } from './SubMenu';
import type { MenuProps, MenuRef, MenuItem } from './Menu.types';

/** Menu导航菜单组件 */
export const MenuComponent = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const {
    items = [],
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys = [],
    openKeys: controlledOpenKeys,
    defaultOpenKeys = [],
    mode = 'vertical',
    theme = 'light',
    size = 'medium',
    trigger = 'click',
    accordion = false,
    inlineIndent = 24,
    collapsible = false,
    collapsed: controlledCollapsed = false,
    collapsedIcon,
    expandIcon,
    contextMenu = false,
    onClick,
    onSelect,
    onOpenChange,
    onCollapse,
    onContextMenu,
    itemRender,
    subMenuTitleRender,
    className,
    style,
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'navigation',
    accessibilityState,
    ...restProps
  } = props;

  const menuRef = useRef<any>(null);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [internalCollapsed, setInternalCollapsed] = useState(controlledCollapsed);

  // 处理受控模式
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;
  const openKeys = controlledOpenKeys !== undefined ? controlledOpenKeys : internalOpenKeys;
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  // 更新内部状态
  useEffect(() => {
    if (controlledSelectedKeys !== undefined) {
      setInternalSelectedKeys(controlledSelectedKeys);
    }
  }, [controlledSelectedKeys]);

  useEffect(() => {
    if (controlledOpenKeys !== undefined) {
      setInternalOpenKeys(controlledOpenKeys);
    }
  }, [controlledOpenKeys]);

  useEffect(() => {
    if (controlledCollapsed !== undefined) {
      setInternalCollapsed(controlledCollapsed);
    }
  }, [controlledCollapsed]);

  // 处理菜单项点击
  const handleItemClick = useCallback(
    (key: string, event: ITouchEvent) => {
      const item = MenuUtils.findItem(items, key);
      if (!item) return;

      onClick?.(key, item, event);

      // 如果是外部链接，使用Taro兼容的方式处理
      if (item.href) {
        MenuUtils.handleExternalLink(item);
        return;
      }

      // 更新选中状态
      const newSelectedKeys = [key];
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(newSelectedKeys);
      }
      onSelect?.(newSelectedKeys, item);
    },
    [items, onClick, onSelect, controlledSelectedKeys],
  );

  // 处理子菜单展开/收起
  const handleSubMenuToggle = useCallback(
    (key: string) => {
      if (accordion) {
        // 手风琴模式：关闭其他展开的子菜单
        const parentItem = MenuUtils.findParentItem(items, key);
        if (parentItem) {
          const siblings = parentItem.children?.filter((child) => child.key !== key && child.children) || [];
          const siblingKeys = siblings.map((sibling) => sibling.key);
          const newOpenKeys = openKeys.filter((k) => !siblingKeys.includes(k));

          if (openKeys.includes(key)) {
            const finalOpenKeys = newOpenKeys.filter((k) => k !== key);
            if (controlledOpenKeys === undefined) {
              setInternalOpenKeys(finalOpenKeys);
            }
            onOpenChange?.(finalOpenKeys);
          } else {
            const finalOpenKeys = [...newOpenKeys, key];
            if (controlledOpenKeys === undefined) {
              setInternalOpenKeys(finalOpenKeys);
            }
            onOpenChange?.(finalOpenKeys);
          }
        }
      } else {
        // 普通模式：切换当前子菜单
        if (openKeys.includes(key)) {
          const newOpenKeys = openKeys.filter((k) => k !== key);
          if (controlledOpenKeys === undefined) {
            setInternalOpenKeys(newOpenKeys);
          }
          onOpenChange?.(newOpenKeys);
        } else {
          const newOpenKeys = [...openKeys, key];
          if (controlledOpenKeys === undefined) {
            setInternalOpenKeys(newOpenKeys);
          }
          onOpenChange?.(newOpenKeys);
        }
      }
    },
    [items, openKeys, accordion, controlledOpenKeys, onOpenChange],
  );

  // 处理折叠
  const handleCollapse = useCallback(() => {
    const newCollapsed = !collapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapse?.(newCollapsed);
  }, [collapsed, controlledCollapsed, onCollapse]);

  // 处理右键菜单
  const handleContextMenu = useCallback(
    (event: ITouchEvent) => {
      if (!contextMenu) return;
      // 在Taro环境中，event.preventDefault()可能不可用
      // 这里可以根据实际需求处理

      // 简化的右键菜单逻辑
      onContextMenu?.('', undefined as any, event);
    },
    [contextMenu, onContextMenu],
  );

  // 渲染菜单项
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isSelected = selectedKeys.includes(item.key);
    const isOpen = openKeys.includes(item.key);

    if (item.children && item.children.length > 0) {
      return (
        <SubMenuComponent
          key={item.key}
          item={item}
          level={level}
          mode={mode}
          theme={theme}
          size={size}
          open={isOpen}
          trigger={trigger}
          collapsed={collapsed}
          inlineIndent={inlineIndent}
          onToggle={handleSubMenuToggle}
          onItemClick={handleItemClick}
          expandIcon={expandIcon}
          subMenuTitleRender={subMenuTitleRender}
          itemRender={itemRender}
        />
      );
    }

    return (
      <MenuItemComponent
        key={item.key}
        item={item}
        level={level}
        mode={mode}
        theme={theme}
        size={size}
        selected={isSelected}
        trigger={trigger}
        collapsed={collapsed}
        inlineIndent={inlineIndent}
        onItemClick={handleItemClick}
        itemRender={itemRender}
      />
    );
  };

  // 暴露给外部的引用方法
  React.useImperativeHandle(
    ref,
    () => ({
      element: menuRef.current,
      getSelectedKeys: () => selectedKeys,
      setSelectedKeys: (keys: string[]) => {
        if (controlledSelectedKeys === undefined) {
          setInternalSelectedKeys(keys);
        }
        onSelect?.(keys, MenuUtils.findItem(items, keys[0] || ''));
      },
      getOpenKeys: () => openKeys,
      setOpenKeys: (keys: string[]) => {
        if (controlledOpenKeys === undefined) {
          setInternalOpenKeys(keys);
        }
        onOpenChange?.(keys);
      },
      setCollapsed: (newCollapsed: boolean) => {
        if (controlledCollapsed === undefined) {
          setInternalCollapsed(newCollapsed);
        }
        onCollapse?.(newCollapsed);
      },
      getItem: (key: string) => MenuUtils.findItem(items, key),
      addItem: (item: MenuItem, parentKey?: string) => {
        // 静态方法，暂不实现
        console.log('Add item:', item, 'to parent:', parentKey);
      },
      removeItem: (key: string) => {
        // 静态方法，暂不实现
        console.log('Remove item:', key);
      },
      updateItem: (key: string, newItem: Partial<MenuItem>) => {
        // 静态方法，暂不实现
        console.log('Update item:', key, newItem);
      },
      expandAll: () => {
        const allKeys = MenuUtils.flattenItems(items)
          .filter((item) => item.children && item.children.length > 0)
          .map((item) => item.key);
        if (controlledOpenKeys === undefined) {
          setInternalOpenKeys(allKeys);
        }
        onOpenChange?.(allKeys);
      },
      collapseAll: () => {
        if (controlledOpenKeys === undefined) {
          setInternalOpenKeys([]);
        }
        onOpenChange?.([]);
      },
      focus: () => {
        // 在Taro环境中，focus方法可能不可用
        if (menuRef.current) {
          // 这里可以根据实际需求实现
        }
      },
      blur: () => {
        // 在Taro环境中，blur方法可能不可用
        if (menuRef.current) {
          // 这里可以根据实际需求实现
        }
      },
    }),
    [
      selectedKeys,
      openKeys,
      collapsed,
      items,
      controlledSelectedKeys,
      controlledOpenKeys,
      controlledCollapsed,
      onSelect,
      onOpenChange,
      onCollapse,
    ],
  );

  // 无障碍状态
  const finalAccessibilityState = {
    expanded: !collapsed,
    ...accessibilityState,
  };

  // 生成类名
  const classNames = [
    'taro-uno-h5-menu',
    `taro-uno-h5-menu--${mode}`,
    `taro-uno-h5-menu--${theme}`,
    `taro-uno-h5-menu--${size}`,
    collapsed ? 'taro-uno-h5-menu--collapsed' : '',
    className,
  ].filter(Boolean).join(' ');

  // 处理无障碍状态序列化
  const serializedAccessibilityState = finalAccessibilityState
    ? JSON.stringify(finalAccessibilityState)
    : undefined;

  return (
    <View
      ref={menuRef}
      style={menuStyles.getContainerStyle({
        mode,
        theme,
        size,
        collapsed,
        style,
      })}
      className={classNames}
      accessible={accessible}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      aria-state={serializedAccessibilityState}
      onLongPress={contextMenu ? handleContextMenu : undefined}
      {...restProps}
    >
      {/* 折叠按钮 */}
      {collapsible && (
        <View
          style={menuStyles.getCollapseButtonStyle({ size, theme, collapsed })}
          onClick={handleCollapse}
          data-testid="collapse-button"
        >
          <Text>{collapsed ? '»' : '«'}</Text>
        </View>
      )}

      {/* 菜单项 */}
      {items.map((item) => renderMenuItem(item))}
    </View>
  );
});

/** Menu组件显示名称 */
MenuComponent.displayName = 'Menu';

/** 导出Menu组件 */
export const Menu = MenuComponent;
