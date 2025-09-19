import React, { useRef, useEffect, useState } from 'react';

// ==================== 无障碍属性类型定义 ====================
export interface AccessibilityProps {
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 无障碍描述 */
  ariaDescribedBy?: string;
  /** 无障碍详细信息 */
  ariaDetails?: string;
  /** 无障碍角色 */
  role?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否无效 */
  invalid?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 错误消息 */
  errorMessage?: string;
  /** 帮助文本 */
  helpText?: string;
  /** 当前选中项 */
  selected?: boolean;
  /** 是否被选中 */
  checked?: boolean;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否弹出 */
  hasPopup?: string;
  /** 当前值 */
  valueNow?: number;
  /** 最小值 */
  valueMin?: number;
  /** 最大值 */
  valueMax?: number;
  /** 值文本 */
  valueText?: string;
}

export interface KeyboardNavigationProps {
  /** 键盘事件处理 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** 是否支持键盘导航 */
  enableKeyboardNavigation?: boolean;
  /** 导航方向 */
  navigationDirection?: 'horizontal' | 'vertical' | 'grid';
  /** 焦点管理 */
  manageFocus?: boolean;
}

export interface FocusManagementProps {
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 焦点顺序 */
  tabIndex?: number;
  /** 焦点样式 */
  focusVisible?: boolean;
  /** 焦点处理函数 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 失焦处理函数 */
  onBlur?: (event: React.FocusEvent) => void;
}

// ==================== 无障碍工具类 ====================
export class AccessibilityUtils {
  /**
   * 生成无障碍属性
   */
  static generateAriaProps(props: AccessibilityProps): Record<string, string | boolean> {
    const ariaProps: Record<string, string | boolean> = {};

    if (props.ariaLabel) ariaProps['aria-label'] = props.ariaLabel;
    if (props.ariaDescribedBy) ariaProps['aria-describedby'] = props.ariaDescribedBy;
    if (props.ariaDetails) ariaProps['aria-details'] = props.ariaDetails;
    if (props.role) ariaProps['role'] = props.role;
    if (props.required) ariaProps['aria-required'] = true;
    if (props.invalid) ariaProps['aria-invalid'] = true;
    if (props.readOnly) ariaProps['aria-readonly'] = true;
    if (props.disabled) ariaProps['aria-disabled'] = true;
    if (props.selected !== undefined) ariaProps['aria-selected'] = props.selected;
    if (props.checked !== undefined) ariaProps['aria-checked'] = props.checked;
    if (props.expanded !== undefined) ariaProps['aria-expanded'] = props.expanded;
    if (props.hasPopup) ariaProps['aria-haspopup'] = props.hasPopup;
    if (props.valueNow !== undefined) ariaProps['aria-valuenow'] = props.valueNow;
    if (props.valueMin !== undefined) ariaProps['aria-valuemin'] = props.valueMin;
    if (props.valueMax !== undefined) ariaProps['aria-valuemax'] = props.valueMax;
    if (props.valueText) ariaProps['aria-valuetext'] = props.valueText;

    return ariaProps;
  }

