/**
 * 类名工具测试
 */

import { describe, it, expect } from 'vitest';
import { cn, createBEM, createNamespace, conditionalClass, uniqueClasses } from '../classnames';

describe('classnames', () => {
  describe('cn', () => {
    it('should merge string class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should filter out falsy values', () => {
      expect(cn('foo', undefined, 'bar', null, false)).toBe('foo bar');
    });

    it('should handle object with boolean values', () => {
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    });

    it('should handle arrays', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar');
    });

    it('should handle nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz');
    });

    it('should handle numbers', () => {
      expect(cn('foo', 123)).toBe('foo 123');
    });

    it('should return empty string for no arguments', () => {
      expect(cn()).toBe('');
    });

    it('should handle mixed inputs', () => {
      expect(cn('foo', { bar: true }, ['baz', { qux: true }])).toBe('foo bar baz qux');
    });
  });

  describe('createBEM', () => {
    it('should return block name when called without arguments', () => {
      const bem = createBEM('button');
      expect(bem()).toBe('button');
    });

    it('should return element name', () => {
      const bem = createBEM('button');
      expect(bem('icon')).toBe('button__icon');
    });

    it('should return element with modifier', () => {
      const bem = createBEM('button');
      expect(bem('icon', 'large')).toBe('button__icon--large');
    });

    it('should handle modifiers object', () => {
      const bem = createBEM('button');
      expect(bem({ disabled: true, loading: false })).toBe('button button--disabled');
    });
  });

  describe('createNamespace', () => {
    it('should return namespaced component name', () => {
      const ns = createNamespace('taro-uno');
      expect(ns('button')).toBe('taro-uno-button');
    });

    it('should return namespaced component with modifier', () => {
      const ns = createNamespace('taro-uno');
      expect(ns('button', 'primary')).toBe('taro-uno-button taro-uno-button--primary');
    });

    it('should handle modifiers object', () => {
      const ns = createNamespace('taro-uno');
      expect(ns('button', { primary: true, disabled: false })).toBe('taro-uno-button taro-uno-button--primary');
    });
  });

  describe('conditionalClass', () => {
    it('should return class name when condition is true', () => {
      expect(conditionalClass('active', true)).toBe('active');
    });

    it('should return empty string when condition is false', () => {
      expect(conditionalClass('active', false)).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(conditionalClass('active', null)).toBe('');
      expect(conditionalClass('active', undefined)).toBe('');
    });
  });

  describe('uniqueClasses', () => {
    it('should merge and deduplicate classes', () => {
      expect(uniqueClasses('foo bar', 'bar baz')).toBe('foo bar baz');
    });

    it('should handle null and undefined', () => {
      expect(uniqueClasses('foo', null, 'bar', undefined)).toBe('foo bar');
    });

    it('should handle multiple spaces', () => {
      expect(uniqueClasses('foo  bar', 'baz')).toBe('foo bar baz');
    });
  });
});
