import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { LayoutHeaderProps, LayoutHeaderRef } from './Layout.types';
import { getHeaderStyle } from './Layout.styles';

export const LayoutHeader = forwardRef<LayoutHeaderRef, LayoutHeaderProps>(
  ({ className, style, children, ...props }, ref) => {
    const headerRef = React.useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getHeader: () => headerRef.current,
    }));

    const headerStyle = getHeaderStyle(style);
    const finalStyle = {
      ...headerStyle,
      ...style,
    };

    return (
      <View ref={headerRef} className={className} style={finalStyle} {...props}>
        {children}
      </View>
    );
  },
);

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
