// Taro-Uno 共享基础配置
// 提供所有包共享的基础配置

const path = require('path');

// 项目根目录
const rootDir = path.resolve(__dirname, '../../');

// 源码目录
const srcDir = 'src';

// 测试目录
const testDir = 'tests';

// 构建输出目录
const distDir = 'dist';

// TypeScript配置
const tsConfig = {
  extends: path.join(rootDir, 'tsconfig.base.json'),
  compilerOptions: {
    outDir: distDir,
    rootDir: srcDir,
    composite: true,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    removeComments: true,
    noEmit: false,
    baseUrl: '.',
    paths: {
      '@/*': [`${srcDir}/*`],
      '@/tests/*': [`${testDir}/*`],
    },
  },
  include: [`${srcDir}/**/*`, `${testDir}/**/*`],
  exclude: ['node_modules', distDir, 'coverage'],
};

// ESLint配置
const eslintConfig = {
  extends: [
    path.join(rootDir, '.eslintrc.json'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    // 可以在这里添加包特定的规则
  },
};

// Jest配置
const jestConfig = {
  displayName: '',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.join(rootDir, 'tests/setup.ts')],
  moduleNameMapping: {
    '^@/(.*)$': `<rootDir>/${srcDir}/$1`,
    '^@/tests/(.*)$': `<rootDir>/${testDir}/$1`,
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    `${srcDir}/**/*.{ts,tsx}`,
    `!${srcDir}/**/*.d.ts`,
    `!${srcDir}/**/*.test.{ts,tsx}`,
    `!${srcDir}/**/*.stories.{ts,tsx}`,
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// Rollup配置
const rollupConfig = {
  input: `${srcDir}/index.ts`,
  output: [
    {
      file: `${distDir}/index.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: `${distDir}/index.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    '@tarojs/components',
    '@tarojs/taro',
  ],
  plugins: [],
};

// Vite配置
const viteConfig = {
  build: {
    lib: {
      entry: `${srcDir}/index.ts`,
      name: '',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@tarojs/components',
        '@tarojs/taro',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tarojs/components': 'Components',
          '@tarojs/taro': 'Taro',
        },
      },
    },
  },
};

module.exports = {
  rootDir,
  srcDir,
  testDir,
  distDir,
  tsConfig,
  eslintConfig,
  jestConfig,
  rollupConfig,
  viteConfig,
};