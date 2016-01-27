import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleguidePlugin from './styleguide-plugin';

import autoprefixer from 'autoprefixer';

export default {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin('bundle-[hash].css', { disable: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../src/index.html'),
    }),
    new StyleguidePlugin(),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, '../src')]
    }, {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style',
      'css?modules&importLoaders=2&localIdentName=[name]-[local]!postcss-loader!sass'),
      include: path.join(__dirname, '../src')
    }, {
      test: /\.css/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.(png|jpg)$/,
      loaders: ['url?limit=10000']
    }, {
      test: /\.(svg)$/,
      loaders: ['url?limit=0']
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
};
