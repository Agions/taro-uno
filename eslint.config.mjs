// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        requestIdleCallback: 'readonly',
        cancelIdleCallback: 'readonly',
        IntersectionObserver: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        it: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      // 基础 JavaScript 规则
      'no-console': ['warn'],
      'no-debugger': ['error'],
      'no-unused-vars': 'off', // 关闭 JS 版本，使用 TS 版本
      'no-undef': 'off', // TypeScript 会处理

      // 基础代码质量规则
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-throw-literal': 'error',
      'no-return-await': 'error',

      // 代码风格规则
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      'max-len': ['warn', { code: 100, ignoreComments: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'padded-blocks': ['error', 'never'],
      'space-infix-ops': 'error',
      'eol-last': 'error',
      'no-trailing-spaces': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly',
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        // DOM types
        ScrollIntoViewOptions: 'readonly',
        KeyframeAnimationOptions: 'readonly',
        Keyframe: 'readonly',
        RequestInit: 'readonly',
        DocumentEventMap: 'readonly',
        // TypeScript utility types
        Parameters: 'readonly',
        // DOM types for event listeners
        WindowEventMap: 'readonly',
        HTMLElementEventMap: 'readonly',
        AddEventListenerOptions: 'readonly',
        CanvasImageSource: 'readonly',
        // Taro global
        Taro: 'readonly',
        // Node.js types
        NodeJS: 'readonly',
        IntersectionObserverInit: 'readonly',
        IntersectionObserverEntry: 'readonly',
        ResizeObserverEntry: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      // Only use specific react-hooks rules, not the full recommended config (which includes React Compiler)
      'react-hooks/rules-of-hooks': 'warn', // Downgrade to warning for createComponent render functions
      'react-hooks/exhaustive-deps': 'warn',
      // TypeScript rules optimization
      '@typescript-eslint/no-explicit-any': 'warn', // Downgraded to warn - 390+ instances need gradual fixing
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn', // Allow @ts-ignore with warning
      '@typescript-eslint/no-empty-object-type': 'warn', // Allow empty interfaces with warning
      '@typescript-eslint/no-unused-expressions': 'warn', // Allow unused expressions with warning
      // Disable no-redeclare for TypeScript function overloads
      'no-redeclare': 'off',
      'no-import-assign': 'warn',
      // React rules optimization
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      // Disable low-priority react-refresh warnings
      'react-refresh/only-export-components': 'off',
      // Code style
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-prototype-builtins': 'off',
      'no-control-regex': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // 忽略特定文件和目录
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      '.cache/**',
      'public/**',
      '*.min.js',
      'coverage/**',
      '.nyc_output/**',
      '**/*.d.ts',
      'scripts/**/*',
      '.storybook/**/*',
      'docs/**',
      'docs/.docusaurus/**',
      'docs/build/**',
      'docs/node_modules/**',
    ],
  },
  ...storybook.configs['flat/recommended'],
];
