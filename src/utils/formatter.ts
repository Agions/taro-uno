/**
 * 数据格式化工具
 * 提供日期、数字、货币等数据的格式化功能
 */

// ==================== 日期格式化 ====================

/**
 * 格式化日期
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'YYYY-MM-DD') // => '2024-01-15'
 * formatDate(new Date(), 'YYYY年MM月DD日') // => '2024年01月15日'
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // => '2024-01-15 10:30:00'
 * ```
 */
export function formatDate(
  date: Date | string | number,
  format = 'YYYY-MM-DD',
): string {
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) {
    return '';
  }

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const milliseconds = d.getMilliseconds();

  const pad = (n: number, len = 2): string => String(n).padStart(len, '0');

  return format
    .replace(/YYYY/g, String(year))
    .replace(/YY/g, String(year).slice(-2))
    .replace(/MM/g, pad(month))
    .replace(/M/g, String(month))
    .replace(/DD/g, pad(day))
    .replace(/D/g, String(day))
    .replace(/HH/g, pad(hours))
    .replace(/H/g, String(hours))
    .replace(/hh/g, pad(hours % 12 || 12))
    .replace(/h/g, String(hours % 12 || 12))
    .replace(/mm/g, pad(minutes))
    .replace(/m/g, String(minutes))
    .replace(/ss/g, pad(seconds))
    .replace(/s/g, String(seconds))
    .replace(/SSS/g, pad(milliseconds, 3))
    .replace(/A/g, hours < 12 ? 'AM' : 'PM')
    .replace(/a/g, hours < 12 ? 'am' : 'pm');
}

/**
 * 格式化相对时间
 *
 * @example
 * ```typescript
 * formatRelativeTime(Date.now() - 60000) // => '1分钟前'
 * formatRelativeTime(Date.now() - 3600000) // => '1小时前'
 * ```
 */
export function formatRelativeTime(
  date: Date | string | number,
  options: {
    locale?: 'zh' | 'en';
    now?: Date | number;
  } = {},
): string {
  const { locale = 'zh', now = Date.now() } = options;
  const d = date instanceof Date ? date : new Date(date);
  const nowTime = now instanceof Date ? now.getTime() : now;
  const diff = nowTime - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const units = {
    zh: {
      justNow: '刚刚',
      second: '秒前',
      minute: '分钟前',
      hour: '小时前',
      day: '天前',
      month: '个月前',
      year: '年前',
    },
    en: {
      justNow: 'just now',
      second: ' seconds ago',
      minute: ' minutes ago',
      hour: ' hours ago',
      day: ' days ago',
      month: ' months ago',
      year: ' years ago',
    },
  };

  const u = units[locale];

  if (seconds < 60) return u.justNow;
  if (minutes < 60) return `${minutes}${u.minute}`;
  if (hours < 24) return `${hours}${u.hour}`;
  if (days < 30) return `${days}${u.day}`;
  if (months < 12) return `${months}${u.month}`;
  return `${years}${u.year}`;
}

/**
 * 获取日期范围描述
 *
 * @example
 * ```typescript
 * getDateRangeText(new Date('2024-01-01'), new Date('2024-01-31'))
 * // => '2024-01-01 至 2024-01-31'
 * ```
 */
export function getDateRangeText(
  start: Date | string | number,
  end: Date | string | number,
  format = 'YYYY-MM-DD',
  separator = ' 至 ',
): string {
  return `${formatDate(start, format)}${separator}${formatDate(end, format)}`;
}

// ==================== 数字格式化 ====================

/**
 * 格式化数字（千分位）
 *
 * @example
 * ```typescript
 * formatNumber(1234567.89) // => '1,234,567.89'
 * formatNumber(1234567.89, 0) // => '1,234,568'
 * ```
 */
export function formatNumber(
  value: number,
  decimals?: number,
  options: {
    thousandsSeparator?: string;
    decimalSeparator?: string;
  } = {},
): string {
  const { thousandsSeparator = ',', decimalSeparator = '.' } = options;

  if (isNaN(value)) {
    return '';
  }

  const num = decimals !== undefined ? value.toFixed(decimals) : String(value);
  const parts = num.split('.');
  const intPart = parts[0] ?? '';
  const decPart = parts[1];

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  return decPart ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt;
}

/**
 * 格式化货币
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56) // => '¥1,234.56'
 * formatCurrency(1234.56, 'USD') // => '$1,234.56'
 * ```
 */
export function formatCurrency(
  value: number,
  currency: 'CNY' | 'USD' | 'EUR' | 'GBP' | 'JPY' = 'CNY',
  options: {
    decimals?: number;
    showSymbol?: boolean;
  } = {},
): string {
  const { decimals = 2, showSymbol = true } = options;

  const symbols: Record<string, string> = {
    CNY: '¥',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };

  const symbol = showSymbol ? symbols[currency] || '' : '';
  const formatted = formatNumber(value, decimals);

  return `${symbol}${formatted}`;
}

/**
 * 格式化百分比
 *
 * @example
 * ```typescript
 * formatPercent(0.1234) // => '12.34%'
 * formatPercent(0.1234, 0) // => '12%'
 * ```
 */
