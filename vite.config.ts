import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import pxtorem from 'postcss-pxtorem';

// 组件懒加载配置
const componentChunkPatterns = {
  basic: /src[\\/]+components[\\/]+basic/,
  form: /src[\\/]+components[\\/]+form/,
  display: /src[\\/]+components[\\/]+display/,
  feedback: /src[\\/]+components[\\/]+feedback/,
  layout: /src[\\/]+components[\\/]+layout/,
  navigation: /src[\\/]+components[\\/]+navigation/,
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isLib = mode === 'lib';
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
        '@theme': path.resolve(__dirname, './src/theme'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    build: {
      target: 'es2018',
      minify: isProduction ? 'terser' : false,
      sourcemap: isProduction ? 'hidden' : true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      lib: isLib ? {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'TaroUnoUI',
        formats: ['es', 'cjs'],
        fileName: (format) => `taro-uno-ui.${format}.js`
      } : undefined,

      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
        output: {
          manualChunks: isLib ? undefined : (id: string) => {
            // 智能代码分割策略
            if (id.includes('node_modules')) {
              // 核心依赖分组
              if (id.includes('react') || id.includes('react-dom')) return 'vendor';
              if (id.includes('@tarojs')) return 'taro';
              if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';

              // 其他第三方库
              if (id.includes('lodash') || id.includes('underscore')) return 'utils-vendor';
              if (id.includes('dayjs') || id.includes('date-fns')) return 'date-vendor';
              if (id.includes('axios') || id.includes('fetch')) return 'network-vendor';

              // 图标和样式库
              if (id.includes('@iconify') || id.includes('unocss')) return 'style-vendor';
            }

            // 工具函数和钩子
            if (id.includes(`${path.sep}src${path.sep}utils`) || id.includes(`${path.sep}src${path.sep}hooks`)) {
              return 'utils';
            }

            // 性能监控模块
            if (id.includes('PerformanceMonitor')) {
              return 'performance-monitor';
            }

            // 组件按类型分组
            for (const [chunkName, pattern] of Object.entries(componentChunkPatterns)) {
              if (pattern.test(id)) {
                return `components-${chunkName}`;
              }
            }

            // 主题相关
            if (id.includes(`${path.sep}src${path.sep}theme`)) {
              return 'theme';
            }

            // 上下文和提供者
            if (id.includes(`${path.sep}src${path.sep}context`) || id.includes(`${path.sep}src${path.sep}providers`)) {
              return 'context';
            }

            return undefined;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name ? assetInfo.name.split('.') : [];
            const rawExt = info.pop()?.toLowerCase() ?? '';
            let extType: string;

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(rawExt)) {
              extType = 'images';
            } else if (/woff2?|eot|ttf|otf/i.test(rawExt)) {
              extType = 'fonts';
            } else if (/mp3|mp4|webm|wav|flac|aac/i.test(rawExt)) {
              extType = 'media';
            } else {
              extType = rawExt || 'misc';
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          compact: isProduction,
          inlineDynamicImports: false,
          globals: isLib ? {
            react: 'React',
            '@tarojs/components': 'TaroComponents'
          } : undefined,
        },
        external: isLib ? ['react', 'react-dom', '@tarojs/components', '@tarojs/taro'] : [],
        onwarn(warning, warn) {
          if (warning.code === 'EVAL') return;
          if (warning.code === 'THIS_IS_UNDEFINED') return;
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          warn(warning);
        },
      },
      cssCodeSplit: true,
      cssMinify: isProduction,
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tarojs/components',
        '@tarojs/taro',
        'i18next',
        'react-i18next',
      ],
      exclude: ['@iconify/react', 'virtual:uno.css'],
      esbuildOptions: {
        target: 'es2018',
        jsx: 'automatic',
        treeShaking: true,
        minify: isProduction,
      },
    },

    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    preview: {
      port: 4173,
      host: true,
      open: true,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/theme/design-tokens.scss";`,
          charset: false,
        },
      },
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 2,
            mediaQuery: false,
            replace: true,
            exclude: /node_modules/i,
          }),
        ],
      },
    },

    define: {
      __APP_ENV__: JSON.stringify(env['VITE_APP_ENV'] || 'development'),
      __APP_VERSION__: JSON.stringify(env['npm_package_version'] || '0.1.0'),
      __DEV__: JSON.stringify(!isProduction),
      __PROD__: JSON.stringify(isProduction),
      __TEST__: JSON.stringify(mode === 'test'),
    },

    clearScreen: false,
    logLevel: isProduction ? 'warn' : 'info',
  };
});