# Design Document: Taro 组件库优化

## Overview

本设计文档描述 Taro-Uno UI 组件库的架构优化方案，实现组件的工具化、模块化、样式注入化。基于行业最佳实践（NutUI、Vant、Ant Design Mobile）和现代前端设计模式，打造一个高质量、易维护、可扩展的跨平台组件库。

### 设计目标

1. **用户只需关注业务** - 组件内部自动处理样式、平台适配、类型安全
2. **专业的架构设计** - 清晰的目录结构、统一的代码规范、完整的类型系统
3. **零 TypeScript 警告** - 严格的类型检查、禁止 any、完整的泛型支持
4. **全平台支持** - React Native、H5、微信小程序、鸿蒙 OS 等 Taro 支持的所有平台

## Architecture

### 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户应用层                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  import { Button, http, useTheme } from 'taro-uno-ui'   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Taro-Uno UI 组件库                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    统一导出层 (index.ts)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐     │
│  │Components│  Hooks   │  Utils   │ Services │ Providers│     │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘     │
│                              │                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    核心系统层                              │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐           │  │
│  │  │ Theme      │ │ Platform   │ │ Types      │           │  │
│  │  │ System     │ │ Adapter    │ │ System     │           │  │
│  │  └────────────┘ └────────────┘ └────────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      平台适配层                                  │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐     │
│  │  WeApp   │   H5     │   RN     │ Harmony  │  Others  │     │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### 目录结构

```
src/
├── index.ts                    # 主入口，统一导出
├── components/                 # 组件目录
│   ├── index.ts               # 组件统一导出
│   ├── basic/                 # 基础组件
│   ├── form/                  # 表单组件
│   ├── display/               # 展示组件
│   ├── feedback/              # 反馈组件
│   ├── layout/                # 布局组件
│   └── navigation/            # 导航组件
├── hooks/                     # 自定义 Hooks
│   ├── index.ts
│   ├── state/                 # 状态管理 Hooks
│   ├── lifecycle/             # 生命周期 Hooks
│   ├── effect/                # 副作用 Hooks
│   ├── dom/                   # DOM 相关 Hooks
│   ├── ui/                    # UI 相关 Hooks
│   └── async/                 # 异步 Hooks
├── utils/                     # 工具函数
│   ├── index.ts
│   ├── classnames.ts
│   ├── style.ts
│   ├── platform.ts
│   ├── unit.ts
│   ├── color.ts
│   ├── validator.ts
│   ├── formatter.ts
│   ├── storage.ts
│   ├── logger.ts
│   ├── object.ts
│   ├── function.ts
│   └── is.ts
├── services/                  # 请求服务
│   ├── index.ts
│   ├── http-client.ts
│   ├── types.ts
│   ├── interceptors.ts
│   ├── adapters/
│   └── utils/
├── theme/                     # 主题系统
│   ├── index.ts
│   ├── types.ts
│   ├── tokens.ts
│   ├── defaults.ts
│   ├── dark.ts
│   └── styles/
├── platform/                  # 平台适配
│   ├── index.ts
│   ├── types.ts
│   ├── detector.ts
│   ├── adapter.ts
│   └── polyfills/
├── types/                     # 全局类型定义
│   ├── index.ts
│   ├── common.ts
│   ├── component.ts
│   ├── event.ts
│   ├── style.ts
│   └── utils.ts
├── constants/                 # 常量定义
│   ├── index.ts
│   ├── platform.ts
│   ├── theme.ts
│   └── zIndex.ts
└── providers/                 # Context Providers
    ├── index.ts
    ├── ThemeProvider.tsx
    ├── ConfigProvider.tsx
    └── PlatformProvider.tsx
```

## Components and Interfaces

### 1. 通用类型系统

```typescript
// types/common.ts
/** 尺寸类型 */
export type Size = 'sm' | 'md' | 'lg';

/** 状态类型 */
export type Status = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/** 变体类型 */
export type Variant = 'solid' | 'outline' | 'ghost' | 'text';

/** 形状类型 */
export type Shape = 'default' | 'round' | 'circle';

/** 方向类型 */
export type Direction = 'horizontal' | 'vertical';

/** 位置类型 */
export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'center';

/** 对齐类型 */
export type Align = 'start' | 'center' | 'end';
```

