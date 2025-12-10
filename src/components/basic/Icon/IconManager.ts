/**
 * Icon Manager
 * Unified management of icon sets and utility functions for the Icon component
 */

import type { IconSet, IconSource, IconType, IconTheme } from './Icon.types';
import {
  basicOutlinedIcons,
  basicFilledIcons,
  navigationOutlinedIcons,
  actionOutlinedIcons,
  statusColoredIcons,
  socialColoredIcons,
} from './Icon.data';

/**
 * Icon Manager class
 * Provides methods for managing and accessing icon sets
 */
export class IconManager {
  private allIcons: IconSet[] = [];
  private iconMap: Map<string, IconSet> = new Map();
  private iconLibrary: Map<string, Map<string, IconSet>> = new Map();

  constructor() {
    // Register all icon sets
    this.registerIcons(basicOutlinedIcons, 'basic', 'outlined');
    this.registerIcons(basicFilledIcons, 'basic', 'filled');
    this.registerIcons(navigationOutlinedIcons, 'navigation', 'outlined');
    this.registerIcons(actionOutlinedIcons, 'action', 'outlined');
    this.registerIcons(statusColoredIcons, 'status', 'colored');
    this.registerIcons(socialColoredIcons, 'social', 'colored');
  }

  /**
   * Register icon set with category and theme
   */
  registerIcons(icons: IconSet[], category: string, theme: IconTheme) {
    icons.forEach((icon) => {
      // Add category and theme if not already present
      const iconWithMeta = {
        ...icon,
        category: icon.category || category,
        theme: icon.theme || theme,
      };

      // Store in all icons array
      this.allIcons.push(iconWithMeta);

      // Create unique key for icon map
      const key = `${iconWithMeta.name}:${iconWithMeta.theme}:${iconWithMeta.category}`;
      this.iconMap.set(key, iconWithMeta);

      // Store in category map
      if (!this.iconLibrary.has(category)) {
        this.iconLibrary.set(category, new Map());
      }
      const categoryMap = this.iconLibrary.get(category)!;
      categoryMap.set(iconWithMeta.name, iconWithMeta);
    });
  }

  /**
   * Get icon by name, theme, and category
   */
  getIcon(name: string, theme: IconTheme = 'outlined', category: string = 'basic'): IconSet | undefined {
    const key = `${name}:${theme}:${category}`;
    return this.iconMap.get(key);
  }

  /**
   * Get all icons
   */
  getAllIcons(): IconSet[] {
    return this.allIcons;
  }

  /**
   * Get icons by category
   */
  getIconsByCategory(category: string): IconSet[] {
    const categoryMap = this.iconLibrary.get(category);
    if (!categoryMap) return [];
    return Array.from(categoryMap.values());
  }

  /**
   * Get icons by theme
   */
  getIconsByTheme(theme: IconTheme): IconSet[] {
    return this.allIcons.filter((icon) => icon.theme === theme);
  }

  /**
   * Get icons by type
   */
  getIconsByType(type: IconType): IconSet[] {
    return this.allIcons.filter((icon) => icon.type === type);
  }

  /**
   * Search icons by name or tags
   */
  searchIcons(query: string): IconSet[] {
    const lowerQuery = query.toLowerCase();
    return this.allIcons.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        icon.category?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  /**
   * Get icon source by name
   */
  getIconSource(name: string, theme: IconTheme = 'outlined', category: string = 'basic'): IconSource | undefined {
    const icon = this.getIcon(name, theme, category);
    return icon?.data;
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.iconLibrary.keys());
  }

  /**
   * Get all themes
   */
  getThemes(): IconTheme[] {
    const themes = new Set<IconTheme>();
    this.allIcons.forEach((icon) => {
      if (icon.theme) {
        themes.add(icon.theme);
      }
    });
    return Array.from(themes);
  }

  /**
   * Check if icon exists
   */
  hasIcon(name: string, theme: IconTheme = 'outlined', category: string = 'basic'): boolean {
    return this.getIcon(name, theme, category) !== undefined;
  }

  /**
   * Get icon by name with automatic theme and category detection
   */
  findIcon(name: string): IconSet | undefined {
    // Try to find icon in any theme and category
    for (const [_, icon] of this.iconMap.entries()) {
      if (icon.name === name) {
        return icon;
      }
    }
    return undefined;
  }

  /**
   * Get icon statistics
   */
  getStats() {
    return {
      totalIcons: this.allIcons.length,
      categories: this.getCategories().length,
      themes: this.getThemes().length,
      byCategory: Object.fromEntries(
        this.getCategories().map((category) => [category, this.getIconsByCategory(category).length]),
      ),
      byTheme: Object.fromEntries(this.getThemes().map((theme) => [theme, this.getIconsByTheme(theme).length])),
    };
  }
}

/**
 * Create and export default IconManager instance
 */
export const iconManager = new IconManager();

/**
 * Icon utility functions
 */
export const IconUtils = {
  /**
   * Get icon source by name
   */
  getIcon(name: string, theme: IconTheme = 'outlined', category: string = 'basic'): IconSource | undefined {
    return iconManager.getIconSource(name, theme, category);
  },

  /**
   * Check if icon exists
   */
  hasIcon(name: string, theme: IconTheme = 'outlined', category: string = 'basic'): boolean {
    return iconManager.hasIcon(name, theme, category);
  },

  /**
   * Get all icons
   */
  getAllIcons(): IconSet[] {
    return iconManager.getAllIcons();
  },

  /**
   * Search icons
   */
  searchIcons(query: string): IconSet[] {
    return iconManager.searchIcons(query);
  },

  /**
   * Get icon by name with automatic detection
   */
  findIcon(name: string): IconSet | undefined {
    return iconManager.findIcon(name);
  },

  /**
   * Get icon statistics
   */
  getStats() {
    return iconManager.getStats();
  },
};
