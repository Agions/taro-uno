/**
 * Performance-optimized Vite configuration for Taro-Uno UI
 * Includes advanced optimizations for production builds
 */

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { splitVendorChunkPlugin } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { aliases, buildConfig } from './configs/shared/config';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        // Enable Fast Refresh in development
        fastRefresh: !isProduction,
        // Babel optimizations
        babel: {
          plugins: [
            // Remove console logs in production
            ...(isProduction ? [['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]] : []),
            // Enable React Fast Refresh
            ...(isProduction ? [] : ['react-refresh/babel']),
          ],
        },
      }),

      // Code splitting optimizations
      splitVendorChunkPlugin(),

      // Legacy browser support (optional)
      legacy({
        targets: ['defaults', 'not IE 11'],
        renderLegacyChunks: true,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),

      // PWA support
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Taro-Uno UI',
          short_name: 'Taro-Uno',
          description: 'High-performance Taro UI component library',
          theme_color: '#3b82f6',
          background_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),

      // Compression plugin
      ...(isProduction ? [
        viteCompression({
          verbose: true,
          algorithm: 'gzip',
          ext: '.gz',
          deleteOriginFile: false,
        }),
        viteCompression({
          verbose: true,
          algorithm: 'brotliCompress',
          ext: '.br',
          deleteOriginFile: false,
        }),
      ] : []),

      // Bundle visualization
      ...(isAnalyze ? [
        visualizer({
          filename: 'bundle-analysis.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ] : []),

      // TypeScript declaration files
      dts({
        insertTypesEntry: true,
        copyDtsFiles: true,
        tsConfigFilePath: './tsconfig.json',
        rollupTypes: true,
        exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      }),
    ],

    resolve: {
      alias: aliases,
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss'],
    },

    build: {
      target: 'es2015',
      lib: buildConfig.lib,
      rollupOptions: {
        external: buildConfig.external,
        output: {
          globals: buildConfig.globals,
          // Enhanced code splitting
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('@tarojs')) return 'taro-vendor';
              if (id.includes('classnames')) return 'utils-vendor';
              return 'vendor';
            }

            // Feature-based chunks
            if (id.includes('components/form')) return 'form-components';
            if (id.includes('components/layout')) return 'layout-components';
            if (id.includes('components/navigation')) return 'navigation-components';
            if (id.includes('components/performance')) return 'performance-components';

            // Core chunks
            if (id.includes('theme') || id.includes('styles')) return 'theme';
            if (id.includes('hooks') || id.includes('utils')) return 'utils';

            // Default chunk
            return undefined;
          },
          // Optimize chunk loading
          chunkFileNames: (chunkInfo) => {
            const name = chunkInfo.name || 'chunk';
            return `assets/${name}-[hash].js`;
          },
          entryFileNames: (entryInfo) => {
            return `assets/[name]-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return `assets/css/[name]-[hash].css`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },

      // Performance optimizations
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          pure_funcs: ['console.log', 'console.debug'],
          // Advanced optimizations
          ecma: 2015,
          warnings: false,
          comparisons: false,
          inline: 2,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          cascade: true,
          side_effects: true,
          switches: true,
          properties: true,
          toplevel: true,
          top_retain: null,
          typeofs: false,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
          ecma: 2015,
        },
      },

      // Build performance
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
      emptyOutDir: true,
      // Enable build caching
      rollupOptions: {
        cache: isProduction,
      },
    },

    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tarojs/taro',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/helper',
        'classnames',
        'react-i18next',
        'i18next',
        'i18next-browser-languagedetector',
      ],
      exclude: [],
      esbuildOptions: {
        target: 'es2015',
        jsx: 'automatic',
        // Enable tree shaking
        treeShaking: true,
        // Optimize for production
        minify: isProduction,
        keepNames: false,
        // Source maps for debugging
        sourceMap: !isProduction,
      },
    },

    // Development server optimizations
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
        timeout: 2000,
      },
      // Proxy configuration
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      // File watching optimization
      watch: {
        usePolling: true,
        interval: 100,
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/.git/**',
          '**/coverage/**',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
        ],
      },
    },

    // Preview server optimizations
    preview: {
      port: 4173,
      host: true,
      open: true,
    },

    // CSS optimizations
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${resolve(__dirname, 'src/theme/styles/variables.scss')}";
            @import "${resolve(__dirname, 'src/theme/styles/mixins.scss')}";
          `,
          javascriptEnabled: true,
          sourceMap: !isProduction,
          // Optimize imports
          importer: (url) => {
            if (url.startsWith('~')) {
              return {
                file: url.slice(1),
              };
            }
            return null;
          },
        },
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              '> 1%',
              'last 2 versions',
              'not dead',
              'not ie 11',
            ],
          }),
          require('tailwindcss'),
          require('cssnano')({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: false,
              },
            ],
          }),
          // Additional PostCSS optimizations
          require('postcss-flexbugs-fixes'),
          require('postcss-normalize'),
          ...(isProduction ? [
            require('@fullhuman/postcss-purgecss')({
              content: [
                './src/**/*.{tsx,ts,jsx,js}',
                './index.html',
              ],
              defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: {
                standard: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/],
                deep: [/^global-/],
                greedy: [/^modal-/, /^tooltip-/, /^popover-/],
              },
            }),
          ] : []),
        ],
      },
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction ? '[name]__[local]__[hash:base64:5]' : '[name]__[local]',
      },
    },

    // Environment variables
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || 'development'),
      __APP_VERSION__: JSON.stringify(env.npm_package_version || '0.1.0'),
      __DEV__: JSON.stringify(!isProduction),
      __PRODUCTION__: JSON.stringify(isProduction),
      __TEST__: JSON.stringify(mode === 'test'),
    },

    // Experimental features for performance
    experimental: {
      renderBuiltUrl(filename, { hostId, hostType, type }) {
        if (type === 'public') {
          return `https://cdn.example.com/${filename}`;
        }
        return filename;
      },
    },

    // Security optimizations
    server: {
      ...this.server,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  };
});