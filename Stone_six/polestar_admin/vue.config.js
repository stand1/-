const path = require("path");
module.exports = {
    // baseUrl:'./',
    publicPath: './',
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        // loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false,
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            },
            sass: {
                //data: `@import "./src/styles/variables.scss";`
                prependData: `@import "./src/styles/variables.scss";`
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        },
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/styles/variables.less')
            ]
        }

    },
    outputDir: 'dist',
    assetsDir: 'static',
    runtimeCompiler: false,
    productionSourceMap: false,
    parallel: undefined,

    pwa: {
        name: '订单中心管理后台'
    },
    // lintOnSave: false,
    // baseUrl: './',
    lintOnSave: false,
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
    devServer: {
        open: process.platform === 'darwin',
        port: 8098,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: "http://test-redt.sixeco.com/",
                ws: false,
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}