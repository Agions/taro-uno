/**
 * Vite 性能优化配置
 * 专门用于生产环境构建优化
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const isAnalyze = process.env.ANALYZE === 'true'
  
  return {
    // 插件配置 - 性能优化
    plugins: [
      react({
        // React 优化配置
        jsxRuntime: 'automatic',
        // Babel 优化
        babel: {
          plugins: [
            // 按需加载 antd 组件
            ['import', {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
            }],
            // 其他优化插件
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
          ]
        }
      }),
      
      // 代码分割优化
      splitVendorChunkPlugin(),
      
      // 旧浏览器兼容
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      
      // HTML 优化
      createHtmlPlugin({
        minify: isProduction,
        inject: {
          data: {
            title: 'Taro-Uno UI',
            injectScript: `<script>window.__BUILD_TIME__="${new Date().toISOString()}";</script>`
          }
        }
      }),
      
      // PWA 支持
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Taro-Uno UI',
          short_name: 'Taro-Uno',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.example\.com\/.*$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 86400
                }
              }
            }
          ]
        }
      }),
      
      // 图片优化
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 80
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),
      
      // Gzip 压缩
      isProduction && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      
      // Brotli 压缩
      isProduction && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br'
      }),
      
      // 包分析
      isAnalyze && visualizer({
        filename: 'bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),

    // 构建优化
    build: {
      // 目标浏览器
      target: 'es2015',
      // 库模式配置
      lib: {
        entry: resolve(__dirname, '../src/components/index.tsx'),
        name: 'TaroUnoUI',
        fileName: (format) => `taro-uno-ui.${format}.js`,
        formats: ['es', 'umd', 'cjs']
      },
      // 代码分割策略
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          '@tarojs/taro',
          '@tarojs/components',
          '@tarojs/runtime',
          '@tarojs/helper'
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@tarojs/taro': 'Taro',
            '@tarojs/components': 'TaroComponents',
            '@tarojs/runtime': 'TaroRuntime',
            '@tarojs/helper': 'TaroHelper'
          },
          // 手动代码分割
          manualChunks: {
            // React 相关
            'react-vendor': ['react', 'react-dom'],
            // Taro 相关
            'taro-vendor': [
              '@tarojs/taro',
              '@tarojs/components',
              '@tarojs/runtime',
              '@tarojs/helper'
            ],
            // 工具库
            'utils-vendor': [
              'lodash-es',
              'dayjs',
              'axios'
            ],
            // UI 组件
            'ui-vendor': [
              'antd',
              '@ant-design/icons'
            ]
          },
          // 文件名哈希
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/').pop()
              : 'chunk'
            return `js/${facadeModuleId}-[hash].js`
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash].[ext]'
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `img/[name]-[hash].${ext}`
            }
            if (/css|scss|less/i.test(ext)) {
              return `css/[name]-[hash].${ext}`
            }
            return `assets/[name]-[hash].${ext}`
          }
        }
      },
      // 启用源码映射
      sourcemap: isProduction ? 'hidden' : true,
      // 压缩配置
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          // 内联函数
          reduce_funcs: true,
          reduce_vars: true,
          // 移除无用代码
          unused: true,
          // 死代码消除
          dead_code: true,
          // 条件判断优化
          conditionals: true,
          // 比较优化
          comparisons: true,
          // 计算优化
          evaluate: true,
          // 内联变量
          inline: true,
          // 循环优化
          loops: true,
          // 属性访问优化
          properties: true,
          // 语句优化
          sequences: true,
          // 类型转换优化
          switches: true,
          // 未使用变量优化
          toplevel: true,
          // typeof 优化
          typeofs: true
        },
        mangle: {
          // 保留类名和函数名
          keep_classnames: true,
          keep_fnames: true
        }
      },
      // 分块大小警告
      chunkSizeWarningLimit: 1000,
      // 报告压缩大小
      reportCompressedSize: true,
      // 增量构建
      incremental: isProduction,
      // 模块预加载
      modulePreload: {
        polyfill: true,
        resolveDependencies: (_, deps) => {
          return deps.filter(dep => !dep.includes('.css'))
        }
      }
    },

    // 依赖预构建优化
    optimizeDeps: {
      // 强制预构建
      force: false,
      // 包含的依赖
      include: [
        'react',
        'react-dom',
        '@tarojs/taro',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/helper',
        '@tarojs/plugin-framework-react',
        '@tarojs/plugin-platform-weapp',
        '@tarojs/plugin-platform-alipay',
        '@tarojs/plugin-platform-tt',
        '@tarojs/plugin-platform-swan',
        '@tarojs/plugin-platform-qq',
        '@tarojs/plugin-platform-h5',
        '@tarojs/plugin-platform-rn',
        'lodash-es',
        'dayjs',
        'axios',
        'classnames'
      ],
      // 排除的依赖
      exclude: [
        '@tarojs/taro-h5',
        '@tarojs/router-runner'
      ]
    },

    // 开发服务器优化
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
          // 代理超时
          timeout: 30000,
          // 错误重试
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (_, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          }
        }
      },
      // 文件监听配置
      watch: {
        // 监听的文件
        usePolling: true,
        // 监听间隔
        interval: 100,
        // 忽略的文件
        ignored: ['**/node_modules/**', '**/dist/**', '**/build/**']
      }
    },

    // 预览服务器配置
    preview: {
      port: 4000,
      host: true,
      open: true,
      cors: true
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
          // Source Map
          sourceMap: !isProduction,
          // 优化导入
          importer: (url: string) => {
            if (url.startsWith('~')) {
              return {
                file: url.slice(1)
              }
            }
            return null
          }
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
          // CSS 优化
          isProduction && require('cssnano')({
            preset: 'advanced',
            zindex: false,
            normalizeWhitespace: false
          }),
          // PX 转 REM
          require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*'],
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /node_modules/i
          })
        ].filter(Boolean)
      },
      // CSS 模块配置
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction 
          ? '[hash:base64:6]' 
          : '[name]__[local]__[hash:base64:5]'
      },
      // CSS 代码分割
      codeSplit: true
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
      // 解析条件
      conditions: ['import', 'module', 'browser', 'default'],
      // 解析扩展名
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss']
    },

    // 全局变量定义
    define: {
      __DEV__: JSON.stringify(!isProduction),
      __TEST__: JSON.stringify(mode === 'test'),
      __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      'process.env.TARO_ENV': JSON.stringify(process.env.TARO_ENV || 'h5'),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },

    // 缓存配置
    cacheDir: '.vite',
    clearScreen: false,
    // 性能日志
    logLevel: isProduction ? 'error' : 'info'
  }
})