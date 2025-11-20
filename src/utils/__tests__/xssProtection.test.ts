/**
 * xssProtection 单元测试
 */

import { escapeHTML, escapeAttribute, sanitizeHTML, sanitizeJSON } from '../xssProtection';

describe('xssProtection', () => {
  describe('escapeHTML', () => {
    it('应该转义HTML特殊字符', () => {
      const input = '<script>alert("xss")</script>';
      const result = escapeHTML(input);
      expect(result).toBe('<script>alert("xss")</script>');
    });

    it('应该转义多种特殊字符', () => {
      const input = '<div>&"\'</div>';
      const result = escapeHTML(input);
      expect(result).toBe('<div>&"&#x27;</div>');
    });

    it('应该处理空字符串', () => {
      const input = '';
      const result = escapeHTML(input);
      expect(result).toBe('');
    });

    it('应该处理普通文本', () => {
      const input = 'Hello, World!';
      const result = escapeHTML(input);
      expect(result).toBe('Hello, World!');
    });
  });

  describe('escapeAttribute', () => {
    it('应该转义属性值中的特殊字符', () => {
      const input = 'javascript:alert("xss")';
      const result = escapeAttribute(input);
      expect(result).toBe('javascript:alert("xss")');
    });

    it('应该转义引号', () => {
      const input = '"test"';
      const result = escapeAttribute(input);
      expect(result).toBe('"test"');
    });

    it('应该处理空字符串', () => {
      const input = '';
      const result = escapeAttribute(input);
      expect(result).toBe('');
    });
  });

  describe('sanitizeHTML', () => {
    it('应该移除script标签', () => {
      const input = '<div><script>alert("xss")</script></div>';
      const result = sanitizeHTML(input);
      expect(result).toBe('<div></div>');
    });

    it('应该保留允许的标签', () => {
      const input = '<div><p>Hello</p><span>World</span></div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div', 'p', 'span']
      });
      expect(result).toBe('<div><p>Hello</p><span>World</span></div>');
    });

    it('应该移除不允许的标签', () => {
      const input = '<div><p>Hello</p><iframe src="malicious"></iframe></div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div', 'p']
      });
      expect(result).toBe('<div><p>Hello</p></div>');
    });

    it('应该处理允许的属性', () => {
      const input = '<div class="test" id="main">Content</div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div'],
        allowedAttributes: {
          div: ['class']
        }
      });
      expect(result).toBe('<div class="test">Content</div>');
    });

    it('应该移除不允许的属性', () => {
      const input = '<div onclick="alert(\'xss\')" class="test">Content</div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div'],
        allowedAttributes: {
          div: ['class']
        }
      });
      expect(result).toBe('<div class="test">Content</div>');
    });

    it('应该处理style标签', () => {
      const input = '<div><style>body { background: red; }</style></div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div'],
        allowStyleTags: false
      });
      expect(result).toBe('<div></div>');
    });

    it('应该移除HTML注释', () => {
      const input = '<div><!-- This is a comment -->Content</div>';
      const result = sanitizeHTML(input, {
        allowedTags: ['div'],
        stripComments: true
      });
      expect(result).toBe('<div>Content</div>');
    });

    it('应该处理空字符串', () => {
      const input = '';
      const result = sanitizeHTML(input);
      expect(result).toBe('');
    });
  });

  describe('sanitizeJSON', () => {
    it('应该转义JSON中的特殊字符', () => {
      const input = '{"html":"<script>alert(1)</script>"}';
      const result = sanitizeJSON(input);
      expect(result).toBe('{"html":"<script>alert(1)</script>"}');
    });

    it('应该处理有效的JSON', () => {
      const input = '{"name":"John","age":30}';
      const result = sanitizeJSON(input);
      expect(result).toBe('{"name":"John","age":30}');
    });

    it('应该处理空字符串', () => {
      const input = '';
      const result = sanitizeJSON(input);
      expect(result).toBe('');
    });

    it('应该处理无效的JSON', () => {
      const input = '{"name":"John","age":30';
      const result = sanitizeJSON(input);
      expect(result).toBe('{"name":"John","age":30');
    });
  });

  describe('XSS防护综合测试', () => {
    it('应该防止多种XSS攻击', () => {
      const xssAttacks = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">',
        '<svg onload="alert(\'XSS\')">',
        '<iframe src="javascript:alert(\'XSS\')">',
        '<link rel="stylesheet" href="javascript:alert(\'XSS\')">',
        '<body onload="alert(\'XSS\')">',
        '<div style="width:expression(alert(\'XSS\'))">',
        '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')">',
        '<object data="javascript:alert(\'XSS\')">',
        '<isindex type="image" src="javascript:alert(\'XSS\')">',
        '<input type="image" src="javascript:alert(\'XSS\')">',
        '<background src="javascript:alert(\'XSS\')">',
        '<base href="javascript:alert(\'XSS\')">',
        '<bgsound src="javascript:alert(\'XSS\')">',
        '<embed src="javascript:alert(\'XSS\')">',
        '<applet code="javascript:alert(\'XSS\')">',
        '<xml src="javascript:alert(\'XSS\')">'
      ];

      xssAttacks.forEach(attack => {
        // 测试HTML转义
        const escapedHTML = escapeHTML(attack);
        expect(escapedHTML).not.toContain('<script>');
        expect(escapedHTML).not.toContain('javascript:');
        expect(escapedHTML).not.toContain('onerror=');
        expect(escapedHTML).not.toContain('onload=');

        // 测试HTML清理
        const sanitizedHTML = sanitizeHTML(attack);
        expect(sanitizedHTML).not.toContain('<script>');
        expect(sanitizedHTML).not.toContain('javascript:');
        expect(sanitizedHTML).not.toContain('onerror=');
        expect(sanitizedHTML).not.toContain('onload=');
      });
    });

    it('应该保留安全的HTML内容', () => {
      const safeHTML = '<div class="container"><p>This is <strong>safe</strong> content.</p></div>';
      const result = sanitizeHTML(safeHTML, {
        allowedTags: ['div', 'p', 'strong'],
        allowedAttributes: {
          div: ['class']
        }
      });
      expect(result).toBe(safeHTML);
    });
  });

  describe('recursiveCleanNested', () => {
    it('应该清理pre/code中的嵌套script', () => {
      const input = '<pre><script>alert("xss")</script>safe code</pre>';
      const result = sanitizeHTML(input, {
        allowedTags: ['pre', 'code'],
        allowScriptTags: false
      });
      expect(result).toBe('<pre>safe code</pre>');
    });

    it('应该保留安全的嵌套内容', () => {
      const input = '<code><p>safe</p></code>';
      const result = sanitizeHTML(input, {
        allowedTags: ['code', 'p']
      });
      expect(result).toBe('<code><p>safe</p></code>');
    });
  });

  describe('setupOWASPHook', () => {
    const mockErrorLogger = { logError: jest.fn() };
    const mockTaro = {
      onError: jest.fn()
    };
    const mockWindow = {
      addEventListener: jest.fn()
    };

    beforeEach(() => {
      jest.clearAllMocks();
      // Mock Taro
      jest.doMock('@tarojs/taro', () => mockTaro);
      // Mock window
      global.window = mockWindow as any;
    });

    it('应该在Taro环境中设置hook', () => {
      const { setupOWASPHook } = require('../xssProtection');
      setupOWASPHook(mockErrorLogger);
      expect(mockTaro.onError).toHaveBeenCalled();
    });

    it('应该在Web环境中设置hook', () => {
      // Mock no Taro
      jest.doMock('@tarojs/taro', () => ({}));
      const { setupOWASPHook } = require('../xssProtection');
      setupOWASPHook(mockErrorLogger);
      expect(mockWindow.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
      expect(mockWindow.addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
    });

    it('应该清理并日志错误', () => {
      const { setupOWASPHook } = require('../xssProtection');
      setupOWASPHook(mockErrorLogger);

      // Simulate Taro error
      const mockErrorCallback = mockTaro.onError.mock.calls[0][0];
      const error = new Error('<script>alert(1)</script>');
      mockErrorCallback(error);

      expect(mockErrorLogger.logError).toHaveBeenCalledWith(expect.objectContaining({
        message: '<script>alert(1)</script>',
        type: 'Taro Error'
      }));
    });
  });
});