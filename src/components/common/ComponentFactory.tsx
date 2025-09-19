import React, { forwardRef, useMemo } from 'react';
import { useThemeUtils } from '../../theme/useTheme';
import {
  StandardComponentProps,
  ComponentSize,
  ComponentVariant,
  ComponentStatus,
  COMPONENT_SIZE_MAP,
  COMPONENT_VARIANT_COLORS,
  COMPONENT_STATUS_COLORS
} from '../../types/component-props';

// ==================== 组件工厂类型定义 ====================
export interface ComponentFactoryConfig {
  /** 组件名称 */
  name: string;
  /** 默认尺寸 */
  defaultSize?: ComponentSize;
  /** 默认变体 */
  defaultVariant?: ComponentVariant;
  /** 默认状态 */
  defaultStatus?: ComponentStatus;
  /** 是否支持加载状态 */
  supportLoading?: boolean;
  /** 是否支持禁用状态 */
  supportDisabled?: boolean;
  /** 是否支持图标 */
  supportIcon?: boolean;
  /** 自定义样式映射 */
  styleMap?: Record<string, any>;
}

export interface ComponentStyleProps {
  size: ComponentSize;
  variant: ComponentVariant;
  status: ComponentStatus;
  disabled: boolean;
  loading: boolean;
  customStyle?: React.CSSProperties;
}

// ==================== 组件样式生成器 ====================
export class ComponentStyleGenerator {
  private config: ComponentFactoryConfig;

  constructor(config: ComponentFactoryConfig) {
    this.config = config;
  }

  /**
   * 生成基础样式
   */
  generateBaseStyles(props: ComponentStyleProps): React.CSSProperties {
    const { size, status, disabled, loading } = props;
    const { getColor, getSpacing, getBorderRadius } = useThemeUtils();

    const sizeConfig = COMPONENT_SIZE_MAP[size];
    const statusColors = COMPONENT_STATUS_COLORS[status];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      fontSize: sizeConfig.fontSize,
      padding: sizeConfig.padding,
      height: sizeConfig.height,
      borderRadius: getBorderRadius('md'),
      border: '1px solid',
      borderColor: getColor('border.default'),
      backgroundColor: getColor('background.primary'),
      color: getColor('text.primary'),
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : loading ? 0.7 : 1,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      ...this.config.styleMap?.base,
    };
  }

  /**
   * 生成变体样式
   */
  generateVariantStyles(variant: ComponentVariant): React.CSSProperties {
    const { getColor } = useThemeUtils();
    const variantColors = COMPONENT_VARIANT_COLORS[variant];

    return {
      backgroundColor: variantColors.background,
      color: variantColors.color,
      borderColor: variantColors.border,
      ...this.config.styleMap?.[variant],
    };
  }

  /**
   * 生成状态样式
   */
  generateStatusStyles(status: ComponentStatus): React.CSSProperties {
    const { getColor } = useThemeUtils();
    const statusColors = COMPONENT_STATUS_COLORS[status];

    return {
      color: statusColors.color,
      borderColor: statusColors.borderColor,
      backgroundColor: statusColors.backgroundColor,
      ...this.config.styleMap?.[status],
    };
  }

  /**
   * 生成禁用样式
   */
  generateDisabledStyles(): React.CSSProperties {
    return {
      cursor: 'not-allowed',
      opacity: 0.5,
      pointerEvents: 'none',
      ...this.config.styleMap?.disabled,
    };
  }

  /**
   * 生成加载样式
   */
  generateLoadingStyles(): React.CSSProperties {
    return {
      cursor: 'not-allowed',
      opacity: 0.7,
      ...this.config.styleMap?.loading,
    };
  }

  /**
   * 生成悬停样式
   */
  generateHoverStyles(variant: ComponentVariant): React.CSSProperties {
    const variantColors = COMPONENT_VARIANT_COLORS[variant];

    if (!variantColors.hover) return {};

    return {
      backgroundColor: variantColors.hover.background,
      color: variantColors.hover.color,
      borderColor: variantColors.hover.border,
      ...this.config.styleMap?.hover,
    };
  }

  /**
   * 生成激活样式
   */
  generateActiveStyles(variant: ComponentVariant): React.CSSProperties {
    const variantColors = COMPONENT_VARIANT_COLORS[variant];

    if (!variantColors.active) return {};

    return {
      backgroundColor: variantColors.active.background,
      color: variantColors.active.color,
      borderColor: variantColors.active.border,
      ...this.config.styleMap?.active,
    };
  }

  /**
   * 生成焦点样式
   */
  generateFocusStyles(): React.CSSProperties {
    const { getColor } = useThemeUtils();

    return {
      outline: '2px solid',
      outlineColor: getColor('primary.500'),
      outlineOffset: '2px',
      ...this.config.styleMap?.focus,
    };
  }

  /**
   * 生成完整样式
   */
  generateCompleteStyles(props: ComponentStyleProps): React.CSSProperties {
    const { size, variant, status, disabled, loading, customStyle } = props;

    const baseStyles = this.generateBaseStyles(props);
    const variantStyles = this.generateVariantStyles(variant);
    const statusStyles = this.generateStatusStyles(status);
    const disabledStyles = disabled ? this.generateDisabledStyles() : {};
    const loadingStyles = loading ? this.generateLoadingStyles() : {};

    return {
      ...baseStyles,
      ...variantStyles,
      ...statusStyles,
      ...disabledStyles,
      ...loadingStyles,
      ...customStyle,
    };
  }
}

