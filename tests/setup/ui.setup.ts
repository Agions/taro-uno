/**
 * UI组件测试设置
 * 为UI组件测试提供必要的环境配置
 */

import '@testing-library/jest-dom';

// Mock @tarojs/components
jest.mock('@tarojs/components', () => {
  const React = require('react');

  const createMockComponent = (name: string) => {
    const MockComponent = React.forwardRef((props: any, ref: any) => {
      const { children, className, style, onClick, ...rest } = props;
      return React.createElement(
        'div',
        {
          'data-testid': name.toLowerCase(),
          className,
          style,
          onClick,
          ref,
          ...rest,
        },
        children,
      );
    });
    MockComponent.displayName = `Mock${name}`;
    return MockComponent;
  };

  return {
    View: createMockComponent('View'),
    Text: createMockComponent('Text'),
    Button: createMockComponent('Button'),
    Image: createMockComponent('Image'),
    ScrollView: createMockComponent('ScrollView'),
    Swiper: createMockComponent('Swiper'),
    SwiperItem: createMockComponent('SwiperItem'),
    Input: createMockComponent('Input'),
    Textarea: createMockComponent('Textarea'),
    Switch: createMockComponent('Switch'),
    Slider: createMockComponent('Slider'),
    Picker: createMockComponent('Picker'),
    PickerView: createMockComponent('PickerView'),
    PickerViewColumn: createMockComponent('PickerViewColumn'),
    Navigator: createMockComponent('Navigator'),
    Audio: createMockComponent('Audio'),
    Video: createMockComponent('Video'),
    Camera: createMockComponent('Camera'),
    LivePlayer: createMockComponent('LivePlayer'),
    LivePusher: createMockComponent('LivePusher'),
    Map: createMockComponent('Map'),
    Canvas: createMockComponent('Canvas'),
    OpenData: createMockComponent('OpenData'),
    WebView: createMockComponent('WebView'),
    RichText: createMockComponent('RichText'),
    Progress: createMockComponent('Progress'),
    Icon: createMockComponent('Icon'),
    CheckboxGroup: createMockComponent('CheckboxGroup'),
    Checkbox: createMockComponent('Checkbox'),
    RadioGroup: createMockComponent('RadioGroup'),
    Radio: createMockComponent('Radio'),
    Form: createMockComponent('Form'),
    Label: createMockComponent('Label'),
  };
});

// Mock Taro API
const mockTaro = {
  getSystemInfoSync: () => ({
    platform: 'h5',
    screenWidth: 375,
    screenHeight: 667,
    windowWidth: 375,
    windowHeight: 667,
    pixelRatio: 2,
  }),
  createSelectorQuery: () => ({
    select: () => ({
      boundingClientRect: () => ({
        exec: (callback: (result: any[]) => void) => {
          callback([
            {
              width: 100,
              height: 50,
              top: 0,
              left: 0,
              right: 100,
              bottom: 50,
            },
          ]);
        },
      }),
    }),
  }),
  nextTick: (callback: () => void) => {
    setTimeout(callback, 0);
  },
  showToast: jest.fn(),
  showModal: jest.fn(),
  navigateTo: jest.fn(),
  redirectTo: jest.fn(),
  switchTab: jest.fn(),
  navigateBack: jest.fn(),
};

// 全局Mock
(global as any).Taro = mockTaro;
(global as any).wx = mockTaro;
(global as any).my = mockTaro;
(global as any).swan = mockTaro;
(global as any).tt = mockTaro;

// Mock IntersectionObserver
(global as any).IntersectionObserver = class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [];

  constructor() {
    // Mock constructor
  }

  observe() {
    // Mock observe
  }

  unobserve() {
    // Mock unobserve
  }

  disconnect() {
    // Mock disconnect
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock ResizeObserver
(global as any).ResizeObserver = class MockResizeObserver {
  constructor() {
    // Mock constructor
  }

  observe() {
    // Mock observe
  }

  unobserve() {
    // Mock unobserve
  }

  disconnect() {
    // Mock disconnect
  }
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// 清理函数
afterEach(() => {
  jest.clearAllMocks();
});
