/**
 * 格式化工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatFileSize,
  formatLargeNumber,
  formatPhone,
  formatIdCard,
  formatBankCard,
  truncate,
  capitalize,
  titleCase,
  camelToKebab,
  kebabToCamel,
  snakeToCamel,
  camelToSnake,
  formatDuration,
  formatCountdown,
} from '../formatter';

describe('formatter', () => {
  describe('formatDate', () => {
    it('should format date with default format', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('should format date with time', () => {
      const date = new Date('2024-01-15T10:30:45');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-15 10:30:45');
    });

    it('should handle string input', () => {
      expect(formatDate('2024-01-15', 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('should handle timestamp input', () => {
      const timestamp = new Date('2024-01-15').getTime();
      expect(formatDate(timestamp, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid', 'YYYY-MM-DD')).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousands separator', () => {
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    it('should format number with specified decimals', () => {
      expect(formatNumber(1234567.89, 0)).toBe('1,234,568');
      expect(formatNumber(1234567.89, 1)).toBe('1,234,567.9');
    });

    it('should handle custom separators', () => {
      expect(formatNumber(1234567.89, 2, { thousandsSeparator: ' ', decimalSeparator: ',' }))
        .toBe('1 234 567,89');
    });
  });

  describe('formatCurrency', () => {
    it('should format CNY currency', () => {
      expect(formatCurrency(1234.56)).toBe('¥1,234.56');
    });

    it('should format USD currency', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('should hide symbol when specified', () => {
      expect(formatCurrency(1234.56, 'CNY', { showSymbol: false })).toBe('1,234.56');
    });
  });

  describe('formatPercent', () => {
    it('should format percentage', () => {
      expect(formatPercent(0.1234)).toBe('12.34%');
    });

    it('should format percentage with specified decimals', () => {
      expect(formatPercent(0.1234, 0)).toBe('12%');
      expect(formatPercent(0.1234, 1)).toBe('12.3%');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(500)).toBe('500 B');
    });

    it('should format kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    it('should format megabytes', () => {
      expect(formatFileSize(1048576)).toBe('1 MB');
    });

    it('should format gigabytes', () => {
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('formatLargeNumber', () => {
    it('should format numbers in Chinese locale', () => {
      expect(formatLargeNumber(12345)).toBe('1.23万');
      expect(formatLargeNumber(123456789)).toBe('1.23亿');
    });

    it('should format numbers in English locale', () => {
      expect(formatLargeNumber(1234, { locale: 'en' })).toBe('1.23K');
      expect(formatLargeNumber(1234567, { locale: 'en' })).toBe('1.23M');
      expect(formatLargeNumber(1234567890, { locale: 'en' })).toBe('1.23B');
    });

    it('should handle small numbers', () => {
      expect(formatLargeNumber(123)).toBe('123');
    });
  });

  describe('formatPhone', () => {
    it('should mask phone number', () => {
      expect(formatPhone('13812345678')).toBe('138****5678');
    });

    it('should handle short phone numbers', () => {
      expect(formatPhone('1234')).toBe('1234');
    });
  });

  describe('formatIdCard', () => {
    it('should mask ID card number', () => {
      expect(formatIdCard('110101199001011234')).toBe('110101********1234');
    });
  });

  describe('formatBankCard', () => {
    it('should format bank card number', () => {
      expect(formatBankCard('6222021234567890123')).toBe('6222 0212 3456 7890 123');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short text', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should use custom suffix', () => {
      expect(truncate('Hello World', 5, '…')).toBe('Hello…');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('titleCase', () => {
    it('should capitalize each word', () => {
      expect(titleCase('hello world')).toBe('Hello World');
    });
  });

  describe('camelToKebab', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(camelToKebab('helloWorld')).toBe('hello-world');
      expect(camelToKebab('backgroundColor')).toBe('background-color');
    });
  });

  describe('kebabToCamel', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(kebabToCamel('hello-world')).toBe('helloWorld');
      expect(kebabToCamel('background-color')).toBe('backgroundColor');
    });
  });

  describe('snakeToCamel', () => {
    it('should convert snake_case to camelCase', () => {
      expect(snakeToCamel('hello_world')).toBe('helloWorld');
    });
  });

  describe('camelToSnake', () => {
    it('should convert camelCase to snake_case', () => {
      expect(camelToSnake('helloWorld')).toBe('hello_world');
    });
  });

  describe('formatDuration', () => {
    it('should format duration with hours', () => {
      expect(formatDuration(3661)).toBe('01:01:01');
    });

    it('should format duration without hours', () => {
      expect(formatDuration(61, { showHours: false })).toBe('01:01');
    });
  });

  describe('formatCountdown', () => {
    it('should format countdown', () => {
      const result = formatCountdown(86400000 + 3600000 + 60000 + 1000);
      expect(result).toEqual({
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
      });
    });
  });
});
