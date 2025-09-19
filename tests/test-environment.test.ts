import { describe, it, expect } from 'vitest';

describe('测试环境验证', () => {
  it('应该能正常执行测试', () => {
    expect(1 + 1).toBe(2);
  });

  it('应该能正常导入组件', () => {
    const mockComponent = () => 'test';
    expect(mockComponent()).toBe('test');
  });
});
