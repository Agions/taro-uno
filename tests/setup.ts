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

vi.mock('@tarojs/components', () => mockTaroComponents);
vi.mock('@tarojs/components/types/common', () => ({
  ITouchEvent: {}
}));

// 全局 Mock
vi.mock('@tarojs/taro', () => mockTaro);

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
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
if (process.env['NODE_ENV'] === 'test') {
  global.console = {
    ...console,
    warn: vi.fn(),
    error: vi.fn()
  };
}

// 设置全局测试环境变量
process.env['NODE_ENV'] = 'test';
process.env['TARO_ENV'] = 'h5';

// Mock @taro-uno/core package
vi.mock('@/utils', () => ({
  PlatformDetector: {
    isH5: () => true,
    isWeapp: () => false,
    isRN: () => false,
    getPlatform: vi.fn(() => 'h5'),
    getPlatformInfo: vi.fn(() => ({
      platform: 'h5',
      isMiniProgram: false,
      isH5: true,
      isRN: false,
      system: { platform: 'h5' }
    }))
  }
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue('')
  }
});

// Mock window.open
Object.assign(window, {
  open: vi.fn()
});

// Mock window.location
Object.assign(window, {
  location: {
    href: ''
  }
});

// 清理函数
afterEach(() => {
  vi.clearAllMocks();
});
