import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from '@tarojs/components';
import { VirtualList } from '../../../../src/components/common/VirtualList';

// 基本用法示例
function BasicVirtualList() {
  const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, value: `Item ${i}` }));

  return (
    <View className="example-container">
      <Text className="example-title">基本用法</Text>
      <VirtualList
        data={data}
        renderItem={(item, index) => (
          <View className="list-item">
            <Text>Item {index}: {item.value}</Text>
          </View>
        )}
        itemHeight={40}
        height={400}
        itemKey="id"
      />
    </View>
  );
}

// 动态高度示例
function DynamicHeightVirtualList() {
  const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: `Item ${i}`,
    height: 40 + (i % 5) * 20,
  }));

  return (
    <View className="example-container">
      <Text className="example-title">动态高度</Text>
      <VirtualList
        data={data}
        renderItem={(item, index) => (
          <View className="list-item dynamic-item">
            <Text>Item {index}: {item.value}</Text>
            <Text className="item-height">Height: {item.height}px</Text>
          </View>
        )}
        itemHeight={(index) => data[index].height}
        dynamicHeight
        height={500}
        itemKey="id"
      />
    </View>
  );
}

// 触底加载示例
function InfiniteVirtualList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      const newData = Array.from({ length: 20 }, (_, i) => ({
        id: data.length + i,
        value: `Item ${data.length + i}`,
      }));
      setData([...data, ...newData]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View className="example-container">
      <Text className="example-title">触底加载</Text>
      <VirtualList
        data={data}
        renderItem={(item, index) => (
          <View className="list-item">
            <Text>Item {index}: {item.value}</Text>
          </View>
        )}
        itemHeight={50}
        height={400}
        itemKey="id"
        onEndReached={loadMore}
        onEndReachedThreshold={100}
        isLoading={isLoading}
        loading={<View className="loading-container"><ActivityIndicator /> 加载中...</View>}
        empty={<View className="empty-container">暂无数据</View>}
      />
    </View>
  );
}

// 滚动到指定索引示例
function ScrollToIndexVirtualList() {
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const data = Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `Item ${i}` }));

  return (
    <View className="example-container">
      <Text className="example-title">滚动到指定索引</Text>
      <View className="button-group">
        <Button onClick={() => setScrollToIndex(Math.floor(Math.random() * 1000))}>
          滚动到随机位置
        </Button>
        <Button onClick={() => setScrollToIndex(0)}>
          滚动到顶部
        </Button>
        <Button onClick={() => setScrollToIndex(999)}>
          滚动到底部
        </Button>
      </View>
      <VirtualList
        data={data}
        renderItem={(item, index) => (
          <View className="list-item">
            <Text>Item {index}: {item.value}</Text>
          </View>
        )}
        itemHeight={40}
        height={400}
        itemKey="id"
        scrollToIndex={scrollToIndex}
        scrollBehavior="smooth"
      />
    </View>
  );
}

// 自定义样式示例
function StyledVirtualList() {
  const data = Array.from({ length: 100 }, (_, i) => ({ id: i, value: `Item ${i}` }));

  return (
    <View className="example-container">
      <Text className="example-title">自定义样式</Text>
      <VirtualList
        data={data}
        renderItem={(item, index) => (
          <View className="custom-item">
            <Text className="item-title">Item {index}</Text>
            <Text className="item-value">{item.value}</Text>
          </View>
        )}
        itemHeight={60}
        height={400}
        width={300}
        itemKey="id"
        style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
        itemStyle={{ padding: '12px', backgroundColor: '#fff', margin: '8px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      />
    </View>
  );
}

// 综合示例组件
function VirtualListExample() {
  return (
    <View className="virtual-list-example">
      <BasicVirtualList />
      <DynamicHeightVirtualList />
      <InfiniteVirtualList />
      <ScrollToIndexVirtualList />
      <StyledVirtualList />
    </View>
  );
}

export default VirtualListExample;

// 样式
import './index.scss';