@echo off
REM Taro Uno UI 项目构建脚本 (Windows版本)

echo 🔨 构建 Taro Uno UI 项目...

REM 检查 Node.js 是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 请先安装 Node.js
    pause
    exit /b 1
)

REM 检查 pnpm 是否安装
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 请先安装 pnpm
    echo 💡 安装命令: npm install -g pnpm
    pause
    exit /b 1
)

REM 检查是否有 package.json
if not exist "package.json" (
    echo ❌ 错误: 当前目录下没有找到 package.json 文件
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    pnpm install
)

REM 检查 Taro CLI 是否可用
pnpm exec taro --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Taro CLI 不可用
    pause
    exit /b 1
)

REM 获取构建平台
set PLATFORM=%1
if "%PLATFORM%"=="" set PLATFORM=h5

REM 获取构建环境
set ENVIRONMENT=%2
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

REM 支持的平台
if "%PLATFORM%"=="weapp" goto valid_platform
if "%PLATFORM%"=="alipay" goto valid_platform
if "%PLATFORM%"=="swan" goto valid_platform
if "%PLATFORM%"=="tt" goto valid_platform
if "%PLATFORM%"=="qq" goto valid_platform
if "%PLATFORM%"=="h5" goto valid_platform
if "%PLATFORM%"=="rn" goto valid_platform
if "%PLATFORM%"=="jd" goto valid_platform

echo ❌ 错误: 不支持的平台 %PLATFORM%
echo 💡 支持的平台: weapp, alipay, swan, tt, qq, h5, rn, jd
pause
exit /b 1

:valid_platform
echo 🎯 构建平台: %PLATFORM%

REM 支持的环境
if "%ENVIRONMENT%"=="development" goto valid_env
if "%ENVIRONMENT%"=="test" goto valid_env
if "%ENVIRONMENT%"=="production" goto valid_env

echo ❌ 错误: 不支持的环境 %ENVIRONMENT%
echo 💡 支持的环境: development, test, production
pause
exit /b 1

:valid_env
echo 🌍 构建环境: %ENVIRONMENT%

REM 检查环境变量文件
set ENV_FILE=.env.%ENVIRONMENT%
if not exist "%ENV_FILE%" (
    echo ⚠️  警告: %ENV_FILE% 文件不存在，使用默认配置
)

REM 设置环境变量
set NODE_ENV=%ENVIRONMENT%
set TARO_ENV=%PLATFORM%

echo 🔧 环境配置:
echo    - NODE_ENV: %NODE_ENV%
echo    - TARO_ENV: %TARO_ENV%

REM 清理之前的构建产物
echo 🧹 清理之前的构建产物...
if exist "dist" rmdir /s /q dist
if exist "dist_%PLATFORM%" rmdir /s /q dist_%PLATFORM%
if exist ".temp" rmdir /s /q .temp
if exist ".taro-temp" rmdir /s /q .taro-temp

REM 运行类型检查
echo 🔍 运行类型检查...
pnpm exec tsc --noEmit
if %errorlevel% neq 0 (
    echo ❌ 类型检查失败!
    pause
    exit /b 1
)

REM 运行代码检查
echo 🔍 运行代码检查...
pnpm exec eslint . --ext .js,.jsx,.ts,.tsx --fix
if %errorlevel% neq 0 (
    echo ❌ 代码检查失败!
    pause
    exit /b 1
)

REM 运行测试（非开发环境）
if not "%ENVIRONMENT%"=="development" (
    echo 🧪 运行测试...
    pnpm exec vitest run
    if %errorlevel% neq 0 (
        echo ❌ 测试失败!
        pause
        exit /b 1
    )
)

REM 开始构建
echo 🔨 开始构建 %PLATFORM% 平台的 %ENVIRONMENT% 版本...

if "%PLATFORM%"=="h5" (
    pnpm exec taro build --type h5
) else (
    pnpm exec taro build --type %PLATFORM%
)

if %errorlevel% neq 0 (
    echo ❌ 构建失败!
    pause
    exit /b 1
)

echo ✅ 构建成功!

REM 显示构建产物信息
if exist "dist" (
    echo 📦 构建产物位置: dist/
    dir /s /b dist
)

if exist "dist_%PLATFORM%" (
    echo 📦 构建产物位置: dist_%PLATFORM%/
    dir /s /b dist_%PLATFORM%
)

REM 如果是生产环境，可以添加额外的部署步骤
if "%ENVIRONMENT%"=="production" (
    echo 🚀 生产环境构建完成，可以进行部署
)

echo 🎉 构建完成!
pause