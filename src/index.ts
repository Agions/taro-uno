/**
 * Taro-Uno UI 组件库统一导出文件
 * 提供完整的组件库访问接口
 *
 * @module taro-uno-ui
 * @description 跨平台组件库，支持微信小程序、H5、React Native、鸿蒙 OS 等平台
 */

// ==================== 组件导出 ====================
// 通过 components/index.tsx 统一导出所有组件
export * from './components';

// ==================== Hooks 导出 ====================
// 通过 hooks/index.ts 统一导出所有 Hooks
// 排除与 components 冲突的导出
export {
  // UI Hooks
  useTheme as useThemeHook,
  ThemeContext,
  useStyle,
  usePlatform,
  useIsH5,
  useIsMiniProgram,
  useIsReactNative,
  useIsHarmony,
  useResponsive,
  useMediaQuery,
  DEFAULT_BREAKPOINTS,
  useMediaQueryHook,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useVirtualScroll,
  // State Hooks
  useBoolean,
  useToggle,
  useCounter,
  usePrevious,
  useLocalStorage,
  useSessionStorage,
  // Lifecycle Hooks
  useMount,
  useMounted,
  useIsMounted,
  useUnmount,
  useCleanup,
  useConditionalUnmount,
  // Effect Hooks
  useDebounce,
  useDebouncedCallback,
  useDebouncedEffect,
  useThrottle,
  useThrottledCallback,
  useThrottledEffect,
  useDeepCompareEffect,
  useDeepCompareLayoutEffect,
  useMemoizedFunction,
  useComputedCache,
  useVirtualList,
  useLazyLoad,
  useRequestCache,
  useBatchUpdate,
  usePriorityUpdates,
  usePerformanceMonitor,
  // Async Hooks
  useRequest,
  useMutation,
  usePost,
  usePut,
  usePatch,
  useDelete,
  // DOM Hooks
  useClickOutside,
  useEventListener,
  useClickHandler,
  useLongPress,
  useDrag,
  useKeyboard,
  useEventDelegate,
} from './hooks';

// Export hook types
export type {
  ThemeContextType,
  UseThemeReturn,
  UseStyleReturn,
  StyleValue as HookStyleValue,
  ResponsiveBreakpoints,
  InteractionStyles,
  TransformConfig,
  GradientConfig,
  UsePlatformReturn,
  ScreenSize as HookScreenSize,
  UseResponsiveReturn,
  UseResponsiveOptions,
  UseBooleanReturn,
  UseBooleanOptions,
  UseToggleReturn,
  UseToggleOptions,
  UseCounterOptions,
  UseCounterReturn,
  UseStorageOptions,
  MountCallback,
  UnmountCallback,
  UseDebounceOptions,
  UseDebouncedCallbackReturn,
  UseThrottleOptions,
  UseThrottledCallbackReturn,
  PerformanceMetrics,
  PerformanceMonitorOptions,
  RequestService,
  UseRequestOptions,
  UseRequestReturn,
  UseMutationResult,
  VirtualScrollItem,
  VirtualScrollOptions,
  VirtualScrollResult,
} from './hooks';

