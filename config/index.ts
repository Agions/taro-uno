import { defineConfig } from '@tarojs/taro'
import path from 'path'
import { UnifiedViteWeappPlugin } from '@tarojs/plugin-platform-weapp'
import { UnifiedViteAlipayPlugin } from '@tarojs/plugin-platform-alipay'
import { UnifiedViteH5Plugin } from '@tarojs/plugin-platform-h5'

export default defineConfig({
  projectName: 'taro-uno',
  date: '2025-8-25',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    '@tarojs/plugin-vue2',
    '@tarojs/plugin-sass',
    UnifiedViteWeappPlugin(),
    UnifiedViteAlipayPlugin(),
    UnifiedViteH5Plugin(),
  ],
  defineConstants: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __TEST__: JSON.stringify(process.env.NODE_ENV === 'test'),
  },
  copy: {
    patterns: [
      {
        from: 'src/static',
        to: 'dist/static',
        ignore: ['*.md'],
      },
    ],
    options: {
      ignore: [
        '**/*.md',
        '**/*.map',
        '**/*.DS_Store',
      ],
    },
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
  },
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://www.taro.zone/docs/next/detail?id=persistentcache
  },
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'packages/theme/src/styles/variables.scss'),
      path.resolve(__dirname, '..', 'packages/theme/src/styles/mixins.scss'),
    ],
    data: `@import "${path.resolve(__dirname, '..', 'packages/theme/src/styles/variables.scss')}";`,
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@taro-uno/core': path.resolve(__dirname, '..', 'packages/core/src'),
    '@taro-uno/ui-basic': path.resolve(__dirname, '..', 'packages/ui-basic/src'),
    '@taro-uno/ui-form': path.resolve(__dirname, '..', 'packages/ui-form/src'),
    '@taro-uno/ui-layout': path.resolve(__dirname, '..', 'packages/ui-layout/src'),
    '@taro-uno/ui-navigation': path.resolve(__dirname, '..', 'packages/ui-navigation/src'),
    '@taro-uno/ui-display': path.resolve(__dirname, '..', 'packages/ui-display/src'),
    '@taro-uno/ui-feedback': path.resolve(__dirname, '..', 'packages/ui-feedback/src'),
    '@taro-uno/ui-theme': path.resolve(__dirname, '..', 'packages/ui-theme/src'),
    '@taro-uno/ui-hooks': path.resolve(__dirname, '..', 'packages/ui-hooks/src'),
    '@taro-uno/shared': path.resolve(__dirname, '..', 'packages/shared/src'),
    '@taro-uno/theme': path.resolve(__dirname, '..', 'packages/theme/src'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设置为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'report.html',
        },
      ])
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设置为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'report.html',
        },
      ])
    },
    devServer: {
      port: 3000,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
  },
  rn: {
    appName: 'taro-uno',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，设置为 true
      },
    },
  },
})