import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path'

// Mock plugin for Taro components
const taroMockPlugin = {
  name: 'taro-mock',
  resolveId(source: string) {
    if (source === '@tarojs/components' || source === '@tarojs/components/types/common') {
      return '\0' + source
    }
    if (source.includes('@tarojs/runtime')) {
      return '\0taro-runtime-stub'
    }
    return null
  },
  load(id: string) {
    if (id === '\0@tarojs/components') {
      return `
        export const View = 'div'
        export const Text = 'span'
        export const Button = 'button'
        export const Image = 'img'
        export const Input = 'input'
        export const Textarea = 'textarea'
        export const ScrollView = 'div'
        export const Swiper = 'div'
        export const SwiperItem = 'div'
        export const Video = 'video'
        export const Canvas = 'canvas'
        export const Map = 'div'
        export const WebView = 'iframe'
        export const CoverView = 'div'
        export const CoverImage = 'img'
        export const Icon = 'i'
        export const RichText = 'div'
        export const Progress = 'progress'
        export const Checkbox = 'input'
        export const CheckboxGroup = 'div'
        export const Form = 'form'
        export const Label = 'label'
        export const Picker = 'select'
        export const PickerView = 'div'
        export const PickerViewColumn = 'div'
        export const Radio = 'input'
        export const RadioGroup = 'div'
        export const Slider = 'input'
        export const Switch = 'input'
        export const Navigator = 'a'
        export const Audio = 'audio'
        export const Camera = 'div'
        export const LivePlayer = 'video'
        export const LivePusher = 'video'
        export const FunctionalPageNavigator = 'div'
        export const OfficialAccount = 'div'
        export const OpenData = 'div'
        export const NavigationBar = 'div'
        export const PageMeta = 'div'
        export const PageContainer = 'div'
        export const ShareButton = 'button'
        export const Ad = 'div'
        export const AdContentPage = 'div'
        export const CustomWrapper = 'div'
        export const Embed = 'iframe'
        export const ITouchEvent = {}
        export const StyleSheet = {
          create: (styles) => styles
        }
      `
    }
    if (id === '\0@tarojs/components/types/common') {
      return `
        export const ITouchEvent = {}
      `
    }
    if (id === '\0taro-runtime-stub') {
      return 'export default {}'
    }
    return null
  }
}

export default defineConfig({
  plugins: [react(), taroMockPlugin],

  test: {
    // 测试环境配置
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts', './vitest.setup.ts'],
    // 测试文件匹配
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      '**/*.d.ts',
      '**/node_modules/**',
      'tests/**/e2e/**',
    ],
    // 覆盖率配置
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
        '**/*.types.ts',      // Only exclude .types.ts files
        '**/index.ts',        // Export files typically have no logic
        '**/*.stories.tsx',   // Storybook files
        '**/*.stories.ts',
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      },
    },
    // 测试超时配置
    testTimeout: 10000,
    hookTimeout: 10000,
    // 模拟配置
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    // 环境变量
    env: {
      NODE_ENV: 'test',
      VITE_APP_ENV: 'test',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@tarojs/runtime': path.resolve(__dirname, './tests/stubs/taro-runtime.ts'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/theme/design-tokens.scss";`,
      },
    },
  },

  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.VITE_APP_ENV': '"test"',
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    SUPPORT_TYPED_ARRAY: true,
    ENABLE_CLONE_NODE: true,
  },
})
