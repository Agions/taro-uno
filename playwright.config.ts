import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright 配置文件
 * 用于端到端测试
 */

export default defineConfig({
  testDir: './tests/e2e',
  
  /* 在本地运行测试时，设置为 'headed' 模式以查看浏览器 */
  
  /* 设置每个测试的超时时间 */
  timeout: 30000,
  
  expect: {
    /**
     * 设置 expect() 的超时时间
     */
    timeout: 5000,
  },

  /* 并行运行测试 */
  fullyParallel: true,
  
  /* 失败时重试次数 */
  retries: (process.env as any).CI ? 2 : 0,
  
  /* 限制并行测试的数量 */
  workers: (process.env as any).CI ? 1 : undefined,
  
  /* 报告器配置 */
  reporter: 'html',
  
  /* 共享设置给所有项目 */
  use: {
    /* 在本地运行测试时，设置为 'headed' 模式以查看浏览器 */
    headless: (process.env as any).HEADED !== 'true',
    /* 基础 URL */
    baseURL: 'http://localhost:3000',
    
    /* 收集 traces */
    trace: 'on-first-retry',
    
    /* 截图 */
    screenshot: 'only-on-failure',
    
    /* 视频 */
    video: 'retain-on-failure',
  },

  /* 配置不同的项目 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 测试移动端 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* 测试平板 */
    {
      name: 'iPad',
      use: { ...devices['iPad Pro 11'] },
    },
  ],

  /* 在全局测试之前运行 */
  globalSetup: require.resolve('./tests/e2e/global-setup.ts'),

  /* 在本地测试服务器 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !(process.env as any).CI,
    timeout: 120 * 1000,
  },
})