```typescript
// types/component.ts
import type { CSSProperties, ReactNode, Ref } from 'react';

/** 所有组件的基础 Props */
export interface BaseProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
  /** 测试标识 */
  'data-testid'?: string;
}

/** 可样式化组件的 Props */
export interface StyledProps extends BaseProps {
  /** 尺寸 */
  size?: Size;
  /** 变体 */
  variant?: Variant;
}

/** 可交互组件的 Props */
export interface InteractiveProps extends StyledProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
}

/** 表单项组件的 Props */
export interface FormItemProps<T = string> extends InteractiveProps {
  /** 值 */
  value?: T;
  /** 默认值 */
  defaultValue?: T;
  /** 值变更回调 */
  onChange?: (value: T) => void;
  /** 名称（表单字段名） */
  name?: string;
}

/** 带 Ref 组件的 Props */
export interface RefProps<T> {
  /** 组件引用 */
  ref?: Ref<T>;
}
```

### 2. 组件工厂

```typescript
// utils/createComponent.ts
import React, { forwardRef, memo } from 'react';
import type { ComponentType, ForwardRefRenderFunction, RefAttributes } from 'react';
import { useTheme } from '../hooks/ui/useTheme';
import { usePlatform } from '../hooks/ui/usePlatform';

interface CreateComponentOptions<P, R> {
  /** 组件名称 */
  name: string;
  /** 组件渲染函数 */
  render: ForwardRefRenderFunction<R, P>;
  /** 是否使用 memo */
  memo?: boolean;
  /** 默认 Props */
  defaultProps?: Partial<P>;
}

export function createComponent<P extends object, R = unknown>(
  options: CreateComponentOptions<P, R>
): ComponentType<P & RefAttributes<R>> {
  const { name, render, memo: useMemo = true, defaultProps } = options;

  const ForwardedComponent = forwardRef<R, P>((props, ref) => {
    // 自动注入主题和平台信息
    const theme = useTheme();
    const platform = usePlatform();
    
    // 合并默认 Props
    const mergedProps = { ...defaultProps, ...props } as P;
    
    return render(mergedProps, ref);
  });

  ForwardedComponent.displayName = name;

  if (useMemo) {
    return memo(ForwardedComponent) as ComponentType<P & RefAttributes<R>>;
  }

  return ForwardedComponent as ComponentType<P & RefAttributes<R>>;
}
```

### 3. 样式系统

```typescript
// theme/styles/createStyles.ts
import type { CSSProperties } from 'react';
import type { DesignTokens } from '../tokens';

/** 样式定义 */
export interface StyleDefinition {
  /** 基础样式（继承的通用样式） */
  base?: CSSProperties | CSSProperties[];
  /** 根元素样式 */
  root?: CSSProperties;
  /** 变体样式 */
  variants?: {
    size?: Record<string, CSSProperties>;
    type?: Record<string, CSSProperties>;
    variant?: Record<string, CSSProperties>;
    [key: string]: Record<string, CSSProperties> | undefined;
  };
  /** 状态样式 */
  states?: {
    disabled?: CSSProperties;
    loading?: CSSProperties;
    hover?: CSSProperties;
    active?: CSSProperties;
    focus?: CSSProperties;
  };
}

/** 创建组件样式 */
export function createComponentStyles<T extends StyleDefinition>(
  definition: T | ((tokens: DesignTokens) => T)
): (tokens: DesignTokens, props: Record<string, unknown>) => CSSProperties {
  return (tokens, props) => {
    const styles = typeof definition === 'function' ? definition(tokens) : definition;
    
    // 合并基础样式
    let result: CSSProperties = {};
    
    if (styles.base) {
      const baseStyles = Array.isArray(styles.base) ? styles.base : [styles.base];
      baseStyles.forEach(style => {
        result = { ...result, ...style };
      });
    }
    
    // 合并根样式
    if (styles.root) {
      result = { ...result, ...styles.root };
    }
    
    // 合并变体样式
    if (styles.variants) {
      Object.entries(styles.variants).forEach(([key, variants]) => {
        const propValue = props[key] as string;
        if (propValue && variants && variants[propValue]) {
          result = { ...result, ...variants[propValue] };
        }
      });
    }
    
    // 合并状态样式
    if (styles.states) {
      if (props.disabled && styles.states.disabled) {
        result = { ...result, ...styles.states.disabled };
      }
      if (props.loading && styles.states.loading) {
        result = { ...result, ...styles.states.loading };
      }
    }
    
    return result;
  };
}

/** 合并样式 */
export function mergeStyles(...styles: (CSSProperties | undefined)[]): CSSProperties {
  return styles.reduce<CSSProperties>((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
}

/** 扩展样式 */
export function extendStyles(
  base: CSSProperties,
  extension: CSSProperties
): CSSProperties {
  return { ...base, ...extension };
}
```

