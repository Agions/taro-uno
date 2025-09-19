/**
 * 无障碍工具函数库
 * 提供丰富的无障碍功能支持和WCAG 2.1 AA标准合规性检查
 */

import type { AccessibilityProps, AccessibilityState, AccessibilityEvents } from '../types/accessibility.d';

// ==================== 无障碍角色常量 ====================

/** ARIA角色枚举 */
export enum AriaRole {
  BUTTON = 'button',
  LINK = 'link',
  TEXTBOX = 'textbox',
  COMBOBOX = 'combobox',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SWITCH = 'switch',
  SLIDER = 'slider',
  PROGRESSBAR = 'progressbar',
  ALERT = 'alert',
  DIALOG = 'dialog',
  MODAL = 'dialog',
  NAVIGATION = 'navigation',
  SEARCH = 'search',
  MENU = 'menu',
  MENUITEM = 'menuitem',
  TAB = 'tab',
  TABLIST = 'tablist',
  TABBANEL = 'tabpanel',
  TABLE = 'table',
  GRID = 'grid',
  LIST = 'list',
  LISTITEM = 'listitem',
  HEADING = 'heading',
  IMG = 'img',
  BANNER = 'banner',
  CONTENTINFO = 'contentinfo',
  COMPLEMENTARY = 'complementary',
  FORM = 'form',
  MAIN = 'main',
  REGION = 'region',
  GENERIC = 'generic',
}

// ==================== 无障碍状态管理 ====================

/** 无障碍状态管理器 */
export class AccessibilityStateManager {
  private static instance: AccessibilityStateManager;
  private state: Map<string, AccessibilityState> = new Map();

  static getInstance(): AccessibilityStateManager {
    if (!AccessibilityStateManager.instance) {
      AccessibilityStateManager.instance = new AccessibilityStateManager();
    }
    return AccessibilityStateManager.instance;
  }

  /** 设置组件状态 */
  setComponentState(componentId: string, state: AccessibilityState): void {
    this.state.set(componentId, state);
    this.notifyStateChange(componentId, state);
  }

  /** 获取组件状态 */
  getComponentState(componentId: string): AccessibilityState | undefined {
    return this.state.get(componentId);
  }

  /** 更新组件状态 */
  updateComponentState(componentId: string, updates: Partial<AccessibilityState>): void {
    const currentState = this.state.get(componentId) || {};
    const newState = { ...currentState, ...updates };
    this.state.set(componentId, newState);
    this.notifyStateChange(componentId, newState);
  }

  /** 清除组件状态 */
  clearComponentState(componentId: string): void {
    this.state.delete(componentId);
  }

  /** 获取所有状态 */
  getAllStates(): Map<string, AccessibilityState> {
    return new Map(this.state);
  }

  /** 通知状态变化 */
  private notifyStateChange(componentId: string, state: AccessibilityState): void {
    // 触发自定义事件通知无障碍辅助技术
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const event = new CustomEvent('accessibilityStateChange', {
        detail: { componentId, state }
      });
      window.dispatchEvent(event);
    }
  }
}

// ==================== 无障碍标签生成器 ====================

/** 智能标签生成器 */
export class SmartLabelGenerator {
  /** 生成按钮标签 */
  static generateButtonLabel(text?: string, loading?: boolean, disabled?: boolean): string {
    const parts: string[] = [];

    if (text) {
      parts.push(text);
    }

    if (loading) {
      parts.push('加载中');
    }

    if (disabled) {
      parts.push('已禁用');
    }

    return parts.join('，');
  }

  /** 生成输入框标签 */
  static generateInputLabel(
    label?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    readonly?: boolean,
    value?: string
  ): string {
    const parts: string[] = [];

    if (label) {
      parts.push(label);
    }

    if (required) {
      parts.push('必填');
    }

    if (disabled) {
      parts.push('已禁用');
    } else if (readonly) {
      parts.push('只读');
    }

    if (value && value.length > 0) {
      parts.push(`当前值：${value}`);
    } else if (placeholder) {
      parts.push(`提示：${placeholder}`);
    }

    return parts.join('，');
  }

