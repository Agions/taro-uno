import type { CSSProperties } from 'react';

export const uploadStyles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
  },

  uploadArea: {
    marginBottom: '16px',
  },

  dragArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '32px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    transition: 'border-color 0.2s ease-in-out',
    cursor: 'pointer',
  },

  dragDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  dragContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },

  dragText: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '8px',
  },

  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
  },

  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },

  fileName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
  },

  fileSize: {
    fontSize: '12px',
    color: '#6b7280',
  },

  fileStatus: {
    fontSize: '12px',
    color: '#0ea5e9',
  },

  fileError: {
    color: '#ef4444',
  },

  fileActions: {
    display: 'flex',
    gap: '8px',
  },

  // Picture card style
  pictureCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '8px',
  },

  pictureCardItem: {
    position: 'relative',
    width: '100px',
    height: '100px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    overflow: 'hidden',
  },

  pictureCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  pictureCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  // Progress bar
  progress: {
    width: '100%',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '8px',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    transition: 'width 0.2s ease-in-out',
  },
};
