/* eslint-disable no-var */
var path = require('path');
var autoprefixer = require('autoprefixer');

const MATCH_ALL_NON_RELATIVE_IMPORTS = /^\w.*$/i;

module.exports = [{
  output: {
    filename: '[name].js',
    library: 'atrium-react-plugin-beta',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'), // where to place webpack files
  },
  entry: {
    plugin: './plugin.js',
    'server/run': './server/run.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
    }],
  },
  externals: [MATCH_ALL_NON_RELATIVE_IMPORTS, {
    './frontend/index.js': 'commonjs ./frontend/index.js',
  }],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
}, {
  output: {
    filename: '[name].js',
    library: 'atrium-react-plugin-beta',
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
        loader: 'babel',
      },
      {
        test: /\.css$/,
        // eslint-disable-next-line max-len
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=atriumReactPlugin__[local]__[hash:base64:5]!postcss-loader',
      },
    ],
  },
  externals: [MATCH_ALL_NON_RELATIVE_IMPORTS],
  target: 'web',
  postcss: [autoprefixer({ browsers: ['> 1%'] })],
}];
