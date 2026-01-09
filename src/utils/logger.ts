/**
 * 日志工具
 * 提供统一的日志记录功能，支持开发/生产环境区分
 */

/** 日志级别 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

/** 日志配置 */
export interface LoggerConfig {
  /** 日志级别 */
  level: LogLevel;
  /** 是否启用 */
  enabled: boolean;
  /** 是否显示时间戳 */
  showTimestamp: boolean;
  /** 是否显示日志级别 */
  showLevel: boolean;
  /** 前缀 */
  prefix?: string;
  /** 自定义输出函数 */
  output?: (level: LogLevel, message: string, ...args: unknown[]) => void;
}

/** 日志级别优先级 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

/** 日志级别颜色（用于控制台） */
const LOG_LEVEL_COLORS: Record<Exclude<LogLevel, 'silent'>, string> = {
  debug: '#9E9E9E',
  info: '#2196F3',
  warn: '#FF9800',
  error: '#F44336',
};

/** 日志级别标签 */
const LOG_LEVEL_LABELS: Record<Exclude<LogLevel, 'silent'>, string> = {
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
};

// ==================== Logger 类 ====================

/**
 * 日志记录器类
 */
export class Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      level: this.getDefaultLevel(),
      enabled: true,
      showTimestamp: true,
      showLevel: true,
      ...config,
    };
  }

  /**
   * 获取默认日志级别
   */
  private getDefaultLevel(): LogLevel {
    // 生产环境默认只显示 warn 和 error
    if (process.env['NODE_ENV'] === 'production') {
      return 'warn';
    }
    return 'debug';
  }

  /**
   * 检查是否应该输出日志
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) {
      return false;
    }
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.level];
  }

  /**
   * 格式化时间戳
   */
  private formatTimestamp(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
  }

  /**
   * 构建日志前缀
   */
  private buildPrefix(level: Exclude<LogLevel, 'silent'>): string {
    const parts: string[] = [];

    if (this.config.showTimestamp) {
      parts.push(`[${this.formatTimestamp()}]`);
    }

    if (this.config.showLevel) {
      parts.push(`[${LOG_LEVEL_LABELS[level]}]`);
    }

    if (this.config.prefix) {
      parts.push(`[${this.config.prefix}]`);
    }

    return parts.join(' ');
  }

  /**
   * 输出日志
   */
  private log(level: Exclude<LogLevel, 'silent'>, message: string, ...args: unknown[]): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const prefix = this.buildPrefix(level);
    const fullMessage = prefix ? `${prefix} ${message}` : message;

    // 使用自定义输出函数
    if (this.config.output) {
      this.config.output(level, fullMessage, ...args);
      return;
    }

    // 默认控制台输出
    const color = LOG_LEVEL_COLORS[level];
    const style = `color: ${color}; font-weight: bold;`;

    switch (level) {
      case 'debug':
        console.debug(`%c${fullMessage}`, style, ...args);
        break;
      case 'info':
        console.info(`%c${fullMessage}`, style, ...args);
        break;
      case 'warn':
        console.warn(`%c${fullMessage}`, style, ...args);
        break;
      case 'error':
        console.error(`%c${fullMessage}`, style, ...args);
        break;
    }
  }

  /**
   * 调试日志
   */
  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }

  /**
   * 信息日志
   */
  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  /**
   * 警告日志
   */
  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  /**
   * 错误日志
   */
  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }

  /**
   * 分组日志开始
   */
  group(label: string): void {
    if (!this.config.enabled) return;
    console.group(label);
  }

  /**
   * 折叠分组日志开始
   */
  groupCollapsed(label: string): void {
    if (!this.config.enabled) return;
    console.groupCollapsed(label);
  }

  /**
   * 分组日志结束
   */
  groupEnd(): void {
    if (!this.config.enabled) return;
    console.groupEnd();
  }

  /**
   * 表格日志
   */
  table(data: unknown): void {
    if (!this.config.enabled) return;
    console.table(data);
  }

  /**
   * 计时开始
   */
  time(label: string): void {
    if (!this.config.enabled) return;
    console.time(label);
  }

  /**
   * 计时结束
   */
  timeEnd(label: string): void {
    if (!this.config.enabled) return;
    console.timeEnd(label);
  }

  /**
   * 断言
   */
  assert(condition: boolean, message: string, ...args: unknown[]): void {
    if (!this.config.enabled) return;
    console.assert(condition, message, ...args);
  }

  /**
   * 清空控制台
   */
  clear(): void {
    if (!this.config.enabled) return;
    console.clear();
  }

  /**
   * 计数
   */
  count(label?: string): void {
    if (!this.config.enabled) return;
    console.count(label);
  }

  /**
   * 重置计数
   */
  countReset(label?: string): void {
    if (!this.config.enabled) return;
    console.countReset(label);
  }

  /**
   * 堆栈跟踪
   */
  trace(message?: string): void {
    if (!this.config.enabled) return;
    console.trace(message);
  }

  /**
   * 设置日志级别
   */
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  /**
   * 获取日志级别
   */
  getLevel(): LogLevel {
    return this.config.level;
  }

  /**
   * 启用日志
   */
  enable(): void {
    this.config.enabled = true;
  }

  /**
   * 禁用日志
   */
  disable(): void {
    this.config.enabled = false;
  }

  /**
   * 设置配置
   */
  setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取配置
   */
  getConfig(): LoggerConfig {
    return { ...this.config };
  }

  /**
   * 创建子日志记录器
   */
  createChild(prefix: string): Logger {
    const parentPrefix = this.config.prefix;
    const newPrefix = parentPrefix ? `${parentPrefix}:${prefix}` : prefix;
    return new Logger({ ...this.config, prefix: newPrefix });
  }
}