export function formatPercent(value: number, decimals = 2): string {
  if (isNaN(value)) {
    return '';
  }
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 格式化文件大小
 *
 * @example
 * ```typescript
 * formatFileSize(1024) // => '1 KB'
 * formatFileSize(1048576) // => '1 MB'
 * ```
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  if (isNaN(bytes)) return '';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 格式化大数字（万、亿）
 *
 * @example
 * ```typescript
 * formatLargeNumber(12345) // => '1.23万'
 * formatLargeNumber(123456789) // => '1.23亿'
 * ```
 */
export function formatLargeNumber(
  value: number,
  options: {
    decimals?: number;
    locale?: 'zh' | 'en';
  } = {},
): string {
  const { decimals = 2, locale = 'zh' } = options;

  if (isNaN(value)) {
    return '';
  }

  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (locale === 'zh') {
    if (abs >= 100000000) {
      return `${sign}${(abs / 100000000).toFixed(decimals)}亿`;
    }
    if (abs >= 10000) {
      return `${sign}${(abs / 10000).toFixed(decimals)}万`;
    }
    return `${sign}${abs}`;
  }

  // English locale
  if (abs >= 1000000000) {
    return `${sign}${(abs / 1000000000).toFixed(decimals)}B`;
  }
  if (abs >= 1000000) {
    return `${sign}${(abs / 1000000).toFixed(decimals)}M`;
  }
  if (abs >= 1000) {
    return `${sign}${(abs / 1000).toFixed(decimals)}K`;
  }
  return `${sign}${abs}`;
}

/**
 * 格式化序号
 *
 * @example
 * ```typescript
 * formatOrdinal(1) // => '1st'
 * formatOrdinal(2) // => '2nd'
 * formatOrdinal(3) // => '3rd'
 * formatOrdinal(4) // => '4th'
 * ```
 */
export function formatOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0] ?? 'th');
}

// ==================== 字符串格式化 ====================

/**
 * 格式化手机号（隐藏中间四位）
 *
 * @example
 * ```typescript
 * formatPhone('13812345678') // => '138****5678'
 * ```
 */
export function formatPhone(phone: string, mask = '****'): string {
  if (!phone || phone.length < 11) {
    return phone;
  }
  return phone.replace(/(\d{3})\d{4}(\d{4})/, `$1${mask}$2`);
}

/**
 * 格式化身份证号（隐藏中间部分）
 *
 * @example
 * ```typescript
 * formatIdCard('110101199001011234') // => '110101********1234'
 * ```
 */
export function formatIdCard(idCard: string, mask = '********'): string {
  if (!idCard || idCard.length < 15) {
    return idCard;
  }
  return idCard.replace(/(\d{6})\d+(\d{4})/, `$1${mask}$2`);
}

/**
 * 格式化银行卡号（每四位空格分隔）
 *
 * @example
 * ```typescript
 * formatBankCard('6222021234567890123') // => '6222 0212 3456 7890 123'
 * ```
 */
export function formatBankCard(cardNumber: string, separator = ' '): string {
  if (!cardNumber) {
    return '';
  }
  return cardNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, `$1${separator}`);
}

/**
 * 格式化姓名（隐藏部分）
 *
 * @example
 * ```typescript
 * formatName('张三') // => '张*'
 * formatName('张三丰') // => '张*丰'
 * ```
 */
export function formatName(name: string, mask = '*'): string {
  if (!name || name.length < 2) {
    return name;
  }
  if (name.length === 2) {
    return name[0] + mask;
  }
  return name[0] + mask.repeat(name.length - 2) + name[name.length - 1];
}

/**
 * 截断文本
 *
 * @example
 * ```typescript
 * truncate('Hello World', 5) // => 'Hello...'
 * truncate('Hello World', 5, '…') // => 'Hello…'
 * ```
 */
export function truncate(text: string, length: number, suffix = '...'): string {
  if (!text || text.length <= length) {
    return text;
  }
  return text.slice(0, length) + suffix;
}

/**
 * 首字母大写
 *
 * @example
 * ```typescript
 * capitalize('hello') // => 'Hello'
 * capitalize('hello world') // => 'Hello world'
 * ```
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 每个单词首字母大写
 *
 * @example
 * ```typescript
 * titleCase('hello world') // => 'Hello World'
 * ```
 */
export function titleCase(text: string): string {
  if (!text) return '';
  return text.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * 驼峰转短横线
 *
 * @example
 * ```typescript
 * camelToKebab('helloWorld') // => 'hello-world'
 * ```
 */
export function camelToKebab(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 短横线转驼峰
 *
 * @example
 * ```typescript
 * kebabToCamel('hello-world') // => 'helloWorld'
 * ```
 */
export function kebabToCamel(text: string): string {
  return text.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

/**
 * 下划线转驼峰
 *
 * @example
 * ```typescript
 * snakeToCamel('hello_world') // => 'helloWorld'
 * ```
 */
export function snakeToCamel(text: string): string {
  return text.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
}

/**
 * 驼峰转下划线
 *
 * @example
 * ```typescript
 * camelToSnake('helloWorld') // => 'hello_world'
 * ```
 */
export function camelToSnake(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

// ==================== 时间格式化 ====================

/**
 * 格式化时长
 *
 * @example
 * ```typescript
 * formatDuration(3661) // => '01:01:01'
 * formatDuration(61) // => '01:01'
 * ```
 */
export function formatDuration(
  seconds: number,
  options: {
    showHours?: boolean;
    separator?: string;
  } = {},
): string {
  const { showHours = true, separator = ':' } = options;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const pad = (n: number): string => String(n).padStart(2, '0');

  if (showHours || h > 0) {
    return `${pad(h)}${separator}${pad(m)}${separator}${pad(s)}`;
  }
  return `${pad(m)}${separator}${pad(s)}`;
}

/**
 * 格式化倒计时
 *
 * @example
 * ```typescript
 * formatCountdown(86400000) // => { days: 1, hours: 0, minutes: 0, seconds: 0 }
 * ```
 */
export function formatCountdown(milliseconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

// ==================== 默认导出 ====================

export default {
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
};