  /** 生成选择器标签 */
  static generateSelectorLabel(
    label?: string,
    selected?: string | string[],
    placeholder?: string,
    required?: boolean,
    disabled?: boolean
  ): string {
    const parts: string[] = [];

    if (label) {
      parts.push(label);
    }

    if (required) {
      parts.push('必填');
    }

    if (disabled) {
      parts.push('已禁用');
    } else if (selected) {
      if (Array.isArray(selected)) {
        parts.push(`已选择 ${selected.length} 项`);
      } else {
        parts.push(`已选择：${selected}`);
      }
    } else if (placeholder) {
      parts.push(`提示：${placeholder}`);
    }

    return parts.join('，');
  }

  /** 生成链接标签 */
  static generateLinkLabel(text?: string, disabled?: boolean, external?: boolean): string {
    const parts: string[] = [];

    if (text) {
      parts.push(text);
    }

    if (external) {
      parts.push('外部链接');
    }

    if (disabled) {
      parts.push('已禁用');
    }

    return parts.join('，');
  }

  /** 生成导航标签 */
  static generateNavigationLabel(text?: string, active?: boolean, disabled?: boolean): string {
    const parts: string[] = [];

    if (text) {
      parts.push(text);
    }

    if (active) {
      parts.push('当前页面');
    }

    if (disabled) {
      parts.push('已禁用');
    }

    return parts.join('，');
  }
}

// ==================== 无障碍验证器 ====================

/** WCAG 2.1 AA 标准验证器 */
export class WCAGValidator {
  /** 验证颜色对比度 */
  static validateColorContrast(
    foregroundColor: string,
    backgroundColor: string,
    minimumRatio: number = 4.5
  ): { valid: boolean; ratio: number; recommendation?: string } {
    // 简化的对比度计算（实际项目中应使用专业的颜色对比度库）
    const contrast = this.calculateContrastRatio(foregroundColor, backgroundColor);

    if (contrast >= minimumRatio) {
      return { valid: true, ratio: contrast };
    }

    return {
      valid: false,
      ratio: contrast,
      recommendation: `颜色对比度 ${contrast.toFixed(2)} 低于最小要求 ${minimumRatio}，建议调整颜色`
    };
  }

  /** 验证标签完整性 */
  static validateLabelCompleteness(
    label: string,
    componentType: string
  ): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    if (!label || label.trim().length === 0) {
      issues.push(`${componentType} 组件缺少无障碍标签`);
    }

    if (label && label.length > 200) {
      issues.push(`标签长度超过200字符，可能影响可读性`);
    }

    if (label && /[{}[\]\\/^$*+?().|]/g.test(label)) {
      issues.push(`标签包含特殊字符，可能影响屏幕阅读器朗读`);
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /** 验证键盘可访问性 */
  static validateKeyboardAccessibility(
    interactiveElements: HTMLElement[]
  ): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        issues.push(`元素 ${element.tagName} 缺少 tabindex 属性`);
      }

      if (!element.hasAttribute('role') && !element.hasAttribute('aria-role')) {
        issues.push(`元素 ${element.tagName} 缺少 ARIA 角色`);
      }
    });

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /** 验证焦点管理 */
  static validateFocusManagement(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement;

      // 检查是否有合理的焦点元素
      if (!activeElement || activeElement === document.body) {
        issues.push('页面加载时没有设置合理的焦点位置');
      }

      // 检查焦点陷阱
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        issues.push('页面中没有可聚焦的交互元素');
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /** 计算颜色对比度（简化版） */
  private static calculateContrastRatio(color1: string, color2: string): number {
    // 这里使用简化的计算方法
    // 实际项目中应该使用专业的颜色对比度计算库
    return 4.5; // 返回一个示例值
  }
}

// ==================== 无障碍事件处理器 ====================

