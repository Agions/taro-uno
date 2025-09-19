import { createContext, useState, useCallback, ReactNode } from 'react';
import type { I18nContextType } from '../types/i18n.types';

/**
 * 国际化上下文
 */
export const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * 国际化 Provider Props
 */
export interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
  fallbackLanguage?: string;
}

/**
 * 国际化 Provider 组件
 */
export function I18nProvider({ 
  children, 
  defaultLanguage = 'zh-CN',
  fallbackLanguage: _fallbackLanguage = 'en-US' 
}: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  /**
   * 初始化国际化
   */
  const initialize = useCallback(async (config?: any): Promise<void> => {
    try {
      // 从 localStorage 获取保存的语言设置
      const savedLanguage = localStorage?.getItem('i18n_language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }

      // 加载默认翻译
      if (config?.translations) {
        setTranslations(config.translations);
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('I18n initialization failed:', error);
      setIsInitialized(false);
    }
  }, []);

  const contextValue: I18nContextType = {
    currentLanguage,
    setCurrentLanguage,
    translations,
    setTranslations,
    isInitialized,
    initialize,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}