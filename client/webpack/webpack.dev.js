const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base.js');

const { HotModuleReplacementPlugin } = webpack;
const PROXY_API_URL = 'http://127.0.0.1:3000';

// eslint-disable-next-line
console.log(`API请求代理地址为：${PROXY_API_URL}`);

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch'],
  devtool: 'source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 7777,
    historyApiFallback: true,
    proxy: {
      '/api': PROXY_API_URL,
      '/socket.io': PROXY_API_URL
    },
  },
});
