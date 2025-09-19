/**
 * 无障碍测试工具库
 * 提供无障碍属性的测试验证和WCAG合规性检查
 */

import { screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults, Result } from 'axe-core';

// ==================== 无障碍测试类型 ====================

/** 无障碍测试配置 */
export interface AccessibilityTestConfig {
  /** 是否启用 axe-core 测试 */
  enableAxeCore: boolean;
  /** 是否启用手动属性检查 */
  enableManualChecks: boolean;
  /** WCAG 合规级别 */
  wcagLevel: 'A' | 'AA' | 'AAA';
  /** 测试规则 */
  rules: {
    /** 颜色对比度 */
    colorContrast: boolean;
    /** 图片替代文本 */
    imageAlt: boolean;
    /** 表单标签 */
    formLabel: boolean;
    /** 链接目的 */
    linkPurpose: boolean;
    /** 语言属性 */
    langAttribute: boolean;
    /** 文档标题 */
    documentTitle: boolean;
    /** 焦点顺序 */
    focusOrder: boolean;
    /** 键盘导航 */
    keyboardNav: boolean;
  };
}

/** 无障碍测试结果 */
export interface AccessibilityTestResult {
  /** 测试是否通过 */
  passed: boolean;
  /** axe-core 测试结果 */
  axeResults?: AxeResults;
  /** 手动检查结果 */
  manualChecks?: {
    passed: number;
    failed: number;
    warnings: number;
    details: Array<{
      rule: string;
      description: string;
      severity: 'error' | 'warning';
      element?: string;
    }>;
  };
  /** 整体评分 */
  score: number;
  /** 建议 */
  recommendations: string[];
}

// ==================== 无障碍测试工具类 ====================

/** 无障碍测试工具类 */
export class AccessibilityTestUtils {
  private static defaultConfig: AccessibilityTestConfig = {
    enableAxeCore: true,
    enableManualChecks: true,
    wcagLevel: 'AA',
    rules: {
      colorContrast: true,
      imageAlt: true,
      formLabel: true,
      linkPurpose: true,
      langAttribute: true,
      documentTitle: true,
      focusOrder: true,
      keyboardNav: true,
    },
  };

  /** 运行完整的无障碍测试 */
  static async runAccessibilityTest(
    container: HTMLElement,
    config: Partial<AccessibilityTestConfig> = {}
  ): Promise<AccessibilityTestResult> {
    const testConfig = { ...this.defaultConfig, ...config };
    const result: AccessibilityTestResult = {
      passed: true,
      score: 100,
      recommendations: [],
    };

    // 运行 axe-core 测试
    if (testConfig.enableAxeCore) {
      const axeResults = await this.runAxeCoreTest(container, testConfig);
      result.axeResults = axeResults;

      if (axeResults.violations.length > 0) {
        result.passed = false;
        result.score -= axeResults.violations.length * 10;
        result.recommendations.push(...this.generateAxeRecommendations(axeResults));
      }
    }

    // 运行手动检查
    if (testConfig.enableManualChecks) {
      const manualChecks = this.runManualChecks(container, testConfig);
      result.manualChecks = manualChecks;

      if (manualChecks.failed > 0) {
        result.passed = false;
        result.score -= manualChecks.failed * 5;
        result.recommendations.push(...this.generateManualCheckRecommendations(manualChecks));
      }
    }

    // 确保分数不低于0
    result.score = Math.max(0, result.score);

    return result;
  }

  /** 运行 axe-core 测试 */
  private static async runAxeCoreTest(
    container: HTMLElement,
    config: AccessibilityTestConfig
  ): Promise<AxeResults> {
    const axeConfig = {
      rules: {
        'color-contrast': {
          enabled: config.rules.colorContrast,
        },
        'image-alt': {
          enabled: config.rules.imageAlt,
        },
        'label': {
          enabled: config.rules.formLabel,
        },
        'link-name': {
          enabled: config.rules.linkPurpose,
        },
        'html-has-lang': {
          enabled: config.rules.langAttribute,
        },
        'page-title': {
          enabled: config.rules.documentTitle,
        },
        'focus-order-semantics': {
          enabled: config.rules.focusOrder,
        },
      },
      resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable'],
    };

    return await axe(container, axeConfig);
  }