// ==================== 组件工厂 ====================
export const createComponent = <T extends StandardComponentProps>(
  config: ComponentFactoryConfig,
  renderFn: (props: T, ref: React.Ref<any>, styles: React.CSSProperties) => React.ReactNode
) => {
  const styleGenerator = new ComponentStyleGenerator(config);

  const Component = forwardRef<any, T>((props, ref) => {
    const {
      size = config.defaultSize || 'md',
      variant = config.defaultVariant || 'default',
      status = config.defaultStatus || 'default',
      disabled = false,
      loading = false,
      style,
      ...restProps
    } = props;

    // 生成样式
    const styles = useMemo(() => {
      return styleGenerator.generateCompleteStyles({
        size,
        variant,
        status,
        disabled,
        loading,
        customStyle: style,
      });
    }, [size, variant, status, disabled, loading, style]);

    // 生成事件处理器
    const handleClick = (event: React.MouseEvent) => {
      if (!disabled && !loading && (restProps as any).onClick) {
        (restProps as any).onClick(event);
      }
    };

    const handleFocus = (event: React.FocusEvent) => {
      if (!disabled && !loading && (restProps as any).onFocus) {
        (restProps as any).onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent) => {
      if (!disabled && !loading && (restProps as any).onBlur) {
        (restProps as any).onBlur(event);
      }
    };

    // 合并事件处理器
    const mergedProps = {
      ...restProps,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'aria-disabled': disabled,
      'aria-busy': loading,
      'data-size': size,
      'data-variant': variant,
      'data-status': status,
    };

    return renderFn(props as T, ref, styles, mergedProps);
  });

  Component.displayName = config.name;
  return Component;
};

// ==================== 预设组件配置 ====================
export const PRESET_COMPONENT_CONFIGS = {
  button: {
    name: 'Button',
    defaultSize: 'md' as ComponentSize,
    defaultVariant: 'default' as ComponentVariant,
    supportLoading: true,
    supportDisabled: true,
    supportIcon: true,
    styleMap: {
      base: {
        fontWeight: 500,
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      },
      primary: {
        fontWeight: 600,
      },
      text: {
        borderWidth: 0,
        padding: 0,
        backgroundColor: 'transparent',
      },
      circle: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        padding: 0,
      },
    },
  },
  input: {
    name: 'Input',
    defaultSize: 'md' as ComponentSize,
    defaultVariant: 'outlined' as ComponentVariant,
    supportDisabled: true,
    styleMap: {
      base: {
        display: 'block',
        width: '100%',
      },
      outlined: {
        backgroundColor: 'transparent',
      },
      filled: {
        backgroundColor: 'var(--colors-background-tertiary)',
      },
    },
  },
  select: {
    name: 'Select',
    defaultSize: 'md' as ComponentSize,
    defaultVariant: 'outlined' as ComponentVariant,
    supportDisabled: true,
    styleMap: {
      base: {
        display: 'block',
        width: '100%',
        cursor: 'pointer',
      },
    },
  },
} as const;

// ==================== 组件工厂工具函数 ====================
export const componentFactoryUtils = {
  /**
   * 创建按钮组件
   */
  createButton: <T extends StandardComponentProps>(
    renderFn: (props: T, ref: React.Ref<any>, styles: React.CSSProperties, mergedProps: any) => React.ReactNode
  ) => {
    return createComponent({ ...PRESET_COMPONENT_CONFIGS.button }, renderFn);
  },

  /**
   * 创建输入框组件
   */
  createInput: <T extends StandardComponentProps>(
    renderFn: (props: T, ref: React.Ref<any>, styles: React.CSSProperties, mergedProps: any) => React.ReactNode
  ) => {
    return createComponent({ ...PRESET_COMPONENT_CONFIGS.input }, renderFn);
  },

  /**
   * 创建选择器组件
   */
  createSelect: <T extends StandardComponentProps>(
    renderFn: (props: T, ref: React.Ref<any>, styles: React.CSSProperties, mergedProps: any) => React.ReactNode
  ) => {
    return createComponent({ ...PRESET_COMPONENT_CONFIGS.select }, renderFn);
  },

  /**
   * 注册自定义组件配置
   */
  registerComponentConfig: (name: string, config: ComponentFactoryConfig) => {
    (PRESET_COMPONENT_CONFIGS as any)[name] = config;
  },

  /**
   * 获取组件配置
   */
  getComponentConfig: (name: string) => {
    return (PRESET_COMPONENT_CONFIGS as any)[name];
  },
};

export default createComponent;