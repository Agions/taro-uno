import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Contract schema for doc page
const DocSchema = z.object({
  route: z.string(),
  title: z.string(),
  contentType: z.enum(['mdx', 'markdown']),
  componentsLinked: z.array(z.string()),
  hasDemo: z.boolean(),
  hasApiTable: z.boolean(),
  hasPlatformNotes: z.boolean(),
});

// Contract tests for docs structure validation
describe('Doc Schema Contract', () => {
  it('should validate Button doc structure', () => {
    const buttonDoc = {
      route: '/components/basic/button',
      title: 'Button',
      contentType: 'mdx',
      componentsLinked: ['Button'],
      hasDemo: true,
      hasApiTable: true,
      hasPlatformNotes: true,
    };
    expect(() => DocSchema.parse(buttonDoc)).not.toThrow();
  });

  it('should validate Modal doc structure', () => {
    const modalDoc = {
      route: '/components/feedback/modal',
      title: 'Modal',
      contentType: 'markdown',
      componentsLinked: ['Modal'],
      hasDemo: true,
      hasApiTable: true,
      hasPlatformNotes: true,
    };
    expect(() => DocSchema.parse(modalDoc)).not.toThrow();
  });

  it('should validate home page structure', () => {
    const homeDoc = {
      route: '/',
      title: 'Taro Uno UI',
      contentType: 'mdx',
      componentsLinked: [],
      hasDemo: false,
      hasApiTable: false,
      hasPlatformNotes: false,
    };
    expect(() => DocSchema.parse(homeDoc)).not.toThrow();
  });
});