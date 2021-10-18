module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    'autoprefixer': {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
        //'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
     'postcss-pxtorem': {
      rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
      propList: ['*'],
      selectorBlackList: ['van']
     }
  }
}