  /** 运行手动检查 */
  private static runManualChecks(
    container: HTMLElement,
    config: AccessibilityTestConfig
  ) {
    const checks = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [] as Array<{
        rule: string;
        description: string;
        severity: 'error' | 'warning';
        element?: string;
      }>,
    };

    // 检查焦点顺序
    if (config.rules.focusOrder) {
      const focusResult = this.checkFocusOrder(container);
      checks.details.push(...focusResult.details);
      focusResult.details.forEach(detail => {
        if (detail.severity === 'error') checks.failed++;
        else checks.warnings++;
      });
      if (focusResult.passed) checks.passed++;
    }

    // 检查键盘导航
    if (config.rules.keyboardNav) {
      const keyboardResult = this.checkKeyboardNavigation(container);
      checks.details.push(...keyboardResult.details);
      keyboardResult.details.forEach(detail => {
        if (detail.severity === 'error') checks.failed++;
        else checks.warnings++;
      });
      if (keyboardResult.passed) checks.passed++;
    }

    return checks;
  }

  /** 检查焦点顺序 */
  private static checkFocusOrder(container: HTMLElement) {
    const details: Array<{
      rule: string;
      description: string;
      severity: 'error' | 'warning';
      element?: string;
    }> = [];
    let passed = true;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // 检查是否有合理的焦点顺序
    focusableElements.forEach((element, index) => {
      const tabIndex = parseInt(element.getAttribute('tabindex') || '0');

      if (tabIndex < 0) {
        details.push({
          rule: 'focus-order',
          description: `元素有负的 tabindex 值`,
          severity: 'warning',
          element: element.outerHTML,
        });
      }

      if (index === 0 && !element.hasAttribute('autofocus')) {
        details.push({
          rule: 'focus-order',
          description: '第一个可聚焦元素应该有 autofocus 属性',
          severity: 'warning',
          element: element.outerHTML,
        });
      }
    });

    return { passed, details };
  }

  /** 检查键盘导航 */
  private static checkKeyboardNavigation(container: HTMLElement) {
    const details: Array<{
      rule: string;
      description: string;
      severity: 'error' | 'warning';
      element?: string;
    }> = [];
    let passed = true;

    const interactiveElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [role="button"], [role="link"]'
    );

    interactiveElements.forEach((element) => {
      // 检查是否有键盘事件监听器
      const hasKeyboardListener = element.hasAttribute('onkeydown') ||
                               element.hasAttribute('onkeyup') ||
                               element.hasAttribute('onkeypress');

      if (!hasKeyboardListener) {
        details.push({
          rule: 'keyboard-nav',
          description: '交互元素缺少键盘事件监听器',
          severity: 'warning',
          element: element.outerHTML,
        });
      }
    });

    return { passed, details };
  }

  /** 生成 axe-core 建议 */
  private static generateAxeRecommendations(results: AxeResults): string[] {
    const recommendations: string[] = [];

    results.violations.forEach((violation) => {
      recommendations.push(`修复 ${violation.id}: ${violation.description}`);
      violation.nodes.forEach((node) => {
        if (node.any) {
          node.any.forEach((check) => {
            recommendations.push(`  - ${check.message}`);
          });
        }
      });
    });

    return recommendations;
  }

  /** 生成手动检查建议 */
  private static generateManualCheckRecommendations(checks: {
    details: Array<{
      rule: string;
      description: string;
      severity: 'error' | 'warning';
      element?: string;
    }>;
  }): string[] {
    return checks.details
      .filter(detail => detail.severity === 'error')
      .map(detail => `修复 ${detail.rule}: ${detail.description}`);
  }

  /** 测试特定元素的无障碍属性 */
  static testElementAccessibility(
    element: HTMLElement,
    expectedRole?: string,
    expectedLabel?: string
  ): { passed: boolean; issues: string[] } {
    const issues: string[] = [];
    let passed = true;

    // 检查角色
    if (expectedRole) {
      const actualRole = element.getAttribute('role') || element.getAttribute('aria-role');
      if (actualRole !== expectedRole) {
        issues.push(`期望角色: ${expectedRole}, 实际角色: ${actualRole}`);
        passed = false;
      }
    }

    // 检查标签
    if (expectedLabel) {
      const actualLabel = element.getAttribute('aria-label') ||
                         element.getAttribute('alt') ||
                         element.getAttribute('title');
      if (actualLabel !== expectedLabel) {
        issues.push(`期望标签: ${expectedLabel}, 实际标签: ${actualLabel}`);
        passed = false;
      }
    }

    // 检查基本无障碍属性
    const requiredProps = this.getRequiredAccessibilityProps(element);
    requiredProps.forEach(prop => {
      if (!element.hasAttribute(prop)) {
        issues.push(`缺少必需属性: ${prop}`);
        passed = false;
      }
    });

    return { passed, issues };
  }

  /** 获取必需的无障碍属性 */
  private static getRequiredAccessibilityProps(element: HTMLElement): string[] {
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');

    switch (tagName) {
      case 'img':
        return ['alt'];
      case 'input':
        return ['type', 'name'];
      case 'button':
        return [];
      default:
        if (role === 'button') return [];
        if (role === 'link') return ['href'];
        return [];
    }
  }

  /** 验证表单无障碍性 */
  static validateFormAccessibility(form: HTMLFormElement): {
    passed: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    let passed = true;

    // 检查所有表单字段
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach((field) => {
      const id = field.getAttribute('id');
      const label = form.querySelector(`label[for="${id}"]`);

      if (!label && !field.getAttribute('aria-label')) {
        issues.push(`表单字段 ${id || '未命名'} 缺少标签`);
        passed = false;
      }

      // 检查必填字段
      if (field.hasAttribute('required') && !field.getAttribute('aria-required')) {
        issues.push(`必填字段 ${id} 缺少 aria-required 属性`);
        passed = false;
      }
    });

    return { passed, issues };
  }

  /** 验证表格无障碍性 */
  static validateTableAccessibility(table: HTMLTableElement): {
    passed: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    let passed = true;

    // 检查是否有标题
    const caption = table.querySelector('caption');
    if (!caption) {
      issues.push('表格缺少标题 (caption)');
      passed = false;
    }

    // 检查表头
    const headers = table.querySelectorAll('th');
    if (headers.length === 0) {
      issues.push('表格缺少表头 (th)');
      passed = false;
    }

    // 检查表头是否有 scope 属性
    headers.forEach((header) => {
      if (!header.hasAttribute('scope')) {
        issues.push('表头缺少 scope 属性');
        passed = false;
      }
    });

    return { passed, issues };
  }

  /** 模拟键盘导航测试 */
  static async simulateKeyboardNavigation(
    container: HTMLElement
  ): Promise<{ passed: boolean; sequence: string[] }> {
    const sequence: string[] = [];
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    let passed = true;

    // 模拟 Tab 键导航
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i];
      element.focus();
      sequence.push(`聚焦: ${element.tagName} ${element.getAttribute('aria-label') || ''}`);

      // 检查是否真的获得了焦点
      if (document.activeElement !== element) {
        passed = false;
        sequence.push(`错误: ${element.tagName} 未获得焦点`);
      }

      // 如果是按钮，模拟 Enter 键
      if (element.tagName === 'BUTTON') {
        element.click();
        sequence.push(`点击: ${element.tagName}`);
      }
    }

    return { passed, sequence };
  }

  /** 生成无障碍测试报告 */
  static generateTestReport(results: AccessibilityTestResult): string {
    const report: string[] = [];

    report.push('=== 无障碍测试报告 ===');
    report.push(`测试时间: ${new Date().toISOString()}`);
    report.push(`整体评分: ${results.score}/100`);
    report.push(`测试结果: ${results.passed ? '通过' : '失败'}`);
    report.push('');

    if (results.axeResults) {
      report.push('axe-core 测试结果:');
      report.push(`  违规: ${results.axeResults.violations.length}`);
      report.push(`  通过: ${results.axeResults.passes.length}`);
      report.push(`  不完整: ${results.axeResults.incomplete.length}`);
      report.push('');

      if (results.axeResults.violations.length > 0) {
        report.push('违规详情:');
        results.axeResults.violations.forEach((violation) => {
          report.push(`  - ${violation.id}: ${violation.description}`);
          report.push(`    影响: ${violation.impact}`);
          report.push(`    元素: ${violation.nodes.length}`);
        });
        report.push('');
      }
    }

    if (results.manualChecks) {
      report.push('手动检查结果:');
      report.push(`  通过: ${results.manualChecks.passed}`);
      report.push(`  失败: ${results.manualChecks.failed}`);
      report.push(`  警告: ${results.manualChecks.warnings}`);
      report.push('');

      if (results.manualChecks.details.length > 0) {
        report.push('检查详情:');
        results.manualChecks.details.forEach((detail) => {
          report.push(`  [${detail.severity.toUpperCase()}] ${detail.rule}: ${detail.description}`);
        });
        report.push('');
      }
    }

    if (results.recommendations.length > 0) {
      report.push('修复建议:');
      results.recommendations.forEach((recommendation, index) => {
        report.push(`  ${index + 1}. ${recommendation}`);
      });
    }

    return report.join('\n');
  }
}

