/**
 * 组件工厂函数
 * 提供标准化的组件创建模式，自动注入主题、平台上下文
 * @module utils/createComponent
 */

import {
  forwardRef,
  memo,
  useContext,
  createContext,
} from 'react';
import type {
  ComponentType,
  ForwardRefRenderFunction,
  RefAttributes,
  Context,
} from 'react';
import type { BaseProps } from '../types/component';

// ==================== 类型定义 ====================

/**
 * 组件工厂配置选项
 */
export interface CreateComponentOptions<P extends BaseProps, R = unknown> {
  /**
   * 组件名称
   * 用于设置 displayName 和调试
   */
  name: string;

  /**
   * 组件渲染函数
   * 接收 props 和 ref，返回 ReactNode
   */
  render: ForwardRefRenderFunction<R, P>;

  /**
   * 是否使用 React.memo 优化
   * @default true
   */
  memo?: boolean;

  /**
   * 默认 Props
   * 会与传入的 props 合并
   */
  defaultProps?: Partial<P>;
}

/**
 * 组件上下文类型
 * 提供主题和平台信息
 */
export interface ComponentContextValue {
  /**
   * 组件前缀
   * 用于生成类名
   */
  prefix: string;

  /**
   * 是否为 RTL 布局
   */
  rtl: boolean;
}

/**
 * 组件元数据
 */
export interface ComponentMeta {
  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件版本
   */
  version?: string;

  /**
   * 组件描述
   */
  description?: string;
}

// ==================== 上下文 ====================

/**
 * 组件上下文默认值
 */
const defaultComponentContext: ComponentContextValue = {
  prefix: 'taro-uno',
  rtl: false,
};

/**
 * 组件上下文
 */
export const ComponentContext: Context<ComponentContextValue> = createContext<ComponentContextValue>(
  defaultComponentContext,
);

/**
 * 获取组件上下文
 */
export function useComponentContext(): ComponentContextValue {
  return useContext(ComponentContext);
}

// ==================== 工厂函数 ====================

/**
 * 创建标准化组件
 *
 * 功能：
 * - 自动设置 displayName
 * - 自动支持 forwardRef
 * - 可选的 React.memo 优化
 * - 合并默认 Props
 *
 * @param options - 组件配置选项
 * @returns 标准化的 React 组件
 *
 * @example
 * ```typescript
 * interface ButtonProps extends InteractiveProps {
 *   type?: 'primary' | 'default';
 *   onClick?: () => void;
 * }
 *
 * const Button = createComponent<ButtonProps, HTMLButtonElement>({
 *   name: 'Button',
 *   defaultProps: {
 *     type: 'default',
 *   },
 *   render: (props, ref) => {
 *     const { type, children, className, style, ...rest } = props;
 *     return (
 *       <button ref={ref} className={className} style={style} {...rest}>
 *         {children}
 *       </button>
 *     );
 *   },
 * });
 * ```
 */
export function createComponent<P extends BaseProps, R = unknown>(
  options: CreateComponentOptions<P, R>,
): ComponentType<P & RefAttributes<R>> {
  const {
    name,
    render,
    memo: useMemo = true,
    defaultProps,
  } = options;

  // 创建 forwardRef 组件
  const ForwardedComponent = forwardRef<R, P>((props, ref) => {
    // 合并默认 Props
    const mergedProps = defaultProps
      ? ({ ...defaultProps, ...props } as P)
      : props;

    return render(mergedProps as P, ref);
  });

  // 设置 displayName
  ForwardedComponent.displayName = name;

  // 根据配置决定是否使用 memo
  if (useMemo) {
    const MemoizedComponent = memo(ForwardedComponent);
    MemoizedComponent.displayName = name;
    return MemoizedComponent as unknown as ComponentType<P & RefAttributes<R>>;
  }

  return ForwardedComponent as unknown as ComponentType<P & RefAttributes<R>>;
}

// ==================== 复合组件工具 ====================

/**
 * 复合组件配置
 */
export interface CompoundComponentConfig<
  MainProps extends BaseProps,
  MainRef = unknown,
  SubComponents extends Record<string, ComponentType<BaseProps>> = Record<string, never>
> {
  /**
   * 主组件配置
   */
  main: CreateComponentOptions<MainProps, MainRef>;

  /**
   * 子组件映射
   */
  subComponents?: SubComponents;
}

/**
 * 复合组件类型
 */
export type CompoundComponent<
  MainProps extends BaseProps,
  MainRef = unknown,
  SubComponents extends Record<string, ComponentType<BaseProps>> = Record<string, never>
> = ComponentType<MainProps & RefAttributes<MainRef>> & SubComponents;

