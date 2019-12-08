const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'electron-main',
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'main.js'
  },
  node: {
    __dirname: false
  }
}