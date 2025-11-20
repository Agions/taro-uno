import type { ReactNode, CSSProperties } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 树节点类型 */
export interface TreeNode {
  /** 节点唯一标识 */
  key: string | number;
  /** 节点标题 */
  title: ReactNode;
  /** 节点图标 */
  icon?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用复选框 */
  disableCheckbox?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否半选中 */
  halfChecked?: boolean;
  /** 是否叶子节点 */
  isLeaf?: boolean;
  /** 子节点 */
  children?: TreeNode[];
  /** 节点数据 */
  data?: any;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义属性 */
  [key: string]: any;
}

/** 树数据源类型 */
export type TreeDataSource = TreeNode[];
export type TreeData = TreeDataSource;

/** 树选中值类型 */
export type TreeValue = string | number | (string | number)[];

/** 树展开键类型 */
export type TreeExpandedKeys = (string | number)[];

/** 树选中键类型 */
export type TreeSelectedKeys = (string | number)[];

/** 树选中值类型（复选框） */
export type TreeCheckedKeys = (string | number)[];

/** 键类型 */
export type Key = string | number;

/** 样式接口 */
export interface TreeSizeStyles {
  small: {
    nodeHeight: number;
    nodePadding: number;
    iconSize: number;
    fontSize: number;
    lineHeight: number;
    indent: number;
  };
  medium: {
    nodeHeight: number;
    nodePadding: number;
    iconSize: number;
    fontSize: number;
    lineHeight: number;
    indent: number;
  };
  large: {
    nodeHeight: number;
    nodePadding: number;
    iconSize: number;
    fontSize: number;
    lineHeight: number;
    indent: number;
  };
}

export interface TreeThemeStyles {
  light: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    selectedBackgroundColor: string;
    selectedTextColor: string;
    hoverBackgroundColor: string;
    disabledColor: string;
    loadingColor: string;
    expandIconColor: string;
    checkboxColor: string;
    lineColor: string;
  };
  dark: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    selectedBackgroundColor: string;
    selectedTextColor: string;
    hoverBackgroundColor: string;
    disabledColor: string;
    loadingColor: string;
    expandIconColor: string;
    checkboxColor: string;
    lineColor: string;
  };
}

export interface TreeModeStyles {
  tree: {
    nodeDisplay: string;
    nodeBorder: string;
    nodeRadius: number;
  };
  directory: {
    nodeDisplay: string;
    nodeBorder: string;
    nodeRadius: number;
  };
}

export interface TreeNodeStyles {
  treeNode: CSSProperties;
  treeNodeContent: CSSProperties;
  treeNodeTitle: CSSProperties;
  treeNodeSwitcher: CSSProperties;
  treeNodeSwitcherNoop: CSSProperties;
  treeNodeCheckbox: CSSProperties;
  treeNodeIcon: CSSProperties;
  treeNodeDropIndicator: CSSProperties;
  treeNodeDragOver: CSSProperties;
  treeNodeDragOverGapTop: CSSProperties;
  treeNodeDragOverGapBottom: CSSProperties;
}

export interface TreeExpandIconStyles {
  expandIcon: CSSProperties;
  expandIconLeaf: CSSProperties;
  expandIconLoading: CSSProperties;
}

export interface TreeCheckboxStyles {
  checkbox: CSSProperties;
  checkboxChecked: CSSProperties;
  checkboxIndeterminate: CSSProperties;
  checkboxInner: CSSProperties;
}

export interface TreeIconStyles {
  icon: CSSProperties;
  iconOpen: CSSProperties;
  iconClose: CSSProperties;
  iconLeaf: CSSProperties;
}

export interface TreeContentStyles {
  content: CSSProperties;
  contentHover: CSSProperties;
  contentSelected: CSSProperties;
  contentDisabled: CSSProperties;
}

export interface TreeLoadingStyles {
  loading: CSSProperties;
  loadingText: CSSProperties;
}

/** 树尺寸 */
export type TreeSize = 'small' | 'medium' | 'large';

