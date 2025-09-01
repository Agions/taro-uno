/**
 * Taro-Uno 基础组件库
 * 提供最基础的 UI 组件，包括按钮、图标、文本和分割线
 */

// 导出 Button 组件
export { Button } from './Button';
export type {
  ButtonProps,
  ButtonRef,
  ButtonGroupProps,
  ButtonUtils,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ButtonShape,
  ButtonStatus,
  ButtonIconPosition,
  ButtonNativeProps,
} from './Button/Button.types';
export { buttonStyles } from './Button/Button.styles';

// 导出 Icon 组件
export { Icon } from './Icon';
export type {
  IconProps,
  IconRef,
  IconGroupProps,
  IconUtils,
  IconType,
  IconSource,
  IconSize,
  IconColor,
  IconRotation,
  IconStatus,
  IconTheme,
  IconNativeProps,
  IconSet,
  IconLibraryConfig,
} from './Icon/Icon.types';
export { iconStyles } from './Icon/Icon.styles';

// 导出 Text 组件
export { Text } from './Text';
export type {
  TextProps,
  TextRef,
  TextUtils,
  TextSize,
  TextWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  TextOverflow,
  TextDirection,
  TextStyle,
  TextVariant,
  LetterSpacing,
  LineHeight,
  TextColor,
  TextStatus,
  TextType,
  TextNativeProps,
  TypewriterProps,
  TextGradientProps,
} from './Text/Text.types';
export { textStyles } from './Text/Text.styles';

// 导出 Divider 组件
export { Divider } from './Divider';
export type {
  DividerProps,
  DividerRef,
  DividerGroupProps,
  DividerUtils,
  DividerOrientation,
  DividerType,
  DividerPosition,
  DividerSize,
  DividerColor,
  DividerVariant,
  DividerNativeProps,
  VerticalDividerProps,
  TextDividerProps,
  AnimatedDividerProps,
  DividerPreset,
} from './Divider/Divider.types';

// 基础组件类型定义
export interface BasicComponents {
  Button: typeof Button;
  Icon: typeof Icon;
  Text: typeof Text;
  Divider: typeof Divider;
}

// 基础组件工具类型
export type BasicComponentProps = ButtonProps | IconProps | TextProps | DividerProps;

export type BasicComponentRef = ButtonRef | IconRef | TextRef | DividerRef;

// 基础组件工具函数
export const BasicComponentsUtils = {
  /**
   * 判断是否为基础组件属性
   */
  isBasicComponentProps: (props: any): props is BasicComponentProps => {
    return (
      props && ('size' in props || 'color' in props || 'variant' in props || 'source' in props || 'children' in props)
    );
  },

  /**
   * 获取组件类型
   */
  getComponentType: (props: BasicComponentProps): string => {
    if ('source' in props) return 'Icon';
    if ('children' in props && typeof props.children === 'string') return 'Text';
    if ('type' in props && ['solid', 'outline', 'ghost', 'text'].includes(props.type)) return 'Button';
    return 'Divider';
  },

  /**
   * 获取组件默认样式
   */
  getDefaultStyles: (componentType: string): React.CSSProperties => {
    switch (componentType) {
      case 'Button':
        return {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '500',
          border: '1px solid transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        };
      case 'Icon':
        return {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          fontSize: '24px',
          color: 'currentColor',
        };
      case 'Text':
        return {
          display: 'inline',
          fontSize: '16px',
          lineHeight: '1.5',
          color: 'inherit',
          wordWrap: 'break-word',
        };
      case 'Divider':
        return {
          display: 'block',
          width: '100%',
          height: '1px',
          backgroundColor: '#e5e7eb',
          margin: '16px 0',
        };
      default:
        return {};
    }
  },

  /**
   * 组件尺寸映射
   */
  sizeMapping: {
    Button: {
      xs: { fontSize: 12, padding: '8px 16px', height: 32 },
      sm: { fontSize: 14, padding: '12px 20px', height: 40 },
      md: { fontSize: 16, padding: '16px 24px', height: 48 },
      lg: { fontSize: 18, padding: '20px 32px', height: 56 },
      xl: { fontSize: 20, padding: '24px 40px', height: 64 },
    },
    Icon: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40,
    },
    Text: {
      xs: { fontSize: 12, lineHeight: 1.25 },
      sm: { fontSize: 14, lineHeight: 1.375 },
      md: { fontSize: 16, lineHeight: 1.5 },
      lg: { fontSize: 18, lineHeight: 1.625 },
      xl: { fontSize: 20, lineHeight: 1.75 },
    },
    Divider: {
      xs: { height: 1, margin: 8 },
      sm: { height: 1, margin: 12 },
      md: { height: 1, margin: 16 },
      lg: { height: 2, margin: 20 },
      xl: { height: 2, margin: 24 },
    },
  },

  /**
   * 组件颜色映射
   */
  colorMapping: {
    Button: {
      primary: { background: '#0ea5e9', color: '#ffffff', border: '#0ea5e9' },
      secondary: { background: '#6b7280', color: '#ffffff', border: '#6b7280' },
      success: { background: '#22c55e', color: '#ffffff', border: '#22c55e' },
      warning: { background: '#f59e0b', color: '#ffffff', border: '#f59e0b' },
      error: { background: '#ef4444', color: '#ffffff', border: '#ef4444' },
    },
    Icon: {
      primary: '#0ea5e9',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    Text: {
      primary: '#0ea5e9',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      disabled: '#9ca3af',
    },
    Divider: {
      primary: '#0ea5e9',
      secondary: '#6b7280',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      border: '#e5e7eb',
    },
  },
};

// 默认导出所有基础组件
export default {
  Button,
  Icon,
  Text,
  Divider,
} as BasicComponents;
