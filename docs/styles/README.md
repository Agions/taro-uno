# VitePress 样式自定义

此目录用于存放 VitePress 的自定义样式。

## 文件说明

- `custom.css` - 主要的自定义样式文件
- `components.css` - 组件相关样式
- `theme.css` - 主题相关样式

## 使用方法

在 `docs/.vitepress/config.ts` 中引入这些样式：

```typescript
export default defineConfig({
  // ... 其他配置
  head: [
    ['link', { rel: 'stylesheet', href: '/styles/custom.css' }],
    ['link', { rel: 'stylesheet', href: '/styles/components.css' }],
    ['link', { rel: 'stylesheet', href: '/styles/theme.css' }]
  ]
})
```

## 自定义样式示例

```css
/* 自定义主题颜色 */
:root {
  --vp-c-brand: #3b82f6;
  --vp-c-brand-light: #60a5fa;
  --vp-c-brand-dark: #2563eb;
}

/* 自定义组件样式 */
.vp-doc .custom-component {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}
```