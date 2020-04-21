/* eslint-disable no-var */
var path = require('path');
var autoprefixer = require('autoprefixer');

const MATCH_ALL_NON_RELATIVE_IMPORTS = /^\w.*$/i;

module.exports = {
  output: {
    filename: '[name].js',
    library: 'carte-blanche-source-plugin',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'), // where to place webpack files
  },
  entry: {
    'frontend/index': './frontend/index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        // eslint-disable-next-line max-len
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=carte-blancheReactPlugin__[local]__[hash:base64:5]!postcss-loader',
      },
    ],
  },
  externals: [MATCH_ALL_NON_RELATIVE_IMPORTS],
  target: 'web',
  postcss: [autoprefixer({ browsers: ['> 1%'] })],
};
