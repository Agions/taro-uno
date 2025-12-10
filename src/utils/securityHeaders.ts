/**
 * 安全头部设置工具
 * 提供HTTP安全头部设置功能，增强应用安全性
 */

interface SecurityHeadersConfig {
  contentSecurityPolicy?: boolean | string;
  strictTransportSecurity?: boolean | string;
  xContentTypeOptions?: boolean;
  xFrameOptions?: boolean | string;
  xXSSProtection?: boolean | string;
  referrerPolicy?: boolean | string;
  permissionsPolicy?: boolean | string;
  expectCT?: boolean | string;
}

interface SecurityHeadersResult {
  headers: Record<string, string>;
  cspNonce?: string | undefined;
}

class SecurityHeaders {
  private defaultConfig: SecurityHeadersConfig = {
    contentSecurityPolicy: true,
    strictTransportSecurity: true,
    xContentTypeOptions: true,
    xFrameOptions: 'DENY',
    xXSSProtection: '1; mode=block',
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: true,
    expectCT: false,
  };

  /**
   * 生成安全头部
   * @param config 配置选项
   * @returns 安全头部对象
   */
  generateHeaders(config?: SecurityHeadersConfig): SecurityHeadersResult {
    const finalConfig = { ...this.defaultConfig, ...config };
    const headers: Record<string, string> = {};
    let cspNonce: string | undefined;

    // Content Security Policy
    if (finalConfig.contentSecurityPolicy) {
      const csp =
        typeof finalConfig.contentSecurityPolicy === 'string' ? finalConfig.contentSecurityPolicy : this.generateCSP();

      // 生成CSP nonce
      cspNonce = this.generateNonce();

      headers['Content-Security-Policy'] = csp.replace(/'nonce-[^']+'/g, `'nonce-${cspNonce}'`);
    }

    // Strict Transport Security
    if (finalConfig.strictTransportSecurity) {
      const hsts =
        typeof finalConfig.strictTransportSecurity === 'string'
          ? finalConfig.strictTransportSecurity
          : 'max-age=31536000; includeSubDomains; preload';
      headers['Strict-Transport-Security'] = hsts;
    }

    // X-Content-Type-Options
    if (finalConfig.xContentTypeOptions) {
      headers['X-Content-Type-Options'] = 'nosniff';
    }

    // X-Frame-Options
    if (finalConfig.xFrameOptions) {
      const frameOptions = typeof finalConfig.xFrameOptions === 'string' ? finalConfig.xFrameOptions : 'DENY';
      headers['X-Frame-Options'] = frameOptions;
    }

    // X-XSS-Protection
    if (finalConfig.xXSSProtection) {
      const xssProtection =
        typeof finalConfig.xXSSProtection === 'string' ? finalConfig.xXSSProtection : '1; mode=block';
      headers['X-XSS-Protection'] = xssProtection;
    }

    // Referrer Policy
    if (finalConfig.referrerPolicy) {
      const referrerPolicy =
        typeof finalConfig.referrerPolicy === 'string' ? finalConfig.referrerPolicy : 'strict-origin-when-cross-origin';
      headers['Referrer-Policy'] = referrerPolicy;
    }

    // Permissions Policy
    if (finalConfig.permissionsPolicy) {
      const permissionsPolicy =
        typeof finalConfig.permissionsPolicy === 'string'
          ? finalConfig.permissionsPolicy
          : this.generatePermissionsPolicy();
      headers['Permissions-Policy'] = permissionsPolicy;
    }

    // Expect-CT
    if (finalConfig.expectCT) {
      const expectCT = typeof finalConfig.expectCT === 'string' ? finalConfig.expectCT : 'max-age=86400, enforce';
      headers['Expect-CT'] = expectCT;
    }

    return {
      headers,
      cspNonce,
    };
  }

  /**
   * 生成内容安全策略
   * @returns CSP字符串
   */
  private generateCSP(): string {
    // 基础CSP策略，可根据实际需求调整
    return [
      "default-src 'self'",
      "script-src 'self' 'nonce-{nonce}' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'nonce-{nonce}' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "require-trusted-types-for 'script'",
      'report-uri /csp-report',
    ].join('; ');
  }

