# Rate 组件

Rate 组件是一个评分组件，用于用户对商品、服务等进行评分，支持自定义星星数量、颜色、大小、半星评分等功能。

## 基本使用

### 基础评分

```tsx
<Rate value={3} />
```

### 自定义数量

```tsx
<Rate value={4} count={6} />
```

### 半星评分

```tsx
<Rate value={3.5} allowHalf />
```

### 自定义颜色

```tsx
<Rate 
  value={4} 
  color="#ff6b6b" 
  unselectedColor="#e0e0e0" 
  allowHalf 
/>
```

### 自定义大小

```tsx
<Rate value={3} size={24} />
<Rate value={3} size={32} />
<Rate value={3} size={40} />
```

### 禁用状态

```tsx
<Rate value={3} disabled />
```

### 只读状态

```tsx
<Rate value={3} readonly />
```

### 带提示的评分

```tsx
<Rate 
  value={3} 
  tooltips={['非常差', '差', '一般', '好', '非常好']} 
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| value | `number` | `0` | 当前评分值 |
| count | `number` | `5` | 星星数量 |
| allowHalf | `boolean` | `false` | 是否允许半星评分 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| size | `number` | `20` | 星星大小（像素） |
| color | `string` | `#ffd700` | 选中星星的颜色 |
| unselectedColor | `string` | `#e0e0e0` | 未选中星星的颜色 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| onChange | `(value: number) => void` | - | 评分变化时触发 |
| onHoverChange | `(value: number) => void` | - | 鼠标悬停时评分变化触发 |
| tooltips | `string[]` | - | 评分提示数组 |

## 类型定义

```tsx
// Rate 组件属性接口
export interface RateProps {
  value?: number;
  count?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: number;
  color?: string;
  unselectedColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  tooltips?: string[];
}
```

## 事件说明

| 事件 | 描述 | 参数 |
| --- | --- | --- |
| onChange | 评分变化时触发 | `value: number` - 当前评分值 |
| onHoverChange | 鼠标悬停时评分变化触发 | `value: number` - 悬停评分值 |

## 示例代码

### 完整示例

```tsx
import { Rate, Space, View, Text } from 'taro-uno-ui';
import { useState } from 'react';

const RateExample = () => {
  const [value, setValue] = useState(3);
  
  const handleChange = (newValue: number) => {
    console.log(`当前评分: ${newValue}`);
    setValue(newValue);
  };
  
  const handleHoverChange = (hoverValue: number) => {
    console.log(`悬停评分: ${hoverValue}`);
  };
  
  return (
    <View>
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>基础评分</Text>
      <Rate 
        value={value} 
        onChange={handleChange} 
        style={{ marginBottom: '20px' }}
      />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>半星评分</Text>
      <Rate 
        value={value} 
        allowHalf 
        onChange={handleChange} 
        style={{ marginBottom: '20px' }}
      />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义数量</Text>
      <Rate 
        value={value} 
        count={6} 
        onChange={handleChange} 
        style={{ marginBottom: '20px' }}
      />
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义颜色</Text>
      <Space direction="vertical" style={{ marginBottom: '20px' }}>
        <Rate 
          value={3.5} 
          allowHalf 
          color="#ff6b6b" 
          unselectedColor="#e0e0e0" 
        />
        <Rate 
          value={3.5} 
          allowHalf 
          color="#4ecdc4" 
          unselectedColor="#e0e0e0" 
        />
        <Rate 
          value={3.5} 
          allowHalf 
          color="#45b7d1" 
          unselectedColor="#e0e0e0" 
        />
      </Space>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>自定义大小</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Rate value={3} size={24} />
        <Rate value={3} size={32} />
        <Rate value={3} size={40} />
      </Space>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>状态演示</Text>
      <Space style={{ marginBottom: '20px' }}>
        <Rate value={3} /> 正常状态
        <Rate value={3} disabled /> 禁用状态
        <Rate value={3} readonly /> 只读状态
      </Space>
      
      <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', display: 'block', marginTop: '20px' }}>带提示的评分</Text>
      <Rate 
        value={value} 
        allowHalf 
        onChange={handleChange} 
        onHoverChange={handleHoverChange}
        tooltips={['非常差', '差', '一般', '好', '非常好']} 
        style={{ marginBottom: '20px' }}
      />
    </View>
  );
};

export default RateExample;
```

## 平台支持

| 平台 | 支持状态 | 注意事项 |
| --- | --- | --- |
| 微信小程序 | ✅ 完全支持 | - |
| H5 | ✅ 完全支持 | - |
| React Native | ✅ 部分支持 | 部分样式可能存在差异 |
| 支付宝小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 百度小程序 | ✅ 部分支持 | 部分样式可能存在差异 |
| 字节跳动小程序 | ✅ 部分支持 | 部分样式可能存在差异 |

## 注意事项

1. **评分值范围**：评分值范围为 0 到 count，支持小数评分（当 allowHalf 为 true 时）。
2. **半星评分**：设置 allowHalf 为 true 时，支持半星评分，评分值可以是 0.5 的倍数。
3. **禁用状态**：设置 disabled 为 true 时，评分组件不可点击，也不响应鼠标悬停事件。
4. **只读状态**：设置 readonly 为 true 时，评分组件不可点击，但仍会响应鼠标悬停事件。
5. **自定义样式**：可通过 className 和 style 属性自定义评分组件的样式。
6. **提示功能**：设置 tooltips 属性时，鼠标悬停在评分上会显示对应的提示文本。
7. **性能优化**：评分组件使用了 memo 优化，避免不必要的重渲染。

## 相关组件

- [Form 组件](#/components/form/form) - 用于表单场景
- [Input 组件](#/components/form/input) - 可与评分组件结合使用
- [Space 组件](#/components/layout/space) - 用于评分组件布局和间距控制