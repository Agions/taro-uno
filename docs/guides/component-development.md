# Taro-Uno 组件开发指南

本指南介绍如何在 Taro-Uno 项目中开发和维护组件。

## 项目结构

```
src/components/
├── basic/          # 基础组件
│   ├── Button/
│   ├── Icon/
│   ├── Text/
│   └── Divider/
├── display/        # 展示组件
│   ├── Card/
│   ├── List/
│   └── Table/
├── form/           # 表单组件
│   ├── Form/
│   ├── Input/
│   ├── Switch/
│   └── ...
├── feedback/       # 反馈组件
│   ├── Loading/
│   ├── Message/
│   └── ...
├── layout/         # 布局组件
├── navigation/     # 导航组件
└── performance/    # 性能组件
```

## 组件开发规范

### 1. 文件结构

每个组件应该包含以下文件：

```
ComponentName/
├── index.tsx              # 组件入口文件
├── ComponentName.tsx      # 主组件文件
├── ComponentName.types.ts # 类型定义文件
├── ComponentName.styles.ts # 样式文件
├── ComponentName.test.tsx # 测试文件
└── ComponentName.md       # 文档文件
```

### 2. 命名规范

#### 组件命名
- 使用 PascalCase 命名组件
- 组件文件名与组件名保持一致
- 组件目录名与组件名保持一致

```typescript
// ✅ 正确
export const ButtonComponent = forwardRef<ButtonRef, ButtonProps>(...);

// ❌ 错误
export const button = (props) => ...;
export const Button = (props) => ...;
```

#### 类型命名
- 使用 PascalCase 命名类型
- Props 类型以 `Props` 结尾
- Ref 类型以 `Ref` 结尾
- 使用 `type` 而不是 `interface` 定义简单类型

```typescript
// ✅ 正确
export type ButtonProps = {
  size: ButtonSize;
  onClick: () => void;
};

export type ButtonRef = {
  element: HTMLButtonElement;
  click: () => void;
};

// ❌ 错误
export interface buttonProps {
  size: buttonSize;
  onClick: () => void;
}
```

#### 样式命名
- 使用 camelCase 命名样式函数
- 样式类名使用 kebab-case
- 遵循 BEM 命名规范

```typescript
// ✅ 正确
export const buttonStyles = {
  getStyle: ({ size, variant }) => ({ ... }),
  getClassName: ({ size, variant }) => `taro-uno-button--${size}`,
};

// ❌ 错误
export const ButtonStyles = {
  GetStyle: () => ({ ... }),
  GetClassName: () => 'taro-uno-button',
};
```

### 3. 组件结构

#### 基础组件模板

```typescript
import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { componentStyles } from './ComponentName.styles';
import type { ComponentProps, ComponentRef } from './ComponentName.types';

/** 组件显示名称 */
const displayName = 'ComponentName';

/** 组件定义 */
export const ComponentComponent = forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  const {
    // 基础属性
    value,
    defaultValue,
    onChange,
    
    // 样式属性
    size = 'md',
    variant = 'solid',
    className,
    style,
    
    // 状态属性
    disabled = false,
    loading = false,
    
    // 无障碍属性
    accessible = true,
    accessibilityLabel,
    accessibilityRole = 'button',
    
    // 其他属性
    ...restProps
  } = props;

  // 引用
  const elementRef = useRef<HTMLDivElement>(null);
  
  // 状态管理
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  
  // 受控/非受控处理
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // 副作用处理
  useEffect(() => {
    // 处理副作用
  }, [/* 依赖项 */]);

  // 事件处理函数
  const handleClick = useCallback((event: ITouchEvent) => {
    if (disabled || loading) return;
    
    // 处理点击逻辑
    const newValue = !currentValue;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue, event);
  }, [currentValue, disabled, loading, isControlled, onChange]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(ref, () => ({
    element: elementRef.current,
    getValue: () => currentValue,
    setValue: (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
    },
    focus: () => {
      elementRef.current?.focus();
    },
    blur: () => {
      elementRef.current?.blur();
    },
  }), [currentValue, isControlled]);

  // 生成样式
  const componentStyle = componentStyles.getStyle({
    size,
    variant,
    style,
  });

  // 生成类名
  const componentClassName = componentStyles.getClassName({
    size,
    variant,
    className,
  });

  return (
    <View
      ref={elementRef}
      className={componentClassName}
      style={componentStyle}
      onClick={handleClick}
      accessible={accessible}
      aria-label={accessibilityLabel}
      aria-role={accessibilityRole}
      {...restProps}
    >
      {/* 组件内容 */}
    </View>
  );
});

// 设置显示名称
ComponentComponent.displayName = displayName;

// 导出组件
export const Component = ComponentComponent;
```

