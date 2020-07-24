const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": '@/assets',
        "components": '@/components',
        "network": '@/network',
        "views": '@/views',
        "store": '@/store',
        "router": '@/router',
        "public": '@/public',
      }
    },
    
  },
  devServer: {
    hotOnly: false, 
    open: true, //自动从浏览器打开应用 
    proxy: { 
      '/api':{ 
        target: 'http://123.207.32.32:8000',
        changeOrigin: true, 
        pathRewrite: {
          '^/api':''
        } 
      } 
    }
  },
  // devServer: {
  //   // disableHostCheck: true,
  //   devServer: {
  //     port: '8080',
  //     host: 'localhost',
  //     open: true,
  //     proxy: {
  //       "/api": {
  //         target: "http://123.207.32.32:8000",
  //         changeOrigin: true,
  //         pathRewrite: {
  //           "^/api": ""
  //         }
  //       }
  //     }
  //   }
  // },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('network', resolve('src/network'))
      .set('public', resolve('src/public'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
  },
  publicPath: './'
}
