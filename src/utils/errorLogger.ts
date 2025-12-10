/**
 * 错误日志记录工具
 * 提供统一的错误记录和上报功能
 */

import { safeLocalStorage } from './environment';

interface ErrorLog {
  timestamp: string;
  message: string;
  stack?: string | undefined;
  componentStack?: string | null | undefined;
  type: 'error' | 'warning' | 'info';
  userAgent?: string | undefined;
  url?: string | undefined;
  userId?: string | undefined;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // 最大日志数量

  /**
   * 记录错误
   * @param error 错误对象
   * @param errorInfo React错误信息
   * @param type 日志类型
   */
  log(error: Error, errorInfo?: React.ErrorInfo, type: ErrorLog['type'] = 'error'): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack || undefined,
      type,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userId: this.getUserId(),
    };

    this.addLog(errorLog);
    this.reportToServer(errorLog);
  }

  /**
   * 记录普通消息
   * @param message 消息内容
   * @param type 日志类型
   */
  logMessage(message: string, type: ErrorLog['type'] = 'info'): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      message,
      type,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userId: this.getUserId(),
    };

    this.addLog(errorLog);

    // 只上报错误和警告
    if (type === 'error' || type === 'warning') {
      this.reportToServer(errorLog);
    }
  }

  /**
   * 添加日志到本地存储
   * @param log 日志对象
   */
  private addLog(log: ErrorLog): void {
    this.logs.push(log);

    // 限制日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // 保存到本地存储
    this.saveToLocalStorage();
  }

  /**
   * 保存日志到本地存储
   */
  private saveToLocalStorage(): void {
    try {
      safeLocalStorage.setItem('taro-uno-error-logs', JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Failed to save error logs to localStorage:', e);
    }
  }

  /**
   * 从本地存储加载日志
   */
  private loadFromLocalStorage(): void {
    try {
      const savedLogs = safeLocalStorage.getItem('taro-uno-error-logs');
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs);
      }
    } catch (e) {
      console.warn('Failed to load error logs from localStorage:', e);
    }
  }

  /**
   * 上报错误到服务器
   * @param log 日志对象
   */
  private async reportToServer(log: ErrorLog): Promise<void> {
    // 在开发环境下，只打印到控制台
    if (process.env['NODE_ENV'] === 'development') {
      console.log(`[ErrorLogger] ${log.type.toUpperCase()}:`, log);
      return;
    }

    // 生产环境下，上报到服务器
    try {
      // TODO: 替换为实际的错误上报API
      // await fetch('/api/error-logs', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(log),
      // });
    } catch (e) {
      console.warn('Failed to report error to server:', e);
    }
  }

  /**
   * 获取用户ID（如果有）
   */
  private getUserId(): string | undefined {
    // TODO: 从用户状态或认证系统中获取用户ID
    return undefined;
  }

  /**
   * 获取所有日志
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * 清除所有日志
   */
  clearLogs(): void {
    this.logs = [];
    safeLocalStorage.removeItem('taro-uno-error-logs');
  }

  /**
   * 初始化错误日志记录器
   */
  init(): void {
    // 加载本地存储的日志
    this.loadFromLocalStorage();

    // 监听全局未捕获的错误
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.log(event.error, undefined, 'error');
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.log(new Error(event.reason), undefined, 'error');
      });
    }
  }
}

// 创建单例实例
const errorLogger = new ErrorLogger();

// 导出单例和便捷方法
export const logError = (error: Error, errorInfo?: React.ErrorInfo) => errorLogger.log(error, errorInfo);
export const logWarning = (message: string) => errorLogger.logMessage(message, 'warning');
export const logInfo = (message: string) => errorLogger.logMessage(message, 'info');
export const getErrorLogs = () => errorLogger.getLogs();
export const clearErrorLogs = () => errorLogger.clearLogs();

// 初始化错误日志记录器
if (typeof window !== 'undefined') {
  errorLogger.init();
}

export default errorLogger;
