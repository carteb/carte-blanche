import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import webpackCommon from './webpack.common';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default merge(webpackCommon, {
  entry: [
    path.join(__dirname, '../src/index.js')
  ],
  output: {
    filename: 'bundle-[hash].js'
  },
  plugins: [
    new ExtractTextPlugin('bundle-[hash].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  ]
});
