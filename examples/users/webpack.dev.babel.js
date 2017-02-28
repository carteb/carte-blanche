import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CarteBlanche from '../../webpack-plugin/index';
import ReactPlugin from '../../plugins/react/dist/plugin';

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
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }),
    new CarteBlanche({
      componentRoot: 'src/components',
      plugins: [
        new ReactPlugin({
          injectTags: [
            "<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>",
          ],
        }),
      ],
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
        loader: 'style-loader!css?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader', // eslint-disable-line max-len
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
    historyApiFallback: true,
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
