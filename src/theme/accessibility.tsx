/**
 * 无障碍访问系统
 * 提供键盘导航、屏幕阅读器支持和无障碍访问工具
 */

import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';

// 无障碍访问上下文类型
interface AccessibilityContextType {
  // 键盘导航
  keyboardNavigation: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    focusTrap: (element: HTMLElement) => () => void;
    moveFocus: (direction: 'next' | 'previous' | 'first' | 'last') => void;
    registerFocusable: (id: string, element: HTMLElement) => void;
    unregisterFocusable: (id: string) => void;
  };
  
  // 屏幕阅读器
  screenReader: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    announce: (message: string, priority?: 'polite' | 'assertive') => void;
    announceChanges: (element: HTMLElement, message: string) => void;
  };
  
  // 高对比度
  highContrast: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
  };
  
  // 减少动画
  reduceMotion: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
  };
  
  // 字体大小
  fontSize: {
    scale: number;
    setScale: (scale: number) => void;
  };
  
  // 焦点管理
  focusManagement: {
    setFocus: (element: HTMLElement | null) => void;
    getFocusedElement: () => HTMLElement | null;
    blurFocusedElement: () => void;
  };
  
  // 快捷键
  shortcuts: {
    register: (shortcut: string, callback: () => void) => () => void;
    unregister: (shortcut: string) => void;
  };
}

// 创建无障碍访问上下文
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// 焦点元素记录
interface FocusableElement {
  id: string;
  element: HTMLElement;
  index: number;
}

// 快捷键记录
interface ShortcutRecord {
  shortcut: string;
  callback: () => void;
}

