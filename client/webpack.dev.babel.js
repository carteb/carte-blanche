import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client',
    path.join(__dirname, './mock-entry.dev.js'),
  ],
  output: {
    path: __dirname,
    filename: 'client-bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'styleguide/index.html',
      template: '!!html!' + path.join(__dirname, './index.html'), // eslint-disable-line
    }),
    new webpack.DefinePlugin({
      'process.env': {
        DISABLE_LOGGER: process.env.DISABLE_LOGGER,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel',
        ],
        include: path.join(__dirname),
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&sourceMap!postcss-loader',
      },
    ],
  },
};
