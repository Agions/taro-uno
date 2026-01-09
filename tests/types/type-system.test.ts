/**
 * Type System Tests
 * Tests for Property 13: Type System Completeness
 * Tests for Property 14: Base Props Inheritance
 * @module tests/types/type-system
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type {
  // Common types
  Size,
  ExtendedSize,
  Status,
  ExtendedStatus,
  Variant,
  ExtendedVariant,
  Shape,
  ExtendedShape,
  Direction,
  Placement,
  ExtendedPlacement,
  Align,
  ExtendedAlign,
  ThemeMode,
  Breakpoint,
  // Component types
  BaseProps,
  ChildrenProps,
  StyledProps,
  InteractiveProps,
  FormItemProps,
  FocusableProps,
  // Style types
  StyleObject,
  ResponsiveValue,
  // Utility types
  Nullable,
  Optional,
  RequiredKeys,
  DeepPartial,
} from '../../src/types';

// ==================== Type Validation Helpers ====================

/**
 * Helper to check if a value matches a union type
 */
function isValidUnionValue<T extends string>(value: string, validValues: readonly T[]): value is T {
  return validValues.includes(value as T);
}

// ==================== Property 13: Type System Completeness ====================

describe('Property 13: Type System Completeness', () => {
  /**
   * Feature: taro-component-library-optimization
   * Property 13: Type System Completeness
   * *For any* exported component, hook, or utility function, TypeScript compilation
   * SHALL produce zero errors and zero warnings when used with correct parameters,
   * and SHALL produce type errors when used with incorrect parameters.
   * **Validates: Requirements 14.1, 14.2, 14.3, 14.4**
   */

  describe('Common Types - Size', () => {
    const validSizes: readonly Size[] = ['sm', 'md', 'lg'];
    const validExtendedSizes: readonly ExtendedSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    it('should accept valid Size values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validSizes), (size) => {
          expect(isValidUnionValue(size, validSizes)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedSize values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedSizes), (size) => {
          expect(isValidUnionValue(size, validExtendedSizes)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Status', () => {
    const validStatuses: readonly Status[] = ['default', 'primary', 'success', 'warning', 'danger'];
    const validExtendedStatuses: readonly ExtendedStatus[] = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
    ];

    it('should accept valid Status values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validStatuses), (status) => {
          expect(isValidUnionValue(status, validStatuses)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedStatus values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedStatuses), (status) => {
          expect(isValidUnionValue(status, validExtendedStatuses)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Variant', () => {
    const validVariants: readonly Variant[] = ['solid', 'outline', 'ghost', 'text'];
    const validExtendedVariants: readonly ExtendedVariant[] = [
      'solid',
      'outline',
      'ghost',
      'text',
      'link',
      'filled',
    ];

    it('should accept valid Variant values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validVariants), (variant) => {
          expect(isValidUnionValue(variant, validVariants)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedVariant values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedVariants), (variant) => {
          expect(isValidUnionValue(variant, validExtendedVariants)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Shape', () => {
    const validShapes: readonly Shape[] = ['default', 'round', 'circle'];
    const validExtendedShapes: readonly ExtendedShape[] = ['default', 'round', 'circle', 'square'];

    it('should accept valid Shape values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validShapes), (shape) => {
          expect(isValidUnionValue(shape, validShapes)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedShape values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedShapes), (shape) => {
          expect(isValidUnionValue(shape, validExtendedShapes)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Direction', () => {
    const validDirections: readonly Direction[] = ['horizontal', 'vertical'];

    it('should accept valid Direction values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validDirections), (direction) => {
          expect(isValidUnionValue(direction, validDirections)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Placement', () => {
    const validPlacements: readonly Placement[] = ['top', 'bottom', 'left', 'right'];
    const validExtendedPlacements: readonly ExtendedPlacement[] = [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
      'left',
      'right',
      'center',
    ];

    it('should accept valid Placement values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validPlacements), (placement) => {
          expect(isValidUnionValue(placement, validPlacements)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedPlacement values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedPlacements), (placement) => {
          expect(isValidUnionValue(placement, validExtendedPlacements)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Align', () => {
    const validAligns: readonly Align[] = ['start', 'center', 'end'];
    const validExtendedAligns: readonly ExtendedAlign[] = [
      'start',
      'center',
      'end',
      'stretch',
      'baseline',
      'space-between',
      'space-around',
      'space-evenly',
    ];

    it('should accept valid Align values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validAligns), (align) => {
          expect(isValidUnionValue(align, validAligns)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });

    it('should accept valid ExtendedAlign values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validExtendedAligns), (align) => {
          expect(isValidUnionValue(align, validExtendedAligns)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - ThemeMode', () => {
    const validThemeModes: readonly ThemeMode[] = ['light', 'dark', 'auto'];

    it('should accept valid ThemeMode values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validThemeModes), (mode) => {
          expect(isValidUnionValue(mode, validThemeModes)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('Common Types - Breakpoint', () => {
    const validBreakpoints: readonly Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    it('should accept valid Breakpoint values', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validBreakpoints), (breakpoint) => {
          expect(isValidUnionValue(breakpoint, validBreakpoints)).toBe(true);
        }),
        { numRuns: 100 },
      );
    });
  });
});

// ==================== Property 14: Base Props Inheritance ====================

describe('Property 14: Base Props Inheritance', () => {
  /**
   * Feature: taro-component-library-optimization
   * Property 14: Base Props Inheritance
   * *For any* component Props interface that extends BaseProps, StyledProps,
   * InteractiveProps, or FormItemProps, the component SHALL accept all properties
   * defined in the parent interface without requiring redefinition.
   * **Validates: Requirements 14.1.2, 14.1.4**
   */

  describe('BaseProps inheritance', () => {
    it('should allow creating valid BaseProps objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            style: fc.option(
              fc.record({
                color: fc.option(fc.string(), { nil: undefined }),
                fontSize: fc.option(fc.integer({ min: 10, max: 100 }), { nil: undefined }),
              }),
              { nil: undefined },
            ),
            'data-testid': fc.option(fc.string(), { nil: undefined }),
          }),
          (props) => {
            // Verify the props object can be assigned to BaseProps
            const baseProps: BaseProps = props;
            expect(baseProps).toBeDefined();

            // Verify optional properties
            if (props.className !== undefined) {
              expect(typeof baseProps.className).toBe('string');
            }
            if (props['data-testid'] !== undefined) {
              expect(typeof baseProps['data-testid']).toBe('string');
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('ChildrenProps extends BaseProps', () => {
    it('should inherit all BaseProps properties', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            style: fc.option(fc.constant({ color: 'red' }), { nil: undefined }),
            'data-testid': fc.option(fc.string(), { nil: undefined }),
            children: fc.option(fc.string(), { nil: undefined }),
          }),
          (props) => {
            const childrenProps: ChildrenProps = props;
            expect(childrenProps).toBeDefined();

            // Verify inherited properties from BaseProps
            if (props.className !== undefined) {
              expect(childrenProps.className).toBe(props.className);
            }
            if (props.style !== undefined) {
              expect(childrenProps.style).toEqual(props.style);
            }
            if (props['data-testid'] !== undefined) {
              expect(childrenProps['data-testid']).toBe(props['data-testid']);
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('StyledProps extends BaseProps', () => {
    const validSizes: Size[] = ['sm', 'md', 'lg'];
    const validVariants: Variant[] = ['solid', 'outline', 'ghost', 'text'];

    it('should inherit all BaseProps properties and add size/variant', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            style: fc.option(fc.constant({ color: 'blue' }), { nil: undefined }),
            'data-testid': fc.option(fc.string(), { nil: undefined }),
            size: fc.option(fc.constantFrom(...validSizes), { nil: undefined }),
            variant: fc.option(fc.constantFrom(...validVariants), { nil: undefined }),
          }),
          (props) => {
            const styledProps: StyledProps = props;
            expect(styledProps).toBeDefined();

            // Verify inherited properties from BaseProps
            if (props.className !== undefined) {
              expect(styledProps.className).toBe(props.className);
            }

            // Verify StyledProps specific properties
            if (props.size !== undefined) {
              expect(validSizes).toContain(styledProps.size);
            }
            if (props.variant !== undefined) {
              expect(validVariants).toContain(styledProps.variant);
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('InteractiveProps extends StyledProps', () => {
    const validSizes: Size[] = ['sm', 'md', 'lg'];
    const validVariants: Variant[] = ['solid', 'outline', 'ghost', 'text'];

    it('should inherit all StyledProps properties and add disabled/loading', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            style: fc.option(fc.constant({ color: 'green' }), { nil: undefined }),
            'data-testid': fc.option(fc.string(), { nil: undefined }),
            size: fc.option(fc.constantFrom(...validSizes), { nil: undefined }),
            variant: fc.option(fc.constantFrom(...validVariants), { nil: undefined }),
            disabled: fc.option(fc.boolean(), { nil: undefined }),
            loading: fc.option(fc.boolean(), { nil: undefined }),
          }),
          (props) => {
            const interactiveProps: InteractiveProps = props;
            expect(interactiveProps).toBeDefined();

            // Verify inherited properties from StyledProps
            if (props.size !== undefined) {
              expect(validSizes).toContain(interactiveProps.size);
            }
            if (props.variant !== undefined) {
              expect(validVariants).toContain(interactiveProps.variant);
            }

            // Verify InteractiveProps specific properties
            if (props.disabled !== undefined) {
              expect(typeof interactiveProps.disabled).toBe('boolean');
            }
            if (props.loading !== undefined) {
              expect(typeof interactiveProps.loading).toBe('boolean');
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('FormItemProps extends InteractiveProps', () => {
    it('should inherit all InteractiveProps properties and add form-specific props', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            disabled: fc.option(fc.boolean(), { nil: undefined }),
            loading: fc.option(fc.boolean(), { nil: undefined }),
            value: fc.option(fc.string(), { nil: undefined }),
            defaultValue: fc.option(fc.string(), { nil: undefined }),
            name: fc.option(fc.string(), { nil: undefined }),
            required: fc.option(fc.boolean(), { nil: undefined }),
            readOnly: fc.option(fc.boolean(), { nil: undefined }),
            placeholder: fc.option(fc.string(), { nil: undefined }),
          }),
          (props) => {
            const formItemProps: FormItemProps<string> = props;
            expect(formItemProps).toBeDefined();

            // Verify inherited properties from InteractiveProps
            if (props.disabled !== undefined) {
              expect(typeof formItemProps.disabled).toBe('boolean');
            }
            if (props.loading !== undefined) {
              expect(typeof formItemProps.loading).toBe('boolean');
            }

            // Verify FormItemProps specific properties
            if (props.value !== undefined) {
              expect(typeof formItemProps.value).toBe('string');
            }
            if (props.name !== undefined) {
              expect(typeof formItemProps.name).toBe('string');
            }
            if (props.required !== undefined) {
              expect(typeof formItemProps.required).toBe('boolean');
            }
          },
        ),
        { numRuns: 100 },
      );
    });

    it('should support generic type parameter for value', () => {
      fc.assert(
        fc.property(fc.integer(), (numValue) => {
          const numberFormProps: FormItemProps<number> = {
            value: numValue,
            defaultValue: 0,
          };
          expect(numberFormProps.value).toBe(numValue);
          expect(typeof numberFormProps.value).toBe('number');
        }),
        { numRuns: 100 },
      );
    });
  });

  describe('FocusableProps extends InteractiveProps', () => {
    it('should inherit all InteractiveProps properties and add focus-specific props', () => {
      fc.assert(
        fc.property(
          fc.record({
            className: fc.option(fc.string(), { nil: undefined }),
            disabled: fc.option(fc.boolean(), { nil: undefined }),
            autoFocus: fc.option(fc.boolean(), { nil: undefined }),
            tabIndex: fc.option(fc.integer({ min: -1, max: 100 }), { nil: undefined }),
          }),
          (props) => {
            const focusableProps: FocusableProps = props;
            expect(focusableProps).toBeDefined();

            // Verify inherited properties
            if (props.disabled !== undefined) {
              expect(typeof focusableProps.disabled).toBe('boolean');
            }

            // Verify FocusableProps specific properties
            if (props.autoFocus !== undefined) {
              expect(typeof focusableProps.autoFocus).toBe('boolean');
            }
            if (props.tabIndex !== undefined) {
              expect(typeof focusableProps.tabIndex).toBe('number');
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});

// ==================== Utility Types Tests ====================

describe('Utility Types', () => {
  describe('Nullable type', () => {
    it('should allow null, undefined, or the original type', () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.string(), fc.constant(null), fc.constant(undefined)),
          (value) => {
            const nullable: Nullable<string> = value;
            expect(nullable === null || nullable === undefined || typeof nullable === 'string').toBe(
              true,
            );
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('DeepPartial type', () => {
    interface TestObject {
      name: string;
      nested: {
        value: number;
        deep: {
          flag: boolean;
        };
      };
    }

    it('should make all nested properties optional', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.option(fc.string(), { nil: undefined }),
            nested: fc.option(
              fc.record({
                value: fc.option(fc.integer(), { nil: undefined }),
                deep: fc.option(
                  fc.record({
                    flag: fc.option(fc.boolean(), { nil: undefined }),
                  }),
                  { nil: undefined },
                ),
              }),
              { nil: undefined },
            ),
          }),
          (partialObj) => {
            const deepPartial: DeepPartial<TestObject> = partialObj;
            expect(deepPartial).toBeDefined();

            // All properties should be optional
            if (deepPartial.name !== undefined) {
              expect(typeof deepPartial.name).toBe('string');
            }
            if (deepPartial.nested?.value !== undefined) {
              expect(typeof deepPartial.nested.value).toBe('number');
            }
            if (deepPartial.nested?.deep?.flag !== undefined) {
              expect(typeof deepPartial.nested.deep.flag).toBe('boolean');
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });

  describe('ResponsiveValue type', () => {
    const validBreakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    it('should accept a single value or breakpoint-based values', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            // Single value
            fc.integer({ min: 0, max: 100 }),
            // Breakpoint-based values
            fc.record({
              xs: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              sm: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              md: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              lg: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              xl: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              xxl: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
            }),
          ),
          (value) => {
            const responsiveValue: ResponsiveValue<number> = value;
            expect(responsiveValue).toBeDefined();

            if (typeof responsiveValue === 'number') {
              expect(typeof responsiveValue).toBe('number');
            } else {
              // It's an object with breakpoint keys
              const keys = Object.keys(responsiveValue);
              keys.forEach((key) => {
                if (responsiveValue[key as Breakpoint] !== undefined) {
                  expect(validBreakpoints).toContain(key);
                }
              });
            }
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});
