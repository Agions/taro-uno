import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 菜单项类型 */
export interface MenuItem {
  /** 菜单项唯一标识 */
  key: string;
  /** 菜单项标题 */
  label: ReactNode;
  /** 菜单项图标 */
  icon?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子菜单 */
  children?: MenuItem[];
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 路由路径 */
  path?: string;
  /** 外部链接 */
  href?: string;
  /** 目标窗口 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 是否危险操作 */
  danger?: boolean;
  /** 是否分组标题 */
  isGroup?: boolean;
  /** 工具提示 */
  tooltip?: string;
  /** 额外信息 */
  extra?: ReactNode;
  /** 徽章 */
  badge?: number | string;
  /** 是否选中 */
  selected?: boolean;
  /** 是否展开 */
  expanded?: boolean;
}

/** 菜单模式 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

/** 菜单主题 */
export type MenuTheme = 'light' | 'dark';

/** 菜单尺寸 */
export type MenuSize = 'small' | 'medium' | 'large';

/** 触发方式 */
export type MenuTrigger = 'hover' | 'click';

/** 菜单组件属性 */
export interface MenuProps {
  /** 菜单项数据 */
  items: MenuItem[];
  /** 当前选中的菜单项 */
  selectedKeys?: string[];
  /** 默认选中的菜单项 */
  defaultSelectedKeys?: string[];
  /** 展开的子菜单 */
  openKeys?: string[];
  /** 默认展开的子菜单 */
  defaultOpenKeys?: string[];
  /** 菜单模式 */
  mode?: MenuMode;
  /** 菜单主题 */
  theme?: MenuTheme;
  /** 菜单尺寸 */
  size?: MenuSize;
  /** 子菜单触发方式 */
  trigger?: MenuTrigger;
  /** 是否只展开一个父级菜单 */
  accordion?: boolean;
  /** 是否内联缩进 */
  inlineIndent?: number;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 是否折叠 */
  collapsed?: boolean;
  /** 折叠图标 */
  collapsedIcon?: ReactNode;
  /** 展开图标 */
  expandIcon?: ReactNode | ((props: { isOpen: boolean; isSubMenu: boolean }) => ReactNode);
  /** 是否显示右键菜单 */
  contextMenu?: boolean;
  /** 菜单项点击事件 */
  onClick?: (key: string, item: MenuItem, event: ITouchEvent) => void;
  /** 菜单项选中变化事件 */
  onSelect?: (selectedKeys: string[], item: MenuItem | null) => void;
  /** 子菜单展开/收起事件 */
  onOpenChange?: (openKeys: string[]) => void;
  /** 折叠状态变化事件 */
  onCollapse?: (collapsed: boolean) => void;
  /** 右键菜单事件 */
  onContextMenu?: (key: string, item: MenuItem, event: ITouchEvent) => void;
  /** 自定义渲染菜单项 */
  itemRender?: (item: MenuItem) => ReactNode;
  /** 自定义渲染子菜单标题 */
  subMenuTitleRender?: (item: MenuItem) => ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 无障碍支持 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: 'navigation' | 'menu' | 'menubar';
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
    busy?: boolean;
    checked?: boolean;
  };
}

/** 菜单引用接口 */
export interface MenuRef {
  /** 获取当前选中的菜单项 */
  getSelectedKeys: () => string[];
  /** 设置选中的菜单项 */
  setSelectedKeys: (keys: string[]) => void;
  /** 获取展开的子菜单 */
  getOpenKeys: () => string[];
  /** 设置展开的子菜单 */
  setOpenKeys: (keys: string[]) => void;
  /** 折叠/展开菜单 */
  setCollapsed: (collapsed: boolean) => void;
  /** 获取菜单项数据 */
  getItem: (key: string) => MenuItem | null;
  /** 添加菜单项 */
  addItem: (item: MenuItem, parentKey?: string) => void;
  /** 删除菜单项 */
  removeItem: (key: string) => void;
  /** 更新菜单项 */
  updateItem: (key: string, newItem: Partial<MenuItem>) => void;
  /** 展开所有 */
  expandAll: () => void;
  /** 折叠所有 */
  collapseAll: () => void;
  /** 获取菜单元素 */
  element: any;
  /** 聚焦菜单 */
  focus: () => void;
  /** 失焦菜单 */
  blur: () => void;
}

/** 菜单配置接口 */
export interface MenuConfig {
  /** 默认菜单模式 */
  defaultMode?: MenuMode;
  /** 默认菜单主题 */
  defaultTheme?: MenuTheme;
  /** 默认菜单尺寸 */
  defaultSize?: MenuSize;
  /** 默认触发方式 */
  defaultTrigger?: MenuTrigger;
  /** 默认内联缩进 */
  defaultInlineIndent?: number;
  /** 是否默认可折叠 */
  defaultCollapsible?: boolean;
  /** 是否默认手风琴模式 */
  defaultAccordion?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 响应式断点 */
  responsiveBreakpoint?: number;
  /** 最大展开深度 */
  maxExpandDepth?: number;
}

/** 默认菜单配置 */
export const DEFAULT_MENU_CONFIG: MenuConfig = {
  defaultMode: 'vertical',
  defaultTheme: 'light',
  defaultSize: 'medium',
  defaultTrigger: 'click',
  defaultInlineIndent: 24,
  defaultCollapsible: false,
  defaultAccordion: false,
  animationDuration: 300,
  responsiveBreakpoint: 768,
  maxExpandDepth: 3,
};

/** 菜单项样式类型 */
export interface MenuItemStyles {
  /** 容器样式 */
  container: React.CSSProperties;
  /** 菜单项样式 */
  item: React.CSSProperties;
  /** 选中样式 */
  selected: React.CSSProperties;
  /** 禁用样式 */
  disabled: React.CSSProperties;
  /** 悬停样式 */
  hover: React.CSSProperties;
  /** 危险样式 */
  danger: React.CSSProperties;
  /** 子菜单样式 */
  subMenu: React.CSSProperties;
  /** 分组标题样式 */
  groupTitle: React.CSSProperties;
  /** 图标样式 */
  icon: React.CSSProperties;
  /** 标签样式 */
  label: React.CSSProperties;
  /** 额外信息样式 */
  extra: React.CSSProperties;
  /** 徽章样式 */
  badge: React.CSSProperties;
  /** 折叠按钮样式 */
  collapseButton: React.CSSProperties;
  /** 响应式样式 */
  responsive: React.CSSProperties;
}

/** 菜单尺寸样式映射 */
export type MenuSizeStyles = Record<MenuSize, Partial<MenuItemStyles>>;

/** 菜单主题样式映射 */
export type MenuThemeStyles = Record<MenuTheme, Partial<MenuItemStyles>>;

/** 菜单模式样式映射 */
export type MenuModeStyles = Record<MenuMode, Partial<MenuItemStyles>>;