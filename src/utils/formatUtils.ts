/**
 * 格式化工具函数库
 * 提供通用的格式化逻辑，包括日期、时间、货币、数字等格式化
 */

// ==================== 日期时间格式化 ====================

interface DateFormatOptions {
  format?: string;
  locale?: string;
  timezone?: string;
}

/** 日期时间格式化工具类 */
export class DateTimeFormatUtils {
  /** 格式化日期 */
  static formatDate(date: Date | string | number, options: DateFormatOptions = {}): string {
    const { format = 'YYYY-MM-DD' } = options;
    const d = new Date(date);

    // 如果日期无效，返回空字符串
    if (isNaN(d.getTime())) {
      return '';
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const milliseconds = String(d.getMilliseconds()).padStart(3, '0');

    // 支持的格式化标记
    const replacements: Record<string, string> = {
      YYYY: String(year),
      YY: String(year).slice(-2),
      MM: month,
      M: String(d.getMonth() + 1),
      DD: day,
      D: String(d.getDate()),
      HH: hours,
      H: String(d.getHours()),
      mm: minutes,
      m: String(d.getMinutes()),
      ss: seconds,
      s: String(d.getSeconds()),
      SSS: milliseconds,
    };

    // 应用格式化
    let result = format;
    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(new RegExp(key, 'g'), value);
    });

    return result;
  }

  /** 相对时间格式化 */
  static formatRelativeTime(date: Date | string | number, locale = 'zh-CN'): string {
    const now = new Date();
    const target = new Date(date);
    const diff = now.getTime() - target.getTime();

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return rtf.format(-years, 'year');
    }
    if (months > 0) {
      return rtf.format(-months, 'month');
    }
    if (days > 0) {
      return rtf.format(-days, 'day');
    }
    if (hours > 0) {
      return rtf.format(-hours, 'hour');
    }
    if (minutes > 0) {
      return rtf.format(-minutes, 'minute');
    }
    return rtf.format(-seconds, 'second');
  }

  /** 获取时间段描述 */
  static getTimeOfDay(hours: number): string {
    if (hours >= 0 && hours < 6) return '凌晨';
    if (hours >= 6 && hours < 12) return '上午';
    if (hours >= 12 && hours < 18) return '下午';
    return '晚上';
  }

  /** 格式化时间段 */
  static formatTimeRange(start: Date | string, end: Date | string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startTime = this.formatDate(startDate, { format: 'HH:mm' });
    const endTime = this.formatDate(endDate, { format: 'HH:mm' });

    // 如果在同一天
    if (startDate.toDateString() === endDate.toDateString()) {
      return `${startTime} - ${endTime}`;
    }

    // 如果不在同一天
    return `${this.formatDate(startDate, { format: 'MM-DD HH:mm' })} - ${this.formatDate(endDate, { format: 'MM-DD HH:mm' })}`;
  }

  /** 获取星期几 */
  static getWeekday(date: Date | string | number, locale = 'zh-CN'): string {
    const d = new Date(date);
    const weekdays =
      locale === 'zh-CN'
        ? ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return weekdays[d.getDay()] || '';
  }

  /** 检查是否为今天 */
  static isToday(date: Date | string | number): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  /** 检查是否为昨天 */
  static isYesterday(date: Date | string | number): boolean {
    const d = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.toDateString() === yesterday.toDateString();
  }

  /** 检查是否为明天 */
  static isTomorrow(date: Date | string | number): boolean {
    const d = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return d.toDateString() === tomorrow.toDateString();
  }
}

// ==================== 数字格式化 ====================

interface NumberFormatOptions {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumIntegerDigits?: number;
  useGrouping?: boolean;
}

/** 数字格式化工具类 */
export class NumberFormatUtils {
  /** 格式化数字 */
  static formatNumber(num: number, options: NumberFormatOptions = {}): string {
    const {
      locale = 'zh-CN',
      style = 'decimal',
      currency = 'CNY',
      minimumFractionDigits = 0,
      maximumFractionDigits = 2,
      minimumIntegerDigits = 1,
      useGrouping = true,
    } = options;

    return new Intl.NumberFormat(locale, {
      style,
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      minimumIntegerDigits,
      useGrouping,
    }).format(num);
  }

