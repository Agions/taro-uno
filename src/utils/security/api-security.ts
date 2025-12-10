/**
 * API安全工具函数
 * 提供请求拦截、签名机制和敏感数据脱敏功能
 */

// 安全配置
const API_SECURITY_CONFIG = {
  // 签名密钥
  SIGNATURE_KEY: process.env['VITE_API_SIGNATURE_KEY'] || 'taro-uno-signature-key',
  // 请求超时时间
  TIMEOUT: 30000,
  // 最大重试次数
  MAX_RETRIES: 3,
  // 敏感字段列表
  SENSITIVE_FIELDS: [
    'password',
    'password_confirmation',
    'current_password',
    'new_password',
    'credit_card',
    'card_number',
    'cvv',
    'expiry',
    'ssn',
    'social_security',
    'phone',
    'mobile',
    'email',
    'id_card',
    'idcard',
    'token',
    'secret',
    'api_key',
    'private_key',
    'authorization',
    'cookie',
    'session',
  ],
  // 需要签名的请求方法
  SIGNATURE_METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
  // 请求头白名单
  ALLOWED_HEADERS: [
    'content-type',
    'authorization',
    'x-requested-with',
    'x-api-key',
    'x-timestamp',
    'x-signature',
    'x-device-id',
    'x-platform',
    'x-version',
  ],
};

// 脱敏配置
const MASK_CONFIG = {
  // 邮箱脱敏
  email: (email: string) => {
    if (!email || !email.includes('@')) return email;
    const [localPart = '', domain = ''] = email.split('@');
    const maskedLocal =
      localPart.length > 3
        ? localPart.slice(0, 2) + '*'.repeat(localPart.length - 2)
        : (localPart[0] ?? '') + '*'.repeat(Math.max(localPart.length - 1, 0));
    return maskedLocal + (domain ? '@' + domain : '');
  },

  // 手机号脱敏
  phone: (phone: string) => {
    if (!phone || phone.length < 7) return phone;
    return phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3);
  },

  // 身份证脱敏
  idCard: (idCard: string) => {
    if (!idCard || idCard.length < 8) return idCard;
    return idCard.slice(0, 4) + '*'.repeat(idCard.length - 7) + idCard.slice(-3);
  },

  // 信用卡脱敏
  creditCard: (cardNumber: string) => {
    if (!cardNumber || cardNumber.length < 8) return cardNumber;
    return cardNumber.slice(0, 4) + '*'.repeat(cardNumber.length - 7) + cardNumber.slice(-3);
  },

  // 通用字符串脱敏
  default: (str: string, visibleStart = 2, visibleEnd = 2) => {
    if (!str || str.length <= visibleStart + visibleEnd) return str;
    return str.slice(0, visibleStart) + '*'.repeat(str.length - visibleStart - visibleEnd) + str.slice(-visibleEnd);
  },
};

/**
 * 生成请求签名
 */
export const generateSignature = (method: string, url: string, data: any, timestamp: number): string => {
  const dataStr = JSON.stringify(data || {});
  const signString = `${method.toUpperCase()}|${url}|${dataStr}|${timestamp}|${API_SECURITY_CONFIG.SIGNATURE_KEY}`;

  // 简单的签名算法（实际项目中应使用更安全的算法）
  let hash = 0;
  for (let i = 0; i < signString.length; i++) {
    const char = signString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }

  return Math.abs(hash).toString(16);
};

/**
 * 验证请求签名
 */
export const verifySignature = (
  method: string,
  url: string,
  data: any,
  timestamp: number,
  signature: string,
): boolean => {
  const expectedSignature = generateSignature(method, url, data, timestamp);
  return expectedSignature === signature;
};

/**
 * 检查请求是否过期
 */
export const isRequestExpired = (timestamp: number, maxAge: number = 300000): boolean => {
  const now = Date.now();
  return now - timestamp > maxAge; // 默认5分钟过期
};

/**
 * 敏感数据脱敏
 */
export const maskSensitiveData = (data: any, customMaskFields?: string[]): any => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sensitiveFields = [...API_SECURITY_CONFIG.SENSITIVE_FIELDS, ...(customMaskFields || [])];

  if (Array.isArray(data)) {
    return data.map((item) => maskSensitiveData(item, customMaskFields));
  }

  const masked: any = {};

  for (const [key, value] of Object.entries(data)) {
    const isSensitive = sensitiveFields.some((field) => key.toLowerCase().includes(field.toLowerCase()));

    if (isSensitive) {
      // 根据字段类型选择合适的脱敏方式
      if (key.toLowerCase().includes('email')) {
        masked[key] = MASK_CONFIG.email(String(value));
      } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')) {
        masked[key] = MASK_CONFIG.phone(String(value));
      } else if (key.toLowerCase().includes('idcard') || key.toLowerCase().includes('id_card')) {
        masked[key] = MASK_CONFIG.idCard(String(value));
      } else if (key.toLowerCase().includes('card') || key.toLowerCase().includes('credit')) {
        masked[key] = MASK_CONFIG.creditCard(String(value));
      } else {
        masked[key] = MASK_CONFIG.default(String(value), 2, 2);
      }
    } else if (typeof value === 'object' && value !== null) {
      masked[key] = maskSensitiveData(value, customMaskFields);
    } else {
      masked[key] = value;
    }
  }

  return masked;
};

