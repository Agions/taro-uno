import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@theme': resolve(__dirname, 'src/theme'),
        '@types': resolve(__dirname, 'src/types'),
        '@hooks': resolve(__dirname, 'src/hooks')
      }
    },
    build: {
      target: 'es2015',
      lib: {
        entry: resolve(__dirname, 'src/components/index.tsx'),
        name: 'TaroUnoUI',
        fileName: (format: 'es' | 'umd' | 'cjs') => `taro-uno-ui.${format}.js`,
        formats: ['es', 'umd', 'cjs']
      },
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
          }
        }
      },
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          pure_funcs: ['console.log']
        }
      },
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tarojs/taro',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/helper'
      ]
    }
  }
})