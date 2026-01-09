/**
 * 对象工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  deepMerge,
  deepMergeWithArrays,
  pick,
  omit,
  pickBy,
  omitBy,
  get,
  set,
  has,
  unset,
  deepClone,
  flatten,
  unflatten,
  isEqual,
  diff,
  isEmpty,
} from '../object';

describe('object', () => {
  describe('deepMerge', () => {
    it('should merge simple objects', () => {
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('should deep merge nested objects', () => {
      expect(deepMerge({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
    });

    it('should override values', () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it('should replace arrays', () => {
      expect(deepMerge({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [3, 4] });
    });

    it('should handle multiple objects', () => {
      expect(deepMerge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('deepMergeWithArrays', () => {
    it('should merge arrays', () => {
      expect(deepMergeWithArrays({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [1, 2, 3, 4] });
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
    });

    it('should ignore non-existent keys', () => {
      expect(pick({ a: 1 }, ['a', 'b' as keyof { a: number }])).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['c'])).toEqual({ a: 1, b: 2 });
    });
  });

  describe('pickBy', () => {
    it('should pick by predicate', () => {
      expect(pickBy({ a: 1, b: null, c: 3 }, (v) => v !== null)).toEqual({ a: 1, c: 3 });
    });
  });

  describe('omitBy', () => {
    it('should omit by predicate', () => {
      expect(omitBy({ a: 1, b: null, c: 3 }, (v) => v === null)).toEqual({ a: 1, c: 3 });
    });
  });

  describe('get', () => {
    it('should get nested value by path string', () => {
      expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1);
    });

    it('should get nested value by path array', () => {
      expect(get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1);
    });

    it('should return default value for non-existent path', () => {
      expect(get({ a: 1 }, 'b.c', 'default')).toBe('default');
    });

    it('should return undefined for non-existent path without default', () => {
      expect(get({ a: 1 }, 'b.c')).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set nested value', () => {
      expect(set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
    });

    it('should not mutate original object', () => {
      const obj = { a: 1 };
      const result = set(obj, 'b', 2);
      expect(obj).toEqual({ a: 1 });
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

  describe('has', () => {
    it('should return true for existing path', () => {
      expect(has({ a: { b: 1 } }, 'a.b')).toBe(true);
    });

    it('should return false for non-existing path', () => {
      expect(has({ a: { b: 1 } }, 'a.c')).toBe(false);
    });
  });

  describe('unset', () => {
    it('should remove nested property', () => {
      expect(unset({ a: { b: 1, c: 2 } }, 'a.b')).toEqual({ a: { c: 2 } });
    });
  });

  describe('deepClone', () => {
    it('should deep clone object', () => {
      const obj = { a: { b: 1 } };
      const clone = deepClone(obj);
      clone.a.b = 2;
      expect(obj.a.b).toBe(1);
    });

    it('should clone arrays', () => {
      const arr = [1, [2, 3]];
      const clone = deepClone(arr);
      (clone[1] as number[])[0] = 4;
      expect((arr[1] as number[])[0]).toBe(2);
    });

    it('should clone Date objects', () => {
      const date = new Date();
      const clone = deepClone(date);
      expect(clone).toEqual(date);
      expect(clone).not.toBe(date);
    });
  });

  describe('flatten', () => {
    it('should flatten nested object', () => {
      expect(flatten({ a: { b: { c: 1 } }, d: 2 })).toEqual({ 'a.b.c': 1, 'd': 2 });
    });
  });

  describe('unflatten', () => {
    it('should unflatten object', () => {
      expect(unflatten({ 'a.b.c': 1, 'd': 2 })).toEqual({ a: { b: { c: 1 } }, d: 2 });
    });
  });

  describe('isEqual', () => {
    it('should return true for equal primitives', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual('a', 'a')).toBe(true);
    });

    it('should return true for equal objects', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    it('should return false for different objects', () => {
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should return true for equal arrays', () => {
      expect(isEqual([1, 2], [1, 2])).toBe(true);
    });

    it('should handle nested structures', () => {
      expect(isEqual({ a: { b: [1, 2] } }, { a: { b: [1, 2] } })).toBe(true);
    });
  });

  describe('diff', () => {
    it('should return differences', () => {
      expect(diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 })).toEqual({ b: 3, c: 4 });
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for non-empty object', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });
});
