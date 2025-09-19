import type { ReactNode, SVGAttributes } from 'react';
import type { AccessibilityState, AccessibilityProps } from '../../../types/accessibility';

/** 图标类型 */
export type IconType = 'svg' | 'image' | 'font' | 'custom';

/** 图标来源 */
export type IconSource =
  | string // URL或字体图标名称
  | ReactNode // 自定义React节点
  | {
      // SVG图标数据
      viewBox?: string;
      path?: string;
      paths?: string[];
      d?: string;
    };

/** 图标尺寸 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

/** 图标颜色 */
export type IconColor = string;

/** 图标旋转角度 */
export type IconRotation = 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;

/** 图标状态 */
export type IconStatus = 'normal' | 'active' | 'disabled' | 'loading';

/** 图标主题 */
export type IconTheme = 'outlined' | 'filled' | 'two-tone' | 'colored';

/** 图标原生属性类型 */
export type IconNativeProps = SVGAttributes<SVGElement>;

/** 图标组件属性接口 */
export interface IconProps extends Omit<IconNativeProps, 'size' | 'color'>, AccessibilityProps {
  /** 图标源 */
  source: IconSource;
  /** 图标类型 */
  type?: IconType;
  /** 图标尺寸 */
  size?: IconSize | number;
  /** 图标颜色 */
  color?: IconColor;
  /** 图标旋转角度 */
  rotate?: IconRotation;
  /** 图标状态 */
  status?: IconStatus;
  /** 图标主题 */
  theme?: IconTheme;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标库前缀 */
  prefix?: string;
  /** 图标库后缀 */
  suffix?: string;
  /** 是否启用动画 */
  animated?: boolean;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 是否启用无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: AccessibilityState;
  /** 无障碍提示 */
  accessibilityHint?: string;
  /** 无障碍值 */
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
  /** 无障碍元素标识 */
  accessibilityId?: string;
  /** 无障碍动作 */
  accessibilityActions?: Array<{
    name: string;
    label?: string;
  }>;
  /** 无障碍实时区域类型 */
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
  /** 无障碍重要程度 */
  accessibilityImportant?: boolean;
  /** 无障碍视图是否隐藏 */
  accessibilityViewIsModal?: boolean;
  /** 无障碍元素树角色 */
  accessibilityElementsHidden?: boolean;
  /** 图标组中的索引位置 */
  groupIndex?: number;
  /** 图标组中的总数 */
  groupSize?: number;
  /** 自定义加载图标 */
  loadingIcon?: ReactNode;
  /** 是否显示工具提示 */
  tooltip?: string;
  /** 工具提示位置 */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** 是否启用涟漪效果 */
  ripple?: boolean;
  /** 图标滤镜效果 */
  filter?: 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'hue-rotate';
  /** 图标混合模式 */
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  /** 测试标识 */
  'data-testid'?: string;
}

/** 图标组件引用类型 */
export type IconRef = {
  /** 图标元素 */
  element: SVGElement | HTMLImageElement | HTMLSpanElement | null;
  /** 触发点击事件 */
  click: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 获取图标状态 */
  getStatus: () => IconStatus;
  /** 获取图标尺寸 */
  getSize: () => IconSize | number;
  /** 获取图标颜色 */
  getColor: () => string;
  /** 旋转图标 */
  rotate: (angle: IconRotation) => void;
  /** 设置图标颜色 */
  setColor: (color: string) => void;
  /** 设置图标尺寸 */
  setSize: (size: IconSize | number) => void;
};

/** 图标组属性接口 */
export interface IconGroupProps {
  /** 图标组内容 */
  children: ReactNode;
  /** 图标组尺寸 */
  size?: IconSize | number;
  /** 图标组颜色 */
  color?: IconColor;
  /** 图标组状态 */
  status?: IconStatus;
  /** 图标组主题 */
  theme?: IconTheme;
  /** 图标组间距 */
  spacing?: number;
  /** 图标组是否垂直排列 */
  vertical?: boolean;
  /** 图标组对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 图标组自定义样式类名 */
  className?: string;
  /** 图标组自定义样式 */
  style?: React.CSSProperties;
}

/** 图标工具函数接口 */
export interface IconUtils {
  /** 获取图标样式类名 */
  getIconClassName: (props: Partial<IconProps>) => string;
  /** 获取图标样式对象 */
  getIconStyle: (props: Partial<IconProps>) => React.CSSProperties;
  /** 获取图标尺寸映射 */
  getSizeMap: () => Record<IconSize, number>;
  /** 获取图标状态映射 */
  getStatusMap: () => Record<IconStatus, { opacity: number; cursor: string; pointerEvents: string }>;
  /** 验证图标属性 */
  validateIconProps: (props: IconProps) => boolean;
  /** 格式化图标尺寸 */
  formatIconSize: (size: IconSize | number) => string;
  /** 格式化图标类型 */
  formatIconType: (type: IconType) => string;
  /** 格式化图标状态 */
  formatIconStatus: (status: IconStatus) => string;
  /** 解析图标源 */
  parseIconSource: (source: IconSource) => { type: IconType; data: any };
  /** 生成SVG路径 */
  generateSVGPath: (data: any) => ReactNode;
  /** 生成字体图标 */
  generateFontIcon: (data: any) => ReactNode;
  /** 生成图片图标 */
  generateImageIcon: (data: any) => ReactNode;
  /** 生成自定义图标 */
  generateCustomIcon: (data: any) => ReactNode;
  /** 检测图标类型 */
  detectIconType: (source: IconSource) => IconType;
}

/** 预定义图标集 */
export interface IconSet {
  /** 图标名称 */
  name: string;
  /** 图标数据 */
  data: IconSource;
  /** 图标类型 */
  type: IconType;
  /** 图标主题 */
  theme?: IconTheme;
  /** 图标分类 */
  category?: string;
  /** 图标标签 */
  tags?: string[];
}

/** 图标库配置 */
export interface IconLibraryConfig {
  /** 图标库名称 */
  name: string;
  /** 图标库前缀 */
  prefix: string;
  /** 图标库类型 */
  type: IconType;
  /** 图标库基础URL */
  baseUrl?: string;
  /** 图标库CSS路径 */
  cssPath?: string;
  /** 图标库版本 */
  version?: string;
  /** 是否已加载 */
  loaded: boolean;
  /** 加载图标库 */
  load: () => Promise<void>;
  /** 获取图标URL */
  getIconUrl: (iconName: string) => string;
  /** 获取图标CSS类名 */
  getIconClassName: (iconName: string) => string;
}
