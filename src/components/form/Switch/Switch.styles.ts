/**
 * Taro-Uno Switch Component Styles
 * 开关组件样式
 */

import type { SwitchSize, SwitchVariant, SwitchStatus, SwitchColor, SwitchStyleConfig } from './Switch.types';

// 默认样式配置
const defaultStyleConfig: SwitchStyleConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    default: '#6b7280',
    disabled: '#d1d5db',
    border: '#e5e7eb',
    background: '#ffffff',
    text: '#374151',
  },
  sizes: {
    sm: {
      width: 32,
      height: 16,
      thumbSize: 12,
      fontSize: 10,
      borderRadius: 8,
    },
    md: {
      width: 44,
      height: 24,
      thumbSize: 18,
      fontSize: 12,
      borderRadius: 12,
    },
    lg: {
      width: 56,
      height: 32,
      thumbSize: 24,
      fontSize: 14,
      borderRadius: 16,
    },
  },
  spacing: {
    padding: 2,
    margin: 4,
    labelGap: 8,
  },
  animation: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    loading: 'spin 1s linear infinite',
  },
  shadow: {
    default: '0 1px 3px rgba(0, 0, 0, 0.1)',
    hover: '0 4px 6px rgba(0, 0, 0, 0.1)',
    active: '0 2px 4px rgba(0, 0, 0, 0.15)',
    disabled: 'none',
  },
};

