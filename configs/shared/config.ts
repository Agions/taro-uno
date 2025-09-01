/**
 * 统一配置管理
 * 包含所有工具和框架的配置
 */

import { resolve } from 'path'

// 项目根目录
const rootDir = resolve(__dirname, '..')

// 路径配置
export const paths = {
  root: rootDir,
  src: resolve(rootDir, 'src'),
  dist: resolve(rootDir, 'dist'),
  tests: resolve(rootDir, 'tests'),
  docs: resolve(rootDir, 'docs'),
  types: resolve(rootDir, 'types'),
  configs: resolve(rootDir, 'configs'),
  scripts: resolve(rootDir, 'scripts'),
  styles: resolve(rootDir, 'styles'),
}

// 别名配置
export const aliases = {
  '@': paths.src,
  '@/components': resolve(paths.src, 'components'),
  '@/utils': resolve(paths.src, 'utils'),
  '@/theme': resolve(paths.src, 'theme'),
  '@/types': resolve(paths.src, 'types'),
  '@/hooks': resolve(paths.src, 'hooks'),
  '@/constants': resolve(paths.src, 'constants'),
  '@/platform': resolve(paths.src, 'platform'),
  '@/styles': paths.styles,
}

// 构建配置
export const buildConfig = {
  lib: {
    entry: resolve(paths.src, 'components/index.tsx'),
    name: 'TaroUnoUI',
    fileName: (format: 'es' | 'umd' | 'cjs') => `taro-uno-ui.${format}.js`,
    formats: ['es', 'umd', 'cjs'] as const,
  },
  external: [
    'react',
    'react-dom',
    '@tarojs/taro',
    '@tarojs/components',
    '@tarojs/runtime',
    '@tarojs/helper',
  ],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@tarojs/taro': 'Taro',
    '@tarojs/components': 'TaroComponents',
    '@tarojs/runtime': 'TaroRuntime',
    '@tarojs/helper': 'TaroHelper',
  },
}

// 测试配置
export const testConfig = {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./tests/setup.ts'],
  include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  exclude: [
    'node_modules',
    'dist',
    '.git',
    '.cache',
    '**/*.d.ts',
    '**/node_modules/**',
  ],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html', 'lcov'],
    reportsDirectory: './coverage',
    exclude: [
      'node_modules/',
      'tests/',
      '**/*.d.ts',
      '**/*.config.*',
      '**/dist/',
      '**/*.test.*',
      '**/*.spec.*',
      '**/types.ts',
      '**/index.ts',
    ],
    thresholds: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  testTimeout: 10000,
  hookTimeout: 10000,
}

// 代码质量配置
export const lintConfig = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
}

// 样式配置
export const styleConfig = {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @import "${resolve(paths.src, 'theme/variables.scss')}";
      `,
    },
  },
}

// 主题配置
export const themeConfig = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
}

// 开发服务器配置
export const devServerConfig = {
  port: 3000,
  host: true,
  open: true,
  cors: true,
}

// 部署配置
export const deployConfig = {
  build: {
    outDir: paths.dist,
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
  },
  analyze: {
    enabled: process.env.ANALYZE === 'true',
  },
}

// 导出所有配置
export default {
  paths,
  aliases,
  buildConfig,
  testConfig,
  lintConfig,
  styleConfig,
  themeConfig,
  devServerConfig,
  deployConfig,
}