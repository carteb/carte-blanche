const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CarteBlanche = require('../../webpack-plugin/index');

module.exports = {
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index.js'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }),
    new CarteBlanche({
      componentRoot: 'src/components',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      }, {
        test: /\.css/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader', // eslint-disable-line max-len
      }, {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url?limit=10000'],
      }, {
        test: /\.(svg)$/,
        loaders: ['url?limit=0'],
      }, {
        test: /\.(json)$/,
        loader: 'json',
      },
    ],
  },
};