// ==================== 工具函数导出 ====================
// 通过 utils/index.ts 统一导出所有工具函数
// 排除与其他模块冲突的导出
export {
  // 类名工具
  cn,
  createBEM as createClassBEM,
  createNamespace as createUtilNamespace,
  conditionalClass,
  uniqueClasses,
  // 样式工具
  mergeStyles as mergeStyleObjects,
  conditionalStyle,
  pickStyles,
  omitStyles,
  styleToString,
  stringToStyle,
  addUnit,
  parseUnit,
  createSpacing,
  createFlexStyle,
  createPositionStyle,
  createSizeStyle,
  // 颜色工具
  parseHex,
  parseRgb,
  parseHsl,
  parseColor,
  rgbToHex,
  rgbaToHex,
  rgbToHsl,
  hslToRgb,
  hslaToRgba,
  rgbaToHsla,
  setAlpha,
  adjustLightness,
  lighten,
  darken,
  adjustSaturation,
  saturate,
  desaturate,
  mix,
  complement,
  invert,
  grayscale,
  getLuminance,
  getContrastRatio,
  isDark,
  isLight,
  getContrastText,
  meetsContrastGuidelines,
  toRgbString,
  toRgbaString,
  toHslString,
  toHslaString,
  toHexString,
  // 验证工具
  isRequired,
  isLength,
  isInRange,
  isEmail,
  isPhone,
  isTelephone,
  isUrl,
  isIdCard,
  isPostalCode,
  isBankCard,
  isIPv4,
  isIPv6,
  isHexColor,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  isIntegerString,
  isFloat,
  isPositiveNumber,
  isNegativeNumber,
  containsChinese,
  isChineseOnly,
  getPasswordStrength,
  isValidPassword,
  isDateFormat,
  isTimeFormat,
  isDateTimeFormat,
  isDateInRange,
  matchesPattern,
  isOneOf,
  createValidator as createValidatorUtil,
  validateAll,
  validateObject,
  // 格式化工具
  formatDate,
  formatRelativeTime,
  getDateRangeText,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatFileSize,
  formatLargeNumber,
  formatOrdinal,
  formatPhone,
  formatIdCard,
  formatBankCard,
  formatName,
  truncate,
  capitalize,
  titleCase,
  camelToKebab,
  kebabToCamel,
  snakeToCamel,
  camelToSnake,
  formatDuration,
  formatCountdown,
  // 存储工具
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
  getStorageInfoSync,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getStorageInfo,
  hasStorageSync,
  hasStorage,
  getStorageTTLSync,
  updateStorageExpiresSync,
  createNamespacedStorage,
  setStorageBatchSync,
  getStorageBatchSync,
  removeStorageBatchSync,
  setSessionStorageSync,
  getSessionStorageSync,
  removeSessionStorageSync,
  clearSessionStorageSync,
  // 日志工具
  Logger,
  logger,
  debug,
  info,
  warn,
  error,
  createLogger,
  perfLog,
  logIf,
  devLog,
  prodLog,
  // 对象工具
  deepMerge as deepMergeUtil,
  deepMergeWithArrays,
  pick,
  omit,
  pickBy,
  omitBy,
  get,
  set,
  has,
  unset,
  deepClone as deepCloneUtil,
  flatten,
  unflatten,
  mapKeys,
  mapValues,
  isEqual,
  diff,
  isEmptyObject,
  keys as keysUtil,
  values as valuesUtil,
  entries as entriesUtil,
  fromEntries as fromEntriesUtil,
  // 函数工具
  debounce,
  throttle,
  once,
  memoize,
  delay,
  retry,
  compose,
  pipe,
  curry,
  partial,
  negate,
  noop,
  identity,
  constant,
  tryCatch,
  tryCatchAsync,
  // 类型判断工具
  isUndefined as isUndefinedUtil,
  isNull as isNullUtil,
  isNil,
  isDefined,
  isBoolean as isBooleanUtil,
  isNumber as isNumberUtil,
  isFiniteNumber,
  isInteger,
  isPositive,
  isNegative,
  isString as isStringUtil,
  isNonEmptyString,
  isSymbol,
  isBigInt,
  isFunction as isFunctionUtil,
  isAsyncFunction,
  isObject as isObjectUtil,
  isPlainObject as isPlainObjectUtil,
  isEmptyPlainObject,
  isArray as isArrayUtil,
  isNonEmptyArray,
  isArrayOf,
  isDate as isDateUtil,
  isValidDate,
  isRegExp as isRegExpUtil,
  isError,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isPromise as isPromiseUtil,
  isPromiseLike,
  isNaN as isNaNUtil,
  isPrimitive,
  isFalsy,
  isTruthy,
  isEmpty as isEmptyUtil,
  isElement,
  isHTMLElement,
  isNode,
  isWindow,
  isDocument,
  isBrowser,
  isNodeEnv,
  isWebWorker,
  isTouchDevice,
  getType,
  getConstructorName,
  assertDefined,
  assertType,
  // 单位转换工具
  setUnitConfig,
  getUnitConfig,
  resetUnitConfig,
  initConfigFromPlatform,
  pxToRpx,
  rpxToPx,
  pxToRem,
  remToPx,
  rpxToRem,
  remToRpx,
  convertUnit,
  getDefaultUnit,
  toPlatformUnit,
  parseUnitValue,
  formatUnitValue,
  convertUnitString,
  convertUnits,
  convertStyleUnits,
  // 组件创建工具
  createComponent,
  createCompoundComponent,
  createBEM,
  createComponentNamespace,
  ComponentContext,
  useComponentContext,
  registerComponent,
  getRegisteredComponent,
  getAllRegisteredComponents,
  // 环境检测工具
  isBrowserEnvironment,
  isTaroEnvironment,
  resolvePlatform,
  safeLocalStorage,
  safeMatchMedia,
  // 错误处理工具
  errorHandler,
  ErrorHandlingManager,
  ErrorType,
  ErrorSeverity,
  // 响应式工具
  getScreenSize,
  matchScreenSize,
  getResponsiveValue,
  generateResponsiveStyles,
  getPlatformStyles,
  isResponsiveMobile,
  isTablet,
  isResponsiveDesktop,
  getResponsiveSafeArea,
  getStatusBarHeight,
  getNavigationBarHeight,
  getMenuButtonBoundingClientRect,
  // 工具集合
  utils,
} from './utils';

