import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { LayoutFooterProps, LayoutFooterRef } from './Layout.types';
import { getFooterStyle } from './Layout.styles';

export const LayoutFooter = forwardRef<LayoutFooterRef, LayoutFooterProps>(
  ({ className, style, children, ...props }, ref) => {
    const footerRef = React.useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getFooter: () => footerRef.current,
    }));

    const footerStyle = getFooterStyle(style);
    const finalStyle = {
      ...footerStyle,
      ...style,
    };

    return (
      <View ref={footerRef} className={className} style={finalStyle} {...props}>
        {children}
      </View>
    );
  },
);

LayoutFooter.displayName = 'LayoutFooter';

export default LayoutFooter;