  /** 格式化货币 */
  static formatCurrency(amount: number, currency: string = 'CNY', locale = 'zh-CN'): string {
    return this.formatNumber(amount, {
      style: 'currency',
      currency,
      locale,
    });
  }

  /** 格式化百分比 */
  static formatPercent(value: number, decimals: number = 2, locale = 'zh-CN'): string {
    return this.formatNumber(value, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      locale,
    });
  }

  /** 格式化文件大小 */
  static formatFileSize(bytes: number, decimals: number = 2, locale = 'zh-CN'): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
    return `${this.formatNumber(size, { locale })} ${sizes[i]}`;
  }

  /** 格式化数字缩写 */
  static formatNumberAbbreviation(num: number, decimals: number = 1, locale = 'zh-CN'): string {
    if (num < 1000) {
      return this.formatNumber(num, { locale });
    }

    const abbreviations = [
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
    ];

    for (const { value, symbol } of abbreviations) {
      if (num >= value) {
        const abbreviated = num / value;
        return `${this.formatNumber(abbreviated, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
          locale,
        })}${symbol}`;
      }
    }

    return this.formatNumber(num, { locale });
  }

  /** 格式化序数 */
  static formatOrdinal(num: number, locale = 'zh-CN'): string {
    if (locale === 'zh-CN') {
      return `第${num}`;
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = suffixes[num % 100 <= 3 && num % 100 >= 10 ? 0 : num % 10] || 'th';
    return `${num}${suffix}`;
  }

  /** 格式化科学计数法 */
  static formatScientific(num: number, precision: number = 2): string {
    return num.toExponential(precision);
  }

  /** 格式化罗马数字 */
  static formatRoman(num: number): string {
    if (num < 1 || num > 3999) {
      return String(num);
    }

    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ];

    let result = '';
    let remaining = num;

    for (const { value, symbol } of romanNumerals) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }

    return result;
  }
}

// ==================== 字符串格式化 ====================

/** 字符串格式化工具类 */
export class StringFormatUtils {
  /** 首字母大写 */
  static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /** 驼峰命名转下划线命名 */
  static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  /** 下划线命名转驼峰命名 */
  static snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /** 中划线命名转驼峰命名 */
  static kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /** 驼峰命名转中划线命名 */
  static camelToKebab(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }

  /** 格式化手机号 */
  static formatPhone(phone: string, separator = ' '): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7)}`;
    }
    return phone;
  }

  /** 格式化身份证号 */
  static formatIdCard(idCard: string): string {
    const cleaned = idCard.replace(/\D/g, '');
    if (cleaned.length === 18) {
      return `${cleaned.slice(0, 6)}********${cleaned.slice(14)}`;
    } else if (cleaned.length === 15) {
      return `${cleaned.slice(0, 6)}*****${cleaned.slice(11)}`;
    }
    return idCard;
  }

  /** 格式化银行卡号 */
  static formatBankCard(cardNumber: string, separator = ' '): string {
    const cleaned = cardNumber.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{4})/g, `$1${separator}`);
    return formatted.trim();
  }

  /** 截断字符串 */
  static truncate(str: string, length: number, suffix = '...'): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  }

  /** 高亮关键词 */
  static highlightKeywords(text: string, keywords: string[], highlightClass = 'highlight'): string {
    let result = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      result = result.replace(regex, `<span class="${highlightClass}">$1</span>`);
    });
    return result;
  }

  /** 移除HTML标签 */
  static stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  /** 转义HTML特殊字符 */
  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /** 反转义HTML特殊字符 */
  static unescapeHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  /** 生成UUID */
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /** 格式化模板字符串 */
  static template(template: string, data: Record<string, any>, delimiter = '{%}'): string {
    return template.replace(new RegExp(`${delimiter}(\\w+)${delimiter}`, 'g'), (_, key) => {
      return data[key] !== undefined ? String(data[key]) : '';
    });
  }
}

// ==================== 导出 ====================

export const dateTimeFormat = DateTimeFormatUtils;
export const numberFormat = NumberFormatUtils;
export const stringFormat = StringFormatUtils;
