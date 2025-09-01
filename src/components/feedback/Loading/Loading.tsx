import React, { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import { LoadingProps, LoadingRef } from './Loading.types';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/utils';
import { LoadingStyles } from './Loading.styles';

export const Loading = forwardRef<LoadingRef, LoadingProps>((props, ref) => {
  const { type = 'spinner', size = 'default', color, text, delay = 0, className, style, ...rest } = props;

  const platform = usePlatform();
  const [visible, setVisible] = React.useState(delay > 0);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    setVisible(true);
  }, [delay]);

  const renderSpinner = () => {
    const spinnerClasses = cn(LoadingStyles.spinner, LoadingStyles.spinnerSize[size], color && `border-${color}-500`);

    return (
      <View className={spinnerClasses}>
        <View className={LoadingStyles.spinnerInner} />
      </View>
    );
  };

  const renderDots = () => {
    const dotClasses = cn(LoadingStyles.dot, LoadingStyles.dotSize[size], color && `bg-${color}-500`);

    return (
      <View className={LoadingStyles.dots}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            className={dotClasses}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </View>
    );
  };

  const renderPulse = () => {
    const pulseClasses = cn(LoadingStyles.pulse, LoadingStyles.pulseSize[size], color && `bg-${color}-500`);

    return (
      <View className={LoadingStyles.pulseContainer}>
        <View className={pulseClasses} />
      </View>
    );
  };

  const renderBars = () => {
    const barClasses = cn(LoadingStyles.bar, LoadingStyles.barSize[size], color && `bg-${color}-500`);

    return (
      <View className={LoadingStyles.bars}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className={barClasses}
            style={{
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

  const loadingClasses = cn(LoadingStyles.base, LoadingStyles.size[size], className);

  if (!visible) return null;

  return (
    <View ref={ref} className={loadingClasses} style={style} {...rest}>
      {renderContent()}
      {text && <Text className={LoadingStyles.text}>{text}</Text>}
    </View>
  );
});

Loading.displayName = 'Loading';
