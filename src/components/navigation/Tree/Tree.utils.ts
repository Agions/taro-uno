/**
 * Tree 工具类
 * 提供树形控件相关的工具函数
 */

import type { TreeNode, TreeData, Key } from './Tree.types';

/**
 * Tree 工具类
 */
export class TreeUtils {
  /**
   * 扁平化树节点
   */
  static flattenTreeNodes(treeData: TreeData): TreeNode[] {
    const result: TreeNode[] = [];

    function traverse(nodes: TreeNode[]) {
      nodes.forEach(node => {
        result.push(node);
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      });
    }

    traverse(treeData);
    return result;
  }

  /**
   * 根据key查找节点
   */
  static getNodeByKey(treeData: TreeData, key: Key): TreeNode | null {
    function traverse(nodes: TreeNode[]): TreeNode | null {
      for (const node of nodes) {
        if (node.key === key) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const found = traverse(node.children);
          if (found) return found;
        }
      }
      return null;
    }

    return traverse(treeData);
  }

  /**
   * 根据keys获取节点数组
   */
  static getNodesByKeys(treeData: TreeData, keys: Key[]): TreeNode[] {
    return keys
      .map(key => this.getNodeByKey(treeData, key))
      .filter((node): node is TreeNode => node !== null);
  }

  /**
   * 获取父节点keys
   */
  static getParentKeys(treeData: TreeData, targetKeys: Key[]): Key[] {
    const parentKeys: Set<Key> = new Set();

    function traverse(nodes: TreeNode[], parentKey?: Key) {
      nodes.forEach(node => {
        if (targetKeys.includes(node.key) && parentKey !== undefined) {
          parentKeys.add(parentKey);
        }
        if (node.children && node.children.length > 0) {
          traverse(node.children, node.key);
        }
      });
    }

    traverse(treeData);
    return Array.from(parentKeys);
  }

  /**
   * 获取选中状态下的keys
   */
  static getCheckedKeys(
    treeData: TreeData,
    key: Key,
    checked: boolean,
    currentCheckedKeys: Key[],
    currentHalfCheckedKeys: Key[]
  ): { checkedKeys: Key[]; halfCheckedKeys: Key[] } {
    const node = this.getNodeByKey(treeData, key);
    if (!node) {
      return { checkedKeys: currentCheckedKeys, halfCheckedKeys: currentHalfCheckedKeys };
    }

    const checkedKeys = new Set(currentCheckedKeys);
    const halfCheckedKeys = new Set(currentHalfCheckedKeys);

    if (checked) {
      // 选中节点及其所有子节点
      const addKeys = (nodes: TreeNode[]) => {
        nodes.forEach(n => {
          checkedKeys.add(n.key);
          halfCheckedKeys.delete(n.key);
          if (n.children && n.children.length > 0) {
            addKeys(n.children);
          }
        });
      };
      addKeys([node]);

      // 更新父节点状态
      this.updateParentKeys(treeData, key, checkedKeys, halfCheckedKeys);
    } else {
      // 取消选中节点及其所有子节点
      const removeKeys = (nodes: TreeNode[]) => {
        nodes.forEach(n => {
          checkedKeys.delete(n.key);
          halfCheckedKeys.delete(n.key);
          if (n.children && n.children.length > 0) {
            removeKeys(n.children);
          }
        });
      };
      removeKeys([node]);

      // 更新父节点状态
      this.updateParentKeys(treeData, key, checkedKeys, halfCheckedKeys);
    }

    return {
      checkedKeys: Array.from(checkedKeys),
      halfCheckedKeys: Array.from(halfCheckedKeys),
    };
  }

  /**
   * 更新父节点的选中状态
   */
  private static updateParentKeys(
    treeData: TreeData,
    childKey: Key,
    checkedKeys: Set<Key>,
    halfCheckedKeys: Set<Key>
  ): void {
    const parentMap = this.buildParentMap(treeData);
    let currentKey = childKey;

    while (parentMap[currentKey]) {
      const parentKey = parentMap[currentKey];
      if (!parentKey) break;
      const parentNode = this.getNodeByKey(treeData, parentKey);
      
      if (!parentNode) break;

      const children = parentNode.children || [];
      const checkedCount = children.filter(child => checkedKeys.has(child.key)).length;
      const halfCheckedCount = children.filter(child => halfCheckedKeys.has(child.key)).length;

      if (checkedCount === children.length) {
        // 所有子节点都选中，父节点也选中
        checkedKeys.add(parentKey);
        halfCheckedKeys.delete(parentKey);
      } else if (checkedCount > 0 || halfCheckedCount > 0) {
        // 部分子节点选中，父节点半选中
        checkedKeys.delete(parentKey);
        halfCheckedKeys.add(parentKey);
      } else {
        // 没有子节点选中，父节点取消选中
        checkedKeys.delete(parentKey);
        halfCheckedKeys.delete(parentKey);
      }

      currentKey = parentKey;
    }
  }

  /**
   * 构建父节点映射
   */
  private static buildParentMap(treeData: TreeData): Record<Key, Key> {
    const parentMap: Record<Key, Key> = {};

    function traverse(nodes: TreeNode[], parentKey?: Key) {
      nodes.forEach(node => {
        if (parentKey !== undefined) {
          parentMap[node.key] = parentKey;
        }
        if (node.children && node.children.length > 0) {
          traverse(node.children, node.key);
        }
      });
    }

    traverse(treeData);
    return parentMap;
  }

  /**
   * 过滤树节点
   */
  static filterTreeNodes(treeData: TreeData, filterFn: (node: TreeNode) => boolean): TreeData {
    function filter(nodes: TreeNode[]): TreeNode[] {
      return nodes
        .map(node => ({ ...node }))
        .filter(node => {
          const keepNode = filterFn(node);
          if (node.children && node.children.length > 0) {
            const filteredChildren = filter(node.children);
            node.children = filteredChildren;
            return keepNode || filteredChildren.length > 0;
          }
          return keepNode;
        });
    }

    return filter(treeData);
  }

  /**
   * 获取展开的路径
   */
  static getExpandPath(treeData: TreeData, targetKey: Key): Key[] {
    const path: Key[] = [];

    function traverse(nodes: TreeNode[], currentPath: Key[]): boolean {
      for (const node of nodes) {
        const newPath = [...currentPath, node.key];
        
        if (node.key === targetKey) {
          path.push(...newPath.slice(0, -1)); // 不包含目标节点本身
          return true;
        }
        
        if (node.children && node.children.length > 0) {
          if (traverse(node.children, newPath)) {
            return true;
          }
        }
      }
      return false;
    }

    traverse(treeData, []);
    return path;
  }

  /**
   * 获取选中节点的路径
   */
  static getSelectedPath(treeData: TreeData, selectedKeys: Key[]): Key[][] {
    return selectedKeys.map(key => this.getExpandPath(treeData, key));
  }

  /**
   * 检查节点是否可见
   */
  static isNodeVisible(treeData: TreeData, nodeKey: Key, expandedKeys: Key[]): boolean {
    const path = this.getExpandPath(treeData, nodeKey);
    return path.every(key => expandedKeys.includes(key));
  }

  /**
   * 获取节点的层级
   */
  static getNodeLevel(treeData: TreeData, targetKey: Key): number {
    function traverse(nodes: TreeNode[], level: number): number {
      for (const node of nodes) {
        if (node.key === targetKey) {
          return level;
        }
        if (node.children && node.children.length > 0) {
          const found = traverse(node.children, level + 1);
          if (found !== -1) return found;
        }
      }
      return -1;
    }

    return traverse(treeData, 0);
  }

  /**
   * 获取节点的兄弟节点
   */
  static getSiblings(treeData: TreeData, nodeKey: Key): TreeNode[] {
    const parentMap = this.buildParentMap(treeData);
    const parentKey = parentMap[nodeKey];
    
    if (!parentKey) {
      // 根节点
      return treeData.filter(node => node.key !== nodeKey);
    }

    const parentNode = this.getNodeByKey(treeData, parentKey);
    return parentNode?.children?.filter(node => node.key !== nodeKey) || [];
  }

  /**
   * 获取节点在兄弟节点中的索引
   */
  static getNodeIndex(treeData: TreeData, nodeKey: Key): number {
    const siblings = this.getSiblings(treeData, nodeKey);
    return siblings.findIndex(node => node.key === nodeKey);
  }

  /**
   * 移动节点
   */
  static moveNode(treeData: TreeData, sourceKey: Key, targetKey: Key, position: 'before' | 'after' | 'inside'): TreeData {
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    
    // 找到源节点
    const sourceNode = this.getNodeByKey(newTreeData, sourceKey);
    if (!sourceNode) return treeData;

    // 从原位置移除源节点
    this.removeNodeByKey(newTreeData, sourceKey);

    // 找到目标位置并插入
    if (position === 'inside') {
      const targetNode = this.getNodeByKey(newTreeData, targetKey);
      if (targetNode) {
        targetNode.children = targetNode.children || [];
        targetNode.children.push(sourceNode);
      }
    } else {
      this.insertNode(newTreeData, sourceNode, targetKey, position);
    }

    return newTreeData;
  }

  /**
   * 根据key移除节点
   */
  private static removeNodeByKey(treeData: TreeData, key: Key): boolean {
    for (let i = 0; i < treeData.length; i++) {
      const node = treeData[i];
      if (node?.key === key) {
        treeData.splice(i, 1);
        return true;
      }
      if (node?.children && node.children.length > 0) {
        if (this.removeNodeByKey(node.children, key)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 插入节点
   */
  private static insertNode(treeData: TreeData, node: TreeNode, targetKey: Key, position: 'before' | 'after'): boolean {
    for (let i = 0; i < treeData.length; i++) {
      const currentNode = treeData[i];
      if (currentNode?.key === targetKey) {
        const index = position === 'before' ? i : i + 1;
        treeData.splice(index, 0, node);
        return true;
      }
      if (currentNode?.children && currentNode.children.length > 0) {
        if (this.insertNode(currentNode.children, node, targetKey, position)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 验证树数据结构
   */
  static validateTreeData(treeData: TreeData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const keySet = new Set<Key>();

    function validate(nodes: TreeNode[], path: string = ''): void {
      nodes.forEach((node, index) => {
        const currentPath = path ? `${path}.${index}` : `root[${index}]`;
        
        // 检查key是否存在
        if (node.key === undefined || node.key === null) {
          errors.push(`Node at ${currentPath} is missing key`);
          return;
        }

        // 检查key是否重复
        if (keySet.has(node.key)) {
          errors.push(`Duplicate key "${node.key}" found at ${currentPath}`);
        }
        keySet.add(node.key);

        // 检查title是否存在
        if (node.title === undefined || node.title === null) {
          errors.push(`Node at ${currentPath} is missing title`);
        }

        // 递归验证子节点
        if (node.children && node.children.length > 0) {
          validate(node.children, `${currentPath}.children`);
        }
      });
    }

    validate(treeData);
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * 获取树的统计信息
   */
  static getTreeStats(treeData: TreeData): {
    totalNodes: number;
    totalLeaves: number;
    maxDepth: number;
    maxChildren: number;
  } {
    let totalNodes = 0;
    let totalLeaves = 0;
    let maxDepth = 0;
    let maxChildren = 0;

    function traverse(nodes: TreeNode[], depth: number): void {
      totalNodes += nodes.length;
      maxChildren = Math.max(maxChildren, nodes.length);

      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          traverse(node.children, depth + 1);
        } else {
          totalLeaves++;
        }
        maxDepth = Math.max(maxDepth, depth);
      });
    }

    traverse(treeData, 1);

    return {
      totalNodes,
      totalLeaves,
      maxDepth,
      maxChildren,
    };
  }
}