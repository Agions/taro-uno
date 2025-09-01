# CI/CD Configuration

# GitHub Actions Secrets 需要配置的密钥
# 以下密钥需要在 GitHub 仓库的 Settings > Secrets 中配置

## 必需的密钥

### NPM 相关
- `NPM_TOKEN`: NPM 发布令牌，用于自动发布包到 npm
  - 创建方式：在 npmjs.com 创建 access token
  - 权限：publish

### GitHub 相关
- `GITHUB_TOKEN`: GitHub 访问令牌（默认提供）
- `SNYK_TOKEN`: Snyk 安全扫描令牌
  - 创建方式：在 snyk.io 创建 account token
- `LHCI_GITHUB_APP_TOKEN`: Lighthouse CI GitHub App 令牌

### 代码质量相关
- `SONAR_TOKEN`: SonarQube 访问令牌
- `CC_TEST_REPORTER_ID`: Code Climate 测试报告器 ID

### 通知相关
- `SLACK_WEBHOOK_URL`: Slack 通知 Webhook URL
  - 创建方式：在 Slack 中创建 Incoming Webhook

### 覆盖率相关
- `CODECOV_TOKEN`: Codecov 覆盖率报告令牌

## 可选的密钥

### AWS 相关（如果需要部署到 AWS）
- `AWS_ACCESS_KEY_ID`: AWS 访问密钥 ID
- `AWS_SECRET_ACCESS_KEY`: AWS 秘密访问密钥
- `AWS_REGION`: AWS 区域

### Docker 相关（如果需要构建 Docker 镜像）
- `DOCKER_USERNAME`: Docker Hub 用户名
- `DOCKER_PASSWORD`: Docker Hub 密码

## 工作流说明

### 主要工作流

1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - 代码质量检查
   - 单元测试和覆盖率
   - 端到端测试
   - 安全扫描
   - 依赖检查
   - 构建测试
   - 性能测试
   - 自动发布
   - 文档部署
   - 通知系统

2. **Dependency Updates** (`.github/workflows/dependency-updates.yml`)
   - 每周检查依赖更新
   - 安全依赖更新
   - 自动创建更新报告

3. **Code Quality Analysis** (`.github/workflows/code-quality.yml`)
   - SonarQube 代码质量分析
   - Code Climate 代码质量检查
   - 代码复杂度分析

4. **Performance Benchmarking** (`.github/workflows/performance.yml`)
   - 性能基准测试
   - Lighthouse CI 性能测试
   - 包大小分析

5. **Multi-Platform Testing** (`.github/workflows/multi-platform.yml`)
   - 多平台测试矩阵
   - 浏览器兼容性测试
   - 移动端兼容性测试

6. **Automated Release** (`.github/workflows/release.yml`)
   - 自动化版本发布
   - NPM 包发布
   - GitHub Release 创建
   - 文档部署
   - 发布通知

## 触发条件

### 自动触发
- 推送到 main 或 develop 分支
- 创建 Pull Request 到 main 或 develop 分支
- 创建版本标签 (v*)
- 定时任务（安全检查、依赖更新等）

### 手动触发
- GitHub Actions 页面手动运行
- 通过 API 触发

## 构建产物

### 主要产物
- `build-artifacts`: 构建的包文件
- `playwright-results`: 端到端测试结果
- `dependency-report`: 依赖检查报告
- `performance-report`: 性能测试报告
- `complexity-report`: 代码复杂度报告
- `benchmark-report`: 基准测试报告
- `bundle-analysis`: 包大小分析报告
- `ci-report`: CI/CD 综合报告

## 监控和通知

### Slack 通知
- 构建成功/失败通知
- 发布成功/失败通知
- 安全漏洞通知

### 报告生成
- 测试覆盖率报告
- 性能基准报告
- 代码质量报告
- 依赖状态报告

## 性能优化

### 缓存策略
- pnpm store 缓存
- Node.js 模块缓存
- 构建产物缓存

### 并行执行
- 矩阵策略并行测试
- 多阶段并行构建
- 条件性任务执行

## 安全措施

### 依赖安全
- npm audit 安全扫描
- Snyk 安全扫描
- 依赖版本检查

### 代码安全
- ESLint 安全规则
- 代码复杂度检查
- 敏感信息检测

## 部署流程

### 自动发布流程
1. 代码质量检查通过
2. 测试套件全部通过
3. 安全扫描无高危漏洞
4. 构建产物生成成功
5. 自动发布到 NPM
6. 创建 GitHub Release
7. 部署文档到 GitHub Pages
8. 发送通知

### 文档部署
- 自动构建文档
- 部署到 GitHub Pages
- 自定义域名配置

## 故障排除

### 常见问题
1. **依赖安装失败**
   - 检查 pnpm 版本
   - 清理缓存
   - 检查网络连接

2. **测试失败**
   - 查看测试日志
   - 检查测试环境
   - 运行本地测试

3. **构建失败**
   - 检查构建配置
   - 查看构建日志
   - 检查依赖版本

4. **发布失败**
   - 检查 NPM_TOKEN
   - 检查包版本
   - 检查网络连接

### 调试技巧
- 使用 `--debug` 标志
- 检查环境变量
- 查看完整日志
- 使用本地测试环境

## 维护指南

### 定期维护
- 更新 Actions 版本
- 清理过期密钥
- 监控构建性能
- 更新依赖版本

### 优化建议
- 监控构建时间
- 优化缓存策略
- 减少不必要构建
- 提高并行效率

## 联系方式

如有问题，请：
1. 查看 GitHub Actions 日志
2. 检查项目 Issues
3. 联系开发团队