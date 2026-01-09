/**
 * 样式系统属性测试
 *
 * Property 4: Style Composition Priority
 * Property 5: Style Merge Idempotence
 *
 * Validates: Requirements 2.1.3, 2.1.4
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  mergeStyles,
  extendStyles,
  deepMergeStyles,
  createComponentStyles,
  conditionalStyle,
  createResponsiveStyle,
  type StyleDefinition,
  type ComponentStyleProps,
} from '../../src/theme/styles/createStyles';
import { defaultDesignTokens } from '../../src/theme/tokens';
import type { StyleObject } from '../../src/types/style';

// ============================================================================
// Arbitrary Generators for Style Objects
// ============================================================================

/**
 * Generate valid CSS color values
 */
const hexCharArb = fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
const cssColorArb = fc.oneof(
  fc.tuple(hexCharArb, hexCharArb, hexCharArb, hexCharArb, hexCharArb, hexCharArb)
    .map(([a, b, c, d, e, f]) => `#${a}${b}${c}${d}${e}${f}`),
  fc.tuple(
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
  ).map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`),
  fc.constant('transparent'),
  fc.constant('inherit'),
);

/**
 * Generate valid CSS size values
 */
const cssSizeArb = fc.oneof(
  fc.integer({ min: 0, max: 1000 }).map((n) => `${n}px`),
  fc.integer({ min: 0, max: 100 }).map((n) => `${n}%`),
  fc.constant('auto'),
  fc.constant('inherit'),
);

/**
 * Generate valid CSS numeric values
 */
const cssNumericArb = fc.oneof(
  fc.integer({ min: 0, max: 100 }),
  fc.double({ min: 0, max: 1, noNaN: true }),
);

/**
 * Generate simple style objects
 */
const simpleStyleArb: fc.Arbitrary<StyleObject> = fc.record({
  color: fc.option(cssColorArb, { nil: undefined }),
  backgroundColor: fc.option(cssColorArb, { nil: undefined }),
  fontSize: fc.option(cssSizeArb, { nil: undefined }),
  padding: fc.option(cssSizeArb, { nil: undefined }),
  margin: fc.option(cssSizeArb, { nil: undefined }),
  opacity: fc.option(cssNumericArb, { nil: undefined }),
  borderRadius: fc.option(cssSizeArb, { nil: undefined }),
}).map((obj) => {
  // Filter out undefined values
  const result: StyleObject = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      (result as Record<string, unknown>)[key] = value;
    }
  });
  return result;
});

// Note: nonEmptyStyleArb removed as it was unused

// ============================================================================
// Property 4: Style Composition Priority
// Feature: taro-component-library-optimization
// Validates: Requirements 2.1.3
// ============================================================================

describe('Property 4: Style Composition Priority', () => {
  /**
   * For any component with multiple style sources (base, common, component, variant, user),
   * the final computed style SHALL follow the priority order:
   * base < common < component < variant < user,
   * where higher priority styles override lower priority styles for the same CSS properties.
   */

  it('should apply styles in correct priority order: base < root < variants < states', () => {
    fc.assert(
      fc.property(
        cssColorArb,
        cssColorArb,
        cssColorArb,
        cssColorArb,
        (baseColor, rootColor, variantColor, stateColor) => {
          const styleDefinition: StyleDefinition = {
            base: { color: baseColor },
            root: { color: rootColor },
            variants: {
              type: {
                primary: { color: variantColor },
              },
            },
            states: {
              disabled: { color: stateColor },
            },
          };

          const useStyles = createComponentStyles(styleDefinition);

          // Test base only
          const baseResult = useStyles(defaultDesignTokens, {});
          expect(baseResult.root.color).toBe(rootColor); // root overrides base

          // Test with variant
          const variantResult = useStyles(defaultDesignTokens, { type: 'primary' });
          expect(variantResult.root.color).toBe(variantColor); // variant overrides root

          // Test with state
          const stateResult = useStyles(defaultDesignTokens, { type: 'primary', disabled: true });
          expect(stateResult.root.color).toBe(stateColor); // state overrides variant
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve non-conflicting properties from all priority levels', () => {
    fc.assert(
      fc.property(
        cssColorArb,
        cssSizeArb,
        cssSizeArb,
        cssNumericArb,
        (baseColor, rootFontSize, variantPadding, stateOpacity) => {
          const styleDefinition: StyleDefinition = {
            base: { color: baseColor },
            root: { fontSize: rootFontSize },
            variants: {
              size: {
                lg: { padding: variantPadding },
              },
            },
            states: {
              loading: { opacity: stateOpacity },
            },
          };

          const useStyles = createComponentStyles(styleDefinition);
          const result = useStyles(defaultDesignTokens, { size: 'lg', loading: true });

          // All non-conflicting properties should be present
          expect(result.root.color).toBe(baseColor);
          expect(result.root.fontSize).toBe(rootFontSize);
          expect(result.root.padding).toBe(variantPadding);
          expect(result.root.opacity).toBe(stateOpacity);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should correctly merge multiple base styles in array order', () => {
    fc.assert(
      fc.property(
        cssColorArb,
        cssColorArb,
        cssSizeArb,
        (color1, color2, fontSize) => {
          const styleDefinition: StyleDefinition = {
            base: [
              { color: color1, fontSize },
              { color: color2 }, // This should override color1
            ],
          };

          const useStyles = createComponentStyles(styleDefinition);
          const result = useStyles(defaultDesignTokens, {});

          // Later base style should override earlier one for same property
          expect(result.root.color).toBe(color2);
          // Non-conflicting property should be preserved
          expect(result.root.fontSize).toBe(fontSize);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// Property 5: Style Merge Idempotence
// Feature: taro-component-library-optimization
// Validates: Requirements 2.1.4
// ============================================================================

describe('Property 5: Style Merge Idempotence', () => {
  /**
   * For any set of style objects, calling mergeStyles(a, b) followed by
   * mergeStyles(result, b) SHALL produce the same result as mergeStyles(a, b)
   * (merging the same style twice has no additional effect).
   */

  it('should be idempotent when merging same style twice', () => {
    fc.assert(
      fc.property(
        simpleStyleArb,
        simpleStyleArb,
        (styleA, styleB) => {
          const result1 = mergeStyles(styleA, styleB);
          const result2 = mergeStyles(result1, styleB);

          // Merging styleB again should produce the same result
          expect(result2).toEqual(result1);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should be idempotent for extendStyles', () => {
    fc.assert(
      fc.property(
        simpleStyleArb,
        simpleStyleArb,
        (base, extension) => {
          const result1 = extendStyles(base, extension);
          const result2 = extendStyles(result1, extension);

          // Extending with same style again should produce the same result
          expect(result2).toEqual(result1);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce consistent results regardless of merge order for non-conflicting properties', () => {
    fc.assert(
      fc.property(
        cssColorArb,
        cssSizeArb,
        cssSizeArb,
        (color, fontSize, padding) => {
          const styleA: StyleObject = { color };
          const styleB: StyleObject = { fontSize };
          const styleC: StyleObject = { padding };

          // Different merge orders should produce same result for non-conflicting props
          const result1 = mergeStyles(mergeStyles(styleA, styleB), styleC);
          const result2 = mergeStyles(styleA, mergeStyles(styleB, styleC));

          expect(result1).toEqual(result2);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle empty style objects correctly', () => {
    fc.assert(
      fc.property(
        simpleStyleArb,
        (style) => {
          // Merging with empty object should return equivalent result
          const result1 = mergeStyles(style, {});
          const result2 = mergeStyles({}, style);

          expect(result1).toEqual(style);
          expect(result2).toEqual(style);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle undefined and null values in merge', () => {
    fc.assert(
      fc.property(
        simpleStyleArb,
        (style) => {
          // Merging with undefined/null/false should return the valid style
          const result1 = mergeStyles(style, undefined);
          const result2 = mergeStyles(style, null);
          const result3 = mergeStyles(style, false);

          expect(result1).toEqual(style);
          expect(result2).toEqual(style);
          expect(result3).toEqual(style);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// Additional Style System Tests
// ============================================================================

describe('mergeStyles', () => {
  it('should merge multiple style objects', () => {
    const style1: StyleObject = { color: 'red', fontSize: '14px' };
    const style2: StyleObject = { color: 'blue', padding: '10px' };
    const style3: StyleObject = { margin: '5px' };

    const result = mergeStyles(style1, style2, style3);

    expect(result).toEqual({
      color: 'blue',
      fontSize: '14px',
      padding: '10px',
      margin: '5px',
    });
  });

  it('should handle empty arguments', () => {
    expect(mergeStyles()).toEqual({});
    expect(mergeStyles(undefined, null, false)).toEqual({});
  });
});

describe('extendStyles', () => {
  it('should extend base style with new properties', () => {
    const base: StyleObject = { color: 'red', fontSize: '14px' };
    const extension: StyleObject = { fontWeight: 'bold' };

    const result = extendStyles(base, extension);

    expect(result).toEqual({
      color: 'red',
      fontSize: '14px',
      fontWeight: 'bold',
    });
  });

  it('should override base properties with extension', () => {
    const base: StyleObject = { color: 'red', fontSize: '14px' };
    const extension: StyleObject = { color: 'blue' };

    const result = extendStyles(base, extension);

    expect(result).toEqual({
      color: 'blue',
      fontSize: '14px',
    });
  });
});

describe('conditionalStyle', () => {
  it('should return trueStyle when condition is true', () => {
    const trueStyle: StyleObject = { color: 'green' };
    const falseStyle: StyleObject = { color: 'red' };

    expect(conditionalStyle(true, trueStyle, falseStyle)).toEqual(trueStyle);
  });

  it('should return falseStyle when condition is false', () => {
    const trueStyle: StyleObject = { color: 'green' };
    const falseStyle: StyleObject = { color: 'red' };

    expect(conditionalStyle(false, trueStyle, falseStyle)).toEqual(falseStyle);
  });

  it('should return empty object when condition is false and no falseStyle', () => {
    const trueStyle: StyleObject = { color: 'green' };

    expect(conditionalStyle(false, trueStyle)).toEqual({});
  });
});

describe('createResponsiveStyle', () => {
  it('should return styles for current breakpoint', () => {
    const breakpointStyles: Record<string, StyleObject> = {
      xs: { fontSize: '12px' },
      sm: { fontSize: '14px' },
      md: { fontSize: '16px' },
      lg: { fontSize: '18px' },
    };

    const result = createResponsiveStyle(breakpointStyles, 'md');

    // Should include all styles up to and including 'md'
    expect(result.fontSize).toBe('16px');
  });

  it('should accumulate styles from smaller breakpoints', () => {
    const breakpointStyles: Record<string, StyleObject> = {
      xs: { color: 'red' },
      sm: { fontSize: '14px' },
      md: { padding: '10px' },
    };

    const result = createResponsiveStyle(breakpointStyles, 'md');

    expect(result).toEqual({
      color: 'red',
      fontSize: '14px',
      padding: '10px',
    });
  });
});

describe('createComponentStyles', () => {
  it('should create styles with all features', () => {
    const styleDefinition: StyleDefinition = {
      base: { display: 'flex' },
      root: { alignItems: 'center' },
      variants: {
        size: {
          sm: { padding: '4px' },
          md: { padding: '8px' },
          lg: { padding: '12px' },
        },
        type: {
          primary: { backgroundColor: 'blue' },
          secondary: { backgroundColor: 'gray' },
        },
      },
      states: {
        disabled: { opacity: 0.5 },
        loading: { cursor: 'wait' },
      },
      slots: {
        icon: { marginRight: '4px' },
        label: { fontWeight: 'bold' },
      },
    };

    const useStyles = createComponentStyles(styleDefinition);

    const props: ComponentStyleProps = {
      size: 'md',
      type: 'primary',
      disabled: true,
    };

    const result = useStyles(defaultDesignTokens, props);

    expect(result.root).toEqual({
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      backgroundColor: 'blue',
      opacity: 0.5,
    });

    expect(result.slots).toEqual({
      icon: { marginRight: '4px' },
      label: { fontWeight: 'bold' },
    });
  });

  it('should work with function-based style definition', () => {
    const styleDefinition = (tokens: typeof defaultDesignTokens) => ({
      root: {
        color: tokens.colors.text.primary,
        backgroundColor: tokens.colors.background.primary,
      },
    });

    const useStyles = createComponentStyles(styleDefinition);
    const result = useStyles(defaultDesignTokens, {});

    expect(result.root.color).toBe(defaultDesignTokens.colors.text.primary);
    expect(result.root.backgroundColor).toBe(defaultDesignTokens.colors.background.primary);
  });

  it('should handle missing variants gracefully', () => {
    const styleDefinition: StyleDefinition = {
      root: { color: 'black' },
      variants: {
        size: {
          sm: { fontSize: '12px' },
        },
      },
    };

    const useStyles = createComponentStyles(styleDefinition);

    // Using a variant value that doesn't exist
    const result = useStyles(defaultDesignTokens, { size: 'xl' });

    // Should still have root styles, just no variant applied
    expect(result.root).toEqual({ color: 'black' });
  });

  it('should handle missing states gracefully', () => {
    const styleDefinition: StyleDefinition = {
      root: { color: 'black' },
      states: {
        disabled: { opacity: 0.5 },
      },
    };

    const useStyles = createComponentStyles(styleDefinition);

    // State is false, should not apply
    const result = useStyles(defaultDesignTokens, { disabled: false });

    expect(result.root).toEqual({ color: 'black' });
  });
});

describe('deepMergeStyles', () => {
  it('should deeply merge nested style objects', () => {
    const target: StyleObject = {
      color: 'red',
    };
    const source: StyleObject = {
      backgroundColor: 'blue',
    };

    const result = deepMergeStyles(target, source);

    expect(result).toEqual({
      color: 'red',
      backgroundColor: 'blue',
    });
  });

  it('should filter empty values when option is set', () => {
    const target: StyleObject = { color: 'red' };
    const source: StyleObject = { backgroundColor: undefined as unknown as string };

    const result = deepMergeStyles(target, source, { filterEmpty: true });

    expect(result).toEqual({ color: 'red' });
  });

  it('should clone when option is set', () => {
    const target: StyleObject = { color: 'red' };
    const source: StyleObject = { backgroundColor: 'blue' };

    const result = deepMergeStyles(target, source, { clone: true });

    // Original should not be modified
    expect(target).toEqual({ color: 'red' });
    expect(result).toEqual({ color: 'red', backgroundColor: 'blue' });
  });
});
