import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { LayoutProps, LayoutRef } from './Layout.types';
import { getLayoutStyle } from './Layout.styles';

export const Layout = forwardRef<LayoutRef, LayoutProps>(({ className, style, children, hasSider, ...props }, ref) => {
  const layoutRef = React.useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getLayout: () => layoutRef.current,
  }));

  const layoutStyle = getLayoutStyle(hasSider);
  const finalStyle = {
    ...layoutStyle,
    ...style,
  };

  return (
    <View ref={layoutRef} className={className} style={finalStyle} {...props}>
      {children}
    </View>
  );
});

Layout.displayName = 'Layout';

export default Layout;
