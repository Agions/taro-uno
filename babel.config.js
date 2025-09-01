module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'not ie <= 8',
          'iOS >= 8',
          'Android >= 4.1',
        ],
      },
      useBuiltIns: 'usage',
      corejs: 3,
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
    ['@babel/plugin-transform-modules-commonjs', {
      strictMode: false,
    }],
    ['babel-plugin-import', {
      libraryName: '@tarojs/taro',
      libraryDirectory: '',
      style: false,
    }],
    ['babel-plugin-import', {
      libraryName: '@tarojs/components',
      libraryDirectory: '',
      style: false,
    }],
    ['babel-plugin-import', {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }],
  ],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
}