/**
 * 创建复合组件
 *
 * @param config - 复合组件配置
 * @returns 带有子组件的复合组件
 *
 * @example
 * ```typescript
 * const Form = createCompoundComponent({
 *   main: {
 *     name: 'Form',
 *     render: (props, ref) => <form ref={ref}>{props.children}</form>,
 *   },
 *   subComponents: {
 *     Item: FormItem,
 *     List: FormList,
 *   },
 * });
 *
 * // 使用
 * <Form>
 *   <Form.Item name="username">
 *     <Input />
 *   </Form.Item>
 * </Form>
 * ```
 */
export function createCompoundComponent<
  MainProps extends BaseProps,
  MainRef = unknown,
  SubComponents extends Record<string, ComponentType<BaseProps>> = Record<string, never>
>(
  config: CompoundComponentConfig<MainProps, MainRef, SubComponents>,
): CompoundComponent<MainProps, MainRef, SubComponents> {
  const { main, subComponents } = config;

  // 创建主组件
  const MainComponent = createComponent<MainProps, MainRef>(main);

  // 附加子组件
  if (subComponents) {
    Object.entries(subComponents).forEach(([key, SubComponent]) => {
      (MainComponent as unknown as Record<string, unknown>)[key] = SubComponent;
    });
  }

  return MainComponent as CompoundComponent<MainProps, MainRef, SubComponents>;
}

// ==================== 类名工具 ====================

/**
 * 生成 BEM 类名
 *
 * @param block - 块名
 * @param element - 元素名（可选）
 * @param modifier - 修饰符（可选）
 * @returns BEM 类名
 */
export function createBEM(
  block: string,
  element?: string,
  modifier?: string | Record<string, boolean>,
): string {
  let className = block;

  if (element) {
    className = `${block}__${element}`;
  }

  if (modifier) {
    if (typeof modifier === 'string') {
      className = `${className}--${modifier}`;
    } else {
      const modifiers = Object.entries(modifier)
        .filter(([, value]) => value)
        .map(([key]) => `${className}--${key}`)
        .join(' ');
      if (modifiers) {
        className = `${className} ${modifiers}`;
      }
    }
  }

  return className;
}

/**
 * 创建命名空间类名生成器
 *
 * @param namespace - 命名空间前缀
 * @returns 类名生成函数
 */
export function createNamespace(namespace: string): {
  b: (blockSuffix?: string) => string;
  e: (element: string) => string;
  m: (modifier: string) => string;
  be: (blockSuffix: string, element: string) => string;
  bm: (blockSuffix: string, modifier: string) => string;
  em: (element: string, modifier: string) => string;
  bem: (blockSuffix: string, element: string, modifier: string) => string;
  is: (state: string, value?: boolean) => string;
} {
  const b = (blockSuffix?: string): string => {
    return blockSuffix ? `${namespace}-${blockSuffix}` : namespace;
  };

  const e = (element: string): string => {
    return `${namespace}__${element}`;
  };

  const m = (modifier: string): string => {
    return `${namespace}--${modifier}`;
  };

  const be = (blockSuffix: string, element: string): string => {
    return `${namespace}-${blockSuffix}__${element}`;
  };

  const bm = (blockSuffix: string, modifier: string): string => {
    return `${namespace}-${blockSuffix}--${modifier}`;
  };

  const em = (element: string, modifier: string): string => {
    return `${namespace}__${element}--${modifier}`;
  };

  const bem = (blockSuffix: string, element: string, modifier: string): string => {
    return `${namespace}-${blockSuffix}__${element}--${modifier}`;
  };

  const is = (state: string, value = true): string => {
    return value ? `is-${state}` : '';
  };

  return { b, e, m, be, bm, em, bem, is };
}

// ==================== 组件注册 ====================

/**
 * 组件注册表
 */
const componentRegistry = new Map<string, ComponentMeta>();

/**
 * 注册组件
 *
 * @param name - 组件名称
 * @param meta - 组件元数据
 */
export function registerComponent(name: string, meta: Partial<ComponentMeta> = {}): void {
  componentRegistry.set(name, {
    name,
    ...meta,
  });
}

/**
 * 获取已注册的组件
 *
 * @param name - 组件名称
 * @returns 组件元数据或 undefined
 */
export function getRegisteredComponent(name: string): ComponentMeta | undefined {
  return componentRegistry.get(name);
}

/**
 * 获取所有已注册的组件
 *
 * @returns 组件元数据数组
 */
export function getAllRegisteredComponents(): ComponentMeta[] {
  return Array.from(componentRegistry.values());
}

// ==================== 导出 ====================

export default createComponent;
