/**
 * Jest 测试设置文件
 * 统一配置测试环境和 Mock
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Taro API
const mockTaro = {
  getSystemInfoSync: vi.fn(() => ({
    platform: 'h5',
    screenWidth: 375,
    screenHeight: 667,
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
    statusBarHeight: 20,
    safeArea: {
      top: 20,
      left: 0,
      right: 375,
      bottom: 647,
      width: 375,
      height: 627
    }
  })),
  navigateTo: vi.fn(),
  navigateBack: vi.fn(),
  redirectTo: vi.fn(),
  switchTab: vi.fn(),
  reLaunch: vi.fn(),
  showToast: vi.fn(),
  showModal: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  showActionSheet: vi.fn(),
  setStorageSync: vi.fn(),
  getStorageSync: vi.fn(),
  removeStorageSync: vi.fn(),
  clearStorageSync: vi.fn(),
  request: vi.fn(),
  uploadFile: vi.fn(),
  downloadFile: vi.fn(),
  createSelectorQuery: vi.fn(() => ({
    select: vi.fn(() => ({
      boundingClientRect: vi.fn(() => ({
        exec: vi.fn((callback) => {
          callback([
            {
              width: 100,
              height: 100,
              top: 0,
              left: 0,
              right: 100,
              bottom: 100
            }
          ]);
        })
      }))
    }))
  })),
  nextTick: vi.fn((callback) => {
    setTimeout(callback, 0);
  }),
  ENV_TYPE: {
    WEAPP: 'WEAPP',
    WEB: 'WEB',
    RN: 'RN',
    SWAN: 'SWAN',
    ALIPAY: 'ALIPAY',
    TT: 'TT',
    QQ: 'QQ',
    JD: 'JD'
  },
  getEnv: vi.fn(() => 'WEB')
};

// Mock Taro components
const mockTaroComponents = {
  View: 'div',
  Text: 'span',
  Button: 'button',
  Image: 'img',
  Input: 'input',
  Textarea: 'textarea',
  ScrollView: 'div',
  Swiper: 'div',
  SwiperItem: 'div',
  Video: 'video',
  Canvas: 'canvas',
  Map: 'div',
  WebView: 'iframe',
  CoverView: 'div',
  CoverImage: 'img',
  Icon: 'i',
  RichText: 'div',
  Progress: 'progress',
  Checkbox: 'input',
  CheckboxGroup: 'div',
  Form: 'form',
  Label: 'label',
  Picker: 'select',
  PickerView: 'div',
  PickerViewColumn: 'div',
  Radio: 'input',
  RadioGroup: 'div',
  Slider: 'input',
  Switch: 'input',
  Navigator: 'a',
  Audio: 'audio',
  Camera: 'div',
  LivePlayer: 'video',
  LivePusher: 'video',
  FunctionalPageNavigator: 'div',
  OfficialAccount: 'div',
  OpenData: 'div',
  NavigationBar: 'div',
  PageMeta: 'div',
  PageContainer: 'div',
  ShareButton: 'button',
  Ad: 'div',
  AdContentPage: 'div',
  CustomWrapper: 'div',
  Embed: 'iframe',
  ITouchEvent: {}
};

// 全局 Mock
vi.mock('@tarojs/components', () => mockTaroComponents);
vi.mock('@tarojs/components/types/common', () => ({
  ITouchEvent: {}
}));

vi.mock('@tarojs/taro', () => mockTaro);

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    fontSize: '16px',
    lineHeight: '1.5'
  }))
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn()
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  setTimeout(callback, 16);
  return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock console methods in test environment
if (process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    warn: vi.fn(),
    error: vi.fn()
  };
}

// 设置全局测试环境变量
process.env.NODE_ENV = 'test';
process.env.TARO_ENV = 'h5';

// Mock @taro-uno/core package
vi.mock('@taro-uno/core', () => ({
  // 主题相关 Hooks
  useTheme: vi.fn(() => ({
    colors: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
      info: '#1890ff',
      text: '#000000',
      textSecondary: '#666666',
      textDisabled: '#999999',
      border: '#d9d9d9',
      divider: '#f0f0f0',
      background: '#ffffff',
      backgroundSecondary: '#fafafa'
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    typography: {
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      }
    },
    borderRadius: {
      none: 0,
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
      full: 9999
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }
  })),
  useThemeVariables: vi.fn(() => ({})),
  useThemeMode: vi.fn(() => 'light'),
  useThemeColors: vi.fn(() => ({})),
  useThemeSpacing: vi.fn(() => ({})),
  useThemeTypography: vi.fn(() => ({})),
  useThemeBorderRadius: vi.fn(() => ({})),
  useThemeShadows: vi.fn(() => ({})),

  // 无障碍性相关 Hooks
  useFocusManager: vi.fn(() => ({
    focusedIndex: 0,
    setFocusedIndex: vi.fn(),
    focusNext: vi.fn(),
    focusPrevious: vi.fn(),
    focusFirst: vi.fn(),
    focusLast: vi.fn()
  })),
  useScreenReader: vi.fn(() => ({
    announce: vi.fn(),
    isScreenReaderActive: false
  })),
  useKeyboardNavigation: vi.fn(() => ({
    handleKeyDown: vi.fn(),
    focusedIndex: 0,
    setFocusedIndex: vi.fn(),
    navigateNext: vi.fn(),
    navigatePrevious: vi.fn()
  })),

  // 性能监控相关 Hooks
  usePerformanceMonitor: vi.fn(() => ({
    metrics: {},
    startMeasure: vi.fn(),
    endMeasure: vi.fn(),
    getMetrics: vi.fn(() => ({}))
  })),
  usePerformanceOptimizer: vi.fn(() => ({
    optimize: vi.fn(),
    shouldOptimize: true
  })),
  usePerformanceMark: vi.fn(() => ({
    mark: vi.fn(),
    measure: vi.fn(),
    getMarks: vi.fn(() => [])
  })),
  useIntersectionObserver: vi.fn(() => ({
    isIntersecting: false,
    entry: null,
    observe: vi.fn(),
    unobserve: vi.fn()
  })),

  // 无障碍性相关 Hooks
  useAccessibility: vi.fn(() => ({
    generateId: vi.fn((prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`),
    announce: vi.fn(),
    isScreenReaderActive: false
  })),

  // 导出默认对象
  default: {
    useTheme: vi.fn(),
    useFocusManager: vi.fn(),
    useScreenReader: vi.fn(),
    useKeyboardNavigation: vi.fn(),
    usePerformanceMonitor: vi.fn(),
    usePerformanceOptimizer: vi.fn(),
    usePerformanceMark: vi.fn(),
    useIntersectionObserver: vi.fn()
  }
}));

// 清理函数
afterEach(() => {
  vi.clearAllMocks();
});

// 全局测试超时
jest.setTimeout(10000);
