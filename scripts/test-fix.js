#!/usr/bin/env node

/**
 * Test Fix Script
 * 修复测试配置和组件导入问题
 */

const fs = require('fs');
const path = require('path');

class TestFixer {
  constructor() {
    this.projectRoot = process.cwd();
    this.componentsDir = path.join(this.projectRoot, 'src/components');
    this.testsDir = path.join(this.projectRoot, 'tests');
  }

  // 修复测试配置
  fixTestConfig() {
    console.log('🔧 修复测试配置...');

    const vitestConfigPath = path.join(this.projectRoot, 'vitest.config.ts');
    const vitestConfig = `// @ts-nocheck
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Mock plugin for Taro components
const taroMockPlugin = {
  name: 'taro-mock',
  resolveId(source) {
    if (source === '@tarojs/components' || source === '@tarojs/components/types/common') {
      return '\0' + source
    }
    return null
  },
  load(id) {
    if (id === '\0@tarojs/components') {
      return \`
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
      \`
    }
    if (id === '\0@tarojs/components/types/common') {
      return \`
        export const ITouchEvent = {}
      \`
    }
    return null
  }
}

export default defineConfig({
  plugins: [react(), taroMockPlugin],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      '**/*.d.ts',
      '**/node_modules/**',
    ],
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
        '**/types.ts',
        '**/index.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/constants': resolve(__dirname, 'src/constants'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/theme': resolve(__dirname, 'src/theme'),
      '@/types': resolve(__dirname, 'src/types'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`
          @import "\${resolve(__dirname, 'src/theme/variables.scss')}";
        \`,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
})`;

    fs.writeFileSync(vitestConfigPath, vitestConfig);
    console.log('✅ Vitest 配置已修复');
  }

  // 修复测试设置文件
  fixTestSetup() {
    console.log('🔧 修复测试设置...');

    const setupPath = path.join(this.testsDir, 'setup.ts');
    const setupContent = `import '@testing-library/jest-dom'
import { vi } from 'vitest'

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
      height: 627,
    },
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
              bottom: 100,
            },
          ])
        }),
      })),
    })),
  })),
  nextTick: vi.fn((callback) => {
    setTimeout(callback, 0)
  }),
  ENV_TYPE: {
    WEAPP: 'WEAPP',
    WEB: 'WEB',
    RN: 'RN',
    SWAN: 'SWAN',
    ALIPAY: 'ALIPAY',
    TT: 'TT',
    QQ: 'QQ',
    JD: 'JD',
  },
  getEnv: vi.fn(() => 'WEB'),
}

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
  ITouchEvent: {},
}

vi.mock('@tarojs/components', () => mockTaroComponents)
vi.mock('@tarojs/components/types/common', () => ({
  ITouchEvent: {},
}))

// 全局 Mock
vi.mock('@tarojs/taro', () => mockTaro)

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

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
    dispatchEvent: vi.fn(),
  })),
})

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    fontSize: '16px',
    lineHeight: '1.5',
  })),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
})

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  setTimeout(callback, 16)
  return 1
})

global.cancelAnimationFrame = vi.fn()

// Mock console methods in test environment
if (process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    warn: vi.fn(),
    error: vi.fn(),
  }
}

// 设置全局测试环境变量
process.env.NODE_ENV = 'test'
process.env.TARO_ENV = 'h5'

// Mock @taro-uno/core package
vi.mock('@/utils', () => ({
  PlatformDetector: {
    isH5: true,
    isWeapp: false,
    isRN: false,
  },
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
})

// Mock window.open
Object.assign(window, {
  open: vi.fn(),
})

// Mock window.location
Object.assign(window, {
  location: {
    href: '',
  },
})

// 清理函数
afterEach(() => {
  vi.clearAllMocks()
})
`;

    fs.writeFileSync(setupPath, setupContent);
    console.log('✅ 测试设置已修复');
  }

