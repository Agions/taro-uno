---
title: AutoComplete
order: 11
---

# AutoComplete 自动完成

用于提供输入建议和自动完成功能，帮助用户快速输入。

## 基本用法

### 基础自动完成

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function BasicAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'cherry', label: '樱桃' },
    { value: 'date', label: '枣子' },
    { value: 'elderberry', label: '接骨木莓' },
    { value: 'fig', label: '无花果' },
    { value: 'grape', label: '葡萄' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请输入水果名称"
    />
  );
}
```

### 字符串选项

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function StringOptionsAutoComplete() {
  const [value, setValue] = useState('');
  const options = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请输入城市名称"
    />
  );
}
```

### 自定义主题

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function ThemeAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请输入框架名称"
      theme="dark"
    />
  );
}
```

### 自定义大小

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function SizeAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'xs', label: '超小' },
    { value: 'sm', label: '小' },
    { value: 'md', label: '中' },
    { value: 'lg', label: '大' },
    { value: 'xl', label: '超大' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请选择大小"
      size="lg"
    />
  );
}
```

## API

### AutoCompleteProps

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| config | `AutoCompleteConfig` | - | 自动完成配置 |
| options | `AutoCompleteOption[] \| string[]` | - | 选项列表 |
| visible | `boolean` | - | 可见性控制 |
| defaultVisible | `boolean` | `false` | 默认可见性 |
| direction | `AutoCompleteDirection` | `bottom` | 方向，可选值：`top`、`bottom`、`left`、`right` |
| theme | `AutoCompleteTheme` | `light` | 主题，可选值：`light`、`dark`、`primary` |
| size | `AutoCompleteSize` | `md` | 大小，可选值：`xs`、`sm`、`md`、`lg`、`xl` |
| status | `AutoCompleteStatus` | `default` | 状态，可选值：`default`、`success`、`warning`、`error` |
| placeholder | `string` | - | 占位符 |
| value | `string` | - | 值 |
| defaultValue | `string` | - | 默认值 |
| showClear | `boolean` | `true` | 是否显示清除按钮 |
| showSearchIcon | `boolean` | `false` | 是否显示搜索图标 |
| disabled | `boolean` | `false` | 是否禁用 |
| readOnly | `boolean` | `false` | 是否只读 |
| required | `boolean` | `false` | 是否必填 |
| debounceDelay | `number` | `300` | 防抖延迟（毫秒） |
| minLength | `number` | `0` | 最小输入长度 |
| maxOptions | `number` | `10` | 最大显示选项数 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| inputClassName | `string` | - | 输入框类名 |
| inputStyle | `React.CSSProperties` | - | 输入框样式 |
| optionsClassName | `string` | - | 选项容器类名 |
| optionsStyle | `React.CSSProperties` | - | 选项容器样式 |
| optionClassName | `string` | - | 选项类名 |
| optionStyle | `React.CSSProperties` | - | 选项样式 |
| onChange | `(value: string, option?: AutoCompleteOption) => void` | - | 值变化回调 |
| onSelect | `(option: AutoCompleteOption, value: string) => void` | - | 选项选择回调 |
| onVisibleChange | `(visible: boolean) => void` | - | 可见性变化回调 |
| onSearch | `(value: string) => void` | - | 搜索回调 |
| onClear | `() => void` | - | 清除回调 |
| onInput | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | 输入回调 |
| onFocus | `(e: React.FocusEvent<HTMLInputElement>) => void` | - | 聚焦回调 |
| onBlur | `(e: React.FocusEvent<HTMLInputElement>) => void` | - | 失焦回调 |
| renderOption | `(option: AutoCompleteOption, index: number) => React.ReactNode` | - | 自定义渲染选项 |
| renderPrefix | `() => React.ReactNode` | - | 自定义渲染输入框前置内容 |
| renderSuffix | `() => React.ReactNode` | - | 自定义渲染输入框后置内容 |
| loading | `boolean` | `false` | 加载状态 |
| renderLoading | `() => React.ReactNode` | - | 自定义渲染加载状态 |
| emptyText | `string` | `无匹配选项` | 空状态文本 |
| renderEmpty | `() => React.ReactNode` | - | 自定义渲染空状态 |
| filterOption | `(inputValue: string, option: AutoCompleteOption) => boolean` | - | 自定义过滤函数 |
| debounceFn | `(fn: () => void, delay: number) => () => void` | - | 自定义防抖函数 |

### AutoCompleteOption

自动完成选项：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `string` | - | 选项值 |
| label | `string` | - | 选项标签 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| icon | `React.ReactNode` | - | 选项图标 |
| description | `string` | - | 选项描述 |
| [key: string] | `any` | - | 其他自定义属性 |

