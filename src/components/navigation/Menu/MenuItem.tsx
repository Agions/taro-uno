import React, { useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { MenuItem } from './Menu.types';
import { menuStyles } from './Menu.styles';

interface MenuItemProps {
  /** 菜单项数据 */
  item: MenuItem;
  /** 菜单项层级 */
  level: number;
  /** 菜单模式 */
  mode: 'vertical' | 'horizontal' | 'inline';
  /** 菜单主题 */
  theme: 'light' | 'dark';
  /** 菜单尺寸 */
  size: 'small' | 'medium' | 'large';
  /** 是否选中 */
  selected: boolean;
  /** 触发方式 */
  trigger: 'hover' | 'click';
  /** 是否折叠 */
  collapsed: boolean;
  /** 内联缩进 */
  inlineIndent: number;
  /** 点击事件 */
  onItemClick: (key: string, event: ITouchEvent) => void;
  /** 自定义渲染 */
  itemRender?: (item: MenuItem) => React.ReactNode;
}

/**
 * 菜单项组件
 */
export const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  level,
  mode,
  theme,
  size,
  selected,
  // trigger,
  // collapsed,
  // inlineIndent,
  onItemClick,
  itemRender,
}) => {
  const handleClick = useCallback(
    (event: ITouchEvent) => {
      if (item.disabled) return;
      onItemClick(item.key, event);
    },
    [item.disabled, item.key, onItemClick],
  );

  // 处理分组标题
  if (item.isGroup) {
    return (
      <View
        style={menuStyles.getItemStyle({
          size,
          theme,
          mode,
          selected,
          disabled: item.disabled,
          danger: item.danger,
          isGroup: true,
          level,
          // collapsed,
        })}
        className={item.className}
      >
        {itemRender ? itemRender(item) : (
          <Text style={menuStyles.getLabelStyle({ size, selected, disabled: item.disabled, danger: item.danger })}>
            {item.label}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={menuStyles.getItemStyle({
        size,
        theme,
        mode,
        selected,
        disabled: item.disabled,
        danger: item.danger,
        level,
        // collapsed,
      })}
      className={item.className}
      onClick={handleClick}
    >
      {/* 图标 */}
      {item.icon && (
        <View style={menuStyles.getIconStyle({ size, selected, disabled: item.disabled })}>
          {item.icon}
        </View>
      )}

      {/* 标签 */}
      {itemRender ? itemRender(item) : (
        <Text style={menuStyles.getLabelStyle({ size, selected, disabled: item.disabled, danger: item.danger })}>
          {item.label}
        </Text>
      )}

      {/* 额外信息 */}
      {item.extra && (
        <View style={menuStyles.extra}>
          {item.extra}
        </View>
      )}

      {/* 徽章 */}
      {item.badge && (
        <View style={menuStyles.getBadgeStyle({ size, theme })}>
          <Text>{item.badge}</Text>
        </View>
      )}
    </View>
  );
};