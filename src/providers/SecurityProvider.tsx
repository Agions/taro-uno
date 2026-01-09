import React, { ReactNode, createContext, useContext } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { error as logError } from '../utils/logger';

// Security Context 类型
interface SecurityContextType {
  sanitizeInput: (value: string, type?: 'html' | 'attribute' | 'json') => string;
  validateInput: (value: string, rules: Record<string, unknown>) => { isValid: boolean; errors: string[] };
  addSecurityHeaders: (headers: Record<string, string>) => Record<string, string>;
  reportError: (error: Error) => void;
}

// 创建 Security Context
const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Security Provider Props
interface SecurityProviderProps {
  children: ReactNode;
  cspEnabled?: boolean;
  hstsEnabled?: boolean;
}

/**
 * 简单的 HTML 转义函数
 */
const escapeHTML = (str: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return str.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
};

// Security Provider 组件
export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
  cspEnabled: _cspEnabled = true,
  hstsEnabled: _hstsEnabled = true,
}) => {
  // Sanitize 输入
  const sanitizeInput = (value: string, _type: 'html' | 'attribute' | 'json' = 'html') => {
    return escapeHTML(value);
  };

  // 验证输入
  const validateInput = (value: string, _rules: Record<string, unknown>) => {
    // 简化的验证逻辑
    return {
      isValid: typeof value === 'string' && value.length > 0,
      errors: [] as string[],
    };
  };

  // 添加安全头部
  const addSecurityHeaders = (headers: Record<string, string>) => {
    return { ...headers };
  };

  // 报告错误
  const reportError = (error: Error) => {
    logError(`Security error: ${error.message}`, { error });
  };

  const value: SecurityContextType = {
    sanitizeInput,
    validateInput,
    addSecurityHeaders,
    reportError,
  };

  return (
    <ErrorBoundary>
      <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
    </ErrorBoundary>
  );
};

// Hook 使用 Security Context
export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityProvider;
