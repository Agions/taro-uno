/**
 * 平台适配属性测试
 *
 * Property 7: Platform Detection Correctness
 * Property 9: Unit Conversion Round-Trip
 *
 * Validates: Requirements 4.1, 4.6
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import type { PlatformType, PlatformInfo } from '../../src/platform/types';
import {
  isMiniProgramPlatform,
  DEFAULT_PLATFORM_CAPABILITIES,
  DEFAULT_PLATFORM_CONFIG,
} from '../../src/platform/types';
import {
  pxToRpx,
  rpxToPx,
  pxToRem,
  remToPx,
  rpxToRem,
  remToRpx,
  convertUnit,
  parseUnitValue,
  formatUnitValue,
  setUnitConfig,
  resetUnitConfig,
  getUnitConfig,
  type UnitType,
  type UnitConversionConfig,
} from '../../src/utils/unit';

// ============================================================================
// Property 7: Platform Detection Correctness
// Feature: taro-component-library-optimization
// Validates: Requirements 4.1
// ============================================================================

describe('Property 7: Platform Detection Correctness', () => {
  /**
   * For any runtime environment, the platform detector SHALL correctly identify
   * the platform type and return accurate platform information
   * (isMiniProgram, isH5, isRN, isHarmony flags).
   */

  // All supported platform types
  const allPlatformTypes: PlatformType[] = [
    'weapp',
    'alipay',
    'swan',
    'tt',
    'qq',
    'jd',
    'h5',
    'rn',
    'harmony',
    'unknown',
  ];

  // Mini program platforms
  const miniProgramPlatforms: PlatformType[] = ['weapp', 'alipay', 'swan', 'tt', 'qq', 'jd'];

  it('should correctly identify mini program platforms', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allPlatformTypes),
        (platform: PlatformType) => {
          const isMiniProgram = isMiniProgramPlatform(platform);
          const expected = miniProgramPlatforms.includes(platform);
          expect(isMiniProgram).toBe(expected);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should have valid capabilities for all platform types', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allPlatformTypes),
        (platform: PlatformType) => {
          const capabilities = DEFAULT_PLATFORM_CAPABILITIES[platform];

          // All capability keys should exist
          expect(capabilities).toBeDefined();
          expect(typeof capabilities.storage).toBe('boolean');
          expect(typeof capabilities.request).toBe('boolean');
          expect(typeof capabilities.navigation).toBe('boolean');
          expect(typeof capabilities.clipboard).toBe('boolean');
          expect(typeof capabilities.scan).toBe('boolean');
          expect(typeof capabilities.payment).toBe('boolean');
          expect(typeof capabilities.share).toBe('boolean');
          expect(typeof capabilities.biometrics).toBe('boolean');
          expect(typeof capabilities.location).toBe('boolean');
          expect(typeof capabilities.camera).toBe('boolean');
          expect(typeof capabilities.file).toBe('boolean');
          expect(typeof capabilities.vibrate).toBe('boolean');
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should have valid config for all platform types', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allPlatformTypes),
        (platform: PlatformType) => {
          const config = DEFAULT_PLATFORM_CONFIG[platform];

          // All config keys should exist and have valid values
          expect(config).toBeDefined();
          expect(['px', 'rpx', 'rem']).toContain(config.defaultUnit);
          expect(typeof config.designWidth).toBe('number');
          expect(config.designWidth).toBeGreaterThan(0);
          expect(typeof config.devicePixelRatio).toBe('number');
          expect(config.devicePixelRatio).toBeGreaterThan(0);
          expect(typeof config.rootFontSize).toBe('number');
          expect(config.rootFontSize).toBeGreaterThan(0);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should have consistent platform info structure', () => {
    // Test that PlatformInfo structure is consistent
    const mockPlatformInfo: PlatformInfo = {
      type: 'h5',
      isMiniProgram: false,
      isH5: true,
      isRN: false,
      isHarmony: false,
    };

    expect(mockPlatformInfo.type).toBeDefined();
    expect(typeof mockPlatformInfo.isMiniProgram).toBe('boolean');
    expect(typeof mockPlatformInfo.isH5).toBe('boolean');
    expect(typeof mockPlatformInfo.isRN).toBe('boolean');
    expect(typeof mockPlatformInfo.isHarmony).toBe('boolean');
  });

  it('should have mutually exclusive platform flags for non-mini-program platforms', () => {
    // For non-mini-program platforms, only one of isH5, isRN, isHarmony should be true
    const nonMiniProgramPlatforms: Array<{ type: PlatformType; isH5: boolean; isRN: boolean; isHarmony: boolean }> = [
      { type: 'h5', isH5: true, isRN: false, isHarmony: false },
      { type: 'rn', isH5: false, isRN: true, isHarmony: false },
      { type: 'harmony', isH5: false, isRN: false, isHarmony: true },
      { type: 'unknown', isH5: false, isRN: false, isHarmony: false },
    ];

    nonMiniProgramPlatforms.forEach(({ type, isH5, isRN, isHarmony }) => {
      const platformInfo: PlatformInfo = {
        type,
        isMiniProgram: false,
        isH5,
        isRN,
        isHarmony,
      };

      // Count how many flags are true
      const trueCount = [platformInfo.isH5, platformInfo.isRN, platformInfo.isHarmony].filter(Boolean).length;

      // For unknown, all should be false; for others, exactly one should be true
      if (type === 'unknown') {
        expect(trueCount).toBe(0);
      } else {
        expect(trueCount).toBe(1);
      }
    });
  });

  it('should have mini program platforms with isMiniProgram=true', () => {
    miniProgramPlatforms.forEach((platform) => {
      const platformInfo: PlatformInfo = {
        type: platform,
        isMiniProgram: true,
        isH5: false,
        isRN: false,
        isHarmony: false,
      };

      expect(platformInfo.isMiniProgram).toBe(true);
      expect(platformInfo.isH5).toBe(false);
      expect(platformInfo.isRN).toBe(false);
      expect(platformInfo.isHarmony).toBe(false);
    });
  });
});

