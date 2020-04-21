import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CarteBlanche from '../../webpack-plugin/index';

export default {
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index.js'),
  ],
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
    }),
    new CarteBlanche({
      componentRoot: 'src/components',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.css/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader', // eslint-disable-line max-len
      }, {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader?limit=10000'],
      }, {
        test: /\.(svg)$/,
        loaders: ['url-loader?limit=0'],
      }, {
        test: /\.(json)$/,
        loader: 'json-loader',
      },
    ],
  },
  devServer: {
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
};
