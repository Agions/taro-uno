/**
 * 基础组件测试设置
 */

import { vi } from 'vitest';

// Mock Taro 组件
vi.mock('@tarojs/components', () => ({
  Button: 'button',
  Text: 'span',
  View: 'div',
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
}));

// Mock Taro API
vi.mock('@tarojs/taro', () => ({
  getEnv: () => 'h5',
  getSystemInfoSync: () => ({
    platform: 'h5',
    system: 'iOS 15.0',
    version: '1.0.0',
    SDKVersion: '2.0.0',
    screenWidth: 375,
    screenHeight: 667,
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
    language: 'zh-CN',
    fontSizeSetting: 16,
    theme: 'light'
  }),
  getAccountInfoSync: () => ({
    miniProgram: {
      appId: 'test-app-id',
      version: '1.0.0',
      sdkVersion: '2.0.0'
    }
  }),
  setStorageSync: vi.fn(),
  getStorageSync: vi.fn(),
  getNetworkType: vi.fn(),
  getBatteryInfo: vi.fn()
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined)
  }
});

// Mock selection API
Object.assign(window, {
  getSelection: vi.fn(() => ({
    removeAllRanges: vi.fn(),
    addRange: vi.fn()
  }))
});

Object.assign(document, {
  createRange: vi.fn(() => ({
    selectNodeContents: vi.fn()
  }))
});

// Mock performance API
Object.assign(performance, {
  now: vi.fn(() => Date.now()),
  getEntriesByType: vi.fn(() => [])
});

// Mock match media
Object.assign(window, {
  matchMedia: vi.fn(() => ({
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    matches: false
  }))
});

export default {};