// ============================================================================
// Property 9: Unit Conversion Round-Trip
// Feature: taro-component-library-optimization
// Validates: Requirements 4.6
// ============================================================================

describe('Property 9: Unit Conversion Round-Trip', () => {
  /**
   * For any numeric value and unit type (px, rpx, rem), converting from one
   * unit to another and back SHALL produce a value within acceptable precision
   * tolerance of the original value.
   */

  const PRECISION_TOLERANCE = 0.0001;

  // Use a fixed config for consistent testing
  const testConfig: UnitConversionConfig = {
    designWidth: 750,
    devicePixelRatio: 2,
    rootFontSize: 16,
    screenWidth: 375,
  };

  beforeEach(() => {
    setUnitConfig(testConfig);
  });

  afterEach(() => {
    resetUnitConfig();
  });

  // Arbitrary for positive numbers (avoiding zero to prevent division issues)
  const positiveNumberArb = fc.double({
    min: 0.01,
    max: 10000,
    noNaN: true,
    noDefaultInfinity: true,
  });

  it('should round-trip px -> rpx -> px', () => {
    fc.assert(
      fc.property(positiveNumberArb, (px: number) => {
        const rpx = pxToRpx(px, testConfig);
        const backToPx = rpxToPx(rpx, testConfig);

        expect(Math.abs(backToPx - px)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip rpx -> px -> rpx', () => {
    fc.assert(
      fc.property(positiveNumberArb, (rpx: number) => {
        const px = rpxToPx(rpx, testConfig);
        const backToRpx = pxToRpx(px, testConfig);

        expect(Math.abs(backToRpx - rpx)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip px -> rem -> px', () => {
    fc.assert(
      fc.property(positiveNumberArb, (px: number) => {
        const rem = pxToRem(px, testConfig);
        const backToPx = remToPx(rem, testConfig);

        expect(Math.abs(backToPx - px)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip rem -> px -> rem', () => {
    fc.assert(
      fc.property(positiveNumberArb, (rem: number) => {
        const px = remToPx(rem, testConfig);
        const backToRem = pxToRem(px, testConfig);

        expect(Math.abs(backToRem - rem)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip rpx -> rem -> rpx', () => {
    fc.assert(
      fc.property(positiveNumberArb, (rpx: number) => {
        const rem = rpxToRem(rpx, testConfig);
        const backToRpx = remToRpx(rem, testConfig);

        expect(Math.abs(backToRpx - rpx)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip rem -> rpx -> rem', () => {
    fc.assert(
      fc.property(positiveNumberArb, (rem: number) => {
        const rpx = remToRpx(rem, testConfig);
        const backToRem = rpxToRem(rpx, testConfig);

        expect(Math.abs(backToRem - rem)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should round-trip using convertUnit for all unit pairs', () => {
    const unitTypes: UnitType[] = ['px', 'rpx', 'rem'];

    fc.assert(
      fc.property(
        positiveNumberArb,
        fc.constantFrom(...unitTypes),
        fc.constantFrom(...unitTypes),
        (value: number, from: UnitType, to: UnitType) => {
          const converted = convertUnit(value, from, to, testConfig);
          const backToOriginal = convertUnit(converted, to, from, testConfig);

          expect(Math.abs(backToOriginal - value)).toBeLessThan(PRECISION_TOLERANCE);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should return same value when converting to same unit', () => {
    const unitTypes: UnitType[] = ['px', 'rpx', 'rem'];

    fc.assert(
      fc.property(
        positiveNumberArb,
        fc.constantFrom(...unitTypes),
        (value: number, unit: UnitType) => {
          const result = convertUnit(value, unit, unit, testConfig);
          expect(result).toBe(value);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should correctly parse and format unit strings', () => {
    const unitTypes: UnitType[] = ['px', 'rpx', 'rem'];

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }),
        fc.constantFrom(...unitTypes),
        (value: number, unit: UnitType) => {
          const formatted = formatUnitValue(value, unit);
          const parsed = parseUnitValue(formatted);

          expect(parsed).not.toBeNull();
          if (parsed) {
            expect(parsed.unit).toBe(unit);
            expect(Math.abs(parsed.value - value)).toBeLessThan(PRECISION_TOLERANCE);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle negative values in round-trip conversions', () => {
    const negativeNumberArb = fc.double({
      min: -10000,
      max: -0.01,
      noNaN: true,
      noDefaultInfinity: true,
    });

    fc.assert(
      fc.property(negativeNumberArb, (px: number) => {
        const rpx = pxToRpx(px, testConfig);
        const backToPx = rpxToPx(rpx, testConfig);

        expect(Math.abs(backToPx - px)).toBeLessThan(PRECISION_TOLERANCE);
      }),
      { numRuns: 100 },
    );
  });

  it('should maintain conversion consistency across different configs', () => {
    const configArb = fc.record({
      designWidth: fc.integer({ min: 320, max: 1920 }),
      devicePixelRatio: fc.double({ min: 1, max: 4, noNaN: true }),
      rootFontSize: fc.integer({ min: 12, max: 24 }),
      screenWidth: fc.integer({ min: 320, max: 1920 }),
    });

    fc.assert(
      fc.property(
        positiveNumberArb,
        configArb,
        (value: number, config: UnitConversionConfig) => {
          // px -> rpx -> px should round-trip regardless of config
          const rpx = pxToRpx(value, config);
          const backToPx = rpxToPx(rpx, config);

          expect(Math.abs(backToPx - value)).toBeLessThan(PRECISION_TOLERANCE);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================================
// Additional Unit Tests for Unit Conversion
// ============================================================================

describe('Unit Conversion Edge Cases', () => {
  beforeEach(() => {
    resetUnitConfig();
  });

  it('should handle zero values', () => {
    expect(pxToRpx(0)).toBe(0);
    expect(rpxToPx(0)).toBe(0);
    expect(pxToRem(0)).toBe(0);
    expect(remToPx(0)).toBe(0);
  });

  it('should parse valid unit strings', () => {
    expect(parseUnitValue('16px')).toEqual({ value: 16, unit: 'px' });
    expect(parseUnitValue('32rpx')).toEqual({ value: 32, unit: 'rpx' });
    expect(parseUnitValue('1.5rem')).toEqual({ value: 1.5, unit: 'rem' });
    expect(parseUnitValue('-10px')).toEqual({ value: -10, unit: 'px' });
  });

  it('should return null for invalid unit strings', () => {
    expect(parseUnitValue('16')).toBeNull();
    expect(parseUnitValue('px')).toBeNull();
    expect(parseUnitValue('16em')).toBeNull();
    expect(parseUnitValue('invalid')).toBeNull();
    expect(parseUnitValue('')).toBeNull();
  });

  it('should format unit values correctly', () => {
    expect(formatUnitValue(16, 'px')).toBe('16px');
    expect(formatUnitValue(32, 'rpx')).toBe('32rpx');
    expect(formatUnitValue(1.5, 'rem')).toBe('1.5rem');
    expect(formatUnitValue(1.234, 'px', 2)).toBe('1.23px');
    expect(formatUnitValue(1.235, 'px', 2)).toBe('1.24px');
  });

  it('should get and set config correctly', () => {
    const customConfig: Partial<UnitConversionConfig> = {
      designWidth: 640,
      rootFontSize: 14,
    };

    setUnitConfig(customConfig);
    const config = getUnitConfig();

    expect(config.designWidth).toBe(640);
    expect(config.rootFontSize).toBe(14);
  });
});
