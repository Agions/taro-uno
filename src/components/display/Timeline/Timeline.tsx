import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { timelineStyles } from './Timeline.styles';
import type { TimelineProps, TimelineRef, TimelineItemProps } from './Timeline.types';

/** 时间线项组件 */
export const TimelineItem: React.FC<TimelineItemProps & { 
  mode?: 'left' | 'right' | 'alternate';
  direction?: 'vertical' | 'horizontal';
  showTimestamp?: boolean;
  itemIndex?: number;
}> = ({
  title,
  children,
  description,
  timestamp,
  color = 'default',
  dot,
  position,
  isLast = false,
  mode = 'left',
  direction = 'vertical',
  showTimestamp = false,
  itemIndex = 0,
  style,
  className,
}) => {
  const isHorizontal = direction === 'horizontal';
  const isAlternate = mode === 'alternate';
  const isRightPosition = position === 'right' || (isAlternate && itemIndex % 2 === 1);

  const getItemStyle = () => {
    const baseStyle = {
      ...timelineStyles['item'],
      ...style,
    };

    if (isHorizontal) {
      Object.assign(baseStyle, timelineStyles['itemHorizontal']);
      if (isLast) {
        Object.assign(baseStyle, timelineStyles['itemLastHorizontal']);
      }
    } else if (isLast) {
      Object.assign(baseStyle, timelineStyles['itemLast']);
    }

    if (isAlternate && !isHorizontal) {
      if (isRightPosition) {
        Object.assign(baseStyle, timelineStyles['itemAlternateRight']);
      } else {
        Object.assign(baseStyle, timelineStyles['itemAlternateLeft']);
      }
    }

    return baseStyle;
  };

  const getLineStyle = () => {
    const baseStyle = isHorizontal 
      ? { ...timelineStyles['itemLineHorizontal'] }
      : { ...timelineStyles['itemLine'] };

    if (isLast) {
      Object.assign(baseStyle, timelineStyles['itemLineLast']);
    }

    if (isAlternate && !isHorizontal && isRightPosition) {
      Object.assign(baseStyle, timelineStyles['itemAlternateRightLine']);
    }

    return baseStyle;
  };

  const getDotStyle = () => {
    const baseStyle = isHorizontal 
      ? { ...timelineStyles['itemDotHorizontal'] }
      : { ...timelineStyles['itemDot'] };

    if (!dot) {
      const colorStyle = timelineStyles[`dot${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof timelineStyles];
      if (colorStyle) {
        Object.assign(baseStyle, colorStyle);
      } else {
        // 自定义颜色
        baseStyle.backgroundColor = color;
        baseStyle.boxShadow = `0 0 0 1px ${color}`;
      }
    }

    if (isAlternate && !isHorizontal && isRightPosition) {
      Object.assign(baseStyle, timelineStyles['itemAlternateRightDot']);
    }

    return baseStyle;
  };

  const getContentStyle = () => {
    const baseStyle = isHorizontal 
      ? { ...timelineStyles['itemContentHorizontal'] }
      : { ...timelineStyles['itemContent'] };

    if (isRightPosition && !isHorizontal) {
      if (isAlternate) {
        Object.assign(baseStyle, timelineStyles['itemAlternateRightContent']);
      } else {
        Object.assign(baseStyle, timelineStyles['itemContentRight']);
      }
    }

    return baseStyle;
  };

  return (
    <View style={getItemStyle()} className={className}>
      {/* 连线 */}
      <View style={getLineStyle()} />
      
      {/* 节点 */}
      {dot ? (
        <View style={{ ...timelineStyles['customDot'], ...getDotStyle() }}>
          {dot}
        </View>
      ) : (
        <View style={getDotStyle()} />
      )}
      
      {/* 内容 */}
      <View style={getContentStyle()}>
        {title && (
          <Text style={timelineStyles['itemTitle']}>
            {title}
          </Text>
        )}
        {description && (
          <Text style={timelineStyles['itemDescription']}>
            {description}
          </Text>
        )}
        {children}
        {showTimestamp && timestamp && (
          <Text style={timelineStyles['itemTimestamp']}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};

/** 时间线组件 */
export const TimelineComponent = forwardRef<TimelineRef, TimelineProps>((props, ref) => {
  const {
    items = [],
    mode = 'left',
    reverse = false,
    showTimestamp = false,
    direction = 'vertical',
    style,
    className,
    children,
    ...rest
  } = props;

  const elementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    getMode: () => mode,
    getDirection: () => direction,
    isReverse: () => reverse,
    getItemCount: () => items.length,
  }));

  const getTimelineStyle = () => {
    const baseStyle = {
      ...timelineStyles['base'],
      ...timelineStyles[direction],
      ...style,
    };

    if (reverse) {
      if (direction === 'horizontal') {
        Object.assign(baseStyle, timelineStyles['reverseHorizontal']);
      } else {
        Object.assign(baseStyle, timelineStyles['reverse']);
      }
    }

    return baseStyle;
  };

  const renderItems = () => {
    if (children) {
      return children;
    }

    const itemsToRender = reverse ? [...items].reverse() : items;

    return itemsToRender.map((item, index) => {
      const originalIndex = reverse ? items.length - 1 - index : index;
      const isLast = index === itemsToRender.length - 1;

      return (
        <TimelineItem
          key={originalIndex}
          {...item}
          mode={mode}
          direction={direction}
          showTimestamp={showTimestamp}
          itemIndex={originalIndex}
          isLast={isLast}
        />
      );
    });
  };

  return (
    <View
      ref={elementRef}
      style={getTimelineStyle()}
      className={className}
      {...rest}
    >
      {renderItems()}
    </View>
  );
});

TimelineComponent.displayName = 'Timeline';

// 创建复合组件类型
interface TimelineCompoundComponent extends React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<TimelineRef>> {
  Item: typeof TimelineItem;
}

export const Timeline = TimelineComponent as TimelineCompoundComponent;
Timeline.Item = TimelineItem;

export default Timeline;