/**
 * 安全的请求头构建
 */
export const buildSecureHeaders = (method: string, url: string, data?: any): Record<string, string> => {
  const timestamp = Date.now();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Timestamp': timestamp.toString(),
    'X-Device-ID': getDeviceId(),
    'X-Platform': getPlatform(),
    'X-Version': process.env['npm_package_version'] || '1.0.0',
  };

  // 对特定请求方法添加签名
  if (API_SECURITY_CONFIG.SIGNATURE_METHODS.includes(method.toUpperCase())) {
    const signature = generateSignature(method, url, data, timestamp);
    headers['X-Signature'] = signature;
  }

  return headers;
};

/**
 * 验证请求头安全性
 */
export const validateHeaders = (headers: Record<string, string>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // 检查必要的时间戳
  if (!headers['x-timestamp']) {
    errors.push('Missing X-Timestamp header');
  } else {
    const timestamp = parseInt(headers['x-timestamp']);
    if (isRequestExpired(timestamp)) {
      errors.push('Request timestamp expired');
    }
  }

  // 检查签名（如果存在）
  if (headers['x-signature']) {
    // 这里可以添加签名验证逻辑
    // 需要原始请求数据才能验证
  }

  // 检查是否包含不允许的头部
  const headerKeys = Object.keys(headers).map((key) => key.toLowerCase());
  const disallowedHeaders = headerKeys.filter(
    (key) =>
      !API_SECURITY_CONFIG.ALLOWED_HEADERS.includes(key) &&
      !key.startsWith('x-') &&
      !key.startsWith('content-') &&
      key !== 'authorization',
  );

  if (disallowedHeaders.length > 0) {
    errors.push(`Disallowed headers: ${disallowedHeaders.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * API请求拦截器
 */
export const createApiInterceptor = () => {
  const requestInterceptors: Array<(config: any) => any> = [];
  const responseInterceptors: Array<(response: any) => any> = [];

  // 添加安全请求拦截器
  requestInterceptors.push((config) => {
    // 添加安全头部
    const secureHeaders = buildSecureHeaders(config.method, config.url, config.data);
    config.headers = { ...config.headers, ...secureHeaders };

    // 脱敏敏感数据
    if (config.data) {
      config.data = maskSensitiveData(config.data);
    }

    return config;
  });

  // 添加安全响应拦截器
  responseInterceptors.push((response) => {
    // 脱敏响应中的敏感数据
    if (response.data) {
      response.data = maskSensitiveData(response.data);
    }

    return response;
  });

  return {
    request: {
      use: (interceptor: (config: any) => any) => {
        requestInterceptors.push(interceptor);
      },
      execute: (config: any) => {
        return requestInterceptors.reduce((acc, interceptor) => interceptor(acc), config);
      },
    },
    response: {
      use: (interceptor: (response: any) => any) => {
        responseInterceptors.push(interceptor);
      },
      execute: (response: any) => {
        return responseInterceptors.reduce((acc, interceptor) => interceptor(acc), response);
      },
    },
  };
};

/**
 * 获取设备ID
 */
const getDeviceId = (): string => {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  } else if (typeof process !== 'undefined' && process.env['TARO_ENV']) {
    // 小程序环境
    return 'mini_' + process.env['TARO_ENV'] + '_' + Math.random().toString(36).substr(2, 9);
  }
  return 'unknown_device';
};

/**
 * 获取平台信息
 */
const getPlatform = (): string => {
  if (typeof process !== 'undefined' && process.env['TARO_ENV']) {
    return process.env['TARO_ENV'];
  } else if (typeof window !== 'undefined') {
    return 'h5';
  }
  return 'unknown';
};

/**
 * 检查URL安全性
 */
export const isSecureUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    // 只允许HTTPS和相对路径
    if (parsedUrl.protocol === 'https:') return true;
    if (
      parsedUrl.protocol === 'http:' &&
      (parsedUrl.hostname === 'localhost' ||
        parsedUrl.hostname.startsWith('127.0.0.1') ||
        parsedUrl.hostname.startsWith('192.168.'))
    ) {
      return true;
    }

    return false;
  } catch {
    // 相对路径可能是安全的
    return url.startsWith('/') || !url.includes('://');
  }
};

/**
 * 安全的请求重试机制
 */
export const secureRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = API_SECURITY_CONFIG.MAX_RETRIES,
  delay: number = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // 如果是认证错误或权限错误，不重试
      if (
        error instanceof Error &&
        (error.message.includes('401') ||
          error.message.includes('403') ||
          error.message.includes('Unauthorized') ||
          error.message.includes('Forbidden'))
      ) {
        throw error;
      }

      if (i < maxRetries) {
        // 指数退避
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError!;
};

// 默认导出
export default {
  generateSignature,
  verifySignature,
  maskSensitiveData,
  buildSecureHeaders,
  validateHeaders,
  createApiInterceptor,
  isSecureUrl,
  secureRetry,
  MASK_CONFIG,
};
