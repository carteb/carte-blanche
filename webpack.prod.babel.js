import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const xt = ExtractTextPlugin.extract.bind(ExtractTextPlugin);

export default {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, './plugin/build'),
    filename: '[name]-bundle.js',
    publicPath: '/',
  },
  entry: {
    client: path.join(__dirname, './client/client.js'),
    playground: path.join(__dirname, './plugin/default-plugins/playground/frontend/components/PlaygroundList/index.js'), // eslint-disable-line max-len
  },
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
        exclude: /node_modules/,
        loaders: ['babel'],
      }, {
        test: /\.css$/,
        loader: xt('style', 'css?modules&importLoaders=1!postcss-loader'),
      },
    ],
  },
};
