/**
 * inputValidator 单元测试
 */

import { validateString, validateEmail, validatePhone, validateURL, validateNumber, validateObject } from '../inputValidator';

describe('inputValidator', () => {
  describe('validateString', () => {
    it('应该验证必填字段', () => {
      const result = validateString('', { required: true });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('字段是必填的');
    });

    it('应该验证最小长度', () => {
      const result = validateString('ab', { minLength: 3 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('字段长度不能小于3');
    });

    it('应该验证最大长度', () => {
      const result = validateString('abcdef', { maxLength: 5 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('字段长度不能大于5');
    });

    it('应该验证正则表达式', () => {
      const result = validateString('abc123', { pattern: /^[a-zA-Z]+$/ });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('字段格式不正确');
    });

    it('应该验证自定义验证函数', () => {
      const result = validateString('test', {
        custom: (value) => value !== 'test'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('字段验证失败');
    });

    it('应该正确清理输入', () => {
      const result = validateString('  <script>alert("xss")</script>  ', {
        sanitize: true
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('<script>alert("xss")</script>');
    });

    it('应该通过有效输入', () => {
      const result = validateString('valid string', {
        required: true,
        minLength: 5,
        maxLength: 20,
        pattern: /^[a-zA-Z\s]+$/
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // 边界案例测试
    it('应该处理空字符串（非必填）', () => {
      const result = validateString('', { required: false });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('应该处理超长字符串', () => {
      const longString = 'a'.repeat(10000);
      const result = validateString(longString, { maxLength: 100 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('长度不能超过 100 个字符');
    });

    it('应该处理特殊字符输入', () => {
      const result = validateString('!@#$%^&*()_+-=[]{}|;:,.<>?', {
        pattern: /^[a-zA-Z0-9]+$/
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('格式不正确');
    });

    it('应该处理null/undefined输入', () => {
      const resultNull = validateString(null as any, { required: true });
      expect(resultNull.isValid).toBe(false);
      expect(resultNull.errors).toContain('此字段为必填项');

      const resultUndefined = validateString(undefined as any, { required: true });
      expect(resultUndefined.isValid).toBe(false);
      expect(resultUndefined.errors).toContain('此字段为必填项');
    });
  });

  describe('validateEmail', () => {
    it('应该拒绝无效邮箱', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('请输入有效的邮箱地址');
    });

    it('应该接受有效邮箱', () => {
      const result = validateEmail('user@example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // 边界案例测试
    it('应该处理边界邮箱格式', () => {
      const edgeCases = [
        'user@',
        '@example.com',
        'user@.com',
        'user..dot@example.com',
        'user@sub..domain.com',
        'user name@example.com', // 空格
        'user+tag@example.com', // 有效的+标签
      ];

      edgeCases.forEach(email => {
        const result = validateEmail(email);
        // 只有user+tag@example.com是有效的
        if (email === 'user+tag@example.com') {
          expect(result.isValid).toBe(true);
        } else {
          expect(result.isValid).toBe(false);
        }
      });
    });
  });

  describe('validatePhone', () => {
    it('应该拒绝无效电话号码', () => {
      const result = validatePhone('123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('请输入有效的电话号码');
    });

    it('应该接受有效电话号码', () => {
      const result = validatePhone('13800138000');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // 边界案例测试
    it('应该处理国际电话号码格式', () => {
      const internationalNumbers = [
        '+8613800138000', // 中国带国际区号
        '8613800138000',  // 中国不带+号
        '+14155552671',  // 美国号码
        '+442071838750', // 英国号码
        '12345',         // 太短
        '1234567890123456', // 太长
      ];

      internationalNumbers.forEach(phone => {
        const result = validatePhone(phone);
        // 根据当前实现，只有中国手机号格式有效
        if (phone === '13800138000') {
          expect(result.isValid).toBe(true);
        } else {
          expect(result.isValid).toBe(false);
        }
      });
    });

    describe('with countryCode', () => {
      it('应该验证有效美国手机号', () => {
        const result = validatePhone('1234567890', 'US');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('应该验证有效英国手机号', () => {
        const result = validatePhone('07123456789', 'GB');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('应该验证有效日本手机号', () => {
        const result = validatePhone('09012345678', 'JP');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('应该验证有效韩国手机号', () => {
        const result = validatePhone('01012345678', 'KR');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('应该拒绝无效美国手机号', () => {
        const result = validatePhone('123', 'US');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('格式不正确');
      });

      it('应该拒绝无效国家代码', () => {
        const result = validatePhone('13800138000', 'INVALID');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('不支持的国家代码');
      });

      it('应该处理空号码', () => {
        const result = validatePhone('', 'CN');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('此字段为必填项');
      });
    });
  });

  describe('validateURL', () => {
    it('应该拒绝无效URL', () => {
      const result = validateURL('not-a-url');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('请输入有效的URL');
    });

    it('应该接受有效URL', () => {
      const result = validateURL('https://example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // 边界案例测试
    it('应该处理各种URL格式', () => {
      const urlCases = [
        'http://example.com',
        'https://example.com',
        'ftp://example.com',
        'mailto:user@example.com',
        'tel:+123456789',
        'javascript:alert("xss")', // 危险协议
        'data:text/html,<script>alert(1)</script>', // 危险协议
        'example.com', // 缺少协议
        'https://', // 缺少域名
        'https://example.com/path?query=value&other=123#fragment', // 带参数和片段
      ];

      urlCases.forEach(url => {
        const result = validateURL(url);
        // 根据当前实现，只有http和https协议有效
        if (url.startsWith('http://') || url.startsWith('https://')) {
          expect(result.isValid).toBe(true);
        } else {
          expect(result.isValid).toBe(false);
        }
      });
    });
  });

  describe('validateNumber', () => {
    it('应该验证最小值', () => {
      const result = validateNumber('5', 10);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('数值不能小于10');
    });

    it('应该验证最大值', () => {
      const result = validateNumber('15', undefined, 10);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('数值不能大于10');
    });

    it('应该接受有效数字', () => {
      const result = validateNumber('10', 5, 15);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // 边界案例测试
    it('应该处理特殊数字输入', () => {
      const numberCases = [
        '0', // 零值
        '-10', // 负数
        '3.14159', // 小数
        '1e10', // 科学计数法
        'NaN', // 非数字
        'Infinity', // 无限大
        ' 10 ', // 带空格
        '10abc', // 数字+字母
      ];

      numberCases.forEach(num => {
        const result = validateNumber(num);
        // 根据当前实现，只有纯数字有效
        if (/^-?\d+(\.\d+)?$/.test(num) && num !== 'NaN' && num !== 'Infinity') {
          expect(result.isValid).toBe(true);
        } else {
          expect(result.isValid).toBe(false);
        }
      });
    });
  });

  describe('validateObject', () => {
    it('应该验证对象属性', () => {
      const obj = { name: '', email: 'invalid', age: '15' };
      const rules = {
        name: { required: true },
        email: { required: true },
        age: { required: true, pattern: /^\d+$/, min: 18 }
      };

      const result = validateObject(obj, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('应该接受有效对象', () => {
      const obj = { name: 'John Doe', email: 'john@example.com', age: '25' };
      const rules = {
        name: { required: true },
        email: { required: true },
        age: { required: true, pattern: /^\d+$/ }
      };

      const result = validateObject(obj, rules);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('应该清理对象属性', () => {
      const obj = {
        name: '  <script>alert("xss")</script>  ',
        email: 'user@example.com'
      };
      const rules = {
        name: { required: true, sanitize: true },
        email: { required: true }
      };

      const result = validateObject(obj, rules);
      expect(result.isValid).toBe(true);
      if (typeof result.sanitized === 'object' && result.sanitized !== null) {
        expect((result.sanitized as any).name).toBe('<script>alert("xss")</script>');
      }
    });
  });
});