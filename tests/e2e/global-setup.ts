import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // 等待应用启动
    await page.goto(baseURL!)
    
    // 检查应用是否正常加载
    await page.waitForSelector('[data-testid="app-root"]', { timeout: 30000 })
    
    console.log('✅ 应用启动成功')
    
    // 执行一些初始化操作
    await page.evaluate(() => {
      // 清除本地存储
      localStorage.clear()
      sessionStorage.clear()
      
      // 设置测试环境标记
      localStorage.setItem('test-environment', 'e2e')
    })
    
    console.log('✅ 测试环境初始化完成')
    
  } catch (error) {
    console.error('❌ 全局设置失败:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup