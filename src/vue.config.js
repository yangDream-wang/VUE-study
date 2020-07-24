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
    devServer: {
      disableHostCheck: true,
      // proxy: {
      // 'https://api.mtnhao.com/': {
      //         target: 'http://localhost:8080',
      //         changeOrigin: true,
      //         secure: false,
      //     },
      // },
    }
  },
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