### 4. 类型定义规范

#### Props 类型定义

```typescript
export type ComponentProps = {
  /** 基础属性 */
  value?: any;                              // 受控值
  defaultValue?: any;                       // 默认值
  onChange?: (value: any, event: ITouchEvent) => void; // 变化回调
  
  /** 样式属性 */
  size?: ComponentSize;                     // 组件尺寸
  variant?: ComponentVariant;               // 组件变体
  color?: ComponentColor;                   // 组件颜色
  shape?: ComponentShape;                   // 组件形状
  className?: string;                       // 自定义类名
  style?: React.CSSProperties;             // 自定义样式
  
  /** 状态属性 */
  disabled?: boolean;                       // 禁用状态
  readonly?: boolean;                       // 只读状态
  loading?: boolean;                        // 加载状态
  status?: ComponentStatus;                 // 组件状态
  
  /** 交互属性 */
  autoFocus?: boolean;                      // 自动聚焦
  tabIndex?: number;                        // Tab 键序
  
  /** 无障碍属性 */
  accessible?: boolean;                     // 无障碍支持
  accessibilityLabel?: string;              // 无障碍标签
  accessibilityRole?: string;               // 无障碍角色
  accessibilityState?: Record<string, any>; // 无障碍状态
  
  /** 验证属性 */
  rules?: ComponentRule[];                   // 验证规则
  validateTrigger?: 'onChange' | 'onBlur' | 'onFocus'; // 验证触发时机
  validator?: (value: any) => boolean | string | Promise<boolean | string>; // 自定义验证
  
  /** 事件属性 */
  onFocus?: (event: ITouchEvent) => void;   // 聚焦回调
  onBlur?: (event: ITouchEvent) => void;    // 失焦回调
  onClick?: (event: ITouchEvent) => void;   // 点击回调
  
  /** 平台特定属性 */
  platform?: {
    weapp?: Record<string, any>;
    alipay?: Record<string, any>;
    h5?: Record<string, any>;
    rn?: Record<string, any>;
  };
  
  /** 其他属性 */
  [key: string]: any;
};
```

#### Ref 类型定义

```typescript
export type ComponentRef = {
  /** DOM 元素引用 */
  element: HTMLElement | null;
  /** 获取值 */
  getValue: () => any;
  /** 设置值 */
  setValue: (value: any) => void;
  /** 聚焦 */
  focus: () => void;
  /** 失焦 */
  blur: () => void;
  /** 设置禁用状态 */
  setDisabled: (disabled: boolean) => void;
  /** 设置只读状态 */
  setReadonly: (readonly: boolean) => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
  /** 设置状态 */
  setStatus: (status: ComponentStatus) => void;
  /** 获取状态 */
  getStatus: () => ComponentStatus;
  /** 验证 */
  validate: () => Promise<ComponentValidationResult>;
  /** 重置 */
  reset: () => void;
};
```

### 5. 样式定义规范

#### 样式配置类型

