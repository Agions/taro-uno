# 接口请求文档

本模块详细记录了项目中所有API接口的请求方法、URL地址、请求参数、响应格式、错误码说明及示例请求/响应数据，方便开发者查阅和使用。

## 目录

- [接口基础信息](#接口基础信息)
- [认证与授权](#认证与授权)
- [通用响应格式](#通用响应格式)
- [错误码说明](#错误码说明)
- [接口列表](#接口列表)
  - [用户相关接口](#用户相关接口)
  - [商品相关接口](#商品相关接口)
  - [订单相关接口](#订单相关接口)
  - [支付相关接口](#支付相关接口)

## 接口基础信息

### 基础URL

- **开发环境**：`https://api-dev.example.com`
- **测试环境**：`https://api-test.example.com`
- **生产环境**：`https://api.example.com`

### 请求方法

支持的HTTP请求方法：
- `GET`：用于获取资源
- `POST`：用于创建资源
- `PUT`：用于更新资源
- `DELETE`：用于删除资源
- `PATCH`：用于部分更新资源

### 请求头

所有请求必须包含以下请求头：

| 请求头字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `Content-Type` | `string` | 是 | 请求体类型，如 `application/json` |
| `Authorization` | `string` | 否 | 认证令牌，格式为 `Bearer {token}` |
| `X-Request-ID` | `string` | 否 | 请求ID，用于跟踪请求 |

## 认证与授权

### 认证方式

项目使用 JWT (JSON Web Token) 进行认证和授权：

1. 用户登录后，服务器返回 `access_token` 和 `refresh_token`
2. 访问需要认证的接口时，在请求头中携带 `Authorization: Bearer {access_token}`
3. 当 `access_token` 过期时，使用 `refresh_token` 重新获取 `access_token`

### 登录接口

**接口地址**：`/api/auth/login`

**请求方法**：`POST`

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `username` | `string` | 是 | 用户名 |
| `password` | `string` | 是 | 密码 |

**响应示例**：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "username": "test",
      "nickname": "测试用户",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

## 通用响应格式

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": { /* 响应数据 */ },
  "timestamp": 1620000000000
}
```

### 失败响应

```json
{
  "code": 400,
  "message": "操作失败",
  "errors": [ /* 错误信息数组 */ ],
  "timestamp": 1620000000000
}
```

## 错误码说明

### 通用错误码

| 错误码 | 描述 | 解决方案 |
| --- | --- | --- |
| 200 | 成功 | 操作成功 |
| 400 | 请求参数错误 | 检查请求参数是否符合要求 |
| 401 | 未授权 | 检查认证令牌是否有效 |
| 403 | 禁止访问 | 检查用户是否有操作权限 |
| 404 | 资源不存在 | 检查请求URL是否正确 |
| 500 | 服务器内部错误 | 联系开发人员 |
| 502 | 网关错误 | 联系运维人员 |
| 503 | 服务不可用 | 稍后重试 |
| 504 | 网关超时 | 稍后重试 |

### 业务错误码

| 错误码 | 描述 | 解决方案 |
| --- | --- | --- |
| 10001 | 用户名或密码错误 | 检查用户名和密码是否正确 |
| 10002 | 验证码错误 | 检查验证码是否正确 |
| 10003 | 用户已存在 | 更换用户名 |
| 10004 | 商品库存不足 | 减少购买数量或更换商品 |
| 10005 | 订单不存在 | 检查订单ID是否正确 |
| 10006 | 支付失败 | 检查支付信息是否正确 |

## 接口列表

### 用户相关接口

#### 获取用户信息

**接口地址**：`/api/user/info`

**请求方法**：`GET`

**认证要求**：是

**请求参数**：无

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": 1,
    "username": "test",
    "nickname": "测试用户",
    "avatar": "https://example.com/avatar.jpg",
    "email": "test@example.com",
    "phone": "13800138000",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  "timestamp": 1620000000000
}
```

#### 更新用户信息

**接口地址**：`/api/user/update`

**请求方法**：`PUT`

**认证要求**：是

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `nickname` | `string` | 否 | 用户昵称 |
| `avatar` | `string` | 否 | 用户头像URL |
| `email` | `string` | 否 | 用户邮箱 |
| `phone` | `string` | 否 | 用户手机号 |

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": 1,
    "username": "test",
    "nickname": "新昵称",
    "avatar": "https://example.com/new-avatar.jpg",
    "email": "new@example.com",
    "phone": "13800138001",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  },
  "timestamp": 1620000000000
}
```

### 商品相关接口

#### 获取商品列表

**接口地址**：`/api/products`

**请求方法**：`GET`

**认证要求**：否

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 页码，默认1 |
| `page_size` | `number` | 否 | 每页数量，默认10 |
| `category_id` | `number` | 否 | 分类ID |
| `keyword` | `string` | 否 | 搜索关键词 |
| `sort_by` | `string` | 否 | 排序字段，如 `price`、`sales` |
| `sort_order` | `string` | 否 | 排序方式，`asc` 或 `desc` |

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "商品名称",
        "description": "商品描述",
        "price": 99.99,
        "original_price": 129.99,
        "stock": 100,
        "sales": 1000,
        "category_id": 1,
        "category_name": "商品分类",
        "images": ["https://example.com/image1.jpg"],
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "page_size": 10,
    "total_pages": 10
  },
  "timestamp": 1620000000000
}
```

#### 获取商品详情

**接口地址**：`/api/products/{id}`

**请求方法**：`GET`

**认证要求**：否

**路径参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `id` | `number` | 是 | 商品ID |

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": 1,
    "name": "商品名称",
    "description": "商品描述",
    "price": 99.99,
    "original_price": 129.99,
    "stock": 100,
    "sales": 1000,
    "category_id": 1,
    "category_name": "商品分类",
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "specs": [
      {
        "id": 1,
        "name": "颜色",
        "value": "红色"
      },
      {
        "id": 2,
        "name": "尺寸",
        "value": "M"
      }
    ],
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  "timestamp": 1620000000000
}
```

### 订单相关接口

#### 创建订单

**接口地址**：`/api/orders`

**请求方法**：`POST`

**认证要求**：是

**请求参数**：

```json
{
  "address_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 99.99,
      "spec_id": 1
    }
  ],
  "total_amount": 99.99,
  "payment_method": "wechat_pay"
}
```

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "order_id": "ORD2023010100000001",
    "status": "pending",
    "total_amount": 99.99,
    "payment_method": "wechat_pay",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "timestamp": 1620000000000
}
```

#### 获取订单列表

**接口地址**：`/api/orders`

**请求方法**：`GET`

**认证要求**：是

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `page` | `number` | 否 | 页码，默认1 |
| `page_size` | `number` | 否 | 每页数量，默认10 |
| `status` | `string` | 否 | 订单状态，如 `pending`、`paid`、`shipped`、`delivered`、`cancelled` |

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "order_id": "ORD2023010100000001",
        "status": "paid",
        "total_amount": 99.99,
        "payment_method": "wechat_pay",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:01:00Z",
        "items": [
          {
            "product_id": 1,
            "product_name": "商品名称",
            "quantity": 1,
            "price": 99.99,
            "image": "https://example.com/image1.jpg"
          }
        ]
      }
    ],
    "total": 10,
    "page": 1,
    "page_size": 10,
    "total_pages": 1
  },
  "timestamp": 1620000000000
}
```

### 支付相关接口

#### 发起支付

**接口地址**：`/api/payments`

**请求方法**：`POST`

**认证要求**：是

**请求参数**：

```json
{
  "order_id": "ORD2023010100000001",
  "amount": 99.99,
  "payment_method": "wechat_pay",
  "platform": "miniprogram" // 可选值：miniprogram, h5, app
}
```

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "payment_id": "PAY2023010100000001",
    "order_id": "ORD2023010100000001",
    "amount": 99.99,
    "payment_method": "wechat_pay",
    "status": "pending",
    "pay_url": "weixin://wxpay/bizpayurl?pr=...",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "timestamp": 1620000000000
}
```

#### 查询支付状态

**接口地址**：`/api/payments/{payment_id}`

**请求方法**：`GET`

**认证要求**：是

**路径参数**：

| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `payment_id` | `string` | 是 | 支付ID |

**响应示例**：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "payment_id": "PAY2023010100000001",
    "order_id": "ORD2023010100000001",
    "amount": 99.99,
    "payment_method": "wechat_pay",
    "status": "paid",
    "paid_at": "2023-01-01T00:01:00Z",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:01:00Z"
  },
  "timestamp": 1620000000000
}
```
