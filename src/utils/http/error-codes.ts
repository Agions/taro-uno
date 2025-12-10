/**
 * 统一错误码规范
 * 提供完整的错误码定义和错误信息映射
 */

/** 错误码类型 */
export enum ErrorCode {
  // 网络错误
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CANCEL_ERROR = 'CANCEL_ERROR',
  INVALID_URL = 'INVALID_URL',
  INSECURE_URL = 'INSECURE_URL',

  // HTTP状态码错误
  HTTP_400 = 'HTTP_400',
  HTTP_401 = 'HTTP_401',
  HTTP_403 = 'HTTP_403',
  HTTP_404 = 'HTTP_404',
  HTTP_405 = 'HTTP_405',
  HTTP_408 = 'HTTP_408',
  HTTP_409 = 'HTTP_409',
  HTTP_410 = 'HTTP_410',
  HTTP_422 = 'HTTP_422',
  HTTP_429 = 'HTTP_429',
  HTTP_500 = 'HTTP_500',
  HTTP_501 = 'HTTP_501',
  HTTP_502 = 'HTTP_502',
  HTTP_503 = 'HTTP_503',
  HTTP_504 = 'HTTP_504',
  HTTP_505 = 'HTTP_505',

  // 业务逻辑错误
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  INVALID_PARAMS = 'INVALID_PARAMS',
  INVALID_REQUEST = 'INVALID_REQUEST',
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  DATA_CONFLICT = 'DATA_CONFLICT',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  USER_NOT_LOGGED_IN = 'USER_NOT_LOGGED_IN',
  USER_SESSION_EXPIRED = 'USER_SESSION_EXPIRED',
  USER_TOKEN_INVALID = 'USER_TOKEN_INVALID',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',

  // 系统错误
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR = 'DATABASE_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',

  // 安全错误
  SECURITY_ERROR = 'SECURITY_ERROR',
  XSS_ATTACK = 'XSS_ATTACK',
  CSRF_ATTACK = 'CSRF_ATTACK',
  SQL_INJECTION = 'SQL_INJECTION',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // 其他错误
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  FEATURE_DISABLED = 'FEATURE_DISABLED',
}