```typescript
export interface ComponentStyleConfig {
  /** 颜色配置 */
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    default: string;
    disabled: string;
    border: string;
    background: string;
    text: string;
  };
  
  /** 尺寸配置 */
  sizes: {
    sm: ComponentSizeConfig;
    md: ComponentSizeConfig;
    lg: ComponentSizeConfig;
  };
  
  /** 间距配置 */
  spacing: {
    padding: number;
    margin: number;
    gap: number;
  };
  
  /** 动画配置 */
  animation: {
    duration: string;
    easing: string;
  };
  
  /** 阴影配置 */
  shadow: {
    default: string;
    hover: string;
    active: string;
    disabled: string;
  };
}
```

#### 样式工具函数

```typescript
export const componentStyles = {
  /** 获取样式配置 */
  getStyleConfig: (customConfig?: Partial<ComponentStyleConfig>) => ComponentStyleConfig,
  
  /** 获取样式对象 */
  getStyle: (options: {
    size?: ComponentSize;
    variant?: ComponentVariant;
    color?: ComponentColor;
    status?: ComponentStatus;
    disabled?: boolean;
    style?: React.CSSProperties;
  }) => React.CSSProperties,
  
  /** 获取类名 */
  getClassName: (options: {
    size?: ComponentSize;
    variant?: ComponentVariant;
    color?: ComponentColor;
    status?: ComponentStatus;
    disabled?: boolean;
    className?: string;
  }) => string,
  
  /** 获取容器样式 */
  getContainerStyle: (options: {
    block?: boolean;
    style?: React.CSSProperties;
  }) => React.CSSProperties,
};
```

### 6. 测试规范

#### 测试文件结构

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Component } from './Component';
import type { ComponentProps } from './Component.types';

// Mock 依赖
jest.mock('@tarojs/components', () => ({
  View: 'View',
  Text: 'Text',
}));

describe('Component Component', () => {
  const defaultProps: ComponentProps = {
    accessibilityLabel: 'Test Component',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('基础渲染', () => {
    it('应该正确渲染组件', () => {
      render(<Component {...defaultProps} />);
      const component = screen.getByRole('button');
      expect(component).toBeInTheDocument();
    });

    it('应该使用默认值', () => {
      render(<Component {...defaultProps} defaultValue="test" />);
      const component = screen.getByRole('button');
      expect(component).toHaveTextContent('test');
    });
  });

  describe('交互功能', () => {
    it('应该正确处理点击事件', () => {
      const handleClick = jest.fn();
      render(<Component {...defaultProps} onClick={handleClick} />);
      
      const component = screen.getByRole('button');
      fireEvent.click(component);
      
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('应该在禁用状态下不响应点击', () => {
      const handleClick = jest.fn();
      render(<Component {...defaultProps} disabled={true} onClick={handleClick} />);
      
      const component = screen.getByRole('button');
      fireEvent.click(component);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('无障碍支持', () => {
    it('应该具有正确的无障碍属性', () => {
      render(<Component {...defaultProps} accessibilityLabel="Test Component" />);
      const component = screen.getByRole('button');
      expect(component).toHaveAttribute('aria-label', 'Test Component');
    });
  });

  describe('引用方法', () => {
    it('应该提供正确的引用方法', () => {
      const ref = React.createRef<any>();
      render(<Component {...defaultProps} ref={ref} />);
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current.getValue).toBe('function');
      expect(typeof ref.current.setValue).toBe('function');
    });
  });

  describe('边界情况', () => {
    it('应该处理空值', () => {
      render(<Component {...defaultProps} value={undefined} />);
      const component = screen.getByRole('button');
      expect(component).toBeInTheDocument();
    });
  });
});
```

### 7. 文档规范

#### 组件文档结构

```markdown
# Component 组件名称

组件简介和用途说明。

## 基础用法

### 基本示例

```tsx
import { Component } from '@/components';

export default function BasicExample() {
  return (
    <Component accessibilityLabel="基础组件" />
  );
}
```

## API 文档

### Component Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| prop1 | `type1` | `default1` | 属性1说明 |
| prop2 | `type2` | `default2` | 属性2说明 |

### ComponentRef

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| method1 | `(param1: type1)` | `returnType` | 方法1说明 |

### 类型定义

```typescript
type ComponentSize = 'sm' | 'md' | 'lg';
type ComponentVariant = 'solid' | 'outline' | 'ghost';
```

## 注意事项

1. 注意事项1
2. 注意事项2

## 最佳实践

### 示例1

```tsx
// 最佳实践示例代码
```

## 相关组件

- [RelatedComponent1](./RelatedComponent1.md)
- [RelatedComponent2](./RelatedComponent2.md)
```

### 8. 性能优化

#### 使用 React.memo

```typescript
export const Component = React.memo(forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  // 组件实现
}));
```

#### 使用 useCallback

```typescript
const handleClick = useCallback((event: ITouchEvent) => {
  // 处理逻辑
}, [dependencies]);
```

#### 使用 useMemo

```typescript
const computedValue = useMemo(() => {
  return expensiveCalculation(props.value);
}, [props.value]);
```

### 9. 无障碍支持

#### 基本无障碍属性

```typescript
<View
  accessible={true}
  accessibilityLabel="组件描述"
  accessibilityRole="button"
  accessibilityState={{
    disabled: props.disabled,
    selected: props.selected,
  }}
>
  {/* 组件内容 */}
</View>
```

#### 动态无障碍状态

```typescript
const getAccessibilityState = () => {
  return {
    disabled: props.disabled,
    busy: props.loading,
    selected: props.selected,
    expanded: props.expanded,
  };
};

return (
  <View
    accessibilityState={getAccessibilityState()}
  >
    {/* 组件内容 */}
  </View>
);
```

### 10. 国际化支持

#### 文本国际化

```typescript
import { useTranslation } from 'react-i18next';

export const Component = forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('component.text')}</Text>
    </View>
  );
});
```

#### 日期时间国际化

```typescript
import { useLocale } from '@/hooks';