/** 树状态 */
export type TreeStatus = 'default' | 'error' | 'warning' | 'success';

/** 树展开方式 */
export type TreeExpandAction = 'click' | 'doubleClick';

/** 树选择模式 */
export type TreeSelectionType = 'single' | 'multiple';

/** 树复选框模式 */
export type TreeCheckableType = 'none' | 'single' | 'multiple';

/** 树拖拽模式 */
export type TreeDraggableType = 'none' | 'node' | 'all';

/** 树原生属性 */
export interface TreeNativeProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件类名 */
  className?: string;
  /** 组件样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: (_event: ITouchEvent) => void;
  /** 长按事件 */
  onLongPress?: (_event: ITouchEvent) => void;
  /** 触摸开始事件 */
  onTouchStart?: (_event: ITouchEvent) => void;
  /** 触摸移动事件 */
  onTouchMove?: (_event: ITouchEvent) => void;
  /** 触摸结束事件 */
  onTouchEnd?: (_event: ITouchEvent) => void;
  /** 触摸取消事件 */
  onTouchCancel?: (_event: ITouchEvent) => void;
  /** 数据集属性 */
  dataset?: Record<string, any>;
  /** 自定义属性 */
  [key: string]: any;
}

/** 树属性接口 */
export interface TreeProps extends Omit<TreeNativeProps, 'onChange'> {
  /** 树数据 */
  treeData: TreeDataSource;
  /** 受控选中值 */
  value?: TreeValue;
  /** 默认选中值 */
  defaultValue?: TreeValue;
  /** 受控展开键 */
  expandedKeys?: TreeExpandedKeys;
  /** 默认展开键 */
  defaultExpandedKeys?: TreeExpandedKeys;
  /** 受控选中键 */
  selectedKeys?: TreeSelectedKeys;
  /** 默认选中键 */
  defaultSelectedKeys?: TreeSelectedKeys;
  /** 受控选中键（复选框） */
  checkedKeys?: TreeCheckedKeys;
  /** 默认选中键（复选框） */
  defaultCheckedKeys?: TreeCheckedKeys;
  /** 尺寸 */
  size?: TreeSize;
  /** 状态 */
  status?: TreeStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否可展开 */
  expandable?: boolean;
  /** 是否可选择 */
  selectable?: boolean;
  /** 是否可多选 */
  multiple?: boolean;
  /** 是否显示复选框 */
  checkable?: TreeCheckableType;
  /** 是否可拖拽 */
  draggable?: TreeDraggableType;
  /** 是否禁用子节点拖拽 */
  disableDrag?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** 是否展开所有节点 */
  defaultExpandAll?: boolean;
  /** 是否展开到指定层级 */
  defaultExpandParent?: boolean;
  /** 是否虚拟滚动 */
  virtual?: boolean;
  /** 虚拟滚动高度 */
  height?: number;
  /** 展开方式 */
  expandAction?: TreeExpandAction;
  /** 选择模式 */
  selectionType?: TreeSelectionType;
  /** 是否严格模式 */
  strict?: boolean;
  /** 是否过滤掉已删除的节点 */
  filterDeleted?: boolean;
  /** 是否过滤掉禁用的节点 */
  filterDisabled?: boolean;
  /** 字段映射 */
  fieldNames?: {
    key?: string;
    title?: string;
    children?: string;
    icon?: string;
    disabled?: string;
    disableCheckbox?: string;
    selected?: string;
    expanded?: string;
    isLeaf?: string;
  };
  /** 加载数据函数 */
  loadData?: (_node: TreeNode) => Promise<void>;
  /** 加载完成回调 */
  onLoad?: (_loadedKeys: TreeExpandedKeys) => void;
  /** 过滤节点函数 */
  filterTreeNode?: (_node: TreeNode) => boolean;
  /** 自定义节点渲染 */
  titleRender?: (_node: TreeNode) => ReactNode;
  /** 自定义图标渲染 */
  iconRender?: (_node: TreeNode) => ReactNode;
  /** 自定义切换图标渲染 */
  switcherIcon?: (_node: TreeNode) => ReactNode;
  /** 自定义拖拽图标渲染 */
  dragIcon?: (_node: TreeNode) => ReactNode;
  /** 自定义行渲染 */
  rowRender?: (_node: TreeNode, index: number) => ReactNode;
  /** 值变化回调 */
  onChange?: (_value: TreeValue, selectedNodes: TreeNode[], event: { node: TreeNode; selected: boolean }) => void;
  /** 展开变化回调 */
  onExpand?: (_expandedKeys: TreeExpandedKeys, node: TreeNode, expanded: boolean) => void;
  /** 选中变化回调 */
  onSelect?: (_selectedKeys: TreeSelectedKeys, node: TreeNode, selected: boolean, event: ITouchEvent) => void;
  /** 复选框变化回调 */
  onCheck?: (_checkedKeys: TreeCheckedKeys, node: TreeNode, checked: boolean, checkedNodes: TreeNode[], halfCheckedKeys: TreeCheckedKeys) => void;
  /** 拖拽开始回调 */
  onDragStart?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  /** 拖拽结束回调 */
  onDragEnd?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  /** 拖拽进入回调 */
  onDragEnter?: (_info: { node: TreeNode; event: React.DragEvent; expandedKeys: TreeExpandedKeys }) => void;
  /** 拖拽离开回调 */
  onDragLeave?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  /** 拖拽覆盖回调 */
  onDragOver?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  /** 拖拽放下回调 */
  onDrop?: (_info: { node: TreeNode; dragNode: TreeNode; dropPosition: number; event: React.DragEvent }) => void;
  /** 右键点击回调 */
  onRightClick?: (_info: { node: TreeNode; event: React.MouseEvent }) => void;
  /** 双击回调 */
  onDoubleClick?: (_info: { node: TreeNode; event: React.MouseEvent }) => void;
  /** 滚动回调 */
  onScroll?: (_event: React.UIEvent<HTMLDivElement>) => void;
  /** 无障碍访问 */
  accessible?: boolean;
  /** 无障碍标签 */
  accessibilityLabel?: string;
  /** 无障碍角色 */
  accessibilityRole?: string;
  /** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    readonly?: boolean;
    busy?: boolean;
    expanded?: boolean;
    selected?: boolean;
    checked?: boolean;
  };
}

/** 树引用接口 */
export interface TreeRef {
  /** 获取选中值 */
  getValue: () => TreeValue;
  /** 设置选中值 */
  setValue: (_value: TreeValue) => void;
  /** 获取展开键 */
  getExpandedKeys: () => TreeExpandedKeys;
  /** 设置展开键 */
  setExpandedKeys: (_keys: TreeExpandedKeys) => void;
  /** 获取选中键 */
  getSelectedKeys: () => TreeSelectedKeys;
  /** 设置选中键 */
  setSelectedKeys: (_keys: TreeSelectedKeys) => void;
  /** 获取选中键（复选框） */
  getCheckedKeys: () => TreeCheckedKeys;
  /** 设置选中键（复选框） */
  setCheckedKeys: (_keys: TreeCheckedKeys) => void;
  /** 获取数据 */
  getTreeData: () => TreeDataSource;
  /** 设置数据 */
  setTreeData: (_data: TreeDataSource) => void;
  /** 获取选中节点 */
  getSelectedNodes: () => TreeNode[];
  /** 获取选中节点（复选框） */
  getCheckedNodes: () => TreeNode[];
  /** 获取展开节点 */
  getExpandedNodes: () => TreeNode[];
  /** 查找节点 */
  findNode: (_key: string | number) => TreeNode | null;
  /** 查找节点路径 */
  findNodePath: (_key: string | number) => TreeNode[];
  /** 展开节点 */
  expandNode: (_key: string | number, expanded?: boolean) => void;
  /** 选中节点 */
  selectNode: (_key: string | number, selected?: boolean) => void;
  /** 复选框选中节点 */
  checkNode: (_key: string | number, checked?: boolean) => void;
  /** 展开所有节点 */
  expandAll: () => void;
  /** 折叠所有节点 */
  collapseAll: () => void;
  /** 选择所有节点 */
  selectAll: () => void;
  /** 清空选择 */
  clearSelect: () => void;
  /** 全选（复选框） */
  checkAll: () => void;
  /** 清空复选框选择 */
  clearCheck: () => void;
  /** 过滤节点 */
  filterNodes: (_filterFn: (node: TreeNode) => boolean) => TreeDataSource;
  /** 添加节点 */
  addNode: (_parentNodeKey: string | number, newNode: TreeNode) => void;
  /** 更新节点 */
  updateNode: (_key: string | number, updates: Partial<TreeNode>) => void;
  /** 删除节点 */
  removeNode: (_key: string | number) => void;
  /** 移动节点 */
  moveNode: (_key: string | number, targetKey: string | number, position: 'before' | 'after' | 'inside') => void;
  /** 禁用节点 */
  disableNode: (_key: string | number, disabled?: boolean) => void;
  /** 启用节点 */
  enableNode: (_key: string | number) => void;
  /** 展开到指定节点 */
  scrollToNode: (_key: string | number) => void;
  /** 刷新节点 */
  refreshNode: (_key: string | number) => void;
  /** 重置 */
  reset: () => void;
}

/** 树配置接口 */
export interface TreeConfig {
  /** 树数据 */
  treeData: TreeDataSource;
  /** 默认选中值 */
  defaultValue?: TreeValue;
  /** 默认展开键 */
  defaultExpandedKeys?: TreeExpandedKeys;
  /** 默认选中键 */
  defaultSelectedKeys?: TreeSelectedKeys;
  /** 尺寸 */
  size?: TreeSize;
  /** 状态 */
  status?: TreeStatus;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否可展开 */
  expandable?: boolean;
  /** 是否可选择 */
  selectable?: boolean;
  /** 是否可多选 */
  multiple?: boolean;
  /** 是否显示复选框 */
  checkable?: TreeCheckableType;
  /** 字段映射 */
  fieldNames?: TreeProps['fieldNames'];
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** 是否展开所有节点 */
  defaultExpandAll?: boolean;
  /** 展开方式 */
  expandAction?: TreeExpandAction;
  /** 选择模式 */
  selectionType?: TreeSelectionType;
}

/** 树工具函数接口 */
export interface TreeUtils {
  /** 展平树数据 */
  flattenTree: (_treeData: TreeDataSource, fieldNames?: TreeProps['fieldNames']) => TreeNode[];
  /** 查找节点 */
  findNode: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => TreeNode | null;
  /** 查找节点路径 */
  findNodePath: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => TreeNode[];
  /** 获取父节点 */
  getParentNode: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => TreeNode | null;
  /** 获取子节点 */
  getChildNodes: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => TreeNode[];
  /** 获取所有子节点（递归） */
  getAllChildNodes: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => TreeNode[];
  /** 过滤节点 */
  filterNodes: (_treeData: TreeDataSource, filterFn: (node: TreeNode) => boolean) => TreeDataSource;
  /** 排序节点 */
  sortNodes: (_treeData: TreeDataSource, sortFn: (a: TreeNode, b: TreeNode) => number) => TreeDataSource;
  /** 验证节点 */
  validateNode: (_node: TreeNode) => boolean;
  /** 计算节点深度 */
  calculateNodeDepth: (_treeData: TreeDataSource, key: string | number, fieldNames?: TreeProps['fieldNames']) => number;
  /** 计算展开状态 */
  calculateExpandState: (_treeData: TreeDataSource, expandedKeys: TreeExpandedKeys, fieldNames?: TreeProps['fieldNames']) => TreeDataSource;
  /** 计算选中状态 */
  calculateSelectState: (_treeData: TreeDataSource, selectedKeys: TreeSelectedKeys, fieldNames?: TreeProps['fieldNames']) => TreeDataSource;
  /** 计算复选框状态 */
  calculateCheckState: (_treeData: TreeDataSource, checkedKeys: TreeCheckedKeys, fieldNames?: TreeProps['fieldNames']) => TreeDataSource;
  /** 生成唯一键 */
  generateUniqueKey: (prefix?: string) => string;
  /** 格式化节点路径 */
  formatNodePath: (_path: TreeNode[], separator?: string) => string;
}

/** 树事件接口 */
export interface TreeEvents {
  /** 值变化事件 */
  onChange?: (_value: TreeValue, selectedNodes: TreeNode[], event: { node: TreeNode; selected: boolean }) => void;
  /** 展开变化事件 */
  onExpand?: (_expandedKeys: TreeExpandedKeys, node: TreeNode, expanded: boolean) => void;
  /** 选中变化事件 */
  onSelect?: (_selectedKeys: TreeSelectedKeys, selectedNodes: TreeNode[], info: { node: TreeNode; selected: boolean }) => void;
  /** 复选框变化事件 */
  onCheck?: (_checkedKeys: TreeCheckedKeys, checkedNodes: TreeNode[], info: { node: TreeNode; checked: boolean; halfChecked: boolean }) => void;
  /** 拖拽事件 */
  onDragStart?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  onDragEnd?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  onDragEnter?: (_info: { node: TreeNode; event: React.DragEvent; expandedKeys: TreeExpandedKeys }) => void;
  onDragLeave?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  onDragOver?: (_info: { node: TreeNode; event: React.DragEvent }) => void;
  onDrop?: (_info: { node: TreeNode; dragNode: TreeNode; dropPosition: number; event: React.DragEvent }) => void;
  /** 右键点击事件 */
  onRightClick?: (_info: { node: TreeNode; event: React.MouseEvent }) => void;
  /** 双击事件 */
  onDoubleClick?: (_info: { node: TreeNode; event: React.MouseEvent }) => void;
  /** 滚动事件 */
  onScroll?: (_event: React.UIEvent<HTMLDivElement>) => void;
}

/** 树样式接口 */
export interface TreeStyles {
  /** 获取基础样式 */
  getBaseStyle: () => CSSProperties;
  /** 获取尺寸样式 */
  getSizeStyle: (_size: TreeSize) => CSSProperties;
  /** 获取状态样式 */
  getStatusStyle: (_status: TreeStatus) => CSSProperties;
  /** 获取节点样式 */
  getNodeStyle: (_level: number, disabled?: boolean, selected?: boolean, expanded?: boolean) => CSSProperties;
  /** 获取节点内容样式 */
  getNodeContentStyle: () => CSSProperties;
  /** 获取节点标题样式 */
  getNodeTitleStyle: (disabled?: boolean, selected?: boolean) => CSSProperties;
  /** 获取切换图标样式 */
  getSwitcherStyle: (expanded?: boolean) => CSSProperties;
  /** 获取图标样式 */
  getIconStyle: () => CSSProperties;
  /** 获取复选框样式 */
  getCheckboxStyle: (checked?: boolean, disabled?: boolean, halfChecked?: boolean) => CSSProperties;
  /** 获取连接线样式 */
  getLineStyle: (_level: number, isLast?: boolean, hasChildren?: boolean) => CSSProperties;
  /** 获取完整样式 */
  getStyle: (_config: {
    size?: TreeSize;
    status?: TreeStatus;
    disabled?: boolean;
    style?: CSSProperties;
  }) => CSSProperties;
  /** 获取完整类名 */
  getClassName: (_config: {
    size?: TreeSize;
    status?: TreeStatus;
    disabled?: boolean;
    className?: string;
  }) => string;
}

/** 树工具类 */
export class TreeTools {
  /** 展平树数据 */
  static flattenTree(
    treeData: TreeDataSource,
    fieldNames: TreeProps['fieldNames'] = {},
    result: TreeNode[] = []
  ): TreeNode[] {
    const {
      // key: keyField = 'key', // Commented out - unused
      children: childrenField = 'children',
    } = fieldNames;

    treeData.forEach(node => {
      result.push(node);
      if (node[childrenField as keyof typeof node]) {
        this.flattenTree(
          node[childrenField as keyof typeof node] as TreeDataSource,
          fieldNames,
          result
        );
      }
    });

    return result;
  }

