/**
 * Enhanced Component Test Template
 * Provides comprehensive testing patterns for Taro-Uno UI components
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// Import accessibility utilities
import { accessibilityUtils } from '../setup/accessibility';
import { performanceMonitor, performanceUtils } from '../setup/performance';

// Type definitions for test configuration
interface TestConfig {
  component: React.ComponentType<any>;
  componentName: string;
  defaultProps: Record<string, any>;
  variants?: Array<{ name: string; props: Record<string, any> }>;
  interactions?: Array<{ name: string; action: (element: HTMLElement) => Promise<void> | void }>;
  edgeCases?: Array<{ name: string; props: Record<string, any> }>;
  accessibilityTests?: boolean;
  performanceTests?: boolean;
}

// Enhanced test suite generator
export function createComponentTestSuite(config: TestConfig) {
  const {
    component: Component,
    componentName,
    defaultProps,
    variants = [],
    interactions = [],
    edgeCases = [],
    accessibilityTests = true,
    performanceTests = true,
  } = config;

  describe(`${componentName} Component`, () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
      vi.clearAllMocks();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    describe('Rendering', () => {
      it('should render with default props', () => {
        const { container } = render(<Component {...defaultProps} />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('should render with custom className', () => {
        const { container } = render(<Component {...defaultProps} className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
      });

      it('should render with custom style', () => {
        const customStyle = { backgroundColor: 'red' };
        const { container } = render(<Component {...defaultProps} style={customStyle} />);
        expect(container.firstChild).toHaveStyle('background-color: red');
      });

      it('should handle ref correctly', () => {
        const ref = React.createRef<any>();
        render(<Component {...defaultProps} ref={ref} />);
        expect(ref.current).toBeTruthy();
      });
    });

    describe('Variants', () => {
      if (variants.length > 0) {
        variants.forEach(({ name, props }) => {
          it(`should render ${name} variant`, () => {
            const { container } = render(<Component {...defaultProps} {...props} />);
            expect(container.firstChild).toBeInTheDocument();
          });
        });
      }
    });

    describe('Interactions', () => {
      if (interactions.length > 0) {
        interactions.forEach(({ name, action }) => {
          it(`should handle ${name} interaction`, async () => {
            const { container } = render(<Component {...defaultProps} />);
            await action(container.firstChild as HTMLElement);
          });
        });
      }

      it('should handle click events', async () => {
        const onClick = vi.fn();
        const { container } = render(<Component {...defaultProps} onClick={onClick} />);
        await user.click(container.firstChild as HTMLElement);
        expect(onClick).toHaveBeenCalled();
      });

      it('should handle focus events', async () => {
        const onFocus = vi.fn();
        const { container } = render(<Component {...defaultProps} onFocus={onFocus} />);
        await user.tab();
        expect(onFocus).toHaveBeenCalled();
      });

      it('should handle keyboard events', async () => {
        const onKeyDown = vi.fn();
        const { container } = render(<Component {...defaultProps} onKeyDown={onKeyDown} />);
        const element = container.firstChild as HTMLElement;

        await user.type(element, '{Enter}');
        expect(onKeyDown).toHaveBeenCalled();
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty children', () => {
        const { container } = render(<Component {...defaultProps} children={null} />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('should handle disabled state', () => {
        const { container } = render(<Component {...defaultProps} disabled />);
        const element = container.firstChild as HTMLElement;
        expect(element).toBeDisabled();
      });

      it('should handle loading state', () => {
        const { container } = render(<Component {...defaultProps} loading />);
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass('loading');
      });

      if (edgeCases.length > 0) {
        edgeCases.forEach(({ name, props }) => {
          it(`should handle ${name} edge case`, () => {
            const { container } = render(<Component {...defaultProps} {...props} />);
            expect(container.firstChild).toBeInTheDocument();
          });
        });
      }
    });

    describe('Accessibility', () => {
      if (accessibilityTests) {
        it('should have no accessibility violations', async () => {
          const { container } = render(<Component {...defaultProps} />);
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('should meet WCAG AA standards', async () => {
          const { container } = render(<Component {...defaultProps} />);
          const results = await accessibilityUtils.checkWCAGCompliance(container, 'AA');
          expect(results.violations.length).toBe(0);
        });

        it('should be keyboard navigable', async () => {
          const { container } = render(<Component {...defaultProps} />);
          const element = container.firstChild as HTMLElement;

          // Test tab navigation
          await user.tab();
          expect(element).toHaveFocus();

          // Test keyboard interaction
          await user.keyboard('{Enter}');
          await user.keyboard('{Escape}');
        });

        it('should have proper ARIA attributes', () => {
          const { container } = render(<Component {...defaultProps} />);
          const ariaResults = accessibilityUtils.checkAriaAttributes(container);
          expect(ariaResults.issues.length).toBe(0);
        });
      }
    });

    describe('Performance', () => {
      if (performanceTests) {
        it('should render within performance threshold', async () => {
          const renderTime = await performanceUtils.benchmark(
            `${componentName}-render`,
            async () => {
              const { container } = render(<Component {...defaultProps} />);
              container.firstChild;
            },
            10
          );

          expect(renderTime.average).toBeLessThan(16); // 60fps threshold
        });

        it('should handle rapid interactions without performance issues', async () => {
          const onClick = vi.fn();
          const { container } = render(<Component {...defaultProps} onClick={onClick} />);
          const element = container.firstChild as HTMLElement;

          const interactionTime = await performanceMonitor.measureInteractionTime(
            element,
            async () => {
              // Simulate rapid clicks
              for (let i = 0; i < 10; i++) {
                await user.click(element);
              }
            }
          );

          expect(interactionTime).toBeLessThan(1000); // 1 second for 10 interactions
          expect(onClick).toHaveBeenCalledTimes(10);
        });

        it('should not have memory leaks', async () => {
          const memoryTest = await performanceUtils.testMemoryLeak(
            `${componentName}-memory`,
            async () => {
              const { container } = render(<Component {...defaultProps} />);
              container.firstChild;
            },
            async () => {
              // Cleanup
            }
          );

          expect(memoryTest.hasLeak).toBe(false);
        });
      }
    });

    describe('Platform Compatibility', () => {
      it('should work in H5 environment', () => {
        const { container } = render(<Component {...defaultProps} />);
        expect(container.firstChild).toBeInTheDocument();
      });

      it('should handle responsive design', () => {
        const { container } = render(<Component {...defaultProps} />);
        const element = container.firstChild as HTMLElement;

        // Test different viewport sizes
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 320,
        });
        expect(element).toBeInTheDocument();

        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1920,
        });
        expect(element).toBeInTheDocument();
      });
    });

    describe('Error Handling', () => {
      it('should handle invalid props gracefully', () => {
        const invalidProps = {
          ...defaultProps,
          // @ts-ignore - Intentionally invalid prop
          invalidProp: 'invalid-value',
        };

        expect(() => {
          render(<Component {...invalidProps} />);
        }).not.toThrow();
      });

      it('should handle missing required props', () => {
        const minimalProps = { ...defaultProps };
        delete minimalProps.children;

        expect(() => {
          render(<Component {...minimalProps} />);
        }).not.toThrow();
      });
    });
  });
}

// Integration test utilities
export const integrationTestUtils = {
  // Test component integration
  testComponentIntegration: (
    ParentComponent: React.ComponentType<any>,
    ChildComponent: React.ComponentType<any>,
    parentProps: Record<string, any>,
    childProps: Record<string, any>
  ) => {
    it('should integrate parent and child components correctly', () => {
      const { container } = render(
        <ParentComponent {...parentProps}>
          <ChildComponent {...childProps} />
        </ParentComponent>
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText(childProps.children || childProps.title)).toBeInTheDocument();
    });
  },

  // Test form integration
  testFormIntegration: (
    FormComponent: React.ComponentType<any>,
    InputComponent: React.ComponentType<any>,
    onSubmit: vi.Mock
  ) => {
    it('should handle form submission with input component', async () => {
      const user = userEvent.setup();

      render(
        <FormComponent onSubmit={onSubmit}>
          <InputComponent name="test" placeholder="Test input" />
        </FormComponent>
      );

      const input = screen.getByPlaceholderText('Test input');
      await user.type(input, 'test value');
      await user.click(screen.getByRole('button', { name: /submit/i }));

      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          test: 'test value',
        })
      );
    });
  },

  // Test theme integration
  testThemeIntegration: (
    Component: React.ComponentType<any>,
    ThemeProvider: React.ComponentType<any>,
    themes: Array<{ name: string; theme: object }>
  ) => {
    themes.forEach(({ name, theme }) => {
      it(`should apply ${name} theme correctly`, () => {
        const { container } = render(
          <ThemeProvider theme={theme}>
            <Component {...defaultProps} />
          </ThemeProvider>
        );

        expect(container.firstChild).toBeInTheDocument();
      });
    });
  },
};

// Export test utilities
export { createComponentTestSuite, integrationTestUtils };
export default createComponentTestSuite;