  // 修复 Text 组件测试
  fixTextTest() {
    console.log('🔧 修复 Text 组件测试...');

    const textTestPath = path.join(this.componentsDir, 'basic/Text/Text.test.tsx');
    const textTestContent = `import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import TextComponent from './Text'
import type { TextProps } from './Text.types'

// 使用实际的组件
const Text = TextComponent

describe('Text Component', () => {
  const defaultProps: TextProps = {
    children: 'Hello World',
    onClick: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders text with default props', () => {
      render(<Text {...defaultProps} />)
      
      const text = screen.getByText('Hello World')
      expect(text).toBeInTheDocument()
    })

    it('renders text with different sizes', () => {
      const sizes: Array<TextProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
      
      sizes.forEach(size => {
        const { container } = render(<Text {...defaultProps} size={size} />)
        const text = container.querySelector('.taro-uno-text')
        expect(text).toHaveClass(\`taro-uno-text--\${size}\`)
      })
    })

    it('renders text with different colors', () => {
      const colors: Array<TextProps['color']> = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
      
      colors.forEach(color => {
        const { container } = render(<Text {...defaultProps} color={color} />)
        const text = container.querySelector('.taro-uno-text')
        expect(text).toHaveClass(\`taro-uno-text--\${color}\`)
      })
    })

    it('renders clickable text', () => {
      const { container } = render(<Text {...defaultProps} clickable />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toHaveClass('taro-uno-text--clickable')
    })

    it('renders loading text', () => {
      const { container } = render(<Text {...defaultProps} loading />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toHaveClass('taro-uno-text--loading')
    })

    it('renders disabled text', () => {
      const { container } = render(<Text {...defaultProps} disabled />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toHaveClass('taro-uno-text--disabled')
    })

    it('renders with custom className', () => {
      const { container } = render(<Text {...defaultProps} className="custom-text" />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toHaveClass('custom-text')
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      render(<Text {...defaultProps} clickable />)
      
      const text = screen.getByText('Hello World')
      fireEvent.click(text)
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when disabled', () => {
      render(<Text {...defaultProps} disabled />)
      
      const text = screen.getByText('Hello World')
      fireEvent.click(text)
      
      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not handle click when loading', () => {
      render(<Text {...defaultProps} loading />)
      
      const text = screen.getByText('Hello World')
      fireEvent.click(text)
      
      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
  })

  describe('Copy Functionality', () => {
    it('copies text when copyable', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText
        }
      })

      const onCopy = vi.fn()
      render(<Text {...defaultProps} copyable onCopy={onCopy} />)
      
      const copyButton = screen.getByText('📋')
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('Hello World')
        expect(onCopy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Text {...defaultProps} accessibilityLabel="Greeting text" />)
      
      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('accessibility-label', 'Greeting text')
    })

    it('updates accessibility state when disabled', () => {
      render(<Text {...defaultProps} disabled />)
      
      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('accessibility-state', JSON.stringify({ disabled: true }))
    })

    it('updates accessibility state when loading', () => {
      render(<Text {...defaultProps} loading />)
      
      const text = screen.getByText('Hello World')
      expect(text).toHaveAttribute('accessibility-state', JSON.stringify({ busy: true }))
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)
      
      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.getText).toBe('function')
      expect(typeof ref.current.setText).toBe('function')
      expect(typeof ref.current.copy).toBe('function')
      expect(typeof ref.current.setDisabled).toBe('function')
      expect(typeof ref.current.setLoading).toBe('function')
    })

    it('can get text content via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)
      
      expect(ref.current.getText()).toBe('Hello World')
    })

    it('can set text content via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)
      
      ref.current.setText('New Text')
      expect(ref.current.getText()).toBe('New Text')
    })

    it('can set disabled state via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)
      
      ref.current.setDisabled(true)
      
      const text = screen.getByText('Hello World')
      expect(text).toHaveClass('taro-uno-text--disabled')
    })

    it('can set loading state via ref', () => {
      const ref = React.createRef<any>()
      render(<Text {...defaultProps} ref={ref} />)
      
      ref.current.setLoading(true)
      
      const text = screen.getByText('Hello World')
      expect(text).toHaveClass('taro-uno-text--loading')
    })
  })

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<Text {...defaultProps} children={undefined} />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toBeInTheDocument()
    })

    it('renders with empty string children', () => {
      render(<Text {...defaultProps} children="" />)
      
      const text = screen.getByText('')
      expect(text).toBeInTheDocument()
    })

    it('renders with null children', () => {
      const { container } = render(<Text {...defaultProps} children={null} />)
      const text = container.querySelector('.taro-uno-text')
      expect(text).toBeInTheDocument()
    })
  })
})
`;

    fs.writeFileSync(textTestPath, textTestContent);
    console.log('✅ Text 组件测试已修复');
  }

