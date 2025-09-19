import { ReactNode } from 'react';
// import { View } from '@tarojs/components'; // Commented out - unused
import { BaseComponentProps, Size } from '../../../types';

/** Tab位置 */
export type TabPosition = 'top' | 'right' | 'bottom' | 'left';

/** Tab类型 */
export type TabType = 'line' | 'card' | 'segment';

/** Tab尺寸 */
export type TabSize = Size | 'small' | 'medium' | 'large';

/** Tab项接口 */
export interface TabItem {
  /** 键值 */
  key: string;
  /** 标题 */
  title: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 图标 */
  icon?: ReactNode;
  /** 徽标 */
  badge?: ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** Tabs组件引用 */
export interface TabsRef {
  /** 获取元素引用 */
  element: any | null;
  /** 获取当前激活的键值 */
  getActiveKey: () => string;
  /** 获取所有Tab项 */
  getItems: () => TabItem[];
  /** 设置激活的键值 */
  setActiveKey: (key: string) => void;
  /** 添加Tab项 */
  addItem: (item: TabItem, index?: number) => void;
  /** 移除Tab项 */
  removeItem: (key: string) => void;
  /** 更新Tab项 */
  updateItem: (key: string, newItem: Partial<TabItem>) => void;
  /** 滚动到Tab项 */
  scrollToTab: (key: string) => void;
}

/** Tabs组件属性 */
export interface TabsProps extends BaseComponentProps {
  /** Tab项列表 */
  items: TabItem[];
  /** 激活的键值 */
  activeKey?: string;
  /** 默认激活的键值 */
  defaultActiveKey?: string;
  /** Tab位置 */
  position?: TabPosition;
  /** Tab类型 */
  type?: TabType;
  /** Tab尺寸 */
  size?: TabSize;
  /** 是否可编辑 */
  editable?: boolean;
  /** 是否可添加 */
  addable?: boolean;
  /** 是否动画效果 */
  animated?: boolean;
  /** 是否居中显示 */
  centered?: boolean;
  /** 是否强制渲染 */
  forceRender?: boolean;
  /** 是否销毁隐藏的Tab */
  destroyInactiveTabPane?: boolean;
  /** 点击Tab事件 */
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  /** 切换Tab事件 */
  onChange?: (key: string) => void;
  /** 添加Tab事件 */
  onAdd?: () => void;
  /** 删除Tab事件 */
  onRemove?: (key: string) => void;
  /** 编辑Tab事件 */
  onEdit?: (key: string, action: 'add' | 'remove') => void;
  /** 自定义Tab渲染 */
  renderTabBar?: (props: TabsProps) => ReactNode;
  /** 自定义Tab项渲染 */
  renderTab?: (item: TabItem, index: number) => ReactNode;
  /** 自定义内容渲染 */
  renderContent?: (item: TabItem, index: number) => ReactNode;
}

/** TabPane组件属性 */
export interface TabPaneProps extends BaseComponentProps {
  /** Tab键值 */
  tabKey: string;
  /** Tab标题 */
  tab: ReactNode;
  /** Tab内容 */
  children?: ReactNode;
  /** 禁用状态 */
  disabled?: boolean;
  /** 图标 */
  icon?: ReactNode;
  /** 徽标 */
  badge?: ReactNode;
  /** 是否强制渲染 */
  forceRender?: boolean;
}
