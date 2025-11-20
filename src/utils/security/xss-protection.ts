/**
 * XSS防护工具函数
 */

/**
 * 转义HTML特殊字符
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (m) => map[m] ?? m);
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  const stripped = text.replace(/[\u0000-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '');
  return escapeHtml(stripped);
}

/**
 * 净化HTML内容
 */
export function sanitizeHtml(html: string): string {
  // 简单的HTML净化实现
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * 验证URL安全性
 */
export function isSafeUrl(url: string): boolean {
  const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  try {
    const parsed = new URL(url);
    return safeProtocols.includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * CSP头生成器
 */
export function generateCSPHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  return directives.join('; ');
}
