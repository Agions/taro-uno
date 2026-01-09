---
sidebar_position: 11
---

# RichText 富文本

富文本展示组件，用于渲染 HTML 内容。

## 何时使用

- 需要展示富文本内容时
- 需要渲染 HTML 字符串时

## 代码演示

### 基础用法

```tsx
import { RichText } from 'taro-uno';

function Demo() {
  const html = '<p>这是一段<strong>富文本</strong>内容</p>';
  return <RichText content={html} />;
}
```

### 带样式

```tsx
import { RichText } from 'taro-uno';

function Demo() {
  const html = `
    <h1>标题</h1>
    <p style="color: red;">红色文字</p>
    <ul>
      <li>列表项1</li>
      <li>列表项2</li>
    </ul>
  `;
  return <RichText content={html} />;
}
```

### 节点数组

```tsx
import { RichText } from 'taro-uno';

function Demo() {
  const nodes = [
    { name: 'p', children: [{ type: 'text', text: '段落内容' }] },
  ];
  return <RichText nodes={nodes} />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | HTML 字符串 | `string` | - |
| nodes | 节点数组 | `RichTextNode[]` | - |
| space | 显示连续空格 | `'ensp' \| 'emsp' \| 'nbsp'` | - |
| selectable | 是否可选中 | `boolean` | `false` |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