// Export util types
export type {
  ClassValue,
  StyleValue,
  ResponsiveStyleValue,
  PlatformType as UtilPlatformType,
  PlatformInfo as UtilPlatformInfo,
  RGB,
  RGBA,
  HSL,
  HSLA,
  ValidationResult as UtilValidationResult,
  ValidationRule,
  StorageOptions,
  LogLevel,
  LoggerConfig,
  DeepPartial as UtilDeepPartial,
  DebouncedFunction,
  DebounceOptions,
  ThrottleOptions,
  UnitType,
  UnitConversionConfig,
  CreateComponentOptions,
  ComponentContextValue,
  ComponentMeta,
  CompoundComponentConfig,
  CompoundComponent,
  AppError,
  BreakpointConfig,
  ScreenSize as UtilScreenSize,
  ResponsiveValue as UtilResponsiveValue,
  ResponsiveStyle,
  Platform as UtilPlatform,
} from './utils';

// ==================== 服务导出 ====================
// 通过 services/index.ts 统一导出 HTTP 客户端和相关服务
export {
  // HTTP Client
  HttpClient,
  http,
  httpClient,
  // Error Handling
  HttpError,
  ErrorCodes,
  // Interceptors
  InterceptorManager,
  createRequestInterceptorManager,
  createResponseInterceptorManager,
  // Adapters
  BaseHttpAdapter,
  WeappAdapter as WeappHttpAdapter,
  H5Adapter as H5HttpAdapter,
  RNAdapter as RNHttpAdapter,
  HarmonyAdapter as HarmonyHttpAdapter,
  createAdapter as createHttpAdapter,
  createAdapterForPlatform,
  createWeappAdapter,
  createH5Adapter,
  createRNAdapter,
  createHarmonyAdapter,
  clearAdapterCache as clearHttpAdapterCache,
  getAdapterTypeName,
  supportsUpload,
  supportsDownload,
  // Services collection
  services,
} from './services';

