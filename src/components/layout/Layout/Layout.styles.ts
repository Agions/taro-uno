export const layoutStyles = {
  layout: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  layoutHasSider: {
    flexDirection: 'row' as const,
  },
  header: {
    height: 64,
    padding: '0 50px',
    lineHeight: '64px',
    background: '#001529',
    color: '#fff',
    position: 'relative' as const,
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: 24,
    minHeight: 280,
    background: '#fff',
    margin: '24px',
    borderRadius: 2,
  },
  footer: {
    padding: '24px 50px',
    color: 'rgba(0, 0, 0, 0.45)',
    textAlign: 'center' as const,
    background: '#f0f2f5',
  },
  sider: {
    background: '#001529',
    transition: 'all 0.2s',
    overflow: 'auto' as const,
    height: '100vh',
    position: 'fixed' as const,
    left: 0,
    top: 0,
    bottom: 0,
  },
  siderCollapsed: {
    width: 80,
  },
  siderExpanded: {
    width: 200,
  },
}

export const getLayoutStyle = (hasSider?: boolean) => {
  const style = { ...layoutStyles.layout }
  if (hasSider) {
    Object.assign(style, layoutStyles.layoutHasSider)
  }
  return style
}

export const getHeaderStyle = (customStyle?: React.CSSProperties) => {
  return { ...layoutStyles.header, ...customStyle }
}

export const getContentStyle = (customStyle?: React.CSSProperties) => {
  return { ...layoutStyles.content, ...customStyle }
}

export const getFooterStyle = (customStyle?: React.CSSProperties) => {
  return { ...layoutStyles.footer, ...customStyle }
}

export const getSiderStyle = (collapsed?: boolean, width?: number | string, customStyle?: React.CSSProperties) => {
  const style: React.CSSProperties = { ...layoutStyles.sider }
  if (collapsed) {
    Object.assign(style, layoutStyles.siderCollapsed)
  } else {
    Object.assign(style, layoutStyles.siderExpanded)
  }
  if (width) {
    style.width = width
  }
  return { ...style, ...customStyle }
}