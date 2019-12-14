const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      images: path.resolve(__dirname, '../src/images'),
      pages: path.resolve(__dirname, '../src/pages'),
      components: path.resolve(__dirname, '../src/components'),
    },
  },
  output: {
    path: DIST_PATH,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    style: 'css'
                  }
                ]
              ]
            }
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: [
                    'defaults',
                    'not ie < 11',
                    'last 2 versions',
                    '> 1%',
                    'iOS 7',
                    'last 3 iOS versions',
                  ],
                }),
              ],
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/scss/variable.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/',
              name: '[name].[hash:8].[ext]',
              limit: 1024,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      path.resolve(__dirname, '../public'),
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  performance: false,
};
