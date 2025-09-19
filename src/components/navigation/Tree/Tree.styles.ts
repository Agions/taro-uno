/**
 * Tree 树形控件样式系统
 * 提供完整的树形控件样式解决方案
 */

import type { CSSProperties } from 'react';
import type { 
  TreeSizeStyles, 
  TreeThemeStyles, 
  TreeModeStyles,
  TreeNodeStyles,
  TreeExpandIconStyles,
  TreeCheckboxStyles,
  TreeIconStyles,
  TreeContentStyles,
  TreeLoadingStyles
} from './Tree.types';

/**
 * Tree 组件样式配置
 */
export interface TreeStylesConfig {
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
  mode?: 'tree' | 'directory';
  showLine?: boolean;
  blockNode?: boolean;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

/**
 * 尺寸样式映射
 */
const sizeStyles: TreeSizeStyles = {
  small: {
    nodeHeight: 24,
    nodePadding: 4,
    iconSize: 14,
    fontSize: 12,
    lineHeight: 1.5,
    indent: 16,
  },
  medium: {
    nodeHeight: 32,
    nodePadding: 6,
    iconSize: 16,
    fontSize: 14,
    lineHeight: 1.5,
    indent: 20,
  },
  large: {
    nodeHeight: 40,
    nodePadding: 8,
    iconSize: 18,
    fontSize: 16,
    lineHeight: 1.5,
    indent: 24,
  },
};

/**
 * 主题样式映射
 */
const themeStyles: TreeThemeStyles = {
  light: {
    backgroundColor: '#ffffff',
    borderColor: '#e8e8e8',
    textColor: '#333333',
    selectedBackgroundColor: '#e6f7ff',
    selectedTextColor: '#1890ff',
    hoverBackgroundColor: '#f5f5f5',
    disabledColor: '#999999',
    loadingColor: '#1890ff',
    expandIconColor: '#666666',
    checkboxColor: '#1890ff',
    lineColor: '#d9d9d9',
  },
  dark: {
    backgroundColor: '#1f1f1f',
    borderColor: '#434343',
    textColor: '#ffffff',
    selectedBackgroundColor: '#111b26',
    selectedTextColor: '#40a9ff',
    hoverBackgroundColor: '#2f2f2f',
    disabledColor: '#666666',
    loadingColor: '#40a9ff',
    expandIconColor: '#bfbfbf',
    checkboxColor: '#40a9ff',
    lineColor: '#434343',
  },
};

/**
 * 模式样式映射
 */
const modeStyles: TreeModeStyles = {
  tree: {
    nodeDisplay: 'block',
    nodeBorder: 'none',
    nodeRadius: 0,
  },
  directory: {
    nodeDisplay: 'block',
    nodeBorder: '1px solid #e8e8e8',
    nodeRadius: 4,
  },
};

/**
 * 树节点样式
 */
const getNodeStyles = (config: TreeStylesConfig): TreeNodeStyles => {
  const { size = 'medium', theme = 'light', mode = 'tree', selected, expanded, disabled } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];
  const modeStyle = modeStyles[mode];

  return {
    treeNode: {
      display: 'flex',
      alignItems: 'center',
      minHeight: sizeStyle.nodeHeight,
      padding: `${sizeStyle.nodePadding}px`,
      backgroundColor: selected ? themeStyle.selectedBackgroundColor : 'transparent',
      color: disabled ? themeStyle.disabledColor : themeStyle.textColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
    } as CSSProperties,

    treeNodeContent: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      minHeight: sizeStyle.nodeHeight - (sizeStyle.nodePadding * 2),
      padding: `0 ${sizeStyle.nodePadding}px`,
      borderRadius: modeStyle.nodeRadius,
      border: modeStyle.nodeBorder,
      backgroundColor: selected ? themeStyle.selectedBackgroundColor : 'transparent',
      transition: 'all 0.3s ease',
    } as CSSProperties,

    treeNodeTitle: {
      flex: 1,
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
      color: disabled ? themeStyle.disabledColor : (selected ? themeStyle.selectedTextColor : themeStyle.textColor),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    } as CSSProperties,

