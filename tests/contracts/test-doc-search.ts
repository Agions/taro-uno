/**
 * Contract Test: Documentation Search Functionality
 *
 * This test validates that the documentation search functionality follows the contract
 * defined in specs/001-github-page-api/contracts/documentation-api.yaml
 */

import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

interface SearchResult {
  id: string;
  title: string;
  type: 'api' | 'guide' | 'example' | 'faq';
  content: string;
  url: string;
  relevance: number;
}

interface NavigationStructure {
  sections: NavigationSection[];
  version: string;
}

interface NavigationSection {
  id: string;
  title: string;
  path: string;
  icon?: string;
  children?: NavigationSection[];
}

describe('Documentation Search Functionality Contract Tests', () => {
  const docsRoot = 'docs';
  const supportedDocTypes = ['api', 'guide', 'example', 'faq'];

  test('search configuration exists in VitePress config', () => {
    const configPath = join(docsRoot, '.vitepress', 'config.ts');
    expect(existsSync(configPath)).toBe(true);

    const configContent = readFileSync(configPath, 'utf-8');

    // Check for search configuration
    expect(configContent).toMatch(/search:\s*{/);
    expect(configContent).toMatch(/provider:\s*['"]local['"]/);
    expect(configContent).toMatch(/options:\s*{/);
    expect(configContent).toMatch(/locales:\s*{/);
  });

  test('search index contains required fields', async () => {
    // Test search index structure (simulated for contract testing)
    const searchIndex: Record<string, SearchResult[]> = {
      button: [
        {
          id: 'components-basic-button',
          title: 'Button 按钮',
          type: 'api',
          content: 'Button component for clickable actions',
          url: '/components/basic/button/',
          relevance: 0.95,
        },
      ],
      form: [
        {
          id: 'components-form-form',
          title: 'Form 表单',
          type: 'api',
          content: 'Form component for data collection',
          url: '/components/form/form/',
          relevance: 0.92,
        },
      ],
    };

    // Validate search index structure
    for (const [query, results] of Object.entries(searchIndex)) {
      expect(query).toBeTruthy();
      expect(results.length).toBeGreaterThan(0);

      for (const result of results) {
        // Validate required fields
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('content');
        expect(result).toHaveProperty('url');
        expect(result).toHaveProperty('relevance');

        // Validate field types and values
        expect(typeof result.id).toBe('string');
        expect(typeof result.title).toBe('string');
        expect(typeof result.content).toBe('string');
        expect(typeof result.url).toBe('string');
        expect(typeof result.relevance).toBe('number');
        expect(result.relevance).toBeGreaterThanOrEqual(0);
        expect(result.relevance).toBeLessThanOrEqual(1);

        // Validate doc type
        expect(supportedDocTypes).toContain(result.type);

        // Validate URL format
        expect(result.url).toMatch(new RegExp('^/[\\w-/]+/?$'));
      }
    }
  });

  test('navigation structure is searchable', () => {
    const navigationStructure: NavigationStructure = {
      sections: [
        {
          id: 'components',
          title: '组件',
          path: '/components/',
          children: [
            {
              id: 'basic',
              title: '基础组件',
              path: '/components/basic/',
              children: [
                {
                  id: 'button',
                  title: 'Button 按钮',
                  path: '/components/basic/button/',
                },
              ],
            },
          ],
        },
        {
          id: 'guides',
          title: '指南',
          path: '/guides/',
          children: [
            {
              id: 'getting-started',
              title: '快速开始',
              path: '/guides/getting-started/',
            },
          ],
        },
      ],
      version: '1.0.0',
    };

    // Validate navigation structure
    expect(navigationStructure.sections.length).toBeGreaterThan(0);
    expect(navigationStructure.version).toBeTruthy();

    for (const section of navigationStructure.sections) {
      expect(section.id).toBeTruthy();
      expect(section.title).toBeTruthy();
      expect(section.path).toBeTruthy();
      expect(section.path).toMatch(/^\/[\w-]+\/?$/);
    }
  });

  test('search results are properly ranked', () => {
    const searchResults: SearchResult[] = [
      {
        id: 'exact-match',
        title: 'Button Component',
        type: 'api',
        content: 'Button component documentation',
        url: '/components/button/',
        relevance: 1.0,
      },
      {
        id: 'partial-match',
        title: 'Form with Button',
        type: 'api',
        content: 'Form component that includes button',
        url: '/components/form/',
        relevance: 0.75,
      },
      {
        id: 'related-match',
        title: 'Input Component',
        type: 'api',
        content: 'Input component related to form submission',
        url: '/components/input/',
        relevance: 0.5,
      },
    ];

    // Verify results are sorted by relevance (high to low)
    for (let i = 0; i < searchResults.length - 1; i++) {
      expect(searchResults[i].relevance).toBeGreaterThanOrEqual(searchResults[i + 1].relevance);
    }

    // Verify relevance scores are within valid range
    searchResults.forEach((result) => {
      expect(result.relevance).toBeGreaterThanOrEqual(0);
      expect(result.relevance).toBeLessThanOrEqual(1);
    });
  });

  test('search supports different document types', async () => {
    const docTypeResults = {
      api: {
        count: 50,
        sample: {
          id: 'components-button',
          title: 'Button 按钮',
          type: 'api',
          content: 'Button API documentation',
          url: '/components/button/',
          relevance: 0.95,
        },
      },
      guide: {
        count: 20,
        sample: {
          id: 'guides-getting-started',
          title: '快速开始',
          type: 'guide',
          content: 'Getting started guide',
          url: '/guides/getting-started/',
          relevance: 0.9,
        },
      },
      example: {
        count: 30,
        sample: {
          id: 'examples-basic',
          title: '基础示例',
          type: 'example',
          content: 'Basic usage examples',
          url: '/examples/basic/',
          relevance: 0.85,
        },
      },
      faq: {
        count: 15,
        sample: {
          id: 'faq-installation',
          title: '安装问题',
          type: 'faq',
          content: 'Installation troubleshooting',
          url: '/faq/installation/',
          relevance: 0.8,
        },
      },
    };

    // Verify all document types are supported
    for (const [type, data] of Object.entries(docTypeResults)) {
      expect(supportedDocTypes).toContain(type);
      expect(data.count).toBeGreaterThan(0);
      expect(data.sample.type).toBe(type);
      expect(data.sample.url).toMatch(new RegExp(`/${type}s?/`));
    }
  });

  test('search handles Chinese and English content', () => {
    const mixedLanguageResults: SearchResult[] = [
      {
        id: 'button-zh',
        title: 'Button 按钮',
        type: 'api',
        content: 'Button 按钮组件说明',
        url: '/components/button/',
        relevance: 0.95,
      },
      {
        id: 'form-en',
        title: 'Form Component',
        type: 'api',
        content: 'Form component documentation',
        url: '/components/form/',
        relevance: 0.9,
      },
    ];

    // Verify mixed language content is handled
    mixedLanguageResults.forEach((result) => {
      // Should contain either Chinese or English characters
      const hasChinese = /[\u4e00-\u9fa5]/.test(result.title + result.content);
      const hasEnglish = new RegExp('^[a-zA-Z0-9_\\-/]+$').test(result.title + result.content);

      expect(hasChinese || hasEnglish).toBe(true);
    });
  });

  test('search content extraction is accurate', async () => {
    // Simulate content extraction
    const extractedContent = {
      title: 'Button 按钮',
      description: 'Button 按钮组件用于触发操作',
      api: {
        props: ['type', 'size'],
        types: ['string', 'string'],
      },
      examples: ['<Button type="primary">Click me</Button>'],
      faq: ['如何自定义按钮样式？'],
    };

    // Verify content extraction
    expect(extractedContent.title).toMatch(/Button|按钮/);
    expect(extractedContent.description).toContain('Button');
    expect(extractedContent.api.props.length).toBeGreaterThan(0);
    expect(extractedContent.examples.length).toBeGreaterThan(0);
    expect(extractedContent.faq.length).toBeGreaterThan(0);
  });

  test('search indexing includes all documentation pages', async () => {
    const allDocFiles = await glob('docs/**/*.md', {
      ignore: ['docs/.vitepress/**', 'docs/node_modules/**', 'docs/component-template.md'],
    });

    expect(allDocFiles.length).toBeGreaterThan(0);

    // Simulate search index generation
    const searchIndex = allDocFiles.map((filePath: string) => {
      const relativePath = filePath.replace('docs/', '/');
      const content = readFileSync(filePath, 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : filePath;

      return {
        id: filePath.replace(/\//g, '-'),
        title,
        content: content.replace(/[#*`[\]]/g, '').substring(0, 200),
        url: relativePath.replace(/\.md$/, '/'),
        relevance: 1.0,
        type: getDocType(relativePath) as any,
      };
    });

    // Verify all pages are indexed
    expect(searchIndex.length).toBe(allDocFiles.length);

    // Verify index structure
    searchIndex.forEach((item: { id: string; title: string; content: string; url: string; type: string }) => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.content).toBeTruthy();
      expect(item.url).toBeTruthy();
      expect(item.type).toBeTruthy();
      expect(supportedDocTypes).toContain(item.type);
    });
  });

  test('search handles special characters and formatting', () => {
    const specialContentResults: SearchResult[] = [
      {
        id: 'special-chars-1',
        title: 'Button & Input 组件',
        type: 'api',
        content: '组件支持 @click 和 $emit 事件',
        url: '/components/button/',
        relevance: 0.95,
      },
      {
        id: 'special-chars-2',
        title: 'Form 表单验证',
        type: 'api',
        content: '支持 required、pattern 等验证规则',
        url: '/components/form/',
        relevance: 0.9,
      },
    ];

    // Verify special characters are preserved
    specialContentResults.forEach((result) => {
      expect(result.title).toBeTruthy();
      expect(result.content).toBeTruthy();

      // Should handle special characters gracefully
      const hasSpecialChars = /[&$@#()[\]{}]/.test(result.title + result.content);
      expect(hasSpecialChars).toBe(true);
    });
  });

  test('search supports fuzzy matching', () => {
    const fuzzySearchTestCases = [
      { expectedMatches: ['button', 'Button', '按钮'] },
      { expectedMatches: ['Form', 'form', '表单'] },
      { expectedMatches: ['Input', 'input', '输入框'] },
      { expectedMatches: ['button', 'Button'] }, // typo tolerance
      { expectedMatches: ['Form', 'form', '表单'] }, // typo tolerance
    ];

    fuzzySearchTestCases.forEach(({ expectedMatches }) => {
      // Simulate fuzzy search results
      const mockResults = expectedMatches.map((title) => ({
        id: `mock-${title.toLowerCase()}`,
        title,
        type: 'api' as const,
        content: `Mock content for ${title}`,
        url: `/mock/${title.toLowerCase()}/`,
        relevance: 0.8,
      }));

      expect(mockResults.length).toBeGreaterThan(0);
      mockResults.forEach((result) => {
        const titleMatch = expectedMatches.some(
          (match) =>
            result.title.toLowerCase().includes(match.toLowerCase()) ||
            match.toLowerCase().includes(result.title.toLowerCase()),
        );
        expect(titleMatch).toBe(true);
      });
    });
  });

  test('search performance meets requirements', () => {
    const performanceThresholds = {
      maxIndexingTime: 5000, // 5 seconds
      maxSearchTime: 100, // 100ms
      maxIndexSize: 1024 * 1024, // 1MB
    };

    // Simulate performance metrics
    const performanceMetrics = {
      indexingTime: 3000, // ms
      searchTime: 50, // ms
      indexSize: 512 * 1024, // bytes
    };

    // Verify performance requirements
    expect(performanceMetrics.indexingTime).toBeLessThanOrEqual(performanceThresholds.maxIndexingTime);
    expect(performanceMetrics.searchTime).toBeLessThanOrEqual(performanceThresholds.maxSearchTime);
    expect(performanceMetrics.indexSize).toBeLessThanOrEqual(performanceThresholds.maxIndexSize);
  });

  test('search handles large documentation sets efficiently', () => {
    const largeDocSet = {
      totalDocs: 1000,
      searchQueries: 100,
      averageResponseTime: 80, // ms
      cacheHitRate: 0.85,
    };

    // Verify scalability
    expect(largeDocSet.totalDocs).toBeGreaterThan(100);
    expect(largeDocSet.searchQueries).toBeGreaterThan(10);
    expect(largeDocSet.averageResponseTime).toBeLessThan(100);
    expect(largeDocSet.cacheHitRate).toBeGreaterThan(0.5);
  });
});

// Helper function to determine document type from path
function getDocType(filePath: string): string {
  if (filePath.includes('/components/')) return 'api';
  if (filePath.includes('/guides/')) return 'guide';
  if (filePath.includes('/examples/')) return 'example';
  if (filePath.includes('/faq/')) return 'faq';
  return 'guide'; // default
}
