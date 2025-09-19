/**
 * Taro-Uno Tree Component
 * 树形控件组件，支持多级数据展示、选择、展开/收起等功能
 */

import * as React from 'react';
import { forwardRef, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { getTreeStyles, getTreeClassNames } from './Tree.styles';
import { TreeUtils } from './Tree.utils';
import type { TreeProps, TreeRef, TreeNode, TreeSelectedKeys, TreeExpandedKeys, TreeCheckedKeys, TreeValue, TreeDataSource, Key } from './Tree.types';

/** Tree树形控件组件 */
export const TreeComponent = forwardRef<TreeRef, TreeProps>((props, ref) => {
  const {
    treeData = [],
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys = [],
    expandedKeys: controlledExpandedKeys,
    defaultExpandedKeys = [],
    checkedKeys: controlledCheckedKeys,
    defaultCheckedKeys = [],
    halfCheckedKeys: controlledHalfCheckedKeys,
    defaultHalfCheckedKeys = [],
    loadedKeys: controlledLoadedKeys,
    defaultLoadedKeys = [],
    size = 'medium',
    theme = 'light',
    mode = 'tree',
    showLine = false,
    showIcon = true,
    blockNode = false,
    checkable = false,
    checkStrictly = false,
    selectable = true,
    multiple = false,
    disabled = false,
    draggable = false,
    virtual = false,
    height = 300,
    itemHeight = 32,
    expandAction = 'click',
    autoExpandParent = true,
    defaultExpandAll = false,
    defaultExpandParent = true,
    filterTreeNode,
    loadData,
    onExpand,
    onCheck,
    onSelect,
    onRightClick,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
    onLoad,
    icon,
    switcherIcon,
    draggableIcon,
    showActionIcon = ['hover'],
    titleRender,
    selectableIcon,
    className,
    style,
    // Accessibility props are passed as restProps to maintain compatibility
    ...restProps
  } = props;

  const treeRef = useRef<any>(null);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<TreeSelectedKeys>(defaultSelectedKeys);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<TreeExpandedKeys>(defaultExpandedKeys);
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<TreeCheckedKeys>(defaultCheckedKeys);
  const [internalHalfCheckedKeys, setInternalHalfCheckedKeys] = useState<TreeCheckedKeys>(defaultHalfCheckedKeys);
  const [internalLoadedKeys, setInternalLoadedKeys] = useState<TreeExpandedKeys>(defaultLoadedKeys);
  const [loadingKeys, setLoadingKeys] = useState<TreeExpandedKeys>([]);

  // 处理受控模式
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;
  const expandedKeys = controlledExpandedKeys !== undefined ? controlledExpandedKeys : internalExpandedKeys;
  const checkedKeys = controlledCheckedKeys !== undefined ? controlledCheckedKeys : internalCheckedKeys;
  const halfCheckedKeys = controlledHalfCheckedKeys !== undefined ? controlledHalfCheckedKeys : internalHalfCheckedKeys;
  const loadedKeys = controlledLoadedKeys !== undefined ? controlledLoadedKeys : internalLoadedKeys;

  // 初始化展开状态
  useEffect(() => {
    if (defaultExpandAll) {
      const allKeys = TreeUtils.flattenTreeNodes(treeData).map(node => String(node.key));
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(allKeys);
      }
    } else if (defaultExpandParent && treeData.length > 0) {
      const parentKeys = TreeUtils.getParentKeys(treeData, defaultExpandedKeys).map(key => String(key));
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys([...defaultExpandedKeys, ...parentKeys]);
      }
    }
  }, [treeData, defaultExpandAll, defaultExpandParent, defaultExpandedKeys, controlledExpandedKeys]);

  // 更新内部状态
  useEffect(() => {
    if (controlledSelectedKeys !== undefined) {
      setInternalSelectedKeys(controlledSelectedKeys);
    }
  }, [controlledSelectedKeys]);

  useEffect(() => {
    if (controlledExpandedKeys !== undefined) {
      setInternalExpandedKeys(controlledExpandedKeys);
    }
  }, [controlledExpandedKeys]);

  useEffect(() => {
    if (controlledCheckedKeys !== undefined) {
      setInternalCheckedKeys(controlledCheckedKeys);
    }
  }, [controlledCheckedKeys]);

  useEffect(() => {
    if (controlledHalfCheckedKeys !== undefined) {
      setInternalHalfCheckedKeys(controlledHalfCheckedKeys);
    }
  }, [controlledHalfCheckedKeys]);

  useEffect(() => {
    if (controlledLoadedKeys !== undefined) {
      setInternalLoadedKeys(controlledLoadedKeys);
    }
  }, [controlledLoadedKeys]);

  // 处理节点展开/收起
  const handleExpand = useCallback(async (key: Key, expanded: boolean, node: TreeNode) => {
    const newExpandedKeys = expanded 
      ? [...expandedKeys, key]
      : expandedKeys.filter((k: Key) => String(k) !== String(key));

    if (controlledExpandedKeys === undefined) {
      setInternalExpandedKeys(newExpandedKeys);
    }
    onExpand?.(newExpandedKeys, node, expanded);

    // 异步加载数据
    if (expanded && loadData && !loadedKeys.includes(key) && !loadingKeys.includes(key)) {
      try {
        setLoadingKeys(prev => [...prev, key]);
        await loadData(node);
        setInternalLoadedKeys(prev => [...prev, key]);
        onLoad?.([key]);
      } catch (error) {
        console.error('Failed to load tree data:', error);
      } finally {
        setLoadingKeys(prev => prev.filter((k) => String(k) !== String(key)));
      }
    }
  }, [expandedKeys, controlledExpandedKeys, loadData, loadedKeys, loadingKeys, onExpand, onLoad]);

  // 处理节点选择
  const handleSelect = useCallback((key: Key, selected: boolean, node: TreeNode, event: ITouchEvent) => {
    if (disabled || !selectable) return;

    let newSelectedKeys: TreeSelectedKeys;
    if (multiple) {
      newSelectedKeys = selected
        ? selectedKeys.filter((k: Key) => String(k) !== String(key))
        : [...selectedKeys, key];
    } else {
      newSelectedKeys = selected ? [] : [key];
    }

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    onSelect?.(newSelectedKeys, node, selected, event);
  }, [selectedKeys, controlledSelectedKeys, multiple, disabled, selectable, onSelect]);

  // 处理节点勾选
  const handleCheck = useCallback((key: string, checked: boolean, node: TreeNode) => {
    if (disabled || !checkable) return;

    let newCheckedKeys: TreeCheckedKeys;
    let newHalfCheckedKeys: TreeCheckedKeys;

    if (checkStrictly) {
      newCheckedKeys = checked
        ? [...checkedKeys, key]
        : checkedKeys.filter((k: Key) => String(k) !== String(key));
      newHalfCheckedKeys = halfCheckedKeys;
    } else {
      const result = TreeUtils.getCheckedKeys(treeData, key, checked, checkedKeys, halfCheckedKeys);
      newCheckedKeys = result.checkedKeys;
      newHalfCheckedKeys = result.halfCheckedKeys;
    }

    if (controlledCheckedKeys === undefined) {
      setInternalCheckedKeys(newCheckedKeys);
    }
    if (controlledHalfCheckedKeys === undefined) {
      setInternalHalfCheckedKeys(newHalfCheckedKeys);
    }
    onCheck?.(newCheckedKeys, node, checked, TreeUtils.getNodesByKeys(treeData, newCheckedKeys), newHalfCheckedKeys);
  }, [treeData, checkedKeys, halfCheckedKeys, checkStrictly, disabled, checkable, controlledCheckedKeys, controlledHalfCheckedKeys, onCheck]);

  // 处理右键点击
  const handleRightClick = useCallback((event: ITouchEvent, node: TreeNode) => {
    onRightClick?.({ event, node });
  }, [onRightClick]);

  // 过滤树节点
  const filteredTreeData = useMemo(() => {
    if (!filterTreeNode) return treeData;
    return TreeUtils.filterTreeNodes(treeData, filterTreeNode);
  }, [treeData, filterTreeNode]);

  // 获取样式配置
  const styles = getTreeStyles({ size, theme, mode, showLine, blockNode, disabled });
  const classNames = getTreeClassNames({ size, theme, mode, showLine, blockNode, disabled });

  // 渲染展开图标
  const renderExpandIcon = useCallback((node: TreeNode) => {
    const isLeaf = !node.children || node.children.length === 0;
    const isExpanded = expandedKeys.includes(String(node.key));
    const isLoading = loadingKeys.includes(String(node.key));

    if (isLeaf) {
      return switcherIcon ? (
        React.createElement(switcherIcon as any, { 
          className: classNames.expandIconLeaf,
          ...node['switcherIconProps'] 
        })
      ) : (
        <View className={classNames.expandIconLeaf} />
      );
    }

    if (isLoading) {
      return (
        <View className={classNames.expandIconLoading}>
          <Text>🔄</Text>
        </View>
      );
    }

    return switcherIcon ? (
      React.createElement(switcherIcon as any, { 
        className: `${classNames.expandIcon} ${isExpanded ? '' : 'tree-expand-icon-close'}`,
        style: { transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' },
        ...node['switcherIconProps'] 
      })
    ) : (
      <View className={`${classNames.expandIcon} ${isExpanded ? '' : 'tree-expand-icon-close'}`}>
        <Text>{isExpanded ? '▼' : '▶'}</Text>
      </View>
    );
  }, [expandedKeys, loadingKeys, switcherIcon, classNames]);

  // 渲染复选框
  const renderCheckbox = useCallback((node: TreeNode) => {
    const isChecked = checkedKeys.includes(String(node.key));
    const isIndeterminate = halfCheckedKeys.includes(String(node.key));

    return (
      <View 
        className={`${classNames.checkbox} ${isChecked ? classNames.checkboxChecked : ''} ${isIndeterminate ? classNames.checkboxIndeterminate : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleCheck(String(node.key), !isChecked, node);
        }}
      >
        <View className={(classNames as any).checkboxInner}>
          {isChecked ? '✓' : isIndeterminate ? '−' : ''}
        </View>
      </View>
    );
  }, [checkedKeys, halfCheckedKeys, handleCheck, classNames]);

  // 渲染图标
  const renderIcon = useCallback((node: TreeNode) => {
    const isExpanded = expandedKeys.includes(String(node.key));
    const isSelected = selectedKeys.includes(String(node.key));

    if (icon) {
      return React.createElement(icon as any, { 
        className: `${classNames.icon} ${isSelected ? classNames.iconOpen : isExpanded ? classNames.iconOpen : classNames.iconClose}`,
        ...node['iconProps'] 
      });
    }

    if (node.icon) {
      return React.createElement(node.icon as any, { 
        className: `${classNames.icon} ${isSelected ? classNames.iconOpen : isExpanded ? classNames.iconOpen : classNames.iconClose}`,
        ...node['iconProps'] 
      });
    }

    return (
      <View className={`${classNames.icon} ${isSelected ? classNames.iconOpen : isExpanded ? classNames.iconOpen : classNames.iconClose}`}>
        <Text>{node.children && node.children.length > 0 ? (isExpanded ? '📂' : '📁') : '📄'}</Text>
      </View>
    );
  }, [expandedKeys, selectedKeys, icon, classNames]);

  // 渲染节点标题
  const renderTitle = useCallback((node: TreeNode) => {
    if (titleRender) {
      return titleRender(node);
    }

    return (
      <Text className={classNames.treeNodeTitle}>
        {node.title}
      </Text>
    );
  }, [titleRender, classNames]);

  // 渲染树节点
  const renderTreeNode = useCallback((node: TreeNode, level: number = 0) => {
    const isExpanded = expandedKeys.includes(String(node.key));
    const isSelected = selectedKeys.includes(String(node.key));
    const isLoading = loadingKeys.includes(String(node.key));
    const isLeaf = !node.children || node.children.length === 0;

    return (
      <View key={node.key} className={classNames.treeNode}>
        {/* 连接线 */}
        {showLine && level > 0 && (
          <View className={classNames.line} style={styles.getNodeIndent(level)} />
        )}

        {/* 节点内容 */}
        <View
          className={`${classNames.treeNodeContent} ${isSelected ? 'tree-node-selected' : ''} ${disabled || node.disabled ? 'tree-node-disabled' : ''}`}
          style={{
            ...styles.getNodeIndent(level),
          }}
          onClick={(e) => {
            if (disabled || node.disabled) return;
            
            if (expandAction === 'click' && !isLeaf) {
              handleExpand(node.key, !isExpanded, node);
            }
            handleSelect(node.key, !isSelected, node, e);
          }}
          onLongPress={(e) => {
            if (disabled || node.disabled) return;
            handleRightClick(e as ITouchEvent, node);
          }}
        >
          {/* 展开图标 */}
          <View className={classNames.treeNodeSwitcher} onClick={(e) => {
            e.stopPropagation();
            if (disabled || node.disabled || isLeaf) return;
            handleExpand(node.key, !isExpanded, node);
          }}>
            {renderExpandIcon(node)}
          </View>

          {/* 复选框 */}
          {checkable && (
            <View className={classNames.treeNodeCheckbox}>
              {renderCheckbox(node)}
            </View>
          )}

          {/* 图标 */}
          {showIcon && (
            <View className={classNames.treeNodeIcon}>
              {renderIcon(node)}
            </View>
          )}

          {/* 标题 */}
          <View className={classNames.treeNodeTitle}>
            {renderTitle(node)}
          </View>

          {/* 加载状态 */}
          {isLoading && (
            <View className={classNames.loading}>
              <Text>加载中...</Text>
            </View>
          )}
        </View>

        {/* 子节点 */}
        {isExpanded && node.children && node.children.length > 0 && (
          <View className="tree-children">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </View>
        )}
      </View>
    );
  }, [expandedKeys, selectedKeys, checkedKeys, halfCheckedKeys, loadingKeys, showLine, checkable, showIcon, disabled, handleExpand, handleSelect, handleRightClick, renderExpandIcon, renderCheckbox, renderIcon, renderTitle, classNames, styles]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(ref, () => ({
    element: treeRef.current,
    // TreeRef interface methods
    getValue: () => selectedKeys.length > 0 ? selectedKeys[0] : null,
    setValue: (value: TreeValue) => {
      const keysArray = Array.isArray(value) ? value : (value === null ? [] : [value]);
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(keysArray);
      }
      onSelect?.(keysArray, keysArray[0] ? TreeUtils.getNodeByKey(treeData, keysArray[0]) : null, true, {} as ITouchEvent);
    },
    getTreeData: () => treeData,
    setTreeData: (_data: TreeDataSource) => {
      // Tree data is controlled via props, this would need to be handled by parent
      console.warn('setTreeData: Tree data is controlled via props');
    },
    getSelectedKeys: () => selectedKeys,
    setSelectedKeys: (keys: TreeSelectedKeys) => {
      const keysArray = Array.isArray(keys) ? keys : (keys === null ? [] : [keys]);
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(keysArray);
      }
      onSelect?.(keysArray, keysArray[0] ? TreeUtils.getNodeByKey(treeData, keysArray[0]) : null, true, {} as ITouchEvent);
    },
    getExpandedKeys: () => expandedKeys,
    setExpandedKeys: (keys: TreeExpandedKeys) => {
      const keysArray = Array.isArray(keys) ? keys : (keys === null ? [] : [keys]);
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(keysArray);
      }
      onExpand?.(keysArray, keysArray[0] ? TreeUtils.getNodeByKey(treeData, keysArray[0]) : null, true);
    },
    getCheckedKeys: () => checkedKeys,
    setCheckedKeys: (keys: TreeCheckedKeys) => {
      const keysArray = Array.isArray(keys) ? keys : (keys === null ? [] : [keys]);
      if (controlledCheckedKeys === undefined) {
        setInternalCheckedKeys(keysArray);
      }
      onCheck?.(keysArray, keysArray[0] ? TreeUtils.getNodeByKey(treeData, keysArray[0]) : null, true, TreeUtils.getNodesByKeys(treeData, keysArray), halfCheckedKeys);
    },
    getHalfCheckedKeys: () => halfCheckedKeys,
    getSelectedNodes: () => TreeUtils.getNodesByKeys(treeData, selectedKeys),
    getCheckedNodes: () => TreeUtils.getNodesByKeys(treeData, checkedKeys),
    getExpandedNodes: () => TreeUtils.getNodesByKeys(treeData, expandedKeys),
    findNode: (key: string | number) => TreeUtils.getNodeByKey(treeData, key),
    findNodePath: (key: string | number) => {
      const node = TreeUtils.getNodeByKey(treeData, key);
      return node ? [node] : [];
    },
    expandNode: (key: string | number, expanded: boolean = true) => {
      const newExpandedKeys = expanded
        ? [...expandedKeys, key]
        : expandedKeys.filter((k: Key) => String(k) !== String(key));
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(newExpandedKeys);
      }
      onExpand?.(newExpandedKeys, TreeUtils.getNodeByKey(treeData, key), expanded);
    },
    selectNode: (key: string | number, selected: boolean = true) => {
      const newSelectedKeys = selected
        ? [...selectedKeys, key]
        : selectedKeys.filter((k: Key) => String(k) !== String(key));
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(newSelectedKeys);
      }
      onSelect?.(newSelectedKeys, TreeUtils.getNodeByKey(treeData, key), selected, {} as ITouchEvent);
    },
    checkNode: (key: string | number, checked: boolean = true) => {
      const node = TreeUtils.getNodeByKey(treeData, key);
      if (node) {
        handleCheck(String(key), checked, node);
      }
    },
    expandAll: () => {
      const allKeys = TreeUtils.flattenTreeNodes(treeData)
        .filter(node => node.children && node.children.length > 0)
        .map(node => node.key);
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(allKeys);
      }
      onExpand?.(allKeys, allKeys[0] ? TreeUtils.getNodeByKey(treeData, allKeys[0]) : null, true);
    },
    collapseAll: () => {
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys([]);
      }
      onExpand?.([], TreeUtils.getNodeByKey(treeData, ''), false);
    },
    selectAll: () => {
      const allKeys = TreeUtils.flattenTreeNodes(treeData).map(node => node.key);
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(allKeys);
      }
      onSelect?.(allKeys, TreeUtils.getNodesByKeys(treeData, allKeys)[0], true, {} as ITouchEvent);
    },
    clearSelect: () => {
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys([]);
      }
      onSelect?.([], TreeUtils.getNodeByKey(treeData, ''), false, {} as ITouchEvent);
    },
    checkAll: () => {
      const allKeys = TreeUtils.flattenTreeNodes(treeData).map(node => node.key);
      if (controlledCheckedKeys === undefined) {
        setInternalCheckedKeys(allKeys);
      }
      if (controlledHalfCheckedKeys === undefined) {
        setInternalHalfCheckedKeys([]);
      }
      onCheck?.(allKeys, TreeUtils.getNodesByKeys(treeData, allKeys)[0], true, TreeUtils.getNodesByKeys(treeData, allKeys), []);
    },
    clearCheck: () => {
      if (controlledCheckedKeys === undefined) {
        setInternalCheckedKeys([]);
      }
      if (controlledHalfCheckedKeys === undefined) {
        setInternalHalfCheckedKeys([]);
      }
      onCheck?.([], TreeUtils.getNodeByKey(treeData, ''), false, [], []);
    },
    filterNodes: (filterFn: (node: TreeNode) => boolean) => TreeUtils.filterTreeNodes(treeData, filterFn),
    addNode: (_parentNodeKey: string | number, _newNode: TreeNode) => {
      console.warn('addNode: Tree data is controlled via props');
    },
    updateNode: (_key: string | number, _updates: Partial<TreeNode>) => {
      console.warn('updateNode: Tree data is controlled via props');
    },
    removeNode: (_key: string | number) => {
      console.warn('removeNode: Tree data is controlled via props');
    },
    moveNode: (_key: string | number, _targetKey: string | number, _position: 'before' | 'after' | 'inside') => {
      console.warn('moveNode: Tree data is controlled via props');
    },
    disableNode: (_key: string | number, _disabled: boolean = true) => {
      console.warn('disableNode: Tree data is controlled via props');
    },
    enableNode: (_key: string | number) => {
      console.warn('enableNode: Tree data is controlled via props');
    },
    scrollToNode: (key: string | number) => {
      console.log('Scroll to node:', key);
    },
    refreshNode: (key: string | number) => {
      console.log('Refresh node:', key);
    },
    reset: () => {
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(defaultSelectedKeys);
      }
      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(defaultExpandedKeys);
      }
      if (controlledCheckedKeys === undefined) {
        setInternalCheckedKeys(defaultCheckedKeys);
      }
      if (controlledHalfCheckedKeys === undefined) {
        setInternalHalfCheckedKeys(defaultHalfCheckedKeys);
      }
    },
    scrollTo: ({ key }: { key: string }) => {
      // 在Taro环境中，滚动功能可能有限制
      console.log('Scroll to:', key);
    },
    getNodeByKey: (key: string) => TreeUtils.getNodeByKey(treeData, key),
    getNodesByKeys: (keys: string[]) => TreeUtils.getNodesByKeys(treeData, keys),
  }), [
    treeData,
    selectedKeys,
    expandedKeys,
    checkedKeys,
    halfCheckedKeys,
    controlledSelectedKeys,
    controlledExpandedKeys,
    controlledCheckedKeys,
    controlledHalfCheckedKeys,
    onSelect,
    onExpand,
    onCheck,
    handleCheck,
    defaultSelectedKeys,
    defaultExpandedKeys,
    defaultCheckedKeys,
    defaultHalfCheckedKeys,
  ]);

  // 无障碍状态通过 restProps 传递

  return (
    <View
      ref={treeRef}
      className={`${classNames.tree} ${className || ''}`}
      style={{ ...styles.tree, ...style }}
      {...restProps}
    >
      {filteredTreeData.map((node: TreeNode) => renderTreeNode(node))}
    </View>
  );
});

/** Tree组件显示名称 */
TreeComponent.displayName = 'Tree';

/** 导出Tree组件 */
export const Tree = TreeComponent;