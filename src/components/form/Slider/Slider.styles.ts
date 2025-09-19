import type { CSSProperties } from 'react';

export const sliderStyles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  
  vertical: {
    width: '24px' as any,
    height: '200px' as any,
    flexDirection: 'column' as 'column',
  },
  
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  
  track: {
    position: 'absolute',
    width: '100%',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
  },
  
  trackFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: '2px',
    left: 0,
    top: 0,
  },
  
  handle: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    backgroundColor: '#ffffff',
    border: '2px solid #0ea5e9',
    borderRadius: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'grab',
    transition: 'all 0.2s ease-in-out',
    zIndex: 2,
  },
  
  handleDragging: {
    transform: 'translate(-50%, -50%) scale(1.2)',
    boxShadow: '0 0 0 8px rgba(14, 165, 233, 0.2)',
  },
  
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },
  
  marks: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  mark: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  markDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#9ca3af',
    borderRadius: '50%',
    marginBottom: '4px',
  },
  
  markLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  },
  
  // Vertical styles
  verticalTrack: {
    width: '4px',
    height: '100%',
  },

  verticalTrackFill: {
    width: '100%',
    height: 'auto',
    bottom: 0,
    top: 'auto',
  },

  verticalHandle: {
    left: '50%',
    top: 'auto',
  },

  verticalMark: {
    flexDirection: 'row',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  verticalMarkDot: {
    width: '8px',
    height: '8px',
    marginLeft: '4px',
    marginBottom: 0,
  },

  verticalMarkLabel: {
    marginLeft: '4px',
    marginTop: 0,
  },
};