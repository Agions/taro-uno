/**
 * 虚拟列表样式配置
 */

import type { CSSProperties } from 'react';

export interface VirtualListStylesType {
  container: CSSProperties;
  viewport: CSSProperties;
  content: CSSProperties;
  item: CSSProperties;
  loading: CSSProperties;
  empty: CSSProperties;
  error: CSSProperties;
}

export const virtualListStyles: VirtualListStylesType = {
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  viewport: {
    position: 'relative',
    overflow: 'auto',
    height: '100%',
  },
  content: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    color: '#666',
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    color: '#ff4d4f',
  },
};

export default virtualListStyles;