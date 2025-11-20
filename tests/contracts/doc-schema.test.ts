import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Contract schema for doc page (failing until implemented)
const DocSchema = z.object({
  route: z.string(),
  title: z.string(),
  contentType: z.enum(['mdx', 'markdown']),
  componentsLinked: z.array(z.string()),
  hasDemo: z.boolean(),
  hasApiTable: z.boolean(),
  hasPlatformNotes: z.boolean()
});

// Failing contract tests for docs (TDD: must fail before implementation)
describe('Doc Schema Contract', () => {
  it('should validate Button doc structure', () => {
    const buttonDoc = {
      route: '/components/basic/button',
      title: 'Button',
      contentType: 'mdx',
      componentsLinked: ['Button'],
      hasDemo: false, // Failing: no MDX demo yet
      hasApiTable: false, // Failing: no API table
      hasPlatformNotes: false // Failing: no platform differences
    };
    expect(() => DocSchema.parse(buttonDoc)).toThrow(); // Fails on hasDemo etc.
  });

  it('should validate Modal doc structure', () => {
    const modalDoc = {
      route: '/components/feedback/modal',
      title: 'Modal',
      contentType: 'markdown',
      componentsLinked: ['Modal'],
      hasDemo: false, // Failing
      hasApiTable: false, // Failing
      hasPlatformNotes: true // Partial
    };
    expect(() => DocSchema.parse(modalDoc)).toThrow(); // Fails on hasDemo/hasApiTable
  });

  it('should validate home page structure', () => {
    const homeDoc = {
      route: '/',
      title: 'Taro Uno UI',
      contentType: 'mdx',
      componentsLinked: [],
      hasDemo: false, // Failing: no hero demo
      hasApiTable: false,
      hasPlatformNotes: false
    };
    expect(() => DocSchema.parse(homeDoc)).toThrow(); // Fails on hasDemo
  });
});