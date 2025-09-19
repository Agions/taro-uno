/**
 * Vite 开发环境配置
 * 专门用于开发体验优化
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// import viteEslint from 'vite-plugin-eslint'
// import { VitePWA } from 'vite-plugin-pwa'
// import vitePluginImp from 'vite-plugin-imp'
// import progress from 'vite-plugin-progress'
import { configDefaults } from 'vitest/config'

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test'

  return {
    // 插件配置 - 开发体验优化
    plugins: [
      // React 插件
      react({
        // 开发模式优化
        jsxRuntime: 'automatic',
        // Babel 配置
        babel: {
          plugins: [
            // 开发环境调试插件
            ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }],
            // 热重载优化
            'react-refresh/babel'
          ]
        }
      }),

      // ESLint 集成 - 暂时注释掉
      // viteEslint({
      //   cache: false,
      //   include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
      //   exclude: ['./node_modules/**', './dist/**', './build/**']
      // }),

      // PWA 开发支持 - 暂时注释掉
      // VitePWA({
      //   devOptions: {
      //     enabled: true,
      //     type: 'module'
      //   },
      //   registerType: 'autoUpdate'
      // }),

      // 按需加载插件 - 暂时注释掉
      // vitePluginImp({
      //   libList: [
      //       {
      //         libName: 'antd',
      //         style: (name) => `antd/es/${name}/style/index.css`
      //       },
      //       {
      //         libName: '@ant-design/icons',
      //         libDirectory: 'es/icons',
      //         camel2DashComponentName: false
      //       }
      //     ]
      //   }),

      // 构建进度条 - 暂时注释掉
      // progress()
    ],

    // 构建配置
    build: {
      // 开发环境构建优化
      target: 'esnext',
      // 最小化混淆
      minify: false,
      // Source Map
      sourcemap: 'inline',
      // 禁用代码分割以便于调试
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },

    // 依赖预构建优化
    optimizeDeps: {
      // 强制预构建
      force: true,
      // 包含常用依赖
      include: [
        'react',
        'react-dom',
        '@tarojs/taro',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/helper',
        'react-refresh/runtime',
        'classnames',
        'dayjs',
        'lodash-es'
      ]
    },

    // 开发服务器配置
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
      cors: true,
      // 热重载优化
      hmr: {
        overlay: true,
        // 自定义 HMR 超时
        timeout: 2000,
        // HMR 重载延迟
        reload: true
      },
      // 代理配置
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // WebSocket 支持
          ws: true,
          // 代理超时
          timeout: 30000
        }
      },
      // 文件监听配置
      watch: {
        // 使用轮询监听
        usePolling: true,
        // 监听间隔
        interval: 100,
        // 忽略的文件
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/*.test.ts',
          '**/*.test.tsx'
        ]
      }
    },

    // CSS 优化
    css: {
      // 预处理器配置
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${resolve(__dirname, '../src/theme/styles/variables.scss')}";
            @import "${resolve(__dirname, '../src/theme/styles/mixins.scss')}";
          `,
          javascriptEnabled: true,
          // 开发环境 Source Map
          sourceMap: true,
          // 优化导入 - 暂时注释掉以避免类型错误
          // importer: (url:string) => {
          //   if (url.startsWith('~')) {
          //     return {
          //       file: url.slice(1)
          //     }
          //   }
          //   return null
          // }
        }
      },
      // PostCSS 配置
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              '> 1%',
              'last 2 versions',
              'not dead',
              'not ie 11'
            ]
          }),
          require('tailwindcss'),
          // 开发环境使用较轻量的 PostCSS 插件
          require('postcss-flexbugs-fixes'),
          require('postcss-normalize')
        ]
      },
      // CSS 模块配置
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]__[hash:base64:5]'
      }
    },

    // 解析配置
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src'),
        '@components': resolve(__dirname, '../src/components'),
        '@utils': resolve(__dirname, '../src/utils'),
        '@theme': resolve(__dirname, '../src/theme'),
        '@types': resolve(__dirname, '../src/types'),
        '@hooks': resolve(__dirname, '../src/hooks'),
        '@assets': resolve(__dirname, '../src/assets'),
        '@styles': resolve(__dirname, '../src/styles')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss']
    },

    // 全局变量定义
    define: {
      __DEV__: JSON.stringify(true),
      __TEST__: JSON.stringify(isTest),
      __VERSION__: JSON.stringify((process.env as any).npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      'process.env.TARO_ENV': JSON.stringify((process.env as any).TARO_ENV || 'h5'),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },

    // 测试配置
    test: {
      ...configDefaults,
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}'
        ]
      },
      // 测试环境变量
      env: {
        NODE_ENV: 'test',
        TARO_ENV: 'h5'
      },
      // 测试别名
      alias: {
        '@': resolve(__dirname, '../src'),
        '@components': resolve(__dirname, '../src/components'),
        '@utils': resolve(__dirname, '../src/utils'),
        '@theme': resolve(__dirname, '../src/theme'),
        '@types': resolve(__dirname, '../src/types'),
        '@hooks': resolve(__dirname, '../src/hooks')
      }
    },

    // 清屏配置
    clearScreen: false,
    // 日志级别
    logLevel: 'info'
  }
})
