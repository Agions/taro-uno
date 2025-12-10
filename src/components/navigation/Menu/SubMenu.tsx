import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { MenuItem } from './Menu.types';
import { menuStyles } from './Menu.styles';
import { MenuItemComponent } from './MenuItem';

interface SubMenuProps {
  /** 子菜单项数据 */
  item: MenuItem;
  /** 菜单项层级 */
  level: number;
  /** 菜单模式 */
  mode: 'vertical' | 'horizontal' | 'inline';
  /** 菜单主题 */
  theme: 'light' | 'dark';
  /** 菜单尺寸 */
  size: 'small' | 'medium' | 'large';
  /** 是否展开 */
  open: boolean;
  /** 触发方式 */
  trigger: 'hover' | 'click';
  /** 是否折叠 */
  collapsed: boolean;
  /** 内联缩进 */
  inlineIndent: number;
  /** 切换展开状态 */
  onToggle: (key: string) => void;
  /** 点击事件 */
  onItemClick: (key: string, event: ITouchEvent) => void;
  /** 展开图标 */
  expandIcon?: React.ReactNode | ((props: { isOpen: boolean; isSubMenu: boolean }) => React.ReactNode);
  /** 自定义渲染子菜单标题 */
  subMenuTitleRender?: (item: MenuItem) => React.ReactNode;
  /** 自定义渲染菜单项 */
  itemRender?: (item: MenuItem) => React.ReactNode;
}

/** 默认展开图标 */
const DEFAULT_EXPAND_ICON = '▶';

/**
 * 子菜单组件
 */
export const SubMenuComponent: React.FC<SubMenuProps> = ({
  item,
  level,
  mode,
  theme,
  size,
  open,
  trigger,
  collapsed,
  inlineIndent,
  onToggle,
  onItemClick,
  expandIcon,
  subMenuTitleRender,
  itemRender,
}) => {
  const [localOpen, setLocalOpen] = useState(open);

  useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  const handleToggle = useCallback(
    (event: ITouchEvent) => {
      event.stopPropagation();
      if (item.disabled) return;
      onToggle(item.key);
    },
    [item.disabled, item.key, onToggle],
  );

  const renderExpandIcon = () => {
    if (typeof expandIcon === 'function') {
      return expandIcon({ isOpen: localOpen, isSubMenu: true });
    }
    return expandIcon || DEFAULT_EXPAND_ICON;
  };

  return (
    <View style={menuStyles.subMenu}>
      {/* 子菜单标题 */}
      <View
        style={menuStyles.getItemStyle({
          size,
          theme,
          mode,
          selected: false,
          disabled: item.disabled,
          danger: item.danger,
          isSubMenu: true,
          level,
          collapsed,
        })}
        onClick={handleToggle}
      >
        {/* 图标 */}
        {item.icon && (
          <View style={menuStyles.getIconStyle({ size, selected: false, disabled: item.disabled })}>{item.icon}</View>
        )}

        {/* 标签 */}
        {subMenuTitleRender ? (
          subMenuTitleRender(item)
        ) : (
          <Text
            style={menuStyles.getLabelStyle({ size, selected: false, disabled: item.disabled, danger: item.danger })}
          >
            {item.label}
          </Text>
        )}

        {/* 展开图标 */}
        <View
          style={{
            ...menuStyles.expandIcon,
            ...(localOpen ? menuStyles.expandIconOpen : {}),
          }}
        >
          {renderExpandIcon()}
        </View>
      </View>

      {/* 子菜单内容 */}
      {localOpen && (
        <View style={menuStyles.getSubMenuStyle({ size, theme, mode, open: localOpen, level, collapsed })}>
          {item.children?.map((child) => (
            <MenuItemComponent
              key={child.key}
              item={child}
              level={level + 1}
              mode={mode}
              theme={theme}
              size={size}
              selected={child.selected || false}
              trigger={trigger}
              collapsed={collapsed}
              inlineIndent={inlineIndent}
              onItemClick={onItemClick}
              itemRender={itemRender}
            />
          ))}
        </View>
      )}
    </View>
  );
};
