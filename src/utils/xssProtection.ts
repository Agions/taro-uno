/**
 * XSS防护工具
 * 提供XSS攻击防护功能，包括HTML转义、属性过滤等
 */

import * as Taro from '@tarojs/taro';

interface XSSProtectionOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  allowScriptTags?: boolean;
  allowStyleTags?: boolean;
  stripComments?: boolean;
}

class XSSProtection {
  private defaultOptions: XSSProtectionOptions = {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'hr',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'b',
      'i',
      'u',
      's',
      'del',
      'ins',
      'blockquote',
      'code',
      'pre',
      'a',
      'img',
      'div',
      'span',
      'section',
      'article',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'button',
      'input',
      'label',
      'select',
      'option',
      'textarea',
    ],
    allowedAttributes: {
      '*': ['class', 'id', 'style', 'title', 'lang', 'dir'],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      input: ['type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'required'],
      button: ['type', 'disabled'],
      select: ['name', 'disabled', 'required', 'multiple'],
      textarea: ['name', 'placeholder', 'disabled', 'readonly', 'required', 'rows', 'cols'],
    },
    allowScriptTags: false,
    allowStyleTags: false,
    stripComments: true,
  };

  /**
   * 转义HTML特殊字符
   * @param str 输入字符串
   * @returns 转义后的字符串
   */
  escapeHTML(str: string): string {
    if (!str) return '';

    return str.replace(/[&<>"']/g, (match) => {
      switch (match) {
        case '&':
          return '&';
        case '<':
          return '<';
        case '>':
          return '>';
        case '"':
          return '"';
        case "'":
          return '&#x27;';
        default:
          return match;
      }
    });
  }

  /**
   * 转义HTML属性值
   * @param str 输入字符串
   * @returns 转义后的字符串
   */
  escapeAttribute(str: string): string {
    if (!str) return '';

    return str.replace(new RegExp('[&<>"\'`=/]', 'g'), (match) => {
      switch (match) {
        case '&':
          return '&';
        case '<':
          return '<';
        case '>':
          return '>';
        case '"':
          return '"';
        case "'":
          return '&#x27;';
        case '`':
          return '&#96;';
        case '=':
          return '&#61;';
        case '/':
          return '&#47;';
        default:
          return match;
      }
    });
  }

  /**
   * 清理HTML内容，移除潜在危险的标签和属性
   * @param html HTML内容
   * @param options 清理选项
   * @returns 清理后的HTML
   */
  sanitizeHTML(html: string, options?: XSSProtectionOptions): string {
    if (!html) return '';

    const opts = { ...this.defaultOptions, ...options };

    // 移除HTML注释
    if (opts.stripComments) {
      html = html.replace(/<!--[\s\S]*?-->/g, '');
    }

    // 简单的标签和属性清理
    // 注意：这是一个基础实现，生产环境建议使用专业的库如DOMPurify
    let sanitized = html;

    // 移除不允许的标签
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
    sanitized = sanitized.replace(tagRegex, (match, tagName) => {
      const lowerTagName = tagName.toLowerCase();

      // 检查是否为允许的标签
      if (!opts.allowedTags?.includes(lowerTagName)) {
        // 特殊处理不允许的标签
        if (lowerTagName === 'script' && !opts.allowScriptTags) {
          return '';
        }
        if (lowerTagName === 'style' && !opts.allowStyleTags) {
          return '';
        }
        // 其他不允许的标签直接移除
        return '';
      }

      // 清理属性
      return this.sanitizeTagAttributes(match, lowerTagName, opts);
    });

    // 递归清理嵌套内容 (基础实现, 处理pre/code中的潜在script)
    sanitized = this.recursiveCleanNested(sanitized, opts);

    return sanitized;
  }

