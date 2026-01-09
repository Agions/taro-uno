/**
 * Taro-Uno Drawer Component Types
 * 抽屉组件类型定义
 */

// 抽屉方向
export type DrawerDirection = 'left' | 'right' | 'top' | 'bottom';

// 抽屉主题
export type DrawerTheme = 'light' | 'dark' | 'primary';

// 抽屉按钮类型
export type DrawerButtonType = 'primary' | 'default' | 'danger' | 'success';

// 抽屉按钮配置
export interface DrawerButton {
  // 按钮文本
  text: string;
  // 按钮类型
  type?: DrawerButtonType;
  // 按钮点击回调
  onClick?: () => void;
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 抽屉配置
export interface DrawerConfig {
  // 标题
  title?: string;
  // 方向
  direction?: DrawerDirection;
  // 主题
  theme?: DrawerTheme;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 点击遮罩层是否关闭
  maskClosable?: boolean;
  // 抽屉宽度
  width?: number | string;
  // 抽屉高度
  height?: number | string;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
}

// 抽屉属性
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  // 抽屉配置
  config?: DrawerConfig;
  // 可见性控制
  visible?: boolean;
  // 默认可见性
  defaultVisible?: boolean;
  // 方向
  direction?: DrawerDirection;
  // 主题
  theme?: DrawerTheme;
  // 标题
  title?: string;
  // 内容
  children?: React.ReactNode;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 点击遮罩层是否关闭
  maskClosable?: boolean;
  // 抽屉宽度
  width?: number | string;
  // 抽屉高度
  height?: number | string;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 自定义内容类名
  contentClassName?: string;
  // 自定义内容样式
  contentStyle?: React.CSSProperties;
  // 自定义标题类名
  titleClassName?: string;
  // 自定义标题样式
  titleStyle?: React.CSSProperties;
  // 自定义遮罩层类名
  maskClassName?: string;
  // 自定义遮罩层样式
  maskStyle?: React.CSSProperties;
  // 关闭回调
  onClose?: () => void;
  // 打开回调
  onOpen?: () => void;
  // 点击遮罩回调
  onMaskClick?: () => void;
  // 动画持续时间
  animationDuration?: number;
  // 是否显示动画
  showAnimation?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否显示遮罩
  showMask?: boolean;
}

// 抽屉引用
export interface DrawerRef {
  // 显示抽屉
  show: () => void;
  // 隐藏抽屉
  hide: () => void;
  // 切换抽屉可见性
  toggle: () => void;
  // 获取当前可见性
  isVisible: () => boolean;
}

// 抽屉上下文
export interface DrawerContext {
  // 可见性
  visible: boolean;
  // 显示抽屉
  show: () => void;
  // 隐藏抽屉
  hide: () => void;
  // 切换抽屉可见性
  toggle: () => void;
  // 关闭抽屉
  close: () => void;
}