// ==================== 默认实例 ====================

/** 默认日志记录器实例 */
export const logger = new Logger();

// ==================== 便捷函数 ====================

/**
 * 调试日志
 */
export function debug(message: string, ...args: unknown[]): void {
  logger.debug(message, ...args);
}

/**
 * 信息日志
 */
export function info(message: string, ...args: unknown[]): void {
  logger.info(message, ...args);
}

/**
 * 警告日志
 */
export function warn(message: string, ...args: unknown[]): void {
  logger.warn(message, ...args);
}

/**
 * 错误日志
 */
export function error(message: string, ...args: unknown[]): void {
  logger.error(message, ...args);
}

/**
 * 创建带前缀的日志记录器
 *
 * @example
 * ```typescript
 * const log = createLogger('MyComponent');
 * log.info('Component mounted');
 * ```
 */
export function createLogger(prefix: string, config?: Partial<LoggerConfig>): Logger {
  return new Logger({ ...config, prefix });
}

/**
 * 性能日志
 * 用于测量代码执行时间
 *
 * @example
 * ```typescript
 * const end = perfLog('fetchData');
 * await fetchData();
 * end(); // 输出: fetchData: 123ms
 * ```
 */
export function perfLog(label: string): () => void {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    logger.debug(`${label}: ${duration.toFixed(2)}ms`);
  };
}

/**
 * 条件日志
 * 仅在条件为真时输出日志
 *
 * @example
 * ```typescript
 * logIf(isDebug, 'info', 'Debug mode enabled');
 * ```
 */
export function logIf(
  condition: boolean,
  level: Exclude<LogLevel, 'silent'>,
  message: string,
  ...args: unknown[]
): void {
  if (condition) {
    logger[level](message, ...args);
  }
}

/**
 * 仅在开发环境输出日志
 */
export function devLog(message: string, ...args: unknown[]): void {
  if (process.env['NODE_ENV'] !== 'production') {
    logger.debug(message, ...args);
  }
}

/**
 * 仅在生产环境输出日志
 */
export function prodLog(message: string, ...args: unknown[]): void {
  if (process.env['NODE_ENV'] === 'production') {
    logger.info(message, ...args);
  }
}

// ==================== 默认导出 ====================

export default logger;