### 4. 平台适配器

```typescript
// platform/types.ts
/** 平台类型 */
export type PlatformType = 
  | 'weapp'      // 微信小程序
  | 'alipay'     // 支付宝小程序
  | 'swan'       // 百度小程序
  | 'tt'         // 字节跳动小程序
  | 'qq'         // QQ 小程序
  | 'jd'         // 京东小程序
  | 'h5'         // H5/Web
  | 'rn'         // React Native
  | 'harmony'    // 鸿蒙 OS
  | 'unknown';

/** 平台信息 */
export interface PlatformInfo {
  /** 平台类型 */
  type: PlatformType;
  /** 是否为小程序 */
  isMiniProgram: boolean;
  /** 是否为 H5 */
  isH5: boolean;
  /** 是否为 React Native */
  isRN: boolean;
  /** 是否为鸿蒙 */
  isHarmony: boolean;
  /** 系统信息 */
  system?: {
    brand?: string;
    model?: string;
    platform?: string;
    version?: string;
  };
}
```

```typescript
// platform/detector.ts
import Taro from '@tarojs/taro';
import type { PlatformType, PlatformInfo } from './types';

/** 检测当前平台 */
export function detectPlatform(): PlatformInfo {
  const env = Taro.getEnv();
  
  let type: PlatformType = 'unknown';
  
  switch (env) {
    case Taro.ENV_TYPE.WEAPP:
      type = 'weapp';
      break;
    case Taro.ENV_TYPE.ALIPAY:
      type = 'alipay';
      break;
    case Taro.ENV_TYPE.SWAN:
      type = 'swan';
      break;
    case Taro.ENV_TYPE.TT:
      type = 'tt';
      break;
    case Taro.ENV_TYPE.QQ:
      type = 'qq';
      break;
    case Taro.ENV_TYPE.JD:
      type = 'jd';
      break;
    case Taro.ENV_TYPE.WEB:
      type = 'h5';
      break;
    case Taro.ENV_TYPE.RN:
      type = 'rn';
      break;
    default:
      // 检测鸿蒙
      if (typeof globalThis !== 'undefined' && 'ohosApplication' in globalThis) {
        type = 'harmony';
      }
  }
  
  const isMiniProgram = ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'].includes(type);
  
  return {
    type,
    isMiniProgram,
    isH5: type === 'h5',
    isRN: type === 'rn',
    isHarmony: type === 'harmony',
  };
}
```

### 5. HTTP 客户端

```typescript
// services/types.ts
/** HTTP 方法 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/** 请求配置 */
export interface HttpRequestConfig {
  /** 请求 URL */
  url?: string;
  /** 基础 URL */
  baseURL?: string;
  /** 请求方法 */
  method?: HttpMethod;
  /** 请求数据 */
  data?: Record<string, unknown>;
  /** 请求参数 */
  params?: Record<string, unknown>;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 响应类型 */
  responseType?: 'json' | 'text' | 'arraybuffer';
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 取消信号 */
  signal?: AbortSignal;
  /** 重试次数 */
  retryCount?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 上传进度回调 */
  onUploadProgress?: (percent: number) => void;
  /** 下载进度回调 */
  onDownloadProgress?: (percent: number) => void;
}

/** HTTP 响应 */
export interface HttpResponse<T = unknown> {
  /** 响应数据 */
  data: T;
  /** HTTP 状态码 */
  status: number;
  /** 状态文本 */
  statusText: string;
  /** 响应头 */
  headers: Record<string, string>;
  /** 请求配置 */
  config: HttpRequestConfig;
}

/** HTTP 错误 */
export interface HttpError {
  /** 错误码 */
  code: string;
  /** 错误信息 */
  message: string;
  /** HTTP 状态码 */
  status?: number;
  /** 原始错误 */
  originalError?: unknown;
}
```

