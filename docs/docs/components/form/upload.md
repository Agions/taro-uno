---
sidebar_position: 14
---

# Upload 上传

文件上传组件，用于上传文件到服务器。

## 何时使用

- 需要上传图片、文件时
- 需要展示上传进度时

## 代码演示

### 基础用法

```tsx
import { Upload } from 'taro-uno';

function Demo() {
  return (
    <Upload
      action="/api/upload"
      onChange={(info) => console.log(info)}
    />
  );
}
```

### 图片上传

```tsx
import { Upload } from 'taro-uno';

function Demo() {
  return (
    <Upload
      action="/api/upload"
      accept="image/*"
      listType="picture"
    />
  );
}
```

### 多文件上传

```tsx
import { Upload } from 'taro-uno';

function Demo() {
  return (
    <Upload
      action="/api/upload"
      multiple
      maxCount={5}
    />
  );
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传地址 | `string` | - |
| accept | 接受的文件类型 | `string` | - |
| multiple | 是否支持多选 | `boolean` | `false` |
| maxCount | 最大上传数量 | `number` | - |
| listType | 列表类型 | `'text' \| 'picture'` | `'text'` |
| disabled | 是否禁用 | `boolean` | `false` |
| onChange | 文件状态变化回调 | `(info: UploadChangeInfo) => void` | - |

## 平台兼容性

| 微信小程序 | H5 | React Native | 鸿蒙 |
| :---: | :---: | :---: | :---: |
| ✓ | ✓ | ✓ | ✓ |
