import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { 
  ProgressProps, 
  ProgressRef, 
  ProgressStatus,
  ProgressLineCap,
} from './Progress.types';
import { 
  getLineStyle, 
  getCircleStyle, 
  getDashboardStyle, 
  getInfoStyle, 
  getContainerStyle,
  getSvgStyle,
} from './Progress.styles';
import { 
  createProgressAnimation, 
  easingFunctions,
} from './utils/animation';
import {
  validatePercent,
  formatProgressValue,
  calculateProgressStatus,
} from './utils/progress-calculator';

interface SVGCircleProps {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke: string;
  strokeWidth: number;
  strokeLinecap?: ProgressLineCap;
  strokeDasharray?: number;
  strokeDashoffset?: number;
  transform?: string;
  transformOrigin?: string;
  style?: React.CSSProperties;
}

const SVGCircle: React.FC<SVGCircleProps> = React.memo(({
  cx,
  cy,
  r,
  fill = 'none',
  stroke,
  strokeWidth,
  strokeLinecap = 'round',
  strokeDasharray,
  strokeDashoffset,
  transform,
  transformOrigin,
  style,
}) => {
  const circleProps = {
    cx,
    cy,
    r,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeDasharray,
    strokeDashoffset,
    transform,
    transformOrigin,
    style,
  };

  return <circle {...circleProps} />;
});

SVGCircle.displayName = 'SVGCircle';

