/**
 * 数据处理工具函数库
 * 提供通用的数据处理逻辑，包括数据转换、过滤、排序、聚合等
 */

// ==================== 数据转换 ====================

/** 数据转换工具类 */
export class DataTransformUtils {
  /** 深度克隆对象 */
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
    if (obj instanceof Array) return obj.map((item) => this.deepClone(item)) as T;

    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  /** 对象转数组 */
  static objectToArray<T extends Record<string, any>>(
    obj: T,
    keyField = 'key',
    valueField = 'value',
  ): Array<{ [K in typeof keyField | typeof valueField]: any }> {
    return Object.entries(obj).map(([key, value]) => ({
      [keyField]: key,
      [valueField]: value,
    }));
  }

  /** 数组转对象 */
  static arrayToObject<T extends Record<string, any>, K extends keyof T>(array: T[], keyField: K): Record<string, T> {
    return array.reduce(
      (acc, item) => {
        const key = String(item[keyField]);
        acc[key] = item;
        return acc;
      },
      {} as Record<string, T>,
    );
  }

  /** 扁平化嵌套对象 */
  static flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(result, this.flattenObject(value, newKey));
        } else {
          result[newKey] = value;
        }
      }
    }

    return result;
  }

  /** 反扁平化对象 */
  static unflattenObject(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keys = key.split('.');
        let current = result;

        for (let i = 0; i < keys.length - 1; i++) {
          const currentKey = keys[i];
          if (currentKey && !current[currentKey]) {
            current[currentKey] = {};
          }
          if (currentKey) {
            current = current[currentKey];
          }
        }

        const lastKey = keys[keys.length - 1];
        if (lastKey) {
          current[lastKey] = obj[key];
        }
      }
    }

    return result;
  }

  /** 格式化数字 */
  static formatNumber(
    num: number,
    options: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      useGrouping?: boolean;
      currency?: string;
      style?: 'decimal' | 'currency' | 'percent';
    } = {},
  ): string {
    const {
      minimumFractionDigits = 0,
      maximumFractionDigits = 2,
      useGrouping = true,
      currency = 'CNY',
      style = 'decimal',
    } = options;

    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
      currency,
      style,
    }).format(num);
  }

  /** 格式化字节大小 */
  static formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  }

  /** 格式化时长 */
  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// ==================== 数据过滤 ====================

/** 数据过滤工具类 */
export class DataFilterUtils {
  /** 过滤空值 */
  static filterEmpty<T>(array: T[]): T[] {
    return array.filter((item) => item !== null && item !== undefined && item !== '');
  }

  /** 过滤重复值 */
  static filterDuplicates<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
      return [...new Set(array)];
    }

    const seen = new Set();
    return array.filter((item) => {
      const keyValue = item[key];
      if (seen.has(keyValue)) {
        return false;
      }
      seen.add(keyValue);
      return true;
    });
  }

  /** 过滤范围 */
  static filterRange<T>(array: T[], key: keyof T, min: number, max: number): T[] {
    return array.filter((item) => {
      const value = item[key] as number;
      return value >= min && value <= max;
    });
  }

  /** 模糊搜索 */
  static fuzzySearch<T>(array: T[], searchTerm: string, searchFields: (keyof T)[]): T[] {
    if (!searchTerm) return array;

    const term = searchTerm.toLowerCase();
    return array.filter((item) =>
      searchFields.some((field) => {
        const value = String(item[field]).toLowerCase();
        return value.includes(term);
      }),
    );
  }

  /** 高级搜索 */
  static advancedSearch<T>(
    array: T[],
    conditions: Array<{
      field: keyof T;
      operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greater' | 'less' | 'between';
      value: any;
      value2?: any;
    }>,
  ): T[] {
    return array.filter((item) => {
      return conditions.every((condition) => {
        const fieldValue = item[condition.field];
        const { operator, value, value2 } = condition;

        switch (operator) {
          case 'equals':
            return fieldValue === value;
          case 'contains':
            return String(fieldValue).includes(String(value));
          case 'startsWith':
            return String(fieldValue).startsWith(String(value));
          case 'endsWith':
            return String(fieldValue).endsWith(String(value));
          case 'greater':
            return Number(fieldValue) > Number(value);
          case 'less':
            return Number(fieldValue) < Number(value);
          case 'between':
            return Number(fieldValue) >= Number(value) && Number(fieldValue) <= Number(value2);
          default:
            return true;
        }
      });
    });
  }
}

// ==================== 数据排序 ====================

interface SortOptions<T> {
  key?: keyof T;
  direction?: 'asc' | 'desc';
  customSort?: (a: T, b: T) => number;
}

/** 数据排序工具类 */
export class DataSortUtils {
  /** 基础排序 */
  static sort<T>(array: T[], options: SortOptions<T> = {}): T[] {
    const { key, direction = 'asc', customSort } = options;

    if (customSort) {
      return [...array].sort(customSort);
    }

    return [...array].sort((a, b) => {
      let valueA = key ? a[key] : a;
      let valueB = key ? b[key] : b;

      // 处理数字类型
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // 处理字符串类型
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();

      if (direction === 'asc') {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });
  }

  /** 多字段排序 */
  static multiSort<T>(array: T[], sortFields: Array<keyof T & string>): T[] {
    return [...array].sort((a, b) => {
      for (const field of sortFields) {
        const valueA = a[field];
        const valueB = b[field];

        if (valueA !== valueB) {
          // 处理数字类型
          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
          }

          // 处理字符串类型
          const strA = String(valueA).toLowerCase();
          const strB = String(valueB).toLowerCase();
          return strA.localeCompare(strB);
        }
      }
      return 0;
    });
  }

