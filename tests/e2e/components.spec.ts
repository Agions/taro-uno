import { test, expect } from '@playwright/test'

test.describe('Taro Uno UI Components', () => {
  test.beforeEach(async ({ page }) => {
    // 导航到测试页面
    await page.goto('/components')
    
    // 等待组件加载
    await page.waitForSelector('[data-testid="components-container"]')
  })

  test('should load components page', async ({ page }) => {
    await expect(page).toHaveTitle(/Taro Uno UI/)
    await expect(page.locator('[data-testid="components-container"]')).toBeVisible()
  })

  test('should display Button component', async ({ page }) => {
    const buttonSelector = '[data-testid="button-component"]'
    
    // 等待按钮组件加载
    await page.waitForSelector(buttonSelector)
    
    const button = page.locator(buttonSelector)
    await expect(button).toBeVisible()
    
    // 测试点击事件
    await button.click()
    
    // 验证点击后的状态变化
    await expect(button).toHaveCSS('background-color', /rgb(59, 130, 246)/)
  })

  test('should display Card component', async ({ page }) => {
    const cardSelector = '[data-testid="card-component"]'
    
    await page.waitForSelector(cardSelector)
    const card = page.locator(cardSelector)
    
    await expect(card).toBeVisible()
    await expect(card.locator('h3')).toHaveText('Card Title')
    await expect(card.locator('p')).toHaveText('Card content goes here.')
  })

  test('should be responsive on mobile', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/components')
    
    // 检查组件是否在移动端正确显示
    const container = page.locator('[data-testid="components-container"]')
    await expect(container).toBeVisible()
    
    // 检查是否有移动端特定的样式
    const hasMobileClass = await container.getAttribute('class')
    expect(hasMobileClass).toContain('mobile')
  })

  test('should handle keyboard navigation', async ({ page }) => {
    const buttonSelector = '[data-testid="button-component"]'
    
    await page.waitForSelector(buttonSelector)
    const button = page.locator(buttonSelector)
    
    // 使用 Tab 键导航到按钮
    await page.keyboard.press('Tab')
    
    // 验证按钮获得焦点
    await expect(button).toBeFocused()
    
    // 使用 Enter 键触发点击
    await page.keyboard.press('Enter')
    
    // 验证点击效果
    await expect(button).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  })

  test('should handle dark mode toggle', async ({ page }) => {
    const themeToggle = '[data-testid="theme-toggle"]'
    
    // 等待主题切换按钮加载
    await page.waitForSelector(themeToggle)
    
    const toggle = page.locator(themeToggle)
    
    // 切换到暗色主题
    await toggle.click()
    
    // 验证主题切换
    await expect(page.locator('body')).toHaveClass(/dark/)
    
    // 等待主题过渡动画完成
    await page.waitForTimeout(300)
    
    // 切换回亮色主题
    await toggle.click()
    
    // 验证主题切换
    await expect(page.locator('body')).not.toHaveClass(/dark/)
  })

  test('should handle component interactions', async ({ page }) => {
    const inputSelector = '[data-testid="input-component"]'
    const buttonSelector = '[data-testid="button-component"]'
    
    await page.waitForSelector(inputSelector)
    await page.waitForSelector(buttonSelector)
    
    const input = page.locator(inputSelector)
    const button = page.locator(buttonSelector)
    
    // 在输入框中输入文本
    await input.fill('Test input')
    
    // 验证输入值
    await expect(input).toHaveValue('Test input')
    
    // 点击按钮
    await button.click()
    
    // 验证交互结果（这里假设按钮点击后会显示输入的值）
    const result = page.locator('[data-testid="interaction-result"]')
    await expect(result).toHaveText('Test input')
  })

  test('should handle error states', async ({ page }) => {
    const errorButtonSelector = '[data-testid="error-button"]'
    
    await page.waitForSelector(errorButtonSelector)
    const errorButton = page.locator(errorButtonSelector)
    
    // 点击触发错误的按钮
    await errorButton.click()
    
    // 等待错误提示显示
    const errorMessage = page.locator('[data-testid="error-message"]')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText(/error/i)
    
    // 点击关闭错误提示
    const closeBtn = page.locator('[data-testid="close-error"]')
    await closeBtn.click()
    
    // 验证错误提示已关闭
    await expect(errorMessage).not.toBeVisible()
  })

  test('should handle loading states', async ({ page }) => {
    const loadingButtonSelector = '[data-testid="loading-button"]'
    
    await page.waitForSelector(loadingButtonSelector)
    const loadingButton = page.locator(loadingButtonSelector)
    
    // 点击触发加载状态的按钮
    await loadingButton.click()
    
    // 验证加载状态
    await expect(loadingButton.locator('[data-testid="loading-spinner"]')).toBeVisible()
    
    // 等待加载完成
    await page.waitForSelector('[data-testid="loading-success"]', { state: 'visible' })
    
    // 验证加载成功状态
    const successMessage = page.locator('[data-testid="loading-success"]')
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toHaveText(/success/i)
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    const buttonSelector = '[data-testid="button-component"]'
    
    await page.waitForSelector(buttonSelector)
    const button = page.locator(buttonSelector)
    
    // 检查ARIA属性
    await expect(button).toHaveAttribute('role', 'button')
    await expect(button).toHaveAttribute('tabindex', '0')
    
    // 检查键盘可访问性
    await button.press('Enter')
    await expect(button).toBeVisible()
    
    // 检查屏幕阅读器支持
    const accessibleName = await button.getAttribute('aria-label')
    expect(accessibleName).toBeTruthy()
  })

  test('should handle form submission', async ({ page }) => {
    const formSelector = '[data-testid="test-form"]'
    const submitButton = '[data-testid="submit-button"]'
    
    await page.waitForSelector(formSelector)
    const form = page.locator(formSelector)
    
    // 填写表单
    await form.locator('[data-testid="name-input"]').fill('John Doe')
    await form.locator('[data-testid="email-input"]').fill('john@example.com')
    
    // 提交表单
    await form.locator(submitButton).click()
    
    // 验证表单提交成功
    const successMessage = page.locator('[data-testid="form-success"]')
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toHaveText(/success/i)
  })

  test('should handle responsive design', async ({ page }) => {
    // 测试桌面端
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/components')
    
    const container = page.locator('[data-testid="components-container"]')
    await expect(container).toBeVisible()
    
    const desktopLayout = container.locator('[data-testid="desktop-layout"]')
    await expect(desktopLayout).toBeVisible()
    
    // 测试移动端
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    
    const mobileLayout = container.locator('[data-testid="mobile-layout"]')
    await expect(mobileLayout).toBeVisible()
    
    // 测试平板端
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    
    const tabletLayout = container.locator('[data-testid="tablet-layout"]')
    await expect(tabletLayout).toBeVisible()
  })
})