```typescript
// services/http-client.ts
import type { HttpRequestConfig, HttpResponse, HttpError } from './types';
import { detectPlatform } from '../platform/detector';
import { createAdapter } from './adapters';

class HttpClient {
  private config: HttpRequestConfig = {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  private adapter = createAdapter(detectPlatform().type);
  
  /** 设置基础 URL */
  setBaseURL(url: string): void {
    this.config.baseURL = url;
  }
  
  /** 设置默认请求头 */
  setHeaders(headers: Record<string, string>): void {
    this.config.headers = { ...this.config.headers, ...headers };
  }
  
  /** 设置超时时间 */
  setTimeout(ms: number): void {
    this.config.timeout = ms;
  }
  
  /** 设置全局配置 */
  setConfig(config: Partial<HttpRequestConfig>): void {
    this.config = { ...this.config, ...config };
  }
  
  /** 创建新实例 */
  create(config?: HttpRequestConfig): HttpClient {
    const instance = new HttpClient();
    if (config) {
      instance.setConfig(config);
    }
    return instance;
  }
  
  /** 创建取消控制器 */
  createAbortController(): AbortController {
    return new AbortController();
  }
  
  /** 发送请求 */
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const mergedConfig = { ...this.config, ...config };
    return this.adapter.request<T>(mergedConfig);
  }
  
  /** GET 请求 */
  async get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'GET' });
    return response.data;
  }
  
  /** POST 请求 */
  async post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'POST', data });
    return response.data;
  }
  
  /** PUT 请求 */
  async put<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'PUT', data });
    return response.data;
  }
  
  /** DELETE 请求 */
  async delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'DELETE' });
    return response.data;
  }
  
  /** PATCH 请求 */
  async patch<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    config?: HttpRequestConfig
  ): Promise<T> {
    const response = await this.request<T>({ ...config, url, method: 'PATCH', data });
    return response.data;
  }
  
  /** 拦截器 */
  interceptors = {
    request: {
      use: (
        onFulfilled?: (config: HttpRequestConfig) => HttpRequestConfig,
        onRejected?: (error: HttpError) => Promise<never>
      ) => {
        // 实现请求拦截器
      },
    },
    response: {
      use: (
        onFulfilled?: <T>(response: HttpResponse<T>) => HttpResponse<T>,
        onRejected?: (error: HttpError) => Promise<never>
      ) => {
        // 实现响应拦截器
      },
    },
  };
}

export const http = new HttpClient();
export default http;
```

## Data Models

### 设计令牌数据模型

```typescript
// theme/tokens.ts
export interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
    neutral: ColorScale;
    text: TextColors;
    background: BackgroundColors;
    border: BorderColors;
  };
  spacing: SpacingScale;
  typography: TypographyTokens;
  borderRadius: BorderRadiusScale;
  boxShadow: BoxShadowScale;
  animation: AnimationTokens;
  zIndex: ZIndexScale;
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
  inverse: string;
  link: string;
}

interface BackgroundColors {
  primary: string;
  secondary: string;
  card: string;
  input: string;
  mask: string;
}

interface BorderColors {
  default: string;
  focus: string;
  error: string;
}
```

### 组件 Props 数据模型

