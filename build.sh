#!/bin/bash

# Taro Uno UI 项目构建脚本
# 支持 macOS 和 Linux 系统

set -e

echo "🔨 构建 Taro Uno UI 项目..."

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 请先安装 Node.js"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ 错误: Node.js 版本需要 >= 16.14.0"
    exit 1
fi

# 检查 pnpm 是否安装
if ! command -v pnpm &> /dev/null; then
    echo "❌ 错误: 请先安装 pnpm"
    echo "💡 安装命令: npm install -g pnpm"
    exit 1
fi

# 检查是否有 package.json
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 当前目录下没有找到 package.json 文件"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    pnpm install
fi

# 检查 Taro CLI 是否可用
if ! pnpm exec taro --version &> /dev/null; then
    echo "❌ 错误: Taro CLI 不可用"
    exit 1
fi

# 获取构建平台
PLATFORM=${1:-h5}
ENVIRONMENT=${2:-production}

# 支持的平台
case $PLATFORM in
    weapp|alipay|swan|tt|qq|h5|rn|jd)
        echo "🎯 构建平台: $PLATFORM"
        ;;
    *)
        echo "❌ 错误: 不支持的平台 $PLATFORM"
        echo "💡 支持的平台: weapp, alipay, swan, tt, qq, h5, rn, jd"
        exit 1
        ;;
esac

# 支持的环境
case $ENVIRONMENT in
    development|test|production)
        echo "🌍 构建环境: $ENVIRONMENT"
        ;;
    *)
        echo "❌ 错误: 不支持的环境 $ENVIRONMENT"
        echo "💡 支持的环境: development, test, production"
        exit 1
        ;;
esac

# 检查环境变量文件
ENV_FILE=".env.$ENVIRONMENT"
if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  警告: $ENV_FILE 文件不存在，使用默认配置"
fi

# 设置环境变量
export NODE_ENV=$ENVIRONMENT
export TARO_ENV=$PLATFORM

echo "🔧 环境配置:"
echo "   - NODE_ENV: $NODE_ENV"
echo "   - TARO_ENV: $TARO_ENV"

# 清理之前的构建产物
echo "🧹 清理之前的构建产物..."
rm -rf dist/
rm -rf dist_$PLATFORM/
rm -rf .temp/
rm -rf .taro-temp/

# 运行类型检查
echo "🔍 运行类型检查..."
pnpm exec tsc --noEmit

# 运行代码检查
echo "🔍 运行代码检查..."
pnpm exec eslint . --ext .js,.jsx,.ts,.tsx --fix

# 运行测试
if [ "$ENVIRONMENT" != "development" ]; then
    echo "🧪 运行测试..."
    pnpm exec vitest run
fi

# 开始构建
echo "🔨 开始构建 $PLATFORM 平台的 $ENVIRONMENT 版本..."

if [ "$PLATFORM" = "h5" ]; then
    pnpm exec taro build --type h5
else
    pnpm exec taro build --type $PLATFORM
fi

# 检查构建结果
if [ $? -eq 0 ]; then
    echo "✅ 构建成功!"
    
    # 显示构建产物信息
    if [ -d "dist" ]; then
        echo "📦 构建产物位置: dist/"
        du -sh dist/
    fi
    
    if [ -d "dist_$PLATFORM" ]; then
        echo "📦 构建产物位置: dist_$PLATFORM/"
        du -sh dist_$PLATFORM/
    fi
    
    # 如果是生产环境，可以添加额外的部署步骤
    if [ "$ENVIRONMENT" = "production" ]; then
        echo "🚀 生产环境构建完成，可以进行部署"
    fi
else
    echo "❌ 构建失败!"
    exit 1
fi

echo "🎉 构建完成!"