import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import webpackCommon from './webpack.common';

export default merge(webpackCommon, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '../src/index.js')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        DISABLE_LOGGER: process.env.DISABLE_LOGGER,
        PERF_LOGGING: process.env.PERF_LOGGING
      }
    })
  ]
});
