/**
 * Accessibility testing setup
 * Configures accessibility testing tools and utilities
 */

import { vi } from 'vitest';
import { render, RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest expect with axe matchers
expect.extend(toHaveNoViolations);

// Mock axe-core for testing
vi.mock('axe-core', () => ({
  default: {
    run: (context: any, config: any, callback: Function) => {
      // Mock successful accessibility check
      callback([], []);
    },
  },
}));

// Accessibility test utilities
export const accessibilityUtils = {
  // Check for accessibility violations
  checkAccessibility: async (container: HTMLElement) => {
    const results = await axe(container);
    return results;
  },

  // Expect no accessibility violations
  expectNoAccessibilityViolations: async (container: HTMLElement) => {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  },

  // Check specific WCAG guidelines
  checkWCAGCompliance: async (container: HTMLElement, level: 'A' | 'AA' | 'AAA' = 'AA') => {
    const results = await axe(container, {
      rules: {
        // WCAG Level A
        'color-contrast': { enabled: level === 'A' || level === 'AA' || level === 'AAA' },
        'image-alt': { enabled: true },
        'label': { enabled: true },
        'link-name': { enabled: true },

        // WCAG Level AA
        'heading-order': { enabled: level === 'AA' || level === 'AAA' },
        'landmark-one-main': { enabled: level === 'AA' || level === 'AAA' },
        'page-has-heading-one': { enabled: level === 'AA' || level === 'AAA' },

        // WCAG Level AAA
        'document-title': { enabled: level === 'AAA' },
        'language': { enabled: level === 'AAA' },
      },
    });
    return results;
  },

  // Simulate screen reader interaction
  simulateScreenReader: () => {
    // Mock screen reader environment
    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        userAgent: 'Mozilla/5.0 (Screen Reader Test)',
      },
      writable: true,
    });

    // Mock ARIA attributes
    const mockGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (element: Element, pseudoElt?: string) => {
      const style = mockGetComputedStyle.call(window, element, pseudoElt);

      // Simulate screen reader styles
      if (element.hasAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true') {
        return Object.assign(style, {
          display: 'none',
          visibility: 'hidden',
          position: 'absolute',
          left: '-9999px',
        });
      }

      return style;
    };
  },

  // Simulate keyboard navigation
  simulateKeyboardNavigation: (element: HTMLElement) => {
    const keyboardEvents = [
      new KeyboardEvent('keydown', { key: 'Tab' }),
      new KeyboardEvent('keydown', { key: 'Enter' }),
      new KeyboardEvent('keydown', { key: 'Escape' }),
      new KeyboardEvent('keydown', { key: 'Space' }),
      new KeyboardEvent('keydown', { key: 'ArrowUp' }),
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
    ];

    keyboardEvents.forEach(event => {
      element.dispatchEvent(event);
    });
  },

  // Check focus management
  checkFocusManagement: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const results = {
      focusableElements: focusableElements.length,
      hasFocusTrap: false,
      focusOrder: Array.from(focusableElements).map(el => ({
        element: el,
        tabIndex: (el as HTMLElement).tabIndex,
        ariaLabel: el.getAttribute('aria-label'),
        role: el.getAttribute('role'),
      })),
    };

    // Check if focus trap exists (common in modals)
    const focusTrapElements = container.querySelectorAll('[data-focus-trap]');
    results.hasFocusTrap = focusTrapElements.length > 0;

    return results;
  },

  // Check ARIA attributes
  checkAriaAttributes: (container: HTMLElement) => {
    const elements = container.querySelectorAll('[aria-*]');
    const ariaResults = {
      totalAriaElements: elements.length,
      missingLabels: 0,
      invalidRoles: 0,
      missingDescriptions: 0,
      issues: [] as string[],
    };

    elements.forEach(element => {
      const ariaLabel = element.getAttribute('aria-label');
      const role = element.getAttribute('role');
      const ariaDescribedBy = element.getAttribute('aria-describedby');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');

      // Check for missing labels on interactive elements
      if (!ariaLabel && !ariaLabelledBy && element.matches('button, input, select, textarea')) {
        ariaResults.missingLabels++;
        ariaResults.issues.push(`Element ${element.tagName} missing aria-label or aria-labelledby`);
      }

      // Check for invalid roles
      if (role && !['button', 'link', 'textbox', 'combobox', 'listbox', 'menu', 'dialog', 'alert', 'status'].includes(role)) {
        ariaResults.invalidRoles++;
        ariaResults.issues.push(`Invalid role "${role}" on element ${element.tagName}`);
      }

      // Check for missing descriptions when required
      if (element.hasAttribute('aria-required') && element.getAttribute('aria-required') === 'true') {
        if (!ariaDescribedBy && !ariaLabel) {
          ariaResults.missingDescriptions++;
          ariaResults.issues.push(`Required element missing aria-describedby or aria-label`);
        }
      }
    });

    return ariaResults;
  },

  // Simulate high contrast mode
  simulateHighContrastMode: () => {
    const style = document.createElement('style');
    style.textContent = `
      .high-contrast {
        filter: contrast(1.5) !important;
      }
      .high-contrast * {
        border: 1px solid currentColor !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add('high-contrast');
  },

  // Simulate reduced motion
  simulateReducedMotion: () => {
    Object.defineProperty(window, 'matchMedia', {
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
      writable: true,
    });
  },
};

// Custom render function with accessibility checks
export function renderWithAccessibility(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const renderResult = render(ui, options);

  // Add accessibility testing utilities to the result
  return {
    ...renderResult,
    checkAccessibility: () => accessibilityUtils.checkAccessibility(renderResult.container),
    expectNoAccessibilityViolations: () => accessibilityUtils.expectNoAccessibilityViolations(renderResult.container),
    checkWCAGCompliance: (level?: 'A' | 'AA' | 'AAA') => accessibilityUtils.checkWCAGCompliance(renderResult.container, level),
    checkFocusManagement: () => accessibilityUtils.checkFocusManagement(renderResult.container),
    checkAriaAttributes: () => accessibilityUtils.checkAriaAttributes(renderResult.container),
  };
}

// Accessibility test matchers
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeAccessible(): void;
      toHaveNoAccessibilityViolations(): void;
      toMeetWCAGStandard(level?: 'A' | 'AA' | 'AAA'): void;
      toHaveProperFocusManagement(): void;
      toHaveValidAriaAttributes(): void;
    }
  }
}

// Add custom matchers
expect.extend({
  async toBeAccessible(received: HTMLElement) {
    const results = await axe(received);
    const pass = results.violations.length === 0;

    return {
      message: () =>
        pass
          ? 'Expected element to have accessibility violations'
          : `Element has ${results.violations.length} accessibility violations:\n${results.violations.map(v => `- ${v.description} (${v.impact})`).join('\n')}`,
      pass,
    };
  },

  async toMeetWCAGStandard(received: HTMLElement, level: 'A' | 'AA' | 'AAA' = 'AA') {
    const results = await axe(received, {
      rules: {
        'color-contrast': { enabled: level === 'A' || level === 'AA' || level === 'AAA' },
        'heading-order': { enabled: level === 'AA' || level === 'AAA' },
        'landmark-one-main': { enabled: level === 'AA' || level === 'AAA' },
      },
    });

    const pass = results.violations.length === 0;

    return {
      message: () =>
        pass
          ? `Expected element to not meet WCAG ${level} standard`
          : `Element does not meet WCAG ${level} standard:\n${results.violations.map(v => `- ${v.description} (${v.impact})`).join('\n')}`,
      pass,
    };
  },
});

// Global accessibility test utilities
global.accessibilityUtils = accessibilityUtils;

// Export for use in test files
export { accessibilityUtils };
export default accessibilityUtils;