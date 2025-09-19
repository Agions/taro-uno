import React, { createContext, useContext, forwardRef, ReactNode } from 'react';

// ==================== 复合组件上下文 ====================
interface CompoundComponentContext<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

const CompoundComponentContext = createContext<CompoundComponentContext>({});

// ==================== 复合组件Hook ====================
export const useCompoundComponent = <T = any>() => {
  const context = useContext(CompoundComponentContext);
  if (!context) {
    throw new Error('useCompoundComponent must be used within a CompoundComponent');
  }
  return context as CompoundComponentContext<T>;
};

// ==================== 复合组件属性接口 ====================
export interface CompoundComponentProps<T = any> {
  /** 组件值 */
  value?: T;
  /** 值变化回调 */
  onChange?: (value: T) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 组件尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 组件变体 */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  /** 子元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== 复合组件容器 ====================
export const CompoundComponentContainer = <T,>({
  value,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'default',
  children,
  className,
  style,
}: CompoundComponentProps<T>) => {
  const contextValue: CompoundComponentContext<T> = {
    value,
    onChange,
    disabled,
    size,
    variant,
  };

  return (
    <CompoundComponentContext.Provider value={contextValue}>
      <div className={className} style={style}>
        {children}
      </div>
    </CompoundComponentContext.Provider>
  );
};

// ==================== 复合组件子项属性接口 ====================
export interface CompoundItemProps {
  /** 子项值 */
  value: any;
  /** 子项标签 */
  label?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  /** 子元素 */
  children?: ReactNode;
}

// ==================== 复合组件子项 ====================
export const CompoundComponentItem = forwardRef<any, CompoundItemProps>(
  ({ value, label, disabled: itemDisabled, className, style, onClick, children }, ref) => {
    const { value: parentValue, onChange, disabled: parentDisabled, size, variant } = useCompoundComponent();

    const isDisabled = parentDisabled || itemDisabled;
    const isSelected = parentValue === value;

    const handleClick = (event: React.MouseEvent) => {
      if (!isDisabled) {
        onChange?.(value);
        onClick?.(event);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: isSelected ? 'var(--colors-primary-500)' : 'transparent',
          color: isSelected ? 'white' : 'var(--colors-text-primary)',
          padding: 'var(--spacing-2)',
          borderRadius: 'var(--border-radius-md)',
          transition: 'all 0.2s ease',
          ...style,
        }}
        onClick={handleClick}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
      >
        {children || label}
      </div>
    );
  }
);

CompoundComponentItem.displayName = 'CompoundComponentItem';

// ==================== 复合组件触发器属性接口 ====================
export interface CompoundTriggerProps {
  /** 触发器标签 */
  label?: ReactNode;
  /** 占位符 */
  placeholder?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  /** 子元素 */
  children?: ReactNode;
}

// ==================== 复合组件触发器 ====================
export const CompoundComponentTrigger = forwardRef<any, CompoundTriggerProps>(
  ({ label, placeholder, className, style, onClick, children }, ref) => {
    const { value, disabled, size, variant } = useCompoundComponent();

    const handleClick = (event: React.MouseEvent) => {
      if (!disabled) {
        onClick?.(event);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          border: '1px solid var(--colors-border-default)',
          borderRadius: 'var(--border-radius-md)',
          padding: 'var(--spacing-2)',
          minWidth: '200px',
          transition: 'all 0.2s ease',
          ...style,
        }}
        onClick={handleClick}
        role="combobox"
        aria-expanded={false}
        aria-disabled={disabled}
      >
        {children || label || placeholder || 'Select an option'}
      </div>
    );
  }
);

CompoundComponentTrigger.displayName = 'CompoundComponentTrigger';

// ==================== 复合组件内容容器属性接口 ====================
export interface CompoundContentProps {
  /** 是否显示 */
  open?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ==================== 复合组件内容容器 ====================
export const CompoundComponentContent = forwardRef<any, CompoundContentProps>(
  ({ open = false, className, style, children }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: open ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid var(--colors-border-default)',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--box-shadow-lg)',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto',
          ...style,
        }}
        role="listbox"
      >
        {children}
      </div>
    );
  }
);

CompoundComponentContent.displayName = 'CompoundComponentContent';

// ==================== 导出复合组件 ====================
export const CompoundComponent = Object.assign(CompoundComponentContainer, {
  Trigger: CompoundComponentTrigger,
  Content: CompoundComponentContent,
  Item: CompoundComponentItem,
});

export default CompoundComponent;