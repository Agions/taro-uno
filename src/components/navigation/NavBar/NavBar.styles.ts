/**
 * NavBar样式工具
 */

export const navBarStyles = {
  /** 容器样式 */
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
  },

  /** 固定定位样式 */
  fixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },

  /** 透明背景样式 */
  transparent: {
    backgroundColor: 'transparent',
  },

  /** 边框样式 */
  border: {
    borderBottom: '1px solid #f0f0f0',
  },

  /** 占位元素样式 */
  placeholder: {
    height: '44px',
    backgroundColor: 'transparent',
  },

  /** 内容区域样式 */
  content: {
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    boxSizing: 'border-box',
  },

  /** 安全区域适配样式 */
  safeArea: {
    paddingTop: '44px',
  },

  /** 左侧区域样式 */
  left: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '60px',
    maxWidth: '120px',
  },

  /** 右侧区域样式 */
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '60px',
    maxWidth: '120px',
  },

  /** 中间区域样式 */
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
    overflow: 'hidden',
  },

  /** 标题样式 */
  title: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  /** 返回按钮样式 */
  backArrow: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  },

  /** 返回按钮悬停样式 */
  backArrowHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },

  /** 返回图标样式 */
  backIcon: {
    fontSize: '16px',
    color: '#000000',
  },

  /** 暗色主题样式 */
  dark: {
    backgroundColor: '#1a1a1a',
    '& .taro-uno-navbar__title': {
      color: '#ffffff',
    },
    '& .taro-uno-navbar__back-icon': {
      color: '#ffffff',
    },
    '&.taro-uno-navbar--border': {
      borderBottomColor: '#333333',
    },
  },
} as const;
