/**
 * 设计系统示例应用
 * 展示如何使用完整的设计系统
 */

import React, { useState } from 'react';
import { ThemeProvider as EnhancedThemeProvider, useTheme, ThemeSwitcher, ThemeSelector } from './enhanced-theme-system';
import { AccessibilityProvider, useAccessibility } from './accessibility';
import { AnimationProvider, Ripple } from './animations';
import { ResponsiveProvider, useResponsive } from './responsive';

// 简单组件实现
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container mx-auto px-4">{children}</div>
);

const Grid: React.FC<{
  children: React.ReactNode;
  columns?: Record<string, number>;
  gap?: number;
}> = ({ children, columns = { xs: 1 }, gap = 4 }) => (
  <div
    className="grid"
    style={{
      gridTemplateColumns: `repeat(${columns['xs'] || 1}, 1fr)`,
      gap: `${gap * 0.25}rem`
    }}
  >
    {children}
  </div>
);

// const Responsive: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div className="responsive">{children}</div>
// );

// Create responsive components
const ResponsiveXS = ({ children }: { children: React.ReactNode }) => (
  <div className="responsive-xs">{children}</div>
);

const ResponsiveSM = ({ children }: { children: React.ReactNode }) => (
  <div className="responsive-sm">{children}</div>
);

const ResponsiveLG = ({ children }: { children: React.ReactNode }) => (
  <div className="responsive-lg">{children}</div>
);

// 示例组件
const DesignSystemExample: React.FC = () => {
  return (
    <EnhancedThemeProvider>
      <AccessibilityProvider>
        <AnimationProvider>
          <ResponsiveProvider>
            <App />
          </ResponsiveProvider>
        </AnimationProvider>
      </AccessibilityProvider>
    </EnhancedThemeProvider>
  );
};

const App: React.FC = () => {
  const { mode, currentTheme } = useTheme();
  const { screenReader, fontSize, reduceMotion, highContrast, keyboardNavigation } = useAccessibility();
  const { currentBreakpoint: breakpoint, screenSize } = useResponsive();

  const currentBreakpoint = breakpoint || 'md';
  const currentScreenSize = screenSize || { width: 0, height: 0 };

  const [buttonText, setButtonText] = useState('点击我');
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    screenReader.announce('按钮被点击了', 'polite');
    setButtonText('已点击！');
    setTimeout(() => setButtonText('点击我'), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <Container>
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Taro-Uno 设计系统示例
            </h1>
            
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <ThemeSelector />
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentBreakpoint}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {fontSize.scale}x
                </span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            欢迎使用 Taro-Uno 设计系统
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            完整的设计令牌、主题管理、无障碍访问、响应式设计和动画系统
          </p>
          
          <div className="flex justify-center space-x-4">
            <Ripple>
              <button
                onClick={handleButtonClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {buttonText}
              </button>
            </Ripple>
            
            <Ripple>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                打开模态框
              </button>
            </Ripple>
          </div>
        </section>

        {/* 响应式网格示例 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            响应式网格系统
          </h3>
          
          <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  卡片 {item}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  这是一个响应式卡片，在不同屏幕尺寸下会自动调整布局。
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    当前断点: {currentBreakpoint}
                  </span>
                </div>
              </div>
            ))}
          </Grid>
        </section>

        {/* 设计令牌展示 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            设计令牌展示
          </h3>
          
          <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
            {/* 颜色令牌 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                颜色令牌
              </h4>
              <div className="space-y-3">
                {Object.entries(currentTheme.colors).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: value as string }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {key}: {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 间距令牌 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                间距令牌
              </h4>
              <div className="space-y-3">
                {Object.entries(currentTheme.spacing).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div
                      className="bg-blue-500 rounded"
                      style={{ 
                        width: typeof value === 'number' ? `${value}px` : String(value),
                        height: '20px'
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {key}: {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 字体令牌 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                字体令牌
              </h4>
              <div className="space-y-3">
                {Object.entries(currentTheme.typography.fontSize).slice(0, 5).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <span
                      className="text-gray-900 dark:text-white"
                      style={{ fontSize: typeof value === 'number' ? `${value}px` : String(value) }}
                    >
                      Aa
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {key}: {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </section>

        {/* 无障碍访问设置 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            无障碍访问设置
          </h3>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Grid columns={{ xs: 1, md: 2, lg: 4 }} gap={4}>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={keyboardNavigation.enabled}
                    onChange={(e) => keyboardNavigation.setEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">键盘导航</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={screenReader.enabled}
                    onChange={(e) => screenReader.setEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">屏幕阅读器</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={highContrast.enabled}
                    onChange={(e) => highContrast.setEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">高对比度</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reduceMotion.enabled}
                    onChange={(e) => reduceMotion.setEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">减少动画</span>
                </label>
              </div>
            </Grid>
            
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">字体大小:</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={fontSize.scale}
                  onChange={(e) => fontSize.setScale(parseFloat(e.target.value))}
                  className="w-32"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {fontSize.scale}x
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* 响应式内容示例 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            响应式内容
          </h3>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div>
              <ResponsiveXS>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">移动端视图</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    这是为手机设备优化的内容布局
                  </p>
                </div>
              </ResponsiveXS>

              <ResponsiveSM>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-green-600 mb-2">平板视图</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    这是为平板设备优化的内容布局
                  </p>
                </div>
              </ResponsiveSM>

              <ResponsiveLG>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-purple-600 mb-2">桌面视图</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    这是为桌面设备优化的内容布局
                  </p>
                </div>
              </ResponsiveLG>
            </div>
          </div>
        </section>

        {/* 主题信息 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            当前主题信息
          </h3>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  主题配置
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">模式:</span>
                    <span className="text-gray-900 dark:text-white">{mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">主色:</span>
                    <span className="text-gray-900 dark:text-white">{currentTheme.colors.primary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">文本色:</span>
                    <span className="text-gray-900 dark:text-white">{currentTheme.colors.text}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">背景色:</span>
                    <span className="text-gray-900 dark:text-white">{currentTheme.colors.background}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  响应式信息
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">当前断点:</span>
                    <span className="text-gray-900 dark:text-white">{currentBreakpoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">屏幕宽度:</span>
                    <span className="text-gray-900 dark:text-white">{currentScreenSize.width}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">屏幕高度:</span>
                    <span className="text-gray-900 dark:text-white">{currentScreenSize.height}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">设备方向:</span>
                    <span className="text-gray-900 dark:text-white">portrait</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              模态框示例
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              这是一个模态框示例，展示了动画和无障碍访问功能。
            </p>
            <div className="flex justify-end space-x-3">
              <Ripple>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  取消
                </button>
              </Ripple>
              <Ripple>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  确定
                </button>
              </Ripple>
            </div>
          </div>
        </div>
      )}

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <Container>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Taro-Uno 设计系统 - 完整的设计令牌、主题管理、无障碍访问、响应式设计和动画系统
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default DesignSystemExample;