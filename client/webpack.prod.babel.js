import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../plugin'),
    filename: 'client-bundle.js',
    publicPath: '/'
  },
  entry: [
    path.join(__dirname, './client.js')
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PRODUCTION: process.env.PRODUCTION,
      }
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};
