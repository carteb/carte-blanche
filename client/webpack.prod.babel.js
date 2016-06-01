import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const xt = ExtractTextPlugin.extract.bind(ExtractTextPlugin);

export default {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../webpack-plugin/src/assets/'),
    filename: 'client-bundle.js',
    publicPath: '/',
  },
  entry: [
    path.join(__dirname, './client.js'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PRODUCTION: process.env.PRODUCTION,
      },
    }),
    new ExtractTextPlugin('[name].css?[hash]', { allChunks: true }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: xt('style', 'css?modules&importLoaders=1!postcss-loader'),
      },
    ],
  },
};