### AutoCompleteDirection

自动完成方向，可选值：
- `top`：顶部弹出
- `bottom`：底部弹出
- `left`：左侧弹出
- `right`：右侧弹出

### AutoCompleteTheme

自动完成主题，可选值：
- `light`：浅色主题
- `dark`：深色主题
- `primary`：主色调主题

### AutoCompleteSize

自动完成大小，可选值：
- `xs`：超小
- `sm`：小
- `md`：中
- `lg`：大
- `xl`：超大

### AutoCompleteStatus

自动完成状态，可选值：
- `default`：默认
- `success`：成功
- `warning`：警告
- `error`：错误

### AutoCompleteConfig

自动完成配置：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| direction | `AutoCompleteDirection` | `bottom` | 方向 |
| theme | `AutoCompleteTheme` | `light` | 主题 |
| size | `AutoCompleteSize` | `md` | 大小 |
| status | `AutoCompleteStatus` | `default` | 状态 |
| showClear | `boolean` | `true` | 是否显示清除按钮 |
| showSearchIcon | `boolean` | `false` | 是否显示搜索图标 |
| disabled | `boolean` | `false` | 是否禁用 |
| readOnly | `boolean` | `false` | 是否只读 |
| required | `boolean` | `false` | 是否必填 |
| placeholder | `string` | - | 占位符 |
| debounceDelay | `number` | `300` | 防抖延迟（毫秒） |
| minLength | `number` | `0` | 最小输入长度 |
| maxOptions | `number` | `10` | 最大显示选项数 |
| className | `string` | - | 自定义类名 |
| style | `React.CSSProperties` | - | 自定义样式 |

## 示例代码

### 带搜索图标

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function SearchIconAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请输入编程语言"
      showSearchIcon
    />
  );
}
```

### 带图标的选项

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function IconOptionAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'home', label: '首页', icon: '🏠' },
    { value: 'about', label: '关于', icon: 'ℹ️' },
    { value: 'contact', label: '联系我们', icon: '📞' },
    { value: 'products', label: '产品', icon: '📦' },
    { value: 'services', label: '服务', icon: '🔧' },
    { value: 'blog', label: '博客', icon: '📝' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请选择导航项"
    />
  );
}
```

### 带描述的选项

```jsx
import { useState } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function DescriptionOptionAutoComplete() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'vue', label: 'Vue', description: '渐进式JavaScript框架' },
    { value: 'react', label: 'React', description: '用于构建用户界面的JavaScript库' },
    { value: 'angular', label: 'Angular', description: '基于TypeScript的Web应用框架' },
    { value: 'svelte', label: 'Svelte', description: '无虚拟DOM的JavaScript框架' },
  ];

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请选择前端框架"
      optionStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      renderOption={(option) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 0' }}>
          <div style={{ fontWeight: '500' }}>{option.label}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>{option.description}</div>
        </div>
      )}
    />
  );
}
```

### 远程搜索

```jsx
import { useState, useEffect } from 'react';
import { AutoComplete } from '@taro-uno/ui';

function RemoteSearchAutoComplete() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 模拟远程搜索
  useEffect(() => {
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);

    // 模拟网络请求延迟
    const timer = setTimeout(() => {
      // 模拟搜索结果
      const mockResults = [
        { value: `result-1-${value}`, label: `结果 1 - ${value}` },
        { value: `result-2-${value}`, label: `结果 2 - ${value}` },
        { value: `result-3-${value}`, label: `结果 3 - ${value}` },
      ];
      setOptions(mockResults);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <AutoComplete
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="请输入搜索关键词"
      loading={loading}
      renderLoading={() => <div style={{ padding: '8px', textAlign: 'center' }}>搜索中...</div>}
      showSearchIcon
    />
  );
}
```

## 注意事项

1. 自动完成组件支持两种选项格式：字符串数组和对象数组
2. 自动完成组件支持自定义主题、大小、方向等属性
3. 自动完成组件支持防抖搜索，可通过 `debounceDelay` 属性控制防抖延迟
4. 自动完成组件支持最小输入长度过滤，可通过 `minLength` 属性控制
5. 自动完成组件支持最大显示选项数，可通过 `maxOptions` 属性控制
6. 自动完成组件支持自定义过滤函数，可通过 `filterOption` 属性实现
7. 自动完成组件支持远程搜索，可通过 `onSearch` 回调实现
8. 自动完成组件支持自定义选项渲染，可通过 `renderOption` 属性实现
9. 自动完成组件支持自定义加载状态和空状态，可通过 `loading`、`renderLoading`、`emptyText` 和 `renderEmpty` 属性实现
