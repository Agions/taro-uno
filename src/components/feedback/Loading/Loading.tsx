import React, { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '../../../utils';
import { LoadingStyles } from './Loading.styles';
import type { LoadingProps, LoadingRef } from './Loading.types';

export const Loading = forwardRef<LoadingRef, LoadingProps>((props, ref) => {
  const { type = 'spinner', size = 'default', text, delay = 0, style, ...rest } = props;

  const [visible, setVisible] = React.useState(delay === 0);
  const elementRef = React.useRef<any>(null);

  React.useImperativeHandle(ref, () => ({
    getElement: () => elementRef.current,
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    setVisible(true);
    return undefined;
  }, [delay]);

  const renderSpinner = () => {
    const baseSpinnerStyle = LoadingStyles['spinner'] as React.CSSProperties;
    const sizeStyle = (LoadingStyles['spinnerSize'] as any)[size] as React.CSSProperties;
    const spinnerStyle = { ...baseSpinnerStyle, ...sizeStyle };

    return (
      <View style={spinnerStyle}>
        <View style={LoadingStyles['spinnerInner'] as React.CSSProperties} />
      </View>
    );
  };

  const renderDots = () => {
    const baseDotStyle = LoadingStyles['dot'] as React.CSSProperties;
    const sizeStyle = (LoadingStyles['dotSize'] as any)[size] as React.CSSProperties;
    const dotStyle = { ...baseDotStyle, ...sizeStyle };

    return (
      <View style={LoadingStyles['dots'] as React.CSSProperties}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={{
              ...dotStyle,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </View>
    );
  };

  const renderPulse = () => {
    const basePulseStyle = LoadingStyles['pulse'] as React.CSSProperties;
    const sizeStyle = (LoadingStyles['pulseSize'] as any)[size] as React.CSSProperties;
    const pulseStyle = { ...basePulseStyle, ...sizeStyle };

    return (
      <View style={LoadingStyles['pulseContainer'] as React.CSSProperties}>
        <View style={pulseStyle} />
      </View>
    );
  };

  const renderBars = () => {
    const baseBarStyle = LoadingStyles['bar'] as React.CSSProperties;
    const sizeStyle = (LoadingStyles['barSize'] as any)[size] as React.CSSProperties;
    const barStyle = { ...baseBarStyle, ...sizeStyle };

    return (
      <View style={LoadingStyles['bars'] as React.CSSProperties}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={{
              ...barStyle,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  const loadingClasses = cn('taro-uno-loading', `taro-uno-loading--${size}`, rest.className);

  if (!visible) return null;

  return (
    <View
      ref={elementRef}
      className={loadingClasses}
      style={{ ...(LoadingStyles['base'] as React.CSSProperties), ...style }}
      {...rest}
    >
      {renderContent()}
      {text && <Text style={LoadingStyles['text'] as React.CSSProperties}>{text}</Text>}
    </View>
  );
});

Loading.displayName = 'Loading';

export default Loading;
