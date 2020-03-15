const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base.js');

const { HotModuleReplacementPlugin } = webpack;

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch'],
  devtool: 'cheap-module-eval-soure-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
});
