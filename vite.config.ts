import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { paths, aliases, buildConfig } from './configs/shared/config'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic'
      }),
      dts({
        insertTypesEntry: true,
        copyDtsFiles: true,
        tsconfigPath: './tsconfig.json',
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
          globals: buildConfig.globals,
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
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: buildConfig.external
    },
    server: {
      port: 3000,
      host: true,
      open: true,
      cors: true,
    }
  }
})