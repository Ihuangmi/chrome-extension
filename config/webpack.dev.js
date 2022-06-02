const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://test.a.newrank.cn', // 代理地址
  //       pathRewrite: { '^/api': '' }, // 路径重写
  //       changeOrigin: true, // target是域名的话，需要这个参数，
  //     },
  //   },
  // },
})
