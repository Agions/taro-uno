/**
 * RichText Component Test
 * 富文本组件测试
 */

import { render } from '../../test-utils';
import { RichText } from '../../../src/components/display/RichText';
import { describe, test, expect } from 'vitest';

describe('RichText Component', () => {
  test('renders RichText with text content', () => {
    const richTextData = {
      type: 'div',
      children: [
        {
          type: 'p',
          children: [{ type: 'text', text: '这是一段测试文本' }],
        },
      ],
    };
    
    const { container } = render(<RichText content={richTextData} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders RichText with different text styles', () => {
    const richTextData = {
      type: 'div',
      children: [
        {
          type: 'p',
          children: [
            { type: 'text', text: '普通文本' },
            { type: 'text', text: '粗体文本', bold: true },
          ],
        },
      ],
    };
    
    const { container } = render(<RichText content={richTextData} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders RichText with image', () => {
    const richTextData = {
      type: 'div',
      children: [
        {
          type: 'img',
          src: 'https://example.com/test.jpg',
          alt: '测试图片',
        },
      ],
    };
    
    const { container } = render(<RichText content={richTextData} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders RichText with nested structure', () => {
    const richTextData = {
      type: 'div',
      children: [
        {
          type: 'div',
          children: [
            {
              type: 'p',
              children: [{ type: 'text', text: '嵌套段落' }],
            },
          ],
        },
      ],
    };
    
    const { container } = render(<RichText content={richTextData} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});