  // 修复 Button 组件测试
  fixButtonTest() {
    console.log('🔧 修复 Button 组件测试...');

    const buttonTestPath = path.join(this.componentsDir, 'basic/Button/Button.test.tsx');
    const buttonTestContent = `import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ButtonComponent from './Button'
import type { ButtonProps } from './Button.types'

// 使用实际的组件
const Button = ButtonComponent

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    children: 'Click me',
    onClick: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders button with default props', () => {
      render(<Button {...defaultProps} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    it('renders button with different variants', () => {
      const variants: Array<ButtonProps['variant']> = ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark', 'ghost', 'link']
      
      variants.forEach(variant => {
        const { container } = render(<Button {...defaultProps} variant={variant} />)
        const button = container.querySelector('.taro-uno-button')
        expect(button).toHaveClass(\`taro-uno-button--\${variant}\`)
      })
    })

    it('renders button with different sizes', () => {
      const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl']
      
      sizes.forEach(size => {
        const { container } = render(<Button {...defaultProps} size={size} />)
        const button = container.querySelector('.taro-uno-button')
        expect(button).toHaveClass(\`taro-uno-button--\${size}\`)
      })
    })

    it('renders disabled button', () => {
      const { container } = render(<Button {...defaultProps} disabled />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('taro-uno-button--disabled')
    })

    it('renders loading button', () => {
      const { container } = render(<Button {...defaultProps} loading />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('taro-uno-button--loading')
    })

    it('renders with custom className', () => {
      const { container } = render(<Button {...defaultProps} className="custom-button" />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toHaveClass('custom-button')
    })
  })

  describe('Event Handling', () => {
    it('handles click event', () => {
      render(<Button {...defaultProps} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when disabled', () => {
      render(<Button {...defaultProps} disabled />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not handle click when loading', () => {
      render(<Button {...defaultProps} loading />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('handles key press events', () => {
      render(<Button {...defaultProps} />)
      
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.keyDown(button, { key: ' ' })
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', () => {
      render(<Button {...defaultProps} accessibilityLabel="Submit button" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-label', 'Submit button')
    })

    it('updates accessibility state when disabled', () => {
      render(<Button {...defaultProps} disabled />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-state', JSON.stringify({ disabled: true }))
    })

    it('updates accessibility state when loading', () => {
      render(<Button {...defaultProps} loading />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('accessibility-state', JSON.stringify({ busy: true }))
    })
  })

  describe('Ref API', () => {
    it('exposes ref methods', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)
      
      expect(ref.current).toBeTruthy()
      expect(ref.current.element).toBeTruthy()
      expect(typeof ref.current.setDisabled).toBe('function')
      expect(typeof ref.current.setLoading).toBe('function')
      expect(typeof ref.current.focus).toBe('function')
      expect(typeof ref.current.blur).toBe('function')
    })

    it('can set disabled state via ref', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)
      
      ref.current.setDisabled(true)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('taro-uno-button--disabled')
    })

    it('can set loading state via ref', () => {
      const ref = React.createRef<any>()
      render(<Button {...defaultProps} ref={ref} />)
      
      ref.current.setLoading(true)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('taro-uno-button--loading')
    })
  })

  describe('Edge Cases', () => {
    it('renders without children', () => {
      const { container } = render(<Button {...defaultProps} children={undefined} />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toBeInTheDocument()
    })

    it('renders with empty string children', () => {
      render(<Button {...defaultProps} children="" />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('renders with null children', () => {
      const { container } = render(<Button {...defaultProps} children={null} />)
      const button = container.querySelector('.taro-uno-button')
      expect(button).toBeInTheDocument()
    })
  })
})
`;

    fs.writeFileSync(buttonTestPath, buttonTestContent);
    console.log('✅ Button 组件测试已修复');
  }

  // 运行所有修复
  runAllFixes() {
    console.log('🚀 开始修复测试配置和组件测试...');

    this.fixTestConfig();
    this.fixTestSetup();
    this.fixTextTest();
    this.fixButtonTest();

    console.log('✅ 所有测试修复已完成!');
    console.log('💡 现在可以运行 npm run test:run 来验证修复结果');
  }
}

// 运行修复脚本
const fixer = new TestFixer();
fixer.runAllFixes();