// Export service types
export type {
  HttpMethod,
  HttpRequestConfig,
  HttpResponse,
  HttpErrorInfo,
  ErrorCode,
  RequestInterceptorFn,
  RequestErrorInterceptorFn,
  ResponseInterceptorFn,
  ResponseErrorInterceptorFn,
  InterceptorConfig,
  UploadConfig,
  DownloadConfig,
  UploadProgress,
  DownloadProgress,
  InterceptorItem,
  IHttpAdapter,
  AdapterFactory,
} from './services';

// ==================== 类型导出 ====================
// 通过 types/index.ts 统一导出所有类型定义
// 排除与其他模块冲突的导出
export type {
  // 尺寸类型
  Size,
  ExtendedSize,
  // 状态类型
  Status,
  ExtendedStatus,
  // 变体类型
  Variant,
  ExtendedVariant,
  // 形状类型
  Shape,
  ExtendedShape,
  // 方向类型
  Direction,
  // 位置类型
  Placement,
  ExtendedPlacement,
  // 对齐类型
  Align,
  ExtendedAlign,
  // 主题模式
  ThemeMode,
  // 断点类型
  Breakpoint,
  // 动画类型
  AnimationType,
  AnimationDirection,
  // 输入类型
  InputType,
  KeyboardType,
  // 平台类型
  Platform,
  PlatformInfo,
  // 请求类型
  RequestConfig,
  RequestResponse,
  RequestError,
  // 基础 Props
  BaseProps,
  ChildrenProps,
  StyledProps,
  InteractiveProps,
  FormItemProps,
  RefProps,
  FocusableProps,
  SelectableProps,
  ToggleableProps,
  StatusProps,
  IconProps,
  // 组合类型
  FullInteractiveProps,
  FullFormItemProps,
  // 事件类型
  BaseEventTarget,
  BaseEvent,
  TouchPoint,
  TouchEventDetail,
  TouchEvent,
  ChangeEventDetail,
  ChangeEvent,
  InputEventDetail,
  InputEvent,
  FocusEventDetail,
  FocusEvent,
  BlurEventDetail,
  BlurEvent,
  ScrollEventDetail,
  ScrollEvent,
  KeyboardEventDetail,
  KeyboardEvent,
  LongPressEventDetail,
  LongPressEvent,
  EventHandler,
  TouchEventHandler,
  ChangeEventHandler,
  InputEventHandler,
  FocusEventHandler,
  BlurEventHandler,
  ScrollEventHandler,
  KeyboardEventHandler,
  LongPressEventHandler,
  OnClick,
  OnChange,
  OnInput,
  OnFocus,
  OnBlur,
  OnScroll,
  // 样式类型
  CSSUnit,
  CSSNumericValue,
  CSSValue,
  SizeValue,
  SpacingValue,
  BorderRadiusValue,
  HexColor,
  RGBColor,
  RGBAColor,
  HSLColor,
  ColorValue,
  StyleObject,
  PartialStyleObject,
  StyleFunction,
  StyleOrFunction,
  ResponsiveValue,
  ResponsiveStyleObject,
  ResponsiveSizeValue,
  ResponsiveSpacingValue,
  ResponsiveBoolean,
  StyleVariants,
  CompoundVariant,
  StyleRecipe,
  TransitionConfig,
  AnimationConfig,
  ShadowConfig,
  ClassNameValue,
  ClassNameObject,
  ClassNameArray,
  ClassNameArg,
  StyleMergeOptions,
  MergeableStyle,
  // 工具类型
  Nullable,
  Optional,
  RequiredKeys,
  RequiredFields,
  DeepPartial,
  DeepOptional,
  DeepRequired,
  DeepReadonly,
  DeepWriteable,
  Merge,
  DeepMerge,
  PickPartial,
  PickRequired,
  PromiseType,
  FunctionArgs,
  FunctionReturn,
  ComponentProps,
  ComponentRef,
  NonNullableType,
  Truthy,
  ArrayElement,
  CapitalizeString,
  UncapitalizeString,
  KebabCase,
  CamelCase,
  Debounced,
  Throttled,
  OptionalArgs,
  RecursiveExclude,
  RecursivePick,
  ValidationResult,
  Validator,
  AsyncState,
  AsyncOperation,
  KeyValuePair,
  RecordType,
  MapType,
  SetType,
  InferArray,
  InferPromise,
  InferArgs,
  InferReturn,
} from './types';

