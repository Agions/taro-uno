import type { MenuItem } from './Menu.types';

/**
 * 菜单工具函数
 */
export class MenuUtils {
  /**
   * 查找菜单项
   */
  static findItem(items: MenuItem[], key: string): MenuItem | null {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = this.findItem(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  /**
   * 查找父级菜单项
   */
  static findParentItem(items: MenuItem[], key: string): MenuItem | null {
    for (const item of items) {
      if (item.children) {
        if (item.children.some(child => child.key === key)) {
          return item;
        }
        const found = this.findParentItem(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  /**
   * 获取菜单项路径
   */
  static getItemPath(items: MenuItem[], key: string): MenuItem[] {
    const path: MenuItem[] = [];
    
    const findPath = (currentItems: MenuItem[], targetKey: string, currentPath: MenuItem[]): boolean => {
      for (const item of currentItems) {
        const newPath = [...currentPath, item];
        
        if (item.key === targetKey) {
          path.push(...newPath);
          return true;
        }
        
        if (item.children) {
          if (findPath(item.children, targetKey, newPath)) {
            return true;
          }
        }
      }
      return false;
    };
    
    findPath(items, key, []);
    return path;
  }

  /**
   * 展开菜单项的所有父级
   */
  static expandParents(items: MenuItem[], key: string): string[] {
    const path = this.getItemPath(items, key);
    return path.slice(0, -1).map(item => item.key);
  }

  /**
   * 扁平化菜单项
   */
  static flattenItems(items: MenuItem[], parentKey?: string): MenuItem[] {
    const result: MenuItem[] = [];
    
    items.forEach(item => {
      const flatItem = { ...item, parentKey };
      result.push(flatItem);
      
      if (item.children) {
        result.push(...this.flattenItems(item.children, item.key));
      }
    });
    
    return result;
  }

  /**
   * 过滤菜单项
   */
  static filterItems(items: MenuItem[], keyword: string): MenuItem[] {
    return items.filter(item => {
      const label = String(item.label).toLowerCase();
      const search = keyword.toLowerCase();
      
      if (label.includes(search)) {
        return true;
      }
      
      if (item.children) {
        const filteredChildren = this.filterItems(item.children, keyword);
        if (filteredChildren.length > 0) {
          item.children = filteredChildren;
          return true;
        }
      }
      
      return false;
    });
  }

  /**
   * 排序菜单项
   */
  static sortItems(items: MenuItem[], sortBy: string = 'label'): MenuItem[] {
    return [...items].sort((a, b) => {
      const aValue = String((a as any)[sortBy] || a.label).toLowerCase();
      const bValue = String((b as any)[sortBy] || b.label).toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }

  /**
   * 验证菜单项
   */
  static validateItem(item: MenuItem): boolean {
    return !!item.key && !!item.label;
  }

  /**
   * 生成唯一键
   */
  static generateKey(item: MenuItem): string {
    return item.key || `menu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 格式化菜单数据
   */
  static formatMenuData(data: any[]): MenuItem[] {
    return data.map(item => ({
      key: item.key || item.id,
      label: item.label || item.name || item.title,
      icon: item.icon,
      disabled: item.disabled,
      children: item.children ? this.formatMenuData(item.children) : undefined,
      path: item.path,
      href: item.href,
      target: item.target,
      danger: item.danger,
      tooltip: item.tooltip,
      extra: item.extra,
      badge: item.badge,
    }));
  }

  /**
   * 处理菜单项点击 - 适配Taro环境
   */
  static handleItemClick(
    item: MenuItem,
    event: any,
    onClick?: (key: string, item: MenuItem, event: any) => void
  ): void {
    onClick?.(item.key, item, event);
  }

  /**
   * 安全地处理外部链接跳转 - 适配Taro环境
   */
  static handleExternalLink(item: MenuItem): void {
    if (item.href) {
      // 在Taro环境中，使用Taro的导航方法
      // 这里只是示例，实际使用时需要根据项目配置调整
      console.log('Navigate to:', item.href, 'target:', item.target);
    }
  }
}