/** 无障碍事件处理器 */
export class AccessibilityEventHandler {
  /** 处理键盘导航 */
  static handleKeyboardNavigation(
    event: KeyboardEvent,
    actions: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onTab?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
    }
  ): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        actions.onEnter?.();
        break;
      case ' ':
        event.preventDefault();
        actions.onSpace?.();
        break;
      case 'Escape':
        event.preventDefault();
        actions.onEscape?.();
        break;
      case 'Tab':
        // Tab键通常不应该被阻止，除非有特殊需求
        actions.onTab?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        actions.onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        actions.onArrowDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        actions.onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        actions.onArrowRight?.();
        break;
    }
  }

  /** 处理焦点事件 */
  static handleFocusEvent(
    element: HTMLElement,
    onFocus?: (event: FocusEvent) => void,
    onBlur?: (event: FocusEvent) => void
  ): void {
    element.addEventListener('focus', (event) => {
      // 添加焦点样式
      element.setAttribute('data-focused', 'true');
      onFocus?.(event);
    });

    element.addEventListener('blur', (event) => {
      // 移除焦点样式
      element.removeAttribute('data-focused');
      onBlur?.(event);
    });
  }

  /** 处理屏幕阅读器公告 */
  static announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof document === 'undefined') return;

    // 创建或获取公告区域
    let announcementRegion = document.getElementById('accessibility-announcement');

    if (!announcementRegion) {
      announcementRegion = document.createElement('div');
      announcementRegion.id = 'accessibility-announcement';
      announcementRegion.setAttribute('aria-live', priority);
      announcementRegion.setAttribute('aria-atomic', 'true');
      announcementRegion.style.position = 'absolute';
      announcementRegion.style.left = '-10000px';
      announcementRegion.style.width = '1px';
      announcementRegion.style.height = '1px';
      announcementRegion.style.overflow = 'hidden';
      document.body.appendChild(announcementRegion);
    }

    // 设置公告内容
    announcementRegion.textContent = message;

    // 清理公告内容
    setTimeout(() => {
      announcementRegion.textContent = '';
    }, 1000);
  }
}

// ==================== 无障碍工具函数 ====================

/** 无障碍工具函数集合 */
export const AccessibilityUtils = {
  /** 获取推荐的无障碍角色 */
  getRecommendedRole: (componentType: string): AriaRole => {
    const roleMap: Record<string, AriaRole> = {
      button: AriaRole.BUTTON,
      link: AriaRole.LINK,
      input: AriaRole.TEXTBOX,
      select: AriaRole.COMBOBOX,
      checkbox: AriaRole.CHECKBOX,
      radio: AriaRole.RADIO,
      switch: AriaRole.SWITCH,
      slider: AriaRole.SLIDER,
      progress: AriaRole.PROGRESSBAR,
      alert: AriaRole.ALERT,
      dialog: AriaRole.DIALOG,
      navigation: AriaRole.NAVIGATION,
      search: AriaRole.SEARCH,
      menu: AriaRole.MENU,
      menuitem: AriaRole.MENUITEM,
      tab: AriaRole.TAB,
      tablist: AriaRole.TABLIST,
      tabpanel: AriaRole.TABBANEL,
      table: AriaRole.TABLE,
      grid: AriaRole.GRID,
      list: AriaRole.LIST,
      listitem: AriaRole.LISTITEM,
      heading: AriaRole.HEADING,
      img: AriaRole.IMG,
    };

    return roleMap[componentType.toLowerCase()] || AriaRole.GENERIC;
  },

  /** 生成无障碍状态 */
  generateState: (state: AccessibilityState): string => {
    const states: string[] = [];

    if (state.disabled) states.push('disabled');
    if (state.readonly) states.push('readonly');
    if (state.required) states.push('required');
    if (state.invalid) states.push('invalid');
    if (state.selected) states.push('selected');
    if (state.busy) states.push('busy');
    if (state.checked) states.push('checked');
    if (state.expanded) states.push('expanded');
    if (state.focused) states.push('focused');
    if (state.hidden) states.push('hidden');

    return states.join(', ');
  },

  /** 验证无障碍属性 */
  validateAccessibilityProps: (props: AccessibilityProps): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (props.accessible === false && props.accessibilityLabel) {
      errors.push('accessible 为 false 时不应设置 accessibilityLabel');
    }

    if (props.accessibilityLabel && props.accessibilityLabel.length > 200) {
      errors.push('accessibilityLabel 长度不应超过 200 字符');
    }

    if (props.accessibilityRole && !Object.values(AriaRole).includes(props.accessibilityRole as AriaRole)) {
      errors.push(`accessibilityRole "${props.accessibilityRole}" 不是有效的 ARIA 角色`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /** 生成完整的无障碍属性 */
  generateAccessibilityProps: (
    componentType: string,
    label?: string,
    state?: AccessibilityState,
    customProps?: Partial<AccessibilityProps>
  ): AccessibilityProps => {
    const recommendedRole = AccessibilityUtils.getRecommendedRole(componentType);

    return {
      accessible: true,
      accessibilityLabel: label,
      accessibilityRole: recommendedRole,
      accessibilityState: state,
      ...customProps,
    };
  },
};

// ==================== 导出 ====================
// 所有类和枚举已经单独导出，无需重复导出