/** 错误信息映射 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // 网络错误
  [ErrorCode.NETWORK_ERROR]: '网络连接失败，请检查您的网络设置',
  [ErrorCode.TIMEOUT_ERROR]: '请求超时，请稍后重试',
  [ErrorCode.CANCEL_ERROR]: '请求已取消',
  [ErrorCode.INVALID_URL]: '无效的请求地址',
  [ErrorCode.INSECURE_URL]: '不安全的请求地址',

  // HTTP状态码错误
  [ErrorCode.HTTP_400]: '请求参数错误',
  [ErrorCode.HTTP_401]: '未授权访问',
  [ErrorCode.HTTP_403]: '禁止访问',
  [ErrorCode.HTTP_404]: '请求的资源不存在',
  [ErrorCode.HTTP_405]: '不支持的请求方法',
  [ErrorCode.HTTP_408]: '请求超时',
  [ErrorCode.HTTP_409]: '请求冲突',
  [ErrorCode.HTTP_410]: '请求的资源已永久删除',
  [ErrorCode.HTTP_422]: '请求参数验证失败',
  [ErrorCode.HTTP_429]: '请求过于频繁，请稍后重试',
  [ErrorCode.HTTP_500]: '服务器内部错误',
  [ErrorCode.HTTP_501]: '服务器不支持该请求方法',
  [ErrorCode.HTTP_502]: '网关错误',
  [ErrorCode.HTTP_503]: '服务暂时不可用',
  [ErrorCode.HTTP_504]: '网关超时',
  [ErrorCode.HTTP_505]: 'HTTP版本不支持',

  // 业务逻辑错误
  [ErrorCode.BUSINESS_ERROR]: '业务逻辑错误',
  [ErrorCode.INVALID_PARAMS]: '无效的请求参数',
  [ErrorCode.INVALID_REQUEST]: '无效的请求',
  [ErrorCode.DATA_NOT_FOUND]: '请求的数据不存在',
  [ErrorCode.DATA_CONFLICT]: '数据冲突',
  [ErrorCode.PERMISSION_DENIED]: '没有操作权限',
  [ErrorCode.USER_NOT_LOGGED_IN]: '用户未登录',
  [ErrorCode.USER_SESSION_EXPIRED]: '用户会话已过期',
  [ErrorCode.USER_TOKEN_INVALID]: '无效的用户令牌',
  [ErrorCode.INSUFFICIENT_BALANCE]: '余额不足',

  // 系统错误
  [ErrorCode.SYSTEM_ERROR]: '系统错误',
  [ErrorCode.SERVICE_UNAVAILABLE]: '服务不可用',
  [ErrorCode.DATABASE_ERROR]: '数据库错误',
  [ErrorCode.CACHE_ERROR]: '缓存错误',

  // 安全错误
  [ErrorCode.SECURITY_ERROR]: '安全错误',
  [ErrorCode.XSS_ATTACK]: 'XSS攻击检测',
  [ErrorCode.CSRF_ATTACK]: 'CSRF攻击检测',
  [ErrorCode.SQL_INJECTION]: 'SQL注入攻击检测',
  [ErrorCode.INVALID_SIGNATURE]: '无效的签名',
  [ErrorCode.INVALID_CREDENTIALS]: '无效的凭证',

  // 其他错误
  [ErrorCode.UNKNOWN_ERROR]: '未知错误',
  [ErrorCode.UNEXPECTED_ERROR]: '意外错误',
  [ErrorCode.NOT_SUPPORTED]: '不支持的功能',
  [ErrorCode.FEATURE_DISABLED]: '功能已禁用',
};

/** 错误严重程度 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/** 错误严重程度映射 */
export const ERROR_SEVERITY: Record<ErrorCode, ErrorSeverity> = {
  // 网络错误
  [ErrorCode.NETWORK_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorCode.TIMEOUT_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorCode.CANCEL_ERROR]: ErrorSeverity.LOW,
  [ErrorCode.INVALID_URL]: ErrorSeverity.HIGH,
  [ErrorCode.INSECURE_URL]: ErrorSeverity.CRITICAL,

  // HTTP状态码错误
  [ErrorCode.HTTP_400]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_401]: ErrorSeverity.HIGH,
  [ErrorCode.HTTP_403]: ErrorSeverity.HIGH,
  [ErrorCode.HTTP_404]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_405]: ErrorSeverity.HIGH,
  [ErrorCode.HTTP_408]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_409]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_410]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_422]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_429]: ErrorSeverity.MEDIUM,
  [ErrorCode.HTTP_500]: ErrorSeverity.CRITICAL,
  [ErrorCode.HTTP_501]: ErrorSeverity.CRITICAL,
  [ErrorCode.HTTP_502]: ErrorSeverity.CRITICAL,
  [ErrorCode.HTTP_503]: ErrorSeverity.CRITICAL,
  [ErrorCode.HTTP_504]: ErrorSeverity.CRITICAL,
  [ErrorCode.HTTP_505]: ErrorSeverity.CRITICAL,

  // 业务逻辑错误
  [ErrorCode.BUSINESS_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorCode.INVALID_PARAMS]: ErrorSeverity.MEDIUM,
  [ErrorCode.INVALID_REQUEST]: ErrorSeverity.MEDIUM,
  [ErrorCode.DATA_NOT_FOUND]: ErrorSeverity.MEDIUM,
  [ErrorCode.DATA_CONFLICT]: ErrorSeverity.MEDIUM,
  [ErrorCode.PERMISSION_DENIED]: ErrorSeverity.HIGH,
  [ErrorCode.USER_NOT_LOGGED_IN]: ErrorSeverity.HIGH,
  [ErrorCode.USER_SESSION_EXPIRED]: ErrorSeverity.HIGH,
  [ErrorCode.USER_TOKEN_INVALID]: ErrorSeverity.HIGH,
  [ErrorCode.INSUFFICIENT_BALANCE]: ErrorSeverity.MEDIUM,

  // 系统错误
  [ErrorCode.SYSTEM_ERROR]: ErrorSeverity.CRITICAL,
  [ErrorCode.SERVICE_UNAVAILABLE]: ErrorSeverity.CRITICAL,
  [ErrorCode.DATABASE_ERROR]: ErrorSeverity.CRITICAL,
  [ErrorCode.CACHE_ERROR]: ErrorSeverity.HIGH,

  // 安全错误
  [ErrorCode.SECURITY_ERROR]: ErrorSeverity.CRITICAL,
  [ErrorCode.XSS_ATTACK]: ErrorSeverity.CRITICAL,
  [ErrorCode.CSRF_ATTACK]: ErrorSeverity.CRITICAL,
  [ErrorCode.SQL_INJECTION]: ErrorSeverity.CRITICAL,
  [ErrorCode.INVALID_SIGNATURE]: ErrorSeverity.HIGH,
  [ErrorCode.INVALID_CREDENTIALS]: ErrorSeverity.HIGH,

  // 其他错误
  [ErrorCode.UNKNOWN_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorCode.UNEXPECTED_ERROR]: ErrorSeverity.CRITICAL,
  [ErrorCode.NOT_SUPPORTED]: ErrorSeverity.LOW,
  [ErrorCode.FEATURE_DISABLED]: ErrorSeverity.LOW,
};

