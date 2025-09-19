import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { aliases, testConfig, styleConfig } from './configs/shared/config';

// Enhanced Taro mock plugin with better coverage support
const taroMockPlugin = {
  name: 'taro-mock-enhanced',
  resolveId(source: string) {
    if (source === '@tarojs/components' || source === '@tarojs/components/types/common') {
      return '\0' + source;
    }
    return null;
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

        // Mock for coverage
        if (process.env.NODE_ENV === 'test') {
          Object.defineProperty(exports, '__esModule', { value: true });
          Object.defineProperty(exports, 'default', { value: exports });
        }
      `;
    }
    if (id === '\0@tarojs/components/types/common') {
      return `
        export const ITouchEvent = {}

        // Mock for coverage
        if (process.env.NODE_ENV === 'test') {
          Object.defineProperty(exports, '__esModule', { value: true });
          Object.defineProperty(exports, 'default', { value: exports });
        }
      `;
    }
    return null;
  },
};

export default defineConfig({
  plugins: [react(), taroMockPlugin],

  test: {
    ...testConfig,

    // Enhanced test environment
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './tests/setup.ts',
      './tests/setup/accessibility.ts',
      './tests/setup/performance.ts',
    ],

    // Test file patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      '**/*.d.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],

    // Enhanced coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/types.ts',
        '**/index.ts',
        '**/styles/**',
        '**/constants/**',
        '**/utils/**',
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        each: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },

    // Test timeout and retry configuration
    testTimeout: 15000,
    hookTimeout: 15000,
    retry: process.env.CI ? 2 : 0,

    // Mock configuration
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    fakeTimers: {
      toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'],
    },

    // Environment variables
    env: {
      NODE_ENV: 'test',
      VITE_APP_ENV: 'test',
      TARO_ENV: 'h5',
    },

    // Test isolation
    isolate: true,

    // Benchmark configuration
    benchmark: {
      include: [
        'src/**/*.{benchmark,perf}.{js,ts,jsx,tsx}',
      ],
      exclude: [
        'node_modules',
        'dist',
        '**/*.d.ts',
      ],
    },
  },

  resolve: {
    alias: aliases,
  },

  css: styleConfig,

  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.VITE_APP_ENV': '"test"',
    'process.env.TARO_ENV': '"h5"',
  },

  // Build optimization for testing
  optimizeDeps: {
    include: ['react', 'react-dom', '@testing-library/react', '@testing-library/jest-dom'],
  },
});