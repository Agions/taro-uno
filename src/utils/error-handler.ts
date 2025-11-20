/**
 * 简单的错误处理工具
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface AppError extends Error {
  type: ErrorType;
  severity: ErrorSeverity;
  code?: string;
  details?: unknown;
}

class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() { }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  createError(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    code?: string,
    details?: unknown
  ): AppError {
    const error = new Error(message) as AppError;
    error.type = type;
    error.severity = severity;
    if (typeof code !== 'undefined') error.code = code;
    if (typeof details !== 'undefined') error.details = details;
    return error;
  }

  createNetworkError(message: string, code?: string): AppError {
    return this.createError(message, ErrorType.NETWORK, ErrorSeverity.HIGH, code);
  }

  createValidationError(message: string, code?: string): AppError {
    return this.createError(message, ErrorType.VALIDATION, ErrorSeverity.LOW, code);
  }

  createAuthorizationError(message: string, code?: string): AppError {
    return this.createError(message, ErrorType.AUTHORIZATION, ErrorSeverity.HIGH, code);
  }

  createServerError(message: string, code?: string): AppError {
    return this.createError(message, ErrorType.SERVER, ErrorSeverity.CRITICAL, code);
  }

  handleError(error: Error | AppError): void {
    if (this.isAppError(error)) {
      console.error(`[${error.type}] ${error.message}`, {
        severity: error.severity,
        code: error.code,
        details: error.details,
      });
    } else {
      console.error('Unexpected error:', error);
    }
  }

  private isAppError(error: unknown): error is AppError {
    return !!error && typeof (error as any).type === 'string' && typeof (error as any).severity === 'string';
  }
}

export const ErrorHandlingManager = ErrorHandler;
export const errorHandler = ErrorHandler.getInstance();
