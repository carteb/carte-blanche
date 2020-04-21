import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CarteBlanche from '../../webpack-plugin/index';

export default {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: 'app',
  },
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index.js'),
  ],
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'bundle-[hash].css', disable: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }),
    // Carte Blanche can be reached via http://localhost:8080/app/space
    new CarteBlanche({
      componentRoot: './src/components/',
      dest: 'space',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
        // this is a hack for development
        // in the final version we compile it before shipping
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, '../../webpack-plugin'),
          path.join(__dirname, '../../plugins'),
        ],
      }, {
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]!postcss-loader',
        }),
        include: [
          path.join(__dirname, './src'),
          path.join(__dirname, '../../webpack-plugin'),
          path.join(__dirname, '../../plugins'),
        ],
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