// ==================== 便捷测试函数 ====================

/** 便捷的 axe-core 测试函数 */
export async function testA11yWithAxe(
  container: HTMLElement,
  config?: any
): Promise<AxeResults> {
  return await axe(container, config);
}

/** 验证元素无障碍性 */
export function testElementA11y(
  getBy: (query: string) => HTMLElement,
  expectedRole?: string,
  expectedLabel?: string
): { passed: boolean; issues: string[] } {
  const element = getBy('*');
  return AccessibilityTestUtils.testElementAccessibility(
    element,
    expectedRole,
    expectedLabel
  );
}

/** 验证表单无障碍性 */
export function testFormA11y(
  getBy: (query: string) => HTMLFormElement
): { passed: boolean; issues: string[] } {
  const form = getBy('form');
  return AccessibilityTestUtils.validateFormAccessibility(form);
}

/** 验证表格无障碍性 */
export function testTableA11y(
  getBy: (query: string) => HTMLTableElement
): { passed: boolean; issues: string[] } {
  const table = getBy('table');
  return AccessibilityTestUtils.validateTableAccessibility(table);
}

// ==================== 自定义 Jest 匹配器 ====================

/** 扩展 Jest 匹配器 */
expect.extend({
  toHaveNoViolations,
  toBeAccessible(received: HTMLElement) {
    const result = AccessibilityTestUtils.testElementAccessibility(received);
    const pass = result.passed;

    return {
      message: () =>
        `期望元素 ${pass ? '通过' : '未通过'} 无障碍测试。` +
        (result.issues.length > 0 ? `\n问题: ${result.issues.join(', ')}` : ''),
      pass,
    };
  },
});

// ==================== 导出 ====================

export {
  AccessibilityTestUtils,
  testA11yWithAxe,
  testElementA11y,
  testFormA11y,
  testTableA11y,
};

export type {
  AccessibilityTestConfig,
  AccessibilityTestResult,
};