export const Progress = forwardRef<ProgressRef, ProgressProps>((props, ref) => {
  const {
    type = 'line',
    percent = 0,
    status: propStatus,
    size = 'default',
    strokeWidth: customStrokeWidth,
    strokeColor,
    trailColor,
    showInfo = true,
    format,
    className,
    style,
    title,
    description,
    gapDegree = 75,
    gapPosition = 'top',
    animationDuration = 300,
    animated = true,
    strokeLinecap = 'round',
    segments,
    successPercent,
    theme,
    events,
    ariaLabel,
    ariaDescribedby,
    children,
    ...rest
  } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  // State
  const [internalPercent, setInternalPercent] = React.useState(() => validatePercent(percent));
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [status, setStatus] = React.useState<ProgressStatus>(() =>
    propStatus || (calculateProgressStatus(internalPercent, 'normal') as ProgressStatus)
  );

  // 优化后的动画处理
  const animateProgress = useCallback((targetPercent: number) => {
    if (animationRef.current) {
      animationRef.current.cancel();
    }

    const validatedTarget = validatePercent(targetPercent);
    
    if (animated && Math.abs(validatedTarget - internalPercent) > 0.1) {
      setIsAnimating(true);
      events?.onAnimationStart?.();

      animationRef.current = createProgressAnimation(
        internalPercent,
        validatedTarget,
        (newPercent) => {
          setInternalPercent(newPercent);
          events?.onChange?.(newPercent);
        },
        {
          duration: animationDuration,
          easing: easingFunctions.easeInOut,
          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            setIsAnimating(false);
            events?.onAnimationEnd?.();
            
            if (validatedTarget >= 100) {
              setStatus('success');
              events?.onComplete?.();
            }
          },
        }
      );

      animationRef.current.start();
    } else {
      setInternalPercent(validatedTarget);
      events?.onChange?.(validatedTarget);
      
      if (validatedTarget >= 100) {
        setStatus('success');
        events?.onComplete?.();
      }
    }
  }, [internalPercent, animated, animationDuration, events]);

  // 处理外部percent变化
  useEffect(() => {
    const validatedPercent = validatePercent(percent);
    if (Math.abs(validatedPercent - internalPercent) > 0.1) {
      animateProgress(validatedPercent);
    }
  }, [percent, internalPercent, animateProgress]);

  // 处理外部status变化
  useEffect(() => {
    if (propStatus) {
      setStatus(propStatus);
    }
  }, [propStatus]);

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  // 格式化进度信息
  const formatProgress = useCallback((percentValue: number): React.ReactNode => {
    return formatProgressValue(percentValue, format);
  }, [format]);

  // 获取当前进度条颜色
  const getProgressColor = useCallback(() => {
    if (strokeColor) {
      return typeof strokeColor === 'string' ? strokeColor : theme?.primaryColor || '#1890ff';
    }
    
    const statusColors = {
      normal: theme?.primaryColor || '#1890ff',
      success: theme?.successColor || '#52c41a',
      exception: theme?.errorColor || '#ff4d4f',
      active: theme?.warningColor || '#faad14',
    };
    
    return statusColors[status];
  }, [strokeColor, status, theme]);

  // 渲染线型进度条
  const renderLineProgress = useCallback(() => {
    const lineStyles = getLineStyle({
      strokeWidth: customStrokeWidth,
      trailColor,
      strokeColor: getProgressColor(),
      status,
      animated,
      strokeLinecap,
      theme,
    });

    return (
      <View style={getContainerStyle('line', style)} className={`progress-line ${className || ''}`}>
        <View style={lineStyles['outer']}>
          <View
            style={{
              ...lineStyles['inner'],
              width: `${internalPercent}%`,
            }}
          />
        </View>
        {showInfo && (
          <Text style={getInfoStyle(size)} className="line-info">
            {formatProgress(internalPercent)}
          </Text>
        )}
      </View>
    );
  }, [
    customStrokeWidth,
    trailColor,
    getProgressColor,
    status,
    animated,
    strokeLinecap,
    theme,
    style,
    className,
    showInfo,
    size,
    formatProgress,
    internalPercent,
  ]);

  // 渲染圆形进度条
  const renderCircleProgress = useCallback(() => {
    const circleStyles = getCircleStyle({
      size,
      strokeWidth: customStrokeWidth,
      trailColor,
      strokeColor: getProgressColor(),
      status,
      percent: internalPercent,
      animated,
      strokeLinecap,
      theme,
    });

    const svgStyle = getSvgStyle(circleStyles['outer'].width);

    return (
      <View style={getContainerStyle('circle', style)} className={`progress-circle ${className || ''}`}>
        <View style={circleStyles['outer']}>
          <svg width={circleStyles['outer'].width} height={circleStyles['outer'].height} style={svgStyle}>
            <SVGCircle
              cx={circleStyles['trail'].cx}
              cy={circleStyles['trail'].cy}
              r={circleStyles['trail'].r}
              stroke={circleStyles['trail'].stroke}
              strokeWidth={circleStyles['trail'].strokeWidth}
              strokeLinecap={strokeLinecap}
            />
            <SVGCircle
              cx={circleStyles['path'].cx}
              cy={circleStyles['path'].cy}
              r={circleStyles['path'].r}
              stroke={circleStyles['path'].stroke}
              strokeWidth={circleStyles['path'].strokeWidth}
              strokeLinecap={strokeLinecap}
              strokeDasharray={circleStyles['path'].strokeDasharray}
              strokeDashoffset={circleStyles['path'].strokeDashoffset}
              transform={circleStyles['path'].transform}
              transformOrigin={circleStyles['path'].transformOrigin}
            />
          </svg>
          {showInfo && (
            <View style={circleStyles['inner']}>
              <Text style={getInfoStyle(size)}>
                {formatProgress(internalPercent)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }, [
    size,
    customStrokeWidth,
    trailColor,
    getProgressColor,
    status,
    internalPercent,
    animated,
    strokeLinecap,
    theme,
    style,
    className,
    showInfo,
    formatProgress,
  ]);

  // 渲染仪表盘进度条
  const renderDashboardProgress = useCallback(() => {
    const dashboardStyles = getDashboardStyle({
      size,
      strokeWidth: customStrokeWidth,
      trailColor,
      strokeColor: getProgressColor(),
      status,
      percent: internalPercent,
      gapDegree,
      gapPosition,
      animated,
      strokeLinecap,
      theme,
    });

    const svgStyle = getSvgStyle(dashboardStyles['outer'].width);

    return (
      <View style={getContainerStyle('dashboard', style)} className={`progress-dashboard ${className || ''}`}>
        <View style={dashboardStyles['outer']}>
          <svg width={dashboardStyles['outer'].width} height={dashboardStyles['outer'].height} style={svgStyle}>
            <SVGCircle
              cx={dashboardStyles['trail'].cx}
              cy={dashboardStyles['trail'].cy}
              r={dashboardStyles['trail'].r}
              stroke={dashboardStyles['trail'].stroke}
              strokeWidth={dashboardStyles['trail'].strokeWidth}
              strokeLinecap={strokeLinecap}
              strokeDasharray={dashboardStyles['trail'].strokeDasharray}
              strokeDashoffset={dashboardStyles['trail'].strokeDashoffset}
              transform={dashboardStyles['trail'].transform}
              transformOrigin={dashboardStyles['trail'].transformOrigin}
            />
            <SVGCircle
              cx={dashboardStyles['path'].cx}
              cy={dashboardStyles['path'].cy}
              r={dashboardStyles['path'].r}
              stroke={dashboardStyles['path'].stroke}
              strokeWidth={dashboardStyles['path'].strokeWidth}
              strokeLinecap={strokeLinecap}
              strokeDasharray={dashboardStyles['path'].strokeDasharray}
              strokeDashoffset={dashboardStyles['path'].strokeDashoffset}
              transform={dashboardStyles['path'].transform}
              transformOrigin={dashboardStyles['path'].transformOrigin}
            />
          </svg>
          {showInfo && (
            <View style={dashboardStyles['inner']}>
              <Text style={getInfoStyle(size)}>
                {formatProgress(internalPercent)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }, [
    size,
    customStrokeWidth,
    trailColor,
    getProgressColor,
    status,
    internalPercent,
    gapDegree,
    gapPosition,
    animated,
    strokeLinecap,
    theme,
    style,
    className,
    showInfo,
    formatProgress,
  ]);

  // 根据类型渲染不同的进度条
  const renderProgress = useCallback(() => {
    switch (type) {
      case 'line':
        return renderLineProgress();
      case 'circle':
        return renderCircleProgress();
      case 'dashboard':
        return renderDashboardProgress();
      default:
        return renderLineProgress();
    }
  }, [type, renderLineProgress, renderCircleProgress, renderDashboardProgress]);

  // 暴露给ref的方法
  React.useImperativeHandle(ref, () => ({
    getPercent: () => internalPercent,
    getProgress: () => internalPercent,
    setProgress: (newPercent: number) => {
      animateProgress(newPercent);
    },
    setPercent: (newPercent: number) => {
      animateProgress(newPercent);
    },
    reset: () => {
      animateProgress(0);
      setStatus('normal');
    },
    start: () => {
      setIsAnimating(true);
      events?.onAnimationStart?.();
    },
    startAnimation: () => {
      setIsAnimating(true);
      events?.onAnimationStart?.();
    },
    pause: () => {
      if (animationRef.current) {
        animationRef.current.pause();
        setIsAnimating(false);
      }
    },
    stopAnimation: () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        setIsAnimating(false);
      }
    },
    complete: () => {
      animateProgress(100);
    },
    getElement: () => containerRef.current,
    getStatus: () => status,
    setStatus: (newStatus: ProgressStatus) => {
      setStatus(newStatus);
    },
    isAnimating: () => isAnimating,
  }));

  // Taro.js doesn't support aria attributes directly
  // We'll use basic accessibility properties if available
  // Generate CSS classes for testing
  const progressClasses = [
    className,
    `taro-uno-h5-progress`,
    type && `taro-uno-h5-progress--${type}`,
    status && `taro-uno-h5-progress--${status}`,
    size && `taro-uno-h5-progress--${size}`,
    animated && `taro-uno-h5-progress--animated`,
  ].filter(Boolean).join(' ');

  // Generate accessibility attributes
  const accessibilityProps = {
    accessibilityRole: 'progressbar',
    accessibilityValue: { min: 0, max: 100, now: internalPercent },
    accessibilityLabel: ariaLabel || `${internalPercent}%`,
  };

  // Merge custom styles with default container style
  const containerStyle = {
    ...getContainerStyle(type, style),
    ...style,
  };

  return (
    <View
      ref={containerRef}
      className={progressClasses}
      style={containerStyle}
      {...accessibilityProps}
      {...rest}
    >
      {title && (
        <Text style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
          {title}
        </Text>
      )}
      {renderProgress()}
      {description && (
        <Text style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
});

Progress.displayName = 'Progress';

export default Progress;