// 样式工具类
export const switchStyles = {
  /**
   * 获取样式配置
   */
  getStyleConfig: (customConfig?: Partial<SwitchStyleConfig>): SwitchStyleConfig => {
    return {
      ...defaultStyleConfig,
      colors: {
        ...defaultStyleConfig.colors,
        ...customConfig?.colors,
      },
      sizes: {
        ...defaultStyleConfig.sizes,
        ...customConfig?.sizes,
      },
      spacing: {
        ...defaultStyleConfig.spacing,
        ...customConfig?.spacing,
      },
      animation: {
        ...defaultStyleConfig.animation,
        ...customConfig?.animation,
      },
      shadow: {
        ...defaultStyleConfig.shadow,
        ...customConfig?.shadow,
      },
    };
  },

  /**
   * 获取容器样式
   */
  getContainerStyle: ({ block = false, style }: { block?: boolean; style?: any }) => {
    return {
      display: block ? 'flex' : 'inline-flex',
      flexDirection: 'column',
      alignItems: block ? 'stretch' : 'flex-start',
      gap: defaultStyleConfig.spacing.margin,
      ...style,
    };
  },

  /**
   * 获取包装器样式
   */
  getWrapperStyle: ({
    size: _size = 'md',
    disabled = false,
    readonly = false,
    style,
  }: {
    size: SwitchSize;
    disabled?: boolean;
    readonly?: boolean;
    style?: any;
  }) => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: defaultStyleConfig.spacing.labelGap,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled || readonly ? 'not-allowed' : 'pointer',
      ...style,
    };
  },

  /**
   * 获取开关轨道样式
   */
  getTrackStyle: ({
    size = 'md',
    variant = 'solid',
    color = 'primary',
    checked = false,
    disabled = false,
    loading = false,
    status: _status = 'normal',
    bordered = true,
    style,
  }: {
    size: SwitchSize;
    variant?: SwitchVariant;
    color?: SwitchColor;
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    status?: SwitchStatus;
    bordered?: boolean;
    style?: any;
  }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];
    const colors = defaultStyleConfig.colors;

    // 获取背景色
    let backgroundColor = colors.default;
    if (disabled) {
      backgroundColor = colors.disabled;
    } else if (loading) {
      backgroundColor = colors.primary;
    } else if (checked) {
      backgroundColor = colors[color];
    } else {
      backgroundColor = colors.default;
    }

    // 获取边框色
    let borderColor = colors.border;
    if (disabled) {
      borderColor = colors.disabled;
    } else if (checked && variant !== 'solid') {
      borderColor = colors[color];
    }

    return {
      position: 'relative',
      width: sizeConfig.width,
      height: sizeConfig.height,
      backgroundColor,
      borderColor: bordered ? borderColor : 'transparent',
      borderWidth: bordered ? 1 : 0,
      borderStyle: 'solid',
      borderRadius: sizeConfig.borderRadius,
      transition: `all ${defaultStyleConfig.animation.duration} ${defaultStyleConfig.animation.easing}`,
      boxShadow: defaultStyleConfig.shadow.default,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    };
  },

  /**
   * 获取开关滑块样式
   */
  getThumbStyle: ({
    size = 'md',
    checked = false,
    disabled = false,
    loading: _loading = false,
    style,
  }: {
    size: SwitchSize;
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    style?: any;
  }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];
    const colors = defaultStyleConfig.colors;

    // 计算滑块位置
    const translateX = checked ? sizeConfig.width - sizeConfig.thumbSize - defaultStyleConfig.spacing.padding * 2 : 0;

    return {
      position: 'absolute',
      top: defaultStyleConfig.spacing.padding,
      left: defaultStyleConfig.spacing.padding,
      width: sizeConfig.thumbSize,
      height: sizeConfig.thumbSize,
      backgroundColor: disabled ? colors.disabled : colors.background,
      borderRadius: '50%',
      transform: `translateX(${translateX}px)`,
      transition: `transform ${defaultStyleConfig.animation.duration} ${defaultStyleConfig.animation.easing}`,
      boxShadow: defaultStyleConfig.shadow.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    };
  },

  /**
   * 获取标签样式
   */
  getLabelStyle: ({ size = 'md', disabled = false, style }: { size: SwitchSize; disabled?: boolean; style?: any }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];
    const colors = defaultStyleConfig.colors;

    return {
      fontSize: sizeConfig.fontSize,
      color: disabled ? colors.disabled : colors.text,
      fontWeight: '500',
      userSelect: 'none',
      ...style,
    };
  },

  /**
   * 获取辅助文本样式
   */
  getHelperTextStyle: ({ size = 'md', style }: { size: SwitchSize; style?: any }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];
    const colors = defaultStyleConfig.colors;

    return {
      fontSize: sizeConfig.fontSize - 2,
      color: colors.text,
      opacity: 0.7,
      marginTop: 2,
      ...style,
    };
  },

  /**
   * 获取错误文本样式
   */
  getErrorTextStyle: ({ size = 'md', style }: { size: SwitchSize; style?: any }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];
    const colors = defaultStyleConfig.colors;

    return {
      fontSize: sizeConfig.fontSize - 2,
      color: colors.error,
      marginTop: 2,
      ...style,
    };
  },

  /**
   * 获取加载遮罩样式
   */
  getLoadingMaskStyle: ({ size = 'md', style }: { size: SwitchSize; style?: any }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: sizeConfig.width,
      height: sizeConfig.height,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: sizeConfig.borderRadius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    };
  },

  /**
   * 获取加载指示器样式
   */
  getLoadingIndicatorStyle: ({ size = 'md', style }: { size: SwitchSize; style?: any }) => {
    const sizeConfig = defaultStyleConfig.sizes[size];

    return {
      width: sizeConfig.thumbSize * 0.6,
      height: sizeConfig.thumbSize * 0.6,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopColor: '#ffffff',
      borderRadius: '50%',
      animation: defaultStyleConfig.animation.loading,
      ...style,
    };
  },

  /**
   * 获取开关组容器样式
   */
  getGroupContainerStyle: ({
    direction = 'horizontal',
    spacing = 8,
    style,
  }: {
    direction?: 'horizontal' | 'vertical';
    spacing?: number;
    style?: any;
  }) => {
    return {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      gap: spacing,
      ...style,
    };
  },

  /**
   * 获取开关组项样式
   */
  getGroupItemStyle: ({ style }: { style?: any }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };
  },

  /**
   * 获取类名
   */
  getClassName: ({
    size = 'md',
    variant = 'solid',
    color = 'primary',
    status = 'normal',
    disabled = false,
    loading = false,
    checked = false,
    bordered = true,
    block = false,
    className,
  }: {
    size?: SwitchSize;
    variant?: SwitchVariant;
    color?: SwitchColor;
    status?: SwitchStatus;
    disabled?: boolean;
    loading?: boolean;
    checked?: boolean;
    bordered?: boolean;
    block?: boolean;
    className?: string;
  }) => {
    const baseClasses = [
      'taro-uno-switch',
      `taro-uno-switch--${size}`,
      `taro-uno-switch--${variant}`,
      `taro-uno-switch--${color}`,
      `taro-uno-switch--${status}`,
    ];

    if (disabled) {
      baseClasses.push('taro-uno-switch--disabled');
    }

    if (loading) {
      baseClasses.push('taro-uno-switch--loading');
    }

    if (checked) {
      baseClasses.push('taro-uno-switch--checked');
    }

    if (bordered) {
      baseClasses.push('taro-uno-switch--bordered');
    }

    if (block) {
      baseClasses.push('taro-uno-switch--block');
    }

    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(' ');
  },

  /**
   * 获取轨道类名
   */
  getTrackClassName: ({
    size = 'md',
    variant = 'solid',
    color = 'primary',
    status = 'normal',
    disabled = false,
    loading = false,
    checked = false,
    bordered = true,
    className,
  }: {
    size?: SwitchSize;
    variant?: SwitchVariant;
    color?: SwitchColor;
    status?: SwitchStatus;
    disabled?: boolean;
    loading?: boolean;
    checked?: boolean;
    bordered?: boolean;
    className?: string;
  }) => {
    const baseClasses = [
      'taro-uno-switch__track',
      `taro-uno-switch__track--${size}`,
      `taro-uno-switch__track--${variant}`,
      `taro-uno-switch__track--${color}`,
      `taro-uno-switch__track--${status}`,
    ];

    if (disabled) {
      baseClasses.push('taro-uno-switch__track--disabled');
    }

    if (loading) {
      baseClasses.push('taro-uno-switch__track--loading');
    }

    if (checked) {
      baseClasses.push('taro-uno-switch__track--checked');
    }

    if (bordered) {
      baseClasses.push('taro-uno-switch__track--bordered');
    }

    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(' ');
  },

  /**
   * 获取滑块类名
   */
  getThumbClassName: ({
    size = 'md',
    disabled = false,
    loading = false,
    checked = false,
    className,
  }: {
    size?: SwitchSize;
    disabled?: boolean;
    loading?: boolean;
    checked?: boolean;
    className?: string;
  }) => {
    const baseClasses = ['taro-uno-switch__thumb', `taro-uno-switch__thumb--${size}`];

    if (disabled) {
      baseClasses.push('taro-uno-switch__thumb--disabled');
    }

    if (loading) {
      baseClasses.push('taro-uno-switch__thumb--loading');
    }

    if (checked) {
      baseClasses.push('taro-uno-switch__thumb--checked');
    }

    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(' ');
  },

  /**
   * 获取样式对象
   */
  getStyle: ({
    size: _size = 'md',
    variant: _variant = 'solid',
    color: _color = 'primary',
    status: _status = 'normal',
    disabled: _disabled = false,
    loading: _loading = false,
    checked: _checked = false,
    bordered: _bordered = true,
    style,
  }: {
    size?: SwitchSize;
    variant?: SwitchVariant;
    color?: SwitchColor;
    status?: SwitchStatus;
    disabled?: boolean;
    loading?: boolean;
    checked?: boolean;
    bordered?: boolean;
    style?: any;
  }) => {
    return {
      ...style,
    };
  },
};