export const Component = forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  const { locale } = useLocale();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <View>
      <Text>{formatDate(new Date())}</Text>
    </View>
  );
});
```

## 发布流程

### 1. 代码审查

- 确保代码符合项目规范
- 确保测试覆盖率达标
- 确保文档完整准确

### 2. 测试验证

```bash
# 运行单元测试
npm test

# 运行集成测试
npm run test:integration

# 运行端到端测试
npm run test:e2e
```

### 3. 构建验证

```bash
# 构建组件库
npm run build

# 构建文档
npm run build:docs
```

### 4. 版本发布

```bash
# 更新版本号
npm version patch/minor/major

# 发布到 npm
npm publish
```

## 贡献指南

### 1. 分支管理

- `main`: 主分支，用于生产环境
- `develop`: 开发分支，用于集成开发
- `feature/*`: 功能分支，用于开发新功能
- `hotfix/*`: 修复分支，用于紧急修复

### 2. 提交规范

```bash
# 提交格式
<type>(<scope>): <description>

# 示例
feat(component): add new feature
fix(component): fix bug in component
docs(component): update component documentation
test(component): add component tests
```

### 3. 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 使用 TypeScript 进行类型检查

## 常见问题

### Q: 如何处理组件的受控和非受控模式？

A: 使用 `value` 和 `defaultValue` 属性区分受控和非受控模式，通过 `isControlled` 变量进行判断。

### Q: 如何优化组件性能？

A: 使用 `React.memo`、`useCallback`、`useMemo` 等优化手段，避免不必要的重渲染。

### Q: 如何确保组件的无障碍支持？

A: 为每个组件提供合适的 `accessibilityLabel` 和 `accessibilityRole`，确保键盘导航和屏幕阅读器支持。

## 总结

本指南提供了 Taro-Uno 组件开发的完整规范和最佳实践。遵循这些规范可以确保代码质量和一致性，提高开发效率。