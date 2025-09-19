/**
 * 基础组件 E2E 测试
 * 使用 Playwright 进行端到端测试
 */

import { test, expect } from '@playwright/test';

test.describe('Basic Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 导航到测试页面
    await page.goto('/');
    await page.waitForSelector('[data-testid="app-container"]');
  });

  test.describe('Button Component', () => {
    test('should render and handle click events', async ({ page }) => {
      // 查找按钮组件
      const button = await page.locator('[data-testid="button-component"]').first();

      // 检查按钮是否可见
      await expect(button).toBeVisible();

      // 检查按钮文本
      await expect(button).toHaveText('Click me');

      // 点击按钮
      await button.click();

      // 检查点击事件是否被触发（这里需要根据实际应用逻辑调整）
      const clickCount = await page.locator('[data-testid="click-count"]').textContent();
      expect(clickCount).toBe('1');
    });

    test('should handle different button states', async ({ page }) => {
      // 测试禁用状态
      const disabledButton = await page.locator('[data-testid="disabled-button"]');
      await expect(disabledButton).toBeDisabled();

      // 测试加载状态
      const loadingButton = await page.locator('[data-testid="loading-button"]');
      await expect(loadingButton).toHaveClass(/loading/);

      // 测试危险按钮
      const dangerButton = await page.locator('[data-testid="danger-button"]');
      await expect(dangerButton).toHaveClass(/danger/);
    });

    test('should handle button variants', async ({ page }) => {
      // 测试主要按钮
      const primaryButton = await page.locator('[data-testid="primary-button"]');
      await expect(primaryButton).toHaveClass(/primary/);

      // 测试次要按钮
      const secondaryButton = await page.locator('[data-testid="secondary-button"]');
      await expect(secondaryButton).toHaveClass(/secondary/);

      // 测试文本按钮
      const textButton = await page.locator('[data-testid="text-button"]');
      await expect(textButton).toHaveClass(/text/);
    });
  });

  test.describe('Input Component', () => {
    test('should render and handle input events', async ({ page }) => {
      // 查找输入框组件
      const input = await page.locator('[data-testid="input-component"]').first();

      // 检查输入框是否可见
      await expect(input).toBeVisible();

      // 输入文本
      await input.fill('Hello World');

      // 检查输入值
      await expect(input).toHaveValue('Hello World');

      // 检查输入事件是否被触发
      const inputValue = await page.locator('[data-testid="input-value"]').textContent();
      expect(inputValue).toBe('Hello World');
    });

    test('should handle input validation', async ({ page }) => {
      // 测试必填验证
      const requiredInput = await page.locator('[data-testid="required-input"]');
      await requiredInput.fill('');
      await requiredInput.press('Tab');

      // 检查错误信息
      const errorMessage = await page.locator('[data-testid="error-message"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('This field is required');

      // 输入有效值
      await requiredInput.fill('Valid input');
      await expect(errorMessage).not.toBeVisible();
    });

    test('should handle different input types', async ({ page }) => {
      // 测试密码输入框
      const passwordInput = await page.locator('[data-testid="password-input"]');
      await passwordInput.fill('secret123');
      await expect(passwordInput).toHaveValue('secret123');

      // 测试邮箱输入框
      const emailInput = await page.locator('[data-testid="email-input"]');
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');

      // 测试数字输入框
      const numberInput = await page.locator('[data-testid="number-input"]');
      await numberInput.fill('123');
      await expect(numberInput).toHaveValue('123');
    });
  });

  test.describe('Text Component', () => {
    test('should render with different styles', async ({ page }) => {
      // 测试标题文本
      const headingText = await page.locator('[data-testid="heading-text"]');
      await expect(headingText).toBeVisible();
      await expect(headingText).toHaveClass(/heading/);

      // 测试正文文本
      const bodyText = await page.locator('[data-testid="body-text"]');
      await expect(bodyText).toBeVisible();
      await expect(bodyText).toHaveClass(/body/);

      // 测试辅助文本
      const captionText = await page.locator('[data-testid="caption-text"]');
      await expect(captionText).toBeVisible();
      await expect(captionText).toHaveClass(/caption/);
    });

    test('should handle text interactions', async ({ page }) => {
      // 测试可点击文本
      const clickableText = await page.locator('[data-testid="clickable-text"]');
      await expect(clickableText).toBeVisible();

      // 点击文本
      await clickableText.click();

      // 检查点击事件是否被触发
      const clickResult = await page.locator('[data-testid="text-click-result"]').textContent();
      expect(clickResult).toBe('Text clicked');

      // 测试可复制文本
      const copyableText = await page.locator('[data-testid="copyable-text"]');
      await expect(copyableText).toBeVisible();

      // 点击复制按钮
      await copyableText.locator('[data-testid="copy-button"]').click();

      // 检查复制状态
      await expect(copyableText.locator('[data-testid="copy-status"]')).toHaveText('Copied!');
    });
  });

  test.describe('Icon Component', () => {
    test('should render icons correctly', async ({ page }) => {
      // 测试搜索图标
      const searchIcon = await page.locator('[data-testid="search-icon"]');
      await expect(searchIcon).toBeVisible();

      // 测试用户图标
      const userIcon = await page.locator('[data-testid="user-icon"]');
      await expect(userIcon).toBeVisible();

      // 测试设置图标
      const settingsIcon = await page.locator('[data-testid="settings-icon"]');
      await expect(settingsIcon).toBeVisible();
    });

    test('should handle icon interactions', async ({ page }) => {
      // 测试可点击图标
      const clickableIcon = await page.locator('[data-testid="clickable-icon"]');
      await expect(clickableIcon).toBeVisible();

      // 点击图标
      await clickableIcon.click();

      // 检查点击事件是否被触发
      const iconClickResult = await page.locator('[data-testid="icon-click-result"]').textContent();
      expect(iconClickResult).toBe('Icon clicked');
    });

    test('should handle icon sizes and colors', async ({ page }) => {
      // 测试小图标
      const smallIcon = await page.locator('[data-testid="small-icon"]');
      await expect(smallIcon).toBeVisible();
      await expect(smallIcon).toHaveClass(/small/);

      // 测试大图标
      const largeIcon = await page.locator('[data-testid="large-icon"]');
      await expect(largeIcon).toBeVisible();
      await expect(largeIcon).toHaveClass(/large/);

      // 测试主要颜色图标
      const primaryIcon = await page.locator('[data-testid="primary-icon"]');
      await expect(primaryIcon).toBeVisible();
      await expect(primaryIcon).toHaveClass(/primary/);
    });
  });

  test.describe('Component Interactions', () => {
    test('should handle form submission', async ({ page }) => {
      // 填写表单
      await page.fill('[data-testid="form-username"]', 'testuser');
      await page.fill('[data-testid="form-email"]', 'test@example.com');
      await page.fill('[data-testid="form-password"]', 'password123');

      // 提交表单
      await page.click('[data-testid="form-submit"]');

      // 检查提交结果
      const submitResult = await page.locator('[data-testid="form-submit-result"]').textContent();
      expect(submitResult).toContain('Form submitted successfully');
    });

    test('should handle modal interactions', async ({ page }) => {
      // 打开模态框
      await page.click('[data-testid="open-modal"]');

      // 检查模态框是否显示
      const modal = await page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();

      // 关闭模态框
      await page.click('[data-testid="close-modal"]');

      // 检查模态框是否隐藏
      await expect(modal).not.toBeVisible();
    });

    test('should handle navigation', async ({ page }) => {
      // 点击导航链接
      await page.click('[data-testid="nav-link"]');

      // 检查URL是否改变
      await expect(page).toHaveURL('/about');

      // 检查页面内容是否正确
      const aboutContent = await page.locator('[data-testid="about-content"]');
      await expect(aboutContent).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should handle mobile view', async ({ page }) => {
      // 设置移动设备视口
      await page.setViewportSize({ width: 375, height: 667 });

      // 检查移动端导航菜单
      const mobileMenu = await page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toBeVisible();

      // 打开移动菜单
      await page.click('[data-testid="mobile-menu-toggle"]');

      // 检查菜单项是否可见
      const menuItem = await page.locator('[data-testid="mobile-menu-item"]');
      await expect(menuItem).toBeVisible();
    });

    test('should handle tablet view', async ({ page }) => {
      // 设置平板设备视口
      await page.setViewportSize({ width: 768, height: 1024 });

      // 检查平板布局
      const tabletLayout = await page.locator('[data-testid="tablet-layout"]');
      await expect(tabletLayout).toBeVisible();
    });

    test('should handle desktop view', async ({ page }) => {
      // 设置桌面设备视口
      await page.setViewportSize({ width: 1920, height: 1080 });

      // 检查桌面布局
      const desktopLayout = await page.locator('[data-testid="desktop-layout"]');
      await expect(desktopLayout).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load components efficiently', async ({ page }) => {
      // 测量页面加载时间
      const loadTime = await page.evaluate(() => {
        return performance.timing.loadEventEnd - performance.timing.navigationStart;
      });

      // 检查加载时间是否在合理范围内
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle rapid user interactions', async ({ page }) => {
      // 快速连续点击按钮
      const button = await page.locator('[data-testid="rapid-click-button"]');

      for (let i = 0; i < 10; i++) {
        await button.click();
      }

      // 检查应用是否仍然响应
      const clickCount = await page.locator('[data-testid="rapid-click-count"]').textContent();
      expect(parseInt(clickCount)).toBe(10);
    });
  });

  test.describe('Accessibility', () => {
    test('should support keyboard navigation', async ({ page }) => {
      // 使用 Tab 键导航
      await page.keyboard.press('Tab');

      // 检查焦点是否正确移动
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // 使用 Enter 键激活按钮
      await page.keyboard.press('Enter');

      // 检查按钮是否被激活
      const buttonResult = await page.locator('[data-testid="keyboard-result"]').textContent();
      expect(buttonResult).toBe('Button activated via keyboard');
    });

    test('should support screen readers', async ({ page }) => {
      // 检查 ARIA 属性
      const accessibleButton = await page.locator('[data-testid="accessible-button"]');
      await expect(accessibleButton).toHaveAttribute('aria-label', 'Accessible button');
      await expect(accessibleButton).toHaveAttribute('role', 'button');

      // 检查屏幕阅读器友好的文本
      const srText = await page.locator('[data-testid="sr-only"]');
      await expect(srText).toHaveClass(/sr-only/);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // 模拟网络错误
      await page.route('**/api/**', route => route.abort('failed'));

      // 尝试触发网络请求
      await page.click('[data-testid="network-request-button"]');

      // 检查错误消息是否显示
      const errorMessage = await page.locator('[data-testid="network-error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('Network error occurred');
    });

    test('should handle form validation errors', async ({ page }) => {
      // 提交无效表单
      await page.click('[data-testid="invalid-form-submit"]');

      // 检查错误消息
      const validationErrors = await page.locator('[data-testid="validation-errors"]');
      await expect(validationErrors).toBeVisible();

      // 检查错误数量
      const errorCount = await validationErrors.locator('[data-testid="error-item"]').count();
      expect(errorCount).toBeGreaterThan(0);
    });
  });
});