  /**
   * 生成键盘导航事件处理器
   */
  static createKeyboardHandler(
    props: KeyboardNavigationProps,
    callbacks: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
      onHome?: () => void;
      onEnd?: () => void;
      onPageUp?: () => void;
      onPageDown?: () => void;
      onTab?: () => void;
    } = {}
  ) {
    if (!props.enableKeyboardNavigation) return props.onKeyDown;

    return (event: React.KeyboardEvent) => {
      // 调用原始事件处理器
      props.onKeyDown?.(event);

      // 根据按键执行相应操作
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          callbacks.onEnter?.();
          break;
        case ' ':
          event.preventDefault();
          callbacks.onSpace?.();
          break;
        case 'Escape':
          event.preventDefault();
          callbacks.onEscape?.();
          break;
        case 'ArrowUp':
          if (props.navigationDirection === 'vertical' || props.navigationDirection === 'grid') {
            event.preventDefault();
            callbacks.onArrowUp?.();
          }
          break;
        case 'ArrowDown':
          if (props.navigationDirection === 'vertical' || props.navigationDirection === 'grid') {
            event.preventDefault();
            callbacks.onArrowDown?.();
          }
          break;
        case 'ArrowLeft':
          if (props.navigationDirection === 'horizontal' || props.navigationDirection === 'grid') {
            event.preventDefault();
            callbacks.onArrowLeft?.();
          }
          break;
        case 'ArrowRight':
          if (props.navigationDirection === 'horizontal' || props.navigationDirection === 'grid') {
            event.preventDefault();
            callbacks.onArrowRight?.();
          }
          break;
        case 'Home':
          event.preventDefault();
          callbacks.onHome?.();
          break;
        case 'End':
          event.preventDefault();
          callbacks.onEnd?.();
          break;
        case 'PageUp':
          event.preventDefault();
          callbacks.onPageUp?.();
          break;
        case 'PageDown':
          event.preventDefault();
          callbacks.onPageDown?.();
          break;
        case 'Tab':
          callbacks.onTab?.();
          break;
      }
    };
  }

  /**
   * 生成焦点管理属性
   */
  static generateFocusProps(props: FocusManagementProps): Record<string, any> {
    const focusProps: Record<string, any> = {};

    if (props.autoFocus) focusProps.autoFocus = true;
    if (props.tabIndex !== undefined) focusProps.tabIndex = props.tabIndex;

    return focusProps;
  }

  /**
   * 检查元素是否在视口中
   */
  static isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * 滚动元素到视口中
   */
  static scrollIntoView(element: HTMLElement, options?: ScrollIntoViewOptions): void {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
      ...options,
    });
  }

  /**
   * 管理焦点陷阱
   */
  static createFocusTrap(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // 自动聚焦到第一个元素
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * 生成唯一的ID
   */
  static generateId(prefix: string = 'taro-uno'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 生成描述文本ID
   */
  static generateDescribedById(errorId?: string, helpId?: string): string | undefined {
    const ids = [];
    if (errorId) ids.push(errorId);
    if (helpId) ids.push(helpId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }
}

// ==================== 无障碍HOC ====================
export const withAccessibility = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  accessibilityProps?: AccessibilityProps
) => {
  const WithAccessibility = (props: P) => {
    // 生成无障碍属性
    const ariaProps = AccessibilityUtils.generateAriaProps(accessibilityProps || {});

    return (
      <WrappedComponent
        {...props}
        {...ariaProps}
      />
    );
  };

  WithAccessibility.displayName = `WithAccessibility(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithAccessibility;
};

// ==================== 键盘导航HOC ====================
export const withKeyboardNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  keyboardProps?: KeyboardNavigationProps,
  callbacks?: Parameters<typeof AccessibilityUtils['createKeyboardHandler']>[1]
) => {
  const WithKeyboardNavigation = (props: P) => {
    // 生成键盘导航事件处理器
    const onKeyDown = AccessibilityUtils.createKeyboardHandler(
      keyboardProps || {},
      callbacks
    );

    return (
      <WrappedComponent
        {...props}
        onKeyDown={onKeyDown}
      />
    );
  };

  WithKeyboardNavigation.displayName = `WithKeyboardNavigation(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithKeyboardNavigation;
};

// ==================== 焦点管理HOC ====================
export const withFocusManagement = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  focusProps?: FocusManagementProps
) => {
  const WithFocusManagement = (props: P) => {
    // 生成焦点管理属性
    const focusManagementProps = AccessibilityUtils.generateFocusProps(
      focusProps || {}
    );

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (event: React.FocusEvent) => {
      setIsFocused(true);
      focusProps?.onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent) => {
      setIsFocused(false);
      focusProps?.onBlur?.(event);
    };

    return (
      <WrappedComponent
        {...props}
        {...focusManagementProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-focused={isFocused}
      />
    );
  };

  WithFocusManagement.displayName = `WithFocusManagement(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithFocusManagement;
};

// ==================== 无障碍组件Hook ====================
export const useAccessibility = (props: AccessibilityProps) => {
  const [errorId] = useState(() => AccessibilityUtils.generateId('error'));
  const [helpId] = useState(() => AccessibilityUtils.generateId('help'));

  const ariaProps = AccessibilityUtils.generateAriaProps(props);
  const describedById = AccessibilityUtils.generateDescribedById(
    props.errorMessage ? errorId : undefined,
    props.helpText ? helpId : undefined
  );

  return {
    errorId,
    helpId,
    ariaProps: {
      ...ariaProps,
      'aria-describedby': describedById,
    },
  };
};

// ==================== 键盘导航Hook ====================
export const useKeyboardNavigation = (
  props: KeyboardNavigationProps,
  callbacks: Parameters<typeof AccessibilityUtils['createKeyboardHandler']>[1] = {}
) => {
  const onKeyDown = AccessibilityUtils.createKeyboardHandler(props, callbacks);

  return {
    onKeyDown,
  };
};

// ==================== 焦点管理Hook ====================
export const useFocusManagement = (props: FocusManagementProps = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent) => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent) => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  const focusProps = AccessibilityUtils.generateFocusProps(props);

  return {
    ref,
    isFocused,
    focusProps: {
      ...focusProps,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'data-focused': isFocused,
    },
  };
};

// ==================== 焦点陷阱Hook ====================
export const useFocusTrap = (enabled: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const cleanup = AccessibilityUtils.createFocusTrap(container);

    return cleanup;
  }, [enabled]);

  return {
    containerRef,
  };
};

export default AccessibilityUtils;