/** 错误码工具函数 */
export const ErrorCodeUtils = {
  /**
   * 根据HTTP状态码获取对应的错误码
   */
  fromHttpStatus(statusCode: number): ErrorCode {
    switch (statusCode) {
      case 400:
        return ErrorCode.HTTP_400;
      case 401:
        return ErrorCode.HTTP_401;
      case 403:
        return ErrorCode.HTTP_403;
      case 404:
        return ErrorCode.HTTP_404;
      case 405:
        return ErrorCode.HTTP_405;
      case 408:
        return ErrorCode.HTTP_408;
      case 409:
        return ErrorCode.HTTP_409;
      case 410:
        return ErrorCode.HTTP_410;
      case 422:
        return ErrorCode.HTTP_422;
      case 429:
        return ErrorCode.HTTP_429;
      case 500:
        return ErrorCode.HTTP_500;
      case 501:
        return ErrorCode.HTTP_501;
      case 502:
        return ErrorCode.HTTP_502;
      case 503:
        return ErrorCode.HTTP_503;
      case 504:
        return ErrorCode.HTTP_504;
      case 505:
        return ErrorCode.HTTP_505;
      default:
        return ErrorCode.UNKNOWN_ERROR;
    }
  },

  /**
   * 获取错误信息
   */
  getErrorMessage(code: ErrorCode, customMessage?: string): string {
    return customMessage || ERROR_MESSAGES[code] || ERROR_MESSAGES[ErrorCode.UNKNOWN_ERROR];
  },

  /**
   * 获取错误严重程度
   */
  getSeverity(code: ErrorCode): ErrorSeverity {
    return ERROR_SEVERITY[code] || ErrorSeverity.MEDIUM;
  },

  /**
   * 检查错误是否为网络错误
   */
  isNetworkError(code: ErrorCode): boolean {
    return [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.TIMEOUT_ERROR,
      ErrorCode.CANCEL_ERROR,
      ErrorCode.INVALID_URL,
      ErrorCode.INSECURE_URL,
    ].includes(code);
  },

  /**
   * 检查错误是否为认证错误
   */
  isAuthError(code: ErrorCode): boolean {
    return [
      ErrorCode.HTTP_401,
      ErrorCode.HTTP_403,
      ErrorCode.PERMISSION_DENIED,
      ErrorCode.USER_NOT_LOGGED_IN,
      ErrorCode.USER_SESSION_EXPIRED,
      ErrorCode.USER_TOKEN_INVALID,
      ErrorCode.INVALID_CREDENTIALS,
    ].includes(code);
  },

  /**
   * 检查错误是否为系统错误
   */
  isSystemError(code: ErrorCode): boolean {
    return [
      ErrorCode.SYSTEM_ERROR,
      ErrorCode.SERVICE_UNAVAILABLE,
      ErrorCode.DATABASE_ERROR,
      ErrorCode.CACHE_ERROR,
      ErrorCode.UNEXPECTED_ERROR,
    ].includes(code);
  },

  /**
   * 检查错误是否为业务错误
   */
  isBusinessError(code: ErrorCode): boolean {
    return [
      ErrorCode.BUSINESS_ERROR,
      ErrorCode.INVALID_PARAMS,
      ErrorCode.INVALID_REQUEST,
      ErrorCode.DATA_NOT_FOUND,
      ErrorCode.DATA_CONFLICT,
      ErrorCode.INSUFFICIENT_BALANCE,
    ].includes(code);
  },
};

export default {
  ErrorCode,
  ERROR_MESSAGES,
  ErrorSeverity,
  ERROR_SEVERITY,
  ErrorCodeUtils,
};