  /**
   * 清理标签属性
   * @param tagHtml 标签HTML
   * @param tagName 标签名
   * @param options 清理选项
   * @returns 清理后的标签HTML
   */
  private sanitizeTagAttributes(tagHtml: string, tagName: string, options: XSSProtectionOptions): string {
    const attrRegex = /([a-zA-Z][a-zA-Z0-9_-]*)\s*=\s*("[^"]*"|'[^']*'|[^"'\s>]+)/g;
    const allowedAttrs = options.allowedAttributes || {};

    // 获取该标签允许的属性
    const globalAllowedAttrs = allowedAttrs['*'] || [];
    const tagAllowedAttrs = allowedAttrs[tagName] || [];
    const allAllowedAttrs = [...globalAllowedAttrs, ...tagAllowedAttrs];

    // 提取标签名和结束标记
    const isClosingTag = tagHtml.startsWith('</');
    const isSelfClosing = tagHtml.endsWith('/>');

    if (isClosingTag) {
      return tagHtml; // 结束标签不需要处理属性
    }

    // 提取标签名部分
    const tagNameEnd = tagHtml.indexOf(' ');
    const tagNamePart = tagNameEnd === -1 ? tagHtml.split('>')[0] + '>' : tagHtml.substring(0, tagNameEnd);

    // 如果没有属性，直接返回
    if (tagNameEnd === -1 && !isSelfClosing) {
      return tagHtml;
    }

    // 处理属性
    const attributes: string[] = [];
    let match;

    while ((match = attrRegex.exec(tagHtml)) !== null) {
      const attrName = match[1]?.toLowerCase() || '';
      const attrValue = match[2];

      // 检查属性是否允许
      if (allAllowedAttrs.includes(attrName)) {
        // 特殊处理某些属性
        if (attrName === 'href' || attrName === 'src') {
          // 检查URL协议
          // const reg = new RegExp('^(http:|https:|//)', 'i');
          const url = this.stripQuotes(attrValue || '');
          if (this.isSafeURL(url)) {
            attributes.push(`${attrName}="${this.escapeAttribute(url)}"`);
          }
        } else if (attrName === 'style') {
          // 简单的样式清理
          const style = this.stripQuotes(attrValue || '');
          const sanitizedStyle = this.sanitizeStyle(style);
          if (sanitizedStyle) {
            attributes.push(`${attrName}="${sanitizedStyle}"`);
          }
        } else {
          // 其他允许的属性
          const value = this.stripQuotes(attrValue || '');
          attributes.push(`${attrName}="${this.escapeAttribute(value)}"`);
        }
      }
    }

    // 重新构建标签
    let result = tagNamePart;
    if (attributes.length > 0) {
      result += ' ' + attributes.join(' ');
    }

    if (isSelfClosing) {
      result += ' />';
    } else {
      result += '>';
    }

    return result;
  }

