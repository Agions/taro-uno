import React, { forwardRef } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { 
  TooltipProps, 
  TooltipRef, 
  TooltipTrigger,
  TooltipEventHandler
} from './Tooltip.types';
import { tooltipStyles } from './Tooltip.styles';

export const Tooltip = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const {
    title,
    trigger = 'hover',
    placement = 'top',
    arrow = true,
    visible: controlledVisible,
    defaultVisible = false,
    color,
    overlayStyle,
    overlayClassName,
    children,
    mouseEnterDelay = 100,
    mouseLeaveDelay = 100,
    clickOutsideToClose = true,
    alignPoint = false,
    className,
    style,
    onVisibleChange,
    onShow,
    onHide,
    animation: _animation, // Extract to avoid conflict with Taro.js View
    showDelay,
    hideDelay,
    popupStyle,
    disabled = false,
    ...rest
  } = props;

  const [internalVisible, setInternalVisible] = React.useState(defaultVisible);
  const [internalTitle, setInternalTitle] = React.useState(title);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const visibleRef = React.useRef(internalVisible);

  // Update ref when state changes
  React.useEffect(() => {
    visibleRef.current = internalVisible;
  }, [internalVisible]);

  // 处理受控模式
  const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  // 清除定时器
  const clearTimer = React.useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [timer]);

  // 设置定时器
  const setTimerCallback = React.useCallback((callback: () => void, delay: number) => {
    clearTimer();
    const newTimer = setTimeout(callback, delay);
    setTimer(newTimer);
  }, [clearTimer]);

  // 显示提示
  const showTooltip = React.useCallback(() => {
    if (!visibleRef.current) {
      setInternalVisible(true);
      onVisibleChange?.(true);
      onShow?.();
    }
  }, [onVisibleChange, onShow]);

  // 隐藏提示
  const hideTooltip = React.useCallback(() => {
    if (visibleRef.current) {
      setInternalVisible(false);
      onVisibleChange?.(false);
      onHide?.();
    }
  }, [onVisibleChange, onHide]);

  // 获取触发器数组
  const getTriggers = React.useCallback((triggers: TooltipTrigger | TooltipTrigger[]) => {
    return Array.isArray(triggers) ? triggers : [triggers];
  }, []);

  // 处理触摸开始（hover触发）
  const handleTouchStart = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('hover')) {
      const delay = showDelay !== undefined ? showDelay : mouseEnterDelay;
      setTimerCallback(showTooltip, delay);
    }
  }, [disabled, trigger, mouseEnterDelay, showDelay, showTooltip, setTimerCallback, getTriggers]);

  // 处理触摸结束（hover触发）
  const handleTouchEnd = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('hover')) {
      const delay = hideDelay !== undefined ? hideDelay : mouseLeaveDelay;
      setTimerCallback(hideTooltip, delay);
    }
  }, [disabled, trigger, mouseLeaveDelay, hideDelay, hideTooltip, setTimerCallback, getTriggers]);

  // 处理鼠标进入（hover触发 - web环境）
  const handleMouseEnter = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('hover')) {
      const delay = showDelay !== undefined ? showDelay : mouseEnterDelay;
      setTimerCallback(showTooltip, delay);
    }
  }, [disabled, trigger, mouseEnterDelay, showDelay, showTooltip, setTimerCallback, getTriggers]);

  // 处理鼠标离开（hover触发 - web环境）
  const handleMouseLeave = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('hover')) {
      const delay = hideDelay !== undefined ? hideDelay : mouseLeaveDelay;
      setTimerCallback(hideTooltip, delay);
    }
  }, [disabled, trigger, mouseLeaveDelay, hideDelay, hideTooltip, setTimerCallback, getTriggers]);

  // 处理点击
  const handleClick = React.useCallback((_event: ITouchEvent) => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('click')) {
      if (visible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  }, [disabled, trigger, visible, showTooltip, hideTooltip, getTriggers]);

  // 处理焦点
  const handleFocus = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('focus')) {
      showTooltip();
    }
  }, [disabled, trigger, showTooltip, getTriggers]);

  // 处理失焦
  const handleBlur = React.useCallback(() => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('focus')) {
      hideTooltip();
    }
  }, [disabled, trigger, hideTooltip, getTriggers]);

  // 处理长按（contextMenu触发）
  const handleLongPress = React.useCallback((_event: ITouchEvent) => {
    if (disabled) return;
    const triggers = getTriggers(trigger);
    if (triggers.includes('contextMenu')) {
      if (visible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  }, [disabled, trigger, visible, showTooltip, hideTooltip, getTriggers]);

  // 组件卸载时清除定时器
  React.useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // 更新标题
  React.useEffect(() => {
    setInternalTitle(title);
  }, [title]);

  // 暴露给外部的引用方法
  React.useImperativeHandle(ref, () => ({
    show: showTooltip,
    hide: hideTooltip,
    getVisible: () => visible,
    updateTitle: (newTitle: React.ReactNode) => {
      setInternalTitle(newTitle);
    },
    reposition: () => {
      // Taro环境中的重新定位逻辑
      console.log('Reposition tooltip - Taro environment');
    },
  }), [showTooltip, hideTooltip, visible]);

  // 渲染箭头
  const renderArrow = React.useCallback(() => {
    if (!arrow) return null;

    const arrowStyle = tooltipStyles['getArrowStyle'](placement, color, arrow);

    return <View style={arrowStyle} />;
  }, [arrow, placement, color]);

  // 渲染提示内容
  const renderTooltip = React.useCallback(() => {
    if (!visible || !internalTitle) return null;

    const tooltipStyle = tooltipStyles['getTooltipStyle'](placement, color, overlayStyle);
    const contentStyle = tooltipStyles['getContentStyle'](color);

    return (
      <View
        data-tooltip="true"
        style={tooltipStyle}
        className={overlayClassName}
        role="tooltip"
        aria-hidden={!visible}
        id="tooltip-content"
      >
        {renderArrow()}
        <View style={contentStyle}>
          <Text>{internalTitle}</Text>
        </View>
      </View>
    );
  }, [visible, placement, color, overlayStyle, overlayClassName, internalTitle, renderArrow]);

  // 获取容器事件处理器
  const getContainerEvents = React.useCallback(() => {
    const triggers = getTriggers(trigger);
    const events: Record<string, TooltipEventHandler> = {};

    if (triggers.includes('hover')) {
      events['onTouchStart'] = handleTouchStart;
      events['onTouchEnd'] = handleTouchEnd;
      events['onMouseEnter'] = handleMouseEnter;
      events['onMouseLeave'] = handleMouseLeave;
    }

    if (triggers.includes('click')) {
      events['onClick'] = handleClick;
    }

    if (triggers.includes('focus')) {
      events['onFocus'] = handleFocus;
      events['onBlur'] = handleBlur;
    }

    if (triggers.includes('contextMenu')) {
      events['onLongPress'] = handleLongPress;
    }

    return events;
  }, [trigger, getTriggers, handleTouchStart, handleTouchEnd, handleMouseEnter, handleMouseLeave, handleClick, handleFocus, handleBlur, handleLongPress]);

  const containerStyle = tooltipStyles['getContainerStyle'](style);
  const containerEvents = getContainerEvents();

  return (
    <View
      style={containerStyle}
      className={className}
      {...containerEvents}
      {...rest}
      aria-describedby={visible ? "tooltip-content" : undefined}
      aria-expanded={visible}
    >
      {children}
      {renderTooltip()}
    </View>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;