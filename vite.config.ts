import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { aliases, buildConfig } from './configs/shared/config';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic'
      }),
      dts({
        insertTypesEntry: true,
        copyDtsFiles: true,
        tsConfigFilePath: './tsconfig.json'
      })
    ],
    resolve: {
      alias: aliases
    },
    build: {
      target: 'es2015',
      lib: buildConfig.lib,
      rollupOptions: {
        external: buildConfig.external,
        output: {
          globals: buildConfig.globals
        }
      },
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          pure_funcs: ['console.log']
        }
      },
      chunkSizeWarningLimit: 1000,
      // 优化构建性能
      reportCompressedSize: false,
      emptyOutDir: true
    },
    optimizeDeps: {
      include: buildConfig.external,
      // 优化依赖预构建
      esbuildOptions: {
        target: 'es2015',
        jsx: 'automatic'
      }
    },
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
      // 热更新配置
      hmr: {
        overlay: true
      },
      // 代理配置
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 预览服务器配置
    preview: {
      port: 4173,
      host: true,
      open: true
    },
    // 环境变量配置
    define: {
      __APP_ENV__: JSON.stringify(env['VITE_APP_ENV'] || 'development'),
      __APP_VERSION__: JSON.stringify(env['npm_package_version'] || '0.1.0')
    }
  };
});