// Export type utility functions
export {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isPromise,
  isReactElement,
  isReactComponent,
  isUndefined,
  isNull,
  isEmpty,
  isNotEmpty,
  createValidator,
  createPreventDefaultHandler,
  createStopPropagationHandler,
  classNames,
  mergeStyles,
  createCancellablePromise,
  keys,
  values,
  entries,
  fromEntries,
} from './types';

// ==================== 主题系统导出 ====================
// 通过 theme/index.ts 统一导出主题相关功能
export {
  // 默认主题
  defaultTheme,
  darkTheme,
  darkColorTokens,
  darkDesignTokens,
  generateDarkThemeCSSVariables,
  // 设计令牌
  defaultDesignTokens,
  defaultColorTokens,
  defaultSpacingTokens,
  defaultTypographyTokens,
  defaultBorderRadiusTokens,
  defaultBoxShadowTokens,
  defaultAnimationTokens,
  defaultZIndexTokens,
  createDesignTokens,
  // 深度合并工具
  deepMerge,
  deepClone,
  deepMergeAll,
  mergeDesignTokens,
  isPlainObject,
  isArray as isArrayTheme,
  isDate,
  isRegExp,
  // 样式工具
  createStyles,
  // 设计令牌生成器
  DesignTokenGenerator,
  generateDesignTokenCSS,
  generateDarkThemeCSS,
  // 主题预设
  themes,
  // 设计令牌管理
  designTokens,
  DesignTokensManager,
  tokensManager,
  getColor,
  getSpacing,
  getFontSize,
  getFontWeight,
  getBorderRadius,
  getBoxShadow,
  getAnimationDuration,
  getAnimationEasing,
  getZIndex,
} from './theme';

// Export theme types
export type {
  ThemeConfig,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadow,
  ThemeAnimation,
  DesignTokens,
  ColorTokens,
  SpacingTokens,
  TypographyTokens,
  EffectsTokens,
  DeepMergeOptions,
  StyleDefinition,
  StyleDefinitionFunction,
  ComponentStyleProps,
  ComputedStyles,
} from './theme';

// ==================== 平台适配导出 ====================
// 通过 platform/index.ts 统一导出平台适配相关功能
export {
  // 平台管理器
  platformManager,
  platformAdapter,
  platformUtils,
  getPlatform,
  getPlatformInfo,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isFeatureSupported,
  getPlatformAPIs,
  getPlatformName,
  // 平台检测器
  detectPlatform,
  detectPlatformType,
  clearPlatformCache,
  isPlatformType,
  isMiniProgramEnv,
  isH5Env,
  isRNEnv,
  isHarmonyEnv,
  getCurrentPlatformType,
  // 平台适配器
  BasePlatformAdapter,
  NewWeappAdapter,
  NewAlipayAdapter,
  NewSwanAdapter,
  NewTTAdapter,
  NewQQAdapter,
  NewJDAdapter,
  NewH5Adapter,
  NewRNAdapter,
  NewHarmonyAdapter,
  NewUnknownAdapter,
  createAdapter,
  getAdapter,
  clearAdapterCache,
  registerAdapter,
  // 类型工具
  isMiniProgramPlatform,
  DEFAULT_PLATFORM_CAPABILITIES,
  DEFAULT_PLATFORM_CONFIG,
} from './platform';

// Export platform types
export type {
  PlatformAdapter,
  PlatformType,
  MiniProgramPlatform,
  SystemInfo,
  PlatformCapabilities,
  PlatformConfig,
  IPlatformAdapter,
} from './platform';

