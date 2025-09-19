import { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback, Children } from 'react';
import { View, Text } from '@tarojs/components';
import { carouselStyles } from './Carousel.styles';
import type { CarouselProps, CarouselRef } from './Carousel.types';

/** 轮播图组件 */
export const CarouselComponent = forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const {
    children,
    autoplay = false,
    interval = 3000,
    showDots = true,
    showArrows = true,
    infinite = true,
    effect = 'slide',
    dotsPosition = 'bottom',
    slidesToShow = 1,
    slidesToScroll = 1,
    vertical = false,
    activeIndex,
    defaultActiveIndex = 0,
    beforeChange,
    afterChange,
    style,
    className,
    ...rest
  } = props;

  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? defaultActiveIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // isHovered removed as mouse events are not supported in Taro.js
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<any>(null);

  const childrenArray = Children.toArray(children);
  const totalSlides = childrenArray.length;

  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    getCurrentIndex: () => currentIndex,
    goTo: (index: number) => goToSlide(index),
    prev: () => goPrev(),
    next: () => goNext(),
    play: () => startAutoplay(),
    pause: () => stopAutoplay(),
    getTotal: () => totalSlides,
  }));

  const startAutoplay = useCallback(() => {
    if (autoplay && totalSlides > 1) {
      timerRef.current = setInterval(() => {
        goNext();
      }, interval);
    }
  }, [autoplay, totalSlides, interval]);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (activeIndex !== undefined) {
      setCurrentIndex(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || totalSlides <= 1) return;

    const validIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    if (validIndex === currentIndex) return;

    beforeChange?.(currentIndex, validIndex);
    
    setIsTransitioning(true);
    setCurrentIndex(validIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
      afterChange?.(validIndex);
    }, 300);
  }, [currentIndex, totalSlides, isTransitioning, beforeChange, afterChange]);

  const goPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    
    let newIndex;
    if (infinite) {
      newIndex = currentIndex <= 0 ? totalSlides - 1 : currentIndex - slidesToScroll;
    } else {
      newIndex = Math.max(0, currentIndex - slidesToScroll);
    }
    
    goToSlide(newIndex);
  }, [currentIndex, totalSlides, infinite, slidesToScroll, goToSlide]);

  const goNext = useCallback(() => {
    if (totalSlides <= 1) return;
    
    let newIndex;
    if (infinite) {
      newIndex = currentIndex >= totalSlides - 1 ? 0 : currentIndex + slidesToScroll;
    } else {
      newIndex = Math.min(totalSlides - 1, currentIndex + slidesToScroll);
    }
    
    goToSlide(newIndex);
  }, [currentIndex, totalSlides, infinite, slidesToScroll, goToSlide]);

  // Mouse event handlers removed as they're not supported in Taro.js

  const getTransform = () => {
    if (effect === 'fade') return 'none';
    
    const translateValue = -(currentIndex * (100 / slidesToShow));
    return vertical 
      ? `translateY(${translateValue}%)`
      : `translateX(${translateValue}%)`;
  };

  const getWrapperStyle = () => {
    const baseStyle = {
      ...carouselStyles['wrapper'],
      transform: getTransform(),
    };

    if (vertical) {
      Object.assign(baseStyle, carouselStyles['wrapperVertical']);
    }

    if (isTransitioning && effect === 'slide') {
      // transition 已在基础样式中定义
    } else if (effect === 'fade') {
      Object.assign(baseStyle, carouselStyles['wrapperNoTransition']);
    }

    return baseStyle;
  };

  const getSlideStyle = (index: number) => {
    const baseStyle = { ...carouselStyles['slide'] };

    if (slidesToShow > 1) {
      if (vertical) {
        Object.assign(baseStyle, carouselStyles['slideVertical']);
      } else {
        Object.assign(baseStyle, carouselStyles['slideMultiple']);
      }
      // CSS variable assignment removed for Taro.js compatibility
    }

    if (effect === 'fade') {
      Object.assign(baseStyle, carouselStyles['slideFade']);
      if (index === currentIndex) {
        Object.assign(baseStyle, carouselStyles['slideFadeActive']);
      }
    }

    return baseStyle;
  };

  const renderDots = () => {
    if (!showDots || totalSlides <= 1) return null;

    const dotsStyle = {
      ...carouselStyles['dots'],
      ...carouselStyles[`dots${dotsPosition.charAt(0).toUpperCase() + dotsPosition.slice(1)}` as keyof typeof carouselStyles],
    };

    return (
      <View style={dotsStyle}>
        {Array.from({ length: totalSlides }, (_, index) => (
          <View
            key={index}
            style={{
              ...carouselStyles['dot'],
              ...(index === currentIndex ? carouselStyles['dotActive'] : {}),
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </View>
    );
  };

  const renderArrows = () => {
    if (!showArrows || totalSlides <= 1) return null;

    const canGoPrev = infinite || currentIndex > 0;
    const canGoNext = infinite || currentIndex < totalSlides - 1;

    return (
      <>
        <View
          style={{
            ...carouselStyles['arrows'],
            ...(vertical ? carouselStyles['arrowVertical'] : {}),
            ...(vertical ? carouselStyles['arrowVerticalPrev'] : carouselStyles['arrowPrev']),
          }}
        >
          <View
            style={{
              ...carouselStyles['arrowButton'],
              ...(!canGoPrev ? carouselStyles['arrowButtonDisabled'] : {}),
            }}
            onClick={canGoPrev ? goPrev : undefined}
          >
            <Text>{vertical ? '↑' : '‹'}</Text>
          </View>
        </View>
        
        <View
          style={{
            ...carouselStyles['arrows'],
            ...(vertical ? carouselStyles['arrowVertical'] : {}),
            ...(vertical ? carouselStyles['arrowVerticalNext'] : carouselStyles['arrowNext']),
          }}
        >
          <View
            style={{
              ...carouselStyles['arrowButton'],
              ...(!canGoNext ? carouselStyles['arrowButtonDisabled'] : {}),
            }}
            onClick={canGoNext ? goNext : undefined}
          >
            <Text>{vertical ? '↓' : '›'}</Text>
          </View>
        </View>
      </>
    );
  };

  const getCarouselStyle = () => {
    const baseStyle = {
      ...carouselStyles['base'],
      ...style,
    };

    if (vertical) {
      Object.assign(baseStyle, carouselStyles['vertical']);
    }

    return baseStyle;
  };

  if (totalSlides === 0) {
    return (
      <View style={getCarouselStyle()} className={className}>
        <View style={carouselStyles['loading']}>
          <View style={carouselStyles['loadingIcon']} />
          <Text>暂无内容</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      ref={elementRef}
      style={getCarouselStyle()}
      className={className}
      {...rest}
    >
      <View style={carouselStyles['container']}>
        <View style={getWrapperStyle()}>
          {childrenArray.map((child, index) => (
            <View
              key={index}
              style={getSlideStyle(index)}
            >
              {child}
            </View>
          ))}
        </View>
        
        {renderDots()}
        {renderArrows()}
      </View>
    </View>
  );
});

CarouselComponent.displayName = 'Carousel';

export const Carousel = CarouselComponent;
export default Carousel;