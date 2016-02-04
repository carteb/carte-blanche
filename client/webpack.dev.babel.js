import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  output: {
    path: __dirname,
    filename: 'client-bundle.js',
    publicPath: '/'
  },
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './mock-entry.dev.js')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        DISABLE_LOGGER: process.env.DISABLE_LOGGER,
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
