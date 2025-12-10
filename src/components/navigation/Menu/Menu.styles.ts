import type { CSSProperties } from 'react';
import type { MenuItemStyles } from './Menu.types';

/** Menu组件样式配置接口 */
interface MenuStyleConfig {
  /** 基础样式 */
  container: CSSProperties;
  /** 水平菜单容器 */
  horizontalContainer: CSSProperties;
  /** 菜单项基础样式 */
  item: CSSProperties;
  /** 选中状态 */
  selected: CSSProperties;
  /** 禁用状态 */
  disabled: CSSProperties;
  /** 悬停状态 */
  hover: CSSProperties;
  /** 危险操作 */
  danger: CSSProperties;
  /** 危险操作悬停 */
  dangerHover: CSSProperties;
  /** 子菜单样式 */
  subMenu: CSSProperties;
  /** 子菜单标题 */
  subMenuTitle: CSSProperties;
  /** 子菜单内容 */
  subMenuContent: CSSProperties;
  /** 分组标题 */
  groupTitle: CSSProperties;
  /** 图标样式 */
  icon: CSSProperties;
  /** 标签样式 */
  label: CSSProperties;
  /** 额外信息样式 */
  extra: CSSProperties;
  /** 徽章样式 */
  badge: CSSProperties;
  /** 展开图标样式 */
  expandIcon: CSSProperties;
  /** 展开图标打开状态 */
  expandIconOpen: CSSProperties;
  /** 折叠按钮样式 */
  collapseButton: CSSProperties;
  /** 折叠按钮悬停 */
  collapseButtonHover: CSSProperties;
  /** 分隔线 */
  divider: CSSProperties;
  /** 暗色主题 */
  dark: {
    container: CSSProperties;
    item: CSSProperties;
    selected: CSSProperties;
    hover: CSSProperties;
    groupTitle: CSSProperties;
    subMenuContent: CSSProperties;
  };
  /** 尺寸变体 */
  sizes: {
    small: {
      item: CSSProperties;
      label: CSSProperties;
      icon: CSSProperties;
      badge: CSSProperties;
    };
    medium: {
      item: CSSProperties;
      label: CSSProperties;
      icon: CSSProperties;
      badge: CSSProperties;
    };
    large: {
      item: CSSProperties;
      label: CSSProperties;
      icon: CSSProperties;
      badge: CSSProperties;
    };
  };
}

/** 样式函数接口 */
interface MenuStyleFunctions {
  /** 获取尺寸样式 */
  getSizeStyles: (size: 'small' | 'medium' | 'large') => MenuItemStyles;
  /** 获取主题样式 */
  getThemeStyles: (theme: 'light' | 'dark') => MenuItemStyles;
  /** 获取模式样式 */
  getModeStyles: (mode: 'vertical' | 'horizontal' | 'inline') => MenuItemStyles;
  /** 获取菜单项样式 */
  getItemStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    mode?: 'vertical' | 'horizontal' | 'inline';
    selected?: boolean;
    disabled?: boolean;
    danger?: boolean;
    isSubMenu?: boolean;
    isGroup?: boolean;
    level?: number;
    collapsed?: boolean;
  }) => CSSProperties;
  /** 获取子菜单样式 */
  getSubMenuStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    mode?: 'vertical' | 'horizontal' | 'inline';
    open?: boolean;
    level?: number;
    collapsed?: boolean;
  }) => CSSProperties;
  /** 获取容器样式 */
  getContainerStyle: (props: {
    mode?: 'vertical' | 'horizontal' | 'inline';
    theme?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
    collapsed?: boolean;
    style?: CSSProperties;
  }) => CSSProperties;
  /** 获取图标样式 */
  getIconStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
    disabled?: boolean;
  }) => CSSProperties;
  /** 获取标签样式 */
  getLabelStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
    disabled?: boolean;
    danger?: boolean;
  }) => CSSProperties;
  /** 获取徽章样式 */
  getBadgeStyle: (props: { size?: 'small' | 'medium' | 'large'; theme?: 'light' | 'dark' }) => CSSProperties;
  /** 获取折叠按钮样式 */
  getCollapseButtonStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    collapsed?: boolean;
  }) => CSSProperties;
}

