import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CarteBlanche from '../../../webpack-plugin/index';
import ReactPlugin from '../../../plugins/react/plugin';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './index.js'),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './index.html'),
    }),
    new CarteBlanche({
      componentRoot: 'components',
      hot: false,
      plugins: [
        new ReactPlugin({
          files: ['./node_modules/todomvc-app-css/index.css'],
        }),
      ],
      // files: [path.join(__dirname, './node_modules/todomvc-app-css/index.css')],
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader!css-loader'],
      },
    ],
  },
};
