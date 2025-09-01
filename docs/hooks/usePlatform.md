# usePlatform 平台检测钩子

平台检测钩子用于检测当前运行平台，提供平台相关的信息和功能适配。

## 基础用法

```tsx
import { usePlatform } from '@/hooks'

function MyComponent() {
  const platform = usePlatform()

  return (
    <div>
      <p>当前平台: {platform.name}</p>
      <p>平台版本: {platform.version}</p>
      <p>是否为移动端: {platform.isMobile ? '是' : '否'}</p>
    </div>
  )
}
```

## 平台信息

```tsx
// 获取平台信息
const platform = usePlatform()

// 平台信息结构
const platformInfo = {
  name: 'h5',                    // 平台名称：h5、weapp、swan、alipay、tt、qq、rn
  version: '1.0.0',              // 平台版本
  isH5: true,                    // 是否为H5平台
  isWeapp: false,                // 是否为微信小程序
  isSwan: false,                 // 是否为百度小程序
  isAlipay: false,               // 是否为支付宝小程序
  isTT: false,                   // 是否为字节跳动小程序
  isQQ: false,                   // 是否为QQ小程序
  isRN: false,                   // 是否为React Native
  isMobile: false,               // 是否为移动设备
  isIOS: false,                  // 是否为iOS设备
  isAndroid: false,              // 是否为Android设备
  isIPad: false,                 // 是否为iPad设备
  isTablet: false,               // 是否为平板设备
  isDesktop: true,               // 是否为桌面设备
  isWeChat: false,               // 是否在微信环境中
  isMiniProgram: false,          // 是否为小程序环境
  isPWA: false,                  // 是否为PWA应用
  language: 'zh-CN',             // 语言设置
  timezone: 'Asia/Shanghai',      // 时区
  userAgent: 'Mozilla/5.0...',   // 用户代理字符串
  screen: {                      // 屏幕信息
    width: 1920,
    height: 1080,
    pixelRatio: 2,
    orientation: 'landscape'
  },
  features: {                    // 平台特性
    touch: false,
    geolocation: true,
    localStorage: true,
    sessionStorage: true,
    webWorker: true,
    webSocket: true,
    webGL: true,
    canvas: true,
    audio: true,
    video: true,
    camera: false,
    microphone: false,
    vibration: false,
    online: true
  },
  capabilities: {                // 平台能力
    maxTouchPoints: 0,
    pointerEvents: true,
    passiveEventListeners: true,
    intersectionObserver: true,
    resizeObserver: true,
    mutationObserver: true,
    performance: true,
    navigation: true,
    serviceWorker: false,
    webAppManifest: false
  }
}
```

## 平台检测

```tsx
// 平台检测
const platform = usePlatform()

// 检测特定平台
if (platform.isH5) {
  console.log('当前是H5平台')
}

if (platform.isWeapp) {
  console.log('当前是微信小程序')
}

if (platform.isMobile) {
  console.log('当前是移动设备')
}

// 检测设备类型
const getDeviceType = () => {
  if (platform.isMobile) {
    return platform.isTablet ? 'tablet' : 'mobile'
  }
  return 'desktop'
}

// 检测浏览器环境
const getBrowserInfo = () => {
  if (!platform.isH5) return null
  
  const userAgent = platform.userAgent
  const browser = {
    isChrome: /Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isEdge: /Edge/.test(userAgent),
    isIE: /MSIE|Trident/.test(userAgent)
  }
  
  return browser
}
```

## 平台适配

```tsx
// 平台适配
const platform = usePlatform()

const getPlatformSpecificProps = () => {
  const baseProps = {
    style: { padding: 16 }
  }

  if (platform.isH5) {
    return {
      ...baseProps,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter
    }
  }

  if (platform.isWeapp) {
    return {
      ...baseProps,
      onClick: handleWeappClick,
      onLongPress: handleLongPress
    }
  }

  if (platform.isRN) {
    return {
      ...baseProps,
      onPress: handleRNPress,
      onLongPress: handleRNLongPress
    }
  }

  return baseProps
}

// 平台特定组件
const PlatformSpecificComponent = () => {
  const platform = usePlatform()

  if (platform.isH5) {
    return <DesktopComponent />
  }

  if (platform.isMobile) {
    return <MobileComponent />
  }

  return <DefaultComponent />
}
```

## 屏幕适配

