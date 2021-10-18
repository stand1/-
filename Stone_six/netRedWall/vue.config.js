module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      

    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },

  publicPath: './',

  devServer: {
    port: 8080, //这是用来更改默认端口号
    open: true, //运行自启动
    https: false, //https模式开启
      proxy: {
        '/api': { //http://test.rhealane.com:8091
          // target: "http://124.71.160.220:8444",
          // target: 'http://test-crm.sixeco.com:8444',
          target: 'https://test.thewe.fun',//测试地址
          // target: 'https://www.thewe.fun',//正式
          // target: "https://test.rhealane.com/api",
          // target: "http://192.168.31.69:8443/",//沈旭程
          // target: "http://192.168.31.98:8443",//向周虎
          // target: "http://192.168.31.15:8888",//吴阳
          // target: "http://192.168.31.81:9001/api",
          // target: "https://sixtest.baojunev.com/api",
          secure: false,
          changeOrigin: true,
          ws: false,
          pathRewrite: {
            '^/': ''
          }
        },
      },
  },
      // devServer: {
      //   open: process.platform === 'darwin',
      //   port: 8098,
      //   https: false,
      //   hotOnly: false,
      //   proxy: {
      //     // '/redt': {
      //     //     target: "https://test.rhealane.com/redt",
      //     //     secure: true,
      //     //     changeOrigin: true,
      //     //     ws: true,
      //     //     pathRewrite: {
      //     //         '^/redt': ''
      //     //     }
      //     // },
      //     '/': { //http://test.rhealane.com:8091
      //       // target: "https://test.rhealane.com/api",
      //       // target: "https://redt.sixeco.com/api",
      //       target: 'https://test.sixeco.com/api',
      //       secure: true,
      //       changeOrigin: true,
      //       ws: false,
      //       pathRewrite: {
      //         '^/api': ''
      //       }
      //     }
      //   }
      // },
  assetsDir: 'static',
  productionSourceMap: false
}