    treeNodeSwitcher: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.nodeHeight,
      height: sizeStyle.nodeHeight,
      marginRight: sizeStyle.nodePadding,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform 0.3s ease',
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    } as CSSProperties,

    treeNodeSwitcherNoop: {
      visibility: 'hidden',
    } as CSSProperties,

    treeNodeCheckbox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize + 4,
      height: sizeStyle.iconSize + 4,
      marginRight: sizeStyle.nodePadding,
      cursor: disabled ? 'not-allowed' : 'pointer',
    } as CSSProperties,

    treeNodeIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize + 4,
      height: sizeStyle.iconSize + 4,
      marginRight: sizeStyle.nodePadding,
      fontSize: sizeStyle.iconSize,
    } as CSSProperties,

    treeNodeDropIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: themeStyle.selectedBackgroundColor,
      zIndex: 1,
    } as CSSProperties,

    treeNodeDragOver: {
      backgroundColor: themeStyle.hoverBackgroundColor,
    } as CSSProperties,

    treeNodeDragOverGapTop: {
      borderTop: `2px solid ${themeStyle.selectedBackgroundColor}`,
    } as CSSProperties,

    treeNodeDragOverGapBottom: {
      borderBottom: `2px solid ${themeStyle.selectedBackgroundColor}`,
    } as CSSProperties,
  };
};

/**
 * 展开图标样式
 */
const getExpandIconStyles = (config: TreeStylesConfig): TreeExpandIconStyles => {
  const { size = 'medium', theme = 'light', expanded, disabled } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];

  return {
    expandIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      fontSize: sizeStyle.iconSize,
      color: disabled ? themeStyle.disabledColor : themeStyle.expandIconColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform 0.3s ease',
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
    } as CSSProperties,

    expandIconLeaf: {
      visibility: 'hidden',
    } as CSSProperties,

    expandIconLoading: {
      animation: 'treeLoadingSpin 1s linear infinite',
    } as CSSProperties,
  };
};

/**
 * 复选框样式
 */
const getCheckboxStyles = (config: TreeStylesConfig): TreeCheckboxStyles => {
  const { size = 'medium', theme = 'light', disabled } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];

  return {
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      border: `1px solid ${disabled ? themeStyle.disabledColor : '#d9d9d9'}`,
      borderRadius: 2,
      backgroundColor: disabled ? '#f5f5f5' : '#ffffff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
    } as CSSProperties,

    checkboxChecked: {
      backgroundColor: disabled ? themeStyle.disabledColor : themeStyle.checkboxColor,
      borderColor: disabled ? themeStyle.disabledColor : themeStyle.checkboxColor,
    } as CSSProperties,

    checkboxIndeterminate: {
      backgroundColor: disabled ? themeStyle.disabledColor : themeStyle.checkboxColor,
      borderColor: disabled ? themeStyle.disabledColor : themeStyle.checkboxColor,
    } as CSSProperties,

    checkboxInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: '#ffffff',
      fontSize: sizeStyle.iconSize - 2,
    } as CSSProperties,
  };
};

/**
 * 图标样式
 */
const getIconStyles = (config: TreeStylesConfig): TreeIconStyles => {
  const { size = 'medium', theme = 'light', disabled } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];

  return {
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      fontSize: sizeStyle.iconSize,
      color: disabled ? themeStyle.disabledColor : themeStyle.textColor,
    } as CSSProperties,

    iconOpen: {
      color: themeStyle.selectedTextColor,
    } as CSSProperties,

    iconClose: {
      color: themeStyle.textColor,
    } as CSSProperties,

    iconLeaf: {
      color: themeStyle.textColor,
    } as CSSProperties,
  };
};

/**
 * 内容样式
 */
const getContentStyles = (config: TreeStylesConfig): TreeContentStyles => {
  const { size = 'medium', theme = 'light', selected, disabled } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];

  return {
    content: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      minHeight: sizeStyle.nodeHeight - (sizeStyle.nodePadding * 2),
      padding: `0 ${sizeStyle.nodePadding}px`,
      borderRadius: 4,
      backgroundColor: selected ? themeStyle.selectedBackgroundColor : 'transparent',
      transition: 'all 0.3s ease',
      cursor: disabled ? 'not-allowed' : 'pointer',
    } as CSSProperties,

    contentHover: {
      backgroundColor: !disabled && !selected ? themeStyle.hoverBackgroundColor : 'transparent',
    } as CSSProperties,

    contentSelected: {
      backgroundColor: selected ? themeStyle.selectedBackgroundColor : 'transparent',
    } as CSSProperties,

    contentDisabled: {
      cursor: 'not-allowed',
      opacity: 0.6,
    } as CSSProperties,
  };
};

/**
 * 加载样式
 */
const getLoadingStyles = (config: TreeStylesConfig): TreeLoadingStyles => {
  const { size = 'medium', theme = 'light' } = config;
  const sizeStyle = sizeStyles[size];
  const themeStyle = themeStyles[theme];

  return {
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      fontSize: sizeStyle.iconSize,
      color: themeStyle.loadingColor,
      animation: 'treeLoadingSpin 1s linear infinite',
    } as CSSProperties,

    loadingText: {
      marginLeft: sizeStyle.nodePadding,
      fontSize: sizeStyle.fontSize,
      color: themeStyle.disabledColor,
    } as CSSProperties,
  };
};

