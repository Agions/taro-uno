import type { I18nConfig, SupportedLanguage, LanguageConfig } from '../types/i18n.types';

/**
 * 支持的语言配置
 */
export const languageConfigs: Record<SupportedLanguage, LanguageConfig> = {
  'zh-CN': {
    code: 'zh-CN',
    name: '简体中文',
    englishName: 'Simplified Chinese',
    flag: '🇨🇳',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑"',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    currency: 'CNY',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  },
  'en-US': {
    code: 'en-US',
    name: 'English',
    englishName: 'English',
    flag: '🇺🇸',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm:ss A',
    currency: 'USD',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  },
  'ja-JP': {
    code: 'ja-JP',
    name: '日本語',
    englishName: 'Japanese',
    flag: '🇯🇵',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm:ss',
    currency: 'JPY',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  },
  'ko-KR': {
    code: 'ko-KR',
    name: '한국어',
    englishName: 'Korean',
    flag: '🇰🇷',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Malgun Gothic", "맑은 고딕", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    currency: 'KRW',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  },
  'fr-FR': {
    code: 'fr-FR',
    name: 'Français',
    englishName: 'French',
    flag: '🇫🇷',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    currency: 'EUR',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  },
  'de-DE': {
    code: 'de-DE',
    name: 'Deutsch',
    englishName: 'German',
    flag: '🇩🇪',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm:ss',
    currency: 'EUR',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  },
  'es-ES': {
    code: 'es-ES',
    name: 'Español',
    englishName: 'Spanish',
    flag: '🇪🇸',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    currency: 'EUR',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  },
  'pt-BR': {
    code: 'pt-BR',
    name: 'Português',
    englishName: 'Portuguese',
    flag: '🇧🇷',
    rtl: false,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    currency: 'BRL',
    numberFormat: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  }
};

/**
 * 默认国际化配置
 */
export const defaultI18nConfig: I18nConfig = {
  supportedLanguages: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'fr-FR', 'de-DE', 'es-ES', 'pt-BR'],
  defaultLanguage: 'zh-CN',
  fallbackLanguage: 'en-US',
  detection: true,
  debug: false,
  languageConfigs,
  namespaces: true,
  namespaceList: ['common', 'form', 'components', 'validation', 'errors'],
  resourcesLoadStrategy: 'lazy',
  cacheStrategy: 'localStorage',
  plugins: {
    languageDetector: true,
    backend: false,
    resourcesBackend: true
  }
};

/**
 * 语言检测顺序
 */
export const detectionOrder = [
  'localStorage',
  'sessionStorage',
  'navigator',
  'htmlTag',
  'path',
  'subdomain'
];

/**
 * 缓存配置
 */
export const cacheConfig = {
  enabled: true,
  expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  prefix: 'i18n_',
  version: '1.0.0'
};

/**
 * 资源加载配置
 */
export const resourcesConfig = {
  basePath: '/locales',
  loadPath: '/locales/{{lng}}/{{ns}}.json',
  addPath: '/locales/{{lng}}/{{ns}}.json',
  jsonIndent: 2,
  allowMultiLoading: true,
  crossDomain: false,
  withCredentials: false,
  overrideMimeType: false,
  requestHeaders: {
    'Accept': 'application/json'
  }
};

/**
 * 插件配置
 */
export const pluginsConfig = {
  languageDetector: {
    order: detectionOrder,
    caches: ['localStorage', 'sessionStorage'],
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    excludeCacheFor: ['cimode']
  },
  backend: resourcesConfig,
  resourcesBackend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  }
};

/**
 * 验证配置
 */
export const validationConfig = {
  enabled: true,
  strict: true,
  warnOnMissing: true,
  errorOnMissing: false,
  fallbackOnMissing: true,
  fallbackValue: ''
};

/**
 * 性能配置
 */
export const performanceConfig = {
  enabled: true,
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 5000,
  parallel: true,
  maxParallel: 3,
  debounce: 300,
  throttle: 200
};

/**
 * 开发配置
 */
export const developmentConfig = {
  enabled: process.env['NODE_ENV'] === 'development',
  debug: process.env['NODE_ENV'] === 'development',
  verbose: process.env['NODE_ENV'] === 'development',
  showMissingKeys: process.env['NODE_ENV'] === 'development',
  logMissingKeys: process.env['NODE_ENV'] === 'development',
  suppressWarnings: false
};

/**
 * 生产配置
 */
export const productionConfig = {
  enabled: process.env['NODE_ENV'] === 'production',
  debug: false,
  verbose: false,
  showMissingKeys: false,
  logMissingKeys: false,
  suppressWarnings: true,
  minify: true,
  compress: true
};

/**
 * 导出配置
 */
export const config = {
  ...defaultI18nConfig,
  cache: cacheConfig,
  resources: resourcesConfig,
  plugins: pluginsConfig,
  validation: validationConfig,
  performance: performanceConfig,
  development: developmentConfig,
  production: productionConfig
};

/**
 * 导出默认配置
 */
export default config;