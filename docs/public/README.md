# 静态资源

此目录用于存放文档站点的静态资源，如图片、图标等。

## 目录结构

```
docs/public/
├── logo.png          # 站点 Logo
├── favicon.ico       # 站点图标
├── images/           # 图片资源
│   ├── components/   # 组件相关图片
│   └── showcase/     # 展示图片
└── assets/           # 其他静态资源
```

## 使用说明

在 Markdown 文件中引用静态资源时，使用绝对路径：

```markdown
![Logo](/logo.png)
![组件示例](/images/components/button-demo.png)
```

在 VitePress 配置中，这些资源会被自动处理并正确部署到 GitHub Pages。