  /** 自然排序 */
  static naturalSort<T>(array: T[], key?: keyof T): T[] {
    return [...array].sort((a, b) => {
      const valueA = key ? String(a[key]) : String(a);
      const valueB = key ? String(b[key]) : String(b);

      return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  /** 随机排序 */
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  }
}

// ==================== 数据聚合 ====================

/** 数据聚合工具类 */
export class DataAggregateUtils {
  /** 分组 */
  static groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
    return array.reduce(
      (groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>,
    );
  }

  /** 多字段分组 */
  static groupByMultiple<T, K extends keyof T>(array: T[], keys: K[]): Record<string, T[]> {
    return array.reduce(
      (groups, item) => {
        const groupKey = keys.map((key) => String(item[key])).join('|');
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>,
    );
  }

  /** 统计 */
  static aggregate<T, K extends keyof T>(
    array: T[],
    groupKey: K,
    aggregateField: keyof T,
    aggregateType: 'sum' | 'avg' | 'count' | 'min' | 'max' = 'sum',
  ): Record<string, number> {
    const groups = this.groupBy(array, groupKey);

    return Object.entries(groups).reduce(
      (result, [key, items]) => {
        const values = items.map((item) => Number(item[aggregateField])).filter((v) => !isNaN(v));

        switch (aggregateType) {
          case 'sum':
            result[key] = values.reduce((sum, val) => sum + val, 0);
            break;
          case 'avg':
            result[key] = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
            break;
          case 'count':
            result[key] = items.length;
            break;
          case 'min':
            result[key] = values.length > 0 ? Math.min(...values) : 0;
            break;
          case 'max':
            result[key] = values.length > 0 ? Math.max(...values) : 0;
            break;
        }

        return result;
      },
      {} as Record<string, number>,
    );
  }

  /** 分页 */
  static paginate<T>(
    array: T[],
    page: number,
    pageSize: number,
  ): {
    data: T[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
  } {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = array.slice(startIndex, endIndex);
    const total = array.length;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      totalPages,
      page,
      pageSize,
    };
  }

  /** 透视表 */
  static pivot<T>(
    data: T[],
    rowField: keyof T,
    columnField: keyof T,
    valueField: keyof T,
    aggregateType: 'sum' | 'avg' | 'count' = 'sum',
  ): Record<string, Record<string, number>> {
    const result: Record<string, Record<string, number>> = {};

    // 获取所有唯一的行和列值
    const rowValues = [...new Set(data.map((item) => String(item[rowField])))];
    const columnValues = [...new Set(data.map((item) => String(item[columnField])))];

    // 初始化结果结构
    rowValues.forEach((rowValue) => {
      result[rowValue] = {};
      columnValues.forEach((colValue) => {
        (result[rowValue] as any)[colValue] = 0;
      });
    });

    // 填充数据
    data.forEach((item) => {
      const rowKey = String(item[rowField]);
      const colKey = String(item[columnField]);
      const value = Number(item[valueField]) || 0;

      if (result[rowKey] && result[rowKey][colKey] !== undefined) {
        switch (aggregateType) {
          case 'sum':
            result[rowKey][colKey] += value;
            break;
          case 'avg':
            // 需要额外的计数逻辑，这里简化处理
            result[rowKey][colKey] = value;
            break;
          case 'count':
            result[rowKey][colKey] += 1;
            break;
        }
      }
    });

    return result;
  }
}

// ==================== 数据验证 ====================

/** 数据验证工具类 */
export class DataValidationUtils {
  /** 验证邮箱 */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /** 验证手机号 */
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  /** 验证身份证号 */
  static isValidIdCard(idCard: string): boolean {
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idCardRegex.test(idCard);
  }

  /** 验证URL */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /** 验证数据完整性 */
  static validateDataIntegrity<T>(
    data: T,
    requiredFields: (keyof T)[],
  ): { isValid: boolean; missingFields: (keyof T)[] } {
    const missingFields: (keyof T)[] = [];

    requiredFields.forEach((field) => {
      if (data[field] === null || data[field] === undefined || data[field] === '') {
        missingFields.push(field);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }

  /** 验证数据类型 */
  static validateDataTypes<T>(
    data: T,
    typeRules: Partial<Record<keyof T, 'string' | 'number' | 'boolean' | 'array' | 'object'>>,
  ): { isValid: boolean; typeErrors: Record<string, string> } {
    const typeErrors: Record<string, string> = {};

    Object.entries(typeRules).forEach(([field, expectedType]) => {
      const value = data[field as keyof T];
      const actualType = Array.isArray(value) ? 'array' : typeof value;

      if (actualType !== expectedType) {
        typeErrors[field] = `Expected ${expectedType}, got ${actualType}`;
      }
    });

    return {
      isValid: Object.keys(typeErrors).length === 0,
      typeErrors,
    };
  }
}

// ==================== 导出 ====================

export const dataTransform = DataTransformUtils;
export const dataFilter = DataFilterUtils;
export const dataSort = DataSortUtils;
export const dataAggregate = DataAggregateUtils;
export const dataValidate = DataValidationUtils;
