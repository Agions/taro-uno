export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 根元素字体大小
      unitPrecision: 5, // 保留小数位数
      propList: ['*'], // 所有属性都转换
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略的选择器
      minPixelValue: 2, // 最小的转换数值
      mediaQuery: false, // 是否在媒体查询中转换px
      replace: true, // 转换后是否删除原有单位
      exclude: /node_modules/i // 忽略node_modules目录下的文件
    },
    'autoprefixer': {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 2 versions'
      ],
      grid: true
    },
    'cssnano': {
      preset: 'default'
    }
  }
};
