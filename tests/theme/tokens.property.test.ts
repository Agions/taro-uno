/**
 * 设计令牌属性测试
 * 
 * Property 1: Design Token Completeness and Consistency
 * Property 3: Token Deep Merge Correctness
 * 
 * Validates: Requirements 1.1, 1.5
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  defaultDesignTokens,
  defaultColorTokens,
  defaultSpacingTokens,
  defaultTypographyTokens,
  defaultBorderRadiusTokens,
  defaultBoxShadowTokens,
  defaultAnimationTokens,
  defaultZIndexTokens,
  type DesignTokens,
} from '../../src/theme/tokens';
import { type ColorScale } from '../../src/theme/tokens/colors';
import {
  deepMerge,
  deepClone,
  mergeDesignTokens,
  isPlainObject,
} from '../../src/theme/utils/deepMerge';

// ============================================================================
// Property 1: Design Token Completeness and Consistency
// Feature: taro-component-library-optimization
// Validates: Requirements 1.1, 1.4
// ============================================================================

describe('Property 1: Design Token Completeness and Consistency', () => {
  /**
   * For any design token system configuration, all required token categories
   * (colors, spacing, typography, effects)
   * SHALL exist and contain valid values that conform to their type definitions.
   */

  it('should have all required token categories', () => {
    const requiredCategories = [
      'colors',
      'spacing',
      'typography',
      'effects',
    ] as const;

    requiredCategories.forEach(category => {
      expect(defaultDesignTokens).toHaveProperty(category);
      expect(defaultDesignTokens[category]).toBeDefined();
      expect(defaultDesignTokens[category]).not.toBeNull();
    });
  });


  it('should have valid color scale values for all color categories', () => {
    const colorScaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
    const colorCategories = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const;

    colorCategories.forEach(category => {
      const colorScale = defaultColorTokens[category] as ColorScale;
      expect(colorScale).toBeDefined();

      colorScaleKeys.forEach(key => {
        expect(colorScale[key]).toBeDefined();
        expect(typeof colorScale[key]).toBe('string');
        // Verify it's a valid color format (hex or rgba)
        expect(colorScale[key]).toMatch(/^(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))$/);
      });
    });
  });

  it('should have valid spacing values', () => {
    const spacingKeys = Object.keys(defaultSpacingTokens).filter(
      key => key !== 'component' && key !== 'layout',
    );

    spacingKeys.forEach(key => {
      const value = defaultSpacingTokens[key as keyof typeof defaultSpacingTokens];
      if (typeof value === 'string') {
        // Should be a valid CSS length value
        expect(value).toMatch(/^(\d+(\.\d+)?(px|rem|em|%)?|0)$/);
      }
    });
  });

  it('should have valid typography values', () => {
    // Font families should be arrays of strings
    Object.values(defaultTypographyTokens.fontFamily).forEach(family => {
      expect(Array.isArray(family)).toBe(true);
      family.forEach(font => {
        expect(typeof font).toBe('string');
      });
    });

    // Font sizes should be valid CSS values
    Object.values(defaultTypographyTokens.fontSize).forEach(size => {
      expect(typeof size).toBe('string');
      expect(size).toMatch(/^\d+(\.\d+)?(px|rem|em)?$/);
    });

    // Font weights should be numeric strings
    Object.values(defaultTypographyTokens.fontWeight).forEach(weight => {
      expect(typeof weight).toBe('string');
      expect(parseInt(weight, 10)).toBeGreaterThanOrEqual(100);
      expect(parseInt(weight, 10)).toBeLessThanOrEqual(900);
    });
  });


  it('should have valid border radius values', () => {
    const baseRadiusKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

    baseRadiusKeys.forEach(key => {
      const value = defaultBorderRadiusTokens[key as keyof typeof defaultBorderRadiusTokens];
      expect(typeof value).toBe('string');
    });

    // Component-specific radius should exist
    expect(defaultBorderRadiusTokens.button).toBeDefined();
    expect(defaultBorderRadiusTokens.input).toBeDefined();
    expect(defaultBorderRadiusTokens.card).toBeDefined();
  });

  it('should have valid box shadow values', () => {
    const baseShadowKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'inner', 'colored'];

    baseShadowKeys.forEach(key => {
      const value = defaultBoxShadowTokens[key as keyof typeof defaultBoxShadowTokens];
      expect(typeof value).toBe('string');
    });

    // Component-specific shadows should exist
    expect(defaultBoxShadowTokens.button).toBeDefined();
    expect(defaultBoxShadowTokens.card).toBeDefined();
    expect(defaultBoxShadowTokens.modal).toBeDefined();
  });

  it('should have valid animation values', () => {
    // Duration values should be valid time strings
    Object.values(defaultAnimationTokens.duration).forEach(duration => {
      expect(typeof duration).toBe('string');
      expect(duration).toMatch(/^\d+ms$/);
    });

    // Easing values should be valid CSS timing functions
    Object.values(defaultAnimationTokens.easing).forEach(easing => {
      expect(typeof easing).toBe('string');
      expect(easing).toMatch(/^(linear|ease(-in|-out|-in-out)?|cubic-bezier\([^)]+\))$/);
    });
  });

  it('should have valid z-index values', () => {
    Object.entries(defaultZIndexTokens).forEach(([key, value]) => {
      expect(typeof value).toBe('string');
      if (key !== 'auto') {
        // Should be a valid number or 'auto'
        expect(value === 'auto' || !isNaN(parseInt(value, 10))).toBe(true);
      }
    });
  });
});