```typescript
// 示例：Button 组件 Props
interface ButtonProps extends InteractiveProps {
  /** 按钮类型 */
  type?: Status;
  /** 按钮形状 */
  shape?: Shape;
  /** 是否块级 */
  block?: boolean;
  /** 图标 */
  icon?: ReactNode;
  /** 图标位置 */
  iconPosition?: 'left' | 'right';
  /** 点击回调 */
  onClick?: (event: TouchEvent) => void;
}

// 示例：Input 组件 Props
interface InputProps extends FormItemProps<string> {
  /** 输入类型 */
  type?: 'text' | 'password' | 'number' | 'tel' | 'email';
  /** 占位符 */
  placeholder?: string;
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 前缀 */
  prefix?: ReactNode;
  /** 后缀 */
  suffix?: ReactNode;
  /** 聚焦回调 */
  onFocus?: () => void;
  /** 失焦回调 */
  onBlur?: () => void;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Design Token Completeness and Consistency

*For any* design token system configuration, all required token categories (colors, spacing, typography, borderRadius, boxShadow, animation, zIndex) SHALL exist and contain valid values that conform to their type definitions.

**Validates: Requirements 1.1, 1.4**

### Property 2: Theme Switching Consistency

*For any* theme configuration and any component, when the theme is switched, all components using design tokens SHALL automatically reflect the new token values without requiring manual updates.

**Validates: Requirements 1.2, 2.2**

### Property 3: Token Deep Merge Correctness

*For any* custom token configuration, when merged with default tokens using deep merge, the result SHALL contain all default values for unspecified paths while correctly overriding specified paths at any depth level.

**Validates: Requirements 1.5**

### Property 4: Style Composition Priority

*For any* component with multiple style sources (base, common, component, variant, user), the final computed style SHALL follow the priority order: base < common < component < variant < user, where higher priority styles override lower priority styles for the same CSS properties.

**Validates: Requirements 2.1.3, 2.3**

### Property 5: Style Merge Idempotence

*For any* set of style objects, calling `mergeStyles(a, b)` followed by `mergeStyles(result, b)` SHALL produce the same result as `mergeStyles(a, b)` (merging the same style twice has no additional effect).

**Validates: Requirements 2.1.4**

### Property 6: Component Factory Standardization

*For any* component created via `createComponent`, the resulting component SHALL have: (1) a valid displayName matching the provided name, (2) forwardRef support, (3) access to theme context, and (4) access to platform context.

**Validates: Requirements 3.1, 3.2, 3.3**

### Property 7: Platform Detection Correctness

*For any* runtime environment, the platform detector SHALL correctly identify the platform type and return accurate platform information (isMiniProgram, isH5, isRN, isHarmony flags).

**Validates: Requirements 4.1**

### Property 8: Platform Adapter Selection

*For any* detected platform, the HTTP client SHALL automatically select and use the correct adapter without user intervention, and all adapters SHALL implement the same interface producing consistent response formats.

**Validates: Requirements 4.2, 13.2**

### Property 9: Unit Conversion Round-Trip

*For any* numeric value and unit type (px, rpx, rem), converting from one unit to another and back SHALL produce a value within acceptable precision tolerance of the original value.

**Validates: Requirements 4.6**

### Property 10: Compound Component State Sharing

*For any* compound component (e.g., Form with Form.Item), child components SHALL have access to parent component state via Context, and state changes in parent SHALL be reflected in all child components.

**Validates: Requirements 6.1, 6.2**

### Property 11: HTTP Client Request-Response Consistency

*For any* HTTP request configuration, the HTTP client SHALL: (1) correctly construct the request URL from baseURL and url, (2) include all specified headers, (3) serialize data correctly based on content type, and (4) return a response matching the HttpResponse<T> type.

**Validates: Requirements 13.3, 13.8**

### Property 12: HTTP Request Cancellation

*For any* in-flight HTTP request with an AbortController, calling `abort()` SHALL cancel the request and reject the promise with an appropriate error, without affecting other concurrent requests.

**Validates: Requirements 13.7**

### Property 13: Type System Completeness

*For any* exported component, hook, or utility function, TypeScript compilation SHALL produce zero errors and zero warnings when used with correct parameters, and SHALL produce type errors when used with incorrect parameters.

**Validates: Requirements 14.1, 14.2, 14.3, 14.4**

### Property 14: Base Props Inheritance

*For any* component Props interface that extends BaseProps, StyledProps, InteractiveProps, or FormItemProps, the component SHALL accept all properties defined in the parent interface without requiring redefinition.

**Validates: Requirements 14.1.2, 14.1.4**

## Error Handling

### HTTP 请求错误处理

```typescript
// services/errors.ts
export class HttpError extends Error {
  code: string;
  status?: number;
  originalError?: unknown;