  /**
   * 移除属性值的引号
   * @param value 属性值
   * @returns 去除引号后的值
   */
  private stripQuotes(value: string): string {
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      return value.substring(1, value.length - 1);
    }
    return value;
  }

  /**
   * 检查URL是否安全
   * @param url URL字符串
   * @returns 是否安全
   */
  private isSafeURL(url: string): boolean {
    if (!url) return false;

    // 检查协议
    const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'data:image/'];
    try {
      // 在Taro环境中，可能没有window对象，使用相对URL
      const urlObj = new URL(url, 'http://example.com');
      return safeProtocols.some((protocol) => urlObj.protocol === protocol);
    } catch (e) {
      // 如果URL解析失败，检查是否为相对路径
      return !url.startsWith('javascript:') && !url.startsWith('data:');
    }
  }

  /**
   * 清理CSS样式
   * @param style CSS样式字符串
   * @returns 清理后的样式
   */
  private sanitizeStyle(style: string): string {
    if (!style) return '';

    // 危险的CSS属性和值
    const dangerousProperties = [
      'expression',
      'javascript:',
      'behavior',
      'script',
      'binding',
      'include-source',
      '-moz-binding',
    ];

    const dangerousValues = ['javascript:', 'vbscript:', 'data:', 'expression(', 'eval(', 'script:', 'behavior('];

    // 检查是否包含危险内容
    const lowerStyle = style.toLowerCase();
    for (const dangerous of dangerousProperties) {
      if (lowerStyle.includes(dangerous)) {
        return '';
      }
    }

    for (const dangerous of dangerousValues) {
      if (lowerStyle.includes(dangerous)) {
        return '';
      }
    }

    return style;
  }

  /**
   * 清理JSON内容，防止原型污染
   * @param json JSON字符串
   * @returns 清理后的JSON字符串
   */
  sanitizeJSON(json: string): string {
    if (!json) return '';

    try {
      const parsed = JSON.parse(json);
      const sanitized = this.sanitizeObject(parsed);
      return JSON.stringify(sanitized);
    } catch (e) {
      return '';
    }
  }

  /**
   * 递归清理对象，防止原型污染
   * @param obj 输入对象
   * @returns 清理后的对象
   */
  private sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string' ? this.escapeHTML(obj) : obj;
    }

    // 处理数组
    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item));
    }

    // 处理对象
    const result: Record<string, any> = {};

    for (const key in obj) {
      // 跳过原型属性
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      // 检查危险属性名
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }

      // 递归清理属性值
      result[key] = this.sanitizeObject(obj[key]);
    }

    return result;
  }

  /**
   * 递归清理嵌套HTML内容
   * @param html HTML字符串
   * @param options 选项
   * @returns 清理后的HTML
   */
  private recursiveCleanNested(html: string, options: XSSProtectionOptions): string {
    // 基础递归: 处理pre/code块中的内容
    const nestedRegex = /<(pre|code)>([\s\S]*?)<\/(pre|code)>/g;
    return html.replace(nestedRegex, (_match, tag, content, closeTag) => {
      const sanitizedContent = this.sanitizeHTML(content, {
        ...options,
        allowedTags: options.allowedTags?.filter((t) => t !== 'script' && t !== 'style') || [],
        allowScriptTags: false,
        allowStyleTags: false,
      });
      return `<${tag}>${sanitizedContent}</${closeTag}>`;
    });
  }

  /**
   * 设置OWASP全局hook
   * 监听全局错误, 清理并日志记录
   */
  setupOWASPHook(errorLogger: any): void {
    // Taro环境
    if (typeof Taro !== 'undefined') {
      Taro.onError((error: any) => {
        let message = '';
        let stack = '';
        if (error instanceof Error) {
          message = error.message;
          stack = error.stack || '';
        } else {
          message = String(error);
        }
        const sanitizedError = this.sanitizeObject({
          message,
          stack,
          type: 'Taro Error',
        });
        errorLogger.logError(sanitizedError);
      });
    } else {
      // Web环境
      window.addEventListener('error', (event: ErrorEvent) => {
        const sanitizedError = this.sanitizeObject({
          message: event.message || '',
          filename: event.filename || '',
          lineno: event.lineno,
          type: 'Window Error',
        });
        errorLogger.logError(sanitizedError);
      });

      window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        const reason = event.reason;
        let message = 'Unhandled Promise Rejection';
        if (reason instanceof Error) {
          message = reason.message;
        } else if (typeof reason === 'string') {
          message = reason;
        }
        const sanitizedError = this.sanitizeObject({
          message,
          type: 'Promise Rejection',
        });
        errorLogger.logError(sanitizedError);
      });
    }
  }
}

// 创建单例实例
const xssProtection = new XSSProtection();

// 导出便捷方法
export const escapeHTML = (str: string) => xssProtection.escapeHTML(str);
export const escapeAttribute = (str: string) => xssProtection.escapeAttribute(str);
export const sanitizeHTML = (html: string, options?: XSSProtectionOptions) => xssProtection.sanitizeHTML(html, options);
export const sanitizeJSON = (json: string) => xssProtection.sanitizeJSON(json);
export const setupOWASPHook = (errorLogger: any) => xssProtection.setupOWASPHook(errorLogger);

export default xssProtection;
