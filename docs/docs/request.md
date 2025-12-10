# Request 请求库

本页面详细介绍 Taro Uno UI 中 Request 库的使用方法、API 文档和最佳实践，帮助开发者快速上手和高效使用。

## 目录

- [Request 简介](#request-intro)
- [快速开始](#quickstart)
- [核心 API](#core-api)
  - [RequestClient](#requestclient)
  - [useRequest Hook](#userequest-hook)
  - [safeRequest 工具函数](#saverequest)
- [配置选项](#configuration)
  - [请求配置](#request-config)
  - [缓存配置](#cache-config)
  - [重试配置](#retry-config)
- [拦截器](#interceptors)
  - [拦截器基础](#interceptor-basics)
  - [拦截器优先级](#interceptor-priority)
  - [全局拦截器](#global-interceptors)
  - [拦截器分组](#interceptor-groups)
  - [拦截器错误处理](#interceptor-error-handling)
  - [拦截器管理](#interceptor-management)
  - [拦截器最佳实践](#interceptor-best-practices)
- [错误处理](#error-handling)
- [最佳实践](#best-practices)

## Request 简介

Request 是 Taro Uno UI 提供的一个强大的 HTTP 请求库，具有以下特点：

- 🚀 **跨平台兼容**：自动适配微信小程序、H5、React Native 等平台
- 🎯 **类型安全**：完整的 TypeScript 类型定义
- 🎣 **Hooks 支持**：提供 `useRequest` Hook 用于函数组件
- 📦 **智能缓存**：支持请求结果缓存，减少重复请求
- 🔄 **自动重试**：失败请求自动重试，提高请求成功率
- 🎨 **拦截器**：支持请求和响应拦截
- 💪 **安全可靠**：内置 XSS 防护和请求安全检查

## 快速开始

### 安装

Request 库已经包含在 Taro Uno UI 中，无需单独安装。

### 基本使用

#### 使用 RequestClient

```tsx
import { RequestClient } from 'taro-uno-ui';

// 创建 RequestClient 实例
const client = new RequestClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 发送 GET 请求
async function fetchData() {
  try {
    const response = await client.get('/api/data');
    console.log('请求成功:', response);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 发送 POST 请求
async function createData() {
  try {
    const response = await client.post('/api/data', {
      name: '测试数据',
      value: 123,
    });
    console.log('创建成功:', response);
  } catch (error) {
    console.error('创建失败:', error);
  }
}
```

#### 使用 useRequest Hook

```tsx
import { View, Text, Button } from '@tarojs/components';
import { useRequest } from 'taro-uno-ui/hooks';

function DataList() {
  const { data, loading, error, refetch } = useRequest('/api/data', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token123',
    },
  });

  if (loading) {
    return <View>加载中...</View>;
  }

  if (error) {
    return <View>请求失败: {error.message}</View>;
  }

  return (
    <View>
      <Text>数据列表</Text>
      {data?.map((item) => (
        <View key={item.id}>
          <Text>{item.name}: {item.value}</Text>
        </View>
      ))}
      <Button onClick={refetch}>刷新数据</Button>
    </View>
  );
}
```

## 核心 API

### RequestClient

智能 HTTP 客户端，自动适配各平台。

#### 构造函数

```tsx
new RequestClient(config: RequestClientConfig)
```

**配置选项**：

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| baseURL | string | - | API 基础 URL |
| timeout | number | 10000 | 请求超时时间（毫秒） |
| headers | `Record<string, string>` | {} | 默认请求头 |
| credentials | boolean | false | 是否发送凭据 |
| interceptors | RequestInterceptors | - | 请求/响应拦截器 |

#### 方法

##### get

```tsx
client.get<T>(url: string, config?: RequestConfig): Promise<Response<T>>
```

发送 GET 请求。

##### post

```tsx
client.post<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

发送 POST 请求。

##### put

```tsx
client.put<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

发送 PUT 请求。

##### delete

```tsx
client.delete<T>(url: string, config?: RequestConfig): Promise<Response<T>>
```

发送 DELETE 请求。

##### patch

```tsx
client.patch<T>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>>
```

发送 PATCH 请求。

### useRequest Hook

用于函数组件的网络请求 Hook。

#### 基本使用

```tsx
useRequest<T>(url: string, options?: RequestOptions): RequestResult<T>
```

**配置选项**：

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| method | string | 'GET' | 请求方法 |
| headers | `Record<string, string>` | {} | 请求头 |
| params | `Record<string, any>` | {} | URL 查询参数 |
| data | any | - | 请求体数据 |
| cache | boolean | false | 是否启用缓存 |
| retry | number | 0 | 重试次数 |
| onSuccess | (data: T) => void | - | 成功回调 |
| onError | (error: any) => void | - | 错误回调 |

**返回结果**：

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| data | `T \| undefined` | 请求数据 |
| loading | boolean | 是否加载中 |
| error | any | 错误信息 |
| refetch | () => void | 重新请求 |
| mutate | `(data: T) => void` | 手动更新数据 |

### safeRequest 工具函数

安全的请求工具函数，内置 XSS 防护和请求安全检查。

#### 基本使用

```tsx
safeRequest(url: string, options?: RequestOptions): Promise<any>
```

**参数**：
- `url`: 请求 URL
- `options`: 请求选项，与 `useRequest` 相同

**返回值**：
- 请求结果

## 配置选项

### 请求配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| headers | `Record<string, string>` | {} | 请求头 |
| params | `Record<string, any>` | {} | URL 查询参数 |
| data | any | - | 请求体数据 |
| timeout | number | 10000 | 请求超时时间 |
| cache | CacheConfig | - | 缓存配置 |
| retry | RetryConfig | - | 重试配置 |

### 缓存配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| enabled | boolean | false | 是否启用缓存 |
| ttl | number | 3600000 | 缓存过期时间（毫秒） |
| key | string | - | 自定义缓存键 |

### 重试配置

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| enabled | boolean | false | 是否启用重试 |
| count | number | 3 | 重试次数 |
| delay | number | 1000 | 初始延迟时间（毫秒） |
| strategy | 'exponential' \| 'linear' \| 'fixed' | 'exponential' | 重试策略 |

## 拦截器

Request 库支持强大的拦截器功能，可以在请求发送前和响应返回后进行自定义处理。拦截器支持优先级排序、全局拦截器、分组管理和错误处理等高级功能。

### 拦截器基础

#### 基本使用

```tsx
import { RequestClient } from 'taro-uno-ui';

const client = new RequestClient();

// 添加请求拦截器
const requestInterceptor = client.useRequestInterceptor({
  onRequest: (config) => {
    // 在请求发送前添加认证令牌
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  onRequestError: (error) => {
    // 处理请求拦截器执行错误
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  },
});

// 添加响应拦截器
const responseInterceptor = client.useResponseInterceptor({
  onResponse: (response) => {
    // 对响应数据进行统一处理
    if (response.statusCode === 200) {
      return response;
    }
    throw new Error(response.errMsg || '请求失败');
  },
  onResponseError: (error) => {
    // 处理响应错误
    if (error.statusCode === 401) {
      // 处理未授权错误，如跳转到登录页
      // navigateTo({ url: '/pages/login' });
    }
    return Promise.reject(error);
  },
});

// 移除拦截器
requestInterceptor.eject();
responseInterceptor.eject();
```

### 拦截器优先级

拦截器支持优先级设置，优先级高的拦截器会先执行。优先级可以是字符串（'high'、'medium'、'low'）或数字（数值越大优先级越高）。

```tsx
// 高优先级拦截器
client.useRequestInterceptor({
  onRequest: (config) => {
    // 最高优先级，最先执行
    config.headers['X-Request-Id'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return config;
  },
  priority: 'high', // 或者使用数字：priority: 100
});

// 中优先级拦截器（默认）
client.useRequestInterceptor({
  onRequest: (config) => {
    // 中优先级，次执行
    config.headers['X-Authorization'] = `Bearer ${token}`;
    return config;
  },
  priority: 'medium', // 或者使用数字：priority: 50
});

// 低优先级拦截器
client.useRequestInterceptor({
  onRequest: (config) => {
    // 低优先级，最后执行
    console.log('Request:', config.method, config.url);
    return config;
  },
  priority: 'low', // 或者使用数字：priority: 0
});
```

### 全局拦截器

全局拦截器会被所有 RequestClient 实例共享，适用于需要全局统一处理的场景，如认证、日志记录等。

```tsx
import { RequestClient } from 'taro-uno-ui';

// 添加全局请求拦截器
const globalRequestInterceptor = RequestClient.useGlobalRequestInterceptor({
  onRequest: (config) => {
    // 所有请求都会执行此拦截器
    config.headers['X-Global-Header'] = 'global-value';
    return config;
  },
});

// 添加全局响应拦截器
const globalResponseInterceptor = RequestClient.useGlobalResponseInterceptor({
  onResponse: (response) => {
    // 所有响应都会执行此拦截器
    console.log('Global response:', response.statusCode, response.config?.url);
    return response;
  },
});

// 移除全局拦截器
globalRequestInterceptor.eject();
globalResponseInterceptor.eject();

// 清除所有全局拦截器
RequestClient.clearGlobalInterceptors();
```

### 拦截器分组

通过分组可以方便地管理和批量移除相关拦截器，适用于模块化开发场景。

```tsx
// 添加认证相关拦截器
client.useRequestInterceptor({
  onRequest: (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  group: 'auth', // 分组名称
});

client.useResponseInterceptor({
  onResponseError: (error) => {
    if (error.statusCode === 401) {
      // 处理未授权
    }
    return Promise.reject(error);
  },
  group: 'auth', // 同一分组
});

// 添加日志相关拦截器
client.useRequestInterceptor({
  onRequest: (config) => {
    console.log('Request:', config.method, config.url, config.params);
    return config;
  },
  group: 'logger', // 不同分组
});

// 批量移除认证分组的所有拦截器
client.clearInterceptors('auth');

// 清除所有拦截器
client.clearInterceptors();
```

### 拦截器错误处理

拦截器支持错误处理，可以在拦截器执行过程中捕获和处理错误。

```tsx
client.useRequestInterceptor({
  onRequest: (config) => {
    // 模拟拦截器错误
    if (config.url.includes('/error')) {
      throw new Error('Interceptor error');
    }
    return config;
  },
  onRequestError: (error) => {
    // 处理拦截器执行错误
    console.error('Request interceptor error:', error);
    // 可以返回修正后的配置或重新抛出错误
    return Promise.reject(error);
  },
});

client.useResponseInterceptor({
  onResponse: (response) => {
    // 模拟响应拦截器错误
    if (response.data.error) {
      throw new Error('Response data error');
    }
    return response;
  },
  onResponseError: (error) => {
    // 处理响应拦截器执行错误
    console.error('Response interceptor error:', error);
    // 可以返回默认数据或重新抛出错误
    return Promise.reject(error);
  },
});
```

### 拦截器管理

RequestClient 提供了丰富的方法来管理拦截器：

```tsx
// 获取所有拦截器
const interceptors = client.getInterceptors();
console.log('Request interceptors:', interceptors.request);
console.log('Response interceptors:', interceptors.response);

// 获取所有全局拦截器
const globalInterceptors = RequestClient.getGlobalInterceptors();
console.log('Global request interceptors:', globalInterceptors.request);
console.log('Global response interceptors:', globalInterceptors.response);

// 按分组清除拦截器
client.clearInterceptors('auth');

// 清除所有拦截器
client.clearInterceptors();

// 清除所有全局拦截器
RequestClient.clearGlobalInterceptors();

// 按分组清除全局拦截器
RequestClient.clearGlobalInterceptors('logger');
```

### 拦截器最佳实践

1. **认证令牌管理**：
   ```tsx
   // 添加认证令牌
   client.useRequestInterceptor({
     onRequest: (config) => {
       const token = localStorage.getItem('token');
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
       return config;
     },
     priority: 'high',
     group: 'auth',
   });
   
   // 处理令牌过期
   client.useResponseInterceptor({
     onResponseError: async (error) => {
       if (error.statusCode === 401) {
         // 尝试刷新令牌
         try {
           const refreshToken = localStorage.getItem('refreshToken');
           const response = await client.post('/api/refresh-token', { refreshToken });
           const newToken = response.data.token;
           localStorage.setItem('token', newToken);
           // 重试原始请求
           error.config.headers.Authorization = `Bearer ${newToken}`;
           return client.request(error.config);
         } catch (refreshError) {
           // 刷新失败，跳转到登录页
           // navigateTo({ url: '/pages/login' });
           return Promise.reject(refreshError);
         }
       }
       return Promise.reject(error);
     },
     priority: 'high',
     group: 'auth',
   });
   ```

2. **统一错误处理**：
   ```tsx
   client.useResponseInterceptor({
     onResponseError: (error) => {
       const errorMessages = {
         400: '请求参数错误',
         401: '请先登录',
         403: '没有权限访问',
         404: '请求资源不存在',
         500: '服务器内部错误',
       };
       
       const message = errorMessages[error.statusCode] || '请求失败，请稍后重试';
       // 显示错误提示
       // showToast({ title: message, icon: 'error' });
       return Promise.reject({ ...error, message });
     },
     priority: 'medium',
     group: 'error-handler',
   });
   ```

3. **日志记录**：
   ```tsx
   client.useRequestInterceptor({
     onRequest: (config) => {
       console.log('📤 Request:', {
         method: config.method,
         url: config.url,
         params: config.params,
         data: config.data,
       });
       return config;
     },
     priority: 'low',
     group: 'logger',
   });
   
   client.useResponseInterceptor({
     onResponse: (response) => {
       console.log('📥 Response:', {
         url: response.config?.url,
         status: response.statusCode,
         data: response.data,
       });
       return response;
     },
     onResponseError: (error) => {
       console.error('❌ Response Error:', {
         url: error.config?.url,
         status: error.statusCode,
         message: error.message,
       });
       return Promise.reject(error);
     },
     priority: 'low',
     group: 'logger',
   });
   ```

4. **请求取消**：
   ```tsx
   // 使用 AbortController 取消请求
   const controller = new AbortController();
   
   client.request({
     url: '/api/long-request',
     cancelToken: controller.signal,
   }).catch(error => {
     if (error.name === 'CancelError') {
       console.log('Request cancelled');
     }
   });
   
   // 取消请求
   controller.abort();
   ```

5. **多实例隔离**：
   ```tsx
   // 创建不同配置的实例
   const publicClient = new RequestClient({
     baseURL: 'https://api.example.com/public',
   });
   
   const privateClient = new RequestClient({
     baseURL: 'https://api.example.com/private',
   });
   
   // 为私有实例添加认证拦截器
   privateClient.useRequestInterceptor({
     onRequest: (config) => {
       const token = localStorage.getItem('token');
       config.headers.Authorization = `Bearer ${token}`;
       return config;
     },
   });
   ```

## 错误处理

Request 库提供了完善的错误处理机制，帮助开发者快速定位和解决问题。

### 错误类型

- **网络错误**：网络连接失败、超时等
- **HTTP 错误**：HTTP 状态码非 2xx
- **业务错误**：响应数据中的 code 非 200
- **参数错误**：请求参数格式不正确

### 错误处理示例

```tsx
// 使用 try-catch 处理错误
try {
  const response = await client.get('/api/data');
  console.log('请求成功:', response);
} catch (error) {
  if (error instanceof Error) {
    console.error('请求失败:', error.message);
  } else {
    console.error('请求失败:', error);
  }
}

// 使用 Promise.catch 处理错误
client.get('/api/data')
  .then(response => {
    console.log('请求成功:', response);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

## 最佳实践

### 1. 创建单例实例

为了避免重复创建 RequestClient 实例，建议在项目中创建一个单例：

```tsx
// src/utils/request.ts
import { RequestClient } from 'taro-uno-ui';

const client = new RequestClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  interceptors: {
    request: (config) => {
      // 添加认证信息
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  },
});

export default client;

// 在组件中使用
export async function fetchData() {
  return client.get('/api/data');
}
```

### 2. 合理使用缓存

对于不经常变化的数据，建议启用缓存，减少重复请求：

```tsx
const { data, loading } = useRequest('/api/data', {
  cache: true,
  cacheConfig: {
    ttl: 60000, // 缓存 1 分钟
  },
});
```

### 3. 设置合理的重试策略

对于可能暂时失败的请求，建议设置重试策略：

```tsx
const client = new RequestClient({
  retry: {
    enabled: true,
    count: 3,
    delay: 1000,
    strategy: 'exponential',
  },
});
```

### 4. 统一错误处理

建议在拦截器中统一处理错误，避免在每个请求中重复处理：

```tsx
const client = new RequestClient({
  interceptors: {
    response: (response) => {
      if (response.code !== 200) {
        throw new Error(response.message || '请求失败');
      }
      return response.data;
    },
    error: (error) => {
      if (error.response?.status === 401) {
        // 处理未授权错误，如跳转到登录页
        // navigateTo({ url: '/pages/login' });
      }
      return Promise.reject(error);
    },
  },
});
```

### 5. 使用 TypeScript 类型

建议为请求和响应数据定义 TypeScript 类型，提高代码的类型安全性：

```tsx
// 定义响应数据类型
interface DataResponse {
  id: number;
  name: string;
  value: number;
}

// 使用类型
const response = await client.get<DataResponse>('/api/data');
```

## 常见问题

### Q: 如何在微信小程序中使用 Request 库？

A: Request 库会自动适配微信小程序环境，无需额外配置，直接按照上述文档使用即可。

### Q: 如何处理跨域问题？

A: 跨域问题需要在服务器端配置 CORS 头，Request 库本身不处理跨域问题。

### Q: 如何上传文件？

A: Request 库支持文件上传，可以直接将 FormData 对象作为请求体：

```tsx
const formData = new FormData();
formData.append('file', file);

const response = await client.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

### Q: 如何取消请求？

A: Request 库支持请求取消：

```tsx
const controller = new AbortController();

client.get('/api/data', {
  signal: controller.signal,
});

// 取消请求
controller.abort();
```

## 浏览器兼容性

Request 库支持所有现代浏览器和微信小程序：

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- 微信小程序
- React Native



## 相关链接

- [组件文档](/components/basic/button)
- [开发指南](/guides/installation)
- [API 参考](/api/)
