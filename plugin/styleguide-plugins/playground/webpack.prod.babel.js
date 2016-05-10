/* eslint-disable no-var */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    path.join(process.cwd(), 'plugin.js'),
  ],
  output: {
    path: 'lib',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=draftJsUndoPlugin__[local]__[hash:base64:5]!postcss-loader'), // eslint-disable-line max-len
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['> 1%'] })],
  plugins: [
    new ExtractTextPlugin('main.css'),
  ],
  target: 'web',
};