```tsx
// 屏幕适配
const platform = usePlatform()

const getResponsiveStyles = () => {
  const { width, height, pixelRatio } = platform.screen
  
  return {
    container: {
      width: '100%',
      maxWidth: width > 768 ? '1200px' : '100%',
      padding: width > 768 ? '24px' : '16px'
    },
    text: {
      fontSize: width > 768 ? '16px' : '14px',
      lineHeight: 1.5
    },
    image: {
      maxWidth: '100%',
      height: 'auto'
    }
  }
}

// 响应式断点
const getBreakpoint = () => {
  const { width } = platform.screen
  
  if (width < 576) return 'xs'
  if (width < 768) return 'sm'
  if (width < 992) return 'md'
  if (width < 1200) return 'lg'
  return 'xl'
}
```

## 功能检测

```tsx
// 功能检测
const platform = usePlatform()

const checkFeatureSupport = () => {
  const { features } = platform
  
  return {
    canUseTouch: features.touch,
    canUseGeolocation: features.geolocation,
    canUseLocalStorage: features.localStorage,
    canUseWebWorker: features.webWorker,
    canUseWebSocket: features.webSocket,
    canUseWebGL: features.webGL
  }
}

// 渐进增强
const ProgressiveEnhancement = () => {
  const platform = usePlatform()
  const features = checkFeatureSupport()
  
  return (
    <div>
      <BasicComponent />
      {features.canUseWebGL && <WebGLEnhancedComponent />}
      {features.canUseWebSocket && <RealTimeComponent />}
      {features.canUseGeolocation && <LocationComponent />}
    </div>
  )
}
```

## 性能优化

```tsx
// 性能优化
const platform = usePlatform()

const getOptimizedConfig = () => {
  const config = {
    animations: true,
    shadows: true,
    gradients: true,
    images: true
  }

  // 根据平台性能调整
  if (platform.isMobile) {
    config.animations = false
    config.shadows = false
    config.gradients = false
  }

  // 根据设备性能调整
  if (platform.isLowEndDevice) {
    config.images = false
  }

  return config
}

// 懒加载策略
const getLazyLoadStrategy = () => {
  if (platform.isH5) {
    return {
      loading: 'lazy',
      threshold: 0.1,
      rootMargin: '50px'
    }
  }
  
  return {
    loading: 'eager'
  }
}
```

## API

### 返回值

| 属性名 | 类型 | 说明 |
|--------|------|------|
| name | string | 平台名称 |
| version | string | 平台版本 |
| isH5 | boolean | 是否为H5平台 |
| isWeapp | boolean | 是否为微信小程序 |
| isSwan | boolean | 是否为百度小程序 |
| isAlipay | boolean | 是否为支付宝小程序 |
| isTT | boolean | 是否为字节跳动小程序 |
| isQQ | boolean | 是否为QQ小程序 |
| isRN | boolean | 是否为React Native |
| isMobile | boolean | 是否为移动设备 |
| isIOS | boolean | 是否为iOS设备 |
| isAndroid | boolean | 是否为Android设备 |
| isIPad | boolean | 是否为iPad设备 |
| isTablet | boolean | 是否为平板设备 |
| isDesktop | boolean | 是否为桌面设备 |
| isWeChat | boolean | 是否在微信环境中 |
| isMiniProgram | boolean | 是否为小程序环境 |
| isPWA | boolean | 是否为PWA应用 |
| language | string | 语言设置 |
| timezone | string | 时区 |
| userAgent | string | 用户代理字符串 |
| screen | object | 屏幕信息 |
| features | object | 平台特性 |
| capabilities | object | 平台能力 |

### 工具方法

```tsx
// 获取平台特定信息
const platform = usePlatform()

// 检测平台能力
const hasCapability = (capability: string) => {
  return platform.capabilities[capability] || false
}

// 检测平台特性
const hasFeature = (feature: string) => {
  return platform.features[feature] || false
}

// 获取设备类型
const getDeviceType = () => {
  if (platform.isMobile) {
    return platform.isTablet ? 'tablet' : 'mobile'
  }
  return 'desktop'
}

// 获取浏览器信息
const getBrowserInfo = () => {
  if (!platform.isH5) return null
  
  const { userAgent } = platform
  return {
    isChrome: /Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isEdge: /Edge/.test(userAgent),
    isIE: /MSIE|Trident/.test(userAgent)
  }
}
```

## 最佳实践

1. **渐进增强**：根据平台能力提供不同级别的功能
2. **优雅降级**：在不支持某些特性的平台上提供替代方案
3. **性能优化**：根据设备性能调整功能复杂度
4. **用户体验**：为不同平台提供优化的交互方式

## 注意事项

1. 平台检测基于用户代理字符串和环境特征，可能存在误判
2. 在小程序环境中，某些H5特性可能不可用
3. 平台信息可能在应用运行过程中发生变化
4. 建议在应用初始化时获取平台信息并缓存</think>