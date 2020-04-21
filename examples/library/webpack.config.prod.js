const path = require('path');
const webpack = require('webpack');

const entrypoints = {
  main: ['./src/index'],
  foobar: ['./src/index.foobar'],
};

module.exports = {
  devtool: 'source-map',
  entry: entrypoints,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
    libraryTarget: 'var',
    library: '[name]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-1'],
      },
      exclude: /node_modules/,
      include: [path.join(__dirname, 'src')],
    },
    ],
  },
};