// ============================================================================
// Property 3: Token Deep Merge Correctness
// Feature: taro-component-library-optimization
// Validates: Requirements 1.5
// ============================================================================

describe('Property 3: Token Deep Merge Correctness', () => {
  /**
   * For any custom token configuration, when merged with default tokens using
   * deep merge, the result SHALL contain all default values for unspecified
   * paths while correctly overriding specified paths at any depth level.
   */

  // Arbitrary generator for simple token-like objects
  // Generate hex color strings
  const hexColorArb = fc.tuple(
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
    fc.integer({ min: 0, max: 255 }),
  ).map(([r, g, b]) => `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);

  const tokenValueArb = fc.oneof(
    hexColorArb,
    fc.integer({ min: 0, max: 100 }).map(n => `${n}px`),
    fc.integer({ min: 100, max: 900 }).map(n => `${n}`),
  );

  const simpleObjectArb = fc.dictionary(
    fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
    tokenValueArb,
    { minKeys: 1, maxKeys: 5 },
  );

  const nestedObjectArb = fc.dictionary(
    fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
    fc.oneof(tokenValueArb, simpleObjectArb),
    { minKeys: 1, maxKeys: 5 },
  );

  it('should preserve all default values when merging empty object', () => {
    fc.assert(
      fc.property(simpleObjectArb, (defaultObj) => {
        const result = deepMerge(defaultObj, {});

        // All keys from default should exist in result
        Object.keys(defaultObj).forEach(key => {
          expect(result).toHaveProperty(key);
          expect(result[key]).toEqual(defaultObj[key]);
        });
      }),
      { numRuns: 100 },
    );
  });


  it('should correctly override specified paths at any depth', () => {
    fc.assert(
      fc.property(
        nestedObjectArb,
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s)),
        tokenValueArb,
        (defaultObj, overrideKey, overrideValue) => {
          const customObj = { [overrideKey]: overrideValue };
          const result = deepMerge(defaultObj, customObj);

          // The overridden key should have the new value
          expect(result[overrideKey]).toEqual(overrideValue);

          // Other keys should remain unchanged
          Object.keys(defaultObj).forEach(key => {
            if (key !== overrideKey) {
              expect(result[key]).toEqual(defaultObj[key]);
            }
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should deeply merge nested objects', () => {
    fc.assert(
      fc.property(
        fc.record({
          level1: fc.record({
            a: tokenValueArb,
            b: tokenValueArb,
          }),
        }),
        tokenValueArb,
        (defaultObj, newValue) => {
          const customObj = {
            level1: { a: newValue },
          };

          const result = deepMerge(defaultObj, customObj);

          // Overridden nested value should be updated
          expect(result.level1.a).toEqual(newValue);
          // Non-overridden nested value should be preserved
          expect(result.level1.b).toEqual(defaultObj.level1.b);
        },
      ),
      { numRuns: 100 },
    );
  });


  it('should not mutate original objects when clone option is true', () => {
    fc.assert(
      fc.property(
        simpleObjectArb,
        simpleObjectArb,
        (target, source) => {
          const originalTarget = deepClone(target);
          const originalSource = deepClone(source);

          deepMerge(target, source, { clone: true });

          // Original objects should not be mutated
          expect(target).toEqual(originalTarget);
          expect(source).toEqual(originalSource);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle arrays according to merge strategy', () => {
    const arrayArb = fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1, maxLength: 5 });

    fc.assert(
      fc.property(
        arrayArb,
        arrayArb,
        (targetArr, sourceArr) => {
          const target = { items: targetArr };
          const source = { items: sourceArr };

          // Replace strategy (default)
          const replaceResult = deepMerge(target, source, { arrayMerge: 'replace' });
          expect(replaceResult.items).toEqual(sourceArr);

          // Concat strategy
          const concatResult = deepMerge(target, source, { arrayMerge: 'concat' });
          expect(concatResult.items).toEqual([...targetArr, ...sourceArr]);
        },
      ),
      { numRuns: 100 },
    );
  });


  it('should correctly merge design tokens with custom overrides', () => {
    // Test with actual design tokens structure
    const customColors = {
      colors: {
        primary: {
          500: '#ff0000',
        },
        text: {
          primary: '#000000',
        },
      },
    };

    const result = mergeDesignTokens(defaultDesignTokens, customColors as Partial<DesignTokens>);

    // Custom values should be applied
    expect(result.colors.primary[500]).toBe('#ff0000');
    expect(result.colors.text.primary).toBe('#000000');

    // Other values should be preserved from defaults
    expect(result.colors.primary[100]).toBe(defaultColorTokens.primary[100]);
    expect(result.colors.secondary).toEqual(defaultColorTokens.secondary);
    expect(result.spacing).toEqual(defaultSpacingTokens);
    expect(result.typography).toEqual(defaultTypographyTokens);
  });

  it('should handle null and undefined values correctly', () => {
    fc.assert(
      fc.property(
        simpleObjectArb,
        (defaultObj) => {
          // Merging with null should return cloned default
          const nullResult = deepMerge(defaultObj, null as unknown as Partial<typeof defaultObj>);
          expect(nullResult).toEqual(defaultObj);

          // Merging with undefined should return cloned default
          const undefinedResult = deepMerge(defaultObj, undefined as unknown as Partial<typeof defaultObj>);
          expect(undefinedResult).toEqual(defaultObj);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ============================================================================
// Additional Unit Tests for DesignTokensManager
// ============================================================================

describe('DesignTokensManager', () => {
  it('should return default tokens from getAllTokens', async () => {
    const { tokensManager } = await import('../../src/theme/tokens');
    const result = tokensManager.getAllTokens();
    expect(result.colors).toBeDefined();
    expect(result.spacing).toBeDefined();
    expect(result.typography).toBeDefined();
    expect(result.effects).toBeDefined();
  });

  it('should get color values correctly', async () => {
    const { tokensManager, defaultColorTokens: colors } = await import('../../src/theme/tokens');
    const primaryColor = tokensManager.getColor('primary.500');
    expect(primaryColor).toBe(colors.primary[500]);
  });
});

// ============================================================================
// Helper function tests
// ============================================================================

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('should return false for non-plain objects', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(/regex/)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(123)).toBe(false);
  });
});
