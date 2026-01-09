/**
 * Providers 模块
 * 导出所有 Context Provider 组件
 * @module providers
 */

// AppProvider
export { AppProvider, useAppContext } from './AppProvider';

// ThemeProvider
export {
  ThemeProvider,
  useThemeContext,
  useDesignTokens,
  useThemeMode,
} from './ThemeProvider';
export type {
  ThemeMode,
  ThemeConfig,
  ThemeContextValue,
  ThemeProviderProps,
} from './ThemeProvider';

// ConfigProvider
export {
  ConfigProvider,
  useConfigContext,
  useHttpConfig,
  useComponentConfig,
  useLocaleConfig,
  useClassPrefix,
} from './ConfigProvider';
export type {
  HttpConfig,
  ComponentConfig,
  LocaleConfig,
  GlobalConfig,
  ConfigContextValue,
  ConfigProviderProps,
} from './ConfigProvider';

// PlatformProvider
export {
  PlatformProvider,
  usePlatformContext,
  usePlatformInfo,
  usePlatformType,
  usePlatformCapabilities,
  usePlatformConfig,
  useIsPlatform,
  useHasCapability,
} from './PlatformProvider';
export type {
  PlatformContextValue,
  PlatformProviderProps,
} from './PlatformProvider';

// SecurityProvider
export { SecurityProvider, useSecurity } from './SecurityProvider';