/** Menu组件样式 */
export type { MenuStyleConfig, MenuStyleFunctions };
export const menuStyles: MenuStyleConfig & MenuStyleFunctions = {
  // 基础样式
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },

  // 水平菜单容器
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #e5e7eb',
    borderRadius: '6px 6px 0 0',
  },

  // 菜单项基础样式
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    background: 'transparent',
    textDecoration: 'none',
    color: '#374151',
    position: 'relative',
    minHeight: '40px',
  },

  // 选中状态
  selected: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontWeight: 500,
  },

  // 禁用状态
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
    color: '#9ca3af',
  },

  // 悬停状态
  hover: {
    backgroundColor: '#f3f4f6',
  },

  // 危险操作
  danger: {
    color: '#ef4444',
  },

  dangerHover: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
  },

  // 子菜单样式
  subMenu: {
    position: 'relative',
    width: '100%',
  },

  subMenuTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    minHeight: '40px',
  },

  subMenuContent: {
    backgroundColor: '#f9fafb',
    borderLeft: '1px solid #e5e7eb',
  },

  // 分组标题
  groupTitle: {
    padding: '8px 16px',
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 600,
    textTransform: 'uppercase',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },

  // 图标样式
  icon: {
    marginRight: '8px',
    fontSize: '16px',
    minWidth: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 标签样式
  label: {
    flex: 1,
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // 额外信息样式
  extra: {
    marginLeft: '8px',
    fontSize: '12px',
    color: '#6b7280',
  },

  // 徽章样式
  badge: {
    marginLeft: '8px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '10px',
    minWidth: '16px',
    textAlign: 'center',
    lineHeight: '1',
  },

  // 展开图标样式
  expandIcon: {
    marginLeft: '8px',
    fontSize: '12px',
    transition: 'transform 0.2s ease',
  },

  expandIconOpen: {
    transform: 'rotate(90deg)',
  },

  // 折叠按钮样式
  collapseButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#374151',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid #e5e7eb',
  },

  collapseButtonHover: {
    backgroundColor: '#f3f4f6',
  },

  // 分隔线
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '4px 0',
  },

  // 暗色主题
  dark: {
    container: {
      backgroundColor: '#1f2937',
      borderColor: '#374151',
    },
    item: {
      color: '#e5e7eb',
    },
    selected: {
      backgroundColor: '#374151',
      color: '#60a5fa',
    },
    hover: {
      backgroundColor: '#374151',
    },
    groupTitle: {
      backgroundColor: '#111827',
      color: '#9ca3af',
      borderBottomColor: '#374151',
    },
    subMenuContent: {
      backgroundColor: '#111827',
      borderLeftColor: '#374151',
    },
  },

  // 尺寸变体
  sizes: {
    small: {
      item: {
        padding: '8px 12px',
        minHeight: '32px',
      },
      label: {
        fontSize: '12px',
      },
      icon: {
        fontSize: '14px',
        minWidth: '14px',
      },
      badge: {
        fontSize: '10px',
        padding: '1px 4px',
        minWidth: '14px',
      },
    },
    medium: {
      item: {
        padding: '12px 16px',
        minHeight: '40px',
      },
      label: {
        fontSize: '14px',
      },
      icon: {
        fontSize: '16px',
        minWidth: '16px',
      },
      badge: {
        fontSize: '12px',
        padding: '2px 6px',
        minWidth: '16px',
      },
    },
    large: {
      item: {
        padding: '16px 20px',
        minHeight: '48px',
      },
      label: {
        fontSize: '16px',
      },
      icon: {
        fontSize: '18px',
        minWidth: '18px',
      },
      badge: {
        fontSize: '14px',
        padding: '3px 8px',
        minWidth: '18px',
      },
    },
  },

  // 获取尺寸样式
  getSizeStyles: (size: 'small' | 'medium' | 'large'): MenuItemStyles => {
    const sizeStyles = menuStyles.sizes[size] || menuStyles.sizes.medium;
    return {
      container: sizeStyles.item,
      item: sizeStyles.item,
      selected: sizeStyles.item,
      disabled: sizeStyles.item,
      hover: sizeStyles.item,
      danger: sizeStyles.item,
      subMenu: sizeStyles.item,
      groupTitle: sizeStyles.item,
      icon: sizeStyles.icon,
      label: sizeStyles.label,
      extra: {},
      badge: sizeStyles.badge,
      collapseButton: sizeStyles.item,
      responsive: {},
    };
  },

  // 获取主题样式
  getThemeStyles: (theme: 'light' | 'dark'): MenuItemStyles => {
    const themeStyles = (menuStyles as any)[theme] || menuStyles.dark;
    return {
      container: themeStyles.container,
      item: themeStyles.item,
      selected: themeStyles.selected,
      disabled: {},
      hover: themeStyles.hover,
      danger: {},
      subMenu: {},
      groupTitle: themeStyles.groupTitle,
      icon: {},
      label: {},
      extra: {},
      badge: {},
      collapseButton: {},
      responsive: {},
    };
  },

  // 获取模式样式
  getModeStyles: (mode: 'vertical' | 'horizontal' | 'inline'): MenuItemStyles => {
    const modeStyles: Record<string, MenuItemStyles> = {
      horizontal: {
        container: menuStyles['horizontalContainer'],
        item: {
          ...menuStyles['item'],
          borderRight: '1px solid #e5e7eb',
          borderRadius: 0,
        },
        selected: {
          ...menuStyles['selected'],
          borderBottom: '2px solid #3b82f6',
        },
        disabled: {},
        hover: {},
        danger: {},
        subMenu: {},
        groupTitle: {},
        icon: {},
        label: {},
        extra: {},
        badge: {},
        collapseButton: {},
        responsive: {},
      },
      vertical: {
        container: menuStyles['container'],
        item: menuStyles['item'],
        selected: menuStyles['selected'],
        disabled: {},
        hover: {},
        danger: {},
        subMenu: {},
        groupTitle: {},
        icon: {},
        label: {},
        extra: {},
        badge: {},
        collapseButton: {},
        responsive: {},
      },
      inline: {
        container: menuStyles['container'],
        item: menuStyles['item'],
        selected: menuStyles['selected'],
        disabled: {},
        hover: {},
        danger: {},
        subMenu: {},
        groupTitle: {},
        icon: {},
        label: {},
        extra: {},
        badge: {},
        collapseButton: {},
        responsive: {},
      },
    };

    return (
      modeStyles[mode] || {
        container: {},
        item: {},
        selected: {},
        disabled: {},
        hover: {},
        danger: {},
        subMenu: {},
        groupTitle: {},
        icon: {},
        label: {},
        extra: {},
        badge: {},
        collapseButton: {},
        responsive: {},
      }
    );
  },

  // 获取菜单项样式
  getItemStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    mode?: 'vertical' | 'horizontal' | 'inline';
    selected?: boolean;
    disabled?: boolean;
    danger?: boolean;
    isSubMenu?: boolean;
    isGroup?: boolean;
    level?: number;
    collapsed?: boolean;
  }): CSSProperties => {
    const {
      size = 'medium',
      theme = 'light',
      mode = 'vertical',
      selected = false,
      disabled = false,
      danger = false,
      // isSubMenu = false,
      isGroup = false,
      // level = 0,
      collapsed = false,
    } = props;

    const sizeStyles = menuStyles.getSizeStyles(size);
    const themeStyles = menuStyles.getThemeStyles(theme);
    const modeStyles = menuStyles.getModeStyles(mode);

    let style: CSSProperties = {
      ...sizeStyles['item'],
      ...themeStyles['item'],
      ...modeStyles['item'],
    };

    // 内联模式的缩进
    // if (mode === 'inline' && level > 0) {
    //   style.paddingLeft = `${16 + level * 24}px`;
    // }

    // 选中状态
    if (selected) {
      style = {
        ...style,
        ...sizeStyles['selected'],
        ...themeStyles['selected'],
        ...modeStyles['selected'],
      };
    }

    // 禁用状态
    if (disabled) {
      style = {
        ...style,
        ...sizeStyles['disabled'],
        ...themeStyles['disabled'],
        ...modeStyles['disabled'],
      };
    }

    // 危险操作
    if (danger) {
      style = {
        ...style,
        ...menuStyles['danger'],
      };
    }

    // 分组标题
    if (isGroup) {
      style = {
        ...style,
        ...sizeStyles['groupTitle'],
        ...themeStyles['groupTitle'],
      };
    }

    // 折叠状态
    if (collapsed && mode === 'inline') {
      style.paddingLeft = '16px';
      style.paddingRight = '16px';
    }

    return style;
  },

  // 获取子菜单样式
  getSubMenuStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    mode?: 'vertical' | 'horizontal' | 'inline';
    open?: boolean;
    level?: number;
    collapsed?: boolean;
  }): CSSProperties => {
    const {
      // size = 'medium', // Commented out - unused
      // theme = 'light', // Commented out - unused
      mode = 'vertical',
      open = false,
      // level = 0, // Commented out - unused
      // collapsed = false, // Commented out - unused
    } = props;

    // const themeStyles = menuStyles.getThemeStyles(theme); // Commented out - unused

    let style: CSSProperties = {
      ...menuStyles['subMenu'],
    };

    // 水平模式的子菜单
    if (mode === 'horizontal') {
      style = {
        ...style,
        position: 'absolute',
        top: '100%',
        left: 0,
        minWidth: '200px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      };
    }

    // 内联模式的子菜单
    if (mode === 'inline') {
      style = {
        ...style,
        backgroundColor: open ? '#f9fafb' : 'transparent',
        borderLeft: open ? '1px solid #e5e7eb' : 'none',
      };
    }

    return style;
  },

  // 获取容器样式
  getContainerStyle: (props: {
    mode?: 'vertical' | 'horizontal' | 'inline';
    theme?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
    collapsed?: boolean;
    style?: CSSProperties;
  }): CSSProperties => {
    const { mode = 'vertical', theme = 'light', size = 'medium', collapsed = false, style = {} } = props;

    const sizeStyles = menuStyles.getSizeStyles(size);
    const themeStyles = menuStyles.getThemeStyles(theme);
    const modeStyles = menuStyles.getModeStyles(mode);

    return {
      ...menuStyles['container'],
      ...sizeStyles['container'],
      ...themeStyles['container'],
      ...modeStyles['container'],
      ...style,
      width: collapsed && mode === 'inline' ? '80px' : '100%',
    };
  },

  // 获取图标样式
  getIconStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
    disabled?: boolean;
  }): CSSProperties => {
    const { size = 'medium', selected = false, disabled = false } = props;
    const sizeStyles = menuStyles.getSizeStyles(size);

    let style: CSSProperties = {
      ...menuStyles['icon'],
      ...sizeStyles['icon'],
    };

    if (selected) {
      style.color = '#1d4ed8';
    }

    if (disabled) {
      style.opacity = 0.5;
    }

    return style;
  },

  // 获取标签样式
  getLabelStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    selected?: boolean;
    disabled?: boolean;
    danger?: boolean;
  }): CSSProperties => {
    const { size = 'medium', selected = false, disabled = false, danger = false } = props;
    const sizeStyles = menuStyles.getSizeStyles(size);

    let style: CSSProperties = {
      ...menuStyles['label'],
      ...sizeStyles['label'],
    };

    if (selected) {
      style.color = '#1d4ed8';
      style.fontWeight = 500;
    }

    if (disabled) {
      style.color = '#9ca3af';
    }

    if (danger) {
      style.color = '#ef4444';
    }

    return style;
  },

  // 获取徽章样式
  getBadgeStyle: (props: { size?: 'small' | 'medium' | 'large'; theme?: 'light' | 'dark' }): CSSProperties => {
    const { size = 'medium' } = props;
    const sizeStyles = menuStyles.getSizeStyles(size);

    return {
      ...menuStyles['badge'],
      ...sizeStyles['badge'],
    };
  },

  // 获取折叠按钮样式
  getCollapseButtonStyle: (props: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
    collapsed?: boolean;
  }): CSSProperties => {
    const { size = 'medium' } = props;
    const sizeStyles = menuStyles.getSizeStyles(size);

    return {
      ...menuStyles['collapseButton'],
      ...sizeStyles['collapseButton'],
    };
  },
};
