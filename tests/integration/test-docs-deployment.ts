/**
 * Integration Test: Documentation Deployment Pipeline
 *
 * This test validates that the complete documentation deployment pipeline
 * works correctly from build to GitHub Pages deployment.
 */

import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// Test configuration
const TEST_DIR = join(process.cwd(), 'test-docs-deployment');
const DOCS_DIR = join(process.cwd(), 'docs');
const BUILD_DIR = join(DOCS_DIR, '.vitepress', 'dist');
const WORKFLOW_FILE = join(process.cwd(), '.github', 'workflows', 'docs-deploy.yml');

interface DeploymentMetrics {
  buildTime: number;
  buildSize: number;
  searchIndexSize: number;
  staticAssetsCount: number;
  htmlPagesCount: number;
}

interface WorkflowValidation {
  fileExists: boolean;
  syntaxValid: boolean;
  triggersCorrect: boolean;
  jobsDefined: boolean;
  permissionsCorrect: boolean;
}

describe('Documentation Deployment Pipeline Integration Tests', () => {
  let testMetrics: DeploymentMetrics;
  let originalConsoleLog: typeof console.log;
  let originalConsoleError: typeof console.error;

  beforeAll(() => {
    // Setup test environment
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = vi.fn();
    console.error = vi.fn();

    // Ensure test directory exists
    if (!existsSync(TEST_DIR)) {
      mkdirSync(TEST_DIR, { recursive: true });
    }

    // Clean any previous test artifacts
    if (existsSync(BUILD_DIR)) {
      rmSync(BUILD_DIR, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    // Restore console and cleanup
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Cleanup test artifacts
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('GitHub Actions workflow file exists and is valid', () => {
    const workflow: WorkflowValidation = {
      fileExists: existsSync(WORKFLOW_FILE),
      syntaxValid: false,
      triggersCorrect: false,
      jobsDefined: false,
      permissionsCorrect: false,
    };

    expect(workflow.fileExists).toBe(true);

    const workflowContent = readFileSync(WORKFLOW_FILE, 'utf-8');

    // Validate YAML syntax (basic check)
    expect(workflowContent).toMatch(/^name:\s*['"]?.+['"]?\s*$/m);
    expect(workflowContent).toMatch(/^on:\s*$/m);
    expect(workflowContent).toMatch(/^jobs:\s*$/m);
    workflow.syntaxValid = true;

    // Validate triggers
    expect(workflowContent).toMatch(/push:\s*\n\s*branches:\s*\n\s*-\s*main/);
    expect(workflowContent).toMatch(/paths:\s*\n\s*-\s*['"]?docs\/\*\*['"]?/);
    workflow.triggersCorrect = true;

    // Validate job definitions
    expect(workflowContent).toMatch(/build:\s*\n\s*runs-on:\s*ubuntu-latest/);
    expect(workflowContent).toMatch(/deploy:\s*\n\s*runs-on:\s*ubuntu-latest/);
    expect(workflowContent).toMatch(/performance-check:\s*\n\s*runs-on:\s*ubuntu-latest/);
    workflow.jobsDefined = true;

    // Validate permissions
    expect(workflowContent).toMatch(/permissions:\s*\n\s*contents:\s*write/);
    expect(workflowContent).toMatch(/pages:\s*write/);
    expect(workflowContent).toMatch(/id-token:\s*write/);
    workflow.permissionsCorrect = true;

    // Ensure all validations passed
    expect(workflow).toEqual({
      fileExists: true,
      syntaxValid: true,
      triggersCorrect: true,
      jobsDefined: true,
      permissionsCorrect: true,
    });
  });

  test('VitePress configuration is valid', () => {
    const configFiles = [join(DOCS_DIR, '.vitepress', 'config.ts'), join(DOCS_DIR, '.vitepress', 'theme', 'index.ts')];

    for (const configFile of configFiles) {
      expect(existsSync(configFile)).toBe(true);

      const content = readFileSync(configFile, 'utf-8');

      // Validate TypeScript syntax
      expect(content).toMatch(/import.*from.*vitepress/);
      expect(content).toMatch(/export default/);
      expect(content).not.toContain('SyntaxError');
    }
  });

  test('documentation build process works', async () => {
    const startTime = Date.now();

    try {
      // Run VitePress build in test mode
      execSync('npm run docs:build', {
        stdio: 'pipe',
        cwd: process.cwd(),
        timeout: 300000, // 5 minutes timeout
      });

      const buildTime = Date.now() - startTime;
      expect(buildTime).toBeLessThan(120000); // Should build within 2 minutes

      // Verify build output exists
      expect(existsSync(BUILD_DIR)).toBe(true);

      // Check for essential build artifacts
      const essentialFiles = ['index.html', 'assets', '.vitepress', 'search.json'];

      for (const file of essentialFiles) {
        const filePath = join(BUILD_DIR, file);
        expect(existsSync(filePath)).toBe(true);
      }

      testMetrics = {
        buildTime,
        buildSize: 0, // Will be calculated below
        searchIndexSize: 0,
        staticAssetsCount: 0,
        htmlPagesCount: 0,
      };
    } catch (error) {
      console.error('Build failed:', error);
      throw error;
    }
  });

  test('build output structure is correct', () => {
    expect(existsSync(BUILD_DIR)).toBe(true);

    // Check for correct directory structure
    const expectedStructure = [
      'index.html',
      'components/index.html',
      'guides/index.html',
      'assets/',
      '.vitepress/dist/',
      'search/index.json',
    ];

    for (const path of expectedStructure) {
      const fullPath = join(BUILD_DIR, path);
      if (path.endsWith('/')) {
        expect(existsSync(fullPath)).toBe(true);
      } else {
        expect(existsSync(fullPath)).toBe(true);
      }
    }

    // Validate HTML content
    const indexPath = join(BUILD_DIR, 'index.html');
    const indexContent = readFileSync(indexPath, 'utf-8');
    expect(indexContent).toMatch(/<title>Taro Uno UI<\/title>/);
    expect(indexContent).toMatch(
      /<meta name="description" content="Professional cross-platform UI component library">/,
    );
    expect(indexContent).toMatch(/<script type="module"/);
  });

  test('search functionality is built correctly', () => {
    const searchIndexPath = join(BUILD_DIR, 'search', 'index.json');
    expect(existsSync(searchIndexPath)).toBe(true);

    const searchIndex = JSON.parse(readFileSync(searchIndexPath, 'utf-8'));

    // Validate search index structure
    expect(searchIndex).toHaveProperty('records');
    expect(Array.isArray(searchIndex.records)).toBe(true);

    // Check that component pages are indexed
    const componentRecords = searchIndex.records.filter((record: any) => record.url.includes('/components/'));
    expect(componentRecords.length).toBeGreaterThan(0);

    // Validate search record structure
    if (componentRecords.length > 0) {
      const record = componentRecords[0];
      expect(record).toHaveProperty('title');
      expect(record).toHaveProperty('text');
      expect(record).toHaveProperty('url');
      expect(typeof record.title).toBe('string');
      expect(typeof record.text).toBe('string');
      expect(typeof record.url).toBe('string');
    }

    // Calculate search index size
    const searchStats = readFileSync(searchIndexPath, 'utf-8');
    testMetrics.searchIndexSize = Buffer.byteLength(searchStats, 'utf8');
    expect(testMetrics.searchIndexSize).toBeLessThan(1024 * 1024); // Less than 1MB
  });

  test('static assets are optimized', () => {
    const assetsDir = join(BUILD_DIR, 'assets');
    expect(existsSync(assetsDir)).toBe(true);

    // Count static assets
    const assetFiles = execSync(`find "${assetsDir}" -type f`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);

    testMetrics.staticAssetsCount = assetFiles.length;
    expect(testMetrics.staticAssetsCount).toBeGreaterThan(0);

    // Check for CSS files
    const cssFiles = assetFiles.filter((file) => file.endsWith('.css'));
    expect(cssFiles.length).toBeGreaterThan(0);

    // Check for JS files
    const jsFiles = assetFiles.filter((file) => file.endsWith('.js'));
    expect(jsFiles.length).toBeGreaterThan(0);

    // Validate CSS content
    if (cssFiles.length > 0) {
      const cssContent = readFileSync(cssFiles[0], 'utf-8');
      expect(cssContent).toMatch(/\.taro-uno-/);
      expect(cssContent).toMatch(/--vp-c-/);
    }

    // Validate JS content (should be minified)
    if (jsFiles.length > 0) {
      const jsContent = readFileSync(jsFiles[0], 'utf-8');
      expect(jsContent.length).toBeGreaterThan(0);
      // Check that it's reasonably minified (no excessive whitespace)
      const whitespaceRatio = (jsContent.match(/\s/g) || []).length / jsContent.length;
      expect(whitespaceRatio).toBeLessThan(0.2); // Less than 20% whitespace
    }
  });

  test('HTML pages are generated correctly', () => {
    // Count HTML pages
    const htmlFiles = execSync(`find "${BUILD_DIR}" -name "*.html"`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    testMetrics.htmlPagesCount = htmlFiles.length;
    expect(testMetrics.htmlPagesCount).toBeGreaterThan(5); // At least basic pages

    // Validate component pages
    const componentPages = htmlFiles.filter((file) => file.includes('/components/'));
    expect(componentPages.length).toBeGreaterThan(0);

    // Check specific component pages
    const expectedComponentPages = [
      '/components/basic/button/',
      '/components/form/input/',
      '/components/display/card/',
    ];

    for (const pagePath of expectedComponentPages) {
      const htmlFile = join(BUILD_DIR, 'components', pagePath.replace('/components/', ''), 'index.html');
      if (existsSync(htmlFile)) {
        const content = readFileSync(htmlFile, 'utf-8');
        expect(content).toMatch(/<title>.*Button.*<\/title>/);
        expect(content).toMatch(/class="taro-uno-/);
      }
    }
  });

  test('performance requirements are met', () => {
    // Calculate total build size
    const totalSize = execSync(`du -sb "${BUILD_DIR}"`, { encoding: 'utf8' }).split('\t')[0];
    testMetrics.buildSize = parseInt(totalSize, 10);

    // Performance thresholds
    const performanceThresholds = {
      maxBuildTime: 120000, // 2 minutes
      maxBuildSize: 10 * 1024 * 1024, // 10MB
      maxSearchIndexSize: 1024 * 1024, // 1MB
      minStaticAssets: 5,
      minHtmlPages: 5,
    };

    // Validate all performance metrics
    expect(testMetrics.buildTime).toBeLessThanOrEqual(performanceThresholds.maxBuildTime);
    expect(testMetrics.buildSize).toBeLessThanOrEqual(performanceThresholds.maxBuildSize);
    expect(testMetrics.searchIndexSize).toBeLessThanOrEqual(performanceThresholds.maxSearchIndexSize);
    expect(testMetrics.staticAssetsCount).toBeGreaterThanOrEqual(performanceThresholds.minStaticAssets);
    expect(testMetrics.htmlPagesCount).toBeGreaterThanOrEqual(performanceThresholds.minHtmlPages);

    console.log('Performance Metrics:', {
      buildTime: `${testMetrics.buildTime}ms`,
      buildSize: `${(testMetrics.buildSize / 1024 / 1024).toFixed(2)}MB`,
      searchIndexSize: `${(testMetrics.searchIndexSize / 1024).toFixed(2)}KB`,
      staticAssetsCount: testMetrics.staticAssetsCount,
      htmlPagesCount: testMetrics.htmlPagesCount,
    });
  });

  test('deployment configuration is valid', () => {
    // Check for deployment-related files
    const deploymentFiles = ['package.json', '.gitignore', 'README.md'];

    for (const file of deploymentFiles) {
      expect(existsSync(join(process.cwd(), file))).toBe(true);
    }

    // Validate package.json scripts
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    const requiredScripts = ['docs:dev', 'docs:build', 'docs:generate', 'docs:deploy'];

    for (const script of requiredScripts) {
      expect(packageJson.scripts).toHaveProperty(script);
      expect(typeof packageJson.scripts[script]).toBe('string');
    }

    // Validate .gitignore includes build artifacts
    const gitignore = readFileSync(join(process.cwd(), '.gitignore'), 'utf-8');
    expect(gitignore).toMatch(/docs\/\.vitepress\/dist/);
    expect(gitignore).toMatch(/node_modules/);
    expect(gitignore).toMatch(/\.log/);
  });

  test('documentation links are valid', () => {
    // Check for broken links in build output
    const indexPath = join(BUILD_DIR, 'index.html');
    const indexContent = readFileSync(indexPath, 'utf-8');

    // Extract all href attributes
    const hrefRegex = /href="([^"]+)"/g;
    const links = [];
    let match;

    while ((match = hrefRegex.exec(indexContent)) !== null) {
      links.push(match[1]);
    }

    // Validate internal links
    const internalLinks = links.filter((link) => link.startsWith('/') && !link.startsWith('http'));

    for (const link of internalLinks) {
      // Convert link to file path
      const filePath = link.endsWith('/')
        ? join(BUILD_DIR, link.slice(1), 'index.html')
        : join(BUILD_DIR, link.slice(1));

      if (existsSync(filePath)) {
        // File exists, check if it's a valid HTML file
        const content = readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/<title>/);
      }
    }
  });

  test('environment variables and configuration', () => {
    // Check for environment configuration
    const envFiles = ['.env.example', '.env.local'];

    for (const envFile of envFiles) {
      const envPath = join(process.cwd(), envFile);
      if (existsSync(envPath)) {
        const envContent = readFileSync(envPath, 'utf-8');
        expect(envContent).toMatch(/^[A-Z_]+=/m);
      }
    }

    // Validate VitePress environment variables
    const configPath = join(DOCS_DIR, '.vitepress', 'config.ts');
    const configContent = readFileSync(configPath, 'utf-8');

    expect(configContent).toMatch(/BASE_URL/);
    expect(configContent).toMatch(/NODE_ENV/);
  });

  test('error handling and fallbacks', () => {
    // Check for error handling in build process
    const buildDir = join(DOCS_DIR, '.vitepress');
    expect(existsSync(buildDir)).toBe(true);

    // Validate that fallback pages exist
    const fallbackPages = ['404.html', 'index.html'];

    for (const page of fallbackPages) {
      const pagePath = join(BUILD_DIR, page);
      if (existsSync(pagePath)) {
        const content = readFileSync(pagePath, 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      }
    }

    // Check for error handling in components
    const themeIndex = join(DOCS_DIR, '.vitepress', 'theme', 'index.ts');
    const themeContent = readFileSync(themeIndex, 'utf-8');
    expect(themeContent).toMatch(/enhanceApp/);
    expect(themeContent).toMatch(/try|catch|finally/);
  });

  test('documentation accessibility', () => {
    const indexPath = join(BUILD_DIR, 'index.html');
    const indexContent = readFileSync(indexPath, 'utf-8');

    // Check for accessibility features
    expect(indexContent).toMatch(/lang="zh-CN"/);
    expect(indexContent).toMatch(/<meta name="description"/);
    expect(indexContent).toMatch(/<meta name="viewport"/);
    expect(indexContent).toMatch(/<meta charset="utf-8">/);

    // Check for semantic HTML
    expect(indexContent).toMatch(/<nav/);
    expect(indexContent).toMatch(/<main/);
    expect(indexContent).toMatch(/<footer/);

    // Check for ARIA attributes
    expect(indexContent).toMatch(/aria-/);
  });

  test('mobile responsiveness', () => {
    const indexPath = join(BUILD_DIR, 'index.html');
    const indexContent = readFileSync(indexPath, 'utf-8');

    // Check for responsive meta tags
    expect(indexContent).toMatch(/<meta name="viewport"/);

    // Check for responsive CSS
    const assetsDir = join(BUILD_DIR, 'assets');
    const cssFiles = execSync(`find "${assetsDir}" -name "*.css"`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    if (cssFiles.length > 0) {
      const cssContent = readFileSync(cssFiles[0], 'utf-8');
      expect(cssContent).toMatch(/@media/);
      expect(cssContent).toMatch(/max-width|min-width/);
    }
  });
});
