import React, { useRef } from 'react';
import { Carousel, Button, View, Text } from '@taro-uno/ui';

// 基本轮播图
export const BasicCarousel = () => {
  return (
    <Carousel autoplay>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 淡入淡出效果
export const FadeCarousel = () => {
  return (
    <Carousel autoplay effect="fade">
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 自定义指示器位置
export const CustomDotsPositionCarousel = () => {
  return (
    <Carousel autoplay dotsPosition="top">
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 隐藏指示器和箭头
export const HiddenIndicatorsCarousel = () => {
  return (
    <Carousel autoplay showDots={false} showArrows={false}>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 垂直轮播
export const VerticalCarousel = () => {
  return (
    <Carousel autoplay vertical>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 同时展示多个轮播项
export const MultipleItemsCarousel = () => {
  return (
    <Carousel autoplay slidesToShow={2} slidesToScroll={1}>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#f5222d', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 4</Text>
      </View>
    </Carousel>
  );
};

// 非无限循环
export const NonInfiniteCarousel = () => {
  return (
    <Carousel autoplay infinite={false}>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 自定义自动播放间隔
export const CustomIntervalCarousel = () => {
  return (
    <Carousel autoplay interval={5000}>
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 带回调函数的轮播
export const CarouselWithCallbacks = () => {
  return (
    <Carousel
      autoplay
      beforeChange={(from, to) => console.log(`从 ${from} 切换到 ${to}`)}
      afterChange={(current) => console.log(`当前索引: ${current}`)}
    >
      <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
      </View>
      <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
      </View>
    </Carousel>
  );
};

// 使用Ref控制轮播
export const CarouselWithRef = () => {
  const carouselRef = useRef(null);

  const handleGoTo = () => {
    carouselRef.current?.goTo(2); // 跳转到第三个幻灯片（索引从0开始）
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePlay = () => {
    carouselRef.current?.play();
  };

  const handlePause = () => {
    carouselRef.current?.pause();
  };

  return (
    <View>
      <Carousel ref={carouselRef} autoplay>
        <View style={{ height: 200, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 1</Text>
        </View>
        <View style={{ height: 200, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 2</Text>
        </View>
        <View style={{ height: 200, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>幻灯片 3</Text>
        </View>
      </Carousel>
      <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button onClick={handlePrev}>上一张</Button>
        <Button onClick={handleNext}>下一张</Button>
        <Button onClick={handleGoTo}>跳转到第3张</Button>
        <Button onClick={handlePause}>暂停</Button>
        <Button onClick={handlePlay}>播放</Button>
      </View>
    </View>
  );
};

// 图片轮播示例
export const ImageCarousel = () => {
  // 模拟图片URL
  const images = [
    'https://via.placeholder.com/600x200/1890ff/ffffff?text=Image+1',
    'https://via.placeholder.com/600x200/52c41a/ffffff?text=Image+2',
    'https://via.placeholder.com/600x200/faad14/ffffff?text=Image+3',
    'https://via.placeholder.com/600x200/f5222d/ffffff?text=Image+4'
  ];

  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <View key={index} style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <Image src={image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        </View>
      ))}
    </Carousel>
  );
};

// 复杂内容轮播
export const ComplexContentCarousel = () => {
  return (
    <Carousel autoplay slidesToShow={3} slidesToScroll={1}>
      <View style={{ padding: 10 }}>
        <View style={{ height: 100, backgroundColor: '#1890ff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>图片</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>产品标题 1</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>产品描述信息，简洁明了</Text>
        <Text style={{ fontSize: 16, color: '#f5222d', marginTop: 10, fontWeight: 'bold' }}>¥99.99</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ height: 100, backgroundColor: '#52c41a', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>图片</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>产品标题 2</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>产品描述信息，简洁明了</Text>
        <Text style={{ fontSize: 16, color: '#f5222d', marginTop: 10, fontWeight: 'bold' }}>¥129.99</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ height: 100, backgroundColor: '#faad14', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>图片</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>产品标题 3</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>产品描述信息，简洁明了</Text>
        <Text style={{ fontSize: 16, color: '#f5222d', marginTop: 10, fontWeight: 'bold' }}>¥89.99</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ height: 100, backgroundColor: '#f5222d', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>图片</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>产品标题 4</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>产品描述信息，简洁明了</Text>
        <Text style={{ fontSize: 16, color: '#f5222d', marginTop: 10, fontWeight: 'bold' }}>¥149.99</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ height: 100, backgroundColor: '#722ed1', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ color: '#fff' }}>图片</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>产品标题 5</Text>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>产品描述信息，简洁明了</Text>
        <Text style={{ fontSize: 16, color: '#f5222d', marginTop: 10, fontWeight: 'bold' }}>¥119.99</Text>
      </View>
    </Carousel>
  );
};