// 无障碍访问提供者组件
interface AccessibilityProviderProps {
  children: React.ReactNode;
  initialKeyboardNavigation?: boolean;
  initialScreenReader?: boolean;
  initialHighContrast?: boolean;
  initialReduceMotion?: boolean;
  initialFontSizeScale?: number;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  initialKeyboardNavigation = true,
  initialScreenReader = true,
  initialHighContrast = false,
  initialReduceMotion = false,
  initialFontSizeScale = 1,
}) => {
  // 状态管理
  const [keyboardNavigationEnabled, setKeyboardNavigationEnabled] = useState(initialKeyboardNavigation);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(initialScreenReader);
  const [highContrastEnabled, setHighContrastEnabled] = useState(initialHighContrast);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(initialReduceMotion);
  const [fontSizeScale, setFontSizeScaleState] = useState(initialFontSizeScale);
  
  // 引用
  const focusableElements = useRef<Map<string, FocusableElement>>(new Map());
  const focusableIndex = useRef(0);
  const shortcuts = useRef<Map<string, ShortcutRecord>>(new Map());
  const announcementRef = useRef<HTMLDivElement>(null);
  const focusedElement = useRef<HTMLElement | null>(null);

  // 检测用户偏好
  useEffect(() => {
    // 检测减少动画偏好
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduceMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotionEnabled(e.matches);
    };
    
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
    setReduceMotionEnabled(reduceMotionQuery.matches);

    // 检测高对比度偏好
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrastEnabled(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);
    setHighContrastEnabled(highContrastQuery.matches);

    // 检测屏幕阅读器
    const screenReaderQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleScreenReaderChange = (e: MediaQueryListEvent) => {
      setScreenReaderEnabled(e.matches);
    };
    
    screenReaderQuery.addEventListener('change', handleScreenReaderChange);

    return () => {
      reduceMotionQuery.removeEventListener('change', handleReduceMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      screenReaderQuery.removeEventListener('change', handleScreenReaderChange);
    };
  }, []);

  // 应用字体大小缩放
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSizeScale * 16}px`;
  }, [fontSizeScale]);

  // 应用高对比度模式
  useEffect(() => {
    const root = document.documentElement;
    if (highContrastEnabled) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrastEnabled]);

  // 应用减少动画模式
  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotionEnabled) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotionEnabled]);

  // 键盘导航
  const keyboardNavigation = {
    enabled: keyboardNavigationEnabled,
    setEnabled: setKeyboardNavigationEnabled,
    
    // 焦点陷阱
    focusTrap: useCallback((element: HTMLElement) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusableElements.length === 0) return () => {};
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };
      
      element.addEventListener('keydown', handleKeyDown);
      
      return () => {
        element.removeEventListener('keydown', handleKeyDown);
      };
    }, []),
    
    // 移动焦点
    moveFocus: useCallback((direction: 'next' | 'previous' | 'first' | 'last') => {
      const elements = Array.from(focusableElements.current.values()).sort((a, b) => a.index - b.index);
      
      if (elements.length === 0) return;
      
      const currentIndex = elements.findIndex(el => el.element === document.activeElement);
      
      let nextIndex: number;
      
      switch (direction) {
        case 'next':
          nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'previous':
          nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
          break;
        case 'first':
          nextIndex = 0;
          break;
        case 'last':
          nextIndex = elements.length - 1;
          break;
        default:
          return;
      }
      
      elements[nextIndex]?.element.focus();
    }, []),
    
    // 注册可聚焦元素
    registerFocusable: useCallback((id: string, element: HTMLElement) => {
      focusableElements.current.set(id, {
        id,
        element,
        index: focusableIndex.current++,
      });
    }, []),
    
    // 注销可聚焦元素
    unregisterFocusable: useCallback((id: string) => {
      focusableElements.current.delete(id);
    }, []),
  };

  // 屏幕阅读器
  const screenReader = {
    enabled: screenReaderEnabled,
    setEnabled: setScreenReaderEnabled,
    
    // 宣布消息
    announce: useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!announcementRef.current) return;
      
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', priority);
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      announcementRef.current.appendChild(announcement);
      
      // 清理旧的宣布
      setTimeout(() => {
        announcement.remove();
      }, 1000);
    }, []),
    
    // 宣布变化
    announceChanges: useCallback((_element: HTMLElement, message: string) => {
      if (!screenReaderEnabled) return;
      
      // 创建一个临时的ARIA live区域
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.textContent = message;
      
      document.body.appendChild(liveRegion);
      
      // 清理
      setTimeout(() => {
        liveRegion.remove();
      }, 1000);
    }, [screenReaderEnabled]),
  };

  // 高对比度
  const highContrast = {
    enabled: highContrastEnabled,
    setEnabled: setHighContrastEnabled,
  };

  // 减少动画
  const reduceMotion = {
    enabled: reduceMotionEnabled,
    setEnabled: setReduceMotionEnabled,
  };

  // 字体大小
  const fontSize = {
    scale: fontSizeScale,
    setScale: setFontSizeScaleState,
  };

  // 焦点管理
  const focusManagement = {
    setFocus: useCallback((element: HTMLElement | null) => {
      if (element) {
        element.focus();
        focusedElement.current = element;
      } else {
        focusedElement.current = null;
      }
    }, []),
    
    getFocusedElement: useCallback(() => focusedElement.current, []),
    
    blurFocusedElement: useCallback(() => {
      if (focusedElement.current) {
        focusedElement.current.blur();
        focusedElement.current = null;
      }
    }, []),
  };

  // 快捷键
  const shortcutsManager = {
    register: useCallback((shortcut: string, callback: () => void) => {
      shortcuts.current.set(shortcut, { shortcut, callback });
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!keyboardNavigationEnabled) return;
        
        // 检查快捷键匹配
        const key = e.key.toLowerCase();
        const ctrl = e.ctrlKey;
        const alt = e.altKey;
        const shift = e.shiftKey;
        const meta = e.metaKey;
        
        // 解析快捷键
        const parts = shortcut.toLowerCase().split('+');
        const expectedKey = parts[parts.length - 1];
        const expectedCtrl = parts.includes('ctrl');
        const expectedAlt = parts.includes('alt');
        const expectedShift = parts.includes('shift');
        const expectedMeta = parts.includes('meta');
        
        if (
          key === expectedKey &&
          ctrl === expectedCtrl &&
          alt === expectedAlt &&
          shift === expectedShift &&
          meta === expectedMeta
        ) {
          e.preventDefault();
          callback();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        shortcuts.current.delete(shortcut);
      };
    }, [keyboardNavigationEnabled]),
    
    unregister: useCallback((shortcut: string) => {
      shortcuts.current.delete(shortcut);
    }, []),
  };

  // 全局键盘事件处理
  useEffect(() => {
    if (!keyboardNavigationEnabled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab 键导航
      if (e.key === 'Tab') {
        // Tab 键导航由浏览器默认处理
        return;
      }
      
      // 方向键导航
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        keyboardNavigation.moveFocus('next');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        keyboardNavigation.moveFocus('previous');
      }
      
      // Home/End 键导航
      if (e.key === 'Home') {
        keyboardNavigation.moveFocus('first');
      } else if (e.key === 'End') {
        keyboardNavigation.moveFocus('last');
      }
      
      // Escape 键关闭弹窗等
      if (e.key === 'Escape') {
        // 触发全局关闭事件
        document.dispatchEvent(new CustomEvent('accessibility-escape'));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardNavigationEnabled]);

  // 上下文值
  const contextValue: AccessibilityContextType = {
    keyboardNavigation,
    screenReader,
    highContrast,
    reduceMotion,
    fontSize,
    focusManagement,
    shortcuts: shortcutsManager,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      {/* 屏幕阅读器宣布区域 */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" />
    </AccessibilityContext.Provider>
  );
};

// 使用无障碍访问的Hook
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// 无障碍访问工具函数
export const AccessibilityUtils = {
  // 生成ARIA属性
  getAriaProps: (props: {
    label?: string;
    describedBy?: string;
    errorMessage?: string;
    role?: string;
    busy?: boolean;
    hidden?: boolean;
  }) => {
    const ariaProps: Record<string, string> = {};
    
    if (props.label) {
      ariaProps['aria-label'] = props.label;
    }
    
    if (props.describedBy) {
      ariaProps['aria-describedby'] = props.describedBy;
    }
    
    if (props.errorMessage) {
      ariaProps['aria-errormessage'] = props.errorMessage;
    }
    
    if (props.role) {
      ariaProps['role'] = props.role;
    }
    
    if (props.busy) {
      ariaProps['aria-busy'] = 'true';
    }
    
    if (props.hidden) {
      ariaProps['aria-hidden'] = 'true';
    }
    
    return ariaProps;
  },
  
  // 检查颜色对比度
  checkColorContrast: (color1: string, color2: string): number => {
    // 简化的对比度计算
    const getLuminance = (color: string): number => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const gamma = 2.2;
      const luminance = 0.2126 * Math.pow(r, gamma) + 0.7152 * Math.pow(g, gamma) + 0.0722 * Math.pow(b, gamma);
      
      return luminance;
    };
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },
  
  // 检查WCAG合规性
  isWCAGCompliant: (contrastRatio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    if (level === 'AA') {
      return contrastRatio >= 4.5;
    } else {
      return contrastRatio >= 7;
    }
  },
  
  // 生成焦点样式
  getFocusStyles: (customStyles?: React.CSSProperties): React.CSSProperties => ({
    outline: '2px solid #0ea5e9',
    outlineOffset: '2px',
    ...customStyles,
  }),
  
  // 生成高对比度样式
  getHighContrastStyles: (customStyles?: React.CSSProperties): React.CSSProperties => ({
    border: '2px solid currentColor',
    ...customStyles,
  }),
};

// 无障碍访问HOC
export const withAccessibility = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const accessibility = useAccessibility();
    
    return <WrappedComponent {...props} accessibility={accessibility} />;
  };
};

// 键盘导航HOC
export const withKeyboardNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { keyboardNavigation } = useAccessibility();
    
    return <WrappedComponent {...props} keyboardNavigation={keyboardNavigation} />;
  };
};

// 焦点管理HOC
export const withFocusManagement = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { focusManagement } = useAccessibility();
    
    return <WrappedComponent {...props} focusManagement={focusManagement} />;
  };
};

export default AccessibilityProvider;