import type { CSSProperties } from 'react';

export const resultStyles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 32px',
    textAlign: 'center',
  },

  iconContainer: {
    marginBottom: '24px',
  },

  icon: {
    fontSize: '72px',
    fontWeight: 'bold',
    lineHeight: 1,
  },

  iconSuccess: {
    color: '#22c55e',
  },

  iconError: {
    color: '#ef4444',
  },

  iconInfo: {
    color: '#0ea5e9',
  },

  iconWarning: {
    color: '#f59e0b',
  },

  iconLoading: {
    color: '#6b7280',
  },

  icon404: {
    color: '#6b7280',
  },

  icon403: {
    color: '#6b7280',
  },

  icon500: {
    color: '#6b7280',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },

  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },

  subTitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.5,
    maxWidth: '400px',
  },

  children: {
    marginTop: '24px',
    width: '100%',
  },

  extra: {
    marginTop: '24px',
  },

  // Status variations
  success: {
    color: '#22c55e',
  },

  error: {
    color: '#ef4444',
  },

  info: {
    color: '#0ea5e9',
  },

  warning: {
    color: '#f59e0b',
  },

  loading: {
    color: '#6b7280',
  },

  // Size variations
  small: {
    padding: '24px 16px',
  },

  smallIcon: {
    fontSize: '48px',
  },

  smallTitle: {
    fontSize: '18px',
  },

  smallSubTitle: {
    fontSize: '14px',
  },

  large: {
    padding: '64px 48px',
  },

  largeIcon: {
    fontSize: '96px',
  },

  largeTitle: {
    fontSize: '32px',
  },

  largeSubTitle: {
    fontSize: '18px',
  },
};
