# GitHub Pages 部署指南

本指南说明如何将 Taro UI 组件库的文档部署到 GitHub Pages。

## 🚀 部署步骤

### 1. 确保仓库设置正确

- 仓库必须是公开的（或者私有仓库但启用 GitHub Pages）
- 仓库名称建议为 `taro-uno` 或 `your-username/taro-uno`

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 本地构建测试

```bash
# 开发模式
npm run docs:dev

# 构建文档
npm run docs:build

# 本地预览构建结果
npm run docs:serve
```

### 4. 自动部署（推荐）

项目已配置 GitHub Actions，每次推送到 `main` 分支会自动部署：

```bash
git add .
git commit -m "feat: 添加文档更新"
git push origin main
```

### 5. 手动部署

如果需要手动部署，可以：

```bash
# 构建文档
npm run docs:build

# 将构建结果推送到 gh-pages 分支
git checkout gh-pages
git rm -rf .
cp -r docs/.vitepress/dist/* .
git add .
git commit -m "docs: 更新文档站点"
git push origin gh-pages
```

## ⚙️ 配置说明

### VitePress 配置

- 配置文件：`docs/.vitepress/config.ts`
- 基础路径：`/taro-uno/`（根据仓库名称调整）
- 输出目录：`docs/.vitepress/dist`

### GitHub Actions 配置

- 工作流文件：`.github/workflows/deploy-docs.yml`
- 触发条件：推送到 `main` 分支
- 部署环境：GitHub Pages

## 🌐 访问文档

部署成功后，文档将在以下地址可用：

```
https://agions.github.io/taro-uno/
```

## 🔧 自定义配置

### 修改基础路径

如果仓库名称不是 `taro-uno`，需要修改 `docs/.vitepress/config.ts` 中的 `base` 配置：

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... 其他配置
})
```

### 自定义域名

如果需要使用自定义域名：

1. 在仓库设置中配置 GitHub Pages
2. 在 `docs/.vitepress/config.ts` 中添加：

```typescript
export default defineConfig({
  base: '/',
  // ... 其他配置
})
```

3. 在 `docs` 目录下创建 `CNAME` 文件：

```
your-custom-domain.com
```

## 📝 更新文档

文档内容位于 `docs/` 目录下：

- `docs/index.md` - 首页
- `docs/components/` - 组件文档
- `docs/hooks/` - Hooks 文档
- `docs/theme.md` - 主题文档

更新文档后，推送到 `main` 分支会自动重新部署。

## 🐛 常见问题

### 构建失败

1. 检查 Node.js 版本是否符合要求
2. 确保所有依赖已正确安装
3. 检查 Markdown 文件格式是否正确

### 部署失败

1. 检查 GitHub Actions 权限设置
2. 确认仓库允许 GitHub Pages
3. 检查 `base` 路径配置是否正确

### 样式问题

1. 检查 VitePress 配置中的主题设置
2. 确认静态资源路径正确
3. 检查自定义 CSS 是否生效

## 📚 相关资源

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
