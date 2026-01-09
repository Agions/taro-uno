/**
 * Taro-Uno PageHeader Component Types
 * 页面头部组件类型定义
 */

// 页面头部主题
export type PageHeaderTheme = 'light' | 'dark' | 'primary';

// 页面头部布局
export type PageHeaderLayout = 'default' | 'compact' | 'simple';

// 页面头部大小
export type PageHeaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 页面头部操作按钮
export interface PageHeaderAction {
  // 按钮文本
  text: string;
  // 按钮图标
  icon?: React.ReactNode;
  // 按钮类型
  type?: 'primary' | 'default' | 'danger' | 'success';
  // 按钮点击回调
  onClick?: () => void;
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 按钮链接
  href?: string;
  // 其他自定义属性
  [key: string]: any;
}

// 页面头部返回配置
export interface PageHeaderBackConfig {
  // 是否显示返回按钮
  show?: boolean;
  // 返回按钮图标
  icon?: React.ReactNode;
  // 返回按钮文本
  text?: string;
  // 返回按钮点击回调
  onClick?: () => void;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 返回按钮链接
  href?: string;
}

// 页面头部面包屑配置
export interface PageHeaderBreadcrumbConfig {
  // 是否显示面包屑
  show?: boolean;
  // 面包屑项
  items?: Array<{
    value: string;
    label: string;
    href?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  // 面包屑分隔符
  separator?: string | React.ReactNode;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 页面头部配置
export interface PageHeaderConfig {
  // 主题
  theme?: PageHeaderTheme;
  // 布局
  layout?: PageHeaderLayout;
  // 大小
  size?: PageHeaderSize;
  // 返回按钮配置
  back?: PageHeaderBackConfig;
  // 面包屑配置
  breadcrumb?: PageHeaderBreadcrumbConfig;
  // 是否显示操作按钮
  showActions?: boolean;
  // 是否显示标题
  showTitle?: boolean;
  // 是否显示副标题
  showSubtitle?: boolean;
  // 是否显示额外信息
  showExtra?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 页面头部属性
export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // 页面头部配置
  config?: PageHeaderConfig;
  // 主题
  theme?: PageHeaderTheme;
  // 布局
  layout?: PageHeaderLayout;
  // 大小
  size?: PageHeaderSize;
  // 标题
  title?: React.ReactNode;
  // 副标题
  subtitle?: React.ReactNode;
  // 额外信息
  extra?: React.ReactNode;
  // 返回按钮配置
  back?: boolean | PageHeaderBackConfig;
  // 面包屑配置
  breadcrumb?: boolean | PageHeaderBreadcrumbConfig;
  // 操作按钮列表
  actions?: PageHeaderAction[];
  // 是否显示返回按钮
  showBack?: boolean;
  // 是否显示面包屑
  showBreadcrumb?: boolean;
  // 是否显示操作按钮
  showActions?: boolean;
  // 是否显示标题
  showTitle?: boolean;
  // 是否显示副标题
  showSubtitle?: boolean;
  // 是否显示额外信息
  showExtra?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 返回按钮点击回调
  onBackClick?: () => void;
  // 面包屑项点击回调
  onBreadcrumbItemClick?: (item: any, index: number) => void;
  // 操作按钮点击回调
  onActionClick?: (action: PageHeaderAction, index: number) => void;
  // 自定义渲染返回按钮
  renderBack?: () => React.ReactNode;
  // 自定义渲染面包屑
  renderBreadcrumb?: () => React.ReactNode;
  // 自定义渲染标题
  renderTitle?: () => React.ReactNode;
  // 自定义渲染副标题
  renderSubtitle?: () => React.ReactNode;
  // 自定义渲染额外信息
  renderExtra?: () => React.ReactNode;
  // 自定义渲染操作按钮
  renderActions?: () => React.ReactNode;
}

// 页面头部引用
export interface PageHeaderRef {
  // 获取页面头部配置
  getConfig: () => PageHeaderConfig;
  // 重置页面头部
  reset: () => void;
}