  /** 查找节点 */
  static findNode(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeNode | null {
    const {
      key: keyField = 'key',
      children: childrenField = 'children',
    } = fieldNames;

    const find = (nodes: TreeDataSource): TreeNode | null => {
      for (const node of nodes) {
        if (node[keyField as keyof typeof node] === key) {
          return node;
        }
        if (node[childrenField as keyof typeof node]) {
          const found = find(node[childrenField as keyof typeof node] as TreeDataSource);
          if (found) return found;
        }
      }
      return null;
    };

    return find(treeData);
  }

  /** 查找节点路径 */
  static findNodePath(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {},
    path: TreeNode[] = []
  ): TreeNode[] {
    const {
      key: keyField = 'key',
      children: childrenField = 'children',
    } = fieldNames;

    const findPath = (nodes: TreeDataSource, currentPath: TreeNode[]): TreeNode[] | null => {
      for (const node of nodes) {
        const newPath = [...currentPath, node];
        
        if (node[keyField as keyof typeof node] === key) {
          return newPath;
        }
        
        if (node[childrenField as keyof typeof node]) {
          const found = findPath(
            node[childrenField as keyof typeof node] as TreeDataSource,
            newPath
          );
          if (found) return found;
        }
      }
      return null;
    };

    return findPath(treeData, path) || [];
  }

  /** 获取父节点 */
  static getParentNode(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeNode | null {
    const path = this.findNodePath(treeData, key, fieldNames);
    return path.length > 1 ? path[path.length - 2] || null : null;
  }

  /** 获取子节点 */
  static getChildNodes(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeNode[] {
    const node = this.findNode(treeData, key, fieldNames);
    const {
      children: childrenField = 'children',
    } = fieldNames;
    
    return node?.[childrenField as keyof typeof node] as TreeNode[] || [];
  }

  /** 获取所有子节点（递归） */
  static getAllChildNodes(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {},
    result: TreeNode[] = []
  ): TreeNode[] {
    const children = this.getChildNodes(treeData, key, fieldNames);
    
    children.forEach(child => {
      result.push(child);
      this.getAllChildNodes(treeData, child.key, fieldNames, result);
    });
    
    return result;
  }

  /** 过滤节点 */
  static filterNodes(
    treeData: TreeDataSource,
    filterFn: (_node: TreeNode) => boolean,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeDataSource {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    return treeData
      .filter(filterFn)
      .map(node => ({
        ...node,
        children: node[childrenField as keyof typeof node] 
          ? this.filterNodes(
              node[childrenField as keyof typeof node] as TreeDataSource,
              filterFn,
              fieldNames
            )
          : undefined,
      }));
  }

  /** 排序节点 */
  static sortNodes(
    treeData: TreeDataSource,
    sortFn: (_a: TreeNode, b: TreeNode) => number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeDataSource {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    return treeData
      .map(node => ({
        ...node,
        children: node[childrenField as keyof typeof node]
          ? this.sortNodes(
              node[childrenField as keyof typeof node] as TreeDataSource,
              sortFn,
              fieldNames
            )
          : undefined,
      }))
      .sort(sortFn);
  }

  /** 验证节点 */
  static validateNode(node: TreeNode): boolean {
    return !!node.key && node.title !== undefined;
  }

  /** 计算节点深度 */
  static calculateNodeDepth(
    treeData: TreeDataSource,
    key: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): number {
    const path = this.findNodePath(treeData, key, fieldNames);
    return path.length;
  }

  /** 计算展开状态 */
  static calculateExpandState(
    treeData: TreeDataSource,
    expandedKeys: TreeExpandedKeys,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeDataSource {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    return treeData.map(node => ({
      ...node,
      expanded: expandedKeys.includes(node.key),
      children: node[childrenField as keyof typeof node]
        ? this.calculateExpandState(
            node[childrenField as keyof typeof node] as TreeDataSource,
            expandedKeys,
            fieldNames
          )
        : undefined,
    }));
  }

  /** 计算选中状态 */
  static calculateSelectState(
    treeData: TreeDataSource,
    selectedKeys: TreeSelectedKeys,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeDataSource {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    return treeData.map(node => ({
      ...node,
      selected: selectedKeys.includes(node.key),
      children: node[childrenField as keyof typeof node]
        ? this.calculateSelectState(
            node[childrenField as keyof typeof node] as TreeDataSource,
            selectedKeys,
            fieldNames
          )
        : undefined,
    }));
  }

  /** 计算复选框状态 */
  static calculateCheckState(
    treeData: TreeDataSource,
    checkedKeys: TreeCheckedKeys,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeDataSource {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    const calculateState = (nodes: TreeDataSource): TreeNode[] => {
      return nodes.map(node => {
        const isChecked = checkedKeys.includes(node.key);
        let halfChecked = false;
        
        if (node[childrenField as keyof typeof node]) {
          const children = calculateState(
            node[childrenField as keyof typeof node] as TreeDataSource
          );
          
          const checkedChildren = children.filter(child =>
            child['checked'] || child['halfChecked']
          ).length;
          
          halfChecked = checkedChildren > 0 && checkedChildren < children.length;
          
          return {
            ...node,
            checked: isChecked || (checkedChildren === children.length),
            halfChecked: halfChecked,
            children: childrenField in node ? children : undefined,
          };
        }
        
        return {
          ...node,
          checked: isChecked,
          halfChecked: false,
        };
      });
    };

    return calculateState(treeData);
  }

  /** 生成唯一键 */
  static generateUniqueKey(prefix: string = 'tree'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /** 格式化节点路径 */
  static formatNodePath(path: TreeNode[], separator: string = ' / '): string {
    return path.map(node => String(node.title)).join(separator);
  }

  /** 检查节点是否是另一个节点的祖先 */
  static isAncestor(
    treeData: TreeDataSource,
    ancestorKey: string | number,
    descendantKey: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): boolean {
    const path = this.findNodePath(treeData, descendantKey, fieldNames);
    return path.some(node => node.key === ancestorKey);
  }

  /** 检查节点是否是另一个节点的后代 */
  static isDescendant(
    treeData: TreeDataSource,
    descendantKey: string | number,
    ancestorKey: string | number,
    fieldNames: TreeProps['fieldNames'] = {}
  ): boolean {
    return this.isAncestor(treeData, ancestorKey, descendantKey, fieldNames);
  }

  /** 获取叶子节点 */
  static getLeafNodes(
    treeData: TreeDataSource,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeNode[] {
    const {
      children: childrenField = 'children',
    } = fieldNames;

    const getLeaves = (nodes: TreeDataSource): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        if (!node[childrenField as keyof typeof node] || node.isLeaf) {
          acc.push(node);
        } else {
          acc.push(...getLeaves(node[childrenField as keyof typeof node] as TreeDataSource));
        }
        return acc;
      }, []);
    };

    return getLeaves(treeData);
  }

  /** 获取根节点 */
  static getRootNodes(
    treeData: TreeDataSource,
    fieldNames: TreeProps['fieldNames'] = {}
  ): TreeNode[] {
    const allNodes = this.flattenTree(treeData, fieldNames);
    const parentKeys = new Set<string | number>();
    
    allNodes.forEach(node => {
      const parent = this.getParentNode(treeData, node.key, fieldNames);
      if (parent) {
        parentKeys.add(parent.key);
      }
    });
    
    return allNodes.filter(node => !parentKeys.has(node.key));
  }
}