  constructor(message: string, code: string, status?: number, originalError?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.status = status;
    this.originalError = originalError;
  }
}

// 错误码定义
export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  CANCELLED: 'CANCELLED',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  SERVER_ERROR: 'SERVER_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  UNKNOWN: 'UNKNOWN',
} as const;

// 错误处理函数
export function handleHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }
  
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return new HttpError('Request cancelled', ErrorCodes.CANCELLED);
    }
    if (error.message.includes('timeout')) {
      return new HttpError('Request timeout', ErrorCodes.TIMEOUT);
    }
    if (error.message.includes('network')) {
      return new HttpError('Network error', ErrorCodes.NETWORK_ERROR);
    }
  }
  
  return new HttpError('Unknown error', ErrorCodes.UNKNOWN, undefined, error);
}
```

### 组件错误边界

```typescript
// components/common/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const { fallback } = this.props;
      if (typeof fallback === 'function') {
        return fallback(this.state.error);
      }
      return fallback ?? null;
    }
    return this.props.children;
  }
}
```

### 平台适配错误处理

```typescript
// platform/errors.ts
export class PlatformError extends Error {
  platform: string;
  feature: string;

  constructor(message: string, platform: string, feature: string) {
    super(message);
    this.name = 'PlatformError';
    this.platform = platform;
    this.feature = feature;
  }
}

// 功能降级处理
export function withFallback<T>(
  fn: () => T,
  fallback: T,
  onError?: (error: unknown) => void
): T {
  try {
    return fn();
  } catch (error) {
    onError?.(error);
    return fallback;
  }
}

// 平台功能检测
export function isPlatformFeatureSupported(feature: string): boolean {
  // 根据平台检测功能支持情况
  const platform = detectPlatform();
  const supportMatrix: Record<string, string[]> = {
    weapp: ['storage', 'request', 'navigation'],
    h5: ['storage', 'request', 'navigation', 'clipboard'],
    rn: ['storage', 'request', 'navigation'],
    harmony: ['storage', 'request', 'navigation'],
  };
  
  return supportMatrix[platform.type]?.includes(feature) ?? false;
}
```

## Testing Strategy

### 测试框架配置

- **单元测试**: Vitest + @testing-library/react
- **属性测试**: fast-check
- **覆盖率要求**: 80%+

### 单元测试策略

1. **组件测试**: 测试组件渲染、Props 传递、事件处理
2. **Hook 测试**: 测试状态变化、副作用、返回值
3. **工具函数测试**: 测试输入输出、边界条件
4. **类型测试**: 使用 tsd 测试类型定义

### 属性测试策略

每个属性测试配置最少 100 次迭代，使用 fast-check 库。

```typescript
// 示例：样式合并属性测试
import * as fc from 'fast-check';
import { mergeStyles } from '../theme/styles/createStyles';

describe('mergeStyles', () => {
  // Feature: taro-component-library-optimization, Property 5: Style Merge Idempotence
  it('should be idempotent when merging same style twice', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.hexaString(),
          fontSize: fc.integer({ min: 10, max: 100 }),
        }),
        fc.record({
          backgroundColor: fc.hexaString(),
          padding: fc.integer({ min: 0, max: 50 }),
        }),
        (styleA, styleB) => {
          const result1 = mergeStyles(styleA, styleB);
          const result2 = mergeStyles(result1, styleB);
          expect(result1).toEqual(result2);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### 测试目录结构

```
tests/
├── unit/                      # 单元测试
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
├── integration/               # 集成测试
│   ├── theme/
│   └── platform/
├── property/                  # 属性测试
│   ├── styles.property.test.ts
│   ├── tokens.property.test.ts
│   └── http.property.test.ts
└── setup.ts                   # 测试配置
```
