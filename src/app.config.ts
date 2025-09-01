export default {
  pages: [
    'pages/index/index',
    'pages/about/index',
    'pages/components/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro Uno UI',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#0ea5e9',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'static/icons/home.png',
        selectedIconPath: 'static/icons/home-active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/components/index',
        iconPath: 'static/icons/components.png',
        selectedIconPath: 'static/icons/components-active.png',
        text: '组件',
      },
      {
        pagePath: 'pages/about/index',
        iconPath: 'static/icons/about.png',
        selectedIconPath: 'static/icons/about-active.png',
        text: '关于',
      },
    ],
  },
  networkTimeout: {
    request: 10000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000,
  },
  debug: process.env.NODE_ENV === 'development',
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  requiredBackgroundModes: ['audio'],
  navigateToMiniProgramAppIdList: [],
  usingComponents: true,
}