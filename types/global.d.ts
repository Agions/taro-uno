/// 

// 样式模块声明
declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}


declare module '@tarojs/components/types/common' {
  export interface ITouchEvent {
    currentTarget: EventTarget
    target: EventTarget
    detail: Record<string, unknown>
    [key: string]: unknown
  }

  export interface CommonEventFunction<T = Record<string, unknown>> {
    (event: T): void
  }
}

// 工具库声明
declare module 'classnames' {
  type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean

  interface ClassDictionary {
    [id: string]: unknown
  }

  interface ClassArray extends Array<ClassValue> { }

  function classNames(...classes: ClassValue[]): string

  export = classNames
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

// Taro 平台类型扩展
declare namespace Taro {
  interface TaroStatic {
    ENV_TYPE: {
      WEAPP: 'WEAPP'
      SWAN: 'SWAN'
      ALIPAY: 'ALIPAY'
      H5: 'H5'
      RN: 'RN'
      TT: 'TT'
      QQ: 'QQ'
      JD: 'JD'
    }
    getEnv(): keyof typeof ENV_TYPE
  }
}

// 全局工具类型扩展
declare global {
  // 类型守卫
  type NonNullable<T> = T extends null | undefined ? never : T
  
  // 类型谓词
  type Predicate<T> = (value: unknown) => value is T
  
  // 深度必需类型
  type DeepRequired<T> = T extends object
    ? { [K in keyof T]-?: DeepRequired<T[K]> }
    : T
  
  // 深度可选类型
  type DeepOptional<T> = T extends object
    ? { [K in keyof T]?: DeepOptional<T[K]> }
    : T
  
  // 只读包装类型
  type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>
  }
  
  // 递归部分类型
  type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P]
  }
  
  // 异步函数类型
  type AsyncFunction<T = any> = (...args: any[]) => Promise<T>
  
  // 节点类型
  type AnyFunction = (...args: any[]) => any
  
  // 构造函数类型
  type Constructor<T = any> = new (...args: any[]) => T
  
  // 实例类型
  type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any
  
  // 函数参数类型
  type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
  
  // 函数返回类型
  type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any
  
  // Promise 解析类型
  type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T
  
  // 数组元素类型
  type ArrayElement<T> = T extends readonly (infer U)[] ? U : never
  
  // 对象值类型
  type ObjectValues<T> = T[keyof T]
  
  // 对象键类型
  type ObjectKeys<T> = keyof T
  
  // 挑选匹配类型的属性
  type PickByValue<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
  }
  
  // 排除匹配类型的属性
  type OmitByValue<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? never : K]: T[K]
  }
  
  // 合并两个对象类型
  type Merge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof A 
      ? K extends keyof B 
        ? A[K] | B[K] 
        : A[K] 
      : K extends keyof B 
        ? B[K] 
        : never
  }
  
  // 严格的事件处理器类型
  type StrictEventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void
  
  // 组件 Ref 类型
  type ComponentRef<T> = React.RefObject<T> | ((instance: T | null) => void) | null
  
  // 样式对象类型
  type CSSProperties = React.CSSProperties
  
  // 子元素类型
  type ReactChildren = React.ReactNode
  
  // 空对象类型
  type EmptyObject = Record<string, never>
  
  // 原始类型
  type Primitive = string | number | boolean | bigint | symbol | null | undefined
  
  // 可序列化类型
  type Serializable = Primitive | Serializable[] | { [key: string]: Serializable }
  
  // 函数去抖
  type DebouncedFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): void
    cancel: () => void
  }
  
  // 函数节流
  type ThrottledFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): void
    cancel: () => void
  }
}

export { }