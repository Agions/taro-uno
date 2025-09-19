/**
 * 支持的语言类型
 */
export type SupportedLanguage = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'fr-FR' | 'de-DE' | 'es-ES' | 'pt-BR';

/**
 * 语言配置接口
 */
export interface LanguageConfig {
  /** 语言代码 */
  code: SupportedLanguage;
  /** 语言名称（原生） */
  name: string;
  /** 语言名称（英文） */
  englishName: string;
  /** 语言标志 */
  flag: string;
  /** 是否为RTL语言 */
  rtl: boolean;
  /** 默认字体 */
  fontFamily: string;
  /** 日期格式 */
  dateFormat: string;
  /** 时间格式 */
  timeFormat: string;
  /** 货币代码 */
  currency: string;
  /** 数字格式 */
  numberFormat: Intl.NumberFormatOptions;
}

/**
 * 翻译资源类型
 */
export type TranslationResource = Record<string, Record<string, string>>;

/**
 * 国际化配置
 */
export interface I18nConfig {
  /** 支持的语言列表 */
  supportedLanguages?: SupportedLanguage[];
  /** 默认语言 */
  defaultLanguage?: SupportedLanguage;
  /** 回退语言 */
  fallbackLanguage?: SupportedLanguage;
  /** 翻译资源 */
  translations?: TranslationResource;
  /** 调试模式 */
  debug?: boolean;
  /** 语言检测 */
  detection?: boolean;
  /** 语言配置 */
  languageConfigs?: Record<SupportedLanguage, LanguageConfig>;
  /** 命名空间支持 */
  namespaces?: boolean;
  /** 命名空间列表 */
  namespaceList?: string[];
  /** 资源加载策略 */
  resourcesLoadStrategy?: 'eager' | 'lazy';
  /** 缓存策略 */
  cacheStrategy?: 'localStorage' | 'sessionStorage' | 'memory';
  /** 插件配置 */
  plugins?: {
    languageDetector?: boolean;
    backend?: boolean;
    resourcesBackend?: boolean;
  };
}

/**
 * 国际化上下文类型
 */
export interface I18nContextType {
  /** 当前语言 */
  currentLanguage: string;
  /** 设置当前语言 */
  setCurrentLanguage: (language: string) => void;
  /** 翻译资源 */
  translations: TranslationResource;
  /** 设置翻译资源 */
  setTranslations: (translations: TranslationResource | ((prev: TranslationResource) => TranslationResource)) => void;
  /** 是否已初始化 */
  isInitialized: boolean;
  /** 初始化方法 */
  initialize: (config?: I18nConfig) => Promise<void>;
}

/**
 * 国际化 Hook 返回类型
 */
export interface I18nHook {
  /** 翻译函数 */
  t: (key: string, params?: Record<string, any>) => string;
  /** 当前语言 */
  currentLanguage: string;
  /** 切换语言 */
  switchLanguage: (language: string) => Promise<void>;
  /** 获取当前语言 */
  getCurrentLanguage: () => string;
  /** 检查是否已初始化 */
  getIsInitialized: () => boolean;
  /** 添加翻译 */
  addTranslations: (language: string, newTranslations: Record<string, string>) => void;
  /** 翻译资源 */
  translations: TranslationResource;
  /** 初始化方法 */
  initialize: (config?: I18nConfig) => Promise<void>;
}

/**
 * 国际化实例接口（为了兼容性保留）
 */
export interface I18nInstance {
  language: string;
  t: (key: string, options?: any) => string;
  changeLanguage: (language: string) => Promise<void>;
  isInitialized: boolean;
}