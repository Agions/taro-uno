/**
 * Video Component Test
 * 视频组件测试
 */

import { render } from '../../test-utils';
import { Video } from '../../../src/components/basic/Video';
import { describe, test, expect } from 'vitest';

describe('Video Component', () => {
  test('renders Video with src', () => {
    const { container } = render(<Video src="https://example.com/test.mp4" />);
    const video = container.firstChild;
    expect(video).toBeInTheDocument();
  });

  test('renders Video with poster', () => {
    const { container } = render(<Video src="https://example.com/test.mp4" poster="https://example.com/poster.jpg" />);
    const video = container.firstChild;
    expect(video).toBeInTheDocument();
  });

  test('renders Video with controls', () => {
    const { container } = render(<Video src="https://example.com/test.mp4" controls />);
    const video = container.firstChild;
    expect(video).toBeInTheDocument();
  });

  test('renders Video with autoplay', () => {
    const { container } = render(<Video src="https://example.com/test.mp4" autoplay />);
    const video = container.firstChild;
    expect(video).toBeInTheDocument();
  });

  test('renders Video with loop', () => {
    const { container } = render(<Video src="https://example.com/test.mp4" loop />);
    const video = container.firstChild;
    expect(video).toBeInTheDocument();
  });
});