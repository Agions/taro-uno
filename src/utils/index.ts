/**
 * 工具函数库统一导出文件
 * 提供所有工具函数的统一访问入口
 */

// ==================== 类名工具 ====================

export {
  cn,
  createBEM as createClassBEM,
  createNamespace,
  conditionalClass,
  uniqueClasses,
  type ClassValue,
} from './classnames';

// ==================== 样式工具 ====================

export {
  mergeStyles,
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
  type StyleValue,
  type ResponsiveStyleValue,
} from './style';

// ==================== 平台工具 ====================

export {
  detectPlatform,
  detectPlatformType,
  clearPlatformCache,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isHarmony,
  getPlatformType,
  selectByPlatform,
  runOnPlatform,
  runOnPlatformAsync,
  isMobile,
  isDesktop,
  isIOS,
  isAndroid,
  isWechat,
  isAlipay,
  getScreenInfo,
  getSafeArea,
  supportsFeature,
  createPlatformAdapter,
  type PlatformType,
  type PlatformInfo,
} from './platform';

// ==================== 颜色工具 ====================

export {
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
  type RGB,
  type RGBA,
  type HSL,
  type HSLA,
} from './color';

// ==================== 验证工具 ====================

export {
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
  isInteger as isIntegerString,
  isFloat,
  isPositive as isPositiveNumber,
  isNegative as isNegativeNumber,
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
  createValidator,
  validateAll,
  validateObject,
  type ValidationResult,
  type ValidationRule,
} from './validator';

// ==================== 格式化工具 ====================

export {
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
} from './formatter';

// ==================== 存储工具 ====================

export {
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
  type StorageOptions,
} from './storage';

// ==================== 日志工具 ====================

export {
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
  type LogLevel,
  type LoggerConfig,
} from './logger';

// ==================== 对象工具 ====================

export {
  deepMerge,
  deepMergeWithArrays,
  pick,
  omit,
  pickBy,
  omitBy,
  get,
  set,
  has,
  unset,
  deepClone,
  flatten,
  unflatten,
  mapKeys,
  mapValues,
  isEqual,
  diff,
  isEmpty as isEmptyObject,
  keys,
  values,
  entries,
  fromEntries,
  type DeepPartial,
} from './object';

// ==================== 函数工具 ====================

export {
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
  type DebouncedFunction,
  type DebounceOptions,
  type ThrottleOptions,
} from './function';

// ==================== 类型判断工具 ====================

export {
  isUndefined,
  isNull,
  isNil,
  isDefined,
  isBoolean,
  isNumber,
  isFiniteNumber,
  isInteger,
  isPositive,
  isNegative,
  isString,
  isNonEmptyString,
  isSymbol,
  isBigInt,
  isFunction,
  isAsyncFunction,
  isObject,
  isPlainObject,
  isEmptyObject as isEmptyPlainObject,
  isArray,
  isNonEmptyArray,
  isArrayOf,
  isDate,
  isValidDate,
  isRegExp,
  isError,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isPromise,
  isPromiseLike,
  isNaN,
  isPrimitive,
  isFalsy,
  isTruthy,
  isEmpty,
  isElement,
  isHTMLElement,
  isNode,
  isWindow,
  isDocument,
  isBrowser,
  isNode_ as isNodeEnv,
  isWebWorker,
  isTouchDevice,
  getType,
  getConstructorName,
  assertDefined,
  assertType,
} from './is';

// ==================== 单位转换工具 ====================

export type { UnitType, UnitConversionConfig } from './unit';

export {
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
} from './unit';

// ==================== 组件创建工具 ====================

export {
  createComponent,
  createCompoundComponent,
  createBEM,
  createNamespace as createComponentNamespace,
  ComponentContext,
  useComponentContext,
  registerComponent,
  getRegisteredComponent,
  getAllRegisteredComponents,
} from './createComponent';

export type {
  CreateComponentOptions,
  ComponentContextValue,
  ComponentMeta,
  CompoundComponentConfig,
  CompoundComponent,
} from './createComponent';

// ==================== 命名空间工具 ====================

export { createNamespace as createBEMNamespace } from './createNamespace';

// ==================== 环境检测工具 ====================

export {
  isBrowserEnvironment,
  isTaroEnvironment,
  resolvePlatform,
  safeLocalStorage,
  safeMatchMedia,
} from './environment';

// ==================== 错误处理工具 ====================

export {
  errorHandler,
  ErrorHandlingManager,
  ErrorType,
  ErrorSeverity,
} from './error-handler';

export type { AppError } from './error-handler';

// ==================== 响应式工具 ====================

export {
  useResponsive,
  getScreenSize,
  matchScreenSize,
  getResponsiveValue,
  generateResponsiveStyles,
  getPlatformStyles,
  getPlatform,
  isMobile as isResponsiveMobile,
  isTablet,
  isDesktop as isResponsiveDesktop,
  getSafeArea as getResponsiveSafeArea,
  getStatusBarHeight,
  getNavigationBarHeight,
  getMenuButtonBoundingClientRect,
} from './responsiveUtils';

export type {
  BreakpointConfig,
  ScreenSize,
  ResponsiveValue,
  ResponsiveStyle,
  Platform,
} from './responsiveUtils';

export { default as responsiveUtils } from './responsiveUtils';

// ==================== 默认导出 ====================

import classnames from './classnames';
import style from './style';
import platform from './platform';
import color from './color';
import validator from './validator';
import formatter from './formatter';
import storage from './storage';
import logger from './logger';
import object from './object';
import func from './function';
import is from './is';

export const utils = {
  classnames,
  style,
  platform,
  color,
  validator,
  formatter,
  storage,
  logger,
  object,
  function: func,
  is,
};

export default utils;
