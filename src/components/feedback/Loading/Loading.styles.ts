import { CSSProperties } from 'react';

export const LoadingStyles: Record<string, CSSProperties | Record<string, CSSProperties>> = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  size: {
    xs: { fontSize: '12px' },
    sm: { fontSize: '14px' },
    default: { fontSize: '16px' },
    lg: { fontSize: '18px' },
    xl: { fontSize: '20px' },
  },

  spinner: {
    position: 'relative',
    width: 32,
    height: 32,
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  spinnerSize: {
    xs: { width: 16, height: 16, borderWidth: 2 },
    sm: { width: 24, height: 24, borderWidth: 3 },
    default: { width: 32, height: 32, borderWidth: 4 },
    lg: { width: 48, height: 48, borderWidth: 4 },
    xl: { width: 64, height: 64, borderWidth: 6 },
  },

  spinnerInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },

  dots: {
    display: 'flex',
    gap: 4,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'bounce 1.5s ease-in-out infinite',
  },

  dotSize: {
    xs: { width: 4, height: 4 },
    sm: { width: 6, height: 6 },
    default: { width: 8, height: 8 },
    lg: { width: 12, height: 12 },
    xl: { width: 16, height: 16 },
  },

  pulseContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pulse: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },

  pulseSize: {
    xs: { width: 16, height: 16 },
    sm: { width: 24, height: 24 },
    default: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 },
  },

  bars: {
    display: 'flex',
    gap: 4,
  },

  bar: {
    width: 4,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
    animation: 'pulse 1.5s ease-in-out infinite',
  },

  barSize: {
    xs: { width: 2, height: 16 },
    sm: { width: 4, height: 24 },
    default: { width: 4, height: 32 },
    lg: { width: 8, height: 48 },
    xl: { width: 12, height: 64 },
  },

  text: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
};