/**
 * 连接线样式
 */
const getLineStyles = (config: TreeStylesConfig): CSSProperties => {
  const { theme = 'light', showLine } = config;
  const themeStyle = themeStyles[theme];

  return {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: showLine ? 1 : 0,
    backgroundColor: showLine ? themeStyle.lineColor : 'transparent',
  } as CSSProperties;
};

/**
 * 主要样式函数
 * 获取完整的树形控件样式
 */
export const getTreeStyles = (config: TreeStylesConfig = {}) => {
  const nodeStyles = getNodeStyles(config);
  const expandIconStyles = getExpandIconStyles(config);
  const checkboxStyles = getCheckboxStyles(config);
  const iconStyles = getIconStyles(config);
  const contentStyles = getContentStyles(config);
  const loadingStyles = getLoadingStyles(config);
  const lineStyles = getLineStyles(config);

  return {
    // 容器样式
    tree: {
      backgroundColor: themeStyles[config.theme || 'light'].backgroundColor,
      borderRadius: 4,
      overflow: 'hidden',
    } as CSSProperties,

    // 节点样式
    ...nodeStyles,

    // 展开图标样式
    ...expandIconStyles,

    // 复选框样式
    ...checkboxStyles,

    // 图标样式
    ...iconStyles,

    // 内容样式
    ...contentStyles,

    // 加载样式
    ...loadingStyles,

    // 连接线样式
    line: lineStyles,

    // 工具函数
    getNodeIndent: (level: number) => ({
      paddingLeft: level * sizeStyles[config.size || 'medium'].indent,
    }),

    getDropPosition: (position: 'top' | 'bottom' | 'inner') => {
      const themeStyle = themeStyles[config.theme || 'light'];
      const styles: Record<string, CSSProperties> = {
        top: {
          borderTop: `2px solid ${themeStyle.selectedBackgroundColor}`,
        },
        bottom: {
          borderBottom: `2px solid ${themeStyle.selectedBackgroundColor}`,
        },
        inner: {
          backgroundColor: themeStyle.hoverBackgroundColor,
        },
      };
      return styles[position];
    },
  };
};

/**
 * 类名生成函数
 * 根据配置生成CSS类名
 */
export const getTreeClassNames = (config: TreeStylesConfig = {}) => {
  const { size = 'medium', theme = 'light', mode = 'tree', showLine, disabled, loading } = config;

  return {
    tree: [
      'taro-tree',
      `taro-tree-size-${size}`,
      `taro-tree-theme-${theme}`,
      `taro-tree-mode-${mode}`,
      showLine && 'taro-tree-show-line',
    ].filter(Boolean).join(' '),

    treeNode: [
      'taro-tree-node',
      disabled && 'taro-tree-node-disabled',
      loading && 'taro-tree-node-loading',
    ].filter(Boolean).join(' '),

    treeNodeContent: [
      'taro-tree-node-content',
      disabled && 'taro-tree-node-content-disabled',
    ].filter(Boolean).join(' '),

    treeNodeTitle: 'taro-tree-node-title',

    treeNodeSwitcher: 'taro-tree-node-switcher',

    treeNodeSwitcherNoop: 'taro-tree-node-switcher-noop',

    treeNodeCheckbox: [
      'taro-tree-node-checkbox',
      disabled && 'taro-tree-node-checkbox-disabled',
    ].filter(Boolean).join(' '),

    treeNodeIcon: 'taro-tree-node-icon',

    expandIcon: 'taro-tree-expand-icon',

    expandIconLeaf: 'taro-tree-expand-icon-leaf',

    expandIconLoading: 'taro-tree-expand-icon-loading',

    checkbox: [
      'taro-tree-checkbox',
      disabled && 'taro-tree-checkbox-disabled',
    ].filter(Boolean).join(' '),

    checkboxChecked: 'taro-tree-checkbox-checked',

    checkboxIndeterminate: 'taro-tree-checkbox-indeterminate',

    icon: 'taro-tree-icon',

    iconOpen: 'taro-tree-icon-open',

    iconClose: 'taro-tree-icon-close',

    iconLeaf: 'taro-tree-icon-leaf',

    content: [
      'taro-tree-content',
      disabled && 'taro-tree-content-disabled',
    ].filter(Boolean).join(' '),

    loading: 'taro-tree-loading',

    loadingText: 'taro-tree-loading-text',

    line: 'taro-tree-line',
  };
};

// 类型已在第22行导出