import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Rate } from '@taro-uno/ui';
import './index.scss';

// 基本评表示例
export const BasicRate = () => {
  return (
    <Rate defaultValue={3} />
  );
};

// 半星评表示例
export const HalfRate = () => {
  return (
    <Rate allowHalf defaultValue={2.5} />
  );
};

// 自定义星星总数示例
export const CustomCountRate = () => {
  return (
    <Rate count={10} defaultValue={7} />
  );
};

// 禁用状态示例
export const DisabledRate = () => {
  return (
    <Rate disabled defaultValue={4} />
  );
};

// 只读状态示例
export const ReadonlyRate = () => {
  return (
    <Rate readonly defaultValue={3.5} />
  );
};

// 不同尺寸示例
export const DifferentSizeRate = () => {
  return (
    <View className="rate-sizes">
      <View className="size-item">
        <Text className="size-title">小尺寸评分</Text>
        <Rate size="small" defaultValue={3} />
      </View>

      <View className="size-item">
        <Text className="size-title">默认尺寸评分</Text>
        <Rate size="default" defaultValue={3} />
      </View>

      <View className="size-item">
        <Text className="size-title">大尺寸评分</Text>
        <Rate size="large" defaultValue={3} />
      </View>
    </View>
  );
};

// 禁止清除示例
export const NoClearRate = () => {
  return (
    <Rate allowClear={false} defaultValue={3} />
  );
};

// 自定义颜色示例
export const CustomColorRate = () => {
  return (
    <Rate color="#ff4d4f" unselectedColor="#f5f5f5" defaultValue={3} />
  );
};

// 自定义字符示例
export const CustomCharacterRate = () => {
  return (
    <View className="custom-character-container">
      <View className="character-item">
        <Text className="character-title">使用心形字符</Text>
        <Rate character="♥" defaultValue={3} />
      </View>

      <View className="character-item">
        <Text className="character-title">使用React节点</Text>
        <Rate character={<Text style={{ color: '#ff4d4f' }}>★</Text>} defaultValue={3} />
      </View>

      <View className="character-item">
        <Text className="character-title">使用函数返回字符</Text>
        <Rate character={(index) => index % 2 === 0 ? '★' : '☆'} defaultValue={3} />
      </View>
    </View>
  );
};

// 带工具提示示例
export const TooltipRate = () => {
  const tooltips = ['非常差', '较差', '一般', '良好', '非常好'];
  return (
    <Rate tooltips={tooltips} showTooltips defaultValue={3} />
  );
};

// 带回调函数示例
export const CallbackRate = () => {
  const [value, setValue] = useState(3);
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <View className="callback-rate-container">
      <View className="callback-info">
        <Text>当前评分: {value}</Text>
      </View>
      <View className="callback-info">
        <Text>Hover评分: {hoverValue}</Text>
      </View>
      <Rate
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onHoverChange={(newHoverValue) => setHoverValue(newHoverValue)}
      />
    </View>
  );
};

// 受控模式示例
export const ControlledRate = () => {
  const [value, setValue] = useState(3);

  return (
    <View className="controlled-rate-container">
      <Rate value={value} onChange={(newValue) => setValue(newValue)} />
      <View className="control-buttons">
        <View
          className="control-button"
          onClick={() => setValue(Math.max(0, value - 0.5))}
        >
          <Text>-0.5</Text>
        </View>
        <View
          className="control-button"
          onClick={() => setValue(Math.min(5, value + 0.5))}
        >
          <Text>+0.5</Text>
        </View>
        <View
          className="control-button"
          onClick={() => setValue(0)}
        >
          <Text>重置</Text>
        </View>
      </View>
    </View>
  );
};

// 综合示例
export const RateExample = () => {
  return (
    <View className="rate-example-container">
      <Text className="example-title">Rate 组件示例</Text>
      
      <View className="example-section">
        <Text className="section-title">1. 基本评分</Text>
        <BasicRate />
      </View>

      <View className="example-section">
        <Text className="section-title">2. 半星评分</Text>
        <HalfRate />
      </View>

      <View className="example-section">
        <Text className="section-title">3. 自定义星星总数</Text>
        <CustomCountRate />
      </View>

      <View className="example-section">
        <Text className="section-title">4. 禁用状态</Text>
        <DisabledRate />
      </View>

      <View className="example-section">
        <Text className="section-title">5. 只读状态</Text>
        <ReadonlyRate />
      </View>

      <View className="example-section">
        <Text className="section-title">6. 不同尺寸</Text>
        <DifferentSizeRate />
      </View>

      <View className="example-section">
        <Text className="section-title">7. 禁止清除</Text>
        <NoClearRate />
      </View>

      <View className="example-section">
        <Text className="section-title">8. 自定义颜色</Text>
        <CustomColorRate />
      </View>

      <View className="example-section">
        <Text className="section-title">9. 自定义字符</Text>
        <CustomCharacterRate />
      </View>

      <View className="example-section">
        <Text className="section-title">10. 带工具提示</Text>
        <TooltipRate />
      </View>

      <View className="example-section">
        <Text className="section-title">11. 带回调函数</Text>
        <CallbackRate />
      </View>

      <View className="example-section">
        <Text className="section-title">12. 受控模式</Text>
        <ControlledRate />
      </View>
    </View>
  );
};