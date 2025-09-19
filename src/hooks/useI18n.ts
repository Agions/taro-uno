import { useContext } from 'react';
import type { I18nHook } from '../types/i18n.types';
import { I18nContext } from '../context/I18nContext';

/**
 * 国际化 Hook
 */
export function useI18n(): I18nHook {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  const { 
    currentLanguage, 
    setCurrentLanguage, 
    translations, 
    setTranslations,
    isInitialized,
    initialize 
  } = context;

  /**
   * 翻译函数
   */
  const t = (key: string, params?: Record<string, any>): string => {
    const translation = translations[currentLanguage]?.[key] || key;
    
    if (!params) {
      return translation;
    }
    
    return Object.keys(params).reduce((result, paramKey) => {
      return result.replace(`{{${paramKey}}}`, String(params[paramKey]));
    }, translation);
  };

  /**
   * 切换语言
   */
  const switchLanguage = async (language: string): Promise<void> => {
    setCurrentLanguage(language);
    // 可以在这里添加持久化逻辑
    localStorage?.setItem('i18n_language', language);
  };

  /**
   * 获取当前语言
   */
  const getCurrentLanguage = (): string => currentLanguage;

  /**
   * 检查是否已初始化
   */
  const getIsInitialized = (): boolean => isInitialized;

  /**
   * 添加翻译
   */
  const addTranslations = (language: string, newTranslations: Record<string, string>): void => {
    setTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        ...newTranslations
      }
    }));
  };

  return {
    t,
    currentLanguage,
    switchLanguage,
    getCurrentLanguage,
    getIsInitialized,
    addTranslations,
    translations,
    initialize
  };
}