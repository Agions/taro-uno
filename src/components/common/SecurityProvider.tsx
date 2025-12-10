import React, { ReactNode, createContext, useContext, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { escapeHTML, sanitizeHTML, setupOWASPHook } from '../../utils/xssProtection';
import { generateSecurityHeaders } from '../../utils/securityHeaders';
import { validateString } from '../../utils/inputValidator';
import { logError } from '../../utils/errorLogger';

// Security Context 类型
interface SecurityContextType {
  sanitizeInput: (value: string, type?: 'html' | 'attribute' | 'json') => string;
  validateInput: (value: string, rules: any) => any;
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

// Security Provider 组件
export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
  cspEnabled = true,
  hstsEnabled = true,
}) => {
  // Sanitize 输入
  const sanitizeInput = (value: string, type: 'html' | 'attribute' | 'json' = 'html') => {
    switch (type) {
      case 'html':
        return sanitizeHTML(value);
      case 'attribute':
        return escapeHTML(value);
      case 'json':
        return sanitizeHTML(value); // 简化，实际可使用 sanitizeJSON
      default:
        return value;
    }
  };

  // 验证输入
  const validateInput = (value: string, rules: any) => {
    return validateString(value, rules);
  };

  // 添加安全头部
  const addSecurityHeaders = (headers: Record<string, string>) => {
    const securityConfig = {
      contentSecurityPolicy: cspEnabled,
      strictTransportSecurity: hstsEnabled,
    };
    const { headers: securityHeaders } = generateSecurityHeaders(securityConfig);
    return { ...headers, ...securityHeaders };
  };

  // 报告错误
  const reportError = (error: Error) => {
    logError(error);
  };

  // 在 Taro.js 环境中，安全头部由统一请求客户端处理
  // 不再需要拦截 window.fetch，因为 Taro.js 使用 Taro.request API

  // 设置OWASP错误钩子
  useEffect(() => {
    setupOWASPHook(logError);
    // 全局钩子，无需组件级清理
  }, []);

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
