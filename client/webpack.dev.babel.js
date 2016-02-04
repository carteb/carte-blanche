import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './mock-entry.dev.js')
  ],
  output: {
    path: __dirname,
    filename: 'client-bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'styleguide/index.html',
      template: path.join(__dirname, './index.html'),
    }),
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
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&sourceMap!postcss-loader'
    }]
  }
};