// ==================== Provider 导出 ====================
// 通过 providers/index.ts 统一导出所有 Context Provider
export {
  // AppProvider
  AppProvider,
  useAppContext,
  // ThemeProvider
  ThemeProvider,
  useThemeContext,
  useDesignTokens,
  useThemeMode,
  // ConfigProvider
  ConfigProvider,
  useConfigContext,
  useHttpConfig,
  useComponentConfig,
  useLocaleConfig,
  useClassPrefix,
  // PlatformProvider
  PlatformProvider,
  usePlatformContext,
  usePlatformInfo,
  usePlatformType,
  usePlatformCapabilities,
  usePlatformConfig,
  useIsPlatform,
  useHasCapability,
} from './providers';

// Export provider types
export type {
  ThemeContextValue,
  ThemeProviderProps,
  HttpConfig,
  ComponentConfig,
  LocaleConfig,
  GlobalConfig,
  ConfigContextValue,
  ConfigProviderProps,
  PlatformContextValue,
  PlatformProviderProps,
} from './providers';

// ==================== 常量导出 ====================
// 通过 constants/index.ts 统一导出所有常量
export * from './constants';

// ==================== 组件库版本和配置 ====================

/** 组件库版本 */
export const VERSION = '1.0.0';

/** 组件库配置 */
export const CONFIG = {
  version: VERSION,
  theme: 'light',
  platform: 'taro',
  components: {
    basic: ['Button', 'Icon', 'Text', 'Divider', 'Typography', 'Video'],
    display: [
      'Avatar',
      'Badge',
      'Card',
      'List',
      'Rate',
      'Table',
      'Tag',
      'Timeline',
      'Calendar',
      'Carousel',
      'RichText',
    ],
    feedback: [
      'Modal',
      'Message',
      'Notification',
      'Loading',
      'Progress',
      'Tooltip',
      'Result',
      'Toast',
      'Drawer',
      'Popconfirm',
    ],
    form: [
      'Form',
      'Input',
      'Select',
      'DatePicker',
      'TimePicker',
      'Radio',
      'Checkbox',
      'Switch',
      'Slider',
      'Textarea',
      'InputNumber',
      'Cascader',
      'Transfer',
      'Upload',
      'AutoComplete',
    ],
    layout: ['Grid', 'Layout', 'Space', 'Affix', 'Row', 'Col', 'Container'],
    navigation: ['Menu', 'Tabs', 'Pagination', 'NavBar', 'Steps', 'Breadcrumb', 'PageHeader'],
  },
};

/** 组件库工具函数 */
export const ComponentLibraryUtils = {
  /**
   * 获取组件库版本
   */
  getVersion: (): string => VERSION,

  /**
   * 获取组件库配置
   */
  getConfig: () => CONFIG,

  /**
   * 检查组件是否存在
   */
  hasComponent: (componentName: string): boolean => {
    return Object.values(CONFIG.components).flat().includes(componentName);
  },

  /**
   * 获取组件分类
   */
  getComponentCategory: (componentName: string): string | null => {
    for (const [category, components] of Object.entries(CONFIG.components)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return null;
  },

  /**
   * 获取所有组件列表
   */
  getAllComponents: (): string[] => {
    return Object.values(CONFIG.components).flat();
  },

  /**
   * 获取分类组件列表
   */
  getCategoryComponents: (category: string): string[] => {
    return CONFIG.components[category as keyof typeof CONFIG.components] || [];
  },
};

// ==================== 默认导出 ====================

import * as Components from './components';
import * as Hooks from './hooks';
import * as Utils from './utils';
import * as Services from './services';
import * as Theme from './theme';
import * as Platform from './platform';
import * as Providers from './providers';
import * as Constants from './constants';
import * as Types from './types';

export default {
  // 模块
  Components,
  Hooks,
  Utils,
  Services,
  Theme,
  Platform,
  Providers,
  Constants,
  Types,

  // 工具函数
  ComponentLibraryUtils,

  // 配置
  CONFIG,
  VERSION,
};
