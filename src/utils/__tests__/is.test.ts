/**
 * 类型判断工具测试
 */

import { describe, it, expect } from 'vitest';
import {
  isUndefined,
  isNull,
  isNil,
  isDefined,
  isBoolean,
  isNumber,
  isFiniteNumber,
  isInteger,
  isPositive,
  isNegative,
  isString,
  isNonEmptyString,
  isFunction,
  isObject,
  isPlainObject,
  isEmptyObject,
  isArray,
  isNonEmptyArray,
  isDate,
  isValidDate,
  isRegExp,
  isError,
  isMap,
  isSet,
  isPromise,
  isPrimitive,
  isFalsy,
  isTruthy,
  isEmpty,
  getType,
} from '../is';

describe('is', () => {
  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isNil', () => {
    it('should return true for null and undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
    });

    it('should return false for null and undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(42)).toBe(true);
      expect(isNumber(-1.5)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it('should return false for non-numbers', () => {
      expect(isNumber('42')).toBe(false);
    });
  });

  describe('isFiniteNumber', () => {
    it('should return true for finite numbers', () => {
      expect(isFiniteNumber(42)).toBe(true);
    });

    it('should return false for Infinity', () => {
      expect(isFiniteNumber(Infinity)).toBe(false);
      expect(isFiniteNumber(-Infinity)).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should return true for integers', () => {
      expect(isInteger(42)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-10)).toBe(true);
    });

    it('should return false for floats', () => {
      expect(isInteger(3.14)).toBe(false);
    });
  });

  describe('isPositive', () => {
    it('should return true for positive numbers', () => {
      expect(isPositive(1)).toBe(true);
      expect(isPositive(0.1)).toBe(true);
    });

    it('should return false for zero and negative numbers', () => {
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-1)).toBe(false);
    });
  });

  describe('isNegative', () => {
    it('should return true for negative numbers', () => {
      expect(isNegative(-1)).toBe(true);
      expect(isNegative(-0.1)).toBe(true);
    });

    it('should return false for zero and positive numbers', () => {
      expect(isNegative(0)).toBe(false);
      expect(isNegative(1)).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('hello')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(42)).toBe(false);
    });
  });

  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => { })).toBe(true);
      expect(isFunction(function () { })).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for primitives', () => {
      expect(isObject(42)).toBe(false);
      expect(isObject('string')).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should return true for plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should return false for arrays', () => {
      expect(isPlainObject([])).toBe(false);
    });

    it('should return false for class instances', () => {
      expect(isPlainObject(new Date())).toBe(false);
    });
  });

  describe('isEmptyObject', () => {
    it('should return true for empty objects', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('should return false for non-empty objects', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });

  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
    });
  });

  describe('isNonEmptyArray', () => {
    it('should return true for non-empty arrays', () => {
      expect(isNonEmptyArray([1])).toBe(true);
    });

    it('should return false for empty arrays', () => {
      expect(isNonEmptyArray([])).toBe(false);
    });
  });

  describe('isDate', () => {
    it('should return true for valid dates', () => {
      expect(isDate(new Date())).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isDate(new Date('invalid'))).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid dates', () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
    });
  });

  describe('isRegExp', () => {
    it('should return true for RegExp', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp('test'))).toBe(true);
    });

    it('should return false for non-RegExp', () => {
      expect(isRegExp('/test/')).toBe(false);
    });
  });

  describe('isError', () => {
    it('should return true for Error', () => {
      expect(isError(new Error())).toBe(true);
      expect(isError(new TypeError())).toBe(true);
    });

    it('should return false for non-Error', () => {
      expect(isError({ message: 'error' })).toBe(false);
    });
  });

  describe('isMap', () => {
    it('should return true for Map', () => {
      expect(isMap(new Map())).toBe(true);
    });

    it('should return false for non-Map', () => {
      expect(isMap({})).toBe(false);
    });
  });

  describe('isSet', () => {
    it('should return true for Set', () => {
      expect(isSet(new Set())).toBe(true);
    });

    it('should return false for non-Set', () => {
      expect(isSet([])).toBe(false);
    });
  });

  describe('isPromise', () => {
    it('should return true for Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('should return true for thenable', () => {
      expect(isPromise({ then: () => { }, catch: () => { } })).toBe(true);
    });

    it('should return false for non-Promise', () => {
      expect(isPromise({})).toBe(false);
    });
  });

  describe('isPrimitive', () => {
    it('should return true for primitives', () => {
      expect(isPrimitive(null)).toBe(true);
      expect(isPrimitive(undefined)).toBe(true);
      expect(isPrimitive(42)).toBe(true);
      expect(isPrimitive('string')).toBe(true);
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(Symbol())).toBe(true);
    });

    it('should return false for objects', () => {
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive([])).toBe(false);
    });
  });

  describe('isFalsy', () => {
    it('should return true for falsy values', () => {
      expect(isFalsy(false)).toBe(true);
      expect(isFalsy(0)).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy(undefined)).toBe(true);
    });

    it('should return false for truthy values', () => {
      expect(isFalsy(true)).toBe(false);
      expect(isFalsy(1)).toBe(false);
      expect(isFalsy('hello')).toBe(false);
    });
  });

  describe('isTruthy', () => {
    it('should return true for truthy values', () => {
      expect(isTruthy(true)).toBe(true);
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy('hello')).toBe(true);
      expect(isTruthy({})).toBe(true);
    });

    it('should return false for falsy values', () => {
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy(0)).toBe(false);
      expect(isTruthy('')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Set())).toBe(true);
    });

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('getType', () => {
    it('should return correct type strings', () => {
      expect(getType(null)).toBe('null');
      expect(getType(undefined)).toBe('undefined');
      expect(getType(42)).toBe('number');
      expect(getType('string')).toBe('string');
      expect(getType(true)).toBe('boolean');
      expect(getType([])).toBe('array');
      expect(getType({})).toBe('object');
      expect(getType(new Date())).toBe('date');
      expect(getType(/test/)).toBe('regexp');
      expect(getType(new Error())).toBe('error');
      expect(getType(new Map())).toBe('map');
      expect(getType(new Set())).toBe('set');
      expect(getType(Promise.resolve())).toBe('promise');
      expect(getType(() => { })).toBe('function');
    });
  });
});