  /**
   * 生成权限策略
   * @returns 权限策略字符串
   */
  private generatePermissionsPolicy(): string {
    // 基础权限策略，可根据实际需求调整
    return [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'battery=()',
      'bluetooth=()',
      'camera=()',
      'cross-origin-isolated=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'execution-while-not-rendered=()',
      'execution-while-out-of-viewport=()',
      'focus-without-user-activation=()',
      'fullscreen=()',
      'geolocation=()',
      'gyroscope=()',
      'hid=()',
      'identity-credentials-get=()',
      'idle-detection=()',
      'local-fonts=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'otp-credentials=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'serial=()',
      'storage-access=()',
      'usb=()',
      'web-share=()',
      'window-management=()',
      'xr-spatial-tracking=()',
    ].join(', ');
  }

  /**
   * 生成随机nonce值
   * @returns nonce字符串
   */
  private generateNonce(): string {
    // 生成16字节的随机数，转换为base64字符串
    const array = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      // 降级方案，使用Math.random
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }

    // 转换为base64
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  /**
   * 为API请求添加安全头部
   * @param originalHeaders 原始头部对象
   * @param config 配置选项
   * @returns 增强后的头部对象
   */
  addSecurityHeadersToRequest(
    originalHeaders: Record<string, string> = {},
    config?: SecurityHeadersConfig,
  ): Record<string, string> {
    const { headers } = this.generateHeaders(config);

    // 过滤出适合请求的头部
    const requestSecurityHeaders: Record<string, string> = {};

    // 添加适合请求的安全头部
    if (headers['X-Content-Type-Options']) {
      requestSecurityHeaders['X-Content-Type-Options'] = headers['X-Content-Type-Options'];
    }

    if (headers['X-XSS-Protection']) {
      requestSecurityHeaders['X-XSS-Protection'] = headers['X-XSS-Protection'];
    }

    if (headers['Referrer-Policy']) {
      requestSecurityHeaders['Referrer-Policy'] = headers['Referrer-Policy'];
    }

    return {
      ...originalHeaders,
      ...requestSecurityHeaders,
    };
  }

  /**
   * 为响应添加安全头部
   * @param originalHeaders 原始头部对象
   * @param config 配置选项
   * @returns 增强后的头部对象
   */
  addSecurityHeadersToResponse(
    originalHeaders: Record<string, string> = {},
    config?: SecurityHeadersConfig,
  ): Record<string, string> {
    const { headers } = this.generateHeaders(config);

    return {
      ...originalHeaders,
      ...headers,
    };
  }

  /**
   * 验证CSP合规性
   * @param csp CSP字符串
   * @returns 验证结果
   */
  validateCSP(csp: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 基本验证
    if (!csp) {
      errors.push('CSP不能为空');
      return { isValid: false, errors };
    }

    // 检查是否包含必要的指令
    const requiredDirectives = ['default-src', 'script-src'];
    const directives = csp.split(';').map((dir) => dir.trim().split('=')[0]);

    for (const directive of requiredDirectives) {
      if (!directives.includes(directive)) {
        errors.push(`缺少必要的CSP指令: ${directive}`);
      }
    }

    // 检查是否包含不安全的值
    const unsafePatterns = [
      /script-src\s+\*\s*;/,
      /default-src\s+\*\s*;/,
      /'unsafe-inline'/,
      /'unsafe-eval'/,
      /data:\s*script/,
    ];

    for (const pattern of unsafePatterns) {
      if (pattern.test(csp)) {
        errors.push(`CSP包含不安全的配置: ${pattern}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// 创建单例实例
const securityHeaders = new SecurityHeaders();

// 导出便捷方法
export const generateSecurityHeaders = (config?: SecurityHeadersConfig) => securityHeaders.generateHeaders(config);
export const addSecurityHeadersToRequest = (headers?: Record<string, string>, config?: SecurityHeadersConfig) =>
  securityHeaders.addSecurityHeadersToRequest(headers, config);
export const addSecurityHeadersToResponse = (headers?: Record<string, string>, config?: SecurityHeadersConfig) =>
  securityHeaders.addSecurityHeadersToResponse(headers, config);
export const validateCSP = (csp: string) => securityHeaders.validateCSP(